function Input(props) {
  return (
    <div className='mb-3 px-2'>
      {props.label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</label>}
      <input
        type={props.type ? props.type : 'text'}
        placeholder={props.children}
        {...props.register(props.name, { required: props.bool })}
        className="block w-full px-4 py-2 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
    </div>
  );
}

export default Input
