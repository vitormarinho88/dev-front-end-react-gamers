import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ImageIcon } from '@phosphor-icons/react';
import { api } from '../../../services/api.js';
import { useEffect, useState } from 'react';
import {
  Container,
  ContainerCheckBox,
  Form,
  Input,
  InputGroup,
  LabelUploads,
  Label,
  Select,
  SubmitButton,
  ErrorMessage,
} from './styles.js';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';


const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .typeError('Digite um preço válido')
    .positive('O preço deve ser maior que zero')
    .required('Digite o preço do produto'),
  category: yup.object().nullable().required('Escolha uma categoria'),
  offer: yup.bool(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
 const navigate = useNavigate();

  const {
    state: { product },
  } = useLocation();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { onChange: onFileChange, ...fileRegister } = register('file');

  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append('name', data.name);
    productFormData.append('price', data.price);
    productFormData.append('category_id', data.category.id);
    productFormData.append('file', data.file[0]);
    productFormData.append('offer', data.offer);

    await toast.promise(api.put(`/products/${product.id}`, productFormData), {
      pending: 'Editando o produto...',
      success: 'Produto editado com sucesso',
      error: 'Falha ao editar o produto, tente novamente',
    });
  
 
     setTimeout(() => {
        navigate('/admin/produtos');
     }, 2000);

};

  
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input
            type="number"
            step="0.01"
            {...register('price')}
            defaultValue={product.price / 100}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUploads>
            <ImageIcon />
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...fileRegister}
              onChange={(e) => {
                setFileName(e.target.files[0]?.name);
                onFileChange(e);
              }}
            />
            {fileName || 'upload do produto'}
          </LabelUploads>

          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
                defaultValue={product.category}
              />
            )}
          />

          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <ContainerCheckBox>
            <input
              type="CheckBox"
              defaultChecked={product.offer}
              {...register('offer')}
            />
            <Label>Produto em Oferta ?</Label>
          </ContainerCheckBox>
        </InputGroup>

        <SubmitButton type="submit">Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
