import { useState } from "react";
import { isEmail, isAlpha, isDate } from 'validator';
import { toast } from 'react-toastify';
import validarCpf from 'validar-cpf';
import axios from "axios";

import {
  Box,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";

import { Footer } from '../../components/Footer';
import { User } from '../../components/Navbar';

import './style.css';

export const Configuracao = () => {

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');


  const handleSubmit = (e) => {

    e.preventDefault();
    let formErrors = false;

    if (!nome || !isAlpha(nome.split(' ').join(''))) {
      formErrors = true;
      toast.error('Nome Inválido');
    }

    if (!dataNascimento || !isDate(inverteData(dataNascimento))) {
      formErrors = true;
      toast.error('Data de Nascimento inválida');
    }

    if (!isValidPhone(telefone)) {
      formErrors = true;
    }

    if (!validarCpf(cpf)) {
      formErrors = true;
      toast.error('CPF Inválido');
    }

    if (!validaCep(cep)) {
      formErrors = true;
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email Inválido');
    }

    if (!senha) {
      formErrors = true;
      toast.error('Senha Inválida');
    }

    if (!complemento) {
      formErrors = true;
      toast.error('Complemento Invślido');
    }

    if (!numero || isNaN(numero)) {
      formErrors = true;
      toast.error('Número Inválido');
    }

    if (formErrors) return;

    toast.success('Edição Realizada com Sucesso !!!');

  };

  const inverteData = (data) => data.split('/').reverse().join('/');

  const isValidPhone = (valor) => {
    // Expressão regular que não permite caracteres especiais e exige formato específico
    const phoneRegex = /^\+?\d{1,3}\d{10}$/;

    if (!phoneRegex.test(valor)) {
      toast.error("O número de telefone fornecido é inválido.");
    }
  };

  const validaCep = async (cep) => {
    try {
      const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);

      console.log(response);

    } catch (e) {
      toast.error('CEP Inválido');
    }

  };

  return (
    <>

      <User />

      <ChakraProvider>

        <section>

          <main>

            <h1 className='titulo'>Configurações</h1>

            <FormControl className="form-principal" flexDir="column" gap="4">
              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Digite seu Nome Completo...'
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="nasc">Data de Nascimento</FormLabel>
                  <Input
                    id="nasc"
                    type="date"
                    value={dataNascimento}
                    onChange={e => setDataNascimento(e.target.value)}
                  />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="Tefone">Telefone</FormLabel>
                  <Input
                    id="Tefone"
                    type="number"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    placeholder='Digite o seu Telefone'
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <Input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    placeholder='Digite seu CPF...'
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="cel">CEP</FormLabel>
                  <Input
                    id="cep"
                    type="text"
                    value={cep}
                    onChange={e => setCep(e.target.value)}
                    placeholder='Digite seu CEP...'
                  />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Digite seu Email...'
                  />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="senha">Senha</FormLabel>
                  <Input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder='Digite sua Senha ...'
                  />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="endereco">Endereço</FormLabel>
                  <Input
                    id="endereco"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                    disabled
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="complemento">Complemento</FormLabel>
                  <Input
                    id="complemento"
                    value={complemento}
                    onChange={e => setComplemento(e.target.value)}
                    placeholder="Digite o complemento do seu endereço ..."
                  />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="numero">Numero</FormLabel>
                  <Input
                    id="numero"
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                    placeholder="Digite o número da sua casa ou apartamento"
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="cidade">Cidade</FormLabel>
                  <Input
                    id="cidade"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    disabled
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="estado">Estado</FormLabel>
                  <Input
                    id="estado"
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    disabled
                  />
                </Box>

              </HStack>
              <HStack justify="center">
                <Button
                  w={240}
                  p="6"
                  bg="#203874"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ opacity: '0.9' }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Editar
                </Button>
              </HStack>
            </FormControl>

          </main>

          <div className="form-responsivo">
            <form className='register' onSubmit={handleSubmit}>

              <label htmlFor="nome">Nome Completo</label>
              <div className='form-floating mb-3'>
                <input
                  type="text"
                  name='nome'
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder='Digite seu Nome Completo...'
                />
              </div>

              <label htmlFor="d-nas">Data de Nascimento</label>
              <div className='form-floating mb-3 c-f'>
                <input
                  type="date"
                  name='d-nas'
                  value={dataNascimento}
                  onChange={e => setDataNascimento(e.target.value)}
                />
              </div>

              <label htmlFor="tel">Telefone</label>
              <div className='form-floating mb-3'>
                <input
                  type="tel"
                  name='tel'
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                  placeholder='Digite o seu Telefone'
                />
              </div>

              <label htmlFor="cpf">CPF</label>
              <div className='form-floating mb-3'>
                <input
                  type="text"
                  name='cpf'
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  placeholder='Digite seu CPF...'
                />
              </div>

              <label htmlFor="cep">CEP</label>
              <div className='form-floating mb-3'>
                <input
                  type="text"
                  name='cep'
                  value={cep}
                  onChange={e => setCep(e.target.value)}
                  placeholder='Digite seu CEP...'
                />
              </div>

              <label htmlFor="email">Email</label>
              <div className='form-floating mb-3'>
                <input
                  type="text"
                  name='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Digite seu Email...'
                />
              </div>

              <label htmlFor="senha">Senha</label>
              <div className='form-floating mb-3'>
                <input
                  type="password"
                  name='senha'
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder='Digite sua Senha ...'
                />
              </div>

              <label htmlFor="endereco">Endereço</label>
              <div className='form-floating mb-3'>
                <input
                  id="endereco"
                  value={endereco}
                  onChange={e => setEndereco(e.target.value)}
                  disabled
                />
              </div>

              <label htmlFor="complemento">Complemento</label>
              <div className='form-floating mb-3'>
                <input
                  id="complemento"
                  value={complemento}
                  onChange={e => setComplemento(e.target.value)}
                  placeholder="Digite o complemento do seu endereço ..."
                />
              </div>

              <label htmlFor="numero">Numero</label>
              <div className='form-floating mb-3'>
                <input
                  id="numero"
                  value={numero}
                  onChange={e => setNumero(e.target.value)}
                  placeholder="Digite o número da sua casa ou apartamento"
                />
              </div>

              <label htmlFor="cidade">Cidade</label>
              <div className='form-floating mb-3'>
                <input
                  id="cidade"
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  disabled
                />
              </div>

              <label htmlFor="estado">Estado</label>
              <div className='form-floating mb-3'>
                <input
                  id="estado"
                  value={estado}
                  onChange={e => setEstado(e.target.value)}
                  disabled
                />
              </div>

              <button type='submit'>Entrar</button>

            </form>
          </div>

        </section >

      </ChakraProvider >

      <Footer />

    </>
  );

};
