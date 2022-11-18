import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../api/routes";
import LayoutSlide from "../../../componentes/general/LayoutSlide";
import ButtonGuardar from "../../../componentes/general/ButtonGuardar";
import UserContext from "../../../context/user/UserContext";
import FloatingLabel from "../../../componentes/general/FLoatingLabel";
import { useState } from "react";

function Informacion(props) {
  const { register, handleSubmit, control, setValue } = useForm();
  const { selectedUser } = useContext(UserContext);
  const [informacion, setInformacion] = useState({});
  let rbd = localStorage.getItem("rbd");
  let api = new Api();

  useEffect(
    () => {
      obtener();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (informacion.id){
      resultado = await api.establecimientos.put(rbd, informacion.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Editado con éxito");
      } else {
        toast.error(resultado.data.msg);
      }
    }
    else {
      resultado = await api.establecimientos.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Guardado con exito!");
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function obtener() {
    let resultado = await api.establecimientos.get(rbd);
    if (resultado && resultado.status === 200) {
      let info = resultado.data.establecimiento;
      setInformacion(info);
      if (info.id) {
        setValue("sostenedor", info.sostenedor);
        setValue("nombre", info.nombre);
        setValue("director", info.director);
        setValue("coordinador", info.coordinador);
        setValue("direccion", info.direccion);
        setValue("region", info.region);
        setValue("comuna", info.comuna);
        setValue("ciudad", info.ciudad);
        setValue("niveles", info.niveles);
        setValue("contruccion", info.ano_construccion);
        setValue("modalidad", info.modalidad);
        setValue("web", info.web);
        setValue("rbd", info.rbd);
      }
    } else {
      toast.error(resultado.data.msg);
    }
  }

  return (
    <LayoutSlide nombre="Antecedentes del Establecimiento">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
            <div className="flex flex-wrap w-full">
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="mb-3 mt-6">
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"nombre"}
                      >
                        Nombre del Establecimiento
                      </FloatingLabel>
                    </div>
                    <div className="lg:flex flex-wrap lg:py-3">
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"sostenedor"}
                      >
                        Nombre del Sostenedor
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"director"}
                      >
                        Nombre del Director
                      </FloatingLabel>
                    </div>
                    <div className="lg:flex flex-wrap lg:py-3">
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"coordinador"}
                      >
                        Nombre del Coordinador
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"direccion"}
                      >
                        Dirección
                      </FloatingLabel>
                    </div>
                    <div className="lg:flex flex-wrap lg:py-3">
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"region"}
                      >
                        Región
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"comuna"}
                      >
                        Comuna
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"ciudad"}
                      >
                        Ciudad
                      </FloatingLabel>
                    </div>
                    <div className="lg:flex flex-wrap lg:py-3">
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"modalidad"}
                      >
                        Modalidad
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"niveles"}
                      >
                        Niveles
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"contruccion"}
                      >
                        Año Contrucción
                      </FloatingLabel>
                    </div>
                    <div className="lg:flex flex-wrap smx:mb-3 lg:py-3">
                      <FloatingLabel
                        register={register}
                        bool={true}
                        name={"rbd"}
                      >
                        Código RBD
                      </FloatingLabel>
                      <FloatingLabel
                        register={register}
                        bool={false}
                        name={"web"}
                      >
                        Página Web
                      </FloatingLabel>
                    </div>
                    <ButtonGuardar editando={informacion && informacion.id ? true : false}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSlide>
  );
}

export default Informacion;
