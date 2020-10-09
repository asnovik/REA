public with sharing class RealEstateListPageControllerLWC {
    public RealEstateListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <RealEstate__c> getRealEstate(){
    	return [Select Id, Name, Price__c, RealEstateContract__r.Name, Realtor__r.Name from RealEstate__c];
    }
}
