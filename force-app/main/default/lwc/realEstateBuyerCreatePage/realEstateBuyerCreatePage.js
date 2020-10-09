import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/RealEstateBuyer__c.Name';
import PHONE_FIELD from '@salesforce/schema/RealEstateBuyer__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/RealEstateBuyer__c.Email__c';
import REALESTATE_FIELD from '@salesforce/schema/RealEstateBuyer__c.RealEstate__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealEstateBuyerCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'RealEstateBuyer__c';
    fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD, REALESTATE_FIELD];

    handleRealEstateBuyerCreate(event){
        const evt = new ShowToastEvent({
            title: "Real Estate Buyer Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'RealEstateBuyer__c',
                actionName: 'view'
            },
        });
    }
}