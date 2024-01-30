let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
