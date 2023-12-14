// Importando estilos (comentado para evitar erro de importação)
// import "../css/ItemLista.css";
// Componente funcional ItemLista para renderizar cada item da lista de tarefas
const ItemLista = ({
    id,
    titulo,
    descricao,
    status,
    data_criacao,
    data_limite,
    excluirClick,
    alterarClick
}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{titulo}</td>
            <td>{descricao}</td>
            <td>{status}</td>
            <td>{data_criacao}</td>
            <td>{data_limite}</td>
            <td className="text-center">
                {/* Ícone de exclusão com evento de clique para chamar a função de exclusão */}
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
                {/* Ícone de alteração com evento de clique para chamar a função de alteração */}
                <i className="altera text-success fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#10132;</i>
            </td>
        </tr>
    );
};

export default ItemLista;
