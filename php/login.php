<?php
session_start();
function logar ($email,$senha){
    try{
        require_once('connection.php');
        $conn = connect();
        $sql = "SELECT email, name FROM cadastro WHERE email = '$email' and senha = '$senha'";
        $result = mysqli_query($conn, $sql);
        mysqli_close($conn);
        if (mysqli_num_rows($result) > 0) {  
            while($data = mysqli_fetch_assoc($result)) {
                $dataJSON = array("name" => $data['name'], "email" => $data['email']) ;
                $responseJSON = array("status" => "ok");
                $_SESSION["json_login"] = json_encode($dataJSON);
                $_SESSION["email"] = $data['email'];
                echo json_encode($responseJSON);
            }
        } else {
            $responseJSON = array("status" => "error");
            echo json_encode($responseJSON);
        }
    }catch(Exception $error){
        echo "<script> alert('Email ou senha inválidos')</script>";
    }
}

//--------- Pegar os dados passados na requisição ---------
$email = isset ($_POST['email']) ? $_POST['email'] : "email não informado";
$senha = isset ($_POST['senha']) ? $_POST['senha'] : "senha não informada";
logar($email, $senha);
?>


