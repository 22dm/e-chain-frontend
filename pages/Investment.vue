<template>
  <a-layout-content style="padding: 0 50px">
    <a-layout style="margin: 24px 16px; padding: 24px; background: #fff">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :default-selected-keys="current_page" style="height: 100%">
          <a-menu-item key="build">
            <router-link to="/investment/build">
              <a-icon type="deployment-unit" />
              <span>构建组合</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="show">
            <router-link to="/investment/show">
              <a-icon type="wallet" />
              <span>我的持仓</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="history">
            <router-link to="/investment/history">
            <a-icon type="clock-circle" />
              <span>交易历史</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="share">
            <router-link to="/investment/share">
            <a-icon type="star" />
              <span>精选组合</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <router-view />
    </a-layout>
  </a-layout-content>
</template>

<script>
export default {
  data() {
    return {
      current_page: ['build']
    };
  },
};

</script>