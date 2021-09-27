import express from 'express';
const app = express();
import routes from './routes';
import session from 'express-session';

app.use(session({
  secret: 'rdr212000',
  cookie: {
    maxAge: 300000
  }
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use('/',routes);


app.listen(3000, ()=>{console.log('running')})