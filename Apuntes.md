## React Native 

- Documentacion react-native -> https://reactnative.dev/docs/getting-started
- Documentacion expo-sdk -> https://docs.expo.io/

- desarrollo hibrido, rendimiendo desarrollo nativo  y beneficio desarrollo web,
 
 ### Expo en windows 
 -  choco install -y nodejs.lts python2 openjdk8
 - install https://expo.io/learn
 
 ## Expo anotaciones
 - expo : No se puede cargar el archivo C:\Users\claud\AppData\Roaming\npm\expo.ps1 porque la ejecución de scripts está deshabilitada en este sistema. Para obtener más información, consulta el tema about_Execution_Policies en https:/go.microsoft.com/fwlink/?LinkID=135170 
 https://www.blai.blog/2019/05/habilitar-ejecucion-de-archivos-ps1-en.html
 
- Tipos de workflow en expo https://docs.expo.io/introduction/managed-vs-bare/
   - 🚫🔒 Expo nunca lo bloquea , puede "expulsar" en cualquier momento y su proyecto será solo un proyecto nativo típico con los paquetes React Native y Expo SDK que su aplicación está usando instalados y configurados.
   - 🆕 Si es nuevo en el desarrollo móvil o nuevo en el desarrollo en general, le recomendamos que utilice el flujo de trabajo administrado. Existe una gran cantidad de complejidad que viene junto con la cadena de herramientas de desarrollo nativa y el flujo de trabajo administrado le permite lidiar con esa complejidad solo cuando es absolutamente necesario.
   - 🧠 Si tiene más experiencia , tampoco está de más comenzar cada nuevo proyecto con el flujo de trabajo administrado y solo "expulsarlo" si es necesario.
En resumen, use el flujo de trabajo simple cuando lo necesite debido a limitaciones; de lo contrario, use el flujo de trabajo administrado y lo más probable es que desee comenzar con el flujo de trabajo administrado.
 
## Cursos encontrado
- https://www.udemy.com/course/aplicaciones-moviles-con-react-native-desde-cero/
- https://www.udemy.com/course/react-native-en-espanol-curso-desde-cero/
- https://www.udemy.com/course/react-native-expo-creando-mini-tripadvisor-de-restaurantes/
- https://www.udemy.com/course/react-native-expo-y-redux/
- https://www.udemy.com/course/react-native-crea-aplicaciones-moviles-reales-ios-y-android/
- https://www.udemy.com/course/mern-mongodb-express-react-native-nodejs/ (2) no tiene expo
- https://www.udemy.com/course/react-native-en-espanol-curso-completo/ (1) tiene expo

- https://es.coursera.org/learn/react-native    este primero
- https://es.coursera.org/specializations/full-stack-react

## Requisitos para ser conductor en diferentes app
- https://www.uber.com/cl/es/drive/requirements/
- https://cabify.com/cl/conductores
- https://didimexicoglobal.com/requisitos-didi/

## Tutoriales usados:
- https://medium.com/nycdev/create-a-react-native-app-with-google-map-using-expo-io-68041252023d -> implementacion de google maps


- https://medium.com/@arjayosma/set-up-firebase-phone-authentication-in-expo-sdk-37-without-ejecting-8a472460b1cf -< authotentification phone
clonar -> yarn install -> En firebase crear app web, y copiar esos parametros en el programa -> yarn start
https://www.youtube.com/watch?v=wCl3uKmDzvI

## Datos Js
``` 
 console.log("Hola mundo") Escribiendo en el la consola
 documnent.rite("Hola mundo") Escribiendo en el documento
 ```
#### variables
var  // Variable local (funcion) o global (programa)
let // Variable que tiene alcance en el bloque que se a definido, no fuera de el
const jiro3 = 5; // constantes

var a = 5;
var b = 10;

if (a === 5) {
    let a = 4; // El alcance es dentro del bloque if
    var b = 1; // El alcance es global

    console.log(a);  // 4
    console.log(b);  // 1
}

console.log(a); // 5
console.log(b); // 1

//forma de escribir variables camelcase
let userName

### Caracteristicas Js
- Isomorfismo: Puede estar en el frontend(js), backend (nodejs), persistencia de datos (firebase, mongodb)
- ";" no es necesario siempre que no se quiera escribir todo en una pura linea
- Sensibilidad a mayusculas
- Comentarios
  - //
  - /* */
- Nombres (identificador) de variables:
  - Deben comenzar con alguna "letra", "_" o "$".
- El identificador no se puede repetir entre variables, funciones
- Tipos de dato:
  - Primitivos 
    - string
    - number
    - boolean
    - null: no tiene valor, pero por q el programador se lo indico
    - undefined: no tiene valor, pero por que no a sido inizialida, )
    - NaN: "not a number"
  - Compuestos
    - object: let persona = {nombre:"Jon", edad:35}
      - acceso persona.nombre = "perro"
      - Un objeto como es logico, puede contener muchas cosas, incluso objetos o otras variables (atributos) o funciones (metodos)
      ```
      const jsn = {
        nombre: "Jon",  //atributos
        saludar: function(){ //Metodos
           console.log(`Hola me llamo ${this.nombre}`)  //this se ocupa para hacer referencia a la propio contexto del objeto
        }
      }
      console.log(jsn.nombre)
      ```
    - array: let color = ["negro","azul","blanco"]
      - color.push["verde"]
    - function() {}
    - class {}
-  Ambitos de bloques, se debe declarar con la palabra "let"  (solo existe en el bloque que fue definido if, funcion, while, etc), usar "var" es una mala practica siempre usar "let".
- const (en primitivos no cambian, en compuestos, se pueden agregar o cambiar propiedades lo q no cambia de naturaleza es el objeto en si)-> variables que nunca cambiar, let -> variables que cambian
-  Web con documentacion casi oficial (muchos metodoso para todo): https://developer.mozilla.org/es/docs/Web/JavaScript
- Concatenacion de string "+"
- template String `aqui el string`(evitamos usar el +) sirve para la generacion de codigo html dinamicamente desde el js, podemos usar "salto de linea entre medio y no afecta al stringo, no como al usar comillas simples"
  - let apellido = dale
  - let nombre = jiro
  - let saluda = `hola mi nombre es ${nombre} ${apellido}`
- Funciones:
  - Funcion declarativa: puede ser llamada desde cualquier lugar, independiente de su posicion en el codigo.
  ```
   function unafuncion() {
     console.log(jiro)
     return "Dale jiro"
   }
   
   unafuncion()
   
   let valorDeFuncion = unafuncion() -> Dale jiro
   ```
  - Funcion anonima: funcion sin nombre,  solo puede ser llamada despues de su declaracion , funcion expresada, variable a la q se le asigna una funcion anonima
  ``` const funcionExpresada = function(){
  }
  
  functionExpresada();
  ```
- Para este tipo de funciones dentro de metodos, revisar el callback del metodo, para saber que cosas podemos ponerle, en el caso de forEach podemos indicarle hasta 3 parametros, valor, indice, y arreglo, en este caso se usan los dos primeros solamente.
``` colores = ["azul","negro","blanco"]
      colores.forEach(function(el, index){
         console.log(`<li id="${index}` "> ${el} </li>`)
      })
   ``` 
- El igual (=) en js
  - = asignacion de variables
  - == comparacion de valores
  - === comparacion de tipo de dato y de valor
- || o, && y
- Operador ternario:
```
let edad = 13
let eresMayor = (edad >= 18)
  ? "Eres mayor";
  : "Eres menor";
console.log(eresMayor) -> eres menor
```
- Ciclos: while, for, do
- Manejo de errores
``` 
try {
  let numero = 10
  if (isNaN(numero))
     throw new Error("El caracter no es numero) // con throw manejamos nosotros el error y le indicamos que q tipo de error es
)
}catch(error){
   console.log(`error ${error}`)
}finally{ // se ejecuta despues del try o el catch, si o si
}
```
- continue a diferencia del break no rompe el ciclo, si no q mata todo lo q este debajo de él y se salta a la siguiente iteracion
- Destructuracion: 
```
const numeros = [1,2,3]
let uno = numeros[0],
dos = numeros [1],
tres = numeros [2];

const[one,two,thre] = numeros; // Destructuracion

let persona = {
nombre :"jiro",
apellido:"to"
}
const{nombre, apellido} = persona //al hacer restructuracion en objetos, la variable que trato de crear, debe llamarse igual que en el objeto
```
- Objetos literales: objetos que literalmente se define en la variable
``` 
let nombre = "poto", edad = 7;

const perro = { //metodo antiguo
  nombre:nombre
  edad: edad,
  ladrar:function(){
    console.log("gua")
  }
}
console.log(perro)

const dog = { //nueva manera de escritura
  nombre,
  edad,
  raza: "Callejero,
  ladrar(){ //no usar arrow function
    console.log("guagua")
  }
}

```
- Parametros REST (forma de agregar o no infinitos valores a un arreglo, funcion)& Operador Spread
```
  function sumar(a,b, ...c){ /// con los ... se le indica que lo q venga correspondera a valores que pueden ser o no infinitos, es como que da la posibilidad de indicar mas cosas a la funcion, despues de a y el b, el c sera tratado como un arreglo
    let resultado  = a+b
    c.forEach(function (n){
       resultado += n
    })
  }
 const arr1 = [1,2,3,4,5],
 arr2 = [6,7,8,9,0];
 const arr3 =[arr1, arr2] -> el arreglo arr2 es un arreglo de 2 array
 const arr3 =[...arr1, ...arr2] // sirve para expandir y crear nuevos elementos, el arra3 es un arreglo de 6 numeros
```
- Arrow Functions: nueva forma de definir funciones anonimas, vuelven mas expresivo al codigo, las funcion arrow no respeta el contexto, se saltan el contexto del objeto, y toman el contexto del padre, por ejemplo ponerle un this una funcion arrow dentro de un objeto, pescara el contexto padre, y no el del propio objeto como una funcion expresada
```
const saludar = function (jiro) //funcion expresada, funcion q retorna su parametro
  return jiro

const saludar = (jiro) =>     //funcion arrow
  return jiro


const saludar = jiro => jiro     //funcion arrow con 1 parametro, puede omitir () y si tiene un sola linea de codigo el return (return implicito)

const funcionArrow = () => {
 console..
 console..
 return "hola"
}
```
- Expresiones regulares: patrones de busqueda
``` 
let expReg= new RegExp("lorem","ig")
let expReg= /lorem/ig;

console.log(expReg.test(cadena)) --< retorna true si lo encuentra
console.log(expReg.exec(cadena)) ---> retorna un arreglo con mas info si lo encuentra
```
- Funciones anonimas autoejecutables:
```
(function(d,w,c){

})(document, windows, console);
```
- Codigo js en el html, va en el body al final de todo por q son bloqueantes, forma de integrar modulos en el html
```
<body>
<script src="js/modulos.js" type="module"></script>
<\body>

```
forma de importar de js a js
```
en constantes.js
export const nombre_funcion = algo; 
const sumar = (a,b) => a+b;
////
import {nombre_funcion, sumar} from "./constantes.js";
console.log(sumar(3,4))
```
- Temporizadores
``
setTime(() = > { // al pasar 3 seguntos (3000 ms) se ejecutara este bloque 1 sola vez
  console.log("jiro");
}, 3000);

setInterval((){ // se ejecuta cada 1 seg

}, 1000);
```
-
