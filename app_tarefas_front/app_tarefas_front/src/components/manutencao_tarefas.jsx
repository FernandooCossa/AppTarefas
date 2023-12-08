import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "./config_axios.js";
import ItemLista from "./ItemLista.jsx";  

const ManutencaoTarefas = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [tarefas, setTarefas] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("tarefa");
            setTarefas(lista.data);
        }catch(error){
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


//define o método que será executado assim que o componente
// for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try {
        const response = await api.get(`tarefa/filtro/${campos.palavra}`);
        if (response.status === 200) {
            const lista = response.data;
            
            if (lista.success) {
                setTarefas(lista.tarefa);
            } else {
                alert("Não há tarefas cadastradas com a palavra chave pesquisada");
            }
         } else {
          alert(`Erro na solicitação: ${response.statusText}`);
         }
       
    } catch (error) {
        
        alert("Não há tarefas cadastradas com a palavra chave pesquisada");
    }
}

const excluir = async(id,titulo) => {
    if(!window.confirm(`Confirma a exclusão do Tarefa ${titulo}?`)){
        return;
    }
    try{
        console.log("meu id:"+id);
        await api.delete(`tarefa/${id}`);
        //formar uma nova lista de tarefas sem a tarefa que foi excluida
        setTarefas(tarefas.filter(Tarefas => tarefas.id !== id));
        location.reload(); // serve para atualizar a pagina apos excluir
    }catch(error){
        alert(`Erro: ..Não foi possível excluir a tarefa ${titulo}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,titulo,index) => {
    const novoStatus = prompt(`Digite o novo status da tarefa ${titulo}`);
    if (novoStatus == "" ) {
        alert('Digite um status válido!(status em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        console.log(`status: ${novoStatus}`);
        await api.put(`tarefa/${id}`,{status: novoStatus});
        
        obterLista();
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar a tarefa ${titulo}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção de Tarefas</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Data Criação</th>
                    <th>Data Limite</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {tarefas.map((tarefa) => (
                    <ItemLista
                        key={tarefa.idtarefas}
                        id={tarefa.idtarefas}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        status={tarefa.status}
                        data_criacao={tarefa.data_criacao}
                        data_limite={tarefa.data_limite}
                        excluirClick={()=>excluir(tarefa.idtarefas,tarefa.titulo)}
                        alterarClick={()=>alterar(tarefa.idtarefas,tarefa.titulo)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoTarefas;