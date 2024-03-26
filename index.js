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
let likeBtn = "";

onValue(championsDB, function (snapshot) {
  // let msgArray = Object.values(snapshot.val());
  let msgArray = Object.entries(snapshot.val());

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
    likes: 0,
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
  let msgKey = message[0];
  let msgVal = message[1];

  // console.log(message[1]);
  let locationLikes = ref(database, `champions/${msgKey}`);

  locationLikes.update({ likes: 1 });

  database.ref(`champions`).child(`${msgKey}`).update({
    likes: 1,
  });

  // const msg = `
  //     <p><strong>To ${message[1].to}</strong></p>
  //     ${message[1].msg}
  //     <div class="foot"><strong class="foot1">From ${message[1].from}</strong><button id="like_btn" class="foot2"> 🖤 ${message[1].likes} </button></div>
  //   `;

  // let newEl = document.createElement("div");
  // newEl.setAttribute("id", "show_endorsement");
  // newEl.innerHTML = msg;
  // endorseContainer.prepend(newEl);

  // likeBtn = document.getElementById("like_btn");
  // console.log(likeBtn);

  // likeBtn.addEventListener("click", function () {
  //   message[1].likes += 1;
  //   console.log(message.likes);
  // });
}
