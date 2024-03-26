import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// My Database
const appSettings = {
  databaseURL:
    "https://realtime-database-e841a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// initializeApp method will connect our project to our database on firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const championsDB = ref(database, "champions"); // reference named champions

// accessing elements
let publishBtn = document.getElementById("publish_btn");
let inputEndorsement = document.getElementById("input_endorsement");
let endorseContainer = document.getElementById("endorse_container");
let from = document.getElementById("name_from");
let to = document.getElementById("name_to");
let likeBtn = "";

onValue(championsDB, function (snapshot) {
  console.log(snapshot.val());
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
    hitLike: false,
  };

  push(championsDB, obj);

  clearAllInputs();
});

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

  const msg = `
      <p><strong>To ${msgVal.to}</strong></p>
      ${msgVal.msg}
      <div class="foot"><strong class="foot1">From ${msgVal.from}</strong><button id="like_btn" class="foot2"> 🖤 ${msgVal.likes} </button></div>
    `;

  let newEl = document.createElement("div");
  newEl.setAttribute("id", "show_endorsement");
  newEl.innerHTML = msg;
  endorseContainer.prepend(newEl);

  likeBtn = document.getElementById("like_btn");
  console.log(likeBtn);

  likeBtn.addEventListener("click", function () {
    if (!msgVal.hitLike) {
      let count = msgVal.likes + 1;

      let updatedData = {
        likes: count,
      };

      const idRef = ref(database, "champions/" + msgKey);
      update(idRef, updatedData);
      console.log(idRef.likes);

      console.log(msgVal.likes);
    } else {
      console.log("Already liked");
    }
  });
}
