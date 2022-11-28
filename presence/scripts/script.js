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
  const linkDiv5 = document.getElementById("link5");


  const linkDiv1b = document.getElementById("link1b");
  const linkDiv2b = document.getElementById("link2b");
  const linkDiv3b = document.getElementById("link3b");
  const linkDiv4b = document.getElementById("link4b");
  
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
      if (statement == "I am at the studio") {
        myDiv.innerHTML = "je suis &#224; l'atelier" + ".";
      } else {
        myDiv.innerHTML = "je ne suis pas &#224; l'atelier" + "."
      } 
      function svgData() {
        // add&remove class to display elements sequentially 
        weatherDiv.classList.remove("no-dis");
        weatherDiv.classList.add("svgcontainer");  
        function tickerDiv() {
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
                  function buttonDiv5() {
                    linkDiv4b.classList.remove("no-dis");
                    linkDiv4b.classList.add("silentNav");
                    linkDiv5.classList.remove("no-dis");
                    linkDiv5.classList.add("english-link");
                  }
                  setTimeout(buttonDiv5, 1111);
                }
                setTimeout(buttonDiv4, 1111);
              }
              setTimeout(buttonDiv3, 1111);
            }
            setTimeout(buttonDiv2, 1111);
          }
          setTimeout(buttonDiv1, 9999);   
        }
        setTimeout(tickerDiv, 4444);
      }
      setTimeout(svgData, 2222);
    }
    setTimeout(statementDiv, 2222);
    myDiv.classList.remove("bottom-left");
    myDiv.classList.add("flex-item");
    myDiv.innerHTML = "&#192; ce moment pr&#233;cis,";
  }

  setTimeout(updateDiv, 3333);
  var myRequest = new Request("../am-i/present.txt");
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
      svgTxt['innerText' in svgTxt ? "innerText" : "textContent"] = "Température intérieur " + sTemp.toFixed(1) + "\u00B0C, Humidité " + sHumi.toFixed(2) + "%, Luminosité " + sLux.toFixed(1) + "lux, Pression barométrique " + sPress.toFixed(1) + "hPa à " + timestmp + " le " + datestmp[1];
      if (statement == "I am at the studio") {
        myDiv.classList.add("present");
        if (Math.sign(change) === -1) {
          otherDiv.innerHTML =
            "La temp&#233;rature int&#233;rieure &#233;tait de " +
            past +
            "\u00B0C &#224;	" +
            timestmp +
            " lorsque je suis arriv&#233;";
          otherDiv.innerHTML += " \u2014 " + change * -1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("warmer");
          tempChange.innerHTML = "au-dessus";
          otherDiv.innerHTML += " de la derni&#232;re temp&#233;rature enregistr&#233;e";
          otherDiv.innerHTML +=
            " \u2014 Un <a href='https://vincent.charlebois.info/weather'>relev&#233; m&#233;t&#233;o complet</a> est disponible.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (Math.sign(change) === 1) {
          otherDiv.innerHTML =
            "La temp&#233;rature int&#233;rieure &#233;tait de " +
            past +
            "\u00B0C &#224;	" +
            timestmp +
            " quand je suis arriv&#233;e";
          otherDiv.innerHTML += " \u2014 " + change * 1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("cooler");
          tempChange.innerHTML = "en dessous ";
          otherDiv.innerHTML += " de la derni&#232;re mesure de temp&#233;rature";
          otherDiv.innerHTML +=
            " \u2014 Visitez <a href='https://twitter.com/vncntxyz'>twitter [@vncntxyz]</a> pour des mises &#224;	jour automatis&#233;es";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (change === '0.0') {
          otherDiv.innerHTML =
          "La temp&#233;rature int&#233;rieure &#233;tait de " +
          past +
          "\u00B0C &#224;	" +
          timestmp +
          " quand je suis arriv&#233;";
        otherDiv.innerHTML += " \u2014 ";
        otherDiv.innerHTML += "Exactement la même temp&#233;rature que la mesure pr&#233;c&#233;dente";
        otherDiv.innerHTML +=
          " \u2014 Pour des mises &#224;	jour automatiques, suivez-moi sur <a href='https://twitter.com/vncntxyz'> twitter </a>";
        otherDiv.innerHTML +=
          "                                                       ";
        }
      } else {
        myDiv.classList.add("absent");
        if (Math.sign(change) === -1) {
          otherDiv.innerHTML =
            "La temp&#233;rature int&#233;rieure &#233;tait de " + past + "\u00B0C lorsque j'ai quitt&#233; &#224;	" + timestmp + " le " + datestmp[1];
          otherDiv.innerHTML += " \u2014 " + change * -1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("warmer");
          tempChange.innerHTML = "plus chaud";
          otherDiv.innerHTML += " que lorsque je suis arriv&#233;";
          otherDiv.innerHTML +=
            " \u2014 Le studio n'est qu'un des nombreux endroits où l'art est cr&#233;&#233;.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (Math.sign(change) === 1) {
          otherDiv.innerHTML =
            "La temp&#233;rature int&#233;rieure &#233;tait de " + past + "\u00B0C lorsque j'ai quitt&#233; &#224;	" + timestmp + " le " + datestmp[1];
          otherDiv.innerHTML += " \u2014 " + change * 1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("cooler");
          tempChange.innerHTML = "en dessous";
          otherDiv.innerHTML += " de la temp&#233;rature enregistr&#233;e &#224; mon arriv&#233;";
          otherDiv.innerHTML +=
            " \u2014 Le studio n'est qu'un des nombreux endroits où l'art est cr&#233;&#233;.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (change === '0.0') {
          otherDiv.innerHTML =
          "La temp&#233;rature int&#233;rieure &#233;tait de " + past + "\u00B0C lorsque j'ai quitt&#233; &#224;	" + timestmp + " le " + datestmp[1];
        otherDiv.innerHTML += " \u2014 ";
        otherDiv.innerHTML += "Exactement la même temp&#233;rature qu'&#233; mon arriv&#233;";
        otherDiv.innerHTML +=
          " \u2014 Le studio n'est qu'un des nombreux endroits où l'art est cr&#233;&#233;.";
        otherDiv.innerHTML +=
          "                                                       ";
        }
      }
    });
  });

  console.log(statement);
});
