import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ImageIcon } from '@phosphor-icons/react';
import { api } from '../../../services/api.js';
import { useEffect, useState } from 'react';
import {
  Container,
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

const MAX_SIZE = 5 * 1024 * 1024;

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .typeError('Digite um preço válido')
    .positive('O preço deve ser maior que zero')
    .required('Digite o preço do produto'),
  category: yup.object().nullable().required('Escolha uma categoria'),
  file: yup
    .mixed()
    .test('required', 'Escolha um arquivo para continuar', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'Carregue arquivos até 5mb', (value) => {
      return value && value.length > 0 && value[0].size <= MAX_SIZE;
    })
    .test('type', 'Carregue apenas imagens PNG ou JPEG', (value) => {
      return (
        value &&
        value.length > 0 &&
        ['image/jpeg', 'image/png'].includes(value[0].type)
      );
    }),
});

export function NewProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

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
    reset,
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

    try {
      await toast.promise(api.post('/products', productFormData), {
        pending: 'Adicionando o produto...',
        success: 'Produto criado com sucesso',
        error: 'Falha ao adicionar o produto, tente novamente',
      });

      reset();
      setFileName(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" step="0.01" {...register('price')} />
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
            defaultValue={null}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
              />
            )}
          />

          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <SubmitButton type="submit">Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}

