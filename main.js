let dailyscore = 0;
let totalscore = 0;
let safety = 100;
let safetydecay = 1;
let day = 1;
let h = 7;
let m = 0;
let recoverdelay = 1000;
let hp = 100;
let damage = 0;

function updatedaily(){
    document.getElementById("dailyscorep").innerHTML = "you gave " + dailyscore + " pets today";
    document.getElementById("finalscorep").innerHTML = "final score: " + Math.round((totalscore/day) * 100)/100 + " pets / day";
    document.getElementById("hpp").innerHTML = "your health: "+hp;

}

function pet(){
    clearTimeout(startrecover);
        document.getElementById("petb").innerHTML = "keep petting";
        dailyscore = dailyscore + 1;
    if (Math.random() < (safety/100)){
        document.getElementById("bitep").style.visibility = "hidden";
        safety -= safetydecay;
    }

    else{
        safety -= 10;
        damage = (hp * (100-safety))/100 + (Math.random()*10);
        hp = Math.floor(hp - damage);
        document.getElementById("petb").innerHTML = "pet torrada";
        document.getElementById("bitep").style.visibility = "visible";
    }

    if (safety <= 0){
        document.getElementById("sleepb").innerHTML = "just give up for today man";
    }

    if(hp < 1){
        hp = 0;
        dailyscore = 0;
        document.getElementById("sleepb").innerHTML = "go sleep";
        document.getElementById("petb").style.display = "none";
    }

    updatedaily();
    document.getElementById("prob").innerHTML = "hand safety: "+ Math.round(safety*10)/10 +"%";
    startrecover = setTimeout(recover, 3000);
}

function sleep(){
    
    totalscore = totalscore + dailyscore;
    dailyscore = 0;
    safety = 100;
    hp = 100;
    document.getElementById("sleepb").innerHTML = "give up and go sleep";
    document.getElementById("totalscorep").innerHTML = "you have " + totalscore + " pets total"; 
    document.getElementById("prob").innerHTML = "hand safety: "+ Math.round(safety*10)/10 +"%"; 
    document.getElementById("petb").style.display = "inline";
    updatedaily();

    day++;
    h = 7;
    m = 0;
    clearTimeout(updateTimeout);
    startTime()

}

function startTime() {
    document.getElementById('dayp').innerHTML =  "Day " + day+", " + h + ":" + m + "0";
    m += 3;
    if (m > 5){
        h++;
        m = 0;
    }
    if (h > 23){
        h = 7;
        day++;
    }
    updatedaily();
    updateTimeout = setTimeout(startTime, 1000);
  }

function recover(){
    if (safety < 88.9){
        safety += 0.1;
    }
    if (recoverdelay > 117){
        recoverdelay -= 100;
    }
    document.getElementById("prob").innerHTML = "hand safety: "+ Math.round(safety*10)/10 +"%";
    startrecover = setTimeout(recover, recoverdelay);

  }

function main(){
    startTime();
    startrecover = setTimeout(recover, 3000);
}

