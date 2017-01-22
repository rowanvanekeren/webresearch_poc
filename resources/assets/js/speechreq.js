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
            addDynamicCommand($(this).val(),1);
        } else if ($(this).hasClass('contacts-2')) {
            addDynamicCommand($(this).val(),2);
        } else if ($(this).hasClass('contacts-3')) {
            addDynamicCommand($(this).val(),3);
        }
        addDynamicCommand($(this).val());
    }
});
function addDynamicCommand(value, pin) {
    var pinNumber = pin;
    var object = {};
    var firstPart = "(zet) (set) (do) (doe) ";
    var variable = value;
    var lastPartOn = " aan";
    var lastPartOff = " uit";
    var timerPart1 = " (om) (vanaf) :hour uur (en) :minutes (minuten) (*trash)";
    var timerPart2 = " om :time (*trash)";
    var timerPart3 = " vanaf :time (*trash)";
    var contactsOneOn = "contactsOneOn";
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
    var timerOffFullTimeThree = "timerOffFullTimeThree";

    if (pinNumber == 1) {
        object[firstPart + variable + lastPartOn] = contactsOneOn;
        object[firstPart + variable + lastPartOff] = contactsOneOff;
        object[firstPart + variable + lastPartOn + timerPart1] = timerOnHMOne;
        object[firstPart + variable + lastPartOff + timerPart1] = timerOffHMOne;
        object[firstPart + variable + lastPartOn + timerPart2] = timerOnFullTimeOne;
        object[firstPart + variable + lastPartOff + timerPart2] = timerOffFullTimeOne;
        object[firstPart + variable + lastPartOn + timerPart3] = timerOnFullTimeOne;
        object[firstPart + variable + lastPartOff + timerPart3] = timerOffFullTimeOne;
        annyang.addCommands(object);
    } else if (pinNumber == 2) {
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
    }

    console.log(object);
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

var timerOnHMOne = function (hour, minutes) {
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
};
var test = function(test){
    console.log("test" + test);
};
function appendTimer(name, time, onOrOff) {
    var appendClass = '.tasks';

    var appendHtml = "<div class='col-md-12 task'>" +
        " <div class='col-md-8'> <h2>" + name + ":" + onOrOff + "</h2> </div> " +
        "<div class='col-md-4'> <h2>" + time + "</h2> </div> " +
        "</div>";
}

function setTimerCountdown(){
    var now = new Date();
var deadline = new Date();
/*    deadline.setHours(11);*/
 /*   console.log(deadline.setDay(deadline.getDay()+1));
    console.log(deadline);*/
    if(now > deadline){

        console.log(deadline.getDay() + 1);
    }
}
setTimerCountdown();
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
    '(zet) (set) (do) (doe) test aan': function(){
    test('lul');
}

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

