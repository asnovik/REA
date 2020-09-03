public with sharing class AccountsListPageController {
    public List<Account> accountsList {get;set;}

    public AccountsListPageController() {
        accountsList = [Select Id,Name,AccountNumber,Industry,Phone,Type from Account limit 10];
    }   
}