import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ContactDetailPage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api error;
    fields = [NAME_FIELD, ACCOUNT_FIELD, PHONE_FIELD, EMAIL_FIELD];

    handleClick(event){
        this.recordId = event.target.value;
        deleteRecord(this.recordId)
        .then(() => {
            this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.error=error;
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Contacts_REA',
            },
        });
    }
    
}