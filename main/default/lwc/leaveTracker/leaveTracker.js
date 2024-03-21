import { LightningElement } from 'lwc';

export default class LeaveTracker extends LightningElement {

    refresheaveequestHandler(event){
        this.refs.updateLeaves.refreshLeaveRequest();
    }
}