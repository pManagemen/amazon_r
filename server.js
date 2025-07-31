const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.error('Error:', err));

const reviewSchema = new mongoose.Schema({
  user_name: String,
  review_title: String,
  review_content: String,
  img_link: String,
  product_link: String
});

const Review = mongoose.model('Review', reviewSchema);
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().limit(20);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
