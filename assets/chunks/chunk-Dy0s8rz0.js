import{t as L,m as O}from"./chunk-DU9N45O4.js";/* empty css              */import"./chunk-Db8R8jrI.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */import"./chunk-eE39VB-c.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */import"./chunk-CndLfLdX.js";/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.0(f6dc0eb8fce67e57f6036f4769d92c1666cdf546)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/var I=Object.defineProperty,N=Object.getOwnPropertyDescriptor,M=Object.getOwnPropertyNames,R=Object.prototype.hasOwnProperty,K=(t,e,s,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of M(e))!R.call(t,n)&&n!==s&&I(t,n,{get:()=>e[n],enumerable:!(a=N(e,n))||a.enumerable});return t},E=(t,e,s)=>(K(t,e,"default"),s),o={};E(o,O);var H=class{constructor(t,e){this._modeId=t,this._defaults=e,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange(()=>this._stopWorker()),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange(()=>this._updateExtraLibs())}dispose(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}async _updateExtraLibs(){if(!this._worker)return;const t=++this._updateExtraLibsToken,e=await this._worker.getProxy();this._updateExtraLibsToken===t&&e.updateExtraLibs(this._defaults.getExtraLibs())}_getClient(){return this._client||(this._client=(async()=>(this._worker=o.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}}),this._defaults.getEagerModelSync()?await this._worker.withSyncedResources(o.editor.getModels().filter(t=>t.getLanguageId()===this._modeId).map(t=>t.uri)):await this._worker.getProxy()))()),this._client}async getLanguageServiceWorker(...t){const e=await this._getClient();return this._worker&&await this._worker.withSyncedResources(t),e}},i={};i["lib.d.ts"]=!0;i["lib.decorators.d.ts"]=!0;i["lib.decorators.legacy.d.ts"]=!0;i["lib.dom.asynciterable.d.ts"]=!0;i["lib.dom.d.ts"]=!0;i["lib.dom.iterable.d.ts"]=!0;i["lib.es2015.collection.d.ts"]=!0;i["lib.es2015.core.d.ts"]=!0;i["lib.es2015.d.ts"]=!0;i["lib.es2015.generator.d.ts"]=!0;i["lib.es2015.iterable.d.ts"]=!0;i["lib.es2015.promise.d.ts"]=!0;i["lib.es2015.proxy.d.ts"]=!0;i["lib.es2015.reflect.d.ts"]=!0;i["lib.es2015.symbol.d.ts"]=!0;i["lib.es2015.symbol.wellknown.d.ts"]=!0;i["lib.es2016.array.include.d.ts"]=!0;i["lib.es2016.d.ts"]=!0;i["lib.es2016.full.d.ts"]=!0;i["lib.es2016.intl.d.ts"]=!0;i["lib.es2017.d.ts"]=!0;i["lib.es2017.date.d.ts"]=!0;i["lib.es2017.full.d.ts"]=!0;i["lib.es2017.intl.d.ts"]=!0;i["lib.es2017.object.d.ts"]=!0;i["lib.es2017.sharedmemory.d.ts"]=!0;i["lib.es2017.string.d.ts"]=!0;i["lib.es2017.typedarrays.d.ts"]=!0;i["lib.es2018.asyncgenerator.d.ts"]=!0;i["lib.es2018.asynciterable.d.ts"]=!0;i["lib.es2018.d.ts"]=!0;i["lib.es2018.full.d.ts"]=!0;i["lib.es2018.intl.d.ts"]=!0;i["lib.es2018.promise.d.ts"]=!0;i["lib.es2018.regexp.d.ts"]=!0;i["lib.es2019.array.d.ts"]=!0;i["lib.es2019.d.ts"]=!0;i["lib.es2019.full.d.ts"]=!0;i["lib.es2019.intl.d.ts"]=!0;i["lib.es2019.object.d.ts"]=!0;i["lib.es2019.string.d.ts"]=!0;i["lib.es2019.symbol.d.ts"]=!0;i["lib.es2020.bigint.d.ts"]=!0;i["lib.es2020.d.ts"]=!0;i["lib.es2020.date.d.ts"]=!0;i["lib.es2020.full.d.ts"]=!0;i["lib.es2020.intl.d.ts"]=!0;i["lib.es2020.number.d.ts"]=!0;i["lib.es2020.promise.d.ts"]=!0;i["lib.es2020.sharedmemory.d.ts"]=!0;i["lib.es2020.string.d.ts"]=!0;i["lib.es2020.symbol.wellknown.d.ts"]=!0;i["lib.es2021.d.ts"]=!0;i["lib.es2021.full.d.ts"]=!0;i["lib.es2021.intl.d.ts"]=!0;i["lib.es2021.promise.d.ts"]=!0;i["lib.es2021.string.d.ts"]=!0;i["lib.es2021.weakref.d.ts"]=!0;i["lib.es2022.array.d.ts"]=!0;i["lib.es2022.d.ts"]=!0;i["lib.es2022.error.d.ts"]=!0;i["lib.es2022.full.d.ts"]=!0;i["lib.es2022.intl.d.ts"]=!0;i["lib.es2022.object.d.ts"]=!0;i["lib.es2022.regexp.d.ts"]=!0;i["lib.es2022.sharedmemory.d.ts"]=!0;i["lib.es2022.string.d.ts"]=!0;i["lib.es2023.array.d.ts"]=!0;i["lib.es2023.collection.d.ts"]=!0;i["lib.es2023.d.ts"]=!0;i["lib.es2023.full.d.ts"]=!0;i["lib.es5.d.ts"]=!0;i["lib.es6.d.ts"]=!0;i["lib.esnext.collection.d.ts"]=!0;i["lib.esnext.d.ts"]=!0;i["lib.esnext.decorators.d.ts"]=!0;i["lib.esnext.disposable.d.ts"]=!0;i["lib.esnext.full.d.ts"]=!0;i["lib.esnext.intl.d.ts"]=!0;i["lib.esnext.object.d.ts"]=!0;i["lib.esnext.promise.d.ts"]=!0;i["lib.scripthost.d.ts"]=!0;i["lib.webworker.asynciterable.d.ts"]=!0;i["lib.webworker.d.ts"]=!0;i["lib.webworker.importscripts.d.ts"]=!0;i["lib.webworker.iterable.d.ts"]=!0;function C(t,e,s=0){if(typeof t=="string")return t;if(t===void 0)return"";let a="";if(s){a+=e;for(let n=0;n<s;n++)a+="  "}if(a+=t.messageText,s++,t.next)for(const n of t.next)a+=C(n,e,s);return a}function _(t){return t?t.map(e=>e.text).join(""):""}var b=class{constructor(t){this._worker=t}_textSpanToRange(t,e){let s=t.getPositionAt(e.start),a=t.getPositionAt(e.start+e.length),{lineNumber:n,column:c}=s,{lineNumber:u,column:r}=a;return{startLineNumber:n,startColumn:c,endLineNumber:u,endColumn:r}}},V=class{constructor(t){this._worker=t,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}isLibFile(t){return t&&t.path.indexOf("/lib.")===0?!!i[t.path.slice(1)]:!1}getOrCreateModel(t){const e=o.Uri.parse(t),s=o.editor.getModel(e);if(s)return s;if(this.isLibFile(e)&&this._hasFetchedLibFiles)return o.editor.createModel(this._libFiles[e.path.slice(1)],"typescript",e);const a=L.getExtraLibs()[t];return a?o.editor.createModel(a.content,"typescript",e):null}_containsLibFile(t){for(let e of t)if(this.isLibFile(e))return!0;return!1}async fetchLibFilesIfNecessary(t){this._containsLibFile(t)&&await this._fetchLibFiles()}_fetchLibFiles(){return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then(t=>t.getLibFiles()).then(t=>{this._hasFetchedLibFiles=!0,this._libFiles=t})),this._fetchLibFilesPromise}},W=class extends b{constructor(t,e,s,a){super(a),this._libFiles=t,this._defaults=e,this._selector=s,this._disposables=[],this._listener=Object.create(null);const n=r=>{if(r.getLanguageId()!==s)return;const l=()=>{const{onlyVisible:m}=this._defaults.getDiagnosticsOptions();m?r.isAttachedToEditor()&&this._doValidate(r):this._doValidate(r)};let p;const g=r.onDidChangeContent(()=>{clearTimeout(p),p=window.setTimeout(l,500)}),f=r.onDidChangeAttached(()=>{const{onlyVisible:m}=this._defaults.getDiagnosticsOptions();m&&(r.isAttachedToEditor()?l():o.editor.setModelMarkers(r,this._selector,[]))});this._listener[r.uri.toString()]={dispose(){g.dispose(),f.dispose(),clearTimeout(p)}},l()},c=r=>{o.editor.setModelMarkers(r,this._selector,[]);const l=r.uri.toString();this._listener[l]&&(this._listener[l].dispose(),delete this._listener[l])};this._disposables.push(o.editor.onDidCreateModel(r=>n(r))),this._disposables.push(o.editor.onWillDisposeModel(c)),this._disposables.push(o.editor.onDidChangeModelLanguage(r=>{c(r.model),n(r.model)})),this._disposables.push({dispose(){for(const r of o.editor.getModels())c(r)}});const u=()=>{for(const r of o.editor.getModels())c(r),n(r)};this._disposables.push(this._defaults.onDidChange(u)),this._disposables.push(this._defaults.onDidExtraLibsChange(u)),o.editor.getModels().forEach(r=>n(r))}dispose(){this._disposables.forEach(t=>t&&t.dispose()),this._disposables=[]}async _doValidate(t){const e=await this._worker(t.uri);if(t.isDisposed())return;const s=[],{noSyntaxValidation:a,noSemanticValidation:n,noSuggestionDiagnostics:c}=this._defaults.getDiagnosticsOptions();a||s.push(e.getSyntacticDiagnostics(t.uri.toString())),n||s.push(e.getSemanticDiagnostics(t.uri.toString())),c||s.push(e.getSuggestionDiagnostics(t.uri.toString()));const u=await Promise.all(s);if(!u||t.isDisposed())return;const r=u.reduce((p,g)=>g.concat(p),[]).filter(p=>(this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(p.code)===-1),l=r.map(p=>p.relatedInformation||[]).reduce((p,g)=>g.concat(p),[]).map(p=>p.file?o.Uri.parse(p.file.fileName):null);await this._libFiles.fetchLibFilesIfNecessary(l),!t.isDisposed()&&o.editor.setModelMarkers(t,this._selector,r.map(p=>this._convertDiagnostics(t,p)))}_convertDiagnostics(t,e){const s=e.start||0,a=e.length||1,{lineNumber:n,column:c}=t.getPositionAt(s),{lineNumber:u,column:r}=t.getPositionAt(s+a),l=[];return e.reportsUnnecessary&&l.push(o.MarkerTag.Unnecessary),e.reportsDeprecated&&l.push(o.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(e.category),startLineNumber:n,startColumn:c,endLineNumber:u,endColumn:r,message:C(e.messageText,`
`),code:e.code.toString(),tags:l,relatedInformation:this._convertRelatedInformation(t,e.relatedInformation)}}_convertRelatedInformation(t,e){if(!e)return[];const s=[];return e.forEach(a=>{let n=t;if(a.file&&(n=this._libFiles.getOrCreateModel(a.file.fileName)),!n)return;const c=a.start||0,u=a.length||1,{lineNumber:r,column:l}=n.getPositionAt(c),{lineNumber:p,column:g}=n.getPositionAt(c+u);s.push({resource:n.uri,startLineNumber:r,startColumn:l,endLineNumber:p,endColumn:g,message:C(a.messageText,`
`)})}),s}_tsDiagnosticCategoryToMarkerSeverity(t){switch(t){case 1:return o.MarkerSeverity.Error;case 3:return o.MarkerSeverity.Info;case 0:return o.MarkerSeverity.Warning;case 2:return o.MarkerSeverity.Hint}return o.MarkerSeverity.Info}},j=class x extends b{get triggerCharacters(){return["."]}async provideCompletionItems(e,s,a,n){const c=e.getWordUntilPosition(s),u=new o.Range(s.lineNumber,c.startColumn,s.lineNumber,c.endColumn),r=e.uri,l=e.getOffsetAt(s),p=await this._worker(r);if(e.isDisposed())return;const g=await p.getCompletionsAtPosition(r.toString(),l);return!g||e.isDisposed()?void 0:{suggestions:g.entries.map(m=>{let w=u;if(m.replacementSpan){const k=e.getPositionAt(m.replacementSpan.start),v=e.getPositionAt(m.replacementSpan.start+m.replacementSpan.length);w=new o.Range(k.lineNumber,k.column,v.lineNumber,v.column)}const S=[];return m.kindModifiers!==void 0&&m.kindModifiers.indexOf("deprecated")!==-1&&S.push(o.languages.CompletionItemTag.Deprecated),{uri:r,position:s,offset:l,range:w,label:m.name,insertText:m.name,sortText:m.sortText,kind:x.convertKind(m.kind),tags:S}})}}async resolveCompletionItem(e,s){const a=e,n=a.uri,c=a.position,u=a.offset,l=await(await this._worker(n)).getCompletionEntryDetails(n.toString(),u,a.label);return l?{uri:n,position:c,label:l.name,kind:x.convertKind(l.kind),detail:_(l.displayParts),documentation:{value:x.createDocumentationString(l)}}:a}static convertKind(e){switch(e){case d.primitiveType:case d.keyword:return o.languages.CompletionItemKind.Keyword;case d.variable:case d.localVariable:return o.languages.CompletionItemKind.Variable;case d.memberVariable:case d.memberGetAccessor:case d.memberSetAccessor:return o.languages.CompletionItemKind.Field;case d.function:case d.memberFunction:case d.constructSignature:case d.callSignature:case d.indexSignature:return o.languages.CompletionItemKind.Function;case d.enum:return o.languages.CompletionItemKind.Enum;case d.module:return o.languages.CompletionItemKind.Module;case d.class:return o.languages.CompletionItemKind.Class;case d.interface:return o.languages.CompletionItemKind.Interface;case d.warning:return o.languages.CompletionItemKind.File}return o.languages.CompletionItemKind.Property}static createDocumentationString(e){let s=_(e.documentation);if(e.tags)for(const a of e.tags)s+=`

${F(a)}`;return s}};function F(t){let e=`*@${t.name}*`;if(t.name==="param"&&t.text){const[s,...a]=t.text;e+=`\`${s.text}\``,a.length>0&&(e+=` — ${a.map(n=>n.text).join(" ")}`)}else Array.isArray(t.text)?e+=` — ${t.text.map(s=>s.text).join(" ")}`:t.text&&(e+=` — ${t.text}`);return e}var B=class T extends b{constructor(){super(...arguments),this.signatureHelpTriggerCharacters=["(",","]}static _toSignatureHelpTriggerReason(e){switch(e.triggerKind){case o.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case o.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case o.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}async provideSignatureHelp(e,s,a,n){const c=e.uri,u=e.getOffsetAt(s),r=await this._worker(c);if(e.isDisposed())return;const l=await r.getSignatureHelpItems(c.toString(),u,{triggerReason:T._toSignatureHelpTriggerReason(n)});if(!l||e.isDisposed())return;const p={activeSignature:l.selectedItemIndex,activeParameter:l.argumentIndex,signatures:[]};return l.items.forEach(g=>{const f={label:"",parameters:[]};f.documentation={value:_(g.documentation)},f.label+=_(g.prefixDisplayParts),g.parameters.forEach((m,w,S)=>{const k=_(m.displayParts),v={label:k,documentation:{value:_(m.documentation)}};f.label+=k,f.parameters.push(v),w<S.length-1&&(f.label+=_(g.separatorDisplayParts))}),f.label+=_(g.suffixDisplayParts),p.signatures.push(f)}),{value:p,dispose(){}}}},U=class extends b{async provideHover(t,e,s){const a=t.uri,n=t.getOffsetAt(e),c=await this._worker(a);if(t.isDisposed())return;const u=await c.getQuickInfoAtPosition(a.toString(),n);if(!u||t.isDisposed())return;const r=_(u.documentation),l=u.tags?u.tags.map(g=>F(g)).join(`  

`):"",p=_(u.displayParts);return{range:this._textSpanToRange(t,u.textSpan),contents:[{value:"```typescript\n"+p+"\n```\n"},{value:r+(l?`

`+l:"")}]}}},$=class extends b{async provideDocumentHighlights(t,e,s){const a=t.uri,n=t.getOffsetAt(e),c=await this._worker(a);if(t.isDisposed())return;const u=await c.getDocumentHighlights(a.toString(),n,[a.toString()]);if(!(!u||t.isDisposed()))return u.flatMap(r=>r.highlightSpans.map(l=>({range:this._textSpanToRange(t,l.textSpan),kind:l.kind==="writtenReference"?o.languages.DocumentHighlightKind.Write:o.languages.DocumentHighlightKind.Text})))}},z=class extends b{constructor(t,e){super(e),this._libFiles=t}async provideDefinition(t,e,s){const a=t.uri,n=t.getOffsetAt(e),c=await this._worker(a);if(t.isDisposed())return;const u=await c.getDefinitionAtPosition(a.toString(),n);if(!u||t.isDisposed()||(await this._libFiles.fetchLibFilesIfNecessary(u.map(l=>o.Uri.parse(l.fileName))),t.isDisposed()))return;const r=[];for(let l of u){const p=this._libFiles.getOrCreateModel(l.fileName);p&&r.push({uri:p.uri,range:this._textSpanToRange(p,l.textSpan)})}return r}},G=class extends b{constructor(t,e){super(e),this._libFiles=t}async provideReferences(t,e,s,a){const n=t.uri,c=t.getOffsetAt(e),u=await this._worker(n);if(t.isDisposed())return;const r=await u.getReferencesAtPosition(n.toString(),c);if(!r||t.isDisposed()||(await this._libFiles.fetchLibFilesIfNecessary(r.map(p=>o.Uri.parse(p.fileName))),t.isDisposed()))return;const l=[];for(let p of r){const g=this._libFiles.getOrCreateModel(p.fileName);g&&l.push({uri:g.uri,range:this._textSpanToRange(g,p.textSpan)})}return l}},J=class extends b{async provideDocumentSymbols(t,e){const s=t.uri,a=await this._worker(s);if(t.isDisposed())return;const n=await a.getNavigationTree(s.toString());if(!n||t.isDisposed())return;const c=(r,l)=>({name:r.text,detail:"",kind:h[r.kind]||o.languages.SymbolKind.Variable,range:this._textSpanToRange(t,r.spans[0]),selectionRange:this._textSpanToRange(t,r.spans[0]),tags:[],children:r.childItems?.map(g=>c(g,r.text)),containerName:l});return n.childItems?n.childItems.map(r=>c(r)):[]}},d=class{static{this.unknown=""}static{this.keyword="keyword"}static{this.script="script"}static{this.module="module"}static{this.class="class"}static{this.interface="interface"}static{this.type="type"}static{this.enum="enum"}static{this.variable="var"}static{this.localVariable="local var"}static{this.function="function"}static{this.localFunction="local function"}static{this.memberFunction="method"}static{this.memberGetAccessor="getter"}static{this.memberSetAccessor="setter"}static{this.memberVariable="property"}static{this.constructorImplementation="constructor"}static{this.callSignature="call"}static{this.indexSignature="index"}static{this.constructSignature="construct"}static{this.parameter="parameter"}static{this.typeParameter="type parameter"}static{this.primitiveType="primitive type"}static{this.label="label"}static{this.alias="alias"}static{this.const="const"}static{this.let="let"}static{this.warning="warning"}},h=Object.create(null);h[d.module]=o.languages.SymbolKind.Module;h[d.class]=o.languages.SymbolKind.Class;h[d.enum]=o.languages.SymbolKind.Enum;h[d.interface]=o.languages.SymbolKind.Interface;h[d.memberFunction]=o.languages.SymbolKind.Method;h[d.memberVariable]=o.languages.SymbolKind.Property;h[d.memberGetAccessor]=o.languages.SymbolKind.Property;h[d.memberSetAccessor]=o.languages.SymbolKind.Property;h[d.variable]=o.languages.SymbolKind.Variable;h[d.const]=o.languages.SymbolKind.Variable;h[d.localVariable]=o.languages.SymbolKind.Variable;h[d.variable]=o.languages.SymbolKind.Variable;h[d.function]=o.languages.SymbolKind.Function;h[d.localFunction]=o.languages.SymbolKind.Function;var y=class extends b{static _convertOptions(t){return{ConvertTabsToSpaces:t.insertSpaces,TabSize:t.tabSize,IndentSize:t.tabSize,IndentStyle:2,NewLineCharacter:`
`,InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}_convertTextChanges(t,e){return{text:e.newText,range:this._textSpanToRange(t,e.span)}}},Q=class extends y{constructor(){super(...arguments),this.canFormatMultipleRanges=!1}async provideDocumentRangeFormattingEdits(t,e,s,a){const n=t.uri,c=t.getOffsetAt({lineNumber:e.startLineNumber,column:e.startColumn}),u=t.getOffsetAt({lineNumber:e.endLineNumber,column:e.endColumn}),r=await this._worker(n);if(t.isDisposed())return;const l=await r.getFormattingEditsForRange(n.toString(),c,u,y._convertOptions(s));if(!(!l||t.isDisposed()))return l.map(p=>this._convertTextChanges(t,p))}},q=class extends y{get autoFormatTriggerCharacters(){return[";","}",`
`]}async provideOnTypeFormattingEdits(t,e,s,a,n){const c=t.uri,u=t.getOffsetAt(e),r=await this._worker(c);if(t.isDisposed())return;const l=await r.getFormattingEditsAfterKeystroke(c.toString(),u,s,y._convertOptions(a));if(!(!l||t.isDisposed()))return l.map(p=>this._convertTextChanges(t,p))}},X=class extends y{async provideCodeActions(t,e,s,a){const n=t.uri,c=t.getOffsetAt({lineNumber:e.startLineNumber,column:e.startColumn}),u=t.getOffsetAt({lineNumber:e.endLineNumber,column:e.endColumn}),r=y._convertOptions(t.getOptions()),l=s.markers.filter(m=>m.code).map(m=>m.code).map(Number),p=await this._worker(n);if(t.isDisposed())return;const g=await p.getCodeFixesAtPosition(n.toString(),c,u,l,r);return!g||t.isDisposed()?{actions:[],dispose:()=>{}}:{actions:g.filter(m=>m.changes.filter(w=>w.isNewFile).length===0).map(m=>this._tsCodeFixActionToMonacoCodeAction(t,s,m)),dispose:()=>{}}}_tsCodeFixActionToMonacoCodeAction(t,e,s){const a=[];for(const c of s.changes)for(const u of c.textChanges)a.push({resource:t.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(t,u.span),text:u.newText}});return{title:s.description,edit:{edits:a},diagnostics:e.markers,kind:"quickfix"}}},Y=class extends b{constructor(t,e){super(e),this._libFiles=t}async provideRenameEdits(t,e,s,a){const n=t.uri,c=n.toString(),u=t.getOffsetAt(e),r=await this._worker(n);if(t.isDisposed())return;const l=await r.getRenameInfo(c,u,{allowRenameOfImportPath:!1});if(l.canRename===!1)return{edits:[],rejectReason:l.localizedErrorMessage};if(l.fileToRename!==void 0)throw new Error("Renaming files is not supported.");const p=await r.findRenameLocations(c,u,!1,!1,!1);if(!p||t.isDisposed())return;const g=[];for(const f of p){const m=this._libFiles.getOrCreateModel(f.fileName);if(m)g.push({resource:m.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(m,f.textSpan),text:s}});else throw new Error(`Unknown file ${f.fileName}.`)}return{edits:g}}},Z=class extends b{async provideInlayHints(t,e,s){const a=t.uri,n=a.toString(),c=t.getOffsetAt({lineNumber:e.startLineNumber,column:e.startColumn}),u=t.getOffsetAt({lineNumber:e.endLineNumber,column:e.endColumn}),r=await this._worker(a);return t.isDisposed()?null:{hints:(await r.provideInlayHints(n,c,u)).map(g=>({...g,label:g.text,position:t.getPositionAt(g.position),kind:this._convertHintKind(g.kind)})),dispose:()=>{}}}_convertHintKind(t){switch(t){case"Parameter":return o.languages.InlayHintKind.Parameter;case"Type":return o.languages.InlayHintKind.Type;default:return o.languages.InlayHintKind.Type}}},D,A;function xr(t){A=P(t,"typescript")}function Cr(t){D=P(t,"javascript")}function Dr(){return new Promise((t,e)=>{if(!D)return e("JavaScript not registered!");t(D)})}function Ar(){return new Promise((t,e)=>{if(!A)return e("TypeScript not registered!");t(A)})}function P(t,e){const s=[],a=new H(e,t),n=(...r)=>a.getLanguageServiceWorker(...r),c=new V(n);function u(){const{modeConfiguration:r}=t;tt(s),r.completionItems&&s.push(o.languages.registerCompletionItemProvider(e,new j(n))),r.signatureHelp&&s.push(o.languages.registerSignatureHelpProvider(e,new B(n))),r.hovers&&s.push(o.languages.registerHoverProvider(e,new U(n))),r.documentHighlights&&s.push(o.languages.registerDocumentHighlightProvider(e,new $(n))),r.definitions&&s.push(o.languages.registerDefinitionProvider(e,new z(c,n))),r.references&&s.push(o.languages.registerReferenceProvider(e,new G(c,n))),r.documentSymbols&&s.push(o.languages.registerDocumentSymbolProvider(e,new J(n))),r.rename&&s.push(o.languages.registerRenameProvider(e,new Y(c,n))),r.documentRangeFormattingEdits&&s.push(o.languages.registerDocumentRangeFormattingEditProvider(e,new Q(n))),r.onTypeFormattingEdits&&s.push(o.languages.registerOnTypeFormattingEditProvider(e,new q(n))),r.codeActions&&s.push(o.languages.registerCodeActionProvider(e,new X(n))),r.inlayHints&&s.push(o.languages.registerInlayHintsProvider(e,new Z(n))),r.diagnostics&&s.push(new W(c,t,e,n))}return u(),n}function tt(t){for(;t.length;)t.pop().dispose()}export{b as Adapter,X as CodeActionAdaptor,z as DefinitionAdapter,W as DiagnosticsAdapter,$ as DocumentHighlightAdapter,Q as FormatAdapter,y as FormatHelper,q as FormatOnTypeAdapter,Z as InlayHintsAdapter,d as Kind,V as LibFiles,J as OutlineAdapter,U as QuickInfoAdapter,G as ReferenceAdapter,Y as RenameAdapter,B as SignatureHelpAdapter,j as SuggestAdapter,H as WorkerManager,C as flattenDiagnosticMessageText,Dr as getJavaScriptWorker,Ar as getTypeScriptWorker,Cr as setupJavaScript,xr as setupTypeScript};