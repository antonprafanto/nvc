'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Module, Lesson } from '@/data/modules'

interface LessonDetailProps {
  module: Module
  lesson: Lesson
}

export default function LessonDetail({ module, lesson }: LessonDetailProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const currentLessonIndex = module.lessons.findIndex(l => l.id === lesson.id)
  const nextLesson = module.lessons[currentLessonIndex + 1]
  const prevLesson = module.lessons[currentLessonIndex - 1]

  const handleComplete = () => {
    setIsCompleted(true)
    // In real app, this would update the backend
  }

  const handleScrollProgress = () => {
    const contentElement = document.getElementById('lesson-content')
    if (contentElement) {
      const scrollTop = contentElement.scrollTop
      const scrollHeight = contentElement.scrollHeight - contentElement.clientHeight
      const progress = Math.round((scrollTop / scrollHeight) * 100)
      setReadingProgress(Math.min(progress, 100))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <Link 
                href={`/modules/${module.id}`}
                className="flex items-center text-primary-600 hover:text-primary-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Kembali ke Modul</span>
              </Link>
              
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {lesson.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {module.title} - Lesson {currentLessonIndex + 1} of {module.lessons.length}
                </p>
              </div>
            </div>
            
            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration} menit</span>
              </div>
              
              <Badge variant={lesson.type === 'video' ? 'default' : lesson.type === 'interactive' ? 'secondary' : 'outline'}>
                {lesson.type}
              </Badge>
              
              {!isCompleted ? (
                <Button onClick={handleComplete} size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Tandai Selesai
                </Button>
              ) : (
                <Badge variant="success">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Selesai
                </Badge>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={readingProgress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Progress Membaca</span>
              <span>{readingProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Video Player (if video type) */}
                  {lesson.type === 'video' && lesson.videoUrl && (
                    <div className="mb-8">
                      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            size="lg"
                            onClick={() => setVideoPlaying(!videoPlaying)}
                            className="bg-primary-600 hover:bg-primary-700"
                          >
                            {videoPlaying ? (
                              <Pause className="h-6 w-6 mr-2" />
                            ) : (
                              <Play className="h-6 w-6 mr-2" />
                            )}
                            {videoPlaying ? 'Pause' : 'Play'} Video
                          </Button>
                        </div>
                        
                        {/* Video controls placeholder */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/50 rounded px-3 py-2 text-white text-sm">
                            Video Player - {lesson.duration} minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Lesson Content */}
                  <div 
                    id="lesson-content"
                    className="prose dark:prose-invert max-w-none"
                    onScroll={handleScrollProgress}
                    style={{ maxHeight: '70vh', overflowY: 'auto' }}
                  >
                    <div dangerouslySetInnerHTML={{ 
                      __html: lesson.content.replace(/\n/g, '<br />').replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
                    }} />
                  </div>
                  
                  {/* Interactive Elements (if interactive type) */}
                  {lesson.type === 'interactive' && (
                    <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                      <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
                        💡 Interactive Exercise
                      </h3>
                      <p className="text-primary-700 dark:text-primary-300 mb-4">
                        Coba praktikkan konsep yang telah dipelajari dengan exercise berikut:
                      </p>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                        <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded">
                          {`// Contoh exercise untuk lesson ini
// Silakan ikuti instruksi di atas untuk praktik

console.log("Hello from VibeCoding!");`}
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Run Code
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Lesson Navigation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Navigasi Lesson</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {prevLesson && (
                      <Link href={`/modules/${module.id}/lesson/${prevLesson.id}`}>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          <div className="text-left">
                            <div className="text-xs text-gray-500">Previous</div>
                            <div className="truncate">{prevLesson.title}</div>
                          </div>
                        </Button>
                      </Link>
                    )}
                    
                    {nextLesson && (
                      <Link href={`/modules/${module.id}/lesson/${nextLesson.id}`}>
                        <Button size="sm" className="w-full justify-start">
                          <div className="text-left mr-2">
                            <div className="text-xs text-primary-200">Next</div>
                            <div className="truncate">{nextLesson.title}</div>
                          </div>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    
                    {!nextLesson && (
                      <Link href={`/modules/${module.id}`}>
                        <Button size="sm" className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Selesai Module
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* All Lessons List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Semua Lessons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lessonItem, index) => (
                        <Link 
                          key={lessonItem.id}
                          href={`/modules/${module.id}/lesson/${lessonItem.id}`}
                        >
                          <div className={`p-3 rounded-lg border transition-colors ${
                            lessonItem.id === lesson.id
                              ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}>
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                                lessonItem.id === lesson.id
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                              }`}>
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${
                                  lessonItem.id === lesson.id
                                    ? 'text-primary-900 dark:text-primary-100'
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {lessonItem.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {lessonItem.duration} min
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Study Notes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">📝 Catatan Study</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      placeholder="Tulis catatan Anda di sini..."
                      className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                    <Button size="sm" className="w-full mt-3">
                      Simpan Catatan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}