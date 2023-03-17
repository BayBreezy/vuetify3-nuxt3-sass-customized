import { h } from "vue";
import type { IconSet, IconAliases, IconProps } from "vuetify";
import { Icon } from "@iconify/vue";

const aliases: IconAliases = {
  collapse: "mdi-menu-up",
  complete: "fluent:checkmark-24-regular",
  cancel: "fluent:dismiss-circle-24-regular",
  close: "fluent:dismiss-24-regular",
  delete: "fluent:delete-24-regular",
  clear: "fluent:dismiss-circle-24-regular",
  success: "fluent:checkmark-circle-24-regular",
  info: "fluent:info-24-regular",
  warning: "fluent:warning-24-regular",
  error: "fluent:dismiss-circle-24-regular",
  prev: "mdi-menu-left",
  next: "mdi-menu-right",
  checkboxOn: "fluent:checkbox-checked-24-filled",
  checkboxOff: "fluent:square-24-regular",
  checkboxIndeterminate: "fluent:checkbox-indeterminate-24-regular",
  delimiter: "fluent:circle-24-filled",
  sort: "fluent:arrow-bidirectional-up-down-24-regular",
  expand: "mdi-menu-down",
  menu: "fluent:list-24-regular",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "fluent:radio-button-24-filled",
  radioOff: "fluent:radio-button-24-regular",
  edit: "fluent:pen-24-regular",
  ratingEmpty: "fluent:star-24-regular",
  ratingFull: "fluent:star-24-filled",
  ratingHalf: "fluent:star-half-24-regular",
  loading: "fluent:spinner-ios-20-regular",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "fluent:chevron-up-down-24-regular",
  file: "fluent:attach-24-regular",
  plus: "fluent:add-24-regular",
  minus: "fluent:subtract-24-regular",
  sortAsc: "mdi-menu-up",
  sortDesc: "mdi-menu-down",
};

const custom: IconSet = {
  component: (props: IconProps) =>
    h(Icon, {
      icon: props.icon,
      disabled: props.disabled,
      ...props,
    }),
};

export { aliases, custom };
