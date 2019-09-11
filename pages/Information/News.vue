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
        <template slot="title" v-if="item.effect">
          <a-tag color="blue" style="margin-left: 2em" v-if="item.effect[0] === '-'">
            负向
            {{ item.effect }}%
          </a-tag>
          <a-tag color="pink" style="margin-left: 2em" v-else>正向 {{ item.effect }}%</a-tag>
        </template>
      </a-list-item-meta>
      {{ item.content }}
      <div style="margin-top: 1em">
        <template v-for="tag in item.tagA">
          <a-tag color="blue" :key="tag">{{ tag }}</a-tag>
        </template>
        <template v-for="tag in item.tagB">
          <a-tag color="pink" :key="tag">{{ tag }}</a-tag>
        </template>
        <template v-for="tag in item.tagC">
          <a-tag color="green" :key="tag">{{ tag }}</a-tag>
        </template>
      </div>
      <span slot="actions" v-if="item.time">
        <a-icon type="clock-circle" style="margin-right: 0.5em" />
        {{ item.time }}
      </span>
      <span slot="actions" v-if="item.source">
        <a-icon type="link" style="margin-right: 0.5em" />
        {{ item.source }}
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
          title: `我是新闻 ${i}`,
          content:
            "我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻我是新闻",
          source: "我是来源",
          time: `2019年4月3日 ${i}:00`,
          tagA: ["aaa", "bbb", `${i}kk`],
          tagB: ["ccc", "ddd", `${i}jj`],
          tagC: ["eee", "fff", `${i}oo`],
          effect: (i % 2 ? "" : "-") + "20.98"
        });
      }

      this.listData = data;
      this.loading = false;
    }
  }
};
</script>
