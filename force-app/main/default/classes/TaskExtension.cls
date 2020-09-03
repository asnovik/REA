public with sharing class TaskExtension {
    public Task tsk {get; set;}
    
    public TaskExtension(ApexPages.StandardController controller){
        tsk = new Task();
    }
    
    public PageReference save(){
        insert tsk;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/TaskDetailPage?retURL=%2Fapex%2Fhomepage&id='+tsk.id);
        page.setRedirect(true);
        return page;
    }

}