public with sharing class RealEstateContractExtension {
    public RealEstateContract__c contract {get; set;}
    
    public RealEstateContractExtension(ApexPages.StandardController controller){
        contract = new RealEstateContract__c();
    }
    
    public PageReference save(){
        insert contract;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/RealEstateContractDetailPage?retURL=%2Fapex%2Frealestatecontractslistpage&id='+contract.id);
        page.setRedirect(true);
        return page;
    }

}