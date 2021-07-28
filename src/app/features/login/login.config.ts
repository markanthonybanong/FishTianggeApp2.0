export const LOGIN_CONFIG = {
    request: {
        login:{
            name: 'login',
            path: 'user/onUserLogin'
        },
        getSellerStore: {
            name: 'getSellerStore',
            path: 'store/getStore'
        },
        getDeliverByCourIdAndStatus: {
            name: 'getDeliverByCourIdAndStatus',
            path: 'deliver/getDeliverByCourIdAndStatus'
        },
        getByMobileNumOrEmail: {
            name: 'getByMobileNumOrEmail',
            path: 'user/getMobileNumAndEmail'
        },
        updateUserPassword: {
            name: 'updateUserPassword',
            path: 'user/updatePassword'
        }
    }
};
