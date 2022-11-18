function Cards(props) {

  return (
    <>
      <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div>
          <img className="flex justify-center h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={`${import.meta.env.VITE_APP_API_URL}static/media/images/${props.imagen}`} alt="" />
        </div>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{props.titulo}</h5>
          <p className="text-gray-700 text-base mb-4">
            {props.children}
          </p>
          <button
            onClick={()=>props.click()}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Ver más
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Cards
