import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import SelectorEstamento from "../../../../componentes/docentes/SelectorEstamento";
import SelectorDocenteAula from "../../../../componentes/docentes/SelectorDocenteAula";
import SelectorPie from "../../../../componentes/docentes/SelectorPie";
import Modal from "../../../../componentes/general/Modal";
import Api from "../../../../api/routes";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";

function FormDocentes(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();
  const [cargo, setCargo] = useState({});
  const [estamento, setEstamento] = useState({});

  useEffect(
    () => {
      if (props.docente.id) {
        getDocente();
      }
    },
    [props.docente] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(
    () => {
      if (estamento === "Biblioteca CRA") {
        setValue("cargo", "Coordinadora Biblioteca CRA");
      }
    },
    [estamento] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    data.estamento = estamento;
    if (estamento != "Biblioteca CRA") {
      data.cargo = cargo;
    }
    let resultado;
    if (props.docente.id) {
      resultado = await api.docentes.put(rbd, props.docente.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Docente editado con éxito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.docentes.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Docente agregado con éxito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function getDocente() {
    let resultado = await api.docentes.getOne(rbd, props.docente.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.docente;
      setEstamento(doc.estamento);
      setValue("nombre", doc.nombre);
      if (doc.estamento != "Biblioteca CRA") {
        setCargo(doc.cargo);
      } else {
        setValue("cargo", doc.cargo);
      }
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setCargo({});
    setEstamento({});
    setValue("cargo", "");
    setValue("nombre", "");
    props.handleClose();
  }

  async function eliminar() {
    let resultado = await api.docentes.delete(rbd, props.docente.id);
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
      titulo={`${props.docente.id ? "Editar" : "Agregar"} Docente`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar = {eliminar}
    >
      <div>
        <FloatingLabel register={register} name={"nombre"} bool={true}>
          Nombre Completo
        </FloatingLabel>
      </div>
      <div className="px-2 mt-2">
        <SelectorEstamento
          control={control}
          Controller={Controller}
          name="estamento"
          estamento={estamento}
          placeholder="Seleccione Estamento"
          onChange={(data) => {
            if (data) {
              setEstamento(data.label);
            } else {
              setEstamento("");
            }
          }}
        />
      </div>
      <div>
        {estamento == "Biblioteca CRA" ? (
          <div >
            <FloatingLabel register={register} name={"cargo"} bool={true}>
              Cargo
            </FloatingLabel>
          </div>
        ) : estamento == "Docente de aula" ? (
          <div className="px-2 py-2">
            <SelectorDocenteAula
              control={control}
              Controller={Controller}
              name="estamento"
              docenteAula={cargo}
              placeholder="Seleccione Cargo"
              onChange={(data) => {
                if (data) {
                  setCargo(data.label);
                } else {
                  setCargo("");
                }
              }}
            />
          </div>
        ) : estamento === "PIE" ? (
          <div className="px-2 py-2">
            <SelectorPie
              control={control}
              Controller={Controller}
              name="estamento"
              pie={cargo}
              placeholder="Seleccione Cargo"
              onChange={(data) => {
                if (data) {
                  setCargo(data.label);
                } else {
                  setCargo("");
                }
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}

export default FormDocentes;
