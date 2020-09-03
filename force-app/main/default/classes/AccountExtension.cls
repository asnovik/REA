public with sharing class AccountExtension {
    //test git
    public Account acc {get; set;}
    
    public AccountExtension(ApexPages.StandardController controller){
        acc = new Account();
    }
    
    public PageReference save(){
        insert acc;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/AccountDetailPage?retURL=%2Fapex%2Faccountslistpage&id='+acc.id);
        page.setRedirect(true);
        return page;
    }

}