import { notFound } from 'next/navigation'
import ModuleDetail from '@/components/modules/ModuleDetail'
import Layout from '@/components/layout/Layout'
import { moduleData } from '@/data/modules'

interface ModulePageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return moduleData.map((module) => ({
    id: module.id.toString(),
  }))
}

export async function generateMetadata({ params }: ModulePageProps) {
  const module = moduleData.find(m => m.id.toString() === params.id)
  
  if (!module) {
    return {
      title: 'Module Not Found - VibeCoding'
    }
  }

  return {
    title: `${module.title} - VibeCoding`,
    description: module.description,
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const module = moduleData.find(m => m.id.toString() === params.id)

  if (!module) {
    notFound()
  }

  return (
    <Layout>
      <ModuleDetail module={module} />
    </Layout>
  )
}