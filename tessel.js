var five = require("johnny-five");
// 2
var Tessel = require("tessel-io");
// 3
var board = new five.Board({
  // 4
  io: new Tessel()
});
// 5
board.on("ready", function() {
  // Contact Mode: Normally Open (default!)
  var door = new five.Switch({
    pin: "a2",
    invert: true,
  });


  door.on("open", () => {
      console.log("intruder!");
      
    });

;
});