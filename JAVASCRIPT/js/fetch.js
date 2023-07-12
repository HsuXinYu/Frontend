// let fetchPromise = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
// );

// console.log(fetchPromise);

// fetchPromise.then((response) => {
//   // let jsonObject = response.json(); //async function
//   // console.log(jsonObject);

//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetchPromise
//   .then((response) => response.json()) //可一起省略{}及return
//   .then((data) => {
//     console.log(data);
//   });

let fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
  .then((response) => response.json()) //可一起省略{}及return
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(fetchPromise);
    console.log(e);
  });
