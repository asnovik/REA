public with sharing class InspectionExtension {
    public Inspection__c insp {get; set;}
    
    public InspectionExtension(ApexPages.StandardController controller){
        insp = new Inspection__c();
    }
    
    public PageReference save(){
        insert insp;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/realestatebuyerslistpage');
        page.setRedirect(true);
        return page;
    }

}