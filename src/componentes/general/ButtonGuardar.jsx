function ButtonGuardar(props) {
  return (
    <div className="flex flex-col items-center mt-3 lg:flex-none flex-1 justify-center w-full px-2 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
      <button
        type="submit"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="bg-green-500 lg:flex-none flex-1 rounded active:bg-green-700  transform duration-300 ease-in-out text-xl font-medium px-6 py-4 text-white lg:max-w-[144px] w-full "
      >
        {props.editando ? 'Editar' : 'Guardar'}
      </button>
    </div>
  );
}

export default ButtonGuardar;
