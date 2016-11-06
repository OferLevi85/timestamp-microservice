    var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
    ];
    
    var url = require('url');
    var express = require('express');
    var app = express();
    
    app.get("*", function(req, res) {
        var parsedURL = url.parse(req.url, true);
        var parameter = decodeURI(parsedURL.pathname.slice(1));
        var unixTime = null;
        var naturalTime = null;
        
        // Checking if date input is in natural language
        var parseDate = ParseStringToDate(parameter);
        
        if (parseDate)
        {
            unixTime = parseDate.getTime() / 1000; // Convert milisec to sec
            naturalTime = GetNaturalTimeString(parseDate);
        }
        var jsonResponse = JSON.stringify({ unix: unixTime, natural: naturalTime });
        res.end(jsonResponse);
    })
    app.listen("8080");
    
    function GetNaturalTimeString(date)
    {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        
        return monthNames[monthIndex] + " " + day + ", " + year;
    }
    
    // Input:   string input from URL
    // Output:  Parse Date if string is natural language date or unix time.
    //          Otherwise return null
    function ParseStringToDate(stringToParse)
    {
        var parseDate = new Date(stringToParse);
        if (isNaN(parseDate.getTime()))
        {
            // date input is not in natural language trying unix time
            parseDate = new Date(stringToParse *1000);
        }
        
        if (!isNaN(parseDate.getTime()))
        {
            return parseDate;
        }
        else
        {
            return null;
        }
    }