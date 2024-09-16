import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { IoMdBookmarks } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { PiHandshake } from "react-icons/pi";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { BsFillDoorOpenFill } from "react-icons/bs";

import { Header } from '../../components/Header/index.jsx';
import { Footer } from '../../components/Footer/index.jsx';

import './style.css';
import '../../styles/global.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Home = () => {

  const img = [
    { id: 1, image: 'src/assets/banner.png' },
    { id: 2, image: 'src/assets/banner1.png' },
    { id: 3, image: 'src/assets/banner2.png' },
    // { id: 4, image: 'src/assets/construcao-civil-tendencias.webp' },
    // { id: 5, image: 'src/assets/silhuetas-do-local-de-construcao.avif' },

  ];

  return (
    <>
      <Header />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{ delay: 6000 }}
      >

        {img.map((item) => (
          <SwiperSlide key={item.id}>
            <img className='banner' src={item.image} alt={`Slide ${item.id}`} />
          </SwiperSlide>
        ))}

        {/* <SwiperSlide className='banner-html banner-1'>
          <div>
            <h1>Titulo</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima iure excepturi et distinctio voluptas, nisi, sequi, explicabo tempora perferendis magnam quidem in unde modi? Asperiores modi porro corporis rem.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla, non quo debitis libero explicabo excepturi cumque provident mollitia in distinctio tempore quam iure consequuntur quibusdam illum voluptate laborum maiores!</p>
          </div>
        </SwiperSlide>

        <SwiperSlide className='teste2'>
          <div>
            <h1>Titulo</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima iure excepturi et distinctio voluptas, nisi, sequi, explicabo tempora perferendis magnam quidem in unde modi? Asperiores modi porro corporis rem.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla, non quo debitis libero explicabo excepturi cumque provident mollitia in distinctio tempore quam iure consequuntur quibusdam illum voluptate laborum maiores!</p>
          </div>
        </SwiperSlide> */}

      </Swiper>

      <section>

        <main>

          <div className='info-container'>
            <ul>
              <li>
                <IoMdBookmarks className='icon' color='#2cc76a' />
                <h3>Historia</h3>
                <p>
                  A Material Share é um projeto social, criado em 2024,
                  por alunos do Instituto Tecnológico de Barueri (ITB) do Jardim Belval,
                  para um Trabalho de Conclusão de Curso (TCC).
                </p>
              </li>
              <li>
                <TbTargetArrow className='icon' color='#ef3f29' />
                <h3>Objetivo</h3>
                <p>
                  O objetivo principal da Material Share é a redução do desperdício de materiais de construçao,
                  ajudando assim preferencialmente pessoas de baixa renda, com a construção de suas casas.
                  Mas não se limitando somente a pessoas de baixa renda mais tâmbem qualquer pessoa que necessite de materias de construção,
                  mas dando preferência a pessoas de baixa renda.
                </p>
              </li>
              <li>
                <PiHandshake className='icon' color='#3737a3' />
                <h3>Auxilios</h3>
                <p>
                  Os nossos principais auxilios ultimamente são escolares, de professores que nos auxiliam como desenvolver o nosso projeto.
                  Você tâmbem pode ajudar a fazer o projeto crescer, basta nos enviar sugestões de melhorias, etc.
                </p>
              </li>
            </ul>
          </div>

          <div className='abaixar-app'>
            <IoLogoGooglePlaystore size={80} color='#08b834' />
            <p>Abaixe já o nosso aplicativo na PlayStore,<br />  para utilizar os benefícios do nosso projeto, clicando <a href='https://play.google.com/store/games' target='_blank'>aqui.</a></p>
          </div>

          <div className='efetuar-login'>
            <BsFillDoorOpenFill size={80} color='#203874' />
            <p>Efetue login ou crie uma conta para <br /> utilizar os benefícios do projeto</p>
          </div>

        </main>

      </section>

      <Footer />
    </>
  );
};
