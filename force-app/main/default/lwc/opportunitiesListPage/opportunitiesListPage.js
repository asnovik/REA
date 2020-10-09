import { LightningElement, wire,track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunitiesListPageControllerLWC.getOpportunities';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Opportunity Name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
        hideDefaultActions: "true"
    },
    { label: 'Account Name', fieldName: 'Account.Name', hideDefaultActions: "true"},
    { label: 'Stage', fieldName: 'StageName', type: 'text', hideDefaultActions: "true" },
    { label: 'Type', fieldName: 'Type', type: 'text', hideDefaultActions: "true" },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', hideDefaultActions: "true" },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date', hideDefaultActions: "true" }
];

export default class OpportunitiesListPage extends NavigationMixin(LightningElement) {
    @track opportunitiesList = [];
    @track columns = columns;
    @track error;

    @wire(getOpportunities) 
    opportunities({error,data}){
        if(data) {
            let opportunitiesArray = [];
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
                 opportunitiesArray.push(flattenedRow);
             }
             //this.opportunitiesList = opportunitiesArray;
             let nameUrl;
             this.opportunitiesList = opportunitiesArray.map(row => { 
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
                apiName: 'New_Opportunity',
            },
        });
     }
}