export class CategoryStoreState {
    requests = {
        addUserMeta: {
            inProgress: false
        },
        updateUserMeta: {
            inProgress: false
        },
        deleteUserMeta: {
            inProgress: false
        }
    };
    actionType: string  = null;
    categoryId: string  = null;
    category            = '';
    btnName             = 'Add';
    loginUserId: string = null;
    routedFrom: string  = null;
}
