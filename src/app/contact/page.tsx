import Contact from '@/components/pages/Contact'
import Layout from '@/components/layout/Layout'

export const metadata = {
  title: 'Hubungi Kami - VibeCoding',
  description: 'Ada pertanyaan tentang platform pembelajaran coding kami? Hubungi tim VibeCoding untuk mendapatkan bantuan dan informasi lebih lanjut.',
}

export default function ContactPage() {
  return (
    <Layout>
      <Contact />
    </Layout>
  )
}