<?php
session_start();
require_once 'conexao.php';

//verificando de existe btn-deletar na varial POST
if(isset($_POST['btn-deletar'])):
    $id = mysqli_escape_string($connect, $_POST['id']);

    //inserindo os dados no banco de dados
    $sql = "DELETE FROM clientes WHERE id = '$id'";

    //verificando se tivemos exito ao inserir os dados no banco de dados
    if(mysqli_query($connect, $sql)):
        $_SESSION['mensagem'] = "Excluido com sucesso";
        header('Location: index.php?');
    else:
        $_SESSION['mensagem'] = "Erro ao Excluir ";
        header('Location: index.php?');
    endif;
endif;