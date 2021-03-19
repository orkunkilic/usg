const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');
const Log = require('./Log');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9093']
})

const consumer = kafka.consumer({ groupId: 'logs' })

const consume = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'logs'})
    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
            const msg = (message.value.toString())
            const list = msg.split(',')
            const data = {method: list[0], response:Number(list[1]), timestamp:Number(list[2])}
            const log = new Log(data)
            log.save()
                .then(log => {
                    console.log(log)
            })
    },
    })
}
module.exports = consume
