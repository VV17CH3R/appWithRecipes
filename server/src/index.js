import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { recipesRouter } from "./routes/recipesRouter.js";
import { usersRouter } from "./routes/usersRouter.js";

const app = express();

app.use(express.json());    //transform request to JSON
app.use(cors());      // routes for request

app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb://127.0.0.1:27017/recipes");
     
app.listen(3001, () => console.log("SERVER STARTED ON PORT 3001"));






