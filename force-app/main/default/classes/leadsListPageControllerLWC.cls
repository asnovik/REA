public with sharing class leadsListPageControllerLWC {
    public leadsListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <Lead> getLeads(){
    	return [Select Id, Name, Status, Rating, Company, Phone, Email from Lead];
    }
}
