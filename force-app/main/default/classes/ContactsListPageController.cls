public with sharing class ContactsListPageController {
    public List<Contact> conts {get;set;}

    public ContactsListPageController() {
        conts = new List<Contact>();
    }
      
    public List<Contact> getContacts(){
        conts = [Select Id, FirstName, LastName,Title,Email from Contact where accountid='0012v000034bYM5'];
    	return conts;
    }
}