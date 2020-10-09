public with sharing class EventsListPageControllerLWC {
    public EventsListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <Event> getEvents(){
    	return [Select Id, WhoId, Who.Name, What.Name, AccountId, Account.Name, Subject, TaskSubject__c, ActivityDateTime, StartDateTime, EndDateTime from Event];
    }
}
