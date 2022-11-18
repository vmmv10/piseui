import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

function ModalEliminar(props) {
  return (
    <>
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 lg:bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="lg:text-3xl font-semibold">
                    ¿Estas seguro de Eliminar?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {props.nombre && (
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 lg:text-lg leading-relaxed">
                      {props.nombre}
                    </p>
                  </div>
                )}

                {/*footer*/}
                <div className="flex items-center justify-center lg:justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShow(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-700 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      props.setShow(false);
                      props.confirmar();
                    }}
                  >
                    <div className="flex flex-row">
                      <AiOutlineDelete className="mr-1 mt-1" />
                      Eliminar
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ModalEliminar;
