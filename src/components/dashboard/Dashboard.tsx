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
  Users,
  BookOpenCheck,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { moduleData } from '@/data/modules'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface UserProgress {
  id: string
  module_id: string
  lesson_id?: string
  completed: boolean
  progress_percentage: number
  completed_at?: string
}

interface Achievement {
  id: string
  badge_id: string
  badge_name: string
  badge_description?: string
  badge_icon?: string
  earned_at: string
}

interface LearningStreak {
  current_streak: number
  longest_streak: number
  last_activity_date: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [userData, setUserData] = useState({
    name: user?.user_metadata?.full_name || user?.email || 'User',
    email: user?.email || '',
    joinedDate: user?.created_at || new Date().toISOString(),
    streak: 0,
    totalHours: 0,
    completedModules: 0,
    achievements: [] as Achievement[],
    recentActivity: [] as any[],
    moduleProgress: {} as Record<number, { completed: boolean; progress: number; score: number | null }>
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      // If no user, set default empty state and stop loading
      setLoading(false)
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)

      // Fetch achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })

      // Fetch learning streak
      const { data: streakData } = await supabase
        .from('learning_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // Process progress data
      const moduleProgress: Record<number, { completed: boolean; progress: number; score: number | null }> = {}
      let completedModules = 0

      progressData?.forEach((progress: UserProgress) => {
        const moduleId = parseInt(progress.module_id)
        moduleProgress[moduleId] = {
          completed: progress.completed,
          progress: progress.progress_percentage,
          score: null // Quiz scores would come from quiz_results table
        }
        if (progress.completed) completedModules++
      })

      // Initialize all modules with 0 progress if not found
      moduleData.forEach(module => {
        if (!moduleProgress[module.id]) {
          moduleProgress[module.id] = {
            completed: false,
            progress: 0,
            score: null
          }
        }
      })

      setUserData(prev => ({
        ...prev,
        streak: streakData?.current_streak || 0,
        completedModules,
        achievements: achievementsData || [],
        moduleProgress,
        recentActivity: [] // TODO: Implement recent activity tracking
      }))

    } catch (error) {
      console.error('Error fetching user data:', error)
      // Set default empty state on error
      setUserData(prev => ({
        ...prev,
        streak: 0,
        completedModules: 0,
        achievements: [],
        moduleProgress: {},
        recentActivity: []
      }))
    } finally {
      setLoading(false)
    }
  }

  const overallProgress = Object.keys(userData.moduleProgress).length > 0 
    ? Math.round(
        Object.values(userData.moduleProgress).reduce((acc, module) => acc + module.progress, 0) / 
        Object.keys(userData.moduleProgress).length
      )
    : 0

  const nextModule = moduleData.find(module => 
    userData.moduleProgress[module.id] && 
    !userData.moduleProgress[module.id].completed
  ) || moduleData.find(module => 
    userData.moduleProgress[module.id]?.progress === 0
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl h-40 mb-8"></div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 dark:bg-gray-700 rounded-lg h-24"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isNewUser = userData.completedModules === 0 && userData.achievements.length === 0

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
                  {isNewUser ? `Selamat datang, ${userData.name}! 🎉` : `Selamat datang kembali, ${userData.name}! 👋`}
                </h1>
                <p className="text-primary-100 text-lg">
                  {isNewUser 
                    ? "Mari mulai perjalanan coding Anda! Pilih modul pertama untuk memulai belajar."
                    : `Anda sudah belajar selama ${userData.totalHours} jam dan menyelesaikan ${userData.completedModules} modul. Keep going!`
                  }
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
                  {userData.recentActivity.length > 0 ? (
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
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Belum ada aktivitas</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Mulai belajar untuk melihat aktivitas Anda di sini
                      </p>
                    </div>
                  )}
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
                  {userData.achievements.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {userData.achievements.slice(0, 4).map((achievement) => (
                          <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                            <div className="text-2xl">{achievement.badge_icon || '🏆'}</div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {achievement.badge_name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {achievement.badge_description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(achievement.earned_at).toLocaleDateString('id-ID')}
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
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Belum ada achievement</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                        Selesaikan lesson dan quiz untuk mendapatkan badge pertama Anda
                      </p>
                      <Link href="/modules">
                        <Button size="sm">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Mulai Belajar
                        </Button>
                      </Link>
                    </div>
                  )}
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