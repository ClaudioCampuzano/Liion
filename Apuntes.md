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
 
 console.log("Hola mundo") Escribiendo en el la consola
 documnent.rite("Hola mundo") Escribiendo en el documento
 
#### variables
var jiro = 5 // Variable local (funcion) o global (programa)
let jiro2 = 4 // Variable que tiene alcance en el bloque que se a definido, no fuera de el
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
- Isomorfismo
   - Puede estar en el frontend(js), backend (nodejs), persistencia de datos (firebase, mongodb)
- ; no es necesario siempre que no se quiera escribir todo en una pura linea
- Sensibilidad a mayusculas
- Comentarios
  - //
  - /* */
- Nombres (identificador) de variables:
  - Deben comenzar con alguna "letra", "_" o "$".
- El identificador no se puede repetir entre variables, funciones
- Tipo de dato:
  - Primitivos 
    - string
    - number
    - boolean
    - null
    - undefined
    - NaN
  - Compuestos
    - object ={}
    - array =[]
    - function() {}
    - class {}
