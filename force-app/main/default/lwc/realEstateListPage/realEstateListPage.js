import { LightningElement, wire,track } from 'lwc';
import getRealEstate from '@salesforce/apex/RealEstateListPageControllerLWC.getRealEstate';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Real Estate Name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
	    hideDefaultActions: "true"
    },
    { label: 'Price', fieldName: 'Price__c', type: 'currency', hideDefaultActions: "true" },
    { label: 'Real Estate Contract', fieldName: 'RealEstateContract__r.Name', hideDefaultActions: "true"},
    { label: 'Realtor', fieldName: 'Realtor__r.Name', hideDefaultActions: "true"}  
];

export default class RealEstateListPage extends NavigationMixin(LightningElement) {
    @track realEstateList = [];
    @track columns = columns;
    @track error;

    @wire(getRealEstate) 
    realEstate({error,data}){
        if(data) {
            let realEstateArray = [];
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
                 realEstateArray.push(flattenedRow);
             }
             //this.realEstateList = realEstateArray;
             let nameUrl;
             this.realEstateList = realEstateArray.map(row => { 
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
                apiName: 'New_Real_Estate',
            },
        });
     }
}