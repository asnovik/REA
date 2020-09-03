public with sharing class ChartController {
    public List <RealEstate__c> reList {get;set;}
    public List <RealEstateContract__c> recList {get; set;}
      
    public List<RealEstate__c> realEstateList {
                get{
                        return [SELECT Name, Price__c,RealEstateContract__c FROM RealEstate__c];
                }
        }
         
    public void getRecords(){
                recList = [SELECT Name, DateRealEstateContract__c, DateRealEstateContractClosed__c, 
                                                 (SELECT id, Name, Price__c FROM Real_Estate__r) 
                                                  FROM RealEstateContract__c Where DateRealEstateContractClosed__c=null];
                //reList = recList.Real_Estate__r;
                        for (RealEstateContract__c rec : recList) {
                    for (RealEstate__c re : rec.Real_Estate__r) {
                        reList.add(re);
               }
         }
    }
}