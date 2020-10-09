public with sharing class RealEstateContractsListPageControllerLWC {
    public RealEstateContractsListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <RealEstateContract__c> getRealEstateContracts(){
    	return [Select Id, Name, DateRealEstateContract__c, DateRealEstateContractClosed__c from RealEstateContract__c];
    }
}
