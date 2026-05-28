import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  category: string;
  brand: string;
  featured: boolean;
  inStock: boolean;
  specifications: Array<{ label: string; value: string }>;
  features: string[];
  applications: string[];
  metadata?: { title: string; description: string };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    price: { type: String, default: 'Contact for price', trim: true },
    image: { type: String, default: '/assets/images/steel-beam.png', trim: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, default: '', trim: true },
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    specifications: [{ label: { type: String }, value: { type: String } }],
    features: [{ type: String }],
    applications: [{ type: String }],
    metadata: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
