<template>
  <a-layout-content style="padding: 0 50px">
    <a-layout style="margin: 24px 16px; padding: 24px; background: #fff">
      <div>
        {{currentStockInfo.stockName}}
        {{currentStockInfo.stockCode}}
        <div style="float:right;">
          <a-select style="width: 120px" v-bind:defaultValue="0">
            <a-select-option
              v-for="(item,index) in stockList"
              v-bind:key="index"
              v-bind:value="index"
            >{{item.stockName}}</a-select-option>
          </a-select>
          <a-button type="primary" style="width: 100px">回到产业链</a-button>
        </div>
      </div>
      <a-divider />
      <a-card title="行情数据" style="margin:5px;">
        <ve-candle :data="chartData" :settings="chartSettings"></ve-candle>
      </a-card>

      <a-table
        :columns="mainBusinessColumns"
        :dataSource="currentStockInfo.mainBusiness"
        bordered
        :pagination="false"
        style="margin:5px;"
      >
        <template slot="title" >主营业务</template>
      </a-table>
      <a-table
        :columns="basicIndexColumns"
        :dataSource="getBasicIndex"
        bordered
        :pagination="false"
        :showHeader="false"
        style="margin:5px;"
      >
        <template slot="title" >基本指标</template>
      </a-table>

      <a-table
        :columns="performanceForecastColumns"
        :dataSource="getPerformanceForecast"
        bordered
        :pagination="false"
        :showHeader="false"
        style="margin:5px;"
      >
        <template slot="title" >业绩预告</template>
      </a-table>
      

      <!-- <a-card title="业绩预告" style="margin:5px;">
        <table border="1">
          <tr>
            <td>业绩预告类型</td>
            <td>{{currentStockInfo.performanceForecast.type}}</td>
          </tr>
          <tr>
            <td>预告净利润变动幅度下限（%）</td>
            <td>{{currentStockInfo.performanceForecast.lowerMarginOfNetProfitChange}}</td>
          </tr>
          <tr>
            <td>预告净利润变动幅度上限（%）</td>
            <td>{{currentStockInfo.performanceForecast.upperMarginOfNetProfitChange}}</td>
          </tr>
          <tr>
            <td>预告净利润下限（万元）</td>
            <td>{{currentStockInfo.performanceForecast.netProfitFloor}}</td>
          </tr>
          <tr>
            <td>预告净利润上限（万元）</td>
            <td>{{currentStockInfo.performanceForecast.netProfitCap}}</td>
          </tr>
        </table>
      </a-card> -->
    </a-layout>
  </a-layout-content>
</template>

<script>
export default {
  data() {
    return {
      stockList: [
        {
          stockName: "股票A",
          stockCode: "001"
        },
        {
          stockName: "好股票",
          stockCode: "002"
        }
      ],
      currentStockInfo: {
        stockName: "股票A",
        stockCode: "001",
        marketData: {},
        mainBusiness: [
          {
            businessName: "手机",
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
          dataIndex: "businessName"
        },
        {
          title: "收入",
          dataIndex: "income"
        }
      ],
      basicIndexColumns:[
        {
          title: "业务",
          dataIndex: "c1"
        },
        {
          title: "收入",
          dataIndex: "c2"
        },{
          title: "收入",
          dataIndex: "c3"
        },{
          title: "收入",
          dataIndex: "c4"
        },
      ],
      performanceForecastColumns:[
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
        showMA: true,
        showVol: true,
        showDataZoom: true,
        labelMap: {
          open: "开盘",
          close: "收盘",
          lowest: "最低",
          highest: "最高",
          Volume: "成交"
        }
      },
      chartData: {
        columns: ["日期", "open", "close", "lowest", "highest", "vol"],
        rows: [
          {
            日期: "2004-01-05",
            open: 10411.85,
            close: 10544.07,
            lowest: 10411.85,
            highest: 10575.92,
            vol: 221290000
          },
          {
            日期: "2004-01-06",
            open: 10543.85,
            close: 10538.66,
            lowest: 10454.37,
            highest: 10584.07,
            vol: 191460000
          },
          {
            日期: "2004-01-07",
            open: 10535.46,
            close: 10529.03,
            lowest: 10432.12,
            highest: 10587.55,
            vol: 225490000
          },
          {
            日期: "2004-01-08",
            open: 10530.07,
            close: 10592.44,
            lowest: 10480.59,
            highest: 10651.99,
            vol: 237770000
          },
          {
            日期: "2004-01-09",
            open: 10589.25,
            close: 10458.89,
            lowest: 10420.52,
            highest: 10603.48,
            vol: 223250000
          },
          {
            日期: "2004-01-12",
            open: 10461.55,
            close: 10485.18,
            lowest: 10389.85,
            highest: 10543.03,
            vol: 197960000
          },
          {
            日期: "2004-01-13",
            open: 10485.18,
            close: 10427.18,
            lowest: 10341.19,
            highest: 10539.25,
            vol: 197310000
          },
          {
            日期: "2004-01-14",
            open: 10428.67,
            close: 10538.37,
            lowest: 10426.89,
            highest: 10573.85,
            vol: 186280000
          },
          {
            日期: "2004-01-15",
            open: 10534.52,
            close: 10553.85,
            lowest: 10454.52,
            highest: 10639.03,
            vol: 260090000
          },
          {
            日期: "2004-01-16",
            open: 10556.37,
            close: 10600.51,
            lowest: 10503.71,
            highest: 10666.88,
            vol: 254170000
          },
          {
            日期: "2004-01-20",
            open: 10601.42,
            close: 10528.66,
            lowest: 10447.92,
            highest: 10676.96,
            vol: 224300000
          },
          {
            日期: "2004-01-21",
            open: 10522.77,
            close: 10623.62,
            lowest: 10453.11,
            highest: 10665.72,
            vol: 214920000
          },
          {
            日期: "2004-01-22",
            open: 10624.22,
            close: 10623.18,
            lowest: 10545.03,
            highest: 10717.41,
            vol: 219720000
          },
          {
            日期: "2004-01-23",
            open: 10625.25,
            close: 10568.29,
            lowest: 10490.14,
            highest: 10691.77,
            vol: 234260000
          },
          {
            日期: "2004-01-26",
            open: 10568.12,
            close: 10702.51,
            lowest: 10510.44,
            highest: 10725.18,
            vol: 186170000
          },
          {
            日期: "2004-01-27",
            open: 10701.11,
            close: 10609.92,
            lowest: 10579.33,
            highest: 10748.81,
            vol: 206560000
          },
          {
            日期: "2004-01-28",
            open: 10610.07,
            close: 10468.37,
            lowest: 10412.44,
            highest: 10703.25,
            vol: 247660000
          },
          {
            日期: "2004-01-29",
            open: 10467.41,
            close: 10510.29,
            lowest: 10369.92,
            highest: 10611.56,
            vol: 273970000
          },
          {
            日期: "2004-01-30",
            open: 10510.22,
            close: 10488.07,
            lowest: 10385.56,
            highest: 10551.03,
            vol: 208990000
          },
          {
            日期: "2004-02-02",
            open: 10487.78,
            close: 10499.18,
            lowest: 10395.55,
            highest: 10614.44,
            vol: 224800000
          },
          {
            日期: "2004-02-03",
            open: 10499.48,
            close: 10505.18,
            lowest: 10414.15,
            highest: 10571.48,
            vol: 183810000
          },
          {
            日期: "2004-02-04",
            open: 10503.11,
            close: 10470.74,
            lowest: 10394.81,
            highest: 10567.85,
            vol: 227760000
          },
          {
            日期: "2004-02-05",
            open: 10469.33,
            close: 10495.55,
            lowest: 10399.92,
            highest: 10566.37,
            vol: 187810000
          },
          {
            日期: "2004-02-06",
            open: 10494.89,
            close: 10593.03,
            lowest: 10433.74,
            highest: 10634.81,
            vol: 182880000
          },
          {
            日期: "2004-02-09",
            open: 10592.41,
            close: 10579.03,
            lowest: 10433.72,
            highest: 10634.81,
            vol: 160720000
          },
          {
            日期: "2004-02-10",
            open: 10578.74,
            close: 10613.85,
            lowest: 10511.18,
            highest: 10667.03,
            vol: 160590000
          },
          {
            日期: "2004-02-11",
            open: 10605.48,
            close: 10737.72,
            lowest: 10561.55,
            highest: 10779.41,
            vol: 277850000
          },
          {
            日期: "2004-02-12",
            open: 10735.18,
            close: 10694.07,
            lowest: 10636.44,
            highest: 10775.03,
            vol: 197560000
          },
          {
            日期: "2004-02-13",
            open: 10696.22,
            close: 10627.85,
            lowest: 10578.66,
            highest: 10755.47,
            vol: 208340000
          },
          {
            日期: "2004-02-17",
            open: 10628.88,
            close: 10714.88,
            lowest: 10628.88,
            highest: 10762.07,
            vol: 169730000
          },
          {
            日期: "2004-02-18",
            open: 10706.68,
            close: 10671.99,
            lowest: 10623.62,
            highest: 10764.36,
            vol: 164370000
          },
          {
            日期: "2004-02-19",
            open: 10674.59,
            close: 10664.73,
            lowest: 10626.44,
            highest: 10794.95,
            vol: 219890000
          },
          {
            日期: "2004-02-20",
            open: 10666.29,
            close: 10619.03,
            lowest: 10559.11,
            highest: 10722.77,
            vol: 220560000
          },
          {
            日期: "2004-02-23",
            open: 10619.55,
            close: 10609.62,
            lowest: 10508.89,
            highest: 10711.84,
            vol: 229950000
          },
          {
            日期: "2004-02-24",
            open: 10609.55,
            close: 10566.37,
            lowest: 10479.33,
            highest: 10681.41,
            vol: 225670000
          },
          {
            日期: "2004-02-25",
            open: 10566.59,
            close: 10601.62,
            lowest: 10509.42,
            highest: 10660.73,
            vol: 192420000
          },
          {
            日期: "2004-02-26",
            open: 10598.14,
            close: 10580.14,
            lowest: 10493.71,
            highest: 10652.96,
            vol: 223230000
          },
          {
            日期: "2004-02-27",
            open: 10581.55,
            close: 10583.92,
            lowest: 10519.03,
            highest: 10689.55,
            vol: 200050000
          }
        ]
      }
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {}
  },
  computed: {
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
    },getPerformanceForecast() {
      return [
        {
          c1: "业绩预告类型",
          c2: this.currentStockInfo.performanceForecast.type,
        },
        {
          c1: "预告净利润变动幅度下限（%）",
          c2: this.currentStockInfo.performanceForecast.lowerMarginOfNetProfitChange,
        },
        {
          c1: "预告净利润变动幅度上限（%）",
          c2: this.currentStockInfo.performanceForecast.upperMarginOfNetProfitChange,
        },
        {
          c1: "预告净利润下限（万元）",
          c2: this.currentStockInfo.performanceForecast.netProfitFloor,
        },
        {
          c1: "预告净利润上限（万元）",
          c2: this.currentStockInfo.performanceForecast.netProfitCap,
        },
        
      ];
    }
  }
};
</script>
<style scoped>
</style>