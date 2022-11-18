import { useNavigate } from "react-router-dom";

function ButtonSideBar(props) {
  let navigate = useNavigate();

  return (
    <a
      href="#"
      onClick={() => navigate(props.ruta)}
      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
    >
      <span className="inline-flex justify-center items-center ml-4">
        {props.children}
      </span>
      <span className="ml-2 text-sm tracking-wide truncate">{props.titulo}</span>
    </a>
  );
}

export default ButtonSideBar;
