public with sharing class RealtorExtensionEdit {
    Realtor__c rlt;
    
    public RealtorExtensionEdit(ApexPages.StandardController controller){
        rlt = (Realtor__c)controller.getRecord();
    }
    
    public PageReference saveRealtor(){
        try{
            update rlt;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/realtorslistpage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}