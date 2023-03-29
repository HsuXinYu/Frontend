// 設置
const contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

function lookUpProfile(name, prop) {
  // 只修改這一行下面的代碼
  for (let i = 0; i < contacts.length; i++) {
    console.log(contacts[i].firstName);
    if (contacts[i].firstName == name) {
      if (contacts[i].hasOwnProperty(prop)) {
        console.log(contacts[i][prop]);
        return contacts[i][prop];
      } else {
        console.log("No such property");
        return "No such property";
      }
    }
  }
  console.log("No such contact");
  return "No such contact";
  // 只修改這一行上面的代碼
}

// lookUpProfile("Akira", "likes");
lookUpProfile("Sherlock", "likes");
// lookUpProfile("Harry", "likes");
