'use strict';

const express = require('express');
const expressWs = require('express-ws')(express());
const router = express.Router();


/* GET home page. */
router.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
        req.app.ras.write(msg)
        // ws.send(msg);
    })
});

module.exports = router;
