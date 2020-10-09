import { LightningElement, wire,track } from 'lwc';
import getLeads from '@salesforce/apex/LeadsListPageControllerLWC.getLeads';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Lead Name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
        hideDefaultActions: "true"
    },
    { label: 'Lead Status', fieldName: 'Status', type: 'text', hideDefaultActions: "true"},
    { label: 'Rating', fieldName: 'Rating', type: 'text', hideDefaultActions: "true" },
    { label: 'Company', fieldName: 'Company', type: 'text', hideDefaultActions: "true" },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', hideDefaultActions: "true" },
    { label: 'Email', fieldName: 'Email', type: 'email', hideDefaultActions: "true" }
];

export default class LeadsListPage extends NavigationMixin(LightningElement) {
    @track leadsList = [];
    @track columns = columns;
    @track error;

    @wire(getLeads) 
    leads({error,data}){
        if(data) {
            let leadsArray = [];
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
                 leadsArray.push(flattenedRow);
             }
             //this.leadsList = leadsArray;
             let nameUrl;
             this.leadsList = leadsArray.map(row => { 
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
                apiName: 'New_Lead',
            },
        });
     }
}