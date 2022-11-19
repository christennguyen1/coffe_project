let bodyFavourite = "";
const coffeeFavourite = document.querySelector(".coffee_service_item");
window.onload = function () {
  const dtArray = JSON.parse(localStorage.getItem("favouriteCoffee"));
  //   console.log(dtArray);
  const coffeeLike = dtArray.forEach((items) => {
    bodyFavourite += `
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
    coffeeFavourite.innerHTML = bodyFavourite;
  });
};
