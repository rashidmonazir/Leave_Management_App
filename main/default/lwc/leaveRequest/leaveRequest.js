import { LightningElement,wire,api } from 'lwc';
import getLeavesRequest from '@salesforce/apex/LeaveRequestController.getLeavesRequest';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

const COLUMNS = [
    {label:'Request Id',fieldName:'Name',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {label:'User Name',fieldName:'userName',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {label:'From Date',fieldName:'From_Date__c',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {label:'To Date',fieldName:'To_Date__c',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {label:'Reason',fieldName:'Reason__c',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {label:'Status',fieldName:'Status__c',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {label:'Manager Comment',fieldName:'Manager_Comment__c',cellAttributes: {class: {fieldName : 'cellColor'}}},
    {type:"button",typeAttributes:{
        label:'Edit',
        value:'edit',
        title:'Edit',
        name:'Edit',
        disabled:{fieldName:'isEditDisable'}
    },cellAttributes: {class: {fieldName : 'cellColor'}}}
];

export default class Myleaves extends LightningElement {

    columns = COLUMNS;
    leaveRequests = [];
    wireResults;
    openModal = false;
    objectApiName ='LeaveRequest__c';
    recordId = '';
    currentUserId = Id;

    @wire(getLeavesRequest)
    wiremyleaves(results){
        this.wireResults = results;
        if(results.data){
            this.leaveRequests = results.data.map(a=>({
                ...a,
                userName:a.Name__r.Name,
                cellColor: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '',
                isEditDisable: a.Status__c != 'Pending'
                }))
        }
        if (results.error){
            console.log('Error occured while fetching data', results.error);
            
        }
    }

    get noRecordFound(){
        return this.leaveRequests.length == 0;
    }

    handleAction(event){
        this.openModal = true;
        this.recordId = event.detail.row.Id;
    }

    handleClick(){
        this.openModal = false;
    }

    successHandler(event){
        this.openModal = false;
        this.showToast('Data Saved Successfully','success','success');
        this.refreshLeaveRequest();
    }

    @api 
    refreshLeaveRequest(){
        refreshApex(this.wireResults);
    }

    showToast(message,title,variant){
        const event = new ShowToastEvent({
            title,
            variant,
            message
        });
        this.dispatchEvent(event);
    }

    handleNewRequest(){
        this.openModal = true;
        this.recordId = '';
    }
}