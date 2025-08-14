'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { 
  Trophy, 
  Target, 
  Clock, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Award,
  PlayCircle,
  CheckCircle,
  Star,
  Flame,
  Users
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { moduleData } from '@/data/modules'

export default function Dashboard() {
  // Mock user data - in real app, this would come from database
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    joinedDate: '2024-01-15',
    streak: 7,
    totalHours: 45,
    completedModules: 2,
    achievements: [
      { id: 1, name: 'First Steps', description: 'Completed first lesson', icon: '🎯', earnedAt: '2024-01-16' },
      { id: 2, name: 'Foundation Explorer', description: 'Completed Module 1', icon: '🏗️', earnedAt: '2024-01-25' },
      { id: 3, name: 'AI Whisperer', description: 'Completed Module 2', icon: '🤖', earnedAt: '2024-02-05' },
      { id: 4, name: 'Speed Reader', description: 'Read 10 lessons in a day', icon: '⚡', earnedAt: '2024-02-03' },
      { id: 5, name: 'Quiz Master', description: 'Passed 5 quizzes with 90%+ score', icon: '🎓', earnedAt: '2024-02-06' },
    ],
    recentActivity: [
      { id: 1, type: 'lesson', title: 'React Fundamentals', module: 'Building the Product', timestamp: '2 hours ago' },
      { id: 2, type: 'quiz', title: 'Prompting & AI Collaboration Quiz', score: 85, timestamp: 'Yesterday' },
      { id: 3, type: 'achievement', title: 'Earned "AI Whisperer" badge', timestamp: '2 days ago' },
      { id: 4, type: 'lesson', title: 'Advanced Prompting Strategies', module: 'Prompting & AI Collaboration', timestamp: '3 days ago' },
    ],
    moduleProgress: {
      1: { completed: true, progress: 100, score: 92 },
      2: { completed: true, progress: 100, score: 85 },
      3: { completed: false, progress: 35, score: null },
      4: { completed: false, progress: 0, score: null },
      5: { completed: false, progress: 0, score: null },
      6: { completed: false, progress: 0, score: null },
    }
  }

  const overallProgress = Math.round(
    Object.values(userData.moduleProgress).reduce((acc, module) => acc + module.progress, 0) / 
    Object.keys(userData.moduleProgress).length
  )

  const nextModule = moduleData.find(module => 
    userData.moduleProgress[module.id] && 
    !userData.moduleProgress[module.id].completed
  ) || moduleData.find(module => 
    userData.moduleProgress[module.id]?.progress === 0
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Selamat datang kembali, {userData.name}! 👋
                </h1>
                <p className="text-primary-100 text-lg">
                  Anda sudah belajar selama {userData.totalHours} jam dan menyelesaikan {userData.completedModules} modul. Keep going!
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-2xl font-bold mb-2">
                  <Flame className="h-6 w-6 mr-2 text-orange-300" />
                  {userData.streak} hari
                </div>
                <div className="text-primary-200 text-sm">
                  Learning Streak
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {overallProgress}%
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Overall Progress
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData.totalHours}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Jam Belajar
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData.achievements.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Achievements
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-success-600 dark:text-success-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData.completedModules}/6
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Modul Selesai
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {nextModule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PlayCircle className="h-5 w-5 mr-2 text-primary-600" />
                      Lanjutkan Belajar
                    </CardTitle>
                    <CardDescription>
                      Lanjutkan dari terakhir kali Anda belajar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${nextModule.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                        {nextModule.id}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {nextModule.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {nextModule.subtitle}
                        </p>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{userData.moduleProgress[nextModule.id]?.progress}%</span>
                          </div>
                          <Progress value={userData.moduleProgress[nextModule.id]?.progress} />
                        </div>
                        
                        <Link href={`/modules/${nextModule.id}`}>
                          <Button>
                            {userData.moduleProgress[nextModule.id]?.progress > 0 ? 'Lanjutkan' : 'Mulai'} Belajar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Module Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                    Progress Modul
                  </CardTitle>
                  <CardDescription>
                    Lihat kemajuan Anda di setiap modul pembelajaran
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moduleData.map((module) => {
                      const progress = userData.moduleProgress[module.id]
                      
                      return (
                        <div key={module.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                            {module.id}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {module.title}
                              </h4>
                              
                              <div className="flex items-center space-x-2">
                                {progress?.completed && (
                                  <Badge variant="success">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Selesai
                                  </Badge>
                                )}
                                
                                {progress?.score && (
                                  <Badge variant="outline">
                                    Score: {progress.score}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="mb-2">
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{progress?.progress || 0}%</span>
                              </div>
                              <Progress value={progress?.progress || 0} />
                            </div>
                            
                            <Link href={`/modules/${module.id}`}>
                              <Button size="sm" variant="outline">
                                {progress?.progress > 0 ? 'Lanjutkan' : 'Mulai'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                    Aktivitas Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'lesson' ? 'bg-blue-100 dark:bg-blue-900' :
                          activity.type === 'quiz' ? 'bg-green-100 dark:bg-green-900' :
                          'bg-yellow-100 dark:bg-yellow-900'
                        }`}>
                          {activity.type === 'lesson' && <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                          {activity.type === 'quiz' && <Target className="h-5 w-5 text-green-600 dark:text-green-400" />}
                          {activity.type === 'achievement' && <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                          {activity.type === 'lesson' && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Module: {activity.module}
                            </p>
                          )}
                          {activity.type === 'quiz' && activity.score && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Score: {activity.score}%
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary-600" />
                    Achievement Terbaru
                  </CardTitle>
                  <CardDescription>
                    Badge yang baru saja Anda raih
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.achievements.slice(0, 4).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {achievement.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(achievement.earnedAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/achievements">
                    <Button variant="outline" className="w-full mt-4">
                      Lihat Semua Achievement
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Flame className="h-5 w-5 mr-2 text-orange-600" />
                    Learning Streak
                  </CardTitle>
                  <CardDescription>
                    Jaga konsistensi belajar Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {userData.streak}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      hari berturut-turut
                    </p>
                    
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 rounded ${
                            i < userData.streak 
                              ? 'bg-orange-500' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Belajar minimal 30 menit per hari untuk mempertahankan streak
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary-600" />
                    Komunitas
                  </CardTitle>
                  <CardDescription>
                    Bergabung dengan sesama learner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Members
                      </span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Online Now
                      </span>
                      <span className="font-semibold text-green-600">89</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Your Rank
                      </span>
                      <Badge variant="secondary">#156</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Join Discord
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}