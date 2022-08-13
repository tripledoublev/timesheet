let myDiv = document.getElementById('textcontainer');
        let otherDiv = document.getElementById('datacontainer');
        function CheckIf() {
            var myRequest = new Request('present.txt');
            fetch(myRequest).then(function(response) {
            return response.text().then(function(text) {
            myDiv.innerHTML = text;
            var presence = text;
            if (presence === "I am not at the studio.") {
                var otherRequest = new Request('counting.txt');
                fetch(otherRequest).then(function(response) {
                return response.text().then(function(text) {
                otherDiv.innerHTML = text;
        });
            });
            
            
            var tempRequest = new Request('HOT.txt');
                
            fetch(tempRequest).then(function(response) {
                return response.text().then(function(text) {
                const temperature = text.split(" ");
                let past = temperature[0];
                let change = temperature[1];
                if (Math.sign(change) === -1) {
                    otherDiv.innerHTML += ' \u2014 Indoor temperature was ' + past + '\u00B0C when I left';
                    otherDiv.innerHTML += ' \u2014 ' + (change * -1) + '\u00B0C warmer than when I arrived';
                    otherDiv.innerHTML += ' \u2014 The studio is only one of many places where art gets made';                    
                    otherDiv.innerHTML += '                                                       ';
                }
                else if (Math.sign(change) === 1) {
                    otherDiv.innerHTML += ' \u2014 Indoor temperature was ' + past + '\u00B0C when I left';
                    otherDiv.innerHTML += ' \u2014 ' + (change * 1) + '\u00B0C cooler than when I arrived'
                    otherDiv.innerHTML += ' \u2014 The studio is only one of many places where art gets made';                    
                    otherDiv.innerHTML += '                                                       ';
                }
        });
            });
        }
        else if (presence === "I went swimming.") {
                var otherRequest = new Request('counting.txt');
                fetch(otherRequest).then(function(response) {
                return response.text().then(function(text) {
                otherDiv.innerHTML = text;
        });
            });
            
            
            var tempRequest = new Request('HOT.txt');
                
            fetch(tempRequest).then(function(response) {
                return response.text().then(function(text) {
                const temperature = text.split(" ");
                let past = temperature[0];
                let change = temperature[1];
                if (Math.sign(change) === -1) {
                    otherDiv.innerHTML += ' \u2014 Indoor temperature was ' + past + '\u00B0C when I left';
                    otherDiv.innerHTML += ' \u2014 ' + (change * -1) + '\u00B0C warmer than when I arrived';
                    otherDiv.innerHTML += ' \u2014 The studio is only one of many places where art gets made.';                    
                    otherDiv.innerHTML += '                                                       ';
                }
                else if (Math.sign(change) === 1) {
                    otherDiv.innerHTML += ' \u2014 Indoor temperature was ' + past + '\u00B0C when I left';
                    otherDiv.innerHTML += ' \u2014 ' + (change * 1) + '\u00B0C cooler than when I arrived'
                    otherDiv.innerHTML += ' \u2014 The studio is only one of many places where art gets made.';                    
                    otherDiv.innerHTML += '                                                       ';
                }
        });
            });
        }
            else {

                
                var otherRequest = new Request('counting.txt');
                fetch(otherRequest).then(function(response) {
                return response.text().then(function(text) {
                const date_time = text.split(" ");
                let timeIn = date_time.slice(-1);
                
        
            
                var tempRequest = new Request('HOT.txt');
                
                fetch(tempRequest).then(function(response) {
                    return response.text().then(function(text) {
                    const temperature = text.split(" ");
                    let past = temperature[0];
                    let change = temperature[1];
                    if (Math.sign(change) === -1) {
                        otherDiv.innerHTML = 'Indoor temperature was ' + past + '\u00B0C at ' + timeIn + ' when I arrived';
                        otherDiv.innerHTML += ' \u2014 ' + (change * -1) + '\u00B0C warmer than last recorded temperature';
                        otherDiv.innerHTML += ' \u2014 Text +1(514)231-1278 for a live weather update.';                    
                        otherDiv.innerHTML += '                                                       ';
                        }
                    else if (Math.sign(change) === 1) {
                        otherDiv.innerHTML = ' Indoor temperature was ' + past + '\u00B0C at ' + timeIn + ' when I arrived';
                        otherDiv.innerHTML += ' \u2014 ' + (change * 1) + '\u00B0C cooler than last recorded temperature'
                        otherDiv.innerHTML += ' \u2014 Text +1(514)231-1278 for a live weather update.';                    
                        otherDiv.innerHTML += '                                                       ';
                        }
                    });
                });
            });
        });
            
    }
            });
        });
    };
            
        
            
        window.onload = CheckIf;