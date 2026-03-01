import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuoteRequest extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  productType: string;
  specifications: string;
  quantity: string;
  deliveryDate: string | null;
  deliveryLocation: string;
  message: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestSchema = new Schema<IQuoteRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, default: '', trim: true },
    productType: { type: String, required: true, trim: true },
    specifications: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    deliveryDate: { type: String, default: null },
    deliveryLocation: { type: String, required: true, trim: true },
    message: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'quoted', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent model recompilation in dev (hot reload)
const QuoteRequest: Model<IQuoteRequest> =
  mongoose.models.QuoteRequest || mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema);

export default QuoteRequest;
