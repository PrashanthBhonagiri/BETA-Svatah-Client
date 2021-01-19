const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const corsOptions = {
    origin: "*",
    methods: "*",
    optionsSuccessStatus: 200
};

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.set('view engine', 'ejs');

app.use(express.static('assets'));
app.use('/css',express.static(__dirname + 'assets/css'));
app.use('/js',express.static(__dirname + 'assets/js'));
app.use('/img',express.static(__dirname + 'assets/img'));

app.get('/', async function(req, res) {
    // res.render('pages/index');
    res.send(" It's Me Svatah ");
});
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });
// app.get('/contacts', function(req,res) {
//     res.render('pages/contacts');
// });
// app.post('/contacts', function(req,res){
//     console.log(req.body);
//     res.render('pages/contacts');
// });


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});