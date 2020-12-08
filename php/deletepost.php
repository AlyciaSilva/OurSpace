<?php
function delete($hour, $email){
    try {
        require_once('connection.php');
        $conn = connect();
        $sql = "DELETE FROM posts WHERE email = '$email' and timeNow = '$hour'";    
        mysqli_query($conn, $sql);
        mysqli_close($conn);
    } catch (Exception $error) {
        echo 'Erro na operação';   
    }
}
//delete('2020-12-07 01:36:35','aly@gmail.com');
?>