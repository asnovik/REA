public with sharing class SiteLoginPageControllerLWC {

    public SiteLoginPageControllerLWC () {   
    }    
    
    @AuraEnabled 
    public static String getLogin (String username, String password) {        
        PageReference page;
        List<Contact> contacts = new List<Contact>();
        
        contacts = [Select Id, LastName, Password__c From Contact Where LastName=:username And Password__c=:password];

        if (!contacts.isEmpty ()) {  
            page = new PageReference ('/lightning/page/home');  
            return page.getUrl(); 
        } else {
            page = new PageReference ('/lightning/n/Login'); 
            return page.getUrl();
        }  
    }
}