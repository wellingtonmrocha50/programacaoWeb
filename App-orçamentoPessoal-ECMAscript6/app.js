class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){// o operador i recupera os atributos
           if(this[i] == undefined || this[i] == '' || this[i] == null){
            return false
           }
        }
        return true
    }
}
//gravando e adicionando mais um registro dinamicamente
class Bd{

    constructor(){
        let id = localStorage.getItem('id')//GetItem-serve para recuperar dados em localStorange

        if(id === null){
            localStorage.setItem('id', 0)//SetItem-serve para inserir dados em localStorange
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }

    gravar(d){
        
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistro(){
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //laço de prepetição para reculperar todos os cadastros localstorage
        for(let i = 1; i <= id; i++){

            //recuperar despesas
            let despesa = JSON.parse(localStorage.getItem(i))

            //verificando se o indice esta como null ou foi removido, se estiver iremos continuar
            if(despesa === null){
                continue
            }
            
            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }
    pesquisar(despesa){
        
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistro()
        console.log(despesasFiltradas)

        //aplicando os filtros
        //ano
        if(despesa.ano != ''){
            console.log('filtro ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        
        //mes
        if(despesa.mes != ''){
            console.log('filtro mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia 
        if(despesa.dia != ''){
            console.log('filtro dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            console.log('filtro tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != ''){
            console.log('filtro descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != ''){
            console.log('filtro valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
       
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
    
}

let bd = new Bd()

function cadastrarDespesa(){
    //recuperando os dados digitados no formulario
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    
    if(despesa.validarDados()){
        //salvando em localstorage
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Resgistrado com sucesso!'
        document.getElementById('modal_mensagem').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'comfirmar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        
        //msg sucesso
        $('#modalRegistraDespesa').modal('show')
        //limpando os campos depois de preechidos e apertar o botão comfirmar
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }else{
        //msg erro
        $('#modalRegistraDespesa').modal('show')

        document.getElementById('modal_titulo').innerHTML = 'Erro no cadastro'
        document.getElementById('modal_mensagem').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Os campos não foram preenchidos corretamente'
        document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        
    }
      
}

function carregaListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistro()
    }
    

    //selecionando o tbody da tabela
    let listaDespesas =  document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    
   //percorrer o Array despesas,de forma dinâmica
   despesas.forEach(function(d){
    
    //criando  tabela(tr)
    let linha = listaDespesas.insertRow()

    //criando as colunas(td)
     linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`  
     linha.insertCell(1).innerHTML = d.tipo
     linha.insertCell(2).innerHTML = d.descricao
     linha.insertCell(3).innerHTML = d.valor

     //criando botao em  x para remover a consulta criada
    let btn = document.createElement("button")
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"</i>'
    btn.id = `id_despesa_${d.id}` 
    btn.onclick = function(){

        //remover despesas
        let id = this.id.replace('id_despesa_', '')
        //window.alert(id)
        bd.remover(id)
        //atualizar a pagina automaticamente
        window.location.reload()
    }
    linha.insertCell(4).append(btn)

    console.log(d)


   })
}

//funcao pesquisar
function pesquisarDespesa(){

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
   
    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}



 