import { LightningElement, wire,track } from 'lwc';
import getRealtors from '@salesforce/apex/RealtorsListPageControllerLWC.getRealtors';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Realtor Name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
	    hideDefaultActions: "true"
    },
    { label: 'Phone', fieldName: 'Phone__c', type: 'phone', hideDefaultActions: "true" },
    { label: 'Email', fieldName: 'Email__c', type: 'email', hideDefaultActions: "true"}
];

export default class RealtorsListPage extends NavigationMixin(LightningElement) {
    @track realtorsList = [];
    @track columns = columns;
    @track error;

    @wire(getRealtors) 
    realtors({error,data}){
        if(data) {
            let realtorsArray = [];
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
                 realtorsArray.push(flattenedRow);
             }
             //this.realtorsList = realtorsArray;
             let nameUrl;
             this.realtorsList = realtorsArray.map(row => { 
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
                apiName: 'New_Realtor',
            },
        });
     }
}