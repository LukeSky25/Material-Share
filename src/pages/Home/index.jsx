import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

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
    { id: 1, image: 'src/assets/construcao-civil-tendencias.webp' },
    { id: 2, image: 'src/assets/silhuetas-do-local-de-construcao.avif' }
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

            <SwiperSlide className='teste'>
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
            </SwiperSlide>

          </Swiper>

        <section>

          <main>



          </main>

        </section>

      <Footer />
    </>
  );
};
