# 🚀 Quick Start Guide - Interactive Admin Panel

## 🎯 Access Admin Panel

**URL:** `https://yourdomain.com/admin`  
**Local:** `http://localhost:3000/admin`

## 🔑 Login Credentials

| Role | Key | Permissions |
|------|-----|-------------|
| Admin | `LILPEEPLOVER123123` | Full access (prices, announcement, USD rate, reset) |
| Pricer | `DUDU123DUDU` | Prices only (auto-discount rules apply) |

## ⚡ Live Features

✅ **Real-time File Saves** - Instant  
✅ **Discord Notifications** - Automatic  
✅ **GitHub Auto-Commit** - Within seconds  
✅ **Vercel Auto-Deploy** - Within 1-2 minutes  
✅ **Global Updates** - Visible to all users immediately after deploy  

## 📊 What Triggers Discord Notifications

1. **Price Changes** - Shows product name, old/new prices
2. **Announcement Changes** - Shows new announcement text
3. **Timestamp** - Shows when changes were made

## 🎨 Admin Panel Layout

```
┌─────────────────────────────────────┐
│  DIAMOND AURA - ADMIN PANEL         │
├─────────────────────────────────────┤
│                                     │
│  Announcement: [ Limited time sale! ] │
│  USD Rate: [ 34.5 ]                 │
│                                     │
├─────────────────────────────────────┤
│ PRODUCTS TABLE                      │
│                                     │
│ ID | Name | Price | Compare | Edit │
├─────────────────────────────────────┤
│  ✅ Save All Changes                │
│  🔄 Reset to Defaults               │
│  🚪 Logout                          │
└─────────────────────────────────────┘
```

## 💡 Pro Tips

**✅ DO:**
- Edit multiple prices before saving (saves time)
- Check Discord after saving to confirm notification
- Use Pricer role for daily price adjustments
- Keep announcement short and catchy

**❌ DON'T:**
- Share your Discord webhook URL
- Lose your admin/pricer keys
- Make typos in announcements before saving
- Manually edit store-data.json

## 📱 Discord Notifications Format

**Price Update:**
```
💰 2 Prices Updated

📉 Emerald Graphic Hoodie: `1200 TRY` → `899 TRY`
📈 White Graphic Hoodie: `1200 TRY` → `1599 TRY`

Updated at 2/14/2026, 4:30 PM
```

**Announcement Update:**
```
🎤 Announcement Updated

"Limited Time Sale - 40% OFF!"

Updated at 2/14/2026, 4:31 PM
```

## 🔄 Update Flow

```
1. Login to Admin Panel
   ↓
2. Edit prices/announcement
   ↓
3. Click "Save All Changes"
   ↓
4. ✅ File saved instantly
   ↓
5. 📢 Discord notified immediately
   ↓
6. 🚀 GitHub commit within 2 seconds
   ↓
7. 🌍 Vercel redeploys (1-2 minutes)
   ↓
8. 🎉 Live for all users globally
```

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Changes not saving | Check browser console for errors |
| No Discord notification | Verify webhook URL in `.env.local` |
| Site not updating | Wait 2-3 minutes for Vercel deploy, then refresh |
| Role can't do something | Check permissions table above |
| Incorrect discount | Make sure using Pricer role for discount rules |

## 📞 Support

- **Local Testing:** Check server logs (terminal running `npm run dev`)
- **Live Issues:** Check Vercel deployment status in dashboard
- **Discord Check:** Verify webhook is valid and not expired

---

**Everything is now fully automated and interactive!** 🎉  
Your partner can update prices live on Vercel, and you'll both get Discord notifications instantly!
