import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/RealEstate__c.Name';
import PRICE_FIELD from '@salesforce/schema/RealEstate__c.Price__c';
import REALESTATECONTRACT_FIELD from '@salesforce/schema/RealEstate__c.RealEstateContract__c';
import REALTOR_FIELD from '@salesforce/schema/RealEstate__c.Realtor__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealEstateDetailPage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api error;
    fields = [NAME_FIELD, PRICE_FIELD, REALESTATECONTRACT_FIELD,REALTOR_FIELD];

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
                apiName: 'Real_Estate_REA',
            },
        });
    }
    
}