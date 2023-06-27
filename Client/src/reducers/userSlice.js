import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isloggedin:false,
        userdata:null,
    },
    reducers: {
     
      setdata(state,action){
        state.userdata=action.payload
      },
     
      setisLoggedin(state,action){
        state.isloggedin=action.payload
      },
    },
  })


  export default userSlice.reducer
  export const {setdata,setisLoggedin}=userSlice.actions
  