'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  const benefits = [
    'Akses seumur hidup ke semua materi',
    'Bimbingan langsung dari mentor berpengalaman',
    'Sertifikat completion setiap modul',
    'Akses ke komunitas exclusive developer',
    'Update materi terbaru secara berkala',
    'Project portfolio yang bisa dipamerkan'
  ]

  const testimonials = [
    {
      name: 'Ahmad Rizki',
      role: 'UMKM Owner',
      content: 'Dalam 3 bulan saya sudah bisa bikin website toko online sendiri. Kursus ini benar-benar mengubah bisnis saya!',
      rating: 5
    },
    {
      name: 'Sari Wulandari',
      role: 'Fresh Graduate',
      content: 'Sebagai pemula total, saya sangat terbantu dengan pendekatan yang mudah dipahami. Sekarang saya sudah kerja sebagai developer.',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      role: 'Career Switcher',
      content: 'Umur 35 tahun saya berani switch career jadi developer. Platform ini memberikan confidence yang saya butuhkan.',
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Mulai Journey Coding Anda Hari Ini!
            </h2>
            
            <p className="text-xl text-primary-100 mb-8">
              Bergabung dengan ribuan orang yang sudah memulai karir sebagai developer. 
              Dapatkan skill yang dibutuhkan industri dan bangun masa depan yang lebih cerah.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center text-primary-100"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50 group"
                >
                  Mulai Belajar Gratis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/modules">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700"
                >
                  Lihat Kurikulum
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 text-primary-100 text-sm">
              <p>🎉 <strong>Promo Terbatas:</strong> Daftar sekarang dan dapatkan akses gratis ke semua materi premium!</p>
            </div>
          </motion.div>
          
          {/* Right Content - Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Apa Kata Mereka?
              </h3>
              <p className="text-primary-100">
                Dengar langsung dari alumni yang sudah sukses
              </p>
            </div>
            
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-white mb-4 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-primary-200 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">1,000+</div>
                <div className="text-primary-100">Developer Sukses</div>
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-white ml-2 text-sm">4.9/5 Rating</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}