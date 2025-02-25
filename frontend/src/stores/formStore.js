import {defineStore} from "pinia";
import {userApi} from "@/base_service.js";

export const useFormStore = defineStore('formStore', {
    state: () => ({
        isOtpLoading: false,
        isVerifyLoading: false,
        isSubmitLoading: false,
        currentStep: 0,
        relation: null,
        district: null,
        constituency: null,
        acknowledge: false,
        otp: '',
        application_no: '',
        first_step: {
            name: '',
            relation: '',
            relation_id: 0,
            relative_name: '',
            dob: '',
            gender_id: 0,
            gender: '',
            district: '',
            district_id: 0,
            constituency: '',
            constituency_id: 0,
            locality: '',
            death_time: '',
            place_of_death: '',
        },
        second_step: {
            source_district: 0,
            source_district_name: '',
            destination_district: 0,
            destination_district_name: '',
            source_locality: '',
            destination_locality: '',
            source_lat: '',
            source_lng: '',
            destination_lat: '',
            destination_lng: '',
            vehicle_no: '',
            driver_name: '',
            driver_phone: '',
            distance: 0,
            transport_cost: '',

        },
        third_step: {
            name: '',
            mobile: '',
            districts: '',
            district_id: 0,
            locality: '',
            bank_name: '',
            account_no: '',
            ifsc_code: '',
            id_proof: '',
            receipt: '',
            death_certificate: '',
            additional_document: '',
        }
    }),
    getters: {
        getRelation: (state) => state.relation,
        getDistrict: (state) => state.district,
        getConstituency: (state) => state.constituency,
        getcurrentStep: (state) => state.currentStep,
        getFirstStep: (state) => state.first_step,
        getSecondStep: (state) => state.second_step,
        getThirdStep: (state) => state.third_step,
        getApplicationNo: (state) => state.application_no,
    },
    actions: {
        async getAllRelation() {
            const response = await userApi.get('/get-relation');
            this.relation = response.data.data;

        },
        async getAllDistrict() {
            const response = await userApi.get('/get-district');
            this.district = response.data.data;
        },
        async getConstituencyById(id) {
            const response = await userApi.get(`/get-constituency/${id}`);
            this.constituency = response.data.data;
        },
        async sendOtp(mobile, onLoading, onSuccess, onError,) {
            onLoading();
            try {
                const response = await userApi.post('/send-otp', {
                    mobile: mobile,
                })

                if (response.status === 200) {
                    if (response.data.status === 200) {
                        this.application_no = response.data.data;
                        onSuccess(response.data.message)
                    } else if (response.data.status === 500) {
                        onError(response.data.message)
                    }

                }
            } catch (e) {
                onError(e.message)
            }

        },
        async verifyOtp(mobile, otp, onLoading, onSuccess, onError) {
            onLoading();
            try {
                let response = await userApi.post('/verify-otp', {
                    mobile: mobile, otp: otp,
                });
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        onSuccess(response.data.message);
                    } else if (response.data.status === 500) {
                        onError(response.data.message)
                    } else if (response.data.status === 400) {
                        onError(response.data.message)
                    } else {
                        onError(response.data.message);
                    }
                } else {
                    onError('Error Occured')
                }
            } catch (e) {
                onError(e.message)
            }
        },

        async submitForm(onLoading, onSuccess, onError) {
            onLoading();
            try {
                const response = await userApi.post('/submit-form', {
                    deceased: this.first_step,
                    transport: this.second_step,
                    applicant: this.third_step,
                });
                if (response.status === 200) {
                    if (response.data.status === 201) {
                        this.application_no = response.data.data;
                        onSuccess(response.data.message);
                    } else {
                        onError('Error Occured! Try again')
                    }
                } else {
                    onError('Error Occured! Try again')
                }

            } catch (e) {
                onError(e.error)
            }
        }

    }
})