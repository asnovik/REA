public with sharing class AccountsListPageControllerLWC {
    public AccountsListPageControllerLWC() {
    }

    @AuraEnabled (cacheable=true)
    public static List <Account> getAccounts(){
    	return [Select Id, Name, Industry, Rating, Phone, Type from Account];
    }
}
