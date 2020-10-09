public with sharing class RealEstateBuyersListPageControllerLWC {
    public RealEstateBuyersListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <RealEstateBuyer__c> getRealEstateBuyers(){
    	return [Select Id, Name, Phone__c, Email__c, RealEstate__r.Name from RealEstateBuyer__c];
    }
}
