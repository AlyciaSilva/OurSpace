<?php
session_start();
function loadMyPosts() {
    if (isset($_SESSION['json_login'])) {
        try{
            require_once('connection.php');
            $conn = connect();
            $email = $_SESSION['email'];
            $sql = "SELECT c.name, p.text, p.timeNow FROM cadastro c JOIN posts p ON c.email = p.email where p.email = '$email' order by p.timeNow";
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
            $responseJSON = array("status" => $error->getMessage());
            echo json_encode($responseJSON);
        }
    } else {
        $responseJSON = array("status" => 'offline');
        echo json_encode($responseJSON);
    }
}

loadMyPosts();

?>