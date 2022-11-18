import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Selector from "../../../componentes/general/Selector";
import Api from "../../../api/routes";
import Modal from "../../../componentes/general/Modal";
import FloatingLabel from "../../../componentes/general/FLoatingLabel";


function FormComiteSeguridad(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();
  const [rol, setRol] = useState('');
  const [genero, setGenero] = useState("");

  useEffect(
    () => {
      if (props.comite.id) {
        getComite();
      }
    },
    [props.comite] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const options = [
    { value: 0, label: "Director/a" },
    { value: 1, label: "Monitor/a o Coordinador/a de Seguridad Escolar" },
    { value: 2, label: "Representante de los Docentes" },
    { value: 3, label: "Representante de Padres, Madres y Apoderados" },
    {
      value: 4,
      label: "Representante de Estudiantes de cursos y/o niveles superiores",
    },
    { value: 5, label: "Representante de los Asistentes de la Educación" },
    { value: 6, label: "Coordinador/a Programa Integración Escolar(PIE)" },
    { value: 7, label: "Representante de las Unidades de Emergencias" },
    {
      value: 8,
      label:
        "Representante de los organismos administradores de la Ley 16.744 sobre Accidentes del Trabajo y Enfermedades Profesionales",
    },
    { value: 9, label: "Representante del Consejo Escolar" },
    { value: 10, label: "Comité Paritario de Higiene y Seguridad" },
    {
      value: 11,
      label:
        "Representante de Instituciones u Organizaciones de la sociedad civil",
    },
    { value: 12, label: "Representante y/o autoridades de la comunidad" },
  ];

  const generoOptions = [
    { value: 0, label: "Femenino" },
    { value: 1, label: "Masculino" },
  ];

  async function onSubmit(data) {
    data.rol = rol;
    data.genero = genero;
    let resultado;
    if (props.comite.id) {
      resultado = await api.comite.put(rbd, props.comite.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con exito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.comite.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha agregado con exito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function getComite() {
    let resultado = await api.comite.getOne(rbd, props.comite.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.comite;
      setValue("nombre", doc.nombre);
      setValue("estamento", doc.estamento);
      setValue("correo", doc.correo);
      setValue("telefono", doc.telefono);
      setValue("nivel", doc.nivel);
      setGenero(doc.genero);
      setRol(doc.rol);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("nombre", "");
    setValue("estamento", "");
    setValue("correo", "");
    setValue("telefono", "");
    setValue("nivel", "");
    setGenero("");
    setRol("");
    props.handleClose();
  }

  async function eliminar() {
    let resultado = await api.comite.delete(rbd, props.comite.id);
    if (resultado && resultado.status === 200) {
      cerrarModal();
      props.obtenerDatos();
      toast.success("Se ha eliminada con éxito");
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  return (
    <Modal
      setShow={props.setShow}
      show={props.show}
      titulo={`${props.comite.id ? "Editar" : "Agregar"} Miembro`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex lg:flex-row flex-col">
        <FloatingLabel register={register} name={"nombre"} bool={true}>
          Nombre Completo
        </FloatingLabel>
        <FloatingLabel register={register} name={"estamento"} bool={true}>
          Estamento u Organización
        </FloatingLabel>
      </div>
      <div className="flex lg:flex-row lg:mt-3 flex-col">
        <div className="flex-1 px-2 lg:py-0 py-3">
          <Selector
            control={control}
            options={generoOptions}
            Controller={Controller}
            name="genero"
            valorDefault={genero}
            placeholder="Seleccione Género"
            onChange={(data) => {
              if (data) {
                setGenero(data.label);
              } else {
                setGenero("");
              }
            }}
          />
        </div>
        <div className="flex-1 px-2">
          <Selector
            control={control}
            options={options}
            Controller={Controller}
            name="rol"
            valorDefault={rol}
            placeholder="Seleccione Rol"
            onChange={(data) => {
              if (data) {
                setRol(data.label);
              } else {
                setRol("");
              }
            }}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col">
        <FloatingLabel register={register} name={"nivel"} bool={true}>
          Nivel
        </FloatingLabel>
        <FloatingLabel register={register} name={"telefono"} bool={true}>
          Teléfono
        </FloatingLabel>
        <FloatingLabel register={register} name={"correo"} bool={true} type={"email"}>
          Correo
        </FloatingLabel>
      </div>
    </Modal>
  );
}

export default FormComiteSeguridad;
