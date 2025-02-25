import {defineStore} from "pinia";
import {userApi} from "@/base_service.js";

export const useFaqStore = defineStore('faqStore', {
    state: () => ({
        faqList: null,

    }),
    getters: {
        faqListGet: (state) => state.faqList,
    },
    actions: {
        async getFaq() {
            const limit = 20
            try {
                const response = await userApi.get(`/get-faq/${limit}`);

                if (response.status === 200) {
                    if (response.data.status === 200) {
                        this.faqList = response.data.data;
                    } else if (response.data.status === 404) {
                        console.log(response.data.message);
                    }
                }
            } catch (e) {
                console.log(e.response?.data?.message || "Failed to fetch faq");
            }
        }
    }
})