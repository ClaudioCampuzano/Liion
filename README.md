# Liion
Proyecto para memoria de tiulación UTFSM 2020

## Tecnologias a utilizar


- **Front-End**: React Native
- **Back-End**: Node.js
- **Servicios**: Docker, Kubernetes

### Caracteristicas generales de la aplicacion

Aqui se enumeran las caracteristicas de la solucion:

- Dos aplicacion 
- Login (Gmail, Icloud, email).
- Agendar un viaje por parte del conductor.
- Realizacion de un viaje.
- Feedback al finalizar el viaje por parte de los usuarios.
- Servicio de logs.
- La aplicacion se preocupa de que se llegue a destino.
- Metodos de pago (se paga al terminar el viaje, cargos se dejan pendientes en las tarjetas): Match (para debito), Suscripcion tarjeta de credito.
- Chat vinculados al viaje.
- Pasajero puede publicar solicitud de viaje (se agrega manito de aventon en un mapa).
- Implementacion de seguridad para la verificacion de usuarios QR.
- Posibilidad de poder agendar viajes para otra persona, mandando reserva por email con QR para verificacion del conductor.
- Boton de emergencia para usuarios en un viaje (envio de email y sms a contactos de confianza con el link a informacion del viaje en una pagina web)

### Producto viable mínimo (MVP)

En conjunto con profesores se han definido caracteristicas minimas para realizar, los cuales son:

- Agendar un viaje por parte del conductor
- Feedback al finalizar el viaje por parte de los usuarios
- Realizacion de un viaje

#### Perfiles de usuarios

Se reconocen los siguientes usuarios de la App:

- Pasajeros
- Conductores
- Asistente de consultas (Moderadores)
- Administradores


#### Modelo de fijacion de precios y comisiones de App

Se propone un modelo de comparticion completa de gastos, donde el costo total vendra determinado por variables como:

- Valor combustible utilizado por automovil
- Distancia entre origen-destino
- Peajes
- Comisiones
- Rendimiento mixto por kilometro del vehiculo

El costo final, se dividira por la cantidad maxima de asientos del vehiculo, y se sugirira dicha tarifa al conductor.

#### Observaciones generales por parte de profesores guias:

- Diagramas de navegacion separarlos por tipo de usuario, o casos de usos.
- La informacion de los viajes debe resguardarse por cierta cantidad de tiempo.
- Diagrama con los servicios asociados, cuantas Apis, cuantas base de datos.
- Argumentos de por que utilizar ciertas tecnologias.
