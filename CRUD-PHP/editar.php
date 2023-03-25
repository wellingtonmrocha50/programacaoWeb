<?php
include_once 'conexao.php';
if(isset($_GET['id'])):
    $id = mysqli_escape_string($connect, $_GET['id']);

    $sql = "SELECT * FROM clientes WHERE id = '$id'";
    $resultado = mysqli_query($connect, $sql);
    $dados = mysqli_fetch_array($resultado);
endif;

//header da index
include_once 'header.php';
?>

<div class="row"><!--criando formulario para adicionar cliente-->
    <div class="col s12 m6 push-m3">
        <form action="update.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $dados['id'];?>">
            <h3 class="light">Editar Cliente</h3>
                <div class="input-field col s12">
                    <label for="nome">Nome</label>
                    <input type="text" value ="<?php echo $dados['nome'];?>" name="nome" id="nome" >
                </div>

                <div class="input-field col s12">
                    <label for="sobrenome">SobreNome</label>
                    <input type="text" value ="<?php echo $dados['sobrenome'];?>" name="sobrenome" id="sobrenome">
                </div>

                <div class="input-field col s12">
                    <label for="email">Email</label>
                    <input type="email" value ="<?php echo $dados['email'];?>" name="email" id="email">
                </div>

                <div class="input-field col s12">
                    <label for="idade">Idade</label>
                    <input type="text" value ="<?php echo $dados['idade'];?>" name="idade" id="idade">
                </div>

                <button type="submit" name="btn-editar" class="btn">Atualizar</button>
                <a href="index.php" class="btn green">Lista de cliente</a>
        </form>
    </div>
</div>
<?php
include_once 'footer.php';