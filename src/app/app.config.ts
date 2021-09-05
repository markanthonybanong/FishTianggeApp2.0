import { environment } from 'src/environments/environment';

export const APP_CONFIG = {
  apiBaseUrl: environment.apiBaseUrl,

  request: {
    addUserMeta: {
      name: 'addUserMeta',
      path: 'userMeta/add'
    },
    userMetaSelectById: {
      name: 'userMetaSelectById',
      path: 'userMeta/selectById'
    },
    userMetaSelectByUserIdAndMetaKey: {
      name: 'userMetaSelectByUserIdAndMetaKey',
      path: 'userMeta/selectByUserIdAndMetaKey'
    },
    updateUserMeta: {
      name: 'updateUserMeta',
      path: 'userMeta/update'
    },
    deleteUserMeta: {
      name: 'deleteUserMeta',
      path: 'userMeta/delete/'
    }
  }
};
