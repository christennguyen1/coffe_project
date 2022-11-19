let bodySuggestion = "";
const coffeeItem = document.querySelector(".coffee_service_item");
window.onload = function () {
  const { valueName, valueStyle, valueDistrict, valueMood } = JSON.parse(
    localStorage.getItem("optionCafe")
  );

  const cafeList = cafe.filter((item) => {
    return (
      (valueName === "" ||
        item.name.toLowerCase().includes(valueName.toLowerCase())) &&
      (valueStyle === "" || valueStyle === item.style) &&
      (valueDistrict === "" || valueDistrict === item.district) &&
      (valueMood === "" || item.mood.find((item) => valueMood === item))
    );
  });

  const cafeSuggestion = cafeList.forEach((items) => {
    bodySuggestion += `
    <a href = "${items.href}?id=${items.id}" class="coffee_service_item1">
      <div class="card" style="width: 22rem">
        <img
          class="card-img-top"
          src="${items.urlImage[0]}"
          alt="Card image cap"
        />
        <div class="card-body">
          <span>${items.style}</span>
          <h5 class="card-title">${items.name}</h5>
          <p class="card-text">
            ${
              items.description.length > 150
                ? `${items.description.substring(0, 150)}...`
                : items.description
            }
          </p>
        </div>
      </div>
    </a>
    `;
    coffeeItem.innerHTML = bodySuggestion;
  });
};
const inputName = document.querySelector("#inputName");
const inputDistrict = document.querySelector("#selectDistrict");
const inputStyle = document.querySelector("#selectStyle");
const inputMood = document.querySelector("#selectMood");
const form = document.querySelector(".coffee__select");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueName = inputName.value;
  const valueDistrict =
    inputDistrict.options[inputDistrict.selectedIndex].value;
  const valueStyle = inputStyle.options[inputStyle.selectedIndex].value;
  const valueMood = inputMood.options[inputMood.selectedIndex].value;

  const optionCafeToString = JSON.stringify({
    valueName,
    valueDistrict,
    valueStyle,
    valueMood,
  });
  localStorage.setItem("optionCafe", optionCafeToString);

  window.location.href =
    "/coffee_review/Farmstead/farmStead/SuggestionCoffee/suggestionPage.html";
});
