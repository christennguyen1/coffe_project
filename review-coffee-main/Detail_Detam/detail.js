const STAR_KEY_PREFIX = "star-";
const USER_KEY = "user";

const inputTitle = document.querySelector("#title");
const inputLocation = document.querySelector("#location");
const inputStyle1 = document.querySelector("#style");
const inputTime = document.querySelector("#time");
const inputPrice = document.querySelector("#price");
const inputWifi = document.querySelector("#wifi");
const inputPhone = document.querySelector("#phone");
const inputText = document.querySelector("#text");
const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const img4 = document.querySelector("#img4");
const img21 = document.querySelector("#img21");
const img22 = document.querySelector("#img22");
const img23 = document.querySelector("#img23");
const img24 = document.querySelector("#img24");
const audioPlay = document.querySelector("#audio");

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substring(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}
const id = findGetParameter("id");
const dt = cafe[id];
inputTitle.textContent = dt.name;
inputLocation.textContent = `Location: ${dt.location}`;
inputStyle1.textContent = `Style: ${dt.style}`;
inputTime.textContent = `Time: ${dt.time}`;
inputPrice.textContent = `Price: ${dt.price}`;
inputWifi.textContent = `Wifi: ${dt.wifi}`;
inputPhone.textContent = `Phone: ${dt.phone ?? "0948045658"}`;
inputText.textContent = `${dt.description}`;
img1.src = dt.urlImage[0];
img2.src = dt.urlImage[1];
img3.src = dt.urlImage[2];
img4.src = dt.urlImage[3];
img21.src = dt.urlImage[0];
img22.src = dt.urlImage[1];
img23.src = dt.urlImage[2];
img24.src = dt.urlImage[3];
audioPlay.src = dt.audio;
window.onload = function () {
  audioPlay.play();

  // ----------------- favourite --------------
  const saveFavourite = document.querySelector("#save");
  const dtList = localStorage.getItem("favouriteCoffee")
    ? JSON.parse(localStorage.getItem("favouriteCoffee"))
    : [];
  saveFavourite.addEventListener("click", (e) => {
    dtList.push(dt);
    let favouriteCoffee = JSON.stringify(dtList);
    localStorage.setItem("favouriteCoffee", favouriteCoffee);
  });
  /**
   * Logic for rating star
   */
  const ratingItems = document.querySelectorAll(".rating-item");
  const user = getDataFromLocalStorage(USER_KEY);
  const idDetailParam = findGetParameter("id");
  const positionStar = getDataFromLocalStorage(
    `${user.email}-${idDetailParam}-star`
  );

  ratingItems.forEach((item, index) => {
    if (index === positionStar) {
      item.classList.add("active");
    }
  });

  ratingItems.forEach((item, index) => {
    item.onclick = function (e) {
      ratingItems.forEach((item) => {
        item.classList.remove("active");
      });

      const classItem = e.target.classList;
      classItem.add("active");
      setDataToLocalStorage(`${user.email}-${idDetailParam}-star`, index);
    };
  });

  /**
   * Logic for commenting
   */
  const listMessageContent = document.getElementById("list-message-content");
  const messageContentData = getDataFromLocalStorage(
    `${user.email}-${idDetailParam}-comment`
  );
  console.log(messageContentData);
  listMessageContent.innerHTML = messageContentData;

  const inputComment = document.getElementById("input-comment");
  inputComment.onkeydown = handleEnterComment;

  function handleEnterComment(e) {
    const key = e.key.toLowerCase();
    if (key === "enter" && e.shiftKey) return;
    if (key === "enter") {
      const messageContent = `
        <div class="message-content">
          <div class="username">${user.lastname}:&nbsp;</div>
          <div class="message">${inputComment.value}</div>
        </div>
      `;
      setDataToLocalStorage(
        `${user.email}-${idDetailParam}-comment`,
        Boolean(messageContentData)
          ? messageContentData + messageContent
          : messageContent
      );
      location.reload();
      inputComment.value = "";
    }
  }
};

function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

function setDataToLocalStorage(key, data) {
  const newData = JSON.stringify(data);
  localStorage.setItem(key, newData);
}
