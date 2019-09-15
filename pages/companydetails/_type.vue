<template>
  <a-layout-content style="padding: 0 50px">
    <a-layout style="margin: 24px 16px; padding: 24px; background: #fff">
      <div>
        <span>{{currentStockInfo.stockName}}</span>
        <span>{{currentStockInfo.stockCode}}</span>
        <div style="float:right;">
          <a-select style="width: 120px" v-bind:defaultValue="0" @change="handleSelectChange">
            <a-select-option
              v-for="(item,index) in getStockList"
              v-bind:key="index"
              v-bind:value="index"
            >{{item.stockName}}</a-select-option>
          </a-select>
          <router-link to="/chain">
            <a-button type="primary" style="width: 100px">回到产业链</a-button>
          </router-link>
        </div>
      </div>
      <a-divider />
      <a-card title="行情数据" style="margin:5px;">
        <a-radio-group v-model="radioValue">
          <a-radio-button value="day">日线</a-radio-button>
          <a-radio-button value="week">周线</a-radio-button>
          <a-radio-button value="month">月线</a-radio-button>
        </a-radio-group>
        <ve-line :data="getChartData" :settings="chartSettings"></ve-line>
      </a-card>

      <a-table
        :columns="mainBusinessColumns"
        :dataSource="currentStockInfo.mainBusiness"
        bordered
        :pagination="false"
        style="margin:5px;"
      >
        <template slot="title">主营业务</template>
      </a-table>
      <a-table
        :columns="basicIndexColumns"
        :dataSource="getBasicIndex"
        bordered
        :pagination="false"
        :showHeader="false"
        style="margin:5px;"
      >
        <template slot="title">基本指标</template>
      </a-table>

      <a-table
        :columns="performanceForecastColumns"
        :dataSource="getPerformanceForecast"
        bordered
        :pagination="false"
        :showHeader="false"
        style="margin:5px;"
      >
        <template slot="title">业绩预告</template>
      </a-table>
    </a-layout>
  </a-layout-content>
</template>

<script>
export default {
  data() {
    return {
      stockLists: [
        [
          {
            stockName: "华天科技",
            stockCode: "002185.SZ"
          },
          {
            stockName: "太极实业",
            stockCode: "600667.SH"
          },
          {
            stockName: "晶盛机电",
            stockCode: "300316.SZ"
          },
          {
            stockName: "捷佳伟创",
            stockCode: "300724.SZ"
          },
          {
            stockName: "迈为股份",
            stockCode: "300751.SZ"
          }
        ],
        [
          {
            stockName: "康强电子",
            stockCode: "002119.SZ"
          },
          {
            stockName: "江丰电子",
            stockCode: "300666.SZ"
          },
          {
            stockName: "阿石创",
            stockCode: "300706.SZ"
          },
          {
            stockName: "乐鑫科技",
            stockCode: "688018.SH"
          },
          {
            stockName: "安集科技",
            stockCode: "688019.SH"
          },
          {
            stockName: "南大光电",
            stockCode: "300346.SZ"
          }
        ],
        [
          {
            stockCode: "000670.SZ",
            stockName: "*ST盈方"
          },
          {
            stockCode: "002049.SZ",
            stockName: "紫光国微"
          },
          {
            stockCode: "002077.SZ",
            stockName: "大港股份"
          },
          {
            stockCode: "002079.SZ",
            stockName: "苏州固锝"
          },
          {
            stockCode: "002156.SZ",
            stockName: "通富微电"
          },
          {
            stockCode: "300046.SZ",
            stockName: "台基股份"
          },
          {
            stockCode: "300053.SZ",
            stockName: "欧比特"
          },
          {
            stockCode: "300139.SZ",
            stockName: "晓程科技"
          },
          {
            stockCode: "300223.SZ",
            stockName: "北京君正"
          },
          {
            stockCode: "300327.SZ",
            stockName: "中颖电子"
          },
          {
            stockCode: "300373.SZ",
            stockName: "扬杰科技"
          },
          {
            stockCode: "300458.SZ",
            stockName: "全志科技"
          },
          {
            stockCode: "300613.SZ",
            stockName: "富瀚微"
          },
          {
            stockCode: "300623.SZ",
            stockName: "捷捷微电"
          },
          {
            stockCode: "300661.SZ",
            stockName: "圣邦股份"
          },
          {
            stockCode: "300671.SZ",
            stockName: "富满电子"
          },
          {
            stockCode: "300672.SZ",
            stockName: "国科微"
          },
          {
            stockCode: "300782.SZ",
            stockName: "卓胜微"
          },
          {
            stockCode: "600360.SH",
            stockName: "华微电子"
          },
          {
            stockCode: "600460.SH",
            stockName: "士兰微"
          },
          {
            stockCode: "600584.SH",
            stockName: "长电科技"
          },
          {
            stockCode: "603005.SH",
            stockName: "晶方科技"
          },
          {
            stockCode: "603068.SH",
            stockName: "博通集成"
          },
          {
            stockCode: "603501.SH",
            stockName: "韦尔股份"
          },
          {
            stockCode: "603986.SH",
            stockName: "兆易创新"
          },
          {
            stockCode: "688002.SH",
            stockName: "睿创微纳"
          },
          {
            stockCode: "688008.SH",
            stockName: "澜起科技"
          }
        ],
        [
          {
            stockCode: "600198.SH",
            stockName: "大唐电信"
          },
          {
            stockCode: "603160.SH",
            stockName: "汇顶科技"
          },
          {
            stockCode: "002519.SZ ",
            stockName: "银河电子"
          },
          {
            stockCode: "300250.SZ",
            stockName: "初灵信息"
          },
          {
            stockCode: "300123.SZ",
            stockName: "亚光科技"
          }
        ],
        [
          {
            stockCode: "603933.SH",
            stockName: "睿能科技"
          },
          {
            stockCode: "600100.SH",
            stockName: "同方股份"
          },
          {
            stockCode: "600601.SH",
            stockName: "方正科技"
          },
          {
            stockCode: "000066.SZ",
            stockName: "中国长城"
          },
          {
            stockCode: "300369.SZ",
            stockName: "绿盟科技"
          }
        ],
        [
          {
            stockCode: "002371.SZ",
            stockName: "北方华创"
          },
          {
            stockCode: "300077.SZ",
            stockName: "国民技术"
          },
          {
            stockCode: "300493.SZ",
            stockName: "润欣科技"
          },
          {
            stockCode: "600171.SH",
            stockName: "上海贝岭"
          },
          {
            stockCode: "002415.SZ",
            stockName: "海康威视"
          }
        ]
      ],
      currentStockInfo: {
        stockName: "股票A",
        stockCode: "001",
        chartData: {
          day: [
            { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
            { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
            { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
            { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
            { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
            { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
          ],
          week: [
            { 日期: "1/1", 访问用户: 4552, 下单用户: 1093, 下单率: 0.32 },
            { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
            { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
            { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
            { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
            { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
          ],
          month: [
            { 日期: "1/1", 访问用户: 9898, 下单用户: 1093, 下单率: 0.32 },
            { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
            { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
            { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
            { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
            { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
          ]
        },
        mainBusiness: [
          {
            name: "手机",
            income: 100
          }
        ],
        basicIndex: {
          totalMarketValue: 0,
          circulatedMarketValue: 0,
          totalCapitalStock: 0,
          circulatedCapitalStock: 0,
          turnoverRate: 0,
          per: 0,
          pbr: 0,
          psr: 0,
          totalCapitalTurnoverRate: 0,
          annualizedReturnOnNetAssets: 0
        },
        performanceForecast: {
          type: "",
          lowerMarginOfNetProfitChange: 0,
          upperMarginOfNetProfitChange: 0,
          netProfitCap: 0,
          netProfitFloor: 0
        }
      },
      mainBusinessColumns: [
        {
          title: "业务",
          dataIndex: "name"
        },
        {
          title: "收入",
          dataIndex: "income"
        }
      ],
      basicIndexColumns: [
        {
          title: "业务",
          dataIndex: "c1"
        },
        {
          title: "收入",
          dataIndex: "c2"
        },
        {
          title: "收入",
          dataIndex: "c3"
        },
        {
          title: "收入",
          dataIndex: "c4"
        }
      ],
      performanceForecastColumns: [
        {
          title: "业务",
          dataIndex: "c1"
        },
        {
          title: "收入",
          dataIndex: "c2"
        }
      ],
      chartSettings: {
        showMA: false,
        showVol: false,
        showDataZoom: false,
        labelMap: {
          open: "开盘",
          close: "收盘",
          lowest: "最低",
          highest: "最高",
          Volume: "成交"
        }
      },
      radioValue: "day"
    };
  },
  mounted() {
    this.getStockInfo(this.getStockList[0].stockCode);
    this.currentStockInfo.stockName=this.getStockList[0].stockName;
  },
  methods: {
    handleSelectChange(value) {
      var stockCode = this.getStockList[value].stockCode;
      this.currentStockInfo.stockName=this.getStockList[value].stockName;
      this.getStockInfo(stockCode);
    },
    getStockInfo(stockCode) {
      this.radioValue="day";
      this.$axios.get("/api/pub/getStockInfo", {code:stockCode}).then(res => {
        let data = res.data;
        this.currentStockInfo.stockCode=data.code;
        this.currentStockInfo.chartData.day=data.day;
        this.currentStockInfo.chartData.week=data.week;
        this.currentStockInfo.chartData.month=data.month;
        this.currentStockInfo.mainBusiness=data.main;
        var arr=data.basic;
        this.currentStockInfo.basicIndex.totalMarketValue=arr[0];
        this.currentStockInfo.basicIndex.circulatedMarketValue=arr[1];
        this.currentStockInfo.basicIndex.totalCapitalStock=arr[2];
        this.currentStockInfo.basicIndex.circulatedCapitalStock=arr[3];
        this.currentStockInfo.basicIndex.turnoverRate=arr[4];
        this.currentStockInfo.basicIndex.per=arr[5];
        this.currentStockInfo.basicIndex.pbr=arr[6];
        this.currentStockInfo.basicIndex.psr=arr[7];
        this.currentStockInfo.basicIndex.totalCapitalTurnoverRate=arr[8];
        this.currentStockInfo.basicIndex.annualizedReturnOnNetAssets=arr[9];
        this.currentStockInfo.performanceForecast.type=arr[10];
        this.currentStockInfo.performanceForecast.lowerMarginOfNetProfitChange=arr[11];
        this.currentStockInfo.performanceForecast.upperMarginOfNetProfitChange=arr[12];
        this.currentStockInfo.performanceForecast.netProfitFloor=arr[13];
        this.currentStockInfo.performanceForecast.netProfitCap=arr[14];
      });
    },
    handleTime(data){
      if(data[0].time.length==10)return data;
      for(var i=0;i<data.length;i++){
        var time=data[i].time;
        var year=time.substring(0,4);
        var month=time.substring(4,6);
        var day=time.substring(6,8);
        data[i].time=year+"/"+month+"/"+day;
      }
      return data;
    }
  },
  computed: {
    getStockList() {
      return this.stockLists[this.$route.params.type - 1];
    },
    getChartData() {
      var rows;
      // var columns = ["日期", "访问用户", "下单用户", "下单率"];
      var columns=["time", "value"];
      switch (this.radioValue) {
        case "day":
          rows = this.currentStockInfo.chartData.day;
          break;
        case "week":
          rows = this.currentStockInfo.chartData.week;
          break;
        case "month":
          rows = this.currentStockInfo.chartData.month;
          break;
      }
      return {
        columns:columns,
        rows:this.handleTime(rows),
        // rows:rows
      }
    },
    getBasicIndex() {
      return [
        {
          c1: "总市值（万元）",
          c2: this.currentStockInfo.basicIndex.totalMarketValue,
          c3: "市盈率（%）",
          c4: this.currentStockInfo.basicIndex.per
        },
        {
          c1: "流通市值（万元）",
          c2: this.currentStockInfo.basicIndex.circulatedMarketValue,
          c3: "市净率（%）",
          c4: this.currentStockInfo.basicIndex.pbr
        },
        {
          c1: "总股本（万手）",
          c2: this.currentStockInfo.basicIndex.totalCapitalStock,
          c3: "市销率（%）",
          c4: this.currentStockInfo.basicIndex.psr
        },
        {
          c1: "流通股本（万手）",
          c2: this.currentStockInfo.basicIndex.circulatedCapitalStock,
          c3: "总资金周转率（%）",
          c4: this.currentStockInfo.basicIndex.totalCapitalTurnoverRate
        },
        {
          c1: "换手率（%）",
          c2: this.currentStockInfo.basicIndex.turnoverRate,
          c3: "年化净资产收益率（%）",
          c4: this.currentStockInfo.basicIndex.annualizedReturnOnNetAssets
        }
      ];
    },
    getPerformanceForecast() {
      return [
        {
          c1: "业绩预告类型",
          c2: this.currentStockInfo.performanceForecast.type
        },
        {
          c1: "预告净利润变动幅度下限（%）",
          c2: this.currentStockInfo.performanceForecast
            .lowerMarginOfNetProfitChange
        },
        {
          c1: "预告净利润变动幅度上限（%）",
          c2: this.currentStockInfo.performanceForecast
            .upperMarginOfNetProfitChange
        },
        {
          c1: "预告净利润下限（万元）",
          c2: this.currentStockInfo.performanceForecast.netProfitFloor
        },
        {
          c1: "预告净利润上限（万元）",
          c2: this.currentStockInfo.performanceForecast.netProfitCap
        }
      ];
    }
  }
};
</script>
<style scoped>
span{
  font-size:20px;
}
</style>