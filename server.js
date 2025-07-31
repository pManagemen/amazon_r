const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Gunakan variabel lingkungan dari Railway
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema untuk data review Amazon
const reviewSchema = new mongoose.Schema({
  user_name: String,
  review_title: String,
  review_content: String,
  img_link: String,
  product_link: String
});

const Review = mongoose.model('Review', reviewSchema, 'review'); // Koleksi = 'review'

// Endpoint API
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().limit(20);
    res.json(reviews);
  } catch (err) {
    console.error('❌ Error saat fetch data:', err);
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})