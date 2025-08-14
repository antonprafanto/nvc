'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Clock, Users, Award, BookOpen, Play, CheckCircle, Lock, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Module } from '@/data/modules'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ModuleDetailProps {
  module: Module
}

interface UserProgress {
  moduleProgress: number
  completedLessons: number[]
  currentLesson: number | null
}

export default function ModuleDetail({ module }: ModuleDetailProps) {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState<UserProgress>({
    moduleProgress: 0,
    completedLessons: [],
    currentLesson: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserProgress()
    } else {
      setUserProgress({ moduleProgress: 0, completedLessons: [], currentLesson: null })
      setLoading(false)
    }
  }, [user, module.id])

  const fetchUserProgress = async () => {
    if (!user) return

    try {
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', module.id.toString())
        .single()

      if (progressData) {
        setUserProgress({
          moduleProgress: progressData.progress_percentage || 0,
          completedLessons: [], // TODO: Track individual lessons
          currentLesson: progressData.lesson_id ? parseInt(progressData.lesson_id) : null
        })
      }
    } catch (error) {
      console.error('Error fetching user progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const difficultyColors = {
    'Pemula': 'success',
    'Menengah': 'secondary', 
    'Lanjutan': 'destructive'
  } as const

  const isLessonCompleted = (lessonId: number) => {
    return userProgress.completedLessons.includes(lessonId)
  }

  const isLessonUnlocked = (lessonIndex: number) => {
    return lessonIndex === 0 || isLessonCompleted(module.lessons[lessonIndex - 1].id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-xl h-64 mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-300 dark:bg-gray-700 rounded-lg h-20"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link 
            href="/modules" 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Modul
          </Link>
        </motion.div>

        {/* Module Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mr-4`}>
                  {module.id}
                </div>
                <div>
                  <Badge variant={difficultyColors[module.difficulty]} className="mb-2">
                    {module.difficulty}
                  </Badge>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {module.title}
                  </h1>
                  <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                    {module.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {module.longDescription}
              </p>
              
              {/* Learning Outcomes */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Yang Akan Anda Pelajari:
                </h3>
                <ul className="space-y-2">
                  {module.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Module Stats */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Modul</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      Durasi
                    </div>
                    <span className="font-medium">{module.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Lessons
                    </div>
                    <span className="font-medium">{module.lessons.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      Est. Jam
                    </div>
                    <span className="font-medium">{module.estimatedHours} jam</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Award className="h-4 w-4 mr-2" />
                      Badge
                    </div>
                    <span className="font-medium">{module.badge?.icon} {module.badge?.name}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{userProgress.moduleProgress}%</span>
                    </div>
                    <Progress value={userProgress.moduleProgress} />
                  </div>
                  
                  <Link href={`/modules/${module.id}/lesson/${module.lessons[0].id}`}>
                    <Button className="w-full mt-4">
                      {userProgress.moduleProgress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Lessons List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Daftar Materi
          </h2>
          
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(lesson.id)
              const isUnlocked = isLessonUnlocked(index)
              const isCurrent = userProgress.currentLesson === lesson.id
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className={`transition-all duration-200 ${
                    isUnlocked 
                      ? 'hover:shadow-md cursor-pointer' 
                      : 'opacity-60 cursor-not-allowed'
                  } ${
                    isCurrent ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            isCompleted 
                              ? 'bg-success-500 text-white' 
                              : isCurrent
                              ? 'bg-primary-500 text-white'
                              : isUnlocked 
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : !isUnlocked ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <span className="font-medium">{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {lesson.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {lesson.description}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {lesson.duration} menit
                              </div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {isCurrent && (
                            <Badge variant="secondary" className="text-xs">
                              Sedang Belajar
                            </Badge>
                          )}
                          
                          {isUnlocked ? (
                            <Link href={`/modules/${module.id}/lesson/${lesson.id}`}>
                              <Button 
                                variant={isCompleted ? "outline" : "default"}
                                size="sm"
                                className="ml-4"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                {isCompleted ? 'Review' : isCurrent ? 'Lanjutkan' : 'Mulai'}
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="outline" size="sm" disabled className="ml-4">
                              <Lock className="h-4 w-4 mr-2" />
                              Terkunci
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Quiz Section */}
        {module.quiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-primary-900 dark:text-primary-100">
                      📝 {module.quiz.title}
                    </CardTitle>
                    <CardDescription className="text-primary-700 dark:text-primary-300">
                      {module.quiz.description}
                    </CardDescription>
                  </div>
                  <Badge className="bg-primary-500 text-white">
                    {module.quiz.questions.length} Pertanyaan
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-primary-700 dark:text-primary-300">
                    <p>Passing Score: <span className="font-medium">{module.quiz.passingScore}%</span></p>
                    <p>Selesaikan semua lessons untuk unlock quiz</p>
                  </div>
                  
                  <Button 
                    disabled={userProgress.moduleProgress < 100}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    {userProgress.moduleProgress < 100 ? 'Selesaikan Lessons' : 'Mulai Quiz'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}