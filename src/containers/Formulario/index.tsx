import { BotaoSalvar, MainContainer, Titulo } from '../../styles'
import { Form, Opcoes } from './styles'
import { Campo } from '../../styles'

const Formulario = () => (
  <>
    <MainContainer>
      <Titulo>Nova Tarefa</Titulo>
      <Form>
        <Campo type="text" placeholder="Titulo" />
        <Campo as="textarea" placeholder="Descricao da tarefa" />
        <Opcoes>
          <p>Prioridade</p>
          <input name="prioridade" type="radio" id="urgente" />{' '}
          <label htmlFor="urgente">Urgente</label>
          <input name="prioridade" type="radio" id="importante" />{' '}
          <label htmlFor="importante">Importante</label>
          <input name="prioridade" type="radio" id="normal" />{' '}
          <label htmlFor="normal">Normal</label>
          <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
        </Opcoes>
      </Form>
    </MainContainer>
  </>
)

export default Formulario
