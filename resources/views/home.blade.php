@extends('layouts.layout')

@section('content')
<div class="container-fluid">

   <div class="row">
    <div class="col-md-12">
      <div class="col-md-12 listening-top"><img id="listening-img" class="enabled" src="{{asset('/images/speaking-icon.png')}}"></div>
        <div class="col-md-12 results-top"> <h1> luisteren... </h1></div>

    </div>
   </div>
    <div class="row">
        <div class="col-md-3 col-md-offset-1 tasks">
            <div class="col-md-12 task">
            <div class="col-md-8">
            <h2>Wekker: aan</h2>
            </div>
                <div class="col-md-4">
                <h2>12:05</h2>
                </div>
            </div>
            <div class="col-md-12 task">
                <div class="col-md-8">
                    <h2>Wekker: aan</h2>
                </div>
                <div class="col-md-4">
                    <h2>12:05</h2>
                </div>
            </div>
            <div class="col-md-12 task">
                <div class="col-md-8">
                    <h2>Wekker: aan</h2>
                </div>
                <div class="col-md-4">
                    <h2>12:05</h2>
                </div>
            </div>
            <div class="col-md-12 task">
                <div class="col-md-8">
                    <h2>Wekker: aan</h2>
                </div>
                <div class="col-md-4">
                    <h2>12:05</h2>
                </div>
            </div>
            <div class="col-md-12 task">
                <div class="col-md-8">
                    <h2>Wekker: aan</h2>
                </div>
                <div class="col-md-4">
                    <h2>12:05</h2>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-md-offset-1 inputs-overview">
            <div class="col-md-4">
                <div class="col-md-12">
                    <div id="dot-1" class="dot red"></div>
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-1-1" name="contacts-1-1" class='contacts contacts-1' placeholder="voer apparaat in" />
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-1-2" name="contacts-1-2" class='contacts contacts-1' placeholder="voer apparaat in" />
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-1-3" name="contacts-1-3" class='contacts contacts-1' placeholder="voer apparaat in" />
                </div>

            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <div id="dot-2" class="dot red"></div>
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-2-1" name="contacts-2-1" class='contacts contacts-2' placeholder="voer apparaat in" />
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-2-2" name="contacts-2-2" class='contacts contacts-2' placeholder="voer apparaat in" />
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-2-3" name="contacts-2-3"  class='contacts contacts-2' placeholder="voer apparaat in" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <div id="dot-3" class="dot red"></div>
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-3-1" name="contacts-3-1" class='contacts contacts-3' placeholder="voer apparaat in" />
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text" id="contacts-3-2" name="contacts-3-2" class='contacts contacts-3' placeholder="voer apparaat in" />
                </div>
                <div class="col-md-12 usr-input">
                    <input type="text"  id="contacts-3-3" name="contacts-3-3" class='contacts contacts-3' placeholder="voer apparaat in" />
                </div>
            </div>
        </div>
    </div>


</div>


@endsection