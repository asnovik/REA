import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ContactCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Contact';
    fields = [NAME_FIELD, ACCOUNT_FIELD, PHONE_FIELD, EMAIL_FIELD];

    handleContactCreate(event){
        const evt = new ShowToastEvent({
            title: "Contact Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });
    }
}