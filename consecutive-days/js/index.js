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
  return "rgba(" + [255 - (r), 255 - (g), 255 - (b), a].join(",") + ")"}
  
  document.addEventListener('DOMContentLoaded', main());
  function main(item) {
  const bode = document.getElementById("dcontain");
  const flbx = document.getElementsByClassName("textColor");
  const title = document.getElementById("page-title");
  var timeNow = Math.round(Date.now() / 1000);
  setTimeout(main, 2000);
  // Arrow Function:
  hello = (e) => {
      console.log(e.target.id);
      var newTime = Math.round(Date.now() / 1000);
      console.log(newTime);
      document.getElementById(e.target.id).style.backgroundColor = fgColor(newTime * 20009, 0.5);
  }
  
  
  rgba = toColor(timeNow * 2009);
  hex = fgColor(timeNow * 2009);

  bode.style.backgroundColor = hex;
  title.style.backgroundColor = rgba;
  for(const element of flbx)
{
    
    element.style.backgroundColor = rgba;
    
}

  
  };