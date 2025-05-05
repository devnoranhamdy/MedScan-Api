const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const dataBaseConnection = require("./config/dbConfig");
const ApiError = require("./utils/ApiError");
//const path = require("path");
//const passportSetup = require("./config/passportConfig");
//const GoogleStrategy = require("passport-google-oauth20").Strategy;

dataBaseConnection();

const authRouter = require("./routes/auth/authRoute");
const chatbotRoute = require("./routes/chatbot/chatbotRoute");
const doctorProfileRoute = require("./routes/doctor/doctorProfileRoutes");
const patientProfileRoute = require("./routes/patient/patientProfileRoutes");
const doctorRecommendationRouter = require("./routes/patient/doctorRecommRoute");
const userRouter = require("./routes/admin/userRoute");
const doctorMangmentRouter = require("./routes/admin/doctorMangmentRoute");
const chatbotSendRoutes = require('./routes/chatbot/sendScanToModelRoute');
const MedicalAdvicesRoute = require('./routes/patient/MedicalAdvicesRoute')

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

app.use("/api/auth", authRouter);
app.use("/api/Chatbot", chatbotRoute);
app.use("/api/doctorRecommendation", doctorRecommendationRouter);
app.use("/api/doctor", doctorProfileRoute);
app.use("/api/patient", patientProfileRoute);
app.use("/api/user",userRouter );
app.use("/api/doctorMangment", doctorMangmentRouter);
app.use('/api/chatbotSend', chatbotSendRoutes);
app.use('/api/MedicalAdvice', MedicalAdvicesRoute);


app.all("*", (req, res, next) =>
  next(new ApiError("This Page Not Found!", 404))
);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Internal Server Error",
    stack: error.stack,
  });
});
process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection : ${error.message} & ${error.name}`);
});

app.listen(port, () => {
  console.log(`Application running successfully`);
});
