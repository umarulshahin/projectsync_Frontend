import axios from "axios";
import { Signin_URL, Signup_URL } from "../Utils/Constance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { addUserdata } from "../Redux/UserSlice";
import { addAdmindata } from "../Redux/AdminSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Signup_Axios = async (data, setSubmitting) => {
    try {
      const response = await axios.post(Signup_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        console.log(response.data, "sign up response");
        navigate("/");
        toast.success("Account succussfully created.");
      }
    } catch (error) {
      console.log(error, "signup axios");

      if (error.response) {
        const { data } = error.response;
        const errorMessage = data?.error?.email
          ? "user with this email already exists."
          : "Something went wrong";

        toast.warning(errorMessage);
      } else {
        toast.error("Network error or server not responding");
      }
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const Signin_Axios = async (data, setSubmitting) => {
    try {
      const response = await axios.post(Signin_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {

        const userDetails = jwtDecode(response.data.access);

        const { username, role, user_id } = userDetails;

        const user = {
          username: username,
          role: role,
          user_id: user_id,
        };

        if (role) {
            
          Cookies.set("adminToken",JSON.stringify(response.data),{expires:30})
          dispatch(addAdmindata(user))
          navigate("/adminhome", { replace: true })
        } else {
          Cookies.set("userToken", JSON.stringify(response.data), {expires: 30,});
          dispatch(addUserdata(user));
          navigate("/userhome",);
        }

        toast.success("Successfully Sign in");
      }
    } catch (error) {
      console.log(error, "sign in axios error");
      if (error.response.data.detail) {
        const errorMessage =
          error.response.data.detail || "Something went wrong";
        toast.warning(errorMessage);
      } else {
        toast.error("Network error or server not responding");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return { Signup_Axios, Signin_Axios };
};

export default useAuth;
