public with sharing class LeadExtension {
    public Lead ld {get; set;}
    
    public LeadExtension(ApexPages.StandardController controller){
        ld = new Lead();
    }
    
    public PageReference save(){
        insert ld;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/LeadDetailPage?retURL=%2Fapex%2Fleadslistpage&id='+ld.id);
        page.setRedirect(true);
        return page;
    }

}