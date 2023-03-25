<?php
//header da index
include_once 'header.php';
?>

<div class="row"><!--criando formulario para adicionar cliente-->
    <div class="col s12 m6 push-m3">
        <form action="create.php" method="POST">
            <h3 class="light">Novo Cliente</h3>
                <div class="input-field col s12">
                    <label for="nome">Nome</label>
                    <input type="text" name="nome" id="nome">
                </div>

                <div class="input-field col s12">
                    <label for="sobrenome">SobreNome</label>
                    <input type="text" name="sobrenome" id="sobrenome">
                </div>

                <div class="input-field col s12">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                </div>

                <div class="input-field col s12">
                    <label for="idade">Idade</label>
                    <input type="text" name="idade" id="idade">
                </div>

                <button type="submit" name="btn-cadastrar" class="btn">cadastrar</button>
                <a href="index.php" class="btn green">Lista de cliente</a>
        </form>
    </div>
</div>
<?php
include_once 'footer.php';