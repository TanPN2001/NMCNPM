export function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = ((date < 10)?'0'+date : date) + ' '
                + ((month < 10)?'0'+ month : month) + ' '
                + year + ' '
                + ((hour < 10)?'0'+ hour : hour) + ':'
                + ((min < 10)?'0'+ min : min)  + ':'
                + ((sec < 10)?'0'+ sec : sec) ;
    return time;
}