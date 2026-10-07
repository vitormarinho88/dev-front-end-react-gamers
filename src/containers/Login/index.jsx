import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Logo from '../../assets/gamers.svg';
import { Button } from '../../components/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  Container,  
  Form, 
  InputContainer, 
  LeftContainer, 
  RightContainer,
  Title,
  Link,
 } from './styles.js';

import { api } from '../../services/api.js';



 
export function Login() {
  
  const navigate = useNavigate();


  const schema = yup.object({
  email:yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatorio'),
  password:yup.string().min(6 , 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
  }).required();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors); 

  const onSubmit = async (data) => {
      const response = await toast.promise(
      api.post('/sessions', {
      email: data.email,
      password: data.password,
    }),
    {
       pending: 'Verificando seus dados ',
       success: {
        render() {
          setTimeout(() => {
            navigate('/Home');
          }, 2000);
          return 'Seja Bem-Vindo(a)';
        },
      },
      error: 'Email ou Senha incorretos',

    },
    
   ); 
      console.log(response);
  };
  
  
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-Gamers" />
      </LeftContainer>
     <RightContainer>
      <Title>
        Olá , seja bem vindo a <span>Gamers !</span> 
        <br />
        Acesse com seu <span>Login e senha</span>
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')}/>
            <p>{errors?.email?.message}</p> 
          </InputContainer>
          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')}/>
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">🕹️</Button>  
      </Form>
       <p>
        Não possui conta? <Link to='/cadastro'>Clique aqui.</Link> 
       </p>
     </RightContainer>
    </Container>

  )
}

//? => elvis operator , é como se fosse um if. 


