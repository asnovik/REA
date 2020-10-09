import { LightningElement, wire,track } from 'lwc';
import getRealEstateBuyers from '@salesforce/apex/RealEstateBuyersListPageControllerLWC.getRealEstateBuyers';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Real Estate Buyer Name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
	    hideDefaultActions: "true"
    },
    { label: 'Phone', fieldName: 'Phone__c', type: 'phone', hideDefaultActions: "true" },
    { label: 'Email', fieldName: 'Email__c', type: 'email', hideDefaultActions: "true"},
    { label: 'Real Estate', fieldName: 'RealEstate__r.Name', hideDefaultActions: "true"}  
];

export default class RealEstateBuyersListPage extends NavigationMixin(LightningElement) {
    @track realEstateBuyersList = [];
    @track columns = columns;
    @track error;

    @wire(getRealEstateBuyers) 
    realEstateBuyers({error,data}){
        if(data) {
            let realEstateBuyersArray = [];
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
                 realEstateBuyersArray.push(flattenedRow);
             }
             //this.realEstateBuyersList = realEstateBuyersArray;
             let nameUrl;
             this.realEstateBuyersList = realEstateBuyersArray.map(row => { 
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
                apiName: 'New_Real_Estate_Buyer',
            },
        });
     }
}