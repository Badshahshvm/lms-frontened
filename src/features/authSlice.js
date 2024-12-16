import {createSlite} from "@reduxjs/toolkit"


const inititalState={
              user:null,
              isAuthenticated:false
}

const authSlice=createSlice({
              name:"authSlice",
              initialState,
              reducers:{
                            userLoggesdIn:(state,action)=>
                            {
                                          state.user=action.payload.user,
                                          state.isAuthenticated:true
                            },
                            userLoggedOut=(state,action)=>
                            {
                                          state.user=null,
                                          state.isAuthenticated=false;
                            }
              }
})

export const {userLoggedIn,userLoggedOut}=authSlice.cations;
export default authSlice.reducer