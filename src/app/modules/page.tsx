import ModulesOverview from '@/components/modules/ModulesOverview'
import Layout from '@/components/layout/Layout'

export const metadata = {
  title: 'Modul Pembelajaran - VibeCoding',
  description: 'Jelajahi semua modul pembelajaran coding dari dasar hingga advanced. Belajar membangun produk digital dengan bantuan AI.',
}

export default function ModulesPage() {
  return (
    <Layout>
      <ModulesOverview />
    </Layout>
  )
}