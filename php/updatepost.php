<?php
session_start();
function update($newtext, $hour){
    if (isset($_SESSION['json_login'])) {
        try {
            require_once('connection.php');
            $conn = connect();
            $email = $_SESSION['email'];
            $sql = "UPDATE posts SET text = '$newtext' WHERE email = '$email' and timeNow = '$hour'";
            mysqli_query($conn,$sql);
            mysqli_close($conn);
        } catch (Exception $error) {
            $responseJSON = array("status" => $error->getMessage());
            echo json_encode($responseJSON);
        }       
    } else {
        $responseJSON = array("status" => "offline");
        echo json_encode($responseJSON);
    }
}
$newtext = $_POST['text'];
$hour = $_POST['h'];
update($newtext, $hour);
//update('aaaaaaaaaaaaaaaaaaaaabbbbb','lucas@gmail.com','2020-12-02 15:58:58');    
?>
