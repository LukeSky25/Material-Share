import { Footer } from '../../components/Footer';
import { User } from '../../components/Navbar';
import { FcOk } from "react-icons/fc";
// import { TbAlertOctagon } from "react-icons/tb";

import './style.css';

export const Notificacao = () => {

  const notificacao = {
    isActive: true,
    notificacoes: ['11/09/2024 14:14:30', 'Lucas', 'Sei lá é só um teste', '<FcOk size={35} />']
  };


  return (
    <>
      <User />

      <section>

        <main>

          <h1 className='title'>Notificações</h1>




          {notificacao.isActive ? (
            <>
              <div className='container'>

                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Responsável</th>
                      <th>Descrição</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr className='notificacao'>
                      <td className='data'>00/00/0000 00:00:00</td>
                      <td className='responsavel'>The Rock</td>
                      <td className='status'>Doação recebida com sucesso !!!</td>
                      <td><FcOk size={35} /></td>
                    </tr>

                    <tr className='notificacao'>
                      <td>00/00/0000 00:00:00</td>
                      <td>Tigrinho</td>
                      <td>Doação recebida com sucesso !!!</td>
                      <td><FcOk size={35} /></td>
                    </tr>

                    <tr className='notificacao'>
                      <td>00/00/0000 00:00:00</td>
                      <td>Cariani</td>
                      <td>Doação recebida com sucesso !!!</td>
                      <td><FcOk size={35} /></td>
                    </tr>

                    <tr className='notificacao'>
                      <td>00/00/0000 00:00:00</td>
                      <td>Manoel Gomes das canetas bic com cor azul</td>
                      <td>Doação recebida com sucesso !!!, caneta azul azul caneta. caneta azul azul caneta.</td>
                      <td><FcOk size={35} /></td>
                    </tr>

                    <tr className='notificacao'>
                      <td>{notificacao.notificacoes[0]}</td>
                      <td>{notificacao.notificacoes[1]}</td>
                      <td>{notificacao.notificacoes[2]}</td>
                      <td><FcOk size={35} /></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h3>Sem nenhuma notificação por enquanto</h3>
          )}

        </main>

      </section>

      <Footer />
    </>
  );
};
