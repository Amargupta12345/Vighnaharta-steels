/**
 * Single source of truth for company details displayed on the website.
 * Values come from NEXT_PUBLIC_COMPANY_* env vars defined in .env.local,
 * with sensible fallbacks so the site keeps rendering if envs are missing.
 */

const env = (key: string, fallback: string): string => {
  const v = process.env[key];
  return v && v.trim().length > 0 ? v : fallback;
};

export const company = {
  name: env('NEXT_PUBLIC_COMPANY_NAME', 'Vighnaharta Steels'),
  tagline: env('NEXT_PUBLIC_COMPANY_TAGLINE', 'Wholesale Steel Dealer'),
  years: env('NEXT_PUBLIC_COMPANY_YEARS', '12'),

  phone1: env('NEXT_PUBLIC_COMPANY_PHONE_1', '+91 99304 18080'),
  phone2: env('NEXT_PUBLIC_COMPANY_PHONE_2', '+91 99675 46334'),
  email: env('NEXT_PUBLIC_COMPANY_EMAIL', 'vighnahartasteelcorp@gmail.com'),

  address: {
    line1: env('NEXT_PUBLIC_COMPANY_ADDRESS_LINE_1', 'Shop No. 1, 2, 3'),
    line2: env('NEXT_PUBLIC_COMPANY_ADDRESS_LINE_2', 'Opp. Balaji World, Near Modi Hyundai'),
    line3: env('NEXT_PUBLIC_COMPANY_ADDRESS_LINE_3', 'Khadakpada, Kalyan West – 421302'),
    line4: env('NEXT_PUBLIC_COMPANY_ADDRESS_LINE_4', 'Maharashtra, India'),
    city: env('NEXT_PUBLIC_COMPANY_CITY', 'Kalyan'),
    state: env('NEXT_PUBLIC_COMPANY_STATE', 'Maharashtra'),
    pincode: env('NEXT_PUBLIC_COMPANY_PINCODE', '421302'),
    country: env('NEXT_PUBLIC_COMPANY_COUNTRY', 'India'),
  },

  gstin: env('NEXT_PUBLIC_COMPANY_GSTIN', '27AAMFV1374Q1ZB'),
  udyam: env('NEXT_PUBLIC_COMPANY_UDYAM', 'MH/33/0063211'),
  jurisdiction: env('NEXT_PUBLIC_COMPANY_JURISDICTION', 'Kalyan / Thane, Maharashtra, India'),

  hours: env('NEXT_PUBLIC_COMPANY_HOURS', 'Mon – Sat: 9:00 AM – 6:00 PM'),
  holiday: env('NEXT_PUBLIC_COMPANY_HOLIDAY', 'Sunday: Closed'),

  social: {
    instagram: env('NEXT_PUBLIC_COMPANY_INSTAGRAM', 'https://www.instagram.com/vighnahartasteel2022/'),
    facebook: env('NEXT_PUBLIC_COMPANY_FACEBOOK', ''),
    linkedin: env('NEXT_PUBLIC_COMPANY_LINKEDIN', ''),
  },
};

export const phoneHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
export const mailHref = (email: string) => `mailto:${email}`;

export const fullAddress = () =>
  `${company.address.line1}, ${company.address.line2}, ${company.address.line3}, ${company.address.line4}`;
