public class TemplateREAController {
    
    public TemplateREAController() {}
    
    public PageReference gotoHome() {
        return Page.HomePage;
    }
    
    public PageReference gotoRealEstateContractsList(){
        return Page.RealEstateContractsListPage;
    }
    
    public PageReference gotoRealEstateList(){
        return Page.RealEstateListPage;
    }
    
    public PageReference gotoRealtorsList(){
        return Page.RealtorsListPage;
    }
   
    public PageReference gotoLeadsList(){
        return Page.LeadsListPage;
        }
    
    public PageReference gotoAccountsList() {
        return Page.AccountsListPage;
    }
    
    public PageReference gotoContactsList(){
        return Page.ContactsListPage;
    }
        
    public PageReference gotoOpportunitiesList(){
        return Page.OpportunitiesListPage;
    }
    
    public PageReference gotoRealEstateBuyersList(){
        return Page.RealEstateBuyersListPage;
    }
}