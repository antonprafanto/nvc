import Dashboard from '@/components/dashboard/Dashboard'
import Layout from '@/components/layout/Layout'

export const metadata = {
  title: 'Dashboard - VibeCoding',
  description: 'Track your learning progress, achievements, and manage your coding journey.',
}

export default function DashboardPage() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}