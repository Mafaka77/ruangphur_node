<template>
  <div class="flex flex-col gap-2">
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-5 gap-4 pt-3 ">
      <div class="bg-red-100 p-4 rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-2xl font-semibold text-red-500">{{ stats?.pending }}</h1>
        <p class=" text-red-n  500">Incoming</p>
      </div>
      <div class="bg-green-100 p-4  rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-2xl font-semibold text-green-400">{{ stats?.verified }}</h1>
        <p class="text-green-400">Verified</p>
      </div>
      <div class="bg-blue-100 p-4  rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-2xl font-semibold text-blue-400">{{ stats?.approved }}</h1>
        <p class="text-blue-500">Approved</p>
      </div>
      <div class="bg-yellow-100 p-4  rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-2xl font-semibold text-yellow-400">{{ stats?.processing }}</h1>
        <p class="text-yellow-500">Bill Processing</p>
      </div>
      <div class="bg-pink-100 p-4  rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-2xl font-semibold text-pink-400">{{ stats?.rejected }}</h1>
        <p class="text-pink-500">Rejected</p>
      </div>
    </div>

    <!-- Search Box -->
    <div class="py-2 flex flex-row items-center justify-between">
      <!-- Bulk Action Buttons (Left-Aligned) -->
      <div class="flex justify-end-end md:w-60">
        <MyFilterSelect :options="adminStore.user.district" label="Filter by District"
                        placeholder="Filter by District"/>
      </div>
      <!-- Search Input (Right-Aligned) -->
      <input
          v-model="searchQuery"
          class="border p-2 w-40 md:w-60 rounded ml-auto"
          placeholder="Search applications..."
          type="text"
      />
    </div>


    <!-- Table -->
    <table class="w-full bg-white border rounded-md shadow-md">
      <thead>
      <tr class="bg-black text-white hidden md:table-row">
        <th class="p-2">
          <!--          <input v-model="selectAll" type="checkbox" @change="toggleSelectAll"/>-->
        </th>
        <th class="cursor-pointer p-2 relative" @click="toggleSort('name')">
          Dilna ID 🔄
        </th>
        <th class="cursor-pointer p-2 relative" @click="toggleSort('email')">
          Mitthi Hming 🔄
        </th>
        <th class="p-2">Mitthi Veng/Khua</th>
        <th class="p-2">Kilometer</th>
        <th class="p-2">Amount(Rs)</th>
        <th class="p-2">Dil saktu</th>
        <th class="p-2">Dil Phone No</th>
        <th class="p-2">Status</th>
        <th class="p-2">Dil Ni</th>
        <th class="p-2 relative">Actions</th>
      </tr>
      <!--      MOBILE VIEW-->
      <tr class="bg-black text-white md:hidden">
        <th class="p-2">
          <!--          <input v-model="selectAll" type="checkbox" @change="toggleSelectAll"/>-->
        </th>
        <th class="cursor-pointer p-2 relative" @click="toggleSort('name')">
          Dilna ID 🔄
        </th>
        <th class="cursor-pointer p-2 relative" @click="toggleSort('email')">
          Mitthi Hming 🔄
        </th>
        <th class="p-2">Status</th>
        <th class="p-2 relative">Actions</th>
      </tr>
      </thead>

      <!-- Table Body -->
      <tbody>
      <tr v-for="application in applications" :key="application._id"
          class="border-t hover:bg-gray-100 hidden md:table-row">
        <td class="p-2">
          <input v-model="selectedApplications" :value="application._id" type="checkbox"/>
        </td>
        <td class="p-2">{{ application.application_no }}</td>
        <td class="p-2">{{ application.deceased.name }}</td>
        <td class="p-2">{{ application.deceased.locality }}</td>
        <td class="p-2">{{ application.transport.distance }}</td>
        <td class="p-2">{{ application.transport.transport_cost }}</td>
        <td class="p-2">{{ application.applicant.name }}</td>
        <td class="p-2">{{ application.applicant.mobile }}</td>
        <td class="p-2">
          <div
              :class="statusClass(application.status)"
              class="flex justify-center px-3 py-1 rounded text-sm font-medium "
          >
            <span>{{ application.status }}</span>
          </div>
        </td>
        <td class="p-2">{{ application.createdAt }}</td>
        <!-- Action Buttons -->
        <td class="p-2 relative">
          <!-- Three-dot menu -->
          <button class="p-2 rounded hover:bg-gray-200" @click="toggleMenu(application._id)">
            ⋮
          </button>

          <!-- Dropdown Menu -->
          <div v-if="openMenu === application._id"
               class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200"
                    @click="openApplication(application._id)">
              👁️‍🗨️️ View
            </button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200" @click="editApplication(application)">
              ✏️ Edit
            </button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200 text-red-500"
                    @click="deleteApplication(application._id)">
              🗑 Delete
            </button>
          </div>
        </td>
      </tr>
      <!--      MOBILE VIEW-->
      <tr v-for="application in applications" :key="application._id" class="border-t hover:bg-gray-100 md:hidden">
        <td class="p-2">
          <input v-model="selectedApplications" :value="application._id" type="checkbox"/>
        </td>
        <td class="p-2">{{ application.application_no }}</td>
        <td class="p-2">{{ application.deceased.name }}</td>
        <td class="p-2">
          <div
              :class="statusClass(application.status)"
              class="flex flex-row items-center px-3 py-1 rounded text-sm font-medium "
          >
            <span>{{ application.status }}</span>
          </div>
        </td>
        <!-- Action Buttons -->
        <td class="p-2 relative">
          <!-- Three-dot menu -->
          <button class="p-2 rounded hover:bg-gray-200" @click="toggleMenu(application._id)">
            ⋮
          </button>

          <!-- Dropdown Menu -->
          <div v-if="openMenu === application._id"
               class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200"
                    @click="openApplication(application._id)">
              👁️‍🗨️️ View
            </button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200" @click="editApplication(application)">
              ✏️ Edit
            </button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-200 text-red-500"
                    @click="deleteApplication(application._id)">
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
      <span>Page {{ currentPage }} of {{ Math.ceil(totalApplications / perPage) }}</span>
      <button
          :disabled="currentPage * perPage >= totalApplications"
          class="px-4 py-2 border rounded bg-black text-white disabled:opacity-50 w-25"
          @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import {useAdminStore} from "@/stores/adminStore.js";
import {useAdminFormStore} from "@/stores/adminFormStore.js";
import {computed, onBeforeMount, ref, watch} from "vue";
import router from "@/router/index.js";
import {adminApi} from "@/base_service.js";
import {useSnackbar} from "vue3-snackbar";
import MyFilterSelect from "@/components/reusables/MyFilterSelect.vue";
import {useRouter} from "vue-router";

const myRouter = useRouter();
const adminStore = useAdminStore();
const adminFormStore = useAdminFormStore();
const snackbar = useSnackbar();

// Data & States
const openMenu = ref(null);
const selectedApplications = ref([]);
const selectAll = ref(false);
const applications = ref([]);
const totalApplications = ref(0);
const searchQuery = ref("");
const currentPage = ref(1);
const perPage = ref(10);
const sortField = ref("name");
const sortOrder = ref("asc");
const statusFilter = ref("");
const isLoading = ref(false);

// Status colors
const statusClass = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-500";
    case "Pending":
      return "bg-pink-50 text-green";
    case "Rejected":
      return "bg-red-500";
    default:
      return "bg-pink-500 text-green";
  }
};
const fetchApplications = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const response = await adminApi.get("/get-application", {
      params: {
        page: currentPage.value,
        limit: perPage.value,
        search: searchQuery.value,
        sortField: sortField.value,
        sortOrder: sortOrder.value,
        status: statusFilter.value,
      }
    });
    console.log(response.data.applications)
    applications.value = response.data.applications;
    totalApplications.value = response.data.total;
  } catch (error) {
    console.error("Error fetching applications:", error);
  } finally {
    isLoading.value = false;
  }
}; // Debounce 300ms to avoid excessive calls
watch([statusFilter, searchQuery, sortField, sortOrder, currentPage], (newValues, oldValues) => {
  fetchApplications();
}, {deep: true, immediate: true});

// ✅ Watch for Changes & Fetch Data
// watch([statusFilter, searchQuery, sortField, sortOrder, currentPage], debounce(fetchApplications, 500), {
//   deep: true,
// });

// ✅ Sorting Logic
const toggleSort = (field) => {
  sortField.value === field
      ? sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
      : (sortField.value = field, sortOrder.value = "asc");
};

// ✅ Edit Application
const editApplication = (application) => {
  router.push({
    path: '/application/edit',
    query: {
      _id: application._id,
      full_name: application.full_name,
      email: application.email,
      mobile: application.mobile,
      district: application.district?._id || application.district,
      roles: application.roles?.map(role => role.name) || [],
    }
  });
};

// ✅ Delete Application
const deleteApplication = async (id) => {
  try {
    const response = await adminApi.delete(`/delete-application/${id}`);
    if (response.status === 200 && response.data.status === 200) {
      snackbar.add({text: response.data.message, type: 'success'});
      await fetchApplications(); // ✅ Re-fetch instead of manual filtering
    } else {
      snackbar.add({text: response.data.message, type: 'warning'});
    }
  } catch (error) {
    console.error("Error deleting application:", error);
    snackbar.add({text: "Failed to delete application", type: 'error'});
  }
};


// ✅ Load Data on Mount
onBeforeMount(async () => {
  await adminFormStore.index();
  // await fetchApplications();
});
const toggleMenu = (id) => {
  openMenu.value = openMenu.value === id ? null : id;
};
const openApplication = (id) => {
  router.push({path: '/pending/view', query: {id: id}});
}
const stats = computed(() => adminFormStore.getStats);
</script>


<style scoped>
</style>
