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
const championsDB = ref(database, "champions"); // reference named champions

let publishBtn = document.getElementById("publish_btn");
let inputEndorsement = document.getElementById("input_endorsement");
let endorseContainer = document.getElementById("endorse_container");
let from = document.getElementById("name_from");
let to = document.getElementById("name_to");

onValue(championsDB, function (snapshot) {
  let msgArray = Object.values(snapshot.val());

  clearEndorsementList();

  for (let i = 0; i < msgArray.length; i++) {
    let currentMsg = msgArray[i];

    appendMsgToEndorseListEl(currentMsg);
  }
});

publishBtn.addEventListener("click", function () {
  const input = inputEndorsement.value;
  const fromVal = from.value;
  const toVal = to.value;

  let obj = {
    from: `${fromVal}`,
    to: `${toVal}`,
    msg: `${input}`,
  };

  push(championsDB, obj);

  clearAllInputs();
});

// likeBtn.addEventListener("click", function () {
//   console.log("Increase count");
// });

function clearEndorsementList() {
  endorseContainer.innerHTML = "";
}

function clearAllInputs() {
  inputEndorsement.value = "";
  from.value = "";
  to.value = "";
}

function appendMsgToEndorseListEl(message) {
  console.log(message);

  const msg = `
      <p><strong>To ${message.to}</strong></p>
      ${message.msg}
      <div class="foot"><strong class="foot1">From ${message.from}</strong><button id="foot2"> 🖤 4 </button></div>
    `;

  let newEl = document.createElement("div");
  newEl.setAttribute("id", "show_endorsement");
  newEl.innerHTML = msg;
  endorseContainer.prepend(newEl);
}
