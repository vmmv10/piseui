import { useNavigate } from "react-router-dom";

function ButtonSlide(props) {
    let navigate = useNavigate();

    return (
    <button id={props.nombre} className="flex justify-start items-center space-x-5 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-600 rounded px-3 py-2 w-full md:w-auto" onClick={()=>{navigate(props.ruta)}}>
        {props.children}
        <p className="text-base leading-4 flex justify-start">{props.nombre}</p>
    </button>
    );
  }

  export default ButtonSlide
