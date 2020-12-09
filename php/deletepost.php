<?php
session_start();
function delete($hour){
    if (isset($_SESSION['json_login'])) {
        try {
            require_once('connection.php');
            $conn = connect();
            $email = $_SESSION['email'];
            $sql = "DELETE FROM posts WHERE email = '$email' and timeNow = '$hour'";    
            mysqli_query($conn, $sql);
            mysqli_close($conn);
        } catch(Exception $error) {
            $responseJSON = array("status" => $error->getMessage());
            echo json_encode($responseJSON);
        }
    }else {
        $responseJSON = array("status" => 'offline');
        echo json_encode($responseJSON);
    }
}
$hour = $_POST['h'];
delete($hour);
//delete('2020-12-07 01:36:35','aly@gmail.com');
?>