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
  const bgdiv1 = document.getElementById("bgwrap1");
  const bgdiv2 = document.getElementById("bgwrap2");


  const flbx = document.getElementsByClassName("textColor");
  const title = document.getElementById("page-title");
  var timeNow = Math.round(Date.now() / 1000);
  setInterval(main, 250);
  
  rgba = toColor(timeNow * 2009);
  hex = fgColor(timeNow * 2009);
  bgdiv1.style.backgroundColor = hex;
  bgdiv2.style.backgroundColor = hex;

  bode.style.backgroundColor = hex;
  title.style.backgroundColor = hex;
  for(const element of flbx)
{
    
    element.style.backgroundColor = hex;
    
}
  
  };