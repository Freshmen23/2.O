import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:"dark"
}

export const themeSlice=createSlice({
    name:"Theme",
    initialState,
    reducers:{
        modeSwitch(state){
              // Toggle between light and dark modes
            state.mode = state.mode === "light" ? "dark" : "light";
             // Update the class on the document's root element
            if (state.mode === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }
})


//export all the functionality individually 
export const {modeSwitch}=themeSlice.actions;
export default themeSlice.reducer;



// Ensure the default mode (dark) is applied on load    
// if (initialState.mode === "dark") {
//     document.documentElement.classList.add("dark");
// }