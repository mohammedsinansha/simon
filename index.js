$(document).ready(function() {
    var btn = $("#how-to-play-btn");
    var instructions = $("#instructions");
  
    btn.on("click", function() {
      instructions.slideToggle("slow");
    });
  });
  

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
 var userClickedPattern =[];

 var started = false;
 var level = 0;

 $(document).keydown(function () {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

 } );



$(".btn").click(function(){


    userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animate(userChosenColour);



    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
  
  });
  
  
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");


        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function() {
      $("body").addClass("game-over");
    }, 400);
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 600);
    $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
       
    }
}


function  nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber= Math.floor(Math.random()* 4 );
    console.log(randomNumber);

    
    var randomChosenColour = buttonColours[randomNumber];


    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name){


var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}


function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");


    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}