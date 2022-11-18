import { useState } from "react"
// import ModalInfo from "./ModalInfo";

function Cards(props) {
  return (
    <>
      {/* <div key={props.prioridad.id} className="w-72 flex  justify-center"> */}
        {/* <div className="rounded-lg shadow-lg bg-white max-w-sm"> */}
            <h1>{props.prioridad.analisis}</h1>
          {/* <div>
            <img src={`${import.meta.env.VITE_APP_API_URL}static/media/images/${props.imagen}`} alt="" />
          </div> */}
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{props.titulo}</h5>
            {/* <p className="text-gray-700 text-base text-justify mb-4">
              {props.texto}
            </p>
            <button
              onClick={() => props.click(setShow(true))}
              type="button"
              className="cursor-zoom-in inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Ver más
            </button> */}
          </div>
        {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default Cards