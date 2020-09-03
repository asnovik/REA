public with sharing class ActivitiesListController {
        public List <Task> tasksList {get; set;}
        public List <Event> eventsList {get; set;}
        public Task task;
        public Event event;

          
    public ActivitiesListController() {
        tasksList = [SELECT Id, WhoId, AccountId, TaskSubject__c, CreatedDate, Status, Priority FROM Task];
        eventsList = [SELECT Id, WhoId, WhatId, AccountId, EventSubject__c, ActivityDateTime, StartDateTime, EndDateTime FROM Event];
    }
        
    public void setTask (Task tsk) {
        task = tsk;
  }
    
        public Task getTask () {
        return task;
  }
        
        public void setEvent (Event ev) {
        event = ev;
  }
    
        public Event getEvent () {
        return event;
  }
}