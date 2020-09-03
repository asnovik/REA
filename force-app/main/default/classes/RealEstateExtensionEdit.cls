public with sharing class RealEstateExtensionEdit {
    RealEstate__c re;
    
    public RealEstateExtensionEdit(ApexPages.StandardController controller){
        re = (RealEstate__c)controller.getRecord();
    }
    
    public PageReference saveRealEstate(){
        try{
            update re;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/realestatelistpage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}