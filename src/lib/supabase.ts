import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          completed: boolean
          progress_percentage: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          completed?: boolean
          progress_percentage?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          completed?: boolean
          progress_percentage?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          module_id: string
          quiz_id: string
          score: number
          total_questions: number
          correct_answers: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          quiz_id: string
          score: number
          total_questions: number
          correct_answers: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          quiz_id?: string
          score?: number
          total_questions?: number
          correct_answers?: number
          completed_at?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
          created_at?: string
        }
      }
    }
  }
}