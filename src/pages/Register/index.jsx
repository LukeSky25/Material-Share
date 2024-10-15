import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmail, isAlpha, isDate } from 'validator';
import { toast } from 'react-toastify';
import validarCpf from 'validar-cpf';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import * as actions from '../../store/modules/auth/actions';

import './style.css';
import '../../styles/global.css';

export const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [t_user, setT_user] = useState('');

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

    if (!validarCep(cep)) {
      formErrors = true;
      toast.error('CEP Inválido');
    } else {
      formErrors = false;
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email Inválido');
    }

    if (!senha) {
      formErrors = true;
      toast.error('Senha Inválida');
    }

    if (t_user == '') {
      formErrors = true;
      toast.error('Selecione um dos tipos de usuario para continuar');
    }

    if (formErrors) return;

    toast.success('Conta criada com sucesso!!!');
    navigate('/');

    dispatch(actions.createSuccess());

  };

  const inverteData = (data) => data.split('/').reverse().join('/');

  const isValidPhone = (valor) => {
    // Expressão regular que não permite caracteres especiais e exige formato específico
    const phoneRegex = /^\+?\d{1,3}\d{10}$/;

    if (!phoneRegex.test(valor)) {
      toast.error("O número de telefone fornecido é inválido.");
    }
  };

  const validarCep = (cep) => {

    if (!cep) return false;

    // Remove qualquer caractere que não seja número
    const cepLimpo = cep.replace(/\D/g, '');

    // Verifica se o CEP tem exatamente 8 dígitos
    const cepValido = /^[0-9]{8}$/.test(cepLimpo);


    if (!cepValido) return false;

    return buscarCep(cep);
  };

  const buscarCep = async (cep) => {
    try {

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error('CEP inválido');
      }

    } catch (error) {
      toast.error('ERRO!!!');
    }
  };


  return (

    <>

      <Header />

      <section>

        <h1>Cadastro</h1>

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

          <label htmlFor="t_user">Tipo de Usuário</label>
          <div className='form-floating mb-3'>
            <select
              className='t_user'
              value={t_user}
              onChange={e => setT_user(e.target.value)}
            >
              <option value="" disabled >Escolha seu tipo de usuário</option>
              <option value="DOADOR">Doador</option>
              <option value="BENEFICIADO">Beneficiado</option>
            </select>
            <button type='submit'>Entrar</button>
          </div>

        </form>

        <span>Já tem uma conta?,<br /> entre já clicando <Link to={'/login'}>aqui!</Link></span>

      </section>

      <Footer />

    </>

  );

};
