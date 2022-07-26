<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: *");

require_once('config.php');

if($_POST){
  //echo"<pre>"; print_r(json_decode($_POST['data'])); die;
    $insert = array(
      'data' => json_encode($_POST),
    );
    if ( $collection->insertOne(json_decode($_POST['data'])) ) {
      echo json_encode([
        'status' => 1,
         'message' => 'Data inserted successfully'
        ]);
    }else{
        echo json_encode([
        'status' => 0,
         'message' => 'something went wrong'
        ]);
    }
}


