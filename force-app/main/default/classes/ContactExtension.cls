public with sharing class ContactExtension {
    public Contact cnt {get; set;}
    
    public ContactExtension(ApexPages.StandardController controller){
        cnt = new Contact();
    }
    
    public PageReference save(){
        insert cnt;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/ContactDetailPage?retURL=%2Fapex%2Fcontactslistpage&id='+cnt.id);
        page.setRedirect(true);
        return page;
    }

}