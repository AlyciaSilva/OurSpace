<?php
function update($newtext, $email, $hour){
    try {
        require_once('connection.php');
        $conn = connect();
        $sql = "UPDATE posts SET text = '$newtext' WHERE email = '$email' and timeNow = '$hour'";
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    } catch (Exception $error) {
        echo 'Erro no processo.';
    }
}
//update('aaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbb','lucas@gmail.com','2020-12-02 15:58:58');    
?>
