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
      console.log(dataObject);
      var datetime = new unix2time(dataObject.time);
      const change = dataObject.temp - prevDataObject.temp;
      function updateDiv() {
        function statementDiv() {
          // insert if last record is IN or OUT
          myDiv.innerHTML += "Humidity was " + dataObject.humi + "&percnt;";
          function tickerDiv() {
            // add&remove class to display buttons and ticker
            promptDiv.classList.remove("no-dis");
            promptDiv.classList.add("teleprompt");
            myDiv.innerHTML +=
              "<br /> Luminosity was at " + dataObject.lux + " lux";
            function buttonDiv1() {
              linkDiv1.classList.remove("no-dis");
              linkDiv1.classList.add("my-link");
              myDiv.innerHTML +=
                "<br /> Barometric Pressure was at " +
                dataObject.pressure +
                " hPa";
              function buttonDiv3() {
                linkDiv3.classList.remove("no-dis");
                linkDiv3.classList.add("blockchain-link");
                if (dataObject.myStatus == "IN") {
                  myDiv.innerHTML += "<br /> I am currently at the studio";
                } else {
                  myDiv.innerHTML +=
                    "<br /> I am not at the studio at this moment";
                }
              }
              setTimeout(buttonDiv3, 2222);
            }
            setTimeout(buttonDiv1, 2222);
          }
          setTimeout(tickerDiv, 2222);
        }
        
        myDiv.classList.remove("bottom-left");
        myDiv.classList.add("flex-item");
        if (dataObject.myStatus == "IN") {
          myDiv.classList.add("present");
          myDiv.innerHTML =
            "Indoor temperature was " +
            dataObject.temp +
            "\u00B0C at " +
            datetime.time +
            "<br /> ";
        } else {
          myDiv.classList.add("absent");
          myDiv.innerHTML =
            "Indoor temperature was " +
            dataObject.temp +
            "\u00B0C when I left at " +
            datetime.time +
            " on " +
            datetime.date +
            "<br />";
        }
        function intermediary() {
          setTimeout(statementDiv, 2222);
          if (dataObject.myStatus == "IN") {
            if (Math.sign(change) === -1) {
              myDiv.innerHTML += change.toPrecision(3) * 1 + "\u00B0C ";
              myDiv.appendChild(tempChange);
              tempChange.classList.add("warmer");
              tempChange.innerHTML = "warmer";
              myDiv.innerHTML += " than last recorded temperature <br />";
            } else if (Math.sign(change) === 1) {
              myDiv.innerHTML =
                "Indoor temperature was " +
                dataObject.temp +
                "\u00B0C at " +
                datetime.time +
                "<br />";
              myDiv.innerHTML += change.toPrecision(3) * 1 + " \u00B0C ";
              myDiv.appendChild(tempChange);
              tempChange.classList.add("cooler");
              tempChange.innerHTML = "cooler" + lux;
              myDiv.innerHTML += " than last recorded temperature <br /> ";
            }
          } else {
            if (Math.sign(change) === -1) {
              myDiv.innerHTML +=
                " \u2014 " + change.toPrecision(3) * -1 + "\u00B0C ";
              myDiv.appendChild(tempChange);
              tempChange.classList.add("warmer");
              tempChange.innerHTML = "warmer";
              myDiv.innerHTML += " than when I arrived <br /> ";
            } else if (Math.sign(change) === 1) {
              myDiv.innerHTML =
                "Indoor temperature was " +
                dataObject.temp +
                "\u00B0C when I left at " +
                datetime.time +
                " on " +
                datetime.date +
                "<br /> ";
              myDiv.innerHTML +=
                " \u2014 " + change.toPrecision(3) * 1 + "\u00B0C ";
              myDiv.appendChild(tempChange);
              tempChange.classList.add("cooler");
              tempChange.innerHTML = "cooler";
              myDiv.innerHTML += " than when I arrived <br /> ";
            }
          };
        };
        setTimeout(intermediary, 2222);
      }

      setTimeout(updateDiv, 3333);
    });
  });
});
