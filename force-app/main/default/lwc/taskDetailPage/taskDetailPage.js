import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Task.WhoId';
import ACCOUNT_FIELD from '@salesforce/schema/Task.AccountId';
import SUBJECT_FIELD from '@salesforce/schema/Task.Subject';
import CREATEDDATE_FIELD from '@salesforce/schema/Task.CreatedDate';
import PRIORITY_FIELD from '@salesforce/schema/Task.Priority';
import STATUS_FIELD from '@salesforce/schema/Task.Status';

export default class TaskDetailPage extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields = [NAME_FIELD, ACCOUNT_FIELD, SUBJECT_FIELD, CREATEDDATE_FIELD, PRIORITY_FIELD, STATUS_FIELD];
    
}