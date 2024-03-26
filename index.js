// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-e841a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
// initializeApp method will connect our project to our database on firebase
const database = getDatabase(app);
const championsDB = ref(database, "champions"); // reference named movies

// How to push value into database reference
// push(moviesInDB, inputValue);

onValue(championsDB, function (snapshot) {
  let msgArray = Object.values(snapshot.val());
  console.log(msgArray);
  //   let booksArray = Object.values(snapshot.val());
  //   clearBooksListEl();
  endorseContainer.innerHTML = "";

  for (let i = 0; i < msgArray.length; i++) {
    let currentMsg = msgArray[i];
    console.log(currentMsg.to);
    console.log(currentMsg.from);
    console.log(currentMsg.msg);
    const msg = `
    <p><strong>To ${currentMsg.to}</strong></p> 
    ${currentMsg.msg} 
    <p><strong>From ${currentMsg.from}</strong><button class="fa fa-heart"></button><span>🖤 4</span></p>
  `;

    let newEl = document.createElement("div");
    newEl.setAttribute("id", "show_endorsement");
    newEl.innerHTML = msg;
    // endorseContainer.append(newEl);
    endorseContainer.prepend(newEl);
    // appendBookToBooksListEl(currentBook);
  }
});

let publishBtn = document.getElementById("publish_btn");
let inputEndorsement = document.getElementById("input_endorsement");
let endorseContainer = document.getElementById("endorse_container");
let from = document.getElementById("name_from");
let to = document.getElementById("name_to");

publishBtn.addEventListener("click", function () {
  const input = inputEndorsement.value;
  const fromVal = from.value;
  const toVal = to.value;
  const msg = `
  <p><strong>To ${toVal}</strong></p> 
  ${input} 
  <p><strong>From ${fromVal}</strong></p>
`;

  let newEl = document.createElement("div");
  newEl.setAttribute("id", "show_endorsement");
  newEl.innerHTML = msg;
  endorseContainer.append(newEl);

  let obj = {
    from: `${fromVal}`,
    to: `${toVal}`,
    msg: `${input}`,
  };

  push(championsDB, obj);

  inputEndorsement.value = "";
  from.value = "";
  to.value = "";
});
