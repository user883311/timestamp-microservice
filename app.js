const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var result = new Object();
    if (/^\/.+$/.test(req.url)) {
        console.log("There is a parameter in this request.");
        res.write(returnTimeStampJSON(req.url));
        res.json()
        res.end();
    }
    else {
        result.unix = null;
        result.natural = null;
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function returnTimeStampJSON(param) {
    let result = new Object();
    param = param.slice(1);

    // unix date parameter
    let unixRegex = new RegExp();
    unixRegex = /^\d+$/;
    // natural format date parameter
    let natRegex = new RegExp();
    natRegex = /(January|February|March|April|May|June|July|August|September|October|November|December)( |\%20)?\d{1,2},?( |%20) ?\d{2,4}/;

    if (unixRegex.test(param)) {
        result.unix = param;
        result.natural = unixToNatural(param);
    }
    else if (natRegex.test(param)) {
        param = param.replace(/\%20/g, " ");
        result.unix = naturalToUnix(param);
        result.natural = param;
    }
    else {
        result.unix = null;
        result.natural = null;
    }
    return JSON.stringify(result);
}

function unixToNatural(unixTimeStamp) {
    /* This function takes in a number (unix timestamp)
    and returns a natural date in the following format: 
    "December 15, 2015". */
    const mmmmMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let nat = new Date(unixTimeStamp * 1000); // for milliseconds
    console.log(nat);
    let result = mmmmMonths[nat.getMonth()];
    result += " ";
    result += nat.getDate();
    result += ", ";
    result += nat.getFullYear();
    return result;
}

function naturalToUnix(naturalDateString) {
    /* This function takes in a natural date in the 
    following format: "December 15, 2015" and returns 
    a number (unix timestamp) : 1450137600. */
    let dateObj = new Date(naturalDateString);
    let offset = dateObj.getTimezoneOffset();
    offset *= 60; // for seconds
    let unix = dateObj.getTime() / 1000; // for seconds
    unix -= offset;
    return unix;
}
