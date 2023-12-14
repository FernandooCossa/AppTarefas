import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "./config_axios.js";
import ItemLista from "./ItemLista.jsx";  

const ManutencaoTarefas = () => {
    // Utilizando o hook useForm do react-hook-form para gerenciar o formulário
    const { register, handleSubmit, reset } = useForm();
    // Utilizando o estado para guardar e setar as informações do objeto
    const [tarefas, setTarefas] = useState([]);

    // Função para obter a lista de tarefas da API
    const obterLista = async () => {
        try {
            const lista = await api.get("tarefa");
            setTarefas(lista.data);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }
    
    // Define o método que será executado assim que o componente for renderizado
    useEffect(() => {
        obterLista();
    }, []);

    // Função para filtrar a lista de tarefas com base na palavra-chave
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

    // Função para excluir uma tarefa
    const excluir = async (id, titulo) => {
        if (!window.confirm(`Confirma a exclusão da Tarefa ${titulo}?`)) {
            return;
        }
        try {
            await api.delete(`tarefa/${id}`);
            // Atualize o estado local para refletir a exclusão
            setTarefas(tarefas => tarefas.filter(tarefa => tarefa.idtarefas !== id));
        } catch (error) {
            alert(`Erro: Não foi possível excluir a tarefa ${titulo}: ${error}`);
        }
    }
    

    // Função para alterar o status de uma tarefa
    const alterar = async (id, titulo) => {
        const novoStatus = prompt(`Digite o novo status da tarefa ${titulo}`);
        if (novoStatus === "" || novoStatus === null) {
            alert('Digite um status válido! (status em branco)');
            return;
        }
        try {
            // Chamando o backend e passando os dados
            await api.put(`tarefa/${id}`, { status: novoStatus });

            // Atualizando a lista de tarefas
            obterLista();
            // Recarregar a página para atualizar a lista
        } catch (error) {
            alert(`Erro: Não foi possível alterar a tarefa ${titulo}: ${error}`);
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
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => { reset({ palavra: "" }); obterLista(); }} />
                        </div>
                    </form>
                </div>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Título</th>
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
                            excluirClick={() => excluir(tarefa.idtarefas, tarefa.titulo)}
                            alterarClick={() => alterar(tarefa.idtarefas, tarefa.titulo)} 
                        />
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default ManutencaoTarefas;
