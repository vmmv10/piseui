import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import ModalEliminar from "./ModalEliminar";

function Modal(props) {
  const [eliminar, setEliminar] = useState(false);

  return (
    <>
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl mt-1 items-center lg:text-3xl font-semibold">
                    {props.titulo}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-2xl  leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.cerrarModal()}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={props.onSubmit}>
                  <div className="relative p-6 flex-auto">{props.children}</div>
                  {/*footer*/}
                  <div className="flex items-center justify-center lg:justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-red-500 hidden lg:flex lg:flex-none flex-1  text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => props.cerrarModal()}
                    >
                      Cerrar
                    </button>
                    <button
                      className="bg-red-500 lg:hidden flex lg:flex-none flex-1 justify-center text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setEliminar(true)}
                    >
                      <div className="flex flex-row">
                        <AiOutlineDelete className="mr-1 text-xl" />
                        Eliminar
                      </div>
                    </button>
                    <button
                      className="bg-emerald-500 flex lg:flex-none flex-1 justify-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        props.setShow(false);
                        props.onSubmit();
                      }}
                    >
                      <div className="flex flex-row">
                        <FiSave className="mr-1 text-xl" />
                        Guardar
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <ModalEliminar
            confirmar={props.eliminar}
            show={eliminar}
            setShow={setEliminar}
          />
        </>
      ) : null}
    </>
  );
}

export default Modal;
