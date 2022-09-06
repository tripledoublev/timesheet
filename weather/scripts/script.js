const myDiv = document.getElementById("textcontainer");
const promptDiv = document.getElementById("ticker");
document.addEventListener("DOMContentLoaded", async function () {
  const otherDiv = document.getElementById("datacontainer");
  const linkDiv1 = document.getElementById("link1");
  const linkDiv3 = document.getElementById("link3");
  const tempChange = document.createElement("span");

  var myRequest = new Request("../climate.txt");
  fetch(myRequest).then(function (response) {
    return response.text().then(function (text) {
      var dataObject = new makeDataObject(text, 1);
      var prevDataObject = new makeDataObject(text, 2);
      var timeDiff = dataObject.time - prevDataObject.time;
      var timeString = makeTimeString(timeDiff);
      var datetime = new unix2time(dataObject.time);
      const change = dataObject.temp - prevDataObject.temp;
      function updateDiv() {
        myDiv.classList.remove("top-left");
        myDiv.classList.add("flex-item");
        if (dataObject.myStatus == "IN") {
          myDiv.innerHTML = "When I arrived at " + datetime.time + ",<br />";
        } else {
          myDiv.innerHTML = "When I left at " + datetime.time + " on " + datetime.date + ",<br />";
        }
        function intermediary() {
          setTimeout(statementDiv, 3333);
          myDiv.innerHTML +=
            "<br />Indoor temperature was " +
            dataObject.temp +
            "\u00B0C <br /> ";
        }
        function statementDiv() {
          // insert if last record is IN or OUT
          myDiv.innerHTML +=
            "<br /> Humidity was " + dataObject.humi + "&percnt; <br />";
          function tickerDiv() {
            // add&remove class to display buttons and ticker
            // ticker currently remains hidden
            //promptDiv.classList.remove("no-dis");
            // promptDiv.classList.add("teleprompt");
            myDiv.innerHTML +=
              "<br /> Luminosity was at " + dataObject.lux + " lux <br />";
            function buttonDiv1() {
              myDiv.innerHTML +=
                "<br /> Barometric Pressure was at " +
                dataObject.pressure +
                " hPa <br />";
              function buttonDiv3() {
                myDiv.innerHTML += "<br />It was ";
                if (Math.sign(change) === 1) {
                  myDiv.innerHTML += change.toPrecision(3) * 1 + "\u00B0C ";
                  myDiv.appendChild(tempChange);
                  tempChange.classList.add("warmer");
                  tempChange.innerHTML = "warmer";
                } else if (Math.sign(change) === -1) {
                  myDiv.innerHTML += change.toPrecision(3) * -1 + "\u00B0C ";
                  myDiv.appendChild(tempChange);
                  tempChange.classList.add("cooler");
                  tempChange.innerHTML = "cooler";
                }
                  if (dataObject.myStatus = "IN") {
                    myDiv.innerHTML +=
                    " than the last recorded temperature, " + timeString + "earlier.<br /> ";
                    } else {
                    myDiv.innerHTML +=
                    " than when I arrived" + timeString + "earlier.<br /> ";
                }
                function lastSentence() {
                  if (dataObject.myStatus == "IN") {
                    myDiv.innerHTML += "<br /> I am <strong>currently</strong> at the studio.";
                  } else {
                    myDiv.innerHTML +=
                      "<br /> I am <strong>not</strong> at the studio at this moment.";
                  }
                  function firstButton() {
                    linkDiv1.classList.remove("no-dis");
                    linkDiv1.classList.add("my-link");
                    function secondButton() {
                      linkDiv3.classList.remove("no-dis");
                      linkDiv3.classList.add("blockchain-link");
                    }
                    setTimeout(secondButton, 2222);
  
                  }
                  setTimeout(firstButton, 2222);

                }
                setTimeout(lastSentence, 3333);
               
              }
              setTimeout(buttonDiv3, 3333);
             
            }
            setTimeout(buttonDiv1, 3333);
           
          }
          setTimeout(tickerDiv, 3333);
         
        }
        setTimeout(intermediary, 3333);
      }
      setTimeout(updateDiv, 3333);
     
    });
  });
});
