import {defineStore} from 'pinia';
import {ref} from 'vue';
import {adminApi} from "@/base_service.js";

export const useAuthStore = defineStore('auth',()=>{
  const isAuthenticated=ref(false);
  const userRole=ref(null);
  const isLoading=ref(false);
  const token=localStorage.getItem('admin-token')||ref(null);
  const user=ref({});
  const login=async (credentials,onLoading,onSuccess,onError)=>{
    onLoading();
    isLoading.value=true;
    try{
      const response=await adminApi.post('/login',credentials);
      if(response.status===200) {
        if (response.data.status === 200) {
          token.value = response.data.token;
          localStorage.setItem('token', token.value);
          userRole.value = response.data.user.roles[0].name;
          localStorage.setItem('role', userRole.value);
          isLoading.value = false;
          onSuccess();
        } else if (response.data.status === 404) {
          isLoading.value = false;
          onError(response.data.message);
        } else if (response.data.status === 400) {
          isLoading.value = false;
          onError(response.data.message);
        }
      }else{
        isLoading.value = false;
        onError("Login failed");
      }

    }catch (e) {
      onError(e.response?.data?.message || "Login failed");
    }
  };
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    isAuthenticated.value = !!token; // Converts to boolean (true if token exists)
    userRole.value = localStorage.getItem('role') || '';
  };
  return {isAuthenticated,userRole,checkAuth,login,isLoading,token,user};
});
