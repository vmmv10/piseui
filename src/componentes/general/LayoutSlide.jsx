import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSlide from "./ButtonSlide";
import { BsBook, BsCaretDownFill, BsSearch } from "react-icons/bs";
import {
  FaBook,
  FaBurn,
  FaCalendarAlt,
  FaCheck,
  FaClipboardList,
  FaDatabase,
  FaFireExtinguisher,
  FaGraduationCap,
  FaHandshake,
  FaMap,
  FaMapMarkedAlt,
  FaPoll,
  FaProjectDiagram,
  FaRunning,
  FaSchool,
  FaUsers,
} from "react-icons/fa";
import { RiPoliceCarFill } from "react-icons/ri";
import { MdPriorityHigh } from "react-icons/md";
import Tooltip from "./../general/Tooltip";
import Layout from "./Layout";
import ButtonSlidePrincipal from "./ButtonSlidePrincipal";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";

export default function LayoutSlide(props) {
  let navigate = useNavigate();
  const [tooltipStatus, setTooltipStatus] = useState(false);

  let menuArray = [false, false, false];
  const [menu, setMenu] = useState(menuArray);

  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };
  return (
    <>
      {/* Navigation starts */}
      <Layout nombre={props.nombre} titulo={props.titulo} texto={props.texto} />
      <div className="flex w-full h-screen  bg-white">
        <div className="lg:flex flex-col h-auto w-96 divide-y divide-dashed py-5 bg-gray-100 hidden">
        <div className="justify-start px-6 w-auto pb-1">
            <button
              onClick={() => setMenuValue(0)}
              className="flex hover:text-black text-gray-600 w-full py-5 space-x-5"
            >
              <AiTwotoneFileExclamation />
              <p className="text-sm text-center leading-5 w-auto flex-1 uppercase">
                Introducción
              </p>
              <BsCaretDownFill className="flex justify-end" />
            </button>
            <div
              id="menu2"
              className={`${
                menu[0] ? "flex" : "hidden"
              } justify-start flex-col w-full md:w-auto`}
            >
              <ButtonSlide
                nombre={"Introducción"}
                ruta={"/desarrollo/introduccion/informacion"}
              >
                <AiTwotoneFileExclamation />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Objetivos"}
                ruta={"/desarrollo/introduccion/objetivos"}
              >
                <FaCheck />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Definiciones"}
                ruta={"/desarrollo/introduccion/definiciones"}
              >
                <BsBook />
              </ButtonSlide>
            </div>
          </div>
          <div className="justify-start px-6 w-auto pb-1">
            <button
              onClick={() => setMenuValue(1)}
              className="flex hover:text-black text-gray-600 w-full py-5 space-x-5"
            >
              <FaSchool />
              <p className="text-sm text-center leading-5 w-auto flex-1 uppercase">
                Antecedentes
              </p>
              <BsCaretDownFill className="flex justify-end" />
            </button>
            <div
              id="menu0"
              className={`${
                menu[1] ? "flex" : "hidden"
              } justify-start flex-col w-full md:w-auto`}
            >
              <ButtonSlide
                nombre={"Información Básica"}
                ruta={"/desarrollo/informacion"}
              >
                <FaDatabase />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Niveles de Eseñanza"}
                ruta={"/desarrollo/general/niveles"}
              >
                <FaPoll />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Directivos"}
                ruta={"/desarrollo/general/directivos"}
              >
                <FaProjectDiagram />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Docentes"}
                ruta={"/desarrollo/general/docentes"}
              >
                <FaGraduationCap />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Asistentes de la Educación"}
                ruta={"/desarrollo/general/asistentes"}
              >
                <FaHandshake />
              </ButtonSlide>
            </div>
          </div>
          <ButtonSlidePrincipal
            nombre={"Comité de Seguridad"}
            ruta={"/desarrollo/comite"}
          >
            <FaUsers className="col-span-1" />
          </ButtonSlidePrincipal>
          <ButtonSlidePrincipal
            nombre={"Organismos de Emergencia"}
            ruta={"/desarrollo/organismos"}
          >
            <RiPoliceCarFill className="col-span-1" />
          </ButtonSlidePrincipal>
          <ButtonSlidePrincipal
            nombre={"Equipos de Emergencia"}
            ruta={"/desarrollo/equipos"}
          >
            <FaFireExtinguisher className="col-span-1" />
          </ButtonSlidePrincipal>
          <div className="justify-start px-6 w-auto pb-1">
            <button
              onClick={() => setMenuValue(2)}
              className="flex hover:text-black text-gray-600 w-full py-5 space-x-5"
            >
              <FaClipboardList />
              <p className="text-sm text-center leading-5 w-auto uppercase flex-1">
                Metodología AIDEP
              </p>
              <BsCaretDownFill />
            </button>
            <div
              id="menu1"
              className={`${
                menu[2] ? "flex" : "hidden"
              } justify-start flex-col w-full md:w-auto items-start pb-1`}
            >
              <ButtonSlide
                nombre={"Análisis Histórico"}
                ruta={"/desarrollo/aidep/analisishistorico"}
              >
                <FaCalendarAlt />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Investigación en Terreno"}
                ruta={"/desarrollo/aidep/investigacionterreno"}
              >
                <BsSearch />
              </ButtonSlide>
              <ButtonSlide
                nombre={"Prioridades"}
                ruta={"/desarrollo/aidep/prioridades"}
              >
                <MdPriorityHigh />
              </ButtonSlide>
              <ButtonSlide nombre={"Mapas"} ruta={"/desarrollo/aidep/mapas"}>
                <FaMapMarkedAlt />
              </ButtonSlide>
              <ButtonSlide nombre={"Planos"} ruta={"/desarrollo/aidep/planos"}>
                <FaMap />
              </ButtonSlide>
            </div>
          </div>
          <ButtonSlidePrincipal
            nombre={"Protocolos"}
            ruta={"/desarrollo/protocolos"}
          >
            <FaBurn className="col-span-1" />
          </ButtonSlidePrincipal>
          <ButtonSlidePrincipal
            nombre={"Capacitaciones"}
            ruta={"/desarrollo/capacitaciones"}
          >
            <FaBook className="col-span-1" />
          </ButtonSlidePrincipal>
          <ButtonSlidePrincipal
            nombre={"Simulacros"}
            ruta={"/desarrollo/simulacros"}
          >
            <FaRunning className="col-span-1" />
          </ButtonSlidePrincipal>
          <ButtonSlidePrincipal
            nombre={"Descarga"}
            ruta={"/desarrollo/descarga"}
          >
            <FiDownloadCloud className="col-span-1" />
          </ButtonSlidePrincipal>
        </div>
        <div className={"bg-white justify-arround w-full"}>
          <div className="bg-gray-100 dark:bg-gray-800 py-6 lg:py-8">
            <div className="container px-6 mx-auto flex flex-col items-start justify-between">
              {/* <p className="flex items-center text-indigo-700 text-xs">
              {props.paginas.forEach((pagina)=>{
                console.log(pagina.label);
                <span>{`h${pagina.label}`}</span>
              })}
              </p> */}
              {/*
                    <span>Portal</span>
                    <span className="mx-2">&gt;</span>
                    <span>Dashboard</span>
                    <span className="mx-2">&gt;</span>
                    <span>KPIs</span>
                </p> */}
              <div className="lg:flex">
                <h4 className="flex justify-start text-2xl font-bold leading-tight text-black dark:text-gray-100">
                  {props.nombre}
                </h4>
                {props.titulo && props.texto && (
                  <Tooltip
                    tooltipStatus={tooltipStatus}
                    setTooltipStatus={setTooltipStatus}
                    titulo={props.titulo}
                    texto={props.texto}
                  />
                )}
              </div>
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
}
