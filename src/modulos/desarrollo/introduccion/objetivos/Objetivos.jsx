import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcIdea } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import ButtonGuardar from "../../../../componentes/general/ButtonGuardar";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";

function Objetivos(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  let navigate = useNavigate();
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [informacion, setInformacion] = useState({});

  useEffect(
    () => {
      obtenerDatos();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.objetivos.get(rbd);
    if (resultado && resultado.status === 200) {
      setInformacion(resultado.data.objetivo);
      setValue("objetivo", resultado.data.objetivo.objetivo);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function onSubmit(data) {
    let resultado;
    if (informacion && informacion.id) {
      resultado = await api.objetivos.put(rbd, informacion.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Editado con éxito");
        obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.objetivos.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Guardado con exito!");
        obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  return (
    <LayoutSlide nombre={"Objetivos"}>
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
                  {" "}
                  Cuáles serán los principales objetivos que abordaran en el su
                  plan.{" "}
                </h1>
                <ul className="px-5 py-3 list-disc list-inside ...">
                  Ejemplo
                  <li className="mt-1">
                    Generar en la comunidad educativa una actitud de
                    autoprotección, teniendo por sustento una responsabilidad
                    colectiva frente a la seguridad
                  </li>
                  <li className="mt-1">
                    Proporcionar a las y los estudiantes un efectivo ambiente de
                    seguridad mientras desarrollan sus etapas formativas.
                  </li>
                  <li className="mt-1">
                    Controlar o eliminar condiciones inseguras en las
                    respectivas salas, oficinas o dependencias a fin de evitar
                    la generación de situaciones de riesgo antes, durante y
                    después de la emergencia.
                  </li>
                  <li>
                    Lograr la participación activa de organismos externos de
                    apoyo como lo son: Bomberos, Carabineros, etc.
                  </li>
                </ul>
              </div>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputTextArea
                    rows={"20"}
                    type={"textarea"}
                    register={register}
                    bool={true}
                    name={"objetivo"}
                  >
                    Objetivos
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

export default Objetivos;
