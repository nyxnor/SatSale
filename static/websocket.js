// Websocket logic, talks to satsale.py /pay

// Initiate is called in the <head> of index.html with the payload provided
// by the flask request. The data can not be passed straight from flask to this js
// Hence we {{ load }} it in the index head and call this function.
function open_websocket(payment_data) {
    namespace = '/';
    var socket = io(namespace);

    // Echo initated message for debugging.
    socket.on('connect', function() {
        socket.emit('initialise', {'data': 'Initialising payment.'});
    });

    // Recieving payment status from flask
    socket.on('payresponse', function(msg) {
        console.log(msg.response);
        // Display payment status
        $('#status').text(msg.status).html();
        // Display payment address
        $('#address').text(msg.address).html();
        // Display payment amount
        $('#amount').text(msg.amount).html();
        $('#amount_sats').text(Math.round(msg.amount * 10**8)).html();
        // Display payment time left
        $('#timer').text(Math.round(msg.time_left)).html();

        // Run additional logic that manipulates element visibility depending
        // on the contents and status of the payment.
        conditionalPageLogic(msg)

        console.log(msg);

        // Actions if paid
        if (msg.paid == true) {

            // Redirect if paid
            if (msg.redirect != null) {
                setTimeout(() => {  window.location.replace(msg.redirect);  }, 5000);
            }
        }
    });

    // Initiate the payment websocket with the server
    socket.emit('initiate_payment', payment_data);
    return false
}

// Run additional logic that manipulates element visibility depending
// on the contents and status of the payment when giving a response to the webpage.
function conditionalPageLogic(msg) {
    // Display QR code
    if (msg.address != null) {
        // Change image id to qr id
        document.getElementById('qrImage').className = "qr";
        // Insert image and link
        document.getElementById('qrClick').href = "/static/qr_codes/" + msg.uuid + ".png";
        document.getElementById('qrImage').src = "/static/qr_codes/" + msg.uuid + ".png";
    }
    // Hide timer until ready.
    if (msg.time_left == 0) {
        document.getElementById('timerContainer').style.visibility = "hidden";
    }
    else {
        document.getElementById('timerContainer').style.visibility = "visible";
    }
}

function replaceUrlParam(url, paramName, paramValue)
{
    console.log(url);
    var href = new URL(url);
    href.searchParams.set(paramName, paramValue);
    window.location = href;
    return
}

// Payment timer, can't go below zero, update every second
intervalTimer = setInterval(function () {
    var currentTime = document.getElementById('timer').innerHTML;
    if (currentTime <= 0) {
        currentTime = 1;
    }
    document.getElementById('timer').innerHTML = Math.round(currentTime - 1);
}, 1000)

// Copy text functions
function copyText(text) {
  navigator.clipboard.writeText(text);
}
function copyTextFromElement(elementID) {
  let element = document.getElementById(elementID); //select the element
  let elementText = element.textContent; //get the text content from the element
  copyText(elementText); //use the copyText function below
  alert("Copied address:" + elementText)
}
