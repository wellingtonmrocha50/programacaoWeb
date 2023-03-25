<?php
include_once 'header.php';
//conexao banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$db_name ="crud";

$connect = mysqli_connect($servername, $username, $password, $db_name );

//verificando se ouve erro na conexão
if(mysqli_connect_error()):
    echo "erro na conexão:" .mysqli_connect_error();
endif;