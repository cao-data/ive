(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{574:function(e,t,r){var content=r(588);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(249).default)("7c18d50e",content,!0,{sourceMap:!1})},587:function(e,t,r){"use strict";r(574)},588:function(e,t,r){var c=r(248)(!1);c.push([e.i,".chart[data-v-50c14105]{min-height:550px}",""]),e.exports=c},608:function(e,t,r){"use strict";r.r(t);r(165),r(189),r(49),r(25),r(85),r(73),r(33),r(72),r(105),r(106),r(410);var c={name:"TortaGraph",props:{data:{type:Object,required:!0},graph:{type:Object,required:!0}},data:function(){var e=this;return{chartOptions:{aria:{enabled:!0,decal:{show:!0}},tooltip:{padding:[4,10],borderWidth:0,textStyle:{fontFamily:"Encode Sans",fontSize:14},backgroundColor:"#f5f5f5",extraCssText:"box-shadow: none;",formatter:function(a){return 1===e.selected.length&&e.selected.includes("nacional")?'<p class="has-text-centered has-text-weight-bold my-0">'.concat(a.data.name,'</p><p class="has-text-centered my-0">').concat(a.percent," %</p>"):e.proMode||e.selected.includes(a.data.id_jurisdiccion)?'<p class="has-text-centered has-text-weight-bold">'.concat(a.data.name,'</p><p class="has-text-centered">').concat(a.percent," %</p>"):null}},toolbox:{show:!0,feature:{saveAsImage:{show:!0,title:"Guardar"}}},series:[]},graphReady:!1}},computed:{selected:function(){return this.$store.state.map.selected},selectedData:function(){var e=this;return this.data.values.filter((function(t){return e.selected.includes(t.jurisdiccion)}))},proMode:function(){return this.$store.state.system.proMode}},watch:{selected:function(e,t){e!==t&&this.prepareChart()}},mounted:function(){this.prepareChart()},methods:{handleChartClickEvent:function(e){this.proMode||e.data&&e.data&&e.data.id_jurisdiccion&&(this.$gtag.event("change_juridiccion",{event_category:"graph",event_label:e.data.id_jurisdiccion}),this.$gtag.event("interact",{event_category:"graph",event_label:"torta"}),this.$store.dispatch("map/setSelected",e.data.id_jurisdiccion))},prepareChart:function(){this.proMode?this.createSerieProMode():this.createSerie()},createSerie:function(){var e=this,t={type:"pie",colorBy:"data",radius:["40%","70%"],itemStyle:{borderRadius:6,borderColor:"#fff",borderWidth:2},emphasis:{focus:"self"},label:{fontFamily:"Encode Sans"},data:[]},r=0;this.data.values.forEach((function(c){if((e.graph.include_nacional||"nacional"!==c.id_jurisdiccion)&&!isNaN(c[e.graph.grafico_valor])){var n={};n.id_jurisdiccion=c.id_jurisdiccion,n.value=c[e.graph.grafico_valor],c[e.graph.grafico_valor]>r&&(r=c[e.graph.grafico_valor]),n.name=c.jurisdiccion_grafico,1===e.selected.length&&e.selected.includes("nacional")||c.id_jurisdiccion===e.selected[0]?n.itemStyle={color:"#8D80B9",decal:{symbol:"none"}}:n.itemStyle={color:"#cacaca",decal:{symbol:"none"}},"nacional"===c.id_jurisdiccion&&(n.itemStyle.decal.symbol="rect",n.itemStyle.decal.dashArrayX=[1,0],n.itemStyle.decal.dashArrayY=[2,3],n.itemStyle.decal.symbolSize=1,n.itemStyle.decal.rotation=Math.PI/4),t.data.push(n)}})),t.data=t.data.sort((function(a,b){return b.value-a.value})),this.chartOptions.series=[t],this.graphReady=!0},createSerieProMode:function(){var e=this,t={type:"pie",colorBy:"data",radius:["40%","70%"],itemStyle:{borderRadius:6,borderColor:"#fff",borderWidth:2,color:"#8D80B9"},data:[]},r={show:!1,min:0,max:0,inRange:{colorAlpha:[.2,1]}},c=0;if(1===this.selected.length&&"nacional"===this.selected[0])c=this.getMaxValueInAllJurisdicciones(),this.data.values.forEach((function(r){if((e.graph.include_nacional||"nacional"!==r.id_jurisdiccion)&&!isNaN(r[e.graph.grafico_valor])){var c={};c.id_jurisdiccion=r.id_jurisdiccion,c.value=r[e.graph.grafico_valor],c.name=r.jurisdiccion_grafico,t.data.push(c)}})),t.data=t.data.sort((function(a,b){return b.value-a.value}));else{c=this.getMaxValueInSelectedJurisdicciones();var n=this.filterDataBySelectedJurisdicciones(c);t.data=n.sort((function(a,b){return b.value-a.value}))}r.max=c,this.chartOptions.visualMap=r,this.chartOptions.series=[t],this.graphReady=!0},filterDataBySelectedJurisdicciones:function(){var e=this,t=[];return this.data.values.forEach((function(r){if((e.graph.include_nacional||"nacional"!==r.id_jurisdiccion)&&e.selected.includes(r.id_jurisdiccion)){var c={};c.value=r[e.graph.grafico_valor],c.name=r.jurisdiccion_grafico,t.push(c)}})),t},getMaxValueInSelectedJurisdicciones:function(){var e=this,t=0;return this.selected.forEach((function(r){var c=e.data.values.find((function(e){return e.id_jurisdiccion===r}))[e.graph.grafico_valor];c>t&&(t=c)})),t},getMaxValueInAllJurisdicciones:function(){var e=this,t=0;return this.data.values.forEach((function(r){(e.graph.include_nacional||"nacional"!==r.id_jurisdiccion)&&r[e.graph.grafico_valor]>t&&(t=r[e.graph.grafico_valor])})),t}}},n=(r(587),r(132)),component=Object(n.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.graphReady?r("VueEchart",{staticClass:"chart",attrs:{option:e.chartOptions,autoresize:!0},on:{click:e.handleChartClickEvent}}):e._e()}),[],!1,null,"50c14105",null);t.default=component.exports}}]);