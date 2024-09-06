import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/indexRouter";

const app = express();

app.use(express.json())
app.use(cors()) 
app.use(morgan("dev"))
app.use(indexRouter)

export default app;