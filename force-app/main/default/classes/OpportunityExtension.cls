public with sharing class OpportunityExtension {
    public Opportunity opp {get; set;}
    
    public OpportunityExtension(ApexPages.StandardController controller){
        opp = new Opportunity();
    }
    
    public PageReference save(){
        insert opp;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/OpportunityDetailPage?retURL=%2Fapex%2Fopportunitieslistpage&id='+opp.id);
        page.setRedirect(true);
        return page;
    }

}