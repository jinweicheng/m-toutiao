import { createApp } from 'vue'
import { createStore } from 'vuex'
import { getItem, setItem} from '@/utils/storage'
const STORE_USER_KEY = 'user_info'
const store = createStore({
  state: {
    // user: JSON.parse(localStorage.getItem('user_info'))
    user: getItem(STORE_USER_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // localStorage.setItem('user_info',JSON.stringify(data))
      setItem(STORE_USER_KEY,data)
    }
  },
  actions: {
  },
  modules: {
  }
})
const app = createApp()
app.use(store)
export default store
