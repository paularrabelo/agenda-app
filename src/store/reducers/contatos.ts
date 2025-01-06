import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'
import * as enums from '../../utils/enums/Contato'

type ContatosState = {
  itens: Contato[]
}

const initialState: ContatosState = {
  itens: [
    {
      nome: 'Teste sobrenome',
      email: 'teste@teste.com',
      status: enums.Status.NORMAL,
      contato: '37999999999',
      id: 1
    },
    {
      nome: 'Teste sobrenome',
      email: 'teste@teste.com',
      status: enums.Status.NORMAL,
      contato: '37999999999',
      id: 2
    },
    {
      nome: 'Teste sobrenome',
      email: 'teste@teste.com',
      status: enums.Status.FAVORITO,
      contato: '37999999999',
      id: 3
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState: initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLocaleLowerCase()
      )

      if (contatoJaExiste) {
        alert('Ja existe um contato com esse nome')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]
        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDoContato = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato].status = action.payload.finalizado
          ? enums.Status.FAVORITO
          : enums.Status.NORMAL
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } =
  contatosSlice.actions
export default contatosSlice.reducer
