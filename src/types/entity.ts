export interface Entity {
  id: string;
  nif: string;
  name: string;
  district: string | null;
  county: string | null;
  original_name?: string | null;
  original_county?: string | null;
  type: string | null;
  year: number;
  description: string | null;
  contacts: EntityContacts | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface EntityContacts {
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface EntityInsert {
  nif: string;
  name: string;
  district?: string | null;
  county?: string | null;
  type?: string | null;
  year: number;
  description?: string | null;
  contacts?: EntityContacts | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface EntityUpdate {
  name?: string;
  district?: string | null;
  county?: string | null;
  type?: string | null;
  description?: string | null;
  contacts?: EntityContacts | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}
