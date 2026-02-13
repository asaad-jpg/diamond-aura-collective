# ✅ Deployment Checklist

## Pre-Deployment

- [ ] Environment variables configured in `.env.local`
- [ ] Vercel Edge Config ID obtained
- [ ] Vercel API token generated
- [ ] ADMIN_KEY and PRICER_KEY set
- [ ] AUTH_SECRET configured
- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors
- [ ] Tested locally: `npm run dev`
- [ ] Admin login works
- [ ] Product editing works
- [ ] Changes persist after save
- [ ] Cart functionality works

## Local Testing

- [ ] Home page loads: `http://localhost:3000`
- [ ] Shop page works: `http://localhost:3000/shop`
- [ ] Product detail works: `http://localhost:3000/product/[id]`
- [ ] Admin login works: `http://localhost:3000/admin`
- [ ] Can access admin panel after login
- [ ] Can edit and save changes
- [ ] Announcement updates live
- [ ] Prices update correctly
- [ ] Mobile navigation works
- [ ] Cart drawer opens/closes

## Vercel Setup

- [ ] Repository pushed to GitHub
- [ ] Project connected to Vercel
- [ ] Environment variables added to Vercel:
  - [ ] `AUTH_SECRET`
  - [ ] `ADMIN_KEY`  
  - [ ] `PRICER_KEY`
  - [ ] `EDGE_CONFIG_ID`
  - [ ] `VERCEL_API_TOKEN`
- [ ] Initial deploy successful
- [ ] Build logs show no errors
- [ ] Functions deployed correctly

## Production Testing

- [ ] Admin login works on production
- [ ] Can make and save changes
- [ ] Changes visible to other users
- [ ] Announcement updates on home
- [ ] Prices display correctly
- [ ] Cart functionality works
- [ ] Mobile responsive
- [ ] All pages load quickly
- [ ] API endpoints respond

## Post-Launch

- [ ] Monitor error logs
- [ ] Test from different devices
- [ ] Have backup admin password
- [ ] Document admin credentials
- [ ] Set token expiration reminder (7 days)
- [ ] Brief Dani on pricer access

## Monitoring

- [ ] Check Vercel dashboard weekly
- [ ] Monitor Edge Config status
- [ ] Review function logs for errors
- [ ] Check response times
- [ ] Verify backups working

---

**Go Live Status**: ⏳ Ready to Deploy

When all checkboxes above are complete, your site is ready for production!
