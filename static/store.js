

function load_items(items) {
    itemList = items;
    var result = "<table id='itemtable'>";
    var result = result + "<tr><th>Item</th><th>Price</th><th>Quantity</th></tr>";

    var i = 0;
    for (const item of itemList) {
        console.log(item);
        itemName = item[0];
        itemPrice = item[1];
        itemImage = item[2];
        button = create_value_buttons(i);

        if (itemImage != null) {
            image = "<img src='" + itemImage + "' height=80px></br>";
            itemName = image + itemName;
        }
        result = result + "<tr><td>" + itemName + "</td><td>$" + itemPrice + "</td><td>" + button + "</td></tr>\n";
        i++;
    }
    result = result + "</table>";

    var storeTable = document.getElementById('storetable');
    storeTable.innerHTML = result;
    return;
}


function increaseValue(itemID) {
  var value = parseInt(document.getElementById("itemQuantity" + itemID).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById("itemQuantity" + itemID).value = value;
  updateInvoice()
}

function decreaseValue(itemID) {
  var value = parseInt(document.getElementById("itemQuantity" + itemID).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById("itemQuantity" + itemID).value = value;
  updateInvoice()
}

function getPriceEstimation() {
    $.getJSON("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", function(data){
        $("#BTCPrice").text(data["bitcoin"]["usd"].toFixed(2));
    }).fail(function( dat, textStatus, error ) {
        var err = textStatus + ", " + error;
        alert(err);
    });
}

function create_value_buttons(itemIndex) {
    var buttonStart = "<div class='value-button' id='decrease' onclick='decreaseValue(" + itemIndex + ")' value='Decrease Value'>-</div> \
    <input type='number' class='number' id='itemQuantity" + itemIndex + "' placeholder='0' onChange='updateInvoice()'/>\
    <div class='value-button' id='increase' onclick='increaseValue(" + itemIndex + ")' value='Increase Value'>+</div>";
    return buttonStart;
}

function clearQuantities() {
    var i;
    for (i = 0; i < num_items; i++) {
        document.getElementById("itemQuantity" + i).value = 0;
    }
    return;
}
function updateInvoice() {
    var i;
    var invoice_total = 0;
    for (i = 0; i < num_items; i++) {
        invoice_total = invoice_total + document.getElementById("itemQuantity" + i).value * items[i][1];
    }
    var price = document.getElementById("BTCPrice").innerHTML;
    var amount_bitcoin = invoice_total / price;
    amount_bitcoin = amount_bitcoin.toFixed(8);
    console.log(invoice_total, amount_bitcoin, price);

    document.getElementById("invoicetotal").innerHTML = invoice_total;
    document.getElementById("sats_amount").innerHTML = Math.round(amount_bitcoin * 10**8);
    document.getElementById("btc_amount").innerHTML = amount_bitcoin;
    document.getElementById("amount").value = invoice_total;
    return;
}

function main(items) {
    num_items = items.length;
    getPriceEstimation();
    load_items(items);
    updateInvoice();
}
