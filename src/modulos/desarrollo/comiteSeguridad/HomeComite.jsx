import React from "react";
import { useState } from "react";
import LayoutSlide from "../../../componentes/general/LayoutSlide";
import ComiteSeguridad from "./ComiteSeguridad";
import Constitucion from "./Constitucion";
import Info from "./Info";

function HomeComite(props) {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <LayoutSlide
        nombre={"Comité de Seguridad"}
        paginas={[
          { label: "Planes", enlace: "/desarrollo/comite" },
          { label: "Planes", enlace: "/desarrollo/comite" },
        ]}
        texto={
          "Coordinara la comunidad educativa, con sus respectivos representantes, a fin de alcanzar una activa y masiva participación en un proceso que los compromete a todos y todas, para lograr la construcción de una sociedad resiliente más segura y mejor preparada frente a diversas amenazas."
        }
        titulo={"MISIÓN DEL COMITÉ DE SEGURIDAD ESCOLAR"}
      >
         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
            <div className="flex flex-wrap w-full"></div>
            <ul
              className="flex mb-0 list-none pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex flex-1 text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 text-black shadow-lg rounded flex-1 leading-normal " +
                    (openTab === 1
                      ? `bg-purple-200`
                      : `bg-white"`)
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <i className="fas fa-space-shuttle text-base mr-1"></i> Info
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex flex-1 text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 text-black shadow rounded flex-1 leading-normal " +
                    (openTab === 2
                      ? `bg-purple-200`
                      : `bg-white"`)
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <i className="fas fa-cog text-base mr-1"></i> Constitución del
                  comité
                </a>
              </li>
              <li className="mr-2 last:mr-0 flex flex-1 text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow text-blac rounded flex-1 leading-normal " +
                    (openTab === 3
                      ? `bg-purple-200`
                      : `bg-white"`)
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <i className="fas fa-briefcase text-base mr-1"></i> Miembros
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <Info />
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <Constitucion />
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <ComiteSeguridad />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </LayoutSlide>
    </>
  );
}

export default HomeComite;
