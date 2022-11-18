import React from "react";
import { useState } from "react";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";
import Niveles from "./Niveles";

function HomeNiveles(props) {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <LayoutSlide
        nombre={"Niveles de educación del establecimiento"}
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
            <div className="flex flex-wrap">
              <div className="w-full">
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (openTab === 1
                          ? `text-black bg-purple-200`
                          : `text-${props.color}-600 bg-white"`)
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                      Niveles de Educación
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (openTab === 2
                          ? `text-black bg-purple-200`
                          : `text-${props.color}-600 bg-white"`)
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      <i className="fas fa-cog text-base mr-1"></i> Pie
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
            <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
<div className="px-4 py-4"> <Niveles/></div>
              </div>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
              </div>
            </div>
          </div>
        </div>
      </div>
      </LayoutSlide>
    </>
  );
}

export default HomeNiveles;
