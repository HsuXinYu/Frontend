// joke API
// let output = document.querySelector("#output");

// async function joke() {
//   try {
//     let result = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
//     let data = await result.json();
//     console.log(data.joke);
//     output.innerText += data.joke + "\n";
//   } catch (e) {
//     console.log(e);
//   }
// }

// let button = document.querySelector("#new-joke");
// button.addEventListener("click", () => {
//   joke();
// });

//weather API
let city = "Taipei";
let myKey = "57c8259eebcdc67a13acc09856b32d9c";
let url =
  "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}";

async function weather() {
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

weather();
