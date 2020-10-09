import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Task.WhoId';
import ACCOUNT_FIELD from '@salesforce/schema/Task.AccountId';
import SUBJECT_FIELD from '@salesforce/schema/Task.Subject';
import CREATEDDATE_FIELD from '@salesforce/schema/Task.CreatedDate';
import PRIORITY_FIELD from '@salesforce/schema/Task.Priority';
import STATUS_FIELD from '@salesforce/schema/Task.Status';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class TaskCreatePage extends NavigationMixin(LightningElement)  {
    objectApiName = 'Task';
    fields = [NAME_FIELD, ACCOUNT_FIELD, SUBJECT_FIELD, CREATEDDATE_FIELD, PRIORITY_FIELD, STATUS_FIELD];

    handleTaskCreate(event){
        const evt = new ShowToastEvent({
            title: "Task Create",
            message: "Record ID: " + event.detail.id,
            variant: "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Task',
                actionName: 'view'
            },
        });
    }
}