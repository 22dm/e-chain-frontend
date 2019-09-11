<template>
    <a-layout-header class="header">
        <div class="logo">我是 LOGO</div>
        <a-menu
            theme="dark"
            mode="horizontal"
            :defaultSelectedKeys="['0']"
            :style="{ lineHeight: '64px' }">
            <a-menu-item key="0"><router-link to="/">主页</router-link></a-menu-item>
            <a-menu-item key="1"><router-link to="/information/news">资讯</router-link></a-menu-item>
            <a-menu-item key="2"><router-link to="/chain">产业链</router-link></a-menu-item>
            <a-menu-item key="3"><router-link to="/support">供应链</router-link></a-menu-item>
            <a-menu-item key="4"><router-link to="/user">我的投资</router-link></a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<style>
    .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, .2);
        margin: 16px 24px 16px 0;
        float: left;
        text-align: center;
        line-height: 31px;
        color: white;
    }
</style>
