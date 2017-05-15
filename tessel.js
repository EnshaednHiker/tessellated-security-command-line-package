#!/usr/bin/env node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096


//if somebody types:

//1. tessellated-security

//2. tessellated-security --token

var dotenv = require("dotenv");
var tessel = require('tessel');
var five = require("johnny-five");
var TesselIO = require("tessel-io");
var request = require("request");
var path = require('path');


dotenv.config({path:path.join(__dirname,'.env')});

var board = new five.Board({
  
  io: new TesselIO()
});

var bearerToken = process.env.TOKEN;

board.on("ready", function() {
 
  var door = new five.Switch({
    pin: "a2",
    // Contact Mode: Normally Open (default!), invert: true assumes that the switch (magnets) start connected
    invert: true,
  });

    door.on("open", () => {
      console.log("magnet disconnected, door opened")
        request.post({
          headers: {"Authorization": `Bearer ${bearerToken}`,"Content-Type": "application/json"},
          uri: 'https://tessellated-security.herokuapp.com/tessel',
          body: JSON.stringify({payload: `${bearerToken}`}),
          JSON: true  
        },
        function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); 
        
          if (error) {
            return console.error('upload failed:', error);
          }
          console.log('Upload successful!  Server responded with:', body);
        });
    });

    door.on("close", ()=> console.log("magnet reconnected, door closed"));
});


