import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import STATUS_FIELD from '@salesforce/schema/Lead.Status';
import RATING_FIELD from '@salesforce/schema/Lead.Rating';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LeadDetailPage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api error;
    fields = [NAME_FIELD, STATUS_FIELD, RATING_FIELD, COMPANY_FIELD, PHONE_FIELD, EMAIL_FIELD];

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
                apiName: 'Leads_REA',
            },
        });
    }
    
}