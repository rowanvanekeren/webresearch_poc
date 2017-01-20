var resultClass = ".results-top h1";
var contactOneID = "#dot-1";
var contactTwoID = "#dot-2";
var contactThreeID = "#dot-3";
var terminalID = "#terminal";
var terminalOn = function (){
    $(terminalID).removeClass('terminal-off');
    $(terminalID).addClass('terminal-on');
};
var terminalOff = function (){
    $(terminalID).removeClass('terminal-on');
    $(terminalID).addClass('terminal-off');
};
$('.contacts').keypress(function(e) {
    if(e.which == 13) {

        if($(this).hasClass('contacts-1')){
      /*      alert($(this).val() +  " 1");*/
        }else if($(this).hasClass('contacts-2')){
           /* alert($(this).val()  +  " 2");*/
        }else if($(this).hasClass('contacts-3')){
          /*  alert($(this).val()  +  " 3");*/
        }
        addDynamicCommand($(this).val());
    }
});
function addDynamicCommand(value){
    var object ={};
    var firstPart = "(zet) (set) (do) (doe) ";
    var variable = value;
    var lastPartOn = " aan";
    var lastPartOff = " uit";
    object[firstPart + variable + lastPartOn] = "turnLightOn";
    object[firstPart + variable + lastPartOff] = "turnLightOff";
    console.log(object);
    annyang.addCommands(object);
}
function pushCommand(pin, state){
    $.ajax({
        url: "pushCommand",
        type: "post",
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            pin: pin,
            state: state
        } ,
        success: function (response) {
            // you will get response from your php page (what you echo or print)

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }


    });
}
function allDotsOff(){
    $(contactOneID).removeClass('green');
    $(contactOneID).addClass('red');
    $(contactTwoID).removeClass('green');
    $(contactTwoID).addClass('red');
    $(contactThreeID).removeClass('green');
    $(contactThreeID).addClass('red');
}
function allDotsOn(){
    $(contactOneID).removeClass('red');
    $(contactOneID).addClass('green');
    $(contactTwoID).removeClass('red');
    $(contactTwoID).addClass('green');
    $(contactThreeID).removeClass('red');
    $(contactThreeID).addClass('green');
}
var showSomething = function (){
    $('h1').html('hier jonge nu kende wat zien');
};
function lightState(light,state){
    switch(light){
        case '1':
        case 'een':
        case 'één':
        case 'aan':
        function one(){console.log('een is called' + light + state);
            pushCommand(0,state);
        }
            one();
            break;
        case '2':
        case 'twee':
        function two(){console.log('twee is called' + light  + state);
            pushCommand(1,state);}
            two();
            break;
        case '3':
        case 'drie':
        function three(){console.log('drie is called' + light  + state);

            pushCommand(2,state);
        }
            three();
            break;

    }
}
var turnLightOn = function(light){
    lightState(light,'on');
};
var turnLightOff = function(light){
    lightState(light,'off');
};

var turnAllOff = function (){
    pushCommand(-1,'all_off');
    allDotsOff();

};

var turnAllOn = function(){
    pushCommand(-1,'all_on');
    allDotsOn()
};
var onStart = function(){
    console.log('now active');
};

var commands = {
    // annyang will capture anything after a splat (*) and pass it to the function.
    // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
    //'show me *tag': showFlickr,
    'laat iets zien' : showSomething,
    '(zet) (set) (do) (doe) lamp :number aan' : turnLightOn,
    '(zet) (set) (do) (doe) lamp :number uit' : turnLightOff,
    '(zet) (set) (do) (doe) alles aan' : turnAllOn,
    '(zet) (set) (do) (doe) alles uit' : turnAllOff,
    '(zet) (set) (do) (doe) scherm uit' : terminalOff,
    '(zet) (set) (do) (doe) scherm aan' : terminalOn

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
annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
    console.log(userSaid); // sample output: 'hello'
    $(resultClass).html(userSaid);
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});
annyang.start();

