import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import {
  FaBook,
  FaBurn,
  FaCalendarAlt,
  FaDatabase,
  FaFireExtinguisher,
  FaGraduationCap,
  FaHandshake,
  FaMap,
  FaMapMarkedAlt,
  FaPoll,
  FaProjectDiagram,
  FaRunning,
  FaUsers,
} from "react-icons/fa";
import { MdPriorityHigh } from "react-icons/md";
import { RiDashboardFill, RiPoliceCarFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ButtonSideBar from "./ButtonSideBar";
import TituloSideBar from "./TituloSideBar";

function SideBar(props) {
  let navigate = useNavigate();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setOpenTab(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="fixed flex flex-col top-0 left-0 w-80 z-50 bg-white h-full border-r" ref={wrapperRef}>
      <div className="overflow-x-hidden flex-grow">
        <div className="py-3 px-3 flex justify-end">
          <button
            onClick={() => {
              props.setOpenTab(false);
            }}
          >
            <AiOutlineClose style={{ fontSize: "20px" }} />
          </button>
        </div>
        <ul className="flex flex-col space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Menu
              </div>
            </div>
          </li>
          <li>
          <ButtonSideBar
              titulo={"Dashboard"}
              ruta={"/dashboard/home"}
            >
              <RiDashboardFill/>
            </ButtonSideBar>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-700">
                Plan de Seguridad Escolar
              </div>
            </div>
          </li>
          <TituloSideBar titulo={'General'}/>
          <li>
            <ButtonSideBar
              titulo={"Información"}
              ruta={"/desarrollo/informacion"}
            >
              <FaDatabase />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Niveles de Eseñanza"}
              ruta={"/desarrollo/general/niveles"}
            >
              <FaPoll />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Directivos"}
              ruta={"/desarrollo/general/directivos"}
            >
              <FaProjectDiagram />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Docentes"}
              ruta={"/desarrollo/general/docentes"}
            >
              <FaGraduationCap />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Asistentes"}
              ruta={"/desarrollo/general/asistentes"}
            >
              <FaHandshake />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Comité de Seguridad"}
              ruta={"/desarrollo/comite"}
            >
              <FaUsers />
            </ButtonSideBar>
          </li>
          <TituloSideBar titulo={'Emergencias'}/>
          <li>
            <ButtonSideBar
              titulo={"Organismos de Emergencia"}
              ruta={"/desarrollo/organismos"}
            >
              <RiPoliceCarFill/>
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Equipos de Emergencia"}
              ruta={"/desarrollo/equipos"}
            >
              <FaFireExtinguisher/>
            </ButtonSideBar>
          </li>
          <TituloSideBar titulo={'Metodología AIDEP'}/>
          <li>
            <ButtonSideBar
              titulo={"Análisis Histórico"}
              ruta={"/desarrollo/aidep/analisishistorico"}
            >
              <FaCalendarAlt/>
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Investigación en Terreno"}
              ruta={"/desarrollo/aidep/investigacionterreno"}
            >
              <BsSearch/>
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Prioridades"}
              ruta={"/desarrollo/aidep/prioridades"}
            >
              <MdPriorityHigh />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Mapas"}
              ruta={"/desarrollo/aidep/mapas"}
            >
              <FaMapMarkedAlt />
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Planos"}
              ruta={"/desarrollo/aidep/planos"}
            >
              <FaMap/>
            </ButtonSideBar>
          </li>
          <TituloSideBar titulo={'Otro'}/>
          <li>
            <ButtonSideBar
              titulo={"Protocolos"}
              ruta={"/desarrollo/protocolos"}
            >
              <FaBurn/>
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Capacitaciones"}
              ruta={"/desarrollo/capacitaciones"}
            >
              <FaBook/>
            </ButtonSideBar>
          </li>
          <li>
            <ButtonSideBar
              titulo={"Simulacros"}
              ruta={"/desarrollo/simulacros"}
            >
              <FaRunning />
            </ButtonSideBar>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
