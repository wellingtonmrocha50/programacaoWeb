<?php
session_start();
require_once 'conexao.php';

//verificando de existe btn-editar na varial POST
if(isset($_POST['btn-editar'])):
    $nome = mysqli_escape_string($connect, $_POST['nome']);
    $sobrenome = mysqli_escape_string($connect, $_POST['sobrenome']);
    $email = mysqli_escape_string($connect, $_POST['email']);
    $idade = mysqli_escape_string($connect, $_POST['idade']);

    $id = mysqli_escape_string($connect, $_POST['id']);

    //inserindo os dados no banco de dados
    $sql = "UPDATE clientes SET nome = '$nome', sobrenome = '$sobrenome', email = '$email', idade = '$idade' WHERE id = '$id'";

    //verificando se tivemos exito ao inserir os dados no banco de dados
    if(mysqli_query($connect, $sql)){
        $_SESSION['mensagem'] = "Atualizado com sucesso";
        header('Location: index.php?');
    }else{
        $_SESSION['mensagem'] = "Erro no atualizar ";
        header('Location: index.php?');
    }   
    endif;
?>