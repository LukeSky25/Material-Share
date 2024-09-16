import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Footer } from '../../components/Footer';
import { User } from '../../components/Navbar';

import './style.css';

export const Avaliacao = () => {

  const navigate = useNavigate();

  const [avaliacao, setAvaliacao] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  let rating_msg = '';

  switch (rating) {
    case 1:
      rating_msg = 'Ruim';
      break;
    case 2:
      rating_msg = 'Muito a Melhorar';
      break;
    case 3:
      rating_msg = 'Médio';
      break;
    case 4:
      rating_msg = 'Bom';
      break;
    case 5:
      rating_msg = 'Perfeito';
      break;

    default:
      break;
  }

  const handleLogout = (e) => {

    e.preventDefault();

    if (rating_msg === '' || avaliacao === '') {
      toast.error('Avaliação Incorreta');
      return;
    }

    toast.success('Muito obrigado!!!');
    toast.success('Avaliação enviada com sucesso');
    navigate('/');

  };

  return (
    <>

      <User />

      <section>
        <main>
          <h1 className='title'>Avaliação</h1>
          <h5 className='title'>Nos Ajude a Melhorar <FaPlus className='icon' color='green' size={25} /><FaPlus color='green' size={25} /> o Projeto!!!</h5>
          <p>Faça uma avaliação geral do projeto e escreva <br /> explicando os pontos positivos, negativos e sugestões para o nosso projeto.</p>
          <div className='stars'>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label className='star-rating' key={`star-rating-${index}`}>
                  <input
                    type="radio"
                    className='rating'
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <FaStar
                    className='star'
                    size={45}
                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            <p className='doa'>{rating_msg}</p>
          </div>
          <form>
            <textarea
              className="avaliacao"
              value={avaliacao}
              onChange={e => setAvaliacao(e.target.value)}
            ></textarea>
            <p className='doa'>Ajude o projeto com uma <FaStar className='icon' size={25} color='#ffc107' /> <a className='gold' href={'https://github.com/LukeSky25/Material-Share'} target='_blank'>no GitHub</a></p>
            <button className='submit' type='submit' onClick={handleLogout} >Enviar Avaliação</button>
          </form>
        </main>
      </section>

      <Footer />
    </>
  );

};
