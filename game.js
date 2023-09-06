var userClickedPattern=[];
var buttoncolors=["red","blue","green","yellow"];
gamePattern=[];
var level=0;
var started =false;
$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        //console.log("Success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()},1000);
            
        }
    }
    else{
        //console.log("Wrong");
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}
function nextSequence()
{
    userClickedPattern=[];
    level++; 
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
   
   
    
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentcolor){
$("#"+currentcolor).addClass("pressed");
setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
},100)
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
