import {defineStore} from "pinia";
import {adminApi} from "@/base_service.js";

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        isOpen: false,
        user: {},
    }),
    getters: {
        getRole: (state) => state.user?.roles?.map(role => role.name) || [],
        getIsOpen: (state) => state.isOpen,
    },
    actions: {
        toggleSidebar() {
            this.isOpen = !this.isOpen;
        },
        async getAuthUser() {
            try {
                const response = await adminApi.get('/me');
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        this.user = response.data.data;
                    } else if (response.data.status === 400) {
                        localStorage.clear();
                    } else {

                    }
                } else {

                }

            } catch (ex) {
                console.log(ex)
            }

        }
    }
});