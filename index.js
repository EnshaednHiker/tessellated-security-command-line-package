#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
var prompt = require('prompt');
const args = require('minimist')(process.argv.slice(2));
const child = require('cross-spawn');
const childExec = require('child_process').exec;
const { getInstalledPath } = require('get-installed-path');


//add token to the prompt
if (!args.token){  
  promptToken();
}
else {
  saveToken(args.token);
}

function saveToken (token){
  console.log(token);
  console.log("In two steps the system will prepare your files to pushed onto your tessel device. The second step will take several minutes to complete, so please wait patiently. WARNING: wait to disconnect your tessel from power until both steps have concluded.")
  let promise = new Promise(function(resolve,reject){
    resolve(1);
  });
  
  return promise
    .then(()=>{
      //enter command npm root tessellated-security
      //set that to cwdPath string
      return getInstalledPath('tessellated-security');
    })
    .then((tessPath) => {
      console.log(tessPath);
      return new Promise ((resolve, reject)=>{
        fs.writeFile(path.join(tessPath,'.env'), `TOKEN=${token}`, (err) => {
          if (err) {
            reject(err);
          }
          else {
            console.log('The .env file has been saved!');
            resolve(tessPath);
          }
        })
      });
    })
    // .then((tessPath) => {
    //     //invoke t2 init command to set up project environment on tessel
    //     let pushInit = child("t2", ["init"],{stdio: 'inherit',cwd:tessPath});
    //     pushInit.on("close",codeInit=>{
    //       console.log(`Child exited with code ${codeInit}`);
    //       if(codeInit===0){
    //         console.log("Command 't2 init' entered in the command line. Project area set up!");
    //       }
    //       else{
    //         console.log("Something went wrong and the project area could not be set up on the tessel.")
    //       }
    //     })
    //     return tessPath
    //   })
      .then((tessPath) => {
        //invoke t2 push command so that tessel.js plus its dependencies get pushed to the tessel
        let push = child("t2", ["push", "tessel.js"],{stdio: 'inherit',cwd:tessPath});
        push.on("close",(code)=>{
            console.log(`Child exited with code ${code}`);
            if(code===0){
              console.log("Command 't2 push tessel.js' entered in the command line. Files pushed to the tessel!");
              console.log("You can now disconnect your tessel from power and install it on your door of choice. Anytime you now connect the tessel power and are connected to wifi, the security system will run.");
            }
            else{
              console.log("Something went wrong and no files were pushed to your tessel.")
            }
          })
      })
      .catch((error)=>{
        console.log(error);
        process.exit();
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


 


