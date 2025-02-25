import {defineStore} from "pinia";
import {userApi} from "@/base_service.js";

export const useTrackStore = defineStore('trackStore', {
    state: () => ({
        isLoading: false,
        isTrackLoading: false,
        applicationData: null,
        isTrackVisible: false,
        currentIndex: 0,
        form: {
            trackingID: ''
        }
    }),
    getters: {
        getApplicationData: (state) => state.applicationData,
        getIsTrackVisible: (state) => state.isTrackVisible,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async getApplications(id, onLoading, onSuccess, onError) {
            onLoading();
            try {
                const response = await userApi.get(`/view-application/${id}`);
                console.log(response);
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        console.log(response.data);
                        this.applicationData = response.data.data;
                        this.currentIndex = 1;
                        onSuccess(response.data.message);
                    } else if (response.data.status === 404) {
                        onError(response.data.message);
                    } else {
                        onError('Error Occured');
                    }
                } else {
                    onError('Error Occured');
                }
            } catch (e) {
                onError(e.message);
            }
        },
        async trackApplication(id, onLoading, onSuccess, onError) {
            onLoading();
            try {
                const response = await userApi.get(`/track-application/${id}`);
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        this.isTrackVisible = true;
                        this.applicationData = response.data.data;
                        onSuccess(response.data.message);
                    } else if (response.data.status === 404) {
                        this.isTrackVisible = false;
                        onError(response.data.message);
                    } else {
                        this.isTrackVisible = false;
                        onError('Error Occured');
                    }
                } else {
                    this.isTrackVisible = false;
                    onError('Error Occured');
                }
            } catch (e) {
                this.isTrackVisible = false;
                onError(e.message);
            }
        }
    }
})