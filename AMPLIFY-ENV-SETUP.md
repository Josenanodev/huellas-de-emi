# AWS Amplify Environment Setup for huellas-de-emi

## Important: Secrets vs Environment Variables

**For Amplify Hosting SSR apps (like this Astro project):**
- ❌ **DO NOT use "Secrets"** (Hosting > Secrets) — these are for Amplify Gen 2 backend functions only
- ✅ **USE "Environment variables"** (Hosting > Environment variables) — these become `process.env` at runtime

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
5. Add both variables with scope "All branches" or specific branch
6. Save changes
7. **Redeploy** the branch (required for changes to take effect)

## Verification

After deploying, visit: `https://your-app-url.amplifyapp.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-20T...",
  "env": {
    "hasMongoUri": true,
    "hasAdminPassword": true,
    "nodeEnv": "production"
  }
}
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
