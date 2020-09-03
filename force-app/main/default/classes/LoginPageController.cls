global with sharing class LoginPageController {
    global String username {get; set;}
    global String password {get; set;}
    
    global LoginPageController () {}
    
    global PageReference login() {
        //String startUrl = System.currentPageReference().getParameters().get('startURL');
        String startUrl = '/homepage';
        return Site.login(username, password, startUrl);
    }
}