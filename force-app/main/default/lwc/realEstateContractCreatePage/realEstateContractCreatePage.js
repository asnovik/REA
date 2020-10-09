import { LightningElement } from 'lwc';
//import NAME_FIELD from '@salesforce/schema/RealEstateContract__c.Name';
import DATE_FIELD from '@salesforce/schema/RealEstateContract__c.DateRealEstateContract__c';
import DATECLOSED_FIELD from '@salesforce/schema/RealEstateContract__c.DateRealEstateContractClosed__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealEstateContractCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'RealEstateContract__c';
    fields = [DATE_FIELD, DATECLOSED_FIELD];

    handleRealEstateContractCreate(event){
        const evt = new ShowToastEvent({
            title: "Real Estate Contract Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'RealEstateContract__c',
                actionName: 'view'
            },
        });
    }
}