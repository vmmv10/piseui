import { useNavigate } from "react-router-dom";

function ButtonSlidePrincipal(props) {
    let navigate = useNavigate();

    return (
        <div className="justify-arround px-6 border-b mt-2 border-gray-100 w-auto pb-1">
            <button onClick={()=>{navigate(props.ruta)}} className="flex hover:text-black text-gray-600 w-full py-5 space-x-5">
            {props.children}
            <p className="col-span-5 text-center flex-1 text-sm leading-5 w-full uppercase">{props.nombre}</p>
            <div></div>
            </button>
        </div>
    );
  }

  export default ButtonSlidePrincipal
