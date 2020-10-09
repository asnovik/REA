import { LightningElement, wire,track } from 'lwc';
import getRealEstateContracts from '@salesforce/apex/RealEstateContractsListPageControllerLWC.getRealEstateContracts';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Real Estate Contract name',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, 
        target: '_blank'},
        sortable: true,
        hideDefaultActions: "true"
    },
    { label: 'Date Real Estate Contract', fieldName: 'DateRealEstateContract__c', type: 'date', hideDefaultActions: "true" },
    { label: 'Date Real Estate Contract Closed', fieldName: 'DateRealEstateContractClosed__c', type: 'date', hideDefaultActions: "true"},
];

export default class RealEstateListPage extends NavigationMixin(LightningElement) {
    @track realEstateContractsList = [];
    @track columns = columns;
    @track error;

    @wire(getRealEstateContracts) 
    realEstateContracts({error,data}){
        if(data) {
            let realEstateContractsArray = [];
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
                 realEstateContractsArray.push(flattenedRow);
             }
             //this.realEstateContractsList = realEstateContractsArray;
             let nameUrl;
             this.realEstateContractsList = realEstateContractsArray.map(row => { 
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
                apiName: 'New_Real_Estate_Contract',
            },
        });
     }
}