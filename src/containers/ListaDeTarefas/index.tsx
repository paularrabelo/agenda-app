import { useSelector } from 'react-redux'

import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )
  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = itens.filter(
        (item) => item.nome.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeMensagem = (quantidade: number) => {
    let mensagem = ''
    const complemento =
      termo !== undefined && termo.length > 0 ? `e"${termo}"` : ''
    if (criterio === 'todos') {
      mensagem = `${quantidade} contato(s) encontrado(s) como: todos ${complemento}`
    } else {
      mensagem = `${quantidade} contato(s) encontrado(s) como: "${`${criterio} = ${valor}`}" ${complemento}`
    }
    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeMensagem(tarefas.length)
  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.nome}>
            <Tarefa
              email={t.email}
              nome={t.nome}
              status={t.status}
              contato={t.contato}
              id={t.id}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
