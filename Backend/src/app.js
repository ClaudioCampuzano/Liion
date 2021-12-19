import express from "express";
import cors from "cors";
import morgan from "morgan";

import index from "./routes/index"


const app = express();


//app.set('case sensitive routing', true);

app.set("port", 3000);
//Para que aplicacion puedan conectarse al servidor
app.use(cors());
//Para ver las peticiones http
app.use(morgan("dev"));
//con esto el servidor entiende que recibe un json y posibilita leerlo
app.use(express.json());
//Para indicarle al servidor que solo se recibiran datos en formato json
app.use(express.urlencoded({ extended: false }));
//routes
app.use(index)


export default app;
