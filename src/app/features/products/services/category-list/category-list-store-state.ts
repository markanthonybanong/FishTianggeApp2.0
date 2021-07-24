import { UserMeta } from '@fish-tiannge/shared/types';

export class CategoryListStoreState {
    loginUserId: string          = null;
    categories: UserMeta []      = [];
    searchCategories: UserMeta[] = [];
}
