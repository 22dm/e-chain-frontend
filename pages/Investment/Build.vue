<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
  <div>
    <h1>构建组合</h1>
    <a-divider />
    <router-view/>
    <div style="width: 100%; padding: 0em 3em 0em 5em">
      <div style="padding: 0em 0em 3em 0em;">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="账户余额" :bordered="false">
              <p>¥100000.00</p>
            </a-card>
          </a-col>
          <a-col :span="16">
            <a-card title="推荐资产比例" :bordered="false">
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-card title="股票" :bordered="false">
                    <p>10%</p>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card title="基金" :bordered="false">
                    <p>30%</p>
                  </a-card>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-card title="已选资产" :bordered="true" :style="{ margin: '50 px'}">
      <a-table bordered :dataSource="data" :columns="columns" :pagination="false" rowKey="key" >
        <template slot="quantity" slot-scope="text, record">
          <editable-cell @change="onCellChange(record.key, $event)"/>
        </template>
        <template slot="operation" slot-scope="text, record, ">
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)">
            <a-button type="danger">移除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <br>
      <a-table :showHeader="false" :columns="columnsBlank" :dataSource="dataBlank" :pagination="false" bordered/>
      <br>
      <a-button type="primary" style="display:block;margin:0 auto">买入</a-button>
    </a-card>
    <br>
    <a-card title="A股推荐" :bordered="true" :style="{ margin: '50 px'}">
      <a-table :dataSource="dataAgu" :columns="columnsAgu" :pagination="false" rowKey="key">
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="() => onAdd(record.key)">加入</a-button>
        </template>
      </a-table>
    </a-card>
    <br>
    <a-card title="基金推荐" :bordered="true" :style="{ margin: '50 px'}">
      <a-table :dataSource="dataFund" :columns="columnsFund" :pagination="false" rowKey="key">
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="() => onAdd(record.key)">加入</a-button>
        </template>
      </a-table>
    </a-card>
  </div>
  </a-layout-content>
</template>
<script>
import EditableCell from './components/EditableCell'

const columnsAgu = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '代码', dataIndex: 'code', key: 'code' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '操作', dataIndex: 'operation', key: 'operation', scopedSlots: { customRender: 'operation' },}
];

const columnsFund = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '代码', dataIndex: 'code', key: 'code' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '操作', dataIndex: 'operation', key: 'operation', scopedSlots: { customRender: 'operation' },}
];

const columns = [
  {title: '类型', dataIndex: 'type', key: 'type'},
  {title: '名称',  dataIndex: 'name', key: 'name'}, 
  {title: '代码', dataIndex: 'code', key: 'code'},
  {title: '价格', dataIndex: 'price', key: 'price'},
  {title: '交易量', dataIndex: 'quantity', key: 'quantity', scopedSlots: { customRender: 'quantity' },},
  {title: '交易额', dataIndex: 'amount', key: 'amount'},
  {title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' },}
  ];

const columnsBlank = [
  {title: '股票比例', dataIndex: 'stockR', key: 'stockR'},
  {title: '基金比例', dataIndex: 'fundR', key: 'fundR'},
  {title: '总交易额', dataIndex: 'totalPrice', key: 'totalPrice'},
]


let dataAgu = [];
let dataFund = [];
let data = [];
let dataBlank = [];

for (let i = 0; i < 5; i++) {
  dataAgu.push({
    name: `stock ${i}`, 
    code: 10086 + i * 832 - 5,
    price: 50 + i,
    key: `s${i}`,
  });
}

for (let i = 0; i < 5; i++) {
  dataFund.push({
    name: `fund ${i}`,
    code: 20085 + i * 832 - 5,
    price: 50 + i,
    key: `f${i}`,
  });
}

dataBlank.push({
  stockR: `股票比例：0 %`,
  fundR: `基金比例：0 %`,
  totalPrice: `总交易额：0`,
  key: 'null',
})




export default {
  components: {
    EditableCell,
  },
  data () {
    return {
      columns,
      columnsAgu,
      columnsFund,
      columnsBlank,
      data,
      dataAgu,
      dataFund,
      dataBlank,

    }
  },


  methods: {
    changeTotal() {
      const dataBlank = [...this.dataBlank];
      const target = dataBlank[0];
      const data = [...this.data];
      let totalPrice = 0;
      let totalStock = 0;
      for(let i=0;i<data.length;i++) {
        totalPrice += data[i]['amount'];
        if (data[i]['key'].charAt(0) === 's'){
          totalStock += data[i]['amount'];
        }
      }

      target['totalPrice'] = `总交易额： ${totalPrice}`;
      target['stockR'] = `股票比例：${parseInt(100 * totalStock / totalPrice)} %`
      target['fundR'] = `基金比例：${100 - parseInt(100 * totalStock / totalPrice)} %`
      this.dataBlank = dataBlank;
    },
    onCellChange (key, value) {
      const data = [...this.data];
      const target = data.find(item => item.key === key);
      if (target) {
        target['amount'] = value * target['price'];
        this.data = data;
      }
      this.changeTotal();
    },
    onDelete (key) {
      const data = [...this.data];
      const target = data.find(item => item.key === key);
      this.data = data.filter(item => item.key !== key);
      const newData = {
        key: key,
        name:  target.name,
        code: target.code,
        price: target.price,
      };
      if (key.charAt(0) === 's') {
        this.dataAgu.push(newData);
      }
      else{
        this.dataFund.push(newData);
      }
      this.changeTotal();
    },
    onAdd (key) {
      let type = '股票';
      let target;
      if (key.charAt(0) === 'f'){
        type = '基金';
        const dataFund = [...this.dataFund];
        target = dataFund.find(item => item.key === key);       
        this.dataFund = dataFund.filter(item => item.key !== key);
      }
      else{
        const dataAgu = [...this.dataAgu];
        target = dataAgu.find(item => item.key === key);
        this.dataAgu = dataAgu.filter(item => item.key !== key);
      }
      const newData = {
        key: key,
        type: type,
        name: target.name,
        code: target.code,
        price: target.price,
        quantity: 0,
        amount: 0,
      };
      this.data.push(newData);
      this.onCellChange (key, 100);
    }
  },
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
