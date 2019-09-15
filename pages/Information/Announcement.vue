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
      {{ item.text }}
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

      this.$axios.get("/api/pub/getAnnouncement?num=10&page=" + (pageNum - 1)) 
      .then((res) => {
        for(let item of res.data){
          item.title = "【" + item.name + "】" + item.title;
          item.text = item.text.substr(0, 200);
          item.time = item.time.substr(0, 4) + '年' + item.time.substr(4, 2) + '月' + item.time.substr(6) + '日';
        }
        this.listData = res.data;
        this.loading = false;
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
};
</script>
