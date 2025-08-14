'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Zap, Target, BookOpen, Users, Trophy, Smartphone, Monitor, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Pembelajaran Berbasis AI',
      description: 'Belajar coding modern dengan bantuan AI assistant yang memandu setiap langkah Anda.',
      badge: 'AI-Powered',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Target,
      title: 'Project-Based Learning',
      description: 'Setiap modul menghasilkan project nyata yang bisa Anda masukkan ke portfolio.',
      badge: 'Hands-on',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Kurikulum Terstruktur',
      description: 'Materi disusun sistematis dari dasar hingga advanced untuk hasil pembelajaran optimal.',
      badge: 'Structured',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Komunitas Aktif',
      description: 'Bergabung dengan komunitas developer Indonesia yang saling support dan sharing.',
      badge: 'Community',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Sistem Gamifikasi',
      description: 'Raih badge dan achievement untuk memotivasi perjalanan belajar Anda.',
      badge: 'Gamified',
      color: 'from-red-400 to-rose-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly',
      description: 'Belajar kapan saja, di mana saja dengan interface yang responsif di semua device.',
      badge: 'Responsive',
      color: 'from-teal-400 to-cyan-500'
    }
  ]

  const learningMethods = [
    {
      icon: Monitor,
      title: 'Video Pembelajaran',
      description: 'Video berkualitas tinggi dengan penjelasan step-by-step yang mudah dipahami.'
    },
    {
      icon: BookOpen,
      title: 'Materi Interaktif',
      description: 'Konten text yang dilengkapi dengan contoh code dan latihan interaktif.'
    },
    {
      icon: Target,
      title: 'Quiz & Assessment',
      description: 'Evaluasi pemahaman dengan quiz yang menantang dan feedback real-time.'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Belajar sesuai ritme Anda sendiri dengan akses 24/7 ke semua materi.'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kenapa Pilih VibeCoding?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Platform pembelajaran baru yang dibuat khusus untuk orang non-IT. Belajar membuat website dan aplikasi dengan bantuan AI, tanpa perlu background programming.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learning Methods */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Metode Pembelajaran yang Efektif
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Kombinasi berbagai metode pembelajaran untuk memastikan Anda benar-benar memahami dan bisa mempraktikkan ilmu yang dipelajari.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {method.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {method.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                Baru
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Platform Launch
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                6
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Modul Pembelajaran
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
                45k
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Premium / Bulan
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                2-6h
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Response Time
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}