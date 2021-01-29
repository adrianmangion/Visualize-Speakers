	//Download products when page loads
	window.onload = loadProducts;

	//Downloads JSON description of products from server
	function loadProducts(){
		//Create request object 
		let request = new XMLHttpRequest();

		//Create event handler that specifies what should happen when server responds
		request.onload = () => {
			//Check HTTP status code
			if(request.status === 200){
                //Add data from server to page
                console.log(request.responseText);
				displayProducts(request.responseText);
			}
			else
				alert("Error communicating with server: " + request.status);
		};

    //Set up request and send it
        let id = window.location.search.substring(10,window.location.search.length);
		request.open("GET", "./vendor/load_product.php"+"?_id="+id);
		request.send();
	}

	//Loads products into page
	function displayProducts(jsonProducts){
		//Convert JSON to array of product objects
		let product = JSON.parse(jsonProducts);
		let colourNames = [];
		let colourHexs = [];
		let colourImgs = [];
		let keywords = [];
		
		keywords = product.keywords.split(";");
		//Create HTML table containing product data
		let htmlStr = "";
			htmlStr += "<h3>" + product.brand + " " + product.model + "</h3>";
			htmlStr += "<p>" + product.description + "</p>";
			htmlStr += "<ul>";
			for(i in keywords){
				htmlStr += "<li>" + keywords[i] + "</li>";
			}
			htmlStr += "</ul>";
			htmlStr += "<h4>&euro; " + product.price + " " + "</h4>";
			htmlStr += "<div id='productQty'>" + "<p>Quantity:";
			htmlStr += "<input id='qtyInput'></div>";
			htmlStr += "<br>";
			htmlStr += "<div id='colours'>";

		for(i in product.colours){
			colourNames[i] = product.colours[i].name;
			htmlStr += "<div id='" +colourNames[i]+ "'></div>";
			colourImgs[i] = product.colours[i].linkstoimgs;
		}
			htmlStr += "</div>";
			htmlStr += "<a class='btn btn-purchase btn-buynow btn-md' href='#'>Buy now</a> <a class='btn btn-purchase btn-addtocart btn-md' href='#'>Add to cart</a>";

            console.log(htmlStr);
		document.getElementById("productInfo").innerHTML = htmlStr;
	}