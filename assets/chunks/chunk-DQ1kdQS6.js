import{_ as m}from"./chunk-CIO-knWL.js";import{d as p,r as n,m as u,V as C,o as A,c as f,a as g,h as a,w as l,g as L,b as r,X as v,F as _}from"./chunk-D2NH_4EQ.js";import"./chunk-CrX-KWCQ.js";function x(s){return new Promise(e=>{setTimeout(e,s)})}const y=p({__name:"basic",setup(s){const e=n([]),i=u(()=>[{prop:"date",label:"日期"},{label:"个人信息",children:e.value},{label:"xxx",prop:"xxx",fixed:""}]),d=n([{date:"2016-05-03",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"},{date:"2016-05-02",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"},{date:"2016-05-04",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"},{date:"2016-05-01",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"},{date:"2016-05-08",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"},{date:"2016-05-06",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"},{date:"2016-05-07",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036"}]),o=async()=>{await x(1e3),e.value=e.value.length?[]:[{prop:"name",label:"名称",width:"200px"},{label:"其他",children:[]}]};return o(),(N,t)=>{const c=C("ElButton");return A(),f(_,null,[g("p",null,[a(c,{onClick:o},{default:l(()=>t[0]||(t[0]=[L(" setColChildren ")])),_:1})]),a(r(v),{data:d.value},{default:l(()=>[a(r(m),{align:"center",source:i.value},null,8,["source"])]),_:1},8,["data"])],64)}}});export{y as default};