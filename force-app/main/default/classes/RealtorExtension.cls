public with sharing class RealtorExtension {
    public Realtor__c realtor {get; set;}
    
    public RealtorExtension(ApexPages.StandardController controller){
        realtor = new Realtor__c();
    }
    
    public PageReference save(){
        insert realtor;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/RealtorDetailPage?retURL=%2Fapex%2Frealtorslistpage&id='+realtor.id);
        page.setRedirect(true);
        return page;
    }

}