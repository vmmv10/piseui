import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcIdea } from "react-icons/fc";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import ButtonGuardar from "../../../../componentes/general/ButtonGuardar";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";

function Introduccion(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [informacion, setInformacion] = useState({});

  useEffect(
    () => {
      obtenerDatos();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.introduccion.get(rbd);
    if (resultado && resultado.status === 200) {
      let info = resultado.data.introduccion;
      setInformacion(resultado.data.introduccion);
      if (info.id){
        setValue("introduccion", resultado.data.introduccion.introduccion);
      }
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function onSubmit(data) {
    let resultado;
    if (informacion.id) {
      resultado = await api.introduccion.put(rbd, informacion.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Editado con éxito");
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.introduccion.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Guardado con exito!");
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  return (
    <LayoutSlide nombre={"Introducción"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
            <div className="flex flex-wrap w-full">
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <div className="flex px-3 py-4">
                  <h1 className="text-gray-900 px-2 text-xl font-medium">
                    Sugerencias
                  </h1>
                  <FcIdea className=" mt-1" />
                </div>
                <h1 className="text-gray-900 px-5 text-xl">
                  Como el establecimiento abordara el Plan Integral de Seguridad
                </h1>
              </div>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputTextArea
                    rows={"20"}
                    type={"textarea"}
                    register={register}
                    bool={true}
                    name={"introduccion"}
                  >
                    Introducción
                  </InputTextArea>
                  <ButtonGuardar
                    editando={informacion && informacion.id ? true : false}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSlide>
  );
}

export default Introduccion;
