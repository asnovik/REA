public with sharing class LeadExtensionEdit {
    Lead ld;
    
    public LeadExtensionEdit(ApexPages.StandardController controller){
        ld = (Lead)controller.getRecord();
    }
    
    public PageReference saveLead(){
        try{
            update ld;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/leadslistpage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}