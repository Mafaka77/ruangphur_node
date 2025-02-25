<template>
  <div class="flex flex-col w-full mx-auto p-4">
    <!-- Search Box -->
    <div class="py-2 flex flex-row justify-between">
      <button class="rounded bg-black w-24 text-white" @click="router.push('/user/add')">Add User
      </button>
      <input
          v-model="searchQuery"
          class="border p-2 w-40 mb-4 rounded justify-end items-end"
          placeholder="Search users..."
          type="text"
      />
    </div>


    <!-- Table -->
    <table class="w-full bg-white border rounded-md shadow-md">
      <thead>
      <tr class="bg-black text-white">
        <th class="cursor-pointer p-2 relative" @click="toggleSort('name')">
          Name 🔄
        </th>
        <th class="cursor-pointer p-2 relative" @click="toggleSort('email')">
          Email 🔄
        </th>
        <th class="p-2">Role</th>
        <th class="p-2">District</th>
        <th class="p-2 relative">
          Actions
          <!-- Dropdown Menu for Filters -->
          <div v-if="showMenu" class="absolute right-0 mt-1 bg-white border rounded shadow-md w-40">
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200" @click="filterData('Admin')">
              Filter Admins
            </button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200" @click="filterData('User')">
              Filter Users
            </button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200" @click="clearFilter">
              Clear Filter
            </button>
          </div>
          <button class="ml-2" @click="showMenu = !showMenu">
            ⚙️
          </button>
        </th>
      </tr>
      </thead>

      <!-- Table Body -->
      <tbody>
      <tr v-for="user in users" :key="user._id" class="border-t hover:bg-gray-100">
        <td class="p-2">{{ user.full_name }}</td>
        <td class="p-2">{{ user.email }}</td>
        <td class="p-2">{{ user.roles[0].name }}</td>
        <td class="p-2 flex gap-2">
          <MyChip v-for="data in user.district" :key="data._id" :label="data.name"/>
        </td>
        <td class="p-2">
          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="editUser(user)">
              ✏️ Edit
            </button>
            <button class="bg-red-500 text-white px-3 py-1 rounded" @click="deleteUser(user._id)">
              🗑 Delete
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex gap-2 justify-end items-center mt-4 pt-4">
      <button
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50 w-25"
          @click="currentPage--"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ Math.ceil(totalUsers / perPage) }}</span>
      <button
          :disabled="currentPage * perPage >= totalUsers"
          class="px-4 py-2 border rounded bg-black text-white disabled:opacity-50 w-25"
          @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import {adminApi} from "@/base_service.js";
import router from "@/router/index.js";
import MyChip from "@/components/reusables/MyChip.vue";
import {useSnackbar} from "vue3-snackbar";

const ids = ref('');
const showModal = ref(false);
const users = ref([]);
const totalUsers = ref(0);
const searchQuery = ref("");
const currentPage = ref(1);
const perPage = ref(10);
const sortField = ref("name");
const sortOrder = ref("asc");
const snackbar = useSnackbar();
const fetchUsers = async () => {
  const response = await adminApi.get("http://localhost:5001/api/users", {
    params: {
      page: currentPage.value,
      limit: perPage.value,
      search: searchQuery.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
    },
  });
  users.value = response.data.users;
  console.log(users.value);
  totalUsers.value = response.data.total;
};

// Watch for changes and fetch data
watch([currentPage, searchQuery, sortField, sortOrder], fetchUsers);
onMounted(fetchUsers);

// Handle sorting
const toggleSort = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
};
const editUser = (user) => {
  console.log(user);
  router.push({
    path: '/user/edit', query: {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      mobile: user.mobile,
      district: JSON.stringify(user.district),
      roles: JSON.stringify(user.roles),
    }
  })
}

const deleteUser = async (id) => {
  console.log(id);
  const response = await adminApi.delete(`/delete-users/${id}`)
  if (response.status === 200) {
    if (response.data.status === 200) {
      snackbar.add({
        text: response.data.message,
        type: 'success'
      });
      users.value = users.value.filter(user => user._id !== id);
    } else {
      snackbar.add({
        text: response.data.message,
        type: 'warning'
      });
    }
  }
}
</script>

<style scoped>
th {
  text-align: left;
}
</style>
