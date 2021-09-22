const dateInput = document.querySelector("#date-input");
const output = document.querySelector("#output");
const showBtn = document.querySelector("show-btn");

function reverseString(str) {
    return str.split("").reverse().join("");
}

function isPalindrome(str) {
    const rev = reverseString(str);
    return str === rev;
}

function dateToString(dates) {
    var dateStr = { day: "", month: "", year: "" };
    if (dates.day < 10) {
        dateStr.day = "0" + dates.day;
    } else {
        dateStr.day = dates.day.toString();
    }
    if (dates.month < 10) {
        dateStr.month = "0" + dates.month;
    } else {
        dateStr.month = dates.month.toString();
    }
    dateStr.year = dates.year.toString();
    return dateStr;
}

function dateAllFormats(date) {
    var dateToMakeFormats = dateToString(date);
    var ddmmyyyy;
    var mmddyyyy;
    var yyyymmdd;
    var ddmmyy;
    var mmddyy;
    var yymmdd;
    ddmmyyyy = dateToMakeFormats.day + dateToMakeFormats.month + dateToMakeFormats.year;
    mmddyyyy = dateToMakeFormats.month + dateToMakeFormats.day + dateToMakeFormats.year;
    yyyymmdd = dateToMakeFormats.year + dateToMakeFormats.month + dateToMakeFormats.day;
    ddmmyy = dateToMakeFormats.day + dateToMakeFormats.month + dateToMakeFormats.year.slice(-2);
    mmddyy = dateToMakeFormats.month + dateToMakeFormats.day + dateToMakeFormats.year.slice(-2);
    yymmdd = dateToMakeFormats.year.slice(-2) + dateToMakeFormats.month + dateToMakeFormats.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeInDateFormats(date) {
    var listOfDateFormats = dateAllFormats(date);
    var flag = false;
    for (var i = 0; i < listOfDateFormats.length; i++) {
        if (isPalindrome(listOfDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

var date = {
    day: 30,
    month: 7,
    year: 2021
}

function isLeapYear(year) {
    if (year % 400 == 0) {
        return true;
    }
    if (year % 4 == 0) {
        return true;
    }
    if (year % 100 == 0) {
        return false;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonths[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);
    while (1) {
        count++;
        var isPalindrome = checkPalindromeInDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate)
    }
    return [count, nextDate];
}

// showBtn.addEventListener("click",function doCheck(){
//     if(isPalindrome(dateInput.value)){
//         console.log("Not palindrome");
//     }else{
//         var result = getNextPalindromeDate(dateInput.value);
//         console.log(result);
//     }
// });