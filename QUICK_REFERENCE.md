# 🚀 Quick Reference: Admin Panel

## Login

**URL**: `http://localhost:3000/admin`

### Credentials Format
```
Role: Admin or Pricer
Password: Your ADMIN_KEY or PRICER_KEY from .env.local
```

---

## Admin Dashboard (`/admin/panel`)

### Left Side
- 🟢 **DIAMOND AURA** - Branding
- **Admin Panel** - Title
- **Role**: Shows your role (Admin/Pricer)

### Right Side (Header Buttons)
```
[Refresh] [Reset] [Save] [Logout]
```

- **Refresh** - Get latest data from server
- **Reset** - Restore default products (admin only)
- **Save** - Save all changes globally
- **Logout** - Sign out

---

## Config Section (Admin Only)

### Fields
1. **Announcement** - Text for marquee on home page
2. **Instagram profile URL** - Link to Instagram
3. **USD Rate** - How many TRY per 1 USD (33.5 = ₺33.50)

### Save Changes
- Edit → Click Save → Changes live on home page

---

## Products Section

### For Each Product
- **Product Name** - (View only)
- **ID** - (View only, used for URLs)
- **Live Price** - Current price shown to users
- **Live Sale Price** - Crossed-out original price (if any)

### Edit Fields

#### Both Admin & Pricer Can Edit
- **Original price (TRY)** or **compareAtTRY** box
  - Admin: Can set any value
  - Pricer: Sets original, system auto-calculates 33% discount

#### Admin Only
- **priceTRY (admin only)** - Exact sale price shown

### Christian Items Special Rule
- Pricer cannot edit these (locked)
- Always show ₺2500 full price
- No discount shown

### Example Workflow
1. Admin enters original price: 3000
2. Pricer sees original price: 3000
3. System calculates: 3000 × 0.67 = 2010
4. Customer sees: ₺2010 (with ₺3000 crossed out)

---

## Status Messages

### ✅ Green
- "Saved globally ✅" - Success!
- Changes are now live

### ❌ Red
- "Unauthorized" - Token expired, go back to `/admin` to login
- "Save failed" - Check network, try again
- "Wrong key" - Password incorrect

---

## Hot Keys (If Added)
- `Cmd/Ctrl + S` - Quick Save (not yet, but could add)

---

## What Updates When You Save?

| Page | Updates |
|------|---------|
| Home (/) | Announcement, featured products |
| Shop (/shop) | All hoodies list |
| Product Detail (/product/[id]) | Price, images, description |
| Any Page | Loads fresh data on next visit |

**Note**: Updates happen instantly but cached in browser. Full refresh not needed.

---

## Role Comparison

### 👨‍💼 Admin Password
- Full access to everything
- Can reset store
- Can edit all product fields
- Can edit site config

### 🏷️ Pricer Password (Dani)
- Price setting only
- No Christian items
- Auto 33% discount
- No config editing

---

## Common Tasks

### Update Announcement
1. Admin panel → Config section
2. Edit "Announcement" field
3. Click Save
4. Home page updates live

### Change Product Prices
1. Find product in Products section
2. Edit "Original price (TRY)" or "priceTRY"
3. Click Save
4. Changes visible to all users

### Add New Product
1. Get product details ready
2. Edit `/lib/products.ts` (manual for now)
3. Restart dev server
4. Product appears in admin panel

### Reset Everything
1. Admin panel → Click "Reset" button
2. Confirm
3. All products back to default

---

## Debugging

### Check if Saved
- Click Refresh button
- If your changes are still there, they're saved ✅

### Check if Live
- Open home page in another tab
- See if announcement updated
- No refresh needed to see changes

### Token Expired?
- Error: "Unauthorized"
- Solution: Go back to `/admin` and login again

---

## URLs Reference

| URL | Purpose |
|-----|---------|
| `/` | Home page |
| `/shop` | All hoodies |
| `/product/[id]` | Product detail |
| `/admin` | Login page |
| `/admin/panel` | Admin dashboard |
| `/api/store` | Global data API (GET/PUT) |

---

## Tips & Tricks

1. **Multiple tabs**: Keep admin panel open while editing products on another tab
2. **Live preview**: Click Refresh after Save to verify changes
3. **Backup**: Screenshot important data before Reset
4. **Mobile**: Admin panel works on mobile (responsive)
5. **Session**: Token valid for 7 days, then need to login again

---

**Questions?** See `ADMIN_GUIDE.md` for detailed info.
