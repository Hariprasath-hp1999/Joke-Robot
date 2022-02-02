const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//disable and enable button
function toggleButton(){
    //opposite true false changes
    button.disabled = !button.disabled;
}

function tellMe(joke)
{
//  console.log(joke);
 VoiceRSS.speech({
    key: '19518b7892ae4cdf801fde8f0b324e16',
    src:  joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
});

}

async function getJokes()
{
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
       const response = await fetch(apiURL);
       const data = await response.json();
    //    console.log(data);
     if(data.setup)
     {
         //for printing double joke
       joke = `${data.setup}...${data.type}`;
     }
     else{
         //for printing single joke
    joke=`${data.joke}`;
     }
    //  console.log(joke);
    tellMe(joke);
    //disable button after play starts 
    toggleButton();
    }
    catch(error)
    {
        console.log('woah there is error',error);
    }
}

// getJokes();
button.addEventListener('click',getJokes);
//
audioElement.addEventListener('ended',toggleButton);