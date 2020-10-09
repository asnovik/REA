public with sharing class TasksListPageControllerLWC {
    public TasksListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <Task> getTasks(){
    	return [Select Id, WhoId, Who.Name, AccountId, Account.Name, Subject, TaskSubject__c, CreatedDate, Status, Priority from Task];
    }

}
