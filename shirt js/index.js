let products = {
  data: [
    {
      productName: "Pant Brown",
      category: "Pant",
      price: "299",
      image: "Pant Brown Style.jpg",
    },
    {
      productName: "Vant Shirt",
      category: "Shirt",
      price: "150",
      image: "Vant Shirt Style.jpg",
    },
    {
      productName: "Korean Shoes",
      category: "Shoes",
      price: "329",
      image: "Shoes.jpg",
    },
    {
      productName: "Korean Jacket",
      category: "Jacket",
      price: "379",
      image: "Jacket.jpg",
    },
    {
      productName: "Korean White Shirt",
      category: "Shirt",
      price: "199",
      image: "Korean Shirt.jpg",
    },
  ],
};

for (let i of products.data) {
  let card = document.createElement("div");
  card.classList.add("card", i.category, "hide");

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");

  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);

  let container = document.createElement("div");
  container.classList.add("container");

  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);

  let price = document.createElement("h6");
  price.innerText = "Baht " + i.price + " ฿";
  container.appendChild(price);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

function filterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

document.getElementById("search").addEventListener("click", () => {
  let searchInput = document.getElementById("input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");
  // console.log(searchInput);

  elements.forEach((element, index) => {
    if (element.innerText.includes(searchInput.toUpperCase())) {
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});

window.onload = () => {
  filterProduct("all");
};
