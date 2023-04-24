//陣列解構賦值
/*
let arr = [3, 4, 5, 2];
// let d1 = arr[0];
// let d2 = arr[1];
// let d3 = arr[2];
// let [d1, d2, d3] = arr;
let d1, d2, d3, d4;
[d1, d2, d3, d4 = 10] = arr;
console.log(d1, d2, d3, d4);
*/

//變數資料交換
let n1 = 3;
let n2 = 4;
[n2, n1] = [n1, n2];
// console.log(n1, n2);

//物件解構賦值
let obj = { x: 3, y: 4, z: 5 };
// let x = obj.x;
// let y = obj.y;
// let { x, y } = obj;
/*
let x, y, z;
({ x, y, z = 10 } = obj); //需要加入小括號
console.log(x, y, z);
//給予新的屬性名稱
let newX, newY, newZ;
({ x: newX, y: newY, z: newZ } = obj);
console.log(newX, newY, newZ);
*/

//統整函式的物件參數
function add({ n1, n2 }) {
  console.log(n1 + n2);
}
add({ n1: 3, n2: 4 });
