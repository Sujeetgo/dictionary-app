const inputEl = document.getElementById("input");
const infoEl = document.getElementById("info");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");
const fetchAPI = async(word)=>{
    // console.log(word);
    try {
        infoEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoEl.innerText = `Searching the meaning of "${word}"`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=> res.json())
        // console.log(result);
        if(result.title){
            meaningContainerEl.style.display = "block";
            infoEl.style.display = "none";
            titleEl.innerHTML = word;
            meaningEl.innerHTML ='N/A';
            audioEl.style.display = "none";
        }
        else{
            infoEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex";
            titleEl.innerHTML = result[0].word;
            meaningEl.innerHTML = result[0].meanings[0].definitions
            [0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }

    } catch (error) {
        infoEl.innerText = `An error happened, try again later...`;
        infoEl.style.color ="red";
    }
}
inputEl.addEventListener("keyup", (e)=>{
    // console.log(e.target.value)
    if(e.target.value && e.key ==='Enter'){
        fetchAPI(e.target.value);
    }
})