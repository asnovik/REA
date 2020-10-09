public with sharing class ContactsListPageControllerLWC {
    public ContactsListPageControllerLWC() {}

    @AuraEnabled (cacheable=true)
    public static List <Contact> getContacts(){
    	return [Select Id, FirstName, LastName, Name, Phone, Title, Email,AccountId, Account.Name from Contact where accountid='0012v000034bYM5'];
    }
}
