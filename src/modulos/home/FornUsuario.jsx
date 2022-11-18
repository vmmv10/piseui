import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import FloatingLabelInput from "../../componentes/general/FLoatingLabel";
import { toast } from "react-toastify";
import api from "../../api/routes";
import Input from "../../componentes/general/Input";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "../../componentes/general/FLoatingLabel";
import ButtonGuardar from "../../componentes/general/ButtonGuardar";

function FormUsuario() {
  const { register, handleSubmit, control, setValue } = useForm();
  const [password, setpassword] = useState("");
  let navigate = useNavigate();

  async function onSubmit(data) {
    console.log(data);
    if (data.password === data.password_2) {
      let resultado = await axios.post(
        "http://localhost:5000/api/usuarios/crear",
        data
      );
      if (resultado && resultado.status === 200) {
        toast.success("Usuario creado con exito!");
        navigate("/");
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      toast.error("Las contraseñas no coinciden");
    }
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
            Crear usuario
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Ingrese los siguientes datos
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
              <div className="flex flex-wrap py-2">
                <FloatingLabel
                  register={register}
                  bool={true}
                  name={"username"}
                >
                  Username
                </FloatingLabel>
                <FloatingLabel register={register} bool={true} name={"rbd"}>
                  Código RBD
                </FloatingLabel>
            </div>
              <div className="flex flex-wrap py-2">
                <FloatingLabel register={register} bool={true} name={"nombre"}>
                  Nombre
                </FloatingLabel>
                <FloatingLabel
                  register={register}
                  bool={true}
                  name={"apellidos"}
                >
                  Apellidos
                </FloatingLabel>
              </div>
            <div className="flex flex-wrap py-2">
              <FloatingLabel
                register={register}
                bool={true}
                name={"email"}
                type={"email"}
              >
                Email
              </FloatingLabel>
                <FloatingLabel
                  register={register}
                  bool={true}
                  name={"password"}
                >
                  Contraseña
                </FloatingLabel>
                <FloatingLabel
                  register={register}
                  bool={true}
                  name={"password_2"}
                >
                  Repita Contraseña
                </FloatingLabel>
            </div>
            <ButtonGuardar />
          </div>
        </form>
      </div>
    </section>
  );
}

export default FormUsuario;
