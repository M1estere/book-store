const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const redis = require('redis');
const connectRedis = require('connect-redis');

const session = require('express-session');

const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth_handle');

const RedisStore = connectRedis.default;

const app = express();

const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
});
redisClient.connect().catch(console.error);

app.use(
    session({
        store: new RedisStore( {client: redisClient} ),
        secret: 'SESSION_SECRET',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 30,
            httpOnly: true
        }
    })
);

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use('/', pagesRouter);
app.use('/request/auth', authRouter);

app.use(function(req, res, next){
    console.log(req.originalUrl);
    next();
});


app.all('*', (req, res) => {
    res.status(404).render('pages/404');
}); 

app.listen(3000, function(){
    console.log(`[x] SITE IS RUNNING [x]`);
});