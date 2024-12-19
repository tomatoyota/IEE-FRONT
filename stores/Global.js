import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const menuitems = reactive([
    {
      name: '關於學會',
      enName: 'about',
      children: [
        { name: '學會簡介', link: '/about-profile' },
        { name: '學會沿革', link: '/about-history' },
        { name: '學會章程', link: '/about-charter' },
        { name: '現任理事長簡介', link: '/about-chairman' },
        { name: '現任理監事名錄', link: '/about-supervisor' },
        { name: '高雄分會', link: '/about-branch' }
      ]
    },
    {
      name: '獎項評選',
      enName: 'selection',
      children: [
        { name: '會士', link: '/selection-fellow' },
        {
          name: '電機工程獎章',
          link: '/selection-electrical-engineering-medal'
        },
        {
          name: '傑出電機工程教授獎',
          link: '/selection-professor-of-electrical-engineering-award'
        },
        { name: '傑出電機工程師獎', link: '/selection-engineer-award' },
        {
          name: '優秀青年電機工程師獎',
          link: '/selection-young-electrical-engineer-award'
        },
        { name: '青年論文獎', link: '/selection-young-paper-award' }
      ]
    },
    {
      name: '榮譽榜',
      enName: 'honor',
      children: [
        { name: '會士', link: '/honor-fellow' },
        { name: '電機工程獎章', link: '/honor-electrical-engineering-medal' },
        {
          name: '傑出電機工程教授獎',
          link: '/honor-professor-of-electrical-engineering-award'
        },
        { name: '傑出電機工程師獎', link: '/honor-engineer-award' },
        {
          name: '優秀青年電機工程師獎',
          link: '/honor-young-electrical-engineer-award'
        },
        { name: '青年論文獎', link: '/honor-young-paper-award' }
      ]
    },
    {
      name: '出版品',
      enName: 'publish',
      children: [
        { name: '電工通訊季刊', link: '/publish-quarterly' },
        { name: '電機工程學刊', link: '/publish-journal' }
      ]
    },
    { name: '入會申請', enName: 'apply', link: '/apply' },
    { name: '聯絡我們', enName: 'contact', link: '/contact' },
    { name: '最新消息', enName: 'news', link: '/news' },
    { name: '活動剪影', enName: 'album', link: '/album' },
  
    // {
    //   name: '個人會員',
    //   enName: 'user',
    //   children: [
    //     { name: '更新個人會員資料', link: 'publish-quarterly' },
    //     { name: '變更密碼', link: 'publish-journal' },
    //     { name: '登出', link: 'logout' }
    //   ]
    // },
    // {
    //   name: '團體會員',
    //   enName: 'group',
    //   children: [
    //     { name: '更新團體會員資料', link: 'publish-quarterly' },
    //     { name: '變更密碼', link: 'publish-journal' },
    //     { name: '登出', link: 'logout' }
    //   ]
    // },
    // {
    //   name: '管理員',
    //   enName: 'admin',
    //   children: [
    //     { name: '進入管理系統', link: 'admin' },
    //     { name: '變更密碼', link: 'publish-journal' },
    //     { name: '登出', link: 'logout' }
    //   ]
    // },
  ])

  const scrollTop = ref(0)
  const setScrollTop = (data) => {
    scrollTop.value = data
  }

  const isOpenMenu = ref(false)
  const setOepnMenu = (data) => (isOpenMenu.value = data)

  const headerOffsetH = ref(0)
  const setHeaderOffsetH = (data) => (headerOffsetH.value = data)

  return {
    menuitems,
    scrollTop,
    setScrollTop,
    isOpenMenu,
    setOepnMenu,
    headerOffsetH,
    setHeaderOffsetH
  }
})
