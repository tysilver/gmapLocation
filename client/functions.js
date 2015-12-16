function setDate(date){
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var minutesStr = "" + minutes

    if (minutes < 10) {
      minutesStr = "0" + minutesStr
    }

    console.log(day, monthNames[monthIndex], year);
    return (monthNames[monthIndex] + ' ' + day + ', ' + year + ' at ' + hours + ':' + minutesStr + ':' + seconds);
};