let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
	body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
	body.classList.toggle("showCart");
});

const addDataToHTML = () => {
	if (products.length > 0) {
		// if has data
		products.forEach((product) => {
			let newProduct = document.createElement("div");
			newProduct.dataset.id = product.id;
			newProduct.classList.add("item");
			newProduct.classList.add("col-sm-12");
			newProduct.classList.add("col-md-4");
			newProduct.classList.add("justify-content-center");
			newProduct.classList.add("mb-5");
			newProduct.classList.add("d-flex");
			newProduct.innerHTML = `
			<div
				class="card"
				style="width: 18rem">
				<img
					src="${product.image}"
					class="card-img-top"
					alt="..." />
				<div class="card-body">
					<h5 class="card-title">${product.name}</h5>
					<p class="card-text">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem
						accusantium doloremque laudantium, totam rem aperiam, eaque
						ipsa quae ab illo inventore veritatis et quasi architecto
						beatae vitae dicta sunt explicabo..
					</p>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item price">$${product.price}</li>
				</ul>
				<div class="card-body">
					<button class="addCart">Agregar al carro</button>
				</div>
			
		</div>`;
			listProductHTML.appendChild(newProduct);
			console.log(newProduct);
			console.log(product);

			/* `<img src="${product.image}" alt="">
			<h2>${product.name}</h2>
			<div class="price">$${product.price}</div>
			<button class="addCart">Add To Cart</button>`;
		listProductHTML.appendChild(newProduct); */
		});
	}
};

const initApp = () => {
	// get data product
	fetch("/json/productos.json")
		.then((response) => response.json())
		.then((data) => {
			products = data;
			addDataToHTML();

			// get data cart from memory
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
				addCartToHTML();
			}
		});
};
initApp();
