console.log("Connected")
let tegenstanderhp = 100
let gebruikerhp = 100
const zwartbedje = document.querySelector("#bedjezwart")
const roodbedje = document.querySelector("#bedjerood")
let turn = true
const pingsound = new Audio("images/pingsound.mp3")
const pongsound = new Audio("images/pongsound.mp3")
const misball = new Audio("images/misball.mp3")
let ball = document.querySelector("#ball")
let animatiekant = true
let win = document.querySelector("#winner")

console.log(tegenstanderhp)


//voor de pingpong function wordt ook via math.random gekeken welke geluiden worden afgespeeld het is je geluiden randomizer
//en met behulp van https://noaheakin.medium.com/adding-sound-to-your-js-web-app-f6a0ca728984#:~:text=The%20simplest%20way%20to%20add,starts%20playing%20the%20current%20audio.
//weet ik hoe ik geluid moet toevoegen in mijn javascript code
function pingpong(){
    if(Math.random() <=0.5){
        pongsound.play() 
    } else{
        pingsound.play()
    }
}

// dit is de tegenstander functie in de tegenstander functie kijken we of het de tegenstanders turn is daarna kijken we met een math random of de tegenstander wel of niet raakt
//zo ja hij mist hem dan gaat er 20hp af en speel er een geluid dat klinkt alsof hij mist en dan gaat hij na een 1 seconden terug naar de gebruiker 
//zo nee speelt hij de pingpong geluid functie af en veranderd de turn naar de gebruikers turn
function tegenstander(){
    turn = false
    turns()
    if(Math.random() <= 0.2){
        tegenstanderhp = tegenstanderhp-20
        document.querySelector("#healthtegenstander").value = tegenstanderhp
        misball.play()
        winlose()
        setTimeout(turns, 500)
        setTimeout(serve,1000)
        turn = true
    } else{
        turns()
        pingpong()
        setTimeout(gebruiker,1000)
        turn = true
        
        
    }
        console.log("tegenstander",tegenstanderhp)
}

//in de gebruikers functie gebeurd bijna precies hetzelfde hij kijkt via math.random of de gebruiker raakt of mist en als hij mist gaat er 20 hp vanaf
// als hij raakt wordt de pingpong geluid functie aangeroepen
//zit minder in de gebruiker function vanwege dat je het anders gaat lopen en dat wil ik niet 
function gebruiker(){
   turn = true
   if(Math.random() <=0.2){
        gebruikerhp = gebruikerhp-20
        document.querySelector("#healthgebruiker").value = gebruikerhp
        misball.play()
        winlose()
        turns()
        
   } else{
    pingpong()
    turns()
   }
   console.log("gebruiker",gebruikerhp)
}

//in de turns function checkt de function na elke move wie er aan de beurt is als het de tegenstander zijn beurt is gaan de bedjes weg doormiddel van een dissappear class
//erbij toe tevoegen of te verwijderen daarnaast checkt hij ook per turn of hij de animatie van de ball omhoog of omlaag moet doen
//voor de animatie selector te vinden heb ik deze pagina gebruikt https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
function turns(){
    if(turn == false){
        zwartbedje.classList.add("dissapear")
        roodbedje.classList.add("dissapear")
        animatieboven()
    } else {
        zwartbedje.classList.remove("dissapear")
        roodbedje.classList.remove("dissapear")
        animatiebeneden()
    }
    console.log(turn)
}

//de serve function is een beetje uniek want hiermee is de gebruiker altijd degene is die serveert al zit dit er niet in dan als de tegenstander mist kan de gebruiker niks meer
//vanwege dat de bedjes weg zijn en het voor de gebruiker vrij irritand wordt
function serve(){
    zwartbedje.classList.remove("dissapear")
    roodbedje.classList.remove("dissapear")
}

//de start function wordt altijd als eerste aangeroepen om de loop door te gaaan tussen gebruiker en tegenstander hij checkt of het zijn beurt is en als dat zo
//kan je klikken op de bedjes zo niet wordt er na 1 seconden de tegenstander functie aangeroepen
function start(){
if(turn == true){
zwartbedje.addEventListener("click",tegenstander)
roodbedje.addEventListener("click",tegenstander)

} else{
    setTimeout(tegenstander,1000)
}
console.log(turn)
}

//functie door middel van math.random gaat de bal 1 kant op kwa animatie en geeft een true of false aan zodat we die kunnen gebruiken om de ball weer op dezelfde manier terug te keren
function animatieboven(){
    if(Math.random() <= 0.5){
        document.querySelector("#ball").style.animation = "ballupright 1.5s infinite"
        animatiekant = true
    } else{
        document.querySelector("#ball").style.animation = "ballupleft 1.5s infinite"
        animatiekant = false
    }
}
//functie waarmee we de ball in de juiste directie terug kunnen geven met behulp van de true of false van de animatieboven functie
function animatiebeneden(){
    if(animatiekant == true){
        document.querySelector("#ball").style.animation = "balldownright 1.5s "
    } else {
        document.querySelector("#ball").style.animation = "balldownleft 1.5s "
    }
}
//infinte animatie loop start voor tegenstander bedje
document.querySelector("#bedjetegenstander").style.animation = "bedjetegenstander 2s infinite"

//deze functie zorgt ervoor dat als de tegenstander 0 hp heeft datje wint en als jij 0 hp hebt dat de tegenstander wint en alle animaties er bij
function winlose(){
    if(tegenstanderhp == 0){
        document.querySelector("#fans").style.animation = "fans 0.5s infinite"
        win.classList.remove("dissapear")
        document.querySelector("#winner").style.animation = "winlose 0.5s infinite"
        console.log("you win")
    } else if(gebruikerhp == 0){
        win.textContent = "LOSER"
        win.classList.remove("dissapear")
        document.querySelector("#fans").style.animation = "fans 2.5s infinite"
        document.querySelector("#winner").style.animation = "winlose 0.5s infinite"
        console.log("you lose")
    }

}

start()



