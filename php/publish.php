<?php 
session_start();
function issue ($text) {
    if (isset($_SESSION['json_login']) && isset($_SESSION['email'])) {
        try {
            date_default_timezone_set('America/Sao_Paulo');
            $hour = date('Y-m-d H:i:s', time());
            $email = $_SESSION['email'];
            require_once('connection.php');
            $conn = connect();
            $sql = "INSERT INTO posts (email, timeNow, text) VALUES ('$email', '$hour', '$text')";
            mysqli_query($conn, $sql);
            mysqli_close($conn);
            $responseJSON = array("status" => 'ok');
            echo json_encode($responseJSON);
        } catch(Exception $error) {
            echo "Erro no cadastro!";
        }
    } else {
        $responseJSON = array("status" => 'offline');
        echo json_encode($responseJSON);
    }
}
issue($_POST['text']);
?>