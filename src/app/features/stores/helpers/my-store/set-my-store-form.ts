import { FormGroup } from '@angular/forms';
import { Store } from 'src/app/shared/types';


export const setMyStoreFormValues = (form: FormGroup, store: Store): void => {
    form.patchValue({
        userId: store.user_id,
        img: store.img,
        name: store.name,
        information: store.information,
        contactNumber: store.contact_number,
        location: store.location,
        id: store.id
    });
}