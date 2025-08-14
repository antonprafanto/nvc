import Hero from '@/components/sections/Hero'
import CourseOverview from '@/components/sections/CourseOverview'
import Features from '@/components/sections/Features'
import CTA from '@/components/sections/CTA'
import Layout from '@/components/layout/Layout'

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <CourseOverview />
      <Features />
      <CTA />
    </Layout>
  )
}