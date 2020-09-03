public with sharing class ContactsListPageControllerExtension {
    public List <Contact> results {get;set;}
    public String filterId {get;set;}
    private Id accountId;
    
    public ContactsListPageControllerExtension(ApexPages.StandardSetController controller) {}
    
    public PageReference processRequests(){
        if (filterId == 'All') {
             results = [Select Id, Name,Account.Name,Phone, Email from Contact];
        } else {
             results = [Select Id, Name,Account.Name,Phone, Email from Contact where accountid='0012v000034bYM5'];
        }
        return null;
    }
    
    public List<SelectOption> getItems() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('REA', 'REA Contact'));
        options.add(new SelectOption('All', 'All Contacts'));
        return options;
    }

}