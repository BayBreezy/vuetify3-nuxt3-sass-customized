<template>
  <VAppBar class="px-md-5 shadow">
    <VBtn @click="dialog = !dialog" icon variant="plain">
      <VIcon icon="fluent:search-24-regular" />
    </VBtn>
    <VSpacer />
    <!-- Theme switcher -->
    <VBtn @click="toggleTheme" class="mr-2" icon>
      <VIcon class="text-medium-emphasis" icon="fluent:weather-sunny-24-regular" />
    </VBtn>
    <!-- Language Switcher -->
    <v-menu width="180">
      <template v-slot:activator="{ props }">
        <VBtn class="mr-2" v-bind="props" icon>
          <VIcon
            v-if="selectedLanguage"
            class="text-medium-emphasis"
            :icon="selectedLanguage?.icon"
          />
        </VBtn>
      </template>
      <VCard rounded="lg" class="shadow">
        <VList>
          <VListSubheader>Select language</VListSubheader>
          <v-list-item
            @click="selectedLanguage = item"
            class="mx-2 mb-2 rounded-lg"
            density="comfortable"
            v-for="item in languages"
            :key="item.title"
            :value="item"
          >
            <template #prepend>
              <VIcon :icon="item.icon" size="22" class="mr-4" />
            </template>
            <v-list-item-title class="text-subtitle-2">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </VList>
      </VCard>
    </v-menu>
    <!-- Notification -->
    <v-menu width="400">
      <template v-slot:activator="{ props }">
        <VBtn class="mr-2" v-bind="props" icon>
          <v-badge v-if="notificationCount" :content="notificationCount" color="primary">
            <VIcon class="text-medium-emphasis" icon="fluent:alert-24-regular" />
          </v-badge>
          <VIcon class="text-medium-emphasis" v-else icon="fluent:alert-24-regular" />
        </VBtn>
      </template>
      <VCard rounded="lg" class="shadow">
        <VCardTitle class="d-flex align-center justify-space-between">
          <span class="font-weight-bold text-subtitle-1">Notifications</span>
          <VTooltip location="bottom" text="Mark all as read">
            <template v-slot:activator="{ props }">
              <VBtn @click="notificationCount = 0" v-bind="props" icon flat>
                <VIcon size="22" icon="ph:envelope-open-light" />
              </VBtn>
            </template>
          </VTooltip>
        </VCardTitle>
        <v-list lines="three">
          <v-list-item
            density="comfortable"
            v-for="item in notifications"
            :key="item.title"
            :value="item"
          >
            <template #prepend>
              <VAvatar size="50" class="bg-grey-lighten-3">
                <VIcon :icon="item.icon" />
              </VAvatar>
            </template>
            <template #title>
              <span v-html="item.title" class="text-subtitle-1 font-weight-bold"></span>
            </template>
            <template #subtitle>
              <span
                :class="[darkTheme ? 'font-weight-light' : '']"
                v-html="item.text"
                class="text-subtitle-2"
              ></span>
              <br />
              <span
                :class="[darkTheme ? 'text-primary-lighten-2' : 'text-primary']"
                class="text-caption"
                >{{ item.date }}</span
              >
            </template>
          </v-list-item>
        </v-list>
      </VCard>
    </v-menu>
    <!-- Contacts -->
    <v-menu width="300">
      <template v-slot:activator="{ props }">
        <VBtn class="mr-2" v-bind="props" icon>
          <VIcon class="text-medium-emphasis" icon="fluent:people-24-regular" />
        </VBtn>
      </template>
      <VCard rounded="lg" class="shadow">
        <VCardTitle class="d-flex align-center py-4 justify-space-between">
          <span class="font-weight-bold text-subtitle-1">Contacts</span>
        </VCardTitle>
        <v-list nav>
          <v-list-item v-for="item in contacts" :key="item.name" :value="item">
            <template #prepend>
              <VAvatar size="32" :image="item.image"> </VAvatar>
            </template>
            <template #title>
              <span v-html="item.name" class="text-subtitle-2 font-weight-medium"></span>
            </template>
            <template #append>
              <VBadge
                :color="item.online ? 'success' : 'grey-lighten-1'"
                inline
                location="end center"
                dot
              ></VBadge>
            </template>
          </v-list-item>
        </v-list>
      </VCard>
    </v-menu>

    <!-- Profile -->
    <v-menu width="250">
      <template v-slot:activator="{ props }">
        <VBtn class="mr-2" v-bind="props" icon>
          <VAvatar size="36">
            <VImg src="https://randomuser.me/api/portraits/med/men/25.jpg" />
          </VAvatar>
        </VBtn>
      </template>
      <VCard rounded="lg" class="shadow">
        <VListItem class="ma-2 mb-3">
          <template #title>
            <span class="text-subtitle-1 font-weight-medium">John Smith</span>
          </template>
          <template #subtitle>
            <span>johnsmith@example.com</span>
          </template>
        </VListItem>
        <VDivider />
        <v-list nav>
          <v-list-item v-for="item in profileActions" :key="item.title" :value="item">
            <template #prepend>
              <VIcon class="text-medium-emphasis mr-5" :icon="item.icon" />
            </template>
            <template #title>
              <span v-html="item.title" class="text-subtitle-2 font-weight-medium"></span>
            </template>
          </v-list-item>
        </v-list>
        <VDivider />
        <VList nav>
          <v-list-item link>
            <template #prepend>
              <VIcon class="text-medium-emphasis mr-5" icon="fluent:arrow-exit-20-regular" />
            </template>
            <template #title>
              <span class="text-subtitle-2 font-weight-medium">Logout</span>
            </template>
          </v-list-item>
        </VList>
      </VCard>
    </v-menu>
  </VAppBar>

  <!-- Search modal -->
  <VDialog
    z-index="99999"
    :scrim="darkTheme ? 'grey-darken-4' : 'grey-darken-2'"
    scrollable
    v-model="dialog"
    max-width="400"
  >
    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-medium">Search</span>
        <VBtn @click="dialog = false" flat size="small" icon>
          <VIcon icon="fluent:dismiss-24-regular" />
        </VBtn>
      </VCardTitle>
      <VCardText class="pb-0">
        <VTextField
          clearable
          autofocus
          v-model="search"
          placeholder="Enter a search value..."
          prepend-inner-icon="fluent:search-24-regular"
        />
      </VCardText>
      <VExpandTransition leave-absolute>
        <VCardText v-if="search" class="pa-0" style="height: 300px">
          <VList lines="two">
            <VListSubheader>Results</VListSubheader>
            <VListItem
              v-for="n in searchResults"
              :key="`search-${n.name}`"
              :title="n.name"
              :prepend-avatar="n.image"
            >
              <template #subtitle>
                <span
                  >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, neque. Ad
                  eligendi quis ab vero laborum placeat doloribus quae voluptatum veniam, culpa
                  ullam magnam iure mollitia qui sequi deserunt similique!</span
                >
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VExpandTransition>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import dayjs from "dayjs";

const theme = useTheme();

const languages = ref([
  { icon: "flag:jm-4x3", title: "English" },
  { icon: "flag:es-4x3", title: "Spanish" },
  { icon: "flag:fr-4x3", title: "French" },
]);
const selectedLanguage = ref(languages.value[0]);

const notificationCount = ref(2);

const notifications = ref([
  {
    title: "New Order",
    text: "A new order was just placed by <strong>Jane Doe</strong>.",
    date: dayjs().format("MMM DD, YYYY, h:mm A"),
    icon: "fluent:box-24-regular",
  },
  {
    title: "New Customer",
    text: "<strong>Orlando Doe</strong> joined today.",
    date: dayjs().format("MMM DD, YYYY, h:mm A"),
    icon: "fluent:person-24-regular",
  },
]);

const contacts = ref([
  {
    image: "https://randomuser.me/api/portraits/med/women/75.jpg",
    name: "Linda Cross",
    online: true,
  },
  {
    image: "https://randomuser.me/api/portraits/med/men/75.jpg",
    name: "James Smith",
    online: true,
  },
  {
    image: "https://randomuser.me/api/portraits/med/men/35.jpg",
    name: "Carlos Sanchez",
    online: false,
  },
  {
    image: "https://randomuser.me/api/portraits/med/women/35.jpg",
    name: "Cindy Lowe",
    online: true,
  },
]);

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value == MAIN_THEME ? MAIN_DARK_THEME : MAIN_THEME;
};

const darkTheme = computed(() => theme.current.value.dark);

const profileActions = ref([
  { icon: "fluent:person-24-regular", title: "Profile" },
  { icon: "fluent:settings-24-regular", title: "Settings" },
  { icon: "fluent:wallet-credit-card-24-regular", title: "Billing" },
]);

const dialog = ref(false);

const searchResults = ref([
  { image: "http://placeimg.com/480/480/cats", name: "Gloria Maggio" },
  { image: "http://placeimg.com/480/480/cats", name: "Meredith Kohler" },
  { image: "http://placeimg.com/480/480/cats", name: "George Rosenbaum PhD" },
  { image: "http://placeimg.com/480/480/cats", name: "Cecilia Cassin" },
  { image: "http://placeimg.com/480/480/cats", name: "Courtney Walsh DVM" },
  { image: "http://placeimg.com/480/480/cats", name: "Ralph Bechtelar Jr." },
]);
const search = ref("");
</script>
