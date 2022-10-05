// set time delay
var msDelay = 2000;

// alternatively the delay can be set by following the url with a number of miliseconds
// e.g. https://vincent.charlebois.info/weather/report.html?500

if(parseInt(window.location.search.substring(1))) {
    isNumber = parseInt(window.location.search.substring(1));
    msDelay = isNumber;
}


const myDiv = document.getElementById("textcontainer");
const promptDiv = document.getElementById("ticker");
document.addEventListener("DOMContentLoaded", async function () {
  const linkDiv1 = document.getElementById("link1");
  const linkDiv3 = document.getElementById("link3");
  const tempChangePos = document.createElement("span");
  const tempChangeNeg = document.createElement("span");
  const humiS = document.createElement("span");
  const tempS = document.createElement("span");
  const luxS = document.createElement("span");
  const pressS = document.createElement("span");

  const canvas = document.querySelector('#weatherDraw');
  var sizeWidth = 80 * window.innerWidth / 100;
  var sizeHeight = 100 * window.innerHeight / 100;
  canvas.width = sizeWidth;
  canvas.height = sizeHeight;
  canvas.style.width = sizeWidth;
  canvas.style.height = sizeHeight;
  

  function newDataObject(rawData) {
    const all_data = rawData.split(" ");
    const tempData = all_data[1].split(":");
    const humiData = all_data[2].split(":");
    const luxData = all_data[3].split(":");
    const pressureData = all_data[4].split(":");
    const timeData = all_data[5].split(":");
    const myStatus = all_data[0];
    var obj = {
      myStatus: myStatus,
      temp: tempData[1],
      humi: humiData[1],
      lux: luxData[1],
      pressure: pressureData[1],
      time: timeData[1],
      get status() {
        return this.myStatus;
      },
    };

    return obj;
  }

  var myRequest = new Request("../climate.txt");
  fetch(myRequest).then(function (response) {
    return response.text().then(function (text) {
      splitLines = text.split(/\r?\n/);
      var dataCollection = [];
      for (var i = splitLines.length - 1; i > 1; i--) {
        dataCollection[i] = new newDataObject(splitLines[i]);
      }
      var xInterval = sizeWidth / dataCollection.length;
      var x = (xInterval / 2);

      // insert here if I am or not at the studio
      function firstChange() {
        myDiv.classList.remove("top-left");
        myDiv.classList.add("flex-item");

        if (dataCollection[dataCollection.length - 1].status == "IN") {
          myDiv.innerHTML =
            "<br /> I am <strong>currently</strong> at the studio.<br />";
        } else {
          myDiv.innerHTML =
            "<br /> I am <strong>not</strong> at the studio at this moment.<br />";
        }
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const loop = async () => {
          for (var j = dataCollection.length - 1; j > 2; j--) {
            xMultiplier = ((j - dataCollection.length - 1) * -1) * xInterval;
            if (j!=dataCollection.length -1) {var tempDiff = dataCollection[j].temp - dataCollection[j + 1].temp;} else {var tempDiff = dataCollection[j].temp - dataCollection[j - 1].temp;}
            var timeString = makeTimeString(timeDiff);
            var datetime = new unix2time(dataCollection[j].time);
            var timeDiff = dataCollection[j].time - dataCollection[j - 1].time;


            
                const ctx = canvas.getContext('2d');
                if(j!=dataCollection.length -1) {
                    var xStart = [x + (xInterval / 2), dataCollection[j + 1].humi * 7];
                    var yStart = [x + (xInterval / 2), dataCollection[j + 1].lux * 0.005 + 48];
                    var zStart = [x + (xInterval / 2), dataCollection[j + 1].pressure * 0.5 + 55];

                    var aStart = [x + (xInterval / 2), dataCollection[j + 1].temp * 6 + 300];}

                    else {
                        var xStart = [x + (xInterval / 2), dataCollection[j].humi * 7];
                        var yStart = [x + (xInterval / 2), dataCollection[j].lux * 0.005 + 48];
                        var zStart = [x + (xInterval / 2), dataCollection[j].pressure * 0.5 + 55];
                        var aStart = [x + (xInterval / 2), dataCollection[j].temp * 6 + 300];
                    } 

                    if (Math.sign(tempDiff) === -1) {
                        drawColor = 'lightgray';
                        } else if (Math.sign(tempDiff) === 1) {
                            drawColor = "darkgray";
                        }


            function updateDiv() {
              if (j == dataCollection.length - 1) {
                myDiv.innerHTML += "<br />W";
              } else {
                myDiv.innerHTML += "w";
              }
              if (dataCollection[j].status == "IN") {
                myDiv.innerHTML +=
                  "hen I arrived at " + datetime.time + " on " + datetime.date;
              } else {
                myDiv.innerHTML +=
                  "hen I left at " + datetime.time + " on " + datetime.date;
              }
              if (j == dataCollection.length - 1) {
                myDiv.innerHTML += ",<br>";
              } else {
                myDiv.innerHTML += ".<br>";
              }
              function intermediary() {
                if (j == dataCollection.length - 1) {
                  myDiv.innerHTML += "<br />I";
                } else {
                  myDiv.innerHTML += "<br />At that moment, i";
                }
                myDiv.innerHTML +=
                  "ndoor ";
                myDiv.appendChild(tempS);
                tempS.classList.add("LightGray");
                tempS.innerHTML = "temperature";
                myDiv.innerHTML += " was " +
                  dataCollection[j].temp +
                  "\u00B0C, <br /> ";
                  drawLine(ctx, aStart, [xMultiplier + (xInterval / 2), dataCollection[j].temp * 6 + 305], drawColor, 3);
                  
                function statementDiv() {
                  // insert if last record is IN or OUT
                  myDiv.innerHTML +=
                    "<br /> ";
                myDiv.appendChild(humiS);
                humiS.classList.add("blue");
                humiS.innerHTML = "Humidity";
                myDiv.innerHTML += " was " +
                    dataCollection[j].humi +
                    "&percnt;, <br />";


                  drawLine(ctx, xStart, [xMultiplier + (xInterval / 2), dataCollection[j].humi * 7], 'lightblue', 2);
                
                  function tickerDiv() {
                    myDiv.innerHTML +=
                      "<br /> ";
                      myDiv.appendChild(luxS);
                luxS.classList.add("orange");
                luxS.innerHTML = "Luminosity"
                myDiv.innerHTML += " was at " +
                      dataCollection[j].lux +
                      " lux, <br />";
                      drawLine(ctx, yStart, [xMultiplier + (xInterval / 2), dataCollection[j].lux * 0.005 + 60], 'orange', 1, 1, "lightgrey",0.5);
                     
                    function buttonDiv1() {
                      myDiv.innerHTML +=
                        "<br /> "
                        myDiv.appendChild(pressS);
                pressS.classList.add("green");
                pressS.innerHTML = "Barometric Pressure ";
                myDiv.innerHTML += "was at " +
                        dataCollection[j].pressure +
                        " hPa, <br />";
                        drawLine(ctx, zStart, [xMultiplier + (xInterval / 2), dataCollection[j].pressure * 0.5 + 55], 'lightgreen', 2, 1, "white", 0.1);
          
                        
                      function buttonDiv3() {
                        

                          if(j!=1){
                            myDiv.innerHTML += "<br />It was ";
                            if (Math.sign(tempDiff) === -1) {
                            myDiv.innerHTML +=
                                tempDiff.toPrecision(3) * -1 + "\u00B0C ";
                            myDiv.appendChild(tempChangePos);
                            tempChangePos.classList.add("warmer");
                            tempChangePos.innerHTML = "warmer";
                            drawLine(ctx, aStart, [xMultiplier + (xInterval / 3) - 1, dataCollection[j].temp * 6 + 305], "#f31100", 3);
                            } else if (Math.sign(tempDiff) === 1) {
                            myDiv.innerHTML +=
                                tempDiff.toPrecision(3) * 1 + "\u00B0C ";
                            myDiv.appendChild(tempChangeNeg);
                            tempChangeNeg.classList.add("cooler");
                            tempChangeNeg.innerHTML = "cooler";
                            drawLine(ctx, aStart, [xMultiplier + (xInterval / 2) - 1, dataCollection[j].temp * 6 + 305], "#00bcd4", 3);
                            }
                            x = xMultiplier;
                            myDiv.innerHTML +=
                            " than the last recorded temperature, " +
                            timeString +
                            " earlier ";
                      }
                    }
                      setTimeout(buttonDiv3, msDelay);
                    }
                    setTimeout(buttonDiv1, msDelay);
                  }
                  setTimeout(tickerDiv, msDelay);
                }
                setTimeout(statementDiv, msDelay);
              }
              setTimeout(intermediary, msDelay);
            }
            setTimeout(updateDiv, msDelay);
            await wait((msDelay * 6) + 1);
            if (j == 3) {
                function firstButton() {
                    linkDiv1.classList.remove("no-dis");
                    linkDiv1.classList.add("my-link");
                    function secondButton() {
                      linkDiv3.classList.remove("no-dis");
                      linkDiv3.classList.add("blockchain-link");
                    }
                    setTimeout(secondButton, msDelay);
                  }
                  setTimeout(firstButton, msDelay);
            }
          }
        };

        loop();
        
        
      }
      setTimeout(firstChange, 2222);
    });
  });
  
});
