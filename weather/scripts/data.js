function makeDataObject(rawData, x) {
    const txt_lines = rawData.split(/\r?\n/);
    const last_line = txt_lines[txt_lines.length - x];
    const all_data = last_line.split(" ");
    const tempData = all_data[1].split(":");
    const humiData = all_data[2].split(":");
    const luxData = all_data[3].split(":");
    const pressureData = all_data[4].split(":");
    const timeData = all_data[5].split(":");

    const myStatus = all_data[0];
    console.log(myStatus)
    var obj = {
        myStatus: myStatus,
        temp: tempData[1],
        humi: humiData[1],
        lux: luxData[1],
        pressure: pressureData[1],
        time: timeData[1]
    };
    console.log(obj)
    return obj;
}

function unix2time(unixtime) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date(unixtime * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = date.getMinutes();
    // Seconds part from the timestamp
    var seconds = date.getSeconds();
    var formattedTime = hours + ':' + minutes + ':' + seconds;
    var amonth = months[date.getMonth()];
    var aday = date.getDate();
    var ayear = date.getFullYear();
    var formattedDate = amonth + ' ' + aday;
    // Will display time in 10:30:23 format
    var obj = {
        time: formattedTime,
        date: formattedDate
    }
    return obj
}