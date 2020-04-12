var buttonColor = ["red", "blue", "green", "yellow"];
var gamePatten = [];
var userClickPattern = [];
var started=false;
var level=0;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    started=true;
  }
})

$(".btn").click(function() {
  var userChosen = $(this).attr("id");
  userClickPattern.push(userChosen);

  playSound(userChosen);
  animatePress(userChosen);

check(userClickPattern.length-1);
});


function check(currentLevel){
  if(gamePatten[currentLevel]===userClickPattern[currentLevel])
  {
    console.log("success");


    if(userClickPattern.length===gamePatten.length)
    {
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();

  }
}



function nextSequence() {

userClickPattern=[];

  level++;
$("#level-title").text("Level " + level);

  var random = Math.floor(Math.random() * 4);
  var randomChosen = buttonColor[random];
  gamePatten.push(randomChosen);

  $("#" + randomChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosen);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePatten=[];
  started=false;
}
