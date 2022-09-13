// sound const
const maxVol = 0.015;
// get elements
const bode = document.getElementById("dcontain");
const flbx = document.getElementById("fbox");
const arrow = document.getElementById("arrow");
var clickDetune = 0;

// Function for back button:
function arrowButton() {
  window.location = "../consecutive-days/";
}

// takes a number and turns it into a color

function toColor(num) {
  num >>>= 0;
  var b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16,
    a = ((num & 0xff000000) >>> 24) / 255 + 0.027451;
  return "rgba(" + [r, g, b, a].join(",") + ")";
}

// takes a number and turns it into a different color
function fgColor(num, mult) {
  num >>>= 0;
  var b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16,
    a = ((num & 0xff000000) >>> 24) / 200 + 0.027451;
  return (
    "rgba(" +
    [255 - r * mult, 255 - g * mult, 255 - b * mult, 255 - a * mult].join(",") +
    ")"
  );
}

// set maximum seconds
var maxis;
// set amount of days
var dayz;
// create web ausdio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  var myRequest = new Request(filename);
  fetch(myRequest).then(function (response) {
    return response.text().then(function (text) {
      // content of daily seconds
      const contents = text;
      // split daily totals
      const arr = contents.split(/\r?\n/);
      // get maximum seconds
      maxis = Math.max(...arr);
      // get number of days
      dayz = arr.length;
      // write maximum second to data maxi
      flbx.dataset.maxi = maxis;
      flbx.dataset.item = maxis;
      // for each day do main function
      arr.forEach(main);
      return arr;
    });
  });
}

// set div count
let divcount = 0;

// main function
function main(item) {
  // take your time
  var timeNow = Math.round(Date.now() / 1000);
  // keep count
  divcount++;
  // create divs
  var div = document.createElement("div");
  // populate datafield
  div.dataset.item = item;
  // generate color
  var color = (item / maxis) * 222 + 28;
  // generate border radius
  var borderR = (1 - item / maxis) * 100;
  // div is assigned id
  div.id = divcount;
  // with class textColor
  div.classList.add("textColor", "divHeight");
  // create width and height based on data
  div.style.width = (item / (maxis + 2000)) * (100 / dayz) + "%";
  // 0-255 to 0-1
  var gsFactor = color / 255;

  // set the eventlistener for on-click change function
  div.addEventListener("click", bonjour, false);

  // set border radius
  div.style.borderRadius = borderR + "px";
  // compute and set colors
  rgba = toColor(timeNow * 20009);
  hex = fgColor(timeNow * 20009, gsFactor);
  bode.style.backgroundColor = rgba;
  bode.style.color = hex;
  div.style.backgroundColor = hex;
  div.style.color = hex;

  // append this div to the flex box
  flbx.appendChild(div);

  // create sound
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  if (flbx.classList.contains("alldays") == true) {
    gainNode.gain.value = (item / maxis) * 0.0025;
  } else {
    gainNode.gain.value = (item / maxis) * 0.025;
  }
  var thisFrequency = (timeNow % 444) + divcount * 0.25;
  var thisDetune = (1 - item / maxis) * 0.5;
  oscillator.type = "sine";
  oscillator.detune.value = thisDetune;
  oscillator.frequency.setValueAtTime(thisFrequency, audioCtx.currentTime); // value in hertz
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
}

bode.addEventListener("click", hello, false);
