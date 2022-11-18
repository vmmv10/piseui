import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../../api/routes";
import FloatingLabel from "../../../componentes/general/FLoatingLabel";
import InputTextArea from "../../../componentes/general/InputTextArea";
import LayoutSlide from "../../../componentes/general/LayoutSlide";
import Acciones from "./acciones/Acciones";

function FormProtocolos(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  let navigate = useNavigate();
  const { register, handleSubmit, control, setValue } = useForm();
  let { protocolo_id } = useParams();
  const [openTab, setOpenTab] = useState(1);

  useEffect(
    () => {
      if (protocolo_id) {
        getProtocolo();
      }
    },
    [protocolo_id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (protocolo_id) {
      resultado = await api.protocolos.put(rbd, protocolo_id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con éxito");
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.protocolos.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha agregado con éxito");
        navigate(`/desarrollo/protocolos/formulario/editar/${resultado.data.protocolo.id}`);
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function getProtocolo() {
    let resultado = await api.protocolos.getOne(rbd, protocolo_id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.protocolo;
      setValue("nombre", doc.nombre);
      setValue("participante", doc.participante);
      setValue("descripcion", doc.descripcion);
      setValue("alarma_cual", doc.alarma_cual);
      setValue("alarma_cuando", doc.alarma_cuando);
      setValue("alarma_quien", doc.alarma_quien);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  return (
    <LayoutSlide nombre={"Formulario de Protocolo"}>
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
                      Información General
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    {protocolo_id ? (
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
                        <i className="fas fa-cog text-base mr-1"></i> Acciones
                      </a>
                    ) : (
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block  bg-white"
                        }
                        data-toggle="tab"
                        role="tablist"
                      >
                        <i className="fas fa-cog text-base mr-1"></i> Acciones
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <h1 className="px-2 py-2">Información General</h1>
                <div className="flex">
                  <FloatingLabel
                    register={register}
                    bool={true}
                    name={"nombre"}
                  >
                    Plan de emergencia frente al riesgo de
                  </FloatingLabel>
                </div>
                <div className="flex">
                  <InputTextArea
                    type={"textarea"}
                    register={register}
                    bool={true}
                    name={"participante"}
                  >
                    ¿Quién participa del plan de emergencia?
                  </InputTextArea>
                </div>
                <div className="flex">
                  <InputTextArea
                    type={"textarea"}
                    register={register}
                    bool={true}
                    name={"descripcion"}
                  >
                    Descripción del sector (En función del riesgo asociado al
                    plan)
                  </InputTextArea>
                </div>
              </div>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <h1 className="px-2 py-2">Alarma</h1>
                <div className="flex">
                  <FloatingLabel
                    register={register}
                    bool={true}
                    name={"alarma_cual"}
                  >
                    ¿Cuál será la alarma?
                  </FloatingLabel>
                </div>
                <div className="flex">
                  <FloatingLabel
                    register={register}
                    bool={true}
                    name={"alarma_cuando"}
                  >
                    ¿Cuándo se activa la alarma?
                  </FloatingLabel>
                </div>
                <div className="flex">
                  <FloatingLabel
                    register={register}
                    bool={true}
                    name={"alarma_quien"}
                  >
                    ¿Quién dará alarma?
                  </FloatingLabel>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex px-2">
                  <button
                    onClick={() => {
                      navigate("/desarrollo/protocolos");
                    }}
                    className="bg-blue-white hover:bg-gray-200 text-black py-2 px-4 rounded"
                  >
                    Volver
                  </button>
                </div>
                <div className="flex">
                  <button
                    onClick={onSubmit}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Guardar
                  </button>
                </div>
              </div>
              </form>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <Acciones protocolo_id={protocolo_id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSlide>
  );
}

export default FormProtocolos;
