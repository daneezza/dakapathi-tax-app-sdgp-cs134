import mongoose from 'mongoose';

// Mongoose schema for storing news articles
const NewsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
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

// Creat the news model
const News = mongoose.model('News', NewsSchema);
// Expost the news model
export default News;