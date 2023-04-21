// 設置
const recordCollection = {
  2548: {
    albumTitle: "Slippery When Wet",
    artist: "Bon Jovi",
    tracks: ["Let It Rock", "You Give Love a Bad Name"],
  },
  2468: {
    albumTitle: "1999",
    artist: "Prince",
    tracks: ["1999", "Little Red Corvette"],
  },
  1245: {
    artist: "Robert Palmer",
    tracks: [],
  },
  5439: {
    albumTitle: "ABBA Gold",
  },
};

// 只修改這一行下面的代碼
function updateRecords(records, id, prop, value) {
  if (prop != "tracks" && value != "") {
    records[id][prop] = value;
    console.log(records[id]);
  } else if (prop === "tracks" && !records[id].hasOwnProperty(prop)) {
    records[id][prop] = [value];
    console.log(records[id]);
  } else if (prop === "tracks" && value != "") {
    records[id][prop].push(value);
    console.log(records[id]);
  } else if (value === "") {
    delete records[id][[prop]];
    console.log(records[id]);
  }
  return records;
}

updateRecords(recordCollection, 5439, "artist", "ABBA");
// updateRecords(recordCollection, 5439, "tracks", "Take a Chance on Me");
// updateRecords(recordCollection, 1245, "tracks", "Addicted to Love");
// updateRecords(recordCollection, 2468, "tracks", "Free");
// updateRecords(recordCollection, 1245, "albumTitle", "Riptide");
