import { ethers } from "./ether.js";

const myDiv = document.getElementById("textcontainer");
const promptDiv = document.getElementById("ticker");
document.addEventListener("DOMContentLoaded", async function () {
  const AtTheStudioABI = [
    {
      inputs: [],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "status",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "Update",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presence",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "statement",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const weatherDataABI = [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"dataArray","type":"uint256[]"}],"name":"Update","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"temperature","type":"uint256"},{"internalType":"uint256","name":"humidity","type":"uint256"},{"internalType":"uint256","name":"luminosity","type":"uint256"},{"internalType":"uint256","name":"pressure","type":"uint256"}],"name":"updateData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"weatherData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
  const otherDiv = document.getElementById("datacontainer");
  const linkDiv1 = document.getElementById("link1");
  const linkDiv2 = document.getElementById("link2");
  const linkDiv3 = document.getElementById("link3");
  const linkDiv4 = document.getElementById("link4");

  const linkDiv1b = document.getElementById("link1b");
  const linkDiv2b = document.getElementById("link2b");
  const linkDiv3b = document.getElementById("link3b");
  
  const svgTxt = document.getElementById("changeText")
  const weatherDiv = document.getElementById("svg-container");
  const tempChange = document.createElement("span");
  const AtTheStudioADDRESS = "0xaf6c153972fbc7d67feaa9f9d1d08f3c13f79773";
  const weatherDataADDRESS = "0x673aCB29765fAB093dDd522850f16F0b2e3D3C39"
  const provider = new ethers.providers.JsonRpcProvider(
    "https://optimism-mainnet.infura.io/v3/9715c9bf2b9c47109c84cabf0fbcaae5"
  );
  const AtTheStudioContract = new ethers.Contract(
    AtTheStudioADDRESS,
    AtTheStudioABI,
    provider
  );
  const weatherDataContract = new ethers.Contract(
    weatherDataADDRESS,
    weatherDataABI,
    provider
  );
  
  const [statement, temp, humi, lux, press] = await Promise.all([AtTheStudioContract.statement(), weatherDataContract.weatherData(0), weatherDataContract.weatherData(1), weatherDataContract.weatherData(2), weatherDataContract.weatherData(3)]);
  const sTemp = temp * 0.01;
  const sHumi = humi * 0.01;
  const sLux = lux * 0.01;
  const sPress = press * 0.01;
  console.log(sTemp + ' ' + sHumi + ' ' + sLux + ' ' + sPress)
  function updateDiv() {
  
    function statementDiv() {
      // statement from blockchain
      myDiv.innerHTML = statement + ".";
      function tickerDiv() {
        // add&remove class to display elements sequentially 
        weatherDiv.classList.remove("no-dis");
        weatherDiv.classList.add("svgcontainer");  
        function svgData() {
          promptDiv.classList.remove("no-dis");
          promptDiv.classList.add("teleprompt");     
          function buttonDiv1() {
            linkDiv1.classList.remove("no-dis");
            linkDiv1.classList.add("consecutive-link");
  
            function buttonDiv2() {
              linkDiv1b.classList.remove("no-dis");
              linkDiv1b.classList.add("silentNav");
  
              linkDiv2.classList.remove("no-dis");
              linkDiv2.classList.add("weather-link");
  
              function buttonDiv3() {
                linkDiv2b.classList.remove("no-dis");
                linkDiv2b.classList.add("silentNav");
  
                linkDiv3.classList.remove("no-dis");
                linkDiv3.classList.add("blockchain-link");
  
                function buttonDiv4() {
                   linkDiv3b.classList.remove("no-dis");
                linkDiv3b.classList.add("silentNav");
                  linkDiv4.classList.remove("no-dis");
                  linkDiv4.classList.add("my-link");
                }
                setTimeout(buttonDiv4, 1111);
              }
              setTimeout(buttonDiv3, 1111);
            }
            setTimeout(buttonDiv2, 1111);
          }
          setTimeout(buttonDiv1, 9999);   
        }
        setTimeout(svgData, 3333);
      }
      setTimeout(tickerDiv, 1111);
    }
    setTimeout(statementDiv, 2222);
    myDiv.classList.remove("bottom-left");
    myDiv.classList.add("flex-item");
    myDiv.innerHTML = "At this moment...";
  }

  setTimeout(updateDiv, 3333);
  var myRequest = new Request("present.txt");
  fetch(myRequest).then(function (response) {
    return response.text().then(function (text) {
      const txt_lines = text.split(/\r?\n/);
      const date_time = txt_lines[0].split(" ");
      const timestmp = date_time.splice(-1);
      const datestmp = date_time.splice(-2);
      const temperature = txt_lines[2].split(" ");
      const past = temperature[0];
      const change = temperature[1];
      console.log(change)
      svgTxt['innerText' in svgTxt ? "innerText" : "textContent"] = "Indoor Temperature " + sTemp.toFixed(1) + "\u00B0C, Humidity " + sHumi.toFixed(2) + "%, Luminosity " + sLux.toFixed(1) + "lux, Barometric Pressure " + sPress.toFixed(1) + "hPa at " + timestmp + " on " + datestmp[1];
      if (statement == "I am at the studio") {
        myDiv.classList.add("present");
        if (Math.sign(change) === -1) {
          otherDiv.innerHTML =
            "Indoor temperature was " +
            past +
            "\u00B0C at " +
            timestmp +
            " when I arrived";
          otherDiv.innerHTML += " \u2014 " + change * -1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("warmer");
          tempChange.innerHTML = "warmer";
          otherDiv.innerHTML += " than last recorded temperature";
          otherDiv.innerHTML +=
            " \u2014 Get the <a href='https://vincent.charlebois.info/weather'>full weather report</a>.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (Math.sign(change) === 1) {
          otherDiv.innerHTML =
            "Indoor temperature was " +
            past +
            "\u00B0C at " +
            timestmp +
            " when I arrived";
          otherDiv.innerHTML += " \u2014 " + change * 1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("cooler");
          tempChange.innerHTML = "cooler";
          otherDiv.innerHTML += " than last recorded temperature";
          otherDiv.innerHTML +=
            " \u2014 Get updates on <a href='https://twitter.com/vncntxyz'>twitter [@vncntxyz]</a>";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (change === '0.0') {
          otherDiv.innerHTML =
          "Indoor temperature was " +
          past +
          "\u00B0C at " +
          timestmp +
          " when I arrived";
        otherDiv.innerHTML += " \u2014 ";
        otherDiv.innerHTML += "Exactly the same as the last recorded temperature";
        otherDiv.innerHTML +=
          " \u2014 Get updates on <a href='https://twitter.com/vncntxyz'> twitter </a>";
        otherDiv.innerHTML +=
          "                                                       ";
        }
      } else {
        myDiv.classList.add("absent");
        if (Math.sign(change) === -1) {
          otherDiv.innerHTML =
            "Indoor temperature was " + past + "\u00B0C when I left at " + timestmp + " on " + datestmp[1];
          otherDiv.innerHTML += " \u2014 " + change * -1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("warmer");
          tempChange.innerHTML = "warmer";
          otherDiv.innerHTML += " than when I arrived";
          otherDiv.innerHTML +=
            " \u2014 The studio is only one of many places where art gets made.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (Math.sign(change) === 1) {
          otherDiv.innerHTML =
            "Indoor temperature was " + past + "\u00B0C when I left at " + timestmp + " on " + datestmp[1];
          otherDiv.innerHTML += " \u2014 " + change * 1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("cooler");
          tempChange.innerHTML = "cooler";
          otherDiv.innerHTML += " than when I arrived";
          otherDiv.innerHTML +=
            " \u2014 The studio is only one of many places where art gets made.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (change === '0.0') {
          otherDiv.innerHTML =
          "Indoor temperature was " + past + "\u00B0C when I left at " + timestmp + " on " + datestmp[1];
        otherDiv.innerHTML += " \u2014 ";
        otherDiv.innerHTML += "Exactly the same as when I arrived";
        otherDiv.innerHTML +=
          " \u2014 The studio is only one of many places where art gets made.";
        otherDiv.innerHTML +=
          "                                                       ";
        }
      }
    });
  });

  console.log(statement);
});
