global with sharing class SiteLoginPageController {
    global String username {get; set;}
    global String password {get; set;}
    global List<Contact> contacts {get;set;}
    
    global SiteLoginPageController () {
        contacts = new List<Contact>();
    }    
    
    global PageReference login() {

        contacts = [Select Id, LastName, Password__c From Contact Where LastName=:username And Password__c=:password];

        if (contacts != null) {         
            PageReference page = Page.HomePage;
            page.setRedirect(true);
            return page;
        } 
        return null;
    }
}