export interface Label {
    text: string
  }
  
  export interface UserAccount {
    id: string
    labelString: string
    labels: Label[]
    type: 'LDAP' | 'Локальная'
    login: string
    password: string | null
  }
  