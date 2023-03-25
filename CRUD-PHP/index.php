
<?php
include_once 'conexao.php';

include_once 'header.php';

include_once 'mensagem.php';
?>

<div class="row">
    <div class="col s12 m6 push-m3 ">
        <h3 class="light">Clientes</h3>
       <table class="striped">
        <thead>
            <tr>
                <th>Nome:</th>
                <th>SobreNome:</th>
                <th>Email:</th>
                <th>Idade:</th>
            </tr>
        </thead>
            
        <tbody>
            <?php
            //adicionando os dados dinamicamente na pagina
            $sql = "SELECT * FROM  clientes";
            $resultado = mysqli_query($connect, $sql);

            if(mysqli_num_rows($resultado) > 0):

            while($dados = mysqli_fetch_array($resultado)):
            ?>
            <tr>
                <td><?php echo $dados['nome']; ?></td>
                <td><?php echo $dados['sobrenome']; ?></td>
                <td><?php echo $dados['email']; ?></td>
                <td><?php echo $dados['idade']; ?></td>
                
                <!--btn editar e deletar-->
                <td><a href="editar.php?id=<?php echo $dados['id'];?>" class="btn-floating green"><i class="material-icons" title="editar">edit</i></a></td>
                <td><a href="#modal<?php echo $dados['id']; ?>" class="btn-floating red modal-trigger"><i class="material-icons" title="deletar">delete</i></a></td>

                <!-- Modal Structure -->
                <div id="modal<?php echo $dados['id']; ?>" class="modal">
                    <div class="modal-content">
                    <h3>Excluir Registro</h3>
                    <h5>Olá,realmente deseja excluir esté arquivo?</h5>
                    </div>
                    <div class="modal-footer">
                    
                    <form action="delete.php" method="POST"><!--formulario para excluir arquivo com botao-->
                        <input type="hidden" name="id" value="<?php echo $dados['id']; ?>">
                        <button type="submit" name="btn-deletar" class="btn red">Sim, Excluir</button>
                        <a href="#!" class="modal-close waves-effect  btn-flat btn green">Cancelar</a>

                    </form>
                    </div>
                </div>
            </tr>

            <?php endwhile; else:?><!--final do loop-->
            <tr>
                <td>-</td><!--linhas vazias da tabela-->
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <?php endif;?>
            
        </tbody>
       </table>
       <br>
       <!--btn-->
       <a href="adicionar.php" class="btn">Adicionar cliente</a>
    </div>
</div>

<!--FOOTER-->
<?php
include_once 'footer.php';// chamando o arquivo de dentro da pasta INCLUDES(footer.php)
?>

