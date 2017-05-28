#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
var prompt = require('prompt');
const args = require('minimist')(process.argv.slice(2));
const child = require('cross-spawn');



//add token to the prompt
if (!args.token){
  promptToken();
}
else {
  saveToken(args.token);
}

function saveToken (token){
  console.log(token);
  console.log("Steps 1, 2, and 3, will prepare your files to pushed onto your tessel device. Step 3 will take several minutes to complete, so please wait patiently. Please wait to disconnect your tessel from power until all three steps have concluded.")
  let promise = new Promise(function(resolve,reject){
    resolve(1);
  });
  return promise
    .then(() => {
      fs.writeFile('.env', `TOKEN=${token}`, (err) => {
        if (err) throw err;
        console.log('The .env file has been saved!');
      })
    })
    .then(() => {
      fs.writeFile('.tesselinclude', '.env', (err) => {
        if (err) throw err;
        console.log('The .tesselinclude file has been saved!');
      })
    })
    .then(() => {
        //invoke t2 push command so that tessel.js plus its dependencies get pushed to the tessel
        let push = child("t2", ["push", "tessel.js"],{stdio: 'inherit'});
        console.log(push.on);
        push.on("close",(code)=>{
            console.log(`Child exited with code ${code}`);
            console.log("Command 't2 push tessel.js' entered in the command line. Files pushed to the tessel!");
            console.log("You can now disconnect your tessel from power and install it on your door of choice.Anytime you now connect the tessel power and are connected to wifi, the security system will run.");
          })
      });
  };


function promptToken (){
//token schema
  var schema = {
    properties: {
       token: {
        pattern:/^[0-9a-zA-Z]*\.[0-9a-zA-Z]*\.[0-9a-zA-Z-_]*$/,
        message: "The token must must only be numbers, uppercase letters, lower case letters, or the symbols '-', '_', or '.'. No whitespace or additional symbols.",
        description: "Enter your token",
        required: true
      }
    }
  };
//prompt.get
  prompt.get(schema, function (err, result) {
      saveToken(result.token); 
  });
//prompt.start
  prompt.start();
};


 


