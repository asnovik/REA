public with sharing class RealEstateExtension {
    public RealEstate__c realest {get; set;}
    
    public RealEstateExtension(ApexPages.StandardController controller){
        realest = new RealEstate__c();
    }
    
    public PageReference save(){
        insert realest;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/RealEstateDetailPage?retURL=%2Fapex%2Frealestatelistpage&id='+realest.id);
        page.setRedirect(true);
        return page;
    }

}