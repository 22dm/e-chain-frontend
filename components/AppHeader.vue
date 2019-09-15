<template>
  <a-layout-header class="header">
    <div class="logo"><img src="../static/img/logo.png" style="height:20px;width:50px;"> e-Chain</div>
    <a-menu
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="['index']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="index">
        <router-link to="/">主页</router-link>
      </a-menu-item>
      <a-menu-item key="information">
        <router-link to="/information/news">资讯</router-link>
      </a-menu-item>
      <a-menu-item key="chain">
        <router-link to="/chain">产业链</router-link>
      </a-menu-item>
      <a-menu-item key="investment">
        <router-link to="/investment/build">我的投资</router-link>
      </a-menu-item>
      <a-menu-item key="login" style="float: right">
        <router-link to="/login">登录</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<style>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
  text-align: center;
  line-height: 31px;
  color: white;
}
</style>
