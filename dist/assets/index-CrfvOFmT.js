const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-CSRlgf-4.js","./vendor-qr-CYzGYPQn.js","./vendor-jspdf-BEqUCB1L.js"])))=>i.map(i=>d[i]);
import{X as tn}from"./vendor-db-1iEchKay.js";import{c as en}from"./vendor-supabase-BBmmNHm-.js";import{b as an}from"./vendor-qr-CYzGYPQn.js";import{_ as ve}from"./vendor-jspdf-BEqUCB1L.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();const Mt={},l={state:{cart:[],products:[],customers:[],transactions:[],expenses:[],users:[],currentUser:null,currentView:"pos",discount:0,customerName:"",selectedCustomer:null,settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"",shopPhone:"",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,a){return Mt[t]||(Mt[t]=[]),Mt[t].push(a),()=>{Mt[t]=(Mt[t]??[]).filter(e=>e!==a)}},emit(t,a){for(const e of Mt[t]??[])e(a)},addToCart(t,a=1){const e=Math.max(1,parseInt(a,10)||1),s=this.state.cart.findIndex(n=>String(n.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=e:this.state.cart.push({product:t,qty:e}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(a=>String(a.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,a){if(a<=0)return this.removeFromCart(t);const e=this.state.cart.find(s=>String(s.product.id)===String(t));e&&(e.qty=a,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.state.selectedCustomer=null,this.emit("cart:change",this.state.cart),this.emit("selectedCustomer:change",null)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,a)=>t+a.product.price*a.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,a)=>t+a.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setCustomers(t){this.state.customers=t||[],this.emit("customers:change",this.state.customers)},setSelectedCustomer(t){this.state.selectedCustomer=t,this.state.customerName=t?t.name:"",this.emit("selectedCustomer:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(a=>String(a.id)!==String(t)),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,a){const e=this.state.transactions.findIndex(s=>String(s.id)===String(t));e>=0&&(this.state.transactions[e]={...this.state.transactions[e],...a},this.emit("transactions:change",this.state.transactions))},updateCustomer(t,a){const e=this.state.customers.findIndex(s=>String(s.id)===String(t));e>=0&&(this.state.customers[e]={...this.state.customers[e],...a},this.emit("customers:change",this.state.customers))},addCustomer(t){this.state.customers=[...this.state.customers,t],this.emit("customers:change",this.state.customers)},removeCustomer(t){this.state.customers=this.state.customers.filter(a=>String(a.id)!==String(t)),this.emit("customers:change",this.state.customers)},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(a=>a.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)},setUsers(t){this.state.users=t,this.emit("users:change",t)},addUser(t){this.state.users=[...this.state.users,t],this.emit("users:change",this.state.users)},updateUser(t,a){const e=this.state.users.findIndex(s=>String(s.id)===String(t));e>=0&&(this.state.users[e]={...this.state.users[e],...a},this.emit("users:change",this.state.users))},removeUser(t){this.state.users=this.state.users.filter(a=>String(a.id)!==String(t)),this.emit("users:change",this.state.users)},login(t,a=null){const e={id:t.id,username:t.username,name:t.name,role:t.role||"cashier"};this.state.currentUser=e;try{sessionStorage.setItem("bm_active_user",JSON.stringify(e)),a&&localStorage.setItem("bm_jwt_token",a)}catch{}this.emit("auth:change",e)},logout(){this.state.currentUser=null;try{sessionStorage.removeItem("bm_active_user"),localStorage.removeItem("bm_jwt_token")}catch{}this.emit("auth:change",null)},restoreSession(){try{const t=sessionStorage.getItem("bm_active_user");if(t)return this.state.currentUser=JSON.parse(t),this.emit("auth:change",this.state.currentUser),this.state.currentUser}catch{}return null},canAccess(t){if(t==="login")return!0;const a=this.state.currentUser;if(!a)return!1;const e=a.role||"cashier";return e==="owner"?!0:e==="supervisor"?["pos","products","customers","transactions","reports"].includes(t):["pos","customers","transactions"].includes(t)}},le=()=>{if(typeof window<"u"&&window.crypto)return window.crypto;if(typeof globalThis<"u"&&globalThis.crypto)return globalThis.crypto;throw new Error("Web Crypto API tidak tersedia pada runtime ini.")},na=(t=16)=>{const a=le(),e=new Uint8Array(t);return a.getRandomValues(e),Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")},It=(t="")=>{let a;try{const e=le();if(typeof e.randomUUID=="function")a=e.randomUUID();else{const s=new Uint8Array(16);e.getRandomValues(s),s[6]=s[6]&15|64,s[8]=s[8]&63|128,a=Array.from(s,(n,i)=>([4,6,8,10].includes(i)?"-":"")+n.toString(16).padStart(2,"0")).join("")}}catch{a="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const n=Math.random()*16|0;return(s==="x"?n:n&3|8).toString(16)})}return t?`${t}_${a}`:a},Ue=async(t,a)=>{if(!t||typeof t!="string")throw new Error("PIN tidak valid.");if(!a||typeof a!="string")throw new Error("Salt tidak valid.");const e=le(),n=new TextEncoder().encode(`${a}:${t.trim()}`),i=await e.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(i)).map(r=>r.toString(16).padStart(2,"0")).join("")},sa=async(t,a,e)=>{if(!t||!a||!e)return!1;try{const s=await Ue(t,a);if(s.length!==e.length)return!1;let n=0;for(let i=0;i<s.length;i++)n|=s.charCodeAt(i)^e.charCodeAt(i);return n===0}catch{return!1}},Ee=t=>{let a;if(typeof t=="string")typeof btoa=="function"?a=btoa(unescape(encodeURIComponent(t))):a=Buffer.from(t,"utf8").toString("base64");else{const e=new Uint8Array(t);if(typeof btoa=="function"){let s="";for(let n=0;n<e.byteLength;n++)s+=String.fromCharCode(e[n]);a=btoa(s)}else a=Buffer.from(e).toString("base64")}return a.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")},nn=t=>{let a=t.replace(/-/g,"+").replace(/_/g,"/");for(;a.length%4;)a+="=";return typeof atob=="function"?decodeURIComponent(escape(atob(a))):Buffer.from(a,"base64").toString("utf8")},sn=t=>{let a=t.replace(/-/g,"+").replace(/_/g,"/");for(;a.length%4;)a+="=";let e;typeof atob=="function"?e=atob(a):e=Buffer.from(a,"base64").toString("binary");const s=new Uint8Array(e.length);for(let n=0;n<e.length;n++)s[n]=e.charCodeAt(n);return s},ia=async(t,a,e=86400*7)=>{const s=le(),n=new TextEncoder,i={alg:"HS256",typ:"JWT"},o=Math.floor(Date.now()/1e3),r={...t,iat:o,exp:o+e},d=Ee(JSON.stringify(i)),c=Ee(JSON.stringify(r)),p=`${d}.${c}`,m=await s.subtle.importKey("raw",n.encode(a),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),b=await s.subtle.sign("HMAC",m,n.encode(p)),v=Ee(b);return`${p}.${v}`},on=async(t,a)=>{if(!t||typeof t!="string")return null;const e=t.split(".");if(e.length!==3)return null;const[s,n,i]=e,o=`${s}.${n}`,r=le(),d=new TextEncoder;try{const c=await r.subtle.importKey("raw",d.encode(a),{name:"HMAC",hash:"SHA-256"},!1,["verify"]),p=sn(i);if(!await r.subtle.verify("HMAC",c,p,d.encode(o)))return null;const b=nn(n),v=JSON.parse(b),y=Math.floor(Date.now()/1e3);return v.exp&&v.exp<y?null:v}catch{return null}},rn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),dn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),ya=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),wt=(t=new Date)=>`${dn(t)} ${ya(t)}`,it=(t=new Date)=>{const a=t instanceof Date?t:new Date(t);if(Number.isNaN(a.getTime()))return new Date().toISOString().split("T")[0];const e=a.getFullYear(),s=String(a.getMonth()+1).padStart(2,"0"),n=String(a.getDate()).padStart(2,"0");return`${e}-${s}-${n}`},ln=(t=new Date)=>{const a=t instanceof Date?t:new Date(t);return Number.isNaN(a.getTime())?new Date().toISOString().slice(0,7):`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`},va="https://wiapnhpdgjbtkblowfig.supabase.co",Re="sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g",cn="STORE-BM-856CFAC8",Fe="bm_master_store_key",ee="bm_jwt_token",oa="bm_jwt_signing_secret",ha=()=>{try{const e=localStorage.getItem(oa);if((e==null?void 0:e.length)>=32)return e}catch{}const t=new Uint8Array(32);(globalThis.crypto||window.crypto).getRandomValues(t);const a=Array.from(t,e=>e.toString(16).padStart(2,"0")).join("");try{localStorage.setItem(oa,a)}catch{}return a},ht=()=>{try{const t=localStorage.getItem(Fe);if(t!=null&&t.trim())return t.trim()}catch{}return cn},pn=t=>{try{if(t!=null&&t.trim())return localStorage.setItem(Fe,t.trim()),!0}catch{}return!1},Z=()=>{try{return localStorage.getItem(Fe)==="ISOLATED_SANDBOX"}catch{return!1}};let Te=null,Ie=null;const nt=()=>(Te||(Te=en(va,Re,{auth:{persistSession:!1},realtime:{params:{eventsPerSecond:20}}})),Te),rt=(t,a)=>{const e=document.getElementById("status-badge");e&&(t==="online"?(e.textContent=a||"🟢 Cloud Realtime",e.classList.remove("status-badge--offline"),e.style.background="rgba(16, 185, 129, 0.12)",e.style.borderColor="rgba(16, 185, 129, 0.3)",e.style.color="#059669"):t==="syncing"?(e.textContent="🔄 Sinkronisasi...",e.classList.remove("status-badge--offline"),e.style.background="rgba(37, 99, 235, 0.12)",e.style.borderColor="rgba(37, 99, 235, 0.3)",e.style.color="#2563eb"):(e.textContent=a||"⚡ Mode Offline",e.classList.add("status-badge--offline"),e.style.background="rgba(239, 68, 68, 0.12)",e.style.borderColor="rgba(239, 68, 68, 0.3)",e.style.color="#dc2626"))};let _e=null,jt=!0,je=0;const he=()=>jt,un=async()=>{if(Z())return{ok:!1,rtt:0,isolated:!0};const t=performance.now();try{const a=new AbortController,e=setTimeout(()=>a.abort(),3500),s=await fetch(`${va}/rest/v1/settings?select=key&limit=1`,{method:"GET",headers:{apikey:Re,Authorization:`Bearer ${Re}`},signal:a.signal,cache:"no-store"});clearTimeout(e);const n=performance.now(),i=Math.round(n-t);return s.ok?(jt=!0,je=i,{ok:!0,rtt:i}):(jt=!1,{ok:!1,rtt:i})}catch{return jt=!1,je=0,{ok:!1,rtt:0}}},mn=(t=12e3)=>{_e&&clearInterval(_e);const a=async()=>{const e=await un();e.ok?(e.rtt>1500?rt("syncing",`🟡 Sinyal Lambat (${e.rtt}ms)`):rt("online",`🟢 Cloud Realtime (${e.rtt}ms)`),At()):rt("offline","🔴 Mode Offline (Staged)")};a(),_e=setInterval(a,t),window.addEventListener("online",()=>a()),window.addEventListener("offline",()=>rt("offline","🔴 Mode Offline (Staged)"))},At=async()=>{try{const a=(await T.transactions.where("syncStatus").equals("staged_offline").toArray()).length,e=document.getElementById("staged-offline-banner"),s=document.getElementById("staged-tx-count");return e&&s&&(a>0&&jt?(s.textContent=a,e.style.display="flex"):e.style.display="none"),a}catch{return 0}},gn=async()=>{var t,a,e;if(!jt||Z())return(t=window.showToast)==null||t.call(window,"Tidak dapat menyinkronkan: Server belum terjangkau.","warning"),{success:!1};try{rt("syncing","🔄 Mengunggah data offline...");const s=await T.transactions.where("syncStatus").equals("staged_offline").toArray();if(s.length===0)return At(),{success:!0,count:0};const n=nt(),{error:i}=await n.from("transactions").upsert(s.map(Ge));if(i)throw i;for(const o of s)o.syncStatus="synced",await T.transactions.put(o);return At(),rt("online",`🟢 Cloud Realtime (${je}ms)`),(a=window.showToast)==null||a.call(window,`Sukses menyinkronkan ${s.length} transaksi offline ke Cloud!`,"success"),{success:!0,count:s.length}}catch(s){return(e=window.showToast)==null||e.call(window,`Gagal menyinkronkan data offline: ${s.message}`,"error"),{success:!1,error:s.message}}},bn=t=>({id:String(t.id),name:t.name||"",category:t.category||"Umum",price:Number(t.price)||0,unit:t.unit||"buah",emoji:t.emoji||"📦",stock:Number(t.stock)||0,updated_at:new Date().toISOString()}),Ge=t=>({id:String(t.id),invoice_no:t.invoiceNo||t.invoice_no||`INV-${Date.now()}`,date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||it(t.date?new Date(t.date):new Date),customer_name:t.customerName||t.customer_name||"",items:t.items||[],subtotal:Number(t.subtotal)||0,discount:Number(t.discount)||0,tax:Number(t.tax)||0,total:Number(t.total)||0,paid:Number(t.paid)||0,change:Number(t.change)||0,payment_method:t.paymentMethod||t.payment_method||"cash",payment_status:t.paymentStatus||t.payment_status||"cash_paid",paid_amount:Number(t.paidAmount||t.paid_amount)||0,remaining_debt:Number(t.remainingDebt||t.remaining_debt)||0,debt_payments:t.debtPayments||t.debt_payments||[],cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),wa=t=>({id:String(t.id),date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||it(t.date?new Date(t.date):new Date),category:t.category||"Operasional",note:t.note||"",amount:Number(t.amount)||0,cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),fn=t=>({id:String(t.id),name:t.name||"",phone:t.phone||"",address:t.address||"",category:t.category||"Rumah Tangga",total_orders:Number(t.totalOrders||t.total_orders)||0,total_spent:Number(t.totalSpent||t.total_spent)||0,total_debt:Number(t.totalDebt||t.total_debt)||0,credit_limit:Number(t.creditLimit||t.credit_limit)||0,galon_loaned:Number(t.galonLoaned||t.galon_loaned)||0,notes:t.notes||"",updated_at:new Date().toISOString()}),yn=t=>{const a=String(t.username||"").toLowerCase().trim();return{id:t.id?String(t.id):a?`usr_${a}`:It("usr"),store_id:ht(),username:a,name:String(t.name||""),role:String(t.role||"cashier"),pin_hash:String(t.pinHash||t.pin_hash||""),pin_salt:String(t.pinSalt||t.pin_salt||""),is_active:t.isActive!==void 0?!!t.isActive:t.is_active!==void 0?!!t.is_active:!0,updated_at:new Date().toISOString()}},Ht=async()=>{var a;if(Z())return rt("offline","🔒 Mode Demo Terisolasi"),{success:!0,isolated:!0};if(!navigator.onLine)return rt("offline","⚡ Mode Offline"),{success:!1,offline:!0};ht();const t=nt();rt("syncing");try{try{const{data:e,error:s}=await t.from("products").select("*");if(!s&&e){const n=new Set(e.map(r=>String(r.id))),i=await T.products.toArray();for(const r of i)n.has(String(r.id))||await T.products.delete(r.id);for(const r of e){const d=String(r.id);await T.products.put({id:d,sku:`BM-${d.replace("prod_","")}`,name:r.name||"",category:r.category||"Umum",price:Number(r.price)||0,cost:0,unit:r.unit||"buah",emoji:r.emoji||"📦",image:null,stock:Number(r.stock)||0,deleted_at:null})}const o=await dt();l.setProducts(o),l.emit("products:change",o)}}catch{}try{const[e,{data:s,error:n}]=await Promise.all([mt(),t.from("transactions").select("*")]);if(!n&&s){const i=e.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("transactions").upsert(i.map(Ge));for(const d of i)d.syncStatus="synced",await T.transactions.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of e)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await T.transactions.delete(d.id);for(const d of s){const c=String(d.id);await T.transactions.put({id:c,invoiceNo:d.invoice_no,date:d.date,dateKey:d.date_key,customerName:d.customer_name,items:d.items||[],subtotal:Number(d.subtotal),discount:Number(d.discount),tax:Number(d.tax),total:Number(d.total),paid:Number(d.paid),change:Number(d.change),paymentMethod:d.payment_method,paymentStatus:d.payment_status,paidAmount:Number(d.paid_amount),remainingDebt:Number(d.remaining_debt),debtPayments:d.debt_payments||[],cashier:d.cashier,syncStatus:"synced",deleted_at:null})}const r=await mt();l.setTransactions(r),l.emit("transactions:change",r)}}catch{}try{const[e,{data:s,error:n}]=await Promise.all([ie(),t.from("expenses").select("*")]);if(!n&&s){const i=e.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("expenses").upsert(i.map(wa));for(const d of i)d.syncStatus="synced",await T.expenses.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of e)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await T.expenses.delete(d.id);for(const d of s){const c=String(d.id);await T.expenses.put({id:c,date:d.date,dateKey:d.date_key,category:d.category,note:d.note,amount:Number(d.amount),cashier:d.cashier,deleted_at:null})}const r=await ie();l.setExpenses(r),l.emit("expenses:change",r)}}catch{}try{const[e,{data:s,error:n}]=await Promise.all([Y(),t.from("customers").select("*")]);if(!n&&s){const i=new Set(s.map(r=>String(r.id)));for(const r of e)i.has(String(r.id))||await T.customers.delete(r.id);for(const r of s){const d=String(r.id);await T.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const o=await Y();(a=l.setCustomers)==null||a.call(l,o),l.emit("customers:change",o)}}catch{}try{await Bt()}catch{}try{const{data:e,error:s}=await t.from("settings").select("*"),n=await T.settings.toArray();if(!s&&e){if(e.length===0&&n.length>0)await t.from("settings").upsert(n.map(i=>({key:i.key,value:String(i.value??""),updated_at:new Date().toISOString()})));else if(e.length>0)for(const i of e)i.key.startsWith("users_roster_")||await T.settings.put({key:i.key,value:i.value??""})}}catch{}return rt("online","🟢 Cloud Realtime"),{success:!0}}catch(e){return rt("online","🟢 Cloud Aktif"),{success:!1,error:e}}finally{}},xa=()=>{if(Z())return;const t=nt(),a=ht();Ie&&t.removeChannel(Ie),Ie=t.channel(`store_realtime_${a}`).on("postgres_changes",{event:"*",schema:"public",table:"products"},async e=>{var n,i;if(e.eventType==="DELETE"){const o=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await T.products.delete(o)}else if(e.new){const o=e.new,r=String(o.id);await T.products.put({id:r,sku:`BM-${r.replace("prod_","")}`,name:o.name||"",category:o.category||"Umum",price:Number(o.price)||0,cost:0,unit:o.unit||"buah",emoji:o.emoji||"📦",image:null,stock:Number(o.stock)||0,deleted_at:null})}const s=await dt();l.setProducts(s),l.emit("products:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"transactions"},async e=>{var n,i;if(e.eventType==="DELETE"){const o=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await T.transactions.delete(o)}else if(e.new){const o=e.new,r=String(o.id);await T.transactions.put({id:r,invoiceNo:o.invoice_no,date:o.date,dateKey:o.date_key,customerName:o.customer_name,items:o.items||[],subtotal:Number(o.subtotal),discount:Number(o.discount),tax:Number(o.tax),total:Number(o.total),paid:Number(o.paid),change:Number(o.change),paymentMethod:o.payment_method,paymentStatus:o.payment_status,paidAmount:Number(o.paid_amount),remainingDebt:Number(o.remaining_debt),debtPayments:o.debt_payments||[],cashier:o.cashier,syncStatus:"synced",deleted_at:null})}const s=await mt();l.setTransactions(s),l.emit("transactions:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"expenses"},async e=>{var n,i;if(e.eventType==="DELETE"){const o=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await T.expenses.delete(o)}else if(e.new){const o=e.new,r=String(o.id);await T.expenses.put({id:r,date:o.date,dateKey:o.date_key,category:o.category,note:o.note,amount:Number(o.amount),cashier:o.cashier,deleted_at:null})}const s=await ie();l.setExpenses(s),l.emit("expenses:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"customers"},async e=>{var n,i,o;if(e.eventType==="DELETE"){const r=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await T.customers.delete(r)}else if(e.new){const r=e.new,d=String(r.id);await T.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const s=await Y();(o=l.setCustomers)==null||o.call(l,s),l.emit("customers:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"settings"},async e=>{var s;if(e.new&&e.new.key===`users_roster_${a}`)try{const n=JSON.parse(e.new.value);if(Array.isArray(n)&&n.length>0){const i=new Set(n.map(d=>String(d.username).toLowerCase().trim())),o=await T.users.toArray();for(const d of o)i.has(String(d.username).toLowerCase().trim())||await T.users.delete(d.id);for(const d of n){const c=String(d.username).toLowerCase().trim(),p=await T.users.where("username").equalsIgnoreCase(c).first(),b={id:d.id?String(d.id):p!=null&&p.id?String(p.id):`usr_${c}`,username:c,name:d.name,role:d.role,pinHash:d.pin_hash||d.pinHash,pinSalt:d.pin_salt||d.pinSalt,isActive:d.is_active!==void 0?!!d.is_active:d.isActive!==void 0?!!d.isActive:!0,createdAt:d.created_at||d.createdAt||new Date().toISOString(),updatedAt:d.updated_at||d.updatedAt||new Date().toISOString()};await T.users.put(b)}const r=await T.users.toArray();l.setUsers(r),l.emit("users:change",r)}}catch{}else if((s=e.new)!=null&&s.key)try{await T.settings.put({key:e.new.key,value:e.new.value??""}),l.updateSettings({[e.new.key]:e.new.value??""})}catch{}}).subscribe(e=>{e==="SUBSCRIBED"?rt("online","🟢 Cloud Realtime"):(e==="CLOSED"||e==="CHANNEL_ERROR")&&rt("offline","⚡ Mode Offline")}),window.addEventListener("online",()=>{Ht()})},ka=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("products").upsert(bn(t))}catch{}},vn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("products").delete().eq("id",String(t))}catch{}},Sa=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("customers").upsert(fn(t))}catch{}},hn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("customers").delete().eq("id",String(t))}catch{}},$a=async t=>{if(Z()||!navigator.onLine)return{success:!1,offline:!0};try{const a=nt(),{error:e}=await a.from("transactions").upsert(Ge(t));if(e)throw e;return{success:!0}}catch(a){return{success:!1,error:a.message}}},wn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("transactions").delete().eq("id",String(t))}catch{}},xn=async t=>{if(Z()||!navigator.onLine)return{success:!1,offline:!0};try{const a=nt(),{error:e}=await a.from("expenses").upsert(wa(t));if(e)throw e;return{success:!0}}catch(a){return{success:!1,error:a.message}}},kn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("expenses").delete().eq("id",String(t))}catch{}},Ea=async(t,a)=>{if(!(Z()||!navigator.onLine))try{await nt().from("settings").upsert({key:String(t),value:typeof a=="object"?JSON.stringify(a):String(a??""),updated_at:new Date().toISOString()})}catch{}},Ta=async()=>{if(Z()||!navigator.onLine)return null;try{const s=new AbortController,n=setTimeout(()=>s.abort(),2e3),i=await fetch("/api/auth/users",{signal:s.signal});if(clearTimeout(n),i.ok){const o=await i.json();if(o.success&&Array.isArray(o.users)&&o.users.length>0)return o.users}}catch{}const t=ht(),a=nt(),e=`users_roster_${t}`;try{const s=new AbortController,n=setTimeout(()=>s.abort(),2500),{data:i,error:o}=await a.from("settings").select("value").eq("key",e).abortSignal(s.signal).maybeSingle();if(clearTimeout(n),!o&&(i!=null&&i.value)){const r=JSON.parse(i.value);if(Array.isArray(r)&&r.length>0)return r}}catch{}return null},Bt=async()=>{const t=await Ta();if(!t||t.length===0)return[];const a=new Set(t.map(n=>String(n.username).toLowerCase().trim())),e=await T.users.toArray();for(const n of e)a.has(String(n.username).toLowerCase().trim())||await T.users.delete(n.id);for(const n of t){const i=String(n.username).toLowerCase().trim(),o=await T.users.where("username").equalsIgnoreCase(i).first(),d={id:n.id?String(n.id):o!=null&&o.id?String(o.id):`usr_${i}`,username:i,name:n.name,role:n.role,pinHash:n.pin_hash||n.pinHash||(o==null?void 0:o.pinHash)||"",pinSalt:n.pin_salt||n.pinSalt||(o==null?void 0:o.pinSalt)||"",isActive:n.is_active!==void 0?!!n.is_active:n.isActive!==void 0?!!n.isActive:!0,createdAt:n.created_at||n.createdAt||new Date().toISOString(),updatedAt:n.updated_at||n.updatedAt||new Date().toISOString()};await T.users.put(d)}const s=await T.users.toArray();return l.setUsers(s),l.emit("users:change",s),s},We=async(t,a)=>{const e=ht(),s=ha(),n=String(t).toLowerCase().trim(),i=String(a||"").trim();if(navigator.onLine&&!Z()){try{const o=new AbortController,r=setTimeout(()=>o.abort(),4e3),d=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,pin:i,storeId:e}),signal:o.signal});if(clearTimeout(r),d.ok){const c=await d.json();if(c.success&&c.user){if(c.token)try{localStorage.setItem(ee,c.token)}catch{}return Bt().catch(()=>{}),{success:!0,user:c.user,token:c.token,isServerValidated:!0}}}else if(d.status===401||d.status===429||d.status===400){const c=await d.json().catch(()=>({}));return{success:!1,error:c.error||"PIN atau username salah.",lockedUntil:c.lockedUntil||0}}}catch{}try{const o=await Ta();if(o&&o.length>0){const r=o.find(d=>String(d.username).toLowerCase().trim()===n||String(d.id)===n);if(r){if(r.isActive===!1||r.is_active===!1)return{success:!1,error:"Akun operator ini telah dinonaktifkan oleh Owner."};const d=r.pin_salt||r.pinSalt,c=r.pin_hash||r.pinHash;if(d&&c){if(!await sa(i,d,c))return{success:!1,error:"PIN salah! Silakan periksa kembali."};Bt().catch(()=>{});const m={sub:r.id||r.username,username:r.username,name:r.name,role:r.role,storeId:e},b=await ia(m,s,86400*7);try{localStorage.setItem(ee,b)}catch{}return{success:!0,user:{id:r.id||r.username,username:r.username,name:r.name,role:r.role},token:b,isServerValidated:!0}}}}}catch{}}try{const r=(await T.users.toArray()).find(m=>String(m.username).toLowerCase().trim()===n||String(m.id)===n);if(!r)return{success:!1,error:"Perangkat offline dan akun belum tersimpan di cache lokal."};if(r.isActive===!1)return{success:!1,error:"Akun operator tidak aktif."};if(!await sa(i,r.pinSalt,r.pinHash))return{success:!1,error:"PIN salah! Silakan periksa kembali."};const c={sub:r.id||r.username,username:r.username,name:r.name,role:r.role,storeId:e,offline:!0},p=await ia(c,s,86400*2);try{localStorage.setItem(ee,p)}catch{}return{success:!0,user:{id:r.id,username:r.username,name:r.name,role:r.role},token:p,isServerValidated:!1,isOfflineFallback:!0}}catch(o){return{success:!1,error:`Gagal memvalidasi kredensial: ${o.message}`}}},Sn=async()=>{let t=null;try{t=localStorage.getItem(ee)}catch{}if(!t)return null;const a=ha(),e=await on(t,a);if(!(e!=null&&e.username)){try{localStorage.removeItem(ee)}catch{}return null}return{id:e.sub||e.username,username:e.username,name:e.name,role:e.role}},Ia=async t=>{if(Z()||!navigator.onLine)return;const a=ht(),e=nt();try{const s=`users_roster_${a}`,{data:n,error:i}=await e.from("settings").select("value").eq("key",s).maybeSingle();let o=[];if(!i&&(n!=null&&n.value))try{const p=JSON.parse(n.value);Array.isArray(p)&&(o=p)}catch{}const r=String(t.username).toLowerCase().trim(),d=yn(t),c=o.findIndex(p=>String(p.username).toLowerCase().trim()===r);c>=0?o[c]={...o[c],...d}:o.push(d),await e.from("settings").upsert({key:s,value:JSON.stringify(o),updated_at:new Date().toISOString()})}catch{}},$n=async t=>{if(Z()||!navigator.onLine)return;const a=ht(),e=nt(),s=String(t).toLowerCase().trim();try{const n=`users_roster_${a}`,{data:i,error:o}=await e.from("settings").select("value").eq("key",n).maybeSingle();if(!o&&(i!=null&&i.value)){let r=JSON.parse(i.value);Array.isArray(r)&&(r=r.filter(d=>String(d.username).toLowerCase().trim()!==s),await e.from("settings").upsert({key:n,value:JSON.stringify(r),updated_at:new Date().toISOString()}))}}catch{}},En=async(t,a)=>{var e;if(navigator.onLine&&!Z()){try{const s=new AbortController,n=setTimeout(()=>s.abort(),3500),i=await fetch("/api/stock/decrement",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:t,transaction:a}),signal:s.signal});if(clearTimeout(n),i.ok&&(await i.json()).success)return{success:!0,via:"cloudflare-edge"}}catch{}try{const s=nt();for(const n of t||[]){const i=((e=n.product)==null?void 0:e.id)||n.id,o=Number(n.qty)||1;if(i)for(let r=0;r<3;r++){const{data:d,error:c}=await s.from("products").select("id, stock").eq("id",String(i)).limit(1);if(c||!d||d.length===0)break;const p=Number(d[0].stock)||0,m=Math.max(0,p-o),{data:b,error:v}=await s.from("products").update({stock:m,updated_at:new Date().toISOString()}).eq("id",String(i)).eq("stock",p).select("id");if(!v&&b&&b.length>0)break}}return{success:!0,via:"supabase-direct"}}catch{}}return{success:!0,via:"offline-staged"}},T=new tn("BlueMountainPOS");T.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});T.version(3).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category"});T.version(4).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category",users:"++id, username, role, isActive"});T.version(5).stores({products:"id, category, sku, deleted_at",customers:"id, name, phone, category, totalDebt, deleted_at",transactions:"id, invoiceNo, dateKey, paymentStatus, paymentMethod, customerName, syncStatus, deleted_at",settings:"key",expenses:"id, dateKey, category, deleted_at",users:"id, username, role, isActive"});const St=()=>T.users.toArray(),Tn=t=>T.users.get(t),In=async t=>{const a={...t,id:t.id?String(t.id):It("usr")};return await T.users.put(a),Ia(a).catch(()=>{}),a.id},_n=async t=>{const a={...t,id:t.id?String(t.id):t.username?`usr_${String(t.username).toLowerCase().trim()}`:It("usr")},e=await T.users.put(a);return Ia(a).catch(()=>{}),e},Ln=async t=>{const a=await T.users.get(t),e=await T.users.delete(t);return a!=null&&a.username&&$n(a.username).catch(()=>{}),e},Y=async()=>(await T.customers.toArray()).filter(a=>!a.deleted_at),_a=async t=>{const a={...t,id:t.id?String(t.id):It("cust"),deleted_at:null,updated_at:new Date().toISOString()};return await T.customers.put(a),Sa(a).catch(()=>{}),a.id},Wt=async t=>{const a={...t,updated_at:new Date().toISOString()},e=await T.customers.put(a);return Sa(a).catch(()=>{}),e},Pn=async t=>{const a=await T.customers.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await T.customers.put(e),hn(t).catch(()=>{})}return t},dt=async()=>(await T.products.toArray()).filter(a=>!a.deleted_at),La=async t=>{const a={...t,id:t.id?String(t.id):It("prod"),deleted_at:null,updated_at:new Date().toISOString()};return await T.products.put(a),ka(a).catch(()=>{}),a.id},Pa=async t=>{const a={...t,updated_at:new Date().toISOString()},e=await T.products.put(a);return ka(a).catch(()=>{}),e},An=async t=>{const a=await T.products.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await T.products.put(e),vn(t).catch(()=>{})}return t},Bn=async t=>{const a=typeof he=="function"?he():navigator.onLine,e={...t,id:t.id?String(t.id):It("tx"),syncStatus:"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};if(await T.transactions.put(e),a)try{const s=await $a(e);s!=null&&s.success&&(e.syncStatus="synced",await T.transactions.put(e))}catch{}try{At==null||At()}catch{}return e.id},mt=async()=>(await T.transactions.toArray()).filter(a=>!a.deleted_at),Cn=async t=>{const a=await T.transactions.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await T.transactions.put(e),wn(t).catch(()=>{})}return t},se=async t=>{const a={...t,updated_at:new Date().toISOString()},e=await T.transactions.put(a);return $a(a).catch(()=>{}),e},Nn=async t=>{const a=typeof he=="function"?he():navigator.onLine,e={...t,id:t.id?String(t.id):It("exp"),syncStatus:"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};if(await T.expenses.put(e),a)try{const s=await xn(e);s!=null&&s.success&&(e.syncStatus="synced",await T.expenses.put(e))}catch{}return e.id},ie=async()=>(await T.expenses.toArray()).filter(a=>!a.deleted_at),Mn=async t=>{const a=await T.expenses.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await T.expenses.put(e),kn(t).catch(()=>{})}return t},Je=async t=>{const a=await T.settings.get(t);return(a==null?void 0:a.value)??null},Aa=async(t,a)=>{await T.settings.put({key:t,value:a}),Ea(t,a).catch(()=>{})},Ve=async()=>{await T.users.count()>0||await T.users.put({id:"usr_admin",username:"admin",name:"Fadhilah Ramadhan",role:"owner",pinHash:"d6d80d026dadedb6b7c9c15ee0f3653761b1c2a1ac6e03abf9edd86bb8e911f1",pinSalt:"c40d7da58df489a2718e1c52d445e45a",isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})},zn=async()=>{await Promise.all([T.products.clear(),T.customers.clear(),T.transactions.clear(),T.expenses.clear(),T.settings.clear(),T.users.clear()]),sessionStorage.clear(),localStorage.clear()},Dn=async()=>{const[t,a,e,s,n,i]=await Promise.all([T.products.toArray(),T.customers.toArray(),T.transactions.toArray(),T.expenses.toArray(),T.settings.toArray(),T.users.toArray()]),o=n.find(d=>d.key==="shopName"),r=(o==null?void 0:o.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"1.6.5",exportedAt:new Date().toISOString(),shopName:r,data:{products:t,customers:a,transactions:e,expenses:s,settings:n,users:i},meta:{productCount:t.length,customerCount:a.length,transactionCount:e.length,expenseCount:s.length,settingCount:n.length,userCount:i.length}}},On=async(t,a="replace")=>{if(!(t!=null&&t.data))throw new Error("Format file backup tidak valid atau rusak.");const{products:e=[],customers:s=[],transactions:n=[],expenses:i=[],settings:o=[],users:r=[]}=t.data;return a==="replace"?(await Promise.all([T.products.clear(),T.customers.clear(),T.transactions.clear(),T.expenses.clear(),T.settings.clear(),T.users.clear()]),e.length&&await T.products.bulkAdd(e),s.length&&await T.customers.bulkAdd(s),n.length&&await T.transactions.bulkAdd(n),i.length&&await T.expenses.bulkAdd(i),o.length&&await T.settings.bulkPut(o),r.length&&await T.users.bulkAdd(r)):a==="merge"&&(e.length&&await T.products.bulkPut(e),s.length&&await T.customers.bulkPut(s),n.length&&await T.transactions.bulkPut(n),i.length&&await T.expenses.bulkPut(i),o.length&&await T.settings.bulkPut(o),r.length&&await T.users.bulkPut(r)),{products:e.length,customers:s.length,transactions:n.length,expenses:i.length,settings:o.length,users:r.length}},Un=()=>T.open(),x=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),f=t=>{const a=Number(t);if(Number.isNaN(a))return"Rp 0";const e=Math.round(Math.abs(a)).toLocaleString("id-ID");return(a<0?"-Rp ":"Rp ")+e},Ba="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHbElEQVR4nO2cS24rOwxEs/9Nv4cLJIAttCSS4qeorgN4kLglFcnTtuNBfv4jpJCf6gDk3VBAUgoFJKVQQFIKBSSlUEBSCgU84OeH7TuFHTTyT76/B7HD7hn5FJAS2mHnDIzyUUI77JqSmXwU0Aa7pmQlICXUw44p2MlHCfWwW0Kk8lFCHeyUAK18lFAOuySAAsbBLm2wykcJZbBDC07lo4R72J0FXgJSwjnszARP+SjgHHbmAW/5KOEcdmUgSj5K+Aw7MhAtICX8ht34IEM+CvgNu/FLlnyU8Bt24pdsAXcSvkXU+ysUUCHfSrA3vVreXZ2ASvme5HrbW/a9lQnwkMdTwpO37K7cWZWQLHEi3667c2VVkmFlvnJRwjnXVSQZlrcMmQLeJuFV1UiH5S1BtoA3SXhNJdmyaM6nhHOuqEI6rMjhU0Ab7auoGDyKgDdI2L4CpKFTQj2t06MNvCpPZwnbJkcdNCXU0TI18pCRsyHSLnWHAXfIiEKrxF0GW5mzm4Rt0nYbare8VbRJijJM6XCrBewiYYuUSEPUDLZawA4SwidEGqBloEj5EYFOiDS8k4Ei1YEGbDqkoZ0OsroWZAkhk1UP63NgXkOsrgdVQrhU1UMaB+U5vOq6ECWES4Q0IO/BVddGATdUD+cn4K0XuUYEYNJUD2UcTOTAqutEkhAiSfUwxqFED6q6TiQJy1NUD+FpGBlDqq6XAoIMYRxG1qCq60WRsCxBdeM1AkYMqrpeFAkpYOE/B6quG0HCkpOrm20V0HtQ1XUjSJh+anWTKSCWhKknVjd31/DIQVmFp4BeBwE011NA7cC6CJgtYcpp1Q2VNHv8nffwOgmYKSEFfMh5klnSgw59yZIw/JTqJlJAbAnrvwoHYmx8tICEAn4RJSDlm8OOfBD5tk4Bn2FHBjxeBSs/U3WDHRl4EobyxXFdVzwGPROHAvpzRVc0Q5aKoPlcR/nstO6MZsgWEVYiUT4f2nZHOuRTGZDfdm8QvGV6zaA9hMiUT/txggIWcCLgycCiX/EsHym6S9guuWX46J/PtLmQa9HSMrVVqOrPbKf5T9ci0jL1qUgVn+dO90e4cSJom9xbHIuUJw/PXJ3pnT7h+7gMybJrQqJ/Bb9kCuJN5+yn3FPJB5lvkZ0zIXBnVR9EfYbLetzO/RUOVAv1duFG3lfxBgqWCztCSqGApBQKSEqhgKQUCkhKoYCkFEgBo7/m8PyK5HQvydqbvwKCTBXdbBQBpWspYDLRDaeAOECm8mr4rOkUEAfIVJ4CagbqmdVzLQVMxtLANwp4A5BVdBooBTwDsopOA6WAZ0BW0WmgFPAMyCpmDbc8NPt7ZvVcG9EDFCDTRcq32t8zq+daCpgMBfTtBzKQ6bwEnDWfAuIAmc5TQM1APbN6rqWAyXgPdFx/i4A3AFnFSbMpYC8gq4geqvdArftRQAoYKuBqT80aCpiMpeGrgUoF1Dy0+1lyeuZFFRYylVfDswT0zBzZD0QgU0XK57V/RO7ofiACmSpSPq/9vbNn9AMRyFTRzUbaP6sfFPCldBGhCnaDlEIBSSkUkJRCAUkpsALyQ/s7mE7X46837fqor0BOrrf0YXZ91Nco3l/xeNe/zO6xicf6yGGc5PS4Caw1ogp42tOva7OKmq31HkiWgBohPGq1CCiZV0b9sAKeDkS6pzarNKN0T696Nb2+VkDLQLUCave2Fi+53kOKHRZxpPkQ6ncX0CKJtLAdaAJKbqzTmjTrEOtPE1Czxtr03dqKAUTfBNp1KgGK6zcLKDX/LQJGZojsQXX9bgJG3iWaplHA5+dR6z8S8G9j6e81ha+oFnDVn4gMkjXWPavrVwm4Olgig6VB2qZlCSjtRYSAVrkQ66eABwPQ9sOaQXK9VYSM+l0F3B262kMSfMdpwyL2yxTwRL4IAaWZpvVYm3IqoLQ47Znafd8moLa+VgLu9tAEt1y3u157jbTOXUbLjWU5o0rAk/rNAo7XSPawBDcX5rSf15krToa8Y5fHS0Br/UcCfl4n2cMS3DpUy74nfdidqV0juU5KloCW+o8F1ISxBLfKp91Xs95y5un13j2Q7htd/3K3E/megljXnWTw2PN0jcf+kS8GEWeLbz5FDYS4QwFJKRSQlEIBSSmhAlr+wtr9hfb3/NO1qxyrfLOfZ78bs2n7sKpNcr6kb5IM4/OzNZGkCygVbPf8bJirDLPnVtdaBNhdu9pjl2e31tLnXZ2RpAg4/jx7Fdutl+w9u85LQOkrzu5sTT5p/qf9pGJLbz5vUgUcf2e5K2fPeQv4dJNIhJqdrZV015tZzdKbXDKHawTcFThrtOS52c9Pe8yes+Rd7bPrgSSf9VytgJJHJDCfAaXrx+dmP0vOWO3hJeCsllU+qQweAkprj6KFgJLnvAWcrZXcDOMZ1v2k/VvVa6nhOgHHn2eFagerGdrqFW113m7IEsElr2Kam0mazZJjtU8EcH+EjE2Q7i0R2SLgLIf0VUJy3VOPNDV75JUIH0Hs7oRsoICkFApISqGApBQKSEqhgKSU/wFlggp6xOLiGQAAAABJRU5ErkJggg==",Rn=new Uint8Array([27,97,1,29,118,48,0,20,0,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,254,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,255,255,255,7,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,15,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,255,255,159,224,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,127,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,4,3,255,254,127,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,14,7,255,254,127,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,31,7,255,252,127,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,63,143,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,127,223,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,252,63,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,248,31,255,255,255,128,0,0,0,0,0,0,0,0,0,0,1,255,255,255,248,31,255,255,255,192,0,0,0,0,0,0,0,0,0,0,3,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,7,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,15,255,255,255,224,7,255,255,255,240,0,0,0,0,0,0,0,0,0,0,31,255,255,255,192,7,255,255,255,248,0,0,0,0,0,0,0,0,0,0,63,255,255,255,192,3,255,255,255,252,0,0,0,0,0,0,0,0,0,0,63,255,255,255,136,3,255,255,255,254,0,0,0,0,0,0,0,0,0,0,127,255,255,255,8,1,255,255,255,255,0,0,0,0,0,0,0,0,0,0,255,255,255,255,16,0,255,255,255,255,0,0,0,0,0,0,0,0,0,1,255,255,255,254,48,0,127,255,255,255,128,0,0,0,0,0,0,0,0,3,255,255,255,252,96,0,127,255,255,255,192,0,0,0,0,0,0,0,0,7,255,255,255,252,224,0,63,255,255,255,224,0,0,0,0,0,0,0,0,15,255,255,255,248,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,15,255,255,255,241,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,31,255,255,255,243,128,0,15,255,255,255,248,0,0,0,0,0,0,0,0,63,255,255,255,227,128,0,7,255,255,255,252,0,0,0,0,0,0,0,0,127,255,255,255,231,0,0,7,255,255,255,254,0,0,0,0,0,0,0,0,255,255,255,255,199,0,0,3,255,255,255,254,0,0,0,0,0,0,0,1,255,255,255,255,207,128,0,3,255,255,255,255,0,0,0,0,0,0,0,3,255,255,255,255,207,192,0,3,255,255,255,255,128,0,0,0,0,0,0,3,255,255,255,255,159,224,0,1,255,255,255,255,192,0,0,0,0,0,0,7,255,255,255,255,159,240,0,1,255,255,255,255,224,0,0,0,0,0,0,15,255,255,255,255,159,240,0,1,255,255,255,255,240,0,0,0,0,0,0,31,255,255,255,255,31,252,0,57,255,255,255,255,240,0,0,0,0,0,0,63,255,255,255,255,31,255,0,57,255,255,255,255,248,0,0,0,0,0,0,127,255,255,255,255,59,255,240,57,255,255,255,255,252,0,0,0,0,0,0,127,255,255,255,255,27,255,240,57,255,255,255,255,254,0,0,0,0,0,0,255,255,255,255,255,27,255,240,57,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,29,255,240,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,255,240,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,248,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,7,159,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,8,3,199,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,224,48,1,243,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,240,0,255,255,0,0,1,128,0,0,0,0,0,0,0,0,0,0,7,192,240,0,127,254,0,14,1,128,0,0,0,0,0,0,0,0,0,0,7,192,248,0,31,240,0,30,3,192,0,0,0,0,0,0,0,0,0,0,15,224,127,0,0,0,0,124,7,224,0,0,0,0,0,0,0,0,0,0,7,240,31,240,0,0,7,240,15,224,0,0,0,0,0,0,0,0,0,0,7,252,7,255,192,1,255,192,63,192,0,0,0,0,0,0,0,0,0,0,3,255,0,63,255,255,252,0,255,128,0,0,0,0,0,0,0,0,0,0,0,255,224,0,255,254,0,7,255,0,0,0,0,0,0,0,0,0,0,0,0,63,254,0,0,0,0,127,252,0,0,0,0,0,0,0,0,0,0,0,0,7,255,252,0,0,63,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,240,7,224,0,252,0,248,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,224,63,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,192,31,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,15,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,126,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,127,3,248,126,0,0,0,0,0,0,0,0,0,0,7,224,63,199,255,252,127,207,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,199,255,252,63,255,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,255,252,31,255,224,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,255,252,15,255,192,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,255,252,7,255,0,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,224,1,224,31,248,15,128,248,248,7,159,255,224,126,0,248,248,7,192,3,224,3,224,63,252,15,128,248,252,7,159,255,224,126,0,248,252,7,192,3,240,7,224,255,254,15,128,248,254,7,159,255,224,127,0,248,254,7,192,3,240,7,225,255,255,15,128,248,254,7,159,255,224,255,0,248,254,7,192,3,248,15,225,248,31,143,128,248,255,7,128,124,0,255,128,248,255,7,192,3,252,15,227,240,15,143,128,248,255,135,128,124,1,255,128,248,255,135,192,3,252,31,227,224,7,207,128,248,255,199,192,124,1,247,192,248,255,199,192,3,254,31,227,224,7,207,128,248,255,231,192,124,3,231,192,248,255,231,192,3,254,63,227,224,7,207,128,248,255,231,192,124,3,227,192,248,255,231,192,3,255,125,227,224,7,207,128,248,251,247,192,124,3,195,224,248,251,247,192,3,239,249,227,224,7,207,128,248,249,255,192,124,7,193,224,248,249,255,192,3,239,249,227,224,7,207,128,248,248,255,128,124,7,255,240,248,248,255,192,3,231,241,227,240,15,143,128,248,248,127,128,124,15,255,240,248,248,127,192,3,227,241,225,240,31,135,192,248,248,127,128,124,15,255,248,248,248,127,192,3,227,225,225,252,127,7,227,240,248,63,192,124,31,255,248,248,248,63,192,3,225,193,224,255,255,3,255,240,248,31,192,124,31,0,252,248,248,31,192,3,224,193,224,127,254,1,255,224,248,15,192,124,30,0,124,248,248,15,192,3,224,1,224,63,252,0,255,192,248,7,192,124,62,0,124,248,248,7,192,1,192,1,224,7,224,0,63,0,120,3,128,120,60,0,60,112,120,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,241,249,251,32,65,152,195,128,123,248,199,228,60,33,128,0,0,0,0,1,249,249,251,112,225,156,199,224,251,249,199,254,126,49,128,0,0,0,0,1,157,129,131,48,225,156,206,65,192,225,225,142,231,57,128,0,0,0,0,1,141,241,131,48,225,158,220,1,224,227,225,142,195,125,128,0,0,0,0,1,253,249,243,48,225,159,220,96,248,227,113,142,195,255,128,0,0,0,0,1,249,193,243,48,225,155,220,96,60,231,241,142,195,55,128,0,0,0,0,1,249,193,131,48,225,153,206,96,156,231,249,142,231,55,128,0,0,0,0,1,157,249,131,63,253,152,199,225,248,230,25,142,126,51,128,0,0,0,0,1,141,249,3,62,125,152,67,192,240,68,25,132,60,33,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),xe=(t,a={})=>{const e=t.items||[],s=[],n=(d,c=0,p=1,m=0)=>s.push({type:0,content:d,bold:c,align:p,format:m}),i=()=>n("--------------------------------",0,1,0),o=()=>n(" ",0,0,0);s.push({type:1,content:Ba,align:1,width:160,height:160});const r=a.shopName||"Blue Mountain Refilling Station";if(r.toLowerCase().includes("blue mountain")&&r.toLowerCase().includes("refilling station"))n("BLUE MOUNTAIN",1,1,2),n("REFILLING STATION",1,1,1);else for(const d of lines)n(d.trim().toUpperCase(),1,1,2);o(),a.shopAddress&&n(a.shopAddress,0,1,4),a.shopPhone&&n(`Telp: ${a.shopPhone}`,0,1,4),i(),n(`No   : ${t.invoiceNo||"-"}`,0,0,0),n(`Tgl  : ${wt(new Date(t.date))}`,0,0,0),t.customerName&&n(`Cust : ${t.customerName}`,0,0,0),t.cashier&&n(`Kasir: ${t.cashier}`,0,0,0),i();for(const d of e){if(!(d!=null&&d.product))continue;const c=d.product.name,p=d.qty,m=f(d.product.price),b=f(d.product.price*p);n(`${c}`,1,0,0),n(`  ${p} x ${m} = ${b}`,0,0,0)}return i(),t.discount>0&&(n(`Subtotal: ${f(t.subtotal)}`,0,0,0),n(`Diskon:  -${f(t.discount)}`,0,0,0)),t.tax>0&&n(`Pajak:    ${f(t.tax)}`,0,0,0),n(`TOTAL: ${f(t.total)}`,1,0,3),t.paymentMethod==="cash"?(n(`Bayar:   ${f(t.paid)}`,0,0,0),n(`Kembali: ${f(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(n(`Transfer: ${f(t.total)}`,0,0,0),n(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(n(`DP Dibayar: ${f(t.paidAmount||0)}`,0,0,0),n(`Sisa Hutang: ${f(t.remainingDebt||0)}`,1,0,0)),i(),o(),n(a.receiptFooter||"Terima kasih sudah berbelanja!",1,1,0),n("BLUE MOUNTAIN REFILLING STATION",1,1,0),o(),o(),s},qt={"48mm":{width:"48mm",widthPx:"185px",colWidth:30,fontSize:"10px",logoWidth:"55px"},"58mm":{width:"58mm",widthPx:"220px",colWidth:32,fontSize:"11px",logoWidth:"70px"},"80mm":{width:"80mm",widthPx:"300px",colWidth:48,fontSize:"12px",logoWidth:"85px"}},Qe=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},Ca=t=>{const a=xe(t,l.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(a)),Qe()},Na=t=>(Ca(t),`my.bluetoothprint.scheme://${(l.state.settings||{}).printerUrl||Qe()}`),Xe=t=>(Ca(t),Qe(),`rawbt:data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(xe(t,l.state.settings)))))}`),Ma=t=>{const a=l.state.settings||{};let e=`*STRUK PEMBELIAN — ${a.shopName||"BLUE MOUNTAIN"}*
`;e+=`--------------------------------
`,e+=`No. Invoice : ${t.invoiceNo||"-"}
`,e+=`Tanggal     : ${wt(new Date(t.date||Date.now()))}
`,t.customerName&&(e+=`Pelanggan   : ${t.customerName}
`),e+=`Kasir       : ${t.cashier||"Kasir"}
`,e+=`--------------------------------
`;for(const s of t.items||[]){if(!(s!=null&&s.product))continue;const n=s.product.name,i=s.qty,o=s.product.price;e+=`${n}
  ${i} x ${f(o)} = ${f(o*i)}
`}return e+=`--------------------------------
`,t.discount>0&&(e+=`Diskon      : -${f(t.discount)}
`),t.tax>0&&(e+=`Pajak       : ${f(t.tax)}
`),e+=`*TOTAL       : ${f(t.total)}*
`,t.paymentMethod==="cash"?(e+=`Bayar Tunai : ${f(t.paid||t.total)}
`,t.change>0&&(e+=`Kembalian   : ${f(t.change)}
`)):t.paymentMethod==="transfer"?e+=`Metode      : Transfer Bank (Lunas ✅)
`:t.paymentMethod==="debt"&&(e+=`DP Dibayar  : ${f(t.paidAmount||0)}
`,e+=`*Sisa Hutang : ${f(t.remainingDebt||0)}*
`),e+=`--------------------------------
`,e+=`Terima kasih sudah berbelanja!
`,e+=`BLUE MOUNTAIN REFILLING STATION
`,a.shopAddress&&(e+=`${a.shopAddress}
`),a.shopPhone&&(e+=`Telp: ${a.shopPhone}
`),e},ra=(t,a="")=>{const e=(a||t.customerPhone||"").replace(/\D/g,""),s=e.startsWith("08")?`62${e.slice(1)}`:e.startsWith("8")?`62${e}`:e,n=Ma(t),i=encodeURIComponent(n);return s?`https://wa.me/${s}?text=${i}`:`https://wa.me/?text=${i}`},ke=(t,a=null)=>{const e=l.state.settings||{},s=a||e.printerPaper||"58mm",n=qt[s]||qt["58mm"],i=t.items||[],o=()=>'<div style="border-top:1px dashed #333;margin:4px 0"></div>';let r=`<div class="thermal-receipt" style="width:${n.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:2px 4px">`;r+=`<div style="text-align:center;margin:0 auto 2px auto;line-height:1">
    <img src="${Ba}"
         class="thermal-logo"
         alt="Blue Mountain"
         width="65"
         height="65"
         style="width:${n.logoWidth};height:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  </div>`;const d=e.shopName||"Blue Mountain Refilling Station";r+='<div style="text-align:center;margin-bottom:6px">',d.toLowerCase().includes("blue mountain")&&d.toLowerCase().includes("refilling station")?(r+=`<div style="font-weight:900;font-size:${s==="80mm"?"15px":"13px"};line-height:1.2;letter-spacing:0.5px">BLUE MOUNTAIN</div>`,r+=`<div style="font-weight:800;font-size:${s==="80mm"?"12px":"11px"};line-height:1.2;letter-spacing:0.3px">REFILLING STATION</div>`):d.toUpperCase().split(`
`).forEach(p=>{r+=`<div style="font-weight:900;font-size:${s==="80mm"?"14px":"12px"};line-height:1.2">${p.trim()}</div>`}),r+="</div>",e.shopAddress&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35;word-break:normal;overflow-wrap:break-word;margin-bottom:2px">${e.shopAddress}</div>`),e.shopPhone&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35">Telp: ${e.shopPhone}</div>`),r+=o(),r+='<div style="font-size:10px;line-height:1.4">',r+=`<div>No&nbsp;&nbsp;&nbsp;: <b>${t.invoiceNo||"-"}</b></div>`,r+=`<div>Tgl&nbsp;&nbsp;: ${wt(new Date(t.date||Date.now()))}</div>`,t.customerName&&(r+=`<div>Cust&nbsp;: ${t.customerName}</div>`),t.cashier&&(r+=`<div>Kasir: ${t.cashier}</div>`),r+="</div>",r+=o();for(const c of i){if(!(c!=null&&c.product))continue;const p=c.product.name,m=c.qty,b=c.product.price,v=b*m;r+=`<div style="font-weight:700;font-size:${n.fontSize};line-height:1.3">${p}</div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3;margin-bottom:3px">
      <span>&nbsp;&nbsp;${m} x ${f(b)}</span>
      <span style="font-weight:600">${f(v)}</span>
    </div>`}return r+=o(),t.discount>0&&(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Subtotal</span><span>${f(t.subtotal||t.total+t.discount)}</span>
    </div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Diskon</span><span>-${f(t.discount)}</span>
    </div>`),t.tax>0&&(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Pajak</span><span>${f(t.tax)}</span>
    </div>`),r+=`<div style="display:flex;justify-content:space-between;font-size:${s==="80mm"?"14px":"13px"};font-weight:900;margin:3px 0;letter-spacing:0.5px">
    <span>TOTAL</span><span>${f(t.total)}</span>
  </div>`,t.paymentMethod==="cash"?(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Bayar Tunai</span><span>${f(t.paid||t.total)}</span>
    </div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Kembali</span><span>${f(t.change||0)}</span>
    </div>`):t.paymentMethod==="transfer"?(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Transfer Bank</span><span>${f(t.total)}</span>
    </div>`,r+=`<div style="text-align:center;font-size:9px;margin-top:2px">Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}</div>`):t.paymentMethod==="debt"&&(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>DP Dibayar</span><span>${f(t.paidAmount||0)}</span>
    </div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Sisa Hutang</span><span>${f(t.remainingDebt||0)}</span>
    </div>`),r+=o(),r+=`<div style="text-align:center;margin-top:4px">
    <div style="font-size:10px;font-weight:700;line-height:1.35">Terima kasih sudah berbelanja!</div>
    <div style="font-size:9px;font-weight:800;letter-spacing:0.5px;margin-top:2px">BLUE MOUNTAIN REFILLING STATION</div>
  </div>`,r+='<div style="height:4px"></div>',r+="</div>",r},oe=(t,a=null)=>{const e=l.state.settings||{},s=a||e.printerPaper||"58mm",n=qt[s]||qt["58mm"],i=ke(t,s),o=document.createElement("iframe");o.style.position="fixed",o.style.top="-9999px",o.style.left="-9999px",o.style.width="400px",o.style.height="800px",o.style.border="none",o.style.opacity="0",o.style.pointerEvents="none",document.body.appendChild(o);const r=o.contentWindow.document;r.open(),r.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Struk-${t.invoiceNo||"KASIR"}</title>
  <style>
    @page {
      size: ${n.width} auto;
      margin: 0mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @media print {
      html, body {
        width: ${n.width};
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
        max-width: ${n.logoWidth} !important;
        width: ${n.logoWidth} !important;
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
  ${i}
</body>
</html>`),r.close();const d=()=>{try{o.contentWindow.focus(),o.contentWindow.print()}catch{const m=window.open("","_blank","width=350,height=600");m&&(m.document.write(r.documentElement.outerHTML),m.document.close(),m.focus(),setTimeout(()=>{m.print(),setTimeout(()=>m.close(),1e3)},300))}finally{setTimeout(()=>o.remove(),3e3)}},c=r.querySelector("img");c&&!c.complete?(c.onload=()=>setTimeout(d,120),c.onerror=()=>setTimeout(d,120),setTimeout(d,800)):setTimeout(d,200)},za=(t,a=null)=>{const e=new TextEncoder,s=l.state.settings||{},n=a||s.printerPaper||"58mm",o=(qt[n]||qt["58mm"]).colWidth,r=(y,$,g=o)=>{const h=Math.max(1,g-y.length-$.length);return y+" ".repeat(h)+$},d=(y,$=o)=>{if(!y)return[];const g=y.split(" "),h=[];let u="";for(const E of g)u?`${u} ${E}`.length<=$?u+=` ${E}`:(h.push(u),u=E):u=E;return u&&h.push(u),h},c=[],p=y=>c.push(...y),m=y=>{for(const $ of y)c.push($)},b=y=>{const $=e.encode(`${y}
`);for(const g of $)c.push(g)};p([27,64]),m(Rn),p([27,97,1]);const v=s.shopName||"Blue Mountain Refilling Station";if(v.toLowerCase().includes("blue mountain")&&v.toLowerCase().includes("refilling station"))p([27,69,1]),p([27,33,16]),b("BLUE MOUNTAIN"),p([27,33,0]),p([27,69,1]),b("REFILLING STATION"),p([27,69,0]);else{p([27,69,1]),p([27,33,16]);const y=v.toUpperCase().split(`
`);for(const $ of y)b($.trim());p([27,33,0]),p([27,69,0])}if(p([27,74,14]),s.shopAddress){const y=d(s.shopAddress,o);for(const $ of y)b($)}s.shopPhone&&b(`Telp: ${s.shopPhone}`),p([27,97,0]),b("-".repeat(o)),b(`No   : ${t.invoiceNo||"-"}`),b(`Tgl  : ${wt(new Date(t.date||Date.now()))}`),t.customerName&&b(`Cust : ${t.customerName}`),t.cashier&&b(`Kasir: ${t.cashier}`),b("-".repeat(o));for(const y of t.items||[])y!=null&&y.product&&(p([27,69,1]),b(y.product.name),p([27,69,0]),b(r(`  ${y.qty} x ${f(y.product.price)}`,f(y.product.price*y.qty))));return b("-".repeat(o)),t.discount>0&&(b(r("Subtotal",f(t.subtotal||t.total+t.discount))),b(r("Diskon",`-${f(t.discount)}`))),t.tax>0&&b(r("Pajak",f(t.tax))),p([27,69,1]),p([27,33,16]),b(r("TOTAL",f(t.total))),p([27,33,0]),p([27,69,0]),t.paymentMethod==="cash"?(b(r("Bayar Tunai",f(t.paid||t.total))),p([27,69,1]),b(r("Kembali",f(t.change||0))),p([27,69,0])):t.paymentMethod==="transfer"?(b(r("Transfer Bank",f(t.total))),b(r("Status",t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU"))):t.paymentMethod==="debt"&&(b(r("DP Dibayar",f(t.paidAmount||0))),p([27,69,1]),b(r("Sisa Hutang",f(t.remainingDebt||0))),p([27,69,0])),b("-".repeat(o)),p([27,97,1]),p([27,69,1]),b("Terima kasih sudah berbelanja!"),b("BLUE MOUNTAIN REFILLING STATION"),p([27,69,0]),p([10,10,10,29,86,66,0]),new Uint8Array(c)},Da=async t=>{const{default:a}=await ve(async()=>{const{default:s}=await import("./vendor-canvas-C3fx88d4.js");return{default:s}},[],import.meta.url),e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.style.top="0",e.style.width="240px",e.style.maxHeight="none",e.style.overflow="visible",e.style.background="#ffffff",e.style.padding="10px 8px",e.style.boxSizing="border-box",e.style.zIndex="-9999",e.innerHTML=ke(t,"58mm"),document.body.appendChild(e);try{const s=await a(e,{backgroundColor:"#ffffff",scale:3,useCORS:!0,logging:!1,windowWidth:320});return await new Promise((n,i)=>{s.toBlob(o=>{o?n(o):i(new Error("Gagal membuat blob gambar"))},"image/png",1)})}finally{e.remove()}},Oa=async t=>{var a;window.showToast&&window.showToast("Menyiapkan gambar struk WhatsApp...","info");try{const e=await Da(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([e],s,{type:"image/png"}),i=Ma(t);if((a=navigator.canShare)!=null&&a.call(navigator,{files:[n]})){await navigator.share({title:`Struk ${t.invoiceNo||""}`,text:i,files:[n]}),window.showToast&&window.showToast("Struk gambar berhasil dibagikan!","success");return}try{navigator.clipboard&&window.ClipboardItem&&(await navigator.clipboard.write([new ClipboardItem({"image/png":e})]),window.showToast&&window.showToast("📋 Gambar struk telah disalin ke clipboard! Tempel (Ctrl+V) di chat WhatsApp.","success"))}catch{}const o=ra(t);window.open(o,"_blank","noopener,noreferrer")}catch{const s=ra(t);window.open(s,"_blank","noopener,noreferrer")}},Ua=async t=>{var a;window.showToast&&window.showToast("Membuat PNG struk presisi...","info");try{const e=await Da(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([e],s,{type:"image/png"});if((a=navigator.canShare)!=null&&a.call(navigator,{files:[n]}))await navigator.share({title:`Struk ${t.invoiceNo||""}`,files:[n]}),window.showToast&&window.showToast("Struk berhasil dibagikan!","success");else{const i=URL.createObjectURL(e),o=document.createElement("a");o.href=i,o.download=s,o.click(),setTimeout(()=>URL.revokeObjectURL(i),3e3),window.showToast&&window.showToast("PNG struk berhasil disimpan!","success")}}catch{window.showToast&&window.showToast("Gagal membuat PNG struk","error")}},Ra=t=>{const a=l.state.settings||{};a.printerUrl&&!a.printerUrl.includes("receipt-data.html")?window.location.href=`my.bluetoothprint.scheme://${a.printerUrl}`:(window.showToast&&window.showToast("BT App perlu server JSON. Mengalihkan ke RawBT (cetak langsung offline)...","info"),setTimeout(()=>{window.location.href=Xe(t)},800))},ja=async t=>{if(!navigator.bluetooth)throw new Error("Web Bluetooth tidak didukung pada browser ini. Gunakan Chrome di Android/PC atau gunakan opsi Cetak Direct.");let a;try{a=await navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["000018f0-0000-1000-8000-00805f9b34fb","e7810a71-73ae-499d-8c15-faa9aef0c3f2","49535343-fe7d-4ae5-8fa9-9fafd205e455","0000ff00-0000-1000-8000-00805f9b34fb","0000ae30-0000-1000-8000-00805f9b34fb","0000fee7-0000-1000-8000-00805f9b34fb","0000ffe0-0000-1000-8000-00805f9b34fb","0000fff0-0000-1000-8000-00805f9b34fb"]})}catch(n){if(n.name==="NotFoundError")return;throw n}const e=await a.gatt.connect();let s=null;try{const n=await e.getPrimaryServices();for(const r of n)try{const d=await r.getCharacteristics();for(const c of d)if(c.properties.write||c.properties.writeWithoutResponse){s=c;break}if(s)break}catch{}if(!s)throw new Error("Karakteristik penulisan printer Bluetooth tidak ditemukan.");const i=za(t),o=64;for(let r=0;r<i.length;r+=o){const d=i.slice(r,r+o);s.properties.write?await s.writeValueWithResponse(d):await s.writeValueWithoutResponse(d)}}finally{e!=null&&e.connected&&e.disconnect()}},Ka=async t=>{var e;if(!navigator.usb)throw new Error("WebUSB tidak didukung pada browser ini. Gunakan Chrome/Edge.");let a;try{a=await navigator.usb.requestDevice({filters:[]})}catch(s){if(s.name==="NotFoundError")return;throw s}try{await a.open()}catch(s){if((e=s.message)!=null&&e.toLowerCase().includes("access denied")||s.name==="SecurityError"){window.showToast&&window.showToast("Printer USB Windows dikelola driver sistem. Mengalihkan otomatis ke Cetak Langsung...","info"),oe(t);return}throw s}try{a.configuration===null&&await a.selectConfiguration(1);let s=0,n=1;const i=a.configuration;if(i!=null&&i.interfaces)for(const r of i.interfaces)for(const d of r.alternates){const c=d.endpoints.find(p=>p.direction==="out");if(c){s=r.interfaceNumber,n=c.endpointNumber;break}}await a.claimInterface(s);const o=za(t);await a.transferOut(n,o),await a.close(),window.showToast&&window.showToast("Struk terkirim ke printer USB!","success")}catch{window.showToast&&window.showToast("Mengalihkan ke Cetak Langsung via sistem...","info"),oe(t)}},Le=(t="58mm")=>{const a={invoiceNo:`TEST-${t.toUpperCase()}-`+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:l.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};oe(a,t)},Pe=()=>{const t=new Date,a=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),e=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${a}-${e}${s}`},jn=t=>{let a=65535;for(let e=0;e<t.length;e++){a^=t.charCodeAt(e)<<8;for(let s=0;s<8;s++)a&32768?a=(a<<1^4129)&65535:a=a<<1&65535}return a.toString(16).toUpperCase().padStart(4,"0")},Kn=(t,a)=>{const e=String(a),s=String(e.length).padStart(2,"0");return`${t}${s}${e}`},Hn=(t="",a=0)=>{let e=(t||"").trim();(!e||e.length<20)&&(e="00020101021126590014ID.LINKAJA.WWW011893600911002234477302090022344775204541153033605802ID5920BLUE MOUNTAIN STATION6006BEKASI610517510");const s=e.lastIndexOf("6304");s!==-1&&(e=e.substring(0,s)),e.includes("010211")?e=e.replace("010211","010212"):e.includes("010212")||(e=e.replace("000201","000201010212"));const n=Math.max(0,Math.round(Number(a)||0)),i=/54\d{2}\d+/,o=Kn("54",n);if(i.test(e))e=e.replace(i,o);else{const d=e.indexOf("5802ID");d!==-1?e=e.slice(0,d)+o+e.slice(d):e+=`${o}5802ID`}e+="6304";const r=jn(e);return e+r},at=(t,a="generic-modal",e="")=>{U();const s=typeof a=="string"&&a.trim()?a.trim():"generic-modal",n=document.createElement("div");n.className="modal-overlay",n.id=`overlay-${s}`;const o=s==="modal-cust-360"||s==="payment-modal"||e.includes("modal--wide")?`modal modal--wide ${e}`.trim():`modal ${e}`.trim();n.innerHTML=`<div class="${o}" id="${s}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(n),n.addEventListener("click",c=>{c.target===n&&U(s)});const r=c=>{c.key==="Escape"&&(document.removeEventListener("keydown",r),U(s))};document.addEventListener("keydown",r);const d=n.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return d.length&&d[0].focus(),n},U=(t=null)=>{const a=typeof t=="string"&&t.trim()?t.trim():null;let e=[];try{if(a){const s=document.getElementById(`overlay-${a}`)||document.querySelector(`#overlay-${a}`);s&&(e=[s])}}catch{}e.length||(e=[...document.querySelectorAll(".modal-overlay")]),e.forEach(s=>{var n;s&&((n=s.querySelector(".modal"))==null||n.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>{try{s.remove()}catch{}},180))})},qn=t=>{const e=(n=>Math.ceil(n/5e3)*5e3)(t),s=[e,e+5e3,e+1e4,e+2e4,e+5e4,e+1e5];return[...new Set(s.filter(n=>n>=t))].slice(0,4)},Ae=(t="cash")=>{const a=l.total,e=l.subtotal,s=l.state.discount||0,n=l.tax,i=l.state.settings||{},o=x(i.bankName||"BCA"),r=x(i.bankNumber||"—"),d=x(i.bankHolder||i.shopName||"Blue Mountain"),c=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran Transaksi</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Tagihan</div>
        <div class="amount">${f(a)}</div>
        ${s>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${f(s)}</div>`:""}
        ${n>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${f(n)}</div>`:""}
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
            value="${a}" min="${a}" max="999999999" step="1000"
            inputmode="numeric" placeholder="${a}">
        </div>
        <div class="quick-amounts" id="quick-amounts" style="margin-top:8px">
          ${qn(a).map(p=>`<button class="quick-amt-btn" data-amount="${p}">${f(p)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px;padding:10px 14px;background:var(--color-success-bg);border:1.5px solid var(--color-success-border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="font-weight:700;color:var(--color-success)">💰 Kembalian</span>
          <span class="value" id="change-amount" style="font-size:18px;font-weight:900;color:var(--color-success)">${f(0)}</span>
        </div>
      </div>

      <!-- Transfer Section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info" style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border-subtle)">
          <div style="font-size:32px;margin-bottom:4px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Silakan transfer nominal berikut:</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-600);margin:6px 0">${f(a)}</div>
          <div style="margin-top:8px;padding:10px;background:#fff;border-radius:8px;border:1.5px dashed var(--blue-300);text-align:left">
            <div style="font-size:12px;color:var(--text-secondary)">Bank: <strong>${o}</strong></div>
            <div style="font-size:14px;font-weight:800;color:var(--text-primary);margin:2px 0">
              No. Rek: <span id="trans-acc-num">${r}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary)">Atas Nama: <strong>${d}</strong></div>
          </div>
          <div style="margin-top:12px;text-align:center">
            <canvas id="qris-dynamic-canvas" style="display:block;margin:0 auto;border-radius:10px;border:1px solid var(--border-subtle);background:#fff;max-width:170px;height:auto"></canvas>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:6px;font-weight:700">
              ⚡ QRIS Dinamis Otomatis Nominal: <span style="color:var(--blue-600)">${f(a)}</span>
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
            value="${x(l.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${a}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total Tagihan</span><strong>${f(a)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>DP Dibayar Sekarang</span><strong id="debt-paid-display" style="color:var(--color-success)">${f(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang Berjalan</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger);font-size:16px">${f(a)}</strong>
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
  `;at(c,"payment-modal"),setTimeout(()=>{var g,h,u,E;(g=document.getElementById("pay-close-btn"))==null||g.addEventListener("click",()=>U("payment-modal")),(h=document.getElementById("pay-cancel-btn"))==null||h.addEventListener("click",()=>U("payment-modal"));const p=()=>{var P;const S=document.getElementById("qris-dynamic-canvas");if(!S)return;const k=((P=l.state.settings)==null?void 0:P.qrisNumber)||"",w=Hn(k,a);an.toCanvas(S,w,{width:170,margin:1,errorCorrectionLevel:"M"},B=>{})};p(),document.querySelectorAll(".pay-tab").forEach(S=>{S.addEventListener("click",()=>{var w,P;for(const B of document.querySelectorAll(".pay-tab"))B.classList.remove("active");S.classList.add("active");const k=S.dataset.method;document.getElementById("pay-cash-section").style.display=k==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=k==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=k==="debt"?"":"none",k==="cash"&&((w=document.getElementById("cash-received"))==null||w.focus()),k==="transfer"&&p(),k==="debt"&&((P=document.getElementById("debt-customer"))==null||P.focus())})});const m=document.getElementById("cash-received"),b=document.getElementById("change-amount"),v=()=>{const S=parseFloat(m==null?void 0:m.value)||a,k=Math.max(0,S-a);b&&(b.textContent=f(k))};m==null||m.addEventListener("input",v),v(),(u=document.getElementById("quick-amounts"))==null||u.addEventListener("click",S=>{const k=S.target.closest(".quick-amt-btn");k&&m&&(m.value=k.dataset.amount,v())});const y=document.getElementById("debt-paid-now"),$=()=>{const S=Math.min(parseFloat(y==null?void 0:y.value)||0,a),k=a-S,w=document.getElementById("debt-paid-display"),P=document.getElementById("debt-remaining-display");w&&(w.textContent=f(S)),P&&(P.textContent=f(k))};y==null||y.addEventListener("input",$),(E=document.getElementById("pay-confirm-btn"))==null||E.addEventListener("click",async()=>{var _,K,W,J,A,D,V,Q;const S=document.querySelector(".pay-tab.active"),k=(S==null?void 0:S.dataset.method)||"cash",w=document.getElementById("pay-confirm-btn");if(k==="cash"&&(parseFloat(m==null?void 0:m.value)||a)<a){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),m==null||m.focus();return}if(k==="debt"){const j=(K=(_=document.getElementById("debt-customer"))==null?void 0:_.value)==null?void 0:K.trim();if(!j){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(W=document.getElementById("debt-customer"))==null||W.focus();return}const I=Math.min(parseFloat((J=document.getElementById("debt-paid-now"))==null?void 0:J.value)||0,a),N=a-I,C=(l.state.customers||[]).find(M=>(M.name||"").trim().toLowerCase()===j.toLowerCase());if(C&&C.creditLimit>0){const M=(Number(C.totalDebt)||0)+N;if(M>C.creditLimit&&!confirm(`⚠️ Peringatan Limit Piutang!
Total piutang ${C.name} akan menjadi ${f(M)}, melebihi batas kredit (${f(C.creditLimit)}).

Tetap lanjutkan transaksi?`))return}}w&&(w.disabled=!0,w.textContent="⏳ Menyimpan...");const P=new Date().toISOString(),B=await Y();let L=l.state.selectedCustomer||null,z="";k==="debt"?z=((D=(A=document.getElementById("debt-customer"))==null?void 0:A.value)==null?void 0:D.trim())||l.state.customerName||"Pelanggan":z=l.state.customerName||"",!L&&z&&(L=B.find(j=>(j.name||"").trim().toLowerCase()===z.toLowerCase())||null);let O;if(k==="cash"){const j=parseFloat(m==null?void 0:m.value)||a,I=Math.max(0,j-a);O={invoiceNo:Pe(),date:P,dateKey:it(),items:l.state.cart.map(N=>({product:{...N.product},qty:N.qty})),subtotal:e,discount:s,tax:n,total:a,paymentMethod:"cash",paymentStatus:"paid",paid:j,change:I,paidAmount:a,remainingDebt:0,debtPayments:[],customerId:(L==null?void 0:L.id)||null,customerName:(L==null?void 0:L.name)||z,customerPhone:(L==null?void 0:L.phone)||"",cashier:l.state.settings.cashierName||"Kasir"}}else if(k==="transfer")O={invoiceNo:Pe(),date:P,dateKey:it(),items:l.state.cart.map(j=>({product:{...j.product},qty:j.qty})),subtotal:e,discount:s,tax:n,total:a,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:a,change:0,paidAmount:a,remainingDebt:0,debtPayments:[],customerId:(L==null?void 0:L.id)||null,customerName:(L==null?void 0:L.name)||z,customerPhone:(L==null?void 0:L.phone)||"",cashier:l.state.settings.cashierName||"Kasir"};else{const j=Math.min(parseFloat((V=document.getElementById("debt-paid-now"))==null?void 0:V.value)||0,a),I=a-j,N=I===0?"paid":j>0?"partial":"unpaid";O={invoiceNo:Pe(),date:P,dateKey:it(),items:l.state.cart.map(C=>({product:{...C.product},qty:C.qty})),subtotal:e,discount:s,tax:n,total:a,paymentMethod:"debt",paymentStatus:N,paid:j,change:0,paidAmount:j,remainingDebt:I,debtPayments:j>0?[{date:P,amount:j,note:"DP / Uang muka awal"}]:[],customerId:(L==null?void 0:L.id)||null,customerName:(L==null?void 0:L.name)||z,customerPhone:(L==null?void 0:L.phone)||"",cashier:l.state.settings.cashierName||"Kasir"}}try{if(z){if(L)L.totalOrders=(Number(L.totalOrders)||0)+1,L.totalSpent=(Number(L.totalSpent)||0)+O.total,O.remainingDebt>0&&(L.totalDebt=(Number(L.totalDebt)||0)+O.remainingDebt),await Wt(L),O.customerId=L.id,O.customerName=L.name;else{const C=await _a({name:z,phone:"",category:"Rumah Tangga",address:"",totalOrders:1,totalSpent:O.total,totalDebt:O.remainingDebt||0,creditLimit:0,galonLoaned:0});O.customerId=C,O.customerName=z}const N=await Y();l.setCustomers(N)}const j=await Bn(O);O.id=j,l.addTransaction(O),En(O.items,O).catch(()=>{});for(const N of O.items||[])if((Q=N.product)!=null&&Q.id){const C=await T.products.get(N.product.id);if(C&&typeof C.stock=="number"){const M=Math.max(0,C.stock-(Number(N.qty)||1));await T.products.update(N.product.id,{stock:M})}}const I=await dt();l.setProducts(I),U("payment-modal"),l.clearCart(),Fn(O)}catch(j){window.showToast(`Gagal menyimpan transaksi: ${j.message||"Error"}`,"error"),w&&(w.disabled=!1,w.textContent="✅ Proses Pembayaran")}})},0)},Fn=t=>{var r,d,c,p,m,b,v,y,$,g;const a=xe(t,l.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(a)),Na(t);const e=Xe(t),s=((r=l.state.settings)==null?void 0:r.printerPaper)||"58mm",n=ke(t,s),i=document.createElement("div");i.className="success-overlay",i.id="success-overlay",i.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${x(t.invoiceNo)} &bull; ${f(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${f(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:var(--blue-600);font-size:13px;margin-top:4px">📲 Transfer Terkonfirmasi ✅</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa Piutang: ${f(t.remainingDebt)}</p>`:""}
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
      <a class="btn btn--secondary" href="${e}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
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
      <div class="receipt-preview" style="background:#fff;border-radius:8px;padding:8px">${n}</div>
    </details>
  `,document.body.appendChild(i);const o=()=>{i.classList.add("closing"),setTimeout(()=>i.remove(),180)};(d=document.getElementById("success-close-btn"))==null||d.addEventListener("click",o),(c=document.getElementById("btn-close-overlay"))==null||c.addEventListener("click",o),(p=document.getElementById("btn-print-direct"))==null||p.addEventListener("click",()=>{oe(t)}),(m=document.getElementById("btn-mo-whatsapp"))==null||m.addEventListener("click",()=>{Oa(t)}),(b=document.getElementById("btn-mo-png"))==null||b.addEventListener("click",()=>{Ua(t)}),(v=document.getElementById("btn-print-ble"))==null||v.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer Bluetooth...","info"),await ja(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(h){window.showToast(h.message||"Gagal koneksi Bluetooth","error")}}),(y=document.getElementById("btn-print-usb"))==null||y.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer USB...","info"),await Ka(t)}catch(h){window.showToast(h.message||"Gagal koneksi WebUSB","error")}}),($=document.getElementById("btn-mo-btapp"))==null||$.addEventListener("click",()=>{Ra(t)}),(g=document.getElementById("btn-new-tx"))==null||g.addEventListener("click",()=>{o(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{i.parentNode&&o()},12e4)},Ke=async({onLogin:t=null,forceLock:a=!1}={})=>{var $;if(navigator.onLine)try{await Bt()}catch{}let e=await St(),s=e.filter(g=>g.isActive!==!1);if(s.length===0&&(await Ve(),e=await St(),s=e.filter(g=>g.isActive!==!1)),s.length===0){($=window.showToast)==null||$.call(window,"Tidak ada akun operator aktif.","error");return}let n=s[0].id,i="";const o="modal-login-operator",r={owner:{color:"#8b5cf6",label:"👑 Owner"},supervisor:{color:"#2563eb",label:"⭐ Supervisor"},cashier:{color:"#10b981",label:"👤 Kasir"}},d=()=>`
    <div style="padding: 24px; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">🔐</div>
      <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 6px 0; color: var(--text-primary, #1e293b);">
        ${a?"Sistem Terkunci":"Beralih Operator Kasir"}
      </h2>
      <p style="font-size: 13px; color: var(--text-muted, #64748b); margin: 0 0 20px 0;">
        Pilih nama operator dan masukkan 4-6 digit PIN masuk Anda
      </p>

      <!-- Operator Selection Grid -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
        ${s.map(g=>{const h=String(g.id)===String(n),u=r[g.role]||r.cashier;return`
            <button type="button" class="btn-select-operator" data-id="${g.id}" style="
              padding: 10px 14px;
              border-radius: 12px;
              border: 2px solid ${h?"var(--primary, #2563eb)":"var(--border, #e2e8f0)"};
              background: ${h?"rgba(37, 99, 235, 0.08)":"var(--bg-card, #ffffff)"};
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
              transition: all 0.2s;
            ">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: ${u.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${(g.name||"U").charAt(0).toUpperCase()}
              </div>
              <div style="text-align: left;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${x(g.name)}</div>
                <div style="font-size: 11px; color: ${u.color}; font-weight: 600;">${u.label}</div>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- PIN Display -->
      <div id="pin-display-box" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;">
          ${[0,1,2,3,4,5].map(g=>`
            <span class="pin-dot" style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid var(--primary, #2563eb);
              background: ${g<i.length?"var(--primary, #2563eb)":"transparent"};
              display: inline-block;
              transition: background 0.15s;
            "></span>
          `).join("")}
        </div>
        <div id="pin-error-msg" style="min-height: 18px; font-size: 12px; font-weight: 600; color: #dc2626;"></div>
      </div>

      <!-- Numpad -->
      <div style="max-width: 260px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${[1,2,3,4,5,6,7,8,9].map(g=>`
          <button type="button" class="btn-numpad" data-val="${g}" style="
            height: 52px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 12px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
          ">${g}</button>
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

      ${a?"":`
        <div style="margin-top: 16px;">
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
  `;at(d(),o,"modal--login");const c=()=>{document.querySelectorAll("#pin-display-box .pin-dot").forEach((h,u)=>{h.style.background=u<i.length?"var(--primary, #2563eb)":"transparent"})},p="bm_pin_lockout",m=()=>{try{const g=JSON.parse(localStorage.getItem(p)||"{}");return{count:Number(g.count)||0,until:Number(g.until)||0}}catch{return{count:0,until:0}}},b=(g,h)=>{try{localStorage.setItem(p,JSON.stringify({count:g,until:h}))}catch{}},v=async(g=!1)=>{var S;const h=s.find(k=>String(k.id)===String(n));if(!h)return;const u=m(),E=document.getElementById("pin-error-msg");if(u.until>Date.now()){const k=Math.ceil((u.until-Date.now())/1e3);E&&(E.textContent=`Sistem terkunci! Tunggu ${k} detik.`),i="",c();return}if(i.length>=4){const k=await We(h.username,i);if(k.success){b(0,0),l.login(k.user,k.token),U(o);const w=k.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(S=window.showToast)==null||S.call(window,`Operator aktif: ${k.user.name} (${k.user.role})${w}`,"success"),typeof t=="function"&&t(k.user);return}else if(g||i.length>=6){const w=m().count+1;w>=5?(b(w,Date.now()+6e4),E&&(E.textContent="PIN salah 5x! Sistem terkunci 60 detik.")):(b(w,0),E&&(E.textContent=`${k.error||"PIN salah!"} (Sisa percobaan: ${5-w})`)),i="",c();return}}g&&i.length<4&&(E&&(E.textContent="Masukkan minimal 4 digit PIN"),i="",c())},y=()=>{var h;document.querySelectorAll(".btn-select-operator").forEach(u=>{u.addEventListener("click",()=>{n=u.getAttribute("data-id"),i="";const E=document.getElementById(o);E&&(E.innerHTML=d(),y())})}),document.querySelectorAll(".btn-numpad").forEach(u=>{u.addEventListener("click",()=>{const E=u.getAttribute("data-val"),S=document.getElementById("pin-error-msg");S&&(S.textContent=""),E==="clear"?(i="",c()):E==="submit"?v(!0):i.length<6&&(i+=E,c(),v(!1))})}),(h=document.getElementById("btn-cancel-login"))==null||h.addEventListener("click",()=>{U(o)});const g=u=>{if(!document.getElementById(o)){window.removeEventListener("keydown",g);return}["INPUT","TEXTAREA"].includes(u.target.tagName)||(u.key>="0"&&u.key<="9"?(u.preventDefault(),i.length<6&&(i+=u.key,c(),v(!1))):u.key==="Backspace"?(u.preventDefault(),i=i.slice(0,-1),c()):u.key==="Enter"?(u.preventDefault(),v(!0)):u.key==="Escape"&&!a&&(u.preventDefault(),U(o)))};window.addEventListener("keydown",g)};y()};let zt=[],pe="all",Dt="",tt=1;const Vt=10,Gn=[{id:"all",label:"Semua"},{id:"Rumah Tangga",label:"🏠 Rumah Tangga"},{id:"Kantor/Instansi",label:"🏢 Kantor/Instansi"},{id:"Warung/Reseller",label:"🏪 Warung/Reseller"},{id:"VIP",label:"🌟 VIP"}],Wn=async()=>{if(zt.length){for(const s of zt)typeof s=="function"&&s();zt=[]}zt.push(l.on("customers:change",()=>kt())),zt.push(l.on("transactions:change",()=>kt()));const t=()=>{const s=document.getElementById("view-customers");s!=null&&s.classList.contains("active")&&kt()};window.addEventListener("resize",t),zt.push(()=>window.removeEventListener("resize",t));const[a,e]=await Promise.all([Y(),mt()]);l.setCustomers(a),l.setTransactions(e),kt()},Ha=(t,a=[])=>{const e=t.id?String(t.id):null,s=(t.name||"").trim().toLowerCase(),n=(t.phone||"").replace(/\D/g,"");return a.filter(i=>!!(e&&i.customerId&&String(i.customerId)===e||s&&i.customerName&&i.customerName.trim().toLowerCase()===s||n&&i.customerPhone&&i.customerPhone.replace(/\D/g,"")===n)).sort((i,o)=>new Date(o.date)-new Date(i.date))},kt=async()=>{var $,g,h;const t=document.getElementById("view-customers");if(!t)return;const a=l.state.customers||[],e=await mt(),s={};for(const u of e){const E=u.customerId?String(u.customerId):null,S=(u.customerName||"").trim().toLowerCase(),k=[];E&&k.push(`id:${E}`),S&&k.push(`name:${S}`);for(const w of k)s[w]||(s[w]={orders:0,spent:0,debt:0,txIds:new Set}),s[w].txIds.has(u.id)||(s[w].txIds.add(u.id),s[w].orders+=1,s[w].spent+=Number(u.total)||0,u.paymentMethod==="debt"&&(Number(u.remainingDebt)||0)>0&&(s[w].debt+=Number(u.remainingDebt)||0))}const n=a.length;let i=0,o=0,r=0;a.forEach(u=>{const E=`id:${u.id}`,S=`name:${(u.name||"").trim().toLowerCase()}`,k=s[E],w=s[S],P=Math.max((k==null?void 0:k.debt)||0,(w==null?void 0:w.debt)||0),B=Math.max((k==null?void 0:k.spent)||0,(w==null?void 0:w.spent)||0),L=Math.max(Number(u.totalDebt||0),P),z=Math.max(Number(u.totalSpent||0),B);i+=L,r+=z,o+=Number(u.galonLoaned||0)});const d=a.filter(u=>{const E=pe==="all"||u.category===pe,S=!Dt||(u.name||"").toLowerCase().includes(Dt.toLowerCase())||(u.phone||"").includes(Dt)||(u.address||"").toLowerCase().includes(Dt.toLowerCase());return E&&S}),c=d.length,p=Math.max(1,Math.ceil(c/Vt));tt>p&&(tt=p),tt<1&&(tt=1);const m=c===0?0:(tt-1)*Vt+1,b=Math.min(tt*Vt,c),v=d.slice((tt-1)*Vt,tt*Vt);t.innerHTML=`
    <!-- Responsive Section Header matching other POS modules -->
    <div class="section-header" style="flex-wrap:wrap;gap:12px;margin-bottom:var(--space-4)">
      <div>
        <h2 class="section-title">
          👥 Manajemen Pelanggan <span>${n} total (${d.length} terfilter)</span>
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
        <div style="font-size:20px;font-weight:800;color:var(--blue-700);margin-top:4px">${n} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">orang</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Sisa Piutang</div>
        <div style="font-size:20px;font-weight:800;color:#dc2626;margin-top:4px">${f(i)}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Galon Dipinjam</div>
        <div style="font-size:20px;font-weight:800;color:#d97706;margin-top:4px">${o} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">galon</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Akumulasi Omzet (LTV)</div>
        <div style="font-size:20px;font-weight:800;color:#16a34a;margin-top:4px">${f(r)}</div>
      </div>
    </div>

    <!-- Filters & Responsive Search Bar -->
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px">
      <div class="category-pills" style="display:flex;flex-wrap:wrap;gap:6px;max-width:100%">
        ${Gn.map(u=>`
          <button class="btn btn--sm ${u.id===pe?"btn--primary":"btn--secondary"} cat-filter-btn"
                  data-cat="${u.id}" style="border-radius:20px;font-size:12px;padding:5px 12px">
            ${u.label}
          </button>
        `).join("")}
      </div>

      <div style="position:relative;flex:1;min-width:200px;max-width:320px">
        <input type="text" class="input" id="cust-search"
               placeholder="Cari nama, nomor HP, alamat..."
               value="${x(Dt)}"
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
            ${v.length===0?`
              <tr>
                <td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                  Belum ada data pelanggan yang sesuai filter.
                </td>
              </tr>
            `:v.map(u=>{const E=`id:${u.id}`,S=`name:${(u.name||"").trim().toLowerCase()}`,k=s[E],w=s[S],P=Math.max((k==null?void 0:k.debt)||0,(w==null?void 0:w.debt)||0),B=Math.max(Number(u.totalDebt||0),P),L=(u.phone||"").replace(/\D/g,""),z=L.startsWith("08")?`62${L.slice(1)}`:L;return`
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--text-primary)">${x(u.name)}</div>
                    ${u.creditLimit>0?`<div style="font-size:11px;color:var(--text-muted)">Limit: ${f(u.creditLimit)}</div>`:""}
                  </td>
                  <td>
                    <span class="badge badge--blue">
                      ${x(u.category||"Rumah Tangga")}
                    </span>
                  </td>
                  <td>
                    ${z?`
                      <a href="https://wa.me/${z}" target="_blank" rel="noopener noreferrer"
                         style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                        💬 ${x(u.phone)}
                      </a>
                    `:'<span style="color:var(--text-muted)">-</span>'}
                  </td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${x(u.address||"-")}">
                    ${x(u.address||"-")}
                  </td>
                  <td style="text-align:right">
                    ${B>0?`
                      <div style="color:#dc2626;font-weight:800;font-size:13px">${f(B)}</div>
                      <button class="btn btn--sm btn-pay-debt-quick" data-id="${u.id}"
                              style="margin-top:3px;padding:2px 8px;font-size:10px;font-weight:700;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;border-radius:6px;cursor:pointer">
                        💰 Bayar
                      </button>
                    `:'<span style="color:#16a34a;font-weight:700;font-size:12px">Lunas ✅</span>'}
                  </td>
                  <td style="text-align:center">
                    ${u.galonLoaned>0?`
                      <span style="font-weight:800;color:#d97706;background:rgba(245,158,11,0.1);padding:2px 8px;border-radius:8px;font-size:12px">
                        🪣 ${u.galonLoaned}
                      </span>
                    `:'<span style="color:var(--text-muted)">0</span>'}
                  </td>
                  <td style="text-align:center">
                    <div style="display:inline-flex;gap:4px">
                      <button class="btn btn--secondary btn--sm btn-view-360" data-id="${u.id}" title="Detail Profil 360°" style="padding:4px 8px;font-size:11px">
                        🔍 Profil
                      </button>
                      <button class="btn btn--secondary btn--sm btn-edit-cust" data-id="${u.id}" title="Edit Pelanggan" style="padding:4px 8px;font-size:11px">
                        ✏️
                      </button>
                      <button class="btn btn--danger btn--sm btn-del-cust" data-id="${u.id}" title="Hapus Pelanggan" style="padding:4px 8px;font-size:11px">
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
          Menampilkan <strong>${m}-${b}</strong> dari <strong>${c}</strong> pelanggan
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn btn--secondary btn--sm" id="cust-prev-page" ${tt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            ◀ Sebelumnya
          </button>
          <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
            Hal ${tt} / ${p}
          </span>
          <button class="btn btn--secondary btn--sm" id="cust-next-page" ${tt>=p?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            Berikutnya ▶
          </button>
        </div>
      </div>
    </div>

    <!-- Dock Clearance Spacer: prevents bottom navigation dock from overlapping content -->
    <div style="height:48px" aria-hidden="true"></div>
  `,t.querySelectorAll(".cat-filter-btn").forEach(u=>{u.addEventListener("click",()=>{pe=u.dataset.cat,tt=1,kt()})});const y=document.getElementById("cust-search");y==null||y.addEventListener("input",u=>{Dt=u.target.value,tt=1,kt()}),($=document.getElementById("cust-prev-page"))==null||$.addEventListener("click",()=>{tt>1&&(tt--,kt())}),(g=document.getElementById("cust-next-page"))==null||g.addEventListener("click",()=>{tt<p&&(tt++,kt())}),(h=document.getElementById("btn-add-customer"))==null||h.addEventListener("click",()=>{Ft()}),t.querySelectorAll(".btn-edit-cust").forEach(u=>{u.addEventListener("click",()=>{const E=u.dataset.id,S=a.find(k=>String(k.id)===String(E));S&&Ft(S)})}),t.querySelectorAll(".btn-del-cust").forEach(u=>{u.addEventListener("click",async()=>{var k;const E=u.dataset.id,S=a.find(w=>String(w.id)===String(E));if(S&&confirm(`Hapus pelanggan "${S.name}"?`)){await Pn(S.id);const w=await Y();l.setCustomers(w),(k=window.showToast)==null||k.call(window,"Pelanggan berhasil dihapus.","info")}})}),t.querySelectorAll(".btn-view-360").forEach(u=>{u.addEventListener("click",()=>{const E=u.dataset.id,S=a.find(k=>String(k.id)===String(E));S&&Jn(S)})}),t.querySelectorAll(".btn-pay-debt-quick").forEach(u=>{u.addEventListener("click",()=>{const E=u.dataset.id,S=a.find(k=>String(k.id)===String(E));S&&qa(S)})})},Ft=(t=null)=>{var s,n,i;const a=!!t,e=`
    <div class="modal-header">
      <h3 class="modal-title">${a?"✏️ Edit Data Pelanggan":"➕ Tambah Pelanggan Baru"}</h3>
      <button class="modal-close" id="modal-cust-close" type="button">✕</button>
    </div>
    <div class="modal-body">
      <form id="cust-form" style="display:flex;flex-direction:column;gap:12px">
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Nama Lengkap *</label>
          <input type="text" class="input" id="cf-name" value="${x((t==null?void 0:t.name)||"")}" placeholder="e.g. Ibu Rina, Kantor PLN..." required maxlength="80">
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
            <input type="tel" class="input" id="cf-phone" value="${x((t==null?void 0:t.phone)||"")}" placeholder="081234567890" required maxlength="20">
          </div>
        </div>
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Alamat Lengkap / Patokan Pengantaran</label>
          <textarea class="input" id="cf-address" rows="2" placeholder="Jl. Anggrek No. 5 Blok C (Pagar Biru)..." maxlength="200">${x((t==null?void 0:t.address)||"")}</textarea>
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
        ${a?`
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Penyesuaian Saldo Piutang (Rp)</label>
            <input type="number" class="input" id="cf-totalDebt" value="${(t==null?void 0:t.totalDebt)||0}" min="0" step="1000" placeholder="0">
            <small style="font-size:11px;color:var(--text-muted)">Ubah jika ingin merekonsiliasi sisa hutang pelanggan ini secara manual.</small>
          </div>
        `:""}
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Catatan Khusus (Opsional)</label>
          <input type="text" class="input" id="cf-notes" value="${x((t==null?void 0:t.notes)||"")}" placeholder="e.g. Antar tiap hari Selasa & Jumat" maxlength="150">
        </div>
      </form>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="cust-cancel-btn" type="button">Batal</button>
      <button class="btn btn--primary" id="cust-save-btn" type="button">${a?"💾 Simpan Perubahan":"➕ Tambahkan Pelanggan"}</button>
    </div>
  `;at(e,"modal-cust"),(s=document.getElementById("modal-cust-close"))==null||s.addEventListener("click",()=>U("modal-cust")),(n=document.getElementById("cust-cancel-btn"))==null||n.addEventListener("click",()=>U("modal-cust")),(i=document.getElementById("cust-save-btn"))==null||i.addEventListener("click",async()=>{var h,u,E;const o=document.getElementById("cf-name").value.trim(),r=document.getElementById("cf-phone").value.trim(),d=document.getElementById("cf-category").value,c=document.getElementById("cf-address").value.trim(),p=Math.max(0,Number(document.getElementById("cf-creditLimit").value)||0),m=Math.max(0,Number(document.getElementById("cf-galonLoaned").value)||0),b=document.getElementById("cf-notes").value.trim(),v=document.getElementById("cf-totalDebt"),y=v?Math.max(0,Number(v.value)||0):(t==null?void 0:t.totalDebt)||0;if(!o){(h=window.showToast)==null||h.call(window,"Nama pelanggan wajib diisi!","warning");return}const $={name:o,phone:r,category:d,address:c,creditLimit:p,galonLoaned:m,notes:b,totalOrders:(t==null?void 0:t.totalOrders)||0,totalSpent:(t==null?void 0:t.totalSpent)||0,totalDebt:y};a?(await Wt({...$,id:t.id}),(u=window.showToast)==null||u.call(window,"Data pelanggan berhasil diperbarui!","success")):(await _a($),(E=window.showToast)==null||E.call(window,"Pelanggan baru berhasil ditambahkan!","success")),U("modal-cust");const g=await Y();l.setCustomers(g)})},Jn=async t=>{var b,v,y,$;const a=await mt(),e=Ha(t,a),s=(t.phone||"").replace(/\D/g,""),n=s.startsWith("08")?`62${s.slice(1)}`:s;let i=0,o=0;e.forEach(g=>{i+=Number(g.total||0),g.paymentMethod==="debt"&&(Number(g.remainingDebt)||0)>0&&(o+=Number(g.remainingDebt||0))});const r=Math.max(Number(t.totalSpent||0),i),d=Math.max(Number(t.totalDebt||0),o),c=Math.max(Number(t.totalOrders||0),e.length),p=encodeURIComponent(`Halo *${t.name}*, ini pengingat dari *${((b=l.state.settings)==null?void 0:b.shopName)||"Blue Mountain"}* terkait sisa piutang Anda sebesar *${f(d)}*. Terima kasih!`),m=`
    <div class="modal-header">
      <div>
        <h3 class="modal-title">👤 Profil Pelanggan 360°</h3>
        <p style="margin:2px 0 0;font-size:12px;color:var(--text-secondary)">${x(t.name)} &bull; ${x(t.category||"Rumah Tangga")}</p>
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
          <div style="font-size:16px;font-weight:900;color:var(--color-success)">${f(r)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Sisa Piutang</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-danger)">${f(d)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Galon Dipinjam</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-warning)">🪣 ${t.galonLoaned||0} buah</div>
        </div>
      </div>

      <!-- Detail Info -->
      <div style="font-size:13px;line-height:1.6">
        <div><strong>📍 Alamat:</strong> ${x(t.address||"-")}</div>
        <div><strong>📞 WhatsApp:</strong> ${x(t.phone||"-")}</div>
        <div><strong>💳 Limit Kredit:</strong> ${t.creditLimit>0?f(t.creditLimit):"Tanpa batas"}</div>
        ${t.notes?`<div><strong>📝 Catatan:</strong> ${x(t.notes)}</div>`:""}
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${d>0?`
          <button class="btn btn--primary" id="btn-drawer-pay-debt" style="font-size:12px;display:inline-flex;align-items:center;gap:4px;font-weight:700">
            💰 Bayar / Pelunasan Hutang (${f(d)})
          </button>
        `:""}
        ${n?`
          <a href="https://wa.me/${n}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px">
            💬 Chat WhatsApp
          </a>
        `:""}
        ${n&&d>0?`
          <a href="https://wa.me/${n}?text=${p}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;font-weight:700">
            📲 Kirim Tagihan WhatsApp
          </a>
        `:""}
      </div>

      <!-- Order History List -->
      <div style="margin-top:8px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px">
          <h4 style="margin:0;font-size:14px;font-weight:800">📋 Riwayat Pembelian (${e.length})</h4>
          ${e.length>0?'<span style="font-size:11px;color:var(--text-muted)">⇄ Geser horizontal jika di HP</span>':""}
        </div>
        ${e.length===0?`
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
                ${e.slice(0,20).map(g=>{const h=Number(g.remainingDebt)||0;return`
                    <tr style="border-bottom:1px solid var(--card-border)">
                      <td style="padding:8px 12px;font-weight:700;white-space:nowrap">${x(g.invoiceNo)}</td>
                      <td style="padding:8px 12px;white-space:nowrap">${wt(new Date(g.date))}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:700;white-space:nowrap">${f(g.total)}</td>
                      <td style="padding:8px 12px;text-align:center;white-space:nowrap">
                        <span class="badge" style="font-size:10px;text-transform:uppercase">${x(g.paymentStatus||g.paymentMethod)}</span>
                      </td>
                      <td style="padding:8px 12px;text-align:right;white-space:nowrap">
                        ${h>0?`
                          <strong style="color:var(--color-danger)">${f(h)}</strong>
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
  `;at(m,"modal-cust-360"),(v=document.getElementById("drawer-close-btn"))==null||v.addEventListener("click",()=>U("modal-cust-360")),(y=document.getElementById("drawer-ok-btn"))==null||y.addEventListener("click",()=>U("modal-cust-360")),($=document.getElementById("btn-drawer-pay-debt"))==null||$.addEventListener("click",()=>{U("modal-cust-360"),qa(t)})},qa=async t=>{var o,r,d,c;const a=await mt(),s=Ha(t,a).filter(p=>p.paymentMethod==="debt"&&(Number(p.remainingDebt)||0)>0),n=Math.max(Number(t.totalDebt||0),s.reduce((p,m)=>p+(Number(m.remainingDebt)||0),0));if(n<=0){(o=window.showToast)==null||o.call(window,"Pelanggan ini tidak memiliki sisa piutang.","info");return}const i=`
    <div class="modal-header">
      <h3 class="modal-title">💰 Pembayaran Piutang: ${x(t.name)}</h3>
      <button class="modal-close" id="pcd-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);padding:12px 16px;border-radius:10px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase">Total Sisa Piutang</div>
          <div style="font-size:22px;font-weight:900;color:var(--color-danger);margin-top:2px">${f(n)}</div>
        </div>
        <div style="font-size:12px;color:var(--text-secondary)">
          ${s.length>0?`${s.length} transaksi berjalan`:"Pencatatan saldo CRM"}
        </div>
      </div>

      <div>
        <label class="form-label" style="font-size:12px;font-weight:700">Jumlah Pembayaran / Cicilan (Rp) *</label>
        <input type="number" class="input" id="pcd-amount" min="1" max="${n}" value="${n}"
               style="font-size:16px;font-weight:800;color:var(--text-primary);padding:10px" autofocus>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:6px">
        <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="${n}">
          Pelunasan Penuh (${f(n)})
        </button>
        ${n>1e4?`
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="10000">Rp 10.000</button>
        `:""}
        ${n>2e4?`
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="20000">Rp 20.000</button>
        `:""}
        ${n>5e4?`
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
  `;at(i,"modal-pay-customer-debt"),(r=document.getElementById("pcd-close-btn"))==null||r.addEventListener("click",()=>U("modal-pay-customer-debt")),(d=document.getElementById("pcd-cancel-btn"))==null||d.addEventListener("click",()=>U("modal-pay-customer-debt")),document.querySelectorAll(".pcd-quick-amt").forEach(p=>{p.addEventListener("click",()=>{const m=document.getElementById("pcd-amount");m&&(m.value=p.dataset.amt)})}),(c=document.getElementById("pcd-submit-btn"))==null||c.addEventListener("click",async()=>{var b,v,y,$,g,h;const p=Number((b=document.getElementById("pcd-amount"))==null?void 0:b.value)||0,m=((y=(v=document.getElementById("pcd-note"))==null?void 0:v.value)==null?void 0:y.trim())||"Pembayaran piutang";if(p<=0||p>n){($=window.showToast)==null||$.call(window,`Jumlah pembayaran harus antara Rp 1 dan ${f(n)}`,"warning");return}try{let u=p;const E=new Date().toISOString(),S=[...s].sort((B,L)=>new Date(B.date)-new Date(L.date));for(const B of S){if(u<=0)break;const L=Number(B.remainingDebt)||0,z=Math.min(u,L),O=(Number(B.paidAmount)||0)+z,_=Math.max(0,L-z),K=_===0?"paid":"partial",W=(B.debtPayments||[]).length+1,J=_===0?`${m} (Pelunasan/LUNAS ✅)`:`${m} (Cicilan #${W})`,A=[...B.debtPayments||[],{date:E,amount:z,note:J}],D={...B,paidAmount:O,remainingDebt:_,paymentStatus:K,debtPayments:A};await se(D),l.updateTransaction(B.id,D),u-=z}const w=(await Y()).find(B=>String(B.id)===String(t.id))||t;w.totalDebt=Math.max(0,(Number(w.totalDebt)||0)-p),await Wt(w);const P=await Y();l.setCustomers(P),U("modal-pay-customer-debt"),(g=window.showToast)==null||g.call(window,`Pembayaran ${f(p)} untuk ${t.name} berhasil dicatat!`,"success")}catch(u){(h=window.showToast)==null||h.call(window,`Gagal mencatat pembayaran hutang: ${u.message||"Error"}`,"error")}})},da=t=>{if(t==null)return'""';const a=String(t);return a.includes('"')||a.includes(",")||a.includes(`
`)||a.includes("\r")?`"${a.replace(/"/g,'""')}"`:`"${a}"`},Ye=(t,a,e)=>{const s=a.map(da).join(","),n=e.map(c=>c.map(da).join(",")),i=`\uFEFF${[s,...n].join(`\r
`)}`,o=new Blob([i],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(o),d=document.createElement("a");d.setAttribute("href",r),d.setAttribute("download",t.endsWith(".csv")?t:`${t}.csv`),d.style.visibility="hidden",document.body.appendChild(d),d.click(),document.body.removeChild(d),setTimeout(()=>URL.revokeObjectURL(r),1e3)};let Be=null,Ce=null,Ne=null,Kt=!1,ft=1,yt=1,vt=1;const xt=10,Vn=async()=>{Be&&Be(),Ce&&Ce(),Ne&&Ne(),Be=l.on("transactions:change",()=>{Kt||ot()}),Ce=l.on("expenses:change",()=>{Kt||ot()}),Ne=l.on("customers:change",()=>{Kt||ot()}),await ot()},ot=async()=>{if(!Kt){Kt=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[a,e,s]=await Promise.all([l.state.transactions.length?Promise.resolve(l.state.transactions):mt().then(_=>(l.setTransactions(_),_)),ie().then(_=>(l.setExpenses(_),_)),Je("modalAwal")]),n=parseFloat(s)||0;let i=0,o=0,r=0,d=0,c=0;for(const _ of a)if(_.paymentMethod==="cash"&&(_.paymentStatus==="paid"||!_.paymentStatus)&&(i+=_.total),_.paymentMethod==="transfer"&&(_.paymentStatus==="transfer_confirmed"?o+=_.total:d+=_.total),_.paymentMethod==="debt"){for(const K of _.debtPayments||[])r+=K.amount;c+=_.remainingDebt||0}const p=i+o+r,m=e.reduce((_,K)=>_+(K.amount||0),0),b=n+p-m,v=d+c,y=Qn(a,e),$=Yn(a,e),g=$.reduce((_,K)=>_+(K.debit||0),0),h=$.reduce((_,K)=>_+(K.credit||0),0),u=g===h,E=(l.state.customers||[]).reduce((_,K)=>_+(Number(K.galonLoaned)||0),0),S=[...a.filter(_=>_.paymentStatus==="transfer_pending"),...a.filter(_=>(_.paymentMethod==="debt"||_.paymentStatus==="partial"||_.paymentStatus==="unpaid")&&(_.remainingDebt||0)>0)].sort((_,K)=>new Date(_.date)-new Date(K.date)),k=Math.max(1,Math.ceil(S.length/xt));ft>k&&(ft=k);const w=S.slice((ft-1)*xt,ft*xt),P=[...e].sort((_,K)=>new Date(K.date)-new Date(_.date)),B=Math.max(1,Math.ceil(P.length/xt));yt>B&&(yt=B);const L=P.slice((yt-1)*xt,yt*xt),z=Math.max(1,Math.ceil($.length/xt));vt>z&&(vt=z);const O=$.slice((vt-1)*xt,vt*xt);t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${f(n)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${f(b)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${f(p)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${f(m)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${e.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${f(v)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${S.length} belum lunas</div>
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
            <div style="font-size:18px;font-weight:900;color:var(--color-warning)">${E} <span style="font-size:12px;font-weight:600">galon</span></div>
            <div style="font-size:10px;color:var(--text-muted)">Di ${(l.state.customers||[]).filter(_=>(_.galonLoaned||0)>0).length} pelanggan</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Nilai Aset Galon Toko</div>
            <div style="font-size:18px;font-weight:900;color:var(--blue-600)">${f(E*45e3)}</div>
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
          ${Qt("💵 Tunai",i,"#16a34a")}
          ${Qt("📲 Transfer",o,"#2563eb")}
          ${Qt("📋 Cicilan Hutang",r,"#7c3aed")}
          ${Qt("⏳ Transfer Pending",d,"#d97706",!0)}
          ${Qt("🔴 Piutang Hutang",c,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding Table with Pagination (10/page) -->
      ${S.length>0?`
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
          ⚠️ Daftar Piutang &amp; Cicilan Berjalan (${S.length} transaksi)
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
              ${w.map(_=>{const K=_.total||0,W=_.paymentStatus==="transfer_pending"?K:_.remainingDebt||0,J=K-W,A=Math.min(100,Math.max(0,Math.round(J/K*100))),D=(_.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${x(_.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${x(_.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(_.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${f(K)}</td>
                <td style="color:#16a34a;font-weight:700">${f(J)}</td>
                <td style="font-weight:800;color:#dc2626">${f(W)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${A}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${D>0?`${D}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${A}%;background:${A===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${_.paymentStatus==="transfer_pending"?`
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${_.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>`:`
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${_.id}"
                      style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      💰 Cicil / Pelunasan
                    </button>`}
                </td>
              </tr>`}).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${ft} dari ${k}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="piutang-prev" ${ft<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="piutang-next" ${ft>=k?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>`:""}

      <!-- Pengeluaran Operasional Table with Pagination (10/page) -->
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">📤 Pengeluaran Operasional (${e.length} entri)</div>
          <button class="btn btn--primary btn--sm" id="btn-add-expense">+ Tambah Pengeluaran</button>
        </div>
        ${e.length===0?`
          <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        `:`
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${L.map(_=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(_.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${x(_.category||"Lainnya")}</span></td>
                  <td>${x(_.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${f(_.amount)}</td>
                  <td>
                    <button class="btn btn--sm" data-action="delete-expense" data-id="${_.id}"
                      style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
            <div style="font-size:12px;color:var(--text-muted)">Hal ${yt} dari ${B}</div>
            <div style="display:flex;gap:6px">
              <button class="btn btn--secondary btn--sm" id="exp-prev" ${yt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
              <button class="btn btn--secondary btn--sm" id="exp-next" ${yt>=B?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
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
              ${Xn(y,n)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Jurnal Entri with Pagination (10/page) -->
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
            📒 Jurnal Entri Akuntansi SAK EMKM (${$.length} baris)
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badge" style="background:${u?"#dcfce7":"#fee2e2"};color:${u?"#166534":"#991b1b"};border:1px solid ${u?"#86efac":"#fca5a5"};font-size:11px;font-weight:700;padding:4px 10px">
              ⚖️ Debit: ${f(g)} | Kredit: ${f(h)} (${u?"Seimbang ✅":"Selisih ⚠️"})
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
              ${O.map(_=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(_.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${x(_.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${_.debit>0?f(_.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${_.credit>0?f(_.credit):"—"}</td>
                <td><span class="badge ${_.type==="kas"?"badge--green":_.type==="piutang"?"":"badge--blue"}"
                  style="${_.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${x(_.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${vt} dari ${z}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="journal-prev" ${vt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="journal-next" ${vt>=z?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>
    `,Zn(a,e,$)}finally{Kt=!1}}},Qt=(t,a,e,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${e}">${f(a)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Qn=(t,a)=>{const e={};for(const n of t){const i=n.dateKey;if(i){if(e[i]||(e[i]={masuk:0,keluar:0}),n.paymentMethod==="cash"&&(n.paymentStatus==="paid"||!n.paymentStatus)&&(e[i].masuk+=n.total),n.paymentMethod==="transfer"&&n.paymentStatus==="transfer_confirmed"){const o=n.confirmedAt?n.confirmedAt.split("T")[0]:i;e[o]||(e[o]={masuk:0,keluar:0}),e[o].masuk+=n.total}if(n.paymentMethod==="debt")for(const o of n.debtPayments||[]){const r=o.date?o.date.split("T")[0]:i;e[r]||(e[r]={masuk:0,keluar:0}),e[r].masuk+=o.amount}}}for(const n of a){const i=n.dateKey||(n.date?n.date.split("T")[0]:null);i&&(e[i]||(e[i]={masuk:0,keluar:0}),e[i].keluar+=n.amount||0)}const s=[];for(let n=29;n>=0;n--){const i=new Date;i.setDate(i.getDate()-n);const o=it(i);s.push({key:o,...e[o]||{masuk:0,keluar:0}})}return s},Xn=(t,a)=>{let e=a;const s=t.filter(n=>n.masuk>0||n.keluar>0).map(n=>{const i=n.masuk-n.keluar;return e+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(n.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${n.masuk>0?f(n.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${n.keluar>0?f(n.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${f(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${f(e)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Yn=(t,a)=>{const e=[];for(const s of t){const n=x(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")e.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1001] Kas Toko / [4001] Pendapatan Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?e.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1002] Bank Transfer & QRIS / [4001] Pendapatan",type:"kas"}):e.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${n}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"[1101] Piutang Transfer / [4001] Pendapatan",type:"piutang"});else if(s.paymentMethod==="debt"){e.push({date:s.date,desc:`Penjualan Kredit/Tempo — ${s.invoiceNo} (${n}) [Total: ${f(s.total)}]`,debit:s.total,credit:s.total,account:"[1101] Piutang Usaha / [4001] Pendapatan",type:"piutang"});const i=s.debtPayments||[];let o=0;i.forEach((r,d)=>{o+=r.amount||0;const c=Math.max(0,s.total-o),p=c===0,m=d+1,b=p?`Pelunasan Piutang (#${m}/LUNAS ✅)`:`Cicilan Piutang #${m} (dari ${i.length})`,v=r.note?` — ${x(r.note)}`:"";e.push({date:r.date,desc:`${b} — ${s.invoiceNo} (${n})${v} [Bayar: ${f(r.amount)} | Sisa: ${f(c)}]`,debit:r.amount,credit:r.amount,account:p?"[1001] Kas Toko / [1101] Piutang (LUNAS ✅)":"[1001] Kas Toko / [1101] Piutang Usaha",type:"kas"})})}}for(const s of a){const n=(s.category||"").toLowerCase();let i="[6099] Beban Operasional";n.includes("tutup")||n.includes("tisu")||n.includes("galon")||n.includes("bahan")?i="[6001] Beban Tutup & Tisu":n.includes("listrik")||n.includes("air")||n.includes("utilitas")?i="[6002] Beban Utilitas/Listrik":n.includes("gaji")||n.includes("upah")?i="[6003] Beban Gaji Karyawan":(n.includes("bensin")||n.includes("antar")||n.includes("transport"))&&(i="[6004] Beban Transportasi"),e.push({date:s.date,desc:`Beban ${x(s.category||"Operasional")} — ${x(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`${i} / [1001] Kas Toko`,type:"beban"})}return e.sort((s,n)=>new Date(n.date)-new Date(s.date))},Zn=(t,a=[],e=[])=>{var s,n,i,o,r,d,c,p,m,b,v,y;(s=document.getElementById("btn-refresh-finance"))==null||s.addEventListener("click",ot),(n=document.getElementById("piutang-prev"))==null||n.addEventListener("click",()=>{ft>1&&(ft--,ot())}),(i=document.getElementById("piutang-next"))==null||i.addEventListener("click",()=>{ft++,ot()}),(o=document.getElementById("exp-prev"))==null||o.addEventListener("click",()=>{yt>1&&(yt--,ot())}),(r=document.getElementById("exp-next"))==null||r.addEventListener("click",()=>{yt++,ot()}),(d=document.getElementById("journal-prev"))==null||d.addEventListener("click",()=>{vt>1&&(vt--,ot())}),(c=document.getElementById("journal-next"))==null||c.addEventListener("click",()=>{vt++,ot()}),(p=document.getElementById("btn-export-journal-csv"))==null||p.addEventListener("click",()=>{var u;const $=["Tanggal","Keterangan","Debit","Kredit","Bagan Akun COA"],g=e.map(E=>[wt(new Date(E.date)),E.desc||"",E.debit||0,E.credit||0,E.account||""]),h=it();Ye(`Jurnal-Akuntansi-${h}.csv`,$,g),(u=window.showToast)==null||u.call(window,"✅ Jurnal akuntansi berhasil diekspor ke file CSV/Excel!","success")}),(m=document.getElementById("btn-set-modal-awal"))==null||m.addEventListener("click",()=>{const g=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${l.state.settings.modalAwal||0||""}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;at(g,"modal-awal"),setTimeout(()=>{var h,u,E;(h=document.getElementById("ma-x"))==null||h.addEventListener("click",()=>U("modal-awal")),(u=document.getElementById("ma-cancel"))==null||u.addEventListener("click",()=>U("modal-awal")),(E=document.getElementById("ma-save"))==null||E.addEventListener("click",async()=>{var k;const S=parseFloat((k=document.getElementById("modal-awal-input"))==null?void 0:k.value)||0;await Aa("modalAwal",S),l.updateSettings({modalAwal:S}),U("modal-awal"),window.showToast("Modal Awal disimpan!","success"),ot()})},0)}),(b=document.getElementById("btn-add-expense"))==null||b.addEventListener("click",()=>{const g=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(h=>`<option value="${x(h)}">${x(h)}</option>`).join("")}
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
    `;at(g,"expense-modal"),setTimeout(()=>{var h,u,E;(h=document.getElementById("exp-x"))==null||h.addEventListener("click",()=>U("expense-modal")),(u=document.getElementById("exp-cancel"))==null||u.addEventListener("click",()=>U("expense-modal")),(E=document.getElementById("exp-save"))==null||E.addEventListener("click",async()=>{var L,z,O,_;const S=parseFloat((L=document.getElementById("exp-amount"))==null?void 0:L.value)||0,k=((z=document.getElementById("exp-category"))==null?void 0:z.value)||"Lainnya",w=((_=(O=document.getElementById("exp-note"))==null?void 0:O.value)==null?void 0:_.trim())||"";if(S<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const P=new Date().toISOString(),B={date:P,dateKey:P.split("T")[0],category:k,note:w,amount:S};try{const K=await Nn(B);B.id=K,l.addExpense(B),U("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch{window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(v=document.getElementById("expense-table"))==null||v.addEventListener("click",async $=>{const g=$.target.closest('[data-action="delete-expense"]');if(!g||!confirm("Hapus pengeluaran ini?"))return;const h=String(g.dataset.id),u=Number.isNaN(Number(h))?h:Number(h);try{await Mn(u),l.removeExpense(u),window.showToast("Pengeluaran dihapus","success")}catch{window.showToast("Gagal hapus","error")}}),(y=document.getElementById("piutang-table"))==null||y.addEventListener("click",async $=>{const g=$.target.closest("[data-action]");if(!g)return;const h=String(g.dataset.id),u=Number.isNaN(Number(h))?h:Number(h),E=g.dataset.action,S=(l.state.transactions||t).find(k=>String(k.id)===h);if(S){if(E==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${f(S.total)} dari ${x(S.customerName||"pelanggan")} sudah diterima?`))return;const k={...S,paymentStatus:"transfer_confirmed",paidAmount:S.total,confirmedAt:new Date().toISOString()};try{await se(k),l.updateTransaction(u,{paymentStatus:"transfer_confirmed",paidAmount:S.total,confirmedAt:k.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}}if(E==="pay-debt"){const k=S.remainingDebt||0,w=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${f(S.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${f(k)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${k}" min="1" max="${k}" step="1000" inputmode="numeric">
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
      `;at(w,"mini-cicil"),setTimeout(()=>{var P,B,L;(P=document.getElementById("mc-x"))==null||P.addEventListener("click",()=>U("mini-cicil")),(B=document.getElementById("mc-cancel"))==null||B.addEventListener("click",()=>U("mini-cicil")),(L=document.getElementById("mc-save"))==null||L.addEventListener("click",async()=>{var Q,j,I;const z=parseFloat((Q=document.getElementById("mc-amount"))==null?void 0:Q.value)||0;if(z<=0||z>k){window.showToast("Jumlah tidak valid","warning");return}const O=(S.paidAmount||0)+z,_=Math.max(0,k-z),K=_===0?"paid":"partial",W=(S.debtPayments||[]).length+1,J=_===0?`Pelunasan (#${W}/LUNAS ✅)`:`Cicilan #${W}`,A=((I=(j=document.getElementById("mc-note"))==null?void 0:j.value)==null?void 0:I.trim())||J,D=[...S.debtPayments||[],{date:new Date().toISOString(),amount:z,note:A}],V={...S,paidAmount:O,remainingDebt:_,paymentStatus:K,debtPayments:D};try{if(await se(V),l.updateTransaction(u,{paidAmount:O,remainingDebt:_,paymentStatus:K,debtPayments:D}),S.customerId||S.customerName){const C=(await Y()).find(M=>S.customerId&&String(M.id)===String(S.customerId)||(M.name||"").trim().toLowerCase()===(S.customerName||"").trim().toLowerCase());if(C){C.totalDebt=Math.max(0,(Number(C.totalDebt)||0)-z),await Wt(C);const M=await Y();l.setCustomers(M)}}U("mini-cicil"),window.showToast(_===0?"🎉 Hutang LUNAS!":`Cicilan #${W} (${f(z)}) dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)}}})};let pt=[],Lt=null,X="",be=!1,la=!1,He=!1;const ue={owner:{label:"👑 Owner",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},ts=async()=>{X="",be=!1,await Gt(),as(),l.on("users:change",()=>{const t=document.getElementById("view-login");t!=null&&t.classList.contains("active")&&Gt()})},Gt=async()=>{var s;const t=document.getElementById("view-login");if(!t)return;navigator.onLine&&Bt().catch(()=>{});let a=await St();if(pt=a.filter(n=>n.isActive!==!1),pt.length===0&&(await Ve(),a=await St(),pt=a.filter(n=>n.isActive!==!1)),pt.length===0||He){t.innerHTML=`
      <div class="login-portal-wrapper">
        <div class="login-portal-card" style="text-align: center; max-width: 420px; width: 100%;">
          <div class="login-brand-header">
            <img src="assets/logo.png" alt="Blue Mountain Logo" class="login-brand-logo">
            <h1 class="login-brand-title">BLUE MOUNTAIN</h1>
            <p class="login-brand-subtitle">Portal Masuk Operator Kasir</p>
          </div>
          <div style="background: rgba(37, 99, 235, 0.08); border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: var(--text-secondary, #475569); border: 1px solid rgba(37, 99, 235, 0.2);">
            <span>🔑</span> Masuk menggunakan <strong>Username & PIN</strong> server
          </div>
          <form id="form-manual-login" style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
            <div>
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase;">Username Operator</label>
              <input type="text" id="manual-login-username" class="form-control" placeholder="Contoh: admin atau test" required style="width: 100%; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--border, #cbd5e1); font-size: 15px; margin-top: 4px; box-sizing: border-box;">
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase;">PIN (4–6 Digit)</label>
              <input type="password" id="manual-login-pin" class="form-control" placeholder="Masukkan 4-6 angka" maxlength="6" inputmode="numeric" required style="width: 100%; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--border, #cbd5e1); font-size: 15px; margin-top: 4px; box-sizing: border-box;">
            </div>
            <div id="manual-login-error" style="color: #ef4444; font-size: 13px; font-weight: 600; display: none;"></div>
            <button type="submit" id="btn-submit-manual-login" class="btn btn-primary" style="padding: 12px; border-radius: 10px; font-weight: 700; width: 100%; margin-top: 6px; cursor: pointer;">
              Masuk Sekarang ➔
            </button>
            ${pt.length>0?`
              <button type="button" id="btn-back-to-list" class="btn btn-secondary" style="padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer;">
                ⬅ Kembali ke Pilihan Operator
              </button>
            `:`
              <button type="button" class="btn btn-secondary" onclick="location.reload()" style="padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer;">
                🔄 Sinkronkan Cloud Server
              </button>
            `}
          </form>
        </div>
      </div>
    `;const n=document.getElementById("form-manual-login");n==null||n.addEventListener("submit",async i=>{var m,b;i.preventDefault();const o=document.getElementById("manual-login-username").value.trim(),r=document.getElementById("manual-login-pin").value.trim(),d=document.getElementById("manual-login-error"),c=document.getElementById("btn-submit-manual-login");if(d&&(d.style.display="none"),!o||!r)return;c&&(c.disabled=!0,c.textContent="Memverifikasi...");const p=await We(o,r);if(c&&(c.disabled=!1,c.textContent="Masuk Sekarang ➔"),p.success){l.login(p.user,p.token);const v=p.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(m=window.showToast)==null||m.call(window,`Berhasil masuk sebagai ${p.user.name} (${p.user.role})${v}`,"success"),navigator.onLine&&Ht().catch(()=>{}),typeof window.appNavigateTo=="function"?window.appNavigateTo("pos"):(b=document.getElementById("dock-pos"))==null||b.click()}else d&&(d.textContent=p.error||"Username atau PIN salah.",d.style.display="block")}),(s=document.getElementById("btn-back-to-list"))==null||s.addEventListener("click",()=>{He=!1,Gt()});return}(!Lt||!pt.some(n=>String(n.id)===String(Lt)))&&(Lt=pt[0].id);const e=pt.find(n=>String(n.id)===String(Lt))||pt[0];ue[e.role]||ue.cashier,t.innerHTML=`
    <div class="login-portal-wrapper">
      <div class="login-portal-card">
        
        <!-- Brand Header -->
        <div class="login-brand-header">
          <img src="assets/logo.png" alt="Blue Mountain Logo" class="login-brand-logo">
          <h1 class="login-brand-title">BLUE MOUNTAIN</h1>
          <p class="login-brand-subtitle">Portal Masuk Operator Kasir</p>
        </div>

        <!-- Operator Selector -->
        <div class="login-op-section">
          <label class="login-op-label">PILIH AKUN OPERATOR</label>
          <div class="login-operator-list" id="login-operator-list">
            ${pt.map(n=>{const i=String(n.id)===String(Lt),o=ue[n.role]||ue.cashier;return`
                <button type="button" class="btn-login-op ${i?"selected":""}" data-id="${n.id}">
                  <div class="login-op-avatar" style="background: ${o.color};">
                    ${(n.name||"U").charAt(0).toUpperCase()}
                  </div>
                  <div style="text-align: left;">
                    <div class="login-op-name">${x(n.name)}</div>
                    <div class="login-op-role" style="color: ${o.color};">${o.label}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Selected User Prompt -->
        <div>
          <div class="login-prompt-box">
            <span>🔑</span> Masukkan <strong>6 digit PIN</strong> untuk <strong>${x(e.name)}</strong>
          </div>
        </div>

        <!-- PIN Dots Display -->
        <div class="login-pin-box" id="login-pin-box">
          <div class="login-pin-dots" id="login-pin-dots">
            ${[0,1,2,3,4,5].map(n=>`
              <span class="pin-dot ${n<X.length?"filled":""}"></span>
            `).join("")}
          </div>
          <div class="login-error-msg" id="login-error-msg"></div>
        </div>

        <!-- Numpad Keypad -->
        <div class="login-numpad-grid">
          ${[1,2,3,4,5,6,7,8,9].map(n=>`
            <button type="button" class="btn-numpad-key" data-val="${n}">${n}</button>
          `).join("")}
          <button type="button" class="btn-numpad-key btn-clear" data-val="clear">C</button>
          <button type="button" class="btn-numpad-key" data-val="0">0</button>
          <button type="button" class="btn-numpad-key btn-submit" data-val="submit">✓</button>
        </div>

        <!-- Manual Username Input Option -->
        <div style="text-align: center; margin-top: 14px;">
          <button type="button" id="btn-toggle-manual" style="background: none; border: none; color: var(--primary, #2563eb); font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: underline;">
            Masuk dengan Username Lain
          </button>
        </div>

      </div>
    </div>
  `,es()},ae=()=>{document.querySelectorAll("#login-pin-dots .pin-dot").forEach((a,e)=>{const s=e<X.length;a.style.background=s?"var(--primary, #2563eb)":"transparent",a.style.transform=s?"scale(1.18)":"scale(1)"})},ca=async(t=!1)=>{var p;if(be)return;const a=pt.find(m=>String(m.id)===String(Lt));if(!a)return;const e=document.getElementById("login-error-msg"),s="bm_pin_lockout",n=()=>{try{const m=JSON.parse(localStorage.getItem(s)||"{}");return{count:Number(m.count)||0,until:Number(m.until)||0}}catch{return{count:0,until:0}}},i=(m,b)=>{try{localStorage.setItem(s,JSON.stringify({count:m,until:b}))}catch{}},o=n();if(o.until>Date.now()){const m=Math.ceil((o.until-Date.now())/1e3);e&&(e.textContent=`Sistem terkunci! Tunggu ${m} detik lagi.`),Me(),X="",ae();return}if(t&&X.length<6){e&&(e.textContent=`Masukkan 6 digit PIN (sudah ${X.length} digit)`),Me();return}if(!t&&X.length!==6)return;be=!0;const r=document.querySelector(".btn-numpad-key.btn-submit");r&&(r.textContent="⏳");const d=await We(a.username,X);if(be=!1,r&&(r.textContent="✓"),d.success){i(0,0),l.login(d.user,d.token);const m=d.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";if((p=window.showToast)==null||p.call(window,`Berhasil masuk sebagai ${d.user.name} (${d.user.role})${m}`,"success"),X="",navigator.onLine&&Ht().catch(()=>{}),typeof window.appNavigateTo=="function")window.appNavigateTo("pos");else{const b=document.getElementById("dock-pos");b&&b.click()}return}const c=n().count+1;c>=5?(i(c,Date.now()+6e4),e&&(e.textContent="PIN salah 5 kali berturut-turut! Sistem terkunci 60 detik.")):(i(c,0),e&&(e.textContent=`${d.error||"PIN salah!"} (Sisa percobaan: ${5-c})`)),Me(),X="",ae()},Me=()=>{const t=document.getElementById("login-pin-box");t&&(t.style.animation="none",t.offsetWidth,t.style.animation="shake 0.4s ease-in-out")},es=()=>{var t;document.querySelectorAll(".btn-login-op").forEach(a=>{a.addEventListener("click",()=>{Lt=a.getAttribute("data-id"),X="",Gt()})}),document.querySelectorAll(".btn-numpad-key").forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-val");te(e)})}),(t=document.getElementById("btn-toggle-manual"))==null||t.addEventListener("click",()=>{He=!0,Gt()})},te=t=>{const a=document.getElementById("login-error-msg");a&&(a.textContent=""),t==="clear"?(X="",ae()):t==="backspace"?X.length>0&&(X=X.slice(0,-1),ae()):t==="submit"?ca(!0):/^[0-9]$/.test(t)&&X.length<6&&(X+=t,ae(),X.length===6&&ca(!1))},as=()=>{la||(la=!0,window.addEventListener("keydown",t=>{const a=document.getElementById("view-login");a!=null&&a.classList.contains("active")&&(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||(t.key>="0"&&t.key<="9"?(t.preventDefault(),te(t.key)):t.key==="Backspace"?(t.preventDefault(),te("backspace")):t.key==="Enter"?(t.preventDefault(),te("submit")):t.key==="Escape"&&(t.preventDefault(),te("clear"))))}))};let qe="",we="Semua",me=null,pa=[];const ns=async()=>{const[t,a]=await Promise.all([dt(),Y()]);l.setProducts(t),l.setCustomers(a),Fa(),me&&me.abort(),me=new AbortController;for(const e of pa)e();pa=[l.on("cart:change",Ga),l.on("products:change",()=>re()),l.on("selectedCustomer:change",()=>Ct()),l.on("customers:change",()=>Ct())],os(me.signal)},Fa=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
              value="${l.state.discount||""}" min="0" max="99999999" placeholder="0" inputmode="numeric">
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
  `,Ze(),re(),Ct(),Ga()},ss=()=>["Semua",...new Set(l.state.products.map(t=>t.category))],Ze=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=ss().map(a=>`
    <button class="cat-pill ${a===we?"active":""}"
      data-cat="${x(a)}">${x(a)}</button>
  `).join(""))},re=()=>{const t=document.getElementById("product-grid");if(!t)return;let a=l.state.products;if(we!=="Semua"&&(a=a.filter(e=>e.category===we)),qe){const e=qe.toLowerCase();a=a.filter(s=>{var n;return s.name.toLowerCase().includes(e)||((n=s.sku)==null?void 0:n.toLowerCase().includes(e))})}if(!a.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=a.map(e=>{const s=e.image?`<img src="${x(e.image)}" class="product-card__thumb" alt="${x(e.name)}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;margin-bottom:2px">`:`<div class="product-card__emoji">${e.emoji||"📦"}</div>`;return`
      <div class="product-card" data-id="${e.id}" role="button" tabindex="0"
        aria-label="${x(e.name)} — ${f(e.price)}">
        <span class="product-card__sku" style="font-size:9px;font-weight:700;color:var(--text-muted);background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:4px;padding:1px 4px;margin-bottom:2px">${x(e.sku||`BM-${e.id}`)}</span>
        ${s}
        <div class="product-card__name">${x(e.name)}</div>
        <div class="product-card__price">${f(e.price)}</div>
        <div class="product-card__unit">per ${x(e.unit)}</div>
      </div>
    `}).join(""),t.querySelectorAll(".product-card").forEach(e=>{const s=()=>{const n=e.dataset.id,i=l.state.products.find(o=>String(o.id)===String(n));i&&(l.addToCart(i),e.style.transform="scale(0.94)",setTimeout(()=>{e.style.transform=""},120))};e.addEventListener("click",s),e.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),s())})})},Ga=()=>{const t=document.getElementById("cart-items"),a=document.getElementById("cart-count"),e=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),n=document.getElementById("tax-row"),i=document.getElementById("customer-name"),o=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=l.state.customerName||""),o&&!o.matches(":focus")&&(o.value=l.state.discount||""),!t)return;const r=l.state.cart;if(a){const d=a.textContent;a.textContent=l.cartCount,d!==String(l.cartCount)&&(a.classList.remove("bump"),a.offsetWidth,a.classList.add("bump"))}if(e&&(e.textContent=f(l.total)),n&&s&&(l.tax>0?(n.style.display="flex",s.textContent=f(l.tax)):n.style.display="none"),!r.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=r.map(d=>{const c=d.product.image?`<img src="${d.product.image}" style="width:20px;height:20px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:4px">`:`${d.product.emoji||""} `;return`
      <div class="cart-item" data-pid="${d.product.id}">
        <div class="cart-item__info">
          <div class="cart-item__name">${c}${x(d.product.name)} <span style="font-size:10px;color:var(--text-muted)">(${x(d.product.sku||`BM-${d.product.id}`)})</span></div>
          <div class="cart-item__price">${f(d.product.price)} / ${x(d.product.unit)}</div>
        </div>
        <div class="cart-item__controls">
          <div class="cart-item__subtotal">${f(d.product.price*d.qty)}</div>
          <div class="qty-controls">
            <button class="qty-btn remove" data-action="remove" data-pid="${d.product.id}" title="Hapus">🗑</button>
            <button class="qty-btn" data-action="dec" data-pid="${d.product.id}">−</button>
            <span class="qty-value">${d.qty}</span>
            <button class="qty-btn" data-action="inc" data-pid="${d.product.id}">+</button>
          </div>
        </div>
      </div>
    `}).join(""),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const c=d.dataset.pid,p=d.dataset.action,m=l.state.cart.find(b=>String(b.product.id)===String(c));m&&(p==="inc"?l.setQty(m.product.id,m.qty+1):p==="dec"?l.setQty(m.product.id,m.qty-1):p==="remove"&&l.removeFromCart(m.product.id))})})},is=()=>{const t=`
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
          ${["🏷️","💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🫙","🧊"].map((a,e)=>`
            <button type="button" class="emoji-pick-mi ${e===0?"emoji-pick--active":""}"
              data-emoji="${a}"
              style="font-size:24px;width:38px;height:38px;border-radius:8px;border:2px solid ${e===0?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${a}</button>
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
  `;at(t,"manual-item-modal"),setTimeout(()=>{var a,e,s,n;(a=document.getElementById("mi-close"))==null||a.addEventListener("click",()=>U("manual-item-modal")),(e=document.getElementById("mi-cancel"))==null||e.addEventListener("click",()=>U("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(o=>{o.style.borderColor="var(--border-subtle)",o.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(n=document.getElementById("mi-save"))==null||n.addEventListener("click",async()=>{var v,y,$,g,h,u,E;const i=(v=document.getElementById("mi-name"))==null?void 0:v.value.trim(),o=(y=document.getElementById("mi-price"))==null?void 0:y.value,r=parseFloat(o)||0,d=Math.max(1,parseInt(($=document.getElementById("mi-qty"))==null?void 0:$.value,10)||1),c=((g=document.getElementById("mi-unit"))==null?void 0:g.value.trim())||"pcs",p=((h=document.getElementById("mi-category"))==null?void 0:h.value)||"Lainnya",m=((u=document.getElementById("mi-emoji"))==null?void 0:u.value)||"🏷️",b=(E=document.getElementById("mi-save-catalog"))==null?void 0:E.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(o===""||r<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(b){const S=await La({name:i,price:r,unit:c,category:p,emoji:m,stock:999}),k=await dt();l.setProducts(k);const w=k.find(P=>P.id===S)||{id:S,name:i,price:r,unit:c,category:p,emoji:m};l.addToCart(w,d),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const S={id:It("manual"),name:i,price:r,unit:c,category:p,emoji:m};l.addToCart(S,d),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}U("manual-item-modal")}catch{window.showToast("Gagal menambahkan item manual!","error")}})},0)},os=t=>{document.addEventListener("click",a=>{const e=a.target.closest(".cat-pill");if(e){we=e.dataset.cat,Ze(),re();return}if(a.target.closest("#btn-manual-item")){is();return}if(a.target.closest("#btn-pay-cash")){if(!l.state.cart.length){window.showToast("Keranjang kosong!","warning");return}Ae("cash")}if(a.target.closest("#btn-pay-transfer")){if(!l.state.cart.length){window.showToast("Keranjang kosong!","warning");return}Ae("transfer")}if(a.target.closest("#btn-pay-debt")){if(!l.state.cart.length){window.showToast("Keranjang kosong!","warning");return}Ae("debt")}a.target.closest("#btn-clear-cart")&&l.state.cart.length&&(l.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",a=>{var e;if(a.target.id==="pos-search"&&(qe=a.target.value.trim(),re()),a.target.id==="discount-input"&&l.setDiscount(parseFloat(a.target.value)||0),a.target.id==="customer-name"){const s=a.target.value.trim().toLowerCase();l.setCustomerName(a.target.value);const n=document.getElementById("cust-autocomplete-dropdown");if(!n)return;if(!s){n.style.display="none";return}const i=(l.state.customers||[]).filter(o=>(o.name||"").toLowerCase().includes(s)||(o.phone||"").includes(s)).slice(0,6);if(i.length===0){n.innerHTML=`
          <div style="padding:12px;font-size:12px;color:#64748b;display:flex;justify-content:space-between;align-items:center;background:#ffffff">
            <span>Pelanggan belum terdaftar</span>
            <button type="button" class="btn btn--sm btn--primary" id="btn-dropdown-quick-add" style="font-size:11px;padding:3px 10px;font-weight:700">
              ➕ Tambahkan
            </button>
          </div>
        `,n.style.display="block",(e=n.querySelector("#btn-dropdown-quick-add"))==null||e.addEventListener("click",()=>{n.style.display="none",Ft({name:a.target.value.trim()})});return}n.innerHTML=i.map(o=>`
        <div class="cust-option" data-id="${o.id}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:12px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;transition:background 100ms ease">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;color:#1e293b">${x(o.name)} <span class="badge" style="font-size:10px;font-weight:700;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px">${x(o.category||"Umum")}</span></div>
            <div style="font-size:11px;color:#64748b;margin-top:2px">📱 ${x(o.phone||"-")} ${o.address?`&bull; 📍 ${x(o.address)}`:""}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:8px">
            ${o.totalDebt>0?`<span style="color:#dc2626;font-weight:800;font-size:11px;display:block">Hutang: ${f(o.totalDebt)}</span>`:""}
            <span style="font-size:10px;color:#2563eb;font-weight:700">Pilih ➔</span>
          </div>
        </div>
      `).join(""),n.style.display="block",n.querySelectorAll(".cust-option").forEach(o=>{o.addEventListener("mouseenter",()=>{o.style.background="#f8fafc"}),o.addEventListener("mouseleave",()=>{o.style.background="#ffffff"}),o.addEventListener("click",()=>{const r=o.dataset.id,d=l.state.customers.find(c=>String(c.id)===String(r));d&&l.setSelectedCustomer(d),n.style.display="none",Ct()})})}},{signal:t}),document.addEventListener("click",a=>{const e=document.getElementById("cust-autocomplete-dropdown");e&&!a.target.closest("#customer-row-container")&&(e.style.display="none")},{signal:t})},Ct=()=>{var e,s,n,i;const t=document.getElementById("customer-row-container");if(!t)return;const a=l.state.selectedCustomer;a?(t.innerHTML=`
      <div class="selected-customer-chip" style="display:flex;align-items:center;justify-content:space-between;background:#eff6ff;border:1.5px solid #93c5fd;border-radius:10px;padding:8px 12px;margin:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <span style="font-size:18px;flex-shrink:0">👤</span>
          <div style="min-width:0">
            <div style="font-weight:800;font-size:13px;color:#1e3a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${x(a.name)} <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:6px;font-weight:700">${x(a.category||"Umum")}</span>
            </div>
            <div style="font-size:11px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              📱 ${x(a.phone||"-")} ${a.totalDebt>0?`&bull; <span style="color:#dc2626;font-weight:800">Hutang: ${f(a.totalDebt)}</span>`:""}
            </div>
          </div>
        </div>
        <button type="button" id="btn-clear-selected-cust" title="Kosongkan / Ganti Pelanggan" style="border-radius:50%;width:26px;height:26px;min-width:26px;padding:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#dc2626;background:#fee2e2;border:1px solid #fca5a5;cursor:pointer">
          ✕
        </button>
      </div>
    `,(e=t.querySelector("#btn-clear-selected-cust"))==null||e.addEventListener("click",()=>{l.setSelectedCustomer(null),l.setCustomerName(""),Ct()})):(t.innerHTML=`
      <div style="padding:8px 12px;display:flex;align-items:center;gap:6px;position:relative">
        <span style="font-size:16px;flex-shrink:0">👤</span>
        <div style="position:relative;flex:1;min-width:0">
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Cari nama / HP pelanggan..." maxlength="80" autocomplete="off"
            value="${x(l.state.customerName||"")}"
            style="width:100%;padding:6px 24px 6px 8px;font-size:12px;border:1px solid var(--border-default);border-radius:8px">
          ${l.state.customerName?`
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
    `,(s=t.querySelector("#btn-clear-typed-name"))==null||s.addEventListener("click",()=>{l.setCustomerName(""),Ct()}),(n=t.querySelector("#btn-pick-cust"))==null||n.addEventListener("click",()=>{rs()}),(i=t.querySelector("#btn-quick-add-cust"))==null||i.addEventListener("click",()=>{Ft()}))},rs=()=>{var r,d,c;const t=l.state.customers||[];let a="";const e=p=>{const m=p.trim().toLowerCase(),b=t.filter(v=>!m||(v.name||"").toLowerCase().includes(m)||(v.phone||"").includes(m)||(v.category||"").toLowerCase().includes(m));return b.length===0?`
        <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">
          Pelanggan tidak ditemukan.<br>
          <button type="button" class="btn btn--primary btn--sm" id="btn-picker-add-new" style="margin-top:10px">
            ➕ Tambah Pelanggan "${x(p)}"
          </button>
        </div>
      `:`
      <div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;padding-right:4px">
        ${b.map(v=>`
          <div class="picker-cust-row" data-id="${v.id}" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 120ms ease">
            <div style="min-width:0;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <strong style="font-size:13px;color:#1e293b">${x(v.name)}</strong>
                <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px;font-weight:700">${x(v.category||"Umum")}</span>
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px">
                📱 ${x(v.phone||"-")} ${v.address?`&bull; 📍 ${x(v.address)}`:""}
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:10px">
              ${v.totalDebt>0?`<div style="font-size:11px;font-weight:800;color:#dc2626">Hutang: ${f(v.totalDebt)}</div>`:""}
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
        ${e("")}
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:space-between;align-items:center">
      <button class="btn btn--primary btn--sm" id="picker-create-btn">➕ Pelanggan Baru</button>
      <button class="btn btn--secondary btn--sm" id="picker-cancel-btn">Tutup</button>
    </div>
  `;at(s,"modal-customer-picker");const n=document.getElementById("picker-list-container"),i=document.getElementById("picker-search"),o=()=>{var p;n==null||n.querySelectorAll(".picker-cust-row").forEach(m=>{m.addEventListener("mouseenter",()=>{m.style.background="#f0f7ff",m.style.borderColor="#93c5fd"}),m.addEventListener("mouseleave",()=>{m.style.background="#ffffff",m.style.borderColor="#e2e8f0"}),m.addEventListener("click",()=>{const b=m.dataset.id,v=t.find(y=>String(y.id)===String(b));v&&(l.setSelectedCustomer(v),U("modal-customer-picker"),Ct())})}),(p=n==null?void 0:n.querySelector("#btn-picker-add-new"))==null||p.addEventListener("click",()=>{var m;U("modal-customer-picker"),Ft({name:(m=i==null?void 0:i.value)==null?void 0:m.trim()})})};o(),i==null||i.addEventListener("input",p=>{a=p.target.value,n&&(n.innerHTML=e(a),o())}),(r=document.getElementById("modal-picker-close"))==null||r.addEventListener("click",()=>U("modal-customer-picker")),(d=document.getElementById("picker-cancel-btn"))==null||d.addEventListener("click",()=>U("modal-customer-picker")),(c=document.getElementById("picker-create-btn"))==null||c.addEventListener("click",()=>{U("modal-customer-picker"),Ft()})},ds=async()=>{const t=document.getElementById("view-pos");t!=null&&t.querySelector(".pos-layout")||Fa();const a=await dt();l.setProducts(a),re(),Ze()},ls=(t,a=128,e=.85)=>new Promise((s,n)=>{if(!(t!=null&&t.type.startsWith("image/")))return n(new Error("File harus berupa gambar (PNG/JPEG/WebP)"));const i=new FileReader;i.onerror=()=>n(new Error("Gagal membaca file")),i.onload=o=>{const r=new Image;r.onerror=()=>n(new Error("Gagal memuat gambar")),r.onload=()=>{let{width:d,height:c}=r;d>c?d>a&&(c=Math.round(c*a/d),d=a):c>a&&(d=Math.round(d*a/c),c=a);const p=document.createElement("canvas");p.width=d,p.height=c,p.getContext("2d").drawImage(r,0,0,d,c);let b="";try{b=p.toDataURL("image/webp",e)}catch{}b!=null&&b.startsWith("data:image/webp")||(b=p.toDataURL("image/jpeg",e)),s(b)},r.src=o.target.result},i.readAsDataURL(t)}),cs=(t=[])=>{let a=0;for(const s of t)if(s.sku&&typeof s.sku=="string"){const n=s.sku.match(/^BM-(\d+)$/i);if(n){const i=parseInt(n[1],10);i>a&&(a=i)}}const e=a?a+1:t.length+1;return`BM-${String(e).padStart(3,"0")}`},ua=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],ps=["Galon","Botol","Layanan","Lainnya"];let ze=null;const us=async()=>{ze&&ze(),ze=l.on("products:change",()=>{const t=document.getElementById("view-products");t!=null&&t.classList.contains("active")&&de()}),await de()},de=async()=>{const t=document.getElementById("view-products"),a=await dt();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${a.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${a.length?a.map(e=>ms(e)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,gs()},ms=t=>{const a=t.image?`<img src="${x(t.image)}" class="product-thumb" alt="${x(t.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;border:1.5px solid var(--border-subtle)">`:`<span class="product-emoji-large">${t.emoji||"📦"}</span>`;return`
    <div class="product-manage-card" data-id="${t.id}">
      <div class="product-manage-card__header">
        ${a}
        <div class="product-manage-card__info">
          <div class="product-manage-card__name">${x(t.name)}</div>
          <div class="product-manage-card__cat" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="badge badge--blue">${x(t.category)}</span>
            <span class="badge" style="background:var(--bg-glass);border:1px solid var(--border-default);font-size:10px;font-weight:700;color:var(--text-secondary)">${x(t.sku||`BM-${t.id}`)}</span>
          </div>
        </div>
      </div>
      <div class="product-manage-card__price">
        ${f(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${x(t.unit)}</span>
        ${t.cost>0?`<div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-top:2px">Modal: ${f(t.cost)} &bull; Margin: ${f(t.price-t.cost)}</div>`:""}
      </div>
      <div class="product-manage-card__actions">
        <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `},gs=()=>{const t=document.getElementById("products-grid"),a=document.getElementById("btn-add-product");a==null||a.addEventListener("click",async()=>{const e=await dt();ma(null,e)}),t==null||t.addEventListener("click",async e=>{const s=e.target.closest('[data-action="edit"]'),n=e.target.closest('[data-action="delete"]');if(s){const i=String(s.dataset.id),o=await dt(),r=o.find(d=>String(d.id)===i);r&&ma(r,o)}if(n){const i=String(n.dataset.id),o=Number.isNaN(Number(i))?i:Number(i);bs(o)}})},ma=(t=null,a=[])=>{const e=!!t,s=(t==null?void 0:t.sku)||cs(a);let n=(t==null?void 0:t.image)||null;const i=`
    <div class="modal-header">
      <span class="modal-title">${e?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Nama Produk <span style="color:red">*</span></label>
          <input type="text" class="input" id="pf-name"
            value="${x((t==null?void 0:t.name)||"")}"
            placeholder="e.g. Air Mineral 19 L"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group">
          <label class="input-label">Kode / SKU Produk</label>
          <input type="text" class="input" id="pf-sku"
            value="${x(s)}"
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
            value="${x((t==null?void 0:t.unit)||"galon")}"
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
          ${ps.map(o=>`<option value="${x(o)}" ${(t==null?void 0:t.category)===o?"selected":""}>${x(o)}</option>`).join("")}
        </select>
      </div>

      <!-- Icon / Image Selector -->
      <div class="input-group">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <label class="input-label" style="margin:0">Ikon / Foto Produk</label>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn btn--sm ${n?"btn--secondary":"btn--primary"}" id="btn-tab-emoji" style="padding:3px 8px;font-size:11px">😀 Emoji</button>
            <button type="button" class="btn btn--sm ${n?"btn--primary":"btn--secondary"}" id="btn-tab-upload" style="padding:3px 8px;font-size:11px">📷 Upload Foto</button>
          </div>
        </div>

        <!-- Emoji Selector Box -->
        <div id="box-emoji-picker" style="display:${n?"none":"block"}">
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
            ${ua.map(o=>`
              <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===o&&!n?"emoji-pick--active":""}"
                data-emoji="${o}"
                style="font-size:22px;width:38px;height:38px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===o&&!n?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${o}</button>
            `).join("")}
          </div>
        </div>

        <!-- Photo Upload Box -->
        <div id="box-upload-picker" style="display:${n?"block":"none"};margin-top:6px">
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg-elevated);border-radius:10px;border:1.5px dashed var(--border-default)">
            <div id="pf-img-preview" style="width:48px;height:48px;border-radius:8px;background:white;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid var(--border-subtle);flex-shrink:0">
              ${n?`<img src="${n}" style="width:100%;height:100%;object-fit:cover">`:'<span style="font-size:20px;opacity:0.4">🖼️</span>'}
            </div>
            <div style="flex:1">
              <label for="pf-file-input" class="btn btn--secondary btn--sm" style="cursor:pointer;display:inline-block">
                📁 Pilih Gambar (PNG/JPG)
              </label>
              <input type="file" id="pf-file-input" accept="image/png, image/jpeg, image/webp" style="display:none">
              <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Otomatis di-compress WebP < 10KB</div>
            </div>
            ${n?'<button type="button" class="btn btn--danger btn--sm" id="btn-remove-img" style="padding:4px 8px">✕</button>':""}
          </div>
        </div>

        <input type="hidden" id="pf-emoji" value="${x((t==null?void 0:t.emoji)||ua[0])}">
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
        ${e?"💾 Simpan":"➕ Tambah"}
      </button>
    </div>
  `;at(i,"product-form"),setTimeout(()=>{var b,v,y,$;(b=document.getElementById("pf-close"))==null||b.addEventListener("click",()=>U("product-form")),(v=document.getElementById("pf-cancel"))==null||v.addEventListener("click",()=>U("product-form"));const o=document.getElementById("btn-tab-emoji"),r=document.getElementById("btn-tab-upload"),d=document.getElementById("box-emoji-picker"),c=document.getElementById("box-upload-picker"),p=document.getElementById("pf-file-input"),m=document.getElementById("pf-img-preview");o==null||o.addEventListener("click",()=>{d.style.display="block",c.style.display="none",o.className="btn btn--sm btn--primary",r.className="btn btn--sm btn--secondary"}),r==null||r.addEventListener("click",()=>{d.style.display="none",c.style.display="block",r.className="btn btn--sm btn--primary",o.className="btn btn--sm btn--secondary"}),p==null||p.addEventListener("change",async g=>{var u;const h=(u=g.target.files)==null?void 0:u[0];if(h)try{n=await ls(h,128,.85),m.innerHTML=`<img src="${x(n)}" style="width:100%;height:100%;object-fit:cover">`,window.showToast("Foto produk berhasil dimuat","success")}catch(E){window.showToast(E.message||"Gagal memproses gambar","error")}}),(y=document.getElementById("btn-remove-img"))==null||y.addEventListener("click",()=>{n=null,m.innerHTML='<span style="font-size:20px;opacity:0.4">🖼️</span>',o.click()}),document.querySelectorAll(".emoji-pick").forEach(g=>{g.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(h=>{h.style.borderColor="var(--border-subtle)",h.classList.remove("emoji-pick--active")}),g.style.borderColor="var(--blue-400)",g.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=g.dataset.emoji,n=null})}),($=document.getElementById("pf-save"))==null||$.addEventListener("click",async()=>{var B,L,z,O,_,K,W,J;const g=(B=document.getElementById("pf-name"))==null?void 0:B.value.trim(),h=((L=document.getElementById("pf-sku"))==null?void 0:L.value.trim())||s,u=parseFloat((z=document.getElementById("pf-price"))==null?void 0:z.value)||0,E=parseFloat((O=document.getElementById("pf-cost"))==null?void 0:O.value)||0,S=((_=document.getElementById("pf-unit"))==null?void 0:_.value.trim())||"pcs",k=((K=document.getElementById("pf-category"))==null?void 0:K.value)||"Lainnya",w=((W=document.getElementById("pf-emoji"))==null?void 0:W.value)||"📦",P=parseInt((J=document.getElementById("pf-stock"))==null?void 0:J.value,10)||0;if(!g){window.showToast("Nama produk wajib diisi!","warning");return}if(u<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{const A={name:g,sku:h,price:u,cost:E,unit:S,category:k,emoji:w,image:n,stock:P};e?(await Pa({...t,...A}),window.showToast(`Produk [${h}] berhasil diperbarui`,"success")):(await La(A),window.showToast(`Produk [${h}] berhasil ditambahkan`,"success")),U("product-form");const D=await dt();l.setProducts(D),await de()}catch{window.showToast("Gagal menyimpan produk!","error")}})},0)},bs=t=>{at(`
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
  `,"delete-confirm"),setTimeout(()=>{var e,s,n;(e=document.getElementById("dc-close"))==null||e.addEventListener("click",()=>U("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>U("delete-confirm")),(n=document.getElementById("dc-confirm"))==null||n.addEventListener("click",async()=>{try{await An(t);const i=await dt();l.setProducts(i),U("delete-confirm"),await de(),window.showToast("Produk dihapus","success")}catch{window.showToast("Gagal menghapus produk","error")}})},0)};let De=null,fe=null,ye=null,$t="semua",st=1;const fs=async()=>{De&&De(),De=l.on("transactions:change",t=>{ne(t)}),await ta()},ta=async()=>{const t=await mt();l.setTransactions(t),ne(t)},ne=t=>{var O,_,K,W,J;const a=document.getElementById("view-reports");if(!a)return;const e=it(),s=ln(),n=t.filter(A=>A.dateKey===e),i=n.reduce((A,D)=>A+D.total,0);let o=0;t.forEach(A=>{(A.items||[]).forEach(D=>{var Q;const V=Number((Q=D.product)==null?void 0:Q.cost)||0;o+=V*(Number(D.qty)||1)})});const r=t.reduce((A,D)=>A+D.total,0),d=Math.max(0,r-o),c=r>0?(d/r*100).toFixed(1):0,p=n.length,m=t.filter(A=>{var D;return(D=A.dateKey)==null?void 0:D.startsWith(s)}),b=m.reduce((A,D)=>A+D.total,0),v=t.reduce((A,D)=>A+D.total,0),y=n.filter(A=>A.paymentMethod==="cash").reduce((A,D)=>A+D.total,0),$=n.filter(A=>A.paymentMethod==="transfer"&&A.paymentStatus==="transfer_confirmed").reduce((A,D)=>A+D.total,0),g=n.filter(A=>A.paymentMethod==="transfer"&&A.paymentStatus==="transfer_pending").reduce((A,D)=>A+D.total,0),h=n.filter(A=>A.paymentMethod==="debt").reduce((A,D)=>A+D.total,0),u=t.reduce((A,D)=>{for(const V of D.debtPayments||[])V.date&&V.date.split("T")[0]===e&&(A+=V.amount||0);return A},0),E=y+$+u,S=t.reduce((A,D)=>A+(D.remainingDebt||0),0);t.filter(A=>A.paymentStatus==="transfer_pending").reduce((A,D)=>A+D.total,0);const k=xs(n),w=ws(t);fe&&(fe.destroy(),fe=null),ye&&(ye.destroy(),ye=null);let P=[...t];$t==="cash"&&(P=P.filter(A=>A.paymentMethod==="cash")),$t==="transfer"&&(P=P.filter(A=>A.paymentMethod==="transfer")),$t==="debt"&&(P=P.filter(A=>A.paymentMethod==="debt"));const B=P.sort((A,D)=>new Date(D.date)-new Date(A.date)),L=Math.max(1,Math.ceil(B.length/10));st>L&&(st=L),st<1&&(st=1);const z=B.slice((st-1)*10,st*10);a.innerHTML=`
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
        <div class="stat-card__value" style="color:var(--blue-700)">${f(i)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${p} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${f(E)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${f(u)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${f(S)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${f(b)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${m.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${f(v)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${t.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #059669">
        <span class="stat-card__icon">📈</span>
        <div class="stat-card__value" style="color:#059669">${f(d)}</div>
        <div class="stat-card__label">Estimasi Laba Kotor (Gross Profit)</div>
        <div class="stat-card__trend" style="color:#059669;font-weight:700">Margin: ${c}% (HPP: ${f(o)})</div>
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
            <strong style="color:var(--color-success)">${f(y)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${f($)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${f(u)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${f(h)}</strong>
          </div>

          ${g>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${f(g)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${y+$+h+u>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${k.length?k.slice(0,7).map((A,D)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${D+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${x(A.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${A.qty}x</span>
            </div>
          `).join(""):'<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px">Belum ada penjualan hari ini</div>'}
      </div>
    </div>

    <!-- Detailed Ledger & Transaction Analysis Table -->
    <div class="card card--elevated" style="overflow:hidden;padding:0">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle)">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:800;text-transform:uppercase;letter-spacing:.05em">
          📋 Analisis Detail Penjualan &amp; Status Pelunasan (${B.length} data)
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="cat-pill ${$t==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${$t==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${$t==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${$t==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${ys(z)}
          </tbody>
        </table>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">Hal ${st} dari ${L}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--secondary btn--sm" id="rpt-prev" ${st<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
          <button class="btn btn--secondary btn--sm" id="rpt-next" ${st>=L?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
        </div>
      </div>
    </div>
  `,(O=document.getElementById("btn-refresh-reports"))==null||O.addEventListener("click",ta),(_=document.getElementById("btn-export-pdf-report"))==null||_.addEventListener("click",()=>hs(t,e,s)),(K=document.getElementById("btn-export-csv-report"))==null||K.addEventListener("click",()=>{var Q;const A=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status Pembayaran","Subtotal","Diskon","Pajak","Grand Total","Sisa Piutang"],D=B.map(j=>[wt(new Date(j.date)),j.invoiceNo||"",j.cashier||"Admin",j.customerName||"-",j.paymentMethod||"cash",j.paymentStatus||"paid",j.subtotal||0,j.discount||0,j.tax||0,j.total||0,j.remainingDebt||0]),V=it();Ye(`Laporan-Penjualan-${V}.csv`,A,D),(Q=window.showToast)==null||Q.call(window,"✅ Laporan penjualan berhasil diekspor ke Excel/CSV!","success")}),(W=document.getElementById("rpt-prev"))==null||W.addEventListener("click",()=>{st>1&&(st--,ne(t))}),(J=document.getElementById("rpt-next"))==null||J.addEventListener("click",()=>{st<L&&(st++,ne(t))}),document.querySelectorAll("[data-rpt-filter]").forEach(A=>{A.addEventListener("click",()=>{$t=A.dataset.rptFilter,st=1,ne(t)})}),requestAnimationFrame(()=>vs(w,y,$,h,u))},ys=t=>t.length?t.map(a=>{const e=a.total||0;let s=0,n=0;a.paymentMethod==="cash"?s=e:a.paymentMethod==="transfer"?a.paymentStatus==="transfer_confirmed"?s=e:n=e:a.paymentMethod==="debt"&&(s=a.paidAmount||0,n=a.remainingDebt||0);const i=(a.items||[]).map(d=>{var c;return`${((c=d.product)==null?void 0:c.name)||"Item"} (${d.qty}x)`}).join(", "),o=a.paymentMethod==="debt"?n===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${f(n)}</span>`:a.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',r=a.paymentMethod==="cash"?"💵 Tunai":a.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${x(a.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${wt(new Date(a.date))}</td>
        <td><strong style="color:var(--text-primary)">${x(a.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${x(i)}">${x(i||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${f(e)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${f(s)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${n>0?f(n):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${r}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>',vs=async(t,a,e,s,n)=>{const{Chart:i,registerables:o}=await ve(async()=>{const{Chart:p,registerables:m}=await import("./vendor-chart-BLYve-2S.js");return{Chart:p,registerables:m}},[],import.meta.url);i.register(...o);const r=document.getElementById("chart-bar");r&&(fe=new i(r,{type:"bar",data:{labels:t.map(p=>p.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(p=>p.total),backgroundColor:t.map((p,m)=>m===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:p=>` ${f(p.raw)}`}}},scales:{y:{beginAtZero:!0,ticks:{callback:p=>f(p),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const d=document.getElementById("chart-donut"),c=a+e+s+n;d&&c>0&&(ye=new i(d,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[a,e,s,n],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:p=>` ${p.label}: ${f(p.raw)}`}}}}}))},hs=async(t,a,e)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:n}=await ve(async()=>{const{jsPDF:w}=await import("./vendor-jspdf-BEqUCB1L.js").then(P=>P.j);return{jsPDF:w}},[],import.meta.url),{default:i}=await ve(async()=>{const{default:w}=await import("./jspdf.plugin.autotable-CSRlgf-4.js").then(P=>P.j);return{default:w}},__vite__mapDeps([0,1,2]),import.meta.url),o=new n({orientation:"portrait",unit:"mm",format:"a4"}),r=l.state.settings,d=o.internal.pageSize.getWidth();o.setFontSize(16),o.setFont("helvetica","bold"),o.text(r.shopName||"Blue Mountain Refilling Station",d/2,16,{align:"center"}),o.setFontSize(10),o.setFont("helvetica","normal"),o.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",d/2,22,{align:"center"}),o.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,d/2,27,{align:"center"});const c=t.filter(w=>w.dateKey===a),p=c.reduce((w,P)=>w+P.total,0),m=t.filter(w=>{var P;return(P=w.dateKey)==null?void 0:P.startsWith(e)}).reduce((w,P)=>w+P.total,0),b=t.reduce((w,P)=>w+P.total,0),v=c.filter(w=>w.paymentMethod==="cash").reduce((w,P)=>w+P.total,0),y=c.filter(w=>w.paymentMethod==="transfer"&&w.paymentStatus==="transfer_confirmed").reduce((w,P)=>w+P.total,0),$=t.reduce((w,P)=>{for(const B of P.debtPayments||[])B.date&&B.date.split("T")[0]===a&&(w+=B.amount||0);return w},0),g=v+y+$,h=t.reduce((w,P)=>w+(P.remainingDebt||0),0);o.setFontSize(11),o.setFont("helvetica","bold"),o.text("1. Ringkasan Kinerja Keuangan",14,35);const u=[["Omzet Gross Hari Ini",f(p)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",f(g)],["Cicilan Piutang Terkumpul Hari Ini",f($)],["Total Piutang Belum Lunas (Semua Pelanggan)",f(h)],["Omzet Bulan Ini",f(m)],["Total Omzet All-Time",f(b)],["Jumlah Transaksi Hari Ini",`${c.length} transaksi`]];i(o,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:u,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const E=o.lastAutoTable.finalY+10;o.setFontSize(11),o.setFont("helvetica","bold"),o.text("2. Rincian Riwayat Transaksi & Pelunasan",14,E);const S=[...t].sort((w,P)=>new Date(P.date)-new Date(w.date)).slice(0,80);i(o,{startY:E+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:S.map(w=>{const P=w.paymentMethod==="cash"?w.total:w.paymentMethod==="transfer"?w.paymentStatus==="transfer_confirmed"?w.total:0:w.paidAmount||0,B=w.paymentMethod==="debt"?w.remainingDebt||0:w.paymentStatus==="transfer_pending"?w.total:0;return[w.invoiceNo||"-",new Date(w.date).toLocaleDateString("id-ID"),w.customerName||"—",w.paymentMethod==="cash"?"Tunai":w.paymentMethod==="transfer"?"Transfer":"Hutang",f(w.total),f(P),B>0?f(B):"—",w.paymentMethod==="debt"?B===0?"Lunas":"Cicilan":w.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const k=o.internal.getNumberOfPages();for(let w=1;w<=k;w++)o.setPage(w),o.setFontSize(8),o.setFont("helvetica","normal"),o.text(`Hal ${w} dari ${k} — ${r.shopName||"Blue Mountain POS"}`,d/2,o.internal.pageSize.getHeight()-8,{align:"center"});o.save(`Laporan-Keuangan-${a}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch{window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},ws=t=>{const a=[];for(let e=6;e>=0;e--){const s=new Date;s.setDate(s.getDate()-e);const n=it(s),i=t.filter(r=>r.dateKey===n).reduce((r,d)=>r+d.total,0),o=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);a.push({key:n,label:o,total:i})}return a},xs=t=>{var e;const a={};for(const s of t)for(const n of s.items||[]){if(!((e=n==null?void 0:n.product)!=null&&e.name))continue;const i=n.product.name;a[i]=(a[i]||0)+n.qty}return Object.entries(a).map(([s,n])=>({name:s,qty:n})).sort((s,n)=>n.qty-s.qty)},ks=async()=>{await $s(),await Rt()},Ss=["shopName","shopAddress","shopPhone","cashierName","receiptFooter","modalAwal","taxRate","bankName","bankNumber","bankHolder","qrisNumber","printerPaper"],$s=async()=>{const t={};for(const a of Ss){const e=await Je(a);e!==null&&(t[a]=e)}l.updateSettings(t)},Rt=async()=>{const t=document.getElementById("view-settings");if(!t)return;const a=l.state.settings,e="1.6.5",s="f3f9cd9",n="2026-09-13T10:09:00.409Z",i=new Date(n),o=new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"short",year:"numeric"}).format(i),r=new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(i),d=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,c=l.state.currentUser,p=ht(),m=(a.qrisNumber||"").trim(),b=m.length>20&&m.startsWith("000201");t.innerHTML=`
    <div class="section-header">
      <div>
        <h2 class="section-title">Pengaturan Sistem &amp; Toko</h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Kelola profil toko, struk thermal, metode pembayaran, dan sinkronisasi database cloud
        </div>
      </div>
      <button class="btn btn--primary" id="btn-save-settings">
        💾 Simpan Semua Pengaturan
      </button>
    </div>

    <!-- 1. Operator & Sesi Kasir -->
    <div class="settings-section">
      <div class="settings-section-header">👤 Profil &amp; Sesi Kasir Aktif</div>
      
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Operator Saat Ini</div>
          <div class="settings-row__desc">Akun yang memiliki wewenang operasional transaksi di perangkat ini</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-weight:700;font-size:14px;color:var(--text-primary)">
            ${x((c==null?void 0:c.name)||"Belum Masuk")}
          </span>
          <span class="badge badge--blue" style="text-transform:uppercase;font-weight:700">
            ${x((c==null?void 0:c.role)||"-")}
          </span>
          <span class="badge badge--green" style="font-size:11px">
            ID: ${x((c==null?void 0:c.username)||"-")}
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kontrol Sesi Operator</div>
          <div class="settings-row__desc">Beralih ke akun staf lain dengan PIN cepat atau keluar untuk mengunci kasir</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn btn--secondary btn--sm" id="btn-settings-switch-op" style="font-weight:700">
            🔄 Beralih Operator
          </button>
          <button type="button" class="btn btn--danger btn--sm" id="btn-settings-logout" style="font-weight:700">
            🚪 Keluar / Kunci Kasir
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Informasi Toko & Struk -->
    <div class="settings-section">
      <div class="settings-section-header">🏪 Profil Usaha &amp; Pengaturan Struk</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Usaha / Toko <span style="color:var(--color-danger)">*</span></div>
          <div class="settings-row__desc">Nama resmi yang tercetak di header struk thermal &amp; kop invoice PDF</div>
        </div>
        <input type="text" class="input" id="set-shopName" value="${x(a.shopName||"Blue Mountain Refilling Station")}" maxlength="80" placeholder="Blue Mountain Refilling Station" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat Lengkap Usaha</div>
          <div class="settings-row__desc">Alamat fisik outlet yang dicetak pada bagian atas struk</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${x(a.shopAddress||"")}" maxlength="140" placeholder="Jl. Garuda No. 42, RT 02/RW 05" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon / WhatsApp</div>
          <div class="settings-row__desc">Nomor narahubung pemesanan galon / customer care</div>
        </div>
        <input type="tel" class="input" id="set-shopPhone" value="${x(a.shopPhone||"")}" maxlength="25" placeholder="0812-3456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Label Nama Kasir Default</div>
          <div class="settings-row__desc">Nama kasir fallback yang dicetak di struk bila nama staf tidak terbaca</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${x(a.cashierName||"Kasir")}" maxlength="40" placeholder="Kasir" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Pesan Penutup Struk (Footer)</div>
          <div class="settings-row__desc">Ucapan penutup atau slogan yang dicetak di bagian paling bawah struk thermal</div>
        </div>
        <input type="text" class="input" id="set-receiptFooter" value="${x(a.receiptFooter||"Terima kasih sudah berbelanja!")}" maxlength="80" placeholder="Terima kasih sudah berbelanja!" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Saldo Modal Awal Kas Laci Harian (Rp)</div>
          <div class="settings-row__desc">Uang kembalian awal di laci kasir untuk menghitung keseimbangan neraca kas harian</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="number" class="input" id="set-modalAwal" value="${a.modalAwal||0}" min="0" step="5000" style="max-width:180px">
          <span style="font-size:12px;font-weight:700;color:var(--blue-700)">
            (${f(a.modalAwal||0)})
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Tarif Pajak Penjualan Toko (%)</div>
          <div class="settings-row__desc">Isi 0 jika toko tidak mengenakan PPN / pajak tambahan</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <input type="number" class="input" id="set-taxRate" value="${a.taxRate||0}" min="0" max="100" step="0.5" style="max-width:100px">
          <span style="font-size:13px;font-weight:700">%</span>
        </div>
      </div>
    </div>

    <!-- 3. Pembayaran & Dynamic QRIS -->
    <div class="settings-section">
      <div class="settings-section-header">🏦 Saluran Pembayaran (Transfer Bank &amp; Dynamic QRIS)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Bank Rekening Toko</div>
          <div class="settings-row__desc">Bank penerima transfer pembayaran kasir (misal: BCA, Mandiri, BRI, BSI)</div>
        </div>
        <input type="text" class="input" id="set-bankName" value="${x(a.bankName||"BCA")}" maxlength="30" placeholder="BCA / Mandiri / BRI" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
          <div class="settings-row__desc">Nomor rekening tujuan transfer yang tampil di modal bayar &amp; struk</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${x(a.bankNumber||"")}" maxlength="35" placeholder="Contoh: 123-456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Pemilik Rekening (Atas Nama)</div>
          <div class="settings-row__desc">Nama pemilik sah rekening untuk verifikasi pembeli</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${x(a.bankHolder||"")}" maxlength="60" placeholder="Contoh: Fadhilah Ramadhan" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">
            String EMVCo QRIS resmi toko Anda. Sistem otomatis menginjeksi nominal belanja (Tag 54) secara dinamis dengan nol komisi pihak ketiga.
            ${m?b?'<span class="badge badge--green" style="margin-left:6px">✅ Format QRIS Valid</span>':'<span class="badge badge--yellow" style="margin-left:6px">⚠️ Format belum standar EMVCo</span>':""}
          </div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:320px;font-size:11px;font-family:monospace;line-height:1.4" placeholder="0002010102122659...">${x(a.qrisNumber||"")}</textarea>
      </div>
    </div>

    <!-- 4. Thermal Printer Universal -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Hardware &amp; Printer Thermal (48mm / 58mm / 80mm)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Ukuran Kertas Roll Thermal</div>
          <div class="settings-row__desc">Pilih ukuran roll kertas printer yang terhubung ke terminal kasir</div>
        </div>
        <select class="input" id="set-printerPaper" style="max-width:280px">
          <option value="48mm" ${a.printerPaper==="48mm"?"selected":""}>48mm (EDC / Mini Portable Bluetooth)</option>
          <option value="58mm" ${!a.printerPaper||a.printerPaper==="58mm"?"selected":""}>58mm (Standar Mini POS Bluetooth)</option>
          <option value="80mm" ${a.printerPaper==="80mm"?"selected":""}>80mm (Thermal Besar / Desktop / Kasir Luas)</option>
        </select>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Uji Cetak Struk (Test Print)</div>
          <div class="settings-row__desc">Cetak struk sample untuk validasi margin 0mm, kejelasan font, dan logo thermal</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn--secondary btn--sm" id="btn-test-48" style="font-weight:700">🧪 Test 48mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-58" style="font-weight:700">🧪 Test 58mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-80" style="font-weight:700">🧪 Test 80mm</button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Koneksi Hardware Printer</div>
          <div class="settings-row__desc">Petunjuk integrasi Web Bluetooth (BLE), Kabel USB (OTG), dan Background App Android</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-printer-guide" style="font-weight:700">📖 Panduan Hardware</button>
      </div>
    </div>

    <!-- 5. Cloud Database & Sinkronisasi -->
    <div class="settings-section">
      <div class="settings-section-header">☁️ Database Cloud &amp; Multi-Terminal Realtime</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Status Koneksi Supabase Cloud</div>
          <div class="settings-row__desc">Database utama PostgreSQL terenkripsi (Single Source of Truth)</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badge badge--green" style="font-size:12px;padding:5px 10px;font-weight:700">
            🟢 Terhubung ke Cloud Realtime
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">ID Partisi Master Toko (Tenant ID)</div>
          <div class="settings-row__desc">Kunci keamanan partisi: memastikan data seluruh terminal toko Anda saling terhubung</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="badge badge--blue" style="font-size:12px;padding:5px 10px;font-weight:800;letter-spacing:0.02em">
            ${x(p)}
          </span>
          <button class="btn btn--secondary btn--sm" id="btn-copy-master-key" title="Salin Master ID">
            📋 Salin ID
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-set-master-key" title="Ganti Master ID">
            🔑 Ubah ID
          </button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Sinkronisasi Cloud Sekarang (Dual-Bridge)</div>
          <div class="settings-row__desc">Perbarui katalog produk, transaksi, saldo kas, dan akun operator secara realtime</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-sync-cloud-now" style="font-weight:700;white-space:nowrap">
          ⚡ Sinkronkan Sekarang
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Versi Sistem &amp; Arsitektur</div>
          <div class="settings-row__desc">Rilis terverifikasi, riwayat komit Git, dan status aplikasi PWA</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:5px 10px;font-weight:800">
            v${x(e)}${` (${x(s)})`}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            Build: ${x(o)} • ${x(r)}
          </div>
        </div>
      </div>
    </div>

    <!-- 6. Pencadangan & Pemeliharaan Sistem -->
    <div class="settings-section">
      <div class="settings-section-header">💾 Pencadangan &amp; Pemeliharaan Data</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📥 Unduh Cadangan Penuh (Backup JSON)</div>
          <div class="settings-row__desc">Unduh seluruh produk, transaksi, pelanggan, beban, dan pengaturan ke file arsip JSON mandiri</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-export-backup" style="font-weight:700;white-space:nowrap">
          📥 Unduh Cadangan JSON
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📤 Pulihkan dari Cadangan (Restore JSON)</div>
          <div class="settings-row__desc">Pulihkan database lokal dari file cadangan JSON yang diunduh sebelumnya</div>
        </div>
        <div>
          <input type="file" id="input-import-backup" accept=".json,application/json" style="display:none">
          <button class="btn btn--secondary btn--sm" id="btn-trigger-import" style="font-weight:700;white-space:nowrap">
            📤 Pilih File Cadangan
          </button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Pemasangan Aplikasi (PWA)</div>
          <div class="settings-row__desc">Install aplikasi POS ke layar utama desktop atau smartphone Anda</div>
        </div>
        ${d?'<span class="badge badge--green">✅ Terinstall di Perangkat</span>':'<button class="btn btn--secondary btn--sm" id="btn-install-pwa" style="font-weight:700">📲 Install Aplikasi</button>'}
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Bersihkan Cache Browser</div>
          <div class="settings-row__desc">Reset service worker dan unduh bundel versi terbaru dari server</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-clear-cache">🗑️ Clear Cache</button>
      </div>
    </div>

    <!-- 7. Zona Berbahaya -->
    <div class="settings-section">
      <div class="settings-section-header" style="color:#ef4444">⚠️ Zona Berbahaya</div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label" style="color:#ef4444;font-weight:700">Reset Seluruh Cache Data Lokal</div>
          <div class="settings-row__desc" style="color:var(--color-danger)">
            Menghapus cache lokal di browser ini. Data cloud utama Supabase tetap aman dan dapat disinkronkan kembali.
          </div>
        </div>
        <button class="btn btn--danger btn--sm" id="btn-reset-all" style="font-weight:700">
          🗑️ Reset Cache Lokal
        </button>
      </div>
    </div>
  `,Es()},Es=()=>{var t,a,e,s,n,i,o,r,d,c,p,m,b,v,y,$;(t=document.getElementById("btn-save-settings"))==null||t.addEventListener("click",async()=>{var A,D,V,Q,j,I,N,C,M,H,q,G,R,F,lt,gt;const g=(A=document.getElementById("set-shopName"))==null?void 0:A.value.trim();if(!g){(D=window.showToast)==null||D.call(window,"Nama toko tidak boleh kosong!","warning"),(V=document.getElementById("set-shopName"))==null||V.focus();return}const h=(Q=document.getElementById("set-shopAddress"))==null?void 0:Q.value.trim(),u=(j=document.getElementById("set-shopPhone"))==null?void 0:j.value.trim(),E=(I=document.getElementById("set-cashierName"))==null?void 0:I.value.trim(),S=(N=document.getElementById("set-receiptFooter"))==null?void 0:N.value.trim(),k=(C=document.getElementById("set-modalAwal"))==null?void 0:C.value,w=Math.max(0,parseInt(k,10)||0),P=(M=document.getElementById("set-taxRate"))==null?void 0:M.value;let B=parseFloat(P)||0;B<0&&(B=0),B>100&&(B=100);const L=(H=document.getElementById("set-bankName"))==null?void 0:H.value.trim(),z=(q=document.getElementById("set-bankNumber"))==null?void 0:q.value.trim(),O=(G=document.getElementById("set-bankHolder"))==null?void 0:G.value.trim(),_=(R=document.getElementById("set-qrisNumber"))==null?void 0:R.value.trim(),K=((F=document.getElementById("set-printerPaper"))==null?void 0:F.value)||"58mm",W={shopName:g,shopAddress:h,shopPhone:u,cashierName:E,receiptFooter:S,modalAwal:w,taxRate:B,bankName:L,bankNumber:z,bankHolder:O,qrisNumber:_,printerPaper:K},J=document.getElementById("btn-save-settings");J&&(J.textContent="⏳ Menyimpan...",J.disabled=!0);try{for(const[ct,Se]of Object.entries(W))await Aa(ct,Se),Ea(ct,Se).catch(()=>{});l.updateSettings(W),(lt=window.showToast)==null||lt.call(window,"✅ Pengaturan toko berhasil disimpan & disinkronkan ke cloud!","success"),setTimeout(()=>Rt(),500)}catch(ct){(gt=window.showToast)==null||gt.call(window,`Gagal menyimpan pengaturan: ${ct.message||"Error"}`,"error")}finally{J&&(J.textContent="💾 Simpan Semua Pengaturan",J.disabled=!1)}}),(a=document.getElementById("btn-settings-switch-op"))==null||a.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))}),(e=document.getElementById("btn-settings-logout"))==null||e.addEventListener("click",()=>{confirm("Kunci kasir dan keluar dari sesi operator saat ini?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(s=document.getElementById("btn-test-48"))==null||s.addEventListener("click",()=>{Le("48mm")}),(n=document.getElementById("btn-test-58"))==null||n.addEventListener("click",()=>{Le("58mm")}),(i=document.getElementById("btn-test-80"))==null||i.addEventListener("click",()=>{Le("80mm")}),(o=document.getElementById("btn-printer-guide"))==null||o.addEventListener("click",()=>{Ts()}),(r=document.getElementById("btn-copy-master-key"))==null||r.addEventListener("click",()=>{var h;const g=ht();(h=navigator.clipboard)==null||h.writeText(g).then(()=>{var u;(u=window.showToast)==null||u.call(window,`✅ Master Store ID (${g}) berhasil disalin!`,"success")})}),(d=document.getElementById("btn-set-master-key"))==null||d.addEventListener("click",async()=>{var u;const g=ht(),h=prompt("Masukkan Master Store ID Partisi Toko Anda:",g);h!=null&&h.trim()&&h.trim()!==g&&(pn(h.trim()),xa(),await Ht(),(u=window.showToast)==null||u.call(window,`✅ Terminal dihubungkan ke Store ID: ${h.trim()}`,"success"),Rt())}),(c=document.getElementById("btn-sync-cloud-now"))==null||c.addEventListener("click",async()=>{var h,u;const g=document.getElementById("btn-sync-cloud-now");g&&(g.textContent="🔄 Menyinkronkan...",g.disabled=!0);try{await Ht(),(h=window.showToast)==null||h.call(window,"✅ Semua data, transaksi & akun berhasil disinkronkan!","success"),setTimeout(()=>Rt(),600)}catch(E){(u=window.showToast)==null||u.call(window,`Gagal sinkron cloud: ${E.message||"Error"}`,"error")}finally{g&&(g.textContent="⚡ Sinkronkan Sekarang",g.disabled=!1)}}),(p=document.getElementById("btn-export-backup"))==null||p.addEventListener("click",async()=>{var h,u;const g=document.getElementById("btn-export-backup");g&&(g.textContent="⏳ Menyiapkan...",g.disabled=!0);try{const E=await Dn(),S=JSON.stringify(E,null,2),k=new Blob([S],{type:"application/json;charset=utf-8"}),w=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),B=`Backup-KASIR-${(E.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${w}.json`,L=URL.createObjectURL(k),z=document.createElement("a");z.href=L,z.download=B,document.body.appendChild(z),z.click(),document.body.removeChild(z),setTimeout(()=>URL.revokeObjectURL(L),5e3),(h=window.showToast)==null||h.call(window,"✅ File cadangan berhasil diunduh!","success")}catch(E){(u=window.showToast)==null||u.call(window,`Gagal ekspor cadangan: ${E.message||"Error"}`,"error")}finally{g&&(g.textContent="📥 Unduh Cadangan JSON",g.disabled=!1)}}),(m=document.getElementById("btn-trigger-import"))==null||m.addEventListener("click",()=>{var g;(g=document.getElementById("input-import-backup"))==null||g.click()}),(b=document.getElementById("input-import-backup"))==null||b.addEventListener("change",g=>{var E;const h=(E=g.target.files)==null?void 0:E[0];if(!h)return;const u=new FileReader;u.onload=async S=>{var k,w,P;try{const B=(k=S.target)==null?void 0:k.result,L=JSON.parse(B);if(!L.data||!L.data.products&&!L.data.transactions){(w=window.showToast)==null||w.call(window,"Format file cadangan tidak dikenali!","error");return}const z=(L.data.products||[]).length,O=(L.data.customers||[]).length,_=(L.data.transactions||[]).length,K=(L.data.expenses||[]).length,W=L.exportedAt?new Date(L.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",J=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Pemulihan Cadangan Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>Arsip Cadangan Terverifikasi:</strong><br>
              Toko: <strong>${x(L.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${W}
            </div>

            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:15px;font-weight:900;color:var(--blue-700)">${z}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pelanggan</div>
                <div style="font-size:15px;font-weight:900;color:#8b5cf6">${O}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:15px;font-weight:900;color:#16a34a">${_}</div>
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
                  <strong>🔄 Timpa / Pemulihan Penuh (Rekomendasi)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Ganti seluruh database di perangkat ini sama persis dengan file cadangan.</div>
                </div>
              </label>
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="merge" style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>➕ Gabung Data (Merge)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Tambahkan data baru tanpa menghapus data lokal yang sudah ada.</div>
                </div>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn--secondary" id="imp-cancel">Batal</button>
            <button class="btn btn--success" id="imp-confirm">🚀 Pulihkan Data</button>
          </div>
        `;at(J,"import-confirm-modal"),setTimeout(()=>{var A,D,V;(A=document.getElementById("imp-x"))==null||A.addEventListener("click",()=>U("import-confirm-modal")),(D=document.getElementById("imp-cancel"))==null||D.addEventListener("click",()=>U("import-confirm-modal")),(V=document.getElementById("imp-confirm"))==null||V.addEventListener("click",async()=>{var I,N,C,M,H,q,G;const Q=((I=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:I.value)||"replace",j=document.getElementById("imp-confirm");j&&(j.textContent="⏳ Memulihkan...",j.disabled=!0);try{await On(L,Q);const[R,F,lt,gt]=await Promise.all([dt(),Y(),mt(),ie()]);(N=l.setProducts)==null||N.call(l,R),(C=l.setCustomers)==null||C.call(l,F),(M=l.setTransactions)==null||M.call(l,lt),(H=l.setExpenses)==null||H.call(l,gt),U("import-confirm-modal"),(q=window.showToast)==null||q.call(window,"🎉 Data berhasil dipulihkan!","success"),setTimeout(()=>Rt(),600)}catch(R){(G=window.showToast)==null||G.call(window,`Gagal memulihkan data: ${R.message}`,"error")}})},0)}catch{(P=window.showToast)==null||P.call(window,"File JSON cadangan rusak atau tidak terbaca!","error")}},u.readAsText(h),g.target.value=""}),(v=document.getElementById("btn-install-pwa"))==null||v.addEventListener("click",()=>{var g;window._pwaPrompt?window._pwaPrompt.prompt():(g=window.showToast)==null||g.call(window,"Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(y=document.getElementById("btn-clear-cache"))==null||y.addEventListener("click",async()=>{var g,h;try{if("caches"in window){const u=await caches.keys();await Promise.all(u.map(E=>caches.delete(E)))}if("serviceWorker"in navigator){const u=await navigator.serviceWorker.getRegistrations();for(const E of u)await E.unregister()}(g=window.showToast)==null||g.call(window,"Cache browser dibersihkan. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch{(h=window.showToast)==null||h.call(window,"Gagal membersihkan cache","error")}}),($=document.getElementById("btn-reset-all"))==null||$.addEventListener("click",async()=>{var h,u,E;const g=prompt(`⚠️ PERINGATAN: PEMBERSIHAN CACHE DATA LOKAL

Tindakan ini mengosongkan salinan data offline di browser ini (produk, transaksi, pelanggan, beban).

Ketik kata "HAPUS" dengan huruf besar untuk melanjutkan:`);if(g==="HAPUS")try{await zn(),(h=window.showToast)==null||h.call(window,"Data lokal dibersihkan. Memuat ulang dari cloud...","info"),setTimeout(()=>window.location.reload(),1500)}catch{(u=window.showToast)==null||u.call(window,"Gagal mengosongkan data lokal","error")}else g!==null&&((E=window.showToast)==null||E.call(window,"Tindakan dibatalkan (konfirmasi tidak sesuai)","info"))})},Ts=()=>{at(`
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Lengkap Koneksi Printer Thermal (48 / 58 / 80mm)</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
        💡 <strong>Sistem POS Mendukung 4 Jalur Koneksi Hardware Sekaligus:</strong>
      </div>

      <h4 style="color:var(--text-primary);margin-bottom:4px">1. 🖨️ Universal Direct Print (Driver OS / USB / Dialog Print)</h4>
      <p style="font-size:12px;margin-bottom:8px">Metode paling universal untuk Windows, macOS, Android &amp; iOS. Otomatis memotong margin 0mm dan menyesuaikan lebar roll (48mm/58mm/80mm).</p>

      <h4 style="color:var(--text-primary);margin-top:10px;margin-bottom:4px">2. 📲 Web Bluetooth (BLE Direct ESC/POS Tanpa Aplikasi)</h4>
      <p style="font-size:12px;margin-bottom:8px">Langsung mengirim binary ESC/POS ke printer Bluetooth dari browser Chrome / Edge di Android &amp; Laptop tanpa instal software perantara.</p>

      <h4 style="color:var(--text-primary);margin-top:10px;margin-bottom:4px">3. 🔌 WebUSB (Kabel USB OTG Direct)</h4>
      <p style="font-size:12px;margin-bottom:8px">Hubungkan kabel printer USB ke laptop atau HP via konverter OTG untuk cetak instan berkecepatan tinggi tanpa popup dialog printer.</p>

      <h4 style="color:var(--text-primary);margin-top:10px;margin-bottom:4px">4. 🌐 Background Intent Android (RawBT &amp; Bluetooth Print App)</h4>
      <p style="font-size:12px;margin-bottom:8px">Khusus Android, struk dapat dilempar otomatis ke aplikasi background <strong>RawBT</strong> atau <strong>Bluetooth Print App</strong> untuk auto-cut kertas dan cetak senyap.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti 👍</button>
    </div>
  `,"printer-guide"),setTimeout(()=>{var a,e;(a=document.getElementById("pg-close"))==null||a.addEventListener("click",()=>U("printer-guide")),(e=document.getElementById("pg-close2"))==null||e.addEventListener("click",()=>U("printer-guide"))},0)};let Oe=null,Et=it(),Tt=it(),et=1;const Xt=10,Is=async()=>{Oe&&Oe(),Oe=l.on("transactions:change",t=>{Pt(t)}),await Wa()},Wa=async()=>{const t=await mt();l.setTransactions(t),Pt(t)},Ja=t=>{const a=t.paymentMethod,e=t.paymentStatus;return a==="transfer"&&e==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':a==="transfer"&&e==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':e==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':e==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},Va=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":x(t.paymentMethod)||"—",Ut=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),_s=t=>[...t].sort((e,s)=>new Date(s.date)-new Date(e.date)).filter(e=>{const s=e.dateKey||(e.date?e.date.split("T")[0]:"");return Et&&Tt?s>=Et&&s<=Tt:Et?s>=Et:Tt?s<=Tt:!0}),Pt=t=>{const a=document.getElementById("view-transactions");if(!a)return;const e=it(),s=_s(t),i=t.filter(b=>b.dateKey===e).reduce((b,v)=>v.paymentStatus==="paid"&&v.paymentMethod==="cash"||v.paymentStatus==="transfer_confirmed"?b+v.total:v.paymentMethod==="debt"?b+(v.paidAmount||0):b,0),o=t.reduce((b,v)=>b+(v.remainingDebt||0),0),r=t.filter(b=>b.paymentStatus==="transfer_pending").reduce((b,v)=>b+v.total,0),d=Math.max(1,Math.ceil(s.length/Xt));et>d&&(et=d),et<1&&(et=1);const c=s.length===0?0:(et-1)*Xt+1,p=Math.min(et*Xt,s.length),m=s.slice((et-1)*Xt,et*Xt);a.innerHTML=`
    <div class="section-header" style="flex-wrap:wrap;gap:12px">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} total (${s.length} terfilter)</span></h2>
      
      <!-- Date Range Filter Toolbar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">Dari:</span>
          <input type="date" class="input" id="tx-filter-start" style="width:auto;padding:6px 10px;font-size:12px" value="${Et}">
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">s/d</span>
          <input type="date" class="input" id="tx-filter-end" style="width:auto;padding:6px 10px;font-size:12px" value="${Tt}">
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
        <div style="font-size:15px;font-weight:800;color:#16a34a">${f(i)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${f(o)}</div>
      </div>
      ${r>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${f(r)}</div>
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
              ${Ls(m)}
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls (10 rows/page) -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">
            Menampilkan <strong>${c}-${p}</strong> dari <strong>${s.length}</strong> transaksi
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <button class="btn btn--secondary btn--sm" id="tx-prev-page" ${et<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              ◀ Sebelumnya
            </button>
            <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
              Hal ${et} / ${d}
            </span>
            <button class="btn btn--secondary btn--sm" id="tx-next-page" ${et>=d?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              Berikutnya ▶
            </button>
          </div>
        </div>
      </div>
    `}
  `,Ps(t)},Ls=t=>t.length?t.map(a=>{var e;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${x(a.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${wt(new Date(a.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x(a.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((e=a.items)==null?void 0:e.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${f(a.total)}
        ${(a.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${f(a.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${Va(a)}</span></td>
      <td>${Ja(a)}</td>
      <td>
        <div style="display:flex;gap:4px;flex-wrap:wrap;min-width:120px">
          <button class="btn btn--secondary btn--sm" data-action="detail" data-id="${a.id}" style="font-size:11px;padding:4px 8px">
            👁️
          </button>
          ${a.paymentStatus==="transfer_pending"?`
          <button class="btn btn--sm" data-action="confirm-transfer" data-id="${a.id}"
            style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer">
            ✅ Konfirmasi
          </button>`:""}
          ${(a.paymentMethod==="debt"||a.paymentStatus==="partial"||a.paymentStatus==="unpaid")&&(a.remainingDebt||0)>0?`
          <button class="btn btn--sm" data-action="pay-debt" data-id="${a.id}"
            style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer">
            💰 Cicil
          </button>`:""}
          <button class="btn btn--sm" data-action="delete" data-id="${a.id}"
            ${Ut(a)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${Ut(a)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${Ut(a)?"var(--color-danger-border)":"#d1d5db"};color:${Ut(a)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${Ut(a)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk rentang tanggal ini</td></tr>',Ps=t=>{var a,e,s,n,i,o,r;(a=document.getElementById("tx-btn-apply"))==null||a.addEventListener("click",()=>{var d,c;Et=((d=document.getElementById("tx-filter-start"))==null?void 0:d.value)||"",Tt=((c=document.getElementById("tx-filter-end"))==null?void 0:c.value)||"",et=1,Pt(t)}),(e=document.getElementById("tx-btn-today"))==null||e.addEventListener("click",()=>{const d=new Date().toISOString().split("T")[0];Et=d,Tt=d,et=1,Pt(t)}),(s=document.getElementById("tx-btn-all"))==null||s.addEventListener("click",()=>{Et="",Tt="",et=1,Pt(t)}),(n=document.getElementById("tx-btn-export-csv"))==null||n.addEventListener("click",()=>{var m;const d=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status","Subtotal","Diskon","Pajak","Total","Dibayar","Kembalian","Sisa Piutang"],c=filtered.map(b=>[wt(new Date(b.date)),b.invoiceNo||"",b.cashier||"Admin",b.customerName||"-",b.paymentMethod||"cash",b.paymentStatus||"paid",b.subtotal||0,b.discount||0,b.tax||0,b.total||0,b.paid||0,b.change||0,b.remainingDebt||0]),p=it();Ye(`Transaksi-${p}.csv`,d,c),(m=window.showToast)==null||m.call(window,"✅ Riwayat transaksi berhasil diekspor ke Excel/CSV!","success")}),(i=document.getElementById("tx-prev-page"))==null||i.addEventListener("click",()=>{et>1&&(et--,Pt(t))}),(o=document.getElementById("tx-next-page"))==null||o.addEventListener("click",()=>{et++,Pt(t)}),(r=document.getElementById("tx-table"))==null||r.addEventListener("click",async d=>{var y;const c=d.target.closest("[data-action]");if(!c)return;const p=String(c.dataset.id),m=Number.isNaN(Number(p))?p:Number(p),b=c.dataset.action,v=t.find($=>String($.id)===p);if(b==="detail"){v&&Bs(v);return}if(b==="confirm-transfer"){if(!v||!confirm(`Konfirmasi transfer ${f(v.total)} dari ${x(v.customerName||"pelanggan")} sudah diterima?`))return;try{const $={...v,paymentStatus:"transfer_confirmed",paidAmount:v.total,confirmedAt:new Date().toISOString()};await se($),l.updateTransaction(m,{paymentStatus:"transfer_confirmed",paidAmount:v.total,confirmedAt:$.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}return}if(b==="pay-debt"){v&&As(v);return}if(b==="delete"){if(!v)return;if(!Ut(v)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${x(v.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{if(await Cn(m),l.removeTransaction(m),v.customerId||v.customerName){const h=(await Y()).find(u=>v.customerId&&String(u.id)===String(v.customerId)||(u.name||"").trim().toLowerCase()===(v.customerName||"").trim().toLowerCase());if(h){h.totalOrders=Math.max(0,(Number(h.totalOrders)||1)-1),h.totalSpent=Math.max(0,(Number(h.totalSpent)||v.total)-v.total),v.paymentMethod==="debt"&&(Number(v.remainingDebt)||0)>0&&(h.totalDebt=Math.max(0,(Number(h.totalDebt)||0)-Number(v.remainingDebt))),await Wt(h);const u=await Y();l.setCustomers(u)}}for(const g of v.items||[])if((y=g.product)!=null&&y.id){const h=await T.products.get(g.product.id);if(h&&typeof h.stock=="number"){const u=h.stock+(Number(g.qty)||1);await Pa({...h,stock:u})}}const $=await dt();l.setProducts($),window.showToast("Transaksi dihapus & stok dikembalikan","success")}catch{window.showToast("Gagal menghapus","error")}}})},As=t=>{var s;const a=t.remainingDebt||0,e=`
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${x(t.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${x(t.customerName||"—")}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#991b1b;font-weight:700;text-transform:uppercase">Total Tagihan</div>
          <div style="font-size:16px;font-weight:900;color:#dc2626">${f(t.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${f(a)}</div>
        </div>
      </div>

      ${(s=t.debtPayments)!=null&&s.length?`
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${t.debtPayments.map(n=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(n.date).toLocaleDateString("id-ID")} — ${x(n.note||"-")}</span>
            <strong style="color:#16a34a">+${f(n.amount)}</strong>
          </div>
        `).join("")}
      </div>`:""}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${f(a)})</label>
        <input type="number" class="input" id="cicil-amount"
          value="${a}" min="1" max="${a}" step="1000" inputmode="numeric">
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
  `;at(e,"debt-modal"),setTimeout(()=>{var n,i,o;(n=document.getElementById("debt-x"))==null||n.addEventListener("click",()=>U("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>U("debt-modal")),(o=document.getElementById("debt-save"))==null||o.addEventListener("click",async()=>{var g,h,u;const r=parseFloat((g=document.getElementById("cicil-amount"))==null?void 0:g.value)||0;if(r<=0||r>a){window.showToast(`Jumlah cicilan harus antara 1 dan ${f(a)}`,"warning");return}const d=(t.paidAmount||0)+r,c=Math.max(0,a-r),p=c===0?"paid":"partial",m=(t.debtPayments||[]).length+1,b=c===0?`Pelunasan (#${m}/LUNAS ✅)`:`Cicilan #${m}`,v=((u=(h=document.getElementById("cicil-note"))==null?void 0:h.value)==null?void 0:u.trim())||b,y=[...t.debtPayments||[],{date:new Date().toISOString(),amount:r,note:v}],$={...t,paidAmount:d,remainingDebt:c,paymentStatus:p,debtPayments:y};try{if(await se($),l.updateTransaction(t.id,{paidAmount:d,remainingDebt:c,paymentStatus:p,debtPayments:y}),t.customerId||t.customerName){const S=(await Y()).find(k=>t.customerId&&String(k.id)===String(t.customerId)||(k.name||"").trim().toLowerCase()===(t.customerName||"").trim().toLowerCase());if(S){S.totalDebt=Math.max(0,(Number(S.totalDebt)||0)-r),await Wt(S);const k=await Y();l.setCustomers(k)}}U("debt-modal"),window.showToast(c===0?"🎉 Hutang LUNAS!":`Cicilan ${f(r)} dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)},Bs=t=>{var i;const a=xe(t,l.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(a)),Na(t);const e=Xe(t),s=((i=l.state.settings)==null?void 0:i.printerPaper)||"58mm",n=`
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${x(t.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${Ja(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${x(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${Va(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${ke(t,s)}</div>

      ${(t.remainingDebt||0)>0?`
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${f(t.remainingDebt)}</div>
      </div>`:""}

      <div style="display:grid;grid-template-columns:${t.change>0?"1fr 1fr":"1fr"};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${f(t.total)}</div>
        </div>
        ${t.change>0?`
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${f(t.change)}</div>
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
      <a class="btn btn--secondary" href="${e}" style="text-decoration:none;font-size:11px;display:flex;align-items:center;gap:4px">
        ⚡ RawBT
      </a>
      <button class="btn btn--success" id="btn-tx-print-direct" style="font-weight:700">
        🖨️ Cetak (${s})
      </button>
    </div>
  `;at(n,"tx-detail"),setTimeout(()=>{var o,r,d,c,p,m,b,v;(o=document.getElementById("td-x"))==null||o.addEventListener("click",()=>U("tx-detail")),(r=document.getElementById("td-close-btn"))==null||r.addEventListener("click",()=>U("tx-detail")),(d=document.getElementById("btn-tx-print-direct"))==null||d.addEventListener("click",()=>{oe(t)}),(c=document.getElementById("btn-td-ble"))==null||c.addEventListener("click",async()=>{try{window.showToast("Koneksi Bluetooth...","info"),await ja(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(y){window.showToast(y.message||"Gagal Bluetooth","error")}}),(p=document.getElementById("btn-td-usb"))==null||p.addEventListener("click",async()=>{try{window.showToast("Koneksi USB...","info"),await Ka(t)}catch(y){window.showToast(y.message||"Gagal USB","error")}}),(m=document.getElementById("btn-td-whatsapp"))==null||m.addEventListener("click",()=>{Oa(t)}),(b=document.getElementById("btn-td-btapp"))==null||b.addEventListener("click",()=>{Ra(t)}),(v=document.getElementById("btn-save-png"))==null||v.addEventListener("click",()=>{Ua(t)})},0)};let Yt=[],Ot="",_t="all",Zt=!1;const ge={owner:{label:"👑 Owner / Pemilik",shortLabel:"Owner",color:"#7c3aed",bg:"rgba(124, 58, 237, 0.10)",border:"rgba(124, 58, 237, 0.25)"},supervisor:{label:"⭐ Supervisor",shortLabel:"Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.10)",border:"rgba(37, 99, 235, 0.25)"},cashier:{label:"👤 Kasir / Staff",shortLabel:"Kasir",color:"#059669",bg:"rgba(5, 150, 105, 0.10)",border:"rgba(5, 150, 105, 0.25)"}},Cs=async()=>{if(Yt.length){for(const t of Yt)typeof t=="function"&&t();Yt=[]}Yt.push(l.on("users:change",()=>ut())),Yt.push(l.on("auth:change",()=>{const t=document.getElementById("view-users");t!=null&&t.classList.contains("active")&&ut()})),await ut()},ut=async()=>{var c,p,m,b,v;const t=document.getElementById("view-users");if(!t)return;const a=l.state.currentUser;if((a==null?void 0:a.role)!=="owner"){t.innerHTML=`
      <div class="staff-view-container">
        <div class="staff-header">
          <div class="staff-header-info">
            <h1>👥 Manajemen Akun & Hak Akses</h1>
            <p>Kontrol hak akses operator kasir, supervisor, dan pemilik toko.</p>
          </div>
        </div>
        <div style="background: var(--bg-card, #ffffff); border-radius: 16px; padding: 48px 24px; text-align: center; border: 1px solid var(--border-default, #e2e8f0); margin-top: 10px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 54px; margin-bottom: 16px;">🔒</div>
          <h3 style="margin-bottom: 8px; font-size: 1.3rem; color: var(--text-primary, #1e293b);">Akses Terkunci (Khusus Owner)</h3>
          <p style="color: var(--text-muted, #64748b); max-width: 480px; margin: 0 auto 24px auto; font-size: 14px; line-height: 1.5;">
            Modul manajemen akun staf dan konfigurasi hak akses hanya dapat dibuka oleh akun bertingkat <strong>Owner / Pemilik</strong>. Silakan beralih operator untuk melanjutkan.
          </p>
          <button class="btn btn-primary" id="btn-lock-switch-op" style="padding: 11px 24px; border-radius: 10px; font-weight: 700;">
            🔑 Beralih Operator / Login Owner
          </button>
        </div>
      </div>
    `,(c=document.getElementById("btn-lock-switch-op"))==null||c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))});return}const e=await St(),s=e.length,n=e.filter(y=>y.role==="owner").length,i=e.filter(y=>y.role==="supervisor").length,o=e.filter(y=>y.role==="cashier").length,r=e.filter(y=>y.role==="cashier"&&y.isActive!==!1).length,d=e.filter(y=>{if(_t!=="all"&&y.role!==_t)return!1;if(!Ot)return!0;const $=Ot.toLowerCase();return(y.name||"").toLowerCase().includes($)||(y.username||"").toLowerCase().includes($)});t.innerHTML=`
    <div class="staff-view-container">
      <!-- Header Section -->
      <div class="staff-header">
        <div class="staff-header-info">
          <h1>👥 Manajemen Akun & Hak Akses</h1>
          <p>Kontrol hak akses operator kasir, supervisor, dan owner toko dengan enkripsi PIN Salted SHA-256.</p>
        </div>
        <div class="staff-header-actions">
          <button class="btn-staff-action btn-staff-sync ${Zt?"is-syncing":""}" id="btn-sync-roster" title="Perbarui dan sinkronkan daftar operator dengan Supabase Cloud">
            <span class="sync-icon">🔄</span>
            <span class="sync-text">${Zt?"Menyinkronkan...":"Sinkron Roster"}</span>
          </button>
          <button class="btn-staff-action btn-staff-add" id="btn-add-user" title="Buat akun operator baru">
            <span>➕</span> Tambah Operator
          </button>
        </div>
      </div>

      <!-- Executive Stats Cards (Responsive Grid) -->
      <div class="staff-stats-grid">
        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(37, 99, 235, 0.10); color: #2563eb;">👥</div>
          <div>
            <div class="staff-stat-val">${s}</div>
            <div class="staff-stat-lbl">Total Operator Terdaftar</div>
          </div>
        </div>

        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(124, 58, 237, 0.10); color: #7c3aed;">👑</div>
          <div>
            <div class="staff-stat-val">${n}</div>
            <div class="staff-stat-lbl">Owner / Pemilik</div>
          </div>
        </div>

        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(37, 99, 235, 0.10); color: #2563eb;">⭐</div>
          <div>
            <div class="staff-stat-val">${i}</div>
            <div class="staff-stat-lbl">Supervisor</div>
          </div>
        </div>

        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(5, 150, 105, 0.10); color: #059669;">👤</div>
          <div>
            <div class="staff-stat-val">${r} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">/ ${o}</span></div>
            <div class="staff-stat-lbl">Kasir Aktif</div>
          </div>
        </div>
      </div>

      <!-- Security & Cloud Integrity Banner -->
      <div class="staff-security-bar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>🛡️</span>
          <span><strong>Keamanan Terverifikasi:</strong> Zero-Plaintext PIN (Salted SHA-256) • Brute-Force Rate Limiter 60 Detik Aktif</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-weight: 600;">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.3);"></span>
          <span>Cloud Realtime Active</span>
        </div>
      </div>

      <!-- Toolbar: Search & Role Filter Tabs -->
      <div class="staff-toolbar">
        <div class="staff-search-box">
          <span style="font-size: 16px; opacity: 0.6;">🔍</span>
          <input type="text" id="user-search-input" class="staff-search-input" value="${x(Ot)}" placeholder="Cari nama atau username operator...">
          ${Ot?'<button id="btn-clear-user-search" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px; padding: 2px 6px;">✕</button>':""}
        </div>

        <div class="staff-filter-pills">
          <button class="staff-filter-pill ${_t==="all"?"active":""}" data-role="all">
            Semua (${s})
          </button>
          <button class="staff-filter-pill ${_t==="owner"?"active":""}" data-role="owner">
            👑 Owner (${n})
          </button>
          <button class="staff-filter-pill ${_t==="supervisor"?"active":""}" data-role="supervisor">
            ⭐ Supervisor (${i})
          </button>
          <button class="staff-filter-pill ${_t==="cashier"?"active":""}" data-role="cashier">
            👤 Kasir (${o})
          </button>
        </div>
      </div>

      <!-- Desktop View: Adaptive Data Table -->
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Username</th>
              <th>Hak Akses (Role)</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${d.length===0?`
              <tr>
                <td colspan="5">
                  <div class="staff-empty-state">
                    <div class="staff-empty-state-icon">🔍</div>
                    <div style="font-weight: 600; font-size: 15px; color: var(--text-primary); margin-bottom: 4px;">Tidak Ada Operator Ditemukan</div>
                    <div>Tidak ada akun operator yang sesuai dengan kriteria pencarian atau filter peran.</div>
                  </div>
                </td>
              </tr>
            `:d.map(y=>{const $=ge[y.role]||ge.cashier,g=a&&String(a.id)===String(y.id),h=y.isActive!==!1;return`
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 38px; height: 38px; border-radius: 10px; background: ${$.bg}; color: ${$.color}; border: 1px solid ${$.border}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex-shrink: 0;">
                        ${(y.name||"U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                          ${x(y.name)}
                          ${g?'<span style="font-size: 10.5px; padding: 2px 7px; border-radius: 6px; background: #e0e7ff; color: #3730a3; font-weight: 700;">Anda</span>':""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 1px;">Dibuat: ${new Date(y.createdAt||Date.now()).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style="background: var(--bg-base, #f1f5f9); padding: 4px 8px; border-radius: 6px; font-size: 12.5px; color: var(--blue-700, #1d4ed8); font-weight: 600; border: 1px solid var(--border-subtle, #e2e8f0);">@${x(y.username)}</code>
                  </td>
                  <td>
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; color: ${$.color}; background: ${$.bg}; border: 1px solid ${$.border};">
                      ${$.label}
                    </span>
                  </td>
                  <td>
                    <span class="staff-status-badge ${h?"active":"inactive"}">
                      <span class="staff-status-dot"></span>
                      ${h?"Aktif":"Nonaktif"}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button class="btn-edit-user" data-id="${y.id}" title="Edit Akun" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); cursor: pointer; font-size: 12.5px; font-weight: 600; color: var(--text-primary); transition: all 0.15s ease;">
                        ✏️ Edit
                      </button>
                      ${g?"":`
                        <button class="btn-delete-user" data-id="${y.id}" data-name="${x(y.name)}" data-role="${y.role}" title="Hapus Operator" style="padding: 6px 14px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer; font-size: 12.5px; font-weight: 600; transition: all 0.15s ease;">
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

      <!-- Mobile / Tablet View: Adaptive Card Grid -->
      <div class="staff-card-grid">
        ${d.length===0?`
          <div class="staff-empty-state" style="grid-column: 1 / -1; background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-default);">
            <div class="staff-empty-state-icon">🔍</div>
            <div style="font-weight: 600; font-size: 15px; color: var(--text-primary); margin-bottom: 4px;">Tidak Ada Operator Ditemukan</div>
            <div>Tidak ada akun operator yang sesuai dengan pencarian atau filter.</div>
          </div>
        `:d.map(y=>{const $=ge[y.role]||ge.cashier,g=a&&String(a.id)===String(y.id),h=y.isActive!==!1;return`
            <div class="staff-card-item">
              <div class="staff-card-top">
                <div class="staff-card-user-info">
                  <div style="width: 42px; height: 42px; border-radius: 12px; background: ${$.bg}; color: ${$.color}; border: 1px solid ${$.border}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">
                    ${(y.name||"U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-weight: 700; font-size: 14.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                      ${x(y.name)}
                      ${g?'<span style="font-size: 10px; padding: 2px 6px; border-radius: 5px; background: #e0e7ff; color: #3730a3; font-weight: 700;">Anda</span>':""}
                    </div>
                    <code style="font-size: 12px; color: var(--blue-700); font-weight: 600;">@${x(y.username)}</code>
                  </div>
                </div>
                <span class="staff-status-badge ${h?"active":"inactive"}">
                  <span class="staff-status-dot"></span>
                  ${h?"Aktif":"Nonaktif"}
                </span>
              </div>

              <div class="staff-card-details">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 500;">Peran Akses:</span>
                  <span style="font-size: 11.5px; font-weight: 700; color: ${$.color}; background: ${$.bg}; padding: 2px 8px; border-radius: 12px; border: 1px solid ${$.border};">
                    ${$.label}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 500;">Dibuat:</span>
                  <span style="color: var(--text-secondary); font-weight: 600;">${new Date(y.createdAt||Date.now()).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
              </div>

              <div class="staff-card-actions">
                <button class="btn-edit-user" data-id="${y.id}" style="border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); color: var(--text-primary);">
                  ✏️ Edit
                </button>
                ${g?"":`
                  <button class="btn-delete-user" data-id="${y.id}" data-name="${x(y.name)}" data-role="${y.role}" style="border: 1px solid #fecaca; background: #fff1f2; color: #e11d48;">
                    🗑️ Hapus
                  </button>
                `}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,(p=document.getElementById("btn-sync-roster"))==null||p.addEventListener("click",async()=>{var y,$;if(!Zt){Zt=!0,ut();try{const g=await Bt();(y=window.showToast)==null||y.call(window,`Sukses menyinkronkan ${(g==null?void 0:g.length)||0} akun operator dari Cloud!`,"success")}catch(g){($=window.showToast)==null||$.call(window,`Sinkronisasi gagal: ${g.message||"Koneksi terganggu"}`,"error")}finally{Zt=!1,ut()}}}),(m=document.getElementById("btn-add-user"))==null||m.addEventListener("click",()=>ga()),(b=document.getElementById("user-search-input"))==null||b.addEventListener("input",y=>{Ot=y.target.value,ut()}),(v=document.getElementById("btn-clear-user-search"))==null||v.addEventListener("click",()=>{Ot="",ut()}),t.querySelectorAll(".staff-filter-pill").forEach(y=>{y.addEventListener("click",()=>{_t=y.getAttribute("data-role")||"all",ut()})}),t.querySelectorAll(".btn-edit-user").forEach(y=>{y.addEventListener("click",async()=>{const $=y.getAttribute("data-id"),g=await Tn(String($));g&&ga(g)})}),t.querySelectorAll(".btn-delete-user").forEach(y=>{y.addEventListener("click",async()=>{var u;const $=y.getAttribute("data-id"),g=y.getAttribute("data-name");if(y.getAttribute("data-role")==="owner"&&(await St()).filter(k=>k.role==="owner"&&k.isActive!==!1).length<=1){alert("Akses Ditolak: Toko wajib memiliki minimal satu akun Owner aktif. Anda tidak dapat menghapus akun Owner terakhir!");return}if(confirm(`Yakin ingin menghapus operator "${g}"? Tindakan ini akan menghapus akun dari perangkat lokal dan Supabase Cloud.`))try{await Ln(String($));const E=await St();l.setUsers(E),(u=window.showToast)==null||u.call(window,`Operator "${g}" berhasil dihapus dari sistem & Cloud.`,"success"),ut()}catch(E){alert(`Gagal menghapus operator: ${E.message}`)}})})},ga=(t=null)=>{var p,m;const a=!!t,e="modal-user-form",s=`
    <div id="${e}" class="modal-overlay" style="display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 16px; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);">
      <div class="modal-content" style="max-width: 480px; width: 100%; background: var(--bg-card, #ffffff); border-radius: 18px; padding: 24px; box-shadow: 0 20px 45px rgba(0,0,0,0.2); border: 1px solid var(--border-default, #e2e8f0); max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle, #f1f5f9);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 22px;">${a?"✏️":"👤"}</span>
            <div>
              <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: var(--text-primary);">
                ${a?"Edit Akun Operator":"Tambah Operator Baru"}
              </h3>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">
                ${a?`Memodifikasi profil @${x(t==null?void 0:t.username)}`:"Daftarkan akun kasir, supervisor, atau owner baru"}
              </p>
            </div>
          </div>
          <button class="modal-close" style="background: none; border: none; font-size: 22px; cursor: pointer; color: var(--text-muted); line-height: 1;">&times;</button>
        </div>

        <form id="form-user-save" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Nama Lengkap Staf <span style="color: #ef4444;">*</span></label>
            <input type="text" id="input-user-name" required value="${x((t==null?void 0:t.name)||"")}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; font-size: 14px; background: var(--bg-surface, #ffffff); color: var(--text-primary);">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Username Masuk <span style="color: #ef4444;">*</span></label>
            <input type="text" id="input-user-username" required ${a?"disabled":""} value="${x((t==null?void 0:t.username)||"")}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; font-size: 14px; ${a?"background: var(--bg-base, #f1f5f9); color: var(--text-muted);":"background: var(--bg-surface, #ffffff); color: var(--text-primary);"}">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Username bersifat permanen dan digunakan saat login.</span>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Peran (Tingkat Hak Akses) <span style="color: #ef4444;">*</span></label>
            <select id="input-user-role" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; background: var(--bg-surface, #ffffff); font-size: 13.5px; color: var(--text-primary); cursor: pointer;">
              <option value="cashier" ${(t==null?void 0:t.role)==="cashier"?"selected":""}>👤 Kasir (Hanya POS Kasir & Data Pelanggan)</option>
              <option value="supervisor" ${(t==null?void 0:t.role)==="supervisor"?"selected":""}>⭐ Supervisor (Kasir + Manajemen Produk + Laporan Toko)</option>
              <option value="owner" ${(t==null?void 0:t.role)==="owner"?"selected":""}>👑 Owner / Pemilik (Akses Penuh Seluruh Modul Toko)</option>
            </select>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 13px; font-weight: 700; color: var(--text-primary);">
                ${a?"PIN Baru (Opsional)":"PIN Masuk (4-6 Angka) <span style='color: #ef4444;'>*</span>"}
              </label>
              <button type="button" id="btn-toggle-pin-peek" style="background: none; border: none; font-size: 11.5px; color: var(--blue-600, #2563eb); font-weight: 600; cursor: pointer;">👁️ Lihat PIN</button>
            </div>
            <input type="password" id="input-user-pin" ${a?"":"required"} maxlength="6" pattern="[0-9]*" inputmode="numeric" placeholder="${a?"•••• (biarkan kosong jika tidak diubah)":"Contoh: 123456"}" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; letter-spacing: 4px; font-size: 16px; background: var(--bg-surface, #ffffff); color: var(--text-primary);">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Keamanan Salted SHA-256: PIN tidak pernah disimpan dalam teks mentah.</span>
          </div>

          ${a?`
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-base, #f8fafc); border-radius: 10px; border: 1px solid var(--border-subtle, #e2e8f0);">
              <input type="checkbox" id="input-user-active" ${(t==null?void 0:t.isActive)!==!1?"checked":""} style="width: 18px; height: 18px; accent-color: var(--blue-600, #2563eb); cursor: pointer;">
              <label for="input-user-active" style="font-size: 13.5px; font-weight: 600; cursor: pointer; color: var(--text-primary);">
                Akun Operator Aktif (Dapat Login)
              </label>
            </div>
          `:""}

          <div id="user-form-error" style="display: none; color: #dc2626; font-size: 13px; background: #fef2f2; padding: 11px 14px; border-radius: 10px; border: 1px solid #fee2e2; font-weight: 500;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; padding-top: 14px; border-top: 1px solid var(--border-subtle, #f1f5f9);">
            <button type="button" class="btn modal-cancel" style="padding: 10px 18px; border-radius: 10px; border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer;">
              Batal
            </button>
            <button type="submit" class="btn btn-primary" id="btn-submit-user" style="padding: 10px 22px; border-radius: 10px; font-weight: 700; font-size: 13.5px;">
              ${a?"Simpan Perubahan":"Buat Operator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,n=document.getElementById(e);n&&n.remove(),document.body.insertAdjacentHTML("beforeend",s);const i=document.getElementById(e),o=()=>i.remove();(p=i.querySelector(".modal-close"))==null||p.addEventListener("click",o),(m=i.querySelector(".modal-cancel"))==null||m.addEventListener("click",o);const r=document.getElementById("input-user-pin"),d=document.getElementById("btn-toggle-pin-peek");d==null||d.addEventListener("click",()=>{r.type==="password"?(r.type="text",d.textContent="🙈 Sembunyikan"):(r.type="password",d.textContent="👁️ Lihat PIN")}),document.getElementById("form-user-save").addEventListener("submit",async b=>{var E,S;b.preventDefault();const v=document.getElementById("user-form-error");v.style.display="none";const y=document.getElementById("input-user-name").value.trim(),$=document.getElementById("input-user-username").value.trim().toLowerCase(),g=document.getElementById("input-user-role").value,h=document.getElementById("input-user-pin").value.trim(),u=a?document.getElementById("input-user-active").checked:!0;if(!y||!$){v.textContent="Nama lengkap dan username wajib diisi.",v.style.display="block";return}if(!a&&(!h||h.length<4)){v.textContent="PIN minimal 4 angka numerik.",v.style.display="block";return}if(h&&(h.length<4||Number.isNaN(Number(h)))){v.textContent="PIN harus berupa angka (4 hingga 6 digit).",v.style.display="block";return}try{const k=await St();if(!a&&k.some(B=>(B.username||"").toLowerCase()===$)){v.textContent=`Username "${$}" sudah digunakan oleh operator lain.`,v.style.display="block";return}if(a&&t.role==="owner"&&(g!=="owner"||!u)&&k.filter(L=>L.role==="owner"&&L.isActive!==!1&&String(L.id)!==String(t.id)).length===0){v.textContent="Tidak dapat menonaktifkan atau mengubah peran Owner terakhir! Toko wajib memiliki minimal satu akun Owner aktif.",v.style.display="block";return}const w=document.getElementById("btn-submit-user");if(w.disabled=!0,w.textContent="Menyimpan ke Cloud...",a){let B=t.pinHash,L=t.pinSalt;h&&(L=na(),B=await Ue(h,L));const z={...t,name:y,role:g,pinHash:B,pinSalt:L,isActive:u,updatedAt:new Date().toISOString()};await _n(z),l.state.currentUser&&String(l.state.currentUser.id)===String(t.id)&&(l.state.currentUser.name=y,l.state.currentUser.role=g,sessionStorage.setItem("bm_active_user",JSON.stringify(l.state.currentUser)),l.emit("auth:change",l.state.currentUser)),(E=window.showToast)==null||E.call(window,`Perubahan akun operator "${y}" berhasil disimpan!`,"success")}else{const B=na(),L=await Ue(h,B),z={name:y,username:$,role:g,pinHash:L,pinSalt:B,isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};await In(z),(S=window.showToast)==null||S.call(window,`Akun operator baru "${y}" berhasil dibuat!`,"success")}const P=await St();l.setUsers(P),o(),ut()}catch(k){v.textContent=`Gagal menyimpan data: ${k.message}`,v.style.display="block";const w=document.getElementById("btn-submit-user");w&&(w.disabled=!1,w.textContent=a?"Simpan Perubahan":"Buat Operator")}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const Qa=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine||(t.textContent="⚡ Mode Offline",t.classList.add("status-badge--offline"),t.style.background="rgba(239, 68, 68, 0.12)",t.style.borderColor="rgba(239, 68, 68, 0.3)",t.style.color="#dc2626"))};window.addEventListener("offline",Qa);window.showToast=(t,a="info",e="")=>{const s=document.getElementById("toast-container");if(!s)return;const n={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${a}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${n[a]??"ℹ️"}</span>
    <div class="toast__text">
      ${e?`<div class="toast__title">${x(e)}</div>`:""}
      <div class="toast__msg">${x(t)}</div>
    </div>
  `,s.appendChild(i);const o=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},r=setTimeout(o,3500);i.addEventListener("click",()=>{clearTimeout(r),o()})};const ba=()=>{const t=document.getElementById("topbar-time"),a=document.getElementById("topbar-date");t&&(t.textContent=ya()),a&&(a.textContent=rn())},Ns={login:{init:ts,refresh:Gt},pos:{init:ns,refresh:ds},products:{init:us,refresh:de},customers:{init:Wn,refresh:kt},transactions:{init:Is,refresh:Wa},reports:{init:fs,refresh:ta},settings:{init:ks,refresh:Rt},finance:{init:Vn,refresh:ot},users:{init:Cs,refresh:ut}},fa=new Set,bt=async t=>{var s;!l.state.currentUser&&t!=="login"&&((s=window.showToast)==null||s.call(window,"Silakan masuk dengan akun operator untuk melanjutkan.","warning"),t="login");const a=Ns[t];if(!a)return;if(!l.canAccess(t)){window.showToast("Akses dibatasi untuk peran Anda. Silakan hubungi Owner/Supervisor.","warning","Peran Terbatas"),Ke({onLogin:()=>bt(t)});return}document.querySelectorAll(".dock-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)});const e=document.querySelector(".dock-container");e&&(e.style.display=t==="login"||!l.state.currentUser?"none":"flex"),document.querySelectorAll(".view").forEach(n=>{n.classList.toggle("active",n.id===`view-${t}`)});try{fa.has(t)?await a.refresh():(await a.init(),fa.add(t)),sessionStorage.setItem("activeView",t)}catch(n){const i=document.getElementById(`view-${t}`);i&&!i.children.length&&(i.innerHTML=`
        <div class="empty-state" style="padding:60px 20px">
          <div class="empty-state__icon">⚠️</div>
          <div class="empty-state__text">
            <strong style="font-size:16px;color:var(--text-primary)">Gagal Memuat Halaman</strong><br>
            <span style="font-size:12px;color:var(--text-muted)">${n.message||"Terjadi kesalahan sistem"}</span>
          </div>
          <button class="btn btn--primary btn--sm" onclick="location.reload()" style="margin-top:16px">
            🔄 Reload Halaman
          </button>
        </div>
      `)}l.navigate(t)},Ms=(t,a)=>{if(!t)return;const e=t.getBoundingClientRect(),s=Math.max(e.width,e.height),n=document.createElement("span");n.className="ripple-effect",n.style.cssText=`width:${s}px;height:${s}px;left:${a.clientX-e.left-s/2}px;top:${a.clientY-e.top-s/2}px`,t.style.position="relative",t.appendChild(n),n.addEventListener("animationend",()=>n.remove(),{once:!0})},Xa=t=>{const a=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${a} — Kasir POS`};l.on("settings:change",Xa);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const Ya=t=>{const a=document.getElementById("operator-badge"),e=document.getElementById("operator-name"),s=document.getElementById("operator-icon"),n=document.getElementById("btn-topbar-logout"),i=document.getElementById("btn-topbar-login");t?(e&&(e.textContent=`${t.name} (${t.role})`),s&&(s.textContent=t.role==="owner"?"👑":t.role==="supervisor"?"⭐":"👤"),a&&(a.style.display="flex",a.style.color=t.role==="owner"?"#8b5cf6":t.role==="supervisor"?"#2563eb":"#10b981",a.style.background=t.role==="owner"?"rgba(139, 92, 246, 0.12)":t.role==="supervisor"?"rgba(37, 99, 235, 0.12)":"rgba(16, 185, 129, 0.12)",a.style.borderColor=t.role==="owner"?"rgba(139, 92, 246, 0.3)":t.role==="supervisor"?"rgba(37, 99, 235, 0.3)":"rgba(16, 185, 129, 0.3)"),n&&(n.style.display="inline-flex"),i&&(i.style.display="none")):(e&&(e.textContent="Belum Masuk"),s&&(s.textContent="🔒"),a&&(a.style.color="#64748b",a.style.background="rgba(100, 116, 139, 0.1)",a.style.borderColor="rgba(100, 116, 139, 0.25)"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"));const o=document.getElementById("dock-users");o&&(o.style.display=t&&t.role==="owner"?"flex":"none")};l.on("auth:change",Ya);const zs=async()=>{var D,V,Q,j;window.appNavigateTo=bt;try{await Un(),await Ve()}catch{window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}try{const I=await Sn();I?l.login(I):l.logout()}catch{l.logout()}Ya(l.state.currentUser),navigator.onLine&&Bt().catch(()=>{}),(D=document.getElementById("operator-badge"))==null||D.addEventListener("click",()=>{Ke()}),(V=document.getElementById("btn-topbar-logout"))==null||V.addEventListener("click",()=>{var I;confirm("Keluar dari sesi operator kasir saat ini?")&&(l.logout(),bt("login"),(I=window.showToast)==null||I.call(window,"Sesi ditutup. Silakan login kembali.","info"))}),(Q=document.getElementById("btn-topbar-login"))==null||Q.addEventListener("click",()=>{bt("login")}),(j=document.getElementById("btn-sync-staged"))==null||j.addEventListener("click",async()=>{await gn()}),window.addEventListener("request-operator-switch",()=>{Ke()}),window.addEventListener("request-logout",()=>{l.logout(),bt("login")});const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],a={};for(const I of t){const N=await Je(I);N!==null&&(I==="modalAwal"||I==="taxRate"?a[I]=parseFloat(N)||0:a[I]=N)}l.updateSettings(a),Xa(l.state.settings),Qa(),ba(),setInterval(ba,1e3),mn(),Ht().catch(()=>{}),xa(),At();const e=document.querySelector(".dock"),s="bm_dock_order_v3";(()=>{try{for(const M of(e==null?void 0:e.querySelectorAll(".dock-separator"))??[])M.remove();const I=localStorage.getItem(s);if(!I)return;const N=JSON.parse(I);if(!Array.isArray(N)||!N.length)return;const C=new Map;e==null||e.querySelectorAll(".dock-item").forEach(M=>{C.set(M.dataset.view,M)}),N.forEach(M=>{const H=C.get(M);H&&e&&(e.appendChild(H),C.delete(M))}),C.forEach(M=>{e&&e.appendChild(M)})}catch{}})();let i=e?[...e.querySelectorAll(".dock-item")]:[];const o=()=>window.innerWidth<600,r=()=>window.innerWidth>=600&&window.innerWidth<=1024,d=()=>o()?1.22:r()?1.36:1.5,c=()=>o()?8:r()?12:18,p=()=>o()?90:140;let m=i.map(()=>1),b=i.map(()=>1),v=null,y=!1;const $=(I,N,C)=>I+(N-I)*C,g=.24,h=()=>{if(y)return;let I=!1;const N=d(),C=c();i.forEach((M,H)=>{m[H]=$(m[H]??1,b[H]??1,g),Math.abs(m[H]-b[H])>5e-4?I=!0:m[H]=b[H];const q=m[H],G=(q-1)/(N-1||1)*C;M.style.transform=`translate3d(0, ${-G.toFixed(2)}px, 0) scale(${q.toFixed(4)})`,M.style.zIndex=q>1.02?Math.round(q*20):""}),v=I?requestAnimationFrame(h):null},u=()=>{!y&&!v&&(v=requestAnimationFrame(h))},E=I=>{if(y)return;const N=d(),C=p();i.forEach((M,H)=>{const q=M.getBoundingClientRect(),G=q.left+q.width/2,R=Math.abs(I-G);if(R<C){const F=Math.cos(R/C*(Math.PI/2));b[H]=1+(N-1)*F*F}else b[H]=1})},S=()=>{i.forEach((I,N)=>{b[N]=1})};e==null||e.addEventListener("mousemove",I=>{I.pointerType==="touch"||o()||y||(E(I.clientX),u())},{passive:!0});const k=()=>{y||(S(),m=i.map(()=>1),i.forEach(I=>{I.style.transform="",I.style.zIndex="";try{I.blur()}catch{}}),v&&(cancelAnimationFrame(v),v=null))};e==null||e.addEventListener("mouseleave",k),e==null||e.addEventListener("pointerup",k),e==null||e.addEventListener("touchend",k),e==null||e.addEventListener("pointercancel",k);let w=null,P=-1,B=-1,L=0,z=0,O=[],_=!1;const K=()=>i.map((I,N)=>{const C=I.getBoundingClientRect();return{idx:N,el:I,x:C.left,cx:C.left+C.width/2,width:C.width}});i.forEach(I=>{I.addEventListener("pointerdown",C=>{if(!(C.button!==0&&C.pointerType==="mouse")){w=I,P=i.indexOf(I),B=P,L=C.clientX,z=C.clientY,_=!1,O=K();try{I.setPointerCapture(C.pointerId)}catch{}}}),I.addEventListener("pointermove",C=>{var q;if(!w||w!==I)return;const M=C.clientX-L,H=C.clientY-z;if(!_&&Math.hypot(M,H)>5&&(_=!0,y=!0,v&&(cancelAnimationFrame(v),v=null),e==null||e.classList.add("is-reordering"),I.classList.add("is-dragging"),i.forEach(G=>{G!==I&&(G.style.zIndex="")})),_&&y){I.style.transform=`translate3d(${M}px, ${H-12}px, 0) scale(1.18)`;let G=P;for(let R=0;R<O.length;R++)if(R===0&&C.clientX<O[0].cx){G=0;break}else if(R===O.length-1&&C.clientX>=O[R].cx){G=O.length-1;break}else if(C.clientX>=O[R].cx&&C.clientX<((q=O[R+1])==null?void 0:q.cx)){const F=(O[R].cx+O[R+1].cx)/2;G=C.clientX<F?R:R+1;break}B=Math.max(0,Math.min(i.length-1,G)),O.forEach(({el:R,idx:F,x:lt})=>{if(R===I)return;let gt=0;if(F>P&&F<=B){const ct=O[F-1];gt=ct?ct.x-lt:-58}else if(F<P&&F>=B){const ct=O[F+1];gt=ct?ct.x-lt:58}R.style.transform=`translate3d(${gt}px, 0, 0)`})}});const N=C=>{if(!(!w||w!==I)){try{I.releasePointerCapture(C.pointerId)}catch{}if(_&&y){if(e==null||e.classList.remove("is-reordering"),I.classList.remove("is-dragging"),i.forEach(M=>{M.style.transform=""}),B!==P&&B>=0){const M=i.filter(q=>q!==I);B>=M.length?e==null||e.appendChild(I):e==null||e.insertBefore(I,M[B]),i=e?[...e.querySelectorAll(".dock-item")]:[];const H=i.map(q=>q.dataset.view).filter(Boolean);try{localStorage.setItem(s,JSON.stringify(H))}catch{}}m=i.map(()=>1),b=i.map(()=>1),y=!1,S(),u()}else{y=!1,I.style.transform="";const M=I.dataset.view;M&&(I.classList.remove("bouncing"),I.offsetWidth,I.classList.add("bouncing"),I.addEventListener("animationend",()=>I.classList.remove("bouncing"),{once:!0}),Ms(I.querySelector(".dock-icon"),C),bt(M))}try{I.blur()}catch{}S(),m=i.map(()=>1),i.forEach(M=>{M.style.transform="",M.style.zIndex=""}),v&&(cancelAnimationFrame(v),v=null),w=null,P=-1,B=-1,_=!1}};I.addEventListener("pointerup",N),I.addEventListener("pointercancel",N)});let W=!1;window.addEventListener("keydown",I=>{["ArrowLeft","ArrowRight","Tab","Home","End"].includes(I.key)&&(W=!0)},{passive:!0}),window.addEventListener("pointerdown",()=>{W=!1},{passive:!0}),i.forEach(I=>{I.addEventListener("focus",()=>{if(!W)return;const N=i.indexOf(I);i.forEach((C,M)=>{const H=Math.abs(M-N);b[M]=H===0?1.35:H===1?1.12:1}),u()}),I.addEventListener("blur",()=>{S(),u()}),I.addEventListener("keydown",N=>{var M,H;const C=i.indexOf(I);if(N.key==="ArrowRight"){N.preventDefault();const q=i[C+1]||i[0];q==null||q.focus()}else if(N.key==="ArrowLeft"){N.preventDefault();const q=i[C-1]||i[i.length-1];q==null||q.focus()}else if(N.key==="Home")N.preventDefault(),(M=i[0])==null||M.focus();else if(N.key==="End")N.preventDefault(),(H=i[i.length-1])==null||H.focus();else if(N.key==="Enter"||N.key===" "){N.preventDefault();const q=I.dataset.view;q&&bt(q)}})}),(()=>{let I=0,N=0,C=0,M=!1;const H=()=>{const R=(e?[...e.querySelectorAll(".dock-item")]:[]).map(F=>F.dataset.view).filter(F=>!!F&&l.canAccess(F));return R.length?R:["pos","customers","transactions"]},q=G=>{let R=G;for(;R&&R!==document.body;){if(R.classList&&(R.classList.contains("modal-overlay")||R.classList.contains("modal")||R.classList.contains("dock")||R.classList.contains("dock-container"))||["INPUT","TEXTAREA","SELECT"].includes(R.tagName))return!0;if(R.scrollWidth>R.clientWidth+10){const F=window.getComputedStyle(R);if(F.overflowX==="auto"||F.overflowX==="scroll")return!0}R=R.parentElement}return!1};window.addEventListener("touchstart",G=>{var F;if(!l.state.currentUser){M=!0;return}if(((F=G.touches)==null?void 0:F.length)!==1){M=!0;return}const R=G.touches[0];I=R.clientX,N=R.clientY,C=Date.now(),M=q(G.target)},{passive:!0}),window.addEventListener("touchmove",G=>{if(M||!G.touches||G.touches.length!==1)return;const R=G.touches[0],F=R.clientX-I,lt=R.clientY-N;Math.abs(lt)>Math.abs(F)&&Math.abs(lt)>12&&(M=!0)},{passive:!0}),window.addEventListener("touchend",G=>{var ea;if(!l.state.currentUser||M||!G.changedTouches||!G.changedTouches.length)return;const R=G.changedTouches[0],F=R.clientX-I,lt=R.clientY-N,gt=Date.now()-C;if(Math.abs(F)>=50&&Math.abs(F)>Math.abs(lt)*1.35&&gt<=550){const $e=H(),Za=l.state.currentView||sessionStorage.getItem("activeView")||"pos",Jt=$e.indexOf(Za);if(Jt!==-1){let ce=-1;if(F<0&&Jt<$e.length-1?ce=Jt+1:F>0&&Jt>0&&(ce=Jt-1),ce!==-1){const aa=$e[ce];try{(ea=navigator.vibrate)==null||ea.call(navigator,12)}catch{}const Nt=e==null?void 0:e.querySelector(`.dock-item[data-view="${aa}"]`);Nt&&(Nt.classList.remove("bouncing"),Nt.offsetWidth,Nt.classList.add("bouncing"),Nt.addEventListener("animationend",()=>Nt.classList.remove("bouncing"),{once:!0})),bt(aa)}}}},{passive:!0})})();const A=document.getElementById("topbar-app-version");if(A){const I="1.6.5";A.textContent=`v${I}`}if(!l.state.currentUser)await bt("login");else{const I=sessionStorage.getItem("activeView")||"pos";await bt(I==="login"?"pos":I)}};document.addEventListener("DOMContentLoaded",zs);
