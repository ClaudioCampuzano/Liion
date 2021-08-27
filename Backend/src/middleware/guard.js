import { auth } from '../config/config'


//tarea para crack, pasar tanto el request en axios (front) por el body
//y recibirlo y analizarlo en el body y no en los headers, saludos rey


const checkTkn = (req) => {
  if (req.headers.token){
      //console.log('tkn')
      return req.headers.token
    } else{
      return null
    }
}


export const checkIsAuth = async (req, res, cb) => {
  let tkn = checkTkn(req)
  if (tkn){
    try {
      const res = await auth.verifyIdToken(tkn)
      //el callback es una funcion que se ejecuta una vez pasado lo anterior
    //para nuestro caso es como un 'filtro' que filtra las llamadas
      cb() //woo dale crack con el callback!!
    } catch(e){
      res.status(403).send('Unauthorized')
    }
    
    
    }
  else{
    res.status(403).send('Unauthorized')
  }
}