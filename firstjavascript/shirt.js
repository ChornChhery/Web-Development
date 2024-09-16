const Hoodie = document.getElementById("Hoodie");
const productName = document.getElementById("productName");
const black = document.getElementById("black");
const blue = document.getElementById("blue");
const white = document.getElementById("white");

blue.addEventListener("click", () => {
  Hoodie.src = "img/jacket/bluehoodie.webp";
  productName.textContent = "Blue Hoodie Shirt";
  productPrice.innerHTML = "<strong>20.00$</strong>";
  productBrand.style.backgroundColor = "blue";
});

white.addEventListener("click", () => {
  Hoodie.src = "img/jacket/whitehoodie.png";
  productName.textContent = "White Hoodie Shirt";
  productPrice.innerHTML = "<strong>30.00$</strong>";
  productBrand.style.backgroundColor = "white";
});

black.addEventListener("click", () => {
  Hoodie.src = "img/jacket/black.webp";
  productName.textContent = "Black Hoodie Shirt";
  productPrice.innerHTML = "<strong>25.00$</strong>";
  productBrand.style.backgroundColor = "black";
});
