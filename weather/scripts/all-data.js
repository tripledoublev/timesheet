// set time delay
var msDelay = 2000;

// alternatively the delay can be set by following the url with a number of miliseconds
// e.g. https://vincent.charlebois.info/weather/report.html?500

if(parseInt(window.location.search.substring(1))) {
    isNumber = parseInt(window.location.search.substring(1));
    msDelay = isNumber;
}


var x = 0;
const myDiv = document.getElementById("textcontainer");
const promptDiv = document.getElementById("ticker");
document.addEventListener("DOMContentLoaded", async function () {
  const otherDiv = document.getElementById("datacontainer");
  const linkDiv1 = document.getElementById("link1");
  const linkDiv3 = document.getElementById("link3");
  const tempChangePos = document.createElement("span");
  const tempChangeNeg = document.createElement("span");
  const canvas = document.querySelector('#weatherDraw');


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
      var xMultiplier = 100 / dataCollection.length;
      console.log(xMultiplier);
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
            xInterval = ((j - dataCollection.length) * -1) * xMultiplier;
            if (j!=dataCollection.length -1) {var tempDiff = dataCollection[j].temp - dataCollection[j + 1].temp;} else {var tempDiff = dataCollection[j].temp - dataCollection[j - 1].temp;}
            var timeString = makeTimeString(timeDiff);
            var datetime = new unix2time(dataCollection[j].time);
            var timeDiff = dataCollection[j].time - dataCollection[j - 1].time;
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
                  "ndoor temperature was " +
                  dataCollection[j].temp +
                  "\u00B0C, <br /> ";

                function statementDiv() {
                  // insert if last record is IN or OUT
                  myDiv.innerHTML +=
                    "<br /> Humidity was " +
                    dataCollection[j].humi +
                    "&percnt;, <br />";
                  function tickerDiv() {
                    myDiv.innerHTML +=
                      "<br /> Luminosity was at " +
                      dataCollection[j].lux +
                      " lux, <br />";
                    function buttonDiv1() {
                      myDiv.innerHTML +=
                        "<br /> Barometric Pressure was at " +
                        dataCollection[j].pressure +
                        " hPa, <br />";
                      function buttonDiv3() {
                        if (canvas.getContext) {
                            const ctx = canvas.getContext('2d');
                            if(j!=dataCollection.length -1) {
                                var xStart = [x, dataCollection[j + 1].temp * 2];}
                                else {
                                    var xStart = [x, dataCollection[j].temp * 2];
                                } 

                                if (Math.sign(tempDiff) === -1) {
                                    drawColor = 'red';
                                    } else if (Math.sign(tempDiff) === 1) {
                                        drawColor = "#00bcd4";
                                    }
                        console.log(xStart);
                        drawLine(ctx, xStart, [xInterval * 2, dataCollection[j].temp * 2], drawColor, 2);
                        x = xInterval * 2;
                        console.log("x");
                        console.log(x);
                        console.log("y");
                        console.log(dataCollection[j].temp)
                        }
                          if(j!=1){
                            myDiv.innerHTML += "<br />It was ";
                            if (Math.sign(tempDiff) === -1) {
                            myDiv.innerHTML +=
                                tempDiff.toPrecision(3) * -1 + "\u00B0C ";
                            myDiv.appendChild(tempChangePos);
                            tempChangePos.classList.add("warmer");
                            tempChangePos.innerHTML = "warmer";
                            } else if (Math.sign(tempDiff) === 1) {
                            myDiv.innerHTML +=
                                tempDiff.toPrecision(3) * 1 + "\u00B0C ";
                            myDiv.appendChild(tempChangeNeg);
                            tempChangeNeg.classList.add("cooler");
                            tempChangeNeg.innerHTML = "cooler";
                            }

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
