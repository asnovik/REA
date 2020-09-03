public with sharing class TaskListController {
   
    public List<Task> tasksList {get; set;} 
    
    public TaskListController() {
        tasksList = [SELECT Id, WhoId, AccountId, TaskSubject__c, CreatedDate, Status, Priority FROM Task];
    }      
}