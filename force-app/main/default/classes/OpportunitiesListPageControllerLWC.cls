public with sharing class OpportunitiesListPageControllerLWC {
    public OpportunitiesListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <Opportunity> getOpportunities(){
    	return [Select Id, Name, StageName, Type, Amount, CloseDate, AccountId, Account.Name from Opportunity];
    }
}
