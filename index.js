const express = require('express');
// const config = require('config');
const mongoose = require('mongoose');
// const PORT = config.get('port') || 5000;
const app = express();
const path = require('path');
require("dotenv").config();


const cors = require('cors');
app.use(cors());


app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cart', require('./routes/cart.router'))
app.use('/api/tire-crud', require('./routes/tire-crud.router'))
app.use('/api/brand-crud', require('./routes/brand-crud.router'))
app.use('/api/user-crud', require('./routes/user-crud.router'))

const PORT = process.env.port.toString();
const mongoUri = process.env.mongoUri.toString()

const prod = true;

if (prod) {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          });
    console.log(`MongoDB Connected: ${PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });




