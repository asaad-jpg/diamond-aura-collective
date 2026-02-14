# Vercel Environment Variables Setup

To complete the Discord webhook integration on Vercel, add this environment variable:

## Steps to Add to Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project "diamond-aura-collective"
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:

```
Name: DISCORD_WEBHOOK_URL
Value: https://discord.com/api/webhooks/1472028368529657978/bN_nMZY1g0qv-PvXi1TKmBM0KSHPdhi7qA1Xo17sWz7V6kKPwGGd-uZxOM-QoCrCx3x9
```

5. Make sure it's available for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Click "Add"
7. Redeploy your site for changes to take effect

## Done! ✅

Once the environment variable is set on Vercel:
- Price updates will trigger Discord notifications
- Your partner can use the live admin panel
- Changes will be announced in Discord instantly

Your system is now fully interactive on Vercel!
