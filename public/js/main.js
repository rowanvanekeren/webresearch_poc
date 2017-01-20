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


//# sourceMappingURL=main.js.map
