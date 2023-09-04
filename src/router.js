import{ createRouter ,createWebHashHistory} from 'vue-router'
import Student from './components/Student.vue'
import Score from './components/Score.vue'
import Team from './components/Team.vue'
import Home from './components/Home.vue'
import Subject from './components/subject.vue'
import MyDefault from './components/MyDefault.vue'
import Login from './components/Login.vue'
import User from './components/User.vue'
import { compile } from 'vue'
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:"/",
        component:Login,
         },
        {
            path:"/home",
            component:Home,
            children:[
                {
                    path:'',
                    component:MyDefault
                 },
                
                {  
                    path:"/student",
                   component:Student
                },
                {
                    path:"/score",
                    component:Score
                },
                {
                    path:"/Team",
                    component:Team  
                },
                {
                    path:"/user",
                    component:User
                }
            ]
        },
        {
            path:"/student",
            component:Student
        },
        {
            path:"/score",
            component:Score
        },
        {
            path:"/Team",
            component:Team
        },
    ]
});
export default router;