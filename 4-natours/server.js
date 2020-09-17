const dotenv = require('dotenv');
const admin = require('firebase-admin'); //FIREBASE
const app = require('./app');

dotenv.config({ path: './config.env' });

console.log('Vou Iniciar o BD');

//Inicializa BD Firebase
const dburl = process.env.DATABASE_TESTE;
const serviceAccount = process.env.SERVICE_ACCOUNT;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${dburl}.firebaseio.com/` //teste
});

console.log('Iniciei o BD');

//consultas testa bd
const query = admin.database().ref('1');

query.on('value', snap1 => {
  console.log(`Consulta teste resultado: ${snap1.val()}`);
});

//SERVER
//Servidor escutando na porta 3000
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
