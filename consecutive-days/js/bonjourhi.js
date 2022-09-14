// Function to change color on click:
hello = (e) => {
    if (e.target.id == "fbox" || e.target.id == "dcontain") {
      // prevent default to block the parent link element
      // and set new color
      e.preventDefault();
      var newTime = Math.round(Date.now() / 1000);
      bode.style.backgroundColor = fgColor(newTime * 20009, 0.5);
      bode.focus();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.75 * maxVol;
      var thisFrequency = (444 - (newTime % 444)) + 100;

      if (thisFrequency <= 150 == true) {
        thisFrequency += 200 * multi;
      } else if (thisFrequency >= 550) {
        thisFrequency -= 200 * multi;
      }
      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(thisFrequency, audioCtx.currentTime); // value in hertz
  
      clickDetune += 0.5;
      oscillator.detune.value = clickDetune;
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
  

    } 
  };
  
bonjour = (e) => {
    // prevent default to block the parent link element
    // and set new color
    e.preventDefault();
    var item = e.target.dataset.item;
    var maxiS = flbx.dataset.maxi;
    var mult = item / maxiS;
    var newTime = Math.round(Date.now() / 1000);
    document.getElementById(e.target.id).style.backgroundColor = fgColor(
      newTime * 20009,
      mult
    );
    document.getElementById(e.target.id).focus();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    var preGainValue = (item / maxiS) * (maxVol + 1);
    gainNode.gain.value = preGainValue.toPrecision(4) * maxVol;
    var multi = e.target.id * 10;
    var thisFrequency = (500 - (newTime % 500)) + multi;

  if (thisFrequency <= 150 == true) {
    thisFrequency += 200 * multi;
  } else if (thisFrequency >= 550) {
    thisFrequency -= 200 * multi;
  }
    clickDetune += 0.5;
    oscillator.detune.value = clickDetune;
    oscillator.frequency.setValueAtTime(thisFrequency, audioCtx.currentTime); // value in hertz
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
  

  };
  