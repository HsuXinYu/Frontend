const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

//pending的delay => fulfilled
//若delay < 0 => rejected
function alarm(name, delay) {
  // setTimeout(() => {
  //   output.innerHTML = name + "起床!";
  // }, delay);
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject("delay不能小於0");
    } else {
      setTimeout(() => resolve(name + "起床!"), delay);
    }
  });
}

// button.addEventListener("click", (e) => {
//   // console.log("你正在按下按鈕");
//   // alarm(name.value, delay.value);
//   let promiseObject = alarm(name.value, delay.value);
//   promiseObject
//     .then((message) => {
//       output.innerHTML = message;
//     })
//     .catch((e) => {
//       output.innerHTML = e;
//     });
// });

button.addEventListener("click", async () => {
  try {
    let result = await alarm(name.value, delay.value);
    console.log(result);
    output.innerHTML = result;
  } catch (e) {
    output.innerHTML = e;
  }
});
