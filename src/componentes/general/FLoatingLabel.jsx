function FloatingLabel(props) {

  return (
    <div className="relative flex-1 px-2 smx:mt-3">
      <input
        type={props.type ? props.type : "text"}
        id="floating_filled"
        name={props.name}
        {...props.register(props.name, { required: props.bool })}
        className="block border rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " />
      <label htmlFor="floating_filled" className="px-2 absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-4 scale-75 top-4 origin-[0] left-3 mt-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{props.children}</label>
    </div>
  );
}

export default FloatingLabel
