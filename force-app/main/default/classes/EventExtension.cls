public with sharing class EventExtension {
    public Event ev {get; set;}
    
    public EventExtension(ApexPages.StandardController controller){
        ev = new Event ();
    }
    
    public PageReference save(){
        insert ev;
        PageReference page = new PageReference(Site.getBaseSecureUrl() + '/EventDetailPage?retURL=%2Fapex%2Fhomepage&id='+ev.id);
        page.setRedirect(true);
        return page;
    }

}