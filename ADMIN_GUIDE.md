# Diamond Aura Collective Admin Panel

## ✅ Complete Setup Guide

### Prerequisites
1. Node.js 18+ installed
2. A Vercel account (for Edge Config - global state storage)
3. Environment variables configured

### 1. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# AUTH_SECRET: Any random string for JWT signing
AUTH_SECRET=randomstring123456789

# ADMIN_KEY: Password for admin access (manage everything)
ADMIN_KEY=your-admin-password

# PRICER_KEY: Password for pricer access (manage prices only)
PRICER_KEY=your-pricer-password

# Vercel Edge Config (required for global state)
EDGE_CONFIG_ID=your-edge-config-id
VERCEL_API_TOKEN=your-vercel-api-token
```

### 2. Getting Vercel Credentials

1. Go to [https://vercel.com/](https://vercel.com/)
2. Create an Edge Config at: Dashboard → Storage → Edge Config
3. Copy the Edge Config ID
4. Create an API Token at: Account Settings → Tokens
5. Add both to `.env.local`

### 3. Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### 4. Admin Panel Features

#### Access Admin Panel
- Navigate to `/admin`
- Login with your credentials
- Choose role: **Admin** or **Pricer**

#### Admin Role (Full Control)
- Edit product names, descriptions, images
- Edit prices (priceTRY)
- Edit sale prices (compareAtTRY)
- Edit site configuration (announcement, Instagram URL, USD rate)
- Reset to default data
- Christian/cross items always show full price (2500₺)
- Regular items automatically get 33% discount

#### Pricer Role (Dani's Role - Prices Only)
- Edit sale prices (compareAtTRY) only
- Set original price, server applies 33% discount automatically
- **Cannot** edit Christian/cross items (locked)
- **Cannot** see full product editor
- **Cannot** reset store

### 5. How Global State Works

**Architecture:**
1. All data stored in Vercel Edge Config (globally accessible)
2. `/api/store` endpoints read/write to Edge Config
3. Admin panel fetches state via `GET /api/store`
4. Admin panel saves state via `PUT /api/store` (with token auth)
5. Shop pages fetch fresh data via `useStoreData()` hook
6. Changes appear live across all pages immediately

**Security:**
- Admin reads and writes require valid JWT token
- JWT tokens valid for 7 days
- Pricer role automatically applies 33% discount (can't show full prices)
- Authorization header: `Bearer {token}`

### 6. Data Structure

#### StoreState
```typescript
{
  products: [
    {
      id: "product-id",
      name: "Product Name",
      category: "Hoodies",
      priceTRY: 2000,           // Sale price shown
      compareAtTRY: 3000,       // Crossed-out original (optional)
      description: "...",
      images: ["url1", "url2"],
      badges: ["New", "Deal", "Limited"]
    }
  ],
  config: {
    announcement: "FREE SHIPPING...",
    instagramProfileUrl: "https://instagram.com/...",
    usdRate: 32.5
  }
}
```

### 7. Testing

#### Test Admin Flow
1. Go to `/admin`
2. Select "Admin" role
3. Enter ADMIN_KEY from `.env.local`
4. Click "Login"
5. You'll see the full admin panel
6. Edit announcement and click "Save"
7. Refresh home page - announcement updates live

#### Test Pricer Flow
1. Go to `/admin`
2. Select "Pricer (Dani)" role
3. Enter PRICER_KEY from `.env.local`
4. Click "Login"
5. You can only edit compareAtTRY fields
6. Christian items are locked (can't edit)
7. Admin items show "Admin Only" label

#### Test Global Sync
1. Make a change in admin panel
2. Open `/shop` in another tab
3. The products update live without refresh
4. Changes persist across page reloads

### 8. Troubleshooting

**"Server missing env vars" error:**
- Ensure all env vars are in `.env.local`
- Restart dev server after changes: `npm run dev`

**"Failed to write Edge Config" error:**
- Check EDGE_CONFIG_ID and VERCEL_API_TOKEN are correct
- Verify token has write permissions
- Token might be expired

**"Unauthorized" on save:**
- Token might be expired (7 days)
- Re-login at `/admin`

**Products not updating on shop page:**
- Check browser console for fetch errors
- Verify `/api/store` responds with data
- Clear browser cache and refresh

### 9. Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

On Vercel:
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### 10. Key Files

| File | Purpose |
|------|---------|
| `app/admin/page.tsx` | Admin login page |
| `app/admin/panel/page.tsx` | Main admin panel |
| `app/api/auth/login/route.ts` | JWT token generation |
| `app/api/store/route.ts` | Global state API (GET/PUT/POST) |
| `lib/useStoreData.ts` | Hook to fetch global state |
| `lib/edgeStore.ts` | Edge Config read/write |
| `lib/jwt.ts` | JWT token signing/verification |
| `lib/auth.ts` | Token verification middleware |

### 11. Product Images

Use Cloudinary URLs or any CDN. Example format:
```typescript
images: [
  "https://res.cloudinary.com/.../image1.jpg",
  "https://res.cloudinary.com/.../image2.jpg"
]
```

### 12. Badges

Available badges for products:
- `"New"` - New release
- `"Free Shipping"` - Free shipping available
- `"Deal"` - On sale/discounted
- `"Limited"` - Limited stock

---

## ✨ Features Summary

✅ Global admin panel (live across all pages)  
✅ Role-based access (Admin vs Pricer)  
✅ Real-time product updates  
✅ Multi-image carousel  
✅ Shopping cart (localStorage)  
✅ Mobile responsive  
✅ JWT authentication  
✅ Edge Config for zero-latency data  
✅ Pricer mode with automatic discount application  
✅ Christian item special pricing rules  

---

**Need help?** Check the TypeScript types in `lib/types.ts` and `lib/storeSeed.ts` for data structure details.
