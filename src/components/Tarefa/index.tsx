import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'

import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({ nome: nomeOriginal, status, contato, email, id }: Props) => {
  const dispatch = useDispatch()
  const [estaEdiatando, setEstaEditando] = useState(false)
  const [esteContato, setContato] = useState('')

  useEffect(() => {
    if (nomeOriginal.length > 0) {
      setContato(nomeOriginal)
    }
  }, [nomeOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setContato(nomeOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={nomeOriginal}>
        <input
          type="checkbox"
          id={nomeOriginal}
          checked={status === enums.Status.FAVORITO}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEdiatando && <em>Editando: </em>}
          {nomeOriginal}
        </S.Titulo>
      </label>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEdiatando}
        value={esteContato}
        onChange={(evento) => setContato(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEdiatando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    nome: nomeOriginal,
                    status,
                    contato,
                    email,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarOuRemover onClick={() => cancelarEdicao()}>
              Cancelar
            </S.BotaoCancelarOuRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarOuRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarOuRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
