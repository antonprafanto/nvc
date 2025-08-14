'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: 'anton.prafanto@gmail.com',
      description: 'Kirim email untuk pertanyaan umum',
      action: 'mailto:anton.prafanto@gmail.com'
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      info: '+62 811-5533-93',
      description: 'Untuk bantuan urgent',
      action: 'https://wa.me/6281155339'
    },
    {
      icon: MapPin,
      title: 'Office',
      info: 'Samarinda, Indonesia',
      description: 'Kantor pusat kami',
      action: '#'
    }
  ]

  const faqs = [
    {
      question: 'Apakah VibeCoding benar-benar gratis?',
      answer: 'Ya! Semua modul dasar kami gratis. Kami juga menyediakan premium features untuk experience yang lebih enhanced.'
    },
    {
      question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan semua modul?',
      answer: 'Rata-rata students menyelesaikan semua 6 modul dalam 3-6 bulan, tergantung pada pace belajar masing-masing.'
    },
    {
      question: 'Apakah ada certificate setelah menyelesaikan course?',
      answer: 'Ya, Anda akan mendapat certificate of completion untuk setiap modul yang diselesaikan dengan passing score.'
    },
    {
      question: 'Bisakah saya belajar tanpa background programming sama sekali?',
      answer: 'Absolutely! Course kami dirancang khusus untuk complete beginners. Tidak ada prerequisite programming knowledge.'
    },
    {
      question: 'Bagaimana sistem mentoring dan support nya?',
      answer: 'Kami menyediakan community support 24/7, weekly office hours dengan instructors, dan 1-on-1 mentoring untuk premium members.'
    }
  ]

  const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/ngevibecoding', icon: '📱' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Pesan Terkirim!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Terima kasih sudah menghubungi kami. Tim kami akan merespons dalam 24 jam.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                Kirim Pesan Lain
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Hubungi{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Kami
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Punya pertanyaan tentang VibeCoding? Tim kami siap membantu Anda memulai journey coding yang amazing!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                  <CardDescription>
                    Isi form di bawah dan kami akan merespons secepat mungkin
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Nama Anda"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="nama@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategori Pertanyaan
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input"
                      >
                        <option value="general">Pertanyaan Umum</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Payment</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="Topik pesan Anda"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pesan *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="input resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info & FAQs */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Kontak Langsung</CardTitle>
                  <CardDescription>
                    Pilih cara yang paling nyaman untuk Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.action}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <contact.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {contact.title}
                        </h4>
                        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {contact.info}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {contact.description}
                        </p>
                      </div>
                    </a>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      Response Time
                    </div>
                    <p className="text-sm">
                      <span className="font-medium text-success-600">Email:</span> 24 jam<br />
                      <span className="font-medium text-success-600">WhatsApp:</span> 2-4 jam
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>
                    Stay updated dengan content dan community kami
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        <span className="text-lg">{social.icon}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {social.name}
                        </span>
                        <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>FAQ Singkat</CardTitle>
                  <CardDescription>
                    Pertanyaan yang sering ditanyakan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Lihat Semua FAQ
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