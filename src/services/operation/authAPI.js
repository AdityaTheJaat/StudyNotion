import { toast } from "react-hot-toast";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)
      console.log(response.data.success)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch(err){
      console.log("hello ",SENDOTP_API )
      console.log("SENDOTP API ERROR............", err)
      toast.error("Could Not Send OTP")
    }
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
      console.log("LOGIN API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Login Successful")
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({...response.data.user, image:userImage}));
      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/dashboard/my-profile")
    } catch(err){
      console.log("LOGIN API ERROR............", err)
      toast.error("Login Failed")
    }
    toast.dismiss(toastId)
  }
}

export function getResetPasswordToken(email, setEmailSent){
  return async(dispatch) => {
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
      console.log("RESET PASSWORD TOKEN RESPONSE....", response);
      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch(err){
      console.log("RESET PASSWORD TOKEN Error", err);
      toast.error("Failed to send email for resetting password");
    }
  }
}

export function resetPassword(password, confirmPassword, token, navigate){
  return async (dispatch) => {
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
      console.log("RESET Password RESPONSE ... ", response);
      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");
    } catch(err){
      console.log("RESET PASSWORD TOKEN Error", err);
      toast.error("Unable to reset password");
    }
  }
}
