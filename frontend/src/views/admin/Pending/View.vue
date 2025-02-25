<template>
  <div class="flex flex-col gap-2">
    <MyDialog :isOpen="isDialogOpen" title="Confirm Action" @close="closeModal" @confirm="handleApproveConfirm">
      <p>Are you sure you want to proceed?</p>
    </MyDialog>
    <RejectionModal
        :isOpen="showRejectionModal"
        title="Enter Rejection Note"
        @close="showRejectionModal = false"
        @confirm="handleRejectionConfirm"
    />
    <div class="flex flex-row justify-between p-2">
      <MyBackButton icon-src="/back-arrow.png" label="Back" on-click="onBackClick"/>
      <div class="flex flex-row items-center gap-5">
        <div>
          <MyBackButton icon-src="/print.png" label="Print" on-click="onBackClick"/>
        </div>
        <div>
          <MyBackButton icon-src="/export.png" label="Export" on-click="onBackClick"/>
        </div>
      </div>

    </div>
    <MyOverlayLoader :is-loading="isLoading"/>
    <!--    <MyShimmer v-if="isLoading" count="20" height="h-6" rounded="rounded-lg" width="w-full"/>-->
    <div v-if="isLoading===false" class=" flex  flex-col  md:px-6">
      <div class="flex flex-col bg-blue-100 py-10">
        <div class="flex flex-col md:flex-row  p-7 gap-4">
          <div v-if="application" class="flex-1/2 flex-col  w-full">
            <div class="flex pb-2 justify-center text-center">
              <img alt="Logo" class="w-10 h-10" src="/kuang.png"/>
            </div>
            <div v-if="application?.deceased" class="justify-center text-center">
              <p class="answer-style text-2xl ">{{ application.deceased.name }}</p>
            </div>
            <div class="justify-center text-center">
              <p class=" ">
                {{ application.deceased.relation.name }} {{
                  application.deceased.name
                }}</p>
            </div>
          </div>
          <div v-if="application" class=" flex flex-col md:flex-row  w-full justify-between">
            <div v-if="application?.transport" class="flex flex-col w-full justify-center text-center">
              <div class="text-3xl answer-style">{{ application.transport.distance }}</div>
              <div>Kilometer</div>
            </div>
            <div v-if="application?.transport" class="flex flex-col w-full justify-center">
              <div class="flex flex-col w-full justify-center text-center">
                <div class="text-3xl answer-style">{{ application.transport.vehicle_number }}</div>
                <div>Motor Reg.</div>
              </div>
            </div>
            <div v-if="application?.transport" class="flex flex-col w-full justify-center">
              <div class="flex flex-col w-full justify-center text-center">
                <div class="text-3xl answer-style">{{ application.transport.transport_cost }}</div>
                <div>Amount(Rs)</div>
              </div>
            </div>
          </div>
        </div>
        <!--        TWO BUTTON-->
        <div class="flex flex-col md:flex-row w-full justify-between">
          <div class="flex w-full text-center justify-center gap-5">
            <button class="bg-black text-white px-7 py-2 w-40 rounded" @click="openApprovedModal">Approved</button>
            <button class="bg-white px-7 py-2 w-40 rounded" @click="openRejectionModal">Reject</button>
          </div>
        </div>
      </div>
      <!--      SECOND SECTION-->
      <div v-if="application" class="flex flex-col md:flex-row md:px-10 md:py-4 gap-4">
        <div v-if="application?.deceased"
             class="flex flex-col rounded border  w-full p-5 gap-3">
          <div class="flex  items-start">
            <p class="answer-style text-sm">Mitthi Chungchang</p>
          </div>

          <!--        DOB-->
          <div class="flex flex-col text-sm">
            <p>Mitthi pianni leh thla</p>
            <p class="answer-style">{{ formatDate(application.deceased?.dob) }}</p>
          </div>
          <!--        GENDER-->
          <div class="flex flex-col text-sm">
            <p>Gender</p>
            <p class="answer-style">{{ application.deceased?.gender }}</p>
          </div>
          <!--        THIHNI LEH DARKAR-->
          <div class="flex flex-col text-sm">
            <p>Thihni leh Darkar</p>
            <p class="answer-style">{{
                formatDateTime(application.deceased?.time_of_death)
              }}</p>
          </div>
          <!--        THIHNA HMUN-->
          <div class="flex flex-col text-sm">
            <p>Thihna hmun</p>
            <p class="answer-style">{{ application.deceased?.place_of_death }}</p>
          </div>
          <!--        DISTRICT-->
          <div class="flex flex-col text-sm">
            <p>District</p>
            <p class="answer-style">{{ application.deceased?.district.name }}</p>
          </div>
          <!--        VENG-->
          <div class="flex flex-col text-sm">
            <p>Veng/Khua</p>
            <p class="answer-style">{{ application.deceased?.locality }}</p>
          </div>
          <!--        CONSTITUENCY-->
          <div class="flex flex-col text-sm">
            <p>Assembly Constituency</p>
            <p class="answer-style">{{ application.deceased?.constituency.name }}</p>
          </div>
        </div>
        <!--        TRANSPORT-->
        <div v-if="application?.transport" class=" flex flex-col w-full">
          <div class="flex flex-col border w-full  p-5 gap-3">
            <div class="flex justify-center text-center ">
              <p class="answer-style text-sm">Ruang phurh leh Motor Chungchang</p>
            </div>
            <!--    STARTING-->
            <p class=" text-sm">Ruang phurh tanna</p>
            <!--    DISTRICT-->
            <div class="flex flex-col px-4 gap-2">
              <div class="flex flex-col text-sm">
                <p class="answer-style">District</p>
                <p>{{ application.transport?.source_district.name }}</p>
              </div>
              <!--    VENG-->
              <div class="flex flex-col text-sm">
                <p class="answer-style">Veng/Khua</p>
                <p>{{ application.transport?.source_locality }}</p>
              </div>
            </div>
            <!--    DESTINATION-->
            <p class=" text-sm">Ruang dahna tur tanna</p>
            <!--    DISTRICT-->
            <div class="flex flex-col px-4 gap-2">
              <div class="flex flex-col text-sm">
                <p class="answer-style">District</p>
                <p>{{ application.transport?.destination_district.name }}</p>
              </div>
              <!--    VENG-->
              <div class="flex flex-col text-sm">
                <p class="answer-style">Veng/Khua</p>
                <p>{{ application.transport?.destination_locality }}</p>
              </div>
              <!--    KILOMETER-->
              <div class="flex flex-col text-sm">
                <p class="answer-style">Kilometer</p>
                <p>{{ application.transport?.distance }}</p>
              </div>
            </div>
            <p class=" text-sm">Ruang phurhna motor</p>
            <!--    MOTOR REGISTRATION-->
            <div class="flex flex-col px-4 gap-2">
              <div class="flex flex-col text-sm">
                <p class="answer-style">Motor Registration Number</p>
                <p>{{ application.transport?.vehicle_number }}</p>
              </div>
              <div class="flex flex-col text-sm">
                <p class="answer-style">Motor Neitu/Khalhtu Hming</p>
                <p>{{ application.transport?.driver_name }}</p>
              </div>
              <div class="flex flex-col text-sm">
                <p class="answer-style">Motor Neitu/Khalhtu Phone Number</p>
                <p>{{ application.transport?.driver_phone }}</p>
              </div>
              <div class="flex flex-col text-sm">
                <p class="answer-style">Motor hman man (Rs) </p>
                <p>{{ application.transport?.transport_cost }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:px-10 md:py-4 gap-4">
        <Documents/>
        <div v-if="application?.applicant" class="w-full">
          <div class="flex flex-col border w-full justify-center p-5 gap-3">
            <div class="flex justify-center text-center">
              <p class="answer-style text-sm">Bank Details</p>
            </div>
            <!--    Bank name-->
            <div class="flex flex-col text-sm">
              <p class="answer-style">Bank Name</p>
              <p>{{ application.applicant.bank_name }}</p>
            </div>

            <!--    DISTRICT-->
            <div class="flex flex-col text-sm">
              <p class="answer-style">Account Number</p>
              <p>{{ application.applicant.account_no }}</p>
            </div>
            <!--    VENG-->
            <div class="flex flex-col text-sm">
              <p class="answer-style">IFSC Code</p>
              <p>{{ application.applicant.ifsc_code }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import {useAdminFormStore} from "@/stores/adminFormStore.js";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import MyBackButton from "@/components/reusables/MyBackButton.vue";
import MyOverlayLoader from "@/components/reusables/MyOverlayLoader.vue";
import Documents from "@/components/ViewAll/Documents.vue";
import MyDialog from "@/components/ViewAll/MyDialog.vue";
import {useSnackbar} from "vue3-snackbar";
import router from "@/router/index.js";
import RejectionModal from "@/components/RejectionModal.vue";

const snackbar = useSnackbar();
const adminFormStore = useAdminFormStore()

const route = useRoute();
const isDialogOpen = ref(false);

const openApprovedModal = () => {
  isDialogOpen.value = true;
};

const closeModal = () => {
  isDialogOpen.value = false;
};

const handleApproveConfirm = async () => {
  console.log(application.value._id);
  await adminFormStore.verifyApplication(application.value._id, () => {
  }, (message) => {
    snackbar.add({title: message, type: 'success'})
    closeModal();
    router.back();
  }, (message) => {
    snackbar.add({title: message, type: 'warning'})
  })

};
const showRejectionModal = ref(false);

const openRejectionModal = () => {
  showRejectionModal.value = true;
};

const handleRejectionConfirm = async (value) => {
  await adminFormStore.rejectApplication(application.value._id, value, () => {
  }, (message) => {
    snackbar.add({title: message, type: 'success'})
    showRejectionModal.value = false;
    router.back();
  }, (message) => {
    snackbar.add({title: message, type: 'warning'})
  })

};
onMounted(() => {
  const id = route.query.id;
  if (id) {
    adminFormStore.getApplicationById(id)
  }
})

function formatDateTime(date) {
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) return "Invalid Date"; // Handle invalid inputs

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(newDate).replace(",", "");
}

function formatDate(date) {

  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) return "Invalid Date"; // Handle invalid inputs
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(newDate).replace(",", ",");
}

const application = computed(() => adminFormStore.getApplication);
const isLoading = computed(() => adminFormStore.isLoading);
</script>

<style scoped>

</style>