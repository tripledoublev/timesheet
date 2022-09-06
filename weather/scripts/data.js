function makeDataObject(rawData, x) {
    const txt_lines = rawData.split(/\r?\n/);
    const last_line = txt_lines[txt_lines.length - x];
    const all_data = last_line.split(" ");
    const temp = all_data[1];
    const temp_data = temp.split(":");
    const humi = all_data[2];
    const humi_data = humi.split(":");
    const lux = all_data[3]
    const lux_data = lux.split(":");
    const pressure = all_data[4];
    const pressure_data = pressure.split(":");
    const timestmp = all_data[5];
    const time_data = timestmp.split(":");
    const myStatus = all_data[0];
    var obj = {
        myStatus: myStatus,
        temp: temp_data[1],
        humi: humi_data[1],
        lux: lux_data[1],
        pressure: pressure_data[1],
        time: time_data[1]
    };
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
    console.log(date.getMonth());
    var amonth = months[date.getMonth()];
    var aday = date.getDate();
    var ayear = date.getFullYear();
    var formattedDate = amonth + ' ' + aday;
    console.log(formattedDate)
    // Will display time in 10:30:23 format
    var obj = {
        time: formattedTime,
        date: formattedDate
    }
    return obj
}