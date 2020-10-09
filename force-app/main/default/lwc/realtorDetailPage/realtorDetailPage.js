import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Realtor__c.Name';
import PHONE_FIELD from '@salesforce/schema/Realtor__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/Realtor__c.Email__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealtorDetailPage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api error;
    fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];

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
                apiName: 'Realtors_REA',
            },
        });
    }
    
}