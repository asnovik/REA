public class SiteRegisterPageController {

    private static Id PORTAL_ACCOUNT_ID = '0012v000034bYM5';
    
    public SiteRegisterPageController () {
    }

    public String username {get; set;}
    public String email {get; set;}
    public String password {get; set {password = value == null ? value : value.trim(); } }
    public String confirmPassword {get; set { confirmPassword = value == null ? value : value.trim(); } }
      
    private boolean isValidPassword() {
        return password == confirmPassword;
    }
    
    public PageReference registerUser() {
        // it's okay if password is null - we'll send the user a random password in that case
        if (!isValidPassword()) {
                ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, Label.site.passwords_dont_match);
                ApexPages.addMessage(msg);
            return null;
        }    
        
        String accountId = PORTAL_ACCOUNT_ID;

        Contact cnt = new Contact ();
        cnt.LastName = username;
        cnt.Email = email;
        cnt.Password__c = password;
        cnt.AccountId = accountId;
        insert cnt;

        if (cnt != null) { 
            if (password != null && password.length() > 1) {
                PageReference page = System.Page.HomePage;
                page.setRedirect(true);
                return page;
            }
            else {
                PageReference page = System.Page.SiteRegisterConfirmPage;
                page.setRedirect(true);
                return page;
            }
        }
        return null;
    }
}