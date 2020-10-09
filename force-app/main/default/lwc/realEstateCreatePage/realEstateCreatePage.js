import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/RealEstate__c.Name';
import PRICE_FIELD from '@salesforce/schema/RealEstate__c.Price__c';
import CONTRACT_FIELD from '@salesforce/schema/RealEstate__c.RealEstateContract__c';
import REALTOR_FIELD from '@salesforce/schema/RealEstate__c.Realtor__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealEstateCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'RealEstate__c';
    fields = [NAME_FIELD, PRICE_FIELD, CONTRACT_FIELD, REALTOR_FIELD];

    handleRealEstateCreate(event){
        const evt = new ShowToastEvent({
            title: "Real Estate Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'RealEstate__c',
                actionName: 'view'
            },
        });
    }
}