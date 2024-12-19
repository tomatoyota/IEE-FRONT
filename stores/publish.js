import { defineStore } from 'pinia';

export const publishStore = defineStore('publishdb', {
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
        currentType: null,
        page: 1,
    }),
    actions: {
        // updateSearchCondition(newCondition) {
        //     this.searchCondition = newCondition;
        // },
        // updateEditViewTableItem(editViewTableItem) {
        //     this.editViewTableItem = editViewTableItem;
        // },
        updatePagination(page) {
            this.page = page;
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
