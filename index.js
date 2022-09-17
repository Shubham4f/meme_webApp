const meme = document.querySelector(".meme_img");
const nxt = document.getElementById("nxt")
const pre = document.getElementById("pre");
const load = document.querySelector(".load");
let oldmeme = []
let counter = -1;


const loadMeme = () => {
    load.innerText = `Loading...`;
    load.style.display = "block";
    if (counter + 1 < oldmeme.length && counter != oldmeme.length) {
        pre.style.background = "coral";
        pre.innerHTML = `<a href="#">Previous Meme</a>`
        counter++;
        meme.src = oldmeme[counter];
        load.style.display = "none";
        console.log(counter);
    } else {
        fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json()).then((data) => {
            // console.log(data.url);
            meme.src = data.url;
            oldmeme.push(data.url);
            load.style.display = "none";
            counter++;
            if (counter > 0) {
                pre.style.background = "coral";
                pre.innerHTML = `<a href="#">Previous Meme</a>`
            }
        }).catch((err) => {
            load.innerText = `Try Again..`;
            console.log(err);
        });;
    }
}

loadMeme();
nxt.addEventListener("click", loadMeme);
pre.addEventListener("click", () => {
    if (counter < 0) return;
    counter--;
    if (counter == -1 || counter == 0) {
        pre.style.background = "rgb(87, 84, 83)";
        pre.innerHTML = `<a href="#">No More Meme</a>`;
        counter = 0;
    }
    meme.src = oldmeme[counter];
    console.log(counter);
})

console.log(oldmeme.length);