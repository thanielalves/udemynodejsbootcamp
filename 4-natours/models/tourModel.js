const admin = require('firebase-admin'); //FIREBASE

console.log('Vou pegar raiz do banco');

// const db = admin.database();

console.log('PEGUEI raiz do banco');

// const usuario = db
//   .collection('natours')
//   .doc('name')
//   .get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('Não achou Top Lanches.');
//     }
//   })
//   .catch(err => {
//     console.log('Erro ao buscar Top Lanches.', err);
//     process.exit();
//   });

module.exports = admin;

// getPedido().then(result => {
//   console.log(result.body);
// });

// function getPedido() {}

//consultas
// const query = db.ref('1');

// query.on('value', snap1 => {
//   console.log(snap1.val());
// });
