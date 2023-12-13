import { useForm } from "react-hook-form";
import { api } from "./config_axios";
import { useState } from "react";

const CadastrarUsuario = () => {
    // Utilizando o hook useForm do react-hook-form para gerenciar o formulário
    const { register, handleSubmit } = useForm();
    // Utilizando o estado para controlar a exibição de mensagens de aviso
    const [aviso, setAviso] = useState("");

    // Função para lidar com o envio do formulário
    const salvar = async (campos) => {
        try {
            // Enviando uma solicitação para a API com os campos do formulário
            const response = await api.post("usuario", campos); // Aqui vai a rota
            // Atualizando o estado com uma mensagem de sucesso
            setAviso(`Usuário cadastrado com sucesso!`);
        } catch (error) {
            // Em caso de erro, exibindo uma mensagem de erro
            setAviso("Erro ao cadastrar usuário!");
        }
    }

    return (
        <div className="container">
            <h4 className="fst-italic mt-3">Cadastrar Usuário</h4>
            {/* Utilizando o formulário e associando a função de envio */}
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="usarname">Nome</label>
                    {/* Campo de entrada para o nome do usuário */}
                    <input type="text" className="form-control" id="usarname"
                        required autoFocus {...register("usarname")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="email">Email</label>
                    {/* Campo de entrada para o email do usuário */}
                    <input type="text" className="form-control" id="email"
                        required {...register("email")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="senha">Senha</label>
                    {/* Campo de entrada para a senha do usuário */}
                    <input type="password" className="form-control" id="senha"
                        required {...register("senha")} />
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

export default CadastrarUsuario;
