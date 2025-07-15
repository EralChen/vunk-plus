(function(){"use strict";var Vr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function fh(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Gr(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var zi={exports:{}};/*!

	JSZip v3.10.1 - A JavaScript class for generating and reading zip files
	<http://stuartk.com/jszip>

	(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
	Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

	JSZip uses the library pako released under the MIT license :
	https://github.com/nodeca/pako/blob/main/LICENSE
	*/var Ga;function hh(){return Ga||(Ga=1,function(e,t){(function(r){e.exports=r()})(function(){return function r(i,n,a){function s(d,c){if(!n[d]){if(!i[d]){var p=typeof Gr=="function"&&Gr;if(!c&&p)return p(d,!0);if(o)return o(d,!0);var m=new Error("Cannot find module '"+d+"'");throw m.code="MODULE_NOT_FOUND",m}var f=n[d]={exports:{}};i[d][0].call(f.exports,function(g){var h=i[d][1][g];return s(h||g)},f,f.exports,r,i,n,a)}return n[d].exports}for(var o=typeof Gr=="function"&&Gr,u=0;u<a.length;u++)s(a[u]);return s}({1:[function(r,i,n){var a=r("./utils"),s=r("./support"),o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.encode=function(u){for(var d,c,p,m,f,g,h,w=[],y=0,b=u.length,k=b,S=a.getTypeOf(u)!=="string";y<u.length;)k=b-y,p=S?(d=u[y++],c=y<b?u[y++]:0,y<b?u[y++]:0):(d=u.charCodeAt(y++),c=y<b?u.charCodeAt(y++):0,y<b?u.charCodeAt(y++):0),m=d>>2,f=(3&d)<<4|c>>4,g=1<k?(15&c)<<2|p>>6:64,h=2<k?63&p:64,w.push(o.charAt(m)+o.charAt(f)+o.charAt(g)+o.charAt(h));return w.join("")},n.decode=function(u){var d,c,p,m,f,g,h=0,w=0,y="data:";if(u.substr(0,y.length)===y)throw new Error("Invalid base64 input, it looks like a data url.");var b,k=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===o.charAt(64)&&k--,u.charAt(u.length-2)===o.charAt(64)&&k--,k%1!=0)throw new Error("Invalid base64 input, bad content length.");for(b=s.uint8array?new Uint8Array(0|k):new Array(0|k);h<u.length;)d=o.indexOf(u.charAt(h++))<<2|(m=o.indexOf(u.charAt(h++)))>>4,c=(15&m)<<4|(f=o.indexOf(u.charAt(h++)))>>2,p=(3&f)<<6|(g=o.indexOf(u.charAt(h++))),b[w++]=d,f!==64&&(b[w++]=c),g!==64&&(b[w++]=p);return b}},{"./support":30,"./utils":32}],2:[function(r,i,n){var a=r("./external"),s=r("./stream/DataWorker"),o=r("./stream/Crc32Probe"),u=r("./stream/DataLengthProbe");function d(c,p,m,f,g){this.compressedSize=c,this.uncompressedSize=p,this.crc32=m,this.compression=f,this.compressedContent=g}d.prototype={getContentWorker:function(){var c=new s(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),p=this;return c.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),c},getCompressedWorker:function(){return new s(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(c,p,m){return c.pipe(new o).pipe(new u("uncompressedSize")).pipe(p.compressWorker(m)).pipe(new u("compressedSize")).withStreamInfo("compression",p)},i.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(r,i,n){var a=r("./stream/GenericWorker");n.STORE={magic:"\0\0",compressWorker:function(){return new a("STORE compression")},uncompressWorker:function(){return new a("STORE decompression")}},n.DEFLATE=r("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(r,i,n){var a=r("./utils"),s=function(){for(var o,u=[],d=0;d<256;d++){o=d;for(var c=0;c<8;c++)o=1&o?3988292384^o>>>1:o>>>1;u[d]=o}return u}();i.exports=function(o,u){return o!==void 0&&o.length?a.getTypeOf(o)!=="string"?function(d,c,p,m){var f=s,g=m+p;d^=-1;for(var h=m;h<g;h++)d=d>>>8^f[255&(d^c[h])];return-1^d}(0|u,o,o.length,0):function(d,c,p,m){var f=s,g=m+p;d^=-1;for(var h=m;h<g;h++)d=d>>>8^f[255&(d^c.charCodeAt(h))];return-1^d}(0|u,o,o.length,0):0}},{"./utils":32}],5:[function(r,i,n){n.base64=!1,n.binary=!1,n.dir=!1,n.createFolders=!0,n.date=null,n.compression=null,n.compressionOptions=null,n.comment=null,n.unixPermissions=null,n.dosPermissions=null},{}],6:[function(r,i,n){var a=null;a=typeof Promise<"u"?Promise:r("lie"),i.exports={Promise:a}},{lie:37}],7:[function(r,i,n){var a=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",s=r("pako"),o=r("./utils"),u=r("./stream/GenericWorker"),d=a?"uint8array":"array";function c(p,m){u.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=m,this.meta={}}n.magic="\b\0",o.inherits(c,u),c.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(o.transformTo(d,p.data),!1)},c.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new s[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(m){p.push({data:m,meta:p.meta})}},n.compressWorker=function(p){return new c("Deflate",p)},n.uncompressWorker=function(){return new c("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(r,i,n){function a(f,g){var h,w="";for(h=0;h<g;h++)w+=String.fromCharCode(255&f),f>>>=8;return w}function s(f,g,h,w,y,b){var k,S,I=f.file,A=f.compression,C=b!==d.utf8encode,M=o.transformTo("string",b(I.name)),D=o.transformTo("string",d.utf8encode(I.name)),W=I.comment,J=o.transformTo("string",b(W)),z=o.transformTo("string",d.utf8encode(W)),F=D.length!==I.name.length,v=z.length!==W.length,V="",ee="",q="",le=I.dir,G=I.date,ue={crc32:0,compressedSize:0,uncompressedSize:0};g&&!h||(ue.crc32=f.crc32,ue.compressedSize=f.compressedSize,ue.uncompressedSize=f.uncompressedSize);var B=0;g&&(B|=8),C||!F&&!v||(B|=2048);var N=0,ie=0;le&&(N|=16),y==="UNIX"?(ie=798,N|=function(Y,Ie){var Be=Y;return Y||(Be=Ie?16893:33204),(65535&Be)<<16}(I.unixPermissions,le)):(ie=20,N|=function(Y){return 63&(Y||0)}(I.dosPermissions)),k=G.getUTCHours(),k<<=6,k|=G.getUTCMinutes(),k<<=5,k|=G.getUTCSeconds()/2,S=G.getUTCFullYear()-1980,S<<=4,S|=G.getUTCMonth()+1,S<<=5,S|=G.getUTCDate(),F&&(ee=a(1,1)+a(c(M),4)+D,V+="up"+a(ee.length,2)+ee),v&&(q=a(1,1)+a(c(J),4)+z,V+="uc"+a(q.length,2)+q);var P="";return P+=`
\0`,P+=a(B,2),P+=A.magic,P+=a(k,2),P+=a(S,2),P+=a(ue.crc32,4),P+=a(ue.compressedSize,4),P+=a(ue.uncompressedSize,4),P+=a(M.length,2),P+=a(V.length,2),{fileRecord:p.LOCAL_FILE_HEADER+P+M+V,dirRecord:p.CENTRAL_FILE_HEADER+a(ie,2)+P+a(J.length,2)+"\0\0\0\0"+a(N,4)+a(w,4)+M+V+J}}var o=r("../utils"),u=r("../stream/GenericWorker"),d=r("../utf8"),c=r("../crc32"),p=r("../signature");function m(f,g,h,w){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=g,this.zipPlatform=h,this.encodeFileName=w,this.streamFiles=f,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}o.inherits(m,u),m.prototype.push=function(f){var g=f.meta.percent||0,h=this.entriesCount,w=this._sources.length;this.accumulate?this.contentBuffer.push(f):(this.bytesWritten+=f.data.length,u.prototype.push.call(this,{data:f.data,meta:{currentFile:this.currentFile,percent:h?(g+100*(h-w-1))/h:100}}))},m.prototype.openedSource=function(f){this.currentSourceOffset=this.bytesWritten,this.currentFile=f.file.name;var g=this.streamFiles&&!f.file.dir;if(g){var h=s(f,g,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:h.fileRecord,meta:{percent:0}})}else this.accumulate=!0},m.prototype.closedSource=function(f){this.accumulate=!1;var g=this.streamFiles&&!f.file.dir,h=s(f,g,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(h.dirRecord),g)this.push({data:function(w){return p.DATA_DESCRIPTOR+a(w.crc32,4)+a(w.compressedSize,4)+a(w.uncompressedSize,4)}(f),meta:{percent:100}});else for(this.push({data:h.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},m.prototype.flush=function(){for(var f=this.bytesWritten,g=0;g<this.dirRecords.length;g++)this.push({data:this.dirRecords[g],meta:{percent:100}});var h=this.bytesWritten-f,w=function(y,b,k,S,I){var A=o.transformTo("string",I(S));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+a(y,2)+a(y,2)+a(b,4)+a(k,4)+a(A.length,2)+A}(this.dirRecords.length,h,f,this.zipComment,this.encodeFileName);this.push({data:w,meta:{percent:100}})},m.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},m.prototype.registerPrevious=function(f){this._sources.push(f);var g=this;return f.on("data",function(h){g.processChunk(h)}),f.on("end",function(){g.closedSource(g.previous.streamInfo),g._sources.length?g.prepareNextSource():g.end()}),f.on("error",function(h){g.error(h)}),this},m.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},m.prototype.error=function(f){var g=this._sources;if(!u.prototype.error.call(this,f))return!1;for(var h=0;h<g.length;h++)try{g[h].error(f)}catch{}return!0},m.prototype.lock=function(){u.prototype.lock.call(this);for(var f=this._sources,g=0;g<f.length;g++)f[g].lock()},i.exports=m},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(r,i,n){var a=r("../compressions"),s=r("./ZipFileWorker");n.generateWorker=function(o,u,d){var c=new s(u.streamFiles,d,u.platform,u.encodeFileName),p=0;try{o.forEach(function(m,f){p++;var g=function(b,k){var S=b||k,I=a[S];if(!I)throw new Error(S+" is not a valid compression method !");return I}(f.options.compression,u.compression),h=f.options.compressionOptions||u.compressionOptions||{},w=f.dir,y=f.date;f._compressWorker(g,h).withStreamInfo("file",{name:m,dir:w,date:y,comment:f.comment||"",unixPermissions:f.unixPermissions,dosPermissions:f.dosPermissions}).pipe(c)}),c.entriesCount=p}catch(m){c.error(m)}return c}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(r,i,n){function a(){if(!(this instanceof a))return new a;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var s=new a;for(var o in this)typeof this[o]!="function"&&(s[o]=this[o]);return s}}(a.prototype=r("./object")).loadAsync=r("./load"),a.support=r("./support"),a.defaults=r("./defaults"),a.version="3.10.1",a.loadAsync=function(s,o){return new a().loadAsync(s,o)},a.external=r("./external"),i.exports=a},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(r,i,n){var a=r("./utils"),s=r("./external"),o=r("./utf8"),u=r("./zipEntries"),d=r("./stream/Crc32Probe"),c=r("./nodejsUtils");function p(m){return new s.Promise(function(f,g){var h=m.decompressed.getContentWorker().pipe(new d);h.on("error",function(w){g(w)}).on("end",function(){h.streamInfo.crc32!==m.decompressed.crc32?g(new Error("Corrupted zip : CRC32 mismatch")):f()}).resume()})}i.exports=function(m,f){var g=this;return f=a.extend(f||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),c.isNode&&c.isStream(m)?s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):a.prepareContent("the loaded zip file",m,!0,f.optimizedBinaryString,f.base64).then(function(h){var w=new u(f);return w.load(h),w}).then(function(h){var w=[s.Promise.resolve(h)],y=h.files;if(f.checkCRC32)for(var b=0;b<y.length;b++)w.push(p(y[b]));return s.Promise.all(w)}).then(function(h){for(var w=h.shift(),y=w.files,b=0;b<y.length;b++){var k=y[b],S=k.fileNameStr,I=a.resolve(k.fileNameStr);g.file(I,k.decompressed,{binary:!0,optimizedBinaryString:!0,date:k.date,dir:k.dir,comment:k.fileCommentStr.length?k.fileCommentStr:null,unixPermissions:k.unixPermissions,dosPermissions:k.dosPermissions,createFolders:f.createFolders}),k.dir||(g.file(I).unsafeOriginalName=S)}return w.zipComment.length&&(g.comment=w.zipComment),g})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(r,i,n){var a=r("../utils"),s=r("../stream/GenericWorker");function o(u,d){s.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(d)}a.inherits(o,s),o.prototype._bindStream=function(u){var d=this;(this._stream=u).pause(),u.on("data",function(c){d.push({data:c,meta:{percent:0}})}).on("error",function(c){d.isPaused?this.generatedError=c:d.error(c)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},o.prototype.pause=function(){return!!s.prototype.pause.call(this)&&(this._stream.pause(),!0)},o.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},i.exports=o},{"../stream/GenericWorker":28,"../utils":32}],13:[function(r,i,n){var a=r("readable-stream").Readable;function s(o,u,d){a.call(this,u),this._helper=o;var c=this;o.on("data",function(p,m){c.push(p)||c._helper.pause(),d&&d(m)}).on("error",function(p){c.emit("error",p)}).on("end",function(){c.push(null)})}r("../utils").inherits(s,a),s.prototype._read=function(){this._helper.resume()},i.exports=s},{"../utils":32,"readable-stream":16}],14:[function(r,i,n){i.exports={isNode:typeof Buffer<"u",newBufferFrom:function(a,s){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(a,s);if(typeof a=="number")throw new Error('The "data" argument must not be a number');return new Buffer(a,s)},allocBuffer:function(a){if(Buffer.alloc)return Buffer.alloc(a);var s=new Buffer(a);return s.fill(0),s},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&typeof a.on=="function"&&typeof a.pause=="function"&&typeof a.resume=="function"}}},{}],15:[function(r,i,n){function a(I,A,C){var M,D=o.getTypeOf(A),W=o.extend(C||{},c);W.date=W.date||new Date,W.compression!==null&&(W.compression=W.compression.toUpperCase()),typeof W.unixPermissions=="string"&&(W.unixPermissions=parseInt(W.unixPermissions,8)),W.unixPermissions&&16384&W.unixPermissions&&(W.dir=!0),W.dosPermissions&&16&W.dosPermissions&&(W.dir=!0),W.dir&&(I=y(I)),W.createFolders&&(M=w(I))&&b.call(this,M,!0);var J=D==="string"&&W.binary===!1&&W.base64===!1;C&&C.binary!==void 0||(W.binary=!J),(A instanceof p&&A.uncompressedSize===0||W.dir||!A||A.length===0)&&(W.base64=!1,W.binary=!0,A="",W.compression="STORE",D="string");var z=null;z=A instanceof p||A instanceof u?A:g.isNode&&g.isStream(A)?new h(I,A):o.prepareContent(I,A,W.binary,W.optimizedBinaryString,W.base64);var F=new m(I,z,W);this.files[I]=F}var s=r("./utf8"),o=r("./utils"),u=r("./stream/GenericWorker"),d=r("./stream/StreamHelper"),c=r("./defaults"),p=r("./compressedObject"),m=r("./zipObject"),f=r("./generate"),g=r("./nodejsUtils"),h=r("./nodejs/NodejsStreamInputAdapter"),w=function(I){I.slice(-1)==="/"&&(I=I.substring(0,I.length-1));var A=I.lastIndexOf("/");return 0<A?I.substring(0,A):""},y=function(I){return I.slice(-1)!=="/"&&(I+="/"),I},b=function(I,A){return A=A!==void 0?A:c.createFolders,I=y(I),this.files[I]||a.call(this,I,null,{dir:!0,createFolders:A}),this.files[I]};function k(I){return Object.prototype.toString.call(I)==="[object RegExp]"}var S={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(I){var A,C,M;for(A in this.files)M=this.files[A],(C=A.slice(this.root.length,A.length))&&A.slice(0,this.root.length)===this.root&&I(C,M)},filter:function(I){var A=[];return this.forEach(function(C,M){I(C,M)&&A.push(M)}),A},file:function(I,A,C){if(arguments.length!==1)return I=this.root+I,a.call(this,I,A,C),this;if(k(I)){var M=I;return this.filter(function(W,J){return!J.dir&&M.test(W)})}var D=this.files[this.root+I];return D&&!D.dir?D:null},folder:function(I){if(!I)return this;if(k(I))return this.filter(function(D,W){return W.dir&&I.test(D)});var A=this.root+I,C=b.call(this,A),M=this.clone();return M.root=C.name,M},remove:function(I){I=this.root+I;var A=this.files[I];if(A||(I.slice(-1)!=="/"&&(I+="/"),A=this.files[I]),A&&!A.dir)delete this.files[I];else for(var C=this.filter(function(D,W){return W.name.slice(0,I.length)===I}),M=0;M<C.length;M++)delete this.files[C[M].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(I){var A,C={};try{if((C=o.extend(I||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:s.utf8encode})).type=C.type.toLowerCase(),C.compression=C.compression.toUpperCase(),C.type==="binarystring"&&(C.type="string"),!C.type)throw new Error("No output type specified.");o.checkSupport(C.type),C.platform!=="darwin"&&C.platform!=="freebsd"&&C.platform!=="linux"&&C.platform!=="sunos"||(C.platform="UNIX"),C.platform==="win32"&&(C.platform="DOS");var M=C.comment||this.comment||"";A=f.generateWorker(this,C,M)}catch(D){(A=new u("error")).error(D)}return new d(A,C.type||"string",C.mimeType)},generateAsync:function(I,A){return this.generateInternalStream(I).accumulate(A)},generateNodeStream:function(I,A){return(I=I||{}).type||(I.type="nodebuffer"),this.generateInternalStream(I).toNodejsStream(A)}};i.exports=S},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(r,i,n){i.exports=r("stream")},{stream:void 0}],17:[function(r,i,n){var a=r("./DataReader");function s(o){a.call(this,o);for(var u=0;u<this.data.length;u++)o[u]=255&o[u]}r("../utils").inherits(s,a),s.prototype.byteAt=function(o){return this.data[this.zero+o]},s.prototype.lastIndexOfSignature=function(o){for(var u=o.charCodeAt(0),d=o.charCodeAt(1),c=o.charCodeAt(2),p=o.charCodeAt(3),m=this.length-4;0<=m;--m)if(this.data[m]===u&&this.data[m+1]===d&&this.data[m+2]===c&&this.data[m+3]===p)return m-this.zero;return-1},s.prototype.readAndCheckSignature=function(o){var u=o.charCodeAt(0),d=o.charCodeAt(1),c=o.charCodeAt(2),p=o.charCodeAt(3),m=this.readData(4);return u===m[0]&&d===m[1]&&c===m[2]&&p===m[3]},s.prototype.readData=function(o){if(this.checkOffset(o),o===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},i.exports=s},{"../utils":32,"./DataReader":18}],18:[function(r,i,n){var a=r("../utils");function s(o){this.data=o,this.length=o.length,this.index=0,this.zero=0}s.prototype={checkOffset:function(o){this.checkIndex(this.index+o)},checkIndex:function(o){if(this.length<this.zero+o||o<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+o+"). Corrupted zip ?")},setIndex:function(o){this.checkIndex(o),this.index=o},skip:function(o){this.setIndex(this.index+o)},byteAt:function(){},readInt:function(o){var u,d=0;for(this.checkOffset(o),u=this.index+o-1;u>=this.index;u--)d=(d<<8)+this.byteAt(u);return this.index+=o,d},readString:function(o){return a.transformTo("string",this.readData(o))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var o=this.readInt(4);return new Date(Date.UTC(1980+(o>>25&127),(o>>21&15)-1,o>>16&31,o>>11&31,o>>5&63,(31&o)<<1))}},i.exports=s},{"../utils":32}],19:[function(r,i,n){var a=r("./Uint8ArrayReader");function s(o){a.call(this,o)}r("../utils").inherits(s,a),s.prototype.readData=function(o){this.checkOffset(o);var u=this.data.slice(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},i.exports=s},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(r,i,n){var a=r("./DataReader");function s(o){a.call(this,o)}r("../utils").inherits(s,a),s.prototype.byteAt=function(o){return this.data.charCodeAt(this.zero+o)},s.prototype.lastIndexOfSignature=function(o){return this.data.lastIndexOf(o)-this.zero},s.prototype.readAndCheckSignature=function(o){return o===this.readData(4)},s.prototype.readData=function(o){this.checkOffset(o);var u=this.data.slice(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},i.exports=s},{"../utils":32,"./DataReader":18}],21:[function(r,i,n){var a=r("./ArrayReader");function s(o){a.call(this,o)}r("../utils").inherits(s,a),s.prototype.readData=function(o){if(this.checkOffset(o),o===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},i.exports=s},{"../utils":32,"./ArrayReader":17}],22:[function(r,i,n){var a=r("../utils"),s=r("../support"),o=r("./ArrayReader"),u=r("./StringReader"),d=r("./NodeBufferReader"),c=r("./Uint8ArrayReader");i.exports=function(p){var m=a.getTypeOf(p);return a.checkSupport(m),m!=="string"||s.uint8array?m==="nodebuffer"?new d(p):s.uint8array?new c(a.transformTo("uint8array",p)):new o(a.transformTo("array",p)):new u(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(r,i,n){n.LOCAL_FILE_HEADER="PK",n.CENTRAL_FILE_HEADER="PK",n.CENTRAL_DIRECTORY_END="PK",n.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",n.ZIP64_CENTRAL_DIRECTORY_END="PK",n.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(r,i,n){var a=r("./GenericWorker"),s=r("../utils");function o(u){a.call(this,"ConvertWorker to "+u),this.destType=u}s.inherits(o,a),o.prototype.processChunk=function(u){this.push({data:s.transformTo(this.destType,u.data),meta:u.meta})},i.exports=o},{"../utils":32,"./GenericWorker":28}],25:[function(r,i,n){var a=r("./GenericWorker"),s=r("../crc32");function o(){a.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}r("../utils").inherits(o,a),o.prototype.processChunk=function(u){this.streamInfo.crc32=s(u.data,this.streamInfo.crc32||0),this.push(u)},i.exports=o},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(r,i,n){var a=r("../utils"),s=r("./GenericWorker");function o(u){s.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}a.inherits(o,s),o.prototype.processChunk=function(u){if(u){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+u.data.length}s.prototype.processChunk.call(this,u)},i.exports=o},{"../utils":32,"./GenericWorker":28}],27:[function(r,i,n){var a=r("../utils"),s=r("./GenericWorker");function o(u){s.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(c){d.dataIsReady=!0,d.data=c,d.max=c&&c.length||0,d.type=a.getTypeOf(c),d.isPaused||d._tickAndRepeat()},function(c){d.error(c)})}a.inherits(o,s),o.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this.data=null},o.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,a.delay(this._tickAndRepeat,[],this)),!0)},o.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(a.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},o.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,d);break;case"uint8array":u=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":u=this.data.slice(this.index,d)}return this.index=d,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},i.exports=o},{"../utils":32,"./GenericWorker":28}],28:[function(r,i,n){function a(s){this.name=s||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}a.prototype={push:function(s){this.emit("data",s)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(s){this.emit("error",s)}return!0},error:function(s){return!this.isFinished&&(this.isPaused?this.generatedError=s:(this.isFinished=!0,this.emit("error",s),this.previous&&this.previous.error(s),this.cleanUp()),!0)},on:function(s,o){return this._listeners[s].push(o),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(s,o){if(this._listeners[s])for(var u=0;u<this._listeners[s].length;u++)this._listeners[s][u].call(this,o)},pipe:function(s){return s.registerPrevious(this)},registerPrevious:function(s){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=s.streamInfo,this.mergeStreamInfo(),this.previous=s;var o=this;return s.on("data",function(u){o.processChunk(u)}),s.on("end",function(){o.end()}),s.on("error",function(u){o.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var s=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),s=!0),this.previous&&this.previous.resume(),!s},flush:function(){},processChunk:function(s){this.push(s)},withStreamInfo:function(s,o){return this.extraStreamInfo[s]=o,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var s in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,s)&&(this.streamInfo[s]=this.extraStreamInfo[s])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var s="Worker "+this.name;return this.previous?this.previous+" -> "+s:s}},i.exports=a},{}],29:[function(r,i,n){var a=r("../utils"),s=r("./ConvertWorker"),o=r("./GenericWorker"),u=r("../base64"),d=r("../support"),c=r("../external"),p=null;if(d.nodestream)try{p=r("../nodejs/NodejsStreamOutputAdapter")}catch{}function m(g,h){return new c.Promise(function(w,y){var b=[],k=g._internalType,S=g._outputType,I=g._mimeType;g.on("data",function(A,C){b.push(A),h&&h(C)}).on("error",function(A){b=[],y(A)}).on("end",function(){try{var A=function(C,M,D){switch(C){case"blob":return a.newBlob(a.transformTo("arraybuffer",M),D);case"base64":return u.encode(M);default:return a.transformTo(C,M)}}(S,function(C,M){var D,W=0,J=null,z=0;for(D=0;D<M.length;D++)z+=M[D].length;switch(C){case"string":return M.join("");case"array":return Array.prototype.concat.apply([],M);case"uint8array":for(J=new Uint8Array(z),D=0;D<M.length;D++)J.set(M[D],W),W+=M[D].length;return J;case"nodebuffer":return Buffer.concat(M);default:throw new Error("concat : unsupported type '"+C+"'")}}(k,b),I);w(A)}catch(C){y(C)}b=[]}).resume()})}function f(g,h,w){var y=h;switch(h){case"blob":case"arraybuffer":y="uint8array";break;case"base64":y="string"}try{this._internalType=y,this._outputType=h,this._mimeType=w,a.checkSupport(y),this._worker=g.pipe(new s(y)),g.lock()}catch(b){this._worker=new o("error"),this._worker.error(b)}}f.prototype={accumulate:function(g){return m(this,g)},on:function(g,h){var w=this;return g==="data"?this._worker.on(g,function(y){h.call(w,y.data,y.meta)}):this._worker.on(g,function(){a.delay(h,arguments,w)}),this},resume:function(){return a.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(g){if(a.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},g)}},i.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(r,i,n){if(n.base64=!0,n.array=!0,n.string=!0,n.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",n.nodebuffer=typeof Buffer<"u",n.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")n.blob=!1;else{var a=new ArrayBuffer(0);try{n.blob=new Blob([a],{type:"application/zip"}).size===0}catch{try{var s=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);s.append(a),n.blob=s.getBlob("application/zip").size===0}catch{n.blob=!1}}}try{n.nodestream=!!r("readable-stream").Readable}catch{n.nodestream=!1}},{"readable-stream":16}],31:[function(r,i,n){for(var a=r("./utils"),s=r("./support"),o=r("./nodejsUtils"),u=r("./stream/GenericWorker"),d=new Array(256),c=0;c<256;c++)d[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;d[254]=d[254]=1;function p(){u.call(this,"utf-8 decode"),this.leftOver=null}function m(){u.call(this,"utf-8 encode")}n.utf8encode=function(f){return s.nodebuffer?o.newBufferFrom(f,"utf-8"):function(g){var h,w,y,b,k,S=g.length,I=0;for(b=0;b<S;b++)(64512&(w=g.charCodeAt(b)))==55296&&b+1<S&&(64512&(y=g.charCodeAt(b+1)))==56320&&(w=65536+(w-55296<<10)+(y-56320),b++),I+=w<128?1:w<2048?2:w<65536?3:4;for(h=s.uint8array?new Uint8Array(I):new Array(I),b=k=0;k<I;b++)(64512&(w=g.charCodeAt(b)))==55296&&b+1<S&&(64512&(y=g.charCodeAt(b+1)))==56320&&(w=65536+(w-55296<<10)+(y-56320),b++),w<128?h[k++]=w:(w<2048?h[k++]=192|w>>>6:(w<65536?h[k++]=224|w>>>12:(h[k++]=240|w>>>18,h[k++]=128|w>>>12&63),h[k++]=128|w>>>6&63),h[k++]=128|63&w);return h}(f)},n.utf8decode=function(f){return s.nodebuffer?a.transformTo("nodebuffer",f).toString("utf-8"):function(g){var h,w,y,b,k=g.length,S=new Array(2*k);for(h=w=0;h<k;)if((y=g[h++])<128)S[w++]=y;else if(4<(b=d[y]))S[w++]=65533,h+=b-1;else{for(y&=b===2?31:b===3?15:7;1<b&&h<k;)y=y<<6|63&g[h++],b--;1<b?S[w++]=65533:y<65536?S[w++]=y:(y-=65536,S[w++]=55296|y>>10&1023,S[w++]=56320|1023&y)}return S.length!==w&&(S.subarray?S=S.subarray(0,w):S.length=w),a.applyFromCharCode(S)}(f=a.transformTo(s.uint8array?"uint8array":"array",f))},a.inherits(p,u),p.prototype.processChunk=function(f){var g=a.transformTo(s.uint8array?"uint8array":"array",f.data);if(this.leftOver&&this.leftOver.length){if(s.uint8array){var h=g;(g=new Uint8Array(h.length+this.leftOver.length)).set(this.leftOver,0),g.set(h,this.leftOver.length)}else g=this.leftOver.concat(g);this.leftOver=null}var w=function(b,k){var S;for((k=k||b.length)>b.length&&(k=b.length),S=k-1;0<=S&&(192&b[S])==128;)S--;return S<0||S===0?k:S+d[b[S]]>k?S:k}(g),y=g;w!==g.length&&(s.uint8array?(y=g.subarray(0,w),this.leftOver=g.subarray(w,g.length)):(y=g.slice(0,w),this.leftOver=g.slice(w,g.length))),this.push({data:n.utf8decode(y),meta:f.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:n.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},n.Utf8DecodeWorker=p,a.inherits(m,u),m.prototype.processChunk=function(f){this.push({data:n.utf8encode(f.data),meta:f.meta})},n.Utf8EncodeWorker=m},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(r,i,n){var a=r("./support"),s=r("./base64"),o=r("./nodejsUtils"),u=r("./external");function d(h){return h}function c(h,w){for(var y=0;y<h.length;++y)w[y]=255&h.charCodeAt(y);return w}r("setimmediate"),n.newBlob=function(h,w){n.checkSupport("blob");try{return new Blob([h],{type:w})}catch{try{var y=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return y.append(h),y.getBlob(w)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(h,w,y){var b=[],k=0,S=h.length;if(S<=y)return String.fromCharCode.apply(null,h);for(;k<S;)w==="array"||w==="nodebuffer"?b.push(String.fromCharCode.apply(null,h.slice(k,Math.min(k+y,S)))):b.push(String.fromCharCode.apply(null,h.subarray(k,Math.min(k+y,S)))),k+=y;return b.join("")},stringifyByChar:function(h){for(var w="",y=0;y<h.length;y++)w+=String.fromCharCode(h[y]);return w},applyCanBeUsed:{uint8array:function(){try{return a.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return a.nodebuffer&&String.fromCharCode.apply(null,o.allocBuffer(1)).length===1}catch{return!1}}()}};function m(h){var w=65536,y=n.getTypeOf(h),b=!0;if(y==="uint8array"?b=p.applyCanBeUsed.uint8array:y==="nodebuffer"&&(b=p.applyCanBeUsed.nodebuffer),b)for(;1<w;)try{return p.stringifyByChunk(h,y,w)}catch{w=Math.floor(w/2)}return p.stringifyByChar(h)}function f(h,w){for(var y=0;y<h.length;y++)w[y]=h[y];return w}n.applyFromCharCode=m;var g={};g.string={string:d,array:function(h){return c(h,new Array(h.length))},arraybuffer:function(h){return g.string.uint8array(h).buffer},uint8array:function(h){return c(h,new Uint8Array(h.length))},nodebuffer:function(h){return c(h,o.allocBuffer(h.length))}},g.array={string:m,array:d,arraybuffer:function(h){return new Uint8Array(h).buffer},uint8array:function(h){return new Uint8Array(h)},nodebuffer:function(h){return o.newBufferFrom(h)}},g.arraybuffer={string:function(h){return m(new Uint8Array(h))},array:function(h){return f(new Uint8Array(h),new Array(h.byteLength))},arraybuffer:d,uint8array:function(h){return new Uint8Array(h)},nodebuffer:function(h){return o.newBufferFrom(new Uint8Array(h))}},g.uint8array={string:m,array:function(h){return f(h,new Array(h.length))},arraybuffer:function(h){return h.buffer},uint8array:d,nodebuffer:function(h){return o.newBufferFrom(h)}},g.nodebuffer={string:m,array:function(h){return f(h,new Array(h.length))},arraybuffer:function(h){return g.nodebuffer.uint8array(h).buffer},uint8array:function(h){return f(h,new Uint8Array(h.length))},nodebuffer:d},n.transformTo=function(h,w){if(w=w||"",!h)return w;n.checkSupport(h);var y=n.getTypeOf(w);return g[y][h](w)},n.resolve=function(h){for(var w=h.split("/"),y=[],b=0;b<w.length;b++){var k=w[b];k==="."||k===""&&b!==0&&b!==w.length-1||(k===".."?y.pop():y.push(k))}return y.join("/")},n.getTypeOf=function(h){return typeof h=="string"?"string":Object.prototype.toString.call(h)==="[object Array]"?"array":a.nodebuffer&&o.isBuffer(h)?"nodebuffer":a.uint8array&&h instanceof Uint8Array?"uint8array":a.arraybuffer&&h instanceof ArrayBuffer?"arraybuffer":void 0},n.checkSupport=function(h){if(!a[h.toLowerCase()])throw new Error(h+" is not supported by this platform")},n.MAX_VALUE_16BITS=65535,n.MAX_VALUE_32BITS=-1,n.pretty=function(h){var w,y,b="";for(y=0;y<(h||"").length;y++)b+="\\x"+((w=h.charCodeAt(y))<16?"0":"")+w.toString(16).toUpperCase();return b},n.delay=function(h,w,y){setImmediate(function(){h.apply(y||null,w||[])})},n.inherits=function(h,w){function y(){}y.prototype=w.prototype,h.prototype=new y},n.extend=function(){var h,w,y={};for(h=0;h<arguments.length;h++)for(w in arguments[h])Object.prototype.hasOwnProperty.call(arguments[h],w)&&y[w]===void 0&&(y[w]=arguments[h][w]);return y},n.prepareContent=function(h,w,y,b,k){return u.Promise.resolve(w).then(function(S){return a.blob&&(S instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(S))!==-1)&&typeof FileReader<"u"?new u.Promise(function(I,A){var C=new FileReader;C.onload=function(M){I(M.target.result)},C.onerror=function(M){A(M.target.error)},C.readAsArrayBuffer(S)}):S}).then(function(S){var I=n.getTypeOf(S);return I?(I==="arraybuffer"?S=n.transformTo("uint8array",S):I==="string"&&(k?S=s.decode(S):y&&b!==!0&&(S=function(A){return c(A,a.uint8array?new Uint8Array(A.length):new Array(A.length))}(S))),S):u.Promise.reject(new Error("Can't read the data of '"+h+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(r,i,n){var a=r("./reader/readerFor"),s=r("./utils"),o=r("./signature"),u=r("./zipEntry"),d=r("./support");function c(p){this.files=[],this.loadOptions=p}c.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var m=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+s.pretty(m)+", expected "+s.pretty(p)+")")}},isSignature:function(p,m){var f=this.reader.index;this.reader.setIndex(p);var g=this.reader.readString(4)===m;return this.reader.setIndex(f),g},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),m=d.uint8array?"uint8array":"array",f=s.transformTo(m,p);this.zipComment=this.loadOptions.decodeFileName(f)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,m,f,g=this.zip64EndOfCentralSize-44;0<g;)p=this.reader.readInt(2),m=this.reader.readInt(4),f=this.reader.readData(m),this.zip64ExtensibleData[p]={id:p,length:m,value:f}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,m;for(p=0;p<this.files.length;p++)m=this.files[p],this.reader.setIndex(m.localHeaderOffset),this.checkSignature(o.LOCAL_FILE_HEADER),m.readLocalPart(this.reader),m.handleUTF8(),m.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);)(p=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,o.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var m=p;if(this.checkSignature(o.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===s.MAX_VALUE_16BITS||this.diskWithCentralDirStart===s.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===s.MAX_VALUE_16BITS||this.centralDirRecords===s.MAX_VALUE_16BITS||this.centralDirSize===s.MAX_VALUE_32BITS||this.centralDirOffset===s.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,o.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var f=this.centralDirOffset+this.centralDirSize;this.zip64&&(f+=20,f+=12+this.zip64EndOfCentralSize);var g=m-f;if(0<g)this.isSignature(m,o.CENTRAL_FILE_HEADER)||(this.reader.zero=g);else if(g<0)throw new Error("Corrupted zip: missing "+Math.abs(g)+" bytes.")},prepareReader:function(p){this.reader=a(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},i.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(r,i,n){var a=r("./reader/readerFor"),s=r("./utils"),o=r("./compressedObject"),u=r("./crc32"),d=r("./utf8"),c=r("./compressions"),p=r("./support");function m(f,g){this.options=f,this.loadOptions=g}m.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(f){var g,h;if(f.skip(22),this.fileNameLength=f.readInt(2),h=f.readInt(2),this.fileName=f.readData(this.fileNameLength),f.skip(h),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((g=function(w){for(var y in c)if(Object.prototype.hasOwnProperty.call(c,y)&&c[y].magic===w)return c[y];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new o(this.compressedSize,this.uncompressedSize,this.crc32,g,f.readData(this.compressedSize))},readCentralPart:function(f){this.versionMadeBy=f.readInt(2),f.skip(2),this.bitFlag=f.readInt(2),this.compressionMethod=f.readString(2),this.date=f.readDate(),this.crc32=f.readInt(4),this.compressedSize=f.readInt(4),this.uncompressedSize=f.readInt(4);var g=f.readInt(2);if(this.extraFieldsLength=f.readInt(2),this.fileCommentLength=f.readInt(2),this.diskNumberStart=f.readInt(2),this.internalFileAttributes=f.readInt(2),this.externalFileAttributes=f.readInt(4),this.localHeaderOffset=f.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");f.skip(g),this.readExtraFields(f),this.parseZIP64ExtraField(f),this.fileComment=f.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var f=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),f==0&&(this.dosPermissions=63&this.externalFileAttributes),f==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var f=a(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=f.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=f.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=f.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=f.readInt(4))}},readExtraFields:function(f){var g,h,w,y=f.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});f.index+4<y;)g=f.readInt(2),h=f.readInt(2),w=f.readData(h),this.extraFields[g]={id:g,length:h,value:w};f.setIndex(y)},handleUTF8:function(){var f=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var g=this.findExtraFieldUnicodePath();if(g!==null)this.fileNameStr=g;else{var h=s.transformTo(f,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(h)}var w=this.findExtraFieldUnicodeComment();if(w!==null)this.fileCommentStr=w;else{var y=s.transformTo(f,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(y)}}},findExtraFieldUnicodePath:function(){var f=this.extraFields[28789];if(f){var g=a(f.value);return g.readInt(1)!==1||u(this.fileName)!==g.readInt(4)?null:d.utf8decode(g.readData(f.length-5))}return null},findExtraFieldUnicodeComment:function(){var f=this.extraFields[25461];if(f){var g=a(f.value);return g.readInt(1)!==1||u(this.fileComment)!==g.readInt(4)?null:d.utf8decode(g.readData(f.length-5))}return null}},i.exports=m},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(r,i,n){function a(g,h,w){this.name=g,this.dir=w.dir,this.date=w.date,this.comment=w.comment,this.unixPermissions=w.unixPermissions,this.dosPermissions=w.dosPermissions,this._data=h,this._dataBinary=w.binary,this.options={compression:w.compression,compressionOptions:w.compressionOptions}}var s=r("./stream/StreamHelper"),o=r("./stream/DataWorker"),u=r("./utf8"),d=r("./compressedObject"),c=r("./stream/GenericWorker");a.prototype={internalStream:function(g){var h=null,w="string";try{if(!g)throw new Error("No output type specified.");var y=(w=g.toLowerCase())==="string"||w==="text";w!=="binarystring"&&w!=="text"||(w="string"),h=this._decompressWorker();var b=!this._dataBinary;b&&!y&&(h=h.pipe(new u.Utf8EncodeWorker)),!b&&y&&(h=h.pipe(new u.Utf8DecodeWorker))}catch(k){(h=new c("error")).error(k)}return new s(h,w,"")},async:function(g,h){return this.internalStream(g).accumulate(h)},nodeStream:function(g,h){return this.internalStream(g||"nodebuffer").toNodejsStream(h)},_compressWorker:function(g,h){if(this._data instanceof d&&this._data.compression.magic===g.magic)return this._data.getCompressedWorker();var w=this._decompressWorker();return this._dataBinary||(w=w.pipe(new u.Utf8EncodeWorker)),d.createWorkerFrom(w,g,h)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof c?this._data:new o(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],m=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<p.length;f++)a.prototype[p[f]]=m;i.exports=a},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(r,i,n){(function(a){var s,o,u=a.MutationObserver||a.WebKitMutationObserver;if(u){var d=0,c=new u(g),p=a.document.createTextNode("");c.observe(p,{characterData:!0}),s=function(){p.data=d=++d%2}}else if(a.setImmediate||a.MessageChannel===void 0)s="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var h=a.document.createElement("script");h.onreadystatechange=function(){g(),h.onreadystatechange=null,h.parentNode.removeChild(h),h=null},a.document.documentElement.appendChild(h)}:function(){setTimeout(g,0)};else{var m=new a.MessageChannel;m.port1.onmessage=g,s=function(){m.port2.postMessage(0)}}var f=[];function g(){var h,w;o=!0;for(var y=f.length;y;){for(w=f,f=[],h=-1;++h<y;)w[h]();y=f.length}o=!1}i.exports=function(h){f.push(h)!==1||o||s()}}).call(this,typeof Vr<"u"?Vr:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(r,i,n){var a=r("immediate");function s(){}var o={},u=["REJECTED"],d=["FULFILLED"],c=["PENDING"];function p(y){if(typeof y!="function")throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,y!==s&&h(this,y)}function m(y,b,k){this.promise=y,typeof b=="function"&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),typeof k=="function"&&(this.onRejected=k,this.callRejected=this.otherCallRejected)}function f(y,b,k){a(function(){var S;try{S=b(k)}catch(I){return o.reject(y,I)}S===y?o.reject(y,new TypeError("Cannot resolve promise with itself")):o.resolve(y,S)})}function g(y){var b=y&&y.then;if(y&&(typeof y=="object"||typeof y=="function")&&typeof b=="function")return function(){b.apply(y,arguments)}}function h(y,b){var k=!1;function S(C){k||(k=!0,o.reject(y,C))}function I(C){k||(k=!0,o.resolve(y,C))}var A=w(function(){b(I,S)});A.status==="error"&&S(A.value)}function w(y,b){var k={};try{k.value=y(b),k.status="success"}catch(S){k.status="error",k.value=S}return k}(i.exports=p).prototype.finally=function(y){if(typeof y!="function")return this;var b=this.constructor;return this.then(function(k){return b.resolve(y()).then(function(){return k})},function(k){return b.resolve(y()).then(function(){throw k})})},p.prototype.catch=function(y){return this.then(null,y)},p.prototype.then=function(y,b){if(typeof y!="function"&&this.state===d||typeof b!="function"&&this.state===u)return this;var k=new this.constructor(s);return this.state!==c?f(k,this.state===d?y:b,this.outcome):this.queue.push(new m(k,y,b)),k},m.prototype.callFulfilled=function(y){o.resolve(this.promise,y)},m.prototype.otherCallFulfilled=function(y){f(this.promise,this.onFulfilled,y)},m.prototype.callRejected=function(y){o.reject(this.promise,y)},m.prototype.otherCallRejected=function(y){f(this.promise,this.onRejected,y)},o.resolve=function(y,b){var k=w(g,b);if(k.status==="error")return o.reject(y,k.value);var S=k.value;if(S)h(y,S);else{y.state=d,y.outcome=b;for(var I=-1,A=y.queue.length;++I<A;)y.queue[I].callFulfilled(b)}return y},o.reject=function(y,b){y.state=u,y.outcome=b;for(var k=-1,S=y.queue.length;++k<S;)y.queue[k].callRejected(b);return y},p.resolve=function(y){return y instanceof this?y:o.resolve(new this(s),y)},p.reject=function(y){var b=new this(s);return o.reject(b,y)},p.all=function(y){var b=this;if(Object.prototype.toString.call(y)!=="[object Array]")return this.reject(new TypeError("must be an array"));var k=y.length,S=!1;if(!k)return this.resolve([]);for(var I=new Array(k),A=0,C=-1,M=new this(s);++C<k;)D(y[C],C);return M;function D(W,J){b.resolve(W).then(function(z){I[J]=z,++A!==k||S||(S=!0,o.resolve(M,I))},function(z){S||(S=!0,o.reject(M,z))})}},p.race=function(y){var b=this;if(Object.prototype.toString.call(y)!=="[object Array]")return this.reject(new TypeError("must be an array"));var k=y.length,S=!1;if(!k)return this.resolve([]);for(var I=-1,A=new this(s);++I<k;)C=y[I],b.resolve(C).then(function(M){S||(S=!0,o.resolve(A,M))},function(M){S||(S=!0,o.reject(A,M))});var C;return A}},{immediate:36}],38:[function(r,i,n){var a={};(0,r("./lib/utils/common").assign)(a,r("./lib/deflate"),r("./lib/inflate"),r("./lib/zlib/constants")),i.exports=a},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(r,i,n){var a=r("./zlib/deflate"),s=r("./utils/common"),o=r("./utils/strings"),u=r("./zlib/messages"),d=r("./zlib/zstream"),c=Object.prototype.toString,p=0,m=-1,f=0,g=8;function h(y){if(!(this instanceof h))return new h(y);this.options=s.assign({level:m,method:g,chunkSize:16384,windowBits:15,memLevel:8,strategy:f,to:""},y||{});var b=this.options;b.raw&&0<b.windowBits?b.windowBits=-b.windowBits:b.gzip&&0<b.windowBits&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var k=a.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(k!==p)throw new Error(u[k]);if(b.header&&a.deflateSetHeader(this.strm,b.header),b.dictionary){var S;if(S=typeof b.dictionary=="string"?o.string2buf(b.dictionary):c.call(b.dictionary)==="[object ArrayBuffer]"?new Uint8Array(b.dictionary):b.dictionary,(k=a.deflateSetDictionary(this.strm,S))!==p)throw new Error(u[k]);this._dict_set=!0}}function w(y,b){var k=new h(b);if(k.push(y,!0),k.err)throw k.msg||u[k.err];return k.result}h.prototype.push=function(y,b){var k,S,I=this.strm,A=this.options.chunkSize;if(this.ended)return!1;S=b===~~b?b:b===!0?4:0,typeof y=="string"?I.input=o.string2buf(y):c.call(y)==="[object ArrayBuffer]"?I.input=new Uint8Array(y):I.input=y,I.next_in=0,I.avail_in=I.input.length;do{if(I.avail_out===0&&(I.output=new s.Buf8(A),I.next_out=0,I.avail_out=A),(k=a.deflate(I,S))!==1&&k!==p)return this.onEnd(k),!(this.ended=!0);I.avail_out!==0&&(I.avail_in!==0||S!==4&&S!==2)||(this.options.to==="string"?this.onData(o.buf2binstring(s.shrinkBuf(I.output,I.next_out))):this.onData(s.shrinkBuf(I.output,I.next_out)))}while((0<I.avail_in||I.avail_out===0)&&k!==1);return S===4?(k=a.deflateEnd(this.strm),this.onEnd(k),this.ended=!0,k===p):S!==2||(this.onEnd(p),!(I.avail_out=0))},h.prototype.onData=function(y){this.chunks.push(y)},h.prototype.onEnd=function(y){y===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},n.Deflate=h,n.deflate=w,n.deflateRaw=function(y,b){return(b=b||{}).raw=!0,w(y,b)},n.gzip=function(y,b){return(b=b||{}).gzip=!0,w(y,b)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(r,i,n){var a=r("./zlib/inflate"),s=r("./utils/common"),o=r("./utils/strings"),u=r("./zlib/constants"),d=r("./zlib/messages"),c=r("./zlib/zstream"),p=r("./zlib/gzheader"),m=Object.prototype.toString;function f(h){if(!(this instanceof f))return new f(h);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},h||{});var w=this.options;w.raw&&0<=w.windowBits&&w.windowBits<16&&(w.windowBits=-w.windowBits,w.windowBits===0&&(w.windowBits=-15)),!(0<=w.windowBits&&w.windowBits<16)||h&&h.windowBits||(w.windowBits+=32),15<w.windowBits&&w.windowBits<48&&(15&w.windowBits)==0&&(w.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var y=a.inflateInit2(this.strm,w.windowBits);if(y!==u.Z_OK)throw new Error(d[y]);this.header=new p,a.inflateGetHeader(this.strm,this.header)}function g(h,w){var y=new f(w);if(y.push(h,!0),y.err)throw y.msg||d[y.err];return y.result}f.prototype.push=function(h,w){var y,b,k,S,I,A,C=this.strm,M=this.options.chunkSize,D=this.options.dictionary,W=!1;if(this.ended)return!1;b=w===~~w?w:w===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof h=="string"?C.input=o.binstring2buf(h):m.call(h)==="[object ArrayBuffer]"?C.input=new Uint8Array(h):C.input=h,C.next_in=0,C.avail_in=C.input.length;do{if(C.avail_out===0&&(C.output=new s.Buf8(M),C.next_out=0,C.avail_out=M),(y=a.inflate(C,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&D&&(A=typeof D=="string"?o.string2buf(D):m.call(D)==="[object ArrayBuffer]"?new Uint8Array(D):D,y=a.inflateSetDictionary(this.strm,A)),y===u.Z_BUF_ERROR&&W===!0&&(y=u.Z_OK,W=!1),y!==u.Z_STREAM_END&&y!==u.Z_OK)return this.onEnd(y),!(this.ended=!0);C.next_out&&(C.avail_out!==0&&y!==u.Z_STREAM_END&&(C.avail_in!==0||b!==u.Z_FINISH&&b!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(k=o.utf8border(C.output,C.next_out),S=C.next_out-k,I=o.buf2string(C.output,k),C.next_out=S,C.avail_out=M-S,S&&s.arraySet(C.output,C.output,k,S,0),this.onData(I)):this.onData(s.shrinkBuf(C.output,C.next_out)))),C.avail_in===0&&C.avail_out===0&&(W=!0)}while((0<C.avail_in||C.avail_out===0)&&y!==u.Z_STREAM_END);return y===u.Z_STREAM_END&&(b=u.Z_FINISH),b===u.Z_FINISH?(y=a.inflateEnd(this.strm),this.onEnd(y),this.ended=!0,y===u.Z_OK):b!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(C.avail_out=0))},f.prototype.onData=function(h){this.chunks.push(h)},f.prototype.onEnd=function(h){h===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=h,this.msg=this.strm.msg},n.Inflate=f,n.inflate=g,n.inflateRaw=function(h,w){return(w=w||{}).raw=!0,g(h,w)},n.ungzip=g},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(r,i,n){var a=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";n.assign=function(u){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var c=d.shift();if(c){if(typeof c!="object")throw new TypeError(c+"must be non-object");for(var p in c)c.hasOwnProperty(p)&&(u[p]=c[p])}}return u},n.shrinkBuf=function(u,d){return u.length===d?u:u.subarray?u.subarray(0,d):(u.length=d,u)};var s={arraySet:function(u,d,c,p,m){if(d.subarray&&u.subarray)u.set(d.subarray(c,c+p),m);else for(var f=0;f<p;f++)u[m+f]=d[c+f]},flattenChunks:function(u){var d,c,p,m,f,g;for(d=p=0,c=u.length;d<c;d++)p+=u[d].length;for(g=new Uint8Array(p),d=m=0,c=u.length;d<c;d++)f=u[d],g.set(f,m),m+=f.length;return g}},o={arraySet:function(u,d,c,p,m){for(var f=0;f<p;f++)u[m+f]=d[c+f]},flattenChunks:function(u){return[].concat.apply([],u)}};n.setTyped=function(u){u?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,s)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,o))},n.setTyped(a)},{}],42:[function(r,i,n){var a=r("./common"),s=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch{s=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{o=!1}for(var u=new a.Buf8(256),d=0;d<256;d++)u[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function c(p,m){if(m<65537&&(p.subarray&&o||!p.subarray&&s))return String.fromCharCode.apply(null,a.shrinkBuf(p,m));for(var f="",g=0;g<m;g++)f+=String.fromCharCode(p[g]);return f}u[254]=u[254]=1,n.string2buf=function(p){var m,f,g,h,w,y=p.length,b=0;for(h=0;h<y;h++)(64512&(f=p.charCodeAt(h)))==55296&&h+1<y&&(64512&(g=p.charCodeAt(h+1)))==56320&&(f=65536+(f-55296<<10)+(g-56320),h++),b+=f<128?1:f<2048?2:f<65536?3:4;for(m=new a.Buf8(b),h=w=0;w<b;h++)(64512&(f=p.charCodeAt(h)))==55296&&h+1<y&&(64512&(g=p.charCodeAt(h+1)))==56320&&(f=65536+(f-55296<<10)+(g-56320),h++),f<128?m[w++]=f:(f<2048?m[w++]=192|f>>>6:(f<65536?m[w++]=224|f>>>12:(m[w++]=240|f>>>18,m[w++]=128|f>>>12&63),m[w++]=128|f>>>6&63),m[w++]=128|63&f);return m},n.buf2binstring=function(p){return c(p,p.length)},n.binstring2buf=function(p){for(var m=new a.Buf8(p.length),f=0,g=m.length;f<g;f++)m[f]=p.charCodeAt(f);return m},n.buf2string=function(p,m){var f,g,h,w,y=m||p.length,b=new Array(2*y);for(f=g=0;f<y;)if((h=p[f++])<128)b[g++]=h;else if(4<(w=u[h]))b[g++]=65533,f+=w-1;else{for(h&=w===2?31:w===3?15:7;1<w&&f<y;)h=h<<6|63&p[f++],w--;1<w?b[g++]=65533:h<65536?b[g++]=h:(h-=65536,b[g++]=55296|h>>10&1023,b[g++]=56320|1023&h)}return c(b,g)},n.utf8border=function(p,m){var f;for((m=m||p.length)>p.length&&(m=p.length),f=m-1;0<=f&&(192&p[f])==128;)f--;return f<0||f===0?m:f+u[p[f]]>m?f:m}},{"./common":41}],43:[function(r,i,n){i.exports=function(a,s,o,u){for(var d=65535&a|0,c=a>>>16&65535|0,p=0;o!==0;){for(o-=p=2e3<o?2e3:o;c=c+(d=d+s[u++]|0)|0,--p;);d%=65521,c%=65521}return d|c<<16|0}},{}],44:[function(r,i,n){i.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(r,i,n){var a=function(){for(var s,o=[],u=0;u<256;u++){s=u;for(var d=0;d<8;d++)s=1&s?3988292384^s>>>1:s>>>1;o[u]=s}return o}();i.exports=function(s,o,u,d){var c=a,p=d+u;s^=-1;for(var m=d;m<p;m++)s=s>>>8^c[255&(s^o[m])];return-1^s}},{}],46:[function(r,i,n){var a,s=r("../utils/common"),o=r("./trees"),u=r("./adler32"),d=r("./crc32"),c=r("./messages"),p=0,m=4,f=0,g=-2,h=-1,w=4,y=2,b=8,k=9,S=286,I=30,A=19,C=2*S+1,M=15,D=3,W=258,J=W+D+1,z=42,F=113,v=1,V=2,ee=3,q=4;function le(x,Q){return x.msg=c[Q],Q}function G(x){return(x<<1)-(4<x?9:0)}function ue(x){for(var Q=x.length;0<=--Q;)x[Q]=0}function B(x){var Q=x.state,K=Q.pending;K>x.avail_out&&(K=x.avail_out),K!==0&&(s.arraySet(x.output,Q.pending_buf,Q.pending_out,K,x.next_out),x.next_out+=K,Q.pending_out+=K,x.total_out+=K,x.avail_out-=K,Q.pending-=K,Q.pending===0&&(Q.pending_out=0))}function N(x,Q){o._tr_flush_block(x,0<=x.block_start?x.block_start:-1,x.strstart-x.block_start,Q),x.block_start=x.strstart,B(x.strm)}function ie(x,Q){x.pending_buf[x.pending++]=Q}function P(x,Q){x.pending_buf[x.pending++]=Q>>>8&255,x.pending_buf[x.pending++]=255&Q}function Y(x,Q){var K,R,O=x.max_chain_length,L=x.strstart,te=x.prev_length,re=x.nice_match,H=x.strstart>x.w_size-J?x.strstart-(x.w_size-J):0,oe=x.window,ce=x.w_mask,se=x.prev,pe=x.strstart+W,Oe=oe[L+te-1],Te=oe[L+te];x.prev_length>=x.good_match&&(O>>=2),re>x.lookahead&&(re=x.lookahead);do if(oe[(K=Q)+te]===Te&&oe[K+te-1]===Oe&&oe[K]===oe[L]&&oe[++K]===oe[L+1]){L+=2,K++;do;while(oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&oe[++L]===oe[++K]&&L<pe);if(R=W-(pe-L),L=pe-W,te<R){if(x.match_start=Q,re<=(te=R))break;Oe=oe[L+te-1],Te=oe[L+te]}}while((Q=se[Q&ce])>H&&--O!=0);return te<=x.lookahead?te:x.lookahead}function Ie(x){var Q,K,R,O,L,te,re,H,oe,ce,se=x.w_size;do{if(O=x.window_size-x.lookahead-x.strstart,x.strstart>=se+(se-J)){for(s.arraySet(x.window,x.window,se,se,0),x.match_start-=se,x.strstart-=se,x.block_start-=se,Q=K=x.hash_size;R=x.head[--Q],x.head[Q]=se<=R?R-se:0,--K;);for(Q=K=se;R=x.prev[--Q],x.prev[Q]=se<=R?R-se:0,--K;);O+=se}if(x.strm.avail_in===0)break;if(te=x.strm,re=x.window,H=x.strstart+x.lookahead,oe=O,ce=void 0,ce=te.avail_in,oe<ce&&(ce=oe),K=ce===0?0:(te.avail_in-=ce,s.arraySet(re,te.input,te.next_in,ce,H),te.state.wrap===1?te.adler=u(te.adler,re,ce,H):te.state.wrap===2&&(te.adler=d(te.adler,re,ce,H)),te.next_in+=ce,te.total_in+=ce,ce),x.lookahead+=K,x.lookahead+x.insert>=D)for(L=x.strstart-x.insert,x.ins_h=x.window[L],x.ins_h=(x.ins_h<<x.hash_shift^x.window[L+1])&x.hash_mask;x.insert&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[L+D-1])&x.hash_mask,x.prev[L&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=L,L++,x.insert--,!(x.lookahead+x.insert<D)););}while(x.lookahead<J&&x.strm.avail_in!==0)}function Be(x,Q){for(var K,R;;){if(x.lookahead<J){if(Ie(x),x.lookahead<J&&Q===p)return v;if(x.lookahead===0)break}if(K=0,x.lookahead>=D&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+D-1])&x.hash_mask,K=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),K!==0&&x.strstart-K<=x.w_size-J&&(x.match_length=Y(x,K)),x.match_length>=D)if(R=o._tr_tally(x,x.strstart-x.match_start,x.match_length-D),x.lookahead-=x.match_length,x.match_length<=x.max_lazy_match&&x.lookahead>=D){for(x.match_length--;x.strstart++,x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+D-1])&x.hash_mask,K=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart,--x.match_length!=0;);x.strstart++}else x.strstart+=x.match_length,x.match_length=0,x.ins_h=x.window[x.strstart],x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+1])&x.hash_mask;else R=o._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++;if(R&&(N(x,!1),x.strm.avail_out===0))return v}return x.insert=x.strstart<D-1?x.strstart:D-1,Q===m?(N(x,!0),x.strm.avail_out===0?ee:q):x.last_lit&&(N(x,!1),x.strm.avail_out===0)?v:V}function ye(x,Q){for(var K,R,O;;){if(x.lookahead<J){if(Ie(x),x.lookahead<J&&Q===p)return v;if(x.lookahead===0)break}if(K=0,x.lookahead>=D&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+D-1])&x.hash_mask,K=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),x.prev_length=x.match_length,x.prev_match=x.match_start,x.match_length=D-1,K!==0&&x.prev_length<x.max_lazy_match&&x.strstart-K<=x.w_size-J&&(x.match_length=Y(x,K),x.match_length<=5&&(x.strategy===1||x.match_length===D&&4096<x.strstart-x.match_start)&&(x.match_length=D-1)),x.prev_length>=D&&x.match_length<=x.prev_length){for(O=x.strstart+x.lookahead-D,R=o._tr_tally(x,x.strstart-1-x.prev_match,x.prev_length-D),x.lookahead-=x.prev_length-1,x.prev_length-=2;++x.strstart<=O&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+D-1])&x.hash_mask,K=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),--x.prev_length!=0;);if(x.match_available=0,x.match_length=D-1,x.strstart++,R&&(N(x,!1),x.strm.avail_out===0))return v}else if(x.match_available){if((R=o._tr_tally(x,0,x.window[x.strstart-1]))&&N(x,!1),x.strstart++,x.lookahead--,x.strm.avail_out===0)return v}else x.match_available=1,x.strstart++,x.lookahead--}return x.match_available&&(R=o._tr_tally(x,0,x.window[x.strstart-1]),x.match_available=0),x.insert=x.strstart<D-1?x.strstart:D-1,Q===m?(N(x,!0),x.strm.avail_out===0?ee:q):x.last_lit&&(N(x,!1),x.strm.avail_out===0)?v:V}function be(x,Q,K,R,O){this.good_length=x,this.max_lazy=Q,this.nice_length=K,this.max_chain=R,this.func=O}function ke(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=b,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new s.Buf16(2*C),this.dyn_dtree=new s.Buf16(2*(2*I+1)),this.bl_tree=new s.Buf16(2*(2*A+1)),ue(this.dyn_ltree),ue(this.dyn_dtree),ue(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new s.Buf16(M+1),this.heap=new s.Buf16(2*S+1),ue(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new s.Buf16(2*S+1),ue(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Pe(x){var Q;return x&&x.state?(x.total_in=x.total_out=0,x.data_type=y,(Q=x.state).pending=0,Q.pending_out=0,Q.wrap<0&&(Q.wrap=-Q.wrap),Q.status=Q.wrap?z:F,x.adler=Q.wrap===2?0:1,Q.last_flush=p,o._tr_init(Q),f):le(x,g)}function je(x){var Q=Pe(x);return Q===f&&function(K){K.window_size=2*K.w_size,ue(K.head),K.max_lazy_match=a[K.level].max_lazy,K.good_match=a[K.level].good_length,K.nice_match=a[K.level].nice_length,K.max_chain_length=a[K.level].max_chain,K.strstart=0,K.block_start=0,K.lookahead=0,K.insert=0,K.match_length=K.prev_length=D-1,K.match_available=0,K.ins_h=0}(x.state),Q}function Ve(x,Q,K,R,O,L){if(!x)return g;var te=1;if(Q===h&&(Q=6),R<0?(te=0,R=-R):15<R&&(te=2,R-=16),O<1||k<O||K!==b||R<8||15<R||Q<0||9<Q||L<0||w<L)return le(x,g);R===8&&(R=9);var re=new ke;return(x.state=re).strm=x,re.wrap=te,re.gzhead=null,re.w_bits=R,re.w_size=1<<re.w_bits,re.w_mask=re.w_size-1,re.hash_bits=O+7,re.hash_size=1<<re.hash_bits,re.hash_mask=re.hash_size-1,re.hash_shift=~~((re.hash_bits+D-1)/D),re.window=new s.Buf8(2*re.w_size),re.head=new s.Buf16(re.hash_size),re.prev=new s.Buf16(re.w_size),re.lit_bufsize=1<<O+6,re.pending_buf_size=4*re.lit_bufsize,re.pending_buf=new s.Buf8(re.pending_buf_size),re.d_buf=1*re.lit_bufsize,re.l_buf=3*re.lit_bufsize,re.level=Q,re.strategy=L,re.method=K,je(x)}a=[new be(0,0,0,0,function(x,Q){var K=65535;for(K>x.pending_buf_size-5&&(K=x.pending_buf_size-5);;){if(x.lookahead<=1){if(Ie(x),x.lookahead===0&&Q===p)return v;if(x.lookahead===0)break}x.strstart+=x.lookahead,x.lookahead=0;var R=x.block_start+K;if((x.strstart===0||x.strstart>=R)&&(x.lookahead=x.strstart-R,x.strstart=R,N(x,!1),x.strm.avail_out===0)||x.strstart-x.block_start>=x.w_size-J&&(N(x,!1),x.strm.avail_out===0))return v}return x.insert=0,Q===m?(N(x,!0),x.strm.avail_out===0?ee:q):(x.strstart>x.block_start&&(N(x,!1),x.strm.avail_out),v)}),new be(4,4,8,4,Be),new be(4,5,16,8,Be),new be(4,6,32,32,Be),new be(4,4,16,16,ye),new be(8,16,32,32,ye),new be(8,16,128,128,ye),new be(8,32,128,256,ye),new be(32,128,258,1024,ye),new be(32,258,258,4096,ye)],n.deflateInit=function(x,Q){return Ve(x,Q,b,15,8,0)},n.deflateInit2=Ve,n.deflateReset=je,n.deflateResetKeep=Pe,n.deflateSetHeader=function(x,Q){return x&&x.state?x.state.wrap!==2?g:(x.state.gzhead=Q,f):g},n.deflate=function(x,Q){var K,R,O,L;if(!x||!x.state||5<Q||Q<0)return x?le(x,g):g;if(R=x.state,!x.output||!x.input&&x.avail_in!==0||R.status===666&&Q!==m)return le(x,x.avail_out===0?-5:g);if(R.strm=x,K=R.last_flush,R.last_flush=Q,R.status===z)if(R.wrap===2)x.adler=0,ie(R,31),ie(R,139),ie(R,8),R.gzhead?(ie(R,(R.gzhead.text?1:0)+(R.gzhead.hcrc?2:0)+(R.gzhead.extra?4:0)+(R.gzhead.name?8:0)+(R.gzhead.comment?16:0)),ie(R,255&R.gzhead.time),ie(R,R.gzhead.time>>8&255),ie(R,R.gzhead.time>>16&255),ie(R,R.gzhead.time>>24&255),ie(R,R.level===9?2:2<=R.strategy||R.level<2?4:0),ie(R,255&R.gzhead.os),R.gzhead.extra&&R.gzhead.extra.length&&(ie(R,255&R.gzhead.extra.length),ie(R,R.gzhead.extra.length>>8&255)),R.gzhead.hcrc&&(x.adler=d(x.adler,R.pending_buf,R.pending,0)),R.gzindex=0,R.status=69):(ie(R,0),ie(R,0),ie(R,0),ie(R,0),ie(R,0),ie(R,R.level===9?2:2<=R.strategy||R.level<2?4:0),ie(R,3),R.status=F);else{var te=b+(R.w_bits-8<<4)<<8;te|=(2<=R.strategy||R.level<2?0:R.level<6?1:R.level===6?2:3)<<6,R.strstart!==0&&(te|=32),te+=31-te%31,R.status=F,P(R,te),R.strstart!==0&&(P(R,x.adler>>>16),P(R,65535&x.adler)),x.adler=1}if(R.status===69)if(R.gzhead.extra){for(O=R.pending;R.gzindex<(65535&R.gzhead.extra.length)&&(R.pending!==R.pending_buf_size||(R.gzhead.hcrc&&R.pending>O&&(x.adler=d(x.adler,R.pending_buf,R.pending-O,O)),B(x),O=R.pending,R.pending!==R.pending_buf_size));)ie(R,255&R.gzhead.extra[R.gzindex]),R.gzindex++;R.gzhead.hcrc&&R.pending>O&&(x.adler=d(x.adler,R.pending_buf,R.pending-O,O)),R.gzindex===R.gzhead.extra.length&&(R.gzindex=0,R.status=73)}else R.status=73;if(R.status===73)if(R.gzhead.name){O=R.pending;do{if(R.pending===R.pending_buf_size&&(R.gzhead.hcrc&&R.pending>O&&(x.adler=d(x.adler,R.pending_buf,R.pending-O,O)),B(x),O=R.pending,R.pending===R.pending_buf_size)){L=1;break}L=R.gzindex<R.gzhead.name.length?255&R.gzhead.name.charCodeAt(R.gzindex++):0,ie(R,L)}while(L!==0);R.gzhead.hcrc&&R.pending>O&&(x.adler=d(x.adler,R.pending_buf,R.pending-O,O)),L===0&&(R.gzindex=0,R.status=91)}else R.status=91;if(R.status===91)if(R.gzhead.comment){O=R.pending;do{if(R.pending===R.pending_buf_size&&(R.gzhead.hcrc&&R.pending>O&&(x.adler=d(x.adler,R.pending_buf,R.pending-O,O)),B(x),O=R.pending,R.pending===R.pending_buf_size)){L=1;break}L=R.gzindex<R.gzhead.comment.length?255&R.gzhead.comment.charCodeAt(R.gzindex++):0,ie(R,L)}while(L!==0);R.gzhead.hcrc&&R.pending>O&&(x.adler=d(x.adler,R.pending_buf,R.pending-O,O)),L===0&&(R.status=103)}else R.status=103;if(R.status===103&&(R.gzhead.hcrc?(R.pending+2>R.pending_buf_size&&B(x),R.pending+2<=R.pending_buf_size&&(ie(R,255&x.adler),ie(R,x.adler>>8&255),x.adler=0,R.status=F)):R.status=F),R.pending!==0){if(B(x),x.avail_out===0)return R.last_flush=-1,f}else if(x.avail_in===0&&G(Q)<=G(K)&&Q!==m)return le(x,-5);if(R.status===666&&x.avail_in!==0)return le(x,-5);if(x.avail_in!==0||R.lookahead!==0||Q!==p&&R.status!==666){var re=R.strategy===2?function(H,oe){for(var ce;;){if(H.lookahead===0&&(Ie(H),H.lookahead===0)){if(oe===p)return v;break}if(H.match_length=0,ce=o._tr_tally(H,0,H.window[H.strstart]),H.lookahead--,H.strstart++,ce&&(N(H,!1),H.strm.avail_out===0))return v}return H.insert=0,oe===m?(N(H,!0),H.strm.avail_out===0?ee:q):H.last_lit&&(N(H,!1),H.strm.avail_out===0)?v:V}(R,Q):R.strategy===3?function(H,oe){for(var ce,se,pe,Oe,Te=H.window;;){if(H.lookahead<=W){if(Ie(H),H.lookahead<=W&&oe===p)return v;if(H.lookahead===0)break}if(H.match_length=0,H.lookahead>=D&&0<H.strstart&&(se=Te[pe=H.strstart-1])===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]){Oe=H.strstart+W;do;while(se===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]&&se===Te[++pe]&&pe<Oe);H.match_length=W-(Oe-pe),H.match_length>H.lookahead&&(H.match_length=H.lookahead)}if(H.match_length>=D?(ce=o._tr_tally(H,1,H.match_length-D),H.lookahead-=H.match_length,H.strstart+=H.match_length,H.match_length=0):(ce=o._tr_tally(H,0,H.window[H.strstart]),H.lookahead--,H.strstart++),ce&&(N(H,!1),H.strm.avail_out===0))return v}return H.insert=0,oe===m?(N(H,!0),H.strm.avail_out===0?ee:q):H.last_lit&&(N(H,!1),H.strm.avail_out===0)?v:V}(R,Q):a[R.level].func(R,Q);if(re!==ee&&re!==q||(R.status=666),re===v||re===ee)return x.avail_out===0&&(R.last_flush=-1),f;if(re===V&&(Q===1?o._tr_align(R):Q!==5&&(o._tr_stored_block(R,0,0,!1),Q===3&&(ue(R.head),R.lookahead===0&&(R.strstart=0,R.block_start=0,R.insert=0))),B(x),x.avail_out===0))return R.last_flush=-1,f}return Q!==m?f:R.wrap<=0?1:(R.wrap===2?(ie(R,255&x.adler),ie(R,x.adler>>8&255),ie(R,x.adler>>16&255),ie(R,x.adler>>24&255),ie(R,255&x.total_in),ie(R,x.total_in>>8&255),ie(R,x.total_in>>16&255),ie(R,x.total_in>>24&255)):(P(R,x.adler>>>16),P(R,65535&x.adler)),B(x),0<R.wrap&&(R.wrap=-R.wrap),R.pending!==0?f:1)},n.deflateEnd=function(x){var Q;return x&&x.state?(Q=x.state.status)!==z&&Q!==69&&Q!==73&&Q!==91&&Q!==103&&Q!==F&&Q!==666?le(x,g):(x.state=null,Q===F?le(x,-3):f):g},n.deflateSetDictionary=function(x,Q){var K,R,O,L,te,re,H,oe,ce=Q.length;if(!x||!x.state||(L=(K=x.state).wrap)===2||L===1&&K.status!==z||K.lookahead)return g;for(L===1&&(x.adler=u(x.adler,Q,ce,0)),K.wrap=0,ce>=K.w_size&&(L===0&&(ue(K.head),K.strstart=0,K.block_start=0,K.insert=0),oe=new s.Buf8(K.w_size),s.arraySet(oe,Q,ce-K.w_size,K.w_size,0),Q=oe,ce=K.w_size),te=x.avail_in,re=x.next_in,H=x.input,x.avail_in=ce,x.next_in=0,x.input=Q,Ie(K);K.lookahead>=D;){for(R=K.strstart,O=K.lookahead-(D-1);K.ins_h=(K.ins_h<<K.hash_shift^K.window[R+D-1])&K.hash_mask,K.prev[R&K.w_mask]=K.head[K.ins_h],K.head[K.ins_h]=R,R++,--O;);K.strstart=R,K.lookahead=D-1,Ie(K)}return K.strstart+=K.lookahead,K.block_start=K.strstart,K.insert=K.lookahead,K.lookahead=0,K.match_length=K.prev_length=D-1,K.match_available=0,x.next_in=re,x.input=H,x.avail_in=te,K.wrap=L,f},n.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(r,i,n){i.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(r,i,n){i.exports=function(a,s){var o,u,d,c,p,m,f,g,h,w,y,b,k,S,I,A,C,M,D,W,J,z,F,v,V;o=a.state,u=a.next_in,v=a.input,d=u+(a.avail_in-5),c=a.next_out,V=a.output,p=c-(s-a.avail_out),m=c+(a.avail_out-257),f=o.dmax,g=o.wsize,h=o.whave,w=o.wnext,y=o.window,b=o.hold,k=o.bits,S=o.lencode,I=o.distcode,A=(1<<o.lenbits)-1,C=(1<<o.distbits)-1;e:do{k<15&&(b+=v[u++]<<k,k+=8,b+=v[u++]<<k,k+=8),M=S[b&A];t:for(;;){if(b>>>=D=M>>>24,k-=D,(D=M>>>16&255)===0)V[c++]=65535&M;else{if(!(16&D)){if((64&D)==0){M=S[(65535&M)+(b&(1<<D)-1)];continue t}if(32&D){o.mode=12;break e}a.msg="invalid literal/length code",o.mode=30;break e}W=65535&M,(D&=15)&&(k<D&&(b+=v[u++]<<k,k+=8),W+=b&(1<<D)-1,b>>>=D,k-=D),k<15&&(b+=v[u++]<<k,k+=8,b+=v[u++]<<k,k+=8),M=I[b&C];r:for(;;){if(b>>>=D=M>>>24,k-=D,!(16&(D=M>>>16&255))){if((64&D)==0){M=I[(65535&M)+(b&(1<<D)-1)];continue r}a.msg="invalid distance code",o.mode=30;break e}if(J=65535&M,k<(D&=15)&&(b+=v[u++]<<k,(k+=8)<D&&(b+=v[u++]<<k,k+=8)),f<(J+=b&(1<<D)-1)){a.msg="invalid distance too far back",o.mode=30;break e}if(b>>>=D,k-=D,(D=c-p)<J){if(h<(D=J-D)&&o.sane){a.msg="invalid distance too far back",o.mode=30;break e}if(F=y,(z=0)===w){if(z+=g-D,D<W){for(W-=D;V[c++]=y[z++],--D;);z=c-J,F=V}}else if(w<D){if(z+=g+w-D,(D-=w)<W){for(W-=D;V[c++]=y[z++],--D;);if(z=0,w<W){for(W-=D=w;V[c++]=y[z++],--D;);z=c-J,F=V}}}else if(z+=w-D,D<W){for(W-=D;V[c++]=y[z++],--D;);z=c-J,F=V}for(;2<W;)V[c++]=F[z++],V[c++]=F[z++],V[c++]=F[z++],W-=3;W&&(V[c++]=F[z++],1<W&&(V[c++]=F[z++]))}else{for(z=c-J;V[c++]=V[z++],V[c++]=V[z++],V[c++]=V[z++],2<(W-=3););W&&(V[c++]=V[z++],1<W&&(V[c++]=V[z++]))}break}}break}}while(u<d&&c<m);u-=W=k>>3,b&=(1<<(k-=W<<3))-1,a.next_in=u,a.next_out=c,a.avail_in=u<d?d-u+5:5-(u-d),a.avail_out=c<m?m-c+257:257-(c-m),o.hold=b,o.bits=k}},{}],49:[function(r,i,n){var a=r("../utils/common"),s=r("./adler32"),o=r("./crc32"),u=r("./inffast"),d=r("./inftrees"),c=1,p=2,m=0,f=-2,g=1,h=852,w=592;function y(z){return(z>>>24&255)+(z>>>8&65280)+((65280&z)<<8)+((255&z)<<24)}function b(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new a.Buf16(320),this.work=new a.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function k(z){var F;return z&&z.state?(F=z.state,z.total_in=z.total_out=F.total=0,z.msg="",F.wrap&&(z.adler=1&F.wrap),F.mode=g,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new a.Buf32(h),F.distcode=F.distdyn=new a.Buf32(w),F.sane=1,F.back=-1,m):f}function S(z){var F;return z&&z.state?((F=z.state).wsize=0,F.whave=0,F.wnext=0,k(z)):f}function I(z,F){var v,V;return z&&z.state?(V=z.state,F<0?(v=0,F=-F):(v=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?f:(V.window!==null&&V.wbits!==F&&(V.window=null),V.wrap=v,V.wbits=F,S(z))):f}function A(z,F){var v,V;return z?(V=new b,(z.state=V).window=null,(v=I(z,F))!==m&&(z.state=null),v):f}var C,M,D=!0;function W(z){if(D){var F;for(C=new a.Buf32(512),M=new a.Buf32(32),F=0;F<144;)z.lens[F++]=8;for(;F<256;)z.lens[F++]=9;for(;F<280;)z.lens[F++]=7;for(;F<288;)z.lens[F++]=8;for(d(c,z.lens,0,288,C,0,z.work,{bits:9}),F=0;F<32;)z.lens[F++]=5;d(p,z.lens,0,32,M,0,z.work,{bits:5}),D=!1}z.lencode=C,z.lenbits=9,z.distcode=M,z.distbits=5}function J(z,F,v,V){var ee,q=z.state;return q.window===null&&(q.wsize=1<<q.wbits,q.wnext=0,q.whave=0,q.window=new a.Buf8(q.wsize)),V>=q.wsize?(a.arraySet(q.window,F,v-q.wsize,q.wsize,0),q.wnext=0,q.whave=q.wsize):(V<(ee=q.wsize-q.wnext)&&(ee=V),a.arraySet(q.window,F,v-V,ee,q.wnext),(V-=ee)?(a.arraySet(q.window,F,v-V,V,0),q.wnext=V,q.whave=q.wsize):(q.wnext+=ee,q.wnext===q.wsize&&(q.wnext=0),q.whave<q.wsize&&(q.whave+=ee))),0}n.inflateReset=S,n.inflateReset2=I,n.inflateResetKeep=k,n.inflateInit=function(z){return A(z,15)},n.inflateInit2=A,n.inflate=function(z,F){var v,V,ee,q,le,G,ue,B,N,ie,P,Y,Ie,Be,ye,be,ke,Pe,je,Ve,x,Q,K,R,O=0,L=new a.Buf8(4),te=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!z||!z.state||!z.output||!z.input&&z.avail_in!==0)return f;(v=z.state).mode===12&&(v.mode=13),le=z.next_out,ee=z.output,ue=z.avail_out,q=z.next_in,V=z.input,G=z.avail_in,B=v.hold,N=v.bits,ie=G,P=ue,Q=m;e:for(;;)switch(v.mode){case g:if(v.wrap===0){v.mode=13;break}for(;N<16;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(2&v.wrap&&B===35615){L[v.check=0]=255&B,L[1]=B>>>8&255,v.check=o(v.check,L,2,0),N=B=0,v.mode=2;break}if(v.flags=0,v.head&&(v.head.done=!1),!(1&v.wrap)||(((255&B)<<8)+(B>>8))%31){z.msg="incorrect header check",v.mode=30;break}if((15&B)!=8){z.msg="unknown compression method",v.mode=30;break}if(N-=4,x=8+(15&(B>>>=4)),v.wbits===0)v.wbits=x;else if(x>v.wbits){z.msg="invalid window size",v.mode=30;break}v.dmax=1<<x,z.adler=v.check=1,v.mode=512&B?10:12,N=B=0;break;case 2:for(;N<16;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(v.flags=B,(255&v.flags)!=8){z.msg="unknown compression method",v.mode=30;break}if(57344&v.flags){z.msg="unknown header flags set",v.mode=30;break}v.head&&(v.head.text=B>>8&1),512&v.flags&&(L[0]=255&B,L[1]=B>>>8&255,v.check=o(v.check,L,2,0)),N=B=0,v.mode=3;case 3:for(;N<32;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}v.head&&(v.head.time=B),512&v.flags&&(L[0]=255&B,L[1]=B>>>8&255,L[2]=B>>>16&255,L[3]=B>>>24&255,v.check=o(v.check,L,4,0)),N=B=0,v.mode=4;case 4:for(;N<16;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}v.head&&(v.head.xflags=255&B,v.head.os=B>>8),512&v.flags&&(L[0]=255&B,L[1]=B>>>8&255,v.check=o(v.check,L,2,0)),N=B=0,v.mode=5;case 5:if(1024&v.flags){for(;N<16;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}v.length=B,v.head&&(v.head.extra_len=B),512&v.flags&&(L[0]=255&B,L[1]=B>>>8&255,v.check=o(v.check,L,2,0)),N=B=0}else v.head&&(v.head.extra=null);v.mode=6;case 6:if(1024&v.flags&&(G<(Y=v.length)&&(Y=G),Y&&(v.head&&(x=v.head.extra_len-v.length,v.head.extra||(v.head.extra=new Array(v.head.extra_len)),a.arraySet(v.head.extra,V,q,Y,x)),512&v.flags&&(v.check=o(v.check,V,Y,q)),G-=Y,q+=Y,v.length-=Y),v.length))break e;v.length=0,v.mode=7;case 7:if(2048&v.flags){if(G===0)break e;for(Y=0;x=V[q+Y++],v.head&&x&&v.length<65536&&(v.head.name+=String.fromCharCode(x)),x&&Y<G;);if(512&v.flags&&(v.check=o(v.check,V,Y,q)),G-=Y,q+=Y,x)break e}else v.head&&(v.head.name=null);v.length=0,v.mode=8;case 8:if(4096&v.flags){if(G===0)break e;for(Y=0;x=V[q+Y++],v.head&&x&&v.length<65536&&(v.head.comment+=String.fromCharCode(x)),x&&Y<G;);if(512&v.flags&&(v.check=o(v.check,V,Y,q)),G-=Y,q+=Y,x)break e}else v.head&&(v.head.comment=null);v.mode=9;case 9:if(512&v.flags){for(;N<16;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(B!==(65535&v.check)){z.msg="header crc mismatch",v.mode=30;break}N=B=0}v.head&&(v.head.hcrc=v.flags>>9&1,v.head.done=!0),z.adler=v.check=0,v.mode=12;break;case 10:for(;N<32;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}z.adler=v.check=y(B),N=B=0,v.mode=11;case 11:if(v.havedict===0)return z.next_out=le,z.avail_out=ue,z.next_in=q,z.avail_in=G,v.hold=B,v.bits=N,2;z.adler=v.check=1,v.mode=12;case 12:if(F===5||F===6)break e;case 13:if(v.last){B>>>=7&N,N-=7&N,v.mode=27;break}for(;N<3;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}switch(v.last=1&B,N-=1,3&(B>>>=1)){case 0:v.mode=14;break;case 1:if(W(v),v.mode=20,F!==6)break;B>>>=2,N-=2;break e;case 2:v.mode=17;break;case 3:z.msg="invalid block type",v.mode=30}B>>>=2,N-=2;break;case 14:for(B>>>=7&N,N-=7&N;N<32;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if((65535&B)!=(B>>>16^65535)){z.msg="invalid stored block lengths",v.mode=30;break}if(v.length=65535&B,N=B=0,v.mode=15,F===6)break e;case 15:v.mode=16;case 16:if(Y=v.length){if(G<Y&&(Y=G),ue<Y&&(Y=ue),Y===0)break e;a.arraySet(ee,V,q,Y,le),G-=Y,q+=Y,ue-=Y,le+=Y,v.length-=Y;break}v.mode=12;break;case 17:for(;N<14;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(v.nlen=257+(31&B),B>>>=5,N-=5,v.ndist=1+(31&B),B>>>=5,N-=5,v.ncode=4+(15&B),B>>>=4,N-=4,286<v.nlen||30<v.ndist){z.msg="too many length or distance symbols",v.mode=30;break}v.have=0,v.mode=18;case 18:for(;v.have<v.ncode;){for(;N<3;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}v.lens[te[v.have++]]=7&B,B>>>=3,N-=3}for(;v.have<19;)v.lens[te[v.have++]]=0;if(v.lencode=v.lendyn,v.lenbits=7,K={bits:v.lenbits},Q=d(0,v.lens,0,19,v.lencode,0,v.work,K),v.lenbits=K.bits,Q){z.msg="invalid code lengths set",v.mode=30;break}v.have=0,v.mode=19;case 19:for(;v.have<v.nlen+v.ndist;){for(;be=(O=v.lencode[B&(1<<v.lenbits)-1])>>>16&255,ke=65535&O,!((ye=O>>>24)<=N);){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(ke<16)B>>>=ye,N-=ye,v.lens[v.have++]=ke;else{if(ke===16){for(R=ye+2;N<R;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(B>>>=ye,N-=ye,v.have===0){z.msg="invalid bit length repeat",v.mode=30;break}x=v.lens[v.have-1],Y=3+(3&B),B>>>=2,N-=2}else if(ke===17){for(R=ye+3;N<R;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}N-=ye,x=0,Y=3+(7&(B>>>=ye)),B>>>=3,N-=3}else{for(R=ye+7;N<R;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}N-=ye,x=0,Y=11+(127&(B>>>=ye)),B>>>=7,N-=7}if(v.have+Y>v.nlen+v.ndist){z.msg="invalid bit length repeat",v.mode=30;break}for(;Y--;)v.lens[v.have++]=x}}if(v.mode===30)break;if(v.lens[256]===0){z.msg="invalid code -- missing end-of-block",v.mode=30;break}if(v.lenbits=9,K={bits:v.lenbits},Q=d(c,v.lens,0,v.nlen,v.lencode,0,v.work,K),v.lenbits=K.bits,Q){z.msg="invalid literal/lengths set",v.mode=30;break}if(v.distbits=6,v.distcode=v.distdyn,K={bits:v.distbits},Q=d(p,v.lens,v.nlen,v.ndist,v.distcode,0,v.work,K),v.distbits=K.bits,Q){z.msg="invalid distances set",v.mode=30;break}if(v.mode=20,F===6)break e;case 20:v.mode=21;case 21:if(6<=G&&258<=ue){z.next_out=le,z.avail_out=ue,z.next_in=q,z.avail_in=G,v.hold=B,v.bits=N,u(z,P),le=z.next_out,ee=z.output,ue=z.avail_out,q=z.next_in,V=z.input,G=z.avail_in,B=v.hold,N=v.bits,v.mode===12&&(v.back=-1);break}for(v.back=0;be=(O=v.lencode[B&(1<<v.lenbits)-1])>>>16&255,ke=65535&O,!((ye=O>>>24)<=N);){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(be&&(240&be)==0){for(Pe=ye,je=be,Ve=ke;be=(O=v.lencode[Ve+((B&(1<<Pe+je)-1)>>Pe)])>>>16&255,ke=65535&O,!(Pe+(ye=O>>>24)<=N);){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}B>>>=Pe,N-=Pe,v.back+=Pe}if(B>>>=ye,N-=ye,v.back+=ye,v.length=ke,be===0){v.mode=26;break}if(32&be){v.back=-1,v.mode=12;break}if(64&be){z.msg="invalid literal/length code",v.mode=30;break}v.extra=15&be,v.mode=22;case 22:if(v.extra){for(R=v.extra;N<R;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}v.length+=B&(1<<v.extra)-1,B>>>=v.extra,N-=v.extra,v.back+=v.extra}v.was=v.length,v.mode=23;case 23:for(;be=(O=v.distcode[B&(1<<v.distbits)-1])>>>16&255,ke=65535&O,!((ye=O>>>24)<=N);){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if((240&be)==0){for(Pe=ye,je=be,Ve=ke;be=(O=v.distcode[Ve+((B&(1<<Pe+je)-1)>>Pe)])>>>16&255,ke=65535&O,!(Pe+(ye=O>>>24)<=N);){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}B>>>=Pe,N-=Pe,v.back+=Pe}if(B>>>=ye,N-=ye,v.back+=ye,64&be){z.msg="invalid distance code",v.mode=30;break}v.offset=ke,v.extra=15&be,v.mode=24;case 24:if(v.extra){for(R=v.extra;N<R;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}v.offset+=B&(1<<v.extra)-1,B>>>=v.extra,N-=v.extra,v.back+=v.extra}if(v.offset>v.dmax){z.msg="invalid distance too far back",v.mode=30;break}v.mode=25;case 25:if(ue===0)break e;if(Y=P-ue,v.offset>Y){if((Y=v.offset-Y)>v.whave&&v.sane){z.msg="invalid distance too far back",v.mode=30;break}Ie=Y>v.wnext?(Y-=v.wnext,v.wsize-Y):v.wnext-Y,Y>v.length&&(Y=v.length),Be=v.window}else Be=ee,Ie=le-v.offset,Y=v.length;for(ue<Y&&(Y=ue),ue-=Y,v.length-=Y;ee[le++]=Be[Ie++],--Y;);v.length===0&&(v.mode=21);break;case 26:if(ue===0)break e;ee[le++]=v.length,ue--,v.mode=21;break;case 27:if(v.wrap){for(;N<32;){if(G===0)break e;G--,B|=V[q++]<<N,N+=8}if(P-=ue,z.total_out+=P,v.total+=P,P&&(z.adler=v.check=v.flags?o(v.check,ee,P,le-P):s(v.check,ee,P,le-P)),P=ue,(v.flags?B:y(B))!==v.check){z.msg="incorrect data check",v.mode=30;break}N=B=0}v.mode=28;case 28:if(v.wrap&&v.flags){for(;N<32;){if(G===0)break e;G--,B+=V[q++]<<N,N+=8}if(B!==(4294967295&v.total)){z.msg="incorrect length check",v.mode=30;break}N=B=0}v.mode=29;case 29:Q=1;break e;case 30:Q=-3;break e;case 31:return-4;case 32:default:return f}return z.next_out=le,z.avail_out=ue,z.next_in=q,z.avail_in=G,v.hold=B,v.bits=N,(v.wsize||P!==z.avail_out&&v.mode<30&&(v.mode<27||F!==4))&&J(z,z.output,z.next_out,P-z.avail_out)?(v.mode=31,-4):(ie-=z.avail_in,P-=z.avail_out,z.total_in+=ie,z.total_out+=P,v.total+=P,v.wrap&&P&&(z.adler=v.check=v.flags?o(v.check,ee,P,z.next_out-P):s(v.check,ee,P,z.next_out-P)),z.data_type=v.bits+(v.last?64:0)+(v.mode===12?128:0)+(v.mode===20||v.mode===15?256:0),(ie==0&&P===0||F===4)&&Q===m&&(Q=-5),Q)},n.inflateEnd=function(z){if(!z||!z.state)return f;var F=z.state;return F.window&&(F.window=null),z.state=null,m},n.inflateGetHeader=function(z,F){var v;return z&&z.state?(2&(v=z.state).wrap)==0?f:((v.head=F).done=!1,m):f},n.inflateSetDictionary=function(z,F){var v,V=F.length;return z&&z.state?(v=z.state).wrap!==0&&v.mode!==11?f:v.mode===11&&s(1,F,V,0)!==v.check?-3:J(z,F,V,V)?(v.mode=31,-4):(v.havedict=1,m):f},n.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(r,i,n){var a=r("../utils/common"),s=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],o=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];i.exports=function(c,p,m,f,g,h,w,y){var b,k,S,I,A,C,M,D,W,J=y.bits,z=0,F=0,v=0,V=0,ee=0,q=0,le=0,G=0,ue=0,B=0,N=null,ie=0,P=new a.Buf16(16),Y=new a.Buf16(16),Ie=null,Be=0;for(z=0;z<=15;z++)P[z]=0;for(F=0;F<f;F++)P[p[m+F]]++;for(ee=J,V=15;1<=V&&P[V]===0;V--);if(V<ee&&(ee=V),V===0)return g[h++]=20971520,g[h++]=20971520,y.bits=1,0;for(v=1;v<V&&P[v]===0;v++);for(ee<v&&(ee=v),z=G=1;z<=15;z++)if(G<<=1,(G-=P[z])<0)return-1;if(0<G&&(c===0||V!==1))return-1;for(Y[1]=0,z=1;z<15;z++)Y[z+1]=Y[z]+P[z];for(F=0;F<f;F++)p[m+F]!==0&&(w[Y[p[m+F]]++]=F);if(C=c===0?(N=Ie=w,19):c===1?(N=s,ie-=257,Ie=o,Be-=257,256):(N=u,Ie=d,-1),z=v,A=h,le=F=B=0,S=-1,I=(ue=1<<(q=ee))-1,c===1&&852<ue||c===2&&592<ue)return 1;for(;;){for(M=z-le,W=w[F]<C?(D=0,w[F]):w[F]>C?(D=Ie[Be+w[F]],N[ie+w[F]]):(D=96,0),b=1<<z-le,v=k=1<<q;g[A+(B>>le)+(k-=b)]=M<<24|D<<16|W|0,k!==0;);for(b=1<<z-1;B&b;)b>>=1;if(b!==0?(B&=b-1,B+=b):B=0,F++,--P[z]==0){if(z===V)break;z=p[m+w[F]]}if(ee<z&&(B&I)!==S){for(le===0&&(le=ee),A+=v,G=1<<(q=z-le);q+le<V&&!((G-=P[q+le])<=0);)q++,G<<=1;if(ue+=1<<q,c===1&&852<ue||c===2&&592<ue)return 1;g[S=B&I]=ee<<24|q<<16|A-h|0}}return B!==0&&(g[A+B]=z-le<<24|64<<16|0),y.bits=ee,0}},{"../utils/common":41}],51:[function(r,i,n){i.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(r,i,n){var a=r("../utils/common"),s=0,o=1;function u(O){for(var L=O.length;0<=--L;)O[L]=0}var d=0,c=29,p=256,m=p+1+c,f=30,g=19,h=2*m+1,w=15,y=16,b=7,k=256,S=16,I=17,A=18,C=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],M=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],J=new Array(2*(m+2));u(J);var z=new Array(2*f);u(z);var F=new Array(512);u(F);var v=new Array(256);u(v);var V=new Array(c);u(V);var ee,q,le,G=new Array(f);function ue(O,L,te,re,H){this.static_tree=O,this.extra_bits=L,this.extra_base=te,this.elems=re,this.max_length=H,this.has_stree=O&&O.length}function B(O,L){this.dyn_tree=O,this.max_code=0,this.stat_desc=L}function N(O){return O<256?F[O]:F[256+(O>>>7)]}function ie(O,L){O.pending_buf[O.pending++]=255&L,O.pending_buf[O.pending++]=L>>>8&255}function P(O,L,te){O.bi_valid>y-te?(O.bi_buf|=L<<O.bi_valid&65535,ie(O,O.bi_buf),O.bi_buf=L>>y-O.bi_valid,O.bi_valid+=te-y):(O.bi_buf|=L<<O.bi_valid&65535,O.bi_valid+=te)}function Y(O,L,te){P(O,te[2*L],te[2*L+1])}function Ie(O,L){for(var te=0;te|=1&O,O>>>=1,te<<=1,0<--L;);return te>>>1}function Be(O,L,te){var re,H,oe=new Array(w+1),ce=0;for(re=1;re<=w;re++)oe[re]=ce=ce+te[re-1]<<1;for(H=0;H<=L;H++){var se=O[2*H+1];se!==0&&(O[2*H]=Ie(oe[se]++,se))}}function ye(O){var L;for(L=0;L<m;L++)O.dyn_ltree[2*L]=0;for(L=0;L<f;L++)O.dyn_dtree[2*L]=0;for(L=0;L<g;L++)O.bl_tree[2*L]=0;O.dyn_ltree[2*k]=1,O.opt_len=O.static_len=0,O.last_lit=O.matches=0}function be(O){8<O.bi_valid?ie(O,O.bi_buf):0<O.bi_valid&&(O.pending_buf[O.pending++]=O.bi_buf),O.bi_buf=0,O.bi_valid=0}function ke(O,L,te,re){var H=2*L,oe=2*te;return O[H]<O[oe]||O[H]===O[oe]&&re[L]<=re[te]}function Pe(O,L,te){for(var re=O.heap[te],H=te<<1;H<=O.heap_len&&(H<O.heap_len&&ke(L,O.heap[H+1],O.heap[H],O.depth)&&H++,!ke(L,re,O.heap[H],O.depth));)O.heap[te]=O.heap[H],te=H,H<<=1;O.heap[te]=re}function je(O,L,te){var re,H,oe,ce,se=0;if(O.last_lit!==0)for(;re=O.pending_buf[O.d_buf+2*se]<<8|O.pending_buf[O.d_buf+2*se+1],H=O.pending_buf[O.l_buf+se],se++,re===0?Y(O,H,L):(Y(O,(oe=v[H])+p+1,L),(ce=C[oe])!==0&&P(O,H-=V[oe],ce),Y(O,oe=N(--re),te),(ce=M[oe])!==0&&P(O,re-=G[oe],ce)),se<O.last_lit;);Y(O,k,L)}function Ve(O,L){var te,re,H,oe=L.dyn_tree,ce=L.stat_desc.static_tree,se=L.stat_desc.has_stree,pe=L.stat_desc.elems,Oe=-1;for(O.heap_len=0,O.heap_max=h,te=0;te<pe;te++)oe[2*te]!==0?(O.heap[++O.heap_len]=Oe=te,O.depth[te]=0):oe[2*te+1]=0;for(;O.heap_len<2;)oe[2*(H=O.heap[++O.heap_len]=Oe<2?++Oe:0)]=1,O.depth[H]=0,O.opt_len--,se&&(O.static_len-=ce[2*H+1]);for(L.max_code=Oe,te=O.heap_len>>1;1<=te;te--)Pe(O,oe,te);for(H=pe;te=O.heap[1],O.heap[1]=O.heap[O.heap_len--],Pe(O,oe,1),re=O.heap[1],O.heap[--O.heap_max]=te,O.heap[--O.heap_max]=re,oe[2*H]=oe[2*te]+oe[2*re],O.depth[H]=(O.depth[te]>=O.depth[re]?O.depth[te]:O.depth[re])+1,oe[2*te+1]=oe[2*re+1]=H,O.heap[1]=H++,Pe(O,oe,1),2<=O.heap_len;);O.heap[--O.heap_max]=O.heap[1],function(Te,Ke){var Je,Ze,Rt,Re,rr,gr,at=Ke.dyn_tree,Wr=Ke.max_code,Ia=Ke.stat_desc.static_tree,Ta=Ke.stat_desc.has_stree,Ea=Ke.stat_desc.extra_bits,_i=Ke.stat_desc.extra_base,Dt=Ke.stat_desc.max_length,ir=0;for(Re=0;Re<=w;Re++)Te.bl_count[Re]=0;for(at[2*Te.heap[Te.heap_max]+1]=0,Je=Te.heap_max+1;Je<h;Je++)Dt<(Re=at[2*at[2*(Ze=Te.heap[Je])+1]+1]+1)&&(Re=Dt,ir++),at[2*Ze+1]=Re,Wr<Ze||(Te.bl_count[Re]++,rr=0,_i<=Ze&&(rr=Ea[Ze-_i]),gr=at[2*Ze],Te.opt_len+=gr*(Re+rr),Ta&&(Te.static_len+=gr*(Ia[2*Ze+1]+rr)));if(ir!==0){do{for(Re=Dt-1;Te.bl_count[Re]===0;)Re--;Te.bl_count[Re]--,Te.bl_count[Re+1]+=2,Te.bl_count[Dt]--,ir-=2}while(0<ir);for(Re=Dt;Re!==0;Re--)for(Ze=Te.bl_count[Re];Ze!==0;)Wr<(Rt=Te.heap[--Je])||(at[2*Rt+1]!==Re&&(Te.opt_len+=(Re-at[2*Rt+1])*at[2*Rt],at[2*Rt+1]=Re),Ze--)}}(O,L),Be(oe,Oe,O.bl_count)}function x(O,L,te){var re,H,oe=-1,ce=L[1],se=0,pe=7,Oe=4;for(ce===0&&(pe=138,Oe=3),L[2*(te+1)+1]=65535,re=0;re<=te;re++)H=ce,ce=L[2*(re+1)+1],++se<pe&&H===ce||(se<Oe?O.bl_tree[2*H]+=se:H!==0?(H!==oe&&O.bl_tree[2*H]++,O.bl_tree[2*S]++):se<=10?O.bl_tree[2*I]++:O.bl_tree[2*A]++,oe=H,Oe=(se=0)===ce?(pe=138,3):H===ce?(pe=6,3):(pe=7,4))}function Q(O,L,te){var re,H,oe=-1,ce=L[1],se=0,pe=7,Oe=4;for(ce===0&&(pe=138,Oe=3),re=0;re<=te;re++)if(H=ce,ce=L[2*(re+1)+1],!(++se<pe&&H===ce)){if(se<Oe)for(;Y(O,H,O.bl_tree),--se!=0;);else H!==0?(H!==oe&&(Y(O,H,O.bl_tree),se--),Y(O,S,O.bl_tree),P(O,se-3,2)):se<=10?(Y(O,I,O.bl_tree),P(O,se-3,3)):(Y(O,A,O.bl_tree),P(O,se-11,7));oe=H,Oe=(se=0)===ce?(pe=138,3):H===ce?(pe=6,3):(pe=7,4)}}u(G);var K=!1;function R(O,L,te,re){P(O,(d<<1)+(re?1:0),3),function(H,oe,ce,se){be(H),ie(H,ce),ie(H,~ce),a.arraySet(H.pending_buf,H.window,oe,ce,H.pending),H.pending+=ce}(O,L,te)}n._tr_init=function(O){K||(function(){var L,te,re,H,oe,ce=new Array(w+1);for(H=re=0;H<c-1;H++)for(V[H]=re,L=0;L<1<<C[H];L++)v[re++]=H;for(v[re-1]=H,H=oe=0;H<16;H++)for(G[H]=oe,L=0;L<1<<M[H];L++)F[oe++]=H;for(oe>>=7;H<f;H++)for(G[H]=oe<<7,L=0;L<1<<M[H]-7;L++)F[256+oe++]=H;for(te=0;te<=w;te++)ce[te]=0;for(L=0;L<=143;)J[2*L+1]=8,L++,ce[8]++;for(;L<=255;)J[2*L+1]=9,L++,ce[9]++;for(;L<=279;)J[2*L+1]=7,L++,ce[7]++;for(;L<=287;)J[2*L+1]=8,L++,ce[8]++;for(Be(J,m+1,ce),L=0;L<f;L++)z[2*L+1]=5,z[2*L]=Ie(L,5);ee=new ue(J,C,p+1,m,w),q=new ue(z,M,0,f,w),le=new ue(new Array(0),D,0,g,b)}(),K=!0),O.l_desc=new B(O.dyn_ltree,ee),O.d_desc=new B(O.dyn_dtree,q),O.bl_desc=new B(O.bl_tree,le),O.bi_buf=0,O.bi_valid=0,ye(O)},n._tr_stored_block=R,n._tr_flush_block=function(O,L,te,re){var H,oe,ce=0;0<O.level?(O.strm.data_type===2&&(O.strm.data_type=function(se){var pe,Oe=4093624447;for(pe=0;pe<=31;pe++,Oe>>>=1)if(1&Oe&&se.dyn_ltree[2*pe]!==0)return s;if(se.dyn_ltree[18]!==0||se.dyn_ltree[20]!==0||se.dyn_ltree[26]!==0)return o;for(pe=32;pe<p;pe++)if(se.dyn_ltree[2*pe]!==0)return o;return s}(O)),Ve(O,O.l_desc),Ve(O,O.d_desc),ce=function(se){var pe;for(x(se,se.dyn_ltree,se.l_desc.max_code),x(se,se.dyn_dtree,se.d_desc.max_code),Ve(se,se.bl_desc),pe=g-1;3<=pe&&se.bl_tree[2*W[pe]+1]===0;pe--);return se.opt_len+=3*(pe+1)+5+5+4,pe}(O),H=O.opt_len+3+7>>>3,(oe=O.static_len+3+7>>>3)<=H&&(H=oe)):H=oe=te+5,te+4<=H&&L!==-1?R(O,L,te,re):O.strategy===4||oe===H?(P(O,2+(re?1:0),3),je(O,J,z)):(P(O,4+(re?1:0),3),function(se,pe,Oe,Te){var Ke;for(P(se,pe-257,5),P(se,Oe-1,5),P(se,Te-4,4),Ke=0;Ke<Te;Ke++)P(se,se.bl_tree[2*W[Ke]+1],3);Q(se,se.dyn_ltree,pe-1),Q(se,se.dyn_dtree,Oe-1)}(O,O.l_desc.max_code+1,O.d_desc.max_code+1,ce+1),je(O,O.dyn_ltree,O.dyn_dtree)),ye(O),re&&be(O)},n._tr_tally=function(O,L,te){return O.pending_buf[O.d_buf+2*O.last_lit]=L>>>8&255,O.pending_buf[O.d_buf+2*O.last_lit+1]=255&L,O.pending_buf[O.l_buf+O.last_lit]=255&te,O.last_lit++,L===0?O.dyn_ltree[2*te]++:(O.matches++,L--,O.dyn_ltree[2*(v[te]+p+1)]++,O.dyn_dtree[2*N(L)]++),O.last_lit===O.lit_bufsize-1},n._tr_align=function(O){P(O,2,3),Y(O,k,J),function(L){L.bi_valid===16?(ie(L,L.bi_buf),L.bi_buf=0,L.bi_valid=0):8<=L.bi_valid&&(L.pending_buf[L.pending++]=255&L.bi_buf,L.bi_buf>>=8,L.bi_valid-=8)}(O)}},{"../utils/common":41}],53:[function(r,i,n){i.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(r,i,n){(function(a){(function(s,o){if(!s.setImmediate){var u,d,c,p,m=1,f={},g=!1,h=s.document,w=Object.getPrototypeOf&&Object.getPrototypeOf(s);w=w&&w.setTimeout?w:s,u={}.toString.call(s.process)==="[object process]"?function(S){process.nextTick(function(){b(S)})}:function(){if(s.postMessage&&!s.importScripts){var S=!0,I=s.onmessage;return s.onmessage=function(){S=!1},s.postMessage("","*"),s.onmessage=I,S}}()?(p="setImmediate$"+Math.random()+"$",s.addEventListener?s.addEventListener("message",k,!1):s.attachEvent("onmessage",k),function(S){s.postMessage(p+S,"*")}):s.MessageChannel?((c=new MessageChannel).port1.onmessage=function(S){b(S.data)},function(S){c.port2.postMessage(S)}):h&&"onreadystatechange"in h.createElement("script")?(d=h.documentElement,function(S){var I=h.createElement("script");I.onreadystatechange=function(){b(S),I.onreadystatechange=null,d.removeChild(I),I=null},d.appendChild(I)}):function(S){setTimeout(b,0,S)},w.setImmediate=function(S){typeof S!="function"&&(S=new Function(""+S));for(var I=new Array(arguments.length-1),A=0;A<I.length;A++)I[A]=arguments[A+1];var C={callback:S,args:I};return f[m]=C,u(m),m++},w.clearImmediate=y}function y(S){delete f[S]}function b(S){if(g)setTimeout(b,0,S);else{var I=f[S];if(I){g=!0;try{(function(A){var C=A.callback,M=A.args;switch(M.length){case 0:C();break;case 1:C(M[0]);break;case 2:C(M[0],M[1]);break;case 3:C(M[0],M[1],M[2]);break;default:C.apply(o,M)}})(I)}finally{y(S),g=!1}}}}function k(S){S.source===s&&typeof S.data=="string"&&S.data.indexOf(p)===0&&b(+S.data.slice(p.length))}})(typeof self>"u"?a===void 0?this:a:self)}).call(this,typeof Vr<"u"?Vr:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})}(zi)),zi.exports}var mh=hh(),gh=fh(mh);/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Ai=Object.defineProperty,_h=Object.getOwnPropertyDescriptor,yh=Object.getOwnPropertyNames,bh=Object.prototype.hasOwnProperty,wh=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),ae=(e,t)=>()=>(e&&(t=e(e=0)),t),nr=(e,t)=>{for(var r in t)Ai(e,r,{get:t[r],enumerable:!0})},vh=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of yh(t))!bh.call(e,n)&&n!==r&&Ai(e,n,{get:()=>t[n],enumerable:!(i=_h(t,n))||i.enumerable});return e},br=e=>vh(Ai({},"__esModule",{value:!0}),e),wr,It,ar,Ha,ja,Ka=ae(()=>{wr=new Map,It=[],ar=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=wr.get(e);if(i===void 0)wr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=It.indexOf(e);n!==-1&&It.splice(n,1);for(let a=0;a<It.length;a++)if(wr.get(It[a]).priority<=r){It.splice(a,0,e);return}It.push(e)}return}throw new TypeError("not a valid backend")},Ha=async e=>{let t=wr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ja=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),i=r.length===0?It:r,n,a=[],s=new Set;for(let u of i){let d=await Ha(u);typeof d=="string"?a.push({name:u,err:d}):(n||(n=d),n===d&&s.add(u))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of a)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let o=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[n,new Proxy(e,{get:(u,d)=>d==="executionProviders"?o:Reflect.get(u,d)})]}}),$h=ae(()=>{Ka()}),Za,xh=ae(()=>{Za="1.22.0"}),Oi,it,Xa=ae(()=>{xh(),Oi="warning",it={wasm:{},webgl:{},webgpu:{},versions:{common:Za},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Oi=e}},get logLevel(){return Oi}},Object.defineProperty(it,"logLevel",{enumerable:!0})}),Me,kh=ae(()=>{Xa(),Me=it}),Ya,Qa,Sh=ae(()=>{Ya=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,d;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let c=a*n,p=0,m=c,f=c*2,g=-1;s==="RGBA"?(p=0,m=c,f=c*2,g=c*3):s==="RGB"?(p=0,m=c,f=c*2):s==="RBG"&&(p=0,f=c,m=c*2);for(let h=0;h<a;h++)for(let w=0;w<n;w++){let y=(e.data[p++]-d[0])*u[0],b=(e.data[m++]-d[1])*u[1],k=(e.data[f++]-d[2])*u[2],S=g===-1?255:(e.data[g++]-d[3])*u[3];i.fillStyle="rgba("+y+","+b+","+k+","+S+")",i.fillRect(w,h,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Qa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,f=0,g=1,h=2,w=3,y=0,b=p,k=p*2,S=-1;o==="RGBA"?(y=0,b=p,k=p*2,S=p*3):o==="RGB"?(y=0,b=p,k=p*2):o==="RBG"&&(y=0,k=p,b=p*2),i=r.createImageData(n,a);for(let I=0;I<a*n;f+=m,g+=m,h+=m,w+=m,I++)i.data[f]=(e.data[y++]-c[0])*d[0],i.data[g]=(e.data[b++]-c[1])*d[1],i.data[h]=(e.data[k++]-c[2])*d[2],i.data[w]=S===-1?255:(e.data[S++]-c[3])*d[3]}else throw new Error("Can not access image data");return i}}),Hr,Ja,es,ts,rs,is,Ih=ae(()=>{Ri(),Hr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,c=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),p=4,m=0,f=1,g=2,h=3,w=0,y=d,b=d*2,k=-1;o==="RGB"&&(p=3,m=0,f=1,g=2,h=-1),u==="RGBA"?k=d*3:u==="RBG"?(w=0,b=d,y=d*2):u==="BGR"&&(b=0,y=d,w=d*2);for(let S=0;S<d;S++,m+=p,g+=p,f+=p,h+=p)c[w++]=(e[m]+s[0])/a[0],c[y++]=(e[f]+s[1])/a[1],c[b++]=(e[g]+s[2])/a[2],k!==-1&&h!==-1&&(c[k++]=(e[h]+s[3])/a[3]);return u==="RGBA"?new et("float32",c,[1,4,r,i]):new et("float32",c,[1,3,r,i])},Ja=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=u();c.width=e.width,c.height=e.height;let p=d(c);if(p!=null){let m=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=m,o.width=f}else o.tensorFormat="RGBA",o.height=m,o.width=f;p.drawImage(e,0,0),s=p.getImageData(0,0,f,m).data}else throw new Error("Can not access image data")}else if(i){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=e.height,p=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=p,t!==void 0){let m=u();m.width=p,m.height=c;let f=d(m);if(f!=null)f.putImageData(e,0,0),s=f.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=e.width,c.height=e.height;let p=d(c);if(p!=null){let m=e.height,f=e.width;return p.drawImage(e,0,0,f,m),s=p.getImageData(0,0,f,m).data,o.height=m,o.width=f,Hr(s,o)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,p)=>{let m=u(),f=d(m);if(!e||!f)return p();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{m.width=g.width,m.height=g.height,f.drawImage(g,0,0,m.width,m.height);let h=f.getImageData(0,0,m.width,m.height);o.height=m.height,o.width=m.width,c(Hr(h.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Hr(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},es=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new et({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},ts=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new et({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},rs=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new et({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},is=(e,t,r)=>new et({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Ut,vr,Bi,ns,Th=ae(()=>{Ut=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),vr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Bi=!1,ns=()=>{if(!Bi){Bi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Ut.set("int64",BigInt64Array),vr.set(BigInt64Array,"int64")),t&&(Ut.set("uint64",BigUint64Array),vr.set(BigUint64Array,"uint64")),i?(Ut.set("float16",r),vr.set(r,"float16")):Ut.set("float16",Uint16Array)}}}),as,ss,Eh=ae(()=>{Ri(),as=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},ss=(e,t)=>{switch(e.location){case"cpu":return new et(e.type,e.data,t);case"cpu-pinned":return new et({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new et({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new et({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new et({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),et,Ri=ae(()=>{Sh(),Ih(),Th(),Eh(),et=class{constructor(e,t,r){ns();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=Ut.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let u=Ut.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?s=u.from(t,BigInt):s=u.from(t)}else if(t instanceof u)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")i="string",s=e;else if(u==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let u=vr.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=u,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let a=as(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return Ja(e,t)}static fromTexture(e,t){return es(e,t)}static fromGpuBuffer(e,t){return ts(e,t)}static fromMLTensor(e,t){return rs(e,t)}static fromPinnedBuffer(e,t,r){return is(e,t,r)}toDataURL(e){return Ya(this,e)}toImageData(e){return Qa(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ss(this,e)}}}),Xe,os=ae(()=>{Ri(),Xe=et}),jr,Di,mt,ot,us=ae(()=>{Xa(),jr=(e,t)=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||console.timeStamp(`${e}::ORT::${t}`)},Di=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),jr("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},mt=e=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||Di("BEGIN",e)},ot=e=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||Di("END",e)}}),ls,Ch=ae(()=>{Ka(),os(),us(),ls=class ph{constructor(t){this.handler=t}async run(t,r,i){mt();let n={},a={};if(typeof t!="object"||t===null||t instanceof Xe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Xe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);n[d]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let m=r[p];(m===null||m instanceof Xe)&&(d=!0,s=!1,n[p]=m)}if(d){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)n[d]=null;let o=await this.handler.run(t,n,a),u={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let c=o[d];c instanceof Xe?u[d]=c:u[d]=new Xe(c.type,c.data,c.dims)}return ot(),u}async release(){return this.handler.dispose()}static async create(t,r,i,n){mt();let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(m=t.byteLength-p,typeof i=="number"){if(m=i,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||p+m>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,p,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await ja(s),d=await o.createInferenceSessionHandler(a,u);return ot(),new ph(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Ni,zh=ae(()=>{Ch(),Ni=ls}),Ah=ae(()=>{}),Oh=ae(()=>{}),Bh=ae(()=>{}),Rh=ae(()=>{}),Dh={};nr(Dh,{InferenceSession:()=>Ni,TRACE:()=>jr,TRACE_FUNC_BEGIN:()=>mt,TRACE_FUNC_END:()=>ot,Tensor:()=>Xe,env:()=>Me,registerBackend:()=>ar});var ut=ae(()=>{$h(),kh(),zh(),os(),Ah(),Oh(),us(),Bh(),Rh()}),Mi=ae(()=>{}),ds={};nr(ds,{default:()=>ps});var Pi,Ui,ps,Nh=ae(()=>{Gc(),Wt(),ji(),Pi="ort-wasm-proxy-worker",Ui=globalThis.self?.name===Pi,Ui&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Xi(r.wasm).then(()=>{da(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;pa(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=ci(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;fa(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":ha(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:s,options:o}=r;ga(i,n,a,s,new Array(s.length).fill(null),o).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},ya([...a,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":_a(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),ps=Ui?null:e=>new Worker(e??tt,{type:"module",name:Pi})}),cs={};nr(cs,{default:()=>fs});var Wi,Li,fs,hs,Mh=ae(()=>{Li=(Wi=self.location.href,async function(e={}){var t,r,i=e,n=new Promise((l,_)=>{t=l,r=_}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",o=s&&self.name?.startsWith("em-pthread");i.mountExternalData=(l,_)=>{l.startsWith("./")&&(l=l.substring(2)),(i.Fb||(i.Fb=new Map)).set(l,_)},i.unmountExternalData=()=>{delete i.Fb};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let d=l=>async(..._)=>{try{if(i.Gb)throw Error("Session already started");let $=i.Gb={ec:_[0],errors:[]},T=await l(..._);if(i.Gb!==$)throw Error("Session mismatch");i.Kb?.flush();let E=$.errors;if(0<E.length){let U=await Promise.all(E);if(U=U.filter(X=>X),0<U.length)throw Error(U.join(`
`))}return T}finally{i.Gb=null}};i.jsepInit=(l,_)=>{if(l==="webgpu"){[i.Kb,i.Vb,i.Zb,i.Lb,i.Yb,i.kb,i.$b,i.bc,i.Wb,i.Xb,i.ac]=_;let $=i.Kb;i.jsepRegisterBuffer=(T,E,U,X)=>$.registerBuffer(T,E,U,X),i.jsepGetBuffer=T=>$.getBuffer(T),i.jsepCreateDownloader=(T,E,U)=>$.createDownloader(T,E,U),i.jsepOnCreateSession=T=>{$.onCreateSession(T)},i.jsepOnReleaseSession=T=>{$.onReleaseSession(T)},i.jsepOnRunStart=T=>$.onRunStart(T),i.cc=(T,E)=>{$.upload(T,E)}}else if(l==="webnn"){let $=_[0];[i.oc,i.Ob,i.webnnEnsureTensor,i.Pb,i.webnnDownloadTensor]=_.slice(1),i.webnnReleaseTensorId=i.Ob,i.webnnUploadTensor=i.Pb,i.webnnOnRunStart=T=>$.onRunStart(T),i.webnnOnRunEnd=$.onRunEnd.bind($),i.webnnRegisterMLContext=(T,E)=>{$.registerMLContext(T,E)},i.webnnOnReleaseSession=T=>{$.onReleaseSession(T)},i.webnnCreateMLTensorDownloader=(T,E)=>$.createMLTensorDownloader(T,E),i.webnnRegisterMLTensor=(T,E,U,X)=>$.registerMLTensor(T,E,U,X),i.webnnCreateMLContext=T=>$.createMLContext(T),i.webnnRegisterMLConstant=(T,E,U,X,ne,de)=>$.registerMLConstant(T,E,U,X,ne,i.Fb,de),i.webnnRegisterGraphInput=$.registerGraphInput.bind($),i.webnnIsGraphInput=$.isGraphInput.bind($),i.webnnRegisterGraphOutput=$.registerGraphOutput.bind($),i.webnnIsGraphOutput=$.isGraphOutput.bind($),i.webnnCreateTemporaryTensor=$.createTemporaryTensor.bind($),i.webnnIsGraphInputOutputTypeSupported=$.isGraphInputOutputTypeSupported.bind($)}};let c=()=>{let l=(_,$,T)=>(...E)=>{let U=bt,X=$?.();E=_(...E);let ne=$?.();return X!==ne&&(_=ne,T(X),$=T=null),bt!=U?new Promise((de,me)=>{Ma={resolve:de,reject:me}}):E};(()=>{for(let _ of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[_]=l(i[_],()=>i[_],$=>i[_]=$)})(),d!==void 0&&(i._OrtRun=d(i._OrtRun),i._OrtRunWithBinding=d(i._OrtRunWithBinding)),c=void 0};i.asyncInit=()=>{c?.()};var p,m,f=Object.assign({},i),g=(l,_)=>{throw _},h="";(a||s)&&(s?h=self.location.href:typeof document<"u"&&document.currentScript&&(h=document.currentScript.src),Wi&&(h=Wi),h=h.startsWith("blob:")?"":h.slice(0,h.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(m=l=>{var _=new XMLHttpRequest;return _.open("GET",l,!1),_.responseType="arraybuffer",_.send(null),new Uint8Array(_.response)}),p=async l=>{if(G(l))return new Promise(($,T)=>{var E=new XMLHttpRequest;E.open("GET",l,!0),E.responseType="arraybuffer",E.onload=()=>{E.status==200||E.status==0&&E.response?$(E.response):T(E.status)},E.onerror=T,E.send(null)});var _=await fetch(l,{credentials:"same-origin"});if(_.ok)return _.arrayBuffer();throw Error(_.status+" : "+_.url)});var w=console.log.bind(console),y=console.error.bind(console),b=w,k=y;Object.assign(i,f),f=null;var S,I,A,C,M,D,W,J,z,F,v,V,ee,q=i.wasmBinary,le=!1,G=l=>l.startsWith("file://");function ue(){return S.buffer!=C.buffer&&ke(),C}function B(){return S.buffer!=C.buffer&&ke(),M}function N(){return S.buffer!=C.buffer&&ke(),D}function ie(){return S.buffer!=C.buffer&&ke(),W}function P(){return S.buffer!=C.buffer&&ke(),J}function Y(){return S.buffer!=C.buffer&&ke(),z}function Ie(){return S.buffer!=C.buffer&&ke(),F}function Be(){return S.buffer!=C.buffer&&ke(),ee}if(o){let l=function(_){try{var $=_.data,T=$.Cb;if(T==="load"){let E=[];self.onmessage=U=>E.push(U),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let U of E)l(U);self.onmessage=l};for(let U of $.Sb)i[U]&&!i[U].proxy||(i[U]=(...X)=>{postMessage({Cb:"callHandler",Rb:U,args:X})},U=="print"&&(b=i[U]),U=="printErr"&&(k=i[U]));S=$.lc,ke(),ye($.mc)}else if(T==="run"){Ia($.Bb),La($.Bb,0,0,1,0,0),gr(),Da($.Bb),be||(Jf(),be=!0);try{Ta($.hc,$.Ib)}catch(E){if(E!="unwind")throw E}}else $.target!=="setimmediate"&&(T==="checkMailbox"?be&&yi():T&&(k(`worker: received unknown command ${T}`),k($)))}catch(E){throw eh(),E}};var ye,be=!1;k=function(..._){_=_.join(" "),console.error(_)},self.alert=function(..._){postMessage({Cb:"alert",text:_.join(" "),jc:Ii()})},self.onunhandledrejection=_=>{throw _.reason||_},self.onmessage=l}function ke(){var l=S.buffer;i.HEAP8=C=new Int8Array(l),i.HEAP16=D=new Int16Array(l),i.HEAPU8=M=new Uint8Array(l),i.HEAPU16=W=new Uint16Array(l),i.HEAP32=J=new Int32Array(l),i.HEAPU32=z=new Uint32Array(l),i.HEAPF32=F=new Float32Array(l),i.HEAPF64=ee=new Float64Array(l),i.HEAP64=v=new BigInt64Array(l),i.HEAPU64=V=new BigUint64Array(l)}function Pe(){o?startWorker(i):_e.Da()}o||(S=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ke());var je,Ve=0,x=null;function Q(){if(--Ve==0&&x){var l=x;x=null,l()}}function K(l){throw k(l="Aborted("+l+")"),le=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),r(l),l}function R(){return{a:{L:te,Aa:L,b:_i,$:ir,A:cf,pa:ff,X:mf,Z:gf,qa:_f,na:yf,ga:bf,ma:wf,J:vf,Y:$f,V:xf,oa:kf,W:Sf,va:Km,E:Zm,Q:Xm,O:Qm,D:eg,v:tg,r:rg,P:ig,z:dg,R:pg,ja:cg,T:fg,aa:hg,M:mg,F:gg,ia:Da,sa:_g,t:yg,Ca:bg,w:$g,o:xg,m:Sg,c:Oa,Ba:Ig,n:Tg,j:zg,u:Ag,p:Og,f:Bg,s:Rg,l:Dg,e:Ng,k:Mg,h:Pg,g:Ug,d:Wg,da:Lg,ea:Fg,fa:qg,ba:Uf,ca:Wf,N:Lf,xa:Gg,ua:jg,i:Kg,C:Zg,G:Xg,ta:Hg,x:Yg,ra:Qg,U:Jg,q:Vg,y:e_,K:t_,S:r_,za:i_,ya:n_,ka:Gf,la:Hf,_:Ke,B:jf,I:Kf,ha:Zf,H:Xf,a:S,wa:Oe}}}var O={840156:(l,_,$,T,E)=>{if(i===void 0||!i.Fb)return 1;if((l=Le(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=i.Fb.get(l)))return 2;if(_=Number(_>>>0),$=Number($>>>0),T=Number(T>>>0),_+$>l.byteLength)return 3;try{let U=l.subarray(_,_+$);switch(E){case 0:B().set(U,T>>>0);break;case 1:i.nc?i.nc(T,U):i.cc(T,U);break;default:return 4}return 0}catch{return 4}},840980:(l,_,$)=>{i.Pb(l,B().subarray(_>>>0,_+$>>>0))},841044:()=>i.oc(),841086:l=>{i.Ob(l)},841123:()=>{i.Wb()},841154:()=>{i.Xb()},841183:()=>{i.ac()},841208:l=>i.Vb(l),841241:l=>i.Zb(l),841273:(l,_,$)=>{i.Lb(Number(l),Number(_),Number($),!0)},841336:(l,_,$)=>{i.Lb(Number(l),Number(_),Number($))},841393:()=>typeof wasmOffsetConverter<"u",841450:l=>{i.kb("Abs",l,void 0)},841501:l=>{i.kb("Neg",l,void 0)},841552:l=>{i.kb("Floor",l,void 0)},841605:l=>{i.kb("Ceil",l,void 0)},841657:l=>{i.kb("Reciprocal",l,void 0)},841715:l=>{i.kb("Sqrt",l,void 0)},841767:l=>{i.kb("Exp",l,void 0)},841818:l=>{i.kb("Erf",l,void 0)},841869:l=>{i.kb("Sigmoid",l,void 0)},841924:(l,_,$)=>{i.kb("HardSigmoid",l,{alpha:_,beta:$})},842003:l=>{i.kb("Log",l,void 0)},842054:l=>{i.kb("Sin",l,void 0)},842105:l=>{i.kb("Cos",l,void 0)},842156:l=>{i.kb("Tan",l,void 0)},842207:l=>{i.kb("Asin",l,void 0)},842259:l=>{i.kb("Acos",l,void 0)},842311:l=>{i.kb("Atan",l,void 0)},842363:l=>{i.kb("Sinh",l,void 0)},842415:l=>{i.kb("Cosh",l,void 0)},842467:l=>{i.kb("Asinh",l,void 0)},842520:l=>{i.kb("Acosh",l,void 0)},842573:l=>{i.kb("Atanh",l,void 0)},842626:l=>{i.kb("Tanh",l,void 0)},842678:l=>{i.kb("Not",l,void 0)},842729:(l,_,$)=>{i.kb("Clip",l,{min:_,max:$})},842798:l=>{i.kb("Clip",l,void 0)},842850:(l,_)=>{i.kb("Elu",l,{alpha:_})},842908:l=>{i.kb("Gelu",l,void 0)},842960:l=>{i.kb("Relu",l,void 0)},843012:(l,_)=>{i.kb("LeakyRelu",l,{alpha:_})},843076:(l,_)=>{i.kb("ThresholdedRelu",l,{alpha:_})},843146:(l,_)=>{i.kb("Cast",l,{to:_})},843204:l=>{i.kb("Add",l,void 0)},843255:l=>{i.kb("Sub",l,void 0)},843306:l=>{i.kb("Mul",l,void 0)},843357:l=>{i.kb("Div",l,void 0)},843408:l=>{i.kb("Pow",l,void 0)},843459:l=>{i.kb("Equal",l,void 0)},843512:l=>{i.kb("Greater",l,void 0)},843567:l=>{i.kb("GreaterOrEqual",l,void 0)},843629:l=>{i.kb("Less",l,void 0)},843681:l=>{i.kb("LessOrEqual",l,void 0)},843740:(l,_,$,T,E)=>{i.kb("ReduceMean",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},843915:(l,_,$,T,E)=>{i.kb("ReduceMax",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},844089:(l,_,$,T,E)=>{i.kb("ReduceMin",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},844263:(l,_,$,T,E)=>{i.kb("ReduceProd",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},844438:(l,_,$,T,E)=>{i.kb("ReduceSum",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},844612:(l,_,$,T,E)=>{i.kb("ReduceL1",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},844785:(l,_,$,T,E)=>{i.kb("ReduceL2",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},844958:(l,_,$,T,E)=>{i.kb("ReduceLogSum",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},845135:(l,_,$,T,E)=>{i.kb("ReduceSumSquare",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},845315:(l,_,$,T,E)=>{i.kb("ReduceLogSumExp",l,{keepDims:!!_,noopWithEmptyAxes:!!$,axes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},845495:l=>{i.kb("Where",l,void 0)},845548:(l,_,$)=>{i.kb("Transpose",l,{perm:_?Array.from(P().subarray(Number(_)>>>0,Number($)>>>0)):[]})},845672:(l,_,$,T)=>{i.kb("DepthToSpace",l,{blocksize:_,mode:Le($),format:T?"NHWC":"NCHW"})},845805:(l,_,$,T)=>{i.kb("DepthToSpace",l,{blocksize:_,mode:Le($),format:T?"NHWC":"NCHW"})},845938:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge,yr)=>{i.kb("ConvTranspose",l,{format:de?"NHWC":"NCHW",autoPad:_,dilations:[$],group:T,kernelShape:[E],pads:[U,X],strides:[ne],wIsConst:()=>!!ue()[me>>>0],outputPadding:xe?Array.from(P().subarray(Number(xe)>>>0,Number(Ce)>>>0)):[],outputShape:De?Array.from(P().subarray(Number(De)>>>0,Number(Ge)>>>0)):[],activation:Le(yr)})},846371:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge)=>{i.kb("ConvTranspose",l,{format:ne?"NHWC":"NCHW",autoPad:_,dilations:Array.from(P().subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),group:T,kernelShape:Array.from(P().subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),pads:Array.from(P().subarray(Number(U)>>>0,4+(Number(U)>>>0)>>>0)),strides:Array.from(P().subarray(Number(X)>>>0,2+(Number(X)>>>0)>>>0)),wIsConst:()=>!!ue()[de>>>0],outputPadding:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],outputShape:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(De)>>>0)):[],activation:Le(Ge)})},847032:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge,yr)=>{i.kb("ConvTranspose",l,{format:de?"NHWC":"NCHW",autoPad:_,dilations:[$],group:T,kernelShape:[E],pads:[U,X],strides:[ne],wIsConst:()=>!!ue()[me>>>0],outputPadding:xe?Array.from(P().subarray(Number(xe)>>>0,Number(Ce)>>>0)):[],outputShape:De?Array.from(P().subarray(Number(De)>>>0,Number(Ge)>>>0)):[],activation:Le(yr)})},847465:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge)=>{i.kb("ConvTranspose",l,{format:ne?"NHWC":"NCHW",autoPad:_,dilations:Array.from(P().subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),group:T,kernelShape:Array.from(P().subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),pads:Array.from(P().subarray(Number(U)>>>0,4+(Number(U)>>>0)>>>0)),strides:Array.from(P().subarray(Number(X)>>>0,2+(Number(X)>>>0)>>>0)),wIsConst:()=>!!ue()[de>>>0],outputPadding:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],outputShape:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(De)>>>0)):[],activation:Le(Ge)})},848126:(l,_)=>{i.kb("GlobalAveragePool",l,{format:_?"NHWC":"NCHW"})},848217:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge)=>{i.kb("AveragePool",l,{format:Ge?"NHWC":"NCHW",auto_pad:_,ceil_mode:$,count_include_pad:T,storage_order:E,dilations:U?Array.from(P().subarray(Number(U)>>>0,Number(X)>>>0)):[],kernel_shape:ne?Array.from(P().subarray(Number(ne)>>>0,Number(de)>>>0)):[],pads:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],strides:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(De)>>>0)):[]})},848696:(l,_)=>{i.kb("GlobalAveragePool",l,{format:_?"NHWC":"NCHW"})},848787:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge)=>{i.kb("AveragePool",l,{format:Ge?"NHWC":"NCHW",auto_pad:_,ceil_mode:$,count_include_pad:T,storage_order:E,dilations:U?Array.from(P().subarray(Number(U)>>>0,Number(X)>>>0)):[],kernel_shape:ne?Array.from(P().subarray(Number(ne)>>>0,Number(de)>>>0)):[],pads:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],strides:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(De)>>>0)):[]})},849266:(l,_)=>{i.kb("GlobalMaxPool",l,{format:_?"NHWC":"NCHW"})},849353:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge)=>{i.kb("MaxPool",l,{format:Ge?"NHWC":"NCHW",auto_pad:_,ceil_mode:$,count_include_pad:T,storage_order:E,dilations:U?Array.from(P().subarray(Number(U)>>>0,Number(X)>>>0)):[],kernel_shape:ne?Array.from(P().subarray(Number(ne)>>>0,Number(de)>>>0)):[],pads:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],strides:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(De)>>>0)):[]})},849828:(l,_)=>{i.kb("GlobalMaxPool",l,{format:_?"NHWC":"NCHW"})},849915:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge)=>{i.kb("MaxPool",l,{format:Ge?"NHWC":"NCHW",auto_pad:_,ceil_mode:$,count_include_pad:T,storage_order:E,dilations:U?Array.from(P().subarray(Number(U)>>>0,Number(X)>>>0)):[],kernel_shape:ne?Array.from(P().subarray(Number(ne)>>>0,Number(de)>>>0)):[],pads:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],strides:Ce?Array.from(P().subarray(Number(Ce)>>>0,Number(De)>>>0)):[]})},850390:(l,_,$,T,E)=>{i.kb("Gemm",l,{alpha:_,beta:$,transA:T,transB:E})},850494:l=>{i.kb("MatMul",l,void 0)},850548:(l,_,$,T)=>{i.kb("ArgMax",l,{keepDims:!!_,selectLastIndex:!!$,axis:T})},850656:(l,_,$,T)=>{i.kb("ArgMin",l,{keepDims:!!_,selectLastIndex:!!$,axis:T})},850764:(l,_)=>{i.kb("Softmax",l,{axis:_})},850827:(l,_)=>{i.kb("Concat",l,{axis:_})},850887:(l,_,$,T,E)=>{i.kb("Split",l,{axis:_,numOutputs:$,splitSizes:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},851043:l=>{i.kb("Expand",l,void 0)},851097:(l,_)=>{i.kb("Gather",l,{axis:Number(_)})},851168:(l,_)=>{i.kb("GatherElements",l,{axis:Number(_)})},851247:(l,_)=>{i.kb("GatherND",l,{batch_dims:Number(_)})},851326:(l,_,$,T,E,U,X,ne,de,me,xe)=>{i.kb("Resize",l,{antialias:_,axes:$?Array.from(P().subarray(Number($)>>>0,Number(T)>>>0)):[],coordinateTransformMode:Le(E),cubicCoeffA:U,excludeOutside:X,extrapolationValue:ne,keepAspectRatioPolicy:Le(de),mode:Le(me),nearestMode:Le(xe)})},851688:(l,_,$,T,E,U,X)=>{i.kb("Slice",l,{starts:_?Array.from(P().subarray(Number(_)>>>0,Number($)>>>0)):[],ends:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[],axes:U?Array.from(P().subarray(Number(U)>>>0,Number(X)>>>0)):[]})},851952:l=>{i.kb("Tile",l,void 0)},852004:(l,_,$)=>{i.kb("InstanceNormalization",l,{epsilon:_,format:$?"NHWC":"NCHW"})},852118:(l,_,$)=>{i.kb("InstanceNormalization",l,{epsilon:_,format:$?"NHWC":"NCHW"})},852232:l=>{i.kb("Range",l,void 0)},852285:(l,_)=>{i.kb("Einsum",l,{equation:Le(_)})},852366:(l,_,$,T,E)=>{i.kb("Pad",l,{mode:_,value:$,pads:T?Array.from(P().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},852509:(l,_,$,T,E,U)=>{i.kb("BatchNormalization",l,{epsilon:_,momentum:$,spatial:!!E,trainingMode:!!T,format:U?"NHWC":"NCHW"})},852678:(l,_,$,T,E,U)=>{i.kb("BatchNormalization",l,{epsilon:_,momentum:$,spatial:!!E,trainingMode:!!T,format:U?"NHWC":"NCHW"})},852847:(l,_,$)=>{i.kb("CumSum",l,{exclusive:Number(_),reverse:Number($)})},852944:(l,_,$)=>{i.kb("DequantizeLinear",l,{axis:_,blockSize:$})},853034:(l,_,$,T,E)=>{i.kb("GridSample",l,{align_corners:_,mode:Le($),padding_mode:Le(T),format:E?"NHWC":"NCHW"})},853204:(l,_,$,T,E)=>{i.kb("GridSample",l,{align_corners:_,mode:Le($),padding_mode:Le(T),format:E?"NHWC":"NCHW"})},853374:(l,_)=>{i.kb("ScatterND",l,{reduction:Le(_)})},853459:(l,_,$,T,E,U,X,ne,de)=>{i.kb("Attention",l,{numHeads:_,isUnidirectional:$,maskFilterValue:T,scale:E,doRotary:U,qkvHiddenSizes:X?Array.from(P().subarray(Number(ne)>>>0,Number(ne)+X>>>0)):[],pastPresentShareBuffer:!!de})},853731:l=>{i.kb("BiasAdd",l,void 0)},853786:l=>{i.kb("BiasSplitGelu",l,void 0)},853847:l=>{i.kb("FastGelu",l,void 0)},853903:(l,_,$,T,E,U,X,ne,de,me,xe,Ce,De,Ge,yr,o_)=>{i.kb("Conv",l,{format:Ce?"NHWC":"NCHW",auto_pad:_,dilations:$?Array.from(P().subarray(Number($)>>>0,Number(T)>>>0)):[],group:E,kernel_shape:U?Array.from(P().subarray(Number(U)>>>0,Number(X)>>>0)):[],pads:ne?Array.from(P().subarray(Number(ne)>>>0,Number(de)>>>0)):[],strides:me?Array.from(P().subarray(Number(me)>>>0,Number(xe)>>>0)):[],w_is_const:()=>!!ue()[Number(De)>>>0],activation:Le(Ge),activation_params:yr?Array.from(Ie().subarray(Number(yr)>>>0,Number(o_)>>>0)):[]})},854487:l=>{i.kb("Gelu",l,void 0)},854539:(l,_,$,T,E,U,X,ne,de)=>{i.kb("GroupQueryAttention",l,{numHeads:_,kvNumHeads:$,scale:T,softcap:E,doRotary:U,rotaryInterleaved:X,smoothSoftmax:ne,localWindowSize:de})},854756:(l,_,$,T)=>{i.kb("LayerNormalization",l,{axis:_,epsilon:$,simplified:!!T})},854867:(l,_,$,T)=>{i.kb("LayerNormalization",l,{axis:_,epsilon:$,simplified:!!T})},854978:(l,_,$,T,E,U)=>{i.kb("MatMulNBits",l,{k:_,n:$,accuracyLevel:T,bits:E,blockSize:U})},855105:(l,_,$,T,E,U)=>{i.kb("MultiHeadAttention",l,{numHeads:_,isUnidirectional:$,maskFilterValue:T,scale:E,doRotary:U})},855264:(l,_)=>{i.kb("QuickGelu",l,{alpha:_})},855328:(l,_,$,T,E)=>{i.kb("RotaryEmbedding",l,{interleaved:!!_,numHeads:$,rotaryEmbeddingDim:T,scale:E})},855467:(l,_,$)=>{i.kb("SkipLayerNormalization",l,{epsilon:_,simplified:!!$})},855569:(l,_,$)=>{i.kb("SkipLayerNormalization",l,{epsilon:_,simplified:!!$})},855671:(l,_,$,T)=>{i.kb("GatherBlockQuantized",l,{gatherAxis:_,quantizeAxis:$,blockSize:T})},855792:l=>{i.$b(l)},855826:(l,_)=>i.bc(Number(l),Number(_),i.Gb.ec,i.Gb.errors)};function L(l,_,$){return Bf(async()=>{await i.Yb(Number(l),Number(_),Number($))})}function te(){return typeof wasmOffsetConverter<"u"}class re{name="ExitStatus";constructor(_){this.message=`Program terminated with exit(${_})`,this.status=_}}var H=l=>{l.terminate(),l.onmessage=()=>{}},oe=[],ce=l=>{Je.length==0&&(Wr(),at(Je[0]));var _=Je.pop();if(!_)return 6;Ze.push(_),Re[l.Bb]=_,_.Bb=l.Bb;var $={Cb:"run",hc:l.fc,Ib:l.Ib,Bb:l.Bb};return _.postMessage($,l.Nb),0},se=0,pe=(l,_,...$)=>{for(var T=2*$.length,E=Va(),U=qa(8*T),X=U>>>3,ne=0;ne<$.length;ne++){var de=$[ne];typeof de=="bigint"?(v[X+2*ne]=1n,v[X+2*ne+1]=de):(v[X+2*ne]=0n,Be()[X+2*ne+1>>>0]=de)}return l=th(l,0,T,U,_),Ei(E),l};function Oe(l){if(o)return pe(0,1,l);if(A=l,!(0<se)){for(var _ of Ze)H(_);for(_ of Je)H(_);Je=[],Ze=[],Re={},le=!0}g(0,new re(l))}function Te(l){if(o)return pe(1,0,l);Ke(l)}var Ke=l=>{if(A=l,o)throw Te(l),"unwind";Oe(l)},Je=[],Ze=[],Rt=[],Re={},rr=l=>{var _=l.Bb;delete Re[_],Je.push(l),Ze.splice(Ze.indexOf(l),1),l.Bb=0,rh(_)};function gr(){Rt.forEach(l=>l())}var at=l=>new Promise(_=>{l.onmessage=E=>{var U=(E=E.data).Cb;if(E.Hb&&E.Hb!=Ii()){var X=Re[E.Hb];X?X.postMessage(E,E.Nb):k(`Internal error! Worker sent a message "${U}" to target pthread ${E.Hb}, but that thread no longer exists!`)}else U==="checkMailbox"?yi():U==="spawnThread"?ce(E):U==="cleanupThread"?rr(Re[E.ic]):U==="loaded"?(l.loaded=!0,_(l)):U==="alert"?alert(`Thread ${E.jc}: ${E.text}`):E.target==="setimmediate"?l.postMessage(E):U==="callHandler"?i[E.Rb](...E.args):U&&k(`worker sent an unknown command ${U}`)},l.onerror=E=>{throw k(`worker sent an error! ${E.filename}:${E.lineno}: ${E.message}`),E};var $,T=[];for($ of[])i.propertyIsEnumerable($)&&T.push($);l.postMessage({Cb:"load",Sb:T,lc:S,mc:I})});function Wr(){var l=new Worker((()=>{let _=URL;return self.location.href>"file:"&&self.location.href<"file;"?new _("ort.bundle.min.mjs",self.location.href):new URL(self.location.href)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Je.push(l)}var Ia=l=>{ke();var _=Y()[l+52>>>2>>>0];l=Y()[l+56>>>2>>>0],ah(_,_-l),Ei(_)},Ta=(l,_)=>{se=0,l=sh(l,_),0<se?A=l:Fa(l)};class Ea{constructor(_){this.Jb=_-24}}function _i(l,_,$){var T=new Ea(l>>>=0);throw _>>>=0,$>>>=0,Y()[T.Jb+16>>>2>>>0]=0,Y()[T.Jb+4>>>2>>>0]=_,Y()[T.Jb+8>>>2>>>0]=$,l}function Dt(l,_,$,T){return o?pe(2,1,l,_,$,T):ir(l,_,$,T)}function ir(l,_,$,T){if(l>>>=0,$>>>=0,T>>>=0,u===void 0)return 6;var E=[];return o&&E.length===0?Dt(l,_>>>=0,$,T):(l={fc:$,Bb:l,Ib:T,Nb:E},o?(l.Cb="spawnThread",postMessage(l,E),0):ce(l))}var df=typeof TextDecoder<"u"?new TextDecoder:void 0,pf=(l,_=0,$=NaN)=>{var T=(_>>>=0)+$;for($=_;l[$]&&!($>=T);)++$;if(16<$-_&&l.buffer&&df)return df.decode(l.buffer instanceof ArrayBuffer?l.subarray(_,$):l.slice(_,$));for(T="";_<$;){var E=l[_++];if(128&E){var U=63&l[_++];if((224&E)==192)T+=String.fromCharCode((31&E)<<6|U);else{var X=63&l[_++];65536>(E=(240&E)==224?(15&E)<<12|U<<6|X:(7&E)<<18|U<<12|X<<6|63&l[_++])?T+=String.fromCharCode(E):(E-=65536,T+=String.fromCharCode(55296|E>>10,56320|1023&E))}}else T+=String.fromCharCode(E)}return T},Le=(l,_)=>(l>>>=0)?pf(B(),l,_):"";function cf(l,_,$){return o?pe(3,1,l,_,$):0}function ff(l,_){if(o)return pe(4,1,l,_)}var hf=l=>{for(var _=0,$=0;$<l.length;++$){var T=l.charCodeAt($);127>=T?_++:2047>=T?_+=2:55296<=T&&57343>=T?(_+=4,++$):_+=3}return _},_r=(l,_,$)=>{var T=B();if(_>>>=0,0<$){var E=_;$=_+$-1;for(var U=0;U<l.length;++U){var X=l.charCodeAt(U);if(55296<=X&&57343>=X&&(X=65536+((1023&X)<<10)|1023&l.charCodeAt(++U)),127>=X){if(_>=$)break;T[_++>>>0]=X}else{if(2047>=X){if(_+1>=$)break;T[_++>>>0]=192|X>>6}else{if(65535>=X){if(_+2>=$)break;T[_++>>>0]=224|X>>12}else{if(_+3>=$)break;T[_++>>>0]=240|X>>18,T[_++>>>0]=128|X>>12&63}T[_++>>>0]=128|X>>6&63}T[_++>>>0]=128|63&X}}T[_>>>0]=0,l=_-E}else l=0;return l};function mf(l,_){if(o)return pe(5,1,l,_)}function gf(l,_,$){if(o)return pe(6,1,l,_,$)}function _f(l,_,$){return o?pe(7,1,l,_,$):0}function yf(l,_){if(o)return pe(8,1,l,_)}function bf(l,_,$){if(o)return pe(9,1,l,_,$)}function wf(l,_,$,T){if(o)return pe(10,1,l,_,$,T)}function vf(l,_,$,T){if(o)return pe(11,1,l,_,$,T)}function $f(l,_,$,T){if(o)return pe(12,1,l,_,$,T)}function xf(l){if(o)return pe(13,1,l)}function kf(l,_){if(o)return pe(14,1,l,_)}function Sf(l,_,$){if(o)return pe(15,1,l,_,$)}var If,Nt,Km=()=>K(""),yt=l=>{for(var _="";B()[l>>>0];)_+=If[B()[l++>>>0]];return _},Ca={},za={};function kt(l,_,$={}){return function(T,E,U={}){var X=E.name;if(!T)throw new Nt(`type "${X}" must have a positive integer typeid pointer`);if(za.hasOwnProperty(T)){if(U.Tb)return;throw new Nt(`Cannot register type '${X}' twice`)}za[T]=E,Ca.hasOwnProperty(T)&&(E=Ca[T],delete Ca[T],E.forEach(ne=>ne()))}(l,_,$)}var Tf=(l,_,$)=>{switch(_){case 1:return $?T=>ue()[T>>>0]:T=>B()[T>>>0];case 2:return $?T=>N()[T>>>1>>>0]:T=>ie()[T>>>1>>>0];case 4:return $?T=>P()[T>>>2>>>0]:T=>Y()[T>>>2>>>0];case 8:return $?T=>v[T>>>3]:T=>V[T>>>3];default:throw new TypeError(`invalid integer width (${_}): ${l}`)}};function Zm(l,_,$){$>>>=0,kt(l>>>=0,{name:_=yt(_>>>0),fromWireType:T=>T,toWireType:function(T,E){if(typeof E!="bigint"&&typeof E!="number")throw E=E===null?"null":(T=typeof E)=="object"||T==="array"||T==="function"?E.toString():""+E,new TypeError(`Cannot convert "${E}" to ${this.name}`);return typeof E=="number"&&(E=BigInt(E)),E},Db:Mt,readValueFromPointer:Tf(_,$,_.indexOf("u")==-1),Eb:null})}var Mt=8;function Xm(l,_,$,T){kt(l>>>=0,{name:_=yt(_>>>0),fromWireType:function(E){return!!E},toWireType:function(E,U){return U?$:T},Db:Mt,readValueFromPointer:function(E){return this.fromWireType(B()[E>>>0])},Eb:null})}var Aa=[],St=[];function Oa(l){9<(l>>>=0)&&--St[l+1]==0&&(St[l]=void 0,Aa.push(l))}var Qe=l=>{if(!l)throw new Nt("Cannot use deleted val. handle = "+l);return St[l]},st=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let _=Aa.pop()||St.length;return St[_]=l,St[_+1]=1,_}};function Ba(l){return this.fromWireType(Y()[l>>>2>>>0])}var Ym={name:"emscripten::val",fromWireType:l=>{var _=Qe(l);return Oa(l),_},toWireType:(l,_)=>st(_),Db:Mt,readValueFromPointer:Ba,Eb:null};function Qm(l){return kt(l>>>0,Ym)}var Jm=(l,_)=>{switch(_){case 4:return function($){return this.fromWireType(Ie()[$>>>2>>>0])};case 8:return function($){return this.fromWireType(Be()[$>>>3>>>0])};default:throw new TypeError(`invalid float width (${_}): ${l}`)}};function eg(l,_,$){$>>>=0,kt(l>>>=0,{name:_=yt(_>>>0),fromWireType:T=>T,toWireType:(T,E)=>E,Db:Mt,readValueFromPointer:Jm(_,$),Eb:null})}function tg(l,_,$,T,E){if(l>>>=0,$>>>=0,_=yt(_>>>0),E===-1&&(E=4294967295),E=ne=>ne,T===0){var U=32-8*$;E=ne=>ne<<U>>>U}var X=_.includes("unsigned")?function(ne,de){return de>>>0}:function(ne,de){return de};kt(l,{name:_,fromWireType:E,toWireType:X,Db:Mt,readValueFromPointer:Tf(_,$,T!==0),Eb:null})}function rg(l,_,$){function T(U){var X=Y()[U>>>2>>>0];return U=Y()[U+4>>>2>>>0],new E(ue().buffer,U,X)}var E=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][_];kt(l>>>=0,{name:$=yt($>>>0),fromWireType:T,Db:Mt,readValueFromPointer:T},{Tb:!0})}function ig(l,_){kt(l>>>=0,{name:_=yt(_>>>0),fromWireType:function($){for(var T,E=Y()[$>>>2>>>0],U=$+4,X=U,ne=0;ne<=E;++ne){var de=U+ne;ne!=E&&B()[de>>>0]!=0||(X=Le(X,de-X),T===void 0?T=X:(T+="\0",T+=X),X=de+1)}return wt($),T},toWireType:function($,T){T instanceof ArrayBuffer&&(T=new Uint8Array(T));var E=typeof T=="string";if(!(E||T instanceof Uint8Array||T instanceof Uint8ClampedArray||T instanceof Int8Array))throw new Nt("Cannot pass non-string to std::string");var U=E?hf(T):T.length,X=Ti(4+U+1),ne=X+4;if(Y()[X>>>2>>>0]=U,E)_r(T,ne,U+1);else if(E)for(E=0;E<U;++E){var de=T.charCodeAt(E);if(255<de)throw wt(X),new Nt("String has UTF-16 code units that do not fit in 8 bits");B()[ne+E>>>0]=de}else for(E=0;E<U;++E)B()[ne+E>>>0]=T[E];return $!==null&&$.push(wt,X),X},Db:Mt,readValueFromPointer:Ba,Eb($){wt($)}})}var Ef=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,ng=(l,_)=>{for(var $=l>>1,T=$+_/2;!($>=T)&&ie()[$>>>0];)++$;if(32<($<<=1)-l&&Ef)return Ef.decode(B().slice(l,$));for($="",T=0;!(T>=_/2);++T){var E=N()[l+2*T>>>1>>>0];if(E==0)break;$+=String.fromCharCode(E)}return $},ag=(l,_,$)=>{if($??=2147483647,2>$)return 0;var T=_;$=($-=2)<2*l.length?$/2:l.length;for(var E=0;E<$;++E){var U=l.charCodeAt(E);N()[_>>>1>>>0]=U,_+=2}return N()[_>>>1>>>0]=0,_-T},sg=l=>2*l.length,og=(l,_)=>{for(var $=0,T="";!($>=_/4);){var E=P()[l+4*$>>>2>>>0];if(E==0)break;++$,65536<=E?(E-=65536,T+=String.fromCharCode(55296|E>>10,56320|1023&E)):T+=String.fromCharCode(E)}return T},ug=(l,_,$)=>{if(_>>>=0,$??=2147483647,4>$)return 0;var T=_;$=T+$-4;for(var E=0;E<l.length;++E){var U=l.charCodeAt(E);if(55296<=U&&57343>=U&&(U=65536+((1023&U)<<10)|1023&l.charCodeAt(++E)),P()[_>>>2>>>0]=U,(_+=4)+4>$)break}return P()[_>>>2>>>0]=0,_-T},lg=l=>{for(var _=0,$=0;$<l.length;++$){var T=l.charCodeAt($);55296<=T&&57343>=T&&++$,_+=4}return _};function dg(l,_,$){if(l>>>=0,_>>>=0,$=yt($>>>=0),_===2)var T=ng,E=ag,U=sg,X=ne=>ie()[ne>>>1>>>0];else _===4&&(T=og,E=ug,U=lg,X=ne=>Y()[ne>>>2>>>0]);kt(l,{name:$,fromWireType:ne=>{for(var de,me=Y()[ne>>>2>>>0],xe=ne+4,Ce=0;Ce<=me;++Ce){var De=ne+4+Ce*_;Ce!=me&&X(De)!=0||(xe=T(xe,De-xe),de===void 0?de=xe:(de+="\0",de+=xe),xe=De+_)}return wt(ne),de},toWireType:(ne,de)=>{if(typeof de!="string")throw new Nt(`Cannot pass non-string to C++ string type ${$}`);var me=U(de),xe=Ti(4+me+_);return Y()[xe>>>2>>>0]=me/_,E(de,xe+4,me+_),ne!==null&&ne.push(wt,xe),xe},Db:Mt,readValueFromPointer:Ba,Eb(ne){wt(ne)}})}function pg(l,_){kt(l>>>=0,{Ub:!0,name:_=yt(_>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function cg(l){La(l>>>0,!s,1,!a,131072,!1),gr()}var Ra=l=>{if(!le)try{if(l(),!(0<se))try{o?Fa(A):Ke(A)}catch(_){_ instanceof re||_=="unwind"||g(0,_)}}catch(_){_ instanceof re||_=="unwind"||g(0,_)}};function Da(l){l>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(P(),l>>>2,l).value.then(yi),l+=128,Atomics.store(P(),l>>>2,1))}var yi=()=>{var l=Ii();l&&(Da(l),Ra(nh))};function fg(l,_){(l>>>=0)==_>>>0?setTimeout(yi):o?postMessage({Hb:l,Cb:"checkMailbox"}):(l=Re[l])&&l.postMessage({Cb:"checkMailbox"})}var Na=[];function hg(l,_,$,T,E){for(_>>>=0,T/=2,Na.length=T,$=E>>>0>>>3,E=0;E<T;E++)Na[E]=v[$+2*E]?v[$+2*E+1]:Be()[$+2*E+1>>>0];return(_?O[_]:s_[l])(...Na)}var mg=()=>{se=0};function gg(l){l>>>=0,o?postMessage({Cb:"cleanupThread",ic:l}):rr(Re[l])}function _g(l){}var bi=(l,_)=>{var $=za[l];if($===void 0)throw l=Qf(l),$=yt(l),wt(l),new Nt(`${_} has unknown type ${$}`);return $},Cf=(l,_,$)=>{var T=[];return l=l.toWireType(T,$),T.length&&(Y()[_>>>2>>>0]=st(T)),l};function yg(l,_,$){return _>>>=0,$>>>=0,l=Qe(l>>>0),_=bi(_,"emval::as"),Cf(_,$,l)}function bg(l,_){return _>>>=0,l=Qe(l>>>0),(_=bi(_,"emval::as")).toWireType(null,l)}var wi=l=>{try{l()}catch(_){K(_)}},Pt=0,bt=null,zf=0,vi=[],Af={},Of={},wg=0,Ma=null,vg=[];function Bf(l){return function(_){if(!le){if(Pt===0){var $=!1,T=!1;_((E=0)=>{if(!le&&(zf=E,$=!0,T)){Pt=2,wi(()=>lh(bt)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),E=!1;try{var U=function(){var de=P()[bt+8>>>2>>>0];return de=_e[Of[de]],--se,de()}()}catch(de){U=de,E=!0}var X=!1;if(!bt){var ne=Ma;ne&&(Ma=null,(E?ne.reject:ne.resolve)(U),X=!0)}if(E&&!X)throw U}}),T=!0,$||(Pt=1,bt=function(){var E=Ti(65548),U=E+12;Y()[E>>>2>>>0]=U,Y()[E+4>>>2>>>0]=U+65536,U=vi[0];var X=Af[U];return X===void 0&&(X=wg++,Af[U]=X,Of[X]=U),U=X,P()[E+8>>>2>>>0]=U,E}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),wi(()=>oh(bt)))}else Pt===2?(Pt=0,wi(dh),wt(bt),bt=null,vg.forEach(Ra)):K(`invalid state: ${Pt}`);return zf}}(_=>{l().then(_)})}function $g(l){return l>>>=0,Bf(async()=>{var _=await Qe(l);return st(_)})}var $i=[];function xg(l,_,$,T){return $>>>=0,T>>>=0,(l=$i[l>>>0])(null,_=Qe(_>>>0),$,T)}var kg={},xi=l=>{var _=kg[l];return _===void 0?yt(l):_};function Sg(l,_,$,T,E){return $>>>=0,T>>>=0,E>>>=0,(l=$i[l>>>0])(_=Qe(_>>>0),_[$=xi($)],T,E)}function Ig(l,_){return _>>>=0,(l=Qe(l>>>0))==Qe(_)}var Rf=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Tg(l){return(l>>>=0)==0?st(Rf()):(l=xi(l),st(Rf()[l]))}var Eg=l=>{var _=$i.length;return $i.push(l),_},Cg=(l,_)=>{for(var $=Array(l),T=0;T<l;++T)$[T]=bi(Y()[_+4*T>>>2>>>0],"parameter "+T);return $},Df=(l,_)=>Object.defineProperty(_,"name",{value:l});function zg(l,_,$){var T=(_=Cg(l,_>>>0)).shift();l--;var E=`return function (obj, func, destructorsRef, args) {
`,U=0,X=[];$===0&&X.push("obj");for(var ne=["retType"],de=[T],me=0;me<l;++me)X.push("arg"+me),ne.push("argType"+me),de.push(_[me]),E+=`  var arg${me} = argType${me}.readValueFromPointer(args${U?"+"+U:""});
`,U+=_[me].Db;return E+=`  var rv = ${$===1?"new func":"func.call"}(${X.join(", ")});
`,T.Ub||(ne.push("emval_returnValue"),de.push(Cf),E+=`  return emval_returnValue(retType, destructorsRef, rv);
`),ne.push(E+`};
`),l=function(xe){var Ce=Function;if(!(Ce instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof Ce} which is not a function`);var De=Df(Ce.name||"unknownFunctionName",function(){});return De.prototype=Ce.prototype,De=new De,(xe=Ce.apply(De,xe))instanceof Object?xe:De}(ne)(...de),$=`methodCaller<(${_.map(xe=>xe.name).join(", ")}) => ${T.name}>`,Eg(Df($,l))}function Ag(l){return l=xi(l>>>0),st(i[l])}function Og(l,_){return _>>>=0,l=Qe(l>>>0),_=Qe(_),st(l[_])}function Bg(l){9<(l>>>=0)&&(St[l+1]+=1)}function Rg(){return st([])}function Dg(l){l=Qe(l>>>0);for(var _=Array(l.length),$=0;$<l.length;$++)_[$]=l[$];return st(_)}function Ng(l){return st(xi(l>>>0))}function Mg(){return st({})}function Pg(l){for(var _=Qe(l>>>=0);_.length;){var $=_.pop();_.pop()($)}Oa(l)}function Ug(l,_,$){_>>>=0,$>>>=0,l=Qe(l>>>0),_=Qe(_),$=Qe($),l[_]=$}function Wg(l,_){return _>>>=0,l=(l=bi(l>>>0,"_emval_take_value")).readValueFromPointer(_),st(l)}function Lg(l,_){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),_>>>=0,l=new Date(1e3*l),P()[_>>>2>>>0]=l.getUTCSeconds(),P()[_+4>>>2>>>0]=l.getUTCMinutes(),P()[_+8>>>2>>>0]=l.getUTCHours(),P()[_+12>>>2>>>0]=l.getUTCDate(),P()[_+16>>>2>>>0]=l.getUTCMonth(),P()[_+20>>>2>>>0]=l.getUTCFullYear()-1900,P()[_+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,P()[_+28>>>2>>>0]=l}var Nf=l=>l%4==0&&(l%100!=0||l%400==0),Mf=[0,31,60,91,121,152,182,213,244,274,305,335],Pf=[0,31,59,90,120,151,181,212,243,273,304,334];function Fg(l,_){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),_>>>=0,l=new Date(1e3*l),P()[_>>>2>>>0]=l.getSeconds(),P()[_+4>>>2>>>0]=l.getMinutes(),P()[_+8>>>2>>>0]=l.getHours(),P()[_+12>>>2>>>0]=l.getDate(),P()[_+16>>>2>>>0]=l.getMonth(),P()[_+20>>>2>>>0]=l.getFullYear()-1900,P()[_+24>>>2>>>0]=l.getDay();var $=(Nf(l.getFullYear())?Mf:Pf)[l.getMonth()]+l.getDate()-1|0;P()[_+28>>>2>>>0]=$,P()[_+36>>>2>>>0]=-60*l.getTimezoneOffset(),$=new Date(l.getFullYear(),6,1).getTimezoneOffset();var T=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|($!=T&&l.getTimezoneOffset()==Math.min(T,$)),P()[_+32>>>2>>>0]=l}function qg(l){l>>>=0;var _=new Date(P()[l+20>>>2>>>0]+1900,P()[l+16>>>2>>>0],P()[l+12>>>2>>>0],P()[l+8>>>2>>>0],P()[l+4>>>2>>>0],P()[l>>>2>>>0],0),$=P()[l+32>>>2>>>0],T=_.getTimezoneOffset(),E=new Date(_.getFullYear(),6,1).getTimezoneOffset(),U=new Date(_.getFullYear(),0,1).getTimezoneOffset(),X=Math.min(U,E);return 0>$?P()[l+32>>>2>>>0]=+(E!=U&&X==T):0<$!=(X==T)&&(E=Math.max(U,E),_.setTime(_.getTime()+6e4*((0<$?X:E)-T))),P()[l+24>>>2>>>0]=_.getDay(),$=(Nf(_.getFullYear())?Mf:Pf)[_.getMonth()]+_.getDate()-1|0,P()[l+28>>>2>>>0]=$,P()[l>>>2>>>0]=_.getSeconds(),P()[l+4>>>2>>>0]=_.getMinutes(),P()[l+8>>>2>>>0]=_.getHours(),P()[l+12>>>2>>>0]=_.getDate(),P()[l+16>>>2>>>0]=_.getMonth(),P()[l+20>>>2>>>0]=_.getYear(),l=_.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function Uf(l,_,$,T,E,U,X){return o?pe(16,1,l,_,$,T,E,U,X):-52}function Wf(l,_,$,T,E,U){if(o)return pe(17,1,l,_,$,T,E,U)}var Lr={},Vg=()=>performance.timeOrigin+performance.now();function Lf(l,_){if(o)return pe(18,1,l,_);if(Lr[l]&&(clearTimeout(Lr[l].id),delete Lr[l]),!_)return 0;var $=setTimeout(()=>{delete Lr[l],Ra(()=>ih(l,performance.timeOrigin+performance.now()))},_);return Lr[l]={id:$,rc:_},0}function Gg(l,_,$,T){l>>>=0,_>>>=0,$>>>=0,T>>>=0;var E=new Date().getFullYear(),U=new Date(E,0,1).getTimezoneOffset();E=new Date(E,6,1).getTimezoneOffset();var X=Math.max(U,E);Y()[l>>>2>>>0]=60*X,P()[_>>>2>>>0]=+(U!=E),l=(_=ne=>{var de=Math.abs(ne);return`UTC${0<=ne?"-":"+"}${String(Math.floor(de/60)).padStart(2,"0")}${String(de%60).padStart(2,"0")}`})(U),_=_(E),E<U?(_r(l,$,17),_r(_,T,17)):(_r(l,T,17),_r(_,$,17))}var Hg=()=>Date.now();function jg(l,_,$){return 0<=l&&3>=l?(l===0?l=Date.now():l=performance.timeOrigin+performance.now(),v[$>>>0>>>3]=BigInt(Math.round(1e6*l)),0):28}var Pa=[],Ff=(l,_)=>{Pa.length=0;for(var $;$=B()[l++>>>0];){var T=$!=105;_+=(T&=$!=112)&&_%8?4:0,Pa.push($==112?Y()[_>>>2>>>0]:$==106?v[_>>>3]:$==105?P()[_>>>2>>>0]:Be()[_>>>3>>>0]),_+=T?8:4}return Pa};function Kg(l,_,$){return l>>>=0,_=Ff(_>>>0,$>>>0),O[l](..._)}function Zg(l,_,$){return l>>>=0,_=Ff(_>>>0,$>>>0),O[l](..._)}var Xg=()=>{};function Yg(l,_){return k(Le(l>>>0,_>>>0))}var Qg=()=>{throw se+=1,"unwind"};function Jg(){return 4294901760}var e_=()=>navigator.hardwareConcurrency;function t_(){return K("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function r_(l){l>>>=0;var _=B().length;if(l<=_||4294901760<l)return!1;for(var $=1;4>=$;$*=2){var T=_*(1+.2/$);T=Math.min(T,l+100663296);e:{T=(Math.min(4294901760,65536*Math.ceil(Math.max(l,T)/65536))-S.buffer.byteLength+65535)/65536|0;try{S.grow(T),ke();var E=1;break e}catch{}E=void 0}if(E)return!0}return!1}var ki=()=>(K("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Fr={},qf=l=>{l.forEach(_=>{ki()})};function i_(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),qf(l),Fr.Mb=ki(),Fr.dc=l,Fr.Mb}function n_(l,_,$){if(l>>>=0,_>>>=0,Fr.Mb==l)var T=Fr.dc;else(T=Error().stack.toString().split(`
`))[0]=="Error"&&T.shift(),qf(T);for(var E=3;T[E]&&ki()!=l;)++E;for(l=0;l<$&&T[l+E];++l)P()[_+4*l>>>2>>>0]=ki();return l}var Ua,Wa={},Vf=()=>{if(!Ua){var l,_={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in Wa)Wa[l]===void 0?delete _[l]:_[l]=Wa[l];var $=[];for(l in _)$.push(`${l}=${_[l]}`);Ua=$}return Ua};function Gf(l,_){if(o)return pe(19,1,l,_);l>>>=0,_>>>=0;var $=0;return Vf().forEach((T,E)=>{var U=_+$;for(E=Y()[l+4*E>>>2>>>0]=U,U=0;U<T.length;++U)ue()[E++>>>0]=T.charCodeAt(U);ue()[E>>>0]=0,$+=T.length+1}),0}function Hf(l,_){if(o)return pe(20,1,l,_);l>>>=0,_>>>=0;var $=Vf();Y()[l>>>2>>>0]=$.length;var T=0;return $.forEach(E=>T+=E.length+1),Y()[_>>>2>>>0]=T,0}function jf(l){return o?pe(21,1,l):52}function Kf(l,_,$,T){return o?pe(22,1,l,_,$,T):52}function Zf(l,_,$,T){return o?pe(23,1,l,_,$,T):70}var a_=[null,[],[]];function Xf(l,_,$,T){if(o)return pe(24,1,l,_,$,T);_>>>=0,$>>>=0,T>>>=0;for(var E=0,U=0;U<$;U++){var X=Y()[_>>>2>>>0],ne=Y()[_+4>>>2>>>0];_+=8;for(var de=0;de<ne;de++){var me=B()[X+de>>>0],xe=a_[l];me===0||me===10?((l===1?b:k)(pf(xe)),xe.length=0):xe.push(me)}E+=ne}return Y()[T>>>2>>>0]=E,0}o||function(){for(var l=i.numThreads-1;l--;)Wr();oe.unshift(()=>{Ve++,function(_){o?_():Promise.all(Je.map(at)).then(_)}(()=>Q())})}();for(var Yf=Array(256),Si=0;256>Si;++Si)Yf[Si]=String.fromCharCode(Si);If=Yf,Nt=i.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError"}},i.InternalError=class extends Error{constructor(l){super(l),this.name="InternalError"}},St.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>St.length/2-5-Aa.length;var _e,s_=[Oe,Te,Dt,cf,ff,mf,gf,_f,yf,bf,wf,vf,$f,xf,kf,Sf,Uf,Wf,Lf,Gf,Hf,jf,Kf,Zf,Xf];(async function(){function l(T,E){return _e=T.exports,_e=function(){var U=_e,X={};for(let[ne,de]of Object.entries(U))X[ne]=typeof de=="function"?(...me)=>{vi.push(ne);try{return de(...me)}finally{le||(vi.pop(),bt&&Pt===1&&vi.length===0&&(Pt=0,se+=1,wi(uh),typeof Fibers<"u"&&Fibers.sc()))}}:de;return X}(),_e=function(){var U=_e,X=de=>me=>de(me)>>>0,ne=de=>()=>de()>>>0;return(U=Object.assign({},U)).Ea=X(U.Ea),U.gb=ne(U.gb),U.ib=X(U.ib),U.ub=X(U.ub),U.vb=ne(U.vb),U.__cxa_get_exception_ptr=X(U.__cxa_get_exception_ptr),U}(),Rt.push(_e.jb),I=E,Q(),_e}Ve++;var _=R();if(i.instantiateWasm)return new Promise(T=>{i.instantiateWasm(_,(E,U)=>{l(E,U),T(E.exports)})});if(o)return new Promise(T=>{ye=E=>{var U=new WebAssembly.Instance(E,R());T(l(U,E))}});je??=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL("/vunk-plus/assets/ort-wasm-simd-threaded.jsep-CLPRrI3A.wasm",self.location.href).href;try{var $=await async function(T){var E=je;if(!q&&typeof WebAssembly.instantiateStreaming=="function"&&!G(E))try{var U=fetch(E,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(U,T)}catch(X){k(`wasm streaming compile failed: ${X}`),k("falling back to ArrayBuffer instantiation")}return async function(X,ne){try{var de=await async function(me){if(!q)try{var xe=await p(me);return new Uint8Array(xe)}catch{}if(me==je&&q)me=new Uint8Array(q);else{if(!m)throw"both async and sync fetching of the wasm failed";me=m(me)}return me}(X);return await WebAssembly.instantiate(de,ne)}catch(me){k(`failed to asynchronously prepare wasm: ${me}`),K(me)}}(E,T)}(_);return l($.instance,$.module)}catch(T){return r(T),Promise.reject(T)}})();var Qf=l=>(Qf=_e.Ea)(l),Jf=()=>(Jf=_e.Fa)();i._OrtInit=(l,_)=>(i._OrtInit=_e.Ga)(l,_),i._OrtGetLastError=(l,_)=>(i._OrtGetLastError=_e.Ha)(l,_),i._OrtCreateSessionOptions=(l,_,$,T,E,U,X,ne,de,me)=>(i._OrtCreateSessionOptions=_e.Ia)(l,_,$,T,E,U,X,ne,de,me),i._OrtAppendExecutionProvider=(l,_,$,T,E)=>(i._OrtAppendExecutionProvider=_e.Ja)(l,_,$,T,E),i._OrtAddFreeDimensionOverride=(l,_,$)=>(i._OrtAddFreeDimensionOverride=_e.Ka)(l,_,$),i._OrtAddSessionConfigEntry=(l,_,$)=>(i._OrtAddSessionConfigEntry=_e.La)(l,_,$),i._OrtReleaseSessionOptions=l=>(i._OrtReleaseSessionOptions=_e.Ma)(l),i._OrtCreateSession=(l,_,$)=>(i._OrtCreateSession=_e.Na)(l,_,$),i._OrtReleaseSession=l=>(i._OrtReleaseSession=_e.Oa)(l),i._OrtGetInputOutputCount=(l,_,$)=>(i._OrtGetInputOutputCount=_e.Pa)(l,_,$),i._OrtGetInputOutputMetadata=(l,_,$,T)=>(i._OrtGetInputOutputMetadata=_e.Qa)(l,_,$,T),i._OrtFree=l=>(i._OrtFree=_e.Ra)(l),i._OrtCreateTensor=(l,_,$,T,E,U)=>(i._OrtCreateTensor=_e.Sa)(l,_,$,T,E,U),i._OrtGetTensorData=(l,_,$,T,E)=>(i._OrtGetTensorData=_e.Ta)(l,_,$,T,E),i._OrtReleaseTensor=l=>(i._OrtReleaseTensor=_e.Ua)(l),i._OrtCreateRunOptions=(l,_,$,T)=>(i._OrtCreateRunOptions=_e.Va)(l,_,$,T),i._OrtAddRunConfigEntry=(l,_,$)=>(i._OrtAddRunConfigEntry=_e.Wa)(l,_,$),i._OrtReleaseRunOptions=l=>(i._OrtReleaseRunOptions=_e.Xa)(l),i._OrtCreateBinding=l=>(i._OrtCreateBinding=_e.Ya)(l),i._OrtBindInput=(l,_,$)=>(i._OrtBindInput=_e.Za)(l,_,$),i._OrtBindOutput=(l,_,$,T)=>(i._OrtBindOutput=_e._a)(l,_,$,T),i._OrtClearBoundOutputs=l=>(i._OrtClearBoundOutputs=_e.$a)(l),i._OrtReleaseBinding=l=>(i._OrtReleaseBinding=_e.ab)(l),i._OrtRunWithBinding=(l,_,$,T,E)=>(i._OrtRunWithBinding=_e.bb)(l,_,$,T,E),i._OrtRun=(l,_,$,T,E,U,X,ne)=>(i._OrtRun=_e.cb)(l,_,$,T,E,U,X,ne),i._OrtEndProfiling=l=>(i._OrtEndProfiling=_e.db)(l),i._JsepOutput=(l,_,$)=>(i._JsepOutput=_e.eb)(l,_,$),i._JsepGetNodeName=l=>(i._JsepGetNodeName=_e.fb)(l);var Ii=()=>(Ii=_e.gb)(),wt=i._free=l=>(wt=i._free=_e.hb)(l),Ti=i._malloc=l=>(Ti=i._malloc=_e.ib)(l),La=(l,_,$,T,E,U)=>(La=_e.lb)(l,_,$,T,E,U),eh=()=>(eh=_e.mb)(),th=(l,_,$,T,E)=>(th=_e.nb)(l,_,$,T,E),rh=l=>(rh=_e.ob)(l),Fa=l=>(Fa=_e.pb)(l),ih=(l,_)=>(ih=_e.qb)(l,_),nh=()=>(nh=_e.rb)(),ah=(l,_)=>(ah=_e.sb)(l,_),Ei=l=>(Ei=_e.tb)(l),qa=l=>(qa=_e.ub)(l),Va=()=>(Va=_e.vb)(),sh=i.dynCall_ii=(l,_)=>(sh=i.dynCall_ii=_e.wb)(l,_),oh=l=>(oh=_e.xb)(l),uh=()=>(uh=_e.yb)(),lh=l=>(lh=_e.zb)(l),dh=()=>(dh=_e.Ab)();return i.stackSave=()=>Va(),i.stackRestore=l=>Ei(l),i.stackAlloc=l=>qa(l),i.setValue=function(l,_,$="i8"){switch($.endsWith("*")&&($="*"),$){case"i1":case"i8":ue()[l>>>0]=_;break;case"i16":N()[l>>>1>>>0]=_;break;case"i32":P()[l>>>2>>>0]=_;break;case"i64":v[l>>>3]=BigInt(_);break;case"float":Ie()[l>>>2>>>0]=_;break;case"double":Be()[l>>>3>>>0]=_;break;case"*":Y()[l>>>2>>>0]=_;break;default:K(`invalid type for setValue: ${$}`)}},i.getValue=function(l,_="i8"){switch(_.endsWith("*")&&(_="*"),_){case"i1":case"i8":return ue()[l>>>0];case"i16":return N()[l>>>1>>>0];case"i32":return P()[l>>>2>>>0];case"i64":return v[l>>>3];case"float":return Ie()[l>>>2>>>0];case"double":return Be()[l>>>3>>>0];case"*":return Y()[l>>>2>>>0];default:K(`invalid type for getValue: ${_}`)}},i.UTF8ToString=Le,i.stringToUTF8=_r,i.lengthBytesUTF8=hf,function l(){if(0<Ve)x=l;else if(o)t(i),Pe();else{for(;0<oe.length;)oe.shift()(i);0<Ve?x=l:(i.calledRun=!0,le||(Pe(),t(i)))}}(),i.PTR_SIZE=4,n}),fs=Li,hs=globalThis.self?.name?.startsWith("em-pthread"),hs&&Li()}),Fi,qi,ms,tt,gs,Kr,_s,ys,Vi,bs,Gi,ws,Hi,vs,ji=ae(()=>{Mi(),Fi=typeof location>"u"?void 0:location.origin,qi=self.location.href>"file:"&&self.location.href<"file;",ms=()=>{{if(qi){let e=URL;return new URL(new e("ort.bundle.min.mjs",self.location.href).href,Fi).href}return self.location.href}},tt=ms(),gs=()=>{if(tt&&!tt.startsWith("blob:"))return tt.substring(0,tt.lastIndexOf("/")+1)},Kr=(e,t)=>{try{let r=t??tt;return(r?new URL(e,r):new URL(e)).origin===Fi}catch{return!1}},_s=(e,t)=>{let r=t??tt;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},ys=(e,t)=>`${t??"./"}${e}`,Vi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},bs=async e=>(await import(e)).default,Gi=(Nh(),br(ds)).default,ws=async()=>{if(!tt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Kr(tt))return[void 0,Gi()];let e=await Vi(tt);return[e,Gi(e)]},Hi=(Mh(),br(cs)).default,vs=async(e,t,r)=>{if(!e&&!t&&Hi&&tt&&Kr(tt))return[void 0,Hi];{let i="ort-wasm-simd-threaded.jsep.mjs",n=e??_s(i,t),a=r&&n&&!Kr(n,t),s=a?await Vi(n):n??ys(i,t);return[a?s:void 0,await bs(s)]}}}),Ki,Zr,$r,Zi,$s,xs,ks,Xi,Ne,Wt=ae(()=>{ji(),Zr=!1,$r=!1,Zi=!1,$s=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},xs=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ks=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Xi=async e=>{if(Zr)return Promise.resolve();if($r)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Zi)throw new Error("previous call to 'initializeWebAssembly()' failed.");$r=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!ks())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!xs())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=$s();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n?.mjs,o=s?.href??s,u=n?.wasm,d=u?.href??u,c=e.wasmBinary,[p,m]=await vs(o,a,r>1),f=!1,g=[];if(t>0&&g.push(new Promise(h=>{setTimeout(()=>{f=!0,h()},t)})),g.push(new Promise((h,w)=>{let y={numThreads:r};if(c)y.wasmBinary=c;else if(d||a)y.locateFile=b=>d??a+b;else if(o&&o.indexOf("blob:")!==0)y.locateFile=b=>new URL(b,o).href;else if(p){let b=gs();b&&(y.locateFile=k=>b+k)}m(y).then(b=>{$r=!1,Zr=!0,Ki=b,h(),p&&URL.revokeObjectURL(p)},b=>{$r=!1,Zi=!0,w(b)})})),await Promise.race(g),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ne=()=>{if(Zr&&Ki)return Ki;throw new Error("WebAssembly is not initialized yet.")}}),lt,Xr,Ae,Yi=ae(()=>{Wt(),lt=(e,t)=>{let r=Ne(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Xr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")Xr(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},Ae=e=>{let t=Ne(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Ss,Ph=ae(()=>{Wt(),Yi(),Ss=e=>{let t=Ne(),r=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let a=0;return e?.tag!==void 0&&(a=lt(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,a),r===0&&Ae("Can't create run options."),e?.extra!==void 0&&Xr(e.extra,"",new WeakSet,(s,o)=>{let u=lt(s,i),d=lt(o,i);t._OrtAddRunConfigEntry(r,u,d)!==0&&Ae(`Can't set a run config entry: ${s} - ${o}.`)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),a}}}),Is,Ts,Es,xr,Cs,zs,Uh=ae(()=>{Wt(),Yi(),Is=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ts=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Es=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},xr=(e,t,r,i)=>{let n=lt(t,i),a=lt(r,i);Ne()._OrtAddSessionConfigEntry(e,n,a)!==0&&Ae(`Can't set a session config entry: ${t} - ${r}.`)},Cs=async(e,t,r)=>{for(let i of t){let n=typeof i=="string"?i:i.name,a=[];switch(n){case"webnn":if(n="WEBNN",typeof i!="string"){let c=i?.deviceType;c&&xr(e,"deviceType",c,r)}break;case"webgpu":if(n="JS",typeof i!="string"){let c=i;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);xr(e,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let s=lt(n,r),o=a.length,u=0,d=0;if(o>0){u=Ne()._malloc(o*Ne().PTR_SIZE),r.push(u),d=Ne()._malloc(o*Ne().PTR_SIZE),r.push(d);for(let c=0;c<o;c++)Ne().setValue(u+c*Ne().PTR_SIZE,a[c][0],"*"),Ne().setValue(d+c*Ne().PTR_SIZE,a[c][1],"*")}await Ne()._OrtAppendExecutionProvider(e,s,u,d,o)!==0&&Ae(`Can't append execution provider: ${n}.`)}},zs=async e=>{let t=Ne(),r=0,i=[],n=e||{};Es(n);try{let a=Is(n.graphOptimizationLevel??"all"),s=Ts(n.executionMode??"sequential"),o=typeof n.logId=="string"?lt(n.logId,i):0,u=n.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let d=n.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof n.optimizedModelFilePath=="string"?lt(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,o,u,d,c),r===0&&Ae("Can't create session options."),n.executionProviders&&await Cs(r,n.executionProviders,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);xr(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[p,m]of Object.entries(n.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let f=lt(p,i);t._OrtAddFreeDimensionOverride(r,f,m)!==0&&Ae(`Can't set a free dimension override: ${p} - ${m}.`)}return n.extra!==void 0&&Xr(n.extra,"",new WeakSet,(p,m)=>{xr(r,p,m,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&Ae("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),Lt,vt,Ft,Yr,Qr,Qi,Ji,en,we=ae(()=>{Lt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},vt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Ft=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},Yr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Qr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Qi=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ji=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",en=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),tn,As=ae(()=>{Mi(),tn=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let u=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let s=0;for(;;){let{done:o,value:u}=await n.read();if(o)break;let d=u.byteLength;new Uint8Array(a,s,d).set(u),s+=d}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Os,Bs,Rs,Ds,rn,Ns,Se,$t=ae(()=>{we(),Os=["V","I","W","E","F"],Bs=(e,t)=>{console.log(`[${Os[e]},${new Date().toISOString()}]${t}`)},rn=(e,t)=>{Rs=e,Ds=t},Ns=(e,t)=>{let r=Qr(e),i=Qr(Rs);r>=i&&Bs(r,typeof t=="function"?t():t)},Se=(...e)=>{Ds&&Ns(...e)}}),Ms,sr,j,Jr,Ps,Us,Ws,ve=ae(()=>{Ms=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},sr=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let o=Ms.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(o===void 0)return;[s[a-2],s[a-1]]=o}for(let o=r?3:1;o<=a;o++){let u=i-o<0?1:e[i-o],d=n-o<0?1:t[n-o];if(u!==d&&u>1&&d>1)return;let c=Math.max(u,d);if(u&&d)s[a-o]=Math.max(u,d);else{if(c>1)return;s[a-o]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},j=class Ci{static size(t){return Ci.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Ci.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Ci.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},Jr=class qr{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length;o++)if(o<a.length){if(a[o]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let o=0;o<i.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=i[o]||s[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,o){if(o){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)qr.adjustPadAndReturnShape(t[u+(s?1:2)],r[u],i[u],n[u],a,u,u+t.length-2,o)}}static computePoolOutputShape(t,r,i,n,a,s,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return qr.computeShapeHelper(t,r,u,i,n,a,s,o),u}static computeConvOutputShape(t,r,i,n,a,s,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return qr.computeShapeHelper(!1,t,u,i,n,a,s,o),u}static computeShapeHelper(t,r,i,n,a,s,o,u){if(t)for(let d=0;d<r.length-2;d++)i.push(1);else for(let d=0;d<r.length-2;d++)i.push(qr.adjustPadAndReturnShape(r[d+2],n[d],a[d],s[d],o,d,d+r.length-2,u))}static adjustPadAndReturnShape(t,r,i,n,a,s,o,u){let d=i*(n-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return a[s]=0,a[o]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+n-t;return a[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),a[o]=c-a[s],Math.floor((t+c-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[o]-d)/r+1)}},Ps=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,o;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let u=-1;if(i?(o=r[0],u=1):(o=r[1],u=0),r[u]!==s)throw new Error("dimension mismatch");if(a<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(n&&!sr.isValidBroadcast(n,[a,o]))throw new Error("gemm: invalid bias shape for broadcast");return[a,o,s]}},Us=-34028234663852886e22,Ws=34028234663852886e22}),nn,Ls=ae(()=>{we(),nn=(e,t)=>new(Yr(t))(e)}),an,sn,on,Fs,un,qs,ln,dn,pn,Vs,Gs,Wh=ae(()=>{we(),$t(),an=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),sn=(e,t)=>{if(t==="int32")return e;let r=an.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(Yr(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let o=0;o<n;o++){let u=a[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(u)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},on=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Fs=1,un=()=>Fs++,qs=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ln=(e,t)=>{let r=an.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},dn=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ln(this.dataType,this.tensorShape)}destroy(){Se("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=on(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},pn=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a;if(!n.opSupportLimits().input.dataTypes.includes(t)){if(a=qs.get(t),!a||!n.opSupportLimits().input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${t}`);Se("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==ln(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,s,!0,!0,a),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=sn(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Se("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?on(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Vs=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=un();return this.tensorTrackersById.set(e,new pn(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){Se("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){Se("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=un(),s=new dn({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new pn(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let o=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,r)){Se("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let p=this.freeTensors.splice(d,1)[0];return p.sessionId=e,p}Se("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let u=await o.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new dn({sessionId:e,context:o,tensor:u,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Gs=(...e)=>new Vs(...e)}),kr,Hs,js,Lh=ae(()=>{we(),Wt(),Ls(),Wh(),$t(),kr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Hs=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},js=class{constructor(e){this.tensorManager=Gs(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,rn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Se("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Se("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)Se("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Hs(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Se("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=kr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){Se("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=kr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!Ne().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Se("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return nn(r,t)}}registerMLTensor(e,t,r,i){let n=kr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return Se("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,r,i,n,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=a.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(t,t+r).buffer,c;switch(n.dataType){case"float32":c=new Float32Array(d);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":c=new Int32Array(d);break;case"uint32":c=new Uint32Array(d);break;case"int64":if(s){let p=sn(new Uint8Array(d),"int64");c=new Int32Array(p.buffer),n.dataType="int32"}else c=new BigInt64Array(d);break;case"uint64":c=new BigUint64Array(d);break;case"int8":c=new Int8Array(d);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return Se("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=this.mlContextBySessionId.get(e),n=kr.get(Lt(t));return typeof n>"u"?!1:r?!!i?.opSupportLimits().input.dataTypes.includes(n):!!i?.opSupportLimits().output.dataTypes.includes(n)}flush(){}}}),cn=ae(()=>{}),fn,ei,ti,Ks,Zs,hn,mn,Xs,Ys,Fh=ae(()=>{$t(),cn(),fn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ei=[],ti=e=>Math.ceil(Number(e)/16)*16,Ks=e=>{for(let t=0;t<ei.length;t++){let r=ei[t];if(e<=r)return r}return Math.ceil(e/16)*16},Zs=1,hn=()=>Zs++,mn=async(e,t,r,i)=>{let n=ti(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let o=a.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(o,0,r)),u}else return new Uint8Array(o.slice(0,r))}finally{a.destroy()}},Xs=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of fn)ei.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=ti(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(r,i,n)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),o.destroy(),Se("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=ti(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return Se("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=hn();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),Se("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Se("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Ks(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let o=(n?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:hn(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),Se("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Se("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await mn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=fn.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Se("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Ys=(...e)=>new Xs(...e)}),Qs,ze,We=ae(()=>{Qs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ze=e=>new Qs(e)}),or,ri,Fe,He,ge,Ue,gn,ur,Tt,he,Sr,Z,fe,Js,_n,eo,to,$e=ae(()=>{we(),ve(),or=64,ri=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Fe=(e,t=1)=>{let r=ri(e,t);return typeof r=="string"?r:r[0]},He=(e,t=1)=>{let r=ri(e,t);return typeof r=="string"?r:r[1]},ge=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:j.computeStrides(r)})}),t},Ue=e=>e%4===0?4:e%2===0?2:1,gn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,ur=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Tt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,he=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Sr=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,o=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=ri(t,n),c=typeof d=="string"?d:d[1],p=typeof d=="string"?d:d[0],m={indices:u,value:c,storage:p,tensor:t},f=B=>typeof B=="string"?B:`${B}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=a?"uniforms.":"",w=`${h}${e}_shape`,y=`${h}${e}_strides`,b="";for(let B=0;B<s-1;B++)b+=`
    let dim${B} = current / ${he(y,B,s)};
    let rest${B} = current % ${he(y,B,s)};
    indices[${B}] = dim${B};
    current = rest${B};
    `;b+=`indices[${s-1}] = current;`;let k=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${b}
    return indices;
  }`,S=B=>(g.offsetToIndices=!0,s<2?B:`o2i_${e}(${B})`),I=[];if(s>=2)for(let B=s-1;B>=0;B--)I.push(`${he(y,B,s)} * (indices[${B}])`);let A=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,C=B=>(g.indicesToOffset=!0,s<2?B:`i2o_${e}(${B})`),M=(...B)=>s===0?"0u":`${m.indices}(${B.map(f).join(",")})`,D=(B,N)=>s<2?`${B}`:`${he(B,N,s)}`,W=(B,N,ie)=>s<2?`${B}=${ie};`:`${he(B,N,s)}=${ie};`,J={},z=(B,N)=>{g.broadcastedIndicesToOffset=!0;let ie=`${N.name}broadcastedIndicesTo${e}Offset`;if(ie in J)return`${ie}(${B})`;let P=[];for(let Y=s-1;Y>=0;Y--){let Ie=N.indicesGet("outputIndices",Y+N.rank-s);P.push(`${D(y,Y)} * (${Ie} % ${D(w,Y)})`)}return J[ie]=`fn ${ie}(outputIndices: ${N.type.indices}) -> u32 {
             return ${P.length>0?P.join("+"):"0u"};
           }`,`${ie}(${B})`},F=(B,N)=>(()=>{if(m.storage===m.value)return`${e}[${B}]=${N};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${B}]=vec2<u32>(u32(${N}), select(0u, 0xFFFFFFFFu, ${N} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${B}]=vec2<u32>(u32(${N}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${B}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${N}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),v=B=>(()=>{if(m.storage===m.value)return`${e}[${B}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${B}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${B}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${B}] & 0xFFu), bool(${e}[${B}] & 0xFF00u), bool(${e}[${B}] & 0xFF0000u), bool(${e}[${B}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),V=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${c} {
    return ${v(`i2o_${e}(indices)`)};
  }`,ee=s<2?"":(()=>{let B=o.map(ie=>`d${ie}: u32`).join(", "),N=o.map(ie=>`d${ie}`).join(", ");return`
  fn get_${e}(${B}) -> ${c} {
    return get_${e}ByIndices(${M(N)});
  }`})(),q=(...B)=>{if(B.length!==s)throw new Error(`indices length must be ${s}`);let N=B.map(f).join(",");return s===0?v("0u"):s===1?v(N[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${N})`)},le=B=>s<2?v(B):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${B})`),G=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${c}) {
    ${F(`i2o_${e}(indices)`,"value")}
  }`,ue=s<2?"":(()=>{let B=o.map(ie=>`d${ie}: u32`).join(", "),N=o.map(ie=>`d${ie}`).join(", ");return`
  fn set_${e}(${B}, value: ${c}) {
    set_${e}ByIndices(${M(N)}, value);
  }`})();return{impl:()=>{let B=[],N=!1;return g.offsetToIndices&&(B.push(k),N=!0),g.indicesToOffset&&(B.push(A),N=!0),g.broadcastedIndicesToOffset&&(Object.values(J).forEach(ie=>B.push(ie)),N=!0),g.set&&(B.push(ue),N=!0),g.setByIndices&&(B.push(G),N=!0),g.get&&(B.push(ee),N=!0),g.getByIndices&&(B.push(V),N=!0),!a&&N&&B.unshift(`const ${w} = ${m.indices}(${r.join(",")});`,`const ${y} = ${m.indices}(${j.computeStrides(r).join(",")});`),B.join(`
`)},type:m,offsetToIndices:S,indicesToOffset:C,broadcastedIndicesToOffset:z,indices:M,indicesGet:D,indicesSet:W,set:(...B)=>{if(B.length!==s+1)throw new Error(`indices length must be ${s}`);let N=B[s];if(typeof N!="string")throw new Error("value must be string");let ie=B.slice(0,s).map(f).join(",");return s===0?F("0u",N):s===1?F(ie[0],N):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${ie}, ${N})`)},setByOffset:F,setByIndices:(B,N)=>s<2?F(B,N):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${B}, ${N});`),get:q,getByOffset:v,getByIndices:le,usage:i,name:e,strides:y,shape:w,rank:s}},Z=(e,t,r,i=1)=>Sr(e,t,r,"input",i),fe=(e,t,r,i=1)=>Sr(e,t,r,"output",i),Js=(e,t,r)=>Sr(e,t,r,"atomicOutput",1),_n=(e,t,r,i=1)=>Sr(e,t,r,"internal",i),eo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=or){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},to=(e,t)=>new eo(e,t)}),ro,yn,io,no,ao,so,rt,oo,uo,Et=ae(()=>{we(),ve(),We(),$e(),ro=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},yn=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),io=(e,t)=>j.sortBasedOnPerm(e,yn(e.length,t)),no=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},ao=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},so=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},rt=(e,t)=>{let r=e.dataType,i=e.dims.length,n=yn(i,t),a=io(e.dims,n),s=e.dims,o=a,u=i<2||so(n,e.dims),d;if(u)return d=g=>{let h=Z("input",r,s,4),w=fe("output",r,o,4);return`
  ${g.registerUniform("output_size","u32").declareVariables(h,w)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let g=j.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(g/4)}]}},getShaderSource:d};let{newShape:c,newPerm:p}=ao(e.dims,n),m=j.areEqual(p,[2,3,1]),f=j.areEqual(p,[3,1,2]);if(c.length===2||m||f){s=m?[c[0],c[1]*c[2]]:f?[c[0]*c[1],c[2]]:c,o=[s[1],s[0]];let g=16;return d=h=>{let w=Z("a",r,s.length),y=fe("output",r,o.length);return`
  ${h.registerUniform("output_size","u32").declareVariables(w,y)}
  var<workgroup> tile : array<array<${y.type.value}, ${g+1}>, ${g}>;
  ${h.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${y.setByIndices(`${y.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let h=j.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/g),y:Math.ceil(o[0]/g)},programUniforms:[{type:12,data:h},...ge(s,o)]}},getShaderSource:d}}return d=g=>{let h=Z("a",r,s.length),w=fe("output",r,o.length);return`
  ${g.registerUniform("output_size","u32").declareVariables(h,w)}

  ${no(n,i,h,w)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let g=j.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...ge(s,o)]}},getShaderSource:d}},oo=(e,t)=>{ro(e.inputs,t.perm),e.compute(rt(e.inputs[0],t.perm))},uo=e=>ze({perm:e.perm})}),lo,po,co,fo,ho,mo,go,_o,yo,bo,dt,wo,vo,$o,xo,ko,So,Io,To,Eo,Co,qh=ae(()=>{we(),ve(),$e(),wn(),Et(),lo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},po={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},co={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},fo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ho=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},mo=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},go=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},_o=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},yo=(e,t)=>{let r=[];if(!_o(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},bo=(e,t,r,i,n,a,s)=>{let o=r[0].dims,u=j.size(a),d=j.size(s),c=Z("_A",r[0].dataType,o),p=fe("output",n,a),m=64;u===1&&(m=256);let f=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,g=h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${co[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${lo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${po[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${i==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${fo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},dt=(e,t,r,i)=>{let n=e.inputs.length===1?r:bn(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((f,g)=>g));let s=j.normalizeAxes(a,e.inputs[0].dims.length),o=s,u=e.inputs[0],d=yo(o,e.inputs[0].dims.length);d.length>0&&(u=e.compute(rt(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=ho(o.length,u.dims.length));let[c,p]=mo(u.dims,o),m=c;n.keepDims&&(m=go(c,s)),e.compute(bo(t,n.cacheKey,[u],i,e.inputs[0].dataType,m,p),{inputs:[u]})},wo=(e,t)=>{dt(e,"ReduceMeanShared",t,"mean")},vo=(e,t)=>{dt(e,"ReduceL1Shared",t,"l1")},$o=(e,t)=>{dt(e,"ReduceL2Shared",t,"l2")},xo=(e,t)=>{dt(e,"ReduceLogSumExpShared",t,"logSumExp")},ko=(e,t)=>{dt(e,"ReduceMaxShared",t,"max")},So=(e,t)=>{dt(e,"ReduceMinShared",t,"min")},Io=(e,t)=>{dt(e,"ReduceProdShared",t,"prod")},To=(e,t)=>{dt(e,"ReduceSumShared",t,"sum")},Eo=(e,t)=>{dt(e,"ReduceSumSquareShared",t,"sumSquare")},Co=(e,t)=>{dt(e,"ReduceLogSumShared",t,"logSum")}}),pt,zo,ii,bn,ct,Ao,Oo,Bo,Ro,Do,No,Mo,Po,Uo,Wo,ft,Lo,Fo,qo,Vo,Go,Ho,jo,Ko,Zo,Xo,wn=ae(()=>{we(),ve(),We(),$e(),qh(),pt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},zo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],ii=(e,t,r,i,n,a,s=!1,o=!1)=>{let u=[],d=r[0].dims,c=d.length,p=j.normalizeAxes(n,c),m=!o&&p.length===0;d.forEach((h,w)=>{m||p.indexOf(w)>=0?s&&u.push(1):u.push(h)});let f=u.length,g=j.size(u);return{name:e,shaderCache:t,getShaderSource:h=>{let w=[],y=Z("_A",r[0].dataType,c),b=fe("output",a,f),k=i(y,b,p),S=k[2];for(let I=0,A=0;I<c;I++)m||p.indexOf(I)>=0?(s&&A++,S=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${k[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${y.indicesSet("input_indices",I,`j${I}`)}
                  ${S}
                }`):(w.push(`${y.indicesSet("input_indices",I,b.indicesGet("output_indices",A))};`),A++);return`

        ${h.registerUniform("output_size","u32").declareVariables(y,b)}

        ${h.mainStart()}
          ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${y.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${w.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${S}
          ${k[3]}
          ${k.length===4?b.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:a}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...ge(d,u)]})}},bn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),ze({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ct=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:bn(n,r);e.compute(ii(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?zo:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Ao=(e,t)=>{pt(e.inputs),ct(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Oo=(e,t)=>{pt(e.inputs),ct(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Bo=(e,t)=>{pt(e.inputs),ct(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Ro=(e,t)=>{pt(e.inputs),ct(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Do=(e,t)=>{pt(e.inputs),ct(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},No=(e,t)=>{pt(e.inputs),ct(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},Mo=(e,t)=>{pt(e.inputs),ct(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Po=(e,t)=>{pt(e.inputs),ct(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Uo=(e,t)=>{pt(e.inputs),ct(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Wo=(e,t)=>{pt(e.inputs),ct(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},ft=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},Lo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?No(e,t):wo(e,t)},Fo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Oo(e,t):vo(e,t)},qo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bo(e,t):$o(e,t)},Vo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ro(e,t):xo(e,t)},Go=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Do(e,t):ko(e,t)},Ho=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Mo(e,t):So(e,t)},jo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Po(e,t):Io(e,t)},Ko=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Uo(e,t):To(e,t)},Zo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wo(e,t):Eo(e,t)},Xo=(e,t)=>{ft(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ao(e,t):Co(e,t)}}),vn,Yo,Qo,$n,Vh=ae(()=>{we(),We(),wn(),vn=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Yo=(e,t)=>{vn(e.inputs);let r=(i,n,a)=>{let s=[];for(let o=0;o<i.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(ii("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Qo=(e,t)=>{vn(e.inputs);let r=(i,n,a)=>{let s=[];for(let o=0;o<i.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(ii("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},$n=e=>ze(e)}),Jo,ni,eu,tu,ru,Ir,iu,nu,xn=ae(()=>{we(),ve(),cn(),$e(),Jo=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],d=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=n.dims[0]/3,m=p,f=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let g=d;if(p!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==p+m+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(m!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(h=s.dims[3])}let w=g+h,y=-1,b=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:y,inputHiddenSize:c,hiddenSize:p,vHiddenSize:f,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},ni=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,eu=(e,t,r,i,n,a,s,o)=>{let u=Ue(s?1:a),d=64,c=a/u;c<d&&(d=32);let p=Math.ceil(a/u/d),m=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:p}],f=Fe(e.dataType,u),g=He(1,u),h=["type"];s&&h.push("type"),o&&h.push("type");let w=y=>{let b=fe("x",e.dataType,e.dims,u),k=[b],S=s?Z("seq_lens",s.dataType,s.dims):void 0;S&&k.push(S);let I=o?Z("total_sequence_length_input",o.dataType,o.dims):void 0;I&&k.push(I);let A=He(e.dataType),C=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${y.registerUniforms(C).declareVariables(...k)}
  ${y.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${ni(S,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${g}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${g}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${g}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${g}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${f};${u}`,inputDependencies:h},getShaderSource:w,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:m})}},tu=(e,t,r,i,n,a,s,o,u)=>{let d=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,d],p=e>1&&i,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,f=p?[a.batchSize,m,d,a.headSize]:void 0,g=a.nReps?a.nReps:1,h=a.scale===0?1/Math.sqrt(a.headSize):a.scale,w=Ue(a.headSize),y=a.headSize/w,b=12,k={x:Math.ceil(d/b),y:Math.ceil(a.sequenceLength/b),z:a.batchSize*a.numHeads},S=[{type:12,data:a.sequenceLength},{type:12,data:y},{type:12,data:d},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:h},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:g}],I=p&&i&&j.size(i.dims)>0,A=["type","type"];I&&A.push("type"),n&&A.push("type"),o&&A.push("type"),u&&A.push("type");let C=[{dims:c,dataType:t.dataType,gpuDataType:0}];p&&C.push({dims:f,dataType:t.dataType,gpuDataType:0});let M=D=>{let W=Z("q",t.dataType,t.dims,w),J=Z("key",r.dataType,r.dims,w),z=[W,J];if(I){let G=Z("past_key",i.dataType,i.dims,w);z.push(G)}n&&z.push(Z("attention_bias",n.dataType,n.dims));let F=o?Z("seq_lens",o.dataType,o.dims):void 0;F&&z.push(F);let v=u?Z("total_sequence_length_input",u.dataType,u.dims):void 0;v&&z.push(v);let V=fe("output",t.dataType,c),ee=[V];p&&ee.push(fe("present_key",t.dataType,f,w));let q=He(1,w),le=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${W.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${W.type.storage}, ${b*b}>;
  ${D.registerUniforms(le).declareVariables(...z,...ee)}
  ${D.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${ni(F,v,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${q}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${q}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(w){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${w}`)}})()};
        output[outputIdx] = ${V.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${w};${n!==void 0};${i!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:C,dispatchGroup:k,programUniforms:S}),getShaderSource:M}},ru=(e,t,r,i,n,a,s=void 0,o=void 0)=>{let u=a+n.kvSequenceLength,d=n.nReps?n.nReps:1,c=n.vHiddenSize*d,p=e>1&&i,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=p?[n.batchSize,m,u,n.headSize]:void 0,g=[n.batchSize,n.sequenceLength,c],h=12,w={x:Math.ceil(n.vHeadSize/h),y:Math.ceil(n.sequenceLength/h),z:n.batchSize*n.numHeads},y=[{type:12,data:n.sequenceLength},{type:12,data:u},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:d}],b=p&&i&&j.size(i.dims)>0,k=["type","type"];b&&k.push("type"),s&&k.push("type"),o&&k.push("type");let S=[{dims:g,dataType:t.dataType,gpuDataType:0}];p&&S.push({dims:f,dataType:t.dataType,gpuDataType:0});let I=A=>{let C=Z("probs",t.dataType,t.dims),M=Z("v",r.dataType,r.dims),D=[C,M];b&&D.push(Z("past_value",i.dataType,i.dims));let W=s?Z("seq_lens",s.dataType,s.dims):void 0;s&&D.push(W);let J=o?Z("total_sequence_length_input",o.dataType,o.dims):void 0;o&&D.push(J);let z=[fe("output",t.dataType,g)];p&&z.push(fe("present_value",t.dataType,f));let F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${C.type.value}, ${h*h}>;
  var<workgroup> tileV: array<${C.type.value}, ${h*h}>;
  ${A.registerUniforms(F).declareVariables(...D,...z)}
  ${A.mainStart([h,h,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${ni(W,J,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${C.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:S,dispatchGroup:w,programUniforms:y}),getShaderSource:I}},Ir=(e,t,r,i,n,a,s,o,u,d,c=void 0,p=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),f=m>1?d.pastSequenceLength:0,g=f+d.kvSequenceLength,h=u&&j.size(u.dims)>0?u:void 0,w=[t,r];m>1&&s&&j.size(s.dims)>0&&w.push(s),h&&w.push(h),c&&w.push(c),p&&w.push(p);let y=e.compute(tu(m,t,r,s,h,d,f,c,p),{inputs:w,outputs:m>1?[-1,1]:[-1]})[0];e.compute(eu(y,d.batchSize,d.numHeads,f,d.sequenceLength,g,c,p),{inputs:c&&p?[y,c,p]:[y],outputs:[]});let b=[y,i];m>1&&o&&j.size(o.dims)>0&&b.push(o),c&&b.push(c),p&&b.push(p),e.compute(ru(m,y,i,o,d,f,c,p),{inputs:b,outputs:m>1?[0,2]:[0]})},iu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=p=>{let m=fe("output_q",u[0].dataType,r),f=fe("output_k",u[0].dataType,r),g=fe("output_v",u[0].dataType,r),h=Z("input",u[0].dataType,u[0].dims),w=Z("weight",u[1].dataType,u[1].dims),y=Z("bias",u[2].dataType,u[2].dims),b=h.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s*s}>;
  var<workgroup> tileWeightK: array<${b}, ${s*s}>;
  var<workgroup> tileWeightV: array<${b}, ${s*s}>;
  ${p.registerUniforms(k).declareVariables(h,w,y,m,f,g)}
  ${p.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},nu=(e,t)=>{let r=Jo(e.inputs,t),[i,n,a]=iu(e,r);return Ir(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),au,su,ou,uu,Gh=ae(()=>{ut(),we(),ve(),We(),$e(),au=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((o,u)=>{if(o!==i[u])throw new Error(`${a}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},su=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?Ue(a[a.length-1]):1,o=n==="NHWC"&&a.length>1?s:1,u=j.size(a)/s,d=i,c=d?a.length:a,p=Z("x",e[0].dataType,e[0].dims,s),m=Z("scale",e[1].dataType,e[1].dims,o),f=Z("bias",e[2].dataType,e[2].dims,o),g=Z("inputMean",e[3].dataType,e[3].dims,o),h=Z("inputVar",e[4].dataType,e[4].dims,o),w=fe("y",e[0].dataType,c,s),y=()=>{let k="";if(i)k=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")k=`
            ${w.indicesSet("outputIndices","0","0")}
            let cOffset = ${w.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let S=1;S<m.rank;S++)k+=`cIndices[${S}] = outputIndices[${S}];`;k+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return k},b=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(p,m,f,g,h,w)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${w.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${w.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...ge(a)]:[{type:12,data:u}]})}},ou=e=>ze(e),uu=(e,t)=>{let{inputs:r,outputCount:i}=e,n=ou({...t,outputCount:i});if(Me.webgpu.validateInputContent&&au(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(su(r,n))}}),lu,du,pu,Hh=ae(()=>{ve(),$e(),lu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},du=e=>{let t=e[0].dims,r=e[0].dims[2],i=j.size(t)/4,n=e[0].dataType,a=Z("input",n,t,4),s=Z("bias",n,[r],4),o=Z("residual",n,t,4),u=fe("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(a,s,o,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},pu=e=>{lu(e.inputs),e.compute(du(e.inputs))}}),cu,Ee,fu,hu,mu,gu,_u,yu,bu,wu,vu,$u,xu,ku,Su,Iu,Tr,Tu,ai,Eu,Cu,zu,Au,Ou,Bu,Ru,Du,Nu,Mu,Pu,Uu,Wu,Lu,Fu,qu,kn,Vu,Sn,In,Gu,Hu,ju,Ku,Zu,Xu,Tn=ae(()=>{we(),ve(),We(),$e(),cu=(e,t,r,i,n,a,s)=>{let o=Math.ceil(t/4),u="";typeof n=="string"?u=`${n}(a)`:u=n("a");let d=Z("inputData",r,[o],4),c=fe("outputData",i,[o],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(d,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},Ee=(e,t,r,i,n,a=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(j.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:d=>cu(d,j.size(e.dims),e.dataType,a,r,i,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(j.size(d[0].dims)/64/4)},programUniforms:u})}},fu=e=>{e.compute(Ee(e.inputs[0],"Abs","abs"))},hu=e=>{e.compute(Ee(e.inputs[0],"Acos","acos"))},mu=e=>{e.compute(Ee(e.inputs[0],"Acosh","acosh"))},gu=e=>{e.compute(Ee(e.inputs[0],"Asin","asin"))},_u=e=>{e.compute(Ee(e.inputs[0],"Asinh","asinh"))},yu=e=>{e.compute(Ee(e.inputs[0],"Atan","atan"))},bu=e=>{e.compute(Ee(e.inputs[0],"Atanh","atanh"))},wu=e=>ze(e),vu=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Ee(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},$u=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ze({min:t,max:r})},xu=(e,t)=>{let r=t||$u(e.inputs),i=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},ku=e=>{e.compute(Ee(e.inputs[0],"Ceil","ceil"))},Su=e=>{e.compute(Ee(e.inputs[0],"Cos","cos"))},Iu=e=>{e.compute(Ee(e.inputs[0],"Cosh","cosh"))},Tr=e=>ze(e),Tu=(e,t)=>{let r=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ai=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Eu=e=>{let t=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ai(t)))},Cu=e=>{e.compute(Ee(e.inputs[0],"Exp","exp"))},zu=e=>{e.compute(Ee(e.inputs[0],"Floor","floor"))},Au=e=>{let t=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ai(t)))},Ou=(e,t)=>{let r=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Bu=e=>{e.compute(Ee(e.inputs[0],"Not",t=>`!${t}`))},Ru=e=>{e.compute(Ee(e.inputs[0],"Neg",t=>`-${t}`))},Du=e=>{e.compute(Ee(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Nu=e=>{let t=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Mu=e=>{e.compute(Ee(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Pu=e=>ze(e),Uu=(e,t)=>{let r=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Wu=e=>{e.compute(Ee(e.inputs[0],"Sin","sin"))},Lu=e=>{e.compute(Ee(e.inputs[0],"Sinh","sinh"))},Fu=e=>{e.compute(Ee(e.inputs[0],"Sqrt","sqrt"))},qu=e=>{e.compute(Ee(e.inputs[0],"Tan","tan"))},kn=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Vu=e=>{e.compute(Ee(e.inputs[0],"Tanh",kn))},Sn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${kn("v")};
}
`,In=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Gu=e=>{let t=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"FastGelu",In,Sn(t),void 0,e.inputs[0].dataType))},Hu=(e,t)=>{let r=He(e.inputs[0].dataType);return e.compute(Ee(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ju=e=>{e.compute(Ee(e.inputs[0],"Log","log"))},Ku=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Zu=e=>`quick_gelu_impl(${e})`,Xu=(e,t)=>{let r=He(e.inputs[0].dataType);e.compute(Ee(e.inputs[0],"QuickGelu",Zu,Ku(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Yu,Qu,Ju,jh=ae(()=>{ve(),$e(),Tn(),Yu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Qu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=Z("input",e[0].dataType,e[0].dims,4),i=Z("bias",e[0].dataType,[e[0].dims[2]],4),n=fe("output",e[0].dataType,t,4),a=j.size(t)/4,s=Fe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,n)}

  ${ai(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ju=e=>{Yu(e.inputs),e.compute(Qu(e.inputs))}}),el,tl,ht,rl,il,nl,al,sl,ol,ul,ll,dl,pl,Kh=ae(()=>{we(),ve(),$e(),el=(e,t,r,i,n,a,s,o,u,d,c,p)=>{let m,f;typeof o=="string"?m=f=(b,k)=>`${o}((${b}),(${k}))`:typeof o=="function"?m=f=o:(m=o.scalar,f=o.vector);let g=fe("outputData",c,i.length,4),h=Z("aData",u,t.length,4),w=Z("bData",d,r.length,4),y;if(n)if(a){let b=j.size(t)===1,k=j.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;b||k?y=g.setByOffset("global_idx",f(b?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),k?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"))):y=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${w.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",f(s||S?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?w.getByOffset("offsetB / 4u"):`${w.type.value}(${w.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=g.setByOffset("global_idx",f(h.getByOffset("global_idx"),w.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(k,S,I="")=>{let A=`aData[indexA${S}][componentA${S}]`,C=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${g.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${h.broadcastedIndicesToOffset(`outputIndices${S}`,g)};
            let offsetB${S} = ${w.broadcastedIndicesToOffset(`outputIndices${S}`,g)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${k}[${S}] = ${I}(${m(A,C)});
          `};c===9?y=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:y=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(h,w,g)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},tl=(e,t,r,i,n,a,s=r.dataType)=>{let o=r.dims.map(h=>Number(h)??1),u=i.dims.map(h=>Number(h)??1),d=!j.areEqual(o,u),c=o,p=j.size(o),m=!1,f=!1,g=[d];if(d){let h=sr.calcShape(o,u,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");c=h.slice(),p=j.size(c);let w=j.size(o)===1,y=j.size(u)===1,b=o.length>0&&o[o.length-1]%4===0,k=u.length>0&&u[u.length-1]%4===0;g.push(w),g.push(y),g.push(b),g.push(k);let S=1;for(let I=1;I<c.length;I++){let A=o[o.length-I],C=u[u.length-I];if(A===C)S*=A;else break}S%4===0?(f=!0,m=!0):(w||y||b||k)&&(m=!0)}else m=!0;return g.push(m),{name:e,shaderCache:{hint:t+g.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>el(h,o,u,c,m,d,f,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(j.size(c)/4)},...ge(o,u,c)]})}},ht=(e,t,r,i,n,a)=>{e.compute(tl(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},rl=e=>{ht(e,"Add",(t,r)=>`${t}+${r}`)},il=e=>{ht(e,"Div",(t,r)=>`${t}/${r}`)},nl=e=>{ht(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},al=e=>{ht(e,"Mul",(t,r)=>`${t}*${r}`)},sl=e=>{let t=Z("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ht(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ol=e=>{ht(e,"Sub",(t,r)=>`${t}-${r}`)},ul=e=>{ht(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},ll=e=>{ht(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},dl=e=>{ht(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},pl=e=>{ht(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),cl,fl,hl,ml,gl,_l,Zh=ae(()=>{we(),ve(),We(),$e(),cl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,o)=>{if(o!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((u,d)=>{if(d!==t&&u!==i.dims[d])throw new Error("non concat dimensions must match")})}})},fl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,hl=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let a=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(a):n===0?i.push(`if (inputIndex == ${n}u) { ${a} }`):n===r-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${n}) { ${a} }`)}return i.join(`
`)},ml=(e,t,r,i)=>{let n=j.size(r),a=new Array(e.length),s=new Array(e.length),o=0,u=[],d=[],c=[{type:12,data:n}];for(let h=0;h<e.length;++h)o+=e[h].dims[t],a[h]=o,d.push(e[h].dims.length),s[h]=Z(`input${h}`,i,d[h]),u.push("rank"),c.push({type:12,data:a[h]});for(let h=0;h<e.length;++h)c.push(...ge(e[h].dims));c.push(...ge(r));let p=fe("output",i,r.length),m=p.indicesGet("indices",t),f=Array.from(Array(a.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),g=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let w=0;w<e.length;w++)h.registerUniform(`sizeInConcatAxis${w}`,"u32");return h.declareVariables(...s,p)})()}

  ${fl(a.length,f)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${f});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${hl(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:g}},gl=(e,t)=>{let r=e.inputs,i=r[0].dims,n=j.normalizeAxis(t.axis,i.length);cl(r,n);let a=i.slice();a[n]=r.reduce((o,u)=>o+(u.dims.length>n?u.dims[n]:0),0);let s=r.filter(o=>j.size(o.dims)>0);e.compute(ml(s,n,a,r[0].dataType),{inputs:s})},_l=e=>ze({axis:e.axis})}),qt,Vt,Gt,En,Ht=ae(()=>{we(),ve(),qt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Vt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Gt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},En=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Us,Ws];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),qe,yl,Cn=ae(()=>{qe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},yl=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),bl,Xh=ae(()=>{bl=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Er,zn,An=ae(()=>{we(),ve(),$e(),Ht(),Er=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,o)=>`
      if (${he(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,he(n,o+a,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},zn=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],d=o[o.length-1],c=s[s.length-1],p=Ue(d),m=Ue(c),f=Ue(u),g=j.size(r)/p/f,h=e.length>2,w=i?i.slice(0,-2):r.slice(0,-2),y=[j.size(w),u,d],b=[{type:12,data:g},{type:12,data:u},{type:12,data:d},{type:12,data:c}];Vt(t,b),b.push(...ge(w,s,o)),h&&b.push(...ge(e[2].dims)),b.push(...ge(y));let k=S=>{let I=_n("batch_dims",e[0].dataType,w.length),A=Z("a",e[0].dataType,s.length,m),C=Z("b",e[1].dataType,o.length,p),M=fe("output",e[0].dataType,y.length,p),D=Fe(M.type.tensor),W=qt(t,M.type.value,D),J=[A,C],z="";if(h){let V=n?p:1;J.push(Z("bias",e[2].dataType,e[2].dims.length,V)),z=`${n?`value += bias[col / ${V}];`:`value += ${M.type.value}(bias[row + i]);`}`}let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Gt(t,F);let v=()=>{let V=`var a_data: ${A.type.value};`;for(let ee=0;ee<m;ee++)V+=`
              let b_data${ee} = b[(b_offset + (k + ${ee}) * uniforms.N + col) / ${p}];`;for(let ee=0;ee<f;ee++){V+=`a_data = a[(a_offset + (row + ${ee}) * uniforms.K + k) / ${m}];`;for(let q=0;q<m;q++)V+=`
            values[${ee}] = fma(${C.type.value}(a_data${m===1?"":`[${q}]`}), b_data${q}, values[${ee}]);
`}return V};return`
  ${S.registerUniforms(F).registerInternalVariables(I).declareVariables(...J,M)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${A.type.indices};
    ${Er("a_indices",A,A.rank-2,I.rank,"batch_indices")}
    ${A.indicesSet("a_indices",A.rank-2,0)}
    ${A.indicesSet("a_indices",A.rank-1,0)}
    let a_offset = ${A.indicesToOffset("a_indices")};

    var b_indices: ${C.type.indices};
    ${Er("b_indices",C,C.rank-2,I.rank,"batch_indices")}
    ${C.indicesSet("b_indices",C.rank-2,0)}
    ${C.indicesSet("b_indices",C.rank-1,0)}
    let b_offset = ${C.indicesToOffset("b_indices")};
    var values: array<${M.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${v()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${z}
      ${W}
      let cur_indices = ${M.type.indices}(batch, row + i, col);
      let offset = ${M.indicesToOffset("cur_indices")};
      ${M.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${m};${f};${n}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:k}}}),wl,vl,On,Bn,$l,Rn,xl,si,Dn=ae(()=>{we(),ve(),$e(),Ht(),An(),Cn(),wl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,vl=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,On=(e,t,r="f32",i,n=!1,a=32,s=!1,o=32)=>{let u=t[1]*e[1],d=t[0]*e[0],c=n?u:a,p=n?a:u,m=c/t[0],f=a/t[1];if(!((n&&m===4&&e[1]===4||!n&&(m===3||m===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${c/m}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${wl(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${vl(n,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Bn=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,$l=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Rn=(e,t,r="f32",i,n=!1,a=32,s=!1,o=32,u=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],p=n?d:a,m=n?a:d;if(!(m%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let f=m/t[1],g=p/t[0],h=a/t[1],w=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${Bn(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Bn(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${$l(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${w}
  }
`},xl=(e,t,r,i,n=!1)=>{let[a,s,o,u]=i,d=Fe(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${qe(e,d)} {
      var value = ${qe(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Er("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${qe(e,d)} {
      var value = ${qe(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Er("bIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${qe(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${qe(e,d)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},si=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),d=o.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),p=j.size(c),m=s[s.length-2],f=s[s.length-1],g=o[o.length-1],h=f%4===0&&g%4===0,w=m<=8?[4,1,1]:[4,4,1],y=[8,8,1],b=[Math.ceil(g/y[0]/w[0]),Math.ceil(m/y[1]/w[1]),Math.ceil(p/y[2]/w[2])],k=h?4:1,S=[...u,m,f/k],I=S.length,A=[...d,f,g/k],C=A.length,M=[p,m,g/k],D=[{type:6,data:m},{type:6,data:g},{type:6,data:f}];Vt(t,D),D.push(...ge(c,S,A));let W=["rank","rank"],J=e.length>2;J&&(D.push(...ge(e[2].dims)),W.push("rank")),D.push(...ge(M));let z=F=>{let v=c.length,V=_n("batchDims",e[0].dataType,v,1),ee=Fe(e[0].dataType),q=Z("a",e[0].dataType,I,k),le=Z("b",e[1].dataType,C,k),G=fe("result",e[0].dataType,M.length,k),ue=[q,le];if(J){let Y=n?k:1;ue.push(Z("bias",e[2].dataType,e[2].dims.length,Y))}let B=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Gt(t,B);let N=Fe(G.type.tensor),ie=qt(t,G.type.value,N),P=xl(k,J,ie,[V,q,le,G],n);return`
  ${F.registerUniforms(B).registerInternalVariables(V).declareVariables(...ue,G)}
  ${P}
  ${h?On(w,y,ee,V):Rn(w,y,ee,V)}
                   `};return{name:"MatMul",shaderCache:{hint:`${w};${t.activation};${h};${n}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:D}),getShaderSource:z}}}),kl,Sl,Yh=ae(()=>{we(),$t(),$e(),Ht(),Cn(),Xh(),Dn(),kl=(e,t,r,i,n=!1,a,s=4,o=4,u=4,d="f32")=>{let c=D=>{switch(D){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},p=D=>{switch(D){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",w=e?"row":"col",y=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${w} / outWidth;
    let outCol = ${w} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${qe(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${h}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${qe(s,d)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${qe(s,d)}(0.0);`,S=e?i&&r?p(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(o)}
    }
    return ${qe(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(o)}
    }
    return ${qe(o,d)}(0.0);`,I=qe(u,d),A=qe(e?s:o,d),C=qe(e?o:s,d),M=qt(a,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?k:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?S:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${yl(n)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Sl=(e,t,r,i,n,a,s,o,u)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],p=r[0],m=d?r[2]:r[3],f=d?r[1]:r[2],g=d?r[3]:r[1],h=d&&(c%4===0||c%3===0)&&g%4===0,w=d?g:m*f,y=d?m*f:g,b=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],S=[Math.ceil(w/b[0]/k[0]),Math.ceil(y/b[1]/k[1]),Math.ceil(p/b[2]/k[2])];Se("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let I=h?d&&c%4!==0?3:4:1,A=b[1]*k[1],C=b[0]*k[0],M=Math.max(b[0]*I,b[1]),D=i%A===0,W=n%C===0,J=a%M===0,z=h?[I,4,4]:[1,1,1],F=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Vt(t,F),F.push(...ge(e[0].dims,e[1].dims));let v=["rank","rank"];s&&(F.push(...ge(e[2].dims)),v.push("rank")),F.push(...ge(r));let V=ee=>{let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Gt(t,q);let le=h?4:1,G=Fe(e[0].dataType),ue=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${G}>`:G}) {
        result[flatIndex] = ${h?`vec4<${G}>`:G}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${G}>`:G}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,B=Z("x",e[0].dataType,e[0].dims.length,I===3?1:I),N=Z("w",e[1].dataType,e[1].dims.length,le),ie=[B,N],P=fe("result",e[0].dataType,r.length,le);if(s){let Y=Z("bias",e[2].dataType,e[2].dims.length,le);ie.push(Y),ue+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${G}>`:G} {
          return bias[coords.${d?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${bl("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${ee.registerUniforms(q).declareVariables(...ie,P)}
        ${ue}
        ${kl(d,D,W,J,s,t,z[0],z[1],z[2],G)}
        ${h?On(k,b,G,void 0,!d,M):Rn(k,b,G,void 0,!d,M,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${h};${D};${W};${J};${A};${C};${M}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:F}),getShaderSource:V}}}),Il,Nn,Cr,Tl,Mn,El,Cl,zl,Qh=ae(()=>{we(),$t(),ve(),$e(),Ht(),Cn(),Il=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Nn=e=>typeof e=="number"?[e,e,e]:e,Cr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Tl=(e,t,r,i=1)=>{let n=Cr(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},Mn=(e,t,r,i,n)=>{n==null&&(n=Tl(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},El=(e,t,r,i,n,a,s,o,u,d)=>{let c,p,m,f;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Mn([t,r,i,1],[o,u,d],1,[n,a,s],e);p=g[0],m=g[1],f=g[2]}else if(Array.isArray(e)){if(!e.every((h,w,y)=>h===y[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Mn([t,r,i,1],[o,u,d],1,[n,a,s],e[0]);p=g[0],m=g[1],f=g[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/n),m=Math.ceil(r/a),f=Math.ceil(i/s);let g=(p-1)*n+o-t,h=(m-1)*a+u-r,w=(f-1)*s+d-i,y=Math.floor(g/2),b=g-y,k=Math.floor(h/2),S=h-k,I=Math.floor(w/2),A=w-I;c={top:k,bottom:S,left:I,right:A,front:y,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:m,outWidth:f}},Cl=(e,t,r,i,n,a=!1,s="channelsLast")=>{let o,u,d,c,p;if(s==="channelsLast")[o,u,d,c,p]=e;else if(s==="channelsFirst")[o,p,u,d,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,f,g,h]=t,[w,y,b]=Nn(r),[k,S,I]=Nn(i),A=Cr(f,k),C=Cr(g,S),M=Cr(h,I),{padInfo:D,outDepth:W,outHeight:J,outWidth:z}=El(n,u,d,c,w,y,b,A,C,M),F=a?m*p:m,v=[0,0,0,0,0];return s==="channelsFirst"?v=[o,F,W,J,z]:s==="channelsLast"&&(v=[o,W,J,z,F]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:d,inWidth:c,inChannels:p,outDepth:W,outHeight:J,outWidth:z,outChannels:F,padInfo:D,strideDepth:w,strideHeight:y,strideWidth:b,filterDepth:f,filterHeight:g,filterWidth:h,effectiveFilterDepth:A,effectiveFilterHeight:C,effectiveFilterWidth:M,dilationDepth:k,dilationHeight:S,dilationWidth:I,inShape:e,outShape:v,filterShape:t}},zl=(e,t,r,i,n,a)=>{let s=a==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],u={x:r.map((w,y)=>y)},d=[Math.ceil(Il(u.x.map(w=>r[w]))/o[0]),1,1];Se("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let c=1,p=j.size(r),m=[{type:12,data:p},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Vt(t,m),m.push(...ge(e[0].dims,e[1].dims));let f=["rank","rank"],g=e.length===3;g&&(m.push(...ge(e[2].dims)),f.push("rank")),m.push(...ge(r));let h=w=>{let y=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Gt(t,y);let b=1,k=Fe(e[0].dataType),S=Z("x",e[0].dataType,e[0].dims.length,c),I=Z("W",e[1].dataType,e[1].dims.length,b),A=[S,I],C=fe("result",e[0].dataType,r.length,b),M="";if(g){let J=Z("bias",e[2].dataType,e[2].dims.length,b);A.push(J),M+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${k} {
          return bias[${s?he("coords",4,5):he("coords",1,5)}];
        }`}let D=qe(c,k),W=qt(t,D,k);return`
            ${M}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${w.registerUniforms(y).declareVariables(...A,C)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${C.offsetToIndices("global_idx")};
              let batch = ${he("coords",0,S.rank)};
              let d2 = ${s?he("coords",S.rank-1,S.rank):he("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?he("coords",1,S.rank):he("coords",2,S.rank)},
              ${s?he("coords",2,S.rank):he("coords",3,S.rank)},
              ${s?he("coords",3,S.rank):he("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?he("uniforms.x_shape",1,S.rank):he("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?he("uniforms.x_shape",2,S.rank):he("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?he("uniforms.x_shape",3,S.rank):he("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?he("uniforms.x_shape",4,S.rank):he("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${g?"value = value + getBiasByOutputCoords(coords)":""};
              ${W}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${c};${g}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:m}),getShaderSource:h}}}),Al,Ol,Jh=ae(()=>{we(),ve(),$e(),Ht(),Al=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u=t.format==="NHWC",d=u?r[3]:r[1],c=d/t.group,p=u&&c>=4?Ue(d):1,m=j.size(r)/p,f=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Vt(t,f),f.push(...ge(s,[o[0],o[1],o[2],o[3]/p]));let g=n?["rank","rank","rank"]:["rank","rank"];f.push(...ge([r[0],r[1],r[2],r[3]/p]));let h=w=>{let y=fe("output",e[0].dataType,r.length,p),b=Fe(y.type.tensor),k=qt(t,y.type.value,b),S=Z("x",e[0].dataType,s.length),I=Z("w",e[1].dataType,o.length,p),A=[S,I];n&&A.push(Z("b",e[2].dataType,e[2].dims,p));let C=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Gt(t,C);let M=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${w.registerUniforms(C).declareVariables(...A,y)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${M}
    ${a}
    ${k}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:f}),getShaderSource:h}},Ol=(e,t,r,i)=>{let n=e.length>2,a=Ue(r[3]),s=Ue(r[2]),o=j.size(r)/a/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Vt(t,p),p.push(...ge(u,d,c));let m=(s-1)*t.strides[1]+d[1],f=g=>{let h=fe("output",e[0].dataType,c.length,a),w=Fe(h.type.tensor),y=qt(t,h.type.value,w),b=Z("x",e[0].dataType,u.length,a),k=Z("w",e[1].dataType,d.length,a),S=[b,k];n&&S.push(Z("b",e[2].dataType,e[2].dims,a));let I=n?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Gt(t,A),`
  ${g.registerUniforms(A).declareVariables(...S,h)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${m}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${y}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${m};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:f}}}),Bl,oi,Rl,ui,Pn,Un,Dl,Nl,Wn,em=ae(()=>{ve(),Yh(),Qh(),Dn(),Jh(),Ht(),An(),Et(),Bl=(e,t,r,i,n,a)=>{let s=e[0],o=e.slice(a?1:2,a?3:4),u=o.length,d=t[0],c=t.slice(2).map((m,f)=>m+(m-1)*(r[f]-1)),p=o.map((m,f)=>m+i[f]+i[f+u]).map((m,f)=>Math.floor((m-c[f]+n[f])/n[f]));return p.splice(0,0,s),p.splice(a?3:1,0,d),p},oi=[2,3,1,0],Rl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},ui=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();Jr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},Pn=e=>{let t=En(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,o=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Un=(e,t,r,i)=>{let n=r.format==="NHWC",a=Bl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let A=[t[0]];if(n){let C=e.kernelCustomData.wT??e.compute(rt(t[1],oi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C),A.push(C)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Ol(A,r,a,i),{inputs:A}):e.compute(Al(A,r,a,i),{inputs:A});return}let s=t.length===3,o=t[0].dims[n?1:2],u=t[0].dims[n?2:3],d=t[0].dims[n?3:1],c=t[1].dims[2],p=t[1].dims[3],m=a[n?1:2],f=a[n?2:3],g=a[n?3:1],h=n&&c===o&&p===u&&r.pads[0]===0&&r.pads[1]===0;if(h||c===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=a[0],C,M,D,W=[];if(n){let F=e.kernelCustomData.wT??e.compute(rt(t[1],oi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=F),h){let v=o*u*d;C=t[0].reshape([1,A,v]),M=F.reshape([1,v,g]),D=[1,A,g]}else C=t[0].reshape([A,o*u,d]),M=F.reshape([1,d,g]),D=[A,m*f,g];W.push(C),W.push(M)}else C=t[0].reshape([A,d,o*u]),M=t[1].reshape([1,g,d]),D=[A,g,m*f],W.push(M),W.push(C);s&&W.push(t[2]);let J=D[2],z=W[0].dims[W[0].dims.length-1];J<8&&z<8?e.compute(zn(W,r,a,D,n,i),{inputs:W}):e.compute(si(W,r,a,D,n,i),{inputs:W});return}let w=!0,y=e.kernelCustomData.wT??e.compute(rt(t[1],oi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let b=[t[0],y];s&&b.push(t[2]);let k=n?m*f:g,S=n?g:m*f,I=c*p*d;e.compute(Sl(b,r,a,k,S,I,s,w,i),{inputs:b})},Dl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=ui({...t,pads:n,strides:a,dilations:s,kernelShape:o},i);Un(e,i,u,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Nl=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=ui(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Cl(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(zl(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Wn=(e,t)=>{if(Rl(e.inputs,t),e.inputs[0].dims.length===3)Dl(e,t);else if(e.inputs[0].dims.length===5)Nl(e,e.inputs,t);else{let r=ui(t,e.inputs);Un(e,e.inputs,r)}}}),Ml,tm=ae(()=>{we(),$t(),ve(),$e(),Ml=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,o=e[1].dims,u=o[2]/s,d=o[3],c=a?Ue(u):1,p=a&&d===1&&u>=4,m=p?Math.floor(u/4)*4:Math.floor(u/c)*c,f=u-m,g=a?Ue(d):1,h=a?d===1?c:g:1,w=j.size(n)/g,y=[Math.ceil(w/64),1,1];Se("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);let b=["rank","rank"],k=[t.strides[0],t.strides[1]],S=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[t.dilations[0],t.dilations[1]],A=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],C=[A[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),A[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],M=[{type:12,data:w},{type:12,data:k},{type:12,data:S},{type:12,data:I},{type:12,data:A},{type:6,data:C},{type:12,data:m},{type:12,data:u},{type:12,data:d},...ge(e[0].dims,e[1].dims)];i&&(M.push(...ge(e[2].dims)),b.push("rank")),M.push(...ge(n));let D=W=>{let J=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:A.length},{name:"pads",type:"i32",length:C.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],z=Fe(e[0].dataType),F=a?1:2,v=a?2:3,V=a?3:1,ee=Z("W",e[1].dataType,e[1].dims.length,h),q=Z("Dy",e[0].dataType,e[0].dims.length,c),le=[q,ee];i&&le.push(Z("bias",e[2].dataType,[n[V]].length,g));let G=fe("result",e[0].dataType,n.length,g),ue=()=>{let ie="";if(p)c===4?ie+=`
        let xValue = ${q.getByOffset("x_offset")};
        let wValue = ${ee.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?ie+=`
          dotProd = dotProd + dot(vec4<${z}>(${q.getByOffset("x_offset")}, ${q.getByOffset("x_offset + 1u")}), vec4<${z}>(${ee.getByOffset("w_offset")}, ${ee.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(ie+=`
          dotProd = dotProd + dot(vec4<${z}>(${q.getByOffset("x_offset")}, ${q.getByOffset("x_offset + 1u")}, ${q.getByOffset("x_offset + 2u")}, ${q.getByOffset("x_offset + 3u")}), vec4<${z}>(${ee.getByOffset("w_offset")}, ${ee.getByOffset("w_offset + 1u")}, ${ee.getByOffset("w_offset + 2u")}, ${ee.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ie+=`
                  let xValue = ${a?q.getByOffset(`${q.indicesToOffset(`${q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):q.get("batch","inputChannel","idyR","idyC")};
        `,c===1)ie+=`
          let w_offset = ${ee.indicesToOffset(`${ee.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${ee.getByOffset(`w_offset / ${h}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let P=0;P<c;P++)ie+=`
            let wValue${P} = ${ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${P}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${P}] * wValue${P};`;return ie},B=()=>{if(f===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let ie="";if(c===1){ie+="dotProd = dotProd";for(let P=0;P<f;P++)ie+=`
            + ${q.getByOffset(`x_offset + ${P}`)} * ${ee.getByOffset(`w_offset + ${P}`)}`;ie+=";"}else if(c===2){if(f!==2)throw new Error(`Invalid inputChannelsRemainder ${f}.`);ie+=`
          let xValue = ${q.getByOffset("x_offset")};
          let wValue = ${ee.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ie},N=`
            let outputIndices = ${G.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${G.indicesGet("outputIndices",0)};
            let d1 = ${G.indicesGet("outputIndices",V)};
            let r = ${G.indicesGet("outputIndices",F)};
            let c = ${G.indicesGet("outputIndices",v)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${G.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${z}(dyRCorner) + ${z}(wR)) / ${z}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${z}(uniforms.Dy_shape[${F}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${z}(dyCCorner) + ${z}(wC)) / ${z}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${z}(uniforms.Dy_shape[${v}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${q.indicesToOffset(`${q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${ee.indicesToOffset(`${ee.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${h};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${ue()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${B()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${g}]`:""};
            ${G.setByOffset("global_idx","value")};
          `;return`
    ${W.registerUniforms(J).declareVariables(...le,G)}
      ${W.mainStart()}
      ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${N}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${h}${g}${p}${f}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:M}),getShaderSource:D}}}),Pl,Ul,Wl,Ln,Ll,Fl,Fn,ql,Vl,rm=ae(()=>{tm(),Ht(),Et(),Pl=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,Ul=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},Wl=(e,t,r,i,n,a,s,o,u,d)=>{let c=e.length-2,p=d.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let m=e[0],f=t[o?3:1]*n;for(let g=0,h=e.length-c-(o?1:0);g<c;++g,++h){let w=e[h],y=p?w*s[g]:d[g],b=Pl(w,s[g],a[g],t[h],r[g],y);Ul(b,i,a,g,g+c),p&&d.push(s[g]*(w-1)+u[g]+(t[h]-1)*r[g]+1-a[g]-a[g+c])}d.splice(0,0,m),d.splice(o?3:1,0,f)},Ln=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,m)=>p*m,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}let d=e.strides.slice();if(d.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;d=new Array(p).fill(1)}Wl(o,r,u,e.autoPad,e.group,n,d,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:u,strides:d}),c},Ll=e=>{let t=En(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group,s=e.kernelShape,o=e.pads,u=e.strides,d=e.wIsConst(),c=e.outputPadding,p=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:p,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Fl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Fn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(rt(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(Ml(a,r,i),{inputs:a})},ql=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let u=t.outputPadding;u=[0].concat(u);let d=Ln({...t,pads:o,strides:s,dilations:a,kernelShape:n,outputPadding:u},i);Fn(e,i,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Vl=(e,t)=>{if(Fl(e.inputs,t),e.inputs[0].dims.length===3)ql(e,t);else{let r=Ln(t,e.inputs);Fn(e,e.inputs,r)}}}),Gl,Hl,jl,im=ae(()=>{we(),ve(),We(),$e(),Gl=(e,t,r,i)=>{let n=j.size(t),a=t.length,s=Z("input",e,a),o=fe("output",e,a),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=j.normalizeAxis(u,a),c=p=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,f=he("uniforms.input_shape","uniforms.axis",a),g=i.reverse?m+(i.exclusive?" + 1":""):"0",h=i.reverse?f:m+(i.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:d},...ge(t,t)]}),getShaderSource:c}},Hl=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(Gl(i,r,n,t),{inputs:[0]})},jl=e=>{let t=e.exclusive===1,r=e.reverse===1;return ze({exclusive:t,reverse:r})}}),Kl,Zl,Xl,Yl,Ql,nm=ae(()=>{we(),ve(),We(),$e(),Kl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Zl=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},Xl=(e,t)=>{let r,i,n,a,s,o,u=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";u?([r,i,n,a]=e.dims,s=c?[r,i,n,d,d,a/d**2]:[r,i,n,a/d**2,d,d],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,d,d,a/d**2,i,n]:[r,a/d**2,d,d,i,n],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),m=p.dims.length,f=e.dataType,g=Z("a",f,m),h=fe("output",f,m),w=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(g,h)}

  ${Zl(o,m,g,h)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let b=u?[r,i*d,n*d,a/d**2]:[r,a/d**2,i*d,n*d],k=j.size(b),S=p.dims,I=j.sortBasedOnPerm(S,o);return{outputs:[{dims:b,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...ge(S,I)]}},getShaderSource:w}},Yl=(e,t)=>{Kl(e.inputs),e.compute(Xl(e.inputs[0],t))},Ql=e=>ze({blocksize:e.blocksize,mode:e.mode,format:e.format})}),li,zr,qn,Jl,ed,td,rd,Vn,id,nd,ad,am=ae(()=>{we(),ve(),We(),$e(),li="[a-zA-Z]|\\.\\.\\.",zr="("+li+")+",qn="^"+zr+"$",Jl="("+zr+",)*"+zr,ed="^"+Jl+"$",td=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},rd=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(ed)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let s=e[a].dims.slice();if(!n.match(RegExp(qn)))throw new Error("Invalid LHS term");let o=this.processTerm(n,!0,s,a);this.lhs.push(o)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(zr)))throw new Error("Invalid RHS");i.match(RegExp(li,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],o=0;if(!e.match(RegExp(qn))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(li,"g")),d=new td(i);return u?.forEach((c,p)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let m=n-u.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(o,o+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let f=0;f<s.length;f++){let g=String.fromCharCode(48+f);d.addSymbol(g,p+f),this.addSymbol(g,r[o++],i)}}else d.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[o++],i)}),d}},Vn=e=>e+"_max",id=(e,t,r,i)=>{let n=e.map(d=>d.length).map((d,c)=>Z(`input${c}`,t,d)),a=j.size(i),s=fe("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),u=d=>{let c=[],p="var prod = 1.0;",m="var sum = 0.0;",f="sum += prod;",g=[],h=[],w=[],y=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,I)=>{if(r.rhs.symbolToIndices.has(I)){let A=r.rhs.symbolToIndices.get(I)?.[0];A!==void 0&&r.lhs.forEach((C,M)=>{if(S.inputIndices.includes(M)){let D=C.symbolToIndices.get(I);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(W=>{c.push(`${n[M].indicesSet(`input${M}Indices`,W,s.indicesGet("outputIndices",A))}`)})}})}else r.lhs.forEach((A,C)=>{if(S.inputIndices.includes(C)){let M=A.symbolToIndices.get(I);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(D=>{g.push(`${n[C].indicesSet(`input${C}Indices`,D,`${I}`)}`)}),y.push(`prod *= ${n[C].getByIndices(`input${C}Indices`)};`)}}),h.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Vn(I)}; ${I}++) {`),w.push("}")});let k=b?[...c,`let sum = ${n.map((S,I)=>S.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,m,...h,...g,p,...y,f,...w];return`
            ${d.registerUniforms(o.map(S=>({name:`${Vn(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((S,I)=>`var input${I}Indices: ${n[I].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));d.push({type:12,data:a});let c=e.map((p,m)=>[...ge(p)]).reduce((p,m)=>p.concat(m),d);return c.push(...ge(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:u}},nd=(e,t)=>{let r=new rd(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(id(n,e.inputs[0].dataType,r,i))},ad=e=>{let t=e.equation.replace(/\s+/g,"");return ze({equation:t})}}),sd,Gn,od,ud,ld,sm=ae(()=>{we(),ve(),$e(),sd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Gn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},od=(e,t)=>e.length>t.length?Gn(e,t):Gn(t,e),ud=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=od(t,r),n=e[0].dataType,a=n===9||j.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,o=a||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(j.size(i)/o),d=p=>{let m=Z("input",n,t.length,s),f=fe("output",n,i.length,o),g;if(n===9){let h=(w,y,b="")=>`
          let outputIndices${y} = ${f.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${m.broadcastedIndicesToOffset(`outputIndices${y}`,f)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${w}[${y}] = ${b}(${m.getByOffset(`index${y}`)}[component${y}]);
        `;g=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(m,f)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},c=[{type:12,data:u},...ge(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},ld=e=>{sd(e.inputs),e.compute(ud(e.inputs),{inputs:[0]})}}),dd,pd,om=ae(()=>{we(),ve(),$e(),Tn(),dd=e=>{let t=e[0].dataType,r=j.size(e[0].dims),i=j.size(e[1].dims),n=i%4===0,a=s=>{let o=Z("x",t,[1],4),u=Z("bias",t,[1],4),d=fe("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${u.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,m=n?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(o,u,d)}

    ${Sn(He(t))}

    ${s.mainStart(or)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",In("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/or/4)}})}},pd=e=>{e.inputs.length<2||j.size(e.inputs[1].dims)===0?Gu(e):e.compute(dd(e.inputs))}}),cd,fd,hd,md,um=ae(()=>{we(),ve(),We(),$e(),cd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},fd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=j.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let o=r[a],u=e[0].dataType===9?4:1,d=Math.ceil(j.size(s)/u),c=[{type:12,data:d},{type:6,data:o},{type:12,data:a},...ge(e[0].dims,e[1].dims,s)],p=m=>{let f=Z("data",e[0].dataType,e[0].dims.length,u),g=Z("inputIndices",e[1].dataType,e[1].dims.length),h=fe("output",e[0].dataType,s.length,u),w=b=>{let k=i.length,S=`var indicesIndices${b}  = ${g.type.indices}(0);`;for(let I=0;I<k;I++)S+=`${k>1?`indicesIndices${b}[${I}]`:`indicesIndices${b}`} = ${s.length>1?`outputIndices${b}[uniforms.axis + ${I}]`:`outputIndices${b}`};`;S+=`
          var idx${b} = ${g.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${f.type.indices};
        `;for(let I=0,A=0;I<n;I++)I===a?(S+=`${n>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = u32(idx${b});`,A+=k):(S+=`${n>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = ${s.length>1?`outputIndices${b}[${A}]`:`outputIndices${b}`};`,A++);return S},y;if(e[0].dataType===9){let b=(k,S,I="")=>`
          let outputIndices${S} = ${h.offsetToIndices(`outputOffset + ${S}u`)};
          ${w(S)};
          let offset${S} = ${f.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${k}[${S}] = ${I}(${f.getByOffset(`index${S}`)}[component${S}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${w("")};
      let value = ${f.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,h)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:p}},hd=e=>ze({axis:e.axis}),md=(e,t)=>{let r=e.inputs;cd(r),e.compute(fd(e.inputs,t))}}),gd,_d,yd,lm=ae(()=>{we(),ve(),$e(),gd=(e,t,r,i,n,a,s,o,u)=>{let d=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:o},{type:12,data:u}],c=[a];d.push(...ge(t.dims,c));let p=m=>{let f=Z("indices_data",t.dataType,t.dims.length),g=fe("input_slice_offsets_data",12,1,1),h=[f,g],w=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(w).declareVariables(...h)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},_d=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],o=j.sizeToDimension(a,a.length-1),u=j.sizeFromDimension(i,t.batchDims+s),d=j.sizeToDimension(i,t.batchDims),c=j.sizeFromDimension(i,t.batchDims),p=o/d,m=new Array(s),f=u;for(let S=0;S<s;++S)m[s-1-S]=f,f*=i[t.batchDims+s-1-S];let g=gd(e,r[1],m,t.batchDims,i,o,p,c,s),h=t.batchDims+s;if(h>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let w=a.slice(0,-1).concat(i.slice(h)),y=j.size(w),b=[{type:12,data:y},{type:12,data:u},...ge(r[0].dims,g.dims,w)],k=S=>{let I=Z("data",r[0].dataType,r[0].dims.length),A=Z("slice_offsets",12,g.dims.length),C=fe("output",r[0].dataType,w.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,A,C)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:w,dataType:n}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:b}),getShaderSource:k},{inputs:[r[0],g]})},yd=e=>({batchDims:e.batch_dims,cacheKey:""})}),bd,wd,vd,$d,dm=ae(()=>{we(),ve(),We(),$e(),bd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=j.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((o,u)=>u===r?Math.ceil(o/i)===a.dims[u]:o===a.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((o,u)=>o===a.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},wd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=j.normalizeAxis(t.gatherAxis,n),s=j.normalizeAxis(t.quantizeAxis,n),o=r.slice(0);o.splice(a,1,...i);let u=j.size(o),d=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...ge(...e.map((f,g)=>f.dims),o)],m=f=>{let g=Z("data",e[0].dataType,e[0].dims.length),h=Z("inputIndices",e[1].dataType,e[1].dims.length),w=Z("scales",e[2].dataType,e[2].dims.length),y=e.length>3?Z("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=fe("output",d,o.length),k=[g,h,w];y&&k.push(y);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${f.registerUniforms(S).declareVariables(...k,b)}
        ${f.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${h.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${h.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${h.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${w.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${w.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${w.getByIndices("scale_indices")};
        ${y?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${y.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${y.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${He(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((f,g)=>g!==1).map(f=>f.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(f,g)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:m}},vd=(e,t)=>{let r=e.inputs;bd(r,t),e.compute(wd(e.inputs,t))},$d=e=>ze({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),xd,kd,Sd,Id,pm=ae(()=>{we(),ve(),We(),$e(),xd=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},kd=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,o=j.normalizeAxis(t.axis,n),u=r[o],d=a.slice(0),c=j.size(d),p=Z("input",i,n),m=Z("indicesInput",s,a.length),f=fe("output",i,d.length),g=[{type:12,data:c},{type:6,data:u},{type:12,data:o}];return g.push(...ge(r,a,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:g}),getShaderSource:h=>`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,f)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},Sd=e=>ze({axis:e.axis}),Id=(e,t)=>{let r=e.inputs;xd(r),e.compute(kd(e.inputs,t))}}),Td,Ed,Cd,zd,cm=ae(()=>{we(),ve(),$e(),Td=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ed=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=Ps.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[n,a];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,d=Math.ceil(a/u),c=Math.ceil(n/u),p=!0,m=j.size(o),f=[{type:12,data:p?d:m},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(f.push(...ge(e[2].dims)),g.push("rank")),f.push(...ge(o));let h=y=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",S=Z("a",e[0].dataType,e[0].dims),I=Z("b",e[1].dataType,e[1].dims),A=S.type.value,C=null,M=[S,I];e.length===3&&(C=Z("c",e[2].dataType,e[2].dims.length),M.push(C));let D=fe("output",e[0].dataType,o.length);M.push(D);let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${y.registerUniforms(W).declareVariables(...M)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${k}
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${A}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},w=y=>{let b=Z("a",e[0].dataType,e[0].dims),k=Z("b",e[1].dataType,e[1].dims),S=null,I=[b,k];e.length===3&&(S=Z("c",e[2].dataType,e[2].dims.length),I.push(S));let A=fe("output",e[0].dataType,o.length);I.push(A);let C=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",D="";t.transA&&t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let W=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${y.registerUniforms(C).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${u}>, ${u}>;
  ${y.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${D}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${M}
      }
      workgroupBarrier();
    }

    ${W}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:f}),getShaderSource:w}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:f}),getShaderSource:h}},Cd=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},zd=(e,t)=>{Td(e.inputs),e.compute(Ed(e.inputs,t))}}),gt,xt,jt,Kt,Ad,Od,Bd,Rd,Dd,Nd,Md,Pd,Ud,Wd,fm=ae(()=>{we(),ve(),We(),$e(),[gt,xt,jt,Kt]=[0,1,2,3],Ad=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Od=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Bd=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Rd=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Dd=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Nd=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${gt}] = batch;
     indices[${xt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${jt}] = u32(r);
            indices[${Kt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${jt}] = u32(clamp(r, 0, H - 1));
          indices[${Kt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${jt}] = gs_reflect(r, border[1], border[3]);
          indices[${Kt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Md=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${gt}], indices[${xt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${gt}], indices[${xt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${gt}], indices[${xt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${gt}], indices[${xt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${gt}], indices[${xt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${gt}], indices[${xt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Pd=(e,t)=>{let r=Z("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=Z("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[gt,xt,jt,Kt]=[0,3,1,2]);let s=fe("output",e[0].dataType,a.length),o=r.type.value,u=j.size(a),d=[{type:12,data:u},...ge(e[0].dims,i,a)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${Od}
  ${Bd(o)}
  ${Rd(t)}
  ${Dd(t)}
  ${Nd(r,o,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${jt}]);
      let W_in = i32(uniforms.x_shape[${Kt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${gt}], indices[${jt}], indices[${Kt}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Md(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let m=j.size(a);return{outputs:[{dims:a,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:c}},Ud=(e,t)=>{Ad(e.inputs),e.compute(Pd(e.inputs,t))},Wd=e=>ze({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ye,Ld,Fd,Hn,qd,Ar,Vd,Gd=ae(()=>{we(),ve(),We(),cn(),xn(),$e(),Et(),Ye=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Ld=(e,t)=>{let r=e[0],i=Ye(e,1),n=Ye(e,2),a=Ye(e,3),s=Ye(e,4),o=Ye(e,5),u=Ye(e,6),d=Ye(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],p=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],f=p,g=0,h=0,w=Math.floor(m/t.numHeads);if(u&&d&&j.size(u.dims)&&j.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=u.dims[2],h=u.dims[2]}else if(u&&j.size(u.dims)||d&&j.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(i&&j.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,f=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(a&&j.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=g+f,k=0;if(s&&j.size(s.dims)>0){k=8;let C=s.dims;throw C.length===1?C[0]===c?k=1:C[0]===3*c+2&&(k=3):C.length===2&&C[0]===c&&C[1]===b&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,I=m;if(n&&j.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],S=!0}}let A=!1;if(s&&j.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&j.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:b,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:w,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:A,passPastInKv:S,qkvFormat:y}},Fd=e=>ze({...e}),Hn=ze({perm:[0,2,1,3]}),qd=(e,t,r,i,n,a,s)=>{let o=[i,n,a],u=j.size(o),d=[{type:12,data:u},{type:12,data:s},{type:12,data:a}],c=p=>{let m=fe("qkv_with_bias",t.dataType,o),f=Z("qkv",t.dataType,o),g=Z("bias",r.dataType,o),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(h).declareVariables(f,g,m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},Ar=(e,t,r,i,n,a,s,o)=>{let u=a;if(s&&j.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=qd(e,a,s,t,i,r*n,o),u=u.reshape([t,i,r,n]),r===1||i===1?u:e.compute(rt(u,Hn.perm),{inputs:[u],outputs:[-1]})[0]}else return a.dims.length===3&&(u=a.reshape([t,i,r,n])),r===1||i===1?u:e.compute(rt(u,Hn.perm),{inputs:[u],outputs:[-1]})[0]},Vd=(e,t)=>{let r=Ld(e.inputs,t),i=e.inputs[0],n=Ye(e.inputs,1),a=Ye(e.inputs,2),s=Ye(e.inputs,3),o=Ye(e.inputs,4),u=Ye(e.inputs,5),d=Ye(e.inputs,6),c=Ye(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let p=n&&a&&n.dims.length===4&&a.dims.length===4,m=Ar(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(p)return Ir(e,m,n,a,o,void 0,d,c,u,r);if(!n||!a)throw new Error("key and value must be provided");let f=Ar(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),g=Ar(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);Ir(e,m,f,g,o,void 0,d,c,u,r)}}),Hd,jd,Kd,Zd,jn,Xd,Yd,Qd=ae(()=>{we(),ve(),We(),$e(),Hd=e=>{if(!e||e.length<1)throw new Error("too few inputs")},jd=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),ze({numOutputs:i,axis:t.axis,splitSizes:r})},Kd=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${he("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Zd=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},jn=(e,t)=>{let r=e[0].dims,i=j.size(r),n=e[0].dataType,a=j.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),o=Z("input",n,r.length),u=new Array(t.numOutputs),d=[],c=[],p=0,m=[{type:12,data:i}];for(let g=0;g<t.numOutputs;g++){p+=t.splitSizes[g],u[g]=p;let h=r.slice();h[a]=t.splitSizes[g],c.push(h),s[g]=fe(`output${g}`,n,h.length),d.push({dims:c[g],dataType:e[0].dataType})}m.push({type:12,data:u},...ge(r,...c));let f=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${Kd(u.length)}
  ${Zd(s)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${he("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m})}},Xd=(e,t)=>{Hd(e.inputs);let r=e.inputs.length===1?t:jd(e.inputs,t);e.compute(jn(e.inputs,r),{inputs:[0]})},Yd=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return ze({axis:t,numOutputs:i,splitSizes:r})}}),Jd,di,ep,tp=ae(()=>{we(),ve(),We(),$e(),Jd=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!j.areEqual(i.dims,[])&&!j.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!j.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],d=r.dims[r.dims.length-2],c=n.dims[0],p=j.sizeFromDimension(r.dims,1)/d,m=o===0?n.dims[1]*2:p/s;if(o>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(m/2!==n.dims[1]&&o/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},di=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],o=j.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=o/u,c=e[2].dims[1],p=n===0?c*2:d/i,m=new Array(s,u,d/p,p-c),f=j.computeStrides(m),g=[{type:1,data:a},{type:12,data:m},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[o,d,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,p,u*p,1]}):[],...ge(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],h=w=>{let y=Z("input",e[0].dataType,e[0].dims.length),b=Z("position_ids",e[1].dataType,e[1].dims.length),k=Z("cos_cache",e[2].dataType,e[2].dims.length),S=Z("sin_cache",e[3].dataType,e[3].dims.length),I=fe("output",e[0].dataType,e[0].dims.length);return w.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${w.declareVariables(y,b,k,S,I)}

        ${w.mainStart(or)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",fe("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${y.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ze({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(j.size(m)/or)},programUniforms:g})}},ep=(e,t)=>{Jd(e.inputs,t),e.compute(di(e.inputs,t))}}),rp,ip,Kn,np,ap,hm=ae(()=>{We(),we(),xn(),Gd(),Qd(),Et(),tp(),$e(),rp=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=r.dims[0],d=r.dims[1],c=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=d,m=0,f=!i||i.dims.length===0,g=Math.floor(f?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);f&&(c=g*t.numHeads);let h=a&&a.dims.length!==0,w=s&&s.dims.length!==0;if(h&&a.dims.length===4&&a.dims[0]===u&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(h&&w){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=a.dims[2]}else if(h||w)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');p=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let b=0,k=!1,S=t.kvNumHeads?g*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(p!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=n.dims[2]}else{if(p!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=n.dims[1]*n.dims[3],k=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:S,headSize:g,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:y}},ip=ze({perm:[0,2,1,3]}),Kn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(rt(i,ip.perm),{inputs:[i],outputs:[-1]})[0]),i},np=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=c=>{let p=Z("seq_lens",r.dataType,r.dims),m=Z("total_seq_lens",i.dataType,i.dims),f=fe("pos_ids",n,s),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(g).declareVariables(p,m,f)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${f.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:d}},ap=(e,t)=>{let r=rp(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=ze({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[m,f,g]=!n&&!a?e.compute(jn([i],p),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],h,w;if(t.doRotary){let S=e.compute(np(r.batchSize,r.sequenceLength,u,d),{inputs:[u,d],outputs:[-1]})[0],I=e.inputs[7],A=e.inputs[8],C=ze({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),M=[m,S,I,A],D=[-1];h=e.compute(di(M,C),{inputs:M,outputs:D})[0],M.splice(0,1,f);let W=ze({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});w=e.compute(di(M,W),{inputs:M,outputs:D})[0]}let y=Ar(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?h:m,void 0,0),b=Kn(e,t.doRotary?w:f,r),k=Kn(e,g,r);Ir(e,y,b,k,void 0,void 0,s,o,void 0,r,u,d)}}),Zn,sp,op,up,mm=ae(()=>{we(),ve(),Et(),$e(),Zn=(e,t,r,i,n,a,s,o)=>{let u=Ue(a),d=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,p=n*s,m=64;p===1&&(m=256);let f=[n,s,a/u],g=[n,s,2],h=["rank","type","type"],w=[];w.push(...ge(f,g));let y=b=>{let k=Z("x",t.dataType,3,u),S=Z("scale",r.dataType,r.dims),I=Z("bias",i.dataType,i.dims),A=fe("output",1,3,2),C=[k,S,I,A];return`
  var<workgroup> workgroup_shared : array<${c}, ${m}>;
  const workgroup_size = ${m}u;
  ${b.declareVariables(...C)}
  ${b.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Tt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Tt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${m}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:p},programUniforms:w}),getShaderSource:y},{inputs:[t,r,i],outputs:[-1]})[0]},sp=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],o=i[1],u=j.sizeFromDimension(i,a),d=Ue(u),c=j.size(n)/d,p=Zn(e,t[0],t[1],t[2],s,u,o,r.epsilon),m=[s,o,u/d],f=[s,o],g=["type","none"],h=w=>{let y=Z("x",t[0].dataType,m.length,d),b=Z("scale_shift",1,f.length,2),k=fe("output",t[0].dataType,m.length,d),S=[y,b,k];return`
  ${w.registerUniform("output_size","u32").declareVariables(...S)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ge(m,f,m)]}),getShaderSource:h},{inputs:[t[0],p]})},op=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],o=j.sizeFromDimension(i,1)/s,u=Ue(s),d=j.size(n)/u,c=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],p=["type","type"],m=!1,f=[0,i.length-1];for(let y=0;y<i.length-2;y++)m=m||i[y+1]!==1,f.push(y+1);m=m&&i[i.length-1]!==1;let g=m?e.compute(rt(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(y,b)=>i[f[b]])),h=Zn(e,g,t[1],t[2],a,o,s,r.epsilon),w=y=>{let b=Fe(t[0].dataType),k=u===1?"vec2f":`mat${u}x2f`,S=C=>{let M=C===0?"x":"y",D=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${b}(${D}(scale.${M}))`;case 2:return`vec2<${b}>(${D}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${b}>(${D}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${u}`)}},I=Z("input",t[0].dataType,t[0].dims,u),A=fe("output",t[0].dataType,n,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:w},{inputs:[t[0],h]})},up=(e,t)=>{t.format==="NHWC"?op(e,e.inputs,t):sp(e,e.inputs,t)}}),lp,dp,pp,gm=ae(()=>{we(),ve(),$e(),lp=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},dp=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],o=n,u=j.normalizeAxis(t.axis,n.length),d=j.sizeToDimension(n,u),c=j.sizeFromDimension(n,u),p=j.size(a.dims),m=s?j.size(s.dims):0;if(p!==c||s&&m!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${m}`);let f=[];for(let I=0;I<n.length;++I)I<u?f.push(n[I]):f.push(1);let g=Ue(c),h=["type","type"],w=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/g)},{type:1,data:t.epsilon}];s&&h.push("type");let y=r>1,b=r>2,k=I=>{let A=Fe(e[0].dataType),C=[Z("x",e[0].dataType,e[0].dims,g),Z("scale",a.dataType,a.dims,g)];s&&C.push(Z("bias",s.dataType,s.dims,g)),C.push(fe("output",e[0].dataType,o,g)),y&&C.push(fe("mean_data_output",1,f)),b&&C.push(fe("inv_std_output",1,f));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(M).declareVariables(...C)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${gn("f32",g)};
    var mean_square_vector = ${gn("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${ur(A,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Tt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Tt("mean_square_vector",g)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${ur(A,g,"x[j + offset]")};
      let f32scale = ${ur(A,g,"scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${ur(A,g,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:o,dataType:e[0].dataType}];return y&&S.push({dims:f,dataType:1}),b&&S.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${i}`,inputDependencies:h},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:w}),getShaderSource:k}},pp=(e,t)=>{lp(e.inputs),e.compute(dp(e.inputs,t,e.outputCount))}}),cp,fp,_m=ae(()=>{ve(),An(),Dn(),cp=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},fp=e=>{cp(e.inputs);let t=sr.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(zn(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=j.size(e.inputs[0].dims.slice(0,-2)),s=j.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let o=e.inputs[0].reshape([1,a,i]),u=e.inputs[1].reshape([1,i,r]),d=[1,a,r],c=[o,u];e.compute(si(c,{activation:""},t,d),{inputs:c})}else e.compute(si(e.inputs,{activation:""},t))}}}),hp,mp,gp,_p,yp,ym=ae(()=>{we(),ve(),We(),$e(),hp=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!j.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(j.size(o)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,d=t.bits>4?t.n*n:t.n*Math.floor((n+1)/2);if(j.size(u)!==d)throw new Error("zeroPoints input size error.")}},mp=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,o=r.slice(0,i-2),u=j.size(o),d=e[1].dims[2]/4,c=e[0].dataType,p=Ue(t.k),m=Ue(d),f=Ue(s),g=o.concat([n,s]),h=n>1&&s/f%2===0?2:1,w=j.size(g)/f/h,y=64,b=[],k=[u,n,a/p],S=j.convertShape(e[1].dims).slice();S.splice(-1,1,d/m),b.push(...ge(k)),b.push(...ge(S)),b.push(...ge(e[2].dims)),e.length===4&&b.push(...ge(j.convertShape(e[3].dims)));let I=[u,n,s/f];b.push(...ge(I));let A=C=>{let M=k.length,D=Z("a",e[0].dataType,M,p),W=Z("b",12,S.length,m),J=Z("scales",e[2].dataType,e[2].dims.length),z=[D,W,J],F=e.length===4?Z("zero_points",12,e[3].dims.length):void 0;F&&z.push(F);let v=I.length,V=fe("output",e[0].dataType,v,f),ee=Fe(e[0].dataType),q=(()=>{switch(p){case 1:return`array<${ee}, 8>`;case 2:return`mat4x2<${ee}>`;case 4:return`mat2x4<${ee}>`;default:throw new Error(`${p}-component is not supported.`)}})(),le=()=>{let B=`
          // reuse a data
            var input_offset = ${D.indicesToOffset(`${D.type.indices}(batch, row, word_offset)`)};
            var a_data: ${q};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${D.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let N=0;N<f*h;N++)B+=`
            b_value = ${m===1?`b${N}_data`:`b${N}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${q}(${Array.from({length:4},(ie,P)=>`${ee}(b_value_lower[${P}]), ${ee}(b_value_upper[${P}])`).join(", ")});
            b_dequantized_values = ${p===1?`${q}(${Array.from({length:8},(ie,P)=>`(b_quantized_values[${P}] - ${F?`zero_point${N}`:"zero_point"}) * scale${N}`).join(", ")});`:`(b_quantized_values - ${q}(${Array(8).fill(`${F?`zero_point${N}`:"zero_point"}`).join(",")})) * scale${N};`};
            workgroup_shared[local_id.x * ${h} + ${Math.floor(N/f)}]${f>1?`[${N%f}]`:""} += ${Array.from({length:8/p},(ie,P)=>`${p===1?`a_data[${P}] * b_dequantized_values[${P}]`:`dot(a_data[${P}], b_dequantized_values[${P}])`}`).join(" + ")};
          `;return B},G=()=>{let B=`
            var col_index = col * ${f};
            ${F?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ee}(8);`}
            `;for(let N=0;N<f*h;N++)B+=`
            let scale${N} = ${J.getByOffset("col_index * nBlocksPerCol + block")};
            ${F?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${N} = ${ee}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return B},ue=()=>{let B=`col_index = col * ${f};`;for(let N=0;N<f*h;N++)B+=`
            let b${N}_data = ${W.getByIndices(`${W.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return B+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${q};
            var b_dequantized_values: ${q};`,B};return`
        var<workgroup> workgroup_shared: array<${V.type.value}, ${h*y}>;
        ${C.declareVariables(...z,V)}
        ${C.mainStart([y,1,1])}
          let output_indices = ${V.offsetToIndices(`(global_idx / ${y}) * ${h}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${y}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${G()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${ue()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${le()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${h}) {
            var output_value: ${V.type.value} = ${V.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${y}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${h};
            }
            ${V.setByIndices(`${V.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${m};${f};${h};${y}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:w},programUniforms:b}),getShaderSource:A}},gp=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,o=r.slice(0,i-2),u=j.size(o),d=e[1].dims[2]/4,c=e[0].dataType,p=Ue(t.k),m=Ue(d),f=o.concat([n,s]),g=128,h=s%8===0?8:s%4===0?4:1,w=g/h,y=w*m*8,b=y/p,k=y/t.blockSize,S=j.size(f)/h,I=[],A=[u,n,a/p],C=j.convertShape(e[1].dims).slice();C.splice(-1,1,d/m),I.push(...ge(A)),I.push(...ge(C)),I.push(...ge(e[2].dims)),e.length===4&&I.push(...ge(j.convertShape(e[3].dims)));let M=[u,n,s];I.push(...ge(M));let D=W=>{let J=A.length,z=Z("a",e[0].dataType,J,p),F=Z("b",12,C.length,m),v=Z("scales",e[2].dataType,e[2].dims.length),V=[z,F,v],ee=e.length===4?Z("zero_points",12,e[3].dims.length):void 0;ee&&V.push(ee);let q=M.length,le=fe("output",e[0].dataType,q),G=Fe(e[0].dataType),ue=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${G}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${G}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${G}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${G}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${z.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${le.type.value}, ${w}>, ${h}>;
        ${W.declareVariables(...V,le)}
        ${W.mainStart([w,h,1])}
          let output_indices = ${le.offsetToIndices(`workgroup_index * ${h}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${g})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${z.getByIndices(`${z.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${z.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${ee?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${G}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${G}(8);`}
            let scale = ${v.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${ue()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${G}>(${Array.from({length:4},(B,N)=>`${G}(b_value_lower[${N}]), ${G}(b_value_upper[${N}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${G}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(B,N)=>`${`dot(a_data${N}, b_dequantized_values[${N}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${h}) {
            var output_value: ${le.type.value} = ${le.type.value}(0);
            for (var b = 0u; b < ${w}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${le.setByIndices(`${le.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${m};${w};${h}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:S},programUniforms:I}),getShaderSource:D}},_p=(e,t)=>{hp(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(gp(e.inputs,t)):e.compute(mp(e.inputs,t))},yp=e=>ze(e)}),bp,wp,vp,$p,xp,kp,Sp,Ip,Tp,bm=ae(()=>{we(),ve(),$e(),bp=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},wp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${he("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${he("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${he("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},vp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${he("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${he("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${he("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${he("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},$p=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${he("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${he("uniforms.x_shape",n,t)})) {
                  k = i32(${he("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${he("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},xp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${he("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${he("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${he("uniforms.x_shape",n,t)})) {
                  k -= i32(${he("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${he("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},kp=(e,t,r)=>{switch(r.mode){case 0:return wp(e,t,r.pads.length);case 1:return vp(e,t,r.pads.length);case 2:return $p(e,t,r.pads.length);case 3:return xp(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Sp=(e,t)=>{let r=j.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=j.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...ge(e[0].dims,r));let o=["rank"],u=d=>{let c=fe("output",e[0].dataType,r.length),p=Z("x",e[0].dataType,i.length),m=p.type.value,f=kp(c,i.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(g).declareVariables(p,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(j.size(r)/64)},programUniforms:a}),getShaderSource:u}},Ip=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)a[Number(o[u])]=Number(r[u]),a[Number(o[u])+n]=Number(r[u+o.length])}else r.forEach((o,u)=>a[Number(u)]=Number(o));let s=[];return a.forEach(o=>s.push(o)),{mode:t.mode,value:i,pads:s}}else return t},Tp=(e,t)=>{bp(e.inputs);let r=Ip(e.inputs,t);e.compute(Sp(e.inputs,r),{inputs:[0]})}}),Or,Xn,Yn,Qn,Jn,Ep,Cp,ea,ta,zp,Ap,ra,Op,Bp,ia,Rp,Dp,Np,Mp,wm=ae(()=>{ut(),we(),ve(),$e(),Or=e=>{if(Me.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Xn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=a?t.dilations.slice():[],d=t.pads.slice();Jr.adjustPoolAttributes(r,n,s,o,u,d);let c=Jr.computePoolOutputShape(r,n,o,u,s,d,t.autoPad),p=Object.assign({},t);a?Object.assign(p,{kernelShape:s,strides:o,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:o,pads:d,cacheKey:t.cacheKey});let m=c.slice();return m.push(m.splice(1,1)[0]),[p,i?m:c]},Yn=(e,t)=>{let r=t.format==="NHWC",i=j.size(e),n=j.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],p=!!(d+c);a.push({type:12,data:o},{type:12,data:u},{type:12,data:d},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let f=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],h=t.pads[t.pads.length/2-2],w=t.pads[t.pads.length-2];m=!!(h+w),a.push({type:12,data:f},{type:12,data:g},{type:12,data:h},{type:12,data:w}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,p,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=j.computeStrides(t.kernelShape);a.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,c)=>d+c);return[a,s,!!u,!1,!1]}},Qn=(e,t,r,i,n,a,s,o,u,d,c,p)=>{let m=n.format==="NHWC",f=t.type.value,g=fe("output",t.type.tensor,i);if(n.kernelShape.length<=2){let h="",w="",y="",b=r-(m?2:1);if(c?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let k=r-(m?3:2);p?w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${f}(${o});
              var pad = 0;
              ${w}
              ${h}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=n.kernelShape.length,w=n.pads.length,y="";return d?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:y=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(u).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${f}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${he("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${he("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${r-h}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${he("uniforms.strides",`j - ${r-h}u`,h)}
                    + offsets[j - ${r-h}u] - ${he("uniforms.pads","j - 2u",w)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},Jn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Ep=e=>`${Jn(e)};${e.countIncludePad}`,Cp=e=>`${Jn(e)};${e.storageOrder};${e.dilations}`,ea=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ta=(e,t,r,i)=>{let[n,a]=Xn(t,i,r),s=Z("x",t.dataType,t.dims.length),o=s.type.value,u="value += x_val;",d="";n.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,p,m,f,g]=Yn(a,n);c.push(...ge(t.dims,a));let h=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${m};${f};${g}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(j.size(a)/64)},programUniforms:c}),getShaderSource:w=>Qn(w,s,t.dims.length,a.length,n,u,d,0,p,m,f,g)}},zp=e=>{let t=e.count_include_pad!==0,r=ea(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:Ep(i)}},Ap=(e,t)=>{Or(e.inputs),e.compute(ta("AveragePool",e.inputs[0],!1,t))},ra={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Op=e=>{let t=e.format;return{format:t,...ra,cacheKey:t}},Bp=(e,t)=>{Or(e.inputs),e.compute(ta("GlobalAveragePool",e.inputs[0],!0,t))},ia=(e,t,r,i)=>{let[n,a]=Xn(t,i,r),s=`
      value = max(x_val, value);
    `,o="",u=Z("x",t.dataType,t.dims.length),d=["rank"],[c,p,m,f,g]=Yn(a,n);return c.push(...ge(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${m};${f};${g}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(j.size(a)/64)},programUniforms:c}),getShaderSource:h=>Qn(h,u,t.dims.length,a.length,n,s,o,t.dataType===10?-65504:-1e5,p,m,f,g)}},Rp=(e,t)=>{Or(e.inputs),e.compute(ia("MaxPool",e.inputs[0],!1,t))},Dp=e=>{let t=e.storage_order,r=e.dilations,i=ea(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:Cp(n)}},Np=e=>{let t=e.format;return{format:t,...ra,cacheKey:t}},Mp=(e,t)=>{Or(e.inputs),e.compute(ia("GlobalMaxPool",e.inputs[0],!0,t))}}),Pp,Up,Wp,Lp,vm=ae(()=>{we(),ve(),We(),$e(),Pp=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Up=(e,t)=>{let r=j.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,o=j.size(a),u=i===3||i===2,d=u?[Math.ceil(j.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,p=e.length>2?e[2]:void 0,m=p?u?[Math.ceil(j.size(p.dims)/4)]:p.dims:void 0,f=c.length===0||c.length===1&&c[0]===1,g=f===!1&&c.length===1,h=Ue(o),w=f&&(!u||h===4),y=w?h:1,b=w&&!u?h:1,k=Z("input",u?12:i,d.length,b),S=Z("scale",s,c.length),I=p?Z("zero_point",u?12:i,m.length):void 0,A=fe("output",s,a.length,y),C=[k,S];I&&C.push(I);let M=[d,c];p&&M.push(m);let D=[{type:12,data:o/y},{type:12,data:r},{type:12,data:t.blockSize},...ge(...M,a)],W=J=>{let z=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${J.registerUniforms(z).declareVariables(...C,A)}
      ${J.mainStart()}
          ${J.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${S.getByOffset("0")}`:g?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?f?u?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:g?u?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${u?n?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:W,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/y/64),y:1,z:1},programUniforms:D})}},Wp=(e,t)=>{Pp(e.inputs,t),e.compute(Up(e.inputs,t))},Lp=e=>ze({axis:e.axis,blockSize:e.blockSize})}),Fp,qp,Vp,$m=ae(()=>{ut(),we(),$e(),Fp=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},qp=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,o=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...ge(a)],u=d=>{let c=fe("output",i,a.length),p=c.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${d.registerUniforms(m).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},Vp=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),Me.webgpu.validateInputContent&&Fp(t,r,i),e.compute(qp(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Gp,na,aa,Hp,jp,Kp,xm=ae(()=>{we(),ve(),We(),$e(),Gp=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},na=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,aa=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${Gp(e.reduction,"output[data_offset + i]","value",t)}
      }`,Hp=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(j.size(i)/a),o=i[i.length-1],u=j.sizeFromDimension(r,o),d=j.sizeFromDimension(i,0)/o,c=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...ge(e[1].dims,e[2].dims,n)],p=m=>{let f=Z("indices",e[1].dataType,e[1].dims.length),g=Z("updates",e[2].dataType,e[2].dims.length,a),h=t.reduction!=="none"&&t.reduction!==""?Js("output",e[0].dataType,n.length):fe("output",e[0].dataType,n.length,a);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,g,h)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${d}; i = i + 1) {
      for (var j = i + 1; j < ${d}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${d}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${na(r.length,!1)}
      }
      ${aa(t,h.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${na(r.length,!0)}
  }
  ${aa(t,h.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:p}},jp=e=>ze({reduction:e.reduction}),Kp=(e,t)=>{e.compute(Hp(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Zp,Xp,Yp,sa,Qp,Jp,ec,tc,rc,ic,nc,ac,oa,sc,oc,uc,lc,dc,pc,cc,km=ae(()=>{we(),ve(),We(),$e(),Zp=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Xp=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},Yp=(e,t,r,i,n,a)=>{let[s,o,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Zp(i,t),t.axes.length>0&&Xp(i,t.axes,d).forEach((c,p)=>i[p]=c)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},sa=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Qp=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${sa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${sa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Jp=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ec=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},tc=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},rc=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},ic=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${he("uniforms.scales","i",i)};
        var roi_low = ${he("uniforms.roi","i",n)};
        var roi_hi = ${he("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${he("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${he("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,nc=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${he("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${he("uniforms.roi","i",a)};
          var roi_hi = ${he("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${he("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${he("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,ac=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${he("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,oa=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",sc=(e,t,r,i,n)=>{let[a,s,o,u]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${oa(e,u,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},oc=(e,t,r,i,n,a,s,o,u,d)=>{let c=r.length===2,[p,m]=c?[0,1]:[2,3],f=e.type.value,g=h=>{let w=h===p?"row":"col";return`
      fn ${w}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet("output_indices",h)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[h]},
        ${i[h]}, ${r[h]}, ${a[h]}, ${a[h]} + ${r.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[h]} - 1))) {
          return ${u};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${w}: ${f} = originalIdx + ${f}(i);
          if (${w} < 0 || ${w} >= ${r[h]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${w} = max(0, min(${w}, ${r[h]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",h,`u32(${w})`)};
          data[i + 1] = ${h===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(p)};
    ${g(m)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},uc=(e,t,r,i,n)=>{let[a,s,o,u,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${oa(e,d,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},lc=(e,t,r,i,n,a)=>{let s=e.dims,o=ec(a,t.axes,s.length),u=tc(s,i,n,t.axes),d=i.slice();i.length===0&&(d=s.map((b,k)=>b===0?1:u[k]/b),t.keepAspectRatioPolicy!=="stretch"&&(u=rc(s,d,t)));let c=fe("output",e.dataType,u.length),p=Z("input",e.dataType,s.length),m=j.size(u),f=s.length===u.length&&s.every((b,k)=>b===u[k]),g=t.coordinateTransformMode==="tf_crop_and_resize",h=t.extrapolationValue,w=p.type.value,y=b=>`
      ${f?"":`
      ${Qp(t.coordinateTransformMode,w)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${ac(p,s)};
              ${Jp(t.nearestMode,r,w)};
              ${nc(p,c,s,u,d.length,o.length,g)};
              `;case"linear":return`
              ${ic(c,s,u,d.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${sc(p,c,s,g,h)}`;if(s.length===3||s.length===5)return`${uc(p,c,s,g,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${oc(p,c,s,u,d,o,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(p,c)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${n.length>0?n:""}|${o.length>0?o:""}|${f}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:o},...ge(s,u)]})}},dc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},pc=(e,t)=>{let r=[],i=[],n=[],a=dc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Yp(e.inputs,t,a,r,i,n),e.compute(lc(e.inputs[0],t,a,r,i,n),{inputs:[0]})},cc=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return ze({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:d})}}),fc,hc,mc,Sm=ae(()=>{we(),ve(),$e(),fc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},hc=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=j.size(a),o=a,u=s,d=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],p=!n&&e.length>3,m=e.length>4,f=i&&r>1,g=i&&r>2,h=r>3,w=64,y=Ue(d),b=[{type:12,data:u},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],k=I=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],C=[Z("x",e[0].dataType,e[0].dims,y),Z("skip",e[1].dataType,e[1].dims,y),Z("gamma",e[2].dataType,e[2].dims,y)];p&&C.push(Z("beta",e[3].dataType,e[3].dims,y)),m&&C.push(Z("bias",e[4].dataType,e[4].dims,y)),C.push(fe("output",e[0].dataType,o,y)),f&&C.push(fe("mean_output",1,c)),g&&C.push(fe("inv_std_output",1,c)),h&&C.push(fe("input_skip_bias_sum",e[0].dataType,o,y));let M=Fe(e[0].dataType),D=Fe(1,y);return`

      ${I.registerUniforms(A).declareVariables(...C)}
      var<workgroup> sum_shared : array<${D}, ${w}>;
      var<workgroup> sum_squared_shared : array<${D}, ${w}>;

      ${I.mainStart([w,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${w};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${w};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${w-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${ur(M,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${w};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Tt("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Tt("square_sum",y)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:o,dataType:e[0].dataType}];return r>1&&S.push({dims:c,dataType:1}),r>2&&S.push({dims:c,dataType:1}),r>3&&S.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${g};${h}`,inputDependencies:e.map((I,A)=>"type")},getShaderSource:k,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:b})}},mc=(e,t)=>{fc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(hc(e.inputs,t,e.outputCount,!1),{outputs:r})}}),gc,Br,_c,ua,yc,bc,wc,vc,Im=ae(()=>{we(),ve(),We(),$e(),gc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},Br=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},_c=(e,t)=>{if(e.length>1){let r=Br(e,1),i=Br(e,2),n=Br(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),ze({starts:r,ends:i,axes:n})}else return t},ua=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},yc=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${he("uniforms.input_shape","i",r.length)};
            let steps_i = ${he("uniforms.steps","i",r.length)};
            let signs_i = ${he("uniforms.signs","i",r.length)};
            let starts_i = ${he("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,bc=(e,t)=>{let r=e[0].dims,i=j.size(r),n=t.axes.length>0?j.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=Br(e,4);a.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map((y,b)=>ua(y,b,r,n,a)),o=t.ends.map((y,b)=>ua(y,b,r,n,a));if(n.length!==s.length||n.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let y=0;y<r.length;++y)n.includes(y)||(s.splice(y,0,0),o.splice(y,0,r[y]),a.splice(y,0,1));let u=a.map(y=>Math.sign(y));a.forEach((y,b,k)=>{if(y<0){let S=(o[b]-s[b])/y,I=s[b],A=I+S*a[b];s[b]=A,o[b]=I,k[b]=-y}});let d=r.slice(0);n.forEach((y,b)=>{d[y]=Math.ceil((o[y]-s[y])/a[y])});let c={dims:d,dataType:e[0].dataType},p=fe("output",e[0].dataType,d.length),m=Z("input",e[0].dataType,e[0].dims.length),f=j.size(d),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:a.length}],h=[{type:12,data:f},{type:12,data:s},{type:6,data:u},{type:12,data:a},...ge(e[0].dims,d)],w=y=>`
      ${y.registerUniforms(g).declareVariables(m,p)}
        ${yc(m,p,r)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},wc=(e,t)=>{gc(e.inputs,t);let r=_c(e.inputs,t);e.compute(bc(e.inputs,r),{inputs:[0]})},vc=e=>{let t=e.starts,r=e.ends,i=e.axes;return ze({starts:t,ends:r,axes:i})}}),$c,xc,kc,Sc,Tm=ae(()=>{we(),ve(),We(),Et(),$e(),$c=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},xc=(e,t)=>{let r=e.inputs[0],i=r.dims,n=j.size(i),a=i.length,s=j.normalizeAxis(t.axis,a),o=s<i.length-1,u,d=[];o?(d=Array.from({length:a},(C,M)=>M),d[s]=a-1,d[a-1]=s,u=e.compute(rt(r,d),{inputs:[r],outputs:[-1]})[0]):u=r;let c=u.dims,p=c[a-1],m=n/p,f=Ue(p),g=p/f,h=64;m===1&&(h=256);let w=(C,M)=>M===4?`max(max(${C}.x, ${C}.y), max(${C}.z, ${C}.w))`:M===2?`max(${C}.x, ${C}.y)`:M===3?`max(max(${C}.x, ${C}.y), ${C}.z)`:C,y=Z("x",u.dataType,u.dims,f),b=fe("result",u.dataType,u.dims,f),k=y.type.value,S=Fe(u.dataType)==="f32"?`var threadMax = ${k}(-3.402823e+38f);`:`var threadMax = ${k}(-65504.0h);`,I=C=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${C.registerUniform("packedCols","i32").declareVariables(y,b)}
      ${C.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${k}(${w("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${k}(${Tt("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${f};${h}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:g}]}),getShaderSource:I},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(rt(A,d),{inputs:[A]})},kc=(e,t)=>{$c(e.inputs),xc(e,t)},Sc=e=>ze({axis:e.axis})}),la,Ic,Tc,Ec,Cc,Em=ae(()=>{we(),ve(),$e(),la=e=>Array.from(e.getBigInt64Array(),Number),Ic=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(la(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Tc=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Ec=(e,t)=>{let r=e[0].dims,i=t??la(e[1]),n=Tc(r,i),a=j.size(n),s=e[0].dataType,o=Z("input",s,r.length),u=fe("output",s,n.length),d=c=>`
      const inputShape = ${o.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(o,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ge(e[0].dims,n)]}),getShaderSource:d}},Cc=e=>{Ic(e.inputs),e.compute(Ec(e.inputs),{inputs:[0]})}}),zc,Ac,Oc,Cm=ae(()=>{we(),ve(),$e(),zc=(e,t,r,i,n)=>{let a=fe("output_data",n,r.length,4),s=Z("a_data",t[1].dataType,t[1].dims.length,4),o=Z("b_data",t[2].dataType,t[2].dims.length,4),u=Z("c_data",t[0].dataType,t[0].dims.length,4),d,c=(p,m,f)=>`select(${m}, ${p}, ${f})`;if(!i)d=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(m,f,g="")=>{let h=`a_data[index_a${f}][component_a${f}]`,w=`b_data[index_b${f}][component_b${f}]`,y=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${a.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${s.broadcastedIndicesToOffset(`output_indices${f}`,a)};
            let offset_b${f} = ${o.broadcastedIndicesToOffset(`output_indices${f}`,a)};
            let offset_c${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,a)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${m}[${f}] = ${g}(${c(h,w,y)});
          `};n===9?d=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Ac=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(j.areEqual(t,r)&&j.areEqual(r,i)),s=t,o=j.size(t);if(a){let d=sr.calcShape(sr.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,o=j.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>zc(d,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...ge(i,t,r,s)]})}},Oc=e=>{e.compute(Ac(e.inputs))}}),Bc,zm=ae(()=>{Vh(),xn(),Gh(),Hh(),jh(),Kh(),Zh(),em(),rm(),im(),nm(),am(),sm(),om(),um(),lm(),dm(),pm(),cm(),fm(),hm(),mm(),gm(),_m(),ym(),Gd(),bm(),wm(),vm(),$m(),xm(),wn(),km(),tp(),Sm(),Im(),Tm(),Qd(),Em(),Et(),Tn(),Cm(),Bc=new Map([["Abs",[fu]],["Acos",[hu]],["Acosh",[mu]],["Add",[rl]],["ArgMax",[Qo,$n]],["ArgMin",[Yo,$n]],["Asin",[gu]],["Asinh",[_u]],["Atan",[yu]],["Atanh",[bu]],["Attention",[nu]],["AveragePool",[Ap,zp]],["BatchNormalization",[uu]],["BiasAdd",[pu]],["BiasSplitGelu",[Ju]],["Cast",[vu,wu]],["Ceil",[ku]],["Clip",[xu]],["Concat",[gl,_l]],["Conv",[Wn,Pn]],["ConvTranspose",[Vl,Ll]],["Cos",[Su]],["Cosh",[Iu]],["CumSum",[Hl,jl]],["DepthToSpace",[Yl,Ql]],["DequantizeLinear",[Wp,Lp]],["Div",[il]],["Einsum",[nd,ad]],["Elu",[Tu,Tr]],["Equal",[nl]],["Erf",[Eu]],["Exp",[Cu]],["Expand",[ld]],["FastGelu",[pd]],["Floor",[zu]],["FusedConv",[Wn,Pn]],["Gather",[md,hd]],["GatherElements",[Id,Sd]],["GatherBlockQuantized",[vd,$d]],["GatherND",[_d,yd]],["Gelu",[Au]],["Gemm",[zd,Cd]],["GlobalAveragePool",[Bp,Op]],["GlobalMaxPool",[Mp,Np]],["Greater",[ul]],["GreaterOrEqual",[dl]],["GridSample",[Ud,Wd]],["GroupQueryAttention",[ap]],["HardSigmoid",[Uu,Pu]],["InstanceNormalization",[up]],["LayerNormalization",[pp]],["LeakyRelu",[Ou,Tr]],["Less",[ll]],["LessOrEqual",[pl]],["Log",[ju]],["MatMul",[fp]],["MatMulNBits",[_p,yp]],["MaxPool",[Rp,Dp]],["Mul",[al]],["MultiHeadAttention",[Vd,Fd]],["Neg",[Ru]],["Not",[Bu]],["Pad",[Tp]],["Pow",[sl]],["QuickGelu",[Xu,Tr]],["Range",[Vp]],["Reciprocal",[Du]],["ReduceMin",[Ho]],["ReduceMean",[Lo]],["ReduceMax",[Go]],["ReduceSum",[Ko]],["ReduceProd",[jo]],["ReduceL1",[Fo]],["ReduceL2",[qo]],["ReduceLogSum",[Xo]],["ReduceLogSumExp",[Vo]],["ReduceSumSquare",[Zo]],["Relu",[Nu]],["Resize",[pc,cc]],["RotaryEmbedding",[ep]],["ScatterND",[Kp,jp]],["Sigmoid",[Mu]],["Sin",[Wu]],["Sinh",[Lu]],["Slice",[wc,vc]],["SkipLayerNormalization",[mc]],["Split",[Xd,Yd]],["Sqrt",[Fu]],["Softmax",[kc,Sc]],["Sub",[ol]],["Tan",[qu]],["Tanh",[Vu]],["ThresholdedRelu",[Hu,Tr]],["Tile",[Cc]],["Transpose",[oo,uo]],["Where",[Oc]]])}),Rc,Am=ae(()=>{ut(),$t(),$e(),Rc=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){mt(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of r)o.push({binding:o.length,resource:{buffer:d.buffer}});n&&o.push({binding:o.length,resource:n});let u=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ot(e.programInfo.name)}dispose(){}build(e,t){mt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let n=to(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,o=r.createShaderModule({code:s,label:e.name});Se("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return ot(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Dc={};nr(Dc,{WebGpuBackend:()=>Uc});var Nc,Mc,Pc,Uc,Om=ae(()=>{ut(),we(),$t(),Ls(),Fh(),zm(),Am(),Nc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Mc=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Nc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Pc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Uc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=a=>t.features.has(a)&&r.push(a)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Pc(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Ys(this),this.programManager=new Rc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,rn(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;mt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,s=this.kernels.get(a),o=s.kernelType,u=s.kernelName,d=n.programName,c=n.inputTensorViews,p=n.outputTensorViews,m=t[i*2],f=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let g=Number(m-this.queryTimeBase),h=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger(h))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(w=>({dims:w.dims,dataType:vt(w.dataType)})),outputsMetadata:p.map(w=>({dims:w.dims,dataType:vt(w.dataType)})),kernelId:a,kernelType:o,kernelName:u,programName:d,startTime:g,endTime:h});else{let w="";c.forEach((b,k)=>{w+=`input[${k}]: [${b.dims}] | ${vt(b.dataType)}, `});let y="";p.forEach((b,k)=>{y+=`output[${k}]: [${b.dims}] | ${vt(b.dataType)}, `}),console.log(`[profiling] kernel "${a}|${o}|${u}|${d}" ${w}${y}execution time: ${h-g} ns`)}jr("GPU",`${d}::${m}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),ot()}run(e,t,r,i,n,a){mt(e.name);let s=[];for(let b=0;b<t.length;++b){let k=t[b].data;if(k===0)continue;let S=this.gpuDataManager.get(k);if(!S)throw new Error(`no GPU data for input: ${k}`);s.push(S)}let{outputs:o,dispatchGroup:u,programUniforms:d}=e.getRunData(t),c=r.length===0?o.map((b,k)=>k):r;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let p=[],m=[];for(let b=0;b<o.length;++b){if(!Number.isInteger(c[b])||c[b]<-3||c[b]>=a)throw new Error(`Invalid output index: ${c[b]}`);if(c[b]===-3)continue;let k=c[b]===-1,S=c[b]===-2,I=k||S?n(o[b].dataType,o[b].dims):i(c[b],o[b].dataType,o[b].dims);if(p.push(I),I.data===0)continue;let A=this.gpuDataManager.get(I.data);if(!A)throw new Error(`no GPU data for output: ${I.data}`);if(k&&this.temporaryData.push(A),S){let C=this.kernelPersistentData.get(this.currentKernelId);C||(C=[],this.kernelPersistentData.set(this.currentKernelId,C)),C.push(A)}m.push(A)}if(s.length!==t.length||m.length!==p.length){if(m.length===0)return ot(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let f;if(d){let b=0,k=[];d.forEach(C=>{let M=typeof C.data=="number"?[C.data]:C.data;if(M.length===0)return;let D=C.type===10?2:4,W,J;C.type===10?(J=M.length>4?16:M.length>2?8:M.length*D,W=M.length>4?16:D*M.length):(J=M.length<=2?M.length*D:16,W=16),b=Math.ceil(b/J)*J,k.push(b);let z=C.type===10?8:4;b+=M.length>4?Math.ceil(M.length/z)*W:M.length*D});let S=16;b=Math.ceil(b/S)*S;let I=new ArrayBuffer(b);d.forEach((C,M)=>{let D=k[M],W=typeof C.data=="number"?[C.data]:C.data;if(C.type===6)new Int32Array(I,D,W.length).set(W);else if(C.type===12)new Uint32Array(I,D,W.length).set(W);else if(C.type===10)new Uint16Array(I,D,W.length).set(W);else if(C.type===1)new Float32Array(I,D,W.length).set(W);else throw new Error(`Unsupported uniform type: ${vt(C.type)}`)});let A=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(A.buffer,0,I,0,b),this.gpuDataManager.release(A.id),f={offset:0,size:b,buffer:A.buffer}}let g=this.programManager.normalizeDispatchGroupSize(u),h=g[1]===1&&g[2]===1,w=Mc(e,t,h),y=this.programManager.getArtifact(w);if(y||(y=this.programManager.build(e,g),this.programManager.setArtifact(w,y),Se("info",()=>`[artifact] key: ${w}, programName: ${e.name}`)),d&&y.uniformVariablesInfo){if(d.length!==y.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${y.uniformVariablesInfo.length}, got ${d.length} in program "${y.programInfo.name}".`);for(let b=0;b<d.length;b++){let k=d[b],S=k.type,I=typeof k.data=="number"?1:k.data.length,[A,C]=y.uniformVariablesInfo[b];if(S!==A||I!==C)throw new Error(`Uniform variable ${b} mismatch: expect type ${A} with size ${C}, got type ${S} with size ${I} in program "${y.programInfo.name}".`)}}if(Se("info",()=>`[ProgramManager] run "${e.name}" (key=${w}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:y.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(y,s,m,g,f),ot(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=Bc.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),Se("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${d}`)),1}finally{u&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${n}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await mn(this,e,t);return nn(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Se("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Se("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Se("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Wc={};nr(Wc,{init:()=>Fc});var pi,Lc,Fc,Bm=ae(()=>{we(),$t(),ve(),Lh(),pi=class ch{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=j.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=j.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=j.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=j.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(j.size(t)!==j.size(this.dims))throw new Error("Invalid new shape");return new ch(this.module,this.dataType,this.data,t)}},Lc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let o=[];for(let u=0;u<s;u++){let d=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),p=Number(e.getValue(i*n++,a)),m=[];for(let f=0;f<p;f++)m.push(Number(e.getValue(i*n++,a)));o.push(new pi(e,d,c,m))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],n=(s,o,u)=>new pi(this.module,o,this.output(s,u),u),a=(s,o)=>{let u=Ft(s,o);if(!u)throw new Error(`Unsupported data type: ${s}`);let d=u>0?this.backend.gpuDataManager.create(u).id:0;return new pi(this.module,s,d,o)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Fc=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Om(),br(Dc)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,u,d,c=!1)=>{if(c)Se("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(d)}`),s.memcpy(Number(o),Number(u));else{Se("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let p=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));s.upload(Number(u),p)}},async(o,u,d)=>{Se("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${d}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(o,u,d)=>s.createKernel(o,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>s.releaseKernel(o),(o,u,d,c)=>{Se("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${u}`);let p=new Lc(t,s,Number(u));return s.computeKernel(Number(o),p,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new js(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,o,u,d,c)=>a.ensureTensor(s,o,u,d,c),(s,o)=>{a.uploadTensor(s,o)},async(s,o)=>a.downloadTensor(s,o)])}}}),qc,da,pa,Ct,Vc,ca,ci,fa,ha,ma,ga,_a,ya,Gc=ae(()=>{Ph(),Uh(),we(),Wt(),Yi(),As(),qc=(e,t)=>{Ne()._OrtInit(e,t)!==0&&Ae("Can't initialize onnxruntime.")},da=async e=>{qc(e.wasm.numThreads,Qr(e.logLevel))},pa=async(e,t)=>{Ne().asyncInit?.();{let r=(Bm(),br(Wc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let i=e.webgpu.adapter;if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:a}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ne(),e,i)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ne(),e)}}},Ct=new Map,Vc=e=>{let t=Ne(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&Ae("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},ca=(e,t)=>{let r=Ne(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&Ae("Can't get session input/output metadata.");let o=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let u=r.HEAP32[n/4];if(u===0)return[o,0];let d=r.HEAPU32[n/4+1],c=[];for(let p=0;p<d;p++){let m=Number(r.getValue(n+8+p*a,"*"));c.push(m!==0?r.UTF8ToString(m):Number(r.getValue(n+8+(p+d)*a,"*")))}return[o,u,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},ci=e=>{let t=Ne(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},fa=async(e,t)=>{let r,i,n=Ne();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ci(e);let a=0,s=0,o=0,u=[],d=[],c=[];try{if([s,u]=await zs(t),t?.externalData&&n.mountExternalData){let S=[];for(let I of t.externalData){let A=typeof I=="string"?I:I.path;S.push(tn(typeof I=="string"?I:I.data).then(C=>{n.mountExternalData(A,C)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof S!="string"){let I=S,A=I?.context,C=I?.gpuDevice,M=I?.deviceType,D=I?.powerPreference;A?n.currentContext=A:C?n.currentContext=await n.webnnCreateMLContext(C):n.currentContext=await n.webnnCreateMLContext({deviceType:M,powerPreference:D})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),n.webgpuOnCreateSession?.(a),a===0&&Ae("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[p,m]=Vc(a),f=!!t?.enableGraphCapture,g=[],h=[],w=[],y=[],b=[];for(let S=0;S<p;S++){let[I,A,C]=ca(a,S);I===0&&Ae("Can't get an input name."),d.push(I);let M=n.UTF8ToString(I);g.push(M),w.push(A===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:vt(A),shape:C})}for(let S=0;S<m;S++){let[I,A,C]=ca(a,S+p);I===0&&Ae("Can't get an output name."),c.push(I);let M=n.UTF8ToString(I);h.push(M),y.push(A===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:vt(A),shape:C});{if(f&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let D=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[M]??"cpu",W=n.webnnIsGraphOutput;if(D==="cpu"&&W&&W(a,M)){b.push("ml-tensor-cpu-output");continue}if(D!=="cpu"&&D!=="cpu-pinned"&&D!=="gpu-buffer"&&D!=="ml-tensor")throw new Error(`Not supported preferred output location: ${D}.`);if(f&&D!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${D}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(D)}}let k=null;return b.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(o=n._OrtCreateBinding(a),o===0&&Ae("Can't create IO binding."),k={handle:o,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>en(S))}),Ct.set(a,[a,d,c,k,f,!1]),[a,g,h,w,y]}catch(p){throw d.forEach(m=>n._OrtFree(m)),c.forEach(m=>n._OrtFree(m)),o!==0&&n._OrtReleaseBinding(o)!==0&&Ae("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&Ae("Can't release session."),p}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&Ae("Can't release session options."),u.forEach(p=>n._free(p)),n.unmountExternalData?.()}},ha=e=>{let t=Ne(),r=Ct.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,o]=r;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&Ae("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&Ae("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(u=>t._OrtFree(u)),a.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(i)!==0&&Ae("Can't release session."),Ct.delete(e)},ma=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let o=Ne(),u=o.PTR_SIZE,d=e[0],c=e[1],p=e[3],m=p,f,g;if(d==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let y=e[2].gpuBuffer;g=Ft(Lt(d),c);{let b=o.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=b(i,a,y,g)}}else if(p==="ml-tensor"){let y=e[2].mlTensor;g=Ft(Lt(d),c);let b=o.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=b(i,y,Lt(d),c)}else{let y=e[2];if(Array.isArray(y)){g=u*y.length,f=o._malloc(g),r.push(f);for(let b=0;b<y.length;b++){if(typeof y[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);o.setValue(f+b*u,lt(y[b],r),"*")}}else{let b=o.webnnIsGraphInput,k=o.webnnIsGraphOutput;if(d!=="string"&&b&&k){let S=o.UTF8ToString(n);if(b(i,S)||k(i,S)){let I=Lt(d);g=Ft(I,c),m="ml-tensor";let A=o.webnnCreateTemporaryTensor,C=o.webnnUploadTensor;if(!A||!C)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let M=await A(i,I,c);C(M,new Uint8Array(y.buffer,y.byteOffset,y.byteLength)),f=M}else g=y.byteLength,f=o._malloc(g),r.push(f),o.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,g),f)}else g=y.byteLength,f=o._malloc(g),r.push(f),o.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,g),f)}}let h=o.stackSave(),w=o.stackAlloc(4*c.length);try{c.forEach((b,k)=>o.setValue(w+k*u,b,u===4?"i32":"i64"));let y=o._OrtCreateTensor(Lt(d),f,g,w,c.length,en(m));y===0&&Ae(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(y)}finally{o.stackRestore(h)}},ga=async(e,t,r,i,n,a)=>{let s=Ne(),o=s.PTR_SIZE,u=Ct.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],c=u[1],p=u[2],m=u[3],f=u[4],g=u[5],h=t.length,w=i.length,y=0,b=[],k=[],S=[],I=[],A=s.stackSave(),C=s.stackAlloc(h*o),M=s.stackAlloc(h*o),D=s.stackAlloc(w*o),W=s.stackAlloc(w*o);try{[y,b]=Ss(a);for(let v=0;v<h;v++)await ma(r[v],k,I,e,c[t[v]],t[v],f);for(let v=0;v<w;v++)await ma(n[v],S,I,e,p[i[v]],h+i[v],f);for(let v=0;v<h;v++)s.setValue(C+v*o,k[v],"*"),s.setValue(M+v*o,c[t[v]],"*");for(let v=0;v<w;v++)s.setValue(D+v*o,S[v],"*"),s.setValue(W+v*o,p[i[v]],"*");if(m&&!g){let{handle:v,outputPreferredLocations:V,outputPreferredLocationsEncoded:ee}=m;if(c.length!==h)throw new Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${c.length}).`);for(let q=0;q<h;q++){let le=t[q];await s._OrtBindInput(v,c[le],k[q])!==0&&Ae(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<w;q++){let le=i[q];n[q]?.[3]?s._OrtBindOutput(v,p[le],S[q],0)!==0&&Ae(`Can't bind pre-allocated output[${q}] for session=${e}.`):s._OrtBindOutput(v,p[le],0,ee[le])!==0&&Ae(`Can't bind output[${q}] to ${V[q]} for session=${e}.`)}Ct.set(e,[d,c,p,m,f,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d);let J;m?J=await s._OrtRunWithBinding(d,m.handle,w,D,y):J=await s._OrtRun(d,M,C,h,W,w,D,y),J!==0&&Ae("failed to call OrtRun().");let z=[],F=[];for(let v=0;v<w;v++){let V=Number(s.getValue(D+v*o,"*"));if(V===S[v]){z.push(n[v]);continue}let ee=s.stackSave(),q=s.stackAlloc(4*o),le=!1,G,ue=0;try{s._OrtGetTensorData(V,q,q+o,q+2*o,q+3*o)!==0&&Ae(`Can't access output tensor data on index ${v}.`);let B=o===4?"i32":"i64",N=Number(s.getValue(q,B));ue=s.getValue(q+o,"*");let ie=s.getValue(q+o*2,"*"),P=Number(s.getValue(q+o*3,B)),Y=[];for(let ye=0;ye<P;ye++)Y.push(Number(s.getValue(ie+ye*o,B)));s._OrtFree(ie)!==0&&Ae("Can't free memory for tensor dims.");let Ie=Y.reduce((ye,be)=>ye*be,1);G=vt(N);let Be=m?.outputPreferredLocations[i[v]];if(G==="string"){if(Be==="gpu-buffer"||Be==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ye=[];for(let be=0;be<Ie;be++){let ke=s.getValue(ue+be*o,"*"),Pe=s.getValue(ue+(be+1)*o,"*"),je=be===Ie-1?void 0:Pe-ke;ye.push(s.UTF8ToString(ke,je))}z.push([G,Y,ye,"cpu"])}else if(Be==="gpu-buffer"&&Ie>0){let ye=s.jsepGetBuffer;if(!ye)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=ye(ue),ke=Ft(N,Ie);if(ke===void 0||!Qi(G))throw new Error(`Unsupported data type: ${G}`);le=!0,z.push([G,Y,{gpuBuffer:be,download:s.jsepCreateDownloader(be,ke,G),dispose:()=>{s._OrtReleaseTensor(V)!==0&&Ae("Can't release tensor.")}},"gpu-buffer"])}else if(Be==="ml-tensor"&&Ie>0){let ye=s.webnnEnsureTensor,be=s.webnnIsGraphInputOutputTypeSupported;if(!ye||!be)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ft(N,Ie)===void 0||!Ji(G))throw new Error(`Unsupported data type: ${G}`);if(!be(e,G,!1))throw new Error(`preferredLocation "ml-tensor" for ${G} output is not supported by current WebNN Context.`);let ke=await ye(e,ue,N,Y,!1);le=!0,z.push([G,Y,{mlTensor:ke,download:s.webnnCreateMLTensorDownloader(ue,G),dispose:()=>{s.webnnReleaseTensorId(ue),s._OrtReleaseTensor(V)}},"ml-tensor"])}else if(Be==="ml-tensor-cpu-output"&&Ie>0){let ye=s.webnnCreateMLTensorDownloader(ue,G)(),be=z.length;le=!0,F.push((async()=>{let ke=[be,await ye];return s.webnnReleaseTensorId(ue),s._OrtReleaseTensor(V),ke})()),z.push([G,Y,[],"cpu"])}else{let ye=Yr(G),be=new ye(Ie);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(s.HEAPU8.subarray(ue,ue+be.byteLength)),z.push([G,Y,be,"cpu"])}}finally{s.stackRestore(ee),G==="string"&&ue&&s._free(ue),le||s._OrtReleaseTensor(V)}}m&&!f&&(s._OrtClearBoundOutputs(m.handle)!==0&&Ae("Can't clear bound outputs."),Ct.set(e,[d,c,p,m,f,!1]));for(let[v,V]of await Promise.all(F))z[v][2]=V;return z}finally{s.webnnOnRunEnd?.(d),s.stackRestore(A),k.forEach(J=>s._OrtReleaseTensor(J)),S.forEach(J=>s._OrtReleaseTensor(J)),I.forEach(J=>s._free(J)),y!==0&&s._OrtReleaseRunOptions(y),b.forEach(J=>s._free(J))}},_a=e=>{let t=Ne(),r=Ct.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&Ae("Can't get an profile file name."),t._OrtFree(n)},ya=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),zt,nt,lr,Rr,Dr,fi,ba,hi,Zt,Xt,Hc,jc,Kc,Zc,Xc,Yc,Qc,Jc,ef=ae(()=>{ut(),Gc(),Wt(),ji(),zt=()=>!!Me.wasm.proxy&&typeof document<"u",lr=!1,Rr=!1,Dr=!1,hi=new Map,Zt=(e,t)=>{let r=hi.get(e);r?r.push(t):hi.set(e,[t])},Xt=()=>{if(lr||!Rr||Dr||!nt)throw new Error("worker not ready")},Hc=e=>{switch(e.data.type){case"init-wasm":lr=!1,e.data.err?(Dr=!0,ba[1](e.data.err)):(Rr=!0,ba[0]()),fi&&(URL.revokeObjectURL(fi),fi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=hi.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},jc=async()=>{if(!Rr){if(lr)throw new Error("multiple calls to 'initWasm()' detected.");if(Dr)throw new Error("previous call to 'initWasm()' failed.");if(lr=!0,zt())return new Promise((e,t)=>{nt?.terminate(),ws().then(([r,i])=>{try{nt=i,nt.onerror=a=>t(a),nt.onmessage=Hc,ba=[e,t];let n={type:"init-wasm",in:Me};!n.in.wasm.wasmPaths&&(r||qi)&&(n.in.wasm.wasmPaths={wasm:new URL("/vunk-plus/assets/ort-wasm-simd-threaded.jsep-CLPRrI3A.wasm",self.location.href).href}),nt.postMessage(n),fi=r}catch(n){t(n)}},t)});try{await Xi(Me.wasm),await da(Me),Rr=!0}catch(e){throw Dr=!0,e}finally{lr=!1}}},Kc=async e=>{if(zt())return Xt(),new Promise((t,r)=>{Zt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:Me}};nt.postMessage(i)});await pa(Me,e)},Zc=async e=>zt()?(Xt(),new Promise((t,r)=>{Zt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};nt.postMessage(i,[e.buffer])})):ci(e),Xc=async(e,t)=>{if(zt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Xt(),new Promise((r,i)=>{Zt("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),nt.postMessage(n,a)})}else return fa(e,t)},Yc=async e=>{if(zt())return Xt(),new Promise((t,r)=>{Zt("release",[t,r]);let i={type:"release",in:e};nt.postMessage(i)});ha(e)},Qc=async(e,t,r,i,n,a)=>{if(zt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Xt(),new Promise((s,o)=>{Zt("run",[s,o]);let u=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:a}};nt.postMessage(d,ya(u))})}else return ga(e,t,r,i,n,a)},Jc=async e=>{if(zt())return Xt(),new Promise((t,r)=>{Zt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};nt.postMessage(i)});_a(e)}}),wa,tf,rf,Rm=ae(()=>{ut(),ef(),we(),Mi(),As(),wa=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},tf=e=>{switch(e[3]){case"cpu":return new Xe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Qi(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Xe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!Ji(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Xe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},rf=class{async fetchModelAndCopyToWasmMemory(e){return Zc(await tn(e))}async loadModel(e,t){mt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Xc(r,t),ot()}async dispose(){return Yc(this.sessionId)}async run(e,t,r){mt();let i=[],n=[];Object.entries(e).forEach(p=>{let m=p[0],f=p[1],g=this.inputNames.indexOf(m);if(g===-1)throw new Error(`invalid input '${m}'`);i.push(f),n.push(g)});let a=[],s=[];Object.entries(t).forEach(p=>{let m=p[0],f=p[1],g=this.outputNames.indexOf(m);if(g===-1)throw new Error(`invalid output '${m}'`);a.push(f),s.push(g)});let o=i.map((p,m)=>wa(p,()=>`input "${this.inputNames[n[m]]}"`)),u=a.map((p,m)=>p?wa(p,()=>`output "${this.outputNames[s[m]]}"`):null),d=await Qc(this.sessionId,n,o,s,u,r),c={};for(let p=0;p<d.length;p++)c[this.outputNames[s[p]]]=a[p]??tf(d[p]);return ot(),c}startProfiling(){}endProfiling(){Jc(this.sessionId)}}}),nf={};nr(nf,{OnnxruntimeWebAssemblyBackend:()=>$a,initializeFlags:()=>va,wasmBackend:()=>af});var va,$a,af,Dm=ae(()=>{ut(),ef(),Rm(),va=()=>{(typeof Me.wasm.initTimeout!="number"||Me.wasm.initTimeout<0)&&(Me.wasm.initTimeout=0);let e=Me.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Me.wasm.simd=!1),typeof Me.wasm.proxy!="boolean"&&(Me.wasm.proxy=!1),typeof Me.wasm.trace!="boolean"&&(Me.wasm.trace=!1),typeof Me.wasm.numThreads!="number"||!Number.isInteger(Me.wasm.numThreads)||Me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Me.wasm.numThreads=1;else{let t=typeof navigator>"u"?wh("node:os").cpus().length:navigator.hardwareConcurrency;Me.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},$a=class{async init(e){va(),await jc(),await Kc(e)}async createInferenceSessionHandler(e,t){let r=new rf;return await r.loadModel(e,t),r}},af=new $a});ut(),ut(),ut();var Nm="1.22.0";{let e=(Dm(),br(nf)).wasmBackend;ar("webgpu",e,5),ar("webnn",e,5),ar("cpu",e,10),ar("wasm",e,10)}Object.defineProperty(Me.versions,"web",{value:Nm,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xa=32,Mm=xa/2,ka=32;function Pm(e,t,r){if(t.length!==3)throw new Error("Invalid dimensions array provided to getAudioWindow. Expected length 3.");const[i,n,a]=t,s=new Float32Array(xa*n*a),o=n*a;for(let u=0;u<xa;u++){const d=r-Mm+u,p=Math.max(0,Math.min(d,i-1))*o,m=p+o,f=e.subarray(p,m),g=u*o;s.set(f,g)}return s}let At=null,Sa=null;function Um(e,t){if(!At&&(typeof OffscreenCanvas<"u"&&typeof document>"u"?At=new OffscreenCanvas(e,t):At=document.createElement("canvas"),Sa=At.getContext("2d",{willReadFrequently:!0}),!Sa))throw new Error("无法创建全局 canvas 上下文");return(At.width!==e||At.height!==t)&&(At.width=e,At.height=t),Sa}function Wm(e,t,r){if(t<=1)return{nextIndex:0,nextDirection:1};let i=e+r,n=r;return i>=t?(i=t-2,n=-1):i<0&&(i=1,n=1),{nextIndex:i,nextDirection:n}}async function Lm(e,t,r){const i=t.file(e);if(!i)throw new Error(`无法在解压数据中找到张量文件: ${e}`);let n;r===252||r===192?n=6:r===128?n=4:n=3;const a=r-2*n,s=[1,6,a,a],o=await i.async("arraybuffer"),u=new Float32Array(o);return new Xe("float32",u,s)}function Fm(e){const t=e.dims,r=e.data;if(t.length!==4||t[1]!==3&&t[1]!==1)return console.error("不支持的张量维度或通道数，仅支持NCHW [1, 3, H, W] 或 [1, 1, H, W]:",t),null;const i=t[2],n=t[3],s=Um(n,i).createImageData(n,i),o=s.data,u=p=>Math.min(Math.max(p,0),1),d=i*n,c=i*n;for(let p=0;p<d;p++){const m=p*4,f=r[p],g=r[p+c],h=r[p+2*c];o[m]=Math.round(u(h)*255),o[m+1]=Math.round(u(g)*255),o[m+2]=Math.round(u(f)*255),o[m+3]=255}return s}Me.wasm.wasmPaths="./";class qm{constructor(){this.session=null}async initialize(t){const i=await(await fetch(t)).arrayBuffer(),{providers:n,sessionOptions:a}=await Vm();this.session=await Ni.create(new Uint8Array(i),{executionProviders:n,graphOptimizationLevel:"all",...a})}async runInference(t,r){if(!this.session)throw new Error("ONNX session not initialized.");const i={[this.session.inputNames[0]]:t,[this.session.inputNames[1]]:r};return(await this.session.run(i))[this.session.outputNames[0]]}}const sf=new qm;let Ot=null,dr=null,pr=null,mi=0,gi=0,Bt=0,Yt=1,Qt=null,Nr=null,Jt=null,cr=null,er=null,_t=null,tr=null,fr=null;const hr=new Map;let Mr=!1,mr=0,Pr=0,Ur=0;async function Vm(){if(typeof navigator<"u"&&"gpu"in navigator)try{if(await navigator.gpu?.requestAdapter())return{providers:["webgpu"],sessionOptions:{wasm:{numThreads:navigator.hardwareConcurrency||4}}}}catch(e){console.error("WebGPU detection failed, falling back to WASM.",e)}return{providers:["wasm"],sessionOptions:{wasm:{numThreads:navigator.hardwareConcurrency||4}}}}async function Gm(e,t,r,i,n){const a={convertTensor:0,createPredCanvas:0,createPastedCanvas:0,blendOps:0,compositeFinal:0,createImageBitmap:0};let s=performance.now();const o=i.get(t.full_image),u=i.get(t.face_image);if(!o||!u)throw new Error(`Missing image data for frame ${t.frame_id}`);if(!Qt||!Nr||!Jt||!cr||!er||!_t||!tr||!fr)throw new Error("可复用Canvas实例未初始化");s=performance.now();const d=Fm(e);if(a.convertTensor=performance.now()-s,!d)throw new Error(`Failed to convert tensor to image for frame ${t.frame_id}`);const c=r.config.crop_size;let p;c===252||c===192?p=6:c===128?p=4:p=3,s=performance.now(),Nr.clearRect(0,0,Qt.width,Qt.height),Nr.putImageData(d,0,0),a.createPredCanvas=performance.now()-s,s=performance.now(),cr.clearRect(0,0,Jt.width,Jt.height),cr.drawImage(u,0,0),cr.drawImage(Qt,p,p),a.createPastedCanvas=performance.now()-s,s=performance.now(),_t.clearRect(0,0,er.width,er.height),_t.drawImage(Jt,0,0),_t.globalCompositeOperation="destination-in",_t.drawImage(n,0,0,c,c),_t.globalCompositeOperation="destination-over",_t.drawImage(u,0,0),_t.globalCompositeOperation="source-over",a.blendOps=performance.now()-s,s=performance.now(),fr.clearRect(0,0,tr.width,tr.height),fr.drawImage(o,0,0);const{xmin:m,ymin:f,width:g}=t.crop_info,h=t.crop_info.ymax-f;fr.drawImage(er,m,f,g,h),a.compositeFinal=performance.now()-s,s=performance.now();const w=await createImageBitmap(tr);return a.createImageBitmap=performance.now()-s,[w,a]}function Hm(e,t,r,i){const n=e-2*t;Qt=new OffscreenCanvas(n,n),Nr=Qt.getContext("2d"),Jt=new OffscreenCanvas(e,e),cr=Jt.getContext("2d"),er=new OffscreenCanvas(e,e),_t=er.getContext("2d"),tr=new OffscreenCanvas(r,i),fr=tr.getContext("2d")}function of(){Qt=null,Nr=null,Jt=null,cr=null,er=null,_t=null,tr=null,fr=null}async function uf(e,t){const r=t.file(e);if(!r)throw new Error(`Image file not found in ZIP: ${e}`);const i=await r.async("blob");return await createImageBitmap(i)}async function jm(e){if(!Ot||!dr||!pr)throw new Error("共享数据尚未初始化，无法处理chunk");const{chunkIndex:t,audioFeatures:r,audioDimensions:i,startFrame:n}=e,a={loadTensor:0,getAudio:0,onnxRun:0,composite:0,totalFrames:0,t_convertTensor:0,t_createPredCanvas:0,t_createPastedCanvas:0,t_blendOps:0,t_compositeFinal:0,t_createImageBitmap:0},s=Ot.images,o=s.length;if(o===0)throw new Error("Image data is empty.");const[,u,d]=i,c=32,p=i[0];for(let m=0;m<p;m+=ka){const g=Math.min(m+ka,p)-m,h=[],w=[],y=[],b=[];let k=performance.now();for(let W=0;W<g;W++){const J=m+W,z=n+J,F=s[Bt],v=await Lm(F.tensor_file,dr,Ot.dataset_info.config.crop_size),V=Pm(r,i,J),ee=new Xe("float32",V,[1,c,u,d]);h.push(v),w.push(ee),y.push(F),b.push(z);const{nextIndex:q,nextDirection:le}=Wm(Bt,o,Yt);Bt=q,Yt=le}a.loadTensor+=performance.now()-k,k=performance.now();const S=g===1?h[0]:new Xe("float32",new Float32Array(h.flatMap(W=>Array.from(W.data))),[g,...h[0].dims.slice(1)]),I=g===1?w[0]:new Xe("float32",new Float32Array(w.flatMap(W=>Array.from(W.data))),[g,c,u,d]);a.getAudio+=performance.now()-k,k=performance.now();const A=await sf.runInference(S,I);a.onnxRun+=performance.now()-k;const C=A.dims,M=A.data,D=M.length/g;for(let W=0;W<g;W++){const J=b[W],z=y[W],F=M.slice(W*D,(W+1)*D),v=new Xe("float32",F,[1,...C.slice(1)]);try{const V=await uf(z.full_image,dr),ee=await uf(z.face_image,dr),q=new Map;q.set(z.full_image,V),q.set(z.face_image,ee),k=performance.now();const[le,G]=await Gm(v,z,Ot.dataset_info,q,pr);a.composite+=performance.now()-k,self.postMessage({type:"frame",payload:{frame:le,frameIndex:J}},{transfer:[le]}),gi++,self.postMessage({type:"progress",payload:{processed:gi,total:mi}}),Pr===0&&(Pr=performance.now(),Ur=0),Ur++;const ue=performance.now(),B=(ue-Pr)/1e3;if(B>=1){const N=Ur/B;console.debug(`推理FPS: ${N.toFixed(2)} 帧/秒 (批处理大小: ${ka})`),Pr=ue,Ur=0}a.t_convertTensor+=G.convertTensor,a.t_createPredCanvas+=G.createPredCanvas,a.t_createPastedCanvas+=G.createPastedCanvas,a.t_blendOps+=G.blendOps,a.t_compositeFinal+=G.compositeFinal,a.t_createImageBitmap+=G.createImageBitmap,v.dispose()}catch(V){throw console.error(`处理帧 ${J} 时发生错误:`,V),V}a.totalFrames++}g>1&&(S.dispose(),I.dispose()),A.dispose(),h.forEach(W=>W.dispose()),w.forEach(W=>W.dispose())}self.postMessage({type:"chunk_complete",payload:{chunkIndex:t,timings:a}})}async function lf(){if(!Mr&&hr.has(mr)){Mr=!0;const e=hr.get(mr);hr.delete(mr);try{await jm(e)}catch(t){self.postMessage({type:"error",payload:t.message||"处理chunk时发生未知错误"})}finally{mr++,Mr=!1,queueMicrotask(lf)}}}self.onmessage=async e=>{try{const{type:t}=e.data;if(t==="init")await sf.initialize(e.data.modelPath),self.postMessage({type:"ready"});else if(t==="init_streaming"){Ot=e.data.dataset,dr=await gh.loadAsync(e.data.zipBuffer),pr=e.data.blendingMaskBitmap,of();const r=Ot.dataset_info,i=r.config.crop_size;let n;i===252||i===192?n=6:i===128?n=4:n=3;const a=r.source_image_dimensions;if(!a)throw new Error("数据集中缺少源图像尺寸信息");Hm(i,n,a.width,a.height),gi=0,mi=0;const s=Ot.images.length;if(s>0){const o=e.data.startImageIndex||0;if(s>1){const u=(s-1)*2,d=u>0?o%u:0;d<s?(Bt=d,Yt=1):(Bt=u-d,Yt=-1)}else Bt=0,Yt=1}else Bt=0,Yt=1;hr.clear(),Mr=!1,mr=0,Pr=0,Ur=0}else if(t==="streaming_run"){const r=e.data.chunkData;hr.set(r.chunkIndex,r),lf()}else t==="finish_chunks"?mi=e.data.totalFrames:t==="stop"&&(Ot=null,dr=null,pr&&(pr.close(),pr=null),of(),gi=0,mi=0,Bt=0,Yt=1,hr.clear(),Mr=!1,mr=0)}catch(t){const r=t;console.error("Streaming inference worker error:",r),self.postMessage({type:"error",payload:r.message||"An unknown error occurred in the streaming inference worker."})}}})();
