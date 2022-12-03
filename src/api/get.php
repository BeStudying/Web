<?php
if(!isset($_GET["type"])){
    header("HTTP/1.0 400 Bad Request");
    return;
}
$type = $_GET["type"];
$params = $_GET["params"] ?? '';
$link = "http://localhost:3080/$type". ($params ? "?$params" : "");
echo @file_get_contents($link, false, stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]));
header("HTTP/1.0 200 OK");