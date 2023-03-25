<?php
session_start();
require_once 'conexao.php';

//verificando de existe btn-cadastrar na varial POST
if(isset($_POST['btn-cadastrar'])):
    $nome = mysqli_escape_string($connect, $_POST['nome']);
    $sobrenome = mysqli_escape_string($connect, $_POST['sobrenome']);
    $email = mysqli_escape_string($connect, $_POST['email']);
    $idade = mysqli_escape_string($connect, $_POST['idade']);

    //inserindo os dados no banco de dados
    $sql = "INSERT INTO clientes (nome, sobrenome, email, idade) VALUES ('$nome', '$sobrenome', '$email', '$idade')";

    //verificando se tivemos exito ao inserir os dados no banco de dados
    if(mysqli_query($connect, $sql)):
        $_SESSION['mensagem'] = "cadastrado com sucesso";
        header('Location: index.php?');
    else:
        $_SESSION['mensagem'] = "Erro no cadastro ";
        header('Location: index.php?');
    endif;
endif;