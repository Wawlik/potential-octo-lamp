import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserAccount } from '@/types/userAccount'

export const useUserAccountStore = defineStore('userAccountStore', () => {
  const accounts = ref<UserAccount[]>([])

  function init() {
    const saved = localStorage.getItem('userAccounts')
    if (saved) {
      accounts.value = JSON.parse(saved)
    }
  }

  function persist() {
    localStorage.setItem('userAccounts', JSON.stringify(accounts.value))
  }

  function addAccount() {
    accounts.value.push({
      id: crypto.randomUUID(),
      labelString: '',
      labels: [],
      type: 'LDAP',
      login: '',
      password: null
    })
    persist()
  }

  function removeAccount(id: string) {
    accounts.value = accounts.value.filter(acc => acc.id !== id)
    persist()
  }

  function updateAccount(updated: Partial<UserAccount>) {
    const index = accounts.value.findIndex(acc => acc.id === updated.id)
    if (index !== -1) {
      const labels = (updated.labelString || '')
        .split(';')
        .map(s => s.trim())
        .filter(s => s)
        .map(text => ({ text }))
      accounts.value[index] = {
        ...accounts.value[index],
        ...updated,
        labels
      }
      persist()
    }
  }

  init()
  return { accounts, addAccount, removeAccount, updateAccount }
})
