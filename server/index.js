const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

//Database connection
connectDB();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3000",
	credentials:true,
}))

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//Cloudinary connection
cloudinaryConnect();

//Routes
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payment", paymentRoutes);

app.get('/', (req, res) => {
  return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`)
})