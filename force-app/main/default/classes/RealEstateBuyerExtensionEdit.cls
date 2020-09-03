public with sharing class RealEstateBuyerExtensionEdit {
    RealEstateBuyer__c reb;
    
    public RealEstateBuyerExtensionEdit(ApexPages.StandardController controller){
        reb = (RealEstateBuyer__c)controller.getRecord();
    }
    
    public PageReference saveRealEstateBuyer(){
        try{
            update reb;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/realestatebuyerslistpage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}