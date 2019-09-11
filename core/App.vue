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
      <a-layout-footer style="text-align: center">
        这里有一堆没人会看的东西
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
