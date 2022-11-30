import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import mainRouter from "./routes/index.js";
const app = express();

const configure = () => {
  try {
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use("/api", mainRouter);
    app.listen(3000, () => {
      console.log("App is running on http://localhost:3000");
    });
  } catch (error) {
    console.log(error);
  }
};

export default configure;
