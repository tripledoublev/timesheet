// takes raw.txt data + x for a specific line (starting at the end:: lines' lenght - x)
function makeDataObject(rawData, x) {
    const txt_lines = rawData.split(/\r?\n/);
    const select_line = txt_lines[txt_lines.length - x];
    const all_data = select_line.split(" ");
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
          }
    };
    
    return obj;
}

function unix2time(unixtime) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date(unixtime * 1000);
    // Hours part from the timestamp
    var hours = date.getHours().toString().padStart(2, '0');
    // Minutes part from the timestamp
    var minutes = date.getMinutes().toString().padStart(2, '0');
    // Seconds part from the timestamp
    var seconds = date.getSeconds().toString().padStart(2, '0');
    // format string for time
    var formattedTime = hours + ':' + minutes + ':' + seconds;
    // now with the date
    var amonth = months[date.getMonth()];
    var aday = date.getDate();
    // year isnt used at the moment
    var ayear = date.getFullYear();
    var formattedDate = amonth + ' ' + aday;
    var obj = {
        time: formattedTime,
        date: formattedDate
    }
    return obj
}

function sIfPlural(num, string) {
    if (num == 1) {
        return string;
    } else if (num > 1) {
        plural = string.concat('s');
        return plural
    }
}

function makeTimeString(seconds) {
    var numHours = seconds / 3600;
    var minutesRemaining = seconds % 60;
    var timeString = Math.floor(numHours);
    if (timeString == 0) {
        var totalMinutes = seconds / 60;
        var secondsRemaining =  ((totalMinutes.toFixed(2) - totalMinutes.toFixed(0)) * 60) / 100;
        timeString = totalMinutes.toFixed(0) + sIfPlural(totalMinutes, " minute");
        if (secondsRemaining > 0) {
            timeString += "and " + secondsRemaining + sIfPlural(secondsRemaining, " second");
        }
    } else if (timeString >= 1) {
        timeString += " " + sIfPlural(timeString, "hour");
        if (minutesRemaining > 0) {
            timeString += " and " + minutesRemaining + sIfPlural(minutesRemaining, " minute");
        }
    };
    return timeString
}