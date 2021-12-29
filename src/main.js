import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'


Axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZXJ2aWNlTmFtZSI6IkNhcmRQb3J0YWxTZWN1cml0eUFQSSIsIkFwcE5hbWUiOiJDYXJkUG9ydGFsV2ViQXBwbGljYXRpb24iLCJWYWxpZGF0ZUlQIjoiRmFsc2UiLCJuYmYiOjE2MzA5NDA5ODcsImV4cCI6MTc4ODcwNzM4NywiaWF0IjoxNjMwOTQwOTg3fQ.9bqQYZEd3t9pF1_YHvc2tGwQe5_tcL_Dd4KmgAAtjbQ'
                                                
createApp(App).use(store).use(router).mount('#app')
