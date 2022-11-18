import { GiTeacher } from 'react-icons/gi';

function Docentes(props) {
  return (
    <>
      <div className="flex flex-1 justify-center break-words bg-white mb-6 shadow-lg rounded px-4 py-4">
        <div className='flex'>
          <div className="flex items-center justify-center h-16 w-16 text-black bg-purple-100 rounded-full mt-2 mr-6">
            <GiTeacher/>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <div className="flex mt-3 text-3xl font-bold leading-8">
            {props.docentes}
          </div>
          <div className="flex mt-1 text-base text-gray-600"> Docentes</div>
        </div>
      </div>
    </>
  );
}

export default Docentes;
