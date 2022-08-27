const otherDiv = document.getElementById('datacontainer');

var otherRequest = new Request('counting.txt');
function CheckIf() {
fetch(otherRequest).then(function(response) {
return response.text().then(function(text) {
otherDiv.innerHTML = text;
});
});


var tempRequest = new Request('HOT.txt');

fetch(tempRequest).then(function(response) {
return response.text().then(function(text) {
const temperature = text.split(" ");

let past = temperature[0];
let change = temperature[1];
if (Math.sign(change) === -1) {
    otherDiv.innerHTML += ' \u2014 Indoor temperature was ' + past + '\u00B0C when I left';
    otherDiv.innerHTML += ' \u2014 ' + (change * -1) + '\u00B0C warmer than when I arrived';
    otherDiv.innerHTML += ' \u2014 The studio is only one of many places where art gets made.';                    
    otherDiv.innerHTML += '                                                       ';
}
else if (Math.sign(change) === 1) {
    otherDiv.innerHTML += ' \u2014 Indoor temperature was ' + past + '\u00B0C when I left';
    otherDiv.innerHTML += ' \u2014 ' + (change * 1) + '\u00B0C cooler than when I arrived'
    otherDiv.innerHTML += ' \u2014 The studio is only one of many places where art gets made.';                    
    otherDiv.innerHTML += '                                                       ';
}
});
});
}
window.onload = CheckIf;