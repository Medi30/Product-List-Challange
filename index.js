import menuItems from "./data.js";


let gridcont = document.querySelector("#gridcont")
let totalText = document.querySelector("#totalOrderSum")
let cartFilled = document.querySelector("#cartcontFilled")
let cartHeader = document.querySelector("#yourcartHeader")
let orderPanel = document.querySelector("#orderComplete")
let confirmOrder = document.querySelector("#confirmButton")
confirmOrder.addEventListener("click", orderDone)
let startNewOrderBtn = document.querySelector("#startNew")
startNewOrderBtn.addEventListener("click", neworder)

var cardIMG = {}
let allItems = 0
let totalOrder = 0

let shoppingCart ={}

function parsing (){
    for (let i=0;i < menuItems.length;i+=1){
        var cardDiv = document.createElement("div")
        gridcont.appendChild(cardDiv).classList.add("carda")

        cardIMG = document.createElement("img")
        cardDiv.appendChild(cardIMG).classList.add("cardIMG")
        if (window.innerWidth > 700){
            cardIMG.src = menuItems[i].image.desktop
        }else{
            cardIMG.src = menuItems[i].image.mobile
            gridcont.classList.add("grindcontMobile")
        }

/*---Add to Cart Btn*/
        let cardButton = document.createElement("button")

        cardDiv.appendChild(cardButton).classList.add("btn", "costum-btn", "btn-primary")
        var cartIMG = document.createElement("img")
        cartIMG.src = "assets/images/icon-add-to-cart.svg"
        var buttontext = document.createTextNode("Add to Cart")
        cardButton.appendChild(cartIMG)
        cardButton.appendChild(buttontext)
/*--- +- Btn*/
        let cardButton2 = document.createElement("button")
        cardDiv.appendChild(cardButton2).classList.add("btn", "costum-btn", "btn-primary", "hide")
        let cardButton2Div = document.createElement("div")
        cardButton2Div.classList.add("cardbtn2")
        cardButton2.appendChild(cardButton2Div)
        cardButton2.classList.add("onBtnPressed")
        let plusIcon = document.createElement("img")
        let minusIcon = document.createElement("img")
        let buttontext2 = document.createTextNode("1")
        plusIcon.src = "assets/images/icon-increment-quantity.svg"
        minusIcon.src = "assets/images/icon-decrement-quantity.svg"
        cardButton2Div.appendChild(minusIcon)
        cardButton2Div.appendChild(buttontext2)
        cardButton2Div.appendChild(plusIcon)
        plusIcon.classList.add("plusminusicon")
        minusIcon.classList.add("plusminusicon")

        const isTouchDevice = () => {
            return (  
                'ontouchstart' in window && navigator.maxTouchPoints > 0 && navigator.userAgent.toLowerCase().indexOf('firefox') === -1
            );
        };
        
        console.log(isTouchDevice());
        if (!isTouchDevice()){
//Mouse button highlight
        plusIcon.addEventListener("mouseenter", function(event){
            plusIcon.classList.add("plusicon_h")
        })
        plusIcon.addEventListener("mouseleave", function(event){
            plusIcon.classList.remove("plusicon_h")
        })
        minusIcon.addEventListener("mouseenter", function(event){
            minusIcon.classList.add("plusicon_h")
        })
        minusIcon.addEventListener("mouseleave", function(event){
            minusIcon.classList.remove("plusicon_h")
        })
    }else{
//Touchscreen button highlight
        plusIcon.addEventListener("touchstart", function(event) {
            plusIcon.classList.add("plusicon_h");
        });
        plusIcon.addEventListener("touchend", function(event) {
            plusIcon.classList.remove("plusicon_h");
        });
        minusIcon.addEventListener("touchstart", function(event) {
            minusIcon.classList.add("plusicon_h");
        });
        minusIcon.addEventListener("touchend", function(event) {
            minusIcon.classList.remove("plusicon_h");
        });
        plusIcon.addEventListener("touchcancel", function(event) {
            plusIcon.classList.remove("plusicon_h");
        });
        minusIcon.addEventListener("touchcancel", function(event) {
            minusIcon.classList.remove("plusicon_h");
        });
        plusIcon.addEventListener("touchmove", function(event) {
            plusIcon.classList.remove("plusicon_h");
        });
        minusIcon.addEventListener("touchmove", function(event) {
            minusIcon.classList.remove("plusicon_h");
        });
    }
/* rest of the card */
        var cardCateg = document.createElement("p")
        cardDiv.appendChild(cardCateg).classList.add("cardCategory")
        cardCateg.textContent = menuItems[i].category

        var cardName = document.createElement("p")
        cardDiv.appendChild(cardName).classList.add("cardItemName")
        cardName.textContent = menuItems[i].name

        var cardPrice = document.createElement("p")
        cardDiv.appendChild(cardPrice).classList.add("cardPrice")
        cardPrice.textContent = "$" + menuItems[i].price.toFixed(2)


        cardButton.boundClickHandler = itemAdd.bind(null, menuItems[i],cardButton,cardButton2, menuItems[i].price,cardIMG )
        cardButton.addEventListener("click", cardButton.boundClickHandler)

        plusIcon.boundClickHandler = itemIcrease.bind(null, menuItems[i],cardButton, cardButton2, menuItems[i].price )
        plusIcon.addEventListener("click", plusIcon.boundClickHandler)

        minusIcon.boundClickHandler = itemDecrease.bind(null, menuItems[i],cardButton, cardButton2, menuItems[i].price, cardIMG)
        minusIcon.addEventListener("click", minusIcon.boundClickHandler)

    }
}
parsing()

function itemIcrease(item,btn1,btn2,price){
        let itemDiv = shoppingCart[item.name][2].itemDiv
        let itemAmount = itemDiv.querySelector(".itemAmount")
        let itemSUM = itemDiv.querySelector(".itemSUM")
        shoppingCart[item.name][1].amount += 1
        shoppingCart[item.name][3].itemPrice += price
        btn2.childNodes[0].childNodes[1].textContent = Number(itemAmount.textContent) + 1
        itemAmount.textContent = Number(itemAmount.textContent) + 1
        allItems += 1
        itemSUM.textContent =  (Number(itemSUM.textContent) + price).toFixed(2)
        totalOrder = totalOrder + price
        totalText.textContent = "$ " + totalOrder.toFixed(2)
        cartHeader.textContent = "Your Cart (" + allItems + ")"
        console.log(shoppingCart)
}


function itemDecrease(item,btn1,btn2,price,img){
    let itemDiv = shoppingCart[item.name][2].itemDiv
    shoppingCart[item.name][3].itemPrice -= price
    let itemAmount = itemDiv.querySelector(".itemAmount")
    let itemSUM = itemDiv.querySelector(".itemSUM")
    allItems -= 1
    cartHeader.textContent = "Your Cart (" + allItems + ")"

    if (shoppingCart[item.name][1].amount > 1){
        shoppingCart[item.name][1].amount -= 1
        btn2.childNodes[0].childNodes[1].textContent = Number(itemAmount.textContent) - 1
        itemAmount.textContent = Number(itemAmount.textContent) - 1
        itemSUM.textContent =  (Number(itemSUM.textContent) - price).toFixed(2)
        totalOrder = totalOrder - price
        totalText.textContent = "$ " + totalOrder.toFixed(2)
//Reset button when item is 0
    }else{
        img.classList.remove("cardIMG_selected")
        btn1.classList.remove("hide")
        btn2.classList.add("hide")
        shoppingCart[item.name][1].amount = 0
        totalOrder = totalOrder - price
        totalText.textContent = "$ " + totalOrder
        itemDiv.remove()
        delete shoppingCart[item.name]
        if (Object.keys(shoppingCart).length === 0){
            document.querySelector("#cartcontEmpty").classList.remove("hide")
            document.querySelector("#cartcontFilled").classList.add("hide")
        }
    }
}

function removeItem(item,btn1,btn2,img){
    img.classList.remove("cardIMG_selected")
    btn1.classList.remove("hide")
    btn2.classList.add("hide")

    allItems = allItems - btn2.childNodes[0].childNodes[1].textContent
    cartHeader.textContent = "Your Cart (" + allItems + ")"
    btn2.childNodes[0].childNodes[1].textContent = 0
    let itemDiv = shoppingCart[item.name][2].itemDiv
    let itemSUM = itemDiv.querySelector(".itemSUM").textContent

    totalOrder = totalOrder - itemSUM
    totalText.textContent = "$" + totalOrder.toFixed(2)

    itemDiv.remove()
    delete shoppingCart[item.name]
//If No more item in cart
    if (Object.keys(shoppingCart).length === 0){
        document.querySelector("#cartcontEmpty").classList.remove("hide")
        document.querySelector("#cartcontFilled").classList.add("hide")
    }
    
}

function itemAdd(item,btn1,btn2,price,img){

        img.classList.add("cardIMG_selected")
        allItems += 1
        totalOrder = totalOrder + price
        totalText.textContent = "$ " + totalOrder.toFixed(2)

        btn1.classList.add("hide")
        btn2.classList.remove("hide")
        document.querySelector("#cartcontEmpty").classList.add("hide")
        document.querySelector("#cartcontFilled").classList.remove("hide")

        let itemDiv = document.createElement("div")
        cartHeader.insertAdjacentElement("afterend",itemDiv)
        cartHeader.textContent = "Your Cart (" + allItems + ")"

        let itemName = document.createElement("p")
        itemDiv.appendChild(itemName).classList.add("itemName")
        itemName.textContent = item.name

        let itemRemoveIcon = document.createElement("img")
        itemDiv.appendChild(itemRemoveIcon).classList.add("removeIcon")
        itemRemoveIcon.src = "assets/images/icon-remove-item.svg"

        itemRemoveIcon.addEventListener("mouseenter", function(event){
            itemRemoveIcon.classList.add("removeIcon_h")
        })
        itemRemoveIcon.addEventListener("mouseleave", function(event){
            itemRemoveIcon.classList.remove("removeIcon_h")
        })
        itemRemoveIcon.addEventListener("touchstart", function(event) {
            itemRemoveIcon.classList.add("removeIcon_h");
        });
        
        itemRemoveIcon.addEventListener("touchend", function(event) {
            itemRemoveIcon.classList.remove("removeIcon_h");
        });
        itemRemoveIcon.addEventListener("touchcancel", function(event) {
            itemRemoveIcon.classList.remove("removeIcon_h");
        });

        itemRemoveIcon.boundClickHandler = removeItem.bind(null,item,btn1,btn2,img)
        itemRemoveIcon.addEventListener("click",  itemRemoveIcon.boundClickHandler)

     


        let itemAmount = document.createElement("span");
        itemAmount.classList.add("itemAmount");
        itemAmount.textContent = "1"; 

        let itemX = document.createElement("span");
        itemX.classList.add("itemX");
        itemX.textContent = "  X  "; 

        let itemPriceSpan = document.createElement("span");
        itemPriceSpan.classList.add("itemPrice");
        itemPriceSpan.textContent = " @" + price.toFixed(2); 

        let dollarSign = document.createElement("span")
        dollarSign.classList.add("dollarSign");
        dollarSign.textContent = "$"

        let itemSUM = document.createElement("span");
        itemSUM.classList.add("itemSUM");
        itemSUM.textContent = price.toFixed(2);

        let itemLine = document.createElement("hr")

        itemDiv.appendChild(itemAmount);
        itemDiv.appendChild(itemX);
        itemDiv.appendChild(itemPriceSpan);
        itemDiv.appendChild(dollarSign);
        itemDiv.appendChild(itemSUM);
        itemDiv.appendChild(itemLine);

        shoppingCart[item.name] = []
        shoppingCart[item.name].push({ "name" : item.name})
        shoppingCart[item.name].push({ "amount" : 1})
        shoppingCart[item.name].push({ "itemDiv" : itemDiv})
        shoppingCart[item.name].push({ "itemPrice" : price})
        console.log(shoppingCart)
}


function orderDone(){
    orderPanel.classList.remove("hide")
    orderPanel.scrollIntoView({behavior: "smooth", block: "end"})
    gridcont.classList.add("pointer_off")
    cartFilled.classList.add("pointer_off")
     let totalSum = document.querySelector("#totalOrderSumConf")
     let secondP = document.querySelector(".orderHText")
     totalSum.textContent = "$ " + totalOrder.toFixed(2)
     
    for (let key in shoppingCart){
    //Disable Remove Button
        let removeIcon = shoppingCart[key][2].itemDiv.childNodes[1]
        removeIcon.removeEventListener("click", removeIcon.boundClickHandler)
    // Create main div
       const confirmedItem = document.createElement('div');
       confirmedItem.classList.add('confirmeditem');
       secondP.insertAdjacentElement('afterend', confirmedItem);

       // Create img
       const img = document.createElement('img');
       img.classList.add('confThumb');
       confirmedItem.appendChild(img)

       for (let key2 in menuItems){
        if (menuItems[key2].name === shoppingCart[key][0].name){
            let imgSrc = menuItems[key2].image.thumbnail
            img.src = imgSrc;
            break
        }
       }
       
       // Create container div
       const container = document.createElement('div');
       container.id = 'container';
       confirmedItem.append(container);
   
       // Item name
       const nameSpan = document.createElement('span');
       nameSpan.classList.add('confitemName');
       nameSpan.textContent = shoppingCart[key][0].name;
       
       // confCont div
       const confCont = document.createElement('div');
       confCont.id = 'confCont';
    
       // Amount
       const amountSpan = document.createElement('span');
       amountSpan.classList.add('confAmount');
       amountSpan.textContent = shoppingCart[key][1].amount + "x"
       
       // Price
       const priceSpan = document.createElement('span');
       priceSpan.classList.add('confPrice');
       priceSpan.textContent = "@ $ " + (shoppingCart[key][3].itemPrice / shoppingCart[key][1].amount).toFixed(2)
       
       // Total price
       const totalPriceSpan = document.createElement('span');
       totalPriceSpan.classList.add('conftotalPrice');
       totalPriceSpan.textContent = " $" + shoppingCart[key][3].itemPrice.toFixed(2);

       //Append
       container.append(nameSpan, confCont, totalPriceSpan);
       confCont.append(amountSpan, priceSpan);

    }
}

function neworder(){
    location.reload()
}