export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  is_admin: boolean
  is_verified: boolean
  is_banned: boolean
  created_at: string
}

export interface Listing {
  id: string
  seller_id: string
  title: string
  price: number
  category: string
  description: string | null
  image_url: string | null
  location: string | null
  is_active: boolean
  is_approved: boolean
  created_at: string
  seller?: Profile
}

export interface Message {
  id: string
  listing_id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

export interface Banner {
  id: string
  image_url: string
  link_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface VerificationRequest {
  id: string
  user_id: string
  status: string
  monime_transaction_id: string | null
  amount: number | null
  created_at: string
  verified_at: string | null
}
