"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
    return typeof a
} : function (a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
//! annyang
//! version : 2.6.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
!function (a, b) {
    "function" == typeof define && define.amd ? define([], function () {
        return a.annyang = b(a)
    }) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = b(a) : a.annyang = b(a)
}("undefined" != typeof window ? window : void 0, function (a, b) {
    var c, d = a.SpeechRecognition || a.webkitSpeechRecognition || a.mozSpeechRecognition || a.msSpeechRecognition || a.oSpeechRecognition;
    if (!d)return null;
    var e, f, g = [], h = {
        start: [],
        error: [],
        end: [],
        soundstart: [],
        result: [],
        resultMatch: [],
        resultNoMatch: [],
        errorNetwork: [],
        errorPermissionBlocked: [],
        errorPermissionDenied: []
    }, i = 0, j = 0, k = !1, l = "font-weight: bold; color: #00f;", m = !1, n = !1, o = /\s*\((.*?)\)\s*/g, p = /(\(\?:[^)]+\))\?/g, q = /(\(\?)?:\w+/g, r = /\*\w+/g, s = /[\-{}\[\]+?.,\\\^$|#]/g, t = function (a) {
        return a = a.replace(s, "\\$&").replace(o, "(?:$1)?").replace(q, function (a, b) {
            return b ? a : "([^\\s]+)"
        }).replace(r, "(.*?)").replace(p, "\\s*$1?\\s*"), new RegExp("^" + a + "$", "i")
    }, u = function (a) {
        for (var b = arguments.length, c = Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++)c[d - 1] = arguments[d];
        a.forEach(function (a) {
            a.callback.apply(a.context, c)
        })
    }, v = function () {
        return e !== b
    }, w = function (a, b) {
        a.indexOf("%c") !== -1 || b ? console.log(a, b || l) : console.log(a)
    }, x = function () {
        v() || c.init({}, !1)
    }, y = function (a, b, c) {
        g.push({command: a, callback: b, originalPhrase: c}), k && w("Command successfully loaded: %c" + c, l)
    }, z = function (a) {
        u(h.result, a);
        for (var b, c = 0; c < a.length; c++) {
            b = a[c].trim(), k && w("Speech recognized: %c" + b, l);
            for (var d = 0, e = g.length; d < e; d++) {
                var f = g[d], i = f.command.exec(b);
                if (i) {
                    var j = i.slice(1);
                    return k && (w("command matched: %c" + f.originalPhrase, l), j.length && w("with parameters", j)), f.callback.apply(this, j), void u(h.resultMatch, b, f.originalPhrase, a)
                }
            }
        }
        u(h.resultNoMatch, a)
    };
    return c = {
        init: function (l) {
            var o = !(arguments.length > 1 && arguments[1] !== b) || arguments[1];
            e && e.abort && e.abort(), e = new d, e.maxAlternatives = 5, e.continuous = "http:" === a.location.protocol, e.lang = "en-US", e.onstart = function () {
                n = !0, u(h.start)
            }, e.onsoundstart = function () {
                u(h.soundstart)
            }, e.onerror = function (a) {
                switch (u(h.error, a), a.error) {
                    case"network":
                        u(h.errorNetwork, a);
                        break;
                    case"not-allowed":
                    case"service-not-allowed":
                        f = !1, (new Date).getTime() - i < 200 ? u(h.errorPermissionBlocked, a) : u(h.errorPermissionDenied, a)
                }
            }, e.onend = function () {
                if (n = !1, u(h.end), f) {
                    var a = (new Date).getTime() - i;
                    j += 1, j % 10 === 0 && k && w("Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips."), a < 1e3 ? setTimeout(function () {
                        c.start({paused: m})
                    }, 1e3 - a) : c.start({paused: m})
                }
            }, e.onresult = function (a) {
                if (m)return k && w("Speech heard, but annyang is paused"), !1;
                for (var b = a.results[a.resultIndex], c = [], d = 0; d < b.length; d++)c[d] = b[d].transcript;
                z(c)
            }, o && (g = []), l.length && this.addCommands(l)
        }, start: function (a) {
            x(), a = a || {}, m = a.paused !== b && !!a.paused, f = a.autoRestart === b || !!a.autoRestart, a.continuous !== b && (e.continuous = !!a.continuous), i = (new Date).getTime();
            try {
                e.start()
            } catch (a) {
                k && w(a.message)
            }
        }, abort: function () {
            f = !1, j = 0, v() && e.abort()
        }, pause: function () {
            m = !0
        }, resume: function () {
            c.start()
        }, debug: function () {
            var a = !(arguments.length > 0 && arguments[0] !== b) || arguments[0];
            k = !!a
        }, setLanguage: function (a) {
            x(), e.lang = a
        }, addCommands: function (b) {
            var c;
            x();
            for (var d in b)if (b.hasOwnProperty(d))if (c = a[b[d]] || b[d], "function" == typeof c)y(t(d), c, d); else {
                if (!("object" === ("undefined" == typeof c ? "undefined" : _typeof(c)) && c.regexp instanceof RegExp)) {
                    k && w("Can not register command: %c" + d, l);
                    continue
                }
                y(new RegExp(c.regexp.source, "i"), c.callback, d)
            }
        }, removeCommands: function (a) {
            a === b ? g = [] : (a = Array.isArray(a) ? a : [a], g = g.filter(function (b) {
                for (var c = 0; c < a.length; c++)if (a[c] === b.originalPhrase)return !1;
                return !0
            }))
        }, addCallback: function (c, d, e) {
            var f = a[d] || d;
            "function" == typeof f && h[c] !== b && h[c].push({callback: f, context: e || this})
        }, removeCallback: function (a, c) {
            var d = function (a) {
                return a.callback !== c
            };
            for (var e in h)h.hasOwnProperty(e) && (a !== b && a !== e || (c === b ? h[e] = [] : h[e] = h[e].filter(d)))
        }, isListening: function () {
            return n && !m
        }, getSpeechRecognizer: function () {
            return e
        }, trigger: function (a) {
            return c.isListening() ? (Array.isArray(a) || (a = [a]), void z(a)) : void(k && w(n ? "Speech heard, but annyang is paused" : "Cannot trigger while annyang is aborted"))
        }
    }
});

var resultClass = ".results-top h1";
var contactOneID = "#dot-1";
var contactTwoID = "#dot-2";
var contactThreeID = "#dot-3";
var terminalID = "#terminal";
var userSaidGlobal = "none";
var terminalOn = function () {
    $(terminalID).removeClass('terminal-off');
    $(terminalID).addClass('terminal-on');
};
var terminalOff = function () {
    $(terminalID).removeClass('terminal-on');
    $(terminalID).addClass('terminal-off');
};
$('.contacts').keypress(function (e) {
    if (e.which == 13) {

        if ($(this).hasClass('contacts-1')) {
            addDynamicCommand($(this).val(), 1);
        } else if ($(this).hasClass('contacts-2')) {
            addDynamicCommand($(this).val(), 2);
        } else if ($(this).hasClass('contacts-3')) {
            addDynamicCommand($(this).val(), 3);
        }
        addDynamicCommand($(this).val());
    }
});
function addDynamicCommand(value, pin) {
    var pinNumber = pin;
    var object = {};
    var firstPart = "(zet) (set) (do) (doe) ";
    var nameOfContact = value;
    var lastPartOn = " aan";
    var lastPartOff = " uit";
    var timerPart1 = " (om) (vanaf) :hour uur (en) :minutes (minuten) (*trash)";
    var timerPart2 = " om :time (*trash)";
    var timerPart3 = " vanaf :time (*trash)";
    /*    var contactsOneOn = "contactsOneOn";
     var contactsTwoOn = "contactsTwoOn";
     var contactsThreeOn = "contactsThreeOn";
     var contactsOneOff = "contactsOneOff";
     var contactsTwoOff = "contactsTwoOff";
     var contactsThreeOff = "contactsThreeOff";
     var timerOnHMOne = "timerOnHMOne";
     var timerOnHMTwo = "timerOnHMTwo";
     var timerOnHMThree = "timerOffHMThree";
     var timerOffHMOne = "timerOffHMTwo";
     var timerOffHMTwo = "timerOffHMOne";
     var timerOffHMThree = "timerOffHMThree";
     var timerOnFullTimeOne = "timerOnFullTimeOne";
     var timerOnFullTimeTwo = "timerOnFullTimeTwo";
     var timerOnFullTimeThree = "timerOnFullTimeThree";
     var timerOffFullTimeOne = "timerOffFullTimeOne";
     var timerOffFullTimeTwo = "timerOffFullTimeTwo";
     var timerOffFullTimeThree = "timerOffFullTimeThree";*/

    /*   if (pinNumber == 1) {*/
    object[firstPart + nameOfContact + lastPartOn] = function () {
        toggleContact(pinNumber, 'on');
    };
    object[firstPart + nameOfContact + lastPartOff] = function () {
        toggleContact(pinNumber, 'off');
    };
    object[firstPart + nameOfContact + lastPartOn + timerPart1] = function (hours, minutes) {
        timerHourMinutes(nameOfContact, hours, minutes, 'on', pinNumber);
    };
    object[firstPart + nameOfContact + lastPartOff + timerPart1] = function (hours, minutes) {
        timerHourMinutes(nameOfContact, hours, minutes, 'off', pinNumber);
    };
    object[firstPart + nameOfContact + lastPartOn + timerPart2] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'on', pinNumber);
    };
    object[firstPart + nameOfContact + lastPartOff + timerPart2] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'off', pinNumber);
    };
    object[firstPart + nameOfContact + lastPartOn + timerPart3] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'on', pinNumber);
    };
    object[firstPart + nameOfContact + lastPartOff + timerPart3] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'off', pinNumber);
    };
    annyang.addCommands(object);
    /*    } else if (pinNumber == 2) {
     object[firstPart + variable + lastPartOn] = contactsTwoOn;
     object[firstPart + variable + lastPartOff] = contactsTwoOff;
     object[firstPart + variable + lastPartOn + timerPart1] = timerOnHMTwo;
     object[firstPart + variable + lastPartOff + timerPart1] = timerOffHMTwo;
     object[firstPart + variable + lastPartOn + timerPart2] = timerOnFullTimeTwo;
     object[firstPart + variable + lastPartOff + timerPart2] = timerOffFullTimeTwo;
     object[firstPart + variable + lastPartOn + timerPart3] = timerOnFullTimeTwo;
     object[firstPart + variable + lastPartOff + timerPart3] = timerOffFullTimeTwo;
     annyang.addCommands(object);
     } else if (pinNumber == 3) {
     object[firstPart + variable + lastPartOn] = contactsThreeOn;
     object[firstPart + variable + lastPartOff] = contactsThreeOff;
     object[firstPart + variable + lastPartOn + timerPart1] = timerOnHMThree;
     object[firstPart + variable + lastPartOff + timerPart1] = timerOffHMThree;
     object[firstPart + variable + lastPartOn + timerPart2] = timerOnFullTimeThree;
     object[firstPart + variable + lastPartOff + timerPart2] = timerOffFullTimeThree;
     object[firstPart + variable + lastPartOn + timerPart3] = timerOnFullTimeThree;
     object[firstPart + variable + lastPartOff + timerPart3] = timerOffFullTimeThree;
     annyang.addCommands(object);
     }*/

}
function pushCommand(pin, state) {
    $.ajax({
        url: "pushCommand",
        type: "post",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            pin: pin,
            state: state
        },
        success: function (response) {
            // you will get response from your php page (what you echo or print)

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }


    });
}
function allDotsOff() {
    $(contactOneID).removeClass('green');
    $(contactOneID).addClass('red');
    $(contactTwoID).removeClass('green');
    $(contactTwoID).addClass('red');
    $(contactThreeID).removeClass('green');
    $(contactThreeID).addClass('red');
}
function allDotsOn() {
    $(contactOneID).removeClass('red');
    $(contactOneID).addClass('green');
    $(contactTwoID).removeClass('red');
    $(contactTwoID).addClass('green');
    $(contactThreeID).removeClass('red');
    $(contactThreeID).addClass('green');
}
var showSomething = function () {
    $('h1').html('hier jonge nu kende wat zien');
};
function contactState(contact, state) {
    switch (contact) {
        case '1':
        case 'een':
        case 'één':
        case 'aan':
        function one() {
            console.log('een is called' + light + state);
            pushCommand(0, state);
        }

            one();
            break;
        case '2':
        case 'twee':
        function two() {
            console.log('twee is called' + light + state);
            pushCommand(1, state);
        }

            two();
            break;
        case '3':
        case 'drie':
        function three() {
            console.log('drie is called' + light + state);

            pushCommand(2, state);
        }

            three();
            break;

    }
}
var turnLightOn = function (contact) {
    contactState(contact, 'on');
};
var turnLightOff = function (contact) {
    contactState(contact, 'off');
};

var turnAllOff = function () {
    pushCommand(-1, 'all_off');
    allDotsOff();

};

var contactsOneOn = function () {
    contactState(1, 'on');
};
var contactsTwoOn = function () {
    contactState(2, 'on');
};
var contactsThreeOn = function () {
    contactState(2, 'on');
};

var contactsOneOff = function () {
    contactState(1, 'off');
};
var contactsThreeOff = function () {
    contactState(3, 'off');
};
var contactsTwoOff = function () {
    contactState(2, 'off');
};

var turnAllOn = function () {
    pushCommand(-1, 'all_on');
    allDotsOn()
};
var onStart = function () {
    console.log('now active');
};

/*var timerOnHMOne = function (hour, minutes) {
 console.log(hour + " " + minutes);
 console.log('timerHM on function executed');
 };
 var timerOnHMTwo = function (hour, minutes) {
 console.log(hour + " " + minutes);
 console.log('timerHM on function executed');
 };
 var timerOnHMThree = function (hour, minutes) {
 console.log(hour + " " + minutes);
 console.log('timerHM on function executed');
 };

 var timerOffHMOne = function (hour, minutes) {
 console.log(hour + " " + minutes);
 console.log('timerHM on function executed');
 };
 var timerOffHMTwo = function (hour, minutes) {
 console.log(hour + " " + minutes);
 console.log('timerHM on function executed');
 };
 var timerOffHMThree = function (hour, minutes) {
 console.log(hour + " " + minutes);
 console.log('timerHM on function executed');
 };

 var timerOnFullTimeOne = function (time, trash) {
 if (time.indexOf(':') > -1) {
 alert("valid time");
 } else {
 console.log('timeformat not valid')
 }
 console.log(time);
 console.log('timerFullTime on function executed');
 };
 var timerOnFullTimeTwo = function (time, trash) {
 if (time.indexOf(':') > -1) {
 alert("valid time");
 } else {
 console.log('timeformat not valid')
 }
 console.log(time);
 console.log('timerFullTime on function executed');
 };
 var timerOnFullTimeThree = function (time, trash) {
 if (time.indexOf(':') > -1) {
 alert("valid time");
 } else {
 console.log('timeformat not valid')
 }
 console.log(time);
 console.log('timerFullTime on function executed');
 };

 var timerOffFullTimeOne = function (time, trash) {
 if (time.indexOf(':') > -1) {
 alert("valid time");
 } else {
 console.log('timeformat not valid')
 }
 console.log(time);
 console.log('timerFullTime on function executed');
 };
 var timerOffFullTimeTwo = function (time, trash) {
 if (time.indexOf(':') > -1) {
 alert("valid time");
 } else {
 console.log('timeformat not valid')
 }
 console.log(time);
 console.log('timerFullTime on function executed');
 };
 var timerOffFullTimeThree = function (time, trash) {
 if (time.indexOf(':') > -1) {
 alert("valid time");
 } else {
 console.log('timeformat not valid')
 }
 console.log(time);
 console.log('timerFullTime on function executed');
 };*/

function toggleContact(pin, onOrOff) {
    contactState(pin, onOrOff);
}
function timerHourMinutes(name, hour, minutes, onOrOff, pin) {
    var validTimeFormat = validTimeGenerator(hour, minutes, null);
    setTimerCountdown(null,validTimeFormat);
    console.log(name + hour + minutes + onOrOff, pin);

};
function timerFullTime(name, time, onOrOff, pin) {
    var validTimeFormat = validTimeGenerator(null, null, time);

    setTimerCountdown(null,validTimeFormat);

    console.log(name + time + onOrOff, pin);
};
var test = function (test) {
    console.log("test" + test);
};
function validTimeGenerator(hour, minutes, time) {
    var currHours = "";
    var currMinutes = "";
    var newTime = "";

    if (!isNaN(hour) && !isNaN(minutes) && hour != null && minutes != null) {
        currHours = hour;
        currMinutes = minutes;
    } else if (time != null) {
        if (!isNaN(time)) {
            currHours = time;
            currMinutes = "00";
        } else {
            var hMFormat = time.split(":");
            currHours = hMFormat[0];
            currMinutes = hMFormat[1];
        }

    }

    if (!isNaN(currHours) && !isNaN(currMinutes)) {
        console.log("legit time format");

        newTime = createTimeFormat(currHours) + ":" + createTimeFormat(currMinutes);
        return newTime;
    } else {
        return null;
    }

    function createTimeFormat(number) {
        if (number < 10 && number >= 0 && number != "00") {
            return "0" + number;
        } else {
            return number;
        }
    }

}
function appendTimer(name, time, onOrOff) {

    var appendClass = '.tasks';
    var appendHtml = "<div id='"+name+"' class='col-md-12 task'>" +
        " <div class='col-md-8'> <h2>" + name + ":" + onOrOff + "</h2> </div> " +
        "<div class='col-md-4'> <h2>" + time + "</h2> </div> " +
        "</div>";

    $(appendClass).append(appendHtml);

}

function setTimerCountdown(name, time) {
    var timerTime = time;
    var intervalTime = 1000;
    var now = new Date();
    var nowValidFormat = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});

    var interval = setInterval(function () {
        now = new Date();
        nowValidFormat = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});
    /*    console.log("timer is working");
        console.log(nowValidFormat + "ennn" + timerTime );*/
        if (nowValidFormat == timerTime) {
            console.log("timer gaat nu af");
            clearInterval(interval);

        }
    }, intervalTime);
}

var commands = {
    // annyang will capture anything after a splat (*) and pass it to the function.
    // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
    //'show me *tag': showFlickr,
    'laat iets zien': showSomething,
    '(zet) (set) (do) (doe) lamp :number aan': turnLightOn,
    '(zet) (set) (do) (doe) lamp :number uit': turnLightOff,
    '(zet) (set) (do) (doe) alles aan': turnAllOn,
    '(zet) (set) (do) (doe) alles uit': turnAllOff,
    '(zet) (set) (do) (doe) scherm uit': terminalOff,
    '(zet) (set) (do) (doe) scherm aan': terminalOn,
    /*    '(zet) (set) (do) (doe) test aan': function(){
     test('lul');
     }*/

    /*    '(zet) (set) (do) (doe) waaier aan (om) (vanaf) :hour uur (en) :minutes (minuten) (*trash)': timerOnHM,
     '(zet) (set) (do) (doe) waaier aan om :time (*trash)': timerOnFullTime,
     '(zet) (set) (do) (doe) waaier aan vanaf :time (*trash)': timerOnFullTime*/

    /*'(zet) (set) (do) (doe) waaier :day aan (om) (vanaf) :hour uur :minutes' : timerOn*/

    // A named variable is a one word variable, that can fit anywhere in your command.
    // e.g. saying "calculate October stats" will call calculateStats('October');
    // 'calculate :month stats': calculateStats,

    // By defining a part of the following command as optional, annyang will respond to both:
    // "say hello to my little friend" as well as "say hello friend"
    //'say hello (to my little) friend': greeting
};

annyang.setLanguage('nl-NL');
annyang.addCommands(commands);
annyang.addCallback('start', onStart);
annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
    userSaidGlobal = userSaid;
    console.log(userSaid); // sample output: 'hello'
    $(resultClass).html(userSaid);
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});
annyang.debug();
annyang.start();


//# sourceMappingURL=main.js.map
