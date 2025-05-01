const express = require("express");
const morgan = require ('morgan')
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const doctorRecommendationRouter = require("./routes/patient/doctorRecommRoute");
const dataBaseConnection = require('./config/dbConfig')
const ApiError = require('./utils/ApiError')
//const { GoogleGenerativeAI } = require("@google/generative-ai");
//const path = require("path");
//const passportSetup = require("./config/passportConfig");
//const GoogleStrategy = require("passport-google-oauth20").Strategy;



dataBaseConnection()

const userRouter = require("./routes/auth/userRoute");
const chatbotRoute = require("./routes/chatbot/chatbotRoute");
const doctorRoutes = require("./routes/doctor/doctorProfileRoutes");
const patientRoutes = require("./routes/patient/patientProfileRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/medscanChatbot", chatbotRoute);
app.use("/api", doctorRecommendationRouter);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);


app.all("*", (req, res, next) => next(new ApiError("This Page Not Found!", 404)));


app.use((error, req, res, next) => {
  res.status(error.statusCode || 500 ).json({ status : error.status ,  message : error.message || "Internal Server Error" , stack : error.stack})
});

process.on('unhandledRejection' , (error)=>{
  console.log(`unhandledRejection : ${error.message} & ${error.name}`)
});

app.listen(port, () => {
  console.log(`Application running successfully`);
});
