public with sharing class RealEstateContractExtensionDelete {
    private final RealEstateContract__c contract {get; set;}
    
    public RealEstateContractExtensionDelete(ApexPages.StandardController controller){
        //contract = new RealEstateContract__c();
        this.contract = (RealEstateContract__c)controller.getRecord();
        //contract = [SELECT Id, Name FROM RealEstateContract__c WHERE Id = :contract.Id];
    }
    
    public PageReference deleleteRealEstateContract(){
        List<RealEstateContract__c> contractsToDelete = new List<RealEstateContract__c>();
        RealEstateContract__c contractToDelete = new RealEstateContract__c(Id = contract.Id);
        contractsToDelete.add(contractToDelete);
        if (!contractsToDelete.isEmpty()) { 
			delete contractToDelete;
		}
        //delete contract;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/realestatecontractslistpage');
        page.setRedirect(true);
        return page;
    }
}