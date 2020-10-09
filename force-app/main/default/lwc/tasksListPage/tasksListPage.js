import { LightningElement, wire,track } from 'lwc';
import getTasks from '@salesforce/apex/TasksListPageControllerLWC.getTasks';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Task Id',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Id' }, 
        target: '_blank'},
        sortable: true,
	    hideDefaultActions: "true"
    },
    { label: 'Name', fieldName: 'Who.Name', hideDefaultActions: "true" },
    { label: 'Account Name', fieldName: 'Account.Name', hideDefaultActions: "true"},
    { label: 'Subject', fieldName: 'Subject', type: 'text', hideDefaultActions: "true"},
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', hideDefaultActions: "true"},
    { label: 'Priority', fieldName: 'Priority', type: 'text', hideDefaultActions: "true"},  
    { label: 'Status', fieldName: 'Status', type: 'text', hideDefaultActions: "true"}
];

export default class TasksListPage extends NavigationMixin(LightningElement) {
    @track tasksList = [];
    @track columns = columns;
    @track error;

    @wire(getTasks) 
    tasks({error,data}){
        if(data) {
            let tasksArray = [];
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
                 tasksArray.push(flattenedRow);
             }
             //this.tasksList = tasksArray;
             let nameUrl;
             this.tasksList = tasksArray.map(row => { 
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
                apiName: 'New_Task',
            },
        });
     }
}