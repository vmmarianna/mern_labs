const { json } = require("express");
var mongo = require('mongodb');
module.exports = function (app, db) {
    app.post('/notes/add', (req, res) => {
            const note = {
                text: req.body.body,
                title: req.body.title
            };
            db.collection('notes').insertOne(note, (err, result) => {
                console.log('NOTE', note)
                if (err) {
                    console.log('ERROR',err)
                    res.send({
                        'error': 'An error has occurred'
                    });
                } else {
                    res.send(result.ops[0]);
                }
            });
        });

        app.get('/notes/all', (req, res) => {
            db.collection('notes').find({}).toArray(function(err, result) {
                if (err) {
                    console.log('An error has occurred', err)
                    res.send({
                        'error': 'An error has occurred'
                    });
                } else {
                    console.log('result:', result)
                    res.send(result);
                }
            });
     });

     app.post('/notes/delete', (req, res) => {
        var task_id = req.body.task_id
        db.collection('notes').deleteOne(
            {'_id': new mongo.ObjectID(task_id)},
            function (){
                return res.send({"delete": "ok"})
            }
        )

     });

     app.post('/notes/update', (req, res) => {
         var json_body = req.body
         var task_id = req.body.task_id
         // fix сделать копию с объекта req.body удалить поле task_id
         console.log(task_id)
         db.collection('notes').findOneAndUpdate(
             {'_id': new mongo.ObjectID(task_id)},
             {'$set': json_body},
             () => res.send({ "updete": "ok" })
             )
     
 });
    
}
