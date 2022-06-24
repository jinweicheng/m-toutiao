// import store from "@/store"
import request from "@/utils/request"
// 1、登录接口
export const login = data => {
    return request({ 
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 2、发送验证码
export const sendsms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/:${mobile}`,
    })
}

// 3、获取登录用户信息
export const loadUserInfo = authorization => {
    // console.log('用户',store.state.user)
    return request({
        method: 'GET',
        url: '/v1_0/user'
        // headers: {
        //     Authorization: `Bearer ${store.state.user.data.token}`
        // }
    })
}