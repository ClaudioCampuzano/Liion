<br />

<p align="center">
  <a href="https://github.com/ClaudioCampuzano/Liion">
    <img src="misc/images/logo.png" alt="Logo" width="200">
  </a>

  <h1 align="center">Carpool Liion </h1>
  <h2 align="center">Proyecto de titulación Telematica 2020</h2>
  <h3 align="center">Carlos Elgueta y Claudio Campuzano.</h3>   
</p>

# Requiremientos minimos

- nodejs-lts v14.17.4

  ```
  choco install nodejs-lts
  ```

- Expo CLI
  ```
  npm install --global expo-cli
  ```

# Paquetes instalados

## Backend

- npm i express morgan cors dotenv firebase-admin firebase (servidor para produccion, dotenv no necesario ya q nuestro repo es privado)
- npm i nodemon @babel/core @babel/cli @babel/preset-env -D (solo para la etapa de desarrollo)

## Frontend

- npm install @react-navigation/native
- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
- npm install @react-navigation/stack
- expo install expo-app-loading
- expo install expo-font
- yarn add react-native-paper [borrar]
- npm install @react-navigation/drawer
- expo install @react-native-async-storage/async-storage
- react-native-textinput-effects [borrar]
- email-validator, validate.js react-native-form-validator [borrar]
- react-native-responsive-screen
- react-native-picker-select [borrar]
- @react-native-community/datetimepicker
- add react-native-device-info [borrar]

# Servicios

## Firebase

Dirígete a Firebase.com y crea una nueva cuenta. Una vez que haya iniciado sesión, podrá crear un nuevo proyecto en Firebase Console.

- Crea una nueva cuenta en Firebase.com
- Crea un nuevo proyecto en Firebase Console
- Habilite el método de autenticación de correo electrónico y contraseña en Firebase Console -> Autenticación -> Método de inicio de sesión

# Caracteristicas generales de la App Liion

- [LINK-A-MOCKUP](https://xd.adobe.com/view/5bca987e-04d8-459d-bbb2-f714875e9b75-0e99/)
## Firebase
- Cuenta de firebase -> user: liion.carpoolapp@gmail.com --- pass: Jiroto99
- Nombre del proyecto: Liion-CarpoolApp (liion-carpoolapp)
- Servicios inicializados:
    - CloudFirestore
    - Authentication: telefono

## Producto viable mínimo (MVP)

- Identificación y registro de usuarios. - Login utilizando numero de celular.
- Crear el viaje.
- Buscar viaje - Reserva de asientos
- Mis viajes - En viaje, desde la vista de conductor y pasajero. - Iniciar viajes (mandar notificaciones a los usuarios reservados). - Verificacion de usuarios del viaje con codigo QR por parte del conductor. - Feedback cruzado al finalizar el viaje por parte de los usuarios.

## Modelo de fijacion de precios y comisiones de App

Modelo de comparticion completa de gastos, donde el costo total vendra determinado por variables como:

- Valor combustible utilizado por automovil
- Distancia entre origen-destino
- Peajes
- Comisiones
- Rendimiento mixto por kilometro del vehiculo

El costo final, se dividira por la cantidad maxima de asientos del ofertados, y se sugirira dicha tarifa al conductor.
