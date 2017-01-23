var resultClass = ".results-top h1";
var contactOneID = "#dot-1";
var contactTwoID = "#dot-2";
var contactThreeID = "#dot-3";
var terminalID = "#terminal";
var userSaidGlobal = "none";
var nlVoice = "Dutch Female";
var errorClass = ".error";
var soundDiv = ".soundDiv h4";
var soundEnabled = true;

$('.contacts').keypress(function (e) {
    if (e.which == 13) {
        if ($(this).val() != "") {
            if (/[,/:;'"*&^%$#@!~`.?\-]/.test($(this).val())) {
                $(errorClass).removeClass('hidden');
            } else {
                if ($(this).hasClass('contacts-1')) {

                    addDynamicCommand($(this).val(), 1);
                } else if ($(this).hasClass('contacts-2')) {
                    addDynamicCommand($(this).val(), 2);
                } else if ($(this).hasClass('contacts-3')) {
                    addDynamicCommand($(this).val(), 3);
                }
                $(this).addClass('active');
                $(errorClass).addClass('hidden');

                speakVoice($(this).val() + " ingeladen");
            }
        }
        else {
            $(errorClass).removeClass('hidden');
        }
    }
});

$(soundDiv).click(function () {
    console.log("click");
    if (soundEnabled) {
        $(soundDiv).html('geluid uit');
        soundEnabled = false;
    } else if (!soundEnabled) {
        $(soundDiv).html('geluid aan');
        soundEnabled = true;
    }
});

var terminalOn = function () {
    $(terminalID).removeClass('terminal-off');
    $(terminalID).addClass('terminal-on');
};

var terminalOff = function () {
    $(terminalID).removeClass('terminal-on');
    $(terminalID).addClass('terminal-off');
};

function speakVoice(whatToSpeak) {
    if (soundEnabled) {
        responsiveVoice.speak(whatToSpeak, nlVoice);
    }
};

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

    object[firstPart + nameOfContact + lastPartOn] = function () {
        console.log('toglle contact on', pinNumber);
        toggleContact(pinNumber, 'on');
        speakVoice(nameOfContact + " aan");
    };
    object[firstPart + nameOfContact + lastPartOff] = function () {
        toggleContact(pinNumber, 'off');
        speakVoice(nameOfContact + " uit");
    };
    object[firstPart + nameOfContact + lastPartOn + timerPart1] = function (hours, minutes) {
        timerHourMinutes(nameOfContact, hours, minutes, 'on', pinNumber);
        speakVoice(nameOfContact + " aan om " + hours + ' uur en ' + minutes + ' minuten');
    };
    object[firstPart + nameOfContact + lastPartOff + timerPart1] = function (hours, minutes) {
        timerHourMinutes(nameOfContact, hours, minutes, 'off', pinNumber);
        speakVoice(nameOfContact + " uit om " + hours + ' uur en ' + minutes + ' minuten');
    };
    object[firstPart + nameOfContact + lastPartOn + timerPart2] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'on', pinNumber);
        speakVoice(nameOfContact + " aan om " + time);
    };
    object[firstPart + nameOfContact + lastPartOff + timerPart2] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'off', pinNumber);
        speakVoice(nameOfContact + " uit om " + time);
    };
    object[firstPart + nameOfContact + lastPartOn + timerPart3] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'on', pinNumber);
        speakVoice(nameOfContact + " aan om " + time);
    };
    object[firstPart + nameOfContact + lastPartOff + timerPart3] = function (time, trash) {
        timerFullTime(nameOfContact, time, 'off', pinNumber);
        speakVoice(nameOfContact + " uit om " + time);
    };
    annyang.addCommands(object);
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

function toggleDot(pin, onOrOff) {
    if (pin == 1) {
        if (onOrOff == 'on') {
            $(contactOneID).removeClass('red');
            $(contactOneID).addClass('green');
        } else if (onOrOff == 'off') {
            $(contactOneID).removeClass('green');
            $(contactOneID).addClass('red');
        }
    } else if (pin == 2) {
        if (onOrOff == 'on') {
            $(contactTwoID).removeClass('red');
            $(contactTwoID).addClass('green');
        } else if (onOrOff == 'off') {
            $(contactTwoID).removeClass('green');
            $(contactTwoID).addClass('red');
        }
    } else if (pin == 3) {
        if (onOrOff == 'on') {
            $(contactThreeID).removeClass('red');
            $(contactThreeID).addClass('green');
        } else if (onOrOff == 'off') {
            $(contactThreeID).removeClass('green');
            $(contactThreeID).addClass('red');
        }
    }
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
    console.log("contactstate is called" + contact);
    switch (contact) {
        case 1:
        case '1':
        case 'een':
        case 'één':
        case 'aan':
        function one() {
            console.log('een is called' + contact + state);
            pushCommand(0, state);
        }

            one();
            break;
        case 2:
        case '2':
        case 'twee':
        function two() {
            console.log('twee is called' + contact + state);
            pushCommand(1, state);
        }

            two();
            break;
        case 3:
        case '3':
        case 'drie':
        function three() {
            console.log('drie is called' + contact + state);

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

var turnAllOn = function () {
    pushCommand(-1, 'all_on');
    allDotsOn()
};

var onStart = function () {
    console.log('now active');
};

function toggleContact(pin, onOrOff) {
    toggleDot(pin, onOrOff);
    contactState(pin, onOrOff);
}

function timerHourMinutes(name, hour, minutes, onOrOff, pin) {
    var validTimeFormat = validTimeGenerator(hour, minutes, null);
    setTimerCountdown(name, validTimeFormat, onOrOff, pin);
    console.log(name + hour + minutes + onOrOff, pin);

};

function timerFullTime(name, time, onOrOff, pin) {
    var validTimeFormat = validTimeGenerator(null, null, time);

    setTimerCountdown(name, validTimeFormat, onOrOff, pin);

    console.log(name + time + onOrOff, pin);
};

function speakWeather(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?APPID=beecd3d12c047b2000b8d68b716d01c2&q=" + city + "&lang=nl&units=metric", function (result) {
        var weatherDescription = result.weather[0].description;
        var weatherDegrees = result.main.temp;
        var maxDegrees = result.main.temp_max;
        var minDegrees = result.main.temp_min;
        console.log(maxDegrees);
        speakVoice(weatherDescription + " en het is " + weatherDegrees + " graden en het word maximaal " +
            maxDegrees + " graden")
    });
}

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
        if (number < 10 && number >= 0 && number != "00" && number.length != 2) {
            return "0" + number;
        } else {
            return number;
        }
    }

}

function appendTimer(name, time, onOrOff) {
    var uniqmilli = new Date().getUTCMilliseconds()
    var appendClass = '.tasks';
    var appendHtml = "<div id='" + uniqmilli + "' class='col-md-12 task'>" +
        " <div class='col-md-8'> <h2>" + name + ":" + onOrOff + "</h2> </div> " +
        "<div class='col-md-4'> <h2>" + time + "</h2> </div> " +
        "</div>";
    console.log(appendHtml);
    $(appendClass).append(appendHtml);

    return '#' + uniqmilli;

}

function setTimerCountdown(name, time, onOrOff, pin) {
    var timerDiv = appendTimer(name, time, onOrOff);
    var timerTime = time;
    var intervalTime = 1000;
    var now = new Date();
    var nowValidFormat = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});

    var interval = setInterval(function () {
        now = new Date();
        nowValidFormat = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});

        if (nowValidFormat == timerTime) {
            console.log("timer gaat nu af");
            toggleContact(pin, onOrOff);
            toggleDot(pin, onOrOff);
            $(timerDiv).remove();
            clearInterval(interval);

        }
    }, intervalTime);
}

var commands = {
    'laat iets zien': showSomething,
    '(zet) (set) (do) (doe) lamp :number aan': turnLightOn,
    '(zet) (set) (do) (doe) lamp :number uit': turnLightOff,
    '(zet) (set) (do) (doe) alles aan': turnAllOn,
    '(zet) (set) (do) (doe) alles uit': turnAllOff,
    '(zet) (set) (do) (doe) scherm uit': terminalOff,
    '(zet) (set) (do) (doe) scherm aan': terminalOn,
    '(wat is) (geef me) (geef mij) (vertel me) (vertel mij) het weer (vandaag) in :city (vandaag)': function (city) {
        speakWeather(city);
    },
    '(wat is) (geef me) (geef mij) (vertel me) (vertel mij) het weer (vandaag)': function () {
        speakWeather('Antwerpen');
    },

};

annyang.setLanguage('nl-NL');
annyang.addCommands(commands);
annyang.addCallback('start', onStart);
annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
    userSaidGlobal = userSaid;
    console.log(userSaid);
    $(resultClass).html(userSaid);
    console.log(commandText);
    console.log(phrases);
});
/*annyang.debug();*/
annyang.start();

