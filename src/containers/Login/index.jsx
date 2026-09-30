import Logo from '../../assets/gamers.svg';
import { Container, 
  Button, 
  Form, 
  InputContainer, 
  LeftContainer, 
  Link,
  RightContainer,
  Title
 } from './styles.js';


 export function Login() {
  
  
  
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-Gamers" />
      </LeftContainer>
     <RightContainer>
      <Title>
        Olá , seja bem vindo a <span>Gamers !</span> Acesse com <span>Login e senha</span>
      </Title>
      <Form>
          <InputContainer>
            <label>Email</label>
            <input type="text" />
          </InputContainer>
          <InputContainer>
            <label>Senha</label>
            <input type="password" />
          </InputContainer>
          <Link>Esqueci minha senha.</Link>
          <Button>Entrar</Button>
      </Form>
      <Link>Não possui conta ? Clique aqui.</Link>
     </RightContainer>
    </Container>
  
 
   

  )
}


//export default Login;