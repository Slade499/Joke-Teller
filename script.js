const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enabled Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRRC API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '8b9f5e2ee5da4a849389803b05cb9874',
        src: joke,
        hl: 'en-ca',
        v: 'Mason',
        r: 0, 
        c: 'mp3',
        f: 'ulaw_44khz_stereo',
        ssml: false
    });
}

// Get joke from joke 
async function getJokes() {
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke
        }
        // Text To Speech
        tellMe(joke)
        // Disable Button
        toggleButton()
    } catch (error) {
        console.log('whoops', error);
    }
}

// Event Listener
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);
