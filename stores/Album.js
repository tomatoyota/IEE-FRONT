import { defineStore } from 'pinia';

export const albumStore = defineStore('albumdb', {
    state: () => ({
        
        currentType: 1,
        currentPage: 1,
        totalPages: null,
    }),
    actions: {

        updatePagination(currentPage, totalPages) {
            this.currentPage = currentPage;
            this.totalPages = totalPages;
        },
        
    }
});
