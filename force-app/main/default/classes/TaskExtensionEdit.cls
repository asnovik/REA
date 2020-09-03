public with sharing class TaskExtensionEdit {
    Task tsk;
    
    public TaskExtensionEdit(ApexPages.StandardController controller){
        tsk = (Task)controller.getRecord();
    }
    
    public PageReference saveTask(){
        try{
            update tsk;
        }catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        PageReference page = new PageReference(Site.getBaseSecureUrl() +'/homepage');
        page.setRedirect(true);
        page.setRedirectCode(301);
        return page;
    }
}