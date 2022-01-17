let allCards=['2','3','4','5','6','7','8','9','10','J','Q','K','A']
let deck=[ '2s', '2c', '2d', '2h', '3s', '3c', '3d', '3h', '4s', '4c', '4d', '4h', '5s', '5c', '5d', '5h', 
            '6s', '6c', '6d', '6h', '7s', '7c', '7d', '7h', '8s', '8c', '8d', '8h', '9s', '9c', '9d', '9h', 
            '10s', '10c', '10d', '10h', 'Js', 'Jc', 'Jd', 'Jh', 'Qs', 'Qc', 'Qd', 'Qh', 'Ks', 'Kc', 'Kd', 'Kh', 
            'As', 'Ac', 'Ad', 'Ah']
let fullDeck=[]
const yay=document.getElementById("scoreboard")
for (let i=0; i<3;i++){
    fullDeck=fullDeck.concat(deck)
}
let cardValues={}
for (let i=0; i<13; i++){
    cardValues[allCards[i]]=i+2
}
function compareCards(card0,card1){
    if ((card0+card1)=="2A" || (card0+card1)=="A2"){
        return '2'
    }
    else{
        if (cardValues[card0]==cardValues[card1]){
            return 'draw'
        }
        else if (cardValues[card0]>cardValues[card1]){
            return card0
        }
        else{
            return card1
        }
    }
}
function determineWinner(card0,card1){
    if (compareCards(card0,card1)==card0){
        return "u"
    }
    else if (compareCards(card0,card1)==card1){
        return "o"
    }
    else{
        return "d"
    }
}
function upDown(card0,card1){
    let values=[cardValues[card0],cardValues[card1]]
    if (values[0]>7&&values[1]>7){
        return "UP UP"
    }
    else if (values[0]<8&&values[1]<8){
        return "DOWN DOWN"
    }
    else{
        return "UP DOWN"
    }
}
let userHand=['0','0']
let opponentHand=['0','0']
var userScore=0
var opponentScore=0
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }  
}
shuffle(fullDeck)
function dealCard(player){
    for (let i=0; i<2; i++){
        if (player[i]=='0'){
            player[i]=fullDeck.pop()
            break
        }
    }
}
function resetLights(){
    document.getElementById("userUp1").classList.remove('yellow-glow')
    document.getElementById("userUp2").classList.remove('yellow-glow')
    document.getElementById("userDown1").classList.remove('yellow-glow')
    document.getElementById("userDown2").classList.remove('yellow-glow')
    document.getElementById("opponentUp1").classList.remove('yellow-glow')
    document.getElementById("opponentUp2").classList.remove('yellow-glow')
    document.getElementById("opponentDown1").classList.remove('yellow-glow')
    document.getElementById("opponentDown2").classList.remove('yellow-glow')
}
function changeUserIndicator(status){
    resetLights()
    if (status=='UP UP'){
        document.getElementById("userUp1").classList.add('yellow-glow')
        document.getElementById("userUp2").classList.add('yellow-glow')
    }
    else if (status=='UP DOWN'){
        document.getElementById("userUp1").classList.add('yellow-glow')
        document.getElementById("userDown1").classList.add('yellow-glow')
    }
    else{
        document.getElementById("userDown1").classList.add('yellow-glow')
        document.getElementById("userDown2").classList.add('yellow-glow')
    }
}
function changeOpponentIndicator(status){
    if (status=='UP UP'){
        document.getElementById("opponentUp1").classList.add('yellow-glow')
        document.getElementById("opponentUp2").classList.add('yellow-glow')
    }
    else if (status=='UP DOWN'){
        document.getElementById("opponentUp1").classList.add('yellow-glow')
        document.getElementById("opponentDown1").classList.add('yellow-glow')
    }
    else{
        document.getElementById("opponentDown1").classList.add('yellow-glow')
        document.getElementById("opponentDown2").classList.add('yellow-glow')
    }
}


function executeRound(){
    let userHeldLeft=document.getElementById("userHeldCardLeft")
    let userHeldRight=document.getElementById("userHeldCardRight")
    userHeldLeft.src="images/"+ userHand[0]+".png"
    userHeldRight.src="images/"+ userHand[1]+".png"
    userUpDown=upDown(userHand[0].slice(0,-1),userHand[1].slice(0,-1))
    opponentUpDown=upDown(opponentHand[0].slice(0,-1),opponentHand[1].slice(0,-1))
    changeUserIndicator(userUpDown)
    changeOpponentIndicator(opponentUpDown)
    userHeldLeft.addEventListener('click',function(){
        evaluateChoice("L")
    })
    userHeldRight.addEventListener('click',function(){
        evaluateChoice("R")
    })
}
function endGame(){
    document.getElementById("scoreboard").classList.add("takeover")
}
function evaluateChoice(choice){
    let userChoice=choice
    let randVar=Math.floor(Math.random()*2)
    if (randVar==0){
        var opponentChoice="L"
    } else{
        var opponentChoice="R"
    }
    if (userChoice=="L"){
        var userPlacedCard=userHand[0]
        userHand[0]='0'
        document.getElementById("userHeldCardLeft").src="#"
    }
    else if (userChoice=="R"){
        var userPlacedCard=userHand[1]
        userHand[1]='0'
        document.getElementById("userHeldCardRight").src="#"
    }
    if (opponentChoice=="L"){
        var opponentPlacedCard=opponentHand[0]
        opponentHand[0]='0'
    }
    else if (opponentChoice=="R"){
        var opponentPlacedCard=opponentHand[1]
        opponentHand[1]='0'
    }
    var userPlaced=document.getElementById("userPlacedCard")
    userPlaced.src="images/"+userPlacedCard+".png"
    var opponentPlaced=document.getElementById("opponentPlacedCard")
    opponentPlaced.src="images/"+opponentPlacedCard+".png"
    let winner=determineWinner(userPlacedCard.slice(0,-1),opponentPlacedCard.slice(0,-1))
    if (winner=='u'){
        userScore+=1
    }else if (winner=='o'){
        opponentScore+=1
    }
    document.getElementById("userScore").innerHTML=userScore
    document.getElementById("opponentScore").innerHTML=opponentScore
    dealCard(userHand)
    dealCard(opponentHand)
    document.getElementById("userHeldCardLeft").src="images/"+userHand[0]+".png"
    document.getElementById("userHeldCardRight").src="images/"+userHand[1]+".png"
    changeUserIndicator(upDown(userHand[0].slice(0,-1),userHand[1].slice(0,-1)))
    changeOpponentIndicator(upDown(opponentHand[0].slice(0,-1),opponentHand[1].slice(0,-1)))
    if (fullDeck.length<3){
        endGame()
    }
}
dealCard(userHand)
dealCard(opponentHand)
dealCard(userHand)
dealCard(opponentHand)
executeRound()