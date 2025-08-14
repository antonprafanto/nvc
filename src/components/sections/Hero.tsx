'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const stats = [
    { icon: Users, label: 'Pelajar Aktif', value: '1,000+' },
    { icon: BookOpen, label: 'Modul Pembelajaran', value: '6' },
    { icon: Award, label: 'Badge Tersedia', value: '20+' },
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              Platform Pembelajaran Terdepan
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bikin Website &{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                App Bareng AI
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Dulu bikin website & app butuh tim developer mahal dan waktu berbulan-bulan. Sekarang? 
              AI jadi partner coding kamu yang siap 24/7. Dari konsep di kepala sampai produk digital yang 
              bisa dipake user, semua bisa kamu lakuin sendiri. Zero to hero, literally!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto group">
                  Mulai Belajar Gratis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Lihat Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">M1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Foundations & Mindset
                      </h3>
                      <p className="text-sm text-gray-500">Ngoding Bareng AI</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      85%
                    </div>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                      <div className="w-14 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span>234 siswa</span>
                  <span className="mx-2">•</span>
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>12 materi</span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-success-400 to-success-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
              >
                🎉 Quiz Selesai!
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-secondary-400 to-secondary-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
              >
                ⚡ Badge Earned!
              </motion.div>
            </div>
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 dark:from-primary-900 dark:to-secondary-900 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}