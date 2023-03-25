<?php
//iniciando a sessao e verificando se existe a mensagem
session_start();
if(isset($_SESSION['mensagem'])):?>

<script>
    window.onload = function(){
        M.toast({html: '<?php echo $_SESSION['mensagem'];?>'});
    };
</script>

<?php
endif;
//destruindoa sessão
session_unset()
?>