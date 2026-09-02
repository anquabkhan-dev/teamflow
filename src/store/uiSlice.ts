import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
    sidebarOpen: boolean,
    notification: string | null
}

const initialState : UIState = {
    sidebarOpen: true,
    notification: null
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers : {
        toggleSidebar: (state: UIState) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        openSidebar: (state) => {
            state.sidebarOpen = true
        },
        closeSidebar: (state) => {
            state.sidebarOpen = false
        },

        setNotification: (state, action: PayloadAction<string>) => {
            state.notification = action.payload
        },

        clearNotification : (state) => {
            state.notification = null
        }
    }
})

export const {
    toggleSidebar, openSidebar, closeSidebar, setNotification, clearNotification
} = uiSlice.actions;

export default uiSlice.reducer;