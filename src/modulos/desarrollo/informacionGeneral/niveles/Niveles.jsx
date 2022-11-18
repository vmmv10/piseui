import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import ButtonGuardar from "../../../../componentes/general/ButtonGuardar";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";
import Input from "../../../../componentes/general/Input";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";

function Niveles(props) {
  const { register, handleSubmit, control, setValue } = useForm();
  const [niveles, setNiveles] = useState();
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
    if (niveles.id) {
      resultado = await api.niveles.put(rbd, niveles.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Editado con exito!");
      } else {
        toast.error(resultado.data.msg);
      }
    }
    else {
      resultado = await api.niveles.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Guardado con exito!");
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function obtener() {
    let resultado = await api.niveles.get(rbd);
    if (resultado && resultado.status === 200) {
      let info = resultado.data.niveles;
      setNiveles(resultado.data.niveles);
      if(info.id){
        setValue("jornada_parvularia", info.jornada_parvularia);
        setValue("horario_formularia", info.horario_formularia);
        setValue("jornada_basica_1", info.jornada_basica_1);
        setValue("horario_basica_1", info.horario_basica_1);
        setValue("jornada_basica_2", info.jornada_basica_2);
        setValue("horario_basica_2", info.horario_basica_2);
        setValue("jornada_media", info.jornada_media);
        setValue("horario_media", info.horario_media);
        setValue("docentes_f", info.docentes_f);
        setValue("docentes_m", info.docentes_m);
        setValue("asistentes_f", info.asistentes_f);
        setValue("asistentes_m", info.asistentes_m);
        setValue("estudiantes_f", info.estudiantes_f);
        setValue("estudiantes_m", info.estudiantes_m);
      }
    } else {
      toast.error(resultado.data.msg);
    }
  }

  return (
    <LayoutSlide nombre="Niveles de Enseñanza del Establecimiento">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <h1 className="px-2 py-2">Eduación Parvularia</h1>
                <div className="lg:flex flex-wrap justify-around py-3">
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"jornada_parvularia"}
                  >
                    Jornada
                  </FloatingLabel>
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"horario_formularia"}
                  >
                    Horario
                  </FloatingLabel>
                </div>
              </div>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <h1 className="px-2 py-2">Educación Básica 1º y 4º</h1>
                <div className="lg:flex flex-wrap justify-around py-3">
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"jornada_basica_1"}
                  >
                    Jornada
                  </FloatingLabel>
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"horario_basica_1"}
                  >
                    Horario
                  </FloatingLabel>
                </div>
              </div>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <h1 className="px-2 py-2">Educación Básica 5º y 8º</h1>
                <div className="lg:flex flex-wrap justify-around py-3">
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"jornada_basica_2"}
                  >
                    Jornada
                  </FloatingLabel>
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"horario_basica_2"}
                  >
                    Horario
                  </FloatingLabel>
                </div>
              </div>
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <h1 className="px-2 py-2">Eduación Media</h1>
                <div className="flg:flex flex-wrap justify-around py-3">
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"jornada_media"}
                  >
                    Jornada
                  </FloatingLabel>
                  <FloatingLabel
                    register={register}
                    bool={false}
                    name={"horario_media"}
                  >
                    Horario
                  </FloatingLabel>
                </div>
              </div>
              <div className="flex flex-column break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <div className="px-2">
                  <h1 className="py-2 px-2">Número de docentes</h1>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <Input
                        type={"number"}
                        register={register}
                        name={"docentes_f"}
                        bool={true}
                      >
                        F
                      </Input>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <Input
                        type={"number"}
                        register={register}
                        name={"docentes_m"}
                        bool={true}
                      >
                        M
                      </Input>
                    </li>
                  </ul>
                </div>
                <div className="px-2">
                  <h1 className="py-2 px-2">Número de Asistentes</h1>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <Input
                        type={"number"}
                        register={register}
                        name={"asistentes_f"}
                        bool={true}
                      >
                        F
                      </Input>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <Input
                        type={"number"}
                        register={register}
                        name={"asistentes_m"}
                        bool={true}
                      >
                        M
                      </Input>
                    </li>
                  </ul>
                </div>
                <div className="px-2">
                  <h1 className="py-2 px-2">Número de Estudiantes</h1>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <Input
                        type={"number"}
                        register={register}
                        name={"estudiantes_f"}
                        bool={true}
                      >
                        F
                      </Input>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <Input
                        type={"number"}
                        register={register}
                        name={"estudiantes_m"}
                        bool={true}
                      >
                        M
                      </Input>
                    </li>
                  </ul>
                </div>
              </div>
             <ButtonGuardar editando={niveles && niveles.id ? true : false}/>
            </form>
          </div>
        </div>
      </div>
    </LayoutSlide>
  );
}

export default Niveles;
