import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { Toaster, toast } from "sonner";
import User_Dashboard from "./Pages/User_Dashboard";
import PrivetRoute from "./PrivetRoute";
import AuthPrivetRoute from "./AuthPrivetRoute";
import ErrorPage from "./Components/ErrorPage";
import AdminPrivetRoute from "./AdminPrivetRoute";
import Admin_Layout from "./Pages/Admin_Layout";
import Admin_Dashboard from "./Components/Admin_Dashboard";
import { lazy, Suspense } from "react";
import Spinner from "./Components/spinner.jsx";


const User = lazy(() => import("./Components/User.jsx"))
function App() {
  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persist}>
        <Toaster richColors position="top-center" />
          <Router>
            <Routes>
              <Route path="/" element={<AuthPrivetRoute><Signin /></AuthPrivetRoute> }/>
              <Route path="/signup" element={<AuthPrivetRoute><Signup /></AuthPrivetRoute >} />
              <Route path="/userhome" element={<PrivetRoute><User_Dashboard /></PrivetRoute>}>
              
              </Route>

              <Route path="/adminhome" element={<AdminPrivetRoute><Admin_Layout/></AdminPrivetRoute> }>
               <Route index element={<Admin_Dashboard />}/>
               <Route path="/adminhome/user" element={<Suspense fallback={<Spinner />} ><User /> </ Suspense>}/> 

              </Route>

             <Route path="*" element={<ErrorPage />} />

            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
