import { type RootState } from "/Users/anquabkhan/teamflow/src/store/store.ts";

export const selectSideBarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectNotification = (state: RootState) => state.ui.notification;