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
import Properties from './pages/Property/Properties';
import CreateProperty from './pages/Property/CreateProperty';
import CreateSpace from './pages/Space/CreateSpace';
import Spaces from './pages/Space/Spaces';
import PropertySpaceList from './pages/Space/PropertySpaceList';
import EditSpace from './pages/Space/EditSpace';
import AssignSpace from './pages/Space/AssignSpace';
import CreateRent from './pages/Rent/CreateRent';
import DueRent from './pages/Rent/DueRent';
import RentSlip from './pages/Rent/RentSlip';
import Rents from './pages/Rent/Rents';
import RentReceipt from './pages/Rent/RentReceipt';
import OccupantRentSlip from './pages/Rent/OccupantRentSlip';
import OccupantDueRent from './pages/Rent/OccupantDueRent';
import OccupantPayRent from './pages/Payment/OccupantPayRent';
import PaymentMethodSetup from './pages/Payment/PaymentMethodSetup';
import ResetPwd from './pages/Authentication/ResetPwd';
import NewPwd from './pages/Authentication/NewPwd';
import RentHistoryPublic from './pages/Rent/RentHistoryPublic';
import RentReceiptPublic from './pages/Rent/RentReceiptPublic';
import OccupantsReport from './pages/Occupants/OccupantsReport';

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
          <Route path="/auth/reset-credentials" element={<ResetPwd />} />
          <Route path="/auth/reset-login-details/:token" element={<NewPwd />} />
          <Route path="/my-rent-history" element={<RentHistoryPublic />} />
          <Route path="/rent-receipt-public/:id" element={<RentReceiptPublic />} />
        </Route>

        <Route element={<DefaultLayout />}>
          {/* Admin/landlord */}
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/property-type" element={<CreatePropertyType />} />
            <Route path="/create-occupants" element={<CreateOccupant />} />
            <Route path="/create-occupants/:id" element={<CreateOccupant />} />
            <Route path="/occupants" element={<Occupants />} />
            <Route path="/all-occupants" element={<OccupantsReport />} />
            <Route path="/create-property" element={<CreateProperty />} />
            <Route path="/properties" element={<Properties />} />
            <Route path='/property-edit/:id' element={<CreateProperty />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/create-space" element={<CreateSpace />} />
            <Route path="/edit-space/:id" element={<EditSpace />} />
            <Route path="/property-spaces/:id/:p_name" element={<PropertySpaceList />} />
            <Route path="/assign-space" element={<AssignSpace />} />
            <Route path="/create-paid-rent" element={<CreateRent />} />
            <Route path="/create-paid-rent/:id" element={<CreateRent />} />
            <Route path="/view-paid-rent" element={<Rents />} />
            <Route path="/rent-receipt/:id" element={<RentReceipt />} />
            <Route path="/due-rent" element={<DueRent />} />
            <Route path="/rent-slip" element={<RentSlip />} />
            <Route path="/payment-method-settings" element={<PaymentMethodSetup />} />
          </Route>

          {/* occupants */}
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route path="/occupant-dashboard" element={<Dashboard />} />
            <Route path="/occupant-profile" element={<Profile />} />
            <Route path="/occupant-pay-rent" element={<OccupantPayRent />} />
            <Route path="/occupant-due-rent" element={<OccupantDueRent />} />
            <Route path="/occupant-rent-slip" element={<OccupantRentSlip />} />
            <Route path="/occupant-rent-receipt/:id" element={<RentReceipt />} />
          </Route>

          {/* Admin and occupants */}
          {/* <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rent-slip" element={<RentSlip />} />
          </Route> */}

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
