var coloursList = ["green", "red", "yellow", "blue"];
var sysButnPattern = [];
var userButnPattern = [];

var start = false;


//Initial jquery
$("#gameover-image").hide();


//starting the game
$(document).keypress(function(){
  if(!start){
    start = true;
    $("#turn").show().text("Remember this colour");
    $("#gameover-image").hide();
    $("#level-title").text("Game Started");
  //  $("#turn").text("Remember this colour");

    setTimeout(function (){
      paternGenerator();
    }, 1000);
  }
})

//Patern generator
function paternGenerator(){
  userButnPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColour = coloursList[randomNumber];
  sysButnPattern.push(randomColour);
  //console.log("generated - " + coloursList[randomNumber]);
  $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);

  setTimeout(function (){
    $("#turn").text("Your Turn!");
  }, 1000);
}

//registering the user clicks
$(".btn").click(function(){
  var pressedButton = $(this).attr("id");
  userButnPattern.push(pressedButton);
  $("#" + pressedButton).fadeIn(100).fadeOut(100).fadeIn(100);

  var currentColourIndex = userButnPattern.length - 1;

  if(userButnPattern[currentColourIndex] === sysButnPattern[currentColourIndex]){
    playSound($(this).attr("id"));
    if(userButnPattern.length === sysButnPattern.length){
      $("#turn").text("Remember this colour");
      setTimeout(function (){
        paternGenerator();
      }, 1000);
    }
  }
  else{
    gameEnd();
  }
})



// Game End
function gameEnd(){
  playSound("wrong");
  $("#turn").hide();
  $("#gameover-image").show();
  $("#level-title").text("Game Over, Press Any Key to Restart");

  colourFlash();

  start = false;
  sysButnPattern = [];
  userButnPattern = [];
}

//background colour flash
function colourFlash(){

  $("body").attr("id", "getting-wrong");
  setTimeout(function(){
    $("body").removeAttr("id", "getting-wrong");
  }, 300);
}

//play sounds
function playSound(sound){
  var audio = new Audio ("sounds/" + sound + ".mp3")
  audio.volume = 0.05;
  audio.play();
}
