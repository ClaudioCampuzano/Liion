* components: Los componentes que tendrá nuestra APP, un Input para un formulario, un Avatar para los usuarios o cualquier cosa que nos permita refactorizar código.
* constants: Aquí podemos guardar constantes de nuestro proyecto, colores, alto y ancho de la pantalla actual y en definitiva valores que nunca cambiaran.
* hooks: los hooks nos permiten escribir código de una forma diferente a cómo lo hacemos con clases, a mi particularmente me gusta más utilizar clases por que a mi parecer queda un código más limpio y ordenado.
* navigations: Aquí podremos guardar las distintas navegaciones de nuestra APP, por ejemplo una para usuarios identificados y otra para usuarios que no lo estén.
* screens: Cada una de las pantallas de nuestra APP, Login, Registro, Perfil etcétera.
* App.js: El punto de entrada de nuestra aplicación.
* app.json: Aquí se guarda la configuración de Expo para nuestro proyecto, la orientación, icono, splash screen, la versión etcétera.



*** import Constants from 'expo-constants';
Constants.manifest.extra.firebase

en app.json

,
    "extra": {
      "firebase": {
        "apiKey": "AIzaSyAws3eS4-VkD3MSW-5BZPVTsjcN4znGSJE",
        "authDomain": "liion-c9560.firebaseapp.com",
        "databaseURL": "https://liion-c9560.firebaseio.com",
        "projectId": "liion-c9560",
        "storageBucket": "liion-c9560.appspot.com",
        "messagingSenderId": "493652029722",
        "appId": "1:493652029722:android:217c633a2b35791a447ca3"
      }
    }
