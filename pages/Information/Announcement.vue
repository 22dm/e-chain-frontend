<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="listData"
    :style="{ padding: '0 24px', minHeight: '280px' }"
    @change="getPage"
  >
    <router-view />
    <a-list-item slot="renderItem" slot-scope="item" key="item.title">
      <a-list-item-meta>
        <a slot="title" :href="item.href">{{ item.title }}</a>
      </a-list-item-meta>
      {{ item.content }}
      <span slot="actions" v-if="item.time">
        <a-icon type="clock-circle" style="margin-right: 0.5em" />
        {{ item.time }}
      </span>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      pagination: {
        onChange: this.getPage,
        showQuickJumper: true,
        pageSize: 10,
        total: 1000
      },
      loading: false
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage(pagination) {
      console.log(pagination);
      this.loading = true;
      let pageNum = pagination ? pagination : 1;
      let data = [];

      for (let i = (pageNum - 1) * 3 + 1; i < pageNum * 3 + 1; i++) {
        data.push({
          href: "https://vue.ant.design/",
          title: `我是行业公告 ${i}`,
          content:
            "我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告我是行业公告",
          time: `2019年4月3日 ${i}:00`,
        });
      }
      this.listData = data;
      this.loading = false;
    }
  }
};
</script>
