'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  Target, 
  Heart, 
  Users, 
  Lightbulb,
  Globe,
  Zap,
  Star,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  const team = [
    {
      name: 'Ahmad Sutrisno',
      role: 'Founder & Lead Instructor',
      bio: 'Ex-Google engineer dengan 8+ tahun pengalaman. Passionate about education dan democratizing coding knowledge.',
      avatar: '👨‍💻',
      skills: ['React', 'Node.js', 'AI/ML', 'Product Management']
    },
    {
      name: 'Sari Dewi',
      role: 'Head of Curriculum',
      bio: 'Former Facebook engineer. Specialist dalam designing effective learning experiences dan curriculum development.',
      avatar: '👩‍🏫',
      skills: ['JavaScript', 'Python', 'UI/UX', 'Education Technology']
    },
    {
      name: 'Budi Rahardjo',
      role: 'AI Integration Specialist',
      bio: 'PhD in Computer Science. Expert dalam AI tools untuk education dan natural language processing.',
      avatar: '🤖',
      skills: ['AI/ML', 'Python', 'Data Science', 'NLP']
    },
    {
      name: 'Maya Indira',
      role: 'Community Manager',
      bio: 'Membangun dan mengelola komunitas developer Indonesia. Ensuring everyone feels welcome dan supported.',
      avatar: '👥',
      skills: ['Community Building', 'Content Strategy', 'Social Media', 'Event Management']
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Accessibility First',
      description: 'Membuat coding education accessible untuk semua kalangan, regardless of background atau economic status.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Learning with Passion',
      description: 'Kami percaya bahwa learning harus fun, engaging, dan meaningful. Passion drives the best learning outcomes.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Building strong community dimana setiap member support satu sama lain dalam coding journey mereka.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Selalu mencari cara innovative untuk improve learning experience menggunakan latest technology.',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Students Enrolled', icon: '👨‍🎓' },
    { number: '95%', label: 'Completion Rate', icon: '✅' },
    { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
    { number: '24/7', label: 'Community Support', icon: '💬' }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'VibeCoding Founded',
      description: 'Started with a vision to democratize coding education in Indonesia'
    },
    {
      year: '2023',
      title: 'First 1000 Students',
      description: 'Reached our first milestone with 1000+ active learners'
    },
    {
      year: '2024', 
      title: 'AI Integration',
      description: 'Launched AI-powered learning assistant untuk personalized experience'
    },
    {
      year: '2024',
      title: 'Community Expansion',
      description: 'Expanded to 10+ cities dengan local community chapters'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Tentang{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                VibeCoding
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kami adalah platform pembelajaran coding yang didedikasikan untuk memberdayakan developer Indonesia dengan skill yang dibutuhkan industri global.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Misi & Visi Kami
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">
                    🎯 Misi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Membuat coding education accessible, affordable, dan effective untuk semua orang Indonesia. 
                    Kami ingin menghilangkan barrier yang mencegah orang belajar programming dan membantu mereka 
                    achieve their career goals di tech industry.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-secondary-600 dark:text-secondary-400 mb-3">
                    🚀 Visi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Menjadi platform pembelajaran coding #1 di Indonesia yang menghasilkan developer berkualitas tinggi 
                    dan siap bersaing di pasar global. Kami envision a future dimana setiap orang Indonesia 
                    memiliki kesempatan yang sama untuk sukses di tech industry.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <Globe className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Impact yang Kami Ciptakan
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-3" />
                    10,000+ students trained successfully
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 mr-3" />
                    85% of graduates got job offers
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 mr-3" />
                    Partnership dengan 100+ companies
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    Active communities in 15+ cities
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Values yang Kami Pegang
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Principles yang memandu setiap keputusan dan action kami
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Passionate educators dan engineers yang committed untuk your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Milestones penting dalam perjalanan VibeCoding
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-12`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-800"></div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card>
                    <CardContent className="p-6">
                      <Badge className="mb-3">{milestone.year}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Be part of the movement yang transforms lives through coding education. 
              Start your journey today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  Mulai Belajar Sekarang
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary-700"
                >
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}