function titleCase(str) {
  var arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
    // console.log(arr[i]);
  }
  arr = arr.join(" ");
  console.log(arr);
}

titleCase("I'm a little tea pot");
