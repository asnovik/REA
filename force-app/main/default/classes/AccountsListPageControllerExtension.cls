public with sharing class AccountsListPageControllerExtension {
    public List<Account> results {get;set;}
    public String filterId {get;set;}
    private Id accountId;
    
    public AccountsListPageControllerExtension(ApexPages.StandardSetController controller){}

    public PageReference processRequests(){
        if (filterId == 'All') {
                results = [Select Id,Name,AccountNumber,Industry,Phone,Rating,Type from Account];
        } else {
                results = [Select Id,Name,AccountNumber,Industry,Phone,Rating,Type from Account Where Name Like 'REA%'];
        }
        return null;
    }

    public List<SelectOption> getItems() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('REA', 'REA Account'));
        options.add(new SelectOption('All', 'All Accounts'));
        return options;
    }
}