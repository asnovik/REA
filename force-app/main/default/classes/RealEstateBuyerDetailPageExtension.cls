public with sharing class RealEstateBuyerDetailPageExtension {
    public List <Inspection__c> ins {get;set;}
    public RealEstateBuyer__c reb {get;set;}
    public List <RealEstateBuyer__c> rebs {get;set;}
    
    public RealEstateBuyerDetailPageExtension(ApexPages.StandardController controller){
        reb = (RealEstateBuyer__c)controller.getRecord();
        rebs = [SELECT id, (SELECT id, name FROM Inspections__r) FROM RealEstateBuyer__c Where id = : reb.id];
                        for(RealEstateBuyer__c r : rebs){
                                for(Inspection__c i : r.Inspections__r){
                    ins.add(i);
                                }
            }
        }

        //public List <Inspection__c> getIns(){
        //RealEstateBuyer__c reb = [Select id, Name, Inspection__r.id from RealEstateBuyer__c where id = : reb.id];
        //ins = [Select id, Name from Inspection__c where RealEstateBuyer__c.id = :r.RealEstateBuyer__c.id];
        //List <Inspection__c> ins = new List <Inspection__c>();
        //ins = [select id,name from Inspection__c Where Inspection__c.id =: reb.id];
   
       //for(RealEstateBuyer__c r : rebs){
                //      for(Inspection__c i : r.Inspections__r){
        //         ins.add(i);
                //      }
        //}
       // return ins;
        //}
}