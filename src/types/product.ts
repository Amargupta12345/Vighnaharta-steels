// Shared Product TypeScript interface - used across the application
export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price?: string;
  specifications?: string[] | Array<{ label: string; value: string }>;
  slug: string;
  category?: string;
  featured?: boolean;
  features?: string[];
  applications?: string[];
  metadata?: {
    title?: string;
    description?: string;
  };
  [key: string]: any; // Allow additional properties
}
