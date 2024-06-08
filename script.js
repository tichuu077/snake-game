const gamesound = new Audio('music.mp3');
const gameoversound= new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const foodsound = new Audio('food.mp3');
const body=document.getElementsByTagName('body')[0];

const board = document.getElementById('board');
const startButton = document.createElement('button');
startButton.classList.add('start_btn');
startButton.innerText='Start';
//board.appendChild(startButton);
const loginbox= document.querySelector('.login');
const inputbox= document.getElementById('user');
const continuebtn = document.querySelector('.continue');
const newuserbtn = document.querySelector('.newuser');
let user = localStorage.getItem('user');
if(user!==null){
    user = JSON.parse(user);
    inputbox.value=`continue as ${user}`;
}
else{
    loginbox.removeChild(continuebtn);

}
continuebtn.addEventListener('click',()=>{
    if(user!==null){
        board.innerHTML='';
       board.appendChild(startButton);
    }

})
newuserbtn.addEventListener('click',()=>{
    if(user!==null){
        if(loginbox.childElementCount===3){
               loginbox.removeChild(continuebtn);
                inputbox.value='enter name';
        }
        else{
            let usertext=inputbox.value;
                if(usertext==='enter name'||usertext==='please enter name')
                {
                   let usertext=inputbox.value='please enter name';
                }
                else{
                     user=usertext;
             localStorage.setItem('user',JSON.stringify(usertext))
                    board.innerHTML='';
                       board.appendChild(startButton);
                }
        }

    }   
    else{
        let usertext=inputbox.value;
        console.log(usertext)
        if(usertext==='enter name'||usertext==='please enter name')
        {
           let usertext=inputbox.value='please enter name';
        }
        else{
            user=usertext;
     localStorage.setItem('user',JSON.stringify(usertext))
            board.innerHTML='';
               board.appendChild(startButton);
        }
        }
})
const highscorebox = document.getElementById('hiscoreBox');
const scorebox = document.getElementById('scoreBox');
let score=0;
let pause=false;
let highscore=localStorage.getItem('highscore');
if(highscore!==null){
    highscore=JSON.parse(highscore);
     highscorebox.innerHTML=`Highscore : ${highscore.hscore}`

}
else{
    highscore={
        player:null,
        hscore:0
    };
}
const comment=document.querySelector('.comment');
const heading =comment.getElementsByTagName('h3')[0];
const img= comment.getElementsByTagName('img')[0];
let highscoreplayer='';
let speed=4;
let lastPaintTime=0;
let foodObj={
  x:7,
  y:8
};
let snakeArr=[{x:14,y:15}];
let inputedir={x:0,y:0};

function main(ctime) {
     
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){ 
        return;
    }
    lastPaintTime = ctime;
    if(pause){
    gameEngine();
    }
    else{
        gamesound.pause();
        return;
    }
}
function displaycomment(highscore){
    if(highscore.player!==null){
    if(highscore.player===highscoreplayer){
        return;
    }
    else{
        highscoreplayer=highscore.player;
        heading.innerHTML=`${highscore.player}'s highscore : ${highscore.hscore}`;
        setTimeout(()=>{
             heading.innerHTML='';
        },6000)
    }
    }
    else{
        return;
    }
}
function iscollide(snake){
    gamesound.play();
        for (let i = 1; i < snakeArr.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }
        if(snake[0].x > 18 || snake[0].x <=0 || snake[0].y > 18 || snake[0].y <=0){
            return true;
        }

    return false;
}
function displayboard(){
    board.innerHTML='';
    snakeArr.forEach((e)=>{
        if(pause===false){
            startButton.classList.add('start_btn');
            startButton.classList.remove('pause_btn');
            startButton.innerText='Start';
            board.appendChild(startButton);
        }
        let snake=document.createElement('div');
        snake.style.gridRowStart=e.y;
        snake.style.gridColumnStart=e.x;
        if(e===snakeArr[0]){
            snake.classList.add('head');
        }
        else{
            snake.classList.add('snake');
        }
        board.appendChild(snake);
    })
    let food = document.createElement('div');
    food.classList.add('food');
    food.style.gridRowStart=foodObj.y;
    food.style.gridColumnStart=foodObj.x;
      board.appendChild(food);  
}
function gameEngine(){
    if(iscollide(snakeArr)){
        gameoversound.play();
        alert('game  over');
        score=0;
         scorebox.innerHTML=`score : ${score}`;
        inputedir={x:0,y:0}
        snakeArr=[{x:16,y:17}];
        pause=false;
        gamesound.pause();
        board.appendChild(startButton)
    }
if((snakeArr[0].x==foodObj.x&&snakeArr[0].y==foodObj.y)||(snakeArr[0].y==foodObj.y&&snakeArr[0].x==foodObj.x)){

snakeArr.unshift({x:snakeArr[0].x+inputedir.x,y:snakeArr[0].y+inputedir.y});
    foodsound.play();
score=score+1;
    scorebox.innerHTML=`Score : ${score}`;
    if(score>highscore.hscore){
        highscore={
            player:user,
            hscore:score
        };
        displaycomment(highscore);
         highscorebox.innerHTML=`Highscore : ${highscore.hscore}`
        localStorage.setItem('highscore',JSON.stringify(highscore));
    }
    let a = 1;
    let b = 18;
    foodObj = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}
for(i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]};
}
    snakeArr[0].x += inputedir.x;
    snakeArr[0].y += inputedir.y;
   displayboard();
}
startButton.addEventListener('click',()=>{
    let check=startButton.innerText;
    if(check==='Start'){
        pause=true;
        startButton.classList.remove('start_btn');
        startButton.classList.add('pause_btn');
        startButton.innerText='Pause';
        body.appendChild(startButton)
        displaycomment(highscore);
        start();
    }
    else{
        pause=false;
        startButton.innerText='Start';
        start();
    }
})
function start(){
    if(pause){
        window.requestAnimationFrame(main);
    }
    else{
        pause=false;
    }
}

window.addEventListener('keydown', (e) => {
     inputedir = {x: 0, y: 1}; 
    switch (e.key) {
        case "ArrowUp":
            inputedir.x = 0;
            inputedir.y = -1;
            movesound.play();
            e.preventDefault();
            break;
        case "ArrowDown":
            inputedir.x = 0;
            inputedir.y = 1;
            movesound.play();
            e.preventDefault();
            break;
        case "ArrowLeft":
            inputedir.x = -1;
            inputedir.y = 0;
            movesound.play();
            e.preventDefault();
            break;
        case "ArrowRight":
            inputedir.x = 1;
            inputedir.y = 0;
            movesound.play();
            e.preventDefault();
            break;
        default:
            break;
    }
});
