<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, shallowRef, watch } from 'vue'

type DocTab = string | {
  label: string
  value?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  tabs: DocTab[]
  defaultValue?: string
  storageKey?: string
  id?: string
}>(), {
  defaultValue: undefined,
  storageKey: undefined,
  id: undefined
})

const instance = getCurrentInstance()
const isMounted = shallowRef(false)

const normalizedTabs = computed(() => {
  return props.tabs.map((tab, index) => {
    if (typeof tab === 'string') {
      return {
        label: tab,
        value: valueFromLabel(tab, index),
        disabled: false
      }
    }

    return {
      label: tab.label,
      value: tab.value ?? valueFromLabel(tab.label, index),
      disabled: tab.disabled ?? false
    }
  })
})

const firstEnabledValue = computed(() => {
  return normalizedTabs.value.find((tab) => !tab.disabled)?.value ?? normalizedTabs.value[0]?.value ?? ''
})

const activeValue = shallowRef('')

const activeTab = computed(() => {
  return normalizedTabs.value.find((tab) => tab.value === activeValue.value) ?? normalizedTabs.value[0]
})

const rootId = computed(() => props.id ?? `doc-tabs-${instance?.uid ?? 0}`)

watch(
  [normalizedTabs, () => props.defaultValue],
  () => {
    const values = new Set(normalizedTabs.value.map((tab) => tab.value))
    const requestedValue = props.defaultValue && values.has(props.defaultValue)
      ? props.defaultValue
      : firstEnabledValue.value

    if (!values.has(activeValue.value))
      activeValue.value = requestedValue
  },
  { immediate: true }
)

watch(activeValue, (value) => {
  if (!isMounted.value || !props.storageKey || !value)
    return

  window.localStorage.setItem(storageName.value, value)
})

const storageName = computed(() => `goswitcher-doc-tab:${props.storageKey}`)

onMounted(() => {
  isMounted.value = true

  if (!props.storageKey)
    return

  const storedValue = window.localStorage.getItem(storageName.value)
  const storedTab = normalizedTabs.value.find((tab) => tab.value === storedValue && !tab.disabled)

  if (storedTab)
    activeValue.value = storedTab.value
})

function valueFromLabel(label: string, index: number) {
  const value = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return value || `tab-${index + 1}`
}

function selectTab(value: string, disabled: boolean) {
  if (disabled)
    return

  activeValue.value = value
}

function onTabKeydown(event: KeyboardEvent, index: number) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
    return

  event.preventDefault()

  const enabledTabs = normalizedTabs.value
    .map((tab, tabIndex) => ({ ...tab, tabIndex }))
    .filter((tab) => !tab.disabled)

  if (enabledTabs.length === 0)
    return

  const currentEnabledIndex = enabledTabs.findIndex((tab) => tab.tabIndex === index)
  const nextEnabledIndex = nextIndex(event.key, currentEnabledIndex, enabledTabs.length)
  const nextTab = enabledTabs[nextEnabledIndex]

  activeValue.value = nextTab.value

  const tabButton = document.getElementById(tabId(nextTab.value))
  tabButton?.focus()
}

function nextIndex(key: string, currentIndex: number, length: number) {
  if (key === 'Home')
    return 0
  if (key === 'End')
    return length - 1
  if (key === 'ArrowLeft')
    return currentIndex <= 0 ? length - 1 : currentIndex - 1

  return currentIndex >= length - 1 ? 0 : currentIndex + 1
}

function tabId(value: string) {
  return `${rootId.value}-tab-${value}`
}

function panelId(value: string) {
  return `${rootId.value}-panel-${value}`
}
</script>

<template>
  <section class="doc-tabs" :data-active-tab="activeTab?.value">
    <div class="doc-tabs-list" role="tablist">
      <button
        v-for="(tab, index) in normalizedTabs"
        :id="tabId(tab.value)"
        :key="tab.value"
        class="doc-tabs-trigger"
        :class="{ 'is-active': tab.value === activeValue }"
        type="button"
        role="tab"
        :aria-selected="tab.value === activeValue"
        :aria-controls="panelId(tab.value)"
        :tabindex="tab.value === activeValue ? 0 : -1"
        :disabled="tab.disabled"
        @click="selectTab(tab.value, tab.disabled)"
        @keydown="onTabKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      v-for="tab in normalizedTabs"
      :id="panelId(tab.value)"
      :key="`${tab.value}-panel`"
      class="doc-tabs-panel"
      role="tabpanel"
      :aria-labelledby="tabId(tab.value)"
      :hidden="tab.value !== activeValue"
    >
      <slot :name="tab.value" />
    </div>
  </section>
</template>

<style scoped>
.doc-tabs {
  margin: 24px 0;
  border: 1px solid var(--doc-line-strong);
  border-radius: var(--doc-radius-md);
  background: var(--doc-surface);
  box-shadow: var(--doc-shadow-sm);
}

.doc-tabs-list {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 8px;
  border-bottom: 1px solid var(--doc-line);
  background: var(--doc-surface-soft);
}

.doc-tabs-trigger {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--doc-muted);
  font: inherit;
  font-size: 13px;
  font-weight: 720;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color .18s ease,
    border-color .18s ease,
    color .18s ease;
}

.doc-tabs-trigger:hover:not(:disabled),
.doc-tabs-trigger:focus-visible {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 24%, var(--doc-line));
  background: var(--doc-blue-soft);
  color: var(--vp-c-brand-1);
  outline: none;
}

.doc-tabs-trigger.is-active {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 32%, var(--doc-line));
  background: var(--doc-surface-raised);
  color: var(--vp-c-brand-1);
  box-shadow: 0 1px 2px rgb(15 23 42 / 5%);
}

.doc-tabs-trigger:disabled {
  opacity: .48;
  cursor: not-allowed;
}

.doc-tabs-panel {
  padding: 18px 20px 20px;
}

.doc-tabs-panel > :deep(:first-child) {
  margin-top: 0;
}

.doc-tabs-panel > :deep(:last-child) {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .doc-tabs-list {
    padding: 7px;
  }

  .doc-tabs-trigger {
    min-height: 32px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .doc-tabs-panel {
    padding: 14px;
  }
}
</style>
