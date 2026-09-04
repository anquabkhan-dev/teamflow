import { type RootState } from "./store";

export const selectSideBarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectNotification = (state: RootState) => state.ui.notification;