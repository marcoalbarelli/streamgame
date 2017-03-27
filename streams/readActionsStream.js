'use strict';

const Writable = require('stream').Writable
const WebSocket = require('ws')

class ReadActionStream extends Writable {

    constructor(options) {
        super(options)
        if(options.wss){
            this._wss = options.wss
        }
        this._currentAmount = 0
    }

    write(chunk) {
        this._currentAmount++
        const self = this
        if(this._currentAmount % 10 == 0){
            this._wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(self._currentAmount);
                }
            });
        }
    }

    getCurrentAmount(){
        return this._currentAmount
    }
}

module.exports = ReadActionStream
