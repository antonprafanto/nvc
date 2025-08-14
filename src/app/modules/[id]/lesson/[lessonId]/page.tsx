import { notFound } from 'next/navigation'
import LessonDetail from '@/components/modules/LessonDetail'
import Layout from '@/components/layout/Layout'
import { moduleData } from '@/data/modules'

interface LessonPageProps {
  params: {
    id: string
    lessonId: string
  }
}

export async function generateStaticParams() {
  const paths: { id: string; lessonId: string }[] = []
  
  moduleData.forEach((module) => {
    module.lessons.forEach((lesson) => {
      paths.push({
        id: module.id.toString(),
        lessonId: lesson.id.toString(),
      })
    })
  })
  
  return paths
}

export async function generateMetadata({ params }: LessonPageProps) {
  const module = moduleData.find(m => m.id.toString() === params.id)
  const lesson = module?.lessons.find(l => l.id.toString() === params.lessonId)
  
  if (!module || !lesson) {
    return {
      title: 'Lesson Not Found - VibeCoding'
    }
  }

  return {
    title: `${lesson.title} - ${module.title} - VibeCoding`,
    description: lesson.description,
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const module = moduleData.find(m => m.id.toString() === params.id)
  const lesson = module?.lessons.find(l => l.id.toString() === params.lessonId)

  if (!module || !lesson) {
    notFound()
  }

  return (
    <Layout>
      <LessonDetail module={module} lesson={lesson} />
    </Layout>
  )
}