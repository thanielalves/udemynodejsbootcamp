const fs = require('fs'); //modulo de arquivos
const http = require('http');//modulo do server web
const url = require('url');//manipulador de rotas

////////////////////////////////////////////
///FILES
//Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written!');

// //Non-Blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err,data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data1}\n${data3}`,'utf-8',err => {
//                 console.log('You file has been written @');
//             })
//         });
//     });    
// });
// console.log('Will read file!!');

////////////////////////////////////////////
///SERVER
//Le o arquivo de forma sincrona
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); //formata o arquivo em obj JSON

const server = http.createServer((req, res) => {    
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW!!');    
    }else if(req.url === '/products'){
        res.end('This is the PRODUCT!!');
    }else if(req.url === '/api'){

        console.log(__dirname);//devolve o diretorio local de execução da aplicação 

        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(data);
    }
    else{
        res.writeHead(404,{ //devolvendo cabeçalhos http personalizado
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found.</h1>');
    }
    
});

server.listen(8000, '127.0.0.1',() => {
    console.log('Listening to requests on port 8000.');
});