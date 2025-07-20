const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");


async function fetchAPI(word) {
    try {
        infoText.style.display = "block";
        meaningContainer.style.display = 'none';
        infoText.innerText = `Searching... the meaning of "${word.toUpperCase()}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((response) => response.json());


        infoText.style.display = "none";
        meaningContainer.style.display = 'block';

        if (result.title) {
            title.innerText = result.title;
            meaning.innerText = result.message;
            audio.style.display = "none";
        } else {
            audio.style.display = "block";
            title.innerText = result[0].word.toUpperCase();
            meaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio;
        }
    } catch (error) {
        infoText.innerText = "An error occurred, please try again later!";
    }
}


input.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
})