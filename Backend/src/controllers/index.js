import { db } from '../config/config'

export const get_ = async (req, res) => {
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
};

export const post_ = async (req, res) => {
                              //collecion    elemento
    const docRef = db.collection('users').doc('dioses')
    //datos del elemento
    await docRef.set({
        nombre: 'jairo',
        apellido: 'moreno',
        nacio: '0'
    })
};

export const login_foward = async (req, res) => {
    console.log('login_jiro')
    console.log(db)

};

export const delete_ = async (req, res) => {};

export const put_ = async (req, res) => {};
