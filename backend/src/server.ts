import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db";

import fileRoutes from "./routes/fileRoutes";

import courseRoutes from "./routes/courseRoutes";
import aboutRoutes from "./routes/aboutRoutes";

import logoRoute from "./routes/logoRoute";
import marqueeRoutes from "./routes/marqueeRoutes";

import newsCategoryRoutes from "./routes/newsCategoryRoutes";
import newsRoutes from "./routes/newsRoutes";
import carouselRoutes from "./routes/carouselRoutes";

import videoRoutes from "./routes/videoRoutes";
import sliderRoutes from "./routes/sliderRoutes";

import clubsCategoryRoutes from "./routes/clubsCategoryRoutes";
import clubsRoutes from "./routes/clubsRoutes";

import iqacRoutes from "./routes/iqacRoutes";
import iqacDocumentRoutes from "./routes/iqacDocumentRoutes";
import iqacTeamRoutes from "./routes/iqacTeamRoutes";

import achievementRoutes from "./routes/achievementRoutes";

import testimonialRoutes from "./routes/testimonialsRoutes";

import governingBodyRoutes from "./routes/governingBodyRoutes";
import founderMessageRoutes from "./routes/founderMessageRoutes";
import facultyRoutes from "./routes/facultyRoutes";

import applicationRoutes from "./routes/applicationRoutes";
import galleryCategoryRoute from "./routes/galleryCategoryRoutes";
import galleryImageRoutes from "./routes/galleryImageRoute";

import feedbackRoutes from "./routes/feedbackRoutes";

import authRoutes from "./routes/authRoutes";

import aicteRoutes from "./routes/aicteRoutes";
import aqarRoutes from "./routes/aqarRoute";
import nirfRoutes from "./routes/nirfRoutes";
import naacRoutes from "./routes/naacRoutes";
import aqarCommitteRoutes from "./routes/aqarCommitteeRoutes"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", fileRoutes);

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/about",aboutRoutes);

app.use("/api/logo",logoRoute);
app.use("/api/marquee",marqueeRoutes);
app.use("/api/carousel", carouselRoutes);

app.use("/api/videos", videoRoutes);
app.use("/api/slider", sliderRoutes);

app.use("/api/news-category",newsCategoryRoutes);
app.use("/api/news",newsRoutes);

app.use("/api/clubs-category",clubsCategoryRoutes);
app.use("/api/clubs", clubsRoutes);

// app.use("/uploads",express.static("uploads"));
app.use("/api/iqac",iqacRoutes);
app.use("/api/iqac-document",iqacDocumentRoutes);
app.use("/api/iqac-team",iqacTeamRoutes);

app.use("/api/achievements",achievementRoutes);

app.use("/api/governing-body",governingBodyRoutes);
app.use("/api/founder-message",founderMessageRoutes);
app.use("/api/faculty",facultyRoutes);

app.use("/api/testimonials", testimonialRoutes);


app.use("/api/application",applicationRoutes);
app.use("/api/gallery-category",galleryCategoryRoute);
app.use("/api/gallery-image", galleryImageRoutes);
app.use("/api/feedback",feedbackRoutes);

app.use("/api/auth",authRoutes);

app.use("/api/aicte",aicteRoutes);
app.use("/api/aqar"
  ,aqarRoutes);
app.use("/api/nirf",nirfRoutes);
app.use("/api/naac",naacRoutes);
app.use("/api/aqar-committee",aqarCommitteRoutes);

// Database Connection
// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database Error:", err);
    return;
  }

  console.log("MySQL Connected");
  connection.release();
});

app.listen(
  Number(process.env.PORT),
  () => {
    console.log(
      `Server running on port ${process.env.PORT}`
    );
  }
);