var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var gameStarted = 0;
var level = 1;
var clickCount = 0;

function nextSequence() {
    return Math.floor(Math.random()*4);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("div#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("div#" + currentColor).removeClass("pressed");        
    }, 100);
}

function gameLogic() {
    for (i=1; i<=level; i++) {
        setTimeout(function() {
            var randomNumber = nextSequence();
            var randomChosenColor  = buttonColors[randomNumber];
            $("div#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(randomChosenColor);
            gamePattern.push(randomChosenColor);
            console.log(gamePattern);
        }
        , 1000*i);
    }
}

// on keypress
$(document).keypress(function() {
    if (gameStarted === 0) {
        $("h1").text("Level " + level);
        gameStarted++;
        gameLogic()
    } 
})

// on click
$("div.btn").click(function(e) {
    if (gameStarted === 1) {
        var userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        if (userChosenColor === gamePattern[clickCount]) {
            clickCount++;
            if (clickCount === gamePattern.length) {
                level++;
                clickCount = 0;
                gamePattern.length = 0;
                $("h1").text("Nice!");
                setTimeout(() => {
                    $("h1").text("Level " + level);
                    gameLogic();
                }, 2000);
            } 
        } else {
            level = 0;
            clickCount = 0;
            gamePattern.length = 0;
            gameStarted = 0;
            $("h1").text("Level " + level);
            $("div.btn").hide();
            $("h1").text("Wrong...Restarting")
            setTimeout(() => {
                location.reload(true);    
            }, 2000);
        }
    }
})




