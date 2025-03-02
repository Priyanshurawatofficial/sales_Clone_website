let gameseq=[];
let userseq=[];
let btns=["yellow","red","blue","green"]
let started=false;
let level=0;
let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
     if(started==false)
        { 
     
      started=true;
      levelup();    
    } 
    

})
function gameflash(btn)
{
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    },150)
    console.log("game sequence-",gameseq);
}
function userflash(btn)
{
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash")
    },150)
}

function levelup(){
    userseq=[];
    level++;
    h3.innerText=`Level:${level}`
    let randidx=Math.floor(Math.random()*4);
    let randclass=btns[randidx];
    let randbtn=document.querySelector(`.${randclass}`);
    gameseq.push(randclass);
    
    gameflash(randbtn);
}

function checkans(idx){
    
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length)
        {
        setTimeout(levelup,500);
        }
    }
    else{
        h3.innerHTML=`<b>GAME OVER!<b><br> <b>YOUR SCORE WAS ${level}<b> <br>Press any key to start`;
        updateScore(level);         
        let body=document.querySelector("body");
        body.classList.add("end");
        setTimeout(() => {
              body.classList.remove("end");
        },300);
       reset();
    }

}

function btnpress(){
    let btn=this;
    userflash(btn);
    let btnclr=btn.getAttribute("id");
    
    userseq.push(btnclr);
    console.log("userseq",userseq)
    
   checkans(userseq.length-1);    
}

let allbtns=document.querySelectorAll(".box");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    
    started=false;
    level=0;
    gameseq=[];
    userseq=[];
}
let highestScore = localStorage.getItem("highestScore"); // Retrieve saved highest score
document.querySelector("#highest-score").innerText = highestScore; // Display it

function updateScore(currentScore) {
    if (currentScore > highestScore) {
        highestScore = currentScore;
        localStorage.setItem("highestScore", highestScore); // Save new highest score
        document.querySelector("#highest-score").innerText = highestScore; // Update display
    }
}
