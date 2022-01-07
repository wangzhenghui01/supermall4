import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import * as echarts from "echarts";
import 'ant-design-vue/dist/antd.css';
import { Button } from 'ant-design-vue';
// require('./manage')
// require('./plugins/china')
//import plugins from './plugins'
//plugins()


const app = createApp(App)
app.use(router)
app.use(Button)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
