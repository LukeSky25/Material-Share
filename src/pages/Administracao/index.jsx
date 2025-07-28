import { FaEdit } from "react-icons/fa";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Adm-Sidebar/Header";

import "./style.css";

export const Administracao = () => {
  return (
    <>
      <Header />

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
                  <div className="adm-b">
                    <th className="none_table">
                      <div className="add_adm_b"></div>
                      <button className="add_b">
                        <span className="add_adm">+</span> Adicionar
                      </button>
                    </th>
                  </div>
                </tr>
              </thead>
              <tbody>
                <tr className="adms">
                  <td>1</td>
                  <td>Nome1</td>
                  <td>Usuário1</td>
                  <td>Sim</td>
                  <td className="adm_acoes">
                    <button className="adm_exclude_b">Excluir</button>
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
