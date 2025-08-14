'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AlertCircle, X, ExternalLink } from 'lucide-react'

export function DevNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if we're in development and Supabase is not configured
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                                process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
    
    const isDev = process.env.NODE_ENV === 'development'
    const dismissed = localStorage.getItem('dev-notification-dismissed')
    
    if (isDev && !isSupabaseConfigured && !dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem('dev-notification-dismissed', 'true')
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-sm">
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                  Development Mode
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  Authentication system belum dikonfigurasi. Setup Supabase untuk enable auth features.
                </p>
                
                <div className="mt-3 space-y-2">
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
                  >
                    Setup Supabase
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                  
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Lihat <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">DEPLOYMENT.md</code> untuk panduan lengkap
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}