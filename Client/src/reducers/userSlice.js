import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'users',
    initialState: {
        isloggedin:false,
        userdata:null,
        orders:null
    },
    reducers: {
     
      setdata(state,action){
        state.userdata=action.payload
      },
     
      setisLoggedin(state,action){
        state.isloggedin=action.payload
      },
      setuserorders(state,action){
        state.orders=action.payload
      }
    },
  })


  export default userSlice.reducer
  export const {setdata,setuserorders,setisLoggedin}=userSlice.actions
  