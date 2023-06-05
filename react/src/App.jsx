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
import Login from './pages/Authentication/Login';
import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import RequireAuth from './layout/RequireAuth';
import Unauthorized from './pages/Authentication/Unauthorized';
import MissingPage from './layout/MissingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePropertyType from './pages/PropertyType/CreatePropertyType'
import CreateOccupant from './pages/Occupants/CreateOccupant';
import Occupants from './pages/Occupants/Occupants';

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
          {/* Admin/landlord */}
          <Route element={<RequireAuth allowedRoles={[1]}/>}>
            <Route path="/property-type" element={<CreatePropertyType />} />
            <Route path="/create-occupants" element={<CreateOccupant />} />
            <Route path="/create-occupants/:id" element={<CreateOccupant />} />
            <Route path="/occupants" element={<Occupants />} />
            <Route path="/assign-space" element={<Profile />} />
          </Route>

          {/* occupants */}
          <Route element={<RequireAuth allowedRoles={[2]}/>}>
            <Route path="/rent-history" element={<Dashboard />} />
          </Route>

          {/* Admin and occupants */}
          <Route element={<RequireAuth allowedRoles={[1,2]}/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path='unauthorized' element={<Unauthorized />} />

        </Route>

        {/* catch all  */}
        <Route path='*' element={<MissingPage />} />

        <Route path="/ecommerce" element={<ECommerce />} />
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
