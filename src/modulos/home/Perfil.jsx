import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
// import api from '../../../api/routes';
import { FaQuestionCircle } from "react-icons/fa";
import Layout from "../../componentes/general/Layout";
import UserContext from "../../context/user/UserContext";
import FloatingLabel from "../../componentes/general/FLoatingLabel";
import ButtonGuardar from "../../componentes/general/ButtonGuardar";
import Api from "../../api/routes";

function Perfil(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  let id = localStorage.getItem("id");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      obtenerDatos();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.usuarios.get(id, rbd);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.usuario;
      setValue("nombre", doc.nombres);
      setValue("apellidos", doc.apellidos);
      setValue("rbd", doc.rbd);
      setValue("username", doc.username);
      setValue("email", doc.email);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function onSubmit(data) {
    let resultado = await api.usuarios.put(id, rbd, data);
    if (resultado && resultado.status === 200) {
      toast.success("Editado con exito");
    } else {
      toast.error(resultado.data.msg);
    }
  }

  return (
    <>
      <Layout nombre={"Perfil"}></Layout>
      <div className="flex flex-col h-full">
        <div className={"justify-arround w-full"}>
          <div className="bg-gray-100 dark:bg-gray-800 py-6 lg:py-8">
            <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="lg:flex">
                <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
                  Perfil de Usuario
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
              <div className="flex flex-wrap w-full">
                <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <div className="lg:flex flex-wrap lg:py-3">
                        <FloatingLabel
                          register={register}
                          name={"username"}
                          bool={true}
                        >
                          Username
                        </FloatingLabel>
                      </div>
                      <div className="lg:flex flex-wrap lg:py-3">
                        <FloatingLabel
                          register={register}
                          name={"nombre"}
                          bool={true}
                        >
                          Nombres
                        </FloatingLabel>
                      </div>
                      <div className="lg:flex flex-wrap lg:py-3">
                        <FloatingLabel
                          register={register}
                          name={"apellidos"}
                          bool={true}
                        >
                          Apellidos
                        </FloatingLabel>
                      </div>
                      <div className="lg:flex flex-wrap lg:py-3">
                        <FloatingLabel
                          register={register}
                          type={"email"}
                          name={"email"}
                          bool={true}
                        >
                          Email
                        </FloatingLabel>
                      </div>
                      <ButtonGuardar />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
