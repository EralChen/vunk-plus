import e from"./chunk-DIhdBMFp.js";import n from"./chunk-BegheR67.js";import"./chunk-Dch3xQiY.js";import"./chunk-CbYhyuC0.js";import"./chunk-InFgtzo7.js";import"./chunk-ClXEvkw9.js";import"./chunk-DbK06e1c.js";import"./chunk-RCJZWN-0.js";import"./chunk-BZfs-ost.js";import"./chunk-nSDDt3HQ.js";const t=Object.freeze({displayName:"ERB",fileTypes:["erb","rhtml","html.erb"],injections:{"text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)":{patterns:[{begin:"(^\\s*)(?=<%+#(?![^%]*%>))",beginCaptures:{0:{name:"punctuation.whitespace.comment.leading.erb"}},end:"(?!\\G)(\\s*$\\n)?",endCaptures:{0:{name:"punctuation.whitespace.comment.trailing.erb"}},patterns:[{include:"#comment"}]},{begin:"(^\\s*)(?=<%(?![^%]*%>))",beginCaptures:{0:{name:"punctuation.whitespace.embedded.leading.erb"}},end:"(?!\\G)(\\s*$\\n)?",endCaptures:{0:{name:"punctuation.whitespace.embedded.trailing.erb"}},patterns:[{include:"#tags"}]},{include:"#comment"},{include:"#tags"}]}},name:"erb",patterns:[{include:"text.html.basic"}],repository:{comment:{patterns:[{begin:"<%+#",beginCaptures:{0:{name:"punctuation.definition.comment.begin.erb"}},end:"%>",endCaptures:{0:{name:"punctuation.definition.comment.end.erb"}},name:"comment.block.erb"}]},tags:{patterns:[{begin:"<%+(?!>)[-=]?(?![^%]*%>)",beginCaptures:{0:{name:"punctuation.section.embedded.begin.erb"}},contentName:"source.ruby",end:"(-?%)>",endCaptures:{0:{name:"punctuation.section.embedded.end.erb"},1:{name:"source.ruby"}},name:"meta.embedded.block.erb",patterns:[{captures:{1:{name:"punctuation.definition.comment.erb"}},match:"(#).*?(?=-?%>)",name:"comment.line.number-sign.erb"},{include:"source.ruby"}]},{begin:"<%+(?!>)[-=]?",beginCaptures:{0:{name:"punctuation.section.embedded.begin.erb"}},contentName:"source.ruby",end:"(-?%)>",endCaptures:{0:{name:"punctuation.section.embedded.end.erb"},1:{name:"source.ruby"}},name:"meta.embedded.line.erb",patterns:[{captures:{1:{name:"punctuation.definition.comment.erb"}},match:"(#).*?(?=-?%>)",name:"comment.line.number-sign.erb"},{include:"source.ruby"}]}]}},scopeName:"text.html.erb",embeddedLangs:["html","ruby"]});var p=[...e,...n,t];export{p as default};
