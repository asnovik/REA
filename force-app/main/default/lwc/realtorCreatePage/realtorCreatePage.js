import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Realtor__c.Name';
import PHONE_FIELD from '@salesforce/schema/Realtor__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/Realtor__c.Email__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealtorCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Realtor__c';
    fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];

    handleRealtorCreate(event){
        const evt = new ShowToastEvent({
            title: "Realtor Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Realtor__c',
                actionName: 'view'
            },
        });
    }
}