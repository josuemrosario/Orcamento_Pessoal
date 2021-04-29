class Despesa{
	
	constructor(ano,mes,dia,tipo,descricao,valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor	= valor
	}

	ValidarDAdos(){
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}

}

class Bd{

	constructor(){
		let id = localStorage.getItem('id')

		if(id === null){
			localStorage.setItem('id',0)

		}

	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id,JSON.stringify(d))
		localStorage.setItem('id',id)
		
	}
}

let bd = new Bd


function cadastrarDespesa(){
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value)

	if(despesa.ValidarDAdos()){
		bd.gravar(despesa)
		//dialog de sucesso
		mostrarModal(true)
	}else {
		//dialog de erro
		mostrarModal(false)
	}
}

function mostrarModal(tipo){

	let htmlmodal = ''
	
	htmlmodal += '<div class="modal-dialog" role="document">'
    htmlmodal += '    <div class="modal-content">'
    htmlmodal += '      <div class="modal-header '
    
    if(tipo){
    	htmlmodal += 'text-success">'
    }else{	
    	htmlmodal += 'text-danger">'
    }

    htmlmodal += '        <h5 class="modal-title" id="exampleModalLabel">'
    
    if(tipo){
    	htmlmodal += 'Registro Inserido com Sucesso</h5>'
    }else{
    	htmlmodal += 'Erro na Gravação</h5>'	
    }    
    
    htmlmodal += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    htmlmodal += '          <span aria-hidden="true">&times;</span>'
    htmlmodal += '        </button>'
    htmlmodal += '      </div>'
    htmlmodal += '      <div class="modal-body">'
    
    if(tipo){
		htmlmodal += '        Despesa Cadastrada com Sucesso'
	}else{
		htmlmodal += '        Existem Campos Obrigatórios Que não Foram Preenchidos'
	}
    
    
    htmlmodal += '      </div>'
    htmlmodal += '      <div class="modal-footer">'
    htmlmodal += '        <button type="button" class="btn '
    
    if(tipo){
    	htmlmodal +=  'btn-success" '
    }else{	
    	htmlmodal +=  'btn-danger" '
	}
    
    htmlmodal += 'data-dismiss="modal">OK</button>'
    htmlmodal += '      </div>'
    htmlmodal += '    </div>'
    htmlmodal += '  </div>'

   
    document.getElementById("modalRegistroDespesa").innerHTML = htmlmodal
    $('#modalRegistroDespesa').modal('show')

}


