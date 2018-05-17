const express = require('express');
const path = require('path');
const hsts = require('hsts');

const app = express();
const port = 8081;

//console.log('process.env :', process.env)

// app.use(hsts({
//   maxAge: 31536000,
//   includeSubDomains: true,
//   preload: true
// }));

console.log('START', new Date())

app.use(express.static(path.join(__dirname, './../build')));


app.get('/', (req, res) => res.send('Hello World!'))


// app.route('*').all((req, res) => {
//   res.send('COUCOU')
//   // console.log('TRY TO ACCESS to  ' + __dirname)
//   // res.sendFile(path.join(__dirname + './../build/index.html'));
// });


app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
