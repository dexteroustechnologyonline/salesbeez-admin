const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const dotenv = require('dotenv');
dotenv.config({path:"config/config.env"});


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

// Connecting to database
connectDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.post('/api/v1/category', (req, res) => {

//   // output the headers
//   console.log(req.headers);

//   // capture the encoded form data
//   req.on('data', (data) => {
//     console.log(data.toString());
//   });

//   // send a response when finished reading
//   // the encoded form data
//   req.on('end', () => {
//     res.send('ok');
//   });
// });


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
