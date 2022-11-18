import Busqueda from "./Busqueda";

function Header(props) {
  return (
    <>
      <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 lg:w-2/3 lg:flex-none">
            <Busqueda setTextoBuscar={props.setTextoBuscar} placeholder={props.placeholder} />
          </div>
          <div className="flex justify-end lg:w-1/3">
            <button
              onClick={() => {
                props.setShow(true);
              }}
              className="flex flex-1 lg:flex-none mt-4 sm:mt-0 justify-center lg:justify-end px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
            >
              <p className="text-sm text-center leading-none text-white lg:mt-2">
                {props.tituloButton}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
