let score=JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        loses: 0,
        Ties:0
    };
    updateScore();
    /*
    if(!score){

        score= {
            wins: 0,
            loses: 0,
            Ties:0
        };
    }
    */

    document.querySelector('.js-rock-btn').addEventListener('click', ()=>{
        playGame('rock');
    })
    document.querySelector('.js-paper-btn').addEventListener('click', ()=>{
        playGame('paper');
    })
    document.querySelector('.js-scissor-btn').addEventListener('click', ()=>{
        playGame('scissors');
    })

    document.body.addEventListener('keydown', (event)=>{
        if(event.key==='r'){
            playGame('rock');
        } else if(event.key==='p'){
            playGame('paper');
        } else {
            playGame('scissors');
        }
        
    });
    
    function playGame(PlayerMove) {

    const CompMove = pickCompMove();
    let res = '';

    if (PlayerMove === 'rock') {
        if (CompMove === 'rock') res = 'Tie';
        else if (CompMove === 'paper') res = 'You Lose';
        else res = 'You Win';
    }

    else if (PlayerMove === 'paper') {
        if (CompMove === 'rock') res = 'You Win';
        else if (CompMove === 'paper') res = 'Tie';
        else res = 'You Lose';
    }

    else if (PlayerMove === 'scissors') {
        if (CompMove === 'rock') res = 'You Lose';
        else if (CompMove === 'paper') res = 'You Win';
        else res = 'Tie';
    }

    if (res === 'You Win') {
        score.wins++;
    } else if (res === 'You Lose') {
        score.loses++;
    } else if(res==='Tie'){
        score.Ties++;

    }

    localStorage.setItem('score',JSON.stringify(score));

    updateScore();

    document.querySelector('.js-res').innerHTML=res;

    document.querySelector('.js-move').innerHTML=`Your move:- 
<img src= "${PlayerMove}-emoji.png" class= "move-icon">, 
computer move:- <img src= "${CompMove}-emoji.png" class= "move-icon">`;   
}

function updateScore(){
    document.querySelector('.js-score').innerHTML= `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.Ties}`;
}

function pickCompMove() {
    const randomNum = Math.random();
    let CompMove = '';

    if (randomNum < 1/3) CompMove = 'rock';
    else if (randomNum < 2/3) CompMove = 'paper';
    else CompMove = 'scissors';

    return CompMove;
}
let isautoPlaying=false;
let intervalId;
function autoplay(){
    if(!isautoPlaying){
        intervalId=setInterval(()=>{

            const PlayerMove= pickCompMove();
            playGame(PlayerMove);
        },1000)
        isautoPlaying=true;
    }else{
        clearInterval(intervalId);
        isautoPlaying=false;


    }

}