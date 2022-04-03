if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}{
    ready();
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('removeBtn');

    for(var i=0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeItem);
    }


    var addToCartButtons = document.getElementsByClassName('additem')
    for(var i=0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('item-name')[0].innerText;
    var priceElement = shopItem.getElementsByClassName('item-price')[0];
    var price = parseFloat(priceElement.innerText);
    var quantity = shopItem.getElementsByClassName('pieces')[0].value;
    price = price * quantity;

    addItemToCart(title, price, quantity);
    updateTotal();
}


function addItemToCart(title, price, quantity){
    var cartRow = document.createElement('div');
    cartRow.classList.add('listitem');
    var cartItems = document.getElementsByClassName('items')[0];
    var cartItemNames = cartItems.getElementsByClassName('items-name');
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("This item is already added");
            return;
        }
    }
    var cartRowContents = `    

        <div class="items-quantity">
        <button class="removeBtn" type="button">X</button>
            <p class="counter">${quantity}</p>
        </div>
        <div class="items-name">
            <p>${title}</p>
        </div>
        <!-- <div class="items-price"> -->
            <p class="items-value">${price}</p>
        <!-- </div> -->

`
    cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);

    cartRow.getElementsByClassName('removeBtn')[0].addEventListener('click', removeItem);
}


function removeItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}

function updateTotal(){ 
    var allItems = document.getElementsByClassName('items')[0];
    var listOfItems = allItems.getElementsByClassName('listitem');
    var total = 0;
    for(var i=0; i<listOfItems.length; i++){
        var oneItem = listOfItems[i];
        var priceElement = oneItem.getElementsByClassName('items-value')[0];
        var price = parseFloat(priceElement.innerText);
        total += price;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('calculated-price')[0].innerText = total + ' KM';
}
