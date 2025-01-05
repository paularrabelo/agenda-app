import * as enums from '../utils/enums/Tarefa'

class Tarefa {
  nome: string
  status: enums.Status
  contato: string
  email: string
  id: number

  constructor(
    nome: string,
    status: enums.Status,
    contato: string,
    email: string,
    id: number
  ) {
    this.nome = nome
    this.status = status
    this.contato = contato
    this.email = email
    this.id = id
  }
}

export default Tarefa
