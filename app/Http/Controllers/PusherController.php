<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class PusherController extends Controller
{
    public function pushCommand(Request $request){
        $pinToPush =$request->pin; // 0 , 1 or 2 possible
        $pusherChannel = "speech_duino";
        $pusherEvent = "get_speech";
        $pusherName = "noname" ;
        $state = $request->state;
        $milliseconds = 3000; //settimeout settings delay
        $time = strtotime('now');


        $data['pin'] = $pinToPush;
        $data['state'] = $state; // can be on and off and timeout
        $data['name'] = $pusherName;
        $data['ms'] = $milliseconds;
        $data['time'] = $time;

        $pusher = App::make('pusher');

        $pusher->trigger( $pusherChannel,
            $pusherEvent,
            $data
        );
        /*  array('state' => 'on',
              'name' =>  $pusherName
          )*/
        return $pusherName;
    }
}
