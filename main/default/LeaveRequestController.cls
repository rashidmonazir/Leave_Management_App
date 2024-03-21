public class LeaveRequestController {
	
    @AuraEnabled(Cacheable=True)
    public static list<LeaveRequest__c> getmyLeaves(){
           List<LeaveRequest__c> myLeaves = [Select Id,Name,From_Date__c,Manager_Comment__c,Reason__c,Status__c,Name__c,To_Date__c	FROM LeaveRequest__c Where Name__c=:UserInfo.getUserId()];
        	return myLeaves;
    }
    @AuraEnabled(Cacheable=True)
    public static list<LeaveRequest__c> getLeavesRequest(){
     		List<LeaveRequest__c> LeaveRequest = [Select Id,Name,From_Date__c,Manager_Comment__c,Reason__c,Status__c,Name__c,To_Date__c,Name__r.ManagerId,Name__r.Name FROM LeaveRequest__c Where Name__r.ManagerId =:UserInfo.getUserId()];
        	return LeaveRequest;    
    }
}