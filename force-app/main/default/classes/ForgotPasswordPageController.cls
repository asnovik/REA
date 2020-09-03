public class ForgotPasswordPageController {
    public String username {get; set;}   
       
    public ForgotPasswordPageController() {}
  
    public PageReference forgotPassword() {
      boolean success = Site.forgotPassword(username);
      PageReference pr = Page.ForgotPasswordPageConfirm;
      pr.setRedirect(true);
      
      if (success) {        
        return pr;
      }
      return null;
    }
}