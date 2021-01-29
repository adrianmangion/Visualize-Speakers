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
                        displayProducts(request.responseText);
                    }
                    else
                        alert("Error communicating with server: " + request.status);
                };

                //Set up request and send it
                request.open("GET", "products.php");
                request.send();
            }
            
            //Loads products into page
            function displayProducts(jsonProducts){
                //Convert JSON to array of product objects
                let product = JSON.parse(jsonProducts);
				let colourNames = [];
				let colourHexs = [];
				let colourImgs = [];
                
				console.log(product);
				console.log(product.description);
                //Create HTML table containing product data
                let htmlStr = "";
                    htmlStr += "<h3>" + product.brand + " " + product.model + "</h3>";
                    htmlStr += "<p>" + product.description + "</p>";
                    htmlStr += "<ul>";
                    htmlStr += "<li>" + product.keywords + "</li>";
                    htmlStr += "</ul>";
					htmlStr += "<h4>" + product.price + " " + "</h4>";
					htmlStr += "<div id='productQty'>" + "<p>Quantity Available: "+ product.qty + "</div>";
					htmlStr += "<input id='qtyInput'>";
					htmlStr += "<br>";
					htmlStr += "<div id='colours'>";
					
				for(i in product.colour){
					colourNames[i] = product.colour[i].colourname;
					htmlStr += "<div id='" +colourNames[i]+ "'></div>";
					colourHexs[i] = product.colour[i].hexvalue;
					colourImgs[i] = product.colour[i].linkstoimgs;
				}
					htmlStr += "</div>";

                document.getElementById("productInfo").innerHTML = htmlStr;
            }