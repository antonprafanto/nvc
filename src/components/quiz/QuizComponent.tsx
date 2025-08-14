'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { 
  Clock, 
  CheckCircle, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Trophy,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Module, Quiz, QuizQuestion } from '@/data/modules'

interface QuizComponentProps {
  module: Module
  quiz: Quiz
}

interface QuizState {
  currentQuestion: number
  answers: { [key: number]: number }
  timeRemaining: number
  isCompleted: boolean
  score: number
  showResults: boolean
  showExplanation: boolean
}

export default function QuizComponent({ module, quiz }: QuizComponentProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: quiz.questions.length * 120, // 2 minutes per question
    isCompleted: false,
    score: 0,
    showResults: false,
    showExplanation: false
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const currentQ = quiz.questions[quizState.currentQuestion]
  const isLastQuestion = quizState.currentQuestion === quiz.questions.length - 1
  const totalQuestions = quiz.questions.length
  const progressPercentage = ((quizState.currentQuestion + 1) / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isCompleted) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (quizState.timeRemaining === 0 && !quizState.isCompleted) {
      handleQuizComplete()
    }
  }, [quizState.timeRemaining, quizState.isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = {
      ...quizState.answers,
      [quizState.currentQuestion]: selectedAnswer
    }

    if (isLastQuestion) {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        isCompleted: true
      }))
      handleQuizComplete(newAnswers)
    } else {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      }))
      setSelectedAnswer(quizState.answers[quizState.currentQuestion + 1] ?? null)
    }
  }

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }))
      setSelectedAnswer(quizState.answers[quizState.currentQuestion - 1] ?? null)
    }
  }

  const handleQuizComplete = (finalAnswers = quizState.answers) => {
    let correctAnswers = 0
    
    quiz.questions.forEach((question, index) => {
      if (finalAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / totalQuestions) * 100)
    
    setQuizState(prev => ({
      ...prev,
      isCompleted: true,
      score: finalScore,
      showResults: true
    }))
  }

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      timeRemaining: quiz.questions.length * 120,
      isCompleted: false,
      score: 0,
      showResults: false,
      showExplanation: false
    })
    setSelectedAnswer(null)
  }

  const toggleExplanation = () => {
    setQuizState(prev => ({
      ...prev,
      showExplanation: !prev.showExplanation
    }))
  }

  // Results screen
  if (quizState.showResults) {
    const passed = quizState.score >= quiz.passingScore
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center">
              <CardHeader>
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  passed ? 'bg-success-100 text-success-600' : 'bg-red-100 text-red-600'
                }`}>
                  {passed ? <Trophy className="h-10 w-10" /> : <X className="h-10 w-10" />}
                </div>
                
                <CardTitle className="text-3xl">
                  {passed ? '🎉 Selamat!' : '😔 Belum Berhasil'}
                </CardTitle>
                
                <CardDescription className="text-lg">
                  {passed 
                    ? `Anda berhasil menyelesaikan quiz ${module.title}!`
                    : `Skor Anda belum mencapai passing score. Coba lagi!`
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {quizState.score}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Skor Anda
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Object.values(quizState.answers).filter((answer, index) => 
                        answer === quiz.questions[index].correctAnswer
                      ).length}/{totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Jawaban Benar
                    </div>
                  </div>
                  
                  <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                      {quiz.passingScore}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Passing Score
                    </div>
                  </div>
                </div>
                
                {/* Detailed Results */}
                <div className="text-left mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Review Jawaban
                    </h3>
                    <Button variant="outline" size="sm" onClick={toggleExplanation}>
                      {quizState.showExplanation ? 'Sembunyikan' : 'Tampilkan'} Penjelasan
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {quiz.questions.map((question, index) => {
                      const userAnswer = quizState.answers[index]
                      const isCorrect = userAnswer === question.correctAnswer
                      
                      return (
                        <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {index + 1}. {question.question}
                            </h4>
                            <Badge variant={isCorrect ? 'success' : 'destructive'}>
                              {isCorrect ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <X className="h-3 w-3 mr-1" />
                              )}
                              {isCorrect ? 'Benar' : 'Salah'}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Jawaban Anda: </span>
                              <span className={isCorrect ? 'text-success-600' : 'text-red-600'}>
                                {question.options[userAnswer] || 'Tidak dijawab'}
                              </span>
                            </p>
                            
                            {!isCorrect && (
                              <p>
                                <span className="font-medium">Jawaban yang benar: </span>
                                <span className="text-success-600">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </p>
                            )}
                            
                            <AnimatePresence>
                              {quizState.showExplanation && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400"
                                >
                                  <p className="text-blue-800 dark:text-blue-200">
                                    <strong>Penjelasan:</strong> {question.explanation}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button onClick={restartQuiz} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Coba Lagi
                  </Button>
                  
                  <Link href={`/modules/${module.id}`}>
                    <Button>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Kembali ke Modul
                    </Button>
                  </Link>
                  
                  {passed && (
                    <Link href="/dashboard">
                      <Button className="bg-success-600 hover:bg-success-700">
                        <Trophy className="h-4 w-4 mr-2" />
                        Lihat Achievement
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz interface
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/modules/${module.id}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Modul
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {quiz.description}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-lg font-mono font-bold text-primary-600 dark:text-primary-400 mb-2">
                <Clock className="h-5 w-5 mr-2" />
                {formatTime(quizState.timeRemaining)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Waktu tersisa
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Pertanyaan {quizState.currentQuestion + 1} dari {totalQuestions}</span>
            <span>{Math.round(progressPercentage)}% selesai</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Question Card */}
        <motion.div
          key={quizState.currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQ.question}
              </CardTitle>
              <CardDescription>
                Pilih satu jawaban yang paling tepat
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                        selectedAnswer === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                      <span className="ml-3">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Time warning */}
              {quizState.timeRemaining < 60 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-3 mb-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
                >
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-orange-800 dark:text-orange-200">
                    Waktu hampir habis! Sisa {quizState.timeRemaining} detik
                  </span>
                </motion.div>
              )}
              
              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={quizState.currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Sebelumnya
                </Button>
                
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={isLastQuestion ? 'bg-success-600 hover:bg-success-700' : ''}
                >
                  {isLastQuestion ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Selesaikan Quiz
                    </>
                  ) : (
                    <>
                      Selanjutnya
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Question navigator */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuizState(prev => ({
                      ...prev,
                      currentQuestion: index
                    }))
                    setSelectedAnswer(quizState.answers[index] ?? null)
                  }}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    index === quizState.currentQuestion
                      ? 'bg-primary-500 text-white'
                      : quizState.answers[index] !== undefined
                      ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Klik nomor untuk navigasi langsung ke pertanyaan
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}