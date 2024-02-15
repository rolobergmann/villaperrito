let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector("#cart_items");
let totalPriceHTML = document.querySelector(".totalPrice");
const body = document.querySelector("body");
let closeCart = document.querySelector(".closeCart");
let products = [];
let cart = [];
let checkOutPrice = 0;

let sidebar = body.querySelector("nav"),
	toggleSidebar = body.querySelector(".toggle-sidebar"),
	Cart = body.querySelector(".toggleCart"),
	searchBtn = body.querySelector(".search-box"),
	modeSwitch = body.querySelector(".toggle-switch"),
	modeText = body.querySelector(".mode-text");

toggleSidebar.addEventListener("click", () => {
	sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
	sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
	body.classList.toggle("dark");

	if (body.classList.contains("dark")) {
		modeText.innerText = "Light mode";
	} else {
		modeText.innerText = "Dark mode";
	}
});

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
			/* 			newProduct.classList.add("card-style"); */
			newProduct.innerHTML = `
			<div
				class="card producto col-4 ${product.tipo}"
				style="width: 10rem">
				<img
					src="${product.image}"
					class="card-img-top"
					alt="..." />
				<div class="card-body">
					<h5 class="card-title">${product.name}</h5>
					<p class="card-text">
						${product.descripcion}
						
					</p>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item product-icon"> ${product.especial} </li>
				</ul>
				<ul class="list-group list-group-flush">
					<li class="list-group-item price">$${product.price}</li>
				</ul>
				<div class="card-body">
					<button class="addCart">Agregar al carro</button>
				</div>
			
			</div>`;
			listProductHTML.appendChild(newProduct);
		});
	}
};

listProductHTML.addEventListener("click", (event) => {
	let positionClick = event.target.closest(".addCart");
	if (positionClick) {
		let product_id = positionClick.closest(".item").dataset.id;
		addToCart(product_id);
	}
});

const sendCart = () => {
	let cartl = cart.length;
	console.log(cart);
	console.log(cartl);
	if (cart.length === 0) {
		alert("Carro vacio");
	} else {
		let cartJson = JSON.stringify(cart);
		let wa =
			"https://wa.me/56996330572?text=hola, estas comprando lo siguiente:";
		(window.location = wa + cartJson), "_blank";
	}
};

const addToCart = (product_id) => {
	let positionThisProductInCart = cart.findIndex(
		(value) => value.product_id == product_id
	);
	if (cart.length <= 0) {
		cart = [
			{
				product_id: product_id,
				quantity: 1,
			},
		];
	} else if (positionThisProductInCart < 0) {
		cart.push({
			product_id: product_id,
			quantity: 1,
		});
	} else {
		cart[positionThisProductInCart].quantity =
			cart[positionThisProductInCart].quantity + 1;
	}
	addCartToHTML();
	addCartToMemory();
};

const addCartToMemory = () => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

const addCartToHTML = () => {
	listCartHTML.innerHTML = "";
	let totalQuantity = 0;
	if (cart.length > 0) {
		let checkOutPrice = 0;
		cart.forEach((item) => {
			totalQuantity = totalQuantity + item.quantity;
			let newItem = document.createElement("div");
			newItem.classList.add("item");
			newItem.dataset.id = item.product_id;

			let positionProduct = products.findIndex(
				(value) => value.id == item.product_id
			);
			let info = products[positionProduct];
			listCartHTML.appendChild(newItem);
			newItem.innerHTML = `

                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
			console.log(checkOutPrice);
			checkOutPrice = checkOutPrice + info.price * item.quantity;
			console.log(checkOutPrice);
		});
		totalPriceHTML.innerText = checkOutPrice;
	}
	iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
	let positionClick = event.target;
	if (
		positionClick.classList.contains("minus") ||
		positionClick.classList.contains("plus")
	) {
		let product_id = positionClick.parentElement.parentElement.dataset.id;
		let type = "minus";
		if (positionClick.classList.contains("plus")) {
			type = "plus";
		}
		changeQuantityCart(product_id, type);
	}
});

const changeQuantityCart = (product_id, type) => {
	let positionItemInCart = cart.findIndex(
		(value) => value.product_id == product_id
	);
	if (positionItemInCart >= 0) {
		let info = cart[positionItemInCart];
		switch (type) {
			case "plus":
				cart[positionItemInCart].quantity =
					cart[positionItemInCart].quantity + 1;
				break;

			default:
				let changeQuantity = cart[positionItemInCart].quantity - 1;
				if (changeQuantity > 0) {
					cart[positionItemInCart].quantity = changeQuantity;
				} else {
					cart.splice(positionItemInCart, 1);
				}
				break;
		}
	}
	addCartToHTML();
	checkCartEmpty();
	addCartToMemory();
};

const checkCartEmpty = () => {
	if (cart.length === 0) {
		totalPriceHTML.innerText = checkOutPrice;
	}
};

const filter = (filter) => {
	const cards = document.getElementsByClassName("listProduct");
	for (let i = 0; i < cards.length; i++) {
		let title = cards[i].querySelector(".card .card-body .card-title");
		if (title.innerText.indexOf(filter) > -1) {
			cards[i].classList.remove("d-none");
		} else {
			cards[i].classList.add("d-none");
		}
	}
};

const clearAll = () => {
	const cards = document.getElementsByClassName("listProduct"); // Added const keyword
	for (let i = 0; i < cards.length; i++) {
		// Added let keyword
		cards[i].classList.remove("d-none");
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
