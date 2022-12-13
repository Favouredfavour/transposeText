import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

//routes
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DBURL;

mongoose
  .connect(dbUrl)
  .then((res) => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

const corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("working");
});

//send and receive message in one route
app.use("/api/message", messageRoutes);
