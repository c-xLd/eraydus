export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          image_url: string | null
          seo_metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          image_url?: string | null
          seo_metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          image_url?: string | null
          seo_metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          category_id: string | null
          slug: string
          name: string
          description: string | null
          image_url: string | null
          seo_metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          slug: string
          name: string
          description?: string | null
          image_url?: string | null
          seo_metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          slug?: string
          name?: string
          description?: string | null
          image_url?: string | null
          seo_metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          collection_id: string | null
          slug: string
          name: string
          short_description: string | null
          description: string | null
          long_description: string | null
          product_type: string | null
          layout_type: string | null
          cabin_shape: string | null
          main_image_url: string | null
          images: Json | string[] | null
          base_price: number
          sale_price: number | null
          stock: number
          manage_stock: boolean | null
          stock_quantity: number | null
          stock_status: string | null
          is_new: boolean | null
          featured: boolean | null
          status: string | null
          specifications: Json | null
          technical_specs: Json | null
          features: Json | null
          compatible_glass: Json | null
          compatible_profiles: Json | null
          seo_metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          collection_id?: string | null
          slug: string
          name: string
          short_description?: string | null
          description?: string | null
          long_description?: string | null
          product_type?: string | null
          layout_type?: string | null
          cabin_shape?: string | null
          main_image_url?: string | null
          images?: Json | string[] | null
          base_price?: number
          sale_price?: number | null
          stock?: number
          manage_stock?: boolean | null
          stock_quantity?: number | null
          stock_status?: string | null
          is_new?: boolean | null
          featured?: boolean | null
          status?: string | null
          specifications?: Json | null
          technical_specs?: Json | null
          features?: Json | null
          compatible_glass?: Json | null
          compatible_profiles?: Json | null
          seo_metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          collection_id?: string | null
          slug?: string
          name?: string
          short_description?: string | null
          description?: string | null
          long_description?: string | null
          product_type?: string | null
          layout_type?: string | null
          cabin_shape?: string | null
          main_image_url?: string | null
          images?: Json | string[] | null
          base_price?: number
          sale_price?: number | null
          stock?: number
          manage_stock?: boolean | null
          stock_quantity?: number | null
          stock_status?: string | null
          is_new?: boolean | null
          featured?: boolean | null
          status?: string | null
          specifications?: Json | null
          technical_specs?: Json | null
          features?: Json | null
          compatible_glass?: Json | null
          compatible_profiles?: Json | null
          seo_metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      product_attributes: {
        Row: {
          id: string
          name: string
          slug: string
          type: string | null
          is_visible: boolean | null
          is_variation: boolean | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          type?: string | null
          is_visible?: boolean | null
          is_variation?: boolean | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          type?: string | null
          is_visible?: boolean | null
          is_variation?: boolean | null
          created_at?: string
          updated_at?: string | null
        }
      }
      product_attribute_terms: {
        Row: {
          id: string
          attribute_id: string
          name: string
          slug: string
          description: string | null
          color_code: string | null
          image_url: string | null
          sort_order: number | null
        }
        Insert: {
          id?: string
          attribute_id: string
          name: string
          slug: string
          description?: string | null
          color_code?: string | null
          image_url?: string | null
          sort_order?: number | null
        }
        Update: {
          id?: string
          attribute_id?: string
          name?: string
          slug?: string
          description?: string | null
          color_code?: string | null
          image_url?: string | null
          sort_order?: number | null
        }
      }
      product_attribute_values: {
        Row: {
          id: string
          product_id: string
          attribute_id: string
          term_id: string
          is_variation: boolean | null
        }
        Insert: {
          id?: string
          product_id: string
          attribute_id: string
          term_id: string
          is_variation?: boolean | null
        }
        Update: {
          id?: string
          product_id?: string
          attribute_id?: string
          term_id?: string
          is_variation?: boolean | null
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string | null
          url: string
          is_primary: boolean | null
          alt_text: string | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          url: string
          is_primary?: boolean | null
          alt_text?: string | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          url?: string
          is_primary?: boolean | null
          alt_text?: string | null
          sort_order?: number | null
          created_at?: string
        }
      }
      product_gallery: {
        Row: {
          id: string
          product_id: string | null
          image_url: string
          alt_text: string | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          image_url: string
          alt_text?: string | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          image_url?: string
          alt_text?: string | null
          sort_order?: number | null
          created_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string | null
          sku: string
          name: string
          price: number
          sale_price: number | null
          stock_quantity: number | null
          manage_stock: boolean | null
          stock_status: string | null
          attributes: Json | null
          image_url: string | null
          status: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          sku: string
          name: string
          price?: number
          sale_price?: number | null
          stock_quantity?: number | null
          manage_stock?: boolean | null
          stock_status?: string | null
          attributes?: Json | null
          image_url?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          sku?: string
          name?: string
          price?: number
          sale_price?: number | null
          stock_quantity?: number | null
          manage_stock?: boolean | null
          stock_status?: string | null
          attributes?: Json | null
          image_url?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      product_reviews: {
        Row: {
          id: string
          product_id: string | null
          user_id: string | null
          author_name: string | null
          author_email: string | null
          rating: number
          content: string
          images: string[] | null
          is_approved: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          user_id?: string | null
          author_name?: string | null
          author_email?: string | null
          rating: number
          content: string
          images?: string[] | null
          is_approved?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          user_id?: string | null
          author_name?: string | null
          author_email?: string | null
          rating?: number
          content?: string
          images?: string[] | null
          is_approved?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      product_faqs: {
        Row: {
          id: string
          product_id: string | null
          question: string
          answer: string
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          question: string
          answer: string
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          question?: string
          answer?: string | null
          sort_order?: number | null
          created_at?: string
        }
      }
      glass_options: {
        Row: {
          id: string
          name: string
          description: string | null
          color_class: string | null
          sort_order: number | null
          status: string | null
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          color_class?: string | null
          sort_order?: number | null
          status?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          color_class?: string | null
          sort_order?: number | null
          status?: string | null
        }
      }
      profile_options: {
        Row: {
          id: string
          name: string
          hex_color: string | null
          sort_order: number | null
          status: string | null
        }
        Insert: {
          id: string
          name: string
          hex_color?: string | null
          sort_order?: number | null
          status?: string | null
        }
        Update: {
          id?: string
          name?: string
          hex_color?: string | null
          sort_order?: number | null
          status?: string | null
        }
      }
      blog: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          body: string | null
          content_type: string | null
          featured_image: string | null
          status: string | null
          seo_title: string | null
          seo_description: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          body?: string | null
          content_type?: string | null
          featured_image?: string | null
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          body?: string | null
          content_type?: string | null
          featured_image?: string | null
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          location: string | null
          category: string | null
          description: string | null
          main_image_url: string | null
          gallery: Json | null
          features: Json | null
          status: string | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          location?: string | null
          category?: string | null
          description?: string | null
          main_image_url?: string | null
          gallery?: Json | null
          features?: Json | null
          status?: string | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          location?: string | null
          category?: string | null
          description?: string | null
          main_image_url?: string | null
          gallery?: Json | null
          features?: Json | null
          status?: string | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      sandblasted_models: {
        Row: {
          id: string
          model_code: string
          name: string
          category: string | null
          image_url: string | null
          description: string | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          model_code: string
          name: string
          category?: string | null
          image_url?: string | null
          description?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          model_code?: string
          name?: string
          category?: string | null
          image_url?: string | null
          description?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      subscribers: {
        Row: {
          id: string
          email: string
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_active?: boolean | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          is_read: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          is_read?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          is_read?: boolean | null
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      seo_settings: {
        Row: {
          id: string
          key: string
          value: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    } & Record<string, { Row: any; Insert: any; Update: any }>
    Views: Record<string, any>
    Functions: Record<string, any>
    Enums: Record<string, any>
    CompositeTypes: Record<string, any>
  }
}
