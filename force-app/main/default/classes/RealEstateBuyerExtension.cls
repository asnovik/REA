public with sharing class RealEstateBuyerExtension {
    public RealEstateBuyer__c reb {get; set;}
    
    public RealEstateBuyerExtension(ApexPages.StandardController controller){
        reb = new RealEstateBuyer__c();
    }
    
    public PageReference save(){
        insert reb;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/RealEstateBuyerDetailPage?retURL=%2Fapex%2Frealestatebuyerslistpage&id='+reb.id);
        page.setRedirect(true);
        return page;
    }

}