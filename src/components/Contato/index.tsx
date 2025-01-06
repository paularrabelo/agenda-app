import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, editar, alteraStatus } from '../../store/reducers/contatos'
import ContatoClass from '../../models/Contato'
import { Botao, BotaoSalvar } from '../../styles'

import * as enums from '../../utils/enums/Contato'

type Props = ContatoClass

const Contato = ({
  nome,
  status,
  contato: contatoOriginal,
  email: emailOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEdiatando, setEstaEditando] = useState(false)
  const [esteContato, setContato] = useState('')
  const [esteEmail, setEmail] = useState('')

  useEffect(() => {
    if (contatoOriginal.length > 0) {
      setContato(contatoOriginal)
    }
  }, [contatoOriginal])

  useEffect(() => {
    if (emailOriginal.length > 0) {
      setEmail(emailOriginal)
    }
  }, [emailOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setContato(contatoOriginal)
    setEmail(emailOriginal)
  }

  function alteraStatusContato(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        favoritado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={nome}>
        <input
          type="checkbox"
          id={nome}
          checked={status === enums.Status.FAVORITO}
          onChange={alteraStatusContato}
        />
        <S.Nome>
          {estaEdiatando && <em>Editando: </em>}
          {nome}
        </S.Nome>
      </label>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Dados
        disabled={!estaEdiatando}
        value={esteContato}
        onChange={(evento) => setContato(evento.target.value)}
      />
      <S.Dados
        disabled={!estaEdiatando}
        value={esteEmail}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEdiatando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    nome,
                    status,
                    contato: contatoOriginal,
                    email: emailOriginal,
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

export default Contato
