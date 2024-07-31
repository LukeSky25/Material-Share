import { Link } from 'react-router-dom';
import { useState } from 'react';
import { isEmail, isAlpha, isDate } from 'validator';
import { toast } from 'react-toastify';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

import './style.css';
import '../../styles/global.css';


export const Register = () => {

  const [ nome, setNome ] = useState('');
  const [ dataNascimento, setDataNascimento ] = useState('');
  const [ telefone, setTelefone ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();

    let formErrors = false;

    if(!nome || !isAlpha(nome)) {
      formErrors = true;
      toast.error('Nome Inválido');
    }



    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email Inválido');
    }

    if (!senha) {
      formErrors = true;
      toast.error('Senha Inválida');
    }

    if (formErrors) return;

    toast.success('Ganhou no tigrinho');

  };


  return (

    <>

      <Header />

        <section>

        <h1>Cadastro</h1>

        <form onSubmit={handleSubmit}>

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
             type="text"
             name='d-nas'
             value={dataNascimento}
             onChange={e => setDataNascimento(e.target.value)}
             placeholder='Digite sua Data de Nascimento...'
             />
          </div>

          <label htmlFor="tel">Telefone</label>
          <div className='form-floating mb-3'>
            <input
             type="tel"
             name='tel'
             value={telefone}
             onChange={e => setTelefone(e.target.value)}
             placeholder='Digite seu CPF...' />
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
        </form>

        <span>Já tem uma conta?,<br/> entre já clicando <Link to={'/login'}>aqui!</Link></span>

        </section>

      <Footer />

    </>

  );

};
