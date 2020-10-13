const express        = require('express'); 
const MongoClient    = require('mongodb').MongoClient; 
const bodyParser     = require('body-parser'); 
const app            = express();
const port           = 8000;
// исправьте параметры внутри следующей строки
const uri = "mongodb+srv://marina:marina@cluster0.iczim.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = 'Test'; // можете исправить на другое имя, если хотите

// Некоторые настройки безопасности
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
});

// Для отправки post-запросов и чтения get-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async function () {
  let client;

  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    });
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    require('./app/routes')(app, db);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  } catch (err) {
    console.log(err.stack);
  }
})();


