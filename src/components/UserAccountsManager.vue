<template>
  <div class="accounts-manager">
    <div class="header">
      <h2>Пользовательские учетные записи</h2>
      <button class="add-button" @click="addAccount">Добавить</button>
    </div>
    <div class="tooltip">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель <strong>;</strong>
    </div>
    <div class="accounts-list">
      <UserAccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @remove="removeAccount(account.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserAccountStore } from '@/stores/userAccountStore'
import UserAccountItem from './UserAccountItem.vue'

const store = useUserAccountStore()
const accounts = computed(() => store.accounts)

function addAccount() {
  store.addAccount()
}

function removeAccount(id: string) {
  store.removeAccount(id)
}
</script>

<style scoped>
.accounts-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  font-family: sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.add-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}

.info {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  color: #666;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
