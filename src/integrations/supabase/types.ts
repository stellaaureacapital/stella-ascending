export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      academy_attempts: {
        Row: {
          answers: Json
          created_at: string
          id: string
          lesson_id: string
          score: number
          user_id: string
        }
        Insert: {
          answers: Json
          created_at?: string
          id?: string
          lesson_id: string
          score: number
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          lesson_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academy_attempts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "academy_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_certificates: {
        Row: {
          code: string
          course_title: string
          hours: number
          id: string
          invalidated_reason: string | null
          issued_at: string
          product_id: string
          score: number
          student_name: string
          user_id: string
          version: number
        }
        Insert: {
          code?: string
          course_title: string
          hours: number
          id?: string
          invalidated_reason?: string | null
          issued_at?: string
          product_id: string
          score: number
          student_name: string
          user_id: string
          version?: number
        }
        Update: {
          code?: string
          course_title?: string
          hours?: number
          id?: string
          invalidated_reason?: string | null
          issued_at?: string
          product_id?: string
          score?: number
          student_name?: string
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "academy_certificates_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_lessons: {
        Row: {
          body: string
          id: string
          minutes: number
          module_id: string
          objectives: string
          order_index: number
          published: boolean
          references_text: string
          title: string
          version: number
        }
        Insert: {
          body?: string
          id?: string
          minutes?: number
          module_id: string
          objectives?: string
          order_index?: number
          published?: boolean
          references_text?: string
          title: string
          version?: number
        }
        Update: {
          body?: string
          id?: string
          minutes?: number
          module_id?: string
          objectives?: string
          order_index?: number
          published?: boolean
          references_text?: string
          title?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "academy_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "product_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_progress: {
        Row: {
          completed_at: string
          lesson_id: string
          score: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          lesson_id: string
          score: number
          user_id: string
        }
        Update: {
          completed_at?: string
          lesson_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academy_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "academy_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_questions: {
        Row: {
          answer_index: number
          explanation: string
          id: string
          kind: string
          lesson_id: string
          options: Json
          prompt: string
          tolerance: number
        }
        Insert: {
          answer_index: number
          explanation: string
          id?: string
          kind?: string
          lesson_id: string
          options?: Json
          prompt: string
          tolerance?: number
        }
        Update: {
          answer_index?: number
          explanation?: string
          id?: string
          kind?: string
          lesson_id?: string
          options?: Json
          prompt?: string
          tolerance?: number
        }
        Relationships: [
          {
            foreignKeyName: "academy_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "academy_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_reading: {
        Row: {
          bookmarks: Json
          page: number
          product_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bookmarks?: Json
          page?: number
          product_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bookmarks?: Json
          page?: number
          product_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academy_reading_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_xp: {
        Row: {
          amount: number
          created_at: string
          event_key: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          event_key: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          event_key?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      product_modules: {
        Row: {
          content_type: Database["public"]["Enums"]["module_content_type"]
          content_url: string | null
          created_at: string
          description: string | null
          id: string
          is_preview: boolean
          order_index: number
          product_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content_type?: Database["public"]["Enums"]["module_content_type"]
          content_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_preview?: boolean
          order_index?: number
          product_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content_type?: Database["public"]["Enums"]["module_content_type"]
          content_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_preview?: boolean
          order_index?: number
          product_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_modules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          content_url: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          education_meta: Json
          id: string
          is_premium: boolean
          product_type: Database["public"]["Enums"]["product_type"]
          short_description: string | null
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content_url?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          education_meta?: Json
          id?: string
          is_premium?: boolean
          product_type: Database["public"]["Enums"]["product_type"]
          short_description?: string | null
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content_url?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          education_meta?: Json
          id?: string
          is_premium?: boolean
          product_type?: Database["public"]["Enums"]["product_type"]
          short_description?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_simulations: {
        Row: {
          calculator: string
          category: string
          created_at: string
          id: string
          inputs: Json
          name: string
          user_id: string
        }
        Insert: {
          calculator: string
          category: string
          created_at?: string
          id?: string
          inputs: Json
          name: string
          user_id?: string
        }
        Update: {
          calculator?: string
          category?: string
          created_at?: string
          id?: string
          inputs?: Json
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          id: string
          plan: Database["public"]["Enums"]["subscription_plan"]
          provider: string
          provider_customer_id: string | null
          provider_subscription_id: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          provider?: string
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          provider?: string
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_access: {
        Row: {
          access_status: Database["public"]["Enums"]["access_status"]
          created_at: string
          expires_at: string | null
          granted_at: string
          id: string
          notes: string | null
          product_id: string
          source: Database["public"]["Enums"]["access_source"]
          updated_at: string
          user_id: string
        }
        Insert: {
          access_status?: Database["public"]["Enums"]["access_status"]
          created_at?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          notes?: string | null
          product_id: string
          source?: Database["public"]["Enums"]["access_source"]
          updated_at?: string
          user_id: string
        }
        Update: {
          access_status?: Database["public"]["Enums"]["access_status"]
          created_at?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          notes?: string | null
          product_id?: string
          source?: Database["public"]["Enums"]["access_source"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_access_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      academy_get_questions: { Args: { _lesson: string }; Returns: Json }
      academy_submit: {
        Args: { _answers: Json; _lesson: string }
        Returns: Json
      }
      academy_verify: { Args: { _code: string }; Returns: Json }
    }
    Enums: {
      access_source: "manual" | "purchase" | "bonus" | "admin"
      access_status: "active" | "expired" | "revoked"
      app_role: "user" | "admin"
      module_content_type: "video" | "pdf" | "texto" | "link"
      product_status: "active" | "draft" | "archived"
      product_type: "ebook" | "curso" | "relatorio"
      subscription_plan: "monthly" | "yearly"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_source: ["manual", "purchase", "bonus", "admin"],
      access_status: ["active", "expired", "revoked"],
      app_role: ["user", "admin"],
      module_content_type: ["video", "pdf", "texto", "link"],
      product_status: ["active", "draft", "archived"],
      product_type: ["ebook", "curso", "relatorio"],
      subscription_plan: ["monthly", "yearly"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "expired",
      ],
    },
  },
} as const
