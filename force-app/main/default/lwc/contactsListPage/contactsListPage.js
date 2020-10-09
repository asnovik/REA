import { LightningElement, wire,track } from 'lwc';
import getContacts from '@salesforce/apex/ContactsListPageControllerLWC.getContacts';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Contact name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
	    hideDefaultActions: "true"
    },
    { label: 'Account Name', fieldName: 'Account.Name', hideDefaultActions: "true"},
    { label: 'Phone', fieldName: 'Phone', type: 'phone', hideDefaultActions: "true" },
    { label: 'Email', fieldName: 'Email', type: 'email', hideDefaultActions: "true" }
    
];

export default class ContactsListPage extends NavigationMixin(LightningElement) {
    @track contactsList = [];
    @track columns = columns;
    @track error;

    @wire(getContacts) 
    contacts({error,data}){
        if(data) {
            let contactsArray = [];
            for (let row of data) {
                 const flattenedRow = {}
                 let rowKeys = Object.keys(row); 
                 rowKeys.forEach((rowKey) => {
                     const singleNodeValue = row[rowKey];
                     if(singleNodeValue.constructor === Object){  
                         this._flatten(singleNodeValue, flattenedRow, rowKey)        
                     }else{    
                         flattenedRow[rowKey] = singleNodeValue;
                     } 
                 });
                 contactsArray.push(flattenedRow);
             }
             //this.contactsList = contactsArray;
             let nameUrl;
             this.contactsList = contactsArray.map(row => { 
                 nameUrl = `/${row.Id}`;
                 return {...row , nameUrl} 
             })
             this.error = null;
         } else if (error) {
             this.error = error;
         }
     }
     _flatten = (nodeValue, flattenedRow, nodeName) => {        
         let rowKeys = Object.keys(nodeValue);
         rowKeys.forEach((key) => {
             let finalKey = nodeName + '.'+ key;
             flattenedRow[finalKey] = nodeValue[key];
         })
     }

     handleClick(event){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'New_Contact',
            },
        });
     }
}