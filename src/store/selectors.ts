import type { RootState } from "@reduxjs/toolkit/query";

export const selectSideBarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectNotification = (state: RootState) => state.ui.notification;