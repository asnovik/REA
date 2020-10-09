public with sharing class RealtorsListPageControllerLWC {
    public RealtorsListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <Realtor__c> getRealtors(){
    	return [Select Id, Name, Phone__c, Email__c from Realtor__c];
    }
}
