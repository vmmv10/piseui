import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcIdea } from "react-icons/fc";
import { FiDownloadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import Api from "../../../api/routes";
import LayoutSlide from "../../../componentes/general/LayoutSlide";

function Descarga(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [informacion, setInformacion] = useState({});

  //   useEffect(
  //     () => {
  //     },
  //     [] // eslint-disable-line react-hooks/exhaustive-deps
  //   );

  async function obtenerDatos() {
    let resultado = await api.introduccion.get(rbd);
    if (resultado && resultado.status === 200) {
      let info = resultado.data.introduccion;
      setInformacion(resultado.data.introduccion);
      if (info.id) {
        setValue("introduccion", resultado.data.introduccion.introduccion);
      }
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function onSubmit(data) {
    let resultado;
    // if (informacion.id) {
      resultado = await api.exportar.get(rbd);
      if (resultado && resultado.status === 200) {
        toast.success("Editado con éxito");
      } else {
        toast.error(resultado.data.msg);
      }
    // } else {
    //   resultado = await api.introduccion.post(rbd, data);
    //   if (resultado && resultado.status === 200) {
    //     toast.success("Guardado con exito!");
    //   } else {
    //     toast.error(resultado.data.msg);
    //   }
    // }
  }

  return (
    <LayoutSlide nombre={"Obtener Plan de Seguridad Escolar"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
            <div className="flex flex-wrap w-full">
              <div className="flex break-words bg-white w-full mb-6 shadow-lg rounded justify-center px-4 py-4">
                <button
                  className="bg-emerald-500 flex lg:flex-none flex-1 justify-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  <div className="flex flex-row">
                    <FiDownloadCloud className="mr-2 text-xl" />
                    Descargar PDF
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSlide>
  );
}

export default Descarga;
