public with sharing class RealEstateContractExtensionEdit {
    RealEstateContract__c contract;
    
    public RealEstateContractExtensionEdit(ApexPages.StandardController controller){
        contract = (RealEstateContract__c)controller.getRecord();
    }
    
    public PageReference saveRealEstateContract(){
        try{
           update contract;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/realestatecontractslistpage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}