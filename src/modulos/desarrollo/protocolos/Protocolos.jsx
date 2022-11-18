import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcIdea } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Api from "../../../api/routes";
import LayoutSlide from "../../../componentes/general/LayoutSlide";
import CardsProtocolo from "../../../componentes/protocolos/CardProtocolo";

function Protocolos(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  let navigate = useNavigate();
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [protocolos, setProtocolos] = useState([]);
  const handleShow = () => navigate("");

  useEffect(
    () => {
      obtenerDatos();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.protocolos.get(rbd);
    if (resultado && resultado.status === 200) {
      setProtocolos(resultado.data.protocolos);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  return (
    <LayoutSlide nombre={"Protocolos"}>
      <div className="px-4 md:px-10 bg-gray-100">
        <div className="flex justify-end px-6 py-6">
          <button
            onClick={() => navigate("/desarrollo/protocolos/formulario")}
            className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">
              Agregar Protocolo
            </p>
          </button>
        </div>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 flex flex-row flex-wrap justify-around bg-gray-100">
            {protocolos &&
              protocolos.map((protocolo, index) => {
                return (
                  <>
                    <CardsProtocolo
                      key={`${index}`}
                      index={index}
                      protocolo={protocolo}
                    />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </LayoutSlide>
  );
}

export default Protocolos;
