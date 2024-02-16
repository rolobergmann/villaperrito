document
	.getElementById("productForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const jsonObject = {};

		for (const [key, value] of formData.entries()) {
			jsonObject[key] = value;
		}

		// Load existing data from productos.json
		const xhrRead = new XMLHttpRequest();
		xhrRead.open("GET", "/json/productos.json", true);
		xhrRead.onreadystatechange = function () {
			if (xhrRead.readyState === 4 && xhrRead.status === 200) {
				const existingProducts = JSON.parse(xhrRead.responseText);
				const newId =
					existingProducts.length > 0
						? existingProducts[existingProducts.length - 1].id + 1
						: 1;

				// Append new product with incremented id
				jsonObject.id = newId;
				existingProducts.push(jsonObject);

				// Write updated data back to productos.json
				const xhrWrite = new XMLHttpRequest();
				xhrWrite.open("PUT", "/json/productos.json", true);
				xhrWrite.setRequestHeader("Content-Type", "application/json");
				xhrWrite.send(JSON.stringify(existingProducts));

				xhrWrite.onload = function () {
					if (xhrWrite.status >= 200 && xhrWrite.status < 300) {
						alert("Product added successfully!");
						document.getElementById("productForm").reset();
					} else {
						alert("Error adding product. Please try again later.");
					}
				};
			}
		};
		xhrRead.send();
	});
