import app from "./app";

app.listen(app.get('port'));
console.log("Servidor en el puerto", app.get('port'));