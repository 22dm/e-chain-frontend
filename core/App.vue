<template>
  <div id="app">
    <a-layout id="components-layout-demo-top-side">
      <app-header
        class="app-shell-header"
      />

      <transition
        :name="pageTransitionEffect"
        @before-enter="handleBeforeEnter"
        @after-enter="handleAfterEnter"
        @before-leave="handleBeforeLeave"
      >
        <keep-alive
          :include="[...keepAlivePages]"
        >
          <router-view
            :key="routerViewKey"
            class="app-view"
            :class="[{'app-view-with-header': appHeaderShow}, pageTransitionClass]"
            :data-page-id="$route.fullPath"
          />
        </keep-alive>
      </transition>
      <update-toast />
      <a-layout-footer class="footer" >
        <div class="content">
        <div >
            <img src="../static/img/logo.png" style="height:40px;width:70px;">
            <p id="brand">e-Chain</p>
        </div>
        <div class="div0">
            <div class="div1">
            <p>使用文档</p>
            <a-divider />
            <p>关于</p>
            <p>用户手册</p>
        </div>
        <div class="div2">
            <p>联系我们</p>
            <a-divider />
            <p>QQ: 1125182919</p>
            <p>E-mail: 171098502@smail.nju.edu.cn</p>
            <p>GitHub: https://github.com/22dm/e-chain-citi</p>
        </div>
        </div>
        
        </div>
        <div >©2019 e-Chain</div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
    import Vue from 'vue';
    import {mapActions, mapState} from 'vuex';
    import AppHeader from '@/components/AppHeader';
    import AppSidebar from '@/components/AppSidebar';
    import UpdateToast from '@/components/UpdateToast';
    import {keepAlivePages} from '@/.lavas/router';
    import Antd from 'ant-design-vue';

    const ENABLE_SCROLL_CLASS = 'app-view-scroll-enabled';

    export default {
        name: 'App',
        components: {
            Vue,
            UpdateToast,
            AppHeader,
            AppSidebar,
            Antd,
        },
        computed: {
            ...mapState('pageTransition', {
                pageTransitionType: state => state.type,
                pageTransitionEffect: state => state.effect
            }),

            ...mapState('appShell/appHeader', {
                appHeaderShow: state => state.show
            }),

            ...mapState('appShell/common', {
                scrollPostionMap: state => state.scrollPostionMap
            }),

            pageTransitionClass() {
                return `transition-${this.pageTransitionType}`;
            },

            // https://github.com/lavas-project/lavas/issues/119
            routerViewKey() {
                let {name, params} = this.$route;
                let paramKeys = Object.keys(params);
                if (paramKeys.length) {
                    return name + paramKeys.reduce((prev, cur) => prev + params[cur], '');
                }
                return null;
            }
        },
        data() {
            return {
                // https://github.com/lavas-project/lavas/issues/112
                keepAlivePages
            };
        },
        methods: {
            ...mapActions('appShell/appSidebar', [
                'showSidebar',
                'hideSidebar'
            ]),
            ...mapActions('appShell/common', [
                'setPageSwitching',
                'savePageScrollPosition'
            ]),

            /**
             * make current page container scrollable,
             * and restore its scroll position.
             */
            restoreContainerScrollPosition(containerEl, scrollTop) {
                containerEl.classList.add(ENABLE_SCROLL_CLASS);
                containerEl.scrollTop = scrollTop;
            },

            /**
             * make body scrollable,
             * and restore its scroll position.
             */
            restoreBodyScrollPosition(containerEl, scrollTop) {
                containerEl.classList.remove(ENABLE_SCROLL_CLASS);
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
            },

            handleBeforeEnter(el) {
                let pageId = el.dataset.pageId;
                let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {};

                this.setPageSwitching(true);
                Vue.nextTick(() => {
                    this.restoreContainerScrollPosition(el, scrollTop);
                });

            },
            handleAfterEnter(el) {
                let pageId = el.dataset.pageId;
                let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {};

                this.setPageSwitching(false);
                this.restoreBodyScrollPosition(el, scrollTop);
            },
            handleBeforeLeave(el) {
                let pageId = el.dataset.pageId;
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                this.restoreContainerScrollPosition(el, scrollTop);
                // save current scroll position in a map
                this.savePageScrollPosition({
                    pageId,
                    scrollPosition: {y: scrollTop}
                });
            },
            handleClickHeaderBack() {
                this.$router.go(-1);
            },
            handleClickHeaderMenu() {
                this.showSidebar();
            },
            handleHideSidebar() {
                this.hideSidebar();
            },
            handleShowSidebar() {
                this.showSidebar();
            }
        }
    };
</script>
<style scoped>
#brand{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
}
.footer{
    width: 100%;
    height: 220px;
    background-color: rgb(16, 74, 114);
    color:white;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer .content{
    display: flex;
  align-items: center;
  justify-content: center;
  
}
.footer .div0{
     display: flex;
  justify-content: center;
  
}
.footer .div1,.footer .div2{
    width: 370px;
    margin: 0 20px;
}
</style>