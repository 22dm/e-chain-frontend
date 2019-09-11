<template>
  <a-layout-content style="padding: 0 50px">
    <a-layout style="margin: 24px 16px; padding: 24px; background: #fff">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :default-selected-keys="['news']" style="height: 100%">
          <a-menu-item key="news">
            <router-link to="/information/news">
              <a-icon type="fire" />
              <span>重要新闻</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="announcement">
            <router-link to="/information/announcement">
              <a-icon type="notification" />
              <span>行业公告</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="policy">
            <router-link to="/information/economic">
            <a-icon type="line-chart" />
              <span>宏观经济</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="report">
            <router-link to="/information/report">
            <a-icon type="file-search" />
              <span>研报平台</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="business">
            <router-link to="/information/subscription">
              <a-icon type="dollar" />
              <span>实时商机</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <router-view />
    </a-layout>
  </a-layout-content>
</template>

<script>
</script>
