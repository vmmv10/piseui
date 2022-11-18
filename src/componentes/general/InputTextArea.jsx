function InputTextArea(props) {

  return (
    <div className="relative flex-1 px-2 py-1 lg:py-2">
      <textarea
        type={props.type ? props.type : "text"}
        id="floating_filled"
        rows={props.rows ? props.rows : '4'}
        {...props.register(props.name, { required: props.bool })}
        className="block rounded-lg px-2.5 pb-2.5 lg:pt-5 pt-11 w-full text-sm lg:mt-1 text-gray-900 dark:bg-gray-700 border border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " />
      <label htmlFor="floating_filled" className="px-2 absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-4 scale-75 top-7 z-10 origin-[0] left-3  lg:mt-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{props.children}</label>
    </div>
  );
}

export default InputTextArea