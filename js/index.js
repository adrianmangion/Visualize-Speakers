/* ============================================
 * Homepage Script
 * Dyanmically loads products from DB onto page
 * ============================================
 */

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
    request.open("GET", "./vendor/load_all_products.php", true);
    request.send();
}

//Loads products into page
function displayProducts(jsonProducts){
    //Convert JSON to array of product objects
    jsonProducts = jsonProducts.substring(0, jsonProducts.length - 1);
    let products= jsonProducts.split("|");

    for(i in products){
        products[i] = JSON.parse(products[i]);
    }

    let btSpeakerStr = "";
    let sbarStr = "";
    let smartSpeakerStr = "";
    let pcSpeakerStr = "";


    //Loop through all products received from server
    for(i in products){
        //Section attribute determines section
        switch(products[i].section){
            case "bluetoothspeaker":
                //Create card for product
                btSpeakerStr += addCard(products[i]);
            break;
            
            case "soundbar":
                //Create card for product
                sbarStr += addCard(products[i]);
            break;

            case "smartspeaker":
                //Create card for product
                smartSpeakerStr += addCard(products[i]);
            break;

            case "pcspeaker":
                //Create card for product
                pcSpeakerStr += addCard(products[i]);
        }
    }
    console.log(btSpeakerStr);
    document.getElementById("btRow").innerHTML = btSpeakerStr;
    document.getElementById("sbRow").innerHTML = sbarStr;
    document.getElementById("ssRow").innerHTML = smartSpeakerStr;
    document.getElementById("pcRow").innerHTML = pcSpeakerStr;

}

//Receives product and adds to a bootstrap card
function addCard(product){
    let str = "";
    str += "<div class='col-sm-4'>";
    str += "<a class='linkProduct' href='product.html?_id=<?="+product._id.$oid+"'>";
    str += "<div class='card text-center' href='product.html?id="+product._id.$oid+"'>";
    str += "<img class='card-img-top' src='"+product.image_url+"' alt='"+product.brand + " " + product.model+"'>";
    str += "<div class='card-body'>";
    str += "<h4>" + product.brand + " " + product.model + "</h4>";
    str += "<p>Price: &euro; " + product.price + "</p>";
    str += "<a class='btn btn-purchase btn-buynow btn-md' href='#'>Buy now</a>";
    str += "<a class='btn btn-purchase btn-addtocart btn-md' href='#'>Add to cart</a>";
    str += "</div>";
    str += "</div>";
    str += "</a>";
    str += "</div>";
    return str;
}




