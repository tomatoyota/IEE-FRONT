import { defineStore } from 'pinia';

export const announcementStore = defineStore('announcementdb', {
    state: () => ({
        // searchCondition:{
        //     announcementTitle: '',
        //     publishDate:[],
        //     department:'',
        //     createDate: [],
        //     sortBy: '',
        //     sortDirection: '',
        //     page: 1,
        //     pageSize: 10,
        //     sortBy: 'publish_date',
        //     sortDirection:'DESC',
        // },
        // editViewData:{},
        // editViewTableItem:[],
        // paginations: {
        //     currentPage: 1,
        //     totalCount: 0,
        //     totalPages: 1,
        // },
        // editStatus:[],
        // checkItem:[],
        currentType: 1,
        currentPage: 1,
        totalPages: null,
    }),
    actions: {
        // updateSearchCondition(newCondition) {
        //     this.searchCondition = newCondition;
        // },
        // updateEditViewTableItem(editViewTableItem) {
        //     this.editViewTableItem = editViewTableItem;
        // },
        updatePagination(currentPage, totalPages) {
            this.currentPage = currentPage;
            this.totalPages = totalPages;
        },
        // updateEditStatus(editStatus){
        //     this.editStatus = editStatus
        // },
        // updateCurrentPage(currentPage){
        //     this.paginations.currentPage = currentPage
        // },
        // updateChecklistItem(checkItem){
        //     this.checkItem = checkItem
        // },
        updateNewsType(type){
            this.currentType = type
        },
        
    }
});
