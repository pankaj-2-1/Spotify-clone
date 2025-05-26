console.log("Welcome to Spotify");
//initialise the variables
let songIndex=0;
let audioElement= new Audio('songs/1.mp3');
let gif= document.getElementById('gif');
let myProgressBar=document.getElementById('myProgressBar');
let next=document.getElementById('next');
let previous=document.getElementById('previous');
let songItemName=document.getElementById('songItemName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterPlay=document.getElementById("masterPlay");
let play=Array.from(document.getElementsByClassName('play'));

let songs=[
    {songName: "Gourmet Shit",filePath:"songs/1.mp3",coverPath: "covers/1.jpg"},//idx=0
    {songName: "Villian",filePath:"songs/2.mp3",coverPath: "covers/2.jpg"},//idx=1
    {songName: "Baawe",filePath:"songs/3.mp3",coverPath: "covers/3.jpg"},//idx=2
    {songName: "Fareebi",filePath:"songs/4.mp3",coverPath: "covers/4.jpg"},//idx=3
    {songName: "Goat Shit",filePath:"songs/5.mp3",coverPath: "covers/5.jpg"},//idx=4
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})



//Handle Play-Pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // play.classList.remove('fa-play-circle');
        // play.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        play[songIndex].classList.remove('fa-play-circle');
        play[songIndex].classList.add('fa-pause-circle');
        songItemName.innerText=songs[songIndex].songName;
    
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // play.classList.remove('fa-pause-circle');
        // play.classList.add('fa-play-circle');
        gif.style.opacity=0;
        play[songIndex].classList.remove('fa-pause-circle');
        play[songIndex].classList.add('fa-play-circle');
    }
})

//ProgressBar Event
audioElement.addEventListener('timeupdate',()=>{
    const progress=parseInt(audioElement.currentTime/audioElement.duration*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    let time=myProgressBar.value*audioElement.duration/100;
    audioElement.currentTime=time;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('play')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

previous.addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex=songIndex-1;
    }  
    makeAllPlays();
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.currentTime=0;
    audioElement.play();
    songItemName.innerText=songs[songIndex].songName;
    gif.style.opacity=1;
    play[songIndex].classList.remove('fa-play-circle');
    play[songIndex].classList.add('fa-pause-circle');

    //add play listener too
})

next.addEventListener('click',()=>{
    console.log(songIndex);
    if(songIndex>3){
        songIndex=0;
    
    }
    else{
        songIndex=songIndex+1;}
    makeAllPlays();
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.currentTime=0;
    audioElement.play();
    songItemName.innerText=songs[songIndex].songName;
    gif.style.opacity=1;
    play[songIndex].classList.remove('fa-play-circle');
    play[songIndex].classList.add('fa-pause-circle');
    console.log("after")
    console.log(songIndex)
    //add play listener too
})



play.forEach((element)=>{
    element.addEventListener('click',(e)=>{
    const clickedIndex=parseInt(e.target.id);

    if(songIndex=== clickedIndex && !audioElement.paused){
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
    else{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex}.mp3`;
        songItemName.innerText=songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');  
    }})})