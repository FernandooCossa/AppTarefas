//Componente para incluir livros no banco de dados
//declaração da função do componente IncluirLivros
import { useForm } from "react-hook-form";
import { api } from "./config_axios";
import { useState } from "react";
//register serve para definir os nomes dos campos do form (validações)
//handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
//form onSubmit={handleSubmit(salvar)}
const cadastrarUsuario = () => {
    const{ register, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");
    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {  
        try {
                    const response = await api.post("usuario", campos); // aqui vai a rota
                    setAviso(`usuario cadastrado com sucesso!"
                    ${response.data.id}`);
                } catch (error) {
                    setAviso("Erro ao cadastrar usuario!");
                }
    }
    //JSON.stringify() converte um objeto javascript para uma String JSON 
    //alert(JSON.stringify(campos));
    //lá no html puro usavamos titulo.value para pegar valor
    
    //aqui é o que vai ser exibido em tela
    return ( 
        <div className="container">
            <h4 className="fst-italic mt-3"> Cadastrar Usuario</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="usarname">Nome</label>
                    <input type="text" className="form-control" id="usarname"
                    required autoFocus {...register("usarname")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email"
                        required {...register("email")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="senha">Senha</label>
                        <input type="password" className="form-control" id="senha"
                        required {...register("senha")}/>
                </div>
            
                <input type="submit" className="btn btn-primary mt-3"
                value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3 ms-3"
                value="Limpar"/>
        </form>
        <div className="alert"></div>
        </div>
    )
}

export default cadastrarUsuario;