# MongoDB Atlas Configuration for AWS Amplify

## Current Issue: Connection Timeout (504)

Your homepage is timing out because MongoDB Atlas is likely blocking connections from AWS Amplify Lambda IPs.

## Fix: Allow AWS Amplify Access in MongoDB Atlas

### Option 1: Allow All IPs (Quick Fix for Testing)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster: `huellas-de-emi-sandbox`
3. Click **Network Access** (left sidebar)
4. Click **Add IP Address**
5. Click **Allow Access from Anywhere**
6. Confirm with IP: `0.0.0.0/0`
7. Click **Confirm**
8. Wait 1-2 minutes for changes to propagate
9. Redeploy your Amplify app or just refresh the page

### Option 2: Allow Specific AWS Region IPs (More Secure)

If your Amplify app is in `us-east-1`, add these IP ranges:
- Find AWS Lambda IP ranges for your region: [AWS IP Ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html)
- Add each range in MongoDB Atlas Network Access

### Verify Connection

After updating Network Access:
1. Visit your Amplify URL: `https://master.d2gb8sa6w51s4x.amplifyapp.com/`
2. If still timeout, check CloudWatch logs (Amplify Console → Hosting → Compute logs)
3. Look for MongoDB connection errors

### Check Current Status

Visit `/api/health` to verify env vars are loaded:
```json
{
  "hasMongoUri": true,  // ✓ Good
  "hasAdminPassword": true  // ✓ Good
}
```

Then try `/api/dogs` directly - if it times out, it's definitely MongoDB network access.

## Alternative: MongoDB Atlas Connection String Check

Verify your connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/?appName=app-name
```

Make sure:
- Username/password have no special characters (or are URI-encoded)
- Cluster domain is correct
- Database user exists in Atlas (Database Access)

## Security Note

**CRITICAL**: Your MongoDB credentials were exposed in previous screenshots. You MUST:
1. Go to MongoDB Atlas → Database Access
2. Edit user `josenanodev_db_user`
3. Click **Edit Password**
4. Generate new password
5. Update `SECRET_MONGODB_URI` in Amplify Console
6. Redeploy
