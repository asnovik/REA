public with sharing class OfferExtension {
    public Offer__c ofr {get; set;}
    
    public OfferExtension(ApexPages.StandardController controller){
        ofr = new Offer__c();
    }
    
    public PageReference save(){
        insert ofr;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/realestatebuyerslistpage');
        page.setRedirect(true);
        return page;
    }

}