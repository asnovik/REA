import { LightningElement } from 'lwc';
import AMOUNT_FIELD from '@salesforce/schema/Offer__c.Amount__c';
import DATE_FIELD from '@salesforce/schema/Offer__c.Date__c';
import BUYER_FIELD from '@salesforce/schema/Offer__c.RealEstateBuyer__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class OfferCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Offer__c';
    fields = [AMOUNT_FIELD, DATE_FIELD, BUYER_FIELD];

    handleOfferCreate(event){
        const evt = new ShowToastEvent({
            title: "Offer Create",
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