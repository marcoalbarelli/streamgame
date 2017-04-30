'use strict';

const Writable = require('stream').Writable
const WebSocket = require('ws')

class ReadActionStream extends Writable {

    constructor(options) {
        super(options)
        if(options.wss){
            this._wss = options.wss
        }
        this.MAX_CAPACITY = 2180
        this._currentAmount = 0
    }

    write(chunk) {
        if(chunk == 'leak'){
            this.simulateLeak()
        } else  {
            this._currentAmount++
        }

        if(this.checkIfGlassIsFull()) {
            this.sendGlassHasBeenFilled()
        } else {
            this.sendLevel()
        }
    }

    checkIfGlassIsFull() {
        if(this._currentAmount >= this.MAX_CAPACITY) {
            return true
        }
        return false
    }

    sendLevel() {
        const self = this
        if(this._currentAmount % 10 == 0){
            this._wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(self._currentAmount)
                }
            })
        }
    }

    sendGlassHasBeenFilled() {
        const self = this
        this._wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send('glassHasBeenFilled')
            }
        })
    }

    simulateLeak() {
        this._currentAmount = 0
    }

    getCurrentAmount(){
        return this._currentAmount
    }
}

module.exports = ReadActionStream
