import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 8000;
connectDB(); // database connection function

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(hpp());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
