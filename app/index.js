const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const responseTime = require('response-time')
const { Kafka } = require('kafkajs')
const consumer = require("./consumer");
const produce = require('./producer');
const Log = require('./Log');
const fsPromises = require('fs').promises

mongoose.connect('mongodb://mongo:27017/kafka', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected')
});

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9093']
})


app.use(express.static('public'))
app.get('/logs', async (req, res) => {
    Log.aggregate()
        .match({ timestamp: { $gte: new Date(Date.now() -  60 * 60 * 1000).valueOf() } })
        .group({ _id: '$method', requests: { $push: { y: '$response', x: '$timestamp' } } })
        .sort('_id')
        .then(lgs => {
            if (lgs.find(x => x._id === 'GET') === undefined) {
                lgs.push({_id: 'GET', requests: []})
            }
            if (lgs.find(x => x._id === 'POST') === undefined) {
                lgs.push({_id: 'POST', requests: []})
            }
            if (lgs.find(x => x._id === 'DELETE') === undefined) {
                lgs.push({_id: 'DELETE', requests: []})
            }
            if (lgs.find(x => x._id === 'PUT') === undefined) {
                lgs.push({_id: 'PUT', requests: []})
            }


            res.statusCode = 200;
            res.contentType('application/json')
            res.json(lgs)
        })
})

app.use(responseTime(async (req, res, time) => {
    const data = req.method + ',' + time + ',' + (+ new Date()) + '\n'
    try {
        await fsPromises.appendFile('log.txt', data);
        await produce(data)
      } catch (error) {
        console.log(error)
      }
}))
app.get('/api', (req, res) => {
    res.send('Request handled successfully.')
})

app.post('/api', (req, res) => {
    res.send('Request handled successfully.')
})
app.put('/api', (req, res) => {
    res.send('Request handled successfully.')
})
app.delete('/api', (req, res) => {
    res.send('Request handled successfully.')
})

consumer().catch((err) => {
	console.error("error in consumer: ", err)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})