// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path,{dirname} from "path";
import { fileURLToPath } from "url";

export const app = express();
export const port = process.env.PORT || 4000;
const rutaActual=dirname(fileURLToPath(import.meta.url))

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(rutaActual, "./src/views"));

