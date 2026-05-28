import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  designation: string;
  company: string;
  rating: number;
  comment: string;
  location: string;
  project: string;
  date: string;
  featured: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: '', trim: true },
    company: { type: String, default: '', trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true, trim: true },
    location: { type: String, default: '', trim: true },
    project: { type: String, default: '', trim: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
