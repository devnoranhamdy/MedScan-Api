const express = require("express");
const cors = require("cors");
require("dotenv").config();
const httpStatusText = require("./utils/httpStatusText");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passportConfig");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const doctor_recomm_router = require("./routes/patient/doctorRecommRoute");
const dataBaseConnection = require('./config/dbConfig')
dataBaseConnection()

// Import routes
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

// Cookie session configuration
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/api/users", userRouter);
app.use("/api/medscanChatbot", chatbotRoute);
app.use("/api", doctor_recomm_router);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);


app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This Page Not Found!",
  });
});

// Error handling middleware (you might want to add this)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: httpStatusText.ERROR,
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Application running successfully`);
});
