import express from "express";
import cors from "cors";
import morgan from "morgan";


const app = express();

app.set("port", 3000);

//Para que aplicacion puedan conectarse al servidor
app.use(cors());

//Para ver las peticiones http
app.use(morgan("dev"));

//con esto el servidor entiende que recibe un json y posibilita leerlo
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


export default app;
