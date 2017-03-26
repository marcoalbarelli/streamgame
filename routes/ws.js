'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.ws('/echo', function(ws, req) {
    ws.on('open', function open() {
        ws.send('something')
    })
    ws.on('message', function(msg) {
        ws.send(msg);
    })
});

module.exports = router;
