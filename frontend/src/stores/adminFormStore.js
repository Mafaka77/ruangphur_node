import {defineStore} from "pinia";
import {adminApi} from "@/base_service.js";

export const useAdminFormStore = defineStore('adminFormStore', {
    state: () => ({
        stats: null,
        application: null,
        laoding: false
    }),
    getters: {
        getStats: (state) => state.stats,
        getApplication: (state) => state.application,
        isLoading: (state) => state.loading,
    },
    actions: {
        async index() {
            let response = await adminApi.get('/get-stats');
            this.stats = response.data.data;
        },
        async getApplicationById(id) {
            this.loading = true
            try {
                let response = await adminApi.get(`/get-applicationById/${id}`);
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        console.log(response.data.data)
                        this.application = response.data.data;
                        this.loading = false;
                    } else if (response.data.status === 404) {
                        console.log(response.data.message)
                        this.loading = false;
                    }
                } else {
                    console.log('Error')
                    this.loading = false;
                }

            } catch (e) {
                console.log(e.message)
                this.loading = false;
            }


        },
        async verifyApplication(id, onLoading, onSuccess, onError) {
            onLoading();
            try {
                let response = await adminApi.put(`/verify-application/${id}`,)
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        onSuccess(response.data.message);
                    } else {
                        onError('Something went wrong')
                    }
                } else {
                    onError('Something went wrong')
                }
            } catch (e) {
                onError(e)
            }
        },
        async rejectApplication(id, note, onLoading, onSuccess, onError) {
            onLoading();
            try {
                let response = await adminApi.put(`/reject-application/${id}`, {rejection_note: note})
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        onSuccess(response.data.message);
                    } else if (response.data.status === 404) {
                        onError(response.data.message)
                    } else if (response.data.status === 402) {
                        onError(response.data.message)
                    }
                } else {
                    onError('Something went wrong')
                }
            } catch (e) {
                onError(e)
            }
        }
    },
});