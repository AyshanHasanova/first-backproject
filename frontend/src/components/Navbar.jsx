import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetUserProfileQuery, useLogoutMutation } from '../redux/api/userApi'

const Navbar = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetUserProfileQuery()
  const [logout] = useLogoutMutation()
  const [dropdownAciqdirMi, dropdownunStatusunuDeyish] = useState(false)

  const dropdownRef = useRef(null)

  const dropdownuAcBagla = () => {
    dropdownunStatusunuDeyish(!dropdownAciqdirMi)
  }

  const cixishEt = async () => {
    try {
      await logout().unwrap()
      navigate('/login')
    } catch (err) {
      console.error('Logout error', err)
    }
  }

  const user = data?.user

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        dropdownunStatusunuDeyish(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 py-5 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </Link>

     <div className="items-center justify-between hidden w-full absolute top-[70px] left-[0] md:static md:flex md:w-auto" id="navbar-user">

    {
      user? (
         <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li><Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Home</Link></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">About</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Services</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Pricing</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Contact</a></li>
          </ul>
      ) : null
    }
         


        </div>
 
       

        <div className="flex items-center space-x-3 md:space-x-0" ref={dropdownRef}>
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
          ) : user ? (
            <>
              <button onClick={dropdownuAcBagla} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://static.vecteezy.com/system/resources/previews/026/966/960/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                  alt="user avatar"
                />
              </button>

              {dropdownAciqdirMi && (
                <div className="z-50 absolute top-[90px] md:top-[65px] right-[10px] md:right-[110px] lg:right-[220px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-2">
                    {user.role === 'admin' && (
                      <li>
                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <button onClick={cixishEt} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="text-white  bg-blue-500 px-3 py-2 rounded">
              Login
            </Link>
          )}


    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
  </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar