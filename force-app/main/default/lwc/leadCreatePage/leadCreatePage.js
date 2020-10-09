import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import STATUS_FIELD from '@salesforce/schema/Lead.Status';
import RATING_FIELD from '@salesforce/schema/Lead.Rating';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LeadCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Lead';
    fields = [NAME_FIELD, STATUS_FIELD, RATING_FIELD, COMPANY_FIELD, PHONE_FIELD, EMAIL_FIELD];

    handleLeadCreate(event){
        const evt = new ShowToastEvent({
            title: "Lead Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Lead',
                actionName: 'view'
            },
        });
    }
}