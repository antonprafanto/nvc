# 🚀 Quick Start Guide - NgeVibeCoding Platform

Panduan cepat untuk menjalankan platform pembelajaran NgeVibeCoding di local development.

## ⚡ Setup Cepat (5 Menit)

### 1. Install Dependencies
```bash
cd vibecoding-main
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

**Platform sudah bisa diakses di:** `http://localhost:3000` 🎉

## 📝 Mode Development vs Production

### 🛠️ **Development Mode (Current)**
- ✅ Homepage dengan semua sections
- ✅ Modul pembelajaran lengkap dengan konten 
- ✅ Quiz system interaktif
- ✅ Dashboard mockup dengan dummy data
- ✅ Dark mode toggle
- ✅ Responsive design
- ⚠️ Authentication system **disabled** (placeholder)

**Fitur yang bisa ditest:**
- [x] Homepage navigation
- [x] Browse semua 6 modul pembelajaran
- [x] Baca konten lessons lengkap
- [x] Coba quiz system
- [x] Lihat dashboard mockup
- [x] Test dark/light mode
- [x] Browse About & Contact pages

### 🔐 **Enable Authentication (Production)**

Untuk enable full authentication system:

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL dan API key

2. **Update Environment Variables**
   ```bash
   # Edit .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Setup Database**
   - Run SQL script dari `DEPLOYMENT.md`
   - Tables akan terbuat otomatis

4. **Restart Server**
   ```bash
   npm run dev
   ```

**Setelah setup Supabase:**
- [x] User registration & login
- [x] Real progress tracking
- [x] Personal dashboard
- [x] Achievement system
- [x] User profiles

## 🎯 Test Scenarios

### Scenario 1: Browse as Visitor
1. Open `http://localhost:3000`
2. Explore homepage sections
3. Click "Lihat Modul" → browse all modules
4. Click specific module → read lessons
5. Try quiz system → get results
6. Toggle dark mode
7. Visit About & Contact pages

### Scenario 2: Mockup User Experience  
1. Go to `/dashboard` 
2. See progress mockup dengan dummy data
3. Browse achievements mockup
4. Test navigation between pages

### Scenario 3: Development Features
1. See development notification (top-right)
2. Try login/register → see "not configured" message
3. All UI components working perfectly

## 🚢 Deploy ke Production

### Option 1: Vercel (Recommended)
```bash
# Deploy to Vercel
npm i -g vercel
vercel

# Set environment variables di Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# NEXT_PUBLIC_SITE_URL=your_domain
```

### Option 2: Netlify
```bash
# Build project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

## 🎨 Customization

### Colors & Branding
Edit `tailwind.config.js` untuk custom colors:
```js
primary: {
  500: '#your-primary-color',
  600: '#your-primary-darker',
}
```

### Content & Modules
Edit `src/data/modules.ts` untuk:
- Add/edit modules
- Update lesson content  
- Modify quiz questions
- Change learning outcomes

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Individual component files
- Custom components: `src/components/ui/`

## ❓ Troubleshooting

### Issue: Port sudah digunakan
**Solution:** Server akan otomatis cari port yang available (3001, 3002, dll)

### Issue: CSS tidak loading
**Solution:** 
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Auth errors
**Expected!** Auth system memang disabled untuk development mode.

### Issue: Build errors
**Solution:**
```bash
# Type check
npm run type-check

# Lint
npm run lint
```

## 📚 Next Steps

1. **Content Creation**: Update module content di `src/data/modules.ts`
2. **Supabase Setup**: Follow `DEPLOYMENT.md` untuk production auth
3. **Customization**: Update branding, colors, dan copy
4. **Testing**: Test semua user flows
5. **Deployment**: Deploy ke Vercel/Netlify

## 🎉 Platform Features Overview

### ✅ **Sudah Implemented**
- [x] Complete 6-module curriculum structure
- [x] Interactive lesson pages dengan navigation
- [x] Quiz system dengan timer & scoring
- [x] Progress tracking UI (mockup)
- [x] Achievement/badge system UI
- [x] Responsive design (mobile-first)
- [x] Dark/light mode toggle
- [x] Modern UI dengan Tailwind CSS
- [x] TypeScript untuk type safety
- [x] SEO-friendly dengan metadata

### 🔄 **Optional Enhancements**
- [ ] Video player integration
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Community features
- [ ] Live coding sessions

---

**Platform NgeVibeCoding siap digunakan! 🚀**

For detailed setup dan deployment guide, baca `DEPLOYMENT.md` dan `README.md`.