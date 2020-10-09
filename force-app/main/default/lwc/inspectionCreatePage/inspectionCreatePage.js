import { LightningElement } from 'lwc';
import SUMMARY_FIELD from '@salesforce/schema/Inspection__c.Summary__c';
import DATE_FIELD from '@salesforce/schema/Inspection__c.Date__c';
import BUYER_FIELD from '@salesforce/schema/Inspection__c.RealEstateBuyer__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class InspectionCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Inspection__c';
    fields = [SUMMARY_FIELD, DATE_FIELD, BUYER_FIELD];

    handleInspectionCreate(event){
        const evt = new ShowToastEvent({
            title: "Inspection Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Real_Estate_Buyers_REA',
            },
        });
    }
}