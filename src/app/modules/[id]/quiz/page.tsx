import { notFound } from 'next/navigation'
import QuizComponent from '@/components/quiz/QuizComponent'
import Layout from '@/components/layout/Layout'
import { moduleData } from '@/data/modules'

interface QuizPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return moduleData
    .filter(module => module.quiz)
    .map((module) => ({
      id: module.id.toString(),
    }))
}

export async function generateMetadata({ params }: QuizPageProps) {
  const module = moduleData.find(m => m.id.toString() === params.id)
  
  if (!module || !module.quiz) {
    return {
      title: 'Quiz Not Found - VibeCoding'
    }
  }

  return {
    title: `Quiz: ${module.title} - VibeCoding`,
    description: module.quiz.description,
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const module = moduleData.find(m => m.id.toString() === params.id)

  if (!module || !module.quiz) {
    notFound()
  }

  return (
    <Layout>
      <QuizComponent module={module} quiz={module.quiz} />
    </Layout>
  )
}