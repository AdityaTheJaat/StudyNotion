import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";

const { UPDATE_PROFILE_API } = settingsEndpoints;

export function updateProfile(token, formdata){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    console.log(token)
    try{
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formdata, {Authorization: `Bearer ${token}`})
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(setUser({...response.data.updatedUserDetails, image: userImage}))
      toast.success("Profile Updated Successfully")
    } catch(err){
      console.log("UPDATE_PROFILE_API API ERROR............", err)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}