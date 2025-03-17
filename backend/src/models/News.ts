import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    news_id: { type: Number, required: true }, // Changed id to news_id (avoid conflicts)
    title: { type: String, required: true },
    text: { type: String },
    summary: { type: String },
    url: { type: String, required: true },
    image: { type: String },
    video: { type: String, default: null },
    publish_date: { type: String, required: true },
    author: { type: String },
    authors: { type: [String], default: [] },
    language: { type: String },
    category: { type: String },
    source_country: { type: String },
    sentiment: { type: Number },
    stored_at: { type: Date, default: Date.now } 
});

const News = mongoose.model('News', NewsSchema);
export default News;
