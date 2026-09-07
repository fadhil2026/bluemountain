const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-DwDmFVzo.js","./_commonjsHelpers-C4iS2aBk.js","./vendor-pdf-DV7uGGo9.js"])))=>i.map(i=>d[i]);
import{X as Ri}from"./vendor-db-1iEchKay.js";import{_ as Nn}from"./vendor-pdf-DV7uGGo9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Li=Symbol.for("@supabase/supabase-js.traceContextExtractor");function Ni(){return globalThis[Li]}function Vn(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function Oi(t,e,n,s){function r(a){return a instanceof n?a:new n(function(i){i(a)})}return new(n||(n=Promise))(function(a,i){function o(d){try{c(s.next(d))}catch(u){i(u)}}function l(d){try{c(s.throw(d))}catch(u){i(u)}}function c(d){d.done?a(d.value):r(d.value).then(o,l)}c((s=s.apply(t,e||[])).next())})}const Bi=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class Hs extends Error{constructor(e,n="FunctionsError",s){super(e),this.name=n,this.context=s}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class ji extends Hs{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class lr extends Hs{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class cr extends Hs{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Ps;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(Ps||(Ps={}));class Di{constructor(e,{headers:n={},customFetch:s,region:r=Ps.Any}={}){this.url=e,this.headers=n,this.region=r,this.fetch=Bi(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Oi(this,arguments,void 0,function*(n,s={}){var r,a;let i,o,l;try{const{headers:c,method:d,body:u,signal:p,timeout:h}=s;let g={},{region:f}=s;f||(f=this.region);const b=new URL(`${this.url}/${n}`);f&&f!=="any"&&(g["x-region"]=f,b.searchParams.set("forceFunctionRegion",f));let y;const m=!!c&&Object.keys(c).some($=>$.toLowerCase()==="content-type");u&&!m?typeof Blob<"u"&&u instanceof Blob||u instanceof ArrayBuffer?(g["Content-Type"]="application/octet-stream",y=u):typeof u=="string"?(g["Content-Type"]="text/plain",y=u):typeof FormData<"u"&&u instanceof FormData?y=u:(g["Content-Type"]="application/json",y=JSON.stringify(u)):u&&typeof u!="string"&&!(typeof Blob<"u"&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<"u"&&u instanceof FormData)?y=JSON.stringify(u):y=u;let v=p;h&&(o=new AbortController,i=setTimeout(()=>o.abort(),h),p?(v=o.signal,l=()=>o.abort(),p.addEventListener("abort",l)):v=o.signal);const x=yield this.fetch(b.toString(),{method:d||"POST",headers:Object.assign(Object.assign(Object.assign({},g),this.headers),c),body:y,signal:v}).catch($=>{throw new ji($)}),S=x.headers.get("x-relay-error");if(S&&S==="true")throw new lr(x);if(!x.ok)throw new cr(x);let w=((r=x.headers.get("Content-Type"))!==null&&r!==void 0?r:"text/plain").split(";")[0].trim().toLowerCase(),E;return w==="application/json"?E=yield x.json():w==="application/octet-stream"||w==="application/pdf"?E=yield x.blob():w==="text/event-stream"?E=x:w==="multipart/form-data"?E=yield x.formData():E=yield x.text(),{data:E,error:null,response:x}}catch(c){return{data:null,error:c,response:c instanceof cr||c instanceof lr?c.context:void 0}}finally{i&&clearTimeout(i),l&&((a=s.signal)===null||a===void 0||a.removeEventListener("abort",l))}})}}const la=3,dr=t=>Math.min(1e3*2**t,3e4),Ui=[520,503],ca=["GET","HEAD","OPTIONS"];var as=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function Gt(t){"@babel/helpers - typeof";return Gt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Gt(t)}function Mi(t,e){if(Gt(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var s=n.call(t,e);if(Gt(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function zi(t){var e=Mi(t,"string");return Gt(e)=="symbol"?e:e+""}function Ki(t,e,n){return(e=zi(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ur(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,s)}return n}function yt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ur(Object(n),!0).forEach(function(s){Ki(t,s,n[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ur(Object(n)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(n,s))})}return t}function hr(t,e){return new Promise(n=>{if(e!=null&&e.aborted){n();return}const s=setTimeout(()=>{e==null||e.removeEventListener("abort",r),n()},t);function r(){clearTimeout(s),n()}e==null||e.addEventListener("abort",r)})}function Fi(t,e,n,s){return!(!s||n>=la||!ca.includes(t)||!Ui.includes(e))}var Hi=class{constructor(t){var e,n,s,r,a;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(n=t.isMaybeSingle)!==null&&n!==void 0?n:!1,this.shouldStripNulls=(s=t.shouldStripNulls)!==null&&s!==void 0?s:!1,this.urlLengthLimit=(r=t.urlLengthLimit)!==null&&r!==void 0?r:8e3,this.retryEnabled=(a=t.retry)!==null&&a!==void 0?a:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var n=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const i=this.headers.get("Accept");i==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!i||i==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const s=this.fetch;let a=(async()=>{let i=0;for(;;){const c={};n.headers.forEach((u,p)=>{c[p]=u}),i>0&&(c["X-Retry-Count"]=String(i));let d;try{d=await s(n.url.toString(),{method:n.method,headers:c,body:JSON.stringify(n.body,(u,p)=>typeof p=="bigint"?p.toString():p),signal:n.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!ca.includes(n.method))throw u;if(n.retryEnabled&&i<la){const p=dr(i);i++,await hr(p,n.signal);continue}throw u}if(Fi(n.method,d.status,i,n.retryEnabled)){var o,l;const u=(o=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,p=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:dr(i);await d.text(),i++,await hr(p,n.signal);continue}return await n.processResponse(d)}})();return this.shouldThrowOnError||(a=a.catch(i=>{var o;let l="",c="",d="";const u=i==null?void 0:i.cause;if(u){var p,h,g,f;const m=(p=u==null?void 0:u.message)!==null&&p!==void 0?p:"",v=(h=u==null?void 0:u.code)!==null&&h!==void 0?h:"";l=`${(g=i==null?void 0:i.name)!==null&&g!==void 0?g:"FetchError"}: ${i==null?void 0:i.message}`,l+=`

Caused by: ${(f=u==null?void 0:u.name)!==null&&f!==void 0?f:"Error"}: ${m}`,v&&(l+=` (${v})`),u!=null&&u.stack&&(l+=`
${u.stack}`)}else{var b;l=(b=i==null?void 0:i.stack)!==null&&b!==void 0?b:""}const y=this.url.toString().length;return(i==null?void 0:i.name)==="AbortError"||(i==null?void 0:i.code)==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",y>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",y>this.urlLengthLimit&&(c+=`. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=i==null?void 0:i.name)!==null&&o!==void 0?o:"FetchError"}: ${i==null?void 0:i.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),a.then(t,e)}async processResponse(t){var e=this;let n=null,s=null,r=null,a=t.status,i=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await t.text();if(h!=="")if(e.headers.get("Accept")==="text/csv")s=h;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))s=h;else try{s=JSON.parse(h)}catch{if(n={message:h},s=null,e.shouldThrowOnError)throw new as({message:h,details:"",hint:"",code:""})}}const u=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),p=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(u&&p&&p.length>1&&(r=parseInt(p[1])),e.isMaybeSingle&&Array.isArray(s))if(s.length>1){if(n={code:"PGRST116",details:`Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},s=null,r=null,a=406,i="Not Acceptable",e.shouldThrowOnError){var d;throw new as(yt(yt({},n),{},{hint:(d=n.hint)!==null&&d!==void 0?d:""}))}}else s.length===1?s=s[0]:s=null}else{const u=await t.text();try{n=JSON.parse(u),Array.isArray(n)&&t.status===404&&(s=[],n=null,a=200,i="OK")}catch{t.status===404&&u===""?(a=204,i="No Content"):n={message:u}}if(n&&e.shouldThrowOnError)throw new as(n)}return{success:n===null,error:n,data:s,count:r,status:a,statusText:i}}returns(){return this}overrideTypes(){return this}},qi=class extends Hi{throwOnError(){return super.throwOnError()}select(t){let e=!1;const n=(t??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",n),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:n,foreignTable:s,referencedTable:r=s}={}){const a=r?`${r}.order`:"order",i=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${i?`${i},`:""}${t}.${e?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:n=e}={}){const s=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:n,referencedTable:s=n}={}){const r=typeof s>"u"?"offset":`${s}.offset`,a=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(r,`${t}`),this.url.searchParams.set(a,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:n=!1,buffers:s=!1,wal:r=!1,format:a="text"}={}){var i;const o=[t?"analyze":null,e?"verbose":null,n?"settings":null,s?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(i=this.headers.get("Accept"))!==null&&i!==void 0?i:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const pr=new RegExp("[,()]");var gt=class extends qi{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const n=Array.from(new Set(e)).map(s=>typeof s=="string"&&pr.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${n})`),this}notIn(t,e){const n=Array.from(new Set(e)).map(s=>typeof s=="string"&&pr.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`not.in.(${n})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:n,type:s}={}){let r="";s==="plain"?r="pl":s==="phrase"?r="ph":s==="websearch"&&(r="w");const a=n===void 0?"":`(${n})`;return this.url.searchParams.append(t,`${r}fts${a}.${e}`),this}match(t){return Object.entries(t).filter(([e,n])=>n!==void 0).forEach(([e,n])=>{this.url.searchParams.append(e,`eq.${n}`)}),this}not(t,e,n){return this.url.searchParams.append(t,`not.${e}.${n}`),this}or(t,{foreignTable:e,referencedTable:n=e}={}){const s=n?`${n}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,n){return this.url.searchParams.append(t,`${e}.${n}`),this}},Wi=class{constructor(t,{headers:e={},schema:n,fetch:s,urlLengthLimit:r=8e3,retry:a}){this.url=t,this.headers=new Headers(e),this.schema=n,this.fetch=s,this.urlLengthLimit=r,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:n=!1,count:s}=e??{},r=n?"HEAD":"GET";let a=!1;const i=(t??"*").split("").map(c=>/\s/.test(c)&&!a?"":(c==='"'&&(a=!a),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",i),s&&l.append("Prefer",`count=${s}`),new gt({method:r,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:n=!0}={}){var s;const r="POST",{url:a,headers:i}=this.cloneRequestState();if(e&&i.append("Prefer",`count=${e}`),n||i.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);a.searchParams.set("columns",l.join(","))}}return new gt({method:r,url:a,headers:i,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:n=!1,count:s,defaultToNull:r=!0}={}){var a;const i="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${n?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),s&&l.append("Prefer",`count=${s}`),r||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",d.join(","))}}return new gt({method:i,url:o,headers:l,schema:this.schema,body:t,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var n;const s="PATCH",{url:r,headers:a}=this.cloneRequestState();return e&&a.append("Prefer",`count=${e}`),new gt({method:s,url:r,headers:a,schema:this.schema,body:t,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const n="DELETE",{url:s,headers:r}=this.cloneRequestState();return t&&r.append("Prefer",`count=${t}`),new gt({method:n,url:s,headers:r,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Gi=class da{constructor(e,{headers:n={},schema:s,fetch:r,timeout:a,urlLengthLimit:i=8e3,retry:o}={}){this.url=e,this.headers=new Headers(n),this.schemaName=s,this.urlLengthLimit=i;const l=r??globalThis.fetch;a!==void 0&&a>0?this.fetch=(c,d)=>{const u=new AbortController,p=setTimeout(()=>u.abort(),a),h=d==null?void 0:d.signal;if(h){if(h.aborted)return clearTimeout(p),l(c,d);const g=()=>{clearTimeout(p),u.abort()};return h.addEventListener("abort",g,{once:!0}),l(c,yt(yt({},d),{},{signal:u.signal})).finally(()=>{clearTimeout(p),h.removeEventListener("abort",g)})}return l(c,yt(yt({},d),{},{signal:u.signal})).finally(()=>clearTimeout(p))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Wi(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new da(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,n={},{head:s=!1,get:r=!1,count:a}={}){var i;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(d)),u=s&&Object.values(n).some(d);u?(o="POST",c=n):s||r?(o=s?"HEAD":"GET",Object.entries(n).filter(([h,g])=>g!==void 0).map(([h,g])=>[h,Array.isArray(g)?`{${g.join(",")}}`:`${g}`]).forEach(([h,g])=>{l.searchParams.append(h,g)})):(o="POST",c=n);const p=new Headers(this.headers);return u?p.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&p.set("Prefer",`count=${a}`),new gt({method:o,url:l,headers:p,schema:this.schemaName,body:c,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Vi{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const n=globalThis;if(typeof globalThis<"u"&&typeof n.WebSocket<"u")return{type:"native",wsConstructor:n.WebSocket};const s=typeof global<"u"?global:void 0;if(s&&typeof s.WebSocket<"u")return{type:"native",wsConstructor:s.WebSocket};if(typeof globalThis<"u"&&typeof n.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&n.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const a=r.versions;if(a&&a.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let n=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(n+=`

Suggested solution: ${e.workaround}`),new Error(n)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const Ji="2.112.4",Yi=`realtime-js/${Ji}`,Xi="1.0.0",ua="2.0.0",Qi=ua,Zi=1e4,eo=100,Fe={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},ha={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Cs={connecting:"connecting",closing:"closing",closed:"closed"};class to{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,n){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return n(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return n(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var n;return this._isArrayBuffer((n=e.payload)===null||n===void 0?void 0:n.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var n,s;const r=(s=(n=e.payload)===null||n===void 0?void 0:n.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,r)}_encodeJsonUserBroadcastPush(e){var n,s;const r=(s=(n=e.payload)===null||n===void 0?void 0:n.payload)!==null&&s!==void 0?s:{},i=new TextEncoder().encode(JSON.stringify(r)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(e,n,s){var r,a;const i=new TextEncoder,o=i.encode(e.topic),l=i.encode((r=e.ref)!==null&&r!==void 0?r:""),c=i.encode((a=e.join_ref)!==null&&a!==void 0?a:""),d=i.encode(e.payload.event),u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},p=i.encode(Object.keys(u).length===0?"":JSON.stringify(u));if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(p.length>255)throw new Error(`metadata length ${p.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+d.length+p.length,g=new ArrayBuffer(this.HEADER_LENGTH+h),f=new DataView(g),b=new Uint8Array(g);let y=0;f.setUint8(y++,this.KINDS.userBroadcastPush),f.setUint8(y++,c.length),f.setUint8(y++,l.length),f.setUint8(y++,o.length),f.setUint8(y++,d.length),f.setUint8(y++,p.length),f.setUint8(y++,n),b.set(c,y),y+=c.length,b.set(l,y),y+=l.length,b.set(o,y),y+=o.length,b.set(d,y),y+=d.length,b.set(p,y),y+=p.length;var m=new Uint8Array(g.byteLength+s.byteLength);return m.set(new Uint8Array(g),0),m.set(new Uint8Array(s),g.byteLength),m.buffer}decode(e,n){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return n(s)}if(typeof e=="string"){const s=JSON.parse(e),[r,a,i,o,l]=s;return n({join_ref:r,ref:a,topic:i,event:o,payload:l})}return n({})}_binaryDecode(e){const n=new DataView(e),s=n.getUint8(0),r=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,n,r)}}_decodeUserBroadcast(e,n,s){const r=n.getUint8(1),a=n.getUint8(2),i=n.getUint8(3),o=n.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+r));l=l+r;const d=s.decode(e.slice(l,l+a));l=l+a;const u=s.decode(e.slice(l,l+i));l=l+i;const p=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(s.decode(p)):p,g={type:this.BROADCAST_EVENT,event:d,payload:h};return i>0&&(g.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:g}}_isArrayBuffer(e){var n;return e instanceof ArrayBuffer||((n=e==null?void 0:e.constructor)===null||n===void 0?void 0:n.name)==="ArrayBuffer"}_pick(e,n){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>n.includes(s)))}}var V;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(V||(V={}));const fr=(t,e,n={})=>{var s;const r=(s=n.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((a,i)=>(a[i]=no(i,t,e,r),a),{}):{}},no=(t,e,n,s)=>{const r=e.find(o=>o.name===t),a=r==null?void 0:r.type,i=n[t];return a&&!s.includes(a)?pa(a,i):Is(i)},pa=(t,e)=>{if(t.charAt(0)==="_"){const n=t.slice(1,t.length);return io(e,n)}switch(t){case V.bool:return so(e);case V.float4:case V.float8:case V.int2:case V.int4:case V.int8:case V.numeric:case V.oid:return ro(e);case V.json:case V.jsonb:return ao(e);case V.timestamp:return oo(e);case V.abstime:case V.date:case V.daterange:case V.int4range:case V.int8range:case V.money:case V.reltime:case V.text:case V.time:case V.timestamptz:case V.timetz:case V.tsrange:case V.tstzrange:return Is(e);default:return Is(e)}},Is=t=>t,so=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},ro=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},ao=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},io=(t,e)=>{if(typeof t!="string")return t;const n=t.length-1,s=t[n];if(t[0]==="{"&&s==="}"){let a;const i=t.slice(1,n);try{a=JSON.parse("["+i+"]")}catch{a=i?i.split(","):[]}return a.map(o=>pa(e,o))}return t},oo=t=>typeof t=="string"?t.replace(" ","T"):t,fa=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var wt=t=>typeof t=="function"?t:function(){return t},lo=typeof self<"u"?self:null,mt=typeof window<"u"?window:null,Ee=lo||mt||globalThis,co="2.0.0",uo=1e4,ho=1e3,po=100,Ie={connecting:0,open:1,closing:2,closed:3},de={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Be={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},$s={longpoll:"longpoll",websocket:"websocket"},fo={complete:4},Rs="base64url.bearer.phx.",fn=class{constructor(t,e,n,s){this.channel=t,this.event=e,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=s,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:n}){this.recHooks.filter(s=>s.status===t).forEach(s=>s.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},ga=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},go=class{constructor(t,e,n){this.state=de.closed,this.topic=t,this.params=wt(e||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new fn(this,Be.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new ga(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=de.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this.joinPush.receive("error",s=>{this.state=de.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=de.closed,this.socket.remove(this)}),this.onError(s=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.isJoining()&&this.joinPush.reset(),this.state=de.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new fn(this,Be.leave,wt({}),this.timeout).send(),this.state=de.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Be.reply,(s,r)=>{this.trigger(this.replyEventName(r),s)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=de.closed,this.bindings=[]}onClose(t){this.on(Be.close,t)}onError(t){return this.on(Be.error,e=>t(e))}on(t,e){let n=this.bindingRef++;return this.bindings.push({event:t,ref:n,callback:e}),n}off(t,e){this.bindings=this.bindings.filter(n=>!(n.event===t&&(typeof e>"u"||e===n.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,n=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let s=new fn(this,t,function(){return e},n);return this.canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=de.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Be.close,"leave")},n=new fn(this,Be.leave,wt({}),t);return n.receive("ok",()=>e()).receive("timeout",()=>e()),n.send(),this.canPush()||n.trigger("ok",{}),n}onMessage(t,e,n){return e}filterBindings(t,e,n){return!0}isMember(t,e,n,s){return this.topic!==t?!1:s&&s!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:n,joinRef:s}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=de.joining,this.joinPush.resend(t))}trigger(t,e,n,s){let r=this.onMessage(t,e,n,s);if(e&&!r)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let a=this.bindings.filter(i=>i.event===t&&this.filterBindings(i,e,n));for(let i=0;i<a.length;i++)a[i].callback(r,n,s||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===de.closed}isErrored(){return this.state===de.errored}isJoined(){return this.state===de.joined}isJoining(){return this.state===de.joining}isLeaving(){return this.state===de.leaving}},On=class{static request(t,e,n,s,r,a,i){if(Ee.XDomainRequest){let o=new Ee.XDomainRequest;return this.xdomainRequest(o,t,e,s,r,a,i)}else if(Ee.XMLHttpRequest){let o=new Ee.XMLHttpRequest;return this.xhrRequest(o,t,e,n,s,r,a,i)}else{if(Ee.fetch&&Ee.AbortController)return this.fetchRequest(t,e,n,s,r,a,i);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,n,s,r,a,i){let o={method:t,headers:n,body:s},l=null;return r&&(l=new AbortController,setTimeout(()=>l.abort(),r),o.signal=l.signal),Ee.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>i&&i(c)).catch(c=>{c.name==="AbortError"&&a?a():i&&i(null)}),l}static xdomainRequest(t,e,n,s,r,a,i){return t.timeout=r,t.open(e,n),t.onload=()=>{let o=this.parseJSON(t.responseText);i&&i(o)},a&&(t.ontimeout=a),t.onprogress=()=>{},t.send(s),t}static xhrRequest(t,e,n,s,r,a,i,o){t.open(e,n,!0),t.timeout=a;for(let[l,c]of Object.entries(s))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===fo.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},i&&(t.ontimeout=i),t.send(r),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return null}}static serialize(t,e){let n=[];for(var s in t){if(!Object.prototype.hasOwnProperty.call(t,s))continue;let r=e?`${e}[${s}]`:s,a=t[s];typeof a=="object"?n.push(this.serialize(a,r)):n.push(encodeURIComponent(r)+"="+encodeURIComponent(a))}return n.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let n=t.match(/\?/)?"&":"?";return`${t}${n}${this.serialize(e)}`}},mo=t=>{let e="",n=new Uint8Array(t),s=n.byteLength;for(let r=0;r<s;r++)e+=String.fromCharCode(n[r]);return btoa(e)},ot=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(Rs)&&(this.authToken=atob(e[1].slice(Rs.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=Ie.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+$s.websocket),"$1/"+$s.longpoll)}endpointURL(){return On.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,n){this.close(t,e,n),this.readyState=Ie.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===Ie.open||this.readyState===Ie.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:n,token:s,messages:r}=e;if(n===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=s}else n=0;switch(n){case 200:r.forEach(a=>{setTimeout(()=>this.onmessage({data:a}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=Ie.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${n}`)}})}send(t){typeof t!="string"&&(t=mo(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t,e=0){this.awaitingBatchAck=!0;const n=e+po,s=t.slice(e,n);this.ajax("POST",{"Content-Type":"application/x-ndjson"},s.join(`
`),()=>this.onerror("timeout"),r=>{!r||r.status!==200?(this.awaitingBatchAck=!1,this.onerror(r&&r.status),this.closeAndRetry(1011,"internal server error",!1)):n<t.length?this.batchSend(t,n):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(t,e,n){for(let r of this.reqs)r.abort();this.readyState=Ie.closed;let s=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",s)):this.onclose(s)}ajax(t,e,n,s,r){let a,i=()=>{this.reqs.delete(a),s()};a=On.request(t,this.endpointURL(),e,n,this.timeout,i,o=>{this.reqs.delete(a),this.isActive()&&r(o)}),this.reqs.add(a)}},bo=class Mt{constructor(e,n={}){let s=n.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(s.state,r=>{let{onJoin:a,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=Mt.syncState(this.state,r,a,i),this.pendingDiffs.forEach(l=>{this.state=Mt.syncDiff(this.state,l,a,i)}),this.pendingDiffs=[],o()}),this.channel.on(s.diff,r=>{let{onJoin:a,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(r):(this.state=Mt.syncDiff(this.state,r,a,i),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return Mt.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,n,s,r){let a=this.toNullProtoObj(this.clone(e));n=this.toNullProtoObj(n);let i=Object.create(null),o=Object.create(null);return this.map(a,(l,c)=>{n[l]||(o[l]=c)}),this.map(n,(l,c)=>{let d=a[l];if(d){let u=c.metas.map(f=>f.phx_ref),p=d.metas.map(f=>f.phx_ref),h=c.metas.filter(f=>p.indexOf(f.phx_ref)<0),g=d.metas.filter(f=>u.indexOf(f.phx_ref)<0);h.length>0&&(i[l]=c,i[l].metas=h),g.length>0&&(o[l]=this.clone(d),o[l].metas=g)}else i[l]=c}),this.syncDiff(a,{joins:i,leaves:o},s,r)}static syncDiff(e,n,s,r){e=this.toNullProtoObj(e);let{joins:a,leaves:i}=this.clone(n);return s||(s=function(){}),r||(r=function(){}),this.map(a,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let d=e[o].metas.map(p=>p.phx_ref),u=c.metas.filter(p=>d.indexOf(p.phx_ref)<0);e[o].metas.unshift(...u)}s(o,c,l)}),this.map(i,(o,l)=>{let c=e[o];if(!c)return;let d=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>d.indexOf(u.phx_ref)<0),r(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,n){return n||(n=function(s,r){return r}),this.map(e,(s,r)=>n(s,r))}static map(e,n){return Object.getOwnPropertyNames(e).map(s=>n(s,e[s]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let n=Object.create(null);return Object.getOwnPropertyNames(e).forEach(s=>{n[s]=e[s]}),n}static clone(e){return JSON.parse(JSON.stringify(e))}},gn={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let n=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(n))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[n,s,r,a,i]=JSON.parse(t);return e({join_ref:n,ref:s,topic:r,event:a,payload:i})}},binaryEncode(t){let{join_ref:e,ref:n,event:s,topic:r,payload:a}=t,i=new TextEncoder,o=i.encode(e),l=i.encode(n),c=i.encode(r),d=i.encode(s);this.assertFieldSize(o.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(c.byteLength,"topic"),this.assertFieldSize(d.byteLength,"event");let u=this.META_LENGTH+o.byteLength+l.byteLength+c.byteLength+d.byteLength,p=new ArrayBuffer(this.HEADER_LENGTH+u),h=new Uint8Array(p),g=new DataView(p),f=0;g.setUint8(f++,this.KINDS.push),g.setUint8(f++,o.byteLength),g.setUint8(f++,l.byteLength),g.setUint8(f++,c.byteLength),g.setUint8(f++,d.byteLength),h.set(o,f),f+=o.byteLength,h.set(l,f),f+=l.byteLength,h.set(c,f),f+=c.byteLength,h.set(d,f),f+=d.byteLength;var b=new Uint8Array(p.byteLength+a.byteLength);return b.set(h,0),b.set(new Uint8Array(a),p.byteLength),b.buffer},assertFieldSize(t,e){if(t>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`)},binaryDecode(t){let e=new DataView(t),n=e.getUint8(0),s=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(t,e,s);case this.KINDS.reply:return this.decodeReply(t,e,s);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,s)}},decodePush(t,e,n){let s=e.getUint8(1),r=e.getUint8(2),a=e.getUint8(3),i=this.HEADER_LENGTH+this.META_LENGTH-1,o=n.decode(t.slice(i,i+s));i=i+s;let l=n.decode(t.slice(i,i+r));i=i+r;let c=n.decode(t.slice(i,i+a));i=i+a;let d=t.slice(i,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:d}},decodeReply(t,e,n){let s=e.getUint8(1),r=e.getUint8(2),a=e.getUint8(3),i=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=n.decode(t.slice(o,o+s));o=o+s;let c=n.decode(t.slice(o,o+r));o=o+r;let d=n.decode(t.slice(o,o+a));o=o+a;let u=n.decode(t.slice(o,o+i));o=o+i;let p=t.slice(o,t.byteLength),h={status:u,response:p};return{join_ref:l,ref:c,topic:d,event:Be.reply,payload:h}},decodeBroadcast(t,e,n){let s=e.getUint8(1),r=e.getUint8(2),a=this.HEADER_LENGTH+2,i=n.decode(t.slice(a,a+s));a=a+s;let o=n.decode(t.slice(a,a+r));a=a+r;let l=t.slice(a,t.byteLength);return{join_ref:null,ref:null,topic:i,event:o,payload:l}}},yo=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||uo,this.transport=e.transport||Ee.WebSocket||ot,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let n=null;try{n=Ee&&Ee.sessionStorage}catch{}this.sessionStore=e.sessionStorage||n,this.establishedConnections=0,this.defaultEncoder=gn.encode.bind(gn),this.defaultDecoder=gn.decode.bind(gn),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==ot?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let s=null;mt&&mt.addEventListener&&(mt.addEventListener("pagehide",r=>{this.conn&&(this.disconnect(),s=this.connectClock)}),mt.addEventListener("pageshow",r=>{s===this.connectClock&&(s=null,this.connect())}),mt.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=r=>e.rejoinAfterMs?e.rejoinAfterMs(r):[1e3,2e3,5e3][r-1]||1e4,this.reconnectAfterMs=r=>e.reconnectAfterMs?e.reconnectAfterMs(r):[10,50,100,150,200,250,500,1e3,2e3][r-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(r,a,i)=>{}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=wt(e.params||{}),this.endPoint=`${t}/${$s.websocket}`,this.vsn=e.vsn||co,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new ga(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&wt(e.authToken)}getLongPollTransport(){return ot}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=On.appendParams(On.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,n)}connect(t){t&&(this.params=wt(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==ot?this.connectWithFallback(ot,this.longPollFallbackMs):this.transportConnect())}log(t,e,n){this.logger&&this.logger(t,e,n)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),n=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let s=this.onMessage(r=>{r.ref===e&&(this.off([s]),t(Date.now()-n))});return!0}transportName(t){switch(t){case ot:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${Rs}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let n=!1,s=!0,r,a,i=this.transportName(t),o=l=>{this.log("transport",`falling back to ${i}...`,l),this.off([r,a]),s=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${i}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),a=this.onError(l=>{this.log("transport","error",l),s&&!n&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!s){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),ho,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,n){if(!this.conn)return t&&t();const s=this.conn;this.waitForBufferDone(s,()=>{e?s.close(e,n||""):s.close(),this.waitForSocketClosed(s,()=>{this.conn===s&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,n=1){if(n===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,n+1)},150*n)}waitForSocketClosed(t,e,n=1){if(n===5||t.readyState===Ie.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,n+1)},150*n)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,n=this.establishedConnections;this.triggerStateCallbacks("error",t,e,n),(e===this.transport||n>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Be.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case Ie.connecting:return"connecting";case Ie.open:return"open";case Ie.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([n])=>t.indexOf(n)===-1)}channel(t,e={}){let n=new go(t,e,this);return this.channels.push(n),n}push(t){if(this.hasLogger()){let{topic:e,event:n,payload:s,ref:r,join_ref:a}=t;this.log("push",`${e} ${n} (${a}, ${r})`,s)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:n,event:s,payload:r,ref:a,join_ref:i}=e;if(a&&a===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${r.status||""} ${n} ${s} ${a&&"("+a+")"||""}`.trim(),r);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(n,s,r,i)&&l.trigger(s,r,a,i)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([n,s])=>{try{s(...e)}catch(r){this.log("error",`error in ${t} callback`,r)}})}catch(n){this.log("error",`error triggering ${t} callbacks`,n)}}leaveOpenTopic(t){let e=this.channels.find(n=>n.topic===t&&(n.isJoined()||n.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class Ht{constructor(e,n){const s=wo(n);this.presence=new bo(e.getChannel(),s),this.presence.onJoin((r,a,i)=>{const o=Ht.onJoinPayload(r,a,i);e.getChannel().trigger("presence",o)}),this.presence.onLeave((r,a,i)=>{const o=Ht.onLeavePayload(r,a,i);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return Ht.transformState(this.presence.state)}static transformState(e){return e=vo(e),Object.getOwnPropertyNames(e).reduce((n,s)=>{const r=e[s];return n[s]=An(r),n},{})}static onJoinPayload(e,n,s){const r=gr(n),a=An(s);return{event:"join",key:e,currentPresences:r,newPresences:a}}static onLeavePayload(e,n,s){const r=gr(n),a=An(s);return{event:"leave",key:e,currentPresences:r,leftPresences:a}}}function An(t){return t.metas.map(e=>{const n=Object.getOwnPropertyDescriptors(e),s=Object.defineProperties({},n);return s.presence_ref=s.phx_ref,delete s.phx_ref,delete s.phx_ref_prev,s})}function vo(t){return JSON.parse(JSON.stringify(t))}function wo(t){return(t==null?void 0:t.events)&&{events:t.events}}function gr(t){return t!=null&&t.metas?An(t):[]}var mr;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(mr||(mr={}));class xo{get state(){return this.presenceAdapter.state}constructor(e,n){this.channel=e,this.presenceAdapter=new Ht(this.channel.channelAdapter,n)}}function ko(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const n=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${n}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class _o{constructor(e,n,s){const r=So(s);this.channel=e.getSocket().channel(n,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,n){return this.channel.on(e,n)}off(e,n){this.channel.off(e,n)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,n,s){let r;try{r=this.channel.push(e,n,s)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>eo){const a=this.channel.pushBuffer.shift();a.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${a.event}`,a.payload())}return r}updateJoinPayload(e){const n=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},n),e)}canPush(){return this.socket.isConnected()&&this.state===Fe.joined}isJoined(){return this.state===Fe.joined}isJoining(){return this.state===Fe.joining}isClosed(){return this.state===Fe.closed}isLeaving(){return this.state===Fe.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function So(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}const Eo=/[,()"\\]/,To=t=>Eo.test(t)||t!==t.trim(),Ao=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,br=t=>{const e=t===null?"null":String(t);return To(e)?Ao(e):e},Po=t=>t===null?"null":String(t),Co=(t,e)=>{if(t==="in"){const n=Array.isArray(e)?e:[e];if(n.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(n)).map(r=>br(r)).join(",")})`}return t==="is"?`is.${Po(e)}`:`${t}.${br(e)}`};class Io{constructor(){this.filters=[]}add(e,n,s,r=!1){const a=r?"not.":"";return this.filters.push(`${e}=${a}${Co(n,s)}`),this}eq(e,n){return this.add(e,"eq",n)}neq(e,n){return this.add(e,"neq",n)}gt(e,n){return this.add(e,"gt",n)}gte(e,n){return this.add(e,"gte",n)}lt(e,n){return this.add(e,"lt",n)}lte(e,n){return this.add(e,"lte",n)}in(e,n){return this.add(e,"in",n)}like(e,n){return this.add(e,"like",n)}ilike(e,n){return this.add(e,"ilike",n)}match(e,n){return this.add(e,"match",n)}imatch(e,n){return this.add(e,"imatch",n)}is(e,n){return this.add(e,"is",n)}isDistinct(e,n){return this.add(e,"isdistinct",n)}not(e,n,s){return this.add(e,n,s,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var yr;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(yr||(yr={}));var et;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(et||(et={}));var je;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(je||(je={}));class De{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,n={config:{}},s){var r,a;if(this.topic=e,this.params=n,this.socket=s,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},n.config),this.channelAdapter=new _o(this.socket.socketAdapter,e,this.params),this.presence=new xo(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=fa(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((a=(r=this.params.config)===null||r===void 0?void 0:r.broadcast)===null||a===void 0)&&a.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,n=this.timeout){var s,r,a;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:i,presence:o,private:l}}=this.params,c=(r=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(h=>h.filter))!==null&&r!==void 0?r:[],d=!!this.bindings[et.PRESENCE]&&this.bindings[et.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,u={},p={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(h=>{e==null||e(je.CHANNEL_ERROR,ko(h))}),this._onClose(()=>e==null?void 0:e(je.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(n).receive("ok",async({postgres_changes:h})=>{if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e==null||e(je.SUBSCRIBED);return}this._updatePostgresBindings(h,e)}).receive("error",h=>{this.state=Fe.errored;const g=Object.values(h).join(", ")||"error";e==null||e(je.CHANNEL_ERROR,new Error(g,{cause:h}))}).receive("timeout",()=>{e==null||e(je.TIMED_OUT)})}return this}_updatePostgresBindings(e,n){var s;const r=this.bindings.postgres_changes,a=(s=r==null?void 0:r.length)!==null&&s!==void 0?s:0,i=[];for(let o=0;o<a;o++){const l=r[o],{filter:{event:c,schema:d,table:u,filter:p}}=l,h=e&&e[o];if(h&&h.event===c&&De.isFilterValueEqual(h.schema,d)&&De.isFilterValueEqual(h.table,u)&&De.isFilterValueEqual(h.filter,p))i.push(Object.assign(Object.assign({},l),{id:h.id}));else{this.unsubscribe(),this.state=Fe.errored,n==null||n(je.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=i,this.state!=Fe.errored&&n&&n(je.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,n={}){return await this.send({type:"presence",event:"track",payload:e},n)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,n,s){const r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),a=e===et.PRESENCE||e===et.POSTGRES_CHANGES;if(r&&a)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,n,s)}async httpSend(e,n,s={}){var r;if(n==null)return Promise.reject(new Error("Payload is required for httpSend()"));const a=n instanceof ArrayBuffer||ArrayBuffer.isView(n),i={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":a?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:i,body:a?n:JSON.stringify(n)},c=await this._fetchWithTimeout(o.toString(),l,(r=s.timeout)!==null&&r!==void 0?r:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const u=await c.json();d=u.error||u.message||d}catch{}return Promise.reject(new Error(d))}async send(e,n={}){var s,r;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){this.socket.hasLogger()&&this.socket.log("channel","Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:o}=e,l={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(l.Authorization=`Bearer ${this.socket.accessTokenValue}`);const c={method:"POST",headers:l,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:o,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,c,(s=n.timeout)!==null&&s!==void 0?s:this.timeout);return await((r=d.body)===null||r===void 0?void 0:r.cancel()),d.ok?"ok":"error"}catch(d){return d instanceof Error&&d.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var i,o,l;const c=this.channelAdapter.push(e.type,e,n.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),c.receive("ok",()=>a("ok")),c.receive("error",()=>a("error")),c.receive("timeout",()=>a("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(n=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>n("ok")).receive("timeout",()=>n("timed out")).receive("error",()=>n("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,n,s){const r=new AbortController,a=setTimeout(()=>r.abort(),s),i=await this.socket.fetch(e,Object.assign(Object.assign({},n),{signal:r.signal}));return clearTimeout(a),i}_on(e,n,s){var r;const a=e.toLocaleLowerCase(),i=n==null?void 0:n.filter;if((i instanceof Io||typeof i=="object"&&i!==null&&typeof i.build=="function")&&(n=Object.assign(Object.assign({},n),{filter:i.build()})),a===et.POSTGRES_CHANGES&&((r=this.bindings[a])===null||r===void 0?void 0:r.find(d=>De.isSamePostgresFilter(d.filter,n))))return this.socket.log("error",`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,n),this;const o=this.channelAdapter.on(e,s),l={type:a,filter:n,callback:s,ref:o};return this.bindings[a]?this.bindings[a].push(l):this.bindings[a]=[l],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,n,s)=>{var r,a,i,o,l,c,d;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,s))return!1;const p=(r=this.bindings[u])===null||r===void 0?void 0:r.find(h=>h.ref===e.ref);if(!p)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in p){const h=p.id,g=(a=p.filter)===null||a===void 0?void 0:a.event;return h&&((i=n.ids)===null||i===void 0?void 0:i.includes(h))&&(g==="*"||(g==null?void 0:g.toLocaleLowerCase())===((o=n.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const h=(c=(l=p==null?void 0:p.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return h==="*"||h===((d=n==null?void 0:n.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,n){const{close:s,error:r,leave:a,join:i}=ha;return n&&[s,r,a,i].includes(e)&&n!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,n,s)=>{if(typeof n=="object"&&"ids"in n){const r=n.data,{schema:a,table:i,commit_timestamp:o,type:l,errors:c}=r;return Object.assign(Object.assign({},{schema:a,table:i,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(r))}return n})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const n in e.bindings)for(const s of e.bindings[n])this._on(s.type,s.filter,s.callback)}static isFilterValueEqual(e,n){return(e??void 0)===(n??void 0)}static isSamePostgresFilter(e,n){var s,r,a,i;const o=(r=(s=e==null?void 0:e.select)===null||s===void 0?void 0:s.join())!==null&&r!==void 0?r:void 0,l=(i=(a=n==null?void 0:n.select)===null||a===void 0?void 0:a.join())!==null&&i!==void 0?i:void 0;return(e==null?void 0:e.event)===(n==null?void 0:n.event)&&De.isFilterValueEqual(e==null?void 0:e.schema,n==null?void 0:n.schema)&&De.isFilterValueEqual(e==null?void 0:e.table,n==null?void 0:n.table)&&De.isFilterValueEqual(e==null?void 0:e.filter,n==null?void 0:n.filter)&&o===l}_getPayloadRecords(e){const n={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(n.new=fr(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(n.old=fr(e.columns,e.old_record)),n}}class $o{constructor(e,n){this.socket=new yo(e,n)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,n,s,r=1e4){return new Promise(a=>{setTimeout(()=>a("timeout"),r),this.socket.disconnect(()=>{e(),a("ok")},n,s)})}push(e){this.socket.push(e)}log(e,n,s){this.socket.log(e,n,s)}hasLogger(){return this.socket.hasLogger()}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Cs.connecting}isDisconnecting(){return this.socket.connectionState()==Cs.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const vr={HEARTBEAT_INTERVAL:25e3},Ro=[1e3,2e3,5e3,1e4],Lo=1e4;function No(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var n;return(n=Array.from(t.keys())[e])!==null&&n!==void 0?n:null},removeItem(e){t.delete(e)},setItem(e,n){t.set(e,String(n))}}}function Oo(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return No()}const Bo=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class jo{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,n){var s;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new to,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=a=>a?(...i)=>a(...i):(...i)=>fetch(...i),!(!((s=n==null?void 0:n.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=n.params.apikey;const r=this._initializeOptions(n);this.socketAdapter=new $o(e,r),this.httpEndpoint=fa(e),this.fetch=this._resolveFetch(n==null?void 0:n.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const n=e.message;throw new Error(`WebSocket not available: ${n}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,n){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,n)}getChannels(){return this.channels}async removeChannel(e){const n=await e.unsubscribe();return n==="ok"&&e.teardown(),n}async removeAllChannels(){const e=this.channels.map(async s=>{const r=await s.unsubscribe();return s.teardown(),r}),n=await Promise.all(e);return await this.disconnect(),n}log(e,n,s){this.socketAdapter.log(e,n,s)}hasLogger(){return this.socketAdapter.hasLogger()}connectionState(){return this.socketAdapter.connectionState()||Cs.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,n={config:{}}){const s=`realtime:${e}`,r=this.getChannels().find(a=>a.topic===s);if(r)return r;{const a=new De(`realtime:${e}`,n,this);return this._cancelPendingDisconnect(),this.channels.push(a),a}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){const n=++this._authGeneration,s=this._performAuth(e,n);n===this._authGeneration&&(this._authPromise=s);try{await s}finally{this._authPromise===s&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(n=>n.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,n){let s,r=!1;if(e)s=e,r=!0;else if(this.accessToken)try{s=await this.accessToken()}catch(a){this.log("error","Error fetching access token from callback",a),s=this.accessTokenValue}else s=this.accessTokenValue;n===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=s&&(this.accessTokenValue=s,this.channels.forEach(a=>{const i={access_token:s,version:Yi};a.updateJoinPayload(i),a.joinedOnce&&a.channelAdapter.isJoined()&&a.channelAdapter.push(ha.access_token,{access_token:s})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(n=>{this.log("error",`Error setting auth in ${e}`,n)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(n=>{this.log("error","error waiting for auth on connect",n)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(n,s)=>{n!=="disconnected"&&(n=="sent"&&this._setAuthSafely(),e&&e(n,s))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=n=>{this.log("worker","worker error",n.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=n=>{n.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let n;if(e)n=e;else{const s=new Blob([Bo],{type:"application/javascript"});n=URL.createObjectURL(s)}return n}_initializeOptions(e){var n,s,r,a,i,o,l,c,d,u,p,h;this.worker=(n=e==null?void 0:e.worker)!==null&&n!==void 0?n:!1,this.accessToken=(s=e==null?void 0:e.accessToken)!==null&&s!==void 0?s:null;const g={};g.timeout=(r=e==null?void 0:e.timeout)!==null&&r!==void 0?r:Zi,g.heartbeatIntervalMs=(a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:vr.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(i=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&i!==void 0?i:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:vr.HEARTBEAT_INTERVAL),g.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:Vi.getWebSocketConstructor(),g.params=e==null?void 0:e.params,g.logger=e==null?void 0:e.logger,g.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),g.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:Oo(),g.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:m=>Ro[m-1]||Lo;let f,b;const y=(u=e==null?void 0:e.vsn)!==null&&u!==void 0?u:Qi;switch(y){case Xi:f=(m,v)=>v(JSON.stringify(m)),b=(m,v)=>v(JSON.parse(m));break;case ua:f=this.serializer.encode.bind(this.serializer),b=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${g.vsn}`)}if(g.vsn=y,g.encode=(p=e==null?void 0:e.encode)!==null&&p!==void 0?p:f,g.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:b,g.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,g.params=Object.assign(Object.assign({},g.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,g.autoSendHeartbeat=!this.worker}return g}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var Vt=class extends Error{constructor(t,e){var n;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((n=e.icebergType)==null?void 0:n.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Do(t,e,n){const s=new URL(e,t);if(n)for(const[r,a]of Object.entries(n))a!==void 0&&s.searchParams.set(r,a);return s.toString()}async function Uo(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function Mo(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:n,path:s,query:r,body:a,headers:i}){const o=Do(t.baseUrl,s,r),l=await Uo(t.auth),c=await e(o,{method:n,headers:{...a?{"Content-Type":"application/json"}:{},...l,...i},body:a?JSON.stringify(a):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),p=u&&d?JSON.parse(d):d;if(!c.ok){const h=u?p:void 0,g=h==null?void 0:h.error;throw new Vt((g==null?void 0:g.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:g==null?void 0:g.type,icebergCode:g==null?void 0:g.code,details:h})}return{status:c.status,headers:c.headers,data:p}}}}function mn(t){return t.join("")}var zo=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:mn(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(t,e){const n={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${mn(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${mn(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${mn(t.namespace)}`}),!0}catch(e){if(e instanceof Vt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(n){if(n instanceof Vt&&n.status===409)return;throw n}}};function lt(t){return t.join("")}var Ko=class{constructor(t,e="",n){this.client=t,this.prefix=e,this.accessDelegation=n}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${lt(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const n={};return this.accessDelegation&&(n["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${lt(t.namespace)}/tables`,body:e,headers:n})).data.metadata}async updateTable(t,e){const n=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${lt(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":n.data["metadata-location"],metadata:n.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${lt(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${lt(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${lt(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(n){if(n instanceof Vt&&n.status===404)return!1;throw n}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(n){if(n instanceof Vt&&n.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw n}}},Fo=class{constructor(t){var s;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const n=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=Mo({baseUrl:n,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(s=t.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new zo(this.client,e),this.tableOps=new Ko(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function Jt(t){"@babel/helpers - typeof";return Jt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Jt(t)}function Ho(t,e){if(Jt(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var s=n.call(t,e);if(Jt(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function qo(t){var e=Ho(t,"string");return Jt(e)=="symbol"?e:e+""}function Wo(t,e,n){return(e=qo(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function wr(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,s)}return n}function M(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?wr(Object(n),!0).forEach(function(s){Wo(t,s,n[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):wr(Object(n)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(n,s))})}return t}var Jn=class extends Error{constructor(t,e="storage",n,s){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=n,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Yn(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Ls=class extends Jn{constructor(t,e,n,s="storage",r){super(t,s,e,n),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=n,this.code=r}toJSON(){return M(M({},super.toJSON()),{},{code:this.code})}},ma=class extends Jn{constructor(t,e,n="storage"){super(t,n),this.name=n==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function Bn(t,e,n){const s=M({},t),r=e.toLowerCase();for(const a of Object.keys(s))a.toLowerCase()===r&&delete s[a];return s[r]=n,s}function Go(t){const e={};for(const[n,s]of Object.entries(t))e[n.toLowerCase()]=s;return e}const Vo=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Jo=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Ns=t=>{if(Array.isArray(t))return t.map(n=>Ns(n));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([n,s])=>{const r=n.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));e[r]=Ns(s)}),e},Yo=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),ba=t=>t.split("/").map(encodeURIComponent).join("/"),xr=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const n=e.error;if(typeof n.message=="string")return n.message}}return JSON.stringify(t)},Xo=async(t,e,n,s)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const r=t;let a=parseInt(String(r.status),10);Number.isFinite(a)||(a=500),r.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||a+"";e(new Ls(xr(i),a,o,s,i==null?void 0:i.code))}).catch(()=>{const i=a+"";e(new Ls(r.statusText||`HTTP ${a} error`,a,i,s))})}else e(new ma(xr(t),t,s))},Qo=(t,e,n,s)=>{const r={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!s)return M(M({},r),n);if(Jo(s)){var a;const i=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(i))l.toLowerCase()==="content-type"&&(o=c);r.headers=Bn(i,"Content-Type",(a=o)!==null&&a!==void 0?a:"application/json"),r.body=JSON.stringify(s)}else r.body=s;return e!=null&&e.duplex&&(r.duplex=e.duplex),M(M({},r),n)};async function Ot(t,e,n,s,r,a,i){return new Promise((o,l)=>{t(n,Qo(e,s,r,a)).then(c=>{if(!c.ok)throw c;if(s!=null&&s.noResolveJson)return c;if(i==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>Xo(c,l,s,i))})}function ya(t="storage"){return{get:async(e,n,s,r)=>Ot(e,"GET",n,s,r,void 0,t),post:async(e,n,s,r,a)=>Ot(e,"POST",n,r,a,s,t),put:async(e,n,s,r,a)=>Ot(e,"PUT",n,r,a,s,t),head:async(e,n,s,r)=>Ot(e,"HEAD",n,M(M({},s),{},{noResolveJson:!0}),r,void 0,t),remove:async(e,n,s,r,a)=>Ot(e,"DELETE",n,r,a,s,t)}}const Zo=ya("storage"),{get:Yt,post:we,put:Os,head:el,remove:Xt}=Zo,fe=ya("vectors");var $t=class{constructor(t,e={},n,s="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=Go(e),this.fetch=Vo(n),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=Bn(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(n){if(e.shouldThrowOnError)throw n;if(Yn(n))return{data:null,error:n};throw n}}};let va;va=Symbol.toStringTag;var tl=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[va]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Yn(e))return{data:null,error:e};throw e}}};let wa;wa=Symbol.toStringTag;var nl=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[wa]="BlobDownloadBuilder",this.promise=null}asStream(){return new tl(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Yn(e))return{data:null,error:e};throw e}}};const is={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},kr={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var sl=class extends $t{constructor(t,e={},n,s){super(t,e,s,"storage"),this.bucketId=n}async uploadOrUpdate(t,e,n,s){var r=this;return r.handleOperation(async()=>{let a;const i=M(M({},kr),s);let o=M(M({},r.headers),t==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;if(typeof Blob<"u"&&n instanceof Blob?(a=new FormData,a.append("cacheControl",i.cacheControl),l&&a.append("metadata",r.encodeMetadata(l)),a.append("",n)):typeof FormData<"u"&&n instanceof FormData?(a=n,a.has("cacheControl")||a.append("cacheControl",i.cacheControl),l&&!a.has("metadata")&&a.append("metadata",r.encodeMetadata(l))):(a=n,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=r.toBase64(r.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!i.duplex&&(i.duplex="half")),s!=null&&s.headers)for(const[p,h]of Object.entries(s.headers))o=Bn(o,p,h);const c=r._removeEmptyFolders(e),d=r._getFinalPath(c),u=await(t=="PUT"?Os:we)(r.fetch,`${r.url}/object/${d}`,a,M({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(t,e,n){return this.uploadOrUpdate("POST",t,e,n)}async uploadToSignedUrl(t,e,n,s){var r=this;const a=r._removeEmptyFolders(t),i=r._getFinalPath(a),o=new URL(r.url+`/object/upload/sign/${i}`);return o.searchParams.set("token",e),r.handleOperation(async()=>{let l;const c=M(M({},kr),s);let d=M(M({},r.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&n instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",r.encodeMetadata(u)),l.append("",n)):typeof FormData<"u"&&n instanceof FormData?(l=n,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",r.encodeMetadata(u))):(l=n,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,u&&(d["x-metadata"]=r.toBase64(r.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),s!=null&&s.headers)for(const[p,h]of Object.entries(s.headers))d=Bn(d,p,h);return{path:a,fullPath:(await Os(r.fetch,o.toString(),l,M({headers:d},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var n=this;return n.handleOperation(async()=>{let s=n._getFinalPath(t);const r=M({},n.headers);e!=null&&e.upsert&&(r["x-upsert"]="true");const a=await we(n.fetch,`${n.url}/object/upload/sign/${s}`,{},{headers:r}),i=new URL(n.url+a.url),o=i.searchParams.get("token");if(!o)throw new Jn("No token returned by API");return{signedUrl:i.toString(),path:t,token:o}})}async update(t,e,n){return this.uploadOrUpdate("PUT",t,e,n)}async move(t,e,n){var s=this;return s.handleOperation(async()=>await we(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:n==null?void 0:n.destinationBucket},{headers:s.headers}))}async copy(t,e,n){var s=this;return s.handleOperation(async()=>({path:(await we(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:n==null?void 0:n.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(t,e,n){var s=this;return s.handleOperation(async()=>{let r=s._getFinalPath(t);const a=typeof(n==null?void 0:n.transform)=="object"&&n.transform!==null&&Object.keys(n.transform).length>0;let i=await we(s.fetch,`${s.url}/object/sign/${r}`,M({expiresIn:e},a?{transform:n.transform}:{}),{headers:s.headers});const o=new URLSearchParams;n!=null&&n.download&&o.set("download",n.download===!0?"":n.download),(n==null?void 0:n.cacheNonce)!=null&&o.set("cacheNonce",String(n.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${s.url}${i.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,n){var s=this;return s.handleOperation(async()=>{const r=await we(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:e,paths:t},{headers:s.headers}),a=new URLSearchParams;n!=null&&n.download&&a.set("download",n.download===!0?"":n.download),(n==null?void 0:n.cacheNonce)!=null&&a.set("cacheNonce",String(n.cacheNonce));const i=a.toString();return r.map(o=>M(M({},o),{},{signedUrl:o.signedURL?encodeURI(`${s.url}${o.signedURL}${i?`&${i}`:""}`):null}))})}download(t,e,n){const s=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",r=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(r,e.transform),(e==null?void 0:e.cacheNonce)!=null&&r.set("cacheNonce",String(e.cacheNonce));const a=r.toString(),i=this._getFinalPath(t),o=()=>Yt(this.fetch,`${this.url}/${s}/${i}${a?`?${a}`:""}`,{headers:this.headers,noResolveJson:!0},n);return new nl(o,this.shouldThrowOnError)}async info(t){var e=this;const n=e._getFinalPath(t);return e.handleOperation(async()=>Ns(await Yt(e.fetch,`${e.url}/object/info/${n}`,{headers:e.headers})))}async exists(t){var e=this;const n=e._getFinalPath(t);try{return await el(e.fetch,`${e.url}/object/${n}`,{headers:e.headers}),{data:!0,error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(Yn(r)){var s;const a=r instanceof Ls?r.status:r instanceof ma?(s=r.originalError)===null||s===void 0?void 0:s.status:void 0;if(a!==void 0&&[400,404].includes(a))return{data:!1,error:r}}throw r}}getPublicUrl(t,e){const n=this._getFinalPath(t),s=new URLSearchParams;e!=null&&e.download&&s.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const r=s.toString(),a=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(r?`?${r}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await Xt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async purgeCache(t,e,n){var s=this;return s.handleOperation(async()=>{const r=ba(s._getFinalPath(t)),a=new URLSearchParams;e!=null&&e.transformations&&a.set("transformations","true");const i=a.toString();return await Xt(s.fetch,`${s.url}/cdn/${r}${i?`?${i}`:""}`,{},{headers:s.headers},n)})}async list(t,e,n){var s=this;return s.handleOperation(async()=>{const r=e!=null&&e.sortBy?M(M({},is.sortBy),e.sortBy):is.sortBy,a=M(M(M({},is),e),{},{sortBy:r,prefix:t||""});return await we(s.fetch,`${s.url}/object/list/${s.bucketId}`,a,{headers:s.headers},n)})}async listV2(t,e){var n=this;return n.handleOperation(async()=>{const s=M({},t);return await we(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,s,{headers:n.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const rl="2.112.4",dn={"X-Client-Info":`storage-js/${rl}`};var al=class extends $t{constructor(t,e={},n,s){const r=new URL(t);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase."));const a=r.href.replace(/\/$/,""),i=M(M({},dn),e);super(a,i,n,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const n=e.listBucketOptionsToQueryString(t);return await Yt(e.fetch,`${e.url}/bucket${n}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await Yt(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var n=this;return n.handleOperation(async()=>await we(n.fetch,`${n.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:n.headers}))}async updateBucket(t,e){var n=this;return n.handleOperation(async()=>await Os(n.fetch,`${n.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:n.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await we(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Xt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}async purgeBucketCache(t,e,n){var s=this;return s.handleOperation(async()=>{const r=new URLSearchParams;e!=null&&e.transformations&&r.set("transformations","true");const a=r.toString();return await Xt(s.fetch,`${s.url}/cdn/${ba(t)}${a?`?${a}`:""}`,{},{headers:s.headers},n)})}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},il=class extends $t{constructor(t,e={},n){const s=t.replace(/\/$/,""),r=M(M({},dn),e);super(s,r,n,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await we(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const n=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&n.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&n.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&n.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&n.set("sortOrder",t.sortOrder),t!=null&&t.search&&n.set("search",t.search);const s=n.toString(),r=s?`${e.url}/bucket?${s}`:`${e.url}/bucket`;return await Yt(e.fetch,r,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Xt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!Yo(t))throw new Jn("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const n=new Fo({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(n,{get(r,a){const i=r[a];return typeof i!="function"?i:async(...o)=>{try{return{data:await i.apply(r,o),error:null}}catch(l){if(s)throw l;return{data:null,error:l}}}}})}},ol=class extends $t{constructor(t,e={},n){const s=t.replace(/\/$/,""),r=M(M({},dn),{},{"Content-Type":"application/json"},e);super(s,r,n,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var n=this;return n.handleOperation(async()=>await fe.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:n.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var n=this;return n.handleOperation(async()=>await fe.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:n.headers})||{})}},ll=class extends $t{constructor(t,e={},n){const s=t.replace(/\/$/,""),r=M(M({},dn),{},{"Content-Type":"application/json"},e);super(s,r,n,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},cl=class extends $t{constructor(t,e={},n){const s=t.replace(/\/$/,""),r=M(M({},dn),{},{"Content-Type":"application/json"},e);super(s,r,n,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await fe.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},dl=class extends cl{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new ul(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,n=this;return e().call(n,t)}async getBucket(t){var e=()=>super.getBucket,n=this;return e().call(n,t)}async listBuckets(t={}){var e=()=>super.listBuckets,n=this;return e().call(n,t)}async deleteBucket(t){var e=()=>super.deleteBucket,n=this;return e().call(n,t)}},ul=class extends ol{constructor(t,e,n,s){super(t,e,s),this.vectorBucketName=n}async createIndex(t){var e=()=>super.createIndex,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,n=this;return e().call(n,n.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,n=this;return e().call(n,n.vectorBucketName,t)}index(t){return new hl(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},hl=class extends ll{constructor(t,e,n,s,r){super(t,e,r),this.vectorBucketName=n,this.indexName=s}async putVectors(t){var e=()=>super.putVectors,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(t){var e=()=>super.getVectors,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,n=this;return e().call(n,M(M({},t),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},pl=class extends al{constructor(t,e={},n,s){super(t,e,n,s)}from(t){return new sl(this.url,this.headers,t,this.fetch)}get vectors(){return new dl(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new il(this.url+"/iceberg",this.headers,this.fetch)}};const xa="2.112.4",Ue=30*1e3,zt=3,os=zt*Ue,fl=2*Ue,gl="http://localhost:9999",ml="supabase.auth.token",bl={"X-Client-Info":`gotrue-js/${xa}`},Bs="X-Supabase-Api-Version",ka={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},yl=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,nt="sb_flow_id",vl=5,wl=10*60*1e3;class Qt extends Error{constructor(e,n,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=n,this.code=s}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function L(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class xl extends Qt{constructor(e,n,s){super(e,n,s),this.name="AuthApiError",this.status=n,this.code=s}}function _r(t){return L(t)&&t.name==="AuthApiError"}class xe extends Qt{constructor(e,n){super(e),this.name="AuthUnknownError",this.originalError=n}}class $e extends Qt{constructor(e,n,s,r){super(e,s,r),this.name=n,this.status=s}}class te extends $e{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function bn(t){return L(t)&&t.name==="AuthSessionMissingError"}class ct extends $e{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class yn extends $e{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class vn extends $e{constructor(e,n=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function kl(t){return L(t)&&t.name==="AuthImplicitGrantRedirectError"}class Sr extends $e{constructor(e,n=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class _l extends $e{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Pn extends $e{constructor(e,n){super(e,"AuthRetryableFetchError",n,void 0)}}function wn(t){return L(t)&&t.name==="AuthRetryableFetchError"}class Er extends $e{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function Sl(t){return L(t)&&t.name==="AuthRefreshDiscardedError"}class Tr extends $e{constructor(e,n,s){super(e,"AuthWeakPasswordError",n,"weak_password"),this.reasons=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class jn extends $e{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Dn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Ar=` 	
\r=`.split(""),El=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Ar.length;e+=1)t[Ar[e].charCodeAt(0)]=-2;for(let e=0;e<Dn.length;e+=1)t[Dn[e].charCodeAt(0)]=e;return t})();function Pr(t,e,n){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;n(Dn[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;n(Dn[s]),e.queuedBits-=6}}function _a(t,e,n){const s=El[t];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)n(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function Cr(t){const e=[],n=i=>{e.push(String.fromCodePoint(i))},s={utf8seq:0,codepoint:0},r={queue:0,queuedBits:0},a=i=>{Pl(i,s,n)};for(let i=0;i<t.length;i+=1)_a(t.charCodeAt(i),r,a);return e.join("")}function Tl(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function Al(t,e){for(let n=0;n<t.length;n+=1){let s=t.charCodeAt(n);if(s>55295&&s<=56319){const r=(s-55296)*1024&65535;s=(t.charCodeAt(n+1)-56320&65535|r)+65536,n+=1}Tl(s,e)}}function Pl(t,e,n){if(e.utf8seq===0){if(t<=127){n(t);return}for(let s=1;s<6;s+=1)if(!(t>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&n(e.codepoint)}}function xt(t){const e=[],n={queue:0,queuedBits:0},s=r=>{e.push(r)};for(let r=0;r<t.length;r+=1)_a(t.charCodeAt(r),n,s);return new Uint8Array(e)}function Cl(t){const e=[];return Al(t,n=>e.push(n)),new Uint8Array(e)}function st(t){const e=[],n={queue:0,queuedBits:0},s=r=>{e.push(r)};return t.forEach(r=>Pr(r,n,s)),Pr(null,n,s),e.join("")}function Il(t){return Math.round(Date.now()/1e3)+t}function $l(){return Symbol("auth-callback")}const ae=()=>typeof window<"u"&&typeof document<"u",Qe={tested:!1,writable:!1},Sa=()=>{if(!ae())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Qe.tested)return Qe.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),Qe.tested=!0,Qe.writable=!0}catch{Qe.tested=!0,Qe.writable=!1}return Qe.writable};function Ir(t){const e={},n=new URL(t);if(n.hash&&n.hash[0]==="#")try{new URLSearchParams(n.hash.substring(1)).forEach((r,a)=>{e[a]=r})}catch{}return n.searchParams.forEach((s,r)=>{e[r]=s}),e}const Ea=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Rl=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",Me=async(t,e,n)=>{await t.setItem(e,JSON.stringify(n))},le=async(t,e)=>{const n=await t.getItem(e);if(!n)return null;try{return JSON.parse(n)}catch{return null}},ue=async(t,e)=>{await t.removeItem(e)};class Xn{constructor(){this.promise=new Xn.promiseConstructor((e,n)=>{this.resolve=e,this.reject=n})}}Xn.promiseConstructor=Promise;function xn(t){const e=t.split(".");if(e.length!==3)throw new jn("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!yl.test(e[s]))throw new jn("JWT not in base64url format");return{header:JSON.parse(Cr(e[0])),payload:JSON.parse(Cr(e[1])),signature:xt(e[2]),raw:{header:e[0],payload:e[1]}}}async function Ll(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function Nl(t,e){return new Promise((s,r)=>{(async()=>{for(let a=0;a<1/0;a++)try{const i=await t(a);if(!e(a,null,i)){s(i);return}}catch(i){if(!e(a,i)){r(i);return}}})()})}function Ta(t){return("0"+t.toString(16)).substr(-2)}function Ol(){const e=new Uint32Array(56);if(typeof crypto>"u"){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=n.length;let r="";for(let a=0;a<56;a++)r+=n.charAt(Math.floor(Math.random()*s));return r}return crypto.getRandomValues(e),Array.from(e,Ta).join("")}async function Bl(t){const n=new TextEncoder().encode(t),s=await crypto.subtle.digest("SHA-256",n),r=new Uint8Array(s);return Array.from(r).map(a=>String.fromCharCode(a)).join("")}async function jl(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return t;const n=await Bl(t);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Dl=/^[a-zA-Z0-9_-]{8,64}$/;function Cn(t){return typeof t=="string"&&Dl.test(t)?t:null}function Ul(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Ta).join("")}let t="";for(let e=0;e<32;e++)t+=Math.floor(Math.random()*16).toString(16);return t}const _t=(t,e)=>`${t}-flow-${e}-code-verifier`,Zt=t=>`${t}-flows-code-verifier`;async function qs(t,e){const n=await le(t,Zt(e));return Array.isArray(n)?n.filter(s=>Cn(s)!==null):[]}async function Ml(t,e,n,s,r){await Me(t,_t(e,n),s);const a=(await qs(t,e)).filter(i=>i!==n);for(a.push(n);a.length>vl;){const i=a.shift();await ue(t,_t(e,i)),r==null||r(i)}await Me(t,Zt(e),a),await Me(t,`${e}-code-verifier`,s)}async function zl(t,e,n){if(n){const r=await le(t,_t(e,n));return{verifier:typeof r=="string"?r:null,flowId:n}}const s=await le(t,`${e}-code-verifier`);return{verifier:typeof s=="string"?s:null,flowId:null}}async function ye(t,e,n){const s=`${e}-code-verifier`;if(!n){await ue(t,s);return}const r=_t(e,n),a=await le(t,r);await ue(t,r);const i=await qs(t,e),o=i.filter(l=>l!==n);o.length!==i.length&&(o.length>0?await Me(t,Zt(e),o):await ue(t,Zt(e))),a!=null&&a===await le(t,s)&&await ue(t,s)}async function Kl(t,e){const n=await qs(t,e);for(const s of n)await ue(t,_t(e,s));await ue(t,Zt(e)),await ue(t,`${e}-code-verifier`)}function Fl(t,e){const n=t.indexOf("#");let s=n===-1?t:t.slice(0,n);const r=n===-1?"":t.slice(n),a=s.indexOf("?");if(a!==-1){const o=s.slice(0,a),l=s.slice(a+1).split("&").filter(c=>c!==""&&c!==nt&&!c.startsWith(`${nt}=`));s=l.length>0?`${o}?${l.join("&")}`:o}const i=s.includes("?")?"&":"?";return`${s}${i}${nt}=${encodeURIComponent(e)}${r}`}async function Hl(t,e,n=!1,s){const r=Ol();let a=r;n&&(a+="/recovery");const i=Ul();await Ml(t,e,i,a,s);const o=await jl(r);return[o,r===o?"plain":"s256",i]}const ql=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Wl(t){const e=t.headers.get(Bs);if(!e||!e.match(ql))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Gl(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function Vl(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Jl=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function Ne(t){if(!Jl.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function ve(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function ls(){const t={};return new Proxy(t,{get:(e,n)=>{if(n==="__isUserNotAvailableProxy")return!0;if(typeof n=="symbol"){const s=n.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${n}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,n)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,n)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Yl(t,e){return new Proxy(t,{get:(n,s,r)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const a=s.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(n,s,r)}return!e.value&&typeof s=="string"&&(e.value=!0),Reflect.get(n,s,r)}})}function $r(t){return JSON.parse(JSON.stringify(t))}const Ze=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},Rr=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Lr(t){var e;if(!Rl(t))throw new Pn(Ze(t),0);let n;try{n=await t.json()}catch(a){throw Rr.includes(t.status)?new Pn(t.statusText||`HTTP ${t.status}`,t.status):new xe(Ze(a),a)}if(Rr.includes(t.status))throw new Pn(Ze(n),t.status);let s;const r=Wl(t);if(r&&r.getTime()>=ka["2024-01-01"].timestamp&&typeof n=="object"&&n&&typeof n.code=="string"?s=n.code:typeof n=="object"&&n&&typeof n.error_code=="string"&&(s=n.error_code),s){if(s==="weak_password")throw new Tr(Ze(n),t.status,((e=n.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new te}else if(typeof n=="object"&&n&&typeof n.weak_password=="object"&&n.weak_password&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.reasons.reduce((a,i)=>a&&typeof i=="string",!0))throw new Tr(Ze(n),t.status,n.weak_password.reasons);throw new xl(Ze(n),t.status||500,s)}const Xl=(t,e,n,s)=>{const r={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?r:(r.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),r.body=JSON.stringify(s),Object.assign(Object.assign({},r),n))};async function O(t,e,n,s){var r;const a=Object.assign({},s==null?void 0:s.headers);a[Bs]||(a[Bs]=ka["2024-01-01"].name),s!=null&&s.jwt&&(a.Authorization=`Bearer ${s.jwt}`);const i=(r=s==null?void 0:s.query)!==null&&r!==void 0?r:{};s!=null&&s.redirectTo&&(i.redirect_to=s.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await Ql(t,e,n+o,{headers:a,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function Ql(t,e,n,s,r,a){const i=Xl(e,s,r,a);let o;try{o=await t(n,Object.assign({},i))}catch(l){throw new Pn(Ze(l),0)}if(o.ok||await Lr(o),s!=null&&s.noResolveJson)return o;try{return await o.json()}catch(l){await Lr(l)}}function me(t){var e;let n=null;tc(t)&&(n=Object.assign({},t),t.expires_at||(n.expires_at=Il(t.expires_in)));const s=(e=t.user)!==null&&e!==void 0?e:typeof(t==null?void 0:t.id)=="string"?t:null;return{data:{session:n,user:s},error:null}}function Nr(t){const e=me(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((n,s)=>n&&typeof s=="string",!0)&&(e.data.weak_password=t.weak_password),e}function He(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function Zl(t){return{data:t,error:null}}function ec(t){const{action_link:e,email_otp:n,hashed_token:s,redirect_to:r,verification_type:a}=t,i=Vn(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:n,hashed_token:s,redirect_to:r,verification_type:a},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function Or(t){return t}function tc(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const cs=["global","local","others"];class nc{constructor({url:e="",headers:n={},fetch:s,experimental:r}){this.url=e,this.headers=n,this.fetch=Ea(s),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,n=cs[0]){if(cs.indexOf(n)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${cs.join(", ")}`);try{return await O(this.fetch,"POST",`${this.url}/logout?scope=${n}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(L(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,n={}){try{return await O(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:n.data},headers:this.headers,redirectTo:n.redirectTo,xform:He})}catch(s){if(L(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:n}=e,s=Vn(e,["options"]),r=Object.assign(Object.assign({},s),n);return"newEmail"in s&&(r.new_email=s==null?void 0:s.newEmail,delete r.newEmail),await O(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:ec,redirectTo:n==null?void 0:n.redirectTo})}catch(n){if(L(n))return{data:{properties:null,user:null},error:n};throw n}}async createUser(e){try{return await O(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:He})}catch(n){if(L(n))return{data:{user:null},error:n};throw n}}async listUsers(e){var n,s,r,a,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await O(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(n=e==null?void 0:e.page)===null||n===void 0?void 0:n.toString())!==null&&s!==void 0?s:"",per_page:(a=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&a!==void 0?a:""},xform:Or});if(d.error)throw d.error;const u=await d.json(),p=(i=d.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(g=>{const f=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),b=JSON.parse(g.split(";")[1].split("=")[1]);c[`${b}Page`]=f}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(L(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Ne(e);try{return await O(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:He})}catch(n){if(L(n))return{data:{user:null},error:n};throw n}}async updateUserById(e,n){Ne(e);try{return await O(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:n,headers:this.headers,xform:He})}catch(s){if(L(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,n=!1){Ne(e);try{return await O(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:n},xform:He})}catch(s){if(L(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){Ne(e.userId);try{const{data:n,error:s}=await O(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:r=>({data:{factors:r},error:null})});return{data:n,error:s}}catch(n){if(L(n))return{data:null,error:n};throw n}}async _deleteFactor(e){Ne(e.userId),Ne(e.id);try{return{data:await O(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(n){if(L(n))return{data:null,error:n};throw n}}async _listOAuthClients(e){var n,s,r,a,i,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await O(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(n=e==null?void 0:e.page)===null||n===void 0?void 0:n.toString())!==null&&s!==void 0?s:"",per_page:(a=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&a!==void 0?a:""},xform:Or});if(d.error)throw d.error;const u=await d.json(),p=(i=d.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(g=>{const f=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),b=JSON.parse(g.split(";")[1].split("=")[1]);c[`${b}Page`]=f}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(L(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(L(n))return{data:null,error:n};throw n}}async _getOAuthClient(e){try{return await O(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(L(n))return{data:null,error:n};throw n}}async _updateOAuthClient(e,n){try{return await O(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:n,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(L(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await O(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(L(n))return{data:null,error:n};throw n}}async _regenerateOAuthClientSecret(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(L(n))return{data:null,error:n};throw n}}async _listCustomProviders(e){try{const n={};return e!=null&&e.type&&(n.type=e.type),await O(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:n,xform:s=>{var r;return{data:{providers:(r=s==null?void 0:s.providers)!==null&&r!==void 0?r:[]},error:null}}})}catch(n){if(L(n))return{data:{providers:[]},error:n};throw n}}async _createCustomProvider(e){try{return await O(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(L(n))return{data:null,error:n};throw n}}async _getCustomProvider(e){try{return await O(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(L(n))return{data:null,error:n};throw n}}async _updateCustomProvider(e,n){try{return await O(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:n,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(L(s))return{data:null,error:s};throw s}}async _deleteCustomProvider(e){try{return await O(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(L(n))return{data:null,error:n};throw n}}async _adminListPasskeys(e){ve(this.experimental),Ne(e.userId);try{return await O(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(L(n))return{data:null,error:n};throw n}}async _adminDeletePasskey(e){ve(this.experimental),Ne(e.userId),Ne(e.passkeyId);try{return await O(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(L(n))return{data:null,error:n};throw n}}}function Br(t={}){return{getItem:e=>t[e]||null,setItem:(e,n)=>{t[e]=n},removeItem:e=>{delete t[e]}}}globalThis&&Sa()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class sc extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function rc(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Aa(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function ac(t){return parseInt(t,16)}function ic(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function oc(t){var e;const{chainId:n,domain:s,expirationTime:r,issuedAt:a=new Date,nonce:i,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:p}=t;{if(!Number.isInteger(n))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${n}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const h=Aa(t.address),g=d?`${d}://${s}`:s,f=t.statement?`${t.statement}
`:"",b=`${g} wants you to sign in with your Ethereum account:
${h}

${f}`;let y=`URI: ${u}
Version: ${p}
Chain ID: ${n}${i?`
Nonce: ${i}`:""}
Issued At: ${a.toISOString()}`;if(r&&(y+=`
Expiration Time: ${r.toISOString()}`),o&&(y+=`
Not Before: ${o.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let m=`
Resources:`;for(const v of c){if(!v||typeof v!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${v}`);m+=`
- ${v}`}y+=m}return`${b}
${y}`}class Q extends Error{constructor({message:e,code:n,cause:s,name:r}){var a;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(a=r??(s instanceof Error?s.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=n}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class Un extends Q{constructor(e,n){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:n,message:e}),this.name="WebAuthnUnknownError",this.originalError=n}}function lc({error:t,options:e}){var n,s,r;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new Q({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((n=a.authenticatorSelection)===null||n===void 0?void 0:n.requireResidentKey)===!0)return new Q({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new Q({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((r=a.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new Q({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new Q({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new Q({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new Q({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new Q({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const i=window.location.hostname;if(Pa(i)){if(a.rp.id!==i)return new Q({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new Q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new Q({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new Q({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new Q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function cc({error:t,options:e}){const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new Q({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new Q({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const s=window.location.hostname;if(Pa(s)){if(n.rpId!==s)return new Q({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new Q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new Q({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new Q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class dc{createNewAbortSignal(){if(this.controller){const n=new Error("Cancelling existing WebAuthn API call for new one");n.name="AbortError",this.controller.abort(n)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const js=new dc;function jr(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:n,excludeCredentials:s}=t,r=Vn(t,["challenge","user","excludeCredentials"]),a=xt(e).buffer,i=Object.assign(Object.assign({},n),{id:xt(n.id).buffer}),o=Object.assign(Object.assign({},r),{challenge:a,user:i});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:xt(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Dr(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:n}=t,s=Vn(t,["challenge","allowCredentials"]),r=xt(e).buffer,a=Object.assign(Object.assign({},s),{challenge:r});if(n&&n.length>0){a.allowCredentials=new Array(n.length);for(let i=0;i<n.length;i++){const o=n[i];a.allowCredentials[i]=Object.assign(Object.assign({},o),{id:xt(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function Ur(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const n=t;return{id:t.id,rawId:t.id,response:{attestationObject:st(new Uint8Array(t.response.attestationObject)),clientDataJSON:st(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=n.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Mr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const n=t,s=t.getClientExtensionResults(),r=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:st(new Uint8Array(r.authenticatorData)),clientDataJSON:st(new Uint8Array(r.clientDataJSON)),signature:st(new Uint8Array(r.signature)),userHandle:r.userHandle?st(new Uint8Array(r.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=n.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Pa(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function Mn(){var t,e;return!!(ae()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Ca(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Un("Browser returned unexpected credential type",e)}:{data:null,error:new Un("Empty credential response",e)}}catch(e){return{data:null,error:lc({error:e,options:t})}}}async function Ia(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Un("Browser returned unexpected credential type",e)}:{data:null,error:new Un("Empty credential response",e)}}catch(e){return{data:null,error:cc({error:e,options:t})}}}const uc={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},hc={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function zn(...t){const e=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),n=r=>r instanceof ArrayBuffer||ArrayBuffer.isView(r),s={};for(const r of t)if(r)for(const a in r){const i=r[a];if(i!==void 0)if(Array.isArray(i))s[a]=i;else if(n(i))s[a]=i;else if(e(i)){const o=s[a];e(o)?s[a]=zn(o,i):s[a]=zn(i)}else s[a]=i}return s}function pc(t,e){return zn(uc,t,e||{})}function fc(t,e){return zn(hc,t,e||{})}class gc{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:n,friendlyName:s,signal:r},a){var i;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:n});if(!o)return{data:null,error:l};const c=r??js.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:d}=o.webauthn.credential_options.publicKey;if(!d.name){const u=s;if(u)d.name=`${d.id}:${u}`;else{const h=(await this.client.getUser()).data.user,g=((i=h==null?void 0:h.user_metadata)===null||i===void 0?void 0:i.name)||(h==null?void 0:h.email)||(h==null?void 0:h.id)||"User";d.name=`${d.id}:${g}`}}d.displayName||(d.displayName=d.name)}switch(o.webauthn.type){case"create":{const d=pc(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:p}=await Ca({publicKey:d,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const d=fc(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:p}=await Ia(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:d,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(o){return L(o)?{data:null,error:o}:{data:null,error:new xe("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:n,webauthn:s}){return this.client.mfa.verify({factorId:n,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:n=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},a){if(!n)return{data:null,error:new Qt("rpId is required for WebAuthn authentication")};try{if(!Mn())return{data:null,error:new xe("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:e,webauthn:{rpId:n,rpOrigins:s},signal:r},{request:a});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:e,challengeId:i.challengeId,webauthn:{type:l.type,rpId:n,rpOrigins:s,credential_response:l.credential_response}})}catch(i){return L(i)?{data:null,error:i}:{data:null,error:new xe("Unexpected error in authenticate",i)}}}async _register({friendlyName:e,webauthn:{rpId:n=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},a){if(!n)return{data:null,error:new Qt("rpId is required for WebAuthn registration")};try{if(!Mn())return{data:null,error:new xe("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:e});if(!i)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===e&&p.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:n,rpOrigins:s},signal:r},{create:a});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:n,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(i){return L(i)?{data:null,error:i}:{data:null,error:new xe("Unexpected error in register",i)}}}}rc();const mc={url:gl,storageKey:ml,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:bl,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},dt={};let zr=!1;class en{get jwks(){var e,n;return(n=(e=dt[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&n!==void 0?n:{keys:[]}}set jwks(e){dt[this.storageKey]=Object.assign(Object.assign({},dt[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,n;return(n=(e=dt[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&n!==void 0?n:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){dt[this.storageKey]=Object.assign(Object.assign({},dt[this.storageKey]),{cachedAt:e})}constructor(e){var n,s,r;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},mc),e);if(this.storageKey=a.storageKey,this.instanceID=(n=en.nextInstanceID[this.storageKey])!==null&&n!==void 0?n:0,en.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&ae()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;this.logDebugMessages}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.experimental=(s=a.experimental)!==null&&s!==void 0?s:{},this.admin=new nc({url:a.url,headers:a.headers,fetch:a.fetch,experimental:this.experimental}),this.url=a.url,this.headers=a.headers,this.fetch=Ea(a.fetch),this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock!=null&&(this.lock=a.lock,zr||(zr=!0)),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new gc(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:Sa()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Br(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=Br(this.memoryStorage)),ae()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch{}(r=this.broadcastChannel)===null||r===void 0||r.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i),(i.data.event==="TOKEN_REFRESHED"||i.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(i.data.event,i.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}a.skipAutoInitialize||this.initialize().catch(i=>{this._debug("#initialize()","error",i)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${xa}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const n=await this.initializePromise,s=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const r of s)await this._notifyAllSubscribers(r.event,r.session,r.broadcast);return n}async _initialize(){var e;try{let n={},s="none";if(ae()&&(n=Ir(window.location.href),this._isImplicitGrantCallback(n)?s="implicit":await this._isPKCECallback(n)&&(s="pkce")),ae()&&this.detectSessionInUrl&&s!=="none"){const{data:r,error:a}=await this._getSessionFromURL(n,s);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),kl(a)){const l=(e=a.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:i,redirectType:o}=r;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(n){return L(n)?this._returnResult({error:n}):this._returnResult({error:new xe("Unexpected error during initialization",n)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var n,s,r;try{const a=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}},xform:me}),{data:i,error:o}=a;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,c=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(L(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(e){var n,s,r;let a=null;try{let i;if("email"in e){const{email:u,password:p,options:h}=e;let g=null,f=null;this.flowType==="pkce"&&([g,f,a]=await this._getCodeChallengeAndMethod()),i=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(h==null?void 0:h.emailRedirectTo,a),body:{email:u,password:p,data:(n=h==null?void 0:h.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:g,code_challenge_method:f},xform:me})}else if("phone"in e){const{phone:u,password:p,options:h}=e;i=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:p,data:(s=h==null?void 0:h.data)!==null&&s!==void 0?s:{},channel:(r=h==null?void 0:h.channel)!==null&&r!==void 0?r:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:me})}else throw new yn("You must provide either an email or phone number and a password");const{data:o,error:l}=i;if(l||!o)return await ye(this.storage,this.storageKey,a),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(i){if(await ye(this.storage,this.storageKey,a),L(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithPassword(e){try{let n;if("email"in e){const{email:a,password:i,options:o}=e;n=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Nr})}else if("phone"in e){const{phone:a,password:i,options:o}=e;n=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Nr})}else throw new yn("You must provide either an email or phone number and a password");const{data:s,error:r}=n;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!s||!s.session||!s.user){const a=new ct;return this._returnResult({data:{user:null,session:null},error:a})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:r})}catch(n){if(L(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithOAuth(e){var n,s,r,a;return await this._handleProviderSignIn(e.provider,{redirectTo:(n=e.options)===null||n===void 0?void 0:n.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(r=e.options)===null||r===void 0?void 0:r.queryParams,skipBrowserRedirect:(a=e.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(e,n){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,n)):this._exchangeCodeForSession(e,n)}async signInWithWeb3(e){const{chain:n}=e;switch(n){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${n}"`)}}async signInWithEthereum(e){var n,s,r,a,i,o,l,c,d,u,p;let h,g;if("message"in e)h=e.message,g=e.signature;else{const{chain:f,wallet:b,statement:y,options:m}=e;let v;if(ae())if(typeof b=="object")v=b;else{const C=window;if("ethereum"in C&&typeof C.ethereum=="object"&&"request"in C.ethereum&&typeof C.ethereum.request=="function")v=C.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");v=b}const x=new URL((n=m==null?void 0:m.url)!==null&&n!==void 0?n:window.location.href),S=await v.request({method:"eth_requestAccounts"}).then(C=>C).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!S||S.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const w=Aa(S[0]);let E=(s=m==null?void 0:m.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!E){const C=await v.request({method:"eth_chainId"});E=ac(C)}const $={domain:x.host,address:w,statement:y,uri:x.href,version:"1",chainId:E,nonce:(r=m==null?void 0:m.signInWithEthereum)===null||r===void 0?void 0:r.nonce,issuedAt:(i=(a=m==null?void 0:m.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=m==null?void 0:m.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=m==null?void 0:m.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=m==null?void 0:m.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=m==null?void 0:m.signInWithEthereum)===null||d===void 0?void 0:d.resources};h=oc($),g=await v.request({method:"personal_sign",params:[ic(h),w]})}try{const{data:f,error:b}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:g},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:me});if(b)throw b;if(!f||!f.session||!f.user){const y=new ct;return this._returnResult({data:{user:null,session:null},error:y})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:b})}catch(f){if(L(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async signInWithSolana(e){var n,s,r,a,i,o,l,c,d,u,p,h;let g,f;if("message"in e)g=e.message,f=e.signature;else{const{chain:b,wallet:y,statement:m,options:v}=e;let x;if(ae())if(typeof y=="object")x=y;else{const w=window;if("solana"in w&&typeof w.solana=="object"&&("signIn"in w.solana&&typeof w.solana.signIn=="function"||"signMessage"in w.solana&&typeof w.solana.signMessage=="function"))x=w.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(v!=null&&v.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");x=y}const S=new URL((n=v==null?void 0:v.url)!==null&&n!==void 0?n:window.location.href);if("signIn"in x&&x.signIn){const w=await x.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},v==null?void 0:v.signInWithSolana),{version:"1",domain:S.host,uri:S.href}),m?{statement:m}:null));let E;if(Array.isArray(w)&&w[0]&&typeof w[0]=="object")E=w[0];else if(w&&typeof w=="object"&&"signedMessage"in w&&"signature"in w)E=w;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in E&&"signature"in E&&(typeof E.signedMessage=="string"||E.signedMessage instanceof Uint8Array)&&E.signature instanceof Uint8Array)g=typeof E.signedMessage=="string"?E.signedMessage:new TextDecoder().decode(E.signedMessage),f=E.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in x)||typeof x.signMessage!="function"||!("publicKey"in x)||typeof x!="object"||!x.publicKey||!("toBase58"in x.publicKey)||typeof x.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");g=[`${S.host} wants you to sign in with your Solana account:`,x.publicKey.toBase58(),...m?["",m,""]:[""],"Version: 1",`URI: ${S.href}`,`Issued At: ${(r=(s=v==null?void 0:v.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&r!==void 0?r:new Date().toISOString()}`,...!((a=v==null?void 0:v.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${v.signInWithSolana.notBefore}`]:[],...!((i=v==null?void 0:v.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${v.signInWithSolana.expirationTime}`]:[],...!((o=v==null?void 0:v.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${v.signInWithSolana.chainId}`]:[],...!((l=v==null?void 0:v.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${v.signInWithSolana.nonce}`]:[],...!((c=v==null?void 0:v.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${v.signInWithSolana.requestId}`]:[],...!((u=(d=v==null?void 0:v.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...v.signInWithSolana.resources.map(E=>`- ${E}`)]:[]].join(`
`);const w=await x.signMessage(new TextEncoder().encode(g),"utf8");if(!w||!(w instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");f=w}}try{const{data:b,error:y}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:g,signature:st(f)},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:me});if(y)throw y;if(!b||!b.session||!b.user){const m=new ct;return this._returnResult({data:{user:null,session:null},error:m})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:y})}catch(b){if(L(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async _exchangeCodeForSession(e,n){const s=(n==null?void 0:n.flowId)!=null,r=s?Cn(n==null?void 0:n.flowId):ae()?Cn(Ir(window.location.href)[nt]):null;s&&!r&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",n==null?void 0:n.flowId);const{verifier:a,flowId:i}=s&&!r?{verifier:null,flowId:null}:await zl(this.storage,this.storageKey,r),[o,l]=(a??"").split("/");try{if(!o&&this.flowType==="pkce")throw new _l;const{data:c,error:d}=await O(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:me});if(await ye(this.storage,this.storageKey,i),d)throw d;if(!c||!c.session||!c.user){const u=new ct;return this._returnResult({data:{user:null,session:null,redirectType:null},error:u})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c.session)),this._returnResult({data:Object.assign(Object.assign({},c),{redirectType:l??null}),error:d})}catch(c){if(await ye(this.storage,this.storageKey,i),L(c))return this._returnResult({data:{user:null,session:null,redirectType:null},error:c});throw c}}async signInWithIdToken(e){try{const{options:n,provider:s,token:r,access_token:a,nonce:i}=e,o=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:r,access_token:a,nonce:i,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:me}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new ct;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(n){if(L(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithOtp(e){var n,s,r,a,i;let o=null;try{if("email"in e){const{email:l,options:c}=e;let d=null,u=null;this.flowType==="pkce"&&([d,u,o]=await this._getCodeChallengeAndMethod());const{error:p}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(n=c==null?void 0:c.data)!==null&&n!==void 0?n:{},create_user:(s=c==null?void 0:c.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:d,code_challenge_method:u},redirectTo:this._maybeAppendFlowIdToRedirect(c==null?void 0:c.emailRedirectTo,o)});return this._returnResult({data:{user:null,session:null},error:p})}if("phone"in e){const{phone:l,options:c}=e,{data:d,error:u}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(r=c==null?void 0:c.data)!==null&&r!==void 0?r:{},create_user:(a=c==null?void 0:c.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(i=c==null?void 0:c.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:u})}throw new yn("You must provide either an email or phone number.")}catch(l){if(await ye(this.storage,this.storageKey,o),L(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var n,s;try{let r,a;"options"in e&&(r=(n=e.options)===null||n===void 0?void 0:n.redirectTo,a=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:i,error:o}=await O(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:a}}),redirectTo:r,xform:me});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,c=i.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(r){if(L(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithSSO(e){var n,s,r,a;let i=null;try{let o=null,l=null;this.flowType==="pkce"&&([o,l,i]=await this._getCodeChallengeAndMethod());const c=await O(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((n=e.options)===null||n===void 0?void 0:n.redirectTo,i)}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:Zl});return!((r=c.data)===null||r===void 0)&&r.url&&ae()&&!(!((a=e.options)===null||a===void 0)&&a.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await ye(this.storage,this.storageKey,i),L(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:n},error:s}=e;if(s)throw s;if(!n)throw new te;const{error:r}=await O(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:n.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(L(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let n=null;try{const s=`${this.url}/resend`;if("email"in e){const{email:r,type:a,options:i}=e;let o=null,l=null;this.flowType==="pkce"&&([o,l,n]=await this._getCodeChallengeAndMethod());const{error:c}=await O(this.fetch,"POST",s,{headers:this.headers,body:{email:r,type:a,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken},code_challenge:o,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(i==null?void 0:i.emailRedirectTo,n)});return c&&await ye(this.storage,this.storageKey,n),this._returnResult({data:{user:null,session:null},error:c})}else if("phone"in e){const{phone:r,type:a,options:i}=e,{data:o,error:l}=await O(this.fetch,"POST",s,{headers:this.headers,body:{phone:r,type:a,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l})}throw new yn("You must provide either an email or phone number and a type")}catch(s){if(await ye(this.storage,this.storageKey,n),L(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,n){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await s,await n()))();return this.pendingInLock.push((async()=>{try{await r}catch{}})()),r}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=n();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const r=[...this.pendingInLock];await Promise.all(r),this.pendingInLock.splice(0,r.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const n=await this.__loadSession();return await e(n)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const n=await le(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",n),n!==null&&(this._isValidSession(n)?e=n:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<os:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const i=await le(this.userStorage,this.storageKey+"-user");i!=null&&i.user?e.user=i.user:e.user=ls()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};e.user=Yl(e.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:r,error:a}=await this._callRefreshToken(e.refresh_token);if(a){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await le(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:a})}return this._returnResult({data:{session:r},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let n;return this.lock!=null?n=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):n=await this._getUser(),n.data.user&&(this.suppressGetSessionWarning=!0),n}async _getUser(e){try{return e?await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:He}):await this._useSession(async n=>{var s,r,a;const{data:i,error:o}=n;if(o)throw o;return!(!((s=i.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new te}:await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(r=i.session)===null||r===void 0?void 0:r.access_token)!==null&&a!==void 0?a:void 0,xform:He})})}catch(n){if(L(n))return bn(n)&&await this._removeSession(),this._returnResult({data:{user:null},error:n});throw n}}async updateUser(e,n={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,n)):await this._updateUser(e,n)}async _updateUser(e,n={}){let s=null;try{return await this._useSession(async r=>{const{data:a,error:i}=r;if(i)throw i;if(!a.session)throw new te;const o=a.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c,s]=await this._getCodeChallengeAndMethod());const{data:d,error:u}=await O(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(n==null?void 0:n.emailRedirectTo,s),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:He});if(u)throw u;return o.user=d.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(r){if(await ye(this.storage,this.storageKey,s),L(r))return this._returnResult({data:{user:null},error:r});throw r}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new te;const n=Date.now()/1e3;let s=n,r=!0,a=null;const{payload:i}=xn(e.access_token);if(i.exp&&(s=i.exp,r=s<=n),r){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-n,expires_at:s},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(n){if(L(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async n=>{var s;if(!e){const{data:i,error:o}=n;if(o)throw o;e=(s=i.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new te;const{data:r,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):r?this._returnResult({data:{user:r.user,session:r},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(n){if(L(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async _getSessionFromURL(e,n){var s;try{if(!ae())throw new vn("No browser detected.");if(e.error||e.error_description||e.error_code)throw new vn(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(n){case"implicit":if(this.flowType==="pkce")throw new Sr("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new vn("Not a valid implicit grant flow url.");break;default:}if(n==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Sr("No code detected.");const{data:v,error:x}=await this._exchangeCodeForSession(e.code,{flowId:e[nt]});if(x)throw x;const S=new URL(window.location.href);return S.searchParams.delete("code"),S.searchParams.delete(nt),window.history.replaceState(window.history.state,"",S.toString()),{data:{session:v.session,redirectType:(s=v.redirectType)!==null&&s!==void 0?s:null},error:null}}const{provider_token:r,provider_refresh_token:a,access_token:i,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=e;if(!i||!l||!o||!d)throw new vn("No session defined in URL");const u=Math.round(Date.now()/1e3),p=parseInt(l);let h=u+p;c&&(h=parseInt(c)),(h-u)*1e3<=Ue;const f=h-p;u-f>=120||u-f<0;const{data:b,error:y}=await this._getUser(i);if(y)throw y;const m={provider_token:r,provider_refresh_token:a,access_token:i,expires_in:p,expires_at:h,refresh_token:o,token_type:d,user:b.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:m,redirectType:e.type},error:null})}catch(r){if(L(r))return this._returnResult({data:{session:null,redirectType:null},error:r});throw r}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const n=Cn(e[nt]);return n&&await le(this.storage,_t(this.storageKey,n))?!0:!!await le(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async n=>{var s;const r=async()=>{await this._removeSession()},{data:a,error:i}=n;if(i&&!bn(i))return this._returnResult({error:i});const o=(s=a.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:l}=await this.admin.signOut(o,e);if(l&&!(_r(l)&&(l.status===404||l.status===401||l.status===403)||bn(l)))return e!=="others"&&await r(),this._returnResult({error:l})}return e!=="others"&&await r(),this._returnResult({error:null})})}onAuthStateChange(e){const n=$l(),s={id:n,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",n),this.stateChangeEmitters.delete(n)}};return this._debug("#onAuthStateChange()","registered callback with id",n),this.stateChangeEmitters.set(n,s),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(n)}):await this._emitInitialSession(n)))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async n=>{var s,r;try{const{data:{session:a},error:i}=n;if(i)throw i;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",e,"session",a)}catch(a){await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",a),bn(a)||wn(a)||_r(a)&&(a.code==="refresh_token_not_found"||a.code==="refresh_token_already_used"||a.code)}})}async resetPasswordForEmail(e,n={}){let s=null,r=null,a=null;this.flowType==="pkce"&&([s,r,a]=await this._getCodeChallengeAndMethod(!0));try{return await O(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:r,gotrue_meta_security:{captcha_token:n.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(n.redirectTo,a)})}catch(i){if(await ye(this.storage,this.storageKey,a),L(i))return this._returnResult({data:null,error:i});throw i}}async getUserIdentities(){var e;try{const{data:n,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=n.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var n;let s=null;try{const{data:r,error:a}=await this._useSession(async i=>{var o,l,c,d,u;const{data:p,error:h}=i;if(h)throw h;const{url:g,flowId:f}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return s=f,await O(this.fetch,"GET",g,{headers:this.headers,jwt:(u=(d=p.session)===null||d===void 0?void 0:d.access_token)!==null&&u!==void 0?u:void 0})});if(a)throw a;return ae()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(r==null?void 0:r.url),this._returnResult({data:{provider:e.provider,url:r==null?void 0:r.url,flowId:s},error:null})}catch(r){if(L(r))return this._returnResult({data:{provider:e.provider,url:null,flowId:s},error:r});throw r}}async linkIdentityIdToken(e){return await this._useSession(async n=>{var s;try{const{error:r,data:{session:a}}=n;if(r)throw r;const{options:i,provider:o,token:l,access_token:c,nonce:d}=e,u=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=a==null?void 0:a.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:me}),{data:p,error:h}=u;return h?this._returnResult({data:{user:null,session:null},error:h}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new ct}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:h}))}catch(r){if(await ye(this.storage,this.storageKey,null),L(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}})}async unlinkIdentity(e){try{return await this._useSession(async n=>{var s,r;const{data:a,error:i}=n;if(i)throw i;return await O(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(r=(s=a.session)===null||s===void 0?void 0:s.access_token)!==null&&r!==void 0?r:void 0})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _refreshAccessToken(e){const n="#_refreshAccessToken()";this._debug(n,"begin");try{const s=Date.now();return await Nl(async r=>(r>0&&await Ll(200*Math.pow(2,r-1)),this._debug(n,"refreshing attempt",r),await O(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:me})),(r,a)=>{const i=200*Math.pow(2,r);return a&&wn(a)&&Date.now()+i-s<Ue})}catch(s){if(this._debug(n,"error",s),L(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(n,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,n){const{url:s,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:n.redirectTo,scopes:n.scopes,queryParams:n.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",n,"url",s),ae()&&!n.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s,flowId:r},error:null}}async _recoverAndRefresh(){var e,n;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const r=await le(this.storage,this.storageKey);if(r&&this.userStorage){let i=await le(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:r.user},await Me(this.userStorage,this.storageKey+"-user",i)),r.user=(e=i==null?void 0:i.user)!==null&&e!==void 0?e:ls()}else if(r&&!r.user&&!r.user){const i=await le(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(r.user=i.user,await ue(this.storage,this.storageKey+"-user"),await Me(this.storage,this.storageKey,r)):r.user=ls()}if(this._debug(s,"session from storage",r),!this._isValidSession(r)){this._debug(s,"session is not valid"),r!==null&&await this._removeSession();return}const a=((n=r.expires_at)!==null&&n!==void 0?n:1/0)*1e3-Date.now()<os;if(this._debug(s,`session has${a?"":" not"} expired with margin of ${os}s`),a){if(this.autoRefreshToken&&r.refresh_token){const{error:i}=await this._callRefreshToken(r.refresh_token);i&&(Sl(i)?this._debug(s,"refresh discarded by commit guard",i):this._debug(s,"refresh failed",i))}}else if(r.user&&r.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(r.access_token);!o&&(i!=null&&i.user)?(r.user=i.user,await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(i){this._debug(s,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",r)}catch(r){this._debug(s,"error",r),wn(r);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var n,s;if(!e)throw new te;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const r="#_callRefreshToken()";this._debug(r,"begin");try{this.refreshingDeferred=new Xn,this.refreshingDeferred.promise.then(void 0,()=>{});const a=await le(this.storage,this.storageKey),{data:i,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!i.session)throw new te;const l=await le(this.storage,this.storageKey);if(a!==null&&(l===null||l.refresh_token!==a.refresh_token)){this._debug(r,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const p={data:null,error:new Er};return this.refreshingDeferred.resolve(p),p}const d=this._sessionRemovalEpoch;if(await this._saveSession(i.session),this._sessionRemovalEpoch!==d){this._debug(r,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await ue(this.storage,this.storageKey),this.userStorage&&await ue(this.userStorage,this.storageKey+"-user");const p={data:null,error:new Er};return this.refreshingDeferred.resolve(p),p}await this._notifyAllSubscribers("TOKEN_REFRESHED",i.session);const u={data:i.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(a){if(this._debug(r,"error",a),L(a)){const i={data:null,error:a};if(!wn(a)){const o=await le(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(r,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:i,expiresAt:Date.now()+fl},(n=this.refreshingDeferred)===null||n===void 0||n.resolve(i),i}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(a),a}finally{this.refreshingDeferred=null,this._debug(r,"end")}}async _notifyAllSubscribers(e,n,s=!0){if(this._pendingInitNotifications!==null&&s){this._pendingInitNotifications.push({event:e,session:n,broadcast:s});return}const r=`#_notifyAllSubscribers(${e})`;this._debug(r,"begin",n,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:n});const a=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,n)}catch(l){a.push(l)}});if(await Promise.all(i),a.length>0){for(let o=0;o<a.length;o+=1);throw a[0]}}finally{this._debug(r,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const n=Object.assign({},e),s=n.user&&n.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&n.user&&await Me(this.userStorage,this.storageKey+"-user",{user:n.user});const r=Object.assign({},n);delete r.user;const a=$r(r);await Me(this.storage,this.storageKey,a)}else{const r=$r(n);await Me(this.storage,this.storageKey,r)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await ue(this.storage,this.storageKey),await Kl(this.storage,this.storageKey),await ue(this.storage,this.storageKey+"-user"),this.userStorage&&await ue(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&ae()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch{}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Ue);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const n=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=n,n&&typeof n=="object"&&typeof n.unref=="function"?n.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(n)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const n=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,n&&clearTimeout(n)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async n=>{const{data:{session:s}}=n;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((s.expires_at*1e3-e)/Ue);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${Ue}ms, refresh threshold is ${zt} ticks`),r<=zt&&await this._callRefreshToken(s.refresh_token)})}catch{}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof sc)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async n=>{const{data:{session:s}}=n;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((s.expires_at*1e3-e)/Ue);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${Ue}ms, refresh threshold is ${zt} ticks`),r<=zt&&await this._callRefreshToken(s.refresh_token)})}catch{}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!ae()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch{}}async _onVisibilityChanged(e){const n=`#_onVisibilityChanged(${e})`;if(this._debug(n,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(n,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(n,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,n,s){let r=s==null?void 0:s.redirectTo,a=null,i=null,o=null;this.flowType==="pkce"&&([a,i,o]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,o));const l=[`provider=${encodeURIComponent(n)}`];if(r&&l.push(`redirect_to=${encodeURIComponent(r)}`),s!=null&&s.scopes&&l.push(`scopes=${encodeURIComponent(s.scopes)}`),a!=null&&i!=null){const c=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(i)}`});l.push(c.toString())}if(s!=null&&s.queryParams){const c=new URLSearchParams(s.queryParams);l.push(c.toString())}return s!=null&&s.skipBrowserRedirect&&l.push(`skip_http_redirect=${s.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,n){return!e||!n||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:Fl(e,n)}async _getCodeChallengeAndMethod(e=!1){return Hl(this.storage,this.storageKey,e,n=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",n))}async _unenroll(e){try{return await this._useSession(async n=>{var s;const{data:r,error:a}=n;return a?this._returnResult({data:null,error:a}):await O(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=r==null?void 0:r.session)===null||s===void 0?void 0:s.access_token})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _enroll(e){try{return await this._useSession(async n=>{var s,r;const{data:a,error:i}=n;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await O(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((r=l==null?void 0:l.totp)===null||r===void 0)&&r.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _verify(e){const n=async()=>{try{return await this._useSession(async s=>{var r;const{data:a,error:i}=s;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Ur(e.webauthn.credential_response):Mr(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(r=a==null?void 0:a.session)===null||r===void 0?void 0:r.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(s){if(L(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,n):n()}async _challenge(e){const n=async()=>{try{return await this._useSession(async s=>{var r;const{data:a,error:i}=s;if(i)return this._returnResult({data:null,error:i});const o=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(r=a==null?void 0:a.session)===null||r===void 0?void 0:r.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:jr(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Dr(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(s){if(L(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,n):n()}async _challengeAndVerify(e){const{data:n,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:n.id,code:e.code})}async _listFactors(){var e;const{data:{user:n},error:s}=await this.getUser();if(s)return{data:null,error:s};const r={all:[],phone:[],totp:[],webauthn:[]};for(const a of(e=n==null?void 0:n.factors)!==null&&e!==void 0?e:[])r.all.push(a),a.status==="verified"&&r[a.factor_type].push(a);return{data:r,error:null}}async _getAuthenticatorAssuranceLevel(e){var n,s,r,a;if(e)try{const{payload:h}=xn(e);let g=null;h.aal&&(g=h.aal);let f=g;const{data:{user:b},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((s=(n=b==null?void 0:b.factors)===null||n===void 0?void 0:n.filter(x=>x.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(f="aal2");const v=h.amr||[];return{data:{currentLevel:g,nextLevel:f,currentAuthenticationMethods:v},error:null}}catch(h){if(L(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:i},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=xn(i.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((a=(r=i.user.factors)===null||r===void 0?void 0:r.filter(h=>h.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(d="aal2");const p=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async n=>{const{data:{session:s},error:r}=n;return r?this._returnResult({data:null,error:r}):s?await O(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new te})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _approveAuthorization(e,n){try{return await this._useSession(async s=>{const{data:{session:r},error:a}=s;if(a)return this._returnResult({data:null,error:a});if(!r)return this._returnResult({data:null,error:new te});const i=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&ae()&&!(n!=null&&n.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(s){if(L(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,n){try{return await this._useSession(async s=>{const{data:{session:r},error:a}=s;if(a)return this._returnResult({data:null,error:a});if(!r)return this._returnResult({data:null,error:new te});const i=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&ae()&&!(n!=null&&n.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(s){if(L(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:n},error:s}=e;return s?this._returnResult({data:null,error:s}):n?await O(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,xform:r=>({data:r,error:null})}):this._returnResult({data:null,error:new te})})}catch(e){if(L(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async n=>{const{data:{session:s},error:r}=n;return r?this._returnResult({data:null,error:r}):s?(await O(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new te})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async fetchJwk(e,n={keys:[]}){let s=n.keys.find(o=>o.kid===e);if(s)return s;const r=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+wl>r)return s;const{data:a,error:i}=await O(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=r,s=a.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,n={}){try{let s=e;if(!s){const{data:h,error:g}=await this.getSession();if(g||!h.session)return this._returnResult({data:null,error:g});s=h.session.access_token}const{header:r,payload:a,signature:i,raw:{header:o,payload:l}}=xn(s);if(!(n!=null&&n.allowExpired))try{Gl(a.exp)}catch(h){throw new jn(h instanceof Error?h.message:"JWT validation failed")}const c=!r.alg||r.alg.startsWith("HS")||!r.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(r.kid,n!=null&&n.keys?{keys:n.keys}:n==null?void 0:n.jwks);if(!c){const{error:h}=await this.getUser(s);if(h)throw h;return{data:{claims:a,header:r,signature:i},error:null}}const d=Vl(r.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,i,Cl(`${o}.${l}`)))throw new jn("Invalid JWT signature");return{data:{claims:a,header:r,signature:i},error:null}}catch(s){if(L(s))return this._returnResult({data:null,error:s});throw s}}async signInWithPasskey(e){var n,s,r;ve(this.experimental);try{if(!Mn())return this._returnResult({data:null,error:new xe("Browser does not support WebAuthn",null)});const{data:a,error:i}=await this._startPasskeyAuthentication({options:{captchaToken:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}});if(i||!a)return this._returnResult({data:null,error:i});const o=Dr(a.options),l=(r=(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.signal)!==null&&r!==void 0?r:js.createNewAbortSignal(),{data:c,error:d}=await Ia({publicKey:o,signal:l});if(d||!c)return this._returnResult({data:null,error:d??new xe("WebAuthn ceremony failed",null)});const u=Mr(c);return this._verifyPasskeyAuthentication({challengeId:a.challenge_id,credential:u})}catch(a){if(L(a))return this._returnResult({data:null,error:a});throw a}}async registerPasskey(e){var n,s;ve(this.experimental);try{if(!Mn())return this._returnResult({data:null,error:new xe("Browser does not support WebAuthn",null)});const{data:r,error:a}=await this._startPasskeyRegistration();if(a||!r)return this._returnResult({data:null,error:a});const i=jr(r.options),o=(s=(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.signal)!==null&&s!==void 0?s:js.createNewAbortSignal(),{data:l,error:c}=await Ca({publicKey:i,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new xe("WebAuthn ceremony failed",null)});const d=Ur(l);return this._verifyPasskeyRegistration({challengeId:r.challenge_id,credential:d})}catch(r){if(L(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyRegistration(){ve(this.experimental);try{return await this._useSession(async e=>{const{data:{session:n},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!n)return this._returnResult({data:null,error:new te});const{data:r,error:a}=await O(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:n.access_token,body:{}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:r,error:null})})}catch(e){if(L(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){ve(this.experimental);try{return await this._useSession(async n=>{const{data:{session:s},error:r}=n;if(r)return this._returnResult({data:null,error:r});if(!s)return this._returnResult({data:null,error:new te});const{data:a,error:i}=await O(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:s.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:a,error:null})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _startPasskeyAuthentication(e){var n;ve(this.experimental);try{const{data:s,error:r}=await O(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}}});return r?this._returnResult({data:null,error:r}):this._returnResult({data:s,error:null})}catch(s){if(L(s))return this._returnResult({data:null,error:s});throw s}}async _verifyPasskeyAuthentication(e){ve(this.experimental);try{const{data:n,error:s}=await O(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:me});return s?this._returnResult({data:null,error:s}):(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:n,error:null}))}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _listPasskeys(){ve(this.experimental);try{return await this._useSession(async e=>{const{data:{session:n},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!n)return this._returnResult({data:null,error:new te});const{data:r,error:a}=await O(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:n.access_token,xform:i=>({data:i,error:null})});return a?this._returnResult({data:null,error:a}):this._returnResult({data:r,error:null})})}catch(e){if(L(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){ve(this.experimental);try{return await this._useSession(async n=>{const{data:{session:s},error:r}=n;if(r)return this._returnResult({data:null,error:r});if(!s)return this._returnResult({data:null,error:new te});const{data:a,error:i}=await O(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,body:{friendly_name:e.friendlyName}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:a,error:null})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}async _deletePasskey(e){ve(this.experimental);try{return await this._useSession(async n=>{const{data:{session:s},error:r}=n;if(r)return this._returnResult({data:null,error:r});if(!s)return this._returnResult({data:null,error:new te});const{error:a}=await O(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,noResolveJson:!0});return a?this._returnResult({data:null,error:a}):this._returnResult({data:null,error:null})})}catch(n){if(L(n))return this._returnResult({data:null,error:n});throw n}}}en.nextInstanceID={};const bc=en,yc="2.112.4";let Kt="",Kn;if(typeof Deno<"u"){var ds;Kt="deno",Kn=(ds=Deno.version)===null||ds===void 0?void 0:ds.deno}else if(typeof document<"u")Kt="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")Kt="react-native";else{var us;Kt="node";const t=globalThis.process;Kn=t==null||(us=t.version)===null||us===void 0?void 0:us.replace(/^v/,"")}const $a=[`runtime=${Kt}`];Kn&&$a.push(`runtime-version=${Kn}`);const vc={"X-Client-Info":`supabase-js/${yc}; ${$a.join("; ")}`},wc={headers:vc},xc={schema:"public"},kc={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},_c={},Sc={enabled:!1,respectSamplingDecision:!0};function Ec(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[n,s,r,a]=e;if(n.length!==2||s.length!==32||r.length!==16||a.length!==2)return null;const i=/^[0-9a-f]+$/i;return!i.test(n)||!i.test(s)||!i.test(r)||!i.test(a)||s==="00000000000000000000000000000000"||r==="0000000000000000"?null:{version:n,traceId:s,parentId:r,traceFlags:a,isSampled:(parseInt(a,16)&1)===1}}function Tc(t,e){if(!t||!e||e.length===0)return!1;let n;if(t instanceof URL)n=t;else try{n=new URL(t)}catch{return!1}for(const s of e)try{if(typeof s=="string"){if(Ac(n.hostname,s))return!0}else if(s instanceof RegExp){if(s.test(n.hostname))return!0}else if(typeof s=="function"&&s(n))return!0}catch{continue}return!1}function Ac(t,e){if(e===t)return!0;if(e.startsWith("*.")){const n=e.slice(2);if(t.endsWith(n)&&(t===n||t.endsWith("."+n)))return!0}return!1}function Pc(t){const e=[];try{const n=new URL(t);e.push(n.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function tn(t){"@babel/helpers - typeof";return tn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},tn(t)}function Cc(t,e){if(tn(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var s=n.call(t,e);if(tn(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Ic(t){var e=Cc(t,"string");return tn(e)=="symbol"?e:e+""}function $c(t,e,n){return(e=Ic(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Kr(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,s)}return n}function X(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Kr(Object(n),!0).forEach(function(s){$c(t,s,n[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Kr(Object(n)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(n,s))})}return t}const Rc=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Lc=()=>Headers,Ra=t=>t.startsWith("sb_publishable_")||t.startsWith("sb_secret_"),Nc="sb_temp_",Fr=new Set,Oc=t=>{var e,n;if(!t.startsWith("sb_")||Ra(t)||t.startsWith(Nc))return;const s=(e=(n=t.match(/^sb_[a-zA-Z0-9]+_/))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:"unknown";Fr.has(s)||Fr.add(s)},Hr=(t,e,n,s,r,a)=>{const i=Rc(s),o=Lc(),l=(r==null?void 0:r.enabled)===!0,c=(r==null?void 0:r.respectSamplingDecision)!==!1,d=l?Pc(e):null,u=!(a!=null&&a.omitApiKeyAsBearer&&Ra(t));return async(p,h)=>{const g=await n();let f=new o(h==null?void 0:h.headers);if(f.has("apikey")||f.set("apikey",t),!f.has("Authorization")){const b=g??(u?t:null);b&&f.set("Authorization",`Bearer ${b}`)}if(d){const b=Bc(p,d,c);b&&(b.traceparent&&!f.has("traceparent")&&f.set("traceparent",b.traceparent),b.tracestate&&!f.has("tracestate")&&f.set("tracestate",b.tracestate),b.baggage&&!f.has("baggage")&&f.set("baggage",b.baggage))}return i(p,X(X({},h),{},{headers:f}))}};let qr=!1,Wr=!1;function Bc(t,e,n){const s=Ni();if(!s)return qr||(qr=!0),null;if(!Tc(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const r=s();if(!r||!r.traceparent){var a;if(!(r==null||(a=r.carrierKeys)===null||a===void 0)&&a.length&&!Wr){Wr=!0;const i=r.carrierKeys.includes("sentry-trace")?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":" Configure your tracing SDK to emit W3C trace context on outgoing requests."}return null}if(n){const i=Ec(r.traceparent);if(i&&!i.isSampled)return{traceparent:r.traceparent}}return r}function Gr(t){return typeof t=="boolean"?{enabled:t}:t}function jc(t){return t.endsWith("/")?t:t+"/"}function Dc(t,e){var n,s,r,a,i,o;const{db:l,auth:c,realtime:d,global:u}=t,{db:p,auth:h,realtime:g,global:f}=e,b=Gr(t.tracePropagation),y=Gr(e.tracePropagation),m={db:X(X({},p),l),auth:X(X({},h),c),realtime:X(X({},g),d),storage:{},global:X(X(X({},f),u),{},{headers:X(X({},(n=f==null?void 0:f.headers)!==null&&n!==void 0?n:{}),(s=u==null?void 0:u.headers)!==null&&s!==void 0?s:{})}),tracePropagation:{enabled:(r=(a=b==null?void 0:b.enabled)!==null&&a!==void 0?a:y==null?void 0:y.enabled)!==null&&r!==void 0?r:!1,respectSamplingDecision:(i=(o=b==null?void 0:b.respectSamplingDecision)!==null&&o!==void 0?o:y==null?void 0:y.respectSamplingDecision)!==null&&i!==void 0?i:!0},accessToken:async()=>""};return t.accessToken?m.accessToken=t.accessToken:delete m.accessToken,m}function Uc(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(jc(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Mc=class extends bc{constructor(t){super(t)}},zc=class{constructor(t,e,n){var s,r;this.supabaseUrl=t,this.supabaseKey=e;const a=Uc(t);if(!e)throw new Error("supabaseKey is required.");Oc(e),this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const i=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:xc,realtime:_c,auth:X(X({},kc),{},{storageKey:i}),global:wc,tracePropagation:Sc},l=Dc(n??{},o);if(this.settings=l,this.storageKey=(s=l.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(r=l.global.headers)!==null&&r!==void 0?r:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=Hr(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=Hr(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(X({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>{}),this.rest=new Gi(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new pl(this.storageUrl.href,this.headers,this.fetch,n==null?void 0:n.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Di(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,n)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var t=this,e,n;if(t.accessToken)return await t.accessToken();const{data:s}=await t.auth.getSession();return(e=(n=s.session)===null||n===void 0?void 0:n.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var t=this,e;return(e=await t._getSessionToken())!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:s,userStorage:r,storageKey:a,flowType:i,lock:o,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:u,skipAutoInitialize:p},h,g){const f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Mc({url:this.authUrl.href,headers:X(X({},f),h),storageKey:a,autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:s,userStorage:r,flowType:i,lock:o,debug:l,throwOnError:c,experimental:d,fetch:g,lockAcquireTimeout:u,skipAutoInitialize:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(b=>b.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new jo(this.realtimeUrl.href,X(X({},t),{},{params:X(X({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,n){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN"||t==="INITIAL_SESSION")&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Kc=(t,e,n)=>new zc(t,e,n);function Fc(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const n=e.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=20:!1}Fc();const Hc=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),qc=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),La=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),Re=(t=new Date)=>`${qc(t)} ${La(t)}`,he=(t=new Date)=>{const e=t instanceof Date?t:new Date(t);if(isNaN(e.getTime()))return new Date().toISOString().split("T")[0];const n=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${n}-${s}-${r}`},Wc=(t=new Date)=>{const e=t instanceof Date?t:new Date(t);return isNaN(e.getTime())?new Date().toISOString().slice(0,7):`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`},ut={},k={state:{cart:[],products:[],customers:[],transactions:[],expenses:[],users:[],currentUser:null,currentView:"pos",discount:0,customerName:"",selectedCustomer:null,settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return(ut[t]??(ut[t]=[])).push(e),()=>{ut[t]=(ut[t]??[]).filter(n=>n!==e)}},emit(t,e){(ut[t]??[]).forEach(n=>n(e))},addToCart(t,e=1){const n=Math.max(1,parseInt(e)||1),s=this.state.cart.findIndex(r=>String(r.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=n:this.state.cart.push({product:t,qty:n}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const n=this.state.cart.find(s=>String(s.product.id)===String(t));n&&(n.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.state.selectedCustomer=null,this.emit("cart:change",this.state.cart),this.emit("selectedCustomer:change",null)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setCustomers(t){this.state.customers=t||[],this.emit("customers:change",this.state.customers)},setSelectedCustomer(t){this.state.selectedCustomer=t,this.state.customerName=t?t.name:"",this.emit("selectedCustomer:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>String(e.id)!==String(t)),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const n=this.state.transactions.findIndex(s=>String(s.id)===String(t));n>=0&&(this.state.transactions[n]={...this.state.transactions[n],...e},this.emit("transactions:change",this.state.transactions))},updateCustomer(t,e){const n=this.state.customers.findIndex(s=>String(s.id)===String(t));n>=0&&(this.state.customers[n]={...this.state.customers[n],...e},this.emit("customers:change",this.state.customers))},addCustomer(t){this.state.customers=[...this.state.customers,t],this.emit("customers:change",this.state.customers)},removeCustomer(t){this.state.customers=this.state.customers.filter(e=>String(e.id)!==String(t)),this.emit("customers:change",this.state.customers)},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)},setUsers(t){this.state.users=t,this.emit("users:change",t)},addUser(t){this.state.users=[...this.state.users,t],this.emit("users:change",this.state.users)},updateUser(t,e){const n=this.state.users.findIndex(s=>String(s.id)===String(t));n>=0&&(this.state.users[n]={...this.state.users[n],...e},this.emit("users:change",this.state.users))},removeUser(t){this.state.users=this.state.users.filter(e=>String(e.id)!==String(t)),this.emit("users:change",this.state.users)},login(t){const e={id:t.id,username:t.username,name:t.name,role:t.role||"cashier"};this.state.currentUser=e;try{sessionStorage.setItem("bm_active_user",JSON.stringify(e))}catch{}this.emit("auth:change",e)},logout(){this.state.currentUser=null;try{sessionStorage.removeItem("bm_active_user")}catch{}this.emit("auth:change",null)},restoreSession(){try{const t=sessionStorage.getItem("bm_active_user");if(t)return this.state.currentUser=JSON.parse(t),this.emit("auth:change",this.state.currentUser),this.state.currentUser}catch{}return null},canAccess(t){if(t==="login")return!0;const e=this.state.currentUser;if(!e)return!1;const n=e.role||"cashier";return n==="owner"?!0:n==="supervisor"?["pos","products","customers","transactions","reports"].includes(t):["pos","customers","transactions"].includes(t)}},Gc="https://wiapnhpdgjbtkblowfig.supabase.co",Vc="sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g";let hs=null,ps=null;const ce=()=>(hs||(hs=Kc(Gc,Vc,{auth:{persistSession:!1},realtime:{params:{eventsPerSecond:20}}})),hs),vt=(t,e)=>{const n=document.getElementById("status-badge");n&&(t==="online"?(n.textContent=e||"🟢 Cloud Realtime",n.classList.remove("status-badge--offline"),n.style.background="rgba(16, 185, 129, 0.12)",n.style.borderColor="rgba(16, 185, 129, 0.3)",n.style.color="#059669"):t==="syncing"?(n.textContent="🔄 Sinkronisasi...",n.classList.remove("status-badge--offline"),n.style.background="rgba(37, 99, 235, 0.12)",n.style.borderColor="rgba(37, 99, 235, 0.3)",n.style.color="#2563eb"):(n.textContent=e||"⚡ Mode Offline",n.classList.add("status-badge--offline"),n.style.background="rgba(239, 68, 68, 0.12)",n.style.borderColor="rgba(239, 68, 68, 0.3)",n.style.color="#dc2626"))},Na=t=>({id:String(t.id),sku:t.sku||`BM-${t.id}`,name:t.name||"",category:t.category||"Umum",price:Number(t.price)||0,cost:Number(t.cost)||0,unit:t.unit||"buah",emoji:t.emoji||"📦",image:t.image||null,stock:Number(t.stock)||0,updated_at:new Date().toISOString()}),Oa=t=>({id:String(t.id),invoice_no:t.invoiceNo||t.invoice_no||`INV-${Date.now()}`,date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||he(t.date?new Date(t.date):new Date),customer_name:t.customerName||t.customer_name||"",items:t.items||[],subtotal:Number(t.subtotal)||0,discount:Number(t.discount)||0,tax:Number(t.tax)||0,total:Number(t.total)||0,paid:Number(t.paid)||0,change:Number(t.change)||0,payment_method:t.paymentMethod||t.payment_method||"cash",payment_status:t.paymentStatus||t.payment_status||"cash_paid",paid_amount:Number(t.paidAmount||t.paid_amount)||0,remaining_debt:Number(t.remainingDebt||t.remaining_debt)||0,debt_payments:t.debtPayments||t.debt_payments||[],cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),Ba=t=>({id:String(t.id),date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||he(t.date?new Date(t.date):new Date),category:t.category||"Operasional",note:t.note||"",amount:Number(t.amount)||0,cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),ja=t=>({id:String(t.id),name:t.name||"",phone:t.phone||"",address:t.address||"",category:t.category||"Rumah Tangga",total_orders:Number(t.totalOrders||t.total_orders)||0,total_spent:Number(t.totalSpent||t.total_spent)||0,total_debt:Number(t.totalDebt||t.total_debt)||0,credit_limit:Number(t.creditLimit||t.credit_limit)||0,galon_loaned:Number(t.galonLoaned||t.galon_loaned)||0,notes:t.notes||"",updated_at:new Date().toISOString()}),Da=t=>({username:String(t.username||"").toLowerCase().trim(),name:String(t.name||""),role:String(t.role||"cashier"),pin_hash:String(t.pinHash||t.pin_hash||""),pin_salt:String(t.pinSalt||t.pin_salt||""),is_active:t.isActive!==void 0?!!t.isActive:t.is_active!==void 0?!!t.is_active:!0,updated_at:new Date().toISOString()}),Ws=async()=>{var e,n;if(!navigator.onLine){vt("offline","⚡ Mode Offline");return}const t=ce();vt("syncing");try{const[s,{data:r,error:a}]=await Promise.all([be(),t.from("products").select("*")]);if(!a&&r){const p=new Set(r.map(f=>String(f.id))),h=s.filter(f=>!p.has(String(f.id)));h.length>0&&await t.from("products").upsert(h.map(Na));for(const f of r){const b={id:isNaN(Number(f.id))?f.id:Number(f.id),sku:f.sku||`BM-${f.id}`,name:f.name,category:f.category,price:Number(f.price),cost:Number(f.cost)||0,unit:f.unit,emoji:f.emoji,image:f.image||null,stock:Number(f.stock)};await I.products.put(b)}const g=await be();k.setProducts(g)}const[i,{data:o,error:l}]=await Promise.all([_e(),t.from("transactions").select("*")]);if(!l&&o){const p=new Set(o.map(f=>f.invoice_no||String(f.id))),h=i.filter(f=>!p.has(f.invoiceNo||String(f.id)));h.length>0&&await t.from("transactions").upsert(h.map(Oa));for(const f of o){const b={id:isNaN(Number(f.id))?f.id:Number(f.id),invoiceNo:f.invoice_no,date:f.date,dateKey:f.date_key,customerName:f.customer_name,items:f.items||[],subtotal:Number(f.subtotal),discount:Number(f.discount),tax:Number(f.tax),total:Number(f.total),paid:Number(f.paid),change:Number(f.change),paymentMethod:f.payment_method,paymentStatus:f.payment_status,paidAmount:Number(f.paid_amount),remainingDebt:Number(f.remaining_debt),debtPayments:f.debt_payments||[],cashier:f.cashier};await I.transactions.put(b)}const g=await _e();k.setTransactions(g)}const[c,{data:d,error:u}]=await Promise.all([rn(),t.from("expenses").select("*")]);if(!u&&d){const p=new Set(d.map(f=>String(f.id))),h=c.filter(f=>!p.has(String(f.id)));h.length>0&&await t.from("expenses").upsert(h.map(Ba));for(const f of d){const b={id:isNaN(Number(f.id))?f.id:Number(f.id),date:f.date,dateKey:f.date_key,category:f.category,note:f.note,amount:Number(f.amount),cashier:f.cashier};await I.expenses.put(b)}const g=await rn();k.setExpenses(g)}try{const[p,{data:h,error:g}]=await Promise.all([se(),t.from("customers").select("*")]);if(!g&&h){const f=new Set(h.map(m=>String(m.id))),b=p.filter(m=>!f.has(String(m.id)));b.length>0&&await t.from("customers").upsert(b.map(ja));for(const m of h){const v={id:isNaN(Number(m.id))?m.id:Number(m.id),name:m.name||"",phone:m.phone||"",address:m.address||"",category:m.category||"Rumah Tangga",totalOrders:Number(m.total_orders)||0,totalSpent:Number(m.total_spent)||0,totalDebt:Number(m.total_debt)||0,creditLimit:Number(m.credit_limit)||0,galonLoaned:Number(m.galon_loaned)||0,notes:m.notes||""};await I.customers.put(v)}const y=await se();(e=k.setCustomers)==null||e.call(k,y)}else g&&g.code==="PGRST205"&&(k.state.supabaseMissingTables=k.state.supabaseMissingTables||[],k.state.supabaseMissingTables.includes("customers")||k.state.supabaseMissingTables.push("customers"))}catch{}try{const[p,{data:h,error:g}]=await Promise.all([ke?ke():I.users.toArray(),t.from("app_users").select("*")]);if(!g&&h){const f=new Set(h.map(m=>String(m.username).toLowerCase())),b=p.filter(m=>!f.has(String(m.username).toLowerCase()));b.length>0&&await t.from("app_users").upsert(b.map(Da),{onConflict:"username"});for(const m of h){const v=await I.users.where("username").equalsIgnoreCase(m.username).first();await I.users.put({id:v?v.id:void 0,username:m.username,name:m.name,role:m.role,pinHash:m.pin_hash,pinSalt:m.pin_salt,isActive:m.is_active,createdAt:m.created_at,updatedAt:m.updated_at})}const y=await I.users.toArray();(n=k.setUsers)==null||n.call(k,y)}}catch{}vt("online","🟢 Cloud Realtime")}catch{vt("online","🟢 Cloud Aktif")}finally{}try{const{data:s,error:r}=await ce().from("settings").select("*"),a=await I.settings.toArray();if(!r&&s){if(s.length===0&&a.length>0)await ce().from("settings").upsert(a.map(i=>({key:i.key,value:String(i.value??""),updated_at:new Date().toISOString()})));else if(s.length>0)for(const i of s)await I.settings.put({key:i.key,value:i.value??""})}}catch{}},Jc=()=>{const t=ce();ps&&t.removeChannel(ps),ps=t.channel("pos-multi-device-sync").on("postgres_changes",{event:"*",schema:"public",table:"products"},async e=>{if(e.eventType==="DELETE"){const s=isNaN(Number(e.old.id))?e.old.id:Number(e.old.id);await I.products.delete(s)}else{const s=e.new;await I.products.put({id:isNaN(Number(s.id))?s.id:Number(s.id),sku:s.sku||`BM-${s.id}`,name:s.name,category:s.category,price:Number(s.price),cost:Number(s.cost)||0,unit:s.unit,emoji:s.emoji,image:s.image||null,stock:Number(s.stock)})}const n=await be();k.setProducts(n)}).on("postgres_changes",{event:"*",schema:"public",table:"transactions"},async e=>{if(e.eventType==="DELETE"){const s=isNaN(Number(e.old.id))?e.old.id:Number(e.old.id);await I.transactions.delete(s)}else{const s=e.new;await I.transactions.put({id:isNaN(Number(s.id))?s.id:Number(s.id),invoiceNo:s.invoice_no,date:s.date,dateKey:s.date_key,customerName:s.customer_name,items:s.items||[],subtotal:Number(s.subtotal),discount:Number(s.discount),tax:Number(s.tax),total:Number(s.total),paid:Number(s.paid),change:Number(s.change),paymentMethod:s.payment_method,paymentStatus:s.payment_status,paidAmount:Number(s.paid_amount),remainingDebt:Number(s.remaining_debt),debtPayments:s.debt_payments||[],cashier:s.cashier})}const n=await _e();k.setTransactions(n)}).on("postgres_changes",{event:"*",schema:"public",table:"expenses"},async e=>{if(e.eventType==="DELETE"){const s=isNaN(Number(e.old.id))?e.old.id:Number(e.old.id);await I.expenses.delete(s)}else{const s=e.new;await I.expenses.put({id:isNaN(Number(s.id))?s.id:Number(s.id),date:s.date,dateKey:s.date_key,category:s.category,note:s.note,amount:Number(s.amount),cashier:s.cashier})}const n=await rn();k.setExpenses(n)}).on("postgres_changes",{event:"*",schema:"public",table:"customers"},async e=>{var s;if(e.eventType==="DELETE"){const r=isNaN(Number(e.old.id))?e.old.id:Number(e.old.id);await I.customers.delete(r)}else{const r=e.new;await I.customers.put({id:isNaN(Number(r.id))?r.id:Number(r.id),name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||""})}const n=await se();(s=k.setCustomers)==null||s.call(k,n)}).on("postgres_changes",{event:"*",schema:"public",table:"app_users"},async e=>{var s;if(e.eventType==="DELETE"){const r=e.old;if(r&&r.username){const a=await I.users.where("username").equalsIgnoreCase(r.username).first();a&&await I.users.delete(a.id)}}else{const r=e.new;if(r&&r.username){const a=await I.users.where("username").equalsIgnoreCase(r.username).first();await I.users.put({id:a?a.id:void 0,username:r.username,name:r.name,role:r.role,pinHash:r.pin_hash,pinSalt:r.pin_salt,isActive:r.is_active,createdAt:r.created_at,updatedAt:r.updated_at})}}const n=await I.users.toArray();(s=k.setUsers)==null||s.call(k,n)}).subscribe(e=>{e==="SUBSCRIBED"?vt("online","🟢 Cloud Realtime"):(e==="CLOSED"||e==="CHANNEL_ERROR")&&vt("offline","⚡ Mode Offline")}),window.addEventListener("online",()=>{Ws()})},Ua=async t=>{if(navigator.onLine)try{await ce().from("products").upsert(Na(t))}catch{}},Yc=async t=>{if(navigator.onLine)try{await ce().from("products").delete().eq("id",String(t))}catch{}},Ma=async t=>{if(navigator.onLine)try{await ce().from("customers").upsert(ja(t))}catch{}},Xc=async t=>{if(navigator.onLine)try{await ce().from("customers").delete().eq("id",String(t))}catch{}},za=async t=>{if(navigator.onLine)try{await ce().from("transactions").upsert(Oa(t))}catch{}},Qc=async t=>{if(navigator.onLine)try{await ce().from("transactions").delete().eq("id",String(t))}catch{}},Zc=async t=>{if(navigator.onLine)try{await ce().from("expenses").upsert(Ba(t))}catch{}},ed=async t=>{if(navigator.onLine)try{await ce().from("expenses").delete().eq("id",String(t))}catch{}},td=async(t,e)=>{if(navigator.onLine)try{await ce().from("settings").upsert({key:String(t),value:String(e??""),updated_at:new Date().toISOString()})}catch{}},Gs=async t=>{if(navigator.onLine)try{await ce().from("app_users").upsert(Da(t),{onConflict:"username"})}catch{}},nd=async t=>{if(navigator.onLine)try{await ce().from("app_users").delete().eq("username",String(t).toLowerCase().trim())}catch{}},Ka=()=>{if(typeof window<"u"&&window.crypto)return window.crypto;if(typeof globalThis<"u"&&globalThis.crypto)return globalThis.crypto;throw new Error("Web Crypto API tidak tersedia pada runtime ini.")},nn=(t=16)=>{const e=Ka(),n=new Uint8Array(t);return e.getRandomValues(n),Array.from(n,s=>s.toString(16).padStart(2,"0")).join("")},St=async(t,e)=>{if(!t||typeof t!="string")throw new Error("PIN tidak valid.");if(!e||typeof e!="string")throw new Error("Salt tidak valid.");const n=Ka(),r=new TextEncoder().encode(`${e}:${t.trim()}`),a=await n.subtle.digest("SHA-256",r);return Array.from(new Uint8Array(a)).map(o=>o.toString(16).padStart(2,"0")).join("")},Fa=async(t,e,n)=>{if(!t||!e||!n)return!1;try{const s=await St(t,e);if(s.length!==n.length)return!1;let r=0;for(let a=0;a<s.length;a++)r|=s.charCodeAt(a)^n.charCodeAt(a);return r===0}catch{return!1}},I=new Ri("BlueMountainPOS");I.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});I.version(3).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category"});I.version(4).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category",users:"++id, username, role, isActive"});const ke=()=>I.users.toArray(),sd=t=>I.users.get(t),rd=async t=>{const e=await I.users.add(t);return Gs({...t,id:e}).catch(()=>{}),e},Vs=async t=>{const e=await I.users.put(t);return Gs(t).catch(()=>{}),e},ad=async t=>{const e=await I.users.get(t),n=await I.users.delete(t);return e&&e.username&&nd(e.username).catch(()=>{}),n},se=()=>I.customers.toArray(),Ha=async t=>{const e=await I.customers.add(t);return Ma({...t,id:e}).catch(()=>{}),e},Rt=async t=>{const e=await I.customers.put(t);return Ma(t).catch(()=>{}),e},id=async t=>{const e=await I.customers.delete(t);return Xc(t).catch(()=>{}),e},be=()=>I.products.toArray(),qa=async t=>{const e=await I.products.add(t);return Ua({...t,id:e}).catch(()=>{}),e},od=async t=>{const e=await I.products.put(t);return Ua(t).catch(()=>{}),e},ld=async t=>{const e=await I.products.delete(t);return Yc(t).catch(()=>{}),e},cd=async t=>{const e=await I.transactions.add(t);return za({...t,id:e}).catch(()=>{}),e},_e=()=>I.transactions.toArray(),dd=async t=>{const e=await I.transactions.delete(t);return Qc(t).catch(()=>{}),e},sn=async t=>{const e=await I.transactions.put(t);return za(t).catch(()=>{}),e},ud=async t=>{const e=await I.expenses.add(t);return Zc({...t,id:e}).catch(()=>{}),e},rn=()=>I.expenses.toArray(),hd=async t=>{const e=await I.expenses.delete(t);return ed(t).catch(()=>{}),e},Js=async t=>{const e=await I.settings.get(t);return(e==null?void 0:e.value)??null},Wa=async(t,e)=>{await I.settings.put({key:t,value:e}),td(t,e).catch(()=>{})},pd=async()=>{await I.products.count()>0||await I.products.bulkAdd([{name:"Air Isi Ulang Galon",category:"Galon",price:5e3,unit:"galon",emoji:"🪣",stock:999},{name:"Antar Galon (dalam)",category:"Galon",price:3e3,unit:"kali",emoji:"🛵",stock:999},{name:"Antar Galon (luar)",category:"Galon",price:5e3,unit:"kali",emoji:"🚚",stock:999},{name:"Galon Baru (Aqua)",category:"Galon",price:5e4,unit:"buah",emoji:"💧",stock:50},{name:"Galon Baru (Standar)",category:"Galon",price:45e3,unit:"buah",emoji:"💦",stock:50},{name:"Air Botol 600ml",category:"Botol",price:3e3,unit:"botol",emoji:"🍶",stock:200},{name:"Air Botol 1500ml",category:"Botol",price:5e3,unit:"botol",emoji:"🥤",stock:100},{name:"Dispenser Galon",category:"Lainnya",price:25e4,unit:"unit",emoji:"⚗️",stock:10}])},Ga=async()=>{if(await I.users.count()>0)return;const e=nn(),s={username:"admin",name:"Owner / Administrator",role:"owner",pinHash:await St("1234",e),pinSalt:e,isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},r=await I.users.add(s);Gs({...s,id:r}).catch(()=>{})},fd=async()=>{await Promise.all([I.products.clear(),I.customers.clear(),I.transactions.clear(),I.expenses.clear(),I.settings.clear(),I.users.clear()]),sessionStorage.clear(),localStorage.clear()},gd=async()=>{const[t,e,n,s,r,a]=await Promise.all([I.products.toArray(),I.customers.toArray(),I.transactions.toArray(),I.expenses.toArray(),I.settings.toArray(),I.users.toArray()]),i=r.find(l=>l.key==="shopName"),o=(i==null?void 0:i.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"3.1.59",exportedAt:new Date().toISOString(),shopName:o,data:{products:t,customers:e,transactions:n,expenses:s,settings:r,users:a},meta:{productCount:t.length,customerCount:e.length,transactionCount:n.length,expenseCount:s.length,settingCount:r.length,userCount:a.length}}},md=async(t,e="replace")=>{if(!t||!t.data)throw new Error("Format file backup tidak valid atau rusak.");const{products:n=[],customers:s=[],transactions:r=[],expenses:a=[],settings:i=[],users:o=[]}=t.data;return e==="replace"?(await Promise.all([I.products.clear(),I.customers.clear(),I.transactions.clear(),I.expenses.clear(),I.settings.clear(),I.users.clear()]),n.length&&await I.products.bulkAdd(n),s.length&&await I.customers.bulkAdd(s),r.length&&await I.transactions.bulkAdd(r),a.length&&await I.expenses.bulkAdd(a),i.length&&await I.settings.bulkPut(i),o.length&&await I.users.bulkAdd(o)):e==="merge"&&(n.length&&await I.products.bulkPut(n),s.length&&await I.customers.bulkPut(s),r.length&&await I.transactions.bulkPut(r),a.length&&await I.expenses.bulkPut(a),i.length&&await I.settings.bulkPut(i),o.length&&await I.users.bulkPut(o)),{products:n.length,customers:s.length,transactions:r.length,expenses:a.length,settings:i.length,users:o.length}},bd=()=>I.open(),_=t=>isNaN(t)?"Rp 0":"Rp "+Math.round(t).toLocaleString("id-ID"),T=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");var un={},yd=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Va={},ge={};let Ys;const vd=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];ge.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};ge.getSymbolTotalCodewords=function(e){return vd[e]};ge.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};ge.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');Ys=e};ge.isKanjiModeEnabled=function(){return typeof Ys<"u"};ge.toSJIS=function(e){return Ys(e)};var Qn={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+n)}}t.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},t.from=function(s,r){if(t.isValid(s))return s;try{return e(s)}catch{return r}}})(Qn);function Ja(){this.buffer=[],this.length=0}Ja.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var wd=Ja;function hn(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}hn.prototype.set=function(t,e,n,s){const r=t*this.size+e;this.data[r]=n,s&&(this.reservedBit[r]=!0)};hn.prototype.get=function(t,e){return this.data[t*this.size+e]};hn.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n};hn.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var xd=hn,Ya={};(function(t){const e=ge.getSymbolSize;t.getRowColCoords=function(s){if(s===1)return[];const r=Math.floor(s/7)+2,a=e(s),i=a===145?26:Math.ceil((a-13)/(2*r-2))*2,o=[a-7];for(let l=1;l<r-1;l++)o[l]=o[l-1]-i;return o.push(6),o.reverse()},t.getPositions=function(s){const r=[],a=t.getRowColCoords(s),i=a.length;for(let o=0;o<i;o++)for(let l=0;l<i;l++)o===0&&l===0||o===0&&l===i-1||o===i-1&&l===0||r.push([a[o],a[l]]);return r}})(Ya);var Xa={};const kd=ge.getSymbolSize,Vr=7;Xa.getPositions=function(e){const n=kd(e);return[[0,0],[n-Vr,0],[0,n-Vr]]};var Qa={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},t.from=function(r){return t.isValid(r)?parseInt(r,10):void 0},t.getPenaltyN1=function(r){const a=r.size;let i=0,o=0,l=0,c=null,d=null;for(let u=0;u<a;u++){o=l=0,c=d=null;for(let p=0;p<a;p++){let h=r.get(u,p);h===c?o++:(o>=5&&(i+=e.N1+(o-5)),c=h,o=1),h=r.get(p,u),h===d?l++:(l>=5&&(i+=e.N1+(l-5)),d=h,l=1)}o>=5&&(i+=e.N1+(o-5)),l>=5&&(i+=e.N1+(l-5))}return i},t.getPenaltyN2=function(r){const a=r.size;let i=0;for(let o=0;o<a-1;o++)for(let l=0;l<a-1;l++){const c=r.get(o,l)+r.get(o,l+1)+r.get(o+1,l)+r.get(o+1,l+1);(c===4||c===0)&&i++}return i*e.N2},t.getPenaltyN3=function(r){const a=r.size;let i=0,o=0,l=0;for(let c=0;c<a;c++){o=l=0;for(let d=0;d<a;d++)o=o<<1&2047|r.get(c,d),d>=10&&(o===1488||o===93)&&i++,l=l<<1&2047|r.get(d,c),d>=10&&(l===1488||l===93)&&i++}return i*e.N3},t.getPenaltyN4=function(r){let a=0;const i=r.data.length;for(let l=0;l<i;l++)a+=r.data[l];return Math.abs(Math.ceil(a*100/i/5)-10)*e.N4};function n(s,r,a){switch(s){case t.Patterns.PATTERN000:return(r+a)%2===0;case t.Patterns.PATTERN001:return r%2===0;case t.Patterns.PATTERN010:return a%3===0;case t.Patterns.PATTERN011:return(r+a)%3===0;case t.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(a/3))%2===0;case t.Patterns.PATTERN101:return r*a%2+r*a%3===0;case t.Patterns.PATTERN110:return(r*a%2+r*a%3)%2===0;case t.Patterns.PATTERN111:return(r*a%3+(r+a)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}t.applyMask=function(r,a){const i=a.size;for(let o=0;o<i;o++)for(let l=0;l<i;l++)a.isReserved(l,o)||a.xor(l,o,n(r,l,o))},t.getBestMask=function(r,a){const i=Object.keys(t.Patterns).length;let o=0,l=1/0;for(let c=0;c<i;c++){a(c),t.applyMask(c,r);const d=t.getPenaltyN1(r)+t.getPenaltyN2(r)+t.getPenaltyN3(r)+t.getPenaltyN4(r);t.applyMask(c,r),d<l&&(l=d,o=c)}return o}})(Qa);var Zn={};const We=Qn,kn=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],_n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Zn.getBlocksCount=function(e,n){switch(n){case We.L:return kn[(e-1)*4+0];case We.M:return kn[(e-1)*4+1];case We.Q:return kn[(e-1)*4+2];case We.H:return kn[(e-1)*4+3];default:return}};Zn.getTotalCodewordsCount=function(e,n){switch(n){case We.L:return _n[(e-1)*4+0];case We.M:return _n[(e-1)*4+1];case We.Q:return _n[(e-1)*4+2];case We.H:return _n[(e-1)*4+3];default:return}};var Za={},es={};const qt=new Uint8Array(512),Fn=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)qt[n]=e,Fn[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)qt[n]=qt[n-255]})();es.log=function(e){if(e<1)throw new Error("log("+e+")");return Fn[e]};es.exp=function(e){return qt[e]};es.mul=function(e,n){return e===0||n===0?0:qt[Fn[e]+Fn[n]]};(function(t){const e=es;t.mul=function(s,r){const a=new Uint8Array(s.length+r.length-1);for(let i=0;i<s.length;i++)for(let o=0;o<r.length;o++)a[i+o]^=e.mul(s[i],r[o]);return a},t.mod=function(s,r){let a=new Uint8Array(s);for(;a.length-r.length>=0;){const i=a[0];for(let l=0;l<r.length;l++)a[l]^=e.mul(r[l],i);let o=0;for(;o<a.length&&a[o]===0;)o++;a=a.slice(o)}return a},t.generateECPolynomial=function(s){let r=new Uint8Array([1]);for(let a=0;a<s;a++)r=t.mul(r,new Uint8Array([1,e.exp(a)]));return r}})(Za);const ei=Za;function Xs(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}Xs.prototype.initialize=function(e){this.degree=e,this.genPoly=ei.generateECPolynomial(this.degree)};Xs.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(e.length+this.degree);n.set(e);const s=ei.mod(n,this.genPoly),r=this.degree-s.length;if(r>0){const a=new Uint8Array(this.degree);return a.set(s,r),a}return s};var _d=Xs,ti={},Ye={},Qs={};Qs.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var Le={};const ni="[0-9]+",Sd="[A-Z $%*+\\-./:]+";let an="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";an=an.replace(/u/g,"\\u");const Ed="(?:(?![A-Z0-9 $%*+\\-./:]|"+an+`)(?:.|[\r
]))+`;Le.KANJI=new RegExp(an,"g");Le.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");Le.BYTE=new RegExp(Ed,"g");Le.NUMERIC=new RegExp(ni,"g");Le.ALPHANUMERIC=new RegExp(Sd,"g");const Td=new RegExp("^"+an+"$"),Ad=new RegExp("^"+ni+"$"),Pd=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Le.testKanji=function(e){return Td.test(e)};Le.testNumeric=function(e){return Ad.test(e)};Le.testAlphanumeric=function(e){return Pd.test(e)};(function(t){const e=Qs,n=Le;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(a,i){if(!a.ccBits)throw new Error("Invalid mode: "+a);if(!e.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?a.ccBits[0]:i<27?a.ccBits[1]:a.ccBits[2]},t.getBestModeForData=function(a){return n.testNumeric(a)?t.NUMERIC:n.testAlphanumeric(a)?t.ALPHANUMERIC:n.testKanji(a)?t.KANJI:t.BYTE},t.toString=function(a){if(a&&a.id)return a.id;throw new Error("Invalid mode")},t.isValid=function(a){return a&&a.bit&&a.ccBits};function s(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+r)}}t.from=function(a,i){if(t.isValid(a))return a;try{return s(a)}catch{return i}}})(Ye);(function(t){const e=ge,n=Zn,s=Qn,r=Ye,a=Qs,i=7973,o=e.getBCHDigit(i);function l(p,h,g){for(let f=1;f<=40;f++)if(h<=t.getCapacity(f,g,p))return f}function c(p,h){return r.getCharCountIndicator(p,h)+4}function d(p,h){let g=0;return p.forEach(function(f){const b=c(f.mode,h);g+=b+f.getBitsLength()}),g}function u(p,h){for(let g=1;g<=40;g++)if(d(p,g)<=t.getCapacity(g,h,r.MIXED))return g}t.from=function(h,g){return a.isValid(h)?parseInt(h,10):g},t.getCapacity=function(h,g,f){if(!a.isValid(h))throw new Error("Invalid QR Code version");typeof f>"u"&&(f=r.BYTE);const b=e.getSymbolTotalCodewords(h),y=n.getTotalCodewordsCount(h,g),m=(b-y)*8;if(f===r.MIXED)return m;const v=m-c(f,h);switch(f){case r.NUMERIC:return Math.floor(v/10*3);case r.ALPHANUMERIC:return Math.floor(v/11*2);case r.KANJI:return Math.floor(v/13);case r.BYTE:default:return Math.floor(v/8)}},t.getBestVersionForData=function(h,g){let f;const b=s.from(g,s.M);if(Array.isArray(h)){if(h.length>1)return u(h,b);if(h.length===0)return 1;f=h[0]}else f=h;return l(f.mode,f.getLength(),b)},t.getEncodedBits=function(h){if(!a.isValid(h)||h<7)throw new Error("Invalid QR Code version");let g=h<<12;for(;e.getBCHDigit(g)-o>=0;)g^=i<<e.getBCHDigit(g)-o;return h<<12|g}})(ti);var si={};const Ds=ge,ri=1335,Cd=21522,Jr=Ds.getBCHDigit(ri);si.getEncodedBits=function(e,n){const s=e.bit<<3|n;let r=s<<10;for(;Ds.getBCHDigit(r)-Jr>=0;)r^=ri<<Ds.getBCHDigit(r)-Jr;return(s<<10|r)^Cd};var ai={};const Id=Ye;function Et(t){this.mode=Id.NUMERIC,this.data=t.toString()}Et.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};Et.prototype.getLength=function(){return this.data.length};Et.prototype.getBitsLength=function(){return Et.getBitsLength(this.data.length)};Et.prototype.write=function(e){let n,s,r;for(n=0;n+3<=this.data.length;n+=3)s=this.data.substr(n,3),r=parseInt(s,10),e.put(r,10);const a=this.data.length-n;a>0&&(s=this.data.substr(n),r=parseInt(s,10),e.put(r,a*3+1))};var $d=Et;const Rd=Ye,fs=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Tt(t){this.mode=Rd.ALPHANUMERIC,this.data=t}Tt.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};Tt.prototype.getLength=function(){return this.data.length};Tt.prototype.getBitsLength=function(){return Tt.getBitsLength(this.data.length)};Tt.prototype.write=function(e){let n;for(n=0;n+2<=this.data.length;n+=2){let s=fs.indexOf(this.data[n])*45;s+=fs.indexOf(this.data[n+1]),e.put(s,11)}this.data.length%2&&e.put(fs.indexOf(this.data[n]),6)};var Ld=Tt;const Nd=Ye;function At(t){this.mode=Nd.BYTE,typeof t=="string"?this.data=new TextEncoder().encode(t):this.data=new Uint8Array(t)}At.getBitsLength=function(e){return e*8};At.prototype.getLength=function(){return this.data.length};At.prototype.getBitsLength=function(){return At.getBitsLength(this.data.length)};At.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)};var Od=At;const Bd=Ye,jd=ge;function Pt(t){this.mode=Bd.KANJI,this.data=t}Pt.getBitsLength=function(e){return e*13};Pt.prototype.getLength=function(){return this.data.length};Pt.prototype.getBitsLength=function(){return Pt.getBitsLength(this.data.length)};Pt.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=jd.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),t.put(n,13)}};var Dd=Pt,ii={exports:{}};(function(t){var e={single_source_shortest_paths:function(n,s,r){var a={},i={};i[s]=0;var o=e.PriorityQueue.make();o.push(s,0);for(var l,c,d,u,p,h,g,f,b;!o.empty();){l=o.pop(),c=l.value,u=l.cost,p=n[c]||{};for(d in p)p.hasOwnProperty(d)&&(h=p[d],g=u+h,f=i[d],b=typeof i[d]>"u",(b||f>g)&&(i[d]=g,o.push(d,g),a[d]=c))}if(typeof r<"u"&&typeof i[r]>"u"){var y=["Could not find a path from ",s," to ",r,"."].join("");throw new Error(y)}return a},extract_shortest_path_from_predecessor_list:function(n,s){for(var r=[],a=s;a;)r.push(a),n[a],a=n[a];return r.reverse(),r},find_path:function(n,s,r){var a=e.single_source_shortest_paths(n,s,r);return e.extract_shortest_path_from_predecessor_list(a,r)},PriorityQueue:{make:function(n){var s=e.PriorityQueue,r={},a;n=n||{};for(a in s)s.hasOwnProperty(a)&&(r[a]=s[a]);return r.queue=[],r.sorter=n.sorter||s.default_sorter,r},default_sorter:function(n,s){return n.cost-s.cost},push:function(n,s){var r={value:n,cost:s};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(ii);var Ud=ii.exports;(function(t){const e=Ye,n=$d,s=Ld,r=Od,a=Dd,i=Le,o=ge,l=Ud;function c(y){return unescape(encodeURIComponent(y)).length}function d(y,m,v){const x=[];let S;for(;(S=y.exec(v))!==null;)x.push({data:S[0],index:S.index,mode:m,length:S[0].length});return x}function u(y){const m=d(i.NUMERIC,e.NUMERIC,y),v=d(i.ALPHANUMERIC,e.ALPHANUMERIC,y);let x,S;return o.isKanjiModeEnabled()?(x=d(i.BYTE,e.BYTE,y),S=d(i.KANJI,e.KANJI,y)):(x=d(i.BYTE_KANJI,e.BYTE,y),S=[]),m.concat(v,x,S).sort(function(E,$){return E.index-$.index}).map(function(E){return{data:E.data,mode:E.mode,length:E.length}})}function p(y,m){switch(m){case e.NUMERIC:return n.getBitsLength(y);case e.ALPHANUMERIC:return s.getBitsLength(y);case e.KANJI:return a.getBitsLength(y);case e.BYTE:return r.getBitsLength(y)}}function h(y){return y.reduce(function(m,v){const x=m.length-1>=0?m[m.length-1]:null;return x&&x.mode===v.mode?(m[m.length-1].data+=v.data,m):(m.push(v),m)},[])}function g(y){const m=[];for(let v=0;v<y.length;v++){const x=y[v];switch(x.mode){case e.NUMERIC:m.push([x,{data:x.data,mode:e.ALPHANUMERIC,length:x.length},{data:x.data,mode:e.BYTE,length:x.length}]);break;case e.ALPHANUMERIC:m.push([x,{data:x.data,mode:e.BYTE,length:x.length}]);break;case e.KANJI:m.push([x,{data:x.data,mode:e.BYTE,length:c(x.data)}]);break;case e.BYTE:m.push([{data:x.data,mode:e.BYTE,length:c(x.data)}])}}return m}function f(y,m){const v={},x={start:{}};let S=["start"];for(let w=0;w<y.length;w++){const E=y[w],$=[];for(let C=0;C<E.length;C++){const K=E[C],j=""+w+C;$.push(j),v[j]={node:K,lastCount:0},x[j]={};for(let P=0;P<S.length;P++){const F=S[P];v[F]&&v[F].node.mode===K.mode?(x[F][j]=p(v[F].lastCount+K.length,K.mode)-p(v[F].lastCount,K.mode),v[F].lastCount+=K.length):(v[F]&&(v[F].lastCount=K.length),x[F][j]=p(K.length,K.mode)+4+e.getCharCountIndicator(K.mode,m))}}S=$}for(let w=0;w<S.length;w++)x[S[w]].end=0;return{map:x,table:v}}function b(y,m){let v;const x=e.getBestModeForData(y);if(v=e.from(m,x),v!==e.BYTE&&v.bit<x.bit)throw new Error('"'+y+'" cannot be encoded with mode '+e.toString(v)+`.
 Suggested mode is: `+e.toString(x));switch(v===e.KANJI&&!o.isKanjiModeEnabled()&&(v=e.BYTE),v){case e.NUMERIC:return new n(y);case e.ALPHANUMERIC:return new s(y);case e.KANJI:return new a(y);case e.BYTE:return new r(y)}}t.fromArray=function(m){return m.reduce(function(v,x){return typeof x=="string"?v.push(b(x,null)):x.data&&v.push(b(x.data,x.mode)),v},[])},t.fromString=function(m,v){const x=u(m,o.isKanjiModeEnabled()),S=g(x),w=f(S,v),E=l.find_path(w.map,"start","end"),$=[];for(let C=1;C<E.length-1;C++)$.push(w.table[E[C]].node);return t.fromArray(h($))},t.rawSplit=function(m){return t.fromArray(u(m,o.isKanjiModeEnabled()))}})(ai);const ts=ge,gs=Qn,Md=wd,zd=xd,Kd=Ya,Fd=Xa,Us=Qa,Ms=Zn,Hd=_d,Hn=ti,qd=si,Wd=Ye,ms=ai;function Gd(t,e){const n=t.size,s=Fd.getPositions(e);for(let r=0;r<s.length;r++){const a=s[r][0],i=s[r][1];for(let o=-1;o<=7;o++)if(!(a+o<=-1||n<=a+o))for(let l=-1;l<=7;l++)i+l<=-1||n<=i+l||(o>=0&&o<=6&&(l===0||l===6)||l>=0&&l<=6&&(o===0||o===6)||o>=2&&o<=4&&l>=2&&l<=4?t.set(a+o,i+l,!0,!0):t.set(a+o,i+l,!1,!0))}}function Vd(t){const e=t.size;for(let n=8;n<e-8;n++){const s=n%2===0;t.set(n,6,s,!0),t.set(6,n,s,!0)}}function Jd(t,e){const n=Kd.getPositions(e);for(let s=0;s<n.length;s++){const r=n[s][0],a=n[s][1];for(let i=-2;i<=2;i++)for(let o=-2;o<=2;o++)i===-2||i===2||o===-2||o===2||i===0&&o===0?t.set(r+i,a+o,!0,!0):t.set(r+i,a+o,!1,!0)}}function Yd(t,e){const n=t.size,s=Hn.getEncodedBits(e);let r,a,i;for(let o=0;o<18;o++)r=Math.floor(o/3),a=o%3+n-8-3,i=(s>>o&1)===1,t.set(r,a,i,!0),t.set(a,r,i,!0)}function bs(t,e,n){const s=t.size,r=qd.getEncodedBits(e,n);let a,i;for(a=0;a<15;a++)i=(r>>a&1)===1,a<6?t.set(a,8,i,!0):a<8?t.set(a+1,8,i,!0):t.set(s-15+a,8,i,!0),a<8?t.set(8,s-a-1,i,!0):a<9?t.set(8,15-a-1+1,i,!0):t.set(8,15-a-1,i,!0);t.set(s-8,8,1,!0)}function Xd(t,e){const n=t.size;let s=-1,r=n-1,a=7,i=0;for(let o=n-1;o>0;o-=2)for(o===6&&o--;;){for(let l=0;l<2;l++)if(!t.isReserved(r,o-l)){let c=!1;i<e.length&&(c=(e[i]>>>a&1)===1),t.set(r,o-l,c),a--,a===-1&&(i++,a=7)}if(r+=s,r<0||n<=r){r-=s,s=-s;break}}}function Qd(t,e,n){const s=new Md;n.forEach(function(l){s.put(l.mode.bit,4),s.put(l.getLength(),Wd.getCharCountIndicator(l.mode,t)),l.write(s)});const r=ts.getSymbolTotalCodewords(t),a=Ms.getTotalCodewordsCount(t,e),i=(r-a)*8;for(s.getLengthInBits()+4<=i&&s.put(0,4);s.getLengthInBits()%8!==0;)s.putBit(0);const o=(i-s.getLengthInBits())/8;for(let l=0;l<o;l++)s.put(l%2?17:236,8);return Zd(s,t,e)}function Zd(t,e,n){const s=ts.getSymbolTotalCodewords(e),r=Ms.getTotalCodewordsCount(e,n),a=s-r,i=Ms.getBlocksCount(e,n),o=s%i,l=i-o,c=Math.floor(s/i),d=Math.floor(a/i),u=d+1,p=c-d,h=new Hd(p);let g=0;const f=new Array(i),b=new Array(i);let y=0;const m=new Uint8Array(t.buffer);for(let E=0;E<i;E++){const $=E<l?d:u;f[E]=m.slice(g,g+$),b[E]=h.encode(f[E]),g+=$,y=Math.max(y,$)}const v=new Uint8Array(s);let x=0,S,w;for(S=0;S<y;S++)for(w=0;w<i;w++)S<f[w].length&&(v[x++]=f[w][S]);for(S=0;S<p;S++)for(w=0;w<i;w++)v[x++]=b[w][S];return v}function eu(t,e,n,s){let r;if(Array.isArray(t))r=ms.fromArray(t);else if(typeof t=="string"){let c=e;if(!c){const d=ms.rawSplit(t);c=Hn.getBestVersionForData(d,n)}r=ms.fromString(t,c||40)}else throw new Error("Invalid data");const a=Hn.getBestVersionForData(r,n);if(!a)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=a;else if(e<a)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+a+`.
`);const i=Qd(e,n,r),o=ts.getSymbolSize(e),l=new zd(o);return Gd(l,e),Vd(l),Jd(l,e),bs(l,n,0),e>=7&&Yd(l,e),Xd(l,i),isNaN(s)&&(s=Us.getBestMask(l,bs.bind(null,l,n))),Us.applyMask(s,l),bs(l,n,s),{modules:l,version:e,errorCorrectionLevel:n,maskPattern:s,segments:r}}Va.create=function(e,n){if(typeof e>"u"||e==="")throw new Error("No input text");let s=gs.M,r,a;return typeof n<"u"&&(s=gs.from(n.errorCorrectionLevel,gs.M),r=Hn.from(n.version),a=Us.from(n.maskPattern),n.toSJISFunc&&ts.setToSJISFunction(n.toSJISFunc)),eu(e,r,s,a)};var oi={},Zs={};(function(t){function e(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let s=n.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+n);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(a){return[a,a]}))),s.length===6&&s.push("F","F");const r=parseInt(s.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+s.slice(0,6).join("")}}t.getOptions=function(s){s||(s={}),s.color||(s.color={});const r=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,a=s.width&&s.width>=21?s.width:void 0,i=s.scale||4;return{width:a,scale:a?4:i,margin:r,color:{dark:e(s.color.dark||"#000000ff"),light:e(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},t.getScale=function(s,r){return r.width&&r.width>=s+r.margin*2?r.width/(s+r.margin*2):r.scale},t.getImageWidth=function(s,r){const a=t.getScale(s,r);return Math.floor((s+r.margin*2)*a)},t.qrToImageData=function(s,r,a){const i=r.modules.size,o=r.modules.data,l=t.getScale(i,a),c=Math.floor((i+a.margin*2)*l),d=a.margin*l,u=[a.color.light,a.color.dark];for(let p=0;p<c;p++)for(let h=0;h<c;h++){let g=(p*c+h)*4,f=a.color.light;if(p>=d&&h>=d&&p<c-d&&h<c-d){const b=Math.floor((p-d)/l),y=Math.floor((h-d)/l);f=u[o[b*i+y]?1:0]}s[g++]=f.r,s[g++]=f.g,s[g++]=f.b,s[g]=f.a}}})(Zs);(function(t){const e=Zs;function n(r,a,i){r.clearRect(0,0,a.width,a.height),a.style||(a.style={}),a.height=i,a.width=i,a.style.height=i+"px",a.style.width=i+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(a,i,o){let l=o,c=i;typeof l>"u"&&(!i||!i.getContext)&&(l=i,i=void 0),i||(c=s()),l=e.getOptions(l);const d=e.getImageWidth(a.modules.size,l),u=c.getContext("2d"),p=u.createImageData(d,d);return e.qrToImageData(p.data,a,l),n(u,c,d),u.putImageData(p,0,0),c},t.renderToDataURL=function(a,i,o){let l=o;typeof l>"u"&&(!i||!i.getContext)&&(l=i,i=void 0),l||(l={});const c=t.render(a,i,l),d=l.type||"image/png",u=l.rendererOpts||{};return c.toDataURL(d,u.quality)}})(oi);var li={};const tu=Zs;function Yr(t,e){const n=t.a/255,s=e+'="'+t.hex+'"';return n<1?s+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':s}function ys(t,e,n){let s=t+e;return typeof n<"u"&&(s+=" "+n),s}function nu(t,e,n){let s="",r=0,a=!1,i=0;for(let o=0;o<t.length;o++){const l=Math.floor(o%e),c=Math.floor(o/e);!l&&!a&&(a=!0),t[o]?(i++,o>0&&l>0&&t[o-1]||(s+=a?ys("M",l+n,.5+c+n):ys("m",r,0),r=0,a=!1),l+1<e&&t[o+1]||(s+=ys("h",i),i=0)):r++}return s}li.render=function(e,n,s){const r=tu.getOptions(n),a=e.modules.size,i=e.modules.data,o=a+r.margin*2,l=r.color.light.a?"<path "+Yr(r.color.light,"fill")+' d="M0 0h'+o+"v"+o+'H0z"/>':"",c="<path "+Yr(r.color.dark,"stroke")+' d="'+nu(i,a,r.margin)+'"/>',d='viewBox="0 0 '+o+" "+o+'"',p='<svg xmlns="http://www.w3.org/2000/svg" '+(r.width?'width="'+r.width+'" height="'+r.width+'" ':"")+d+' shape-rendering="crispEdges">'+l+c+`</svg>
`;return typeof s=="function"&&s(null,p),p};const su=yd,zs=Va,ci=oi,ru=li;function er(t,e,n,s,r){const a=[].slice.call(arguments,1),i=a.length,o=typeof a[i-1]=="function";if(!o&&!su())throw new Error("Callback required as last argument");if(o){if(i<2)throw new Error("Too few arguments provided");i===2?(r=n,n=e,e=s=void 0):i===3&&(e.getContext&&typeof r>"u"?(r=s,s=void 0):(r=s,s=n,n=e,e=void 0))}else{if(i<1)throw new Error("Too few arguments provided");return i===1?(n=e,e=s=void 0):i===2&&!e.getContext&&(s=n,n=e,e=void 0),new Promise(function(l,c){try{const d=zs.create(n,s);l(t(d,e,s))}catch(d){c(d)}})}try{const l=zs.create(n,s);r(null,t(l,e,s))}catch(l){r(l)}}un.create=zs.create;un.toCanvas=er.bind(null,ci.render);un.toDataURL=er.bind(null,ci.renderToDataURL);un.toString=er.bind(null,function(t,e,n){return ru.render(t,n)});const au=t=>{let e=65535;for(let n=0;n<t.length;n++){e^=t.charCodeAt(n)<<8;for(let s=0;s<8;s++)e&32768?e=(e<<1^4129)&65535:e=e<<1&65535}return e.toString(16).toUpperCase().padStart(4,"0")},iu=(t,e)=>{const n=String(e),s=String(n.length).padStart(2,"0");return`${t}${s}${n}`},ou=(t="",e=0)=>{let n=(t||"").trim();(!n||n.length<20)&&(n="00020101021126590014ID.LINKAJA.WWW011893600911002234477302090022344775204541153033605802ID5920BLUE MOUNTAIN STATION6006BEKASI610517510");const s=n.lastIndexOf("6304");s!==-1&&(n=n.substring(0,s)),n.includes("010211")?n=n.replace("010211","010212"):n.includes("010212")||(n=n.replace("000201","000201010212"));const r=Math.max(0,Math.round(Number(e)||0)),a=/54\d{2}\d+/,i=iu("54",r);if(a.test(n))n=n.replace(a,i);else{const l=n.indexOf("5802ID");l!==-1?n=n.slice(0,l)+i+n.slice(l):n+=i+"5802ID"}n+="6304";const o=au(n);return n+o},di="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHbElEQVR4nO2cS24rOwxEs/9Nv4cLJIAttCSS4qeorgN4kLglFcnTtuNBfv4jpJCf6gDk3VBAUgoFJKVQQFIKBSSlUEBSCgU84OeH7TuFHTTyT76/B7HD7hn5FJAS2mHnDIzyUUI77JqSmXwU0Aa7pmQlICXUw44p2MlHCfWwW0Kk8lFCHeyUAK18lFAOuySAAsbBLm2wykcJZbBDC07lo4R72J0FXgJSwjnszARP+SjgHHbmAW/5KOEcdmUgSj5K+Aw7MhAtICX8ht34IEM+CvgNu/FLlnyU8Bt24pdsAXcSvkXU+ysUUCHfSrA3vVreXZ2ASvme5HrbW/a9lQnwkMdTwpO37K7cWZWQLHEi3667c2VVkmFlvnJRwjnXVSQZlrcMmQLeJuFV1UiH5S1BtoA3SXhNJdmyaM6nhHOuqEI6rMjhU0Ab7auoGDyKgDdI2L4CpKFTQj2t06MNvCpPZwnbJkcdNCXU0TI18pCRsyHSLnWHAXfIiEKrxF0GW5mzm4Rt0nYbare8VbRJijJM6XCrBewiYYuUSEPUDLZawA4SwidEGqBloEj5EYFOiDS8k4Ei1YEGbDqkoZ0OsroWZAkhk1UP63NgXkOsrgdVQrhU1UMaB+U5vOq6ECWES4Q0IO/BVddGATdUD+cn4K0XuUYEYNJUD2UcTOTAqutEkhAiSfUwxqFED6q6TiQJy1NUD+FpGBlDqq6XAoIMYRxG1qCq60WRsCxBdeM1AkYMqrpeFAkpYOE/B6quG0HCkpOrm20V0HtQ1XUjSJh+anWTKSCWhKknVjd31/DIQVmFp4BeBwE011NA7cC6CJgtYcpp1Q2VNHv8nffwOgmYKSEFfMh5klnSgw59yZIw/JTqJlJAbAnrvwoHYmx8tICEAn4RJSDlm8OOfBD5tk4Bn2FHBjxeBSs/U3WDHRl4EobyxXFdVzwGPROHAvpzRVc0Q5aKoPlcR/nstO6MZsgWEVYiUT4f2nZHOuRTGZDfdm8QvGV6zaA9hMiUT/txggIWcCLgycCiX/EsHym6S9guuWX46J/PtLmQa9HSMrVVqOrPbKf5T9ci0jL1qUgVn+dO90e4cSJom9xbHIuUJw/PXJ3pnT7h+7gMybJrQqJ/Bb9kCuJN5+yn3FPJB5lvkZ0zIXBnVR9EfYbLetzO/RUOVAv1duFG3lfxBgqWCztCSqGApBQKSEqhgKQUCkhKoYCkFEgBo7/m8PyK5HQvydqbvwKCTBXdbBQBpWspYDLRDaeAOECm8mr4rOkUEAfIVJ4CagbqmdVzLQVMxtLANwp4A5BVdBooBTwDsopOA6WAZ0BW0WmgFPAMyCpmDbc8NPt7ZvVcG9EDFCDTRcq32t8zq+daCpgMBfTtBzKQ6bwEnDWfAuIAmc5TQM1APbN6rqWAyXgPdFx/i4A3AFnFSbMpYC8gq4geqvdArftRQAoYKuBqT80aCpiMpeGrgUoF1Dy0+1lyeuZFFRYylVfDswT0zBzZD0QgU0XK57V/RO7ofiACmSpSPq/9vbNn9AMRyFTRzUbaP6sfFPCldBGhCnaDlEIBSSkUkJRCAUkpsALyQ/s7mE7X46837fqor0BOrrf0YXZ91Nco3l/xeNe/zO6xicf6yGGc5PS4Caw1ogp42tOva7OKmq31HkiWgBohPGq1CCiZV0b9sAKeDkS6pzarNKN0T696Nb2+VkDLQLUCave2Fi+53kOKHRZxpPkQ6ncX0CKJtLAdaAJKbqzTmjTrEOtPE1Czxtr03dqKAUTfBNp1KgGK6zcLKDX/LQJGZojsQXX9bgJG3iWaplHA5+dR6z8S8G9j6e81ha+oFnDVn4gMkjXWPavrVwm4Olgig6VB2qZlCSjtRYSAVrkQ66eABwPQ9sOaQXK9VYSM+l0F3B262kMSfMdpwyL2yxTwRL4IAaWZpvVYm3IqoLQ47Znafd8moLa+VgLu9tAEt1y3u157jbTOXUbLjWU5o0rAk/rNAo7XSPawBDcX5rSf15krToa8Y5fHS0Br/UcCfl4n2cMS3DpUy74nfdidqV0juU5KloCW+o8F1ISxBLfKp91Xs95y5un13j2Q7htd/3K3E/megljXnWTw2PN0jcf+kS8GEWeLbz5FDYS4QwFJKRSQlEIBSSmhAlr+wtr9hfb3/NO1qxyrfLOfZ78bs2n7sKpNcr6kb5IM4/OzNZGkCygVbPf8bJirDLPnVtdaBNhdu9pjl2e31tLnXZ2RpAg4/jx7Fdutl+w9u85LQOkrzu5sTT5p/qf9pGJLbz5vUgUcf2e5K2fPeQv4dJNIhJqdrZV015tZzdKbXDKHawTcFThrtOS52c9Pe8yes+Rd7bPrgSSf9VytgJJHJDCfAaXrx+dmP0vOWO3hJeCsllU+qQweAkprj6KFgJLnvAWcrZXcDOMZ1v2k/VvVa6nhOgHHn2eFagerGdrqFW113m7IEsElr2Kam0mazZJjtU8EcH+EjE2Q7i0R2SLgLIf0VUJy3VOPNDV75JUIH0Hs7oRsoICkFApISqGApBQKSEqhgKSU/wFlggp6xOLiGQAAAABJRU5ErkJggg==",lu=new Uint8Array([27,97,1,29,118,48,0,20,0,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,254,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,255,255,255,7,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,15,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,255,255,159,224,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,127,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,4,3,255,254,127,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,14,7,255,254,127,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,31,7,255,252,127,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,63,143,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,127,223,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,252,63,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,248,31,255,255,255,128,0,0,0,0,0,0,0,0,0,0,1,255,255,255,248,31,255,255,255,192,0,0,0,0,0,0,0,0,0,0,3,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,7,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,15,255,255,255,224,7,255,255,255,240,0,0,0,0,0,0,0,0,0,0,31,255,255,255,192,7,255,255,255,248,0,0,0,0,0,0,0,0,0,0,63,255,255,255,192,3,255,255,255,252,0,0,0,0,0,0,0,0,0,0,63,255,255,255,136,3,255,255,255,254,0,0,0,0,0,0,0,0,0,0,127,255,255,255,8,1,255,255,255,255,0,0,0,0,0,0,0,0,0,0,255,255,255,255,16,0,255,255,255,255,0,0,0,0,0,0,0,0,0,1,255,255,255,254,48,0,127,255,255,255,128,0,0,0,0,0,0,0,0,3,255,255,255,252,96,0,127,255,255,255,192,0,0,0,0,0,0,0,0,7,255,255,255,252,224,0,63,255,255,255,224,0,0,0,0,0,0,0,0,15,255,255,255,248,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,15,255,255,255,241,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,31,255,255,255,243,128,0,15,255,255,255,248,0,0,0,0,0,0,0,0,63,255,255,255,227,128,0,7,255,255,255,252,0,0,0,0,0,0,0,0,127,255,255,255,231,0,0,7,255,255,255,254,0,0,0,0,0,0,0,0,255,255,255,255,199,0,0,3,255,255,255,254,0,0,0,0,0,0,0,1,255,255,255,255,207,128,0,3,255,255,255,255,0,0,0,0,0,0,0,3,255,255,255,255,207,192,0,3,255,255,255,255,128,0,0,0,0,0,0,3,255,255,255,255,159,224,0,1,255,255,255,255,192,0,0,0,0,0,0,7,255,255,255,255,159,240,0,1,255,255,255,255,224,0,0,0,0,0,0,15,255,255,255,255,159,240,0,1,255,255,255,255,240,0,0,0,0,0,0,31,255,255,255,255,31,252,0,57,255,255,255,255,240,0,0,0,0,0,0,63,255,255,255,255,31,255,0,57,255,255,255,255,248,0,0,0,0,0,0,127,255,255,255,255,59,255,240,57,255,255,255,255,252,0,0,0,0,0,0,127,255,255,255,255,27,255,240,57,255,255,255,255,254,0,0,0,0,0,0,255,255,255,255,255,27,255,240,57,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,29,255,240,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,255,240,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,248,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,7,159,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,8,3,199,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,224,48,1,243,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,240,0,255,255,0,0,1,128,0,0,0,0,0,0,0,0,0,0,7,192,240,0,127,254,0,14,1,128,0,0,0,0,0,0,0,0,0,0,7,192,248,0,31,240,0,30,3,192,0,0,0,0,0,0,0,0,0,0,15,224,127,0,0,0,0,124,7,224,0,0,0,0,0,0,0,0,0,0,7,240,31,240,0,0,7,240,15,224,0,0,0,0,0,0,0,0,0,0,7,252,7,255,192,1,255,192,63,192,0,0,0,0,0,0,0,0,0,0,3,255,0,63,255,255,252,0,255,128,0,0,0,0,0,0,0,0,0,0,0,255,224,0,255,254,0,7,255,0,0,0,0,0,0,0,0,0,0,0,0,63,254,0,0,0,0,127,252,0,0,0,0,0,0,0,0,0,0,0,0,7,255,252,0,0,63,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,240,7,224,0,252,0,248,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,224,63,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,192,31,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,15,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,126,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,127,3,248,126,0,0,0,0,0,0,0,0,0,0,7,224,63,199,255,252,127,207,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,199,255,252,63,255,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,255,252,31,255,224,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,255,252,15,255,192,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,255,252,7,255,0,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,224,1,224,31,248,15,128,248,248,7,159,255,224,126,0,248,248,7,192,3,224,3,224,63,252,15,128,248,252,7,159,255,224,126,0,248,252,7,192,3,240,7,224,255,254,15,128,248,254,7,159,255,224,127,0,248,254,7,192,3,240,7,225,255,255,15,128,248,254,7,159,255,224,255,0,248,254,7,192,3,248,15,225,248,31,143,128,248,255,7,128,124,0,255,128,248,255,7,192,3,252,15,227,240,15,143,128,248,255,135,128,124,1,255,128,248,255,135,192,3,252,31,227,224,7,207,128,248,255,199,192,124,1,247,192,248,255,199,192,3,254,31,227,224,7,207,128,248,255,231,192,124,3,231,192,248,255,231,192,3,254,63,227,224,7,207,128,248,255,231,192,124,3,227,192,248,255,231,192,3,255,125,227,224,7,207,128,248,251,247,192,124,3,195,224,248,251,247,192,3,239,249,227,224,7,207,128,248,249,255,192,124,7,193,224,248,249,255,192,3,239,249,227,224,7,207,128,248,248,255,128,124,7,255,240,248,248,255,192,3,231,241,227,240,15,143,128,248,248,127,128,124,15,255,240,248,248,127,192,3,227,241,225,240,31,135,192,248,248,127,128,124,15,255,248,248,248,127,192,3,227,225,225,252,127,7,227,240,248,63,192,124,31,255,248,248,248,63,192,3,225,193,224,255,255,3,255,240,248,31,192,124,31,0,252,248,248,31,192,3,224,193,224,127,254,1,255,224,248,15,192,124,30,0,124,248,248,15,192,3,224,1,224,63,252,0,255,192,248,7,192,124,62,0,124,248,248,7,192,1,192,1,224,7,224,0,63,0,120,3,128,120,60,0,60,112,120,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,241,249,251,32,65,152,195,128,123,248,199,228,60,33,128,0,0,0,0,1,249,249,251,112,225,156,199,224,251,249,199,254,126,49,128,0,0,0,0,1,157,129,131,48,225,156,206,65,192,225,225,142,231,57,128,0,0,0,0,1,141,241,131,48,225,158,220,1,224,227,225,142,195,125,128,0,0,0,0,1,253,249,243,48,225,159,220,96,248,227,113,142,195,255,128,0,0,0,0,1,249,193,243,48,225,155,220,96,60,231,241,142,195,55,128,0,0,0,0,1,249,193,131,48,225,153,206,96,156,231,249,142,231,55,128,0,0,0,0,1,157,249,131,63,253,152,199,225,248,230,25,142,126,51,128,0,0,0,0,1,141,249,3,62,125,152,67,192,240,68,25,132,60,33,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),ns=(t,e={})=>{const n=t.items||[],s=[],r=(l,c=0,d=1,u=0)=>s.push({type:0,content:l,bold:c,align:d,format:u}),a=()=>r("--------------------------------",0,1,0),i=()=>r(" ",0,0,0);s.push({type:1,content:di,align:1,width:160,height:160});const o=e.shopName||"Blue Mountain Refilling Station";o.toLowerCase().includes("blue mountain")&&o.toLowerCase().includes("refilling station")?(r("BLUE MOUNTAIN",1,1,2),r("REFILLING STATION",1,1,1)):o.split(`
`).forEach(c=>r(c.trim().toUpperCase(),1,1,2)),i(),e.shopAddress&&r(e.shopAddress,0,1,4),e.shopPhone&&r(`Telp: ${e.shopPhone}`,0,1,4),a(),r(`No   : ${t.invoiceNo||"-"}`,0,0,0),r(`Tgl  : ${Re(new Date(t.date))}`,0,0,0),t.customerName&&r(`Cust : ${t.customerName}`,0,0,0),t.cashier&&r(`Kasir: ${t.cashier}`,0,0,0),a();for(const l of n){if(!(l!=null&&l.product))continue;const c=l.product.name,d=l.qty,u=_(l.product.price),p=_(l.product.price*d);r(`${c}`,1,0,0),r(`  ${d} x ${u} = ${p}`,0,0,0)}return a(),t.discount>0&&(r(`Subtotal: ${_(t.subtotal)}`,0,0,0),r(`Diskon:  -${_(t.discount)}`,0,0,0)),t.tax>0&&r(`Pajak:    ${_(t.tax)}`,0,0,0),r(`TOTAL: ${_(t.total)}`,1,0,3),t.paymentMethod==="cash"?(r(`Bayar:   ${_(t.paid)}`,0,0,0),r(`Kembali: ${_(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(r(`Transfer: ${_(t.total)}`,0,0,0),r(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(r(`DP Dibayar: ${_(t.paidAmount||0)}`,0,0,0),r(`Sisa Hutang: ${_(t.remainingDebt||0)}`,1,0,0)),a(),i(),r("Terima kasih sudah berbelanja!",1,1,0),r("BLUE MOUNTAIN REFILLING STATION",1,1,0),i(),i(),s},Ct={"48mm":{width:"48mm",widthPx:"185px",colWidth:30,fontSize:"10px",logoWidth:"55px"},"58mm":{width:"58mm",widthPx:"220px",colWidth:32,fontSize:"11px",logoWidth:"70px"},"80mm":{width:"80mm",widthPx:"300px",colWidth:48,fontSize:"12px",logoWidth:"85px"}},tr=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},ui=t=>{const e=ns(t,k.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),tr()},hi=t=>(ui(t),`my.bluetoothprint.scheme://${(k.state.settings||{}).printerUrl||tr()}`),nr=t=>(ui(t),tr(),`rawbt:data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(ns(t,k.state.settings)))))}`),pi=t=>{const e=k.state.settings||{};let n=`*STRUK PEMBELIAN — ${e.shopName||"BLUE MOUNTAIN"}*
`;n+=`--------------------------------
`,n+=`No. Invoice : ${t.invoiceNo||"-"}
`,n+=`Tanggal     : ${Re(new Date(t.date||Date.now()))}
`,t.customerName&&(n+=`Pelanggan   : ${t.customerName}
`),n+=`Kasir       : ${t.cashier||"Kasir"}
`,n+=`--------------------------------
`;for(const s of t.items||[]){if(!(s!=null&&s.product))continue;const r=s.product.name,a=s.qty,i=s.product.price;n+=`${r}
  ${a} x ${_(i)} = ${_(i*a)}
`}return n+=`--------------------------------
`,t.discount>0&&(n+=`Diskon      : -${_(t.discount)}
`),t.tax>0&&(n+=`Pajak       : ${_(t.tax)}
`),n+=`*TOTAL       : ${_(t.total)}*
`,t.paymentMethod==="cash"?(n+=`Bayar Tunai : ${_(t.paid||t.total)}
`,t.change>0&&(n+=`Kembalian   : ${_(t.change)}
`)):t.paymentMethod==="transfer"?n+=`Metode      : Transfer Bank (Lunas ✅)
`:t.paymentMethod==="debt"&&(n+=`DP Dibayar  : ${_(t.paidAmount||0)}
`,n+=`*Sisa Hutang : ${_(t.remainingDebt||0)}*
`),n+=`--------------------------------
`,n+=`Terima kasih sudah berbelanja!
`,n+=`BLUE MOUNTAIN REFILLING STATION
`,e.shopAddress&&(n+=`${e.shopAddress}
`),e.shopPhone&&(n+=`Telp: ${e.shopPhone}
`),n},Xr=(t,e="")=>{const n=(e||t.customerPhone||"").replace(/\D/g,""),s=n.startsWith("08")?"62"+n.slice(1):n.startsWith("8")?"62"+n:n,r=pi(t),a=encodeURIComponent(r);return s?`https://wa.me/${s}?text=${a}`:`https://wa.me/?text=${a}`},ss=(t,e=null)=>{const n=k.state.settings||{},s=e||n.printerPaper||"58mm",r=Ct[s]||Ct["58mm"],a=t.items||[],i=()=>'<div style="border-top:1px dashed #333;margin:4px 0"></div>';let o=`<div class="thermal-receipt" style="width:${r.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:2px 4px">`;o+=`<div style="text-align:center;margin:0 auto 2px auto;line-height:1">
    <img src="${di}"
         class="thermal-logo"
         alt="Blue Mountain"
         width="65"
         height="65"
         style="width:${r.logoWidth};height:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  </div>`;const l=n.shopName||"Blue Mountain Refilling Station";o+='<div style="text-align:center;margin-bottom:6px">',l.toLowerCase().includes("blue mountain")&&l.toLowerCase().includes("refilling station")?(o+=`<div style="font-weight:900;font-size:${s==="80mm"?"15px":"13px"};line-height:1.2;letter-spacing:0.5px">BLUE MOUNTAIN</div>`,o+=`<div style="font-weight:800;font-size:${s==="80mm"?"12px":"11px"};line-height:1.2;letter-spacing:0.3px">REFILLING STATION</div>`):l.toUpperCase().split(`
`).forEach(d=>{o+=`<div style="font-weight:900;font-size:${s==="80mm"?"14px":"12px"};line-height:1.2">${d.trim()}</div>`}),o+="</div>",n.shopAddress&&(o+=`<div style="text-align:center;font-size:10px;line-height:1.35;word-break:normal;overflow-wrap:break-word;margin-bottom:2px">${n.shopAddress}</div>`),n.shopPhone&&(o+=`<div style="text-align:center;font-size:10px;line-height:1.35">Telp: ${n.shopPhone}</div>`),o+=i(),o+='<div style="font-size:10px;line-height:1.4">',o+=`<div>No&nbsp;&nbsp;&nbsp;: <b>${t.invoiceNo||"-"}</b></div>`,o+=`<div>Tgl&nbsp;&nbsp;: ${Re(new Date(t.date||Date.now()))}</div>`,t.customerName&&(o+=`<div>Cust&nbsp;: ${t.customerName}</div>`),t.cashier&&(o+=`<div>Kasir: ${t.cashier}</div>`),o+="</div>",o+=i();for(const c of a){if(!(c!=null&&c.product))continue;const d=c.product.name,u=c.qty,p=c.product.price,h=p*u;o+=`<div style="font-weight:700;font-size:${r.fontSize};line-height:1.3">${d}</div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3;margin-bottom:3px">
      <span>&nbsp;&nbsp;${u} x ${_(p)}</span>
      <span style="font-weight:600">${_(h)}</span>
    </div>`}return o+=i(),t.discount>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Subtotal</span><span>${_(t.subtotal||t.total+t.discount)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Diskon</span><span>-${_(t.discount)}</span>
    </div>`),t.tax>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Pajak</span><span>${_(t.tax)}</span>
    </div>`),o+=`<div style="display:flex;justify-content:space-between;font-size:${s==="80mm"?"14px":"13px"};font-weight:900;margin:3px 0;letter-spacing:0.5px">
    <span>TOTAL</span><span>${_(t.total)}</span>
  </div>`,t.paymentMethod==="cash"?(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Bayar Tunai</span><span>${_(t.paid||t.total)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Kembali</span><span>${_(t.change||0)}</span>
    </div>`):t.paymentMethod==="transfer"?(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Transfer Bank</span><span>${_(t.total)}</span>
    </div>`,o+=`<div style="text-align:center;font-size:9px;margin-top:2px">Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}</div>`):t.paymentMethod==="debt"&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>DP Dibayar</span><span>${_(t.paidAmount||0)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Sisa Hutang</span><span>${_(t.remainingDebt||0)}</span>
    </div>`),o+=i(),o+=`<div style="text-align:center;margin-top:4px">
    <div style="font-size:10px;font-weight:700;line-height:1.35">Terima kasih sudah berbelanja!</div>
    <div style="font-size:9px;font-weight:800;letter-spacing:0.5px;margin-top:2px">BLUE MOUNTAIN REFILLING STATION</div>
  </div>`,o+='<div style="height:4px"></div>',o+="</div>",o},on=(t,e=null)=>{const n=k.state.settings||{},s=e||n.printerPaper||"58mm",r=Ct[s]||Ct["58mm"],a=ss(t,s),i=document.createElement("iframe");i.style.position="fixed",i.style.top="-9999px",i.style.left="-9999px",i.style.width="400px",i.style.height="800px",i.style.border="none",i.style.opacity="0",i.style.pointerEvents="none",document.body.appendChild(i);const o=i.contentWindow.document;o.open(),o.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Struk-${t.invoiceNo||"KASIR"}</title>
  <style>
    @page {
      size: ${r.width} auto;
      margin: 0mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @media print {
      html, body {
        width: ${r.width};
        margin: 0 !important;
        padding: 1mm 2mm !important;
        background: #fff !important;
        color: #000 !important;
      }
      .thermal-receipt {
        width: 100% !important;
        padding: 0 !important;
      }
      img, .thermal-logo {
        max-width: ${r.logoWidth} !important;
        width: ${r.logoWidth} !important;
        height: auto !important;
        display: block !important;
        margin: 0 auto 6px auto !important;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Courier New', Consolas, monospace;
      color: #000;
      background: #fff;
    }
  </style>
</head>
<body>
  ${a}
</body>
</html>`),o.close();const l=()=>{try{i.contentWindow.focus(),i.contentWindow.print()}catch{const u=window.open("","_blank","width=350,height=600");u&&(u.document.write(o.documentElement.outerHTML),u.document.close(),u.focus(),setTimeout(()=>{u.print(),setTimeout(()=>u.close(),1e3)},300))}finally{setTimeout(()=>i.remove(),3e3)}},c=o.querySelector("img");c&&!c.complete?(c.onload=()=>setTimeout(l,120),c.onerror=()=>setTimeout(l,120),setTimeout(l,800)):setTimeout(l,200)},fi=(t,e=null)=>{const n=new TextEncoder,s=k.state.settings||{},r=e||s.printerPaper||"58mm",i=(Ct[r]||Ct["58mm"]).colWidth,o=(g,f,b=i)=>{const y=Math.max(1,b-g.length-f.length);return g+" ".repeat(y)+f},l=(g,f=i)=>{if(!g)return[];const b=g.split(" "),y=[];let m="";for(const v of b)m?(m+" "+v).length<=f?m+=" "+v:(y.push(m),m=v):m=v;return m&&y.push(m),y};let c=[];const d=g=>c.push(...g),u=g=>{for(const f of g)c.push(f)},p=g=>{const f=n.encode(g+`
`);for(const b of f)c.push(b)};d([27,64]),u(lu),d([27,97,1]);const h=s.shopName||"Blue Mountain Refilling Station";h.toLowerCase().includes("blue mountain")&&h.toLowerCase().includes("refilling station")?(d([27,69,1]),d([27,33,16]),p("BLUE MOUNTAIN"),d([27,33,0]),d([27,69,1]),p("REFILLING STATION"),d([27,69,0])):(d([27,69,1]),d([27,33,16]),h.toUpperCase().split(`
`).forEach(f=>p(f.trim())),d([27,33,0]),d([27,69,0])),d([27,74,14]),s.shopAddress&&l(s.shopAddress,i).forEach(f=>p(f)),s.shopPhone&&p(`Telp: ${s.shopPhone}`),d([27,97,0]),p("-".repeat(i)),p(`No   : ${t.invoiceNo||"-"}`),p(`Tgl  : ${Re(new Date(t.date||Date.now()))}`),t.customerName&&p(`Cust : ${t.customerName}`),t.cashier&&p(`Kasir: ${t.cashier}`),p("-".repeat(i));for(const g of t.items||[])g!=null&&g.product&&(d([27,69,1]),p(g.product.name),d([27,69,0]),p(o(`  ${g.qty} x ${_(g.product.price)}`,_(g.product.price*g.qty))));return p("-".repeat(i)),t.discount>0&&(p(o("Subtotal",_(t.subtotal||t.total+t.discount))),p(o("Diskon","-"+_(t.discount)))),t.tax>0&&p(o("Pajak",_(t.tax))),d([27,69,1]),d([27,33,16]),p(o("TOTAL",_(t.total))),d([27,33,0]),d([27,69,0]),t.paymentMethod==="cash"?(p(o("Bayar Tunai",_(t.paid||t.total))),d([27,69,1]),p(o("Kembali",_(t.change||0))),d([27,69,0])):t.paymentMethod==="transfer"?(p(o("Transfer Bank",_(t.total))),p(o("Status",t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU"))):t.paymentMethod==="debt"&&(p(o("DP Dibayar",_(t.paidAmount||0))),d([27,69,1]),p(o("Sisa Hutang",_(t.remainingDebt||0))),d([27,69,0])),p("-".repeat(i)),d([27,97,1]),d([27,69,1]),p("Terima kasih sudah berbelanja!"),p("BLUE MOUNTAIN REFILLING STATION"),d([27,69,0]),d([10,10,10,29,86,66,0]),new Uint8Array(c)},gi=async t=>{const{default:e}=await Nn(async()=>{const{default:s}=await import("./vendor-pdf-DV7uGGo9.js").then(r=>r.h);return{default:s}},[],import.meta.url),n=document.createElement("div");n.style.position="fixed",n.style.left="-9999px",n.style.top="0",n.style.width="240px",n.style.maxHeight="none",n.style.overflow="visible",n.style.background="#ffffff",n.style.padding="10px 8px",n.style.boxSizing="border-box",n.style.zIndex="-9999",n.innerHTML=ss(t,"58mm"),document.body.appendChild(n);try{const s=await e(n,{backgroundColor:"#ffffff",scale:3,useCORS:!0,logging:!1,windowWidth:320});return await new Promise((r,a)=>{s.toBlob(i=>{i?r(i):a(new Error("Gagal membuat blob gambar"))},"image/png",1)})}finally{n.remove()}},mi=async t=>{window.showToast&&window.showToast("Menyiapkan gambar struk WhatsApp...","info");try{const e=await gi(t),n=`Struk-${t.invoiceNo||Date.now()}.png`,s=new File([e],n,{type:"image/png"}),r=pi(t);if(navigator.canShare&&navigator.canShare({files:[s]})){await navigator.share({title:`Struk ${t.invoiceNo||""}`,text:r,files:[s]}),window.showToast&&window.showToast("Struk gambar berhasil dibagikan!","success");return}try{navigator.clipboard&&window.ClipboardItem&&(await navigator.clipboard.write([new ClipboardItem({"image/png":e})]),window.showToast&&window.showToast("📋 Gambar struk telah disalin ke clipboard! Tempel (Ctrl+V) di chat WhatsApp.","success"))}catch{}const a=Xr(t);window.open(a,"_blank","noopener,noreferrer")}catch{const n=Xr(t);window.open(n,"_blank","noopener,noreferrer")}},bi=async t=>{window.showToast&&window.showToast("Membuat PNG struk presisi...","info");try{const e=await gi(t),n=`Struk-${t.invoiceNo||Date.now()}.png`,s=new File([e],n,{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[s]}))await navigator.share({title:`Struk ${t.invoiceNo||""}`,files:[s]}),window.showToast&&window.showToast("Struk berhasil dibagikan!","success");else{const r=URL.createObjectURL(e),a=document.createElement("a");a.href=r,a.download=n,a.click(),setTimeout(()=>URL.revokeObjectURL(r),3e3),window.showToast&&window.showToast("PNG struk berhasil disimpan!","success")}}catch{window.showToast&&window.showToast("Gagal membuat PNG struk","error")}},yi=t=>{const e=k.state.settings||{};e.printerUrl&&!e.printerUrl.includes("receipt-data.html")?window.location.href=`my.bluetoothprint.scheme://${e.printerUrl}`:(window.showToast&&window.showToast("BT App perlu server JSON. Mengalihkan ke RawBT (cetak langsung offline)...","info"),setTimeout(()=>{window.location.href=nr(t)},800))},vi=async t=>{if(!navigator.bluetooth)throw new Error("Web Bluetooth tidak didukung pada browser ini. Gunakan Chrome di Android/PC atau gunakan opsi Cetak Direct.");let e;try{e=await navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["000018f0-0000-1000-8000-00805f9b34fb","e7810a71-73ae-499d-8c15-faa9aef0c3f2","49535343-fe7d-4ae5-8fa9-9fafd205e455","0000ff00-0000-1000-8000-00805f9b34fb","0000ae30-0000-1000-8000-00805f9b34fb","0000fee7-0000-1000-8000-00805f9b34fb","0000ffe0-0000-1000-8000-00805f9b34fb","0000fff0-0000-1000-8000-00805f9b34fb"]})}catch(r){if(r.name==="NotFoundError")return;throw r}const n=await e.gatt.connect();let s=null;try{const r=await n.getPrimaryServices();for(const o of r)try{const l=await o.getCharacteristics();for(const c of l)if(c.properties.write||c.properties.writeWithoutResponse){s=c;break}if(s)break}catch{}if(!s)throw new Error("Karakteristik penulisan printer Bluetooth tidak ditemukan.");const a=fi(t),i=64;for(let o=0;o<a.length;o+=i){const l=a.slice(o,o+i);s.properties.write?await s.writeValueWithResponse(l):await s.writeValueWithoutResponse(l)}}finally{n!=null&&n.connected&&n.disconnect()}},wi=async t=>{var n;if(!navigator.usb)throw new Error("WebUSB tidak didukung pada browser ini. Gunakan Chrome/Edge.");let e;try{e=await navigator.usb.requestDevice({filters:[]})}catch(s){if(s.name==="NotFoundError")return;throw s}try{await e.open()}catch(s){if((n=s.message)!=null&&n.toLowerCase().includes("access denied")||s.name==="SecurityError"){window.showToast&&window.showToast("Printer USB Windows dikelola driver sistem. Mengalihkan otomatis ke Cetak Langsung...","info"),on(t);return}throw s}try{e.configuration===null&&await e.selectConfiguration(1);let s=0,r=1;const a=e.configuration;if(a!=null&&a.interfaces)for(const o of a.interfaces)for(const l of o.alternates){const c=l.endpoints.find(d=>d.direction==="out");if(c){s=o.interfaceNumber,r=c.endpointNumber;break}}await e.claimInterface(s);const i=fi(t);await e.transferOut(r,i),await e.close(),window.showToast&&window.showToast("Struk terkirim ke printer USB!","success")}catch{window.showToast&&window.showToast("Mengalihkan ke Cetak Langsung via sistem...","info"),on(t)}},vs=(t="58mm")=>{const e={invoiceNo:`TEST-${t.toUpperCase()}-`+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:k.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};on(e,t)},ws=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),n=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${n}${s}`},oe=(t,e="generic-modal",n="")=>{z();const s=typeof e=="string"&&e.trim()?e.trim():"generic-modal",r=document.createElement("div");r.className="modal-overlay",r.id=`overlay-${s}`;const i=s==="modal-cust-360"||s==="payment-modal"||n.includes("modal--wide")?`modal modal--wide ${n}`.trim():`modal ${n}`.trim();r.innerHTML=`<div class="${i}" id="${s}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(r),r.addEventListener("click",c=>{c.target===r&&z(s)});const o=c=>{c.key==="Escape"&&(document.removeEventListener("keydown",o),z(s))};document.addEventListener("keydown",o);const l=r.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return l.length&&l[0].focus(),r},z=(t=null)=>{const e=typeof t=="string"&&t.trim()?t.trim():null;let n=[];try{if(e){const s=document.getElementById(`overlay-${e}`)||document.querySelector(`#overlay-${e}`);s&&(n=[s])}}catch{}n.length||(n=[...document.querySelectorAll(".modal-overlay")]),n.forEach(s=>{var r;s&&((r=s.querySelector(".modal"))==null||r.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>{try{s.remove()}catch{}},180))})},cu=t=>{const n=(r=>Math.ceil(r/5e3)*5e3)(t),s=[n,n+5e3,n+1e4,n+2e4,n+5e4,n+1e5];return[...new Set(s.filter(r=>r>=t))].slice(0,4)},xs=(t="cash")=>{const e=k.total,n=k.subtotal,s=k.state.discount||0,r=k.tax,a=k.state.settings||{},i=T(a.bankName||"BCA"),o=T(a.bankNumber||"—"),l=T(a.bankHolder||a.shopName||"Blue Mountain"),c=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran Transaksi</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Tagihan</div>
        <div class="amount">${_(e)}</div>
        ${s>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${_(s)}</div>`:""}
        ${r>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${_(r)}</div>`:""}
      </div>

      <div class="payment-method-tabs">
        <button class="pay-tab ${t==="cash"?"active":""}" data-method="cash">
          <span class="pay-tab__icon">💵</span>Tunai
        </button>
        <button class="pay-tab ${t==="transfer"?"active":""}" data-method="transfer">
          <span class="pay-tab__icon">📲</span>Transfer
        </button>
        <button class="pay-tab ${t==="debt"?"active":""}" data-method="debt"
          style="background:${t==="debt"?"#fef3c7":"var(--color-warning-bg,#fef9c3)"};border-color:#d97706">
          <span class="pay-tab__icon">📋</span>Hutang / Cicil
        </button>
      </div>

      <!-- Cash Section -->
      <div id="pay-cash-section" style="${t!=="cash"?"display:none":""}">
        <div class="input-group">
          <label class="input-label" for="cash-received">💰 Jumlah Uang Diterima (Rp)</label>
          <input type="number" class="input" id="cash-received"
            value="${e}" min="${e}" max="999999999" step="1000"
            inputmode="numeric" placeholder="${e}">
        </div>
        <div class="quick-amounts" id="quick-amounts" style="margin-top:8px">
          ${cu(e).map(d=>`<button class="quick-amt-btn" data-amount="${d}">${_(d)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px;padding:10px 14px;background:var(--color-success-bg);border:1.5px solid var(--color-success-border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="font-weight:700;color:var(--color-success)">💰 Kembalian</span>
          <span class="value" id="change-amount" style="font-size:18px;font-weight:900;color:var(--color-success)">${_(0)}</span>
        </div>
      </div>

      <!-- Transfer Section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info" style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border-subtle)">
          <div style="font-size:32px;margin-bottom:4px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Silakan transfer nominal berikut:</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-600);margin:6px 0">${_(e)}</div>
          <div style="margin-top:8px;padding:10px;background:#fff;border-radius:8px;border:1.5px dashed var(--blue-300);text-align:left">
            <div style="font-size:12px;color:var(--text-secondary)">Bank: <strong>${i}</strong></div>
            <div style="font-size:14px;font-weight:800;color:var(--text-primary);margin:2px 0">
              No. Rek: <span id="trans-acc-num">${o}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary)">Atas Nama: <strong>${l}</strong></div>
          </div>
          <div style="margin-top:12px;text-align:center">
            <canvas id="qris-dynamic-canvas" style="display:block;margin:0 auto;border-radius:10px;border:1px solid var(--border-subtle);background:#fff;max-width:170px;height:auto"></canvas>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:6px;font-weight:700">
              ⚡ QRIS Dinamis Otomatis Nominal: <span style="color:var(--blue-600)">${_(e)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Hutang / Cicil Section -->
      <div id="pay-debt-section" style="${t!=="debt"?"display:none":""}">
        <div style="padding:10px 14px;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;font-size:12px;color:#92400e;margin-bottom:12px">
          📋 <strong>Pencatatan Piutang Usaha</strong> — Wajib masukkan nama pelanggan.
        </div>
        <div class="input-group">
          <label class="input-label" for="debt-customer">👤 Nama Pelanggan <span style="color:red">*</span></label>
          <input type="text" class="input" id="debt-customer"
            placeholder="Ketik nama pelanggan"
            value="${T(k.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${e}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total Tagihan</span><strong>${_(e)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>DP Dibayar Sekarang</span><strong id="debt-paid-display" style="color:var(--color-success)">${_(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang Berjalan</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger);font-size:16px">${_(e)}</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="modal-footer">
      <button class="btn btn--secondary" id="pay-cancel-btn">Batal</button>
      <button class="btn btn--success btn--lg" id="pay-confirm-btn" style="font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        ✅ Proses Pembayaran
      </button>
    </div>
  `;oe(c,"payment-modal"),setTimeout(()=>{var b,y,m,v;(b=document.getElementById("pay-close-btn"))==null||b.addEventListener("click",()=>z("payment-modal")),(y=document.getElementById("pay-cancel-btn"))==null||y.addEventListener("click",()=>z("payment-modal"));const d=()=>{var E;const x=document.getElementById("qris-dynamic-canvas");if(!x)return;const S=((E=k.state.settings)==null?void 0:E.qrisNumber)||"",w=ou(S,e);un.toCanvas(x,w,{width:170,margin:1,errorCorrectionLevel:"M"},$=>{})};d(),document.querySelectorAll(".pay-tab").forEach(x=>{x.addEventListener("click",()=>{var w,E;document.querySelectorAll(".pay-tab").forEach($=>$.classList.remove("active")),x.classList.add("active");const S=x.dataset.method;document.getElementById("pay-cash-section").style.display=S==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=S==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=S==="debt"?"":"none",S==="cash"&&((w=document.getElementById("cash-received"))==null||w.focus()),S==="transfer"&&d(),S==="debt"&&((E=document.getElementById("debt-customer"))==null||E.focus())})});const u=document.getElementById("cash-received"),p=document.getElementById("change-amount"),h=()=>{const x=parseFloat(u==null?void 0:u.value)||e,S=Math.max(0,x-e);p&&(p.textContent=_(S))};u==null||u.addEventListener("input",h),h(),(m=document.getElementById("quick-amounts"))==null||m.addEventListener("click",x=>{const S=x.target.closest(".quick-amt-btn");S&&u&&(u.value=S.dataset.amount,h())});const g=document.getElementById("debt-paid-now"),f=()=>{const x=Math.min(parseFloat(g==null?void 0:g.value)||0,e),S=e-x,w=document.getElementById("debt-paid-display"),E=document.getElementById("debt-remaining-display");w&&(w.textContent=_(x)),E&&(E.textContent=_(S))};g==null||g.addEventListener("input",f),(v=document.getElementById("pay-confirm-btn"))==null||v.addEventListener("click",async()=>{var P,F,J,Z,R,U,ee;const x=document.querySelector(".pay-tab.active"),S=(x==null?void 0:x.dataset.method)||"cash",w=document.getElementById("pay-confirm-btn");if(S==="cash"&&(parseFloat(u==null?void 0:u.value)||e)<e){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),u==null||u.focus();return}if(S==="debt"){const A=(F=(P=document.getElementById("debt-customer"))==null?void 0:P.value)==null?void 0:F.trim();if(!A){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(J=document.getElementById("debt-customer"))==null||J.focus();return}const N=Math.min(parseFloat((Z=document.getElementById("debt-paid-now"))==null?void 0:Z.value)||0,e),B=e-N,D=(k.state.customers||[]).find(q=>(q.name||"").trim().toLowerCase()===A.toLowerCase());if(D&&D.creditLimit>0){const q=(Number(D.totalDebt)||0)+B;if(q>D.creditLimit&&!confirm(`⚠️ Peringatan Limit Piutang!
Total piutang ${D.name} akan menjadi ${_(q)}, melebihi batas kredit (${_(D.creditLimit)}).

Tetap lanjutkan transaksi?`))return}}w&&(w.disabled=!0,w.textContent="⏳ Menyimpan...");const E=new Date().toISOString(),$=await se();let C=k.state.selectedCustomer||null,K="";S==="debt"?K=((U=(R=document.getElementById("debt-customer"))==null?void 0:R.value)==null?void 0:U.trim())||k.state.customerName||"Pelanggan":K=k.state.customerName||"",!C&&K&&(C=$.find(A=>(A.name||"").trim().toLowerCase()===K.toLowerCase())||null);let j;if(S==="cash"){const A=parseFloat(u==null?void 0:u.value)||e,N=Math.max(0,A-e);j={invoiceNo:ws(),date:E,dateKey:he(),items:k.state.cart.map(B=>({product:{...B.product},qty:B.qty})),subtotal:n,discount:s,tax:r,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:A,change:N,paidAmount:e,remainingDebt:0,debtPayments:[],customerId:(C==null?void 0:C.id)||null,customerName:(C==null?void 0:C.name)||K,customerPhone:(C==null?void 0:C.phone)||"",cashier:k.state.settings.cashierName||"Kasir"}}else if(S==="transfer")j={invoiceNo:ws(),date:E,dateKey:he(),items:k.state.cart.map(A=>({product:{...A.product},qty:A.qty})),subtotal:n,discount:s,tax:r,total:e,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:e,change:0,paidAmount:e,remainingDebt:0,debtPayments:[],customerId:(C==null?void 0:C.id)||null,customerName:(C==null?void 0:C.name)||K,customerPhone:(C==null?void 0:C.phone)||"",cashier:k.state.settings.cashierName||"Kasir"};else{const A=Math.min(parseFloat((ee=document.getElementById("debt-paid-now"))==null?void 0:ee.value)||0,e),N=e-A,B=N===0?"paid":A>0?"partial":"unpaid";j={invoiceNo:ws(),date:E,dateKey:he(),items:k.state.cart.map(D=>({product:{...D.product},qty:D.qty})),subtotal:n,discount:s,tax:r,total:e,paymentMethod:"debt",paymentStatus:B,paid:A,change:0,paidAmount:A,remainingDebt:N,debtPayments:A>0?[{date:E,amount:A,note:"DP / Uang muka awal"}]:[],customerId:(C==null?void 0:C.id)||null,customerName:(C==null?void 0:C.name)||K,customerPhone:(C==null?void 0:C.phone)||"",cashier:k.state.settings.cashierName||"Kasir"}}try{if(K){if(C)C.totalOrders=(Number(C.totalOrders)||0)+1,C.totalSpent=(Number(C.totalSpent)||0)+j.total,j.remainingDebt>0&&(C.totalDebt=(Number(C.totalDebt)||0)+j.remainingDebt),await Rt(C),j.customerId=C.id,j.customerName=C.name;else{const B=await Ha({name:K,phone:"",category:"Rumah Tangga",address:"",totalOrders:1,totalSpent:j.total,totalDebt:j.remainingDebt||0,creditLimit:0,galonLoaned:0});j.customerId=B,j.customerName=K}const N=await se();k.setCustomers(N)}const A=await cd(j);j.id=A,k.addTransaction(j),z("payment-modal"),k.clearCart(),du(j)}catch(A){window.showToast("Gagal menyimpan transaksi: "+(A.message||"Error"),"error"),w&&(w.disabled=!1,w.textContent="✅ Proses Pembayaran")}})},0)},du=t=>{var o,l,c,d,u,p,h,g,f,b;const e=ns(t,k.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),hi(t);const n=nr(t),s=((o=k.state.settings)==null?void 0:o.printerPaper)||"58mm",r=ss(t,s),a=document.createElement("div");a.className="success-overlay",a.id="success-overlay",a.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${T(t.invoiceNo)} &bull; ${_(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${_(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:var(--blue-600);font-size:13px;margin-top:4px">📲 Transfer Terkonfirmasi ✅</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa Piutang: ${_(t.remainingDebt)}</p>`:""}
    </div>

    <!-- Print & Navigation Actions -->
    <div class="success-actions" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:440px;margin-top:14px">
      <button class="btn btn--success" id="btn-print-direct" style="flex:1;min-width:150px;font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        🖨️ Cetak Struk (${s})
      </button>
      <button class="btn btn--secondary" id="btn-mo-png" style="font-size:12px">
        🖼️ PNG / Share
      </button>
      <button class="btn btn--secondary" id="btn-mo-whatsapp" style="font-size:12px;display:flex;align-items:center;gap:4px;background:#dcfce7;border:1.5px solid #86efac;color:#166534;font-weight:700">
        💬 WhatsApp
      </button>
      <button class="btn btn--secondary" id="btn-print-ble" style="font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Web BLE
      </button>
      <button class="btn btn--secondary" id="btn-print-usb" style="font-size:12px;display:flex;align-items:center;gap:4px">
        🔌 USB
      </button>
      <button class="btn btn--secondary" id="btn-mo-btapp" style="font-size:12px;display:flex;align-items:center;gap:4px">
        🌐 BT App
      </button>
      <a class="btn btn--secondary" href="${n}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        ⚡ RawBT
      </a>
      <button class="btn btn--primary" id="btn-new-tx" style="flex:1;min-width:140px">
        🔄 Transaksi Baru
      </button>
      <button class="btn btn--secondary" id="btn-close-overlay">
        ✕ Tutup
      </button>
    </div>

    <details style="margin-top:14px;max-width:340px;width:100%">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-secondary);text-align:center;margin-bottom:8px;font-weight:600">
        📄 Preview Struk (${s})
      </summary>
      <div class="receipt-preview" style="background:#fff;border-radius:8px;padding:8px">${r}</div>
    </details>
  `,document.body.appendChild(a);const i=()=>{a.classList.add("closing"),setTimeout(()=>a.remove(),180)};(l=document.getElementById("success-close-btn"))==null||l.addEventListener("click",i),(c=document.getElementById("btn-close-overlay"))==null||c.addEventListener("click",i),(d=document.getElementById("btn-print-direct"))==null||d.addEventListener("click",()=>{on(t)}),(u=document.getElementById("btn-mo-whatsapp"))==null||u.addEventListener("click",()=>{mi(t)}),(p=document.getElementById("btn-mo-png"))==null||p.addEventListener("click",()=>{bi(t)}),(h=document.getElementById("btn-print-ble"))==null||h.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer Bluetooth...","info"),await vi(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(y){window.showToast(y.message||"Gagal koneksi Bluetooth","error")}}),(g=document.getElementById("btn-print-usb"))==null||g.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer USB...","info"),await wi(t)}catch(y){window.showToast(y.message||"Gagal koneksi WebUSB","error")}}),(f=document.getElementById("btn-mo-btapp"))==null||f.addEventListener("click",()=>{yi(t)}),(b=document.getElementById("btn-new-tx"))==null||b.addEventListener("click",()=>{i(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{a.parentNode&&i()},2e4)},Ks=async({onLogin:t=null,forceLock:e=!1}={})=>{var p;let n=await ke();n.length===0&&(await Ga(),n=await ke());const s=n.filter(h=>h.isActive!==!1);if(s.length===0){(p=window.showToast)==null||p.call(window,"Tidak ada akun operator aktif.","error");return}let r=s[0].id,a="";const i="modal-login-operator",o={owner:{color:"#8b5cf6",label:"👑 Owner"},supervisor:{color:"#2563eb",label:"⭐ Supervisor"},cashier:{color:"#10b981",label:"👤 Kasir"}},l=()=>`
    <div style="padding: 24px; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">🔐</div>
      <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 6px 0; color: var(--text-primary, #1e293b);">
        ${e?"Sistem Terkunci":"Beralih Operator Kasir"}
      </h2>
      <p style="font-size: 13px; color: var(--text-muted, #64748b); margin: 0 0 20px 0;">
        Pilih nama operator dan masukkan 4-6 digit PIN masuk Anda
      </p>

      <!-- Operator Selection Grid -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
        ${s.map(h=>{const g=String(h.id)===String(r),f=o[h.role]||o.cashier;return`
            <button type="button" class="btn-select-operator" data-id="${h.id}" style="
              padding: 10px 14px;
              border-radius: 12px;
              border: 2px solid ${g?"var(--primary, #2563eb)":"var(--border, #e2e8f0)"};
              background: ${g?"rgba(37, 99, 235, 0.08)":"var(--bg-card, #ffffff)"};
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
              transition: all 0.2s;
            ">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: ${f.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${(h.name||"U").charAt(0).toUpperCase()}
              </div>
              <div style="text-align: left;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${T(h.name)}</div>
                <div style="font-size: 11px; color: ${f.color}; font-weight: 600;">${f.label}</div>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- PIN Display -->
      <div id="pin-display-box" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;">
          ${[0,1,2,3,4,5].map(h=>`
            <span class="pin-dot" style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid var(--primary, #2563eb);
              background: ${h<a.length?"var(--primary, #2563eb)":"transparent"};
              display: inline-block;
              transition: background 0.15s;
            "></span>
          `).join("")}
        </div>
        <div id="pin-error-msg" style="min-height: 18px; font-size: 12px; font-weight: 600; color: #dc2626;"></div>
      </div>

      <!-- Numpad -->
      <div style="max-width: 260px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${[1,2,3,4,5,6,7,8,9].map(h=>`
          <button type="button" class="btn-numpad" data-val="${h}" style="
            height: 52px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 12px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
          ">${h}</button>
        `).join("")}
        <button type="button" class="btn-numpad" data-val="clear" style="
          height: 52px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid #fecaca;
          background: #fff1f2;
          color: #dc2626;
          cursor: pointer;
        ">C</button>
        <button type="button" class="btn-numpad" data-val="0" style="
          height: 52px;
          font-size: 20px;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--bg-card, #ffffff);
          color: var(--text-primary, #1e293b);
          cursor: pointer;
        ">0</button>
        <button type="button" class="btn-numpad" data-val="submit" style="
          height: 52px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          background: var(--primary, #2563eb);
          color: white;
          cursor: pointer;
        ">✓</button>
      </div>

      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border, #e2e8f0);">
        <button type="button" id="btn-modal-reset-owner" style="
          background: none;
          border: none;
          color: var(--text-muted, #64748b);
          font-size: 11px;
          cursor: pointer;
          text-decoration: underline;
        ">🔄 Lupa PIN? Reset PIN Owner ke "1234"</button>
      </div>

      ${e?"":`
        <div style="margin-top: 12px;">
          <button type="button" id="btn-cancel-login" style="
            background: transparent;
            border: none;
            color: var(--text-muted, #64748b);
            font-size: 13px;
            cursor: pointer;
            text-decoration: underline;
          ">Tutup / Batal</button>
        </div>
      `}
    </div>
  `;oe(l(),i,"modal--login");const c=()=>{document.querySelectorAll("#pin-display-box .pin-dot").forEach((g,f)=>{g.style.background=f<a.length?"var(--primary, #2563eb)":"transparent"})},d=async(h=!1)=>{var f;const g=s.find(b=>String(b.id)===String(r));if(g){if(a.length>=4&&await Fa(a,g.pinSalt,g.pinHash)){k.login(g),z(i),(f=window.showToast)==null||f.call(window,`Operator aktif: ${g.name} (${g.role})`,"success"),typeof t=="function"&&t(g);return}if(h||a.length>=6){const b=document.getElementById("pin-error-msg");b&&(b.textContent=a.length<4?"Masukkan minimal 4 digit PIN":"PIN salah! Silakan coba lagi."),a="",c()}}},u=()=>{var g,f;document.querySelectorAll(".btn-select-operator").forEach(b=>{b.addEventListener("click",()=>{r=b.getAttribute("data-id"),a="";const y=document.getElementById(i);y&&(y.innerHTML=l(),u())})}),document.querySelectorAll(".btn-numpad").forEach(b=>{b.addEventListener("click",()=>{const y=b.getAttribute("data-val"),m=document.getElementById("pin-error-msg");m&&(m.textContent=""),y==="clear"?(a="",c()):y==="submit"?d(!0):a.length<6&&(a+=y,c(),d(!1))})}),(g=document.getElementById("btn-cancel-login"))==null||g.addEventListener("click",()=>{z(i)}),(f=document.getElementById("btn-modal-reset-owner"))==null||f.addEventListener("click",async()=>{var y,m,v;const b=s.find(x=>x.role==="owner");if(!b){(y=window.showToast)==null||y.call(window,"Akun Owner tidak ditemukan.","error");return}if(confirm(`Atur ulang PIN akun Owner "${b.name}" kembali ke default "1234"?`))try{const x=nn(),S=await St("1234",x),w={...b,pinHash:S,pinSalt:x,updatedAt:new Date().toISOString()};await Vs(w),s=(await ke()).filter($=>$.isActive!==!1),r=b.id,a="";const E=document.getElementById(i);E&&(E.innerHTML=l(),u()),(m=window.showToast)==null||m.call(window,'PIN Owner berhasil direset ke default "1234". Silakan masukkan 1234.',"success")}catch(x){(v=window.showToast)==null||v.call(window,"Gagal mereset PIN: "+x.message,"error")}});const h=b=>{const y=document.getElementById(i);if(!y||!y.classList.contains("active")){window.removeEventListener("keydown",h);return}["INPUT","TEXTAREA"].includes(b.target.tagName)||(b.key>="0"&&b.key<="9"?(b.preventDefault(),a.length<6&&(a+=b.key,c(),d(!1))):b.key==="Backspace"?(b.preventDefault(),a=a.slice(0,-1),c()):b.key==="Enter"?(b.preventDefault(),d(!0)):b.key==="Escape"&&!e&&(b.preventDefault(),z(i)))};window.addEventListener("keydown",h)};u()};let ht=[],Sn="all",pt="",re=1;const Bt=10,uu=[{id:"all",label:"Semua"},{id:"Rumah Tangga",label:"🏠 Rumah Tangga"},{id:"Kantor/Instansi",label:"🏢 Kantor/Instansi"},{id:"Warung/Reseller",label:"🏪 Warung/Reseller"},{id:"VIP",label:"🌟 VIP"}],hu=async()=>{ht.length&&(ht.forEach(s=>typeof s=="function"&&s()),ht=[]),ht.push(k.on("customers:change",()=>ze())),ht.push(k.on("transactions:change",()=>ze()));const t=()=>{const s=document.getElementById("view-customers");s&&s.classList.contains("active")&&ze()};window.addEventListener("resize",t),ht.push(()=>window.removeEventListener("resize",t));const[e,n]=await Promise.all([se(),_e()]);k.setCustomers(e),k.setTransactions(n),ze()},xi=(t,e=[])=>{const n=t.id?String(t.id):null,s=(t.name||"").trim().toLowerCase(),r=(t.phone||"").replace(/\D/g,"");return e.filter(a=>!!(n&&a.customerId&&String(a.customerId)===n||s&&a.customerName&&a.customerName.trim().toLowerCase()===s||r&&a.customerPhone&&a.customerPhone.replace(/\D/g,"")===r)).sort((a,i)=>new Date(i.date)-new Date(a.date))},ze=async()=>{var f,b,y;const t=document.getElementById("view-customers");if(!t)return;const e=k.state.customers||[],n=await _e(),s={};for(const m of n){const v=m.customerId?String(m.customerId):null,x=(m.customerName||"").trim().toLowerCase(),S=[];v&&S.push(`id:${v}`),x&&S.push(`name:${x}`);for(const w of S)s[w]||(s[w]={orders:0,spent:0,debt:0,txIds:new Set}),s[w].txIds.has(m.id)||(s[w].txIds.add(m.id),s[w].orders+=1,s[w].spent+=Number(m.total)||0,m.paymentMethod==="debt"&&(Number(m.remainingDebt)||0)>0&&(s[w].debt+=Number(m.remainingDebt)||0))}const r=e.length;let a=0,i=0,o=0;e.forEach(m=>{const v=`id:${m.id}`,x=`name:${(m.name||"").trim().toLowerCase()}`,S=s[v],w=s[x],E=Math.max((S==null?void 0:S.debt)||0,(w==null?void 0:w.debt)||0),$=Math.max((S==null?void 0:S.spent)||0,(w==null?void 0:w.spent)||0),C=Math.max(Number(m.totalDebt||0),E),K=Math.max(Number(m.totalSpent||0),$);a+=C,o+=K,i+=Number(m.galonLoaned||0)});let l=e.filter(m=>{const v=Sn==="all"||m.category===Sn,x=!pt||(m.name||"").toLowerCase().includes(pt.toLowerCase())||(m.phone||"").includes(pt)||(m.address||"").toLowerCase().includes(pt.toLowerCase());return v&&x});const c=l.length,d=Math.max(1,Math.ceil(c/Bt));re>d&&(re=d),re<1&&(re=1);const u=c===0?0:(re-1)*Bt+1,p=Math.min(re*Bt,c),h=l.slice((re-1)*Bt,re*Bt);t.innerHTML=`
    <!-- Responsive Section Header matching other POS modules -->
    <div class="section-header" style="flex-wrap:wrap;gap:12px;margin-bottom:var(--space-4)">
      <div>
        <h2 class="section-title">
          👥 Manajemen Pelanggan <span>${r} total (${l.length} terfilter)</span>
        </h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Data langganan, pelacakan piutang real-time, pinjaman galon & broadcast WhatsApp
        </div>
      </div>
      <button class="btn btn--primary" id="btn-add-customer" style="font-weight:700;display:flex;align-items:center;gap:6px">
        <span>➕</span> Tambah Pelanggan Baru
      </button>
    </div>

    <!-- Summary Metrics Cards: responsive 4-card / 2x2 grid via CSS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Pelanggan</div>
        <div style="font-size:20px;font-weight:800;color:var(--blue-700);margin-top:4px">${r} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">orang</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Sisa Piutang</div>
        <div style="font-size:20px;font-weight:800;color:#dc2626;margin-top:4px">${_(a)}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Galon Dipinjam</div>
        <div style="font-size:20px;font-weight:800;color:#d97706;margin-top:4px">${i} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">galon</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Akumulasi Omzet (LTV)</div>
        <div style="font-size:20px;font-weight:800;color:#16a34a;margin-top:4px">${_(o)}</div>
      </div>
    </div>

    <!-- Filters & Responsive Search Bar -->
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px">
      <div class="category-pills" style="display:flex;flex-wrap:wrap;gap:6px;max-width:100%">
        ${uu.map(m=>`
          <button class="btn btn--sm ${m.id===Sn?"btn--primary":"btn--secondary"} cat-filter-btn"
                  data-cat="${m.id}" style="border-radius:20px;font-size:12px;padding:5px 12px">
            ${m.label}
          </button>
        `).join("")}
      </div>

      <div style="position:relative;flex:1;min-width:200px;max-width:320px">
        <input type="text" class="input" id="cust-search"
               placeholder="Cari nama, nomor HP, alamat..."
               value="${T(pt)}"
               style="width:100%;border-radius:20px;padding-left:34px;font-size:12px">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--text-muted)">🔍</span>
      </div>
    </div>

    <!-- Customer Card with Native Scroll & Always-Visible Pagination -->
    <div class="card card--elevated" style="overflow:hidden;padding:0;margin-bottom:var(--space-6)">
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%">
        <table class="data-table" id="cust-table" style="width:100%;min-width:720px">
          <thead>
            <tr>
              <th>Nama Pelanggan</th>
              <th>Kategori</th>
              <th>Kontak WhatsApp</th>
              <th>Alamat Pengantaran</th>
              <th style="text-align:right">Total Piutang</th>
              <th style="text-align:center">Galon Dipinjam</th>
              <th style="text-align:center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${h.length===0?`
              <tr>
                <td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                  Belum ada data pelanggan yang sesuai filter.
                </td>
              </tr>
            `:h.map(m=>{const v=`id:${m.id}`,x=`name:${(m.name||"").trim().toLowerCase()}`,S=s[v],w=s[x],E=Math.max((S==null?void 0:S.debt)||0,(w==null?void 0:w.debt)||0),$=Math.max(Number(m.totalDebt||0),E),C=(m.phone||"").replace(/\D/g,""),K=C.startsWith("08")?"62"+C.slice(1):C;return`
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--text-primary)">${T(m.name)}</div>
                    ${m.creditLimit>0?`<div style="font-size:11px;color:var(--text-muted)">Limit: ${_(m.creditLimit)}</div>`:""}
                  </td>
                  <td>
                    <span class="badge badge--blue">
                      ${T(m.category||"Rumah Tangga")}
                    </span>
                  </td>
                  <td>
                    ${K?`
                      <a href="https://wa.me/${K}" target="_blank" rel="noopener noreferrer"
                         style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                        💬 ${T(m.phone)}
                      </a>
                    `:'<span style="color:var(--text-muted)">-</span>'}
                  </td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${T(m.address||"-")}">
                    ${T(m.address||"-")}
                  </td>
                  <td style="text-align:right">
                    ${$>0?`
                      <div style="color:#dc2626;font-weight:800;font-size:13px">${_($)}</div>
                      <button class="btn btn--sm btn-pay-debt-quick" data-id="${m.id}"
                              style="margin-top:3px;padding:2px 8px;font-size:10px;font-weight:700;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;border-radius:6px;cursor:pointer">
                        💰 Bayar
                      </button>
                    `:'<span style="color:#16a34a;font-weight:700;font-size:12px">Lunas ✅</span>'}
                  </td>
                  <td style="text-align:center">
                    ${m.galonLoaned>0?`
                      <span style="font-weight:800;color:#d97706;background:rgba(245,158,11,0.1);padding:2px 8px;border-radius:8px;font-size:12px">
                        🪣 ${m.galonLoaned}
                      </span>
                    `:'<span style="color:var(--text-muted)">0</span>'}
                  </td>
                  <td style="text-align:center">
                    <div style="display:inline-flex;gap:4px">
                      <button class="btn btn--secondary btn--sm btn-view-360" data-id="${m.id}" title="Detail Profil 360°" style="padding:4px 8px;font-size:11px">
                        🔍 Profil
                      </button>
                      <button class="btn btn--secondary btn--sm btn-edit-cust" data-id="${m.id}" title="Edit Pelanggan" style="padding:4px 8px;font-size:11px">
                        ✏️
                      </button>
                      <button class="btn btn--danger btn--sm btn-del-cust" data-id="${m.id}" title="Hapus Pelanggan" style="padding:4px 8px;font-size:11px">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>

      <!-- Pagination ALWAYS Visible matching Riwayat Transaksi -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">
          Menampilkan <strong>${u}-${p}</strong> dari <strong>${c}</strong> pelanggan
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn btn--secondary btn--sm" id="cust-prev-page" ${re<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            ◀ Sebelumnya
          </button>
          <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
            Hal ${re} / ${d}
          </span>
          <button class="btn btn--secondary btn--sm" id="cust-next-page" ${re>=d?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            Berikutnya ▶
          </button>
        </div>
      </div>
    </div>

    <!-- Dock Clearance Spacer: prevents bottom navigation dock from overlapping content -->
    <div style="height:48px" aria-hidden="true"></div>
  `,t.querySelectorAll(".cat-filter-btn").forEach(m=>{m.addEventListener("click",()=>{Sn=m.dataset.cat,re=1,ze()})});const g=document.getElementById("cust-search");g==null||g.addEventListener("input",m=>{pt=m.target.value,re=1,ze()}),(f=document.getElementById("cust-prev-page"))==null||f.addEventListener("click",()=>{re>1&&(re--,ze())}),(b=document.getElementById("cust-next-page"))==null||b.addEventListener("click",()=>{re<d&&(re++,ze())}),(y=document.getElementById("btn-add-customer"))==null||y.addEventListener("click",()=>{It()}),t.querySelectorAll(".btn-edit-cust").forEach(m=>{m.addEventListener("click",()=>{const v=m.dataset.id,x=e.find(S=>String(S.id)===String(v));x&&It(x)})}),t.querySelectorAll(".btn-del-cust").forEach(m=>{m.addEventListener("click",async()=>{var S;const v=m.dataset.id,x=e.find(w=>String(w.id)===String(v));if(x&&confirm(`Hapus pelanggan "${x.name}"?`)){await id(x.id);const w=await se();k.setCustomers(w),(S=window.showToast)==null||S.call(window,"Pelanggan berhasil dihapus.","info")}})}),t.querySelectorAll(".btn-view-360").forEach(m=>{m.addEventListener("click",()=>{const v=m.dataset.id,x=e.find(S=>String(S.id)===String(v));x&&pu(x)})}),t.querySelectorAll(".btn-pay-debt-quick").forEach(m=>{m.addEventListener("click",()=>{const v=m.dataset.id,x=e.find(S=>String(S.id)===String(v));x&&ki(x)})})},It=(t=null)=>{var s,r,a;const e=!!t,n=`
    <div class="modal-header">
      <h3 class="modal-title">${e?"✏️ Edit Data Pelanggan":"➕ Tambah Pelanggan Baru"}</h3>
      <button class="modal-close" id="modal-cust-close" type="button">✕</button>
    </div>
    <div class="modal-body">
      <form id="cust-form" style="display:flex;flex-direction:column;gap:12px">
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Nama Lengkap *</label>
          <input type="text" class="input" id="cf-name" value="${T((t==null?void 0:t.name)||"")}" placeholder="e.g. Ibu Rina, Kantor PLN..." required maxlength="80">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Kategori</label>
            <select class="input" id="cf-category">
              <option value="Rumah Tangga" ${(t==null?void 0:t.category)==="Rumah Tangga"?"selected":""}>🏠 Rumah Tangga</option>
              <option value="Kantor/Instansi" ${(t==null?void 0:t.category)==="Kantor/Instansi"?"selected":""}>🏢 Kantor/Instansi</option>
              <option value="Warung/Reseller" ${(t==null?void 0:t.category)==="Warung/Reseller"?"selected":""}>🏪 Warung/Reseller</option>
              <option value="VIP" ${(t==null?void 0:t.category)==="VIP"?"selected":""}>🌟 VIP</option>
            </select>
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Nomor WhatsApp *</label>
            <input type="tel" class="input" id="cf-phone" value="${T((t==null?void 0:t.phone)||"")}" placeholder="081234567890" required maxlength="20">
          </div>
        </div>
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Alamat Lengkap / Patokan Pengantaran</label>
          <textarea class="input" id="cf-address" rows="2" placeholder="Jl. Anggrek No. 5 Blok C (Pagar Biru)..." maxlength="200">${T((t==null?void 0:t.address)||"")}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Limit Piutang (Rp)</label>
            <input type="number" class="input" id="cf-creditLimit" value="${(t==null?void 0:t.creditLimit)||0}" min="0" step="50000" placeholder="0 = Tanpa batas">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Galon Fisik Dipinjam</label>
            <input type="number" class="input" id="cf-galonLoaned" value="${(t==null?void 0:t.galonLoaned)||0}" min="0" step="1" placeholder="0">
          </div>
        </div>
        ${e?`
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Penyesuaian Saldo Piutang (Rp)</label>
            <input type="number" class="input" id="cf-totalDebt" value="${(t==null?void 0:t.totalDebt)||0}" min="0" step="1000" placeholder="0">
            <small style="font-size:11px;color:var(--text-muted)">Ubah jika ingin merekonsiliasi sisa hutang pelanggan ini secara manual.</small>
          </div>
        `:""}
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Catatan Khusus (Opsional)</label>
          <input type="text" class="input" id="cf-notes" value="${T((t==null?void 0:t.notes)||"")}" placeholder="e.g. Antar tiap hari Selasa & Jumat" maxlength="150">
        </div>
      </form>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="cust-cancel-btn" type="button">Batal</button>
      <button class="btn btn--primary" id="cust-save-btn" type="button">${e?"💾 Simpan Perubahan":"➕ Tambahkan Pelanggan"}</button>
    </div>
  `;oe(n,"modal-cust"),(s=document.getElementById("modal-cust-close"))==null||s.addEventListener("click",()=>z("modal-cust")),(r=document.getElementById("cust-cancel-btn"))==null||r.addEventListener("click",()=>z("modal-cust")),(a=document.getElementById("cust-save-btn"))==null||a.addEventListener("click",async()=>{var y,m,v;const i=document.getElementById("cf-name").value.trim(),o=document.getElementById("cf-phone").value.trim(),l=document.getElementById("cf-category").value,c=document.getElementById("cf-address").value.trim(),d=Math.max(0,Number(document.getElementById("cf-creditLimit").value)||0),u=Math.max(0,Number(document.getElementById("cf-galonLoaned").value)||0),p=document.getElementById("cf-notes").value.trim(),h=document.getElementById("cf-totalDebt"),g=h?Math.max(0,Number(h.value)||0):(t==null?void 0:t.totalDebt)||0;if(!i){(y=window.showToast)==null||y.call(window,"Nama pelanggan wajib diisi!","warning");return}const f={name:i,phone:o,category:l,address:c,creditLimit:d,galonLoaned:u,notes:p,totalOrders:(t==null?void 0:t.totalOrders)||0,totalSpent:(t==null?void 0:t.totalSpent)||0,totalDebt:g};e?(await Rt({...f,id:t.id}),(m=window.showToast)==null||m.call(window,"Data pelanggan berhasil diperbarui!","success")):(await Ha(f),(v=window.showToast)==null||v.call(window,"Pelanggan baru berhasil ditambahkan!","success")),z("modal-cust");const b=await se();k.setCustomers(b)})},pu=async t=>{var p,h,g,f;const e=await _e(),n=xi(t,e),s=(t.phone||"").replace(/\D/g,""),r=s.startsWith("08")?"62"+s.slice(1):s;let a=0,i=0;n.forEach(b=>{a+=Number(b.total||0),b.paymentMethod==="debt"&&(Number(b.remainingDebt)||0)>0&&(i+=Number(b.remainingDebt||0))});const o=Math.max(Number(t.totalSpent||0),a),l=Math.max(Number(t.totalDebt||0),i),c=Math.max(Number(t.totalOrders||0),n.length),d=encodeURIComponent(`Halo *${t.name}*, ini pengingat dari *${((p=k.state.settings)==null?void 0:p.shopName)||"Blue Mountain"}* terkait sisa piutang Anda sebesar *${_(l)}*. Terima kasih!`),u=`
    <div class="modal-header">
      <div>
        <h3 class="modal-title">👤 Profil Pelanggan 360°</h3>
        <p style="margin:2px 0 0;font-size:12px;color:var(--text-secondary)">${T(t.name)} &bull; ${T(t.category||"Rumah Tangga")}</p>
      </div>
      <button class="modal-close" id="drawer-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="max-height:75vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px">
      <!-- Quick Info Bar -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;background:rgba(0,0,0,0.02);padding:12px;border-radius:10px">
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Transaksi</div>
          <div style="font-size:16px;font-weight:900;color:var(--blue-600)">${c} kali</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Belanja (LTV)</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-success)">${_(o)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Sisa Piutang</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-danger)">${_(l)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Galon Dipinjam</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-warning)">🪣 ${t.galonLoaned||0} buah</div>
        </div>
      </div>

      <!-- Detail Info -->
      <div style="font-size:13px;line-height:1.6">
        <div><strong>📍 Alamat:</strong> ${T(t.address||"-")}</div>
        <div><strong>📞 WhatsApp:</strong> ${T(t.phone||"-")}</div>
        <div><strong>💳 Limit Kredit:</strong> ${t.creditLimit>0?_(t.creditLimit):"Tanpa batas"}</div>
        ${t.notes?`<div><strong>📝 Catatan:</strong> ${T(t.notes)}</div>`:""}
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${l>0?`
          <button class="btn btn--primary" id="btn-drawer-pay-debt" style="font-size:12px;display:inline-flex;align-items:center;gap:4px;font-weight:700">
            💰 Bayar / Pelunasan Hutang (${_(l)})
          </button>
        `:""}
        ${r?`
          <a href="https://wa.me/${r}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px">
            💬 Chat WhatsApp
          </a>
        `:""}
        ${r&&l>0?`
          <a href="https://wa.me/${r}?text=${d}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;font-weight:700">
            📲 Kirim Tagihan WhatsApp
          </a>
        `:""}
      </div>

      <!-- Order History List -->
      <div style="margin-top:8px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px">
          <h4 style="margin:0;font-size:14px;font-weight:800">📋 Riwayat Pembelian (${n.length})</h4>
          ${n.length>0?'<span style="font-size:11px;color:var(--text-muted)">⇄ Geser horizontal jika di HP</span>':""}
        </div>
        ${n.length===0?`
          <div style="font-size:12px;color:var(--text-muted);text-align:center;padding:20px;border:1px dashed var(--card-border);border-radius:10px">
            Belum ada data transaksi individual yang terhubung.
          </div>
        `:`
          <div style="border:1px solid var(--card-border);border-radius:10px;overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="table" style="width:100%;min-width:540px;font-size:12px;margin-bottom:0">
              <thead>
                <tr style="background:rgba(0,0,0,0.02)">
                  <th style="padding:8px 12px;white-space:nowrap">Invoice</th>
                  <th style="padding:8px 12px;white-space:nowrap">Tanggal</th>
                  <th style="padding:8px 12px;text-align:right;white-space:nowrap">Total</th>
                  <th style="padding:8px 12px;text-align:center;white-space:nowrap">Status / Metode</th>
                  <th style="padding:8px 12px;text-align:right;white-space:nowrap">Sisa Hutang</th>
                </tr>
              </thead>
              <tbody>
                ${n.slice(0,20).map(b=>{const y=Number(b.remainingDebt)||0;return`
                    <tr style="border-bottom:1px solid var(--card-border)">
                      <td style="padding:8px 12px;font-weight:700;white-space:nowrap">${T(b.invoiceNo)}</td>
                      <td style="padding:8px 12px;white-space:nowrap">${Re(new Date(b.date))}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:700;white-space:nowrap">${_(b.total)}</td>
                      <td style="padding:8px 12px;text-align:center;white-space:nowrap">
                        <span class="badge" style="font-size:10px;text-transform:uppercase">${T(b.paymentStatus||b.paymentMethod)}</span>
                      </td>
                      <td style="padding:8px 12px;text-align:right;white-space:nowrap">
                        ${y>0?`
                          <strong style="color:var(--color-danger)">${_(y)}</strong>
                        `:'<span style="color:var(--color-success)">Lunas ✅</span>'}
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end">
      <button class="btn btn--secondary" id="drawer-ok-btn" type="button">Tutup</button>
    </div>
  `;oe(u,"modal-cust-360"),(h=document.getElementById("drawer-close-btn"))==null||h.addEventListener("click",()=>z("modal-cust-360")),(g=document.getElementById("drawer-ok-btn"))==null||g.addEventListener("click",()=>z("modal-cust-360")),(f=document.getElementById("btn-drawer-pay-debt"))==null||f.addEventListener("click",()=>{z("modal-cust-360"),ki(t)})},ki=async t=>{var i,o,l,c;const e=await _e(),s=xi(t,e).filter(d=>d.paymentMethod==="debt"&&(Number(d.remainingDebt)||0)>0),r=Math.max(Number(t.totalDebt||0),s.reduce((d,u)=>d+(Number(u.remainingDebt)||0),0));if(r<=0){(i=window.showToast)==null||i.call(window,"Pelanggan ini tidak memiliki sisa piutang.","info");return}const a=`
    <div class="modal-header">
      <h3 class="modal-title">💰 Pembayaran Piutang: ${T(t.name)}</h3>
      <button class="modal-close" id="pcd-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);padding:12px 16px;border-radius:10px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase">Total Sisa Piutang</div>
          <div style="font-size:22px;font-weight:900;color:var(--color-danger);margin-top:2px">${_(r)}</div>
        </div>
        <div style="font-size:12px;color:var(--text-secondary)">
          ${s.length>0?`${s.length} transaksi berjalan`:"Pencatatan saldo CRM"}
        </div>
      </div>

      <div>
        <label class="form-label" style="font-size:12px;font-weight:700">Jumlah Pembayaran / Cicilan (Rp) *</label>
        <input type="number" class="input" id="pcd-amount" min="1" max="${r}" value="${r}"
               style="font-size:16px;font-weight:800;color:var(--text-primary);padding:10px" autofocus>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:6px">
        <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="${r}">
          Pelunasan Penuh (${_(r)})
        </button>
        ${r>1e4?`
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="10000">Rp 10.000</button>
        `:""}
        ${r>2e4?`
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="20000">Rp 20.000</button>
        `:""}
        ${r>5e4?`
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="50000">Rp 50.000</button>
        `:""}
      </div>

      <div>
        <label class="form-label" style="font-size:12px;font-weight:700">Catatan Pembayaran</label>
        <input type="text" class="input" id="pcd-note" placeholder="e.g. Pembayaran tunai / transfer pelunasan" value="Pembayaran piutang pelanggan">
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="pcd-cancel-btn" type="button">Batal</button>
      <button class="btn btn--primary" id="pcd-submit-btn" type="button" style="font-weight:700">
        ✅ Catat Pembayaran
      </button>
    </div>
  `;oe(a,"modal-pay-customer-debt"),(o=document.getElementById("pcd-close-btn"))==null||o.addEventListener("click",()=>z("modal-pay-customer-debt")),(l=document.getElementById("pcd-cancel-btn"))==null||l.addEventListener("click",()=>z("modal-pay-customer-debt")),document.querySelectorAll(".pcd-quick-amt").forEach(d=>{d.addEventListener("click",()=>{const u=document.getElementById("pcd-amount");u&&(u.value=d.dataset.amt)})}),(c=document.getElementById("pcd-submit-btn"))==null||c.addEventListener("click",async()=>{var p,h,g,f,b,y;const d=Number((p=document.getElementById("pcd-amount"))==null?void 0:p.value)||0,u=((g=(h=document.getElementById("pcd-note"))==null?void 0:h.value)==null?void 0:g.trim())||"Pembayaran piutang";if(d<=0||d>r){(f=window.showToast)==null||f.call(window,`Jumlah pembayaran harus antara Rp 1 dan ${_(r)}`,"warning");return}try{let m=d;const v=new Date().toISOString(),x=[...s].sort(($,C)=>new Date($.date)-new Date(C.date));for(const $ of x){if(m<=0)break;const C=Number($.remainingDebt)||0,K=Math.min(m,C),j=(Number($.paidAmount)||0)+K,P=Math.max(0,C-K),F=P===0?"paid":"partial",J=($.debtPayments||[]).length+1,Z=P===0?`${u} (Pelunasan/LUNAS ✅)`:`${u} (Cicilan #${J})`,R=[...$.debtPayments||[],{date:v,amount:K,note:Z}],U={...$,paidAmount:j,remainingDebt:P,paymentStatus:F,debtPayments:R};await sn(U),k.updateTransaction($.id,U),m-=K}const w=(await se()).find($=>String($.id)===String(t.id))||t;w.totalDebt=Math.max(0,(Number(w.totalDebt)||0)-d),await Rt(w);const E=await se();k.setCustomers(E),z("modal-pay-customer-debt"),(b=window.showToast)==null||b.call(window,`Pembayaran ${_(d)} untuk ${t.name} berhasil dicatat!`,"success")}catch(m){(y=window.showToast)==null||y.call(window,"Gagal mencatat pembayaran hutang: "+(m.message||"Error"),"error")}})};let Fs="",qn="Semua",En=null,Qr=[];const fu=async()=>{const[t,e]=await Promise.all([be(),se()]);k.setProducts(t),k.setCustomers(e),_i(),En&&En.abort(),En=new AbortController,Qr.forEach(n=>n()),Qr=[k.on("cart:change",Si),k.on("products:change",()=>ln()),k.on("selectedCustomer:change",()=>rt()),k.on("customers:change",()=>rt())],bu(En.signal)},_i=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
    <div class="pos-layout">
      <!-- Left: Products -->
      <div class="pos-left">
        <div class="pos-toolbar">
          <div class="pos-search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" class="pos-search" id="pos-search"
              placeholder="Cari produk..." maxlength="60" autocomplete="off">
          </div>
          <button class="btn btn--primary btn--sm" id="btn-manual-item"
            style="padding:8px 14px;height:38px;border-radius:var(--radius-lg);white-space:nowrap;font-weight:700;box-shadow:0 2px 8px rgba(37,99,235,0.25)">
            ➕ Item Manual
          </button>
          <div class="category-pills" id="category-pills"></div>
        </div>
        <div class="product-grid" id="product-grid"></div>
      </div>

      <!-- Right: Cart -->
      <div class="pos-right">
        <div class="cart-header">
          <div class="flex items-center gap-2">
            <span style="font-size:18px">🛒</span>
            <span class="cart-title">Keranjang</span>
          </div>
          <span class="cart-count" id="cart-count">0</span>
        </div>

        <div class="customer-row-wrapper" id="customer-row-container" style="border-bottom:1px solid var(--border-subtle);position:relative"></div>

        <div class="cart-items" id="cart-items">
          <div class="cart-empty">
            <div class="cart-empty__icon">🛒</div>
            <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="discount-row">
            <span style="font-size:13px;color:var(--text-secondary);flex:1">💳 Diskon (Rp)</span>
            <input type="number" class="discount-input" id="discount-input"
              value="${k.state.discount||""}" min="0" max="99999999" placeholder="0" inputmode="numeric">
          </div>
          <div class="cart-summary-row" id="tax-row" style="display:none">
            <span class="label">Pajak</span>
            <span class="value" id="tax-amount">Rp 0</span>
          </div>
          <div class="cart-total-row">
            <span class="cart-total-label">TOTAL</span>
            <span class="cart-total-amount" id="cart-total">Rp 0</span>
          </div>
          <div class="payment-buttons">
            <button class="btn-pay btn-pay--cash" id="btn-pay-cash">
              <span class="btn-pay__icon">💵</span>
              <span class="btn-pay__label">Tunai</span>
            </button>
            <button class="btn-pay btn-pay--transfer" id="btn-pay-transfer">
              <span class="btn-pay__icon">📲</span>
              <span class="btn-pay__label">Transfer</span>
            </button>
            <button class="btn-pay btn-pay--debt" id="btn-pay-debt">
              <span class="btn-pay__icon">📋</span>
              <span class="btn-pay__label">Hutang</span>
            </button>
          </div>
          <button class="btn-clear-cart" id="btn-clear-cart">🗑️ Kosongkan Keranjang</button>
        </div>
      </div>
    </div>
  `,sr(),ln(),rt(),Si()},gu=()=>["Semua",...new Set(k.state.products.map(t=>t.category))],sr=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=gu().map(e=>`
    <button class="cat-pill ${e===qn?"active":""}"
      data-cat="${T(e)}">${T(e)}</button>
  `).join(""))},ln=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=k.state.products;if(qn!=="Semua"&&(e=e.filter(n=>n.category===qn)),Fs){const n=Fs.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(n)||s.sku&&s.sku.toLowerCase().includes(n))}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(n=>{const s=n.image?`<img src="${T(n.image)}" class="product-card__thumb" alt="${T(n.name)}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;margin-bottom:2px">`:`<div class="product-card__emoji">${n.emoji||"📦"}</div>`;return`
      <div class="product-card" data-id="${n.id}" role="button" tabindex="0"
        aria-label="${T(n.name)} — ${_(n.price)}">
        <span class="product-card__sku" style="font-size:9px;font-weight:700;color:var(--text-muted);background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:4px;padding:1px 4px;margin-bottom:2px">${T(n.sku||`BM-${n.id}`)}</span>
        ${s}
        <div class="product-card__name">${T(n.name)}</div>
        <div class="product-card__price">${_(n.price)}</div>
        <div class="product-card__unit">per ${T(n.unit)}</div>
      </div>
    `}).join(""),t.querySelectorAll(".product-card").forEach(n=>{const s=()=>{const r=n.dataset.id,a=k.state.products.find(i=>String(i.id)===String(r));a&&(k.addToCart(a),n.style.transform="scale(0.94)",setTimeout(()=>{n.style.transform=""},120))};n.addEventListener("click",s),n.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),s())})})},Si=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),n=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),r=document.getElementById("tax-row"),a=document.getElementById("customer-name"),i=document.getElementById("discount-input");if(a&&!a.matches(":focus")&&(a.value=k.state.customerName||""),i&&!i.matches(":focus")&&(i.value=k.state.discount||""),!t)return;const o=k.state.cart;if(e){const l=e.textContent;e.textContent=k.cartCount,l!==String(k.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(n&&(n.textContent=_(k.total)),r&&s&&(k.tax>0?(r.style.display="flex",s.textContent=_(k.tax)):r.style.display="none"),!o.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=o.map(l=>{const c=l.product.image?`<img src="${l.product.image}" style="width:20px;height:20px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:4px">`:`${l.product.emoji||""} `;return`
      <div class="cart-item" data-pid="${l.product.id}">
        <div class="cart-item__info">
          <div class="cart-item__name">${c}${T(l.product.name)} <span style="font-size:10px;color:var(--text-muted)">(${T(l.product.sku||`BM-${l.product.id}`)})</span></div>
          <div class="cart-item__price">${_(l.product.price)} / ${T(l.product.unit)}</div>
        </div>
        <div class="cart-item__controls">
          <div class="cart-item__subtotal">${_(l.product.price*l.qty)}</div>
          <div class="qty-controls">
            <button class="qty-btn remove" data-action="remove" data-pid="${l.product.id}" title="Hapus">🗑</button>
            <button class="qty-btn" data-action="dec" data-pid="${l.product.id}">−</button>
            <span class="qty-value">${l.qty}</span>
            <button class="qty-btn" data-action="inc" data-pid="${l.product.id}">+</button>
          </div>
        </div>
      </div>
    `}).join(""),t.querySelectorAll("[data-action]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.pid,d=l.dataset.action,u=k.state.cart.find(p=>String(p.product.id)===String(c));u&&(d==="inc"?k.setQty(u.product.id,u.qty+1):d==="dec"?k.setQty(u.product.id,u.qty-1):d==="remove"&&k.removeFromCart(u.product.id))})})},mu=()=>{const t=`
    <div class="modal-header">
      <span class="modal-title">🏷️ Input Item / Harga Manual</span>
      <button class="modal-close" id="mi-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <label class="input-label" for="mi-name">Nama Produk / Jasa <span style="color:red">*</span></label>
        <input type="text" class="input" id="mi-name" placeholder="e.g. Servis Pompa, Galon Khusus, Ongkir..." maxlength="80" autocomplete="off">
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px">
        <div class="input-group">
          <label class="input-label" for="mi-price">Harga per Satuan (Rp) <span style="color:red">*</span></label>
          <input type="number" class="input" id="mi-price" placeholder="15000" min="0" max="999999999" step="500" inputmode="numeric">
        </div>
        <div class="input-group">
          <label class="input-label" for="mi-qty">Jumlah (Qty)</label>
          <input type="number" class="input" id="mi-qty" value="1" min="1" max="999" inputmode="numeric">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px">
        <div class="input-group">
          <label class="input-label" for="mi-unit">Satuan</label>
          <input type="text" class="input" id="mi-unit" value="pcs" placeholder="pcs, galon, botol, kali..." maxlength="20">
        </div>
        <div class="input-group">
          <label class="input-label" for="mi-category">Kategori</label>
          <select class="input" id="mi-category">
            <option value="Lainnya">Lainnya</option>
            <option value="Galon">Galon</option>
            <option value="Botol">Botol</option>
            <option value="Layanan">Layanan</option>
          </select>
        </div>
      </div>

      <div class="input-group" style="margin-top:10px">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">
          ${["🏷️","💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🫙","🧊"].map((e,n)=>`
            <button type="button" class="emoji-pick-mi ${n===0?"emoji-pick--active":""}"
              data-emoji="${e}"
              style="font-size:24px;width:38px;height:38px;border-radius:8px;border:2px solid ${n===0?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${e}</button>
          `).join("")}
        </div>
        <input type="hidden" id="mi-emoji" value="🏷️">
      </div>

      <div style="margin-top:14px;padding:10px 12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);display:flex;align-items:center;gap:10px">
        <input type="checkbox" id="mi-save-catalog" style="width:18px;height:18px;cursor:pointer">
        <label for="mi-save-catalog" style="font-size:13px;font-weight:600;color:var(--text-primary);cursor:pointer">
          💾 Simpan juga ke Katalog Produk permanen
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="mi-cancel">Batal</button>
      <button class="btn btn--primary" id="mi-save">🛒 Tambah ke Keranjang</button>
    </div>
  `;oe(t,"manual-item-modal"),setTimeout(()=>{var e,n,s,r;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>z("manual-item-modal")),(n=document.getElementById("mi-cancel"))==null||n.addEventListener("click",()=>z("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.style.borderColor="var(--border-subtle)",i.classList.remove("emoji-pick--active")}),a.style.borderColor="var(--blue-400)",a.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=a.dataset.emoji})}),(r=document.getElementById("mi-save"))==null||r.addEventListener("click",async()=>{var h,g,f,b,y,m,v;const a=(h=document.getElementById("mi-name"))==null?void 0:h.value.trim(),i=(g=document.getElementById("mi-price"))==null?void 0:g.value,o=parseFloat(i)||0,l=Math.max(1,parseInt((f=document.getElementById("mi-qty"))==null?void 0:f.value)||1),c=((b=document.getElementById("mi-unit"))==null?void 0:b.value.trim())||"pcs",d=((y=document.getElementById("mi-category"))==null?void 0:y.value)||"Lainnya",u=((m=document.getElementById("mi-emoji"))==null?void 0:m.value)||"🏷️",p=(v=document.getElementById("mi-save-catalog"))==null?void 0:v.checked;if(!a){window.showToast("Nama produk wajib diisi!","warning");return}if(i===""||o<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(p){const x=await qa({name:a,price:o,unit:c,category:d,emoji:u,stock:999}),S=await be();k.setProducts(S);const w=S.find(E=>E.id===x)||{id:x,name:a,price:o,unit:c,category:d,emoji:u};k.addToCart(w,l),window.showToast(`Product "${a}" ditambahkan ke katalog & keranjang`,"success")}else{const x={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:a,price:o,unit:c,category:d,emoji:u};k.addToCart(x,l),window.showToast(`"${a}" ditambahkan ke keranjang`,"success")}z("manual-item-modal")}catch{window.showToast("Gagal menambahkan item manual!","error")}})},0)},bu=t=>{document.addEventListener("click",e=>{const n=e.target.closest(".cat-pill");if(n){qn=n.dataset.cat,sr(),ln();return}if(e.target.closest("#btn-manual-item")){mu();return}if(e.target.closest("#btn-pay-cash")){if(!k.state.cart.length){window.showToast("Keranjang kosong!","warning");return}xs("cash")}if(e.target.closest("#btn-pay-transfer")){if(!k.state.cart.length){window.showToast("Keranjang kosong!","warning");return}xs("transfer")}if(e.target.closest("#btn-pay-debt")){if(!k.state.cart.length){window.showToast("Keranjang kosong!","warning");return}xs("debt")}e.target.closest("#btn-clear-cart")&&k.state.cart.length&&(k.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{var n;if(e.target.id==="pos-search"&&(Fs=e.target.value.trim(),ln()),e.target.id==="discount-input"&&k.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"){const s=e.target.value.trim().toLowerCase();k.setCustomerName(e.target.value);const r=document.getElementById("cust-autocomplete-dropdown");if(!r)return;if(!s){r.style.display="none";return}const a=(k.state.customers||[]).filter(i=>(i.name||"").toLowerCase().includes(s)||(i.phone||"").includes(s)).slice(0,6);if(a.length===0){r.innerHTML=`
          <div style="padding:12px;font-size:12px;color:#64748b;display:flex;justify-content:space-between;align-items:center;background:#ffffff">
            <span>Pelanggan belum terdaftar</span>
            <button type="button" class="btn btn--sm btn--primary" id="btn-dropdown-quick-add" style="font-size:11px;padding:3px 10px;font-weight:700">
              ➕ Tambahkan
            </button>
          </div>
        `,r.style.display="block",(n=r.querySelector("#btn-dropdown-quick-add"))==null||n.addEventListener("click",()=>{r.style.display="none",It({name:e.target.value.trim()})});return}r.innerHTML=a.map(i=>`
        <div class="cust-option" data-id="${i.id}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:12px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;transition:background 100ms ease">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;color:#1e293b">${T(i.name)} <span class="badge" style="font-size:10px;font-weight:700;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px">${T(i.category||"Umum")}</span></div>
            <div style="font-size:11px;color:#64748b;margin-top:2px">📱 ${T(i.phone||"-")} ${i.address?`&bull; 📍 ${T(i.address)}`:""}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:8px">
            ${i.totalDebt>0?`<span style="color:#dc2626;font-weight:800;font-size:11px;display:block">Hutang: ${_(i.totalDebt)}</span>`:""}
            <span style="font-size:10px;color:#2563eb;font-weight:700">Pilih ➔</span>
          </div>
        </div>
      `).join(""),r.style.display="block",r.querySelectorAll(".cust-option").forEach(i=>{i.addEventListener("mouseenter",()=>{i.style.background="#f8fafc"}),i.addEventListener("mouseleave",()=>{i.style.background="#ffffff"}),i.addEventListener("click",()=>{const o=i.dataset.id,l=k.state.customers.find(c=>String(c.id)===String(o));l&&k.setSelectedCustomer(l),r.style.display="none",rt()})})}},{signal:t}),document.addEventListener("click",e=>{const n=document.getElementById("cust-autocomplete-dropdown");n&&!e.target.closest("#customer-row-container")&&(n.style.display="none")},{signal:t})},rt=()=>{var n,s,r,a;const t=document.getElementById("customer-row-container");if(!t)return;const e=k.state.selectedCustomer;e?(t.innerHTML=`
      <div class="selected-customer-chip" style="display:flex;align-items:center;justify-content:space-between;background:#eff6ff;border:1.5px solid #93c5fd;border-radius:10px;padding:8px 12px;margin:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <span style="font-size:18px;flex-shrink:0">👤</span>
          <div style="min-width:0">
            <div style="font-weight:800;font-size:13px;color:#1e3a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${T(e.name)} <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:6px;font-weight:700">${T(e.category||"Umum")}</span>
            </div>
            <div style="font-size:11px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              📱 ${T(e.phone||"-")} ${e.totalDebt>0?`&bull; <span style="color:#dc2626;font-weight:800">Hutang: ${_(e.totalDebt)}</span>`:""}
            </div>
          </div>
        </div>
        <button type="button" id="btn-clear-selected-cust" title="Kosongkan / Ganti Pelanggan" style="border-radius:50%;width:26px;height:26px;min-width:26px;padding:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#dc2626;background:#fee2e2;border:1px solid #fca5a5;cursor:pointer">
          ✕
        </button>
      </div>
    `,(n=t.querySelector("#btn-clear-selected-cust"))==null||n.addEventListener("click",()=>{k.setSelectedCustomer(null),k.setCustomerName(""),rt()})):(t.innerHTML=`
      <div style="padding:8px 12px;display:flex;align-items:center;gap:6px;position:relative">
        <span style="font-size:16px;flex-shrink:0">👤</span>
        <div style="position:relative;flex:1;min-width:0">
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Cari nama / HP pelanggan..." maxlength="80" autocomplete="off"
            value="${T(k.state.customerName||"")}"
            style="width:100%;padding:6px 24px 6px 8px;font-size:12px;border:1px solid var(--border-default);border-radius:8px">
          ${k.state.customerName?`
            <button type="button" id="btn-clear-typed-name" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);border:none;background:transparent;color:#94a3b8;cursor:pointer;font-size:12px;padding:2px">✕</button>
          `:""}
        </div>
        <button type="button" class="btn btn--sm btn--secondary" id="btn-pick-cust" title="Pilih dari Daftar Pelanggan" style="padding:5px 8px;font-size:11px;font-weight:700;white-space:nowrap;border-radius:6px;display:flex;align-items:center;gap:3px">
          👥 Pilih
        </button>
        <button type="button" class="btn btn--sm btn--primary" id="btn-quick-add-cust" title="Tambah Pelanggan Baru" style="padding:5px 8px;font-size:11px;font-weight:700;white-space:nowrap;border-radius:6px;display:flex;align-items:center;gap:3px">
          ➕ Baru
        </button>

        <!-- Dropdown with 100% SOLID OPAQUE WHITE background and high z-index -->
        <div id="cust-autocomplete-dropdown" style="display:none;position:absolute;left:10px;right:10px;top:100%;background:#ffffff !important;border:2px solid #2563eb;border-radius:10px;box-shadow:0 14px 32px rgba(0,0,0,0.28);z-index:99999;max-height:220px;overflow-y:auto"></div>
      </div>
    `,(s=t.querySelector("#btn-clear-typed-name"))==null||s.addEventListener("click",()=>{k.setCustomerName(""),rt()}),(r=t.querySelector("#btn-pick-cust"))==null||r.addEventListener("click",()=>{yu()}),(a=t.querySelector("#btn-quick-add-cust"))==null||a.addEventListener("click",()=>{It()}))},yu=()=>{var o,l,c;const t=k.state.customers||[];let e="";const n=d=>{const u=d.trim().toLowerCase(),p=t.filter(h=>!u||(h.name||"").toLowerCase().includes(u)||(h.phone||"").includes(u)||(h.category||"").toLowerCase().includes(u));return p.length===0?`
        <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">
          Pelanggan tidak ditemukan.<br>
          <button type="button" class="btn btn--primary btn--sm" id="btn-picker-add-new" style="margin-top:10px">
            ➕ Tambah Pelanggan "${T(d)}"
          </button>
        </div>
      `:`
      <div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;padding-right:4px">
        ${p.map(h=>`
          <div class="picker-cust-row" data-id="${h.id}" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 120ms ease">
            <div style="min-width:0;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <strong style="font-size:13px;color:#1e293b">${T(h.name)}</strong>
                <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px;font-weight:700">${T(h.category||"Umum")}</span>
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px">
                📱 ${T(h.phone||"-")} ${h.address?`&bull; 📍 ${T(h.address)}`:""}
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:10px">
              ${h.totalDebt>0?`<div style="font-size:11px;font-weight:800;color:#dc2626">Hutang: ${_(h.totalDebt)}</div>`:""}
              <button type="button" class="btn btn--sm btn--primary" style="padding:3px 10px;font-size:11px;font-weight:700;margin-top:2px">
                Pilih
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `},s=`
    <div class="modal-header">
      <h3 class="modal-title">👥 Pilih Pelanggan</h3>
      <button class="modal-close" id="modal-picker-close">✕</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="position:relative">
        <input type="text" class="input" id="picker-search" placeholder="Ketik nama, no HP, atau alamat..." autofocus style="width:100%;padding-left:34px;border-radius:10px;font-size:13px">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--text-muted)">🔍</span>
      </div>
      <div id="picker-list-container">
        ${n("")}
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:space-between;align-items:center">
      <button class="btn btn--primary btn--sm" id="picker-create-btn">➕ Pelanggan Baru</button>
      <button class="btn btn--secondary btn--sm" id="picker-cancel-btn">Tutup</button>
    </div>
  `;oe(s,"modal-customer-picker");const r=document.getElementById("picker-list-container"),a=document.getElementById("picker-search"),i=()=>{var d;r==null||r.querySelectorAll(".picker-cust-row").forEach(u=>{u.addEventListener("mouseenter",()=>{u.style.background="#f0f7ff",u.style.borderColor="#93c5fd"}),u.addEventListener("mouseleave",()=>{u.style.background="#ffffff",u.style.borderColor="#e2e8f0"}),u.addEventListener("click",()=>{const p=u.dataset.id,h=t.find(g=>String(g.id)===String(p));h&&(k.setSelectedCustomer(h),z("modal-customer-picker"),rt())})}),(d=r==null?void 0:r.querySelector("#btn-picker-add-new"))==null||d.addEventListener("click",()=>{var u;z("modal-customer-picker"),It({name:(u=a==null?void 0:a.value)==null?void 0:u.trim()})})};i(),a==null||a.addEventListener("input",d=>{e=d.target.value,r&&(r.innerHTML=n(e),i())}),(o=document.getElementById("modal-picker-close"))==null||o.addEventListener("click",()=>z("modal-customer-picker")),(l=document.getElementById("picker-cancel-btn"))==null||l.addEventListener("click",()=>z("modal-customer-picker")),(c=document.getElementById("picker-create-btn"))==null||c.addEventListener("click",()=>{z("modal-customer-picker"),It()})},vu=async()=>{const t=document.getElementById("view-pos");(!t||!t.querySelector(".pos-layout"))&&_i();const e=await be();k.setProducts(e),ln(),sr()},wu=(t,e=128,n=.85)=>new Promise((s,r)=>{if(!t||!t.type.startsWith("image/"))return r(new Error("File harus berupa gambar (PNG/JPEG/WebP)"));const a=new FileReader;a.onerror=()=>r(new Error("Gagal membaca file")),a.onload=i=>{const o=new Image;o.onerror=()=>r(new Error("Gagal memuat gambar")),o.onload=()=>{let{width:l,height:c}=o;l>c?l>e&&(c=Math.round(c*e/l),l=e):c>e&&(l=Math.round(l*e/c),c=e);const d=document.createElement("canvas");d.width=l,d.height=c,d.getContext("2d").drawImage(o,0,0,l,c);let p="";try{p=d.toDataURL("image/webp",n)}catch{}(!p||!p.startsWith("data:image/webp"))&&(p=d.toDataURL("image/jpeg",n)),s(p)},o.src=i.target.result},a.readAsDataURL(t)}),xu=(t=[])=>{let e=0;for(const s of t)if(s.sku&&typeof s.sku=="string"){const r=s.sku.match(/^BM-(\d+)$/i);if(r){const a=parseInt(r[1],10);a>e&&(e=a)}}const n=e?e+1:t.length+1;return`BM-${String(n).padStart(3,"0")}`},Zr=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],ku=["Galon","Botol","Layanan","Lainnya"];let ks=null;const _u=async()=>{ks&&ks(),ks=k.on("products:change",()=>{const t=document.getElementById("view-products");t&&t.classList.contains("active")&&cn()}),await cn()},cn=async()=>{const t=document.getElementById("view-products"),e=await be();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(n=>Su(n)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,Eu()},Su=t=>{const e=t.image?`<img src="${T(t.image)}" class="product-thumb" alt="${T(t.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;border:1.5px solid var(--border-subtle)">`:`<span class="product-emoji-large">${t.emoji||"📦"}</span>`;return`
    <div class="product-manage-card" data-id="${t.id}">
      <div class="product-manage-card__header">
        ${e}
        <div class="product-manage-card__info">
          <div class="product-manage-card__name">${T(t.name)}</div>
          <div class="product-manage-card__cat" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="badge badge--blue">${T(t.category)}</span>
            <span class="badge" style="background:var(--bg-glass);border:1px solid var(--border-default);font-size:10px;font-weight:700;color:var(--text-secondary)">${T(t.sku||`BM-${t.id}`)}</span>
          </div>
        </div>
      </div>
      <div class="product-manage-card__price">
        ${_(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${T(t.unit)}</span>
        ${t.cost>0?`<div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-top:2px">Modal: ${_(t.cost)} &bull; Margin: ${_(t.price-t.cost)}</div>`:""}
      </div>
      <div class="product-manage-card__actions">
        <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `},Eu=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",async()=>{const n=await be();ea(null,n)}),t==null||t.addEventListener("click",async n=>{const s=n.target.closest('[data-action="edit"]'),r=n.target.closest('[data-action="delete"]');if(s){const a=parseInt(s.dataset.id),i=await be(),o=i.find(l=>l.id===a);o&&ea(o,i)}if(r){const a=parseInt(r.dataset.id);Tu(a)}})},ea=(t=null,e=[])=>{const n=!!t,s=(t==null?void 0:t.sku)||xu(e);let r=(t==null?void 0:t.image)||null;const a=`
    <div class="modal-header">
      <span class="modal-title">${n?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Nama Produk <span style="color:red">*</span></label>
          <input type="text" class="input" id="pf-name"
            value="${T((t==null?void 0:t.name)||"")}"
            placeholder="e.g. Air Mineral 19 L"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group">
          <label class="input-label">Kode / SKU Produk</label>
          <input type="text" class="input" id="pf-sku"
            value="${T(s)}"
            placeholder="BM-001"
            maxlength="30" autocomplete="off">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Harga Jual (Rp) <span style="color:red">*</span></label>
          <input type="number" class="input" id="pf-price"
            value="${(t==null?void 0:t.price)||""}" min="0" max="999999999"
            placeholder="5000" inputmode="numeric">
        </div>
        <div class="input-group">
          <label class="input-label">Harga Modal / HPP (Rp)</label>
          <input type="number" class="input" id="pf-cost"
            value="${(t==null?void 0:t.cost)||""}" min="0" max="999999999"
            placeholder="2500" inputmode="numeric">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Satuan</label>
          <input type="text" class="input" id="pf-unit"
            value="${T((t==null?void 0:t.unit)||"galon")}"
            placeholder="galon, botol, pcs..."
            maxlength="20">
        </div>
        <div class="input-group">
          <label class="input-label">Stok Fisik Saat Ini</label>
          <input type="number" class="input" id="pf-stock"
            value="${(t==null?void 0:t.stock)??999}" min="0" max="999999"
            placeholder="100">
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">Kategori</label>
        <select class="input" id="pf-category">
          ${ku.map(i=>`<option value="${T(i)}" ${(t==null?void 0:t.category)===i?"selected":""}>${T(i)}</option>`).join("")}
        </select>
      </div>

      <!-- Icon / Image Selector -->
      <div class="input-group">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <label class="input-label" style="margin:0">Ikon / Foto Produk</label>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn btn--sm ${r?"btn--secondary":"btn--primary"}" id="btn-tab-emoji" style="padding:3px 8px;font-size:11px">😀 Emoji</button>
            <button type="button" class="btn btn--sm ${r?"btn--primary":"btn--secondary"}" id="btn-tab-upload" style="padding:3px 8px;font-size:11px">📷 Upload Foto</button>
          </div>
        </div>

        <!-- Emoji Selector Box -->
        <div id="box-emoji-picker" style="display:${r?"none":"block"}">
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
            ${Zr.map(i=>`
              <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===i&&!r?"emoji-pick--active":""}"
                data-emoji="${i}"
                style="font-size:22px;width:38px;height:38px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===i&&!r?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${i}</button>
            `).join("")}
          </div>
        </div>

        <!-- Photo Upload Box -->
        <div id="box-upload-picker" style="display:${r?"block":"none"};margin-top:6px">
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg-elevated);border-radius:10px;border:1.5px dashed var(--border-default)">
            <div id="pf-img-preview" style="width:48px;height:48px;border-radius:8px;background:white;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid var(--border-subtle);flex-shrink:0">
              ${r?`<img src="${r}" style="width:100%;height:100%;object-fit:cover">`:'<span style="font-size:20px;opacity:0.4">🖼️</span>'}
            </div>
            <div style="flex:1">
              <label for="pf-file-input" class="btn btn--secondary btn--sm" style="cursor:pointer;display:inline-block">
                📁 Pilih Gambar (PNG/JPG)
              </label>
              <input type="file" id="pf-file-input" accept="image/png, image/jpeg, image/webp" style="display:none">
              <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Otomatis di-compress WebP < 10KB</div>
            </div>
            ${r?'<button type="button" class="btn btn--danger btn--sm" id="btn-remove-img" style="padding:4px 8px">✕</button>':""}
          </div>
        </div>

        <input type="hidden" id="pf-emoji" value="${T((t==null?void 0:t.emoji)||Zr[0])}">
      </div>

      <div class="input-group">
        <label class="input-label">Stok</label>
        <input type="number" class="input" id="pf-stock"
          value="${(t==null?void 0:t.stock)??999}" min="0" max="999999" inputmode="numeric">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="pf-cancel">Batal</button>
      <button class="btn btn--primary" id="pf-save">
        ${n?"💾 Simpan":"➕ Tambah"}
      </button>
    </div>
  `;oe(a,"product-form"),setTimeout(()=>{var p,h,g,f;(p=document.getElementById("pf-close"))==null||p.addEventListener("click",()=>z("product-form")),(h=document.getElementById("pf-cancel"))==null||h.addEventListener("click",()=>z("product-form"));const i=document.getElementById("btn-tab-emoji"),o=document.getElementById("btn-tab-upload"),l=document.getElementById("box-emoji-picker"),c=document.getElementById("box-upload-picker"),d=document.getElementById("pf-file-input"),u=document.getElementById("pf-img-preview");i==null||i.addEventListener("click",()=>{l.style.display="block",c.style.display="none",i.className="btn btn--sm btn--primary",o.className="btn btn--sm btn--secondary"}),o==null||o.addEventListener("click",()=>{l.style.display="none",c.style.display="block",o.className="btn btn--sm btn--primary",i.className="btn btn--sm btn--secondary"}),d==null||d.addEventListener("change",async b=>{var m;const y=(m=b.target.files)==null?void 0:m[0];if(y)try{r=await wu(y,128,.85),u.innerHTML=`<img src="${T(r)}" style="width:100%;height:100%;object-fit:cover">`,window.showToast("Foto produk berhasil dimuat","success")}catch(v){window.showToast(v.message||"Gagal memproses gambar","error")}}),(g=document.getElementById("btn-remove-img"))==null||g.addEventListener("click",()=>{r=null,u.innerHTML='<span style="font-size:20px;opacity:0.4">🖼️</span>',i.click()}),document.querySelectorAll(".emoji-pick").forEach(b=>{b.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(y=>{y.style.borderColor="var(--border-subtle)",y.classList.remove("emoji-pick--active")}),b.style.borderColor="var(--blue-400)",b.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=b.dataset.emoji,r=null})}),(f=document.getElementById("pf-save"))==null||f.addEventListener("click",async()=>{var $,C,K,j,P,F,J,Z;const b=($=document.getElementById("pf-name"))==null?void 0:$.value.trim(),y=((C=document.getElementById("pf-sku"))==null?void 0:C.value.trim())||s,m=parseFloat((K=document.getElementById("pf-price"))==null?void 0:K.value)||0,v=parseFloat((j=document.getElementById("pf-cost"))==null?void 0:j.value)||0,x=((P=document.getElementById("pf-unit"))==null?void 0:P.value.trim())||"pcs",S=((F=document.getElementById("pf-category"))==null?void 0:F.value)||"Lainnya",w=((J=document.getElementById("pf-emoji"))==null?void 0:J.value)||"📦",E=parseInt((Z=document.getElementById("pf-stock"))==null?void 0:Z.value)||0;if(!b){window.showToast("Nama produk wajib diisi!","warning");return}if(m<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{const R={name:b,sku:y,price:m,cost:v,unit:x,category:S,emoji:w,image:r,stock:E};n?(await od({...t,...R}),window.showToast(`Produk [${y}] berhasil diperbarui`,"success")):(await qa(R),window.showToast(`Produk [${y}] berhasil ditambahkan`,"success")),z("product-form");const U=await be();k.setProducts(U),await cn()}catch{window.showToast("Gagal menyimpan produk!","error")}})},0)},Tu=t=>{oe(`
    <div class="modal-header">
      <span class="modal-title">🗑️ Hapus Produk</span>
      <button class="modal-close" id="dc-close">✕</button>
    </div>
    <div class="modal-body">
      <p style="color:var(--text-secondary);font-size:14px">
        Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="dc-cancel">Batal</button>
      <button class="btn btn--danger" id="dc-confirm">🗑️ Hapus</button>
    </div>
  `,"delete-confirm"),setTimeout(()=>{var n,s,r;(n=document.getElementById("dc-close"))==null||n.addEventListener("click",()=>z("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>z("delete-confirm")),(r=document.getElementById("dc-confirm"))==null||r.addEventListener("click",async()=>{try{await ld(t);const a=await be();k.setProducts(a),z("delete-confirm"),await cn(),window.showToast("Produk dihapus","success")}catch{window.showToast("Gagal menghapus produk","error")}})},0)},ta=t=>{if(t==null)return'""';const e=String(t);return e.includes('"')||e.includes(",")||e.includes(`
`)||e.includes("\r")?`"${e.replace(/"/g,'""')}"`:`"${e}"`},rr=(t,e,n)=>{const s=e.map(ta).join(","),r=n.map(c=>c.map(ta).join(",")),a="\uFEFF"+[s,...r].join(`\r
`),i=new Blob([a],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),l=document.createElement("a");l.setAttribute("href",o),l.setAttribute("download",t.endsWith(".csv")?t:`${t}.csv`),l.style.visibility="hidden",document.body.appendChild(l),l.click(),document.body.removeChild(l),setTimeout(()=>URL.revokeObjectURL(o),1e3)};let _s=null,Ge=he(),Ve=he(),ie=1;const jt=10,Au=async()=>{_s&&_s(),_s=k.on("transactions:change",t=>{tt(t)}),await Ei()},Ei=async()=>{const t=await _e();k.setTransactions(t),tt(t)},Ti=t=>{const e=t.paymentMethod,n=t.paymentStatus;return e==="transfer"&&n==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&n==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':n==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':n==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},Ai=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":T(t.paymentMethod)||"—",bt=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Pu=t=>[...t].sort((n,s)=>new Date(s.date)-new Date(n.date)).filter(n=>{const s=n.dateKey||(n.date?n.date.split("T")[0]:"");return Ge&&Ve?s>=Ge&&s<=Ve:Ge?s>=Ge:Ve?s<=Ve:!0}),tt=t=>{const e=document.getElementById("view-transactions");if(!e)return;const n=he(),s=Pu(t),a=t.filter(p=>p.dateKey===n).reduce((p,h)=>h.paymentStatus==="paid"&&h.paymentMethod==="cash"||h.paymentStatus==="transfer_confirmed"?p+h.total:h.paymentMethod==="debt"?p+(h.paidAmount||0):p,0),i=t.reduce((p,h)=>p+(h.remainingDebt||0),0),o=t.filter(p=>p.paymentStatus==="transfer_pending").reduce((p,h)=>p+h.total,0),l=Math.max(1,Math.ceil(s.length/jt));ie>l&&(ie=l),ie<1&&(ie=1);const c=s.length===0?0:(ie-1)*jt+1,d=Math.min(ie*jt,s.length),u=s.slice((ie-1)*jt,ie*jt);e.innerHTML=`
    <div class="section-header" style="flex-wrap:wrap;gap:12px">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} total (${s.length} terfilter)</span></h2>
      
      <!-- Date Range Filter Toolbar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">Dari:</span>
          <input type="date" class="input" id="tx-filter-start" style="width:auto;padding:6px 10px;font-size:12px" value="${Ge}">
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">s/d</span>
          <input type="date" class="input" id="tx-filter-end" style="width:auto;padding:6px 10px;font-size:12px" value="${Ve}">
        </div>
        <button class="btn btn--primary btn--sm" id="tx-btn-apply" style="padding:6px 14px;font-weight:700">Tampilkan</button>
        <button class="btn btn--secondary btn--sm" id="tx-btn-today" style="padding:6px 10px;font-size:11px">Hari Ini</button>
        <button class="btn btn--secondary btn--sm" id="tx-btn-all" style="padding:6px 10px;font-size:11px">Semua</button>
        <button class="btn btn--secondary btn--sm" id="tx-btn-export-csv" style="padding:6px 12px;font-size:11px;font-weight:700">📊 Export Excel/CSV</button>
      </div>
    </div>

    <!-- Summary strip -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kas Hari Ini</div>
        <div style="font-size:15px;font-weight:800;color:#16a34a">${_(a)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${_(i)}</div>
      </div>
      ${o>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${_(o)}</div>
      </div>`:""}
    </div>

    ${t.length===0?`
      <div class="card" style="padding:40px">
        <div class="empty-state">
          <div class="empty-state__icon">📋</div>
          <div class="empty-state__text">Belum ada transaksi.<br>Mulai jual dari menu Kasir POS.</div>
        </div>
      </div>
    `:`
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table" id="tx-table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Item</th>
                <th>Total</th>
                <th>Metode</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="tx-tbody">
              ${Cu(u)}
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls (10 rows/page) -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">
            Menampilkan <strong>${c}-${d}</strong> dari <strong>${s.length}</strong> transaksi
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <button class="btn btn--secondary btn--sm" id="tx-prev-page" ${ie<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              ◀ Sebelumnya
            </button>
            <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
              Hal ${ie} / ${l}
            </span>
            <button class="btn btn--secondary btn--sm" id="tx-next-page" ${ie>=l?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              Berikutnya ▶
            </button>
          </div>
        </div>
      </div>
    `}
  `,Iu(t)},Cu=t=>t.length?t.map(e=>{var n;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${T(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${Re(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${T(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((n=e.items)==null?void 0:n.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${_(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${_(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${Ai(e)}</span></td>
      <td>${Ti(e)}</td>
      <td>
        <div style="display:flex;gap:4px;flex-wrap:wrap;min-width:120px">
          <button class="btn btn--secondary btn--sm" data-action="detail" data-id="${e.id}" style="font-size:11px;padding:4px 8px">
            👁️
          </button>
          ${e.paymentStatus==="transfer_pending"?`
          <button class="btn btn--sm" data-action="confirm-transfer" data-id="${e.id}"
            style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer">
            ✅ Konfirmasi
          </button>`:""}
          ${(e.paymentMethod==="debt"||e.paymentStatus==="partial"||e.paymentStatus==="unpaid")&&(e.remainingDebt||0)>0?`
          <button class="btn btn--sm" data-action="pay-debt" data-id="${e.id}"
            style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer">
            💰 Cicil
          </button>`:""}
          <button class="btn btn--sm" data-action="delete" data-id="${e.id}"
            ${bt(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${bt(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${bt(e)?"var(--color-danger-border)":"#d1d5db"};color:${bt(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${bt(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk rentang tanggal ini</td></tr>',Iu=t=>{var e,n,s,r,a,i,o;(e=document.getElementById("tx-btn-apply"))==null||e.addEventListener("click",()=>{var l,c;Ge=((l=document.getElementById("tx-filter-start"))==null?void 0:l.value)||"",Ve=((c=document.getElementById("tx-filter-end"))==null?void 0:c.value)||"",ie=1,tt(t)}),(n=document.getElementById("tx-btn-today"))==null||n.addEventListener("click",()=>{const l=new Date().toISOString().split("T")[0];Ge=l,Ve=l,ie=1,tt(t)}),(s=document.getElementById("tx-btn-all"))==null||s.addEventListener("click",()=>{Ge="",Ve="",ie=1,tt(t)}),(r=document.getElementById("tx-btn-export-csv"))==null||r.addEventListener("click",()=>{var u;const l=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status","Subtotal","Diskon","Pajak","Total","Dibayar","Kembalian","Sisa Piutang"],c=filtered.map(p=>[Re(new Date(p.date)),p.invoiceNo||"",p.cashier||"Admin",p.customerName||"-",p.paymentMethod||"cash",p.paymentStatus||"paid",p.subtotal||0,p.discount||0,p.tax||0,p.total||0,p.paid||0,p.change||0,p.remainingDebt||0]),d=he();rr(`Transaksi-${d}.csv`,l,c),(u=window.showToast)==null||u.call(window,"✅ Riwayat transaksi berhasil diekspor ke Excel/CSV!","success")}),(a=document.getElementById("tx-prev-page"))==null||a.addEventListener("click",()=>{ie>1&&(ie--,tt(t))}),(i=document.getElementById("tx-next-page"))==null||i.addEventListener("click",()=>{ie++,tt(t)}),(o=document.getElementById("tx-table"))==null||o.addEventListener("click",async l=>{const c=l.target.closest("[data-action]");if(!c)return;const d=parseInt(c.dataset.id),u=c.dataset.action,p=t.find(h=>h.id===d);if(u==="detail"){p&&Ru(p);return}if(u==="confirm-transfer"){if(!p||!confirm(`Konfirmasi transfer ${_(p.total)} dari ${T(p.customerName||"pelanggan")} sudah diterima?`))return;try{const h={...p,paymentStatus:"transfer_confirmed",paidAmount:p.total,confirmedAt:new Date().toISOString()};await sn(h),k.updateTransaction(d,{paymentStatus:"transfer_confirmed",paidAmount:p.total,confirmedAt:h.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}return}if(u==="pay-debt"){p&&$u(p);return}if(u==="delete"){if(!p)return;if(!bt(p)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${T(p.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{if(await dd(d),k.removeTransaction(d),p.customerId||p.customerName){const g=(await se()).find(f=>p.customerId&&String(f.id)===String(p.customerId)||(f.name||"").trim().toLowerCase()===(p.customerName||"").trim().toLowerCase());if(g){g.totalOrders=Math.max(0,(Number(g.totalOrders)||1)-1),g.totalSpent=Math.max(0,(Number(g.totalSpent)||p.total)-p.total),p.paymentMethod==="debt"&&(Number(p.remainingDebt)||0)>0&&(g.totalDebt=Math.max(0,(Number(g.totalDebt)||0)-Number(p.remainingDebt))),await Rt(g);const f=await se();k.setCustomers(f)}}window.showToast("Transaksi dihapus","success")}catch{window.showToast("Gagal menghapus","error")}}})},$u=t=>{var s;const e=t.remainingDebt||0,n=`
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${T(t.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${T(t.customerName||"—")}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#991b1b;font-weight:700;text-transform:uppercase">Total Tagihan</div>
          <div style="font-size:16px;font-weight:900;color:#dc2626">${_(t.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${_(e)}</div>
        </div>
      </div>

      ${(s=t.debtPayments)!=null&&s.length?`
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${t.debtPayments.map(r=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(r.date).toLocaleDateString("id-ID")} — ${T(r.note||"-")}</span>
            <strong style="color:#16a34a">+${_(r.amount)}</strong>
          </div>
        `).join("")}
      </div>`:""}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${_(e)})</label>
        <input type="number" class="input" id="cicil-amount"
          value="${e}" min="1" max="${e}" step="1000" inputmode="numeric">
      </div>
      <div class="input-group" style="margin-top:10px">
        <label class="input-label" for="cicil-note">📝 Catatan (opsional)</label>
        <input type="text" class="input" id="cicil-note"
          placeholder="Cicilan ke-2, dll" maxlength="100">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="debt-cancel">Batal</button>
      <button class="btn btn--success" id="debt-save">💾 Simpan Cicilan</button>
    </div>
  `;oe(n,"debt-modal"),setTimeout(()=>{var r,a,i;(r=document.getElementById("debt-x"))==null||r.addEventListener("click",()=>z("debt-modal")),(a=document.getElementById("debt-cancel"))==null||a.addEventListener("click",()=>z("debt-modal")),(i=document.getElementById("debt-save"))==null||i.addEventListener("click",async()=>{var b,y,m;const o=parseFloat((b=document.getElementById("cicil-amount"))==null?void 0:b.value)||0;if(o<=0||o>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${_(e)}`,"warning");return}const l=(t.paidAmount||0)+o,c=Math.max(0,e-o),d=c===0?"paid":"partial",u=(t.debtPayments||[]).length+1,p=c===0?`Pelunasan (#${u}/LUNAS ✅)`:`Cicilan #${u}`,h=((m=(y=document.getElementById("cicil-note"))==null?void 0:y.value)==null?void 0:m.trim())||p,g=[...t.debtPayments||[],{date:new Date().toISOString(),amount:o,note:h}],f={...t,paidAmount:l,remainingDebt:c,paymentStatus:d,debtPayments:g};try{if(await sn(f),k.updateTransaction(t.id,{paidAmount:l,remainingDebt:c,paymentStatus:d,debtPayments:g}),t.customerId||t.customerName){const x=(await se()).find(S=>t.customerId&&String(S.id)===String(t.customerId)||(S.name||"").trim().toLowerCase()===(t.customerName||"").trim().toLowerCase());if(x){x.totalDebt=Math.max(0,(Number(x.totalDebt)||0)-o),await Rt(x);const S=await se();k.setCustomers(S)}}z("debt-modal"),window.showToast(c===0?"🎉 Hutang LUNAS!":`Cicilan ${_(o)} dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)},Ru=t=>{var a;const e=ns(t,k.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),hi(t);const n=nr(t),s=((a=k.state.settings)==null?void 0:a.printerPaper)||"58mm",r=`
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${T(t.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${Ti(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${T(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${Ai(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${ss(t,s)}</div>

      ${(t.remainingDebt||0)>0?`
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${_(t.remainingDebt)}</div>
      </div>`:""}

      <div style="display:grid;grid-template-columns:${t.change>0?"1fr 1fr":"1fr"};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${_(t.total)}</div>
        </div>
        ${t.change>0?`
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${_(t.change)}</div>
        </div>`:""}
      </div>
    </div>

    <div class="modal-footer" style="flex-wrap:wrap;gap:8px;justify-content:flex-end">
      <button class="btn btn--secondary" id="td-close-btn">✕ Tutup</button>
      <button class="btn btn--secondary" id="btn-save-png">🖼️ PNG / Share</button>
      <button class="btn btn--secondary" id="btn-td-whatsapp" style="font-size:11px;display:flex;align-items:center;gap:4px;background:#dcfce7;border:1.5px solid #86efac;color:#166534;font-weight:700">
        💬 WhatsApp
      </button>
      <button class="btn btn--secondary" id="btn-td-ble" style="font-size:11px">📲 Web BLE</button>
      <button class="btn btn--secondary" id="btn-td-usb" style="font-size:11px">🔌 USB</button>
      <button class="btn btn--secondary" id="btn-td-btapp" style="font-size:11px;display:flex;align-items:center;gap:4px">
        🌐 BT App
      </button>
      <a class="btn btn--secondary" href="${n}" style="text-decoration:none;font-size:11px;display:flex;align-items:center;gap:4px">
        ⚡ RawBT
      </a>
      <button class="btn btn--success" id="btn-tx-print-direct" style="font-weight:700">
        🖨️ Cetak (${s})
      </button>
    </div>
  `;oe(r,"tx-detail"),setTimeout(()=>{var i,o,l,c,d,u,p,h;(i=document.getElementById("td-x"))==null||i.addEventListener("click",()=>z("tx-detail")),(o=document.getElementById("td-close-btn"))==null||o.addEventListener("click",()=>z("tx-detail")),(l=document.getElementById("btn-tx-print-direct"))==null||l.addEventListener("click",()=>{on(t)}),(c=document.getElementById("btn-td-ble"))==null||c.addEventListener("click",async()=>{try{window.showToast("Koneksi Bluetooth...","info"),await vi(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(g){window.showToast(g.message||"Gagal Bluetooth","error")}}),(d=document.getElementById("btn-td-usb"))==null||d.addEventListener("click",async()=>{try{window.showToast("Koneksi USB...","info"),await wi(t)}catch(g){window.showToast(g.message||"Gagal USB","error")}}),(u=document.getElementById("btn-td-whatsapp"))==null||u.addEventListener("click",()=>{mi(t)}),(p=document.getElementById("btn-td-btapp"))==null||p.addEventListener("click",()=>{yi(t)}),(h=document.getElementById("btn-save-png"))==null||h.addEventListener("click",()=>{bi(t)})},0)};let Ss=null,In=null,$n=null,Ke="semua";const Lu=async()=>{Ss&&Ss(),Ss=k.on("transactions:change",t=>{Wt(t)}),await ar()},ar=async()=>{const t=await _e();k.setTransactions(t),Wt(t)},Wt=t=>{var j,P,F,J,Z;const e=document.getElementById("view-reports");if(!e)return;const n=he(),s=Wc(),r=t.filter(R=>R.dateKey===n),a=r.reduce((R,U)=>R+U.total,0);let i=0;t.forEach(R=>{(R.items||[]).forEach(U=>{var A;const ee=Number((A=U.product)==null?void 0:A.cost)||0;i+=ee*(Number(U.qty)||1)})});const o=t.reduce((R,U)=>R+U.total,0),l=Math.max(0,o-i),c=o>0?(l/o*100).toFixed(1):0,d=r.length,u=t.filter(R=>{var U;return(U=R.dateKey)==null?void 0:U.startsWith(s)}),p=u.reduce((R,U)=>R+U.total,0),h=t.reduce((R,U)=>R+U.total,0),g=r.filter(R=>R.paymentMethod==="cash").reduce((R,U)=>R+U.total,0),f=r.filter(R=>R.paymentMethod==="transfer"&&R.paymentStatus==="transfer_confirmed").reduce((R,U)=>R+U.total,0),b=r.filter(R=>R.paymentMethod==="transfer"&&R.paymentStatus==="transfer_pending").reduce((R,U)=>R+U.total,0),y=r.filter(R=>R.paymentMethod==="debt").reduce((R,U)=>R+U.total,0),m=t.reduce((R,U)=>{for(const ee of U.debtPayments||[])ee.date&&ee.date.split("T")[0]===n&&(R+=ee.amount||0);return R},0),v=g+f+m,x=t.reduce((R,U)=>R+(U.remainingDebt||0),0);t.filter(R=>R.paymentStatus==="transfer_pending").reduce((R,U)=>R+U.total,0);const S=Du(r),w=ju(t);In&&(In.destroy(),In=null),$n&&($n.destroy(),$n=null);let E=[...t];Ke==="cash"&&(E=E.filter(R=>R.paymentMethod==="cash")),Ke==="transfer"&&(E=E.filter(R=>R.paymentMethod==="transfer")),Ke==="debt"&&(E=E.filter(R=>R.paymentMethod==="debt"));const $=E.sort((R,U)=>new Date(U.date)-new Date(R.date)),C=Math.max(1,Math.ceil($.length/10));typeof _reportPage>"u"&&(window._reportPage=1),window._reportPage>C&&(window._reportPage=C),window._reportPage<1&&(window._reportPage=1);const K=$.slice((window._reportPage-1)*10,window._reportPage*10);e.innerHTML=`
    <div class="section-header">
      <div>
        <h2 class="section-title">📊 Laporan Penjualan &amp; Keuangan Real</h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Analisis mendalam omzet, kas masuk, piutang, cicilan, &amp; performa produk
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn--secondary btn--sm" id="btn-refresh-reports">🔄 Refresh</button>
        <button class="btn btn--secondary btn--sm" id="btn-export-pdf-report">📄 Export PDF</button>
        <button class="btn btn--primary btn--sm" id="btn-export-csv-report" style="font-weight:700">📊 Export Excel / CSV</button>
      </div>
    </div>

    <!-- Stats Grid: Financial KPIs -->
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      <div class="stat-card" style="border-left:4px solid var(--blue-600)">
        <span class="stat-card__icon">📊</span>
        <div class="stat-card__value" style="color:var(--blue-700)">${_(a)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${d} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${_(v)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${_(m)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${_(x)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${_(p)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${u.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${_(h)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${t.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #059669">
        <span class="stat-card__icon">📈</span>
        <div class="stat-card__value" style="color:#059669">${_(l)}</div>
        <div class="stat-card__label">Estimasi Laba Kotor (Gross Profit)</div>
        <div class="stat-card__trend" style="color:#059669;font-weight:700">Margin: ${c}% (HPP: ${_(i)})</div>
      </div>
    </div>

    <!-- Chart: Last 7 Days -->
    <div class="chart-container">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div class="chart-title" style="margin-bottom:0">📈 Tren Omzet (7 Hari Terakhir)</div>
        <div style="font-size:11px;color:var(--text-muted)">Grafik Penjualan Harian</div>
      </div>
      <div style="position:relative;height:200px">
        <canvas id="chart-bar"></canvas>
      </div>
    </div>

    <!-- Payment breakdown + Top products -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:16px">

      <!-- Payment Breakdown & Real Cash -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          💳 Komposisi Penerimaan Hari Ini
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block"></span>
              💵 Tunai
            </span>
            <strong style="color:var(--color-success)">${_(g)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${_(f)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${_(m)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${_(y)}</strong>
          </div>

          ${b>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${_(b)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${g+f+y+m>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${S.length?S.slice(0,7).map((R,U)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${U+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${T(R.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${R.qty}x</span>
            </div>
          `).join(""):'<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px">Belum ada penjualan hari ini</div>'}
      </div>
    </div>

    <!-- Detailed Ledger & Transaction Analysis Table -->
    <div class="card card--elevated" style="overflow:hidden;padding:0">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle)">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:800;text-transform:uppercase;letter-spacing:.05em">
          📋 Analisis Detail Penjualan &amp; Status Pelunasan (${$.length} data)
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="cat-pill ${Ke==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${Ke==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${Ke==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${Ke==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
        </div>
      </div>

      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
        <table class="data-table" id="report-tx-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Tanggal &amp; Waktu</th>
              <th>Pelanggan</th>
              <th>Item Pembelian</th>
              <th>Total Tagihan</th>
              <th>Kas Terkumpul</th>
              <th>Sisa Piutang</th>
              <th>Skema &amp; Status</th>
            </tr>
          </thead>
          <tbody>
            ${Nu(K)}
          </tbody>
        </table>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">Hal ${window._reportPage} dari ${C}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--secondary btn--sm" id="rpt-prev" ${window._reportPage<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
          <button class="btn btn--secondary btn--sm" id="rpt-next" ${window._reportPage>=C?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
        </div>
      </div>
    </div>
  `,(j=document.getElementById("btn-refresh-reports"))==null||j.addEventListener("click",ar),(P=document.getElementById("btn-export-pdf-report"))==null||P.addEventListener("click",()=>Bu(t,n,s)),(F=document.getElementById("btn-export-csv-report"))==null||F.addEventListener("click",()=>{var A;const R=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status Pembayaran","Subtotal","Diskon","Pajak","Grand Total","Sisa Piutang"],U=$.map(N=>[Re(new Date(N.date)),N.invoiceNo||"",N.cashier||"Admin",N.customerName||"-",N.paymentMethod||"cash",N.paymentStatus||"paid",N.subtotal||0,N.discount||0,N.tax||0,N.total||0,N.remainingDebt||0]),ee=he();rr(`Laporan-Penjualan-${ee}.csv`,R,U),(A=window.showToast)==null||A.call(window,"✅ Laporan penjualan berhasil diekspor ke Excel/CSV!","success")}),(J=document.getElementById("rpt-prev"))==null||J.addEventListener("click",()=>{window._reportPage>1&&(window._reportPage--,Wt(t))}),(Z=document.getElementById("rpt-next"))==null||Z.addEventListener("click",()=>{window._reportPage++,Wt(t)}),document.querySelectorAll("[data-rpt-filter]").forEach(R=>{R.addEventListener("click",()=>{Ke=R.dataset.rptFilter,window._reportPage=1,Wt(t)})}),requestAnimationFrame(()=>Ou(w,g,f,y,m))},Nu=t=>t.length?t.map(e=>{const n=e.total||0;let s=0,r=0;e.paymentMethod==="cash"?s=n:e.paymentMethod==="transfer"?e.paymentStatus==="transfer_confirmed"?s=n:r=n:e.paymentMethod==="debt"&&(s=e.paidAmount||0,r=e.remainingDebt||0);const a=(e.items||[]).map(l=>{var c;return`${((c=l.product)==null?void 0:c.name)||"Item"} (${l.qty}x)`}).join(", "),i=e.paymentMethod==="debt"?r===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${_(r)}</span>`:e.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',o=e.paymentMethod==="cash"?"💵 Tunai":e.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${T(e.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${Re(new Date(e.date))}</td>
        <td><strong style="color:var(--text-primary)">${T(e.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${T(a)}">${T(a||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${_(n)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${_(s)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${r>0?_(r):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${o}</span> ${i}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>',Ou=async(t,e,n,s,r)=>{const{Chart:a,registerables:i}=await Nn(async()=>{const{Chart:d,registerables:u}=await import("./vendor-chart-BLYve-2S.js");return{Chart:d,registerables:u}},[],import.meta.url);a.register(...i);const o=document.getElementById("chart-bar");o&&(In=new a(o,{type:"bar",data:{labels:t.map(d=>d.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(d=>d.total),backgroundColor:t.map((d,u)=>u===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>" "+_(d.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:d=>_(d),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const l=document.getElementById("chart-donut"),c=e+n+s+r;l&&c>0&&($n=new a(l,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,n,s,r],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` ${d.label}: ${_(d.raw)}`}}}}}))},Bu=async(t,e,n)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:r}=await Nn(async()=>{const{jsPDF:w}=await import("./vendor-pdf-DV7uGGo9.js").then(E=>E.j);return{jsPDF:w}},[],import.meta.url),{default:a}=await Nn(async()=>{const{default:w}=await import("./jspdf.plugin.autotable-DwDmFVzo.js").then(E=>E.j);return{default:w}},__vite__mapDeps([0,1,2]),import.meta.url),i=new r({orientation:"portrait",unit:"mm",format:"a4"}),o=k.state.settings,l=i.internal.pageSize.getWidth();i.setFontSize(16),i.setFont("helvetica","bold"),i.text(o.shopName||"Blue Mountain Refilling Station",l/2,16,{align:"center"}),i.setFontSize(10),i.setFont("helvetica","normal"),i.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",l/2,22,{align:"center"}),i.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,l/2,27,{align:"center"});const c=t.filter(w=>w.dateKey===e),d=c.reduce((w,E)=>w+E.total,0),u=t.filter(w=>{var E;return(E=w.dateKey)==null?void 0:E.startsWith(n)}).reduce((w,E)=>w+E.total,0),p=t.reduce((w,E)=>w+E.total,0),h=c.filter(w=>w.paymentMethod==="cash").reduce((w,E)=>w+E.total,0),g=c.filter(w=>w.paymentMethod==="transfer"&&w.paymentStatus==="transfer_confirmed").reduce((w,E)=>w+E.total,0),f=t.reduce((w,E)=>{for(const $ of E.debtPayments||[])$.date&&$.date.split("T")[0]===e&&(w+=$.amount||0);return w},0),b=h+g+f,y=t.reduce((w,E)=>w+(E.remainingDebt||0),0);i.setFontSize(11),i.setFont("helvetica","bold"),i.text("1. Ringkasan Kinerja Keuangan",14,35);const m=[["Omzet Gross Hari Ini",_(d)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",_(b)],["Cicilan Piutang Terkumpul Hari Ini",_(f)],["Total Piutang Belum Lunas (Semua Pelanggan)",_(y)],["Omzet Bulan Ini",_(u)],["Total Omzet All-Time",_(p)],["Jumlah Transaksi Hari Ini",`${c.length} transaksi`]];a(i,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:m,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const v=i.lastAutoTable.finalY+10;i.setFontSize(11),i.setFont("helvetica","bold"),i.text("2. Rincian Riwayat Transaksi & Pelunasan",14,v);const x=[...t].sort((w,E)=>new Date(E.date)-new Date(w.date)).slice(0,80);a(i,{startY:v+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:x.map(w=>{let E=w.paymentMethod==="cash"?w.total:w.paymentMethod==="transfer"?w.paymentStatus==="transfer_confirmed"?w.total:0:w.paidAmount||0,$=w.paymentMethod==="debt"?w.remainingDebt||0:w.paymentStatus==="transfer_pending"?w.total:0;return[w.invoiceNo||"-",new Date(w.date).toLocaleDateString("id-ID"),w.customerName||"—",w.paymentMethod==="cash"?"Tunai":w.paymentMethod==="transfer"?"Transfer":"Hutang",_(w.total),_(E),$>0?_($):"—",w.paymentMethod==="debt"?$===0?"Lunas":"Cicilan":w.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const S=i.internal.getNumberOfPages();for(let w=1;w<=S;w++)i.setPage(w),i.setFontSize(8),i.setFont("helvetica","normal"),i.text(`Hal ${w} dari ${S} — ${o.shopName||"Blue Mountain POS"}`,l/2,i.internal.pageSize.getHeight()-8,{align:"center"});i.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch{window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},ju=t=>{const e=[];for(let n=6;n>=0;n--){const s=new Date;s.setDate(s.getDate()-n);const r=he(s),a=t.filter(o=>o.dateKey===r).reduce((o,l)=>o+l.total,0),i=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);e.push({key:r,label:i,total:a})}return e},Du=t=>{var n;const e={};for(const s of t)for(const r of s.items||[]){if(!((n=r==null?void 0:r.product)!=null&&n.name))continue;const a=r.product.name;e[a]=(e[a]||0)+r.qty}return Object.entries(e).map(([s,r])=>({name:s,qty:r})).sort((s,r)=>r.qty-s.qty)},Uu=async()=>{await Mu(),await Wn()},Mu=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","printerPaper","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const n of t){const s=await Js(n);s!==null&&(e[n]=s)}k.updateSettings(e)},Wn=async()=>{var c,d;const t=document.getElementById("view-settings"),e=k.state.settings,n="3.1.59",s="0d3f918",r="2026-09-07T09:28:23.044Z",a=new Date(r),i=new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"short",year:"numeric"}).format(a),o=new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(a),l=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Pengaturan</h2>
      <button class="btn btn--primary" id="btn-save-settings">💾 Simpan Semua</button>
    </div>

    <!-- Operator & Sesi Aktif -->
    <div class="settings-section">
      <div class="settings-section-header">👤 Operator & Sesi Kasir</div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Operator Saat Ini</div>
          <div class="settings-row__desc">Akun yang mengoperasikan kasir</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">
            ${T(((c=k.state.currentUser)==null?void 0:c.name)||"Belum Masuk")}
          </span>
          <span style="font-size: 11px; padding: 2px 8px; border-radius: 12px; background: rgba(37, 99, 235, 0.1); color: #2563eb; font-weight: 700; text-transform: uppercase;">
            ${T(((d=k.state.currentUser)==null?void 0:d.role)||"-")}
          </span>
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kontrol Sesi</div>
          <div class="settings-row__desc">Ganti kasir atau keluar dari sistem</div>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn btn--secondary" id="btn-settings-switch-op" style="font-size: 12px; font-weight: 600;">
            🔄 Beralih Operator
          </button>
          <button type="button" class="btn" id="btn-settings-logout" style="font-size: 12px; font-weight: 700; background: #fff1f2; border: 1.5px solid #fca5a5; color: #e11d48; cursor: pointer;">
            🚪 Keluar / Log Out
          </button>
        </div>
      </div>
    </div>

    <!-- Toko -->
    <div class="settings-section">
      <div class="settings-section-header">🏪 Informasi Toko</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Toko</div>
          <div class="settings-row__desc">Tampil di struk &amp; header</div>
        </div>
        <input type="text" class="input" id="set-shopName" value="${T(e.shopName||"")}" maxlength="80" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${T(e.shopAddress||"")}" maxlength="120" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${T(e.shopPhone||"")}" maxlength="20" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${T(e.cashierName||"Admin")}" maxlength="40" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Tarif Pajak (%)</div>
          <div class="settings-row__desc">0 = tidak ada pajak</div>
        </div>
        <input type="number" class="input" id="set-taxRate" value="${e.taxRate||0}" min="0" max="100" step="0.5" style="max-width:100px">
      </div>
    </div>

    <!-- Bank Transfer -->
    <div class="settings-section">
      <div class="settings-section-header">🏦 Info Transfer Bank</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Bank</div>
        </div>
        <input type="text" class="input" id="set-bankName" value="${T(e.bankName||"BCA")}" maxlength="30" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${T(e.bankNumber||"")}" maxlength="30" style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${T(e.bankHolder||"")}" maxlength="60" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">Salin string QRIS dari BCA/Mandiri/Shopee/GoPay untuk diubah jadi Dynamic QRIS otomatis ber-nominal</div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:280px;font-size:11px" placeholder="0002010102112659...">${T(e.qrisNumber||"")}</textarea>
      </div>
    </div>

    <!-- Printer -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Thermal Printer Universal (48mm / 58mm / 80mm)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Ukuran Kertas Roll Thermal</div>
          <div class="settings-row__desc">Pilih ukuran roll kertas sesuai hardware printer kasir Anda</div>
        </div>
        <select class="input" id="set-printerPaper" style="max-width:260px">
          <option value="48mm" ${e.printerPaper==="48mm"?"selected":""}>48mm (EDC / Mini Portable Bluetooth)</option>
          <option value="58mm" ${!e.printerPaper||e.printerPaper==="58mm"?"selected":""}>58mm (Standar Mini POS Bluetooth)</option>
          <option value="80mm" ${e.printerPaper==="80mm"?"selected":""}>80mm (Thermal Besar / Kasir Desktop / Resto)</option>
        </select>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Uji Coba Cetak (Test Print Sesuai Ukuran)</div>
          <div class="settings-row__desc">Cetak struk sample untuk validasi kerapian format dan font margin</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn--secondary btn--sm" id="btn-test-48" style="font-weight:700">🧪 Test 48mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-58" style="font-weight:700">🧪 Test 58mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-80" style="font-weight:700">🧪 Test 80mm</button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Koneksi Hardware</div>
          <div class="settings-row__desc">Petunjuk setup Bluetooth (BLE), Kabel USB (OTG), dan WiFi/LAN</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-printer-guide">📖 Lihat Panduan Hardware</button>
      </div>
    </div>

    <!-- PWA -->
    <div class="settings-section">
      <div class="settings-section-header">📱 Aplikasi PWA</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Install sebagai App</div>
          <div class="settings-row__desc">Tambahkan ke layar utama perangkat</div>
        </div>
        ${l?'<span class="badge badge--green">✅ App Terinstall</span>':'<button class="btn btn--primary btn--sm" id="btn-install-pwa">📲 Install</button>'}
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Standar Versi Aplikasi (SemVer 3-Digit)</div>
          <div class="settings-row__desc">Format: <strong>Major</strong> (Arsitektur) . <strong>Minor</strong> (Fitur Sedang) . <strong>Patch</strong> (Revisi Ringan)</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800;letter-spacing:0.02em">
            v${T(n)}${` (${T(s)})`}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            Build: ${T(i)} • ${T(o)}
          </div>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Hapus Cache</div>
          <div class="settings-row__desc">Reset service worker cache &amp; reload</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-clear-cache">🗑️ Clear Cache</button>
      </div>
    </div>

    <!-- Supabase Cloud Multi-Device Sync -->
    <div class="settings-section">
      <div class="settings-section-header">☁️ Sinkronisasi Realtime Cloud (Supabase)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Status Cloud Multi-Perangkat</div>
          <div class="settings-row__desc">Project: wiapnhpdgjbtkblowfig (Oceania Sydney)</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--green" style="font-size:12px;padding:6px 12px;font-weight:700">🟢 Terhubung ke Cloud</span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Otomatis sinkron ke semua HP/Laptop</div>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Skema Database Cloud (SQL)</div>
          <div class="settings-row__desc">Salin skema SQL lengkap tabel pelanggan &amp; sinkronisasi Realtime untuk Supabase SQL Editor</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-show-cloud-sql" style="white-space:nowrap">
          📋 Salin Skema SQL Cloud
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Sinkronkan Data Sekarang</div>
          <div class="settings-row__desc">Tarik dan dorong data transaksi, pelanggan &amp; produk terbaru secara manual</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-sync-cloud-now" style="white-space:nowrap">
          ⚡ Sinkronkan Sekarang
        </button>
      </div>
    </div>

    <!-- Backup & Restore Data (Sinkronisasi Antar Device) -->
    <div class="settings-section">
      <div class="settings-section-header">💾 Ekspor &amp; Impor Data (Sinkronisasi Antar Device)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📥 Ekspor Backup Lengkap (JSON)</div>
          <div class="settings-row__desc">Unduh seluruh produk, transaksi, cicilan, pengeluaran &amp; pengaturan ke file JSON. Kirim file ini ke device lain untuk sinkronisasi.</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-export-backup" style="background:#2563eb;white-space:nowrap">
          📥 Unduh Backup JSON
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📤 Impor / Pulihkan Data (JSON)</div>
          <div class="settings-row__desc">Pulihkan atau sinkronkan database dari file backup JSON perangkat lain.</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="file" id="input-import-backup" accept=".json,application/json" style="display:none">
          <button class="btn btn--secondary btn--sm" id="btn-trigger-import" style="white-space:nowrap">
            📤 Pilih File Backup
          </button>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="settings-section">
      <div class="settings-section-header" style="color:#fca5a5">⚠️ Zona Berbahaya</div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Reset Semua Data</div>
          <div class="settings-row__desc" style="color:var(--color-danger)">Hapus semua transaksi, pengeluaran, dan produk. Tidak bisa dibatalkan!</div>
        </div>
        <button class="btn btn--danger btn--sm" id="btn-reset-all">🗑️ Reset</button>
      </div>
    </div>
  `,zu()},zu=()=>{var t,e,n,s,r,a,i,o,l,c,d,u,p,h,g;(t=document.getElementById("btn-show-cloud-sql"))==null||t.addEventListener("click",()=>{var y,m,v;const f=`-- Jalankan kode ini di Supabase SQL Editor (https://supabase.com/dashboard/project/wiapnhpdgjbtkblowfig/sql):
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    category TEXT DEFAULT 'Rumah Tangga',
    total_orders NUMERIC DEFAULT 0,
    total_spent NUMERIC DEFAULT 0,
    total_debt NUMERIC DEFAULT 0,
    credit_limit NUMERIC DEFAULT 0,
    galon_loaned NUMERIC DEFAULT 0,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon all on customers" ON public.customers;
CREATE POLICY "Allow anon all on customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'customers'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
    END IF;
END $$;`,b=`
      <div class="modal-header">
        <h3 class="modal-title">☁️ Skema SQL Supabase (Tabel Pelanggan)</h3>
        <button class="modal-close" id="sql-modal-close" type="button">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size:12px;color:var(--text-secondary);margin:0 0 10px">
          Jalankan perintah SQL ini di menu <strong>SQL Editor</strong> dashboard Supabase Anda agar data pelanggan tersinkronisasi otomatis antar-perangkat (PC/HP/Tablet):
        </p>
        <textarea id="sql-code-area" readonly style="width:100%;height:180px;font-family:monospace;font-size:11px;padding:8px;border-radius:8px;border:1px solid var(--border-default);background:rgba(0,0,0,0.02);line-height:1.4">${f}</textarea>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:space-between;gap:8px">
        <button class="btn btn--primary btn--sm" id="btn-copy-sql">📋 Salin Perintah SQL</button>
        <button class="btn btn--secondary btn--sm" id="btn-close-sql">Tutup</button>
      </div>
    `;oe(b,"modal-sql"),(y=document.getElementById("sql-modal-close"))==null||y.addEventListener("click",()=>z("modal-sql")),(m=document.getElementById("btn-close-sql"))==null||m.addEventListener("click",()=>z("modal-sql")),(v=document.getElementById("btn-copy-sql"))==null||v.addEventListener("click",()=>{var x;(x=navigator.clipboard)==null||x.writeText(f).then(()=>{var S;(S=window.showToast)==null||S.call(window,"✅ Perintah SQL berhasil disalin ke clipboard!","success")})})}),(e=document.getElementById("btn-sync-cloud-now"))==null||e.addEventListener("click",async()=>{const f=document.getElementById("btn-sync-cloud-now");f&&(f.textContent="🔄 Menyinkronkan...",f.disabled=!0);try{await Ws(),window.showToast("✅ Data cloud berhasil disinkronkan!","success"),setTimeout(()=>Wn(),600)}catch(b){window.showToast("Gagal sinkron cloud: "+(b.message||"Error"),"error")}finally{f&&(f.textContent="⚡ Sinkronkan Sekarang",f.disabled=!1)}}),(n=document.getElementById("btn-export-backup"))==null||n.addEventListener("click",async()=>{const f=document.getElementById("btn-export-backup");f&&(f.textContent="⏳ Menyiapkan...",f.disabled=!0);try{const b=await gd(),y=JSON.stringify(b,null,2),m=new Blob([y],{type:"application/json;charset=utf-8"}),v=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),S=`Backup-KASIR-${(b.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${v}.json`,w=URL.createObjectURL(m),E=document.createElement("a");E.href=w,E.download=S,document.body.appendChild(E),E.click(),document.body.removeChild(E),setTimeout(()=>URL.revokeObjectURL(w),5e3),window.showToast("✅ File backup berhasil diunduh!","success")}catch(b){window.showToast("Gagal ekspor backup: "+(b.message||"Error"),"error")}finally{f&&(f.textContent="📥 Unduh Backup JSON",f.disabled=!1)}}),(s=document.getElementById("btn-trigger-import"))==null||s.addEventListener("click",()=>{var f;(f=document.getElementById("input-import-backup"))==null||f.click()}),(r=document.getElementById("input-import-backup"))==null||r.addEventListener("change",f=>{var m;const b=(m=f.target.files)==null?void 0:m[0];if(!b)return;const y=new FileReader;y.onload=async v=>{var x;try{const S=(x=v.target)==null?void 0:x.result,w=JSON.parse(S);if(!w.data||!w.data.products&&!w.data.transactions){window.showToast("Format file backup tidak valid!","error");return}const E=(w.data.products||[]).length,$=(w.data.customers||[]).length,C=(w.data.transactions||[]).length,K=(w.data.expenses||[]).length,j=w.exportedAt?new Date(w.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",P=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${T(w.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${j}
            </div>

            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:15px;font-weight:900;color:var(--blue-700)">${E}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pelanggan</div>
                <div style="font-size:15px;font-weight:900;color:#8b5cf6">${$}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:15px;font-weight:900;color:#16a34a">${C}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Beban</div>
                <div style="font-size:15px;font-weight:900;color:#dc2626">${K}</div>
              </div>
            </div>

            <div style="font-size:12px;font-weight:700;color:var(--text-primary);margin-bottom:8px">Pilih Mode Impor:</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="replace" checked style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>🔄 Timpa / Restore Penuh (Rekomendasi untuk Pindah HP)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Ganti seluruh database di device ini sama persis dengan file backup.</div>
                </div>
              </label>
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="merge" style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>➕ Gabung Data (Merge)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Tambahkan data dari file backup tanpa menghapus data lokal yang sudah ada.</div>
                </div>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn--secondary" id="imp-cancel">Batal</button>
            <button class="btn btn--success" id="imp-confirm">🚀 Pulihkan &amp; Sinkronkan</button>
          </div>
        `;oe(P,"import-confirm-modal"),setTimeout(()=>{var F,J,Z;(F=document.getElementById("imp-x"))==null||F.addEventListener("click",()=>z("import-confirm-modal")),(J=document.getElementById("imp-cancel"))==null||J.addEventListener("click",()=>z("import-confirm-modal")),(Z=document.getElementById("imp-confirm"))==null||Z.addEventListener("click",async()=>{var ee;const R=((ee=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:ee.value)||"replace",U=document.getElementById("imp-confirm");U&&(U.textContent="⏳ Memulihkan...",U.disabled=!0);try{await md(w,R);const[A,N,B,D]=await Promise.all([be(),se(),_e(),rn()]);k.setProducts(A),k.setCustomers(N),k.setTransactions(B),k.setExpenses(D),z("import-confirm-modal"),window.showToast("🎉 Data berhasil dipulihkan & sinkron!","success"),setTimeout(()=>Wn(),600)}catch(A){window.showToast("Gagal memulihkan data: "+A.message,"error")}})},0)}catch{window.showToast("File JSON rusak atau tidak terbaca!","error")}},y.readAsText(b),f.target.value=""}),(a=document.getElementById("btn-save-settings"))==null||a.addEventListener("click",async()=>{const f=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","printerPaper","qrisNumber"],b={};for(const y of f){const m=document.getElementById(`set-${y}`);m&&(b[y]=y==="taxRate"?parseFloat(m.value)||0:m.value.trim(),await Wa(y,b[y]))}k.updateSettings(b),window.showToast("Pengaturan berhasil disimpan","success")}),(i=document.getElementById("btn-settings-switch-op"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))}),(o=document.getElementById("btn-settings-logout"))==null||o.addEventListener("click",()=>{confirm("Keluar dari sesi operator kasir?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(l=document.getElementById("btn-test-48"))==null||l.addEventListener("click",()=>{vs("48mm")}),(c=document.getElementById("btn-test-58"))==null||c.addEventListener("click",()=>{vs("58mm")}),(d=document.getElementById("btn-test-80"))==null||d.addEventListener("click",()=>{vs("80mm")}),(u=document.getElementById("btn-printer-guide"))==null||u.addEventListener("click",()=>{Ku()}),(p=document.getElementById("btn-install-pwa"))==null||p.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(h=document.getElementById("btn-clear-cache"))==null||h.addEventListener("click",async()=>{try{if("caches"in window){const f=await caches.keys();await Promise.all(f.map(b=>caches.delete(b)))}if("serviceWorker"in navigator){const f=await navigator.serviceWorker.getRegistrations();for(const b of f)await b.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch{window.showToast("Gagal hapus cache","error")}}),(g=document.getElementById("btn-reset-all"))==null||g.addEventListener("click",async()=>{const f=prompt(`⚠️ KONFIRMASI PENGHAPUSAN PERMANEN

Tindakan ini akan menghapus SELURUH data lokal (transaksi, pelanggan, pengeluaran, dan produk).

Ketik kata "HAPUS" dengan huruf besar untuk melanjutkan:`);if(f==="HAPUS")try{await fd(),window.showToast("Semua data lokal berhasil dihapus. Memuat ulang...","error"),setTimeout(()=>window.location.reload(),1500)}catch{window.showToast("Gagal menghapus data","error")}else f!==null&&window.showToast("Penghapusan dibatalkan (kata sandi konfirmasi salah)","info")})},Ku=()=>{oe(`
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Lengkap Koneksi Printer Thermal (48/58/80mm)</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
        💡 <strong>Sistem Mendukung 4 Jalur Koneksi Hardware Sekaligus:</strong>
      </div>

      <h4 style="color:var(--text-primary);margin-bottom:6px">1. 🖨️ Universal Direct Print (Driver OS / Kabel USB / Spooler / AirPrint)</h4>
      <p style="font-size:12px;margin-bottom:6px">Metode paling universal untuk Windows, macOS, Android &amp; iOS. Otomatis menyesuaikan margin 0mm dan lebar roll (48mm/58mm/80mm).</p>

      <h4 style="color:var(--text-primary);margin-top:12px;margin-bottom:6px">2. 📲 Web Bluetooth (BLE Direct ESC/POS Tanpa Aplikasi)</h4>
      <p style="font-size:12px;margin-bottom:6px">Langsung mengirim binary ESC/POS ke printer Bluetooth dari browser Chrome / Edge di Android &amp; Laptop.</p>

      <h4 style="color:var(--text-primary);margin-top:12px;margin-bottom:6px">3. 🔌 WebUSB (Kabel USB OTG Direct)</h4>
      <p style="font-size:12px;margin-bottom:6px">Hubungkan kabel printer USB ke laptop atau HP via konverter OTG untuk cetak super cepat tanpa dialog spooler.</p>

      <h4 style="color:var(--text-primary);margin-top:12px;margin-bottom:6px">4. 🌐 Background Intent (RawBT &amp; Bluetooth Print App)</h4>
      <p style="font-size:12px;margin-bottom:6px">Khusus Android, struk dapat dilempar otomatis ke aplikasi background <strong>RawBT</strong> atau <strong>Bluetooth Print App</strong> untuk auto-cut dan cetak senyap.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti 👍</button>
    </div>
  `,"printer-guide"),setTimeout(()=>{var e,n;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>z("printer-guide")),(n=document.getElementById("pg-close2"))==null||n.addEventListener("click",()=>z("printer-guide"))},0)};let Es=null,Ts=null,As=null,kt=!1,Te=1,Ae=1,Pe=1;const Oe=10,Fu=async()=>{Es&&Es(),Ts&&Ts(),As&&As(),Es=k.on("transactions:change",()=>{kt||pe()}),Ts=k.on("expenses:change",()=>{kt||pe()}),As=k.on("customers:change",()=>{kt||pe()}),await pe()},pe=async()=>{if(!kt){kt=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,n,s]=await Promise.all([k.state.transactions.length?Promise.resolve(k.state.transactions):_e().then(P=>(k.setTransactions(P),P)),rn().then(P=>(k.setExpenses(P),P)),Js("modalAwal")]),r=parseFloat(s)||0;let a=0,i=0,o=0,l=0,c=0;for(const P of e)if(P.paymentMethod==="cash"&&(P.paymentStatus==="paid"||!P.paymentStatus)&&(a+=P.total),P.paymentMethod==="transfer"&&(P.paymentStatus==="transfer_confirmed"?i+=P.total:l+=P.total),P.paymentMethod==="debt"){for(const F of P.debtPayments||[])o+=F.amount;c+=P.remainingDebt||0}const d=a+i+o,u=n.reduce((P,F)=>P+(F.amount||0),0),p=r+d-u,h=l+c,g=Hu(e,n),f=Wu(e,n),b=f.reduce((P,F)=>P+(F.debit||0),0),y=f.reduce((P,F)=>P+(F.credit||0),0),m=b===y,v=(k.state.customers||[]).reduce((P,F)=>P+(Number(F.galonLoaned)||0),0),x=[...e.filter(P=>P.paymentStatus==="transfer_pending"),...e.filter(P=>(P.paymentMethod==="debt"||P.paymentStatus==="partial"||P.paymentStatus==="unpaid")&&(P.remainingDebt||0)>0)].sort((P,F)=>new Date(P.date)-new Date(F.date)),S=Math.max(1,Math.ceil(x.length/Oe));Te>S&&(Te=S);const w=x.slice((Te-1)*Oe,Te*Oe),E=[...n].sort((P,F)=>new Date(F.date)-new Date(P.date)),$=Math.max(1,Math.ceil(E.length/Oe));Ae>$&&(Ae=$);const C=E.slice((Ae-1)*Oe,Ae*Oe),K=Math.max(1,Math.ceil(f.length/Oe));Pe>K&&(Pe=K);const j=f.slice((Pe-1)*Oe,Pe*Oe);t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${_(r)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${_(p)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${_(d)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${_(u)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${n.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${_(h)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${x.length} belum lunas</div>
        </div>
      </div>

      <!-- Pelacakan Aset Galon Fisik Toko -->
      <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg, rgba(37,99,235,0.03), rgba(16,185,129,0.03));border:1.5px solid var(--border-subtle)">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:10px">
          🪣 Pelacakan Aset Galon Fisik Toko
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Galon Dipinjam Pelanggan</div>
            <div style="font-size:18px;font-weight:900;color:var(--color-warning)">${v} <span style="font-size:12px;font-weight:600">galon</span></div>
            <div style="font-size:10px;color:var(--text-muted)">Di ${(k.state.customers||[]).filter(P=>(P.galonLoaned||0)>0).length} pelanggan</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Nilai Aset Galon Toko</div>
            <div style="font-size:18px;font-weight:900;color:var(--blue-600)">${_(v*45e3)}</div>
            <div style="font-size:10px;color:var(--text-muted)">Estimasi @ Rp 45.000 / galon</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Buku Pembantu Galon</div>
            <div style="font-size:13px;font-weight:800;color:var(--color-success);margin-top:4px">Tersinkronisasi ✅</div>
            <div style="font-size:10px;color:var(--text-muted)">CRM Master Pelanggan</div>
          </div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          ${Dt("💵 Tunai",a,"#16a34a")}
          ${Dt("📲 Transfer",i,"#2563eb")}
          ${Dt("📋 Cicilan Hutang",o,"#7c3aed")}
          ${Dt("⏳ Transfer Pending",l,"#d97706",!0)}
          ${Dt("🔴 Piutang Hutang",c,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding Table with Pagination (10/page) -->
      ${x.length>0?`
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
          ⚠️ Daftar Piutang &amp; Cicilan Berjalan (${x.length} transaksi)
        </div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table" id="piutang-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Pelanggan</th>
                <th>Tanggal</th>
                <th>Total Tagihan</th>
                <th>Terbayar</th>
                <th>Sisa Piutang</th>
                <th>Progress Pelunasan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${w.map(P=>{const F=P.total||0,J=P.paymentStatus==="transfer_pending"?F:P.remainingDebt||0,Z=F-J,R=Math.min(100,Math.max(0,Math.round(Z/F*100))),U=(P.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${T(P.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${T(P.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(P.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${_(F)}</td>
                <td style="color:#16a34a;font-weight:700">${_(Z)}</td>
                <td style="font-weight:800;color:#dc2626">${_(J)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${R}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${U>0?`${U}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${R}%;background:${R===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${P.paymentStatus==="transfer_pending"?`
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${P.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>`:`
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${P.id}"
                      style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      💰 Cicil / Pelunasan
                    </button>`}
                </td>
              </tr>`}).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${Te} dari ${S}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="piutang-prev" ${Te<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="piutang-next" ${Te>=S?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>`:""}

      <!-- Pengeluaran Operasional Table with Pagination (10/page) -->
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">📤 Pengeluaran Operasional (${n.length} entri)</div>
          <button class="btn btn--primary btn--sm" id="btn-add-expense">+ Tambah Pengeluaran</button>
        </div>
        ${n.length===0?`
          <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        `:`
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${C.map(P=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(P.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${T(P.category||"Lainnya")}</span></td>
                  <td>${T(P.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${_(P.amount)}</td>
                  <td>
                    <button class="btn btn--sm" data-action="delete-expense" data-id="${P.id}"
                      style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
            <div style="font-size:12px;color:var(--text-muted)">Hal ${Ae} dari ${$}</div>
            <div style="display:flex;gap:6px">
              <button class="btn btn--secondary btn--sm" id="exp-prev" ${Ae<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
              <button class="btn btn--secondary btn--sm" id="exp-next" ${Ae>=$?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
            </div>
          </div>
        `}
      </div>

      <!-- Arus Kas Harian -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📈 Arus Kas Harian (30 Hari Terakhir)</div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table">
            <thead>
              <tr><th>Tanggal</th><th>Kas Masuk</th><th>Pengeluaran</th><th>Net Harian</th><th>Saldo Kumulatif</th></tr>
            </thead>
            <tbody>
              ${qu(g,r)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Jurnal Entri with Pagination (10/page) -->
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
            📒 Jurnal Entri Akuntansi SAK EMKM (${f.length} baris)
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badge" style="background:${m?"#dcfce7":"#fee2e2"};color:${m?"#166534":"#991b1b"};border:1px solid ${m?"#86efac":"#fca5a5"};font-size:11px;font-weight:700;padding:4px 10px">
              ⚖️ Debit: ${_(b)} | Kredit: ${_(y)} (${m?"Seimbang ✅":"Selisih ⚠️"})
            </span>
            <button class="btn btn--secondary btn--sm" id="btn-export-journal-csv" style="font-size:11px;font-weight:700">
              📊 Export Jurnal (CSV)
            </button>
          </div>
        </div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table">
            <thead>
              <tr><th>Tanggal</th><th>Keterangan</th><th>Debit (Rp)</th><th>Kredit (Rp)</th><th>Bagan Akun (COA SAK EMKM)</th></tr>
            </thead>
            <tbody>
              ${j.map(P=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(P.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${T(P.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${P.debit>0?_(P.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${P.credit>0?_(P.credit):"—"}</td>
                <td><span class="badge ${P.type==="kas"?"badge--green":P.type==="piutang"?"":"badge--blue"}"
                  style="${P.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${T(P.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${Pe} dari ${K}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="journal-prev" ${Pe<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="journal-next" ${Pe>=K?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>
    `,Gu(e)}finally{kt=!1}}},Dt=(t,e,n,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${n}">${_(e)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Hu=(t,e)=>{const n={};for(const r of t){const a=r.dateKey;if(a){if(n[a]||(n[a]={masuk:0,keluar:0}),r.paymentMethod==="cash"&&(r.paymentStatus==="paid"||!r.paymentStatus)&&(n[a].masuk+=r.total),r.paymentMethod==="transfer"&&r.paymentStatus==="transfer_confirmed"){const i=r.confirmedAt?r.confirmedAt.split("T")[0]:a;n[i]||(n[i]={masuk:0,keluar:0}),n[i].masuk+=r.total}if(r.paymentMethod==="debt")for(const i of r.debtPayments||[]){const o=i.date?i.date.split("T")[0]:a;n[o]||(n[o]={masuk:0,keluar:0}),n[o].masuk+=i.amount}}}for(const r of e){const a=r.dateKey||(r.date?r.date.split("T")[0]:null);a&&(n[a]||(n[a]={masuk:0,keluar:0}),n[a].keluar+=r.amount||0)}const s=[];for(let r=29;r>=0;r--){const a=new Date;a.setDate(a.getDate()-r);const i=he(a);s.push({key:i,...n[i]||{masuk:0,keluar:0}})}return s},qu=(t,e)=>{let n=e;const s=t.filter(r=>r.masuk>0||r.keluar>0).map(r=>{const a=r.masuk-r.keluar;return n+=a,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(r.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${r.masuk>0?_(r.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${r.keluar>0?_(r.keluar):"—"}</td>
      <td style="font-weight:800;color:${a>=0?"#16a34a":"#dc2626"}">${a>=0?"+":""}${_(a)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${_(n)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Wu=(t,e)=>{const n=[];for(const s of t){const r=T(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")n.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${r})`,debit:s.total,credit:s.total,account:"[1001] Kas Toko / [4001] Pendapatan Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?n.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${r})`,debit:s.total,credit:s.total,account:"[1002] Bank Transfer & QRIS / [4001] Pendapatan",type:"kas"}):n.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${r}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"[1101] Piutang Transfer / [4001] Pendapatan",type:"piutang"});else if(s.paymentMethod==="debt"){n.push({date:s.date,desc:`Penjualan Kredit/Tempo — ${s.invoiceNo} (${r}) [Total: ${_(s.total)}]`,debit:s.total,credit:s.total,account:"[1101] Piutang Usaha / [4001] Pendapatan",type:"piutang"});const a=s.debtPayments||[];let i=0;a.forEach((o,l)=>{i+=o.amount||0;const c=Math.max(0,s.total-i),d=c===0,u=l+1,p=d?`Pelunasan Piutang (#${u}/LUNAS ✅)`:`Cicilan Piutang #${u} (dari ${a.length})`,h=o.note?` — ${T(o.note)}`:"";n.push({date:o.date,desc:`${p} — ${s.invoiceNo} (${r})${h} [Bayar: ${_(o.amount)} | Sisa: ${_(c)}]`,debit:o.amount,credit:o.amount,account:d?"[1001] Kas Toko / [1101] Piutang (LUNAS ✅)":"[1001] Kas Toko / [1101] Piutang Usaha",type:"kas"})})}}for(const s of e){const r=(s.category||"").toLowerCase();let a="[6099] Beban Operasional";r.includes("tutup")||r.includes("tisu")||r.includes("galon")||r.includes("bahan")?a="[6001] Beban Tutup & Tisu":r.includes("listrik")||r.includes("air")||r.includes("utilitas")?a="[6002] Beban Utilitas/Listrik":r.includes("gaji")||r.includes("upah")?a="[6003] Beban Gaji Karyawan":(r.includes("bensin")||r.includes("antar")||r.includes("transport"))&&(a="[6004] Beban Transportasi"),n.push({date:s.date,desc:`Beban ${T(s.category||"Operasional")} — ${T(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`${a} / [1001] Kas Toko`,type:"beban"})}return n.sort((s,r)=>new Date(r.date)-new Date(s.date))},Gu=t=>{var e,n,s,r,a,i,o,l,c,d,u,p;(e=document.getElementById("btn-refresh-finance"))==null||e.addEventListener("click",pe),(n=document.getElementById("piutang-prev"))==null||n.addEventListener("click",()=>{Te>1&&(Te--,pe())}),(s=document.getElementById("piutang-next"))==null||s.addEventListener("click",()=>{Te++,pe()}),(r=document.getElementById("exp-prev"))==null||r.addEventListener("click",()=>{Ae>1&&(Ae--,pe())}),(a=document.getElementById("exp-next"))==null||a.addEventListener("click",()=>{Ae++,pe()}),(i=document.getElementById("journal-prev"))==null||i.addEventListener("click",()=>{Pe>1&&(Pe--,pe())}),(o=document.getElementById("journal-next"))==null||o.addEventListener("click",()=>{Pe++,pe()}),(l=document.getElementById("btn-export-journal-csv"))==null||l.addEventListener("click",()=>{var b;const h=["Tanggal","Keterangan","Debit","Kredit","Bagan Akun COA"],g=journal.map(y=>[Re(new Date(y.date)),y.desc||"",y.debit||0,y.credit||0,y.account||""]),f=he();rr(`Jurnal-Akuntansi-${f}.csv`,h,g),(b=window.showToast)==null||b.call(window,"✅ Jurnal akuntansi berhasil diekspor ke file CSV/Excel!","success")}),(c=document.getElementById("btn-set-modal-awal"))==null||c.addEventListener("click",()=>{const g=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${k.state.settings.modalAwal||0||""}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;oe(g,"modal-awal"),setTimeout(()=>{var f,b,y;(f=document.getElementById("ma-x"))==null||f.addEventListener("click",()=>z("modal-awal")),(b=document.getElementById("ma-cancel"))==null||b.addEventListener("click",()=>z("modal-awal")),(y=document.getElementById("ma-save"))==null||y.addEventListener("click",async()=>{var v;const m=parseFloat((v=document.getElementById("modal-awal-input"))==null?void 0:v.value)||0;await Wa("modalAwal",m),k.updateSettings({modalAwal:m}),z("modal-awal"),window.showToast("Modal Awal disimpan!","success"),pe()})},0)}),(d=document.getElementById("btn-add-expense"))==null||d.addEventListener("click",()=>{const g=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(f=>`<option value="${T(f)}">${T(f)}</option>`).join("")}
          </select>
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">📝 Keterangan</label>
          <input type="text" class="input" id="exp-note" placeholder="Keterangan singkat" maxlength="100">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">💵 Jumlah (Rp)</label>
          <input type="number" class="input" id="exp-amount" placeholder="0" min="1" max="999999999" step="1000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="exp-cancel">Batal</button>
        <button class="btn btn--success" id="exp-save">💾 Simpan</button>
      </div>
    `;oe(g,"expense-modal"),setTimeout(()=>{var f,b,y;(f=document.getElementById("exp-x"))==null||f.addEventListener("click",()=>z("expense-modal")),(b=document.getElementById("exp-cancel"))==null||b.addEventListener("click",()=>z("expense-modal")),(y=document.getElementById("exp-save"))==null||y.addEventListener("click",async()=>{var E,$,C,K;const m=parseFloat((E=document.getElementById("exp-amount"))==null?void 0:E.value)||0,v=(($=document.getElementById("exp-category"))==null?void 0:$.value)||"Lainnya",x=((K=(C=document.getElementById("exp-note"))==null?void 0:C.value)==null?void 0:K.trim())||"";if(m<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const S=new Date().toISOString(),w={date:S,dateKey:S.split("T")[0],category:v,note:x,amount:m};try{const j=await ud(w);w.id=j,k.addExpense(w),z("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch{window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(u=document.getElementById("expense-table"))==null||u.addEventListener("click",async h=>{const g=h.target.closest('[data-action="delete-expense"]');if(!g||!confirm("Hapus pengeluaran ini?"))return;const f=parseInt(g.dataset.id);try{await hd(f),k.removeExpense(f),window.showToast("Pengeluaran dihapus","success")}catch{window.showToast("Gagal hapus","error")}}),(p=document.getElementById("piutang-table"))==null||p.addEventListener("click",async h=>{const g=h.target.closest("[data-action]");if(!g)return;const f=parseInt(g.dataset.id),b=g.dataset.action,y=(k.state.transactions||t).find(m=>m.id===f);if(y){if(b==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${_(y.total)} dari ${T(y.customerName||"pelanggan")} sudah diterima?`))return;const m={...y,paymentStatus:"transfer_confirmed",paidAmount:y.total,confirmedAt:new Date().toISOString()};try{await sn(m),k.updateTransaction(f,{paymentStatus:"transfer_confirmed",paidAmount:y.total,confirmedAt:m.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}}if(b==="pay-debt"){const m=y.remainingDebt||0,v=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${_(y.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${_(m)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${m}" min="1" max="${m}" step="1000" inputmode="numeric">
          </div>
          <div class="input-group" style="margin-top:10px">
            <label class="input-label">📝 Catatan</label>
            <input type="text" class="input" id="mc-note" placeholder="Cicilan ke-..." maxlength="100">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn--secondary" id="mc-cancel">Batal</button>
          <button class="btn btn--success" id="mc-save">💾 Simpan Cicilan</button>
        </div>
      `;oe(v,"mini-cicil"),setTimeout(()=>{var x,S,w;(x=document.getElementById("mc-x"))==null||x.addEventListener("click",()=>z("mini-cicil")),(S=document.getElementById("mc-cancel"))==null||S.addEventListener("click",()=>z("mini-cicil")),(w=document.getElementById("mc-save"))==null||w.addEventListener("click",async()=>{var R,U,ee;const E=parseFloat((R=document.getElementById("mc-amount"))==null?void 0:R.value)||0;if(E<=0||E>m){window.showToast("Jumlah tidak valid","warning");return}const $=(y.paidAmount||0)+E,C=Math.max(0,m-E),K=C===0?"paid":"partial",j=(y.debtPayments||[]).length+1,P=C===0?`Pelunasan (#${j}/LUNAS ✅)`:`Cicilan #${j}`,F=((ee=(U=document.getElementById("mc-note"))==null?void 0:U.value)==null?void 0:ee.trim())||P,J=[...y.debtPayments||[],{date:new Date().toISOString(),amount:E,note:F}],Z={...y,paidAmount:$,remainingDebt:C,paymentStatus:K,debtPayments:J};try{if(await sn(Z),k.updateTransaction(f,{paidAmount:$,remainingDebt:C,paymentStatus:K,debtPayments:J}),y.customerId||y.customerName){const N=(await se()).find(B=>y.customerId&&String(B.id)===String(y.customerId)||(B.name||"").trim().toLowerCase()===(y.customerName||"").trim().toLowerCase());if(N){N.totalDebt=Math.max(0,(Number(N.totalDebt)||0)-E),await Rt(N);const B=await se();k.setCustomers(B)}}z("mini-cicil"),window.showToast(C===0?"🎉 Hutang LUNAS!":`Cicilan #${j} (${_(E)}) dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)}}})};let Ut=[],ft="";const na={owner:{label:"👑 Owner / Pemilik",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir / Staff",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},Vu=async()=>{Ut.length&&(Ut.forEach(t=>typeof t=="function"&&t()),Ut=[]),Ut.push(k.on("users:change",()=>Je())),Ut.push(k.on("auth:change",()=>{const t=document.getElementById("view-users");t&&t.classList.contains("active")&&Je()})),await Je()},Je=async()=>{var r,a,i,o,l;const t=document.getElementById("view-users");if(!t)return;const e=k.state.currentUser;if(!e||e.role!=="owner"){t.innerHTML=`
      <div class="view-header">
        <div>
          <h1 class="view-title">👥 Manajemen Akun & Hak Akses</h1>
          <p class="view-subtitle">Kontrol operator kasir, supervisor, dan hak akses toko</p>
        </div>
      </div>
      <div style="background: var(--bg-card, #ffffff); border-radius: 14px; padding: 40px 20px; text-align: center; border: 1px solid var(--border, #e2e8f0); margin-top: 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>
        <h3 style="margin-bottom: 8px; color: var(--text-primary, #1e293b);">Akses Terkunci (Khusus Owner)</h3>
        <p style="color: var(--text-muted, #64748b); max-width: 480px; margin: 0 auto 20px auto;">
          Modul manajemen staf dan pengaturan hak akses hanya dapat dibuka oleh akun bertingkat <strong>Owner</strong>. Silakan beralih operator untuk mengakses halaman ini.
        </p>
        <button class="btn btn-primary" id="btn-lock-switch-op" style="padding: 10px 20px;">
          🔑 Beralih Operator / Login Owner
        </button>
      </div>
    `,(r=document.getElementById("btn-lock-switch-op"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))});return}const s=(await ke()).filter(c=>{if(!ft)return!0;const d=ft.toLowerCase();return(c.name||"").toLowerCase().includes(d)||(c.username||"").toLowerCase().includes(d)});t.innerHTML=`
    <div class="view-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
      <div>
        <h1 class="view-title" style="margin: 0; font-size: 1.6rem; font-weight: 800;">👥 Manajemen Akun & Hak Akses</h1>
        <p class="view-subtitle" style="margin: 4px 0 0 0; color: var(--text-muted, #64748b);">Kelola daftar staf kasir, supervisor, dan pemilik toko dengan enkripsi PIN aman.</p>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <button class="btn btn-secondary" id="btn-users-logout" style="display: flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 10px; font-weight: 700; background: #fff1f2; border: 1.5px solid #fca5a5; color: #e11d48; cursor: pointer;">
          <span>🚪</span> Log Out
        </button>
        <button class="btn btn-primary" id="btn-add-user" style="display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 10px; font-weight: 600;">
          <span>➕</span> Tambah Operator
        </button>
      </div>
    </div>

    <!-- Toolbar & Search -->
    <div style="background: var(--bg-card, #ffffff); border-radius: 12px; padding: 14px 18px; border: 1px solid var(--border, #e2e8f0); margin-bottom: 20px; display: flex; gap: 12px; align-items: center;">
      <span style="font-size: 18px;">🔍</span>
      <input type="text" id="user-search-input" value="${T(ft)}" placeholder="Cari nama atau username operator..." style="border: none; outline: none; background: transparent; width: 100%; font-size: 14px;">
      ${ft?'<button id="btn-clear-user-search" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px;">✕</button>':""}
    </div>

    <!-- Users Table -->
    <div style="background: var(--bg-card, #ffffff); border-radius: 14px; border: 1px solid var(--border, #e2e8f0); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: var(--bg-muted, #f8fafc); border-bottom: 1px solid var(--border, #e2e8f0); font-size: 13px; color: var(--text-muted, #64748b);">
              <th style="padding: 14px 18px;">OPERATOR</th>
              <th style="padding: 14px 18px;">USERNAME</th>
              <th style="padding: 14px 18px;">HAK AKSES (ROLE)</th>
              <th style="padding: 14px 18px;">STATUS</th>
              <th style="padding: 14px 18px; text-align: right;">AKSI</th>
            </tr>
          </thead>
          <tbody>
            ${s.length===0?`
              <tr>
                <td colspan="5" style="padding: 40px 20px; text-align: center; color: var(--text-muted, #64748b);">
                  Tidak ada operator yang cocok dengan pencarian.
                </td>
              </tr>
            `:s.map(c=>{const d=na[c.role]||na.cashier,u=e&&String(e.id)===String(c.id),p=c.isActive!==!1;return`
                <tr style="border-bottom: 1px solid var(--border, #f1f5f9); font-size: 14px;">
                  <td style="padding: 14px 18px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background: ${d.bg}; color: ${d.color}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                        ${(c.name||"U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 600; color: var(--text-primary, #1e293b);">${T(c.name)} ${u?'<span style="font-size: 11px; padding: 2px 6px; border-radius: 6px; background: #e0e7ff; color: #3730a3; margin-left: 4px;">Anda</span>':""}</div>
                        <div style="font-size: 12px; color: var(--text-muted, #64748b);">Dibuat: ${new Date(c.createdAt||Date.now()).toLocaleDateString("id-ID")}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 14px 18px; font-family: monospace; font-size: 13px; color: var(--text-secondary, #475569);">
                    @${T(c.username)}
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; color: ${d.color}; background: ${d.bg};">
                      ${d.label}
                    </span>
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: ${p?"#10b981":"#ef4444"};">
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${p?"#10b981":"#ef4444"};"></span>
                      ${p?"Aktif":"Nonaktif"}
                    </span>
                  </td>
                  <td style="padding: 14px 18px; text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button class="btn-edit-user" data-id="${c.id}" title="Edit Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border, #cbd5e1); background: transparent; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      ${u?"":`
                        <button class="btn-delete-user" data-id="${c.id}" data-name="${T(c.name)}" title="Hapus Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer;">
                          🗑️ Hapus
                        </button>
                      `}
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,(a=document.getElementById("btn-users-logout"))==null||a.addEventListener("click",()=>{confirm("Keluar dari sesi operator kasir?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(i=document.getElementById("btn-add-user"))==null||i.addEventListener("click",()=>sa()),(o=document.getElementById("user-search-input"))==null||o.addEventListener("input",c=>{ft=c.target.value,Je()}),(l=document.getElementById("btn-clear-user-search"))==null||l.addEventListener("click",()=>{ft="",Je()}),t.querySelectorAll(".btn-edit-user").forEach(c=>{c.addEventListener("click",async()=>{const d=c.getAttribute("data-id"),u=await sd(isNaN(Number(d))?d:Number(d));u&&sa(u)})}),t.querySelectorAll(".btn-delete-user").forEach(c=>{c.addEventListener("click",async()=>{const d=c.getAttribute("data-id"),u=c.getAttribute("data-name");if(confirm(`Yakin ingin menghapus operator "${u}"? Tindakan ini tidak dapat dibatalkan.`)){await ad(isNaN(Number(d))?d:Number(d));const p=await ke();k.setUsers(p),Je()}})})},sa=(t=null)=>{var l,c;const e=!!t,n="modal-user-form",s=`
    <div id="${n}" class="modal-overlay" style="display: flex; align-items: center; justify-content: center;">
      <div class="modal-content" style="max-width: 480px; width: 90%; background: var(--bg-card, #ffffff); border-radius: 16px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: var(--text-primary);">
            ${e?"✏️ Edit Akun Operator":"➕ Tambah Akun Operator Baru"}
          </h3>
          <button class="modal-close" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--text-muted);">&times;</button>
        </div>

        <form id="form-user-save" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Nama Lengkap</label>
            <input type="text" id="input-user-name" required value="${T((t==null?void 0:t.name)||"")}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px;">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Username</label>
            <input type="text" id="input-user-username" required ${e?"disabled":""} value="${T((t==null?void 0:t.username)||"")}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; ${e?"background: var(--bg-muted, #f1f5f9);":""}">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Username unik untuk masuk ke sistem.</span>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Peran (Hak Akses)</label>
            <select id="input-user-role" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; background: white;">
              <option value="cashier" ${(t==null?void 0:t.role)==="cashier"?"selected":""}>👤 Kasir (Hanya Transaksi & CRM Pelanggan)</option>
              <option value="supervisor" ${(t==null?void 0:t.role)==="supervisor"?"selected":""}>⭐ Supervisor (Kasir + Produk + Laporan)</option>
              <option value="owner" ${(t==null?void 0:t.role)==="owner"?"selected":""}>👑 Owner (Akses Penuh Seluruh Modul Toko)</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">
              ${e?"PIN Baru (Kosongkan jika tidak diubah)":"PIN Masuk (4-6 Angka)"}
            </label>
            <input type="password" id="input-user-pin" ${e?"":"required"} maxlength="6" pattern="[0-9]*" inputmode="numeric" placeholder="${e?"•••• (biarkan kosong jika tetap)":"Contoh: 1234"}" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; letter-spacing: 4px; font-size: 16px;">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">PIN dienkripsi dengan Salted SHA-256 (tidak pernah disimpan plaintext).</span>
          </div>

          ${e?`
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
              <input type="checkbox" id="input-user-active" ${(t==null?void 0:t.isActive)!==!1?"checked":""} style="width: 18px; height: 18px; accent-color: #2563eb;">
              <label for="input-user-active" style="font-size: 14px; font-weight: 500; cursor: pointer;">Akun Aktif (Dapat Login)</label>
            </div>
          `:""}

          <div id="user-form-error" style="display: none; color: #dc2626; font-size: 13px; background: #fef2f2; padding: 10px; border-radius: 8px; border: 1px solid #fee2e2;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px;">
            <button type="button" class="btn modal-cancel" style="padding: 10px 18px; border-radius: 8px; border: 1px solid var(--border); background: transparent; cursor: pointer;">Batal</button>
            <button type="submit" class="btn btn-primary" id="btn-submit-user" style="padding: 10px 22px; border-radius: 8px; font-weight: 600;">
              ${e?"Simpan Perubahan":"Buat Operator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,r=document.getElementById(n);r&&r.remove(),document.body.insertAdjacentHTML("beforeend",s);const a=document.getElementById(n),i=()=>a.remove();(l=a.querySelector(".modal-close"))==null||l.addEventListener("click",i),(c=a.querySelector(".modal-cancel"))==null||c.addEventListener("click",i),document.getElementById("form-user-save").addEventListener("submit",async d=>{d.preventDefault();const u=document.getElementById("user-form-error");u.style.display="none";const p=document.getElementById("input-user-name").value.trim(),h=document.getElementById("input-user-username").value.trim().toLowerCase(),g=document.getElementById("input-user-role").value,f=document.getElementById("input-user-pin").value.trim(),b=e?document.getElementById("input-user-active").checked:!0;if(!p||!h){u.textContent="Nama dan username wajib diisi.",u.style.display="block";return}if(!e&&(!f||f.length<4)){u.textContent="PIN minimal 4 angka numerik.",u.style.display="block";return}if(f&&(f.length<4||isNaN(Number(f)))){u.textContent="PIN harus berupa angka (4 hingga 6 digit).",u.style.display="block";return}try{const y=await ke();if(!e&&y.some(v=>(v.username||"").toLowerCase()===h)){u.textContent=`Username "${h}" sudah digunakan oleh operator lain.`,u.style.display="block";return}if(e){let v=t.pinHash,x=t.pinSalt;f&&(x=nn(),v=await St(f,x));const S={...t,name:p,role:g,pinHash:v,pinSalt:x,isActive:b,updatedAt:new Date().toISOString()};await Vs(S),k.state.currentUser&&String(k.state.currentUser.id)===String(t.id)&&(k.state.currentUser.name=p,k.state.currentUser.role=g,sessionStorage.setItem("bm_active_user",JSON.stringify(k.state.currentUser)),k.emit("auth:change",k.state.currentUser))}else{const v=nn(),x=await St(f,v),S={name:p,username:h,role:g,pinHash:x,pinSalt:v,isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};await rd(S)}const m=await ke();k.setUsers(m),i(),Je()}catch(y){u.textContent="Gagal menyimpan data: "+y.message,u.style.display="block"}})};let Ce=[],qe=null,ne="",Rn=!1,ra=!1;const Tn={owner:{label:"👑 Owner",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},Ju=async()=>{ne="",Rn=!1,await Gn(),Qu()},Gn=async()=>{const t=document.getElementById("view-login");if(!t)return;if(Ce=(await ke()).filter(s=>s.isActive!==!1),Ce.length===0){t.innerHTML=`
      <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: var(--bg-card, #ffffff); border-radius: 20px; padding: 36px; text-align: center; max-width: 420px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">Tidak Ada Operator</h2>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Database operator kosong. Muat ulang halaman untuk inisialisasi akun bawaan.</p>
          <button class="btn btn-primary" onclick="location.reload()">🔄 Muat Ulang</button>
        </div>
      </div>
    `;return}(!qe||!Ce.some(s=>String(s.id)===String(qe)))&&(qe=Ce[0].id);const n=Ce.find(s=>String(s.id)===String(qe))||Ce[0];Tn[n.role]||Tn.cashier,t.innerHTML=`
    <div style="min-height: calc(100vh - 100px); display: flex; align-items: center; justify-content: center; padding: 24px 16px;">
      <div style="background: var(--bg-card, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 24px; max-width: 460px; width: 100%; padding: 36px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.06); text-align: center; position: relative;">
        
        <!-- Brand Header -->
        <div style="margin-bottom: 24px;">
          <img src="assets/logo.png" alt="Blue Mountain Logo" style="width: 72px; height: 72px; object-fit: contain; margin-bottom: 12px; filter: drop-shadow(0 4px 12px rgba(37,99,235,0.15));">
          <h1 style="font-size: 1.35rem; font-weight: 900; letter-spacing: -0.02em; color: var(--text-primary, #1e293b); margin: 0;">
            BLUE MOUNTAIN
          </h1>
          <p style="font-size: 12px; font-weight: 700; color: #2563eb; letter-spacing: 0.08em; text-transform: uppercase; margin: 4px 0 0 0;">
            Portal Masuk Operator Kasir
          </p>
        </div>

        <!-- Operator Selector -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
            Pilih Akun Operator
          </label>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;" id="login-operator-list">
            ${Ce.map(s=>{const r=String(s.id)===String(qe),a=Tn[s.role]||Tn.cashier;return`
                <button type="button" class="btn-login-op" data-id="${s.id}" style="
                  padding: 8px 14px;
                  border-radius: 14px;
                  border: 2px solid ${r?"var(--primary, #2563eb)":"var(--border, #e2e8f0)"};
                  background: ${r?"rgba(37, 99, 235, 0.08)":"var(--bg-card, #ffffff)"};
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  transition: all 0.2s;
                  box-shadow: ${r?"0 4px 12px rgba(37,99,235,0.12)":"none"};
                ">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: ${a.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px;">
                    ${(s.name||"U").charAt(0).toUpperCase()}
                  </div>
                  <div style="text-align: left;">
                    <div style="font-weight: 700; font-size: 13px; color: var(--text-primary, #1e293b);">${T(s.name)}</div>
                    <div style="font-size: 11px; color: ${a.color}; font-weight: 600;">${a.label}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Selected User Prompt -->
        <div style="background: var(--bg-muted, #f8fafc); border-radius: 12px; padding: 10px 14px; margin-bottom: 20px; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary, #475569);">
          <span>🔑</span> Masukkan <strong>4 hingga 6 digit PIN</strong> untuk <strong>${T(n.name)}</strong>
        </div>

        <!-- PIN Dots Display -->
        <div id="login-pin-box" style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 8px;" id="login-pin-dots">
            ${[0,1,2,3,4,5].map(s=>`
              <span class="pin-dot" style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid var(--primary, #2563eb);
                background: ${s<ne.length?"var(--primary, #2563eb)":"transparent"};
                display: inline-block;
                transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
                transform: ${s<ne.length?"scale(1.15)":"scale(1)"};
              "></span>
            `).join("")}
          </div>
          <div id="login-error-msg" style="min-height: 20px; font-size: 13px; font-weight: 600; color: #dc2626;"></div>
        </div>

        <!-- Numpad Keypad -->
        <div style="max-width: 280px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          ${[1,2,3,4,5,6,7,8,9].map(s=>`
            <button type="button" class="btn-numpad-key" data-val="${s}" style="
              height: 54px;
              font-size: 22px;
              font-weight: 700;
              border-radius: 14px;
              border: 1px solid var(--border, #cbd5e1);
              background: var(--bg-card, #ffffff);
              color: var(--text-primary, #1e293b);
              cursor: pointer;
              transition: transform 0.1s, background 0.15s;
              box-shadow: 0 2px 6px rgba(0,0,0,0.03);
            ">${s}</button>
          `).join("")}
          <button type="button" class="btn-numpad-key" data-val="clear" style="
            height: 54px;
            font-size: 16px;
            font-weight: 700;
            border-radius: 14px;
            border: 1px solid #fecaca;
            background: #fff1f2;
            color: #dc2626;
            cursor: pointer;
            transition: transform 0.1s;
          ">C</button>
          <button type="button" class="btn-numpad-key" data-val="0" style="
            height: 54px;
            font-size: 22px;
            font-weight: 700;
            border-radius: 14px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
            transition: transform 0.1s;
          ">0</button>
          <button type="button" class="btn-numpad-key" data-val="submit" style="
            height: 54px;
            font-size: 20px;
            font-weight: 800;
            border-radius: 14px;
            border: none;
            background: var(--primary, #2563eb);
            color: white;
            cursor: pointer;
            transition: transform 0.1s;
            box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          ">✓</button>
        </div>

        <!-- Emergency Owner Reset (Foolproof Rescue) -->
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--border, #e2e8f0);">
          <button type="button" id="btn-reset-owner-pin" style="
            background: none;
            border: none;
            color: var(--text-muted, #64748b);
            font-size: 12px;
            cursor: pointer;
            text-decoration: underline;
          ">
            🔄 Lupa PIN? Reset PIN Owner ke default "1234"
          </button>
        </div>

      </div>
    </div>
  `,Xu()},Ln=()=>{document.querySelectorAll("#login-pin-dots .pin-dot").forEach((e,n)=>{const s=n<ne.length;e.style.background=s?"var(--primary, #2563eb)":"transparent",e.style.transform=s?"scale(1.18)":"scale(1)"})},aa=async(t=!1)=>{var s;if(Rn)return;const e=Ce.find(r=>String(r.id)===String(qe));if(!e)return;const n=document.getElementById("login-error-msg");if(n&&(n.textContent=""),ne.length>=4){Rn=!0;const r=await Fa(ne,e.pinSalt,e.pinHash);if(Rn=!1,r){if(k.login(e),(s=window.showToast)==null||s.call(window,`Berhasil masuk sebagai ${e.name} (${e.role})`,"success"),ne="",typeof window.appNavigateTo=="function")window.appNavigateTo("pos");else{const a=document.getElementById("dock-pos");a&&a.click()}return}}(t||ne.length>=6)&&(n&&(n.textContent=ne.length<4?"Masukkan minimal 4 digit PIN":"PIN salah! Silakan periksa kembali."),Yu(),ne="",Ln())},Yu=()=>{const t=document.getElementById("login-pin-box");t&&(t.style.animation="none",t.offsetWidth,t.style.animation="shake 0.4s ease-in-out")},Xu=()=>{var t;document.querySelectorAll(".btn-login-op").forEach(e=>{e.addEventListener("click",()=>{qe=e.getAttribute("data-id"),ne="",Gn()})}),document.querySelectorAll(".btn-numpad-key").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-val");Ft(n)})}),(t=document.getElementById("btn-reset-owner-pin"))==null||t.addEventListener("click",async()=>{var n,s,r;const e=Ce.find(a=>a.role==="owner");if(!e){(n=window.showToast)==null||n.call(window,"Akun Owner tidak ditemukan.","error");return}if(confirm(`Atur ulang PIN akun Owner "${e.name}" kembali ke PIN standar "1234"?`))try{const a=nn(),i=await St("1234",a),o={...e,pinHash:i,pinSalt:a,updatedAt:new Date().toISOString()};await Vs(o),Ce=(await ke()).filter(l=>l.isActive!==!1),qe=e.id,ne="",Gn(),(s=window.showToast)==null||s.call(window,'PIN Owner berhasil direset ke "1234". Silakan login.',"success")}catch(a){(r=window.showToast)==null||r.call(window,"Gagal mereset PIN: "+a.message,"error")}})},Ft=t=>{const e=document.getElementById("login-error-msg");e&&(e.textContent=""),t==="clear"?(ne="",Ln()):t==="backspace"?ne.length>0&&(ne=ne.slice(0,-1),Ln()):t==="submit"?aa(!0):/^[0-9]$/.test(t)&&ne.length<6&&(ne+=t,Ln(),aa(!1))},Qu=()=>{ra||(ra=!0,window.addEventListener("keydown",t=>{const e=document.getElementById("view-login");!e||!e.classList.contains("active")||["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||(t.key>="0"&&t.key<="9"?(t.preventDefault(),Ft(t.key)):t.key==="Backspace"?(t.preventDefault(),Ft("backspace")):t.key==="Enter"?(t.preventDefault(),Ft("submit")):t.key==="Escape"&&(t.preventDefault(),Ft("clear")))}))};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const Pi=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine||(t.textContent="⚡ Mode Offline",t.classList.add("status-badge--offline"),t.style.background="rgba(239, 68, 68, 0.12)",t.style.borderColor="rgba(239, 68, 68, 0.3)",t.style.color="#dc2626"))};window.addEventListener("offline",Pi);window.showToast=(t,e="info",n="")=>{const s=document.getElementById("toast-container");if(!s)return;const r={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},a=document.createElement("div");a.className=`toast toast--${e}`,a.setAttribute("role","alert"),a.innerHTML=`
    <span class="toast__icon">${r[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${n?`<div class="toast__title">${T(n)}</div>`:""}
      <div class="toast__msg">${T(t)}</div>
    </div>
  `,s.appendChild(a);const i=()=>{a.classList.add("hiding"),a.addEventListener("animationend",()=>a.remove(),{once:!0})},o=setTimeout(i,3500);a.addEventListener("click",()=>{clearTimeout(o),i()})};const ia=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=La()),e&&(e.textContent=Hc())},Zu={login:{init:Ju,refresh:Gn},pos:{init:fu,refresh:vu},products:{init:_u,refresh:cn},customers:{init:hu,refresh:ze},transactions:{init:Au,refresh:Ei},reports:{init:Lu,refresh:ar},settings:{init:Uu,refresh:Wn},finance:{init:Fu,refresh:pe},users:{init:Vu,refresh:Je}},oa=new Set,Se=async t=>{var s;!k.state.currentUser&&t!=="login"&&((s=window.showToast)==null||s.call(window,"Silakan masuk dengan akun operator untuk melanjutkan.","warning"),t="login");const e=Zu[t];if(!e)return;if(!k.canAccess(t)){window.showToast("Akses dibatasi untuk peran Anda. Silakan hubungi Owner/Supervisor.","warning","Peran Terbatas"),Ks({onLogin:()=>Se(t)});return}document.querySelectorAll(".dock-item").forEach(r=>{r.classList.toggle("active",r.dataset.view===t)});const n=document.querySelector(".dock-container");n&&(n.style.display=t==="login"?"none":"flex"),document.querySelectorAll(".view").forEach(r=>{r.classList.toggle("active",r.id===`view-${t}`)});try{oa.has(t)?await e.refresh():(await e.init(),oa.add(t)),sessionStorage.setItem("activeView",t)}catch(r){const a=document.getElementById(`view-${t}`);a&&!a.children.length&&(a.innerHTML=`
        <div class="empty-state" style="padding:60px 20px">
          <div class="empty-state__icon">⚠️</div>
          <div class="empty-state__text">
            <strong style="font-size:16px;color:var(--text-primary)">Gagal Memuat Halaman</strong><br>
            <span style="font-size:12px;color:var(--text-muted)">${r.message||"Terjadi kesalahan sistem"}</span>
          </div>
          <button class="btn btn--primary btn--sm" onclick="location.reload()" style="margin-top:16px">
            🔄 Reload Halaman
          </button>
        </div>
      `)}k.navigate(t)},eh=(t,e)=>{if(!t)return;const n=t.getBoundingClientRect(),s=Math.max(n.width,n.height),r=document.createElement("span");r.className="ripple-effect",r.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-n.left-s/2}px;top:${e.clientY-n.top-s/2}px`,t.style.position="relative",t.appendChild(r),r.addEventListener("animationend",()=>r.remove(),{once:!0})},Ci=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};k.on("settings:change",Ci);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const Ii=t=>{const e=document.getElementById("operator-badge"),n=document.getElementById("operator-name"),s=document.getElementById("operator-icon"),r=document.getElementById("btn-topbar-logout"),a=document.getElementById("btn-topbar-login");t?(n&&(n.textContent=`${t.name} (${t.role})`),s&&(s.textContent=t.role==="owner"?"👑":t.role==="supervisor"?"⭐":"👤"),e&&(e.style.display="flex",e.style.color=t.role==="owner"?"#8b5cf6":t.role==="supervisor"?"#2563eb":"#10b981",e.style.background=t.role==="owner"?"rgba(139, 92, 246, 0.12)":t.role==="supervisor"?"rgba(37, 99, 235, 0.12)":"rgba(16, 185, 129, 0.12)",e.style.borderColor=t.role==="owner"?"rgba(139, 92, 246, 0.3)":t.role==="supervisor"?"rgba(37, 99, 235, 0.3)":"rgba(16, 185, 129, 0.3)"),r&&(r.style.display="inline-flex"),a&&(a.style.display="none")):(n&&(n.textContent="Belum Masuk"),s&&(s.textContent="🔒"),e&&(e.style.color="#64748b",e.style.background="rgba(100, 116, 139, 0.1)",e.style.borderColor="rgba(100, 116, 139, 0.25)"),r&&(r.style.display="none"),a&&(a.style.display="inline-flex"));const i=document.getElementById("dock-users");i&&(i.style.display=t&&t.role==="owner"?"flex":"none")};k.on("auth:change",Ii);const th=async()=>{var R,U,ee;window.appNavigateTo=Se;try{await bd(),await pd(),await Ga()}catch{window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}k.restoreSession(),Ii(k.state.currentUser),(R=document.getElementById("operator-badge"))==null||R.addEventListener("click",()=>{Ks()}),(U=document.getElementById("btn-topbar-logout"))==null||U.addEventListener("click",()=>{var A;confirm("Keluar dari sesi operator kasir saat ini?")&&(k.logout(),Se("login"),(A=window.showToast)==null||A.call(window,"Sesi ditutup. Silakan login kembali.","info"))}),(ee=document.getElementById("btn-topbar-login"))==null||ee.addEventListener("click",()=>{Se("login")}),window.addEventListener("request-operator-switch",()=>{Ks()}),window.addEventListener("request-logout",()=>{k.logout(),Se("login")});const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const A of t){const N=await Js(A);N!==null&&(A==="modalAwal"||A==="taxRate"?e[A]=parseFloat(N)||0:e[A]=N)}k.updateSettings(e),Ci(k.state.settings),Pi(),ia(),setInterval(ia,1e3),Ws().catch(()=>{}),Jc();const n=document.querySelector(".dock"),s="bm_dock_order_v3";(()=>{try{n==null||n.querySelectorAll(".dock-separator").forEach(D=>D.remove());const A=localStorage.getItem(s);if(!A)return;const N=JSON.parse(A);if(!Array.isArray(N)||!N.length)return;const B=new Map;n==null||n.querySelectorAll(".dock-item").forEach(D=>{B.set(D.dataset.view,D)}),N.forEach(D=>{const q=B.get(D);q&&n&&(n.appendChild(q),B.delete(D))}),B.forEach(D=>{n&&n.appendChild(D)})}catch{}})();let a=n?[...n.querySelectorAll(".dock-item")]:[];const i=()=>window.innerWidth<600,o=()=>window.innerWidth>=600&&window.innerWidth<=1024,l=()=>i()?1.22:o()?1.36:1.5,c=()=>i()?8:o()?12:18,d=()=>i()?90:140;let u=a.map(()=>1),p=a.map(()=>1),h=null,g=!1;const f=(A,N,B)=>A+(N-A)*B,b=.24,y=()=>{if(g)return;let A=!1;const N=l(),B=c();a.forEach((D,q)=>{u[q]=f(u[q]??1,p[q]??1,b),Math.abs(u[q]-p[q])>5e-4?A=!0:u[q]=p[q];const W=u[q],G=(W-1)/(N-1||1)*B;D.style.transform=`translate3d(0, ${-G.toFixed(2)}px, 0) scale(${W.toFixed(4)})`,D.style.zIndex=W>1.02?Math.round(W*20):""}),h=A?requestAnimationFrame(y):null},m=()=>{!g&&!h&&(h=requestAnimationFrame(y))},v=A=>{if(g)return;const N=l(),B=d();a.forEach((D,q)=>{const W=D.getBoundingClientRect(),G=W.left+W.width/2,H=Math.abs(A-G);if(H<B){const Y=Math.cos(H/B*(Math.PI/2));p[q]=1+(N-1)*Y*Y}else p[q]=1})},x=()=>{a.forEach((A,N)=>{p[N]=1})};n==null||n.addEventListener("mousemove",A=>{A.pointerType==="touch"||i()||g||(v(A.clientX),m())},{passive:!0});const S=()=>{g||(x(),u=a.map(()=>1),a.forEach(A=>{A.style.transform="",A.style.zIndex="";try{A.blur()}catch{}}),h&&(cancelAnimationFrame(h),h=null))};n==null||n.addEventListener("mouseleave",S),n==null||n.addEventListener("pointerup",S),n==null||n.addEventListener("touchend",S),n==null||n.addEventListener("pointercancel",S);let w=null,E=-1,$=-1,C=0,K=0,j=[],P=!1;const F=()=>a.map((A,N)=>{const B=A.getBoundingClientRect();return{idx:N,el:A,x:B.left,cx:B.left+B.width/2,width:B.width}});a.forEach(A=>{A.addEventListener("pointerdown",B=>{if(!(B.button!==0&&B.pointerType==="mouse")){w=A,E=a.indexOf(A),$=E,C=B.clientX,K=B.clientY,P=!1,j=F();try{A.setPointerCapture(B.pointerId)}catch{}}}),A.addEventListener("pointermove",B=>{var W;if(!w||w!==A)return;const D=B.clientX-C,q=B.clientY-K;if(!P&&Math.hypot(D,q)>5&&(P=!0,g=!0,h&&(cancelAnimationFrame(h),h=null),n==null||n.classList.add("is-reordering"),A.classList.add("is-dragging"),a.forEach(G=>{G!==A&&(G.style.zIndex="")})),P&&g){A.style.transform=`translate3d(${D}px, ${q-12}px, 0) scale(1.18)`;let G=E;for(let H=0;H<j.length;H++)if(H===0&&B.clientX<j[0].cx){G=0;break}else if(H===j.length-1&&B.clientX>=j[H].cx){G=j.length-1;break}else if(B.clientX>=j[H].cx&&B.clientX<((W=j[H+1])==null?void 0:W.cx)){const Y=(j[H].cx+j[H+1].cx)/2;G=B.clientX<Y?H:H+1;break}$=Math.max(0,Math.min(a.length-1,G)),j.forEach(({el:H,idx:Y,x:Xe})=>{if(H===A)return;let Lt=0;if(Y>E&&Y<=$){const at=j[Y-1];Lt=at?at.x-Xe:-58}else if(Y<E&&Y>=$){const at=j[Y+1];Lt=at?at.x-Xe:58}H.style.transform=`translate3d(${Lt}px, 0, 0)`})}});const N=B=>{if(!(!w||w!==A)){try{A.releasePointerCapture(B.pointerId)}catch{}if(P&&g){if(n==null||n.classList.remove("is-reordering"),A.classList.remove("is-dragging"),a.forEach(D=>{D.style.transform=""}),$!==E&&$>=0){const D=a.filter(W=>W!==A);$>=D.length?n==null||n.appendChild(A):n==null||n.insertBefore(A,D[$]),a=n?[...n.querySelectorAll(".dock-item")]:[];const q=a.map(W=>W.dataset.view).filter(Boolean);try{localStorage.setItem(s,JSON.stringify(q))}catch{}}u=a.map(()=>1),p=a.map(()=>1),g=!1,x(),m()}else{g=!1,A.style.transform="";const D=A.dataset.view;D&&(A.classList.remove("bouncing"),A.offsetWidth,A.classList.add("bouncing"),A.addEventListener("animationend",()=>A.classList.remove("bouncing"),{once:!0}),eh(A.querySelector(".dock-icon"),B),Se(D))}try{A.blur()}catch{}x(),u=a.map(()=>1),a.forEach(D=>{D.style.transform="",D.style.zIndex=""}),h&&(cancelAnimationFrame(h),h=null),w=null,E=-1,$=-1,P=!1}};A.addEventListener("pointerup",N),A.addEventListener("pointercancel",N)});let J=!1;if(window.addEventListener("keydown",A=>{["ArrowLeft","ArrowRight","Tab","Home","End"].includes(A.key)&&(J=!0)},{passive:!0}),window.addEventListener("pointerdown",()=>{J=!1},{passive:!0}),a.forEach(A=>{A.addEventListener("focus",()=>{if(!J)return;const N=a.indexOf(A);a.forEach((B,D)=>{const q=Math.abs(D-N);p[D]=q===0?1.35:q===1?1.12:1}),m()}),A.addEventListener("blur",()=>{x(),m()}),A.addEventListener("keydown",N=>{var D,q;const B=a.indexOf(A);if(N.key==="ArrowRight"){N.preventDefault();const W=a[B+1]||a[0];W==null||W.focus()}else if(N.key==="ArrowLeft"){N.preventDefault();const W=a[B-1]||a[a.length-1];W==null||W.focus()}else if(N.key==="Home")N.preventDefault(),(D=a[0])==null||D.focus();else if(N.key==="End")N.preventDefault(),(q=a[a.length-1])==null||q.focus();else if(N.key==="Enter"||N.key===" "){N.preventDefault();const W=A.dataset.view;W&&Se(W)}})}),(()=>{let A=0,N=0,B=0,D=!1;const q=()=>{const H=(n?[...n.querySelectorAll(".dock-item")]:[]).map(Y=>Y.dataset.view).filter(Boolean);return H.length?H:["pos","products","customers","transactions","reports","settings","finance"]},W=G=>{let H=G;for(;H&&H!==document.body;){if(H.classList&&(H.classList.contains("modal-overlay")||H.classList.contains("modal")||H.classList.contains("dock")||H.classList.contains("dock-container"))||["INPUT","TEXTAREA","SELECT"].includes(H.tagName))return!0;if(H.scrollWidth>H.clientWidth+10){const Y=window.getComputedStyle(H);if(Y.overflowX==="auto"||Y.overflowX==="scroll")return!0}H=H.parentElement}return!1};window.addEventListener("touchstart",G=>{if(!G.touches||G.touches.length!==1){D=!0;return}const H=G.touches[0];A=H.clientX,N=H.clientY,B=Date.now(),D=W(G.target)},{passive:!0}),window.addEventListener("touchmove",G=>{if(D||!G.touches||G.touches.length!==1)return;const H=G.touches[0],Y=H.clientX-A,Xe=H.clientY-N;Math.abs(Xe)>Math.abs(Y)&&Math.abs(Xe)>12&&(D=!0)},{passive:!0}),window.addEventListener("touchend",G=>{var ir;if(D||!G.changedTouches||!G.changedTouches.length)return;const H=G.changedTouches[0],Y=H.clientX-A,Xe=H.clientY-N,Lt=Date.now()-B;if(Math.abs(Y)>=50&&Math.abs(Y)>Math.abs(Xe)*1.35&&Lt<=550){const rs=q(),$i=k.state.currentView||sessionStorage.getItem("activeView")||"pos",Nt=rs.indexOf($i);if(Nt!==-1){let pn=-1;if(Y<0&&Nt<rs.length-1?pn=Nt+1:Y>0&&Nt>0&&(pn=Nt-1),pn!==-1){const or=rs[pn];try{(ir=navigator.vibrate)==null||ir.call(navigator,12)}catch{}const it=n==null?void 0:n.querySelector(`.dock-item[data-view="${or}"]`);it&&(it.classList.remove("bouncing"),it.offsetWidth,it.classList.add("bouncing"),it.addEventListener("animationend",()=>it.classList.remove("bouncing"),{once:!0})),Se(or)}}}},{passive:!0})})(),!k.state.currentUser)await Se("login");else{const A=sessionStorage.getItem("activeView")||"pos";await Se(A==="login"?"pos":A)}};document.addEventListener("DOMContentLoaded",th);
