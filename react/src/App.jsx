import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Login from './components/Authentication/Login';
import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import RequireAuth from './layout/RequireAuth';
import Unauthorized from './components/Authentication/Unauthorized';
import MissingPage from './layout/MissingPage';

function App() {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route element={<RequireAuth allowedRoles={[1]}/>}>
            <Route path="/dashboard" element={<ECommerce />} />
            <Route path="/create-property" element={<FormElements />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[2]}/>}>
            <Route path="/dashboard" element={<ECommerce />} />
            <Route path="/paid" element={<Calendar />} />
          </Route>

          <Route path='unauthorized' element={<Unauthorized />} />

        </Route>

        {/* catch all  */}
        <Route path='*' element={<MissingPage />} />

        <Route path="/" element={<ECommerce />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
