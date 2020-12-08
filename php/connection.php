<?php
function connect () {
    $conn = mysqli_connect("localhost","root","","projeto_da_faculdade");

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }
    return $conn; 
}
//("localhost","id15589166_sales19","PjRwzIPI&a2&d(F{","id15589166_sales19bd")
?>