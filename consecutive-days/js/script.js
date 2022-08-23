    // takes a number and turns it into a color
    
    function toColor(num) {
      num >>>= 0;
    var b = num & 0xFF,
    g = (num & 0xFF00) >>> 8,
    r = (num & 0xFF0000) >>> 16,
    a = ( ((num & 0xFF000000) >>> 24 ) / 255) + 0.027451;
    return "rgba(" + [r, g, b, a].join(",") + ")"
    }

        // takes a number and turns it into a different color
    function fgColor(num, mult) {
      num >>>= 0;
    var b = num & 0xFF,
    g = (num & 0xFF00) >>> 8,
    r = (num & 0xFF0000) >>> 16,
    a = ( ((num & 0xFF000000) >>> 24 ) / 200) + 0.027451;
    return "rgba(" + [255 - (r * mult), 255 - (g * mult), 255 - (b * mult), 255 - (a * mult)].join(",") + ")"}
    
    // set maximum seconds
    var maxis;  
    // set amount of days
    var dayz;

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  var myRequest = new Request(filename);
    fetch(myRequest).then(function(response) {
    return response.text().then(function(text) {
      // content of daily seconds
      const contents = text;
      // split daily totals
      const arr = contents.split(/\r?\n/);
      // get maximum seconds
      maxis = Math.max(...arr);
      // get number of days
      dayz = arr.length;
      // for each day do main function
      arr.forEach(main);
      return arr; 
      });
    })
  };  
 
    
    // set div count
    let divcount = 0;
    
    
    // main function
    function main(item) {
      // get elements
      const bode = document.getElementById("dcontain");
      const flbx = document.getElementById("fbox");
      // take your time
      var timeNow = Math.round(Date.now() / 1000);
      // keep count
      divcount++;
      // create divs
      var div = document.createElement('div');
      // generate color 
      var color = (item / maxis) * 222 + 28
      // generate border radius
      var borderR = (100 - (item / maxis)) * 100
      // div is assigned id  
      div.id = divcount;
      // with class textColor
      div.className = "textColor";
      // create width and height based on data
      div.style.width = (item / maxis) * (100 / dayz) + '%';
      div.style.height = '20vh';
      // 0-255 to 0-1
      var gsFactor = color / 255;
      // Arrow Function to change color on click:
      hello = (e) => {
        // prevent default to block the parent link element
        // and set new color
        e.preventDefault();
        var newTime = Math.round(Date.now() / 1000);
        console.log('UNIX time: ' + newTime);
        document.getElementById(e.target.id).style.backgroundColor = fgColor(newTime * 20009, 0.5);
        document.getElementById(e.target.id).focus();
      }
      
      
      // A button object calls the function:
      
      div.addEventListener("click", hello, false);
      
      // set border radius
      div.style.borderRadius = borderR + 'px';
      // compute and set colors
      rgba = toColor(timeNow * 20009);
      hex = fgColor(timeNow * 20009, gsFactor);
      bode.style.backgroundColor = rgba;
      bode.style.color = hex;
      div.style.backgroundColor = hex;
      div.style.color = hex;
      
      // append this div to the flex box
      flbx.appendChild(div);
      
      };
    