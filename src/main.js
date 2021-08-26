import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

// Axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZXJ2aWNlTmFtZSI6IkNhcmRQb3J0YWxTZWN1cml0eUFQSSIsIkFwcE5hbWUiOiJDYXJkUG9ydGFsV2ViIiwibmJmIjoxNjI4NzU4MDc2LCJleHAiOjE3ODY1MjQ0NzYsImlhdCI6MTYyODc1ODA3Nn0.Xb-Kopu16nG3mLx6C7zz3kzVC_aekF8zKBcFeOrzFXA'

createApp(App).use(store).use(router).mount('#app')
