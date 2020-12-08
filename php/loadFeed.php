<?php
session_start();
function load (){
    if (isset($_SESSION['json_login'])) {
        try{
            require_once('connection.php');
            $conn = connect();
            $sql = "SELECT c.name, p.text, p.timeNow FROM cadastro c JOIN posts p ON c.email = p.email";
            $result = mysqli_query($conn, $sql);
            mysqli_close($conn);
            if (mysqli_num_rows($result) > 0) {
                $responseJSON = array();
                while($data = mysqli_fetch_assoc($result)) {
                    $responseJSON[] = $data;
                }
                echo json_encode($responseJSON);
            }else {
                $responseJSON = array("status" => 0);
                echo json_encode($responseJSON);
            }
        }catch(Exception $error){
            echo "<script> alert('Erro')</script>";
        }
    }else {
        $responseJSON = array("status" => 'offline');
        echo json_encode($responseJSON);
    }
    
} 
load();
?>


