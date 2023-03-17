<template>
  <div>
    <Header />
    <VContainer>
      <!-- Page heading -->
      <VRow align="end" justify="space-between">
        <VCol cols="12" sm="6">
          <h1 class="mb-2">Customers</h1>
          <div>
            <VBtn min-height="40" class="text-capitalize" flat>
              <VIcon start icon="fluent:arrow-download-24-regular" />
              <span>Export</span>
            </VBtn>
            <VBtn min-height="40" class="text-capitalize ml-5" flat>
              <VIcon start icon="fluent:arrow-upload-24-regular" />
              <span>Import</span>
            </VBtn>
          </div>
        </VCol>
        <VCol sm="6" cols="12" class="text-sm-right">
          <VBtn flat min-height="45" color="primary" class="text-capitalize">
            <VIcon start icon="fluent:person-add-24-regular" />
            <span>Create New </span>
          </VBtn>
        </VCol>
      </VRow>
      <!-- Table search -->
      <VRow class="mt-6" align="end" justify="space-between">
        <VCol cols="12" md="4">
          <VTextField
            v-model="search"
            prepend-inner-icon="fluent:search-24-regular"
            type="search"
            clearable
            placeholder="Search customers..."
          />
        </VCol>
      </VRow>

      <VCard class="shadow" rounded="lg">
        <ClientOnly>
          <VDataTable
            :custom-filter="customFilter"
            :search="search"
            v-model="selected"
            :items="customers"
            show-select
            :headers="headers"
          >
            <template v-slot:item.name="{ item }">
              <div class="d-flex my-3">
                <VAvatar size="48" color="primary-lighten-4" :image="item.raw.image" />
                <div class="ml-4">
                  <p class="text-body-1 font-weight-medium">
                    {{ item.raw.firstName }} {{ item.raw.lastName }}
                  </p>
                  <span class="text-medium-emphasis text-body-2">{{ item.raw.email }}</span>
                </div>
              </div>
            </template>
            <template v-slot:item.address="{ item }">
              <div class="my-3">
                <p class="text-body-2">
                  {{ item.raw.address.address }}, {{ item.raw.address.city }}
                  {{ item.raw.address.state }}
                </p>
              </div>
            </template>
            <template v-slot:item.spent="{ item }">
              <div class="d-flex my-3">
                <p class="text-body-2">
                  {{ formatCurrency(item.raw.age * 555) }}
                </p>
              </div>
            </template>
            <template v-slot:item.actions>
              <div class="d-flex align-center">
                <VBtn flat size="small" icon>
                  <VIcon class="text-medium-emphasis" icon="fluent:pen-24-regular" />
                </VBtn>
                <VBtn flat size="small" icon>
                  <VIcon class="text-medium-emphasis" icon="fluent:delete-24-regular" />
                </VBtn>
              </div>
            </template>
          </VDataTable>
        </ClientOnly>
      </VCard>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import { DummyUser } from "@/types";

const selected = ref([]);
const search = ref("");

const headers = ref([
  { title: "Name", key: "name", sortable: false },
  { title: "Address", key: "address", width: 350 },
  { title: "Orders", key: "age" },
  { title: "Total Spent", key: "spent" },
  { title: "Actions", key: "actions", sortable: false },
]);

const { data: customers } = await useAsyncData<DummyUser[]>(
  () => $fetch("https://dummyjson.com/users"),
  {
    default: () => [],
    transform: (data: any) => data.users,
  }
);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(val);
};

const customFilter = (value?: any, query?: string, item?: any) => {
  const q = query?.toLowerCase();
  const f = item.raw?.firstName.toLowerCase();
  const l = item.raw?.lastName.toLowerCase();
  const e = item.raw?.email.toLowerCase();
  const a = item.raw?.age.toString().toLowerCase();

  return f.includes(q) || l.includes(q) || e.includes(q) || a.includes(q);
};
</script>
