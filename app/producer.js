const { Kafka } = require('kafkajs');
const Log = require('./Log');
const fs = require('fs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9093']
})

const producer = kafka.producer()

const produce = async (data) => {

    await producer.connect()
    await producer.send({
        topic: 'logs',
        messages: [
            { value: data }
        ],
    })
    await producer.disconnect()
}
module.exports = produce
