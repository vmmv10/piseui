import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalInfo from "../comite/ModalInfo";

function CardsProtocolo(props) {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <>
      <div key={`key${props.protocolo.id}`} className="flex justify-center flex-1 px-3 py-3">
        <div className="flex w-full flex-1 shadow-lg bg-white max-w-sm">
          <div className="p-6">
            <div className="py-5">
              <h5 className="text-gray-900 text-xl font-bold mb-2">
                {props.protocolo.nombre}
              </h5>
              <div className="py-3">
                <p className="font-medium">
                  ¿Quién participa del plan de emergencia?
                </p>
                <p>{props.protocolo.participante}</p>
              </div>
              <div className="py-3">
                <p className="font-medium">
                  Descripción del sector (En función del riesgo asociado al
                  plan)
                </p>
                <p>{props.protocolo.descripcion}</p>
              </div>
            </div>
            <button
              onClick={() =>
                navigate(
                  `/desarrollo/protocolos/formulario/editar/${props.protocolo.id}`
                )
              }
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardsProtocolo;
