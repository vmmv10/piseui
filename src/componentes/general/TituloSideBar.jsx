function TituloSideBar(props) {
  return (
    <>
      <li className="px-5">
        <div className="flex flex-row items-center h-8">
          <div className="text-sm font-light tracking-wide text-gray-500">
            {props.titulo}
          </div>
        </div>
      </li>
    </>
  );
}
export default TituloSideBar;
