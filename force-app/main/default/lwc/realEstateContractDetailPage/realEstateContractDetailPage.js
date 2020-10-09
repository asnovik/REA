import { LightningElement, api} from 'lwc';
import NAME_FIELD from '@salesforce/schema/RealEstateContract__c.Name';
import DATE_FIELD from '@salesforce/schema/RealEstateContract__c.DateRealEstateContract__c';
import DATECLOSED_FIELD from '@salesforce/schema/RealEstateContract__c.DateRealEstateContractClosed__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RealEstateContractDetailPage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api error;
    fields = [NAME_FIELD, DATE_FIELD, DATECLOSED_FIELD];

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
                apiName: 'Contracts_REA',
            },
        });
    }
}