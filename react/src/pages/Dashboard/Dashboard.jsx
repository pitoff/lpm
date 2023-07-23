import React from 'react'
import CardOne from '../../components/CardOne'
import CardTwo from '../../components/CardTwo'
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour'
import { useStateContext } from '../../context/ContextProvider.jsx';
import { CreditCardIcon, ListBulletIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const { currentUser } = useStateContext()
  let user = ''
  if (currentUser) {
    user = JSON.parse(currentUser)
  }

  return (
    <div>
      {user && user.role == 2 && <>

        <div className='m-5'>
            <h3 className='font-bold text-center text-success'> <marquee> {user && user.lastname+' '+user.firstname} Welcome to your Apartment!</marquee></h3>
        </div>        

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">

          <Link to={`/occupant-profile`}>
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <UserCircleIcon className='w-6 h-6' />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    My Profile
                  </h4>
                  <span className="text-sm font-medium">Personal Info</span>
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                  <UserCircleIcon className='w-6 h-6' />
                </span>
              </div>
            </div>
          </Link>

          <Link to={`/occupant-pay-rent`}>
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center rounded-full justify-center bg-meta-2 dark:bg-meta-4">
                <CreditCardIcon className='w-6 h-6' />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    Pay Rent
                  </h4>
                  <span className="text-sm font-medium">Pay yearly rent</span>
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-meta-3">

                  <CreditCardIcon className='w-6 h-6' />
                </span>
              </div>
            </div>
          </Link>

          <Link to={`/occupant-rent-slip`}>
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <ListBulletIcon className='w-6 h-6' />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    Rent Receipt
                  </h4>
                  <span className="text-sm font-medium">Payment history</span>
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                  <ListBulletIcon className='w-6 h-6' />
                </span>
              </div>
            </div>
          </Link>

        </div>

        </>
      }

      {user && user.role == 1 &&
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardOne />
          <CardTwo />
          <CardThree />
          <CardFour />
        </div>
      }

    </div>
  )
}

export default Dashboard