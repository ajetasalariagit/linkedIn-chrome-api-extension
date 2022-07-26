<?php 
require_once __DIR__ . "/vendor/autoload.php";
$mongo = new MongoDB\Client("mongodb://localhost:27017");
$db = $mongo->linkedin_api_data;
$collection = $db->data;
?>