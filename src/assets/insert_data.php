<?php
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));
$firstname = $data -> firstname;
$lastname = $data -> lastname;
$email = $data -> email;
$password = $data -> password;
$address = $data -> address;
$phone = $data -> phone;

$con = new sqli('localhost','coderaymond','show907ring956','phasta');

if ($con ->connect_error) {
    die ("connection failed:". $con ->connect_error);
}

$select = "SELECT 'Email' FROM 'users' WHERE 'Email' = '".$email."' ";
$result = $con -> query($select);
if ($result ->num_rows > 0) {
echo json_encode(array("data"=>'', "message"=>"error"));
}
else {
    $select1 = "INSERT INTO 'USERS' ('firstname', 'lastname', 'email', 'password', 'phone', 'address') VALUES
     ( '".$firstname."', '".$lastname."', '".$email."', '".$password."','".$phone."', '".$address."')";

if ($con->query($select1) === TRUE) {
    $last_id = $con ->insert_id;
    echo json_encode(array("data"=>'Registration Successful. Your id is' .$last_id,"message"=>"success"));
    }else {
        echo json_encode(array("data"=>'',"message"=>"error"));
    }

}

$con->close();

// TRIBUTE TO UNCLE
// EMMANUEL UNAJI

?>