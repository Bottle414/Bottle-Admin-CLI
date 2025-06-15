<template>
    <div class="login">
        <el-form class="login-form" :rules="rules">
            <h1>{{ $t('welcome') }}</h1>
            <el-form-item :label="$t('username')">
                <el-input v-model="formData.username" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item :label="$t('password')">
                <el-input type="password" v-model="formData.password" :prefix-icon="Lock" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('check')">
                <el-input type="password"  v-model="formData.check" :prefix-icon="Check"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="login-btn">
                    <el-button class="btn" type="primary" :loading="loadingBtn" @click="onSubmit">{{ $t('login') }}</el-button>
                    <el-button class="btn">{{ $t('cancel') }}</el-button>
                </div>
            </el-form-item>
            <el-form-item style="padding: 0;">
                {{ $t('noAccount[0]') }}<router-link :to="'/register'">{{ $t('noAccount[1]') }}</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
    import { ref } from 'vue'
    import { User, Lock, Check } from '@element-plus/icons-vue'
    import { ElNotification,  ElMessage, ElMessageBox } from 'element-plus'
    import router from '@/router'
    import { useRoute } from 'vue-router'
    import useUserStore from '@/store/modules/userStore.ts'// 引入用户相关小仓库
    import { getTimeText } from '@/utils/time.ts' // 引入时间计算文本

    let loadingBtn = ref(false)
    const userStore = useUserStore()
    const route = useRoute()
    // TODO: 表单验证
    
    interface RuleForm {
        username: string,
        password: string,
        check: string
    }
    const formData = ref<RuleForm>({
        username: '',
        password: '',
        check: ''
    })

    const rules = ref({
        name: [
            { required: true, message: 'Please input your username', trigger: 'blur' }, // trigger是触发时机，失去焦点时触发
            { min: 1, max: 15, message: 'Length should be 1 to 15', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'Please input your password', trigger: 'blur' },
            { min: 10, max: 20, message: 'Length should be 10 to 20', trigger: 'blur' }
        ],
        check: [
            { required: true, message: 'Please check your password', trigger: 'blur' }
        ]
    })
    
    async function onSubmit(){
        // 叫用户仓库发请求
        loadingBtn.value = true // 旋转图标甚至达成了防抖
        userStore.userLogin(formData.value)
            .then(res => {
                // 成功
                router.push({
                    path: (route.query.redirect || '/').toString()
                })
                ElNotification({
                    type: 'success',
                    title: `Good ${getTimeText()}!`,
                    message: 'Welcome back',
                    position: 'top-right'
                })
            })
            .catch(err => {
                // 失败
                ElNotification({
                    type: 'error',
                    title: 'login failed',
                    message: err.message || 'login failed',
                    position: 'top-right'
                })
                
                if (err.message === 'Error find username : user not exist'){
                    ElMessageBox.confirm(
                        '用户未注册，是否前往注册页面?',
                        'Warning',
                        {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'info',
                        }
                    ).then(() => {
                        router.push({
                            path: ('/register')
                        })
                    }).catch(() => {})
                }
            })
            .finally (() =>{
                loadingBtn.value = false
            })
    }
</script>

<style scoped lang="scss">
    .login{
        width: 100%;
        height: 100vh;
        background: url('@/assets/icons/undraw_login_wqkt.svg') no-repeat;  // 用@的好处：文件深度改变也不会报错
        background-position: 10% 50%;/* 左边、右边 */
        background-size: 40%;
    }

    .login-form {
        h1 {
            padding: 0 35%;
            padding-bottom: 10px;
            color: #333;
        }

        .login-btn {
            display: flex;
            width: 100%;
            justify-content: center;

            .btn {
                width: 20%;
            }
        }

        position: absolute;
        padding: 2% 5%;
        right: 10%;
        top: 30%;
        width: 40%;
        border-radius: 10px;
        box-shadow: 2px 4px 6px rgba(100, 100, 100, .1), 2px 2px 2px rgba(100, 100, 100, .3);
    }
</style>