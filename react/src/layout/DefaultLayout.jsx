import { ReactNode, useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useStateContext } from '../context/ContextProvider'
import axiosInstance from '../axios'
import { Outlet, Navigate } from 'react-router-dom';

// interface DefaultLayoutProps {
//   children: ReactNode;
// }

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, setCurrentUser, userToken, setUserToken } = useStateContext()
  let user = ''
  if (currentUser) {
    user = JSON.parse(currentUser)
  }
  if (!userToken) {
    return <Navigate to={"/auth/login"} />
  }

  const logout = (e) => {
    e.preventDefault()
    axiosInstance.post('/logout')
      .then(() => {
        location.reload(true)
        setCurrentUser({})
        setUserToken(null)
      }).catch((err) => {
        console.log(err)
      })
  }

  const verifyAuth = async () => {
    await axiosInstance.get('/verify-user')
      .then(({data}) => {
        // console.log("user data", res.data.data.user)
        // setCurrentUser(res.data.data.user)
        setCurrentUser(data)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout}/>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout}/>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet/>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
