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
        <a slot="title" :href="item.url">{{ item.title }}</a>
        <template slot="title" v-if="item.effect">
          <a-tag color="blue" style="margin-left: 2em" v-if="item.effect[0] === '-'">
            负向
            {{ item.effect }}%
          </a-tag>
          <a-tag color="pink" style="margin-left: 2em" v-else>正向 {{ item.effect }}%</a-tag>
        </template>
      </a-list-item-meta>
      {{ item.preview }}
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

      this.$axios
        .get("/api/pub/getNews?num=10&page=" + (pageNum - 1))
        .then(res => {
          for (let item of res.data) {
            item.preview = item.preview.substr(0, 200);
            item.time = item.time.substr(0, 11);
            item.effect = (item.score * 100).toFixed(2) + "";
            console.log(item.score);
            if (item.tagA) {
              item.tagA = item.tagA.split("|");
            }
            if (item.tagB) {
              item.tagB = item.tagB.split("|");
            }
            if (item.tagC) {
              item.tagC = item.tagC.split("|");
            }
          }
          this.listData = res.data;
          this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
