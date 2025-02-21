import { reactive } from 'vue'

const store = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null
})

const mutations = {
  setUser(userData) {
    store.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
  },
  updateUser(updatedData) {
    store.user = { ...store.user, ...updatedData }
    localStorage.setItem('user', JSON.stringify(store.user))
  },
  clearUser() {
    store.user = null
    localStorage.removeItem('user')
  }
}

const getters = {
  isLoggedIn: () => !!store.user,
  currentUser: () => store.user,
  getUserAttribute: (attribute) => store.user ? store.user[attribute] : null
}

export { store, mutations, getters }
