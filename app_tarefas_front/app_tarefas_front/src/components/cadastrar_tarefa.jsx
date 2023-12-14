import { useForm } from "react-hook-form";
import { api } from "./config_axios";
import { useState } from "react";

const CadastrarTarefas = () => {
    // Utilizando o hook useForm do react-hook-form para gerenciar o formulário
    const { register, handleSubmit } = useForm();
    // Utilizando o estado para controlar a exibição de mensagens de aviso
    const [aviso, setAviso] = useState("");

    // Função para lidar com o envio do formulário
    const salvar = async (campos) => {
        try {
            // Enviando uma solicitação para a API com os campos do formulário
            const response = await api.post("tarefa", campos); // Aqui vai a rota
            // Atualizando o estado com uma mensagem de sucesso
            setAviso(`Tarefa incluída com sucesso!`);
        } catch (error) {
            // Em caso de erro, exibindo uma mensagem de erro
            setAviso("Erro ao incluir tarefa!");
        }
    }

    return (
        <div className="container">
            <h4 className="fst-italic mt-3">Cadastrar Tarefas</h4>
            {/* Utilizando o formulário e associando a função de envio */}
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    {/* Campo de entrada para o título */}
                    <input type="text" className="form-control" id="titulo"
                        required autoFocus {...register("titulo")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="descricao">Descrição</label>
                    {/* Campo de entrada para a descrição */}
                    <input type="text" className="form-control" id="descricao"
                        required {...register("descricao")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="status">Status:</label>
                    {/* Campo de entrada para o status */}
                    <input type="text" className="form-control" id="status"
                        required {...register("status")} />
                </div>
                <div className="col-sm-8">
                    <div className="form-group">
                        <label htmlFor="data_criacao">Data de Criação</label>
                        {/* Campo de entrada para a data de criação */}
                        <input type="date" className="form-control"
                            id="data_criacao" required {...register("data_criacao")}></input>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="form-group">
                        <label htmlFor="data_limite">Data Limite:</label>
                        {/* Campo de entrada para a data limite */}
                        <input type="date" className="form-control"
                            id="data_limite" step="0.01" required {...register("data_limite")}></input>
                    </div>
                </div>
                {/* Botão de envio e botão de limpar o formulário */}
                <input type="submit" className="btn btn-primary mt-3"
                    value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3 ms-3"
                    value="Limpar" />
            </form>
            {/* Exibição da mensagem de aviso */}
            <div className="alert">{aviso}</div>
        </div>
    );
}

export default CadastrarTarefas;
