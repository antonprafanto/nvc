'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Clock, Users, Award, BookOpen, Lock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { moduleData } from '@/data/modules'

export default function ModulesOverview() {
  // Mock progress data - in real app, this would come from user's progress
  const userProgress = {
    1: { completed: true, progress: 100 },
    2: { completed: false, progress: 75 },
    3: { completed: false, progress: 25 },
    4: { completed: false, progress: 0 },
    5: { completed: false, progress: 0 },
    6: { completed: false, progress: 0 },
  }

  const difficultyColors = {
    'Pemula': 'success',
    'Menengah': 'secondary', 
    'Lanjutan': 'destructive'
  } as const

  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true
    const previousModule = moduleData.find(m => m.id === moduleId - 1)
    return previousModule ? userProgress[previousModule.id]?.completed : false
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Modul Pembelajaran
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              6 modul komprehensif yang akan membawa Anda dari pemula total hingga developer yang siap membangun produk digital.
            </p>
          </motion.div>
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-12 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                2/6
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Modul Selesai
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                33%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Progress Keseluruhan
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
                24
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Jam Belajar
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Badge Earned
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress Keseluruhan</span>
              <span>33%</span>
            </div>
            <Progress value={33} className="h-3" />
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {moduleData.map((module, index) => {
            const progress = userProgress[module.id] || { completed: false, progress: 0 }
            const isUnlocked = isModuleUnlocked(module.id)
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full transition-all duration-300 ${
                  isUnlocked 
                    ? 'hover:shadow-lg cursor-pointer border-primary-200 dark:border-primary-800' 
                    : 'opacity-60 cursor-not-allowed'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                        {module.id}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant={difficultyColors[module.difficulty]}>
                          {module.difficulty}
                        </Badge>
                        
                        {progress.completed && (
                          <Badge variant="success" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Selesai
                          </Badge>
                        )}
                        
                        {!isUnlocked && (
                          <Badge variant="secondary" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Terkunci
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="font-medium text-primary-600 dark:text-primary-400">
                      {module.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {module.description}
                    </p>
                    
                    {/* Module Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {module.duration}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {module.lessons.length} lessons
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        {module.estimatedHours} jam
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Award className="h-4 w-4 mr-2" />
                        {module.badge?.name}
                      </div>
                    </div>
                    
                    {/* Progress */}
                    {isUnlocked && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span>Progress</span>
                          <span>{progress.progress}%</span>
                        </div>
                        <Progress value={progress.progress} />
                      </div>
                    )}
                    
                    {/* Prerequisites */}
                    {module.prerequisites.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Prerequisites:
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {module.prerequisites.map((prereq, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-success-500" />
                              {prereq}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="flex gap-2">
                      {isUnlocked ? (
                        <>
                          <Link href={`/modules/${module.id}`} className="flex-1">
                            <Button className="w-full">
                              {progress.progress > 0 ? 'Lanjutkan' : 'Mulai Module'}
                            </Button>
                          </Link>
                          
                          {progress.progress > 0 && (
                            <Link href={`/modules/${module.id}/lesson/${module.lessons[0]?.id}`}>
                              <Button variant="outline" size="sm">
                                Resume
                              </Button>
                            </Link>
                          )}
                        </>
                      ) : (
                        <Button disabled className="w-full">
                          <Lock className="h-4 w-4 mr-2" />
                          Selesaikan modul sebelumnya
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
        
        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Badge yang Bisa Anda Raih
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {moduleData.map((module) => (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-4 border ${
                  userProgress[module.id]?.completed
                    ? 'border-success-200 bg-success-50 dark:bg-success-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{module.badge?.icon}</div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {module.badge?.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {module.badge?.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}