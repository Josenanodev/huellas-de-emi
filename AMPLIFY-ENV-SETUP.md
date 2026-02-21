# AWS Amplify Environment Setup for huellas-de-emi

## Important: Secrets vs Environment Variables

**For Amplify Hosting SSR apps (like this Astro project):**
- ❌ **DO NOT use "Secrets"** (Hosting > Secrets) — these are for Amplify Gen 2 backend functions only
- ✅ **USE "Environment variables"** (Hosting > Environment variables)
- ✅ The `amplify.yml` writes env vars to `.env` during preBuild, then:
  - Astro reads them at build time via `import.meta.env`
  - The `.env` file is copied to Lambda compute for runtime loading via `src/lib/load-env.ts`

## Required Environment Variables

Set these in **AWS Amplify Console → Hosting → Environment variables**:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `SECRET_MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/db` | MongoDB connection string |
| `SECRET_ADMIN_PASSWORD` | `your_secure_password_here` | Admin panel password |

### Steps to Configure

1. Go to AWS Amplify Console
2. Select your app: `huellas-de-emi`
3. Navigate to **Hosting** → **Environment variables** (NOT Secrets)
4. Click "Manage variables"
5. Add both variables with scope "All branches" or specific branch:
   - Variable name: `SECRET_MONGODB_URI`
   - Variable name: `SECRET_ADMIN_PASSWORD`
6. Save changes
7. **Redeploy** the branch
8. Check build logs for:
   ```
   echo "SECRET_MONGODB_URI=$SECRET_MONGODB_URI" > .env
   echo "SECRET_ADMIN_PASSWORD=$SECRET_ADMIN_PASSWORD" >> .env
   ```
9. After deploy, check `/api/health` endpoint (see Verification section)

## Verification

After deploying, visit: `https://your-app-url.amplifyapp.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-20T...",
  "env": {,
    "mode": "production",
    "ssr": true:
1. Check Amplify Console build logs for the `echo` commands writing to `.env`
2. Verify variables are set under "Environment variables" (not Secrets)
3. Check that `.env` file is being copied to compute: `cp .env ./.amplify-hosting/compute/default/.env`
4. Ensure you redeployed AFTER setting variables

If `hasMongoUri` or `hasAdminPassword` is `false`, the variables were not injected during build. Check:
- Variables are set in Amplify Console under "Environment variables"
- You redeployed AFTER setting the variables
- Build logs show the `echo` commands writing to `.env.production`
```

If `hasMongoUri` or `hasAdminPassword` is `false`, the variables are not being injected.

## Security Note

**IMPORTANT**: The MongoDB credentials in `.env` have been exposed in git history/screenshots. You MUST:

1. Go to MongoDB Atlas
2. Database Access → Edit user `josenanodev_db_user`
3. Change the password
4. Update `SECRET_MONGODB_URI` in Amplify with new credentials
5. Redeploy

## Troubleshooting

### Dogs not loading
- Check `/api/health` shows `hasMongoUri: true`
- Check MongoDB Atlas → Network Access allows Amplify IPs (or use `0.0.0.0/0` for testing)
- Check CloudWatch logs for connection errors

### Admin login accepts any password
- Check `/api/health` shows `hasAdminPassword: true`
- Try logout/login after redeploy
- Clear browser sessionStorage

### Environment variables not available
- Ensure variables are in "Environment variables" NOT "Secrets"
- Ensure you deployed AFTER setting variables
- Check variable scope (all branches vs specific branch)
