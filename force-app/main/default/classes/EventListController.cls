public with sharing class EventListController {
   
    public List<Event> eventsList {get; set;} 
    
    public EventListController() {
        eventsList = [SELECT Id, WhoId, AccountId, Subject, ActivityDateTime, Type, EventSubtype FROM Event];
    }      
}