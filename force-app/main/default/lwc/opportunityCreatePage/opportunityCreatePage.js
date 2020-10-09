import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import ACCOUNT_FIELD from '@salesforce/schema/Opportunity.AccountId';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class OpportunityCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Opportunity';
    fields = [NAME_FIELD, ACCOUNT_FIELD, STAGE_FIELD, TYPE_FIELD, AMOUNT_FIELD, CLOSEDATE_FIELD];

    handleOpportunityCreate(event){
        const evt = new ShowToastEvent({
            title: "Opportunity Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Opportunity',
                actionName: 'view'
            },
        });
    }
}