import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/RealEstateBuyer__c.Name';
import REALESTATE_FIELD from '@salesforce/schema/RealEstateBuyer__c.RealEstate__c';
import PHONE_FIELD from '@salesforce/schema/RealEstateBuyer__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/RealEstateBuyer__c.Email__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealEstateBuyerDetailPage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api error;
    fields = [NAME_FIELD, REALESTATE_FIELD, PHONE_FIELD, EMAIL_FIELD];
    
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
                apiName: 'Real_Estate_Buyers_REA',
            },
        });
    }
    
    handleInspectionClick(event){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'New_Inspection',
            },
        });

    }

    handleOfferClick(event){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'New_Offer',
            },
        });
    }
}