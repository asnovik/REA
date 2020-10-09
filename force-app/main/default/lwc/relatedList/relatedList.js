import { LightningElement, api, wire } from 'lwc';  
import fetchRecords from '@salesforce/apex/RelatedListController.fetchRecords';  
  
export default class RelatedList extends LightningElement {  
  
    @api objectName;  
    @api fieldName;  
    @api fieldValue;  
    @api parentFieldAPIName;  
    @api recordId;  
    @api strTitle;  
    @api filterType;  
    @api operator;  
    get vals() {  
        return this.recordId + ',' + this.objectName + ',' +   
               this.parentFieldAPIName + ',' + this.fieldName + ',' +   
               this.fieldValue + ',' + this.filterType + ',' + this.operator;  
    }  
      
    @wire(fetchRecords, { listValues: '$vals' })  
    records;  
  
}