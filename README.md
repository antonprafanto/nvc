# VibeCoding - Platform Pembelajaran Coding Modern

Platform pembelajaran coding mandiri yang dirancang khusus untuk pemula di Indonesia. Belajar membangun produk digital dari nol dengan bantuan AI dan kurikulum yang terstruktur.

## 🚀 Features

### Core Features
- **6 Modul Pembelajaran Komprehensif** - Dari dasar hingga advanced
- **AI-Powered Learning** - Integrasi dengan AI assistant untuk coding
- **Interactive Learning** - Quiz, hands-on practice, dan project-based learning
- **Progress Tracking** - Dashboard lengkap untuk monitoring progress
- **Gamification** - Badge system dan achievement untuk motivasi
- **Responsive Design** - Mobile-first design untuk belajar di mana saja

### Technical Features
- **Next.js 14** - Latest React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service untuk auth dan database
- **Framer Motion** - Smooth animations dan micro-interactions
- **Dark Mode** - Built-in dark/light theme toggle

## 📚 Kurikulum

### Module 1: Foundations & Mindset - Ngoding Bareng AI
- Pengenalan dunia programming
- Mindset developer yang sukses
- Berkenalan dengan AI coding assistant
- Setup development environment

### Module 2: Prompting & AI Collaboration
- Teknik prompting efektif untuk coding
- Debugging dengan AI
- Best practices AI collaboration

### Module 3: Building the Product (Frontend & Backend)
- React fundamentals dan modern patterns
- Node.js dan Express API development
- Database integration dengan Prisma
- Full-stack project development

### Module 4: Infrastructure & Security
- Deployment ke cloud platforms
- Security best practices
- Monitoring dan logging
- CI/CD pipeline setup

### Module 5: Optimization & Tracking
- Performance optimization techniques
- Analytics dan user tracking
- A/B testing implementation

### Module 6: Monetization & Growth
- Business model untuk produk digital
- Growth hacking strategies
- Scaling architecture dan team

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - PostgreSQL database, authentication, real-time
- **Prisma** - Type-safe database ORM (optional)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting (recommended)
- **VS Code Extensions** - Development experience

### Deployment
- **Vercel** - Frontend hosting dan deployment
- **Supabase** - Backend infrastructure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Supabase account (untuk backend)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/your-username/vibecoding-platform.git
cd vibecoding-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` dengan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Setup Supabase Database**

Buat tables berikut di Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- User progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz results table
CREATE TABLE quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  module_id TEXT NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for user_progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Similar policies for quiz_results and achievements
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

5. **Run development server**
```bash
npm run dev
```

6. **Open application**
Navigate ke [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── auth/              # Authentication pages
│   ├── modules/           # Learning modules
│   ├── dashboard/         # User dashboard
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── sections/          # Homepage sections
│   ├── modules/           # Module-related components
│   ├── quiz/              # Quiz system
│   ├── dashboard/         # Dashboard components
│   ├── pages/             # Page-specific components
│   └── providers/         # Context providers
├── data/
│   └── modules.ts         # Module content data
├── hooks/
│   ├── useAuth.ts         # Authentication hook
│   └── useTheme.ts        # Theme toggle hook
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript type definitions
```

## 🎨 Customization

### Theming
Platform menggunakan Tailwind CSS dengan custom color palette:

```css
/* Primary colors */
primary: {
  50: '#f0f9ff',
  500: '#0ea5e9',
  600: '#0284c7',
  // ... other shades
}

/* Secondary colors */
secondary: {
  50: '#fdf4ff', 
  500: '#d946ef',
  600: '#c026d3',
  // ... other shades
}
```

### Adding New Modules
1. Edit `src/data/modules.ts`
2. Add module content dengan structure yang sudah ada
3. Create lesson pages di `src/app/modules/[id]/lesson/[lessonId]/`

### Custom Components
Semua UI components ada di `src/components/ui/` dan menggunakan consistent design patterns.

## 🚀 Deployment

### Deploy ke Vercel

1. **Connect repository ke Vercel**
```bash
npm install -g vercel
vercel
```

2. **Set environment variables di Vercel dashboard**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `NEXT_PUBLIC_SITE_URL`

3. **Deploy**
```bash
vercel --prod
```

### Alternative Deployment Options
- **Netlify** - Import dari Git repository
- **Railway** - Connect GitHub dan auto-deploy
- **AWS Amplify** - Full-stack deployment

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality
```bash
# Install recommended extensions untuk VS Code
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

## 📱 Features Roadmap

### Phase 1 (Current)
- ✅ Basic learning platform
- ✅ User authentication
- ✅ Module system dengan quiz
- ✅ Progress tracking
- ✅ Responsive design

### Phase 2 (Next)
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Advanced AI tutoring

### Phase 3 (Future)
- [ ] Live coding sessions
- [ ] Peer programming features
- [ ] Certification system
- [ ] Job placement assistance
- [ ] Enterprise solutions

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind untuk semua styling
- Write meaningful commit messages
- Add proper error handling
- Test pada multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Documentation**: [docs.vibecoding.com](https://docs.vibecoding.com)
- **Community Discord**: [discord.gg/vibecoding](https://discord.gg/vibecoding)
- **Email Support**: hello@vibecoding.com
- **GitHub Issues**: [Issues page](https://github.com/your-username/vibecoding-platform/issues)

## 🙏 Acknowledgments

- [Next.js team](https://nextjs.org) untuk amazing framework
- [Tailwind CSS](https://tailwindcss.com) untuk utility-first CSS
- [Supabase](https://supabase.com) untuk backend infrastructure
- [Lucide](https://lucide.dev) untuk beautiful icons
- Indonesian developer community untuk inspiration

---

**Happy Coding! 🚀**

Built with ❤️ untuk developer Indonesia.