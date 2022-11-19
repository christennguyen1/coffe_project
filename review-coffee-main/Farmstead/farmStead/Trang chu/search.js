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

  window.location.href = "/coffee_review/SuggestionCoffee/suggestionPage.html";
});
