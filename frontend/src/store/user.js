import {defineStore} from 'pinia'
import axiosClient from '../axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async fetchUser() {
            return axiosClient.get('/api/user').then(({data}) => {
                console.log(data)
                this.user = data
            })
        },
    },
})
