'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Brain, MessageSquare, Code, Shield, TrendingUp, DollarSign, Users, Clock, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CourseOverview() {
  const modules = [
    {
      id: 1,
      icon: Brain,
      title: 'Foundations & Mindset',
      subtitle: 'Ngoding Bareng AI',
      description: 'Membangun pola pikir developer dan memahami peran AI dalam coding modern.',
      duration: '2 minggu',
      lessons: 8,
      difficulty: 'Pemula',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: MessageSquare,
      title: 'Prompting & AI Collaboration',
      subtitle: 'Berkomunikasi dengan AI',
      description: 'Teknik prompting efektif dan kolaborasi optimal dengan AI coding assistant.',
      duration: '1 minggu',
      lessons: 6,
      difficulty: 'Pemula',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      icon: Code,
      title: 'Building the Product',
      subtitle: 'Frontend & Backend',
      description: 'Membangun aplikasi web lengkap dari frontend hingga backend.',
      duration: '4 minggu',
      lessons: 16,
      difficulty: 'Menengah',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      icon: Shield,
      title: 'Infrastructure & Security',
      subtitle: 'Deploy & Secure',
      description: 'Deployment, keamanan, dan infrastruktur aplikasi di production.',
      duration: '2 minggu',
      lessons: 10,
      difficulty: 'Menengah',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 5,
      icon: TrendingUp,
      title: 'Optimization & Tracking',
      subtitle: 'Performance & Analytics',
      description: 'Optimasi performa dan implementasi tracking untuk analytics.',
      duration: '2 minggu',
      lessons: 8,
      difficulty: 'Lanjutan',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 6,
      icon: DollarSign,
      title: 'Monetization & Growth',
      subtitle: 'Scaling Business',
      description: 'Strategi monetisasi dan pertumbuhan produk digital.',
      duration: '2 minggu',
      lessons: 10,
      difficulty: 'Lanjutan',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const difficultyColors = {
    'Pemula': 'success',
    'Menengah': 'secondary',
    'Lanjutan': 'destructive'
  } as const

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kurikulum Pembelajaran
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              6 modul komprehensif yang dirancang khusus untuk membawa Anda dari pemula total hingga developer yang siap membangun produk digital.
            </p>
          </motion.div>
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">13 Minggu</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Durasi</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg mx-auto mb-4">
                <Users className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">58 Materi</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Lessons</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg mx-auto mb-4">
                <Award className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">20+ Badge</h3>
              <p className="text-gray-600 dark:text-gray-400">Achievements</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-4">
                <Code className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">6 Projek</h3>
              <p className="text-gray-600 dark:text-gray-400">Hands-on Practice</p>
            </div>
          </motion.div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant={difficultyColors[module.difficulty as keyof typeof difficultyColors]}>
                      {module.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Module {module.id}: {module.title}
                  </CardTitle>
                  <CardDescription className="font-medium text-primary-600 dark:text-primary-400">
                    {module.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {module.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {module.lessons} lessons
                    </div>
                  </div>
                  
                  <Progress value={0} className="mb-4" />
                  
                  <Link href={`/modules/${module.id}`}>
                    <Button variant="outline" className="w-full group-hover:bg-primary-50 dark:group-hover:bg-primary-900 transition-colors">
                      Mulai Module
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Siap memulai perjalanan coding Anda?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan pelajar lain yang sudah memulai journey mereka menjadi developer handal.
          </p>
          <Link href="/auth/register">
            <Button size="lg">
              Coba 2 Modul Gratis!
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}