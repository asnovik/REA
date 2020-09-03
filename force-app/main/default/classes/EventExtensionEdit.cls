public with sharing class EventExtensionEdit {
    Event ev;
    
    public EventExtensionEdit(ApexPages.StandardController controller){
        ev = (Event)controller.getRecord();
    }
    
    public PageReference saveEvent(){
        try{
            update ev;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/homepage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}