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



 
export function Register() {
  
  const navigate = useNavigate();

  const schema = yup.object({
  name: yup.string().required('O nome é Obrigatorio'),
  email:  
  yup.string()
  .email('Digite um e-mail válido')
  .required('O e-mail é obrigatorio'),
  password: 
  yup.string()
  .min(6 , 'A senha deve ter pelo menos 6 caracteres')
  .required('Digite uma senha'),
  confirmPassword:
  yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais')
  .required('Confirmar sua senha'),
 }) .required();

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
      const {status } = await api.post('/users', 
    {
      name: data.name,
      email: data.email,               ///body da requisição
      password: data.password,
    },
    {
      validateStatus: () => true,  ////Axios, considere qualquer status HTTP como uma resposta válida.Por padrão, o Axios considera alguns códigos HTTP como erro.
    },
   );
    
   if (status === 200 || status === 201) {
      setTimeout(() => {navigate('/Login'); }, 2000);
     toast.success('Conta criada com sucesso!');
    }else if (status === 409){
      toast.error('Email ja cadastrado! Faça o login para continuar');
    }else{
      throw new Error();
    }
   }catch  {
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
        Criar Conta
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>  
          <InputContainer>
            <label>Name</label>
            <input type="text" {...register('name')}/>
            <p>{errors?.name?.message}</p> 
          </InputContainer>
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
          <InputContainer>
            <label>Confirmar Senha</label>
            <input type="password" {...register('confirmPassword')}/>
            <p>{errors?.confirmPassword?.message}</p> 
          </InputContainer>
          <Button type="submit">Criar Conta</Button> 
      </Form>
       <p>
        Já possui conta? <Link to='/'>Clique aqui.</Link> 
       </p>
     </RightContainer>
    </Container>

  )
}

//? => elvis operator , é como se fosse um if. 


