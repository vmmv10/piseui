import { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Api from '../../api/routes';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../context/user/UserContext';
import { toast } from 'react-toastify';


function Login() {
  let navigate = useNavigate();
  const { register, handleSubmit, control, setValue } = useForm();
  const userContext = useContext(UserContext);
  const api = new Api();

  async function onSubmit(data) {
    let resultado = await api.usuarios.login(data);
    if (resultado && resultado.status === 200) {
      let data = resultado.data;
      toast.success('Bienvenido');
      userContext.getProfile(data.usuario);
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('id', data.usuario.id)
      localStorage.setItem('usuario', data.usuario.nombres)
      localStorage.setItem('rbd',data.usuario.rbd)
      navigate("/dashboard/home");
    } else {
      toast.error(resultado.data.msg);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">PISE</h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">Acceda al Plan Integral de Seguridad Educacional</p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nombre de Usuario</label>
                  <input type="text" id="username" placeholder="example@example.com" {...register('username', { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-200">Contraseña</label>
                    <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">¿Olvido su contraseña?</a>
                  </div>
                  <input type="password" {...register('password', { required: false })} placeholder="Contraseña"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Entrar
                  </button>
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">¿No tienes cuenta?
                <a href="/usuarios/registro" className="text-blue-500 focus:outline-none focus:underline hover:underline">Regístrate</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
