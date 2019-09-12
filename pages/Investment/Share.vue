<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <h1>精选组合</h1>
    <router-view />
    <div v-for="(item,index) in shareList" :key="index" :style="{ padding: '20px' }">
      <a-card :title="'组合 ' + index" bordered :style="{ margin: '50 px'}">
          <a-table :dataSource="item" :columns="columns" :pagination="false"/>
          <br>
          <span><b>20个交易日收益:{{income}}</b></span>
          <a-button style="float: right" type="primary">一键跟单</a-button>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>
const columns = [
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '代码', dataIndex: 'code', key: '1' },
  { title: '价格', dataIndex: 'price', key: '2' },
  { title: '交易量', dataIndex: 'quantity', key: '3' },
];

// 下面列出两条假数据作为参考，后端获取的数据传到前端，请参考以下格式
const shareList = [];
const shareItem0 = [];
for (let i = 0; i < 5; i++) {
  let type = (i%3 === 0)? '股票':'基金';
  let price = 20 + 11*i;
  let quantity = 500 * (5-i);
  let priceNow = price + (i-2);
  shareItem0.push({
    type: type,
    name: `${type} ${i}`,
    code: 10086 + i * 832 - 5,
    price: price,
    quantity: quantity,
    id : `${i}`
  });
}
shareList.push(shareItem0);
const shareItem1 = [];
for (let i = 0; i < 5; i++) {
  let type = (i%3-1 === 0)? '股票':'基金';
  let price = 13 + 7*i;
  let quantity = 400 * (5-i);
  let priceNow = price + (i-1);
  shareItem1.push({
    type: type,
    name: `${type} ${i}`,
    code: 27148 + i * 221 - 4,
    price: price,
    quantity: quantity,
    id : `${i}`
  });
}
shareList.push(shareItem1);

let income = 5000;

export default {
  data() {
    return {
      shareList,
      columns,
      income
    }
  }
}
</script>