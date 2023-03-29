// 只修改這一行下面的代碼
function rangeOfNumbers(startNum, endNum) {
  if (startNum === endNum) {
    console.log(startNum);
    return [startNum];
  } else {
    var range = rangeOfNumbers(startNum, endNum - 1);
    range.push(endNum);
    console.log(range);
    return range;
  }
}
// 只修改這一行上面的代碼
rangeOfNumbers(1, 5);
