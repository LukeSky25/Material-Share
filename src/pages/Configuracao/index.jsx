// import { useState } from 'react';
// import { isEmail, isAlpha, isDate } from 'validator';
// import { toast } from 'react-toastify';
// import validarCpf from 'validar-cpf';
// import { validators } from '@utils-fns/validators';

import { Footer } from '../../components/Footer';
import { User } from '../User';

import './style.css';


export const Configuracao = () => {

  // const [nome, setNome] = useState('');
  // const [dataNascimento, setDataNascimento] = useState('');
  // const [telefone, setTelefone] = useState('');
  // const [cpf, setCpf] = useState('');
  // const [cep, setCep] = useState('');
  // const [email, setEmail] = useState('');
  // const [senha, setSenha] = useState('');

  // const handleSubmit = (e) => {

  //   e.preventDefault();

  //   let formErrors = false;

  //   if (!nome || !isAlpha(nome.split(' ').join(''))) {
  //     formErrors = true;
  //     toast.error('Nome Inválido');
  //   }

  //   if (!dataNascimento || !isDate(inverteData(dataNascimento))) {
  //     formErrors = true;
  //     toast.error('Data de Nascimento inválida');
  //   }

  //   if (!telefoneValidation(telefone)) {
  //     formErrors = true;
  //     toast.error('Número de Telefone Inválido');
  //   }

  //   if (!validarCpf(cpf)) {
  //     formErrors = true;
  //     toast.error('CPF Inválido');
  //   }

  //   if (!validators.cep(cep).isValid()) {
  //     formErrors = true;
  //     toast.error('CEP Inválido');
  //   }

  //   if (!isEmail(email)) {
  //     formErrors = true;
  //     toast.error('Email Inválido');
  //   }

  //   if (!senha) {
  //     formErrors = true;
  //     toast.error('Senha Inválida');
  //   }

  //   if (formErrors) return;

  //   toast.success('Ganhou no tigrinho');

  // };

  // const inverteData = (data) => data.split('/').reverse().join('/');

  // const telefoneValidation = (telefone) => {
  //   //retira todos os caracteres menos os numeros
  //   telefone = telefone.replace(/\D/g, '');

  //   //verifica se tem a qtde de numero correto
  //   if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  //   //Se tiver 11 caracteres, verificar se começa com 9 o celular
  //   if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

  //   //verifica se não é nenhum numero digitado errado (propositalmente)
  //   for (var n = 0; n < 10; n++) {
  //     //um for de 0 a 9.
  //     //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
  //     //caractere a ser repetido
  //     if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
  //   }
  //   //DDDs validos
  //   var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
  //     21, 22, 24, 27, 28, 31, 32, 33, 34,
  //     35, 37, 38, 41, 42, 43, 44, 45, 46,
  //     47, 48, 49, 51, 53, 54, 55, 61, 62,
  //     64, 63, 65, 66, 67, 68, 69, 71, 73,
  //     74, 75, 77, 79, 81, 82, 83, 84, 85,
  //     86, 87, 88, 89, 91, 92, 93, 94, 95,
  //     96, 97, 98, 99];
  //   //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
  //   if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

  //   //  E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
  //   //ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
  //   //vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
  //   //até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
  //   //validados corretamente após esse período.
  //   //NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
  //   //Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
  //   //Caso queira, em 2017, é só tirar o if.

  //   if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

  //   //se passar por todas as validações acima, então está tudo certo
  //   return true;

  // };

  return (
    <>

      <User />

      <section>

        <main>

          <h1 className='titulo'>Configurações da Conta</h1>

          {/* <form onSubmit={handleSubmit}>

  <label htmlFor="nome">Nome Completo</label>
  <div className='form-floating mb-3'>
    <input
      type="text"
      name='nome'
      value={nome}
      onChange={e => setNome(e.target.value)}
      placeholder='Digite seu Nome Completo...' />
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
      placeholder='Digite o seu Telefone' />
  </div>

  <label htmlFor="cpf">CPF</label>
  <div className='form-floating mb-3'>
    <input
      type="text"
      name='cpf'
      value={cpf}
      onChange={e => setCpf(e.target.value)}
      placeholder='Digite seu CPF...' />
  </div>

  <label htmlFor="cep">CEP</label>
  <div className='form-floating mb-3'>
    <input
      type="text"
      name='cep'
      value={cep}
      onChange={e => setCep(e.target.value)}
      placeholder='Digite seu CEP...' />
  </div>

  <label htmlFor="email">Email</label>
  <div className='form-floating mb-3'>
    <input
      type="text"
      name='email'
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder='Digite seu Email...' />
  </div>

  <label htmlFor="senha">Senha</label>
  <div className='form-floating mb-3'>
    <input
      type="password"
      name='senha'
      value={senha}
      onChange={e => setSenha(e.target.value)}
      placeholder='Digite sua Senha ...' />
    <button type='submit'>Entrar</button>
  </div>
</form> */}

          <form className="row g-1 user-form">
            <div className="col-md-3">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input
                type="date"
                name='d-nas'
                className='className="form-control"'
              // value={dataNascimento}
              // onChange={e => setDataNascimento(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-5 endereco">
              <label htmlFor="inputAddress" className="form-label">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputCity" className="form-label">City</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="col-md-2">
              <label htmlFor="inputState" className="form-label">State</label>
              <select id="inputState" className="form-select">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-1">
              <label htmlFor="inputZip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </form>

        </main>

      </section>

      <Footer />



    </>
  );

};
