import { FaEdit } from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header2 } from "../../components/Header2";

import "./style.css";

export const Administracao = () => {
  return (
    <>
      <Header2 />

      <section>
        <main>
          <div className="container2">
            <h1 className="adm_h1">Administradores</h1>

            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Usuário</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="adms">
                  <td>1</td>
                  <td>Nome1</td>
                  <td>Usuário1</td>
                  <td>Sim</td>
                  <td className="adm_acoes">
                    <div className="adm_exclude_b">Excluir</div>
                    <FaEdit size={30} className="adm_edit" />
                  </td>
                </tr>

                <tr className="adms">
                  <td>1</td>
                  <td>Nome1</td>
                  <td>Usuário1</td>
                  <td>Sim</td>
                  <td>
                    <p></p>
                  </td>
                </tr>

                <tr className="adms">
                  <td>1</td>
                  <td>Nome1</td>
                  <td>Usuário1</td>
                  <td>Sim</td>
                  <td>
                    <p></p>
                  </td>
                </tr>

                <tr className="adms">
                  <td>1</td>
                  <td>Nome1</td>
                  <td>Usuário1</td>
                  <td>Sim</td>
                  <td>
                    <p></p>
                  </td>
                </tr>

                <tr className="adms">
                  <td>1</td>
                  <td>Nome1</td>
                  <td>Usuário1</td>
                  <td>Sim</td>
                  <td>
                    <p></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </section>

      <Footer />
    </>
  );
};
