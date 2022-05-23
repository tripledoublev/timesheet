
    function toColor(num) {
        num >>>= 0;
      var b = num & 0xFF,
      g = (num & 0xFF00) >>> 8,
      r = (num & 0xFF0000) >>> 16,
      a = ( ((num & 0xFF000000) >>> 24 ) / 255);
      return "rgb(" + [r, g, b, a].join(",") + ")"
      }
      function fgColor(num) {
        num >>>= 0;
      var b = num & 0xFF,
      g = (num & 0xFF00) >>> 8,
      r = (num & 0xFF0000) >>> 16,
      a = ( ((num & 0xFF000000) >>> 24 ) / 255);
      return "rgba(" + [255 - (r), 255 - (g), 255 - (b), 255].join(",") + ")"}
      
      document.addEventListener('DOMContentLoaded', main());
      function main(item) {
      const bode = document.getElementById("dcontain");
      const flbx = document.getElementsByClassName("textColor");
      const title = document.getElementById("page-title");
      var timeNow = Math.round(Date.now() / 1000);
      
      // Arrow Function:
      hello = (e) => {
          console.log(e.target.id);
          var newTime = Math.round(Date.now() / 1000);
          console.log(newTime);
          document.getElementById(e.target.id).style.backgroundColor = fgColor(newTime * 20009, 0.5);
      }
      
      
      // A button object calls the function:
      
      rgba = toColor(timeNow * 2009);
      hex = fgColor(timeNow * 2009);
      bode.style.backgroundColor = rgba;
      title.style.color = 'white';
      title.style.backgroundColor = hex;
      for(var i=0, len=flbx.length; i<len; i++)
    {
        flbx[i].firstChild.style["color"] = 'white';
        flbx[i].firstChild.style["background-color"] = hex;
    }

      
      };
      