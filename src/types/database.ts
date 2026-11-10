export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          price: number
          description: string | null
          specs: Json | null
          category_id: string | null
          status: 'active' | 'hidden'
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          price: number
          description?: string | null
          specs?: Json | null
          category_id?: string | null
          status?: 'active' | 'hidden'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          price?: number
          description?: string | null
          specs?: Json | null
          category_id?: string | null
          status?: 'active' | 'hidden'
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt: string | null
          is_primary: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          alt?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          alt?: string | null
          is_primary?: boolean
          sort_order?: number
        }
        Relationships: []
      }
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content?: string | null
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          id: string
          event_type: string
          product_id: string | null
          product_name: string | null
          page_url: string | null
          referrer: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          product_id?: string | null
          product_name?: string | null
          page_url?: string | null
          referrer?: string | null
          created_at?: string
        }
        Update: Record<string, unknown>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type Page = Database['public']['Tables']['pages']['Row']
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']

export type ProductWithImages = Product & {
  product_images: ProductImage[]
  categories: Category | null
}
