import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import SelectorCargo from "./../../../../componentes/directivos/SelectorCargo";
import SelectorEstamento from "../../../../componentes/directivos/SelectorEstamento";
import Api from "../../../../api/routes";
import Modal from "../../../../componentes/general/Modal";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";

function FormDirectivos(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const [cargo, setCargo] = useState({});
  const [estamento, setEstamento] = useState({});
  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(
    () => {
      if (estamento != "Dirección") {
        if (estamento == "Inspectoría General") {
          setValue("cargo", "Inspector General");
        }
        if (estamento == "Unidad Técnica Pedagógica") {
          setValue("cargo", "Jefe Técnico");
        }
        if (estamento == "Orientación") {
          setValue("cargo", "Orientador");
        }
      } else {
        setValue("cargo", "");
      }
    },
    [estamento] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(
    () => {
      if (props.directivo.id) {
        getDirectivo();
      }
    },
    [props.directivo] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    data.estamento = estamento;
    if (estamento === "Dirección") {
      data.cargo = cargo;
    }
    let resultado;
    if (props.directivo.id) {
      resultado = await api.directivos.put(rbd, props.directivo.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con exito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.directivos.post(rbd, data);
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

  async function getDirectivo() {
    let resultado = await api.directivos.getOne(rbd, props.directivo.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.directivo;
      setEstamento(doc.estamento);
      setValue("nombre", doc.nombre);
      if (doc.estamento === "Dirección") {
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
    let resultado = await api.directivos.delete(rbd, props.directivo.id);
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
      titulo={`${props.directivo.id ? "Editar" : "Agregar"} Directivo(a)`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="lg:px-2">
        <FloatingLabel register={register} name={"nombre"} bool={true}>
          Nombre Completo
        </FloatingLabel>
      </div>
      <div className="lg:px-4 px-2 mt-2">
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
        {estamento === "Dirección" ? (
          <div className="lg:px-4 px-2 mt-2">
            <SelectorCargo
              control={control}
              Controller={Controller}
              name="cargo"
              cargo={cargo}
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
          <div className="lg:px-2">
            <FloatingLabel register={register} name={"cargo"} bool={true}>
              Cargo
            </FloatingLabel>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default FormDirectivos;
