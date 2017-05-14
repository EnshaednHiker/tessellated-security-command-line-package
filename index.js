

const fs = require('fs');
const path = require('path');
var prompt = require('prompt');
const args = require('minimist')(process.argv.slice(2));
const child = require('child_process').exec;

//Want to confirm whether user has passed in any runtime flags and only run the appropriate prompts for the ones that are missing.
//Figuring out how to selectively run prompts.
//Then, what next if you have all of your info?
//two wrapper functions, one for token and one for wifi 

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
      console.log('1. The .env file has been saved!');
    })
  })
  .then(() => {
    fs.writeFile('.tesselinclude', '.env', (err) => {
      if (err) throw err;
      console.log('2. The .tesselinclude file has been saved!');
    })
  })
  .then(() => {
      //invoke t2 push command so that tessel.js plus its dependencies get pushed to the tessel
      child("t2 push tessel.js", (err)=>{
        if (err) throw err;
        console.log("3. Command 't2 push tessel.js' entered in the command line. Files pushed to the tessel!");
        console.log("You can now install your tessel on your door of choice.")
      });
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


 


