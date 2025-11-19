require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productroute');
const protectedRoutes = require('./routes/protected');
const cartItemroutes = require('./routes/cartitemRoutes');
const app = express();
app.use(express.json());

// Allow your frontend origin (replace with actual origin)
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
}));

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cartItems', cartItemroutes);



const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log('Server listening on', PORT));
})
.catch(err => {
  console.error('MongoDB connection error', err);
});
