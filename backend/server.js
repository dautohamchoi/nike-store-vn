import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}).catch(error => console.log(error));
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB is connected successfully")
})

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute)
app.use("/api/products", productRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is working on " + port);
})