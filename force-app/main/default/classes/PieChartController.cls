public class PieChartController {
    
    public PieChartController(ActivitiesListController controller){}
        
        public class PieData {
        public String name { get; set; }
        public Decimal data { get; set; }

        public PieData(String namevalue, Decimal datavalue) {
        name = namevalue;
        data = datavalue;
                }
        }

        public List<PieData> getTaskData() {
        List<PieData> data = new List<PieData>();       
        decimal waitingOnSomeoneElse=0,notStarted=0,deferred=0, inProgress=0,completed=0;
        
        waitingOnSomeoneElse = [select count() from Task where status = 'Waiting on someone else'];
            if(waitingOnSomeoneElse !=0){
                data.add(new PieData('Waiting on someone else ',waitingOnSomeoneElse));
            }
        notStarted = [select count() from Task where status = 'Not Started'];
            if(notStarted !=0){
                data.add(new PieData('Not Started ',notStarted));   
            }
        deferred = [select count() from Task where status = 'Deferred'];
            if(deferred !=0){
                data.add(new PieData('Deferred ',deferred));    
            }
        inProgress = [select count() from Task where status = 'In Progress'];
            if(inProgress !=0){
                data.add(new PieData('In Progress ',inProgress));  
            }
        completed = [select count() from Task where status = 'Completed'];
            if(completed !=0){
                data.add(new PieData('Completed ',completed));   
            }
        return data;
        }
}