<?php 
function newUser ($name, $midleName, $birthday, $password, $email) {
    try {
        require_once('connection.php');
        $conn = connect();
        $sql = "INSERT INTO cadastro (name, midleName, birthday, senha, email) VALUES ('$name','$midleName','$birthday', '$password' , '$email')";
        mysqli_query($conn, $sql);
        mysqli_close($conn);
        $array = array("status" => "ok");
        echo json_encode($array);
    } catch(Exception $error) {
        $array = array("status" => "erro");
        echo json_encode($array);
    }
}
$name = isset ($_POST['name']) ? $_POST['name'] : "nome não informado";
$midleName = isset ($_POST['midleName']) ? $_POST['midleName'] : "sobrenome não informado";
$birthday = isset ($_POST['birthday']) ? $_POST['birthday'] : "Dia de nascimento não informado";
$senha = isset ($_POST['senha']) ? $_POST['senha'] : "senha não informado";
$email = isset ($_POST['email']) ? $_POST['email'] : "email não informado";
newUser($name, $midleName, $birthday, $senha, $email);
//newUser('lucas','sales','2001-10-19','113**','lucas@gmail.com' )
?>