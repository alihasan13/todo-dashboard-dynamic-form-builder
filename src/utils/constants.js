// Application-wide constants

export const PAGE_SIZE = 10;

export const QUERY_KEYS = {
  TODOS: ['todos'],
  USERS: ['users'],
};

// TanStack Query timing
export const STALE_TIME = 5 * 60 * 1000;   // 5 minutes
export const CACHE_TIME = 10 * 60 * 1000;  // 10 minutes

// localStorage keys
export const STORAGE_KEYS = {
  TODO_FILTERS:  'app:todo:filters',
  FORM_SCHEMA:   'app:form:schema',
};

export const STATUS_OPTIONS = [
  { value: '',    label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending',   label: 'Pending' },
];

export const FIELD_TYPE_OPTIONS = [
  { value: 'text',     label: 'Text Input' },
  { value: 'email',    label: 'Email' },
  { value: 'number',   label: 'Number' },
  { value: 'password', label: 'Password' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select',   label: 'Dropdown (Select)' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio',    label: 'Radio Group' },
  { value: 'date',     label: 'Date Picker' },
  { value: 'url',      label: 'URL' },
];

export const DEBOUNCE_DELAY = 300; // ms
