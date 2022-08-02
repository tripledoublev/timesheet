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
    
    
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  var myRequest = new Request(filename);
    fetch(myRequest).then(function(response) {
    return response.text().then(function(text) {
      const contents = text;
      console.log(text);
      const arr = contents.split(/\r?\n/);
      console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
      arr.forEach(main);
      const maxis = arr.Math.max();
      return arr; 
      return maxis;
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
    var color = (item / maxis) * 255
    // 
    var borderR = (item / maxis) * 100
    
    div.id = divcount;
    div.className = "textColor";
    div.style.width = (item / maxis) * 30 + 100 + 'px';
    div.style.height = (item / maxis) * 20 + 100 +'px';
    var gsFactor = color / 255;
    // Arrow Function:
    hello = (e) => {
      e.preventDefault();
      var newTime = Math.round(Date.now() / 1000);
      console.log(newTime);
      document.getElementById(e.target.id).style.backgroundColor = fgColor(newTime * 20009, 0.5);
    }
    
    
    // A button object calls the function:
    
    div.addEventListener("click", hello, false);
    console.log(gsFactor);
    div.style.borderRadius = borderR + 'px';
     
    rgba = toColor(timeNow * 20009);
    hex = fgColor(timeNow * 20009, gsFactor);
    bode.style.backgroundColor = rgba;
    bode.style.color = hex;
    div.style.backgroundColor = hex;
    div.style.color = hex;
    flbx.appendChild(div);
    
    };
    