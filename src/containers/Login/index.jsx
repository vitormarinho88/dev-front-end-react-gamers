import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Logo from '../../assets/gamers.svg';
import { Button } from '../../components/Button';
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
  try {
    const response =  await api.post('/sessions',      
      { email: data.email, 
        password: data.password 
      },
      { validateStatus: () => true }
    );

    if (response.status === 200 || response.status === 201) {
       
      const { token } = response.data;

      localStorage.setItem('token', token);
    
      toast.success('Seja Bem-Vindo(a)');
      setTimeout(() => navigate('/Home'), 2000);
    } else if (response.status === 401 || response.status === 409) {
      toast.error('Email ou Senha incorretos');
    } else {
      throw new Error();
    }
  } catch {
    toast.error('Falha no Sistema! Tente Novamente');
  }
   
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


