import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Contact.LastName';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import PASSWORD_FIELD from '@salesforce/schema/Contact.Password__c';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class SiteRegistrationPage extends NavigationMixin(LightningElement) {
    username = '';
    email = '';
    password = '';
    confirmPassword = '';
    contactId = '';
    accountId ='0012v000034bYM5';

    handleNameChange(event) {
        this.contactId = undefined;
        this.username = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleConfirmPasswordChange(event) {
        this.confirmPassword = event.target.value;
    }

    handlerClick() {
        if(this.password === this.confirmPassword){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.username;
        fields[ACCOUNT_FIELD.fieldApiName] = this.accountId;
        fields[PASSWORD_FIELD.fieldApiName] = this.password;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(contact => {
                this.contactId = contact.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Registration is successful',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error registration',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Login',
                },
            });
        }
    }
}