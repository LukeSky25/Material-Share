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

  const handleSubmit = (e) => {

    e.preventDefault();
    alert('Enviado');

  };

  return (
    <>

      <User />

      <ChakraProvider>

        <section>

          <main>

            <h1 className='titulo'>Configurações</h1>

            <FormControl display="flex" flexDir="column" gap="4">
              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                  <Input id="nome" />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="nasc">Data de Nascimento</FormLabel>
                  <Input id="nasc" type="date" />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="Tefone">Telefone</FormLabel>
                  <Input id="Tefone" type="number" />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <Input id="cpf" type="text" />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="cel">CEP</FormLabel>
                  <Input id="cep" type="text" />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input id="email" type="email" />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="senha">Senha</FormLabel>
                  <Input id="senha" type="password" />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="endereco">Endereço</FormLabel>
                  <Input id="endereco" />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="complemento">Complemento</FormLabel>
                  <Input id="complemento" />
                </Box>

              </HStack>
              <HStack spacing="4">

                <Box w="100%">
                  <FormLabel htmlFor="numero">Numero</FormLabel>
                  <Input id="numero" />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="cidade">Cidade</FormLabel>
                  <Input id="cidade" />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="estado">Estado</FormLabel>
                  <Input id="estado" />
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
                  onClick={handleSubmit} d
                >
                  Editar
                </Button>
              </HStack>
            </FormControl>

          </main>

        </section>

      </ChakraProvider>

      <Footer />

    </>
  );

};
