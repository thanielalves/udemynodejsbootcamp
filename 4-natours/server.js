const dotenv = require('dotenv');
const app = require('./app');
const admin = require("firebase-admin"); //FIREBASE
const serviceAccount = require("./database/serviceAccountKey.json"); //Dados de autenticacao

dotenv.config({ path: './config.env' });

//Inicializa BD Firebase
const dburl = process.env.DATABASE_TESTE;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${dburl}.firebaseio.com/` //teste
});

const db = admin.database();//Nó raiz do bd

//consultas
const query = db.ref('1');

query.on('value',snap1 => {
  console.log(snap1.val());
});

//SERVER

//Servidor escutando na porta 3000
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
