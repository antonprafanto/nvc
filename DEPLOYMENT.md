# Deployment Guide - VibeCoding Platform

Panduan lengkap untuk deploy VibeCoding platform ke production.

## 🚀 Quick Deployment

### 1. Persiapan

**Prerequisites:**
- GitHub repository dengan code yang sudah ready
- Supabase project yang sudah setup
- Vercel account (recommended) atau platform hosting lainnya

### 2. Setup Supabase Database

Buat project baru di [Supabase](https://supabase.com) dan run SQL berikut di SQL Editor:

> **✅ Status**: Script ini sudah berhasil dijalankan dan tested

```sql
-- ⚠️ IMPORTANT: Jangan jalankan baris ini karena akan error
-- ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
-- Tabel auth.users sudah dikelola Supabase dan tidak bisa dimodifikasi

-- Profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    updated_at TIMESTAMP WITH TIME ZONE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User progress tracking
CREATE TABLE public.user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    module_id TEXT NOT NULL,
    lesson_id TEXT,
    completed BOOLEAN DEFAULT FALSE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, module_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Quiz results
CREATE TABLE public.quiz_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    module_id TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    total_questions INTEGER NOT NULL CHECK (total_questions > 0),
    correct_answers INTEGER NOT NULL CHECK (correct_answers >= 0),
    time_taken INTEGER, -- in seconds
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Achievements/Badges
CREATE TABLE public.achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    badge_id TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    badge_description TEXT,
    badge_icon TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, badge_id)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Learning streaks
CREATE TABLE public.learning_streaks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id)
);

ALTER TABLE public.learning_streaks ENABLE ROW LEVEL SECURITY;

-- User notes for lessons
CREATE TABLE public.lesson_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    module_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, module_id, lesson_id)
);

ALTER TABLE public.lesson_notes ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- User progress policies
CREATE POLICY "Users can view own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Quiz results policies
CREATE POLICY "Users can view own quiz results" ON public.quiz_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON public.quiz_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements" ON public.achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON public.achievements
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Learning streaks policies
CREATE POLICY "Users can view own streaks" ON public.learning_streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks" ON public.learning_streaks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON public.learning_streaks
    FOR UPDATE USING (auth.uid() = user_id);

-- Lesson notes policies
CREATE POLICY "Users can manage own notes" ON public.lesson_notes
    FOR ALL USING (auth.uid() = user_id);

-- Functions and triggers

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    
    INSERT INTO public.learning_streaks (user_id)
    VALUES (new.id);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_user_progress
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_learning_streaks
    BEFORE UPDATE ON public.learning_streaks
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_lesson_notes
    BEFORE UPDATE ON public.lesson_notes
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
```

### 3. Setup Authentication

Di Supabase Dashboard > Authentication > Settings:

1. **Site URL**: Set ke production domain Anda
2. **Redirect URLs**: Tambahkan:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback` (untuk development)

3. **Email Templates**: Customize email templates sesuai brand
4. **Providers**: Enable provider yang diinginkan (Google, GitHub, dll)

### 4. Deploy ke Vercel

#### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy dari project directory
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy to production
vercel --prod
```

#### Option 2: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `NEXT_PUBLIC_SITE_URL`: Your production domain
4. Deploy

### 5. Setup Custom Domain (Optional)

1. **Add Domain di Vercel**:
   - Project Settings > Domains
   - Add your custom domain

2. **Configure DNS**:
   ```
   Type: CNAME
   Name: www (atau subdomain yang diinginkan)
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**: Vercel automatically handles SSL

## 🛠️ Alternative Deployment Options

### Deploy ke Netlify

```bash
# Build untuk production
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

Environment variables di Netlify:
- Site Settings > Environment variables
- Add same environment variables seperti Vercel

### Deploy ke Railway

1. Connect GitHub repository ke Railway
2. Set environment variables
3. Railway akan auto-deploy on push

### Deploy ke AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

## 🔧 Production Optimizations

### 1. Performance

**next.config.js optimizations:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

### 2. Security Headers

**vercel.json security configuration:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 3. Analytics & Monitoring

**Add Google Analytics:**
```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}
```

**Add Vercel Analytics:**
```bash
npm i @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 📊 Monitoring & Maintenance

### 1. Error Monitoring

**Setup Sentry:**
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### 2. Performance Monitoring

**Vercel Speed Insights:**
```bash
npm i @vercel/speed-insights
```

**Web Vitals tracking:**
```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 3. Database Monitoring

- Monitor Supabase metrics di dashboard
- Set up alerts untuk high usage
- Regular database backups

## 🔄 CI/CD Pipeline

### GitHub Actions untuk Auto-Deploy

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build project
      run: npm run build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**:
   - Check TypeScript errors: `npm run type-check`
   - Verify environment variables
   - Check import paths

2. **Authentication Issues**:
   - Verify Supabase URL dan keys
   - Check Site URL di Supabase settings
   - Verify redirect URLs

3. **Database Connection**:
   - Check RLS policies
   - Verify table permissions
   - Test queries di Supabase SQL editor

4. **Performance Issues**:
   - Use Next.js built-in analytics
   - Check bundle size: `npm run build`
   - Optimize images dan assets

### Debug Commands

```bash
# Check build locally
npm run build && npm start

# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build

# Check TypeScript
npm run type-check

# Lint code
npm run lint
```

## 📞 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Project Issues**: GitHub Issues page

---

**Deployment Success! 🎉**

Platform Anda sekarang live dan ready untuk digunakan ribuan learners!