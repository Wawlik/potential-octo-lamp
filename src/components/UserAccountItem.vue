<template>
  <div class="account-item">
    <div class="field">
      <label>Метки</label>
      <input
        :class="{ invalid: !isLabelValid }"
        type="text"
        v-model="labelInput"
        @blur="handleLabelBlur"
        placeholder="Метки через ;"
      />
    </div>
    <div class="field">
      <label>Тип учетной записи</label>
      <select v-model="typeInput" @change="handleTypeChange">
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </div>
    <div class="field">
      <label>Логин</label>
      <input
        :class="{ invalid: !isLoginValid }"
        type="text"
        v-model="loginInput"
        @blur="handleLoginBlur"
        placeholder="Логин"
      />
    </div>
    <div class="field" v-if="typeInput === 'Локальная'">
      <label>Пароль</label>
      <input
        :class="{ invalid: !isPasswordValid }"
        type="password"
        v-model="passwordInput"
        @blur="handlePasswordBlur"
        placeholder="Пароль"
      />
    </div>
    <button class="remove-btn" @click="removeAccount">Удалить</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserAccountStore } from '@/stores/userAccountStore'
import type { UserAccount } from '@/types/userAccount'

const props = defineProps<{ account: UserAccount }>()
const emit = defineEmits(['remove'])

const store = useUserAccountStore()

const labelInput = ref(props.account.labelString)
const typeInput = ref(props.account.type)
const loginInput = ref(props.account.login)
const passwordInput = ref(props.account.password || '')

const isLabelValid = ref(true)
const isLoginValid = ref(true)
const isPasswordValid = ref(true)

function handleLabelBlur() {
  isLabelValid.value = labelInput.value.length <= 50
  save()
}

function handleTypeChange() {
  if (typeInput.value === 'LDAP') {
    passwordInput.value = ''
    isPasswordValid.value = true
  }
  save()
}

function handleLoginBlur() {
  isLoginValid.value = !!loginInput.value && loginInput.value.length <= 100
  save()
}

function handlePasswordBlur() {
  if (typeInput.value === 'Локальная') {
    isPasswordValid.value = !!passwordInput.value && passwordInput.value.length <= 100
  }
  save()
}

function save() {
  if (isLabelValid.value && isLoginValid.value && isPasswordValid.value) {
    store.updateAccount({
      id: props.account.id,
      labelString: labelInput.value,
      type: typeInput.value,
      login: loginInput.value,
      password: typeInput.value === 'Локальная' ? passwordInput.value : null
    })
  }
}

function removeAccount() {
  emit('remove')
}
</script>

<style scoped>
.account-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background-color: #fafafa;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 4px;
}

.field {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.field label {
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;
}

.field input,
.field select {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.invalid {
  border-color: red !important;
}

.remove-btn {
  margin-left: auto;
  background-color: #ff6666;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
