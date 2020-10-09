import { LightningElement, wire,track } from 'lwc';
import getEvents from '@salesforce/apex/EventsListPageControllerLWC.getEvents';

const columns = [
    {
        label: 'Event Id',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Id' }, 
        target: '_blank'},
        sortable: true,
	    hideDefaultActions: "true"
    },
    { label: 'Name', fieldName: 'Who.Name', hideDefaultActions: "true" },
    { label: 'Related To', fieldName: 'What.Name', type: 'text', hideDefaultActions: "true"},
    { label: 'Subject', fieldName: 'Subject', type: 'text', hideDefaultActions: "true"},
    { label: 'Start Date Time', fieldName: 'StartDateTime', type: 'date', hideDefaultActions: "true"},  
    { label: 'End Date Time', fieldName: 'EndDateTime', type: 'date', hideDefaultActions: "true"}
];

export default class EventsListPage extends LightningElement {
    @track eventsList = [];
    @track columns = columns;
    @track error;

    @wire(getEvents) 
    events({error,data}){
        if(data) {
            let eventsArray = [];
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
                 eventsArray.push(flattenedRow);
             }
             //this.eventsList = eventsArray;
             let nameUrl;
             this.eventsList = eventsArray.map(row => { 
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
}