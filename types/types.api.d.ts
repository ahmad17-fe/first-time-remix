interface SuccessResponseWithMeta<T> {
  data: T;
  links: AR_Links;
  meta: AR_Meta;
}

interface SuccessResponse<T> {
  data: T;
}

interface AR_Office {
  user: AR_User;
  images: AR_OfficeImage[];
  tags: string[];
  reservations_count: number;
  id: number;
  featured_image_id: number;
  title: string;
  description: string;
  lat: string;
  lng: string;
  address_line1: string;
  address_line2: string;
  approval_status: number;
  hidden: boolean;
  price_per_day: number;
  monthly_discount: number;
}

interface AR_User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface AR_OfficeImage {
  path: string;
  id: number;
  resource_type: string;
  resource_id: number;
  created_at: string;
  updated_at: string;
}

interface AR_Links {
  first: string;
  last: string;
  prev: any;
  next: any;
}

interface AR_Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: AR_Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface AR_Link {
  url?: string;
  label: string;
  active: boolean;
}

interface AR_Login {
  message: string;
  access_token: string;
  token_type: string;
}

interface AR_Logout {
  message: string;
}
