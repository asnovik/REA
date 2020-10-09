import { LightningElement, wire,track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountsListPageControllerLWC.getAccounts';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Account Name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
        hideDefaultActions: "true"
    },
    { label: 'Industry', fieldName: 'Industry', type: 'text', hideDefaultActions: "true"},
    { label: 'Rating', fieldName: 'Rating', type: 'text', hideDefaultActions: "true" },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', hideDefaultActions: "true" },
    { label: 'Type', fieldName: 'Type', type: 'text', hideDefaultActions: "true" }
];

export default class OpportunitiesListPage extends NavigationMixin(LightningElement) {
    @track accountsList = [];
    @track columns = columns;
    @track error;

    @wire(getAccounts) 
    accounts({error,data}){
        if(data) {
            let accountsArray = [];
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
                 accountsArray.push(flattenedRow);
             }
             //this.accountsList = accountsArray;
             let nameUrl;
             this.accountsList = accountsArray.map(row => { 
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
                apiName: 'New_Account',
            },
        });
     }
}