import About from '@/components/pages/About'
import Layout from '@/components/layout/Layout'

export const metadata = {
  title: 'Tentang VibeCoding - Platform Pembelajaran Coding',
  description: 'Pelajari lebih lanjut tentang VibeCoding, misi kami, dan tim yang membangun platform pembelajaran coding terbaik untuk Indonesia.',
}

export default function AboutPage() {
  return (
    <Layout>
      <About />
    </Layout>
  )
}