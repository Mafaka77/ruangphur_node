<template>
  <div class="flex flex-col gap-4 p-2 md:px-100  pt-10">
    <button
        class=" w-40 flex py-2 rounded-md hover:bg-gray-100" @click="router.back()">
      <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      BACK
    </button>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col py-4  rounded-lg  p-4 justify-center border border-gray:50 gap-2">
        <div class="">
          <h1 class="answer-styl text-center items-center">Edit User</h1>
        </div>
        <MyTextField v-model="form.email" label="Email" placeholder="Enter email" required/>
        <MyTextField v-model="form.full_name" label="Full Name" placeholder="Enter full name" required/>
        <MyTextField v-model="form.mobile" label="Mobile" placeholder="Enter Mobile Number" required/>
        <MyMultiSelect v-model="form.district" :multiple="true" :options="districtList" label="District"/>
        <MyMultiSelect v-model="form.roles" :multiple="false" :options="roleList" label="Role"/>
        <!--        <MySelect v-model="form.roles" :options="roleList" label="Select Role" placeholder="Select Roles" required/>-->
        <MyTextField v-model="form.password" label="Password" placeholder="Enter Password" type="password"/>

        <div class="flex flex-row gap-2 pt-5">
          <button class="w-40 outline p-2 rounded">
            BACK
          </button>
          <MyCirculaProgressButton :class="['w-full']" :loading="isLoading" bg-color="bg-black" label="SUBMIT"
                                   type="Submit"/>
          <!--          <button class="w-full bg-black text-white p-2 rounded" type="submit">-->
          <!--            SUBMIT-->
          <!--          </button>-->
        </div>
      </div>
    </form>

  </div>
</template>
<script setup>
import MyTextField from "@/components/reusables/MyTextField.vue";
import {onMounted, ref, watch} from "vue";
import MyMultiSelect from "@/components/reusables/MyMultiSelect.vue";
import {adminApi} from "@/base_service.js";
import router from "@/router/index.js";
import MyCirculaProgressButton from "@/components/reusables/MyCirculaProgressButton.vue";
import {useSnackbar} from "vue3-snackbar";
import {useRoute} from "vue-router";

const route = useRoute();
const snackbar = useSnackbar();
const isLoading = ref(false);
const districtList = ref([])
const roleList = ref([]);
const form = ref({
  _id: '',
  full_name: '',
  email: '',
  mobile: '',
  password: '',
  roles: [],
  district: [],
});
onMounted(async () => {
  await getDistrict();
  await getRoles();
// Ensure district and roles are parsed correctly
  const parsedDistricts = route.query.district ? JSON.parse(route.query.district) : [];
  const parsedRoles = route.query.roles ? JSON.parse(route.query.roles) : [];
  console.log(parsedRoles)
  form.value = {
    ...route.query,
    district: districtList.value.filter(d => parsedDistricts.some(pd => pd._id === d._id)),  // ✅ Match IDs
    roles: roleList.value.filter(r => parsedRoles.some(pr => pr._id === r._id))  // ✅ Match IDs
  };
})
// console.log(route.query.roles ? JSON.parse(route.query.roles) : []);
const getDistrict = async () => {
  const response = await adminApi.get('/get-district');
  districtList.value = response.data.data;
}
const getRoles = async () => {
  const response = await adminApi.get('/get-roles');
  roleList.value = response.data.data;

}
const submitForm = async () => {
  try {
    const response = await adminApi.put('/edit-users', {data: form.value});
    if (response.status === 200) {
      if (response.data.status === 201) {
        snackbar.add({
          text: response.data.message,
          type: 'success'
        })
        router.back();
      } else if (response.data.status === 500) {
        snackbar.add({
          text: response.data.message,
          type: 'error'
        })
      } else {
        snackbar.add({
          text: response.data.message,
          type: 'error'
        })
      }
    } else {
      snackbar.add({
        text: response.data.message,
        type: 'error'
      })
    }

  } catch (e) {
    snackbar.add({
      text: e,
      type: 'error'
    })
  }
}

watch([districtList, roleList], () => {
  if (districtList.value.length && form.value.district.length) {
    form.value.district = districtList.value.filter(d =>
        form.value.district.some(pd => pd._id === d._id)
    );
  }

  if (roleList.value.length && form.value.roles.length) {
    form.value.roles = roleList.value.filter(r =>
        form.value.roles.some(pr => pr._id === r._id)
    );
  }
});

</script>

<style scoped>

</style>