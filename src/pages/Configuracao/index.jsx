import { useState } from "react";
import { isEmail, isAlpha, isDate } from 'validator';
import { toast } from 'react-toastify';
import validarCpf from 'validar-cpf';
import { validators } from '@utils-fns/validators';

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

    if (!telefoneValidation(telefone)) {
      formErrors = true;
      toast.error('Número de Telefone Inválido');
    }

    if (!validarCpf(cpf)) {
      formErrors = true;
      toast.error('CPF Inválido');
    }

    if (!validators.cep(cep).isValid()) {
      formErrors = true;
      toast.error('CEP Inválido');
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

  const telefoneValidation = (telefone) => {
    //retira todos os caracteres menos os numeros
    telefone = telefone.replace(/\D/g, '');

    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
      //um for de 0 a 9.
      //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
      //caractere a ser repetido
      if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
      21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73,
      74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

    //  E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
    //ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
    //vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
    //até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
    //validados corretamente após esse período.
    //NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
    //Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
    //Caso queira, em 2017, é só tirar o if.

    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    //se passar por todas as validações acima, então está tudo certo
    return true;

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
