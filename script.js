const start = document.querySelector(".start");
const body = document.querySelector("body");
const startButton = document.querySelector(".startButton");
const game = document.querySelector(".game");
const popUp = document.querySelector(".popUp");
const readyButton = document.querySelector(".readyButton");
const text = document.querySelector(".text");
const goalText = document.querySelector(".goalText");
const image = document.querySelector(".image")
const ground = document.querySelectorAll(".ground")
const hamster = document.querySelector(".hamster")
const food = document.querySelectorAll(".smallFood")
const obstacle = document.querySelectorAll(".small")
const goal = document.querySelector(".goal")
const final = document.querySelector(".final")
const endImage = document.querySelector(".endImage")
const endText = document.querySelector(".endText")
const againButton = document.querySelector(".againButton")
const homeButton = document.querySelector(".homeButton")

const clickSound = document.getElementById("click")
const completed = document.getElementById("completed")
const lose = document.getElementById("lose")

let startGame;
let score;
let total;
let jumping;
let curPos1;
let curPos2;
let once;

let o1Pos;
let o2Pos;
let o3Pos;

let f1Pos;
let f2Pos;
let f3Pos;
let f4Pos;

let once1 = false
let once2 = false
let once3 = false
let once4 = false
let once5 = false
let once6 = false
let once7 = false

let obsticles = [
    "obstacle1", "obstacle2", "obstacle3",
]

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        game.classList.remove("hide")
        ready()
    }, 200);
})

readyButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        popUp.classList.add("hide")
        startGame = true
        moveGround()
        once = jumping = false
        hamster.style.animation = "suspension 1s linear infinite"
    }, 200);
})

againButton.addEventListener("click", () =>{
    playClickSound()
    let daley = setTimeout(() =>{
        final.classList.add("hide")
        start.classList.remove("hide")
        goal.innerHTML = ""
        image.innerHTML = ""
    }, 200)
})

homeButton.addEventListener("click", ()=>{
    playClickSound()
    let daley = setTimeout(() =>{
        location.assign('https://gimme.sg/activations/dementia/');
    }, 200)
})

function ready(){
    popUp.classList.remove("hide")
    score = 0
    total = Math.floor(Math.random() * 5) + 4
    text.innerHTML = `Collect ${total} bowl of food`
    goalText.innerHTML = `${score} / ${total} Food:`

    ground.forEach(function(parts){
        console.log(ground[0])
        if(parts == ground[0]){
            console.log("1",parts)
            curPos1 = 0
            parts.style.left = curPos1 + "px"
            return
        }
        if(parts == ground[1]){
            console.log("2",parts)
            curPos2 = 2600
            parts.style.left = curPos2 + "px"
        }
    })   

    obstacle.forEach(function(parts){
        console.log(obstacle[0])
        if(parts == obstacle[0]){
            o1Pos = 500
            parts.style.left = o1Pos + "px"
        }
        if(parts == obstacle[1]){
            o2Pos = 1300
            parts.style.left = o2Pos + "px"
        }
        if(parts == obstacle[2]){
            o3Pos = 2100
            parts.style.left = o3Pos + "px"
        }
    })   

    food.forEach(function(parts){
        console.log(food[0])
        if(parts == food[0]){
            f1Pos = 450
            parts.style.left = f1Pos + "px"
        }
        if(parts == food[1]){
            f2Pos = 1350
            parts.style.left = f2Pos + "px"
        }
        if(parts == food[2]){
            f3Pos = 2100
            parts.style.left = f3Pos + "px"
        }
        if(parts == food[3]){
            f4Pos = 2600
            parts.style.left = f4Pos + "px"
        }
    })   



    for(let f = 0; f < total; f++){
        foodImage(image)
    }
}

function foodImage(place){
    let food = document.createElement("img")
        food.src = "./img/food.png"
        food.classList.add("food")
        place.appendChild(food);
}

function spawnFood(item){
    let randomSpawn = Math.random() > 0.2 ? spawnFoodItem = true : spawnFoodItem = false

    if(spawnFoodItem == true){
           item.classList.remove("hidden")
    }
}

function Computerjump(){
    let border = body.getBoundingClientRect();
    if(border.width > 1200){
        jump()
    }
}

function spawnObsticle(item){
    let randomSpawn = Math.random() > 0.4 ? spawnFoodItem = true : spawnFoodItem = false

    if(spawnFoodItem == true){
        let randomObsticle = Math.floor(Math.random() * obsticles.length)
        
        item.src = "./img/" + obsticles[randomObsticle] + ".png"
        item.classList.remove("hidden")
    }
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function jump(){
    if(startGame == true){
        playClickSound()
        if(!hamster.classList.contains("jump")){
            hamster.style.animation = ""
            jumping = true
            hamster.classList.add("jump")
            setTimeout(function(){
                jumping = false
            }, 840)
            setTimeout(function(){
                hamster.style.animation = "suspension 1s linear infinite"
                hamster.classList.remove("jump")
            }, 1200)
        }
    }
}

function moveGround(){
    console.log("S")
    ground.forEach(function(parts){
        if(parts == ground[0]){
            curPos1 -= 5
            if(curPos1 <= -2600){
                curPos1 = 2600
            }
            parts.style.left = curPos1 + "px"
        }
        if(parts == ground[1]){
            curPos2 -= 5
            if(curPos2 <= -2600){
                curPos2 = 2600
            }
            parts.style.left = curPos2 + "px"
        }
    })   
    
    obstacle.forEach(function(parts){
        if(parts == obstacle[0]){
            o1Pos -= 5
            if(o1Pos <= 600 && o1Pos >= 500 && once1 == false){
                spawnObsticle(parts)
                once1 = true
            }
            if(o1Pos <= -800){
                o1Pos = 2400
                once1 = false
                parts.classList.add("hidden")
            }
            if(o1Pos < 160 && o1Pos > 0 && jumping == false && !parts.classList.contains("hidden")){
                checkLose()
            }
            parts.style.left = o1Pos + "px"
        }
        if(parts == obstacle[1]){
            o2Pos -= 5
            if(o2Pos <= 600 && o2Pos >= 500 && once2 == false){
                spawnObsticle(parts)
                once2 = true
            }
            if(o2Pos <= -800){
                o2Pos = 2400
                once2 = false
                parts.classList.add("hidden")
            }
            if(o2Pos < 160 && o2Pos > 0 && jumping == false && !parts.classList.contains("hidden")){
                checkLose()
            }
            parts.style.left = o2Pos + "px"
        }
        if(parts == obstacle[2]){
            o3Pos -= 5
            if(o3Pos <= 600 && o3Pos >= 500 && once == false){
                spawnObsticle(parts)
                once = true
            }
            if(o3Pos <= -800){
                o3Pos = 2400
                once3 = false
                parts.classList.add("hidden")
            }
            if(o3Pos < 160 && o3Pos > 0 && jumping == false && !parts.classList.contains("hidden")){
                checkLose()
            }
            parts.style.left = o3Pos + "px"
        }
    })   

    food.forEach(function(parts){
        if(parts == food[0]){
            f1Pos -= 5
            if(f1Pos <= 600 && f1Pos >= 500 && once4 == false){
                spawnFood(parts)
                once4 = true
            }
            if(f1Pos <= -800){
                f1Pos = 2400
                once4 = false
                parts.classList.add("hidden")
            }
            if(f1Pos < 160 && f1Pos > 0 && jumping == true && !parts.classList.contains("hidden")){
                parts.classList.add("hidden")
                checkWin()
            }
            parts.style.left = f1Pos + "px"
        }
        if(parts == food[1]){
            f2Pos -= 5
            if(f2Pos <= 600 && f2Pos >= 500 && once5 == false){
                spawnFood(parts)
                once5 = true
            }
            if(f2Pos <= -800){
                f2Pos = 2400
                once5 = false
                parts.classList.add("hidden")
            }
            if(f2Pos < 160 && f2Pos > 0 && jumping == true && !parts.classList.contains("hidden")){
                parts.classList.add("hidden")
                checkWin()
            }
            parts.style.left = f2Pos + "px"
        }
        if(parts == food[2]){
            f3Pos -= 5
            if(f3Pos <= 600 && f3Pos >= 500 && once7 == false){
                spawnFood(parts)
                once7 = true
            }
            if(f3Pos <= -800){
                f3Pos = 2400
                once7 = false
                parts.classList.add("hidden")
            }
            if(f3Pos < 160 && f3Pos > 0 && jumping == true && !parts.classList.contains("hidden")){
                parts.classList.add("hidden")
                checkWin()
            }
            parts.style.left = f3Pos + "px"
        }
        if(parts == food[3]){
            f4Pos -= 5
            if(f4Pos <= 600 && f4Pos >= 500 && once7 == false){
                spawnFood(parts)
                once7 = true
            }
            if(f4Pos <= -800){
                f4Pos = 2400
                once7 = false
                parts.classList.add("hidden")
            }
            if(f4Pos < 160 && f4Pos > 0 && jumping == true && !parts.classList.contains("hidden")){
                parts.classList.add("hidden")
                checkWin()
            }
            parts.style.left = f4Pos + "px"
        }
    })   

    if(startGame == true){
        window.requestAnimationFrame(moveGround)
    }
}

function checkWin(){
    score += 1
    goalText.innerHTML = `${score} / ${total} Food:`
    foodImage(goal)
    if(score == total){
        let delay = setTimeout(() => {
            startGame = false;
            completed.currentTime = 0
            completed.play()
            game.classList.add("hide")
            final.classList.remove("hide")
            endImage.src = "./img/win.png"
            endText.innerHTML = "Well done!"
        },100)
    }
}

function checkLose(){
    let delay = setTimeout(() => {
        lose.currentTime = 0
        lose.play()
        startGame = false;
        game.classList.add("hide")
        final.classList.remove("hide")
        endImage.src = "./img/lose.png"
        endText.innerHTML = "Try Again!"
    },100)
}

/*var checkDead = setInterval(function(){
    var hamsterTop = parseInt(window.getComputedStyle(hamster).getPropertyValue("top"))
    var obsticleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
    if(obsticleLeft < 20 && obsticleLeft > 0 && hamsterTop >= 130){
        startGame = false
        alert("u lose")
    }
}, 10)*/

/*function getCustomProperty(elem, prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(pro)) || 0
}

function setCustomProperty(elem, prop, value){
    elem.style.setProperty(prop, value)
}

function incrementCustomProperty(elem, prop,inc){
    setCustomProperty(elem, prop, getCustomProperty(elem,prop) + inc)
}*/

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });