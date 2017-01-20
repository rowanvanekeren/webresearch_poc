<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Home Automatisation</title>
    <link rel="stylesheet" type="text/css" href="{{url('/css/app.css')}}">
</head>
<body>
<div id="terminal" class="terminal-off"></div>
    @yield('content');
    <script src="{{ asset('/js/jquery-3.1.1.min.js') }}"></script>
    <script src="{{ asset('/js/angular.min.js') }}"></script>
    <script src="{{ asset('/js/main.js') }}"></script>
</body>
</html>