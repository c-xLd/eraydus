export type CustomerType = 'individual' | 'business'
export type CustomerStatus = 'lead' | 'active' | 'quote_sent' | 'customer' | 'inactive' | 'lost'

export interface Customer {
  id: string
  email: string
  phone: string | null
  first_name: string | null
  last_name: string | null
  company_name: string | null
  address: string | null
  city: string | null
  district: string | null
  postal_code: string | null
  country: string
  customer_type: CustomerType
  status: CustomerStatus
  source: string
  assigned_to: string | null
  total_quotes: number
  total_spent: number
  last_contacted: string | null
  created_at: string
  updated_at: string
}

export interface CustomerNote {
  id: string
  customer_id: string
  author_id: string | null
  content: string
  created_at: string
  updated_at: string
  
  // Joined relation fields
  author?: {
    first_name: string
    last_name: string
  }
}

export interface CustomerTag {
  id: string
  name: string
  created_at: string
}

export interface CustomerWithRelations extends Customer {
  notes?: CustomerNote[]
  tags?: CustomerTag[]
  quotes?: any[]
  orders?: any[]
  assigned_member?: {
    first_name: string
    last_name: string
  }
}
