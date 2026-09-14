const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-CSRlgf-4.js","./vendor-qr-CYzGYPQn.js","./vendor-jspdf-BEqUCB1L.js"])))=>i.map(i=>d[i]);
import{X as mn}from"./vendor-db-1iEchKay.js";import{c as gn}from"./vendor-supabase-BBmmNHm-.js";import{b as fn}from"./vendor-qr-CYzGYPQn.js";import{_ as Ee}from"./vendor-jspdf-BEqUCB1L.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();const bn=()=>{try{return localStorage.getItem("bm_jwt_token")||localStorage.getItem("BM_AUTH_JWT_SESSION")||null}catch{return null}},Yt=async(t,a={})=>{const e=bn(),s={"Content-Type":"application/json",Accept:"application/json",...e?{Authorization:`Bearer ${e}`}:{},...a.headers||{}},n=t.startsWith("/api")?t:`/api${t}`;try{const i=await fetch(n,{...a,headers:s}),o=await i.json().catch(()=>null);if(!i.ok){const r=(o==null?void 0:o.error)||`Request failed with status ${i.status} (${i.statusText})`,d=new Error(r);throw d.status=i.status,d.data=o,d}return o}catch(i){throw i.status||(i.isNetworkError=!0),i}},ut={get:(t,a)=>Yt(t,{method:"GET",...a}),post:(t,a,e)=>Yt(t,{method:"POST",body:JSON.stringify(a),...e}),put:(t,a,e)=>Yt(t,{method:"PUT",body:JSON.stringify(a),...e}),patch:(t,a,e)=>Yt(t,{method:"PATCH",body:JSON.stringify(a),...e}),delete:(t,a)=>Yt(t,{method:"DELETE",...a})},Ot={},m={state:{cart:[],products:[],customers:[],transactions:[],expenses:[],users:[],currentUser:null,currentView:"pos",discount:0,customerName:"",selectedCustomer:null,settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"",shopPhone:"",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,a){return Ot[t]||(Ot[t]=[]),Ot[t].push(a),()=>{Ot[t]=(Ot[t]??[]).filter(e=>e!==a)}},emit(t,a){for(const e of Ot[t]??[])e(a)},addToCart(t,a=1){const e=Math.max(1,parseInt(a,10)||1),s=this.state.cart.findIndex(n=>String(n.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=e:this.state.cart.push({product:t,qty:e}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(a=>String(a.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,a){if(a<=0)return this.removeFromCart(t);const e=this.state.cart.find(s=>String(s.product.id)===String(t));e&&(e.qty=a,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.state.selectedCustomer=null,this.emit("cart:change",this.state.cart),this.emit("selectedCustomer:change",null)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,a)=>t+a.product.price*a.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,a)=>t+a.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setCustomers(t){this.state.customers=t||[],this.emit("customers:change",this.state.customers)},setSelectedCustomer(t){this.state.selectedCustomer=t,this.state.customerName=t?t.name:"",this.emit("selectedCustomer:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(a=>String(a.id)!==String(t)),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,a){const e=this.state.transactions.findIndex(s=>String(s.id)===String(t));e>=0&&(this.state.transactions[e]={...this.state.transactions[e],...a},this.emit("transactions:change",this.state.transactions))},updateCustomer(t,a){const e=this.state.customers.findIndex(s=>String(s.id)===String(t));e>=0&&(this.state.customers[e]={...this.state.customers[e],...a},this.emit("customers:change",this.state.customers))},addCustomer(t){this.state.customers=[...this.state.customers,t],this.emit("customers:change",this.state.customers)},removeCustomer(t){this.state.customers=this.state.customers.filter(a=>String(a.id)!==String(t)),this.emit("customers:change",this.state.customers)},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(a=>a.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)},setUsers(t){this.state.users=t,this.emit("users:change",t)},addUser(t){this.state.users=[...this.state.users,t],this.emit("users:change",this.state.users)},updateUser(t,a){const e=this.state.users.findIndex(s=>String(s.id)===String(t));e>=0&&(this.state.users[e]={...this.state.users[e],...a},this.emit("users:change",this.state.users))},removeUser(t){this.state.users=this.state.users.filter(a=>String(a.id)!==String(t)),this.emit("users:change",this.state.users)},login(t,a=null){const e={id:t.id,username:t.username,name:t.name,role:t.role||"cashier"};this.state.currentUser=e;try{sessionStorage.setItem("bm_active_user",JSON.stringify(e)),a&&localStorage.setItem("bm_jwt_token",a)}catch{}this.emit("auth:change",e)},logout(){this.state.currentUser=null;try{sessionStorage.removeItem("bm_active_user"),localStorage.removeItem("bm_jwt_token")}catch{}this.emit("auth:change",null)},restoreSession(){try{const t=sessionStorage.getItem("bm_active_user");if(t)return this.state.currentUser=JSON.parse(t),this.emit("auth:change",this.state.currentUser),this.state.currentUser}catch{}return null},canAccess(t){if(t==="login")return!0;const a=this.state.currentUser;if(!a)return!1;const e=a.role||"cashier";return e==="owner"?!0:e==="supervisor"?["pos","products","customers","transactions","reports"].includes(t):["pos","customers","transactions"].includes(t)}},be=()=>{if(typeof window<"u"&&window.crypto)return window.crypto;if(typeof globalThis<"u"&&globalThis.crypto)return globalThis.crypto;throw new Error("Web Crypto API tidak tersedia pada runtime ini.")},ua=(t=16)=>{const a=be(),e=new Uint8Array(t);return a.getRandomValues(e),Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")},Lt=(t="")=>{let a;try{const e=be();if(typeof e.randomUUID=="function")a=e.randomUUID();else{const s=new Uint8Array(16);e.getRandomValues(s),s[6]=s[6]&15|64,s[8]=s[8]&63|128,a=Array.from(s,(n,i)=>([4,6,8,10].includes(i)?"-":"")+n.toString(16).padStart(2,"0")).join("")}}catch{a="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const n=Math.random()*16|0;return(s==="x"?n:n&3|8).toString(16)})}return t?`${t}_${a}`:a},Fe=async(t,a)=>{if(!t||typeof t!="string")throw new Error("PIN tidak valid.");if(!a||typeof a!="string")throw new Error("Salt tidak valid.");const e=be(),n=new TextEncoder().encode(`${a}:${t.trim()}`),i=await e.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(i)).map(r=>r.toString(16).padStart(2,"0")).join("")},ma=async(t,a,e)=>{if(!t||!a||!e)return!1;try{const s=await Fe(t,a);if(s.length!==e.length)return!1;let n=0;for(let i=0;i<s.length;i++)n|=s.charCodeAt(i)^e.charCodeAt(i);return n===0}catch{return!1}},Ae=t=>{let a;if(typeof t=="string")typeof btoa=="function"?a=btoa(unescape(encodeURIComponent(t))):a=Buffer.from(t,"utf8").toString("base64");else{const e=new Uint8Array(t);if(typeof btoa=="function"){let s="";for(let n=0;n<e.byteLength;n++)s+=String.fromCharCode(e[n]);a=btoa(s)}else a=Buffer.from(e).toString("base64")}return a.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")},yn=t=>{let a=t.replace(/-/g,"+").replace(/_/g,"/");for(;a.length%4;)a+="=";return typeof atob=="function"?decodeURIComponent(escape(atob(a))):Buffer.from(a,"base64").toString("utf8")},hn=t=>{let a=t.replace(/-/g,"+").replace(/_/g,"/");for(;a.length%4;)a+="=";let e;typeof atob=="function"?e=atob(a):e=Buffer.from(a,"base64").toString("binary");const s=new Uint8Array(e.length);for(let n=0;n<e.length;n++)s[n]=e.charCodeAt(n);return s},ga=async(t,a,e=86400*7)=>{const s=be(),n=new TextEncoder,i={alg:"HS256",typ:"JWT"},o=Math.floor(Date.now()/1e3),r={...t,iat:o,exp:o+e},d=Ae(JSON.stringify(i)),u=Ae(JSON.stringify(r)),c=`${d}.${u}`,p=await s.subtle.importKey("raw",n.encode(a),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),l=await s.subtle.sign("HMAC",p,n.encode(c)),g=Ae(l);return`${c}.${g}`},vn=async(t,a)=>{if(!t||typeof t!="string")return null;const e=t.split(".");if(e.length!==3)return null;const[s,n,i]=e,o=`${s}.${n}`,r=be(),d=new TextEncoder;try{const u=await r.subtle.importKey("raw",d.encode(a),{name:"HMAC",hash:"SHA-256"},!1,["verify"]),c=hn(i);if(!await r.subtle.verify("HMAC",u,c,d.encode(o)))return null;const l=yn(n),g=JSON.parse(l),v=Math.floor(Date.now()/1e3);return g.exp&&g.exp<v?null:g}catch{return null}},wn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),xn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),Pa=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),St=(t=new Date)=>`${xn(t)} ${Pa(t)}`,ot=(t=new Date)=>{const a=t instanceof Date?t:new Date(t);if(Number.isNaN(a.getTime()))return new Date().toISOString().split("T")[0];const e=a.getFullYear(),s=String(a.getMonth()+1).padStart(2,"0"),n=String(a.getDate()).padStart(2,"0");return`${e}-${s}-${n}`},kn=(t=new Date)=>{const a=t instanceof Date?t:new Date(t);return Number.isNaN(a.getTime())?new Date().toISOString().slice(0,7):`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`},La="https://wiapnhpdgjbtkblowfig.supabase.co",Ge="sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g",Sn="STORE-BM-856CFAC8",ta="bm_master_store_key",oe="bm_jwt_token",fa="bm_jwt_signing_secret",Aa=()=>{try{const e=localStorage.getItem(fa);if((e==null?void 0:e.length)>=32)return e}catch{}const t=new Uint8Array(32);(globalThis.crypto||window.crypto).getRandomValues(t);const a=Array.from(t,e=>e.toString(16).padStart(2,"0")).join("");try{localStorage.setItem(fa,a)}catch{}return a},xt=()=>{try{const t=localStorage.getItem(ta);if(t!=null&&t.trim())return t.trim()}catch{}return Sn},En=t=>{try{if(t!=null&&t.trim())return localStorage.setItem(ta,t.trim()),!0}catch{}return!1},tt=()=>{try{return localStorage.getItem(ta)==="ISOLATED_SANDBOX"}catch{return!1}};let Be=null,Ce=null;const nt=()=>(Be||(Be=gn(La,Ge,{auth:{persistSession:!1},realtime:{params:{eventsPerSecond:20}}})),Be),dt=(t,a)=>{const e=document.getElementById("status-badge");e&&(t==="online"?(e.textContent=a||"🟢 Cloud Realtime",e.classList.remove("status-badge--offline"),e.style.background="rgba(16, 185, 129, 0.12)",e.style.borderColor="rgba(16, 185, 129, 0.3)",e.style.color="#059669"):t==="syncing"?(e.textContent="🔄 Sinkronisasi...",e.classList.remove("status-badge--offline"),e.style.background="rgba(37, 99, 235, 0.12)",e.style.borderColor="rgba(37, 99, 235, 0.3)",e.style.color="#2563eb"):(e.textContent=a||"⚡ Mode Offline",e.classList.add("status-badge--offline"),e.style.background="rgba(239, 68, 68, 0.12)",e.style.borderColor="rgba(239, 68, 68, 0.3)",e.style.color="#dc2626"))};let Ne=null,qt=!0,We=0;const $e=()=>qt,$n=async()=>{if(tt())return{ok:!1,rtt:0,isolated:!0};const t=performance.now();try{const a=new AbortController,e=setTimeout(()=>a.abort(),3500),s=await fetch(`${La}/rest/v1/settings?select=key&limit=1`,{method:"GET",headers:{apikey:Ge,Authorization:`Bearer ${Ge}`},signal:a.signal,cache:"no-store"});clearTimeout(e);const n=performance.now(),i=Math.round(n-t);return s.ok?(qt=!0,We=i,{ok:!0,rtt:i}):(qt=!1,{ok:!1,rtt:i})}catch{return qt=!1,We=0,{ok:!1,rtt:0}}},Tn=(t=12e3)=>{Ne&&clearInterval(Ne);const a=async()=>{const e=await $n();e.ok?(e.rtt>1500?dt("syncing",`🟡 Sinyal Lambat (${e.rtt}ms)`):dt("online",`🟢 Cloud Realtime (${e.rtt}ms)`),Nt()):dt("offline","🔴 Mode Offline (Staged)")};a(),Ne=setInterval(a,t),window.addEventListener("online",()=>a()),window.addEventListener("offline",()=>dt("offline","🔴 Mode Offline (Staged)"))},Nt=async()=>{try{const a=(await k.transactions.where("syncStatus").equals("staged_offline").toArray()).length,e=document.getElementById("staged-offline-banner"),s=document.getElementById("staged-tx-count");return e&&s&&(a>0&&qt?(s.textContent=a,e.style.display="flex"):e.style.display="none"),a}catch{return 0}},In=async()=>{var t,a,e;if(!qt||tt())return(t=window.showToast)==null||t.call(window,"Tidak dapat menyinkronkan: Server belum terjangkau.","warning"),{success:!1};try{dt("syncing","🔄 Mengunggah data offline...");const s=await k.transactions.where("syncStatus").equals("staged_offline").toArray();if(s.length===0)return Nt(),{success:!0,count:0};const n=nt(),{error:i}=await n.from("transactions").upsert(s.map(Te));if(i)throw i;for(const o of s)o.syncStatus="synced",await k.transactions.put(o);return Nt(),dt("online",`🟢 Cloud Realtime (${We}ms)`),(a=window.showToast)==null||a.call(window,`Sukses menyinkronkan ${s.length} transaksi offline ke Cloud!`,"success"),{success:!0,count:s.length}}catch(s){return(e=window.showToast)==null||e.call(window,`Gagal menyinkronkan data offline: ${s.message}`,"error"),{success:!1,error:s.message}}},ba=t=>({id:String(t.id),name:t.name||"",category:t.category||"Umum",price:Number(t.price)||0,unit:t.unit||"buah",emoji:t.emoji||"📦",stock:Number(t.stock)||0,updated_at:new Date().toISOString()}),Te=t=>({id:String(t.id),invoice_no:t.invoiceNo||t.invoice_no||`INV-${Date.now()}`,date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||ot(t.date?new Date(t.date):new Date),customer_name:t.customerName||t.customer_name||"",items:t.items||[],subtotal:Number(t.subtotal)||0,discount:Number(t.discount)||0,tax:Number(t.tax)||0,total:Number(t.total)||0,paid:Number(t.paid)||0,change:Number(t.change)||0,payment_method:t.paymentMethod||t.payment_method||"cash",payment_status:t.paymentStatus||t.payment_status||"cash_paid",paid_amount:Number(t.paidAmount||t.paid_amount)||0,remaining_debt:Number(t.remainingDebt||t.remaining_debt)||0,debt_payments:t.debtPayments||t.debt_payments||[],cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),Je=t=>({id:String(t.id),date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||ot(t.date?new Date(t.date):new Date),category:t.category||"Operasional",note:t.note||"",amount:Number(t.amount)||0,cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),ya=t=>({id:String(t.id),name:t.name||"",phone:t.phone||"",address:t.address||"",category:t.category||"Rumah Tangga",total_orders:Number(t.totalOrders||t.total_orders)||0,total_spent:Number(t.totalSpent||t.total_spent)||0,total_debt:Number(t.totalDebt||t.total_debt)||0,credit_limit:Number(t.creditLimit||t.credit_limit)||0,galon_loaned:Number(t.galonLoaned||t.galon_loaned)||0,notes:t.notes||"",updated_at:new Date().toISOString()}),ha=t=>{const a=String(t.username||"").toLowerCase().trim();return{id:t.id?String(t.id):a?`usr_${a}`:Lt("usr"),store_id:xt(),username:a,name:String(t.name||""),role:String(t.role||"cashier"),pin_hash:String(t.pinHash||t.pin_hash||""),pin_salt:String(t.pinSalt||t.pin_salt||""),is_active:t.isActive!==void 0?!!t.isActive:t.is_active!==void 0?!!t.is_active:!0,updated_at:new Date().toISOString()}},Gt=async()=>{var a;if(tt())return dt("offline","🔒 Mode Demo Terisolasi"),{success:!0,isolated:!0};if(!navigator.onLine)return dt("offline","⚡ Mode Offline"),{success:!1,offline:!0};xt();const t=nt();dt("syncing");try{try{const{data:e,error:s}=await t.from("products").select("*");if(!s&&e){const n=new Set(e.map(r=>String(r.id))),i=await k.products.toArray();for(const r of i)n.has(String(r.id))||await k.products.delete(r.id);for(const r of e){const d=String(r.id);await k.products.put({id:d,sku:`BM-${d.replace("prod_","")}`,name:r.name||"",category:r.category||"Umum",price:Number(r.price)||0,cost:0,unit:r.unit||"buah",emoji:r.emoji||"📦",image:null,stock:Number(r.stock)||0,deleted_at:null})}const o=await lt();m.setProducts(o),m.emit("products:change",o)}}catch{}try{const[e,{data:s,error:n}]=await Promise.all([gt(),t.from("transactions").select("*")]);if(!n&&s){const i=e.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("transactions").upsert(i.map(Te));for(const d of i)d.syncStatus="synced",await k.transactions.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of e)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await k.transactions.delete(d.id);for(const d of s){const u=String(d.id);await k.transactions.put({id:u,invoiceNo:d.invoice_no,date:d.date,dateKey:d.date_key,customerName:d.customer_name,items:d.items||[],subtotal:Number(d.subtotal),discount:Number(d.discount),tax:Number(d.tax),total:Number(d.total),paid:Number(d.paid),change:Number(d.change),paymentMethod:d.payment_method,paymentStatus:d.payment_status,paidAmount:Number(d.paid_amount),remainingDebt:Number(d.remaining_debt),debtPayments:d.debt_payments||[],cashier:d.cashier,syncStatus:"synced",deleted_at:null})}const r=await gt();m.setTransactions(r),m.emit("transactions:change",r)}}catch{}try{const[e,{data:s,error:n}]=await Promise.all([ue(),t.from("expenses").select("*")]);if(!n&&s){const i=e.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("expenses").upsert(i.map(Je));for(const d of i)d.syncStatus="synced",await k.expenses.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of e)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await k.expenses.delete(d.id);for(const d of s){const u=String(d.id);await k.expenses.put({id:u,date:d.date,dateKey:d.date_key,category:d.category,note:d.note,amount:Number(d.amount),cashier:d.cashier,deleted_at:null})}const r=await ue();m.setExpenses(r),m.emit("expenses:change",r)}}catch{}try{const[e,{data:s,error:n}]=await Promise.all([X(),t.from("customers").select("*")]);if(!n&&s){const i=new Set(s.map(r=>String(r.id)));for(const r of e)i.has(String(r.id))||await k.customers.delete(r.id);for(const r of s){const d=String(r.id);await k.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const o=await X();(a=m.setCustomers)==null||a.call(m,o),m.emit("customers:change",o)}}catch{}try{await Mt()}catch{}try{const{data:e,error:s}=await t.from("settings").select("*"),n=await k.settings.toArray();if(!s&&e){if(e.length===0&&n.length>0)await t.from("settings").upsert(n.map(i=>({key:i.key,value:String(i.value??""),updated_at:new Date().toISOString()})));else if(e.length>0)for(const i of e)i.key.startsWith("users_roster_")||await k.settings.put({key:i.key,value:i.value??""})}}catch{}return dt("online","🟢 Cloud Realtime"),{success:!0}}catch(e){return dt("online","🟢 Cloud Aktif"),{success:!1,error:e}}finally{}},Ba=()=>{if(tt())return;const t=nt(),a=xt();Ce&&t.removeChannel(Ce),Ce=t.channel(`store_realtime_${a}`).on("postgres_changes",{event:"*",schema:"public",table:"products"},async e=>{var n,i;if(e.eventType==="DELETE"){const o=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await k.products.delete(o)}else if(e.new){const o=e.new,r=String(o.id);await k.products.put({id:r,sku:`BM-${r.replace("prod_","")}`,name:o.name||"",category:o.category||"Umum",price:Number(o.price)||0,cost:0,unit:o.unit||"buah",emoji:o.emoji||"📦",image:null,stock:Number(o.stock)||0,deleted_at:null})}const s=await lt();m.setProducts(s),m.emit("products:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"transactions"},async e=>{var n,i;if(e.eventType==="DELETE"){const o=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await k.transactions.delete(o)}else if(e.new){const o=e.new,r=String(o.id);await k.transactions.put({id:r,invoiceNo:o.invoice_no,date:o.date,dateKey:o.date_key,customerName:o.customer_name,items:o.items||[],subtotal:Number(o.subtotal),discount:Number(o.discount),tax:Number(o.tax),total:Number(o.total),paid:Number(o.paid),change:Number(o.change),paymentMethod:o.payment_method,paymentStatus:o.payment_status,paidAmount:Number(o.paid_amount),remainingDebt:Number(o.remaining_debt),debtPayments:o.debt_payments||[],cashier:o.cashier,syncStatus:"synced",deleted_at:null})}const s=await gt();m.setTransactions(s),m.emit("transactions:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"expenses"},async e=>{var n,i;if(e.eventType==="DELETE"){const o=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await k.expenses.delete(o)}else if(e.new){const o=e.new,r=String(o.id);await k.expenses.put({id:r,date:o.date,dateKey:o.date_key,category:o.category,note:o.note,amount:Number(o.amount),cashier:o.cashier,deleted_at:null})}const s=await ue();m.setExpenses(s),m.emit("expenses:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"customers"},async e=>{var n,i,o;if(e.eventType==="DELETE"){const r=String(((n=e.old)==null?void 0:n.id)||((i=e.new)==null?void 0:i.id));await k.customers.delete(r)}else if(e.new){const r=e.new,d=String(r.id);await k.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const s=await X();(o=m.setCustomers)==null||o.call(m,s),m.emit("customers:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"settings"},async e=>{var s;if(e.new&&e.new.key===`users_roster_${a}`)try{const n=JSON.parse(e.new.value);if(Array.isArray(n)&&n.length>0){const i=new Set(n.map(d=>String(d.username).toLowerCase().trim())),o=await k.users.toArray();for(const d of o)i.has(String(d.username).toLowerCase().trim())||await k.users.delete(d.id);for(const d of n){const u=String(d.username).toLowerCase().trim(),c=await k.users.where("username").equalsIgnoreCase(u).first(),l={id:d.id?String(d.id):c!=null&&c.id?String(c.id):`usr_${u}`,username:u,name:d.name,role:d.role,pinHash:d.pin_hash||d.pinHash,pinSalt:d.pin_salt||d.pinSalt,isActive:d.is_active!==void 0?!!d.is_active:d.isActive!==void 0?!!d.isActive:!0,createdAt:d.created_at||d.createdAt||new Date().toISOString(),updatedAt:d.updated_at||d.updatedAt||new Date().toISOString()};await k.users.put(l)}const r=await k.users.toArray();m.setUsers(r),m.emit("users:change",r)}}catch{}else if((s=e.new)!=null&&s.key)try{await k.settings.put({key:e.new.key,value:e.new.value??""}),m.updateSettings({[e.new.key]:e.new.value??""})}catch{}}).subscribe(e=>{e==="SUBSCRIBED"?dt("online","🟢 Cloud Realtime"):(e==="CLOSED"||e==="CHANNEL_ERROR")&&dt("offline","⚡ Mode Offline")}),window.addEventListener("online",()=>{Gt()})},Ca=async t=>{if(!(tt()||!navigator.onLine))try{await ut.post("/products",ba(t))}catch{try{await nt().from("products").upsert(ba(t))}catch{}}},_n=async t=>{if(!(tt()||!navigator.onLine))try{await ut.delete(`/products/${t}`)}catch{try{await nt().from("products").delete().eq("id",String(t))}catch{}}},Na=async t=>{if(!(tt()||!navigator.onLine))try{await ut.post("/customers",ya(t))}catch{try{await nt().from("customers").upsert(ya(t))}catch{}}},Pn=async t=>{if(!(tt()||!navigator.onLine))try{await ut.delete(`/customers/${t}`)}catch{try{await nt().from("customers").delete().eq("id",String(t))}catch{}}},Ma=async t=>{if(tt()||!navigator.onLine)return{success:!1,offline:!0};try{return await ut.post("/transactions",Te(t)),{success:!0}}catch{try{const e=nt(),{error:s}=await e.from("transactions").upsert(Te(t));if(s)throw s;return{success:!0}}catch(e){return{success:!1,error:e.message}}}},Ln=async t=>{if(!(tt()||!navigator.onLine))try{await ut.delete(`/transactions/${t}`)}catch{try{await nt().from("transactions").delete().eq("id",String(t))}catch{}}},An=async t=>{if(tt()||!navigator.onLine)return{success:!1,offline:!0};try{return await ut.post("/expenses",Je(t)),{success:!0}}catch{try{const e=nt(),{error:s}=await e.from("expenses").upsert(Je(t));if(s)throw s;return{success:!0}}catch(e){return{success:!1,error:e.message}}}},Bn=async t=>{if(!(tt()||!navigator.onLine))try{await ut.delete(`/expenses/${t}`)}catch{try{await nt().from("expenses").delete().eq("id",String(t))}catch{}}},Cn=async(t,a)=>{if(!(tt()||!navigator.onLine))try{await ut.post("/settings",{key:String(t),value:typeof a=="object"?JSON.stringify(a):String(a??""),updated_at:new Date().toISOString()})}catch{try{await nt().from("settings").upsert({key:String(t),value:typeof a=="object"?JSON.stringify(a):String(a??""),updated_at:new Date().toISOString()})}catch{}}},za=async()=>{if(tt()||!navigator.onLine)return null;try{const s=new AbortController,n=setTimeout(()=>s.abort(),2e3),i=await fetch("/api/auth/users",{signal:s.signal});if(clearTimeout(n),i.ok){const o=await i.json();if(o.success&&Array.isArray(o.users)&&o.users.length>0)return o.users}}catch{}const t=xt(),a=nt(),e=`users_roster_${t}`;try{const s=new AbortController,n=setTimeout(()=>s.abort(),2500),{data:i,error:o}=await a.from("settings").select("value").eq("key",e).abortSignal(s.signal).maybeSingle();if(clearTimeout(n),!o&&(i!=null&&i.value)){const r=JSON.parse(i.value);if(Array.isArray(r)&&r.length>0)return r}}catch{}return null},Mt=async()=>{const t=await za();if(!t||t.length===0)return[];const a=new Set(t.map(n=>String(n.username).toLowerCase().trim())),e=await k.users.toArray();for(const n of e)a.has(String(n.username).toLowerCase().trim())||await k.users.delete(n.id);for(const n of t){const i=String(n.username).toLowerCase().trim(),o=await k.users.where("username").equalsIgnoreCase(i).first(),d={id:n.id?String(n.id):o!=null&&o.id?String(o.id):`usr_${i}`,username:i,name:n.name,role:n.role,pinHash:n.pin_hash||n.pinHash||(o==null?void 0:o.pinHash)||"",pinSalt:n.pin_salt||n.pinSalt||(o==null?void 0:o.pinSalt)||"",isActive:n.is_active!==void 0?!!n.is_active:n.isActive!==void 0?!!n.isActive:!0,createdAt:n.created_at||n.createdAt||new Date().toISOString(),updatedAt:n.updated_at||n.updatedAt||new Date().toISOString()};await k.users.put(d)}const s=await k.users.toArray();return m.setUsers(s),m.emit("users:change",s),s},ea=async(t,a)=>{const e=xt(),s=Aa(),n=String(t).toLowerCase().trim(),i=String(a||"").trim();if(navigator.onLine&&!tt()){try{const o=new AbortController,r=setTimeout(()=>o.abort(),4e3),d=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,pin:i,storeId:e}),signal:o.signal});if(clearTimeout(r),d.ok){const u=await d.json();if(u.success&&u.user){if(u.token)try{localStorage.setItem(oe,u.token)}catch{}return Mt().catch(c=>{}),{success:!0,user:u.user,token:u.token,isServerValidated:!0}}}else if(d.status===401||d.status===429||d.status===400){const u=await d.json().catch(()=>({}));return{success:!1,error:u.error||"PIN atau username salah.",lockedUntil:u.lockedUntil||0}}}catch{}try{const o=await za();if(o&&o.length>0){const r=o.find(d=>String(d.username).toLowerCase().trim()===n||String(d.id)===n);if(r){if(r.isActive===!1||r.is_active===!1)return{success:!1,error:"Akun operator ini telah dinonaktifkan oleh Owner."};const d=r.pin_salt||r.pinSalt,u=r.pin_hash||r.pinHash;if(d&&u){if(!await ma(i,d,u))return{success:!1,error:"PIN salah! Silakan periksa kembali."};Mt().catch(g=>{});const p={sub:r.id||r.username,username:r.username,name:r.name,role:r.role,storeId:e},l=await ga(p,s,86400*7);try{localStorage.setItem(oe,l)}catch{}return{success:!0,user:{id:r.id||r.username,username:r.username,name:r.name,role:r.role},token:l,isServerValidated:!0}}}}}catch{}}try{const r=(await k.users.toArray()).find(p=>String(p.username).toLowerCase().trim()===n||String(p.id)===n);if(!r)return{success:!1,error:"Perangkat offline dan akun belum tersimpan di cache lokal."};if(r.isActive===!1)return{success:!1,error:"Akun operator tidak aktif."};if(!await ma(i,r.pinSalt,r.pinHash))return{success:!1,error:"PIN salah! Silakan periksa kembali."};const u={sub:r.id||r.username,username:r.username,name:r.name,role:r.role,storeId:e,offline:!0},c=await ga(u,s,86400*2);try{localStorage.setItem(oe,c)}catch{}return{success:!0,user:{id:r.id,username:r.username,name:r.name,role:r.role},token:c,isServerValidated:!1,isOfflineFallback:!0}}catch(o){return{success:!1,error:`Gagal memvalidasi kredensial: ${o.message}`}}},Nn=async()=>{let t=null;try{t=localStorage.getItem(oe)}catch{}if(!t)return null;const a=Aa(),e=await vn(t,a);if(!(e!=null&&e.username)){try{localStorage.removeItem(oe)}catch{}return null}return{id:e.sub||e.username,username:e.username,name:e.name,role:e.role}},Da=async t=>{if(!(tt()||!navigator.onLine))try{await ut.post("/auth/users",ha(t))}catch{const e=xt(),s=nt();try{const n=`users_roster_${e}`,{data:i,error:o}=await s.from("settings").select("value").eq("key",n).maybeSingle();let r=[];if(!o&&(i!=null&&i.value))try{const p=JSON.parse(i.value);Array.isArray(p)&&(r=p)}catch{}const d=String(t.username).toLowerCase().trim(),u=ha(t),c=r.findIndex(p=>String(p.username).toLowerCase().trim()===d);c>=0?r[c]={...r[c],...u}:r.push(u),await s.from("settings").upsert({key:n,value:JSON.stringify(r),updated_at:new Date().toISOString()})}catch{}}},Mn=async t=>{if(tt()||!navigator.onLine)return;const a=String(t).toLowerCase().trim();try{await ut.delete(`/auth/users/${encodeURIComponent(a)}`)}catch{const s=xt(),n=nt();try{const i=`users_roster_${s}`,{data:o,error:r}=await n.from("settings").select("value").eq("key",i).maybeSingle();if(!r&&(o!=null&&o.value)){let d=JSON.parse(o.value);Array.isArray(d)&&(d=d.filter(u=>String(u.username).toLowerCase().trim()!==a),await n.from("settings").upsert({key:i,value:JSON.stringify(d),updated_at:new Date().toISOString()}))}}catch{}}},zn=async(t,a)=>{var e;if(navigator.onLine&&!tt()){try{const s=await ut.post("/checkout",{items:t,transaction:a});if(s!=null&&s.success)return{success:!0,via:"hono-edge-pure"}}catch{}try{const s=nt();for(const n of t||[]){const i=((e=n.product)==null?void 0:e.id)||n.id,o=Number(n.qty)||1;if(i)for(let r=0;r<3;r++){const{data:d,error:u}=await s.from("products").select("id, stock").eq("id",String(i)).limit(1);if(u||!d||d.length===0)break;const c=Number(d[0].stock)||0,p=Math.max(0,c-o),{data:l,error:g}=await s.from("products").update({stock:p,updated_at:new Date().toISOString()}).eq("id",String(i)).eq("stock",c).select("id");if(!g&&l&&l.length>0)break}}return{success:!0,via:"supabase-direct"}}catch{}}return{success:!0,via:"offline-staged"}},k=new mn("BlueMountainPOS");k.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});k.version(3).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category"});k.version(4).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category",users:"++id, username, role, isActive"});k.version(5).stores({products:"id, category, sku, deleted_at",customers:"id, name, phone, category, totalDebt, deleted_at",transactions:"id, invoiceNo, dateKey, paymentStatus, paymentMethod, customerName, syncStatus, deleted_at",settings:"key",expenses:"id, dateKey, category, deleted_at",users:"id, username, role, isActive"});const ct=t=>{},kt=()=>k.users.toArray(),Dn=t=>k.users.get(t),On=async t=>{const a={...t,id:t.id?String(t.id):Lt("usr")};return await k.users.put(a),Da(a).catch(ct),a.id},Un=async t=>{const a={...t,id:t.id?String(t.id):t.username?`usr_${String(t.username).toLowerCase().trim()}`:Lt("usr")},e=await k.users.put(a);return Da(a).catch(ct),e},Rn=async t=>{const a=await k.users.get(t),e=await k.users.delete(t);return a!=null&&a.username&&Mn(a.username).catch(ct),e},X=async()=>(await k.customers.toArray()).filter(a=>!a.deleted_at),Oa=async t=>{const a={...t,id:t.id?String(t.id):Lt("cust"),deleted_at:null,updated_at:new Date().toISOString()};return await k.customers.put(a),Na(a).catch(ct),a.id},Qt=async t=>{const a={...t,updated_at:new Date().toISOString()},e=await k.customers.put(a);return Na(a).catch(ct),e},jn=async t=>{const a=await k.customers.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await k.customers.put(e),Pn(t).catch(ct)}return t},lt=async()=>(await k.products.toArray()).filter(a=>!a.deleted_at),Ua=async t=>{const a={...t,id:t.id?String(t.id):Lt("prod"),deleted_at:null,updated_at:new Date().toISOString()};return await k.products.put(a),Ca(a).catch(ct),a.id},Ra=async t=>{const a={...t,updated_at:new Date().toISOString()},e=await k.products.put(a);return Ca(a).catch(ct),e},Kn=async t=>{const a=await k.products.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await k.products.put(e),_n(t).catch(ct)}return t},Hn=async t=>{const a=typeof $e=="function"?$e():navigator.onLine,e={...t,id:t.id?String(t.id):Lt("tx"),syncStatus:"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};if(await k.transactions.put(e),a)try{const s=await Ma(e);s!=null&&s.success&&(e.syncStatus="synced",await k.transactions.put(e))}catch{}try{Nt==null||Nt()}catch{}return e.id},gt=async()=>(await k.transactions.toArray()).filter(a=>!a.deleted_at),qn=async t=>{const a=await k.transactions.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await k.transactions.put(e),Ln(t).catch(ct)}return t},pe=async t=>{const a={...t,updated_at:new Date().toISOString()},e=await k.transactions.put(a);return Ma(a).catch(ct),e},Fn=async t=>{const a=typeof $e=="function"?$e():navigator.onLine,e={...t,id:t.id?String(t.id):Lt("exp"),syncStatus:"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};if(await k.expenses.put(e),a)try{const s=await An(e);s!=null&&s.success&&(e.syncStatus="synced",await k.expenses.put(e))}catch{}return e.id},ue=async()=>(await k.expenses.toArray()).filter(a=>!a.deleted_at),Gn=async t=>{const a=await k.expenses.get(t);if(a){const e={...a,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await k.expenses.put(e),Bn(t).catch(ct)}return t},aa=async t=>{const a=await k.settings.get(t);return(a==null?void 0:a.value)??null},ja=async(t,a)=>{await k.settings.put({key:t,value:a}),Cn(t,a).catch(ct)},na=async()=>{await k.users.count()>0||await k.users.put({id:"usr_admin",username:"admin",name:"Fadhilah Ramadhan",role:"owner",pinHash:"d6d80d026dadedb6b7c9c15ee0f3653761b1c2a1ac6e03abf9edd86bb8e911f1",pinSalt:"c40d7da58df489a2718e1c52d445e45a",isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})},Wn=async()=>{await Promise.all([k.products.clear(),k.customers.clear(),k.transactions.clear(),k.expenses.clear(),k.settings.clear(),k.users.clear()]),sessionStorage.clear(),localStorage.clear()},Jn=async()=>{const[t,a,e,s,n,i]=await Promise.all([k.products.toArray(),k.customers.toArray(),k.transactions.toArray(),k.expenses.toArray(),k.settings.toArray(),k.users.toArray()]),o=n.find(d=>d.key==="shopName"),r=(o==null?void 0:o.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"1.6.9",exportedAt:new Date().toISOString(),shopName:r,data:{products:t,customers:a,transactions:e,expenses:s,settings:n,users:i},meta:{productCount:t.length,customerCount:a.length,transactionCount:e.length,expenseCount:s.length,settingCount:n.length,userCount:i.length}}},Vn=async(t,a="replace")=>{if(!(t!=null&&t.data))throw new Error("Format file backup tidak valid atau rusak.");const{products:e=[],customers:s=[],transactions:n=[],expenses:i=[],settings:o=[],users:r=[]}=t.data;return a==="replace"?(await Promise.all([k.products.clear(),k.customers.clear(),k.transactions.clear(),k.expenses.clear(),k.settings.clear(),k.users.clear()]),e.length&&await k.products.bulkAdd(e),s.length&&await k.customers.bulkAdd(s),n.length&&await k.transactions.bulkAdd(n),i.length&&await k.expenses.bulkAdd(i),o.length&&await k.settings.bulkPut(o),r.length&&await k.users.bulkAdd(r)):a==="merge"&&(e.length&&await k.products.bulkPut(e),s.length&&await k.customers.bulkPut(s),n.length&&await k.transactions.bulkPut(n),i.length&&await k.expenses.bulkPut(i),o.length&&await k.settings.bulkPut(o),r.length&&await k.users.bulkPut(r)),{products:e.length,customers:s.length,transactions:n.length,expenses:i.length,settings:o.length,users:r.length}},Qn=()=>k.open(),w=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),f=t=>{const a=Number(t);if(Number.isNaN(a))return"Rp 0";const e=Math.round(Math.abs(a)).toLocaleString("id-ID");return(a<0?"-Rp ":"Rp ")+e},Ka="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHbElEQVR4nO2cS24rOwxEs/9Nv4cLJIAttCSS4qeorgN4kLglFcnTtuNBfv4jpJCf6gDk3VBAUgoFJKVQQFIKBSSlUEBSCgU84OeH7TuFHTTyT76/B7HD7hn5FJAS2mHnDIzyUUI77JqSmXwU0Aa7pmQlICXUw44p2MlHCfWwW0Kk8lFCHeyUAK18lFAOuySAAsbBLm2wykcJZbBDC07lo4R72J0FXgJSwjnszARP+SjgHHbmAW/5KOEcdmUgSj5K+Aw7MhAtICX8ht34IEM+CvgNu/FLlnyU8Bt24pdsAXcSvkXU+ysUUCHfSrA3vVreXZ2ASvme5HrbW/a9lQnwkMdTwpO37K7cWZWQLHEi3667c2VVkmFlvnJRwjnXVSQZlrcMmQLeJuFV1UiH5S1BtoA3SXhNJdmyaM6nhHOuqEI6rMjhU0Ab7auoGDyKgDdI2L4CpKFTQj2t06MNvCpPZwnbJkcdNCXU0TI18pCRsyHSLnWHAXfIiEKrxF0GW5mzm4Rt0nYbare8VbRJijJM6XCrBewiYYuUSEPUDLZawA4SwidEGqBloEj5EYFOiDS8k4Ei1YEGbDqkoZ0OsroWZAkhk1UP63NgXkOsrgdVQrhU1UMaB+U5vOq6ECWES4Q0IO/BVddGATdUD+cn4K0XuUYEYNJUD2UcTOTAqutEkhAiSfUwxqFED6q6TiQJy1NUD+FpGBlDqq6XAoIMYRxG1qCq60WRsCxBdeM1AkYMqrpeFAkpYOE/B6quG0HCkpOrm20V0HtQ1XUjSJh+anWTKSCWhKknVjd31/DIQVmFp4BeBwE011NA7cC6CJgtYcpp1Q2VNHv8nffwOgmYKSEFfMh5klnSgw59yZIw/JTqJlJAbAnrvwoHYmx8tICEAn4RJSDlm8OOfBD5tk4Bn2FHBjxeBSs/U3WDHRl4EobyxXFdVzwGPROHAvpzRVc0Q5aKoPlcR/nstO6MZsgWEVYiUT4f2nZHOuRTGZDfdm8QvGV6zaA9hMiUT/txggIWcCLgycCiX/EsHym6S9guuWX46J/PtLmQa9HSMrVVqOrPbKf5T9ci0jL1qUgVn+dO90e4cSJom9xbHIuUJw/PXJ3pnT7h+7gMybJrQqJ/Bb9kCuJN5+yn3FPJB5lvkZ0zIXBnVR9EfYbLetzO/RUOVAv1duFG3lfxBgqWCztCSqGApBQKSEqhgKQUCkhKoYCkFEgBo7/m8PyK5HQvydqbvwKCTBXdbBQBpWspYDLRDaeAOECm8mr4rOkUEAfIVJ4CagbqmdVzLQVMxtLANwp4A5BVdBooBTwDsopOA6WAZ0BW0WmgFPAMyCpmDbc8NPt7ZvVcG9EDFCDTRcq32t8zq+daCpgMBfTtBzKQ6bwEnDWfAuIAmc5TQM1APbN6rqWAyXgPdFx/i4A3AFnFSbMpYC8gq4geqvdArftRQAoYKuBqT80aCpiMpeGrgUoF1Dy0+1lyeuZFFRYylVfDswT0zBzZD0QgU0XK57V/RO7ofiACmSpSPq/9vbNn9AMRyFTRzUbaP6sfFPCldBGhCnaDlEIBSSkUkJRCAUkpsALyQ/s7mE7X46837fqor0BOrrf0YXZ91Nco3l/xeNe/zO6xicf6yGGc5PS4Caw1ogp42tOva7OKmq31HkiWgBohPGq1CCiZV0b9sAKeDkS6pzarNKN0T696Nb2+VkDLQLUCave2Fi+53kOKHRZxpPkQ6ncX0CKJtLAdaAJKbqzTmjTrEOtPE1Czxtr03dqKAUTfBNp1KgGK6zcLKDX/LQJGZojsQXX9bgJG3iWaplHA5+dR6z8S8G9j6e81ha+oFnDVn4gMkjXWPavrVwm4Olgig6VB2qZlCSjtRYSAVrkQ66eABwPQ9sOaQXK9VYSM+l0F3B262kMSfMdpwyL2yxTwRL4IAaWZpvVYm3IqoLQ47Znafd8moLa+VgLu9tAEt1y3u157jbTOXUbLjWU5o0rAk/rNAo7XSPawBDcX5rSf15krToa8Y5fHS0Br/UcCfl4n2cMS3DpUy74nfdidqV0juU5KloCW+o8F1ISxBLfKp91Xs95y5un13j2Q7htd/3K3E/megljXnWTw2PN0jcf+kS8GEWeLbz5FDYS4QwFJKRSQlEIBSSmhAlr+wtr9hfb3/NO1qxyrfLOfZ78bs2n7sKpNcr6kb5IM4/OzNZGkCygVbPf8bJirDLPnVtdaBNhdu9pjl2e31tLnXZ2RpAg4/jx7Fdutl+w9u85LQOkrzu5sTT5p/qf9pGJLbz5vUgUcf2e5K2fPeQv4dJNIhJqdrZV015tZzdKbXDKHawTcFThrtOS52c9Pe8yes+Rd7bPrgSSf9VytgJJHJDCfAaXrx+dmP0vOWO3hJeCsllU+qQweAkprj6KFgJLnvAWcrZXcDOMZ1v2k/VvVa6nhOgHHn2eFagerGdrqFW113m7IEsElr2Kam0mazZJjtU8EcH+EjE2Q7i0R2SLgLIf0VUJy3VOPNDV75JUIH0Hs7oRsoICkFApISqGApBQKSEqhgKSU/wFlggp6xOLiGQAAAABJRU5ErkJggg==",Xn=new Uint8Array([27,97,1,29,118,48,0,20,0,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,254,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,255,255,255,7,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,15,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,255,255,159,224,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,127,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,4,3,255,254,127,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,14,7,255,254,127,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,31,7,255,252,127,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,63,143,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,127,223,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,252,63,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,248,31,255,255,255,128,0,0,0,0,0,0,0,0,0,0,1,255,255,255,248,31,255,255,255,192,0,0,0,0,0,0,0,0,0,0,3,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,7,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,15,255,255,255,224,7,255,255,255,240,0,0,0,0,0,0,0,0,0,0,31,255,255,255,192,7,255,255,255,248,0,0,0,0,0,0,0,0,0,0,63,255,255,255,192,3,255,255,255,252,0,0,0,0,0,0,0,0,0,0,63,255,255,255,136,3,255,255,255,254,0,0,0,0,0,0,0,0,0,0,127,255,255,255,8,1,255,255,255,255,0,0,0,0,0,0,0,0,0,0,255,255,255,255,16,0,255,255,255,255,0,0,0,0,0,0,0,0,0,1,255,255,255,254,48,0,127,255,255,255,128,0,0,0,0,0,0,0,0,3,255,255,255,252,96,0,127,255,255,255,192,0,0,0,0,0,0,0,0,7,255,255,255,252,224,0,63,255,255,255,224,0,0,0,0,0,0,0,0,15,255,255,255,248,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,15,255,255,255,241,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,31,255,255,255,243,128,0,15,255,255,255,248,0,0,0,0,0,0,0,0,63,255,255,255,227,128,0,7,255,255,255,252,0,0,0,0,0,0,0,0,127,255,255,255,231,0,0,7,255,255,255,254,0,0,0,0,0,0,0,0,255,255,255,255,199,0,0,3,255,255,255,254,0,0,0,0,0,0,0,1,255,255,255,255,207,128,0,3,255,255,255,255,0,0,0,0,0,0,0,3,255,255,255,255,207,192,0,3,255,255,255,255,128,0,0,0,0,0,0,3,255,255,255,255,159,224,0,1,255,255,255,255,192,0,0,0,0,0,0,7,255,255,255,255,159,240,0,1,255,255,255,255,224,0,0,0,0,0,0,15,255,255,255,255,159,240,0,1,255,255,255,255,240,0,0,0,0,0,0,31,255,255,255,255,31,252,0,57,255,255,255,255,240,0,0,0,0,0,0,63,255,255,255,255,31,255,0,57,255,255,255,255,248,0,0,0,0,0,0,127,255,255,255,255,59,255,240,57,255,255,255,255,252,0,0,0,0,0,0,127,255,255,255,255,27,255,240,57,255,255,255,255,254,0,0,0,0,0,0,255,255,255,255,255,27,255,240,57,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,29,255,240,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,255,240,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,248,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,7,159,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,8,3,199,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,224,48,1,243,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,240,0,255,255,0,0,1,128,0,0,0,0,0,0,0,0,0,0,7,192,240,0,127,254,0,14,1,128,0,0,0,0,0,0,0,0,0,0,7,192,248,0,31,240,0,30,3,192,0,0,0,0,0,0,0,0,0,0,15,224,127,0,0,0,0,124,7,224,0,0,0,0,0,0,0,0,0,0,7,240,31,240,0,0,7,240,15,224,0,0,0,0,0,0,0,0,0,0,7,252,7,255,192,1,255,192,63,192,0,0,0,0,0,0,0,0,0,0,3,255,0,63,255,255,252,0,255,128,0,0,0,0,0,0,0,0,0,0,0,255,224,0,255,254,0,7,255,0,0,0,0,0,0,0,0,0,0,0,0,63,254,0,0,0,0,127,252,0,0,0,0,0,0,0,0,0,0,0,0,7,255,252,0,0,63,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,240,7,224,0,252,0,248,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,224,63,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,192,31,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,15,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,126,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,127,3,248,126,0,0,0,0,0,0,0,0,0,0,7,224,63,199,255,252,127,207,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,199,255,252,63,255,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,255,252,31,255,224,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,255,252,15,255,192,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,255,252,7,255,0,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,224,1,224,31,248,15,128,248,248,7,159,255,224,126,0,248,248,7,192,3,224,3,224,63,252,15,128,248,252,7,159,255,224,126,0,248,252,7,192,3,240,7,224,255,254,15,128,248,254,7,159,255,224,127,0,248,254,7,192,3,240,7,225,255,255,15,128,248,254,7,159,255,224,255,0,248,254,7,192,3,248,15,225,248,31,143,128,248,255,7,128,124,0,255,128,248,255,7,192,3,252,15,227,240,15,143,128,248,255,135,128,124,1,255,128,248,255,135,192,3,252,31,227,224,7,207,128,248,255,199,192,124,1,247,192,248,255,199,192,3,254,31,227,224,7,207,128,248,255,231,192,124,3,231,192,248,255,231,192,3,254,63,227,224,7,207,128,248,255,231,192,124,3,227,192,248,255,231,192,3,255,125,227,224,7,207,128,248,251,247,192,124,3,195,224,248,251,247,192,3,239,249,227,224,7,207,128,248,249,255,192,124,7,193,224,248,249,255,192,3,239,249,227,224,7,207,128,248,248,255,128,124,7,255,240,248,248,255,192,3,231,241,227,240,15,143,128,248,248,127,128,124,15,255,240,248,248,127,192,3,227,241,225,240,31,135,192,248,248,127,128,124,15,255,248,248,248,127,192,3,227,225,225,252,127,7,227,240,248,63,192,124,31,255,248,248,248,63,192,3,225,193,224,255,255,3,255,240,248,31,192,124,31,0,252,248,248,31,192,3,224,193,224,127,254,1,255,224,248,15,192,124,30,0,124,248,248,15,192,3,224,1,224,63,252,0,255,192,248,7,192,124,62,0,124,248,248,7,192,1,192,1,224,7,224,0,63,0,120,3,128,120,60,0,60,112,120,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,241,249,251,32,65,152,195,128,123,248,199,228,60,33,128,0,0,0,0,1,249,249,251,112,225,156,199,224,251,249,199,254,126,49,128,0,0,0,0,1,157,129,131,48,225,156,206,65,192,225,225,142,231,57,128,0,0,0,0,1,141,241,131,48,225,158,220,1,224,227,225,142,195,125,128,0,0,0,0,1,253,249,243,48,225,159,220,96,248,227,113,142,195,255,128,0,0,0,0,1,249,193,243,48,225,155,220,96,60,231,241,142,195,55,128,0,0,0,0,1,249,193,131,48,225,153,206,96,156,231,249,142,231,55,128,0,0,0,0,1,157,249,131,63,253,152,199,225,248,230,25,142,126,51,128,0,0,0,0,1,141,249,3,62,125,152,67,192,240,68,25,132,60,33,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),_e=(t,a={})=>{const e=t.items||[],s=[],n=(d,u=0,c=1,p=0)=>s.push({type:0,content:d,bold:u,align:c,format:p}),i=()=>n("--------------------------------",0,1,0),o=()=>n(" ",0,0,0);s.push({type:1,content:Ka,align:1,width:160,height:160});const r=a.shopName||"Blue Mountain Refilling Station";if(r.toLowerCase().includes("blue mountain")&&r.toLowerCase().includes("refilling station"))n("BLUE MOUNTAIN",1,1,2),n("REFILLING STATION",1,1,1);else for(const d of lines)n(d.trim().toUpperCase(),1,1,2);o(),a.shopAddress&&n(a.shopAddress,0,1,4),a.shopPhone&&n(`Telp: ${a.shopPhone}`,0,1,4),i(),n(`No   : ${t.invoiceNo||"-"}`,0,0,0),n(`Tgl  : ${St(new Date(t.date))}`,0,0,0),t.customerName&&n(`Cust : ${t.customerName}`,0,0,0),t.cashier&&n(`Kasir: ${t.cashier}`,0,0,0),i();for(const d of e){if(!(d!=null&&d.product))continue;const u=d.product.name,c=d.qty,p=f(d.product.price),l=f(d.product.price*c);n(`${u}`,1,0,0),n(`  ${c} x ${p} = ${l}`,0,0,0)}return i(),t.discount>0&&(n(`Subtotal: ${f(t.subtotal)}`,0,0,0),n(`Diskon:  -${f(t.discount)}`,0,0,0)),t.tax>0&&n(`Pajak:    ${f(t.tax)}`,0,0,0),n(`TOTAL: ${f(t.total)}`,1,0,3),t.paymentMethod==="cash"?(n(`Bayar:   ${f(t.paid)}`,0,0,0),n(`Kembali: ${f(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(n(`Transfer: ${f(t.total)}`,0,0,0),n(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(n(`DP Dibayar: ${f(t.paidAmount||0)}`,0,0,0),n(`Sisa Hutang: ${f(t.remainingDebt||0)}`,1,0,0)),i(),o(),n(a.receiptFooter||"Terima kasih sudah berbelanja!",1,1,0),n("BLUE MOUNTAIN REFILLING STATION",1,1,0),o(),o(),s},Wt={"48mm":{width:"48mm",widthPx:"185px",colWidth:30,fontSize:"10px",logoWidth:"55px"},"58mm":{width:"58mm",widthPx:"220px",colWidth:32,fontSize:"11px",logoWidth:"70px"},"80mm":{width:"80mm",widthPx:"300px",colWidth:48,fontSize:"12px",logoWidth:"85px"}},sa=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},Ha=t=>{const a=_e(t,m.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(a)),sa()},qa=t=>(Ha(t),`my.bluetoothprint.scheme://${(m.state.settings||{}).printerUrl||sa()}`),ia=t=>(Ha(t),sa(),`rawbt:data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(_e(t,m.state.settings)))))}`),Fa=t=>{const a=m.state.settings||{};let e=`*STRUK PEMBELIAN — ${a.shopName||"BLUE MOUNTAIN"}*
`;e+=`--------------------------------
`,e+=`No. Invoice : ${t.invoiceNo||"-"}
`,e+=`Tanggal     : ${St(new Date(t.date||Date.now()))}
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
`),e},va=(t,a="")=>{const e=(a||t.customerPhone||"").replace(/\D/g,""),s=e.startsWith("08")?`62${e.slice(1)}`:e.startsWith("8")?`62${e}`:e,n=Fa(t),i=encodeURIComponent(n);return s?`https://wa.me/${s}?text=${i}`:`https://wa.me/?text=${i}`},Pe=(t,a=null)=>{const e=m.state.settings||{},s=a||e.printerPaper||"58mm",n=Wt[s]||Wt["58mm"],i=t.items||[],o=()=>'<div style="border-top:1px dashed #333;margin:4px 0"></div>';let r=`<div class="thermal-receipt" style="width:${n.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:2px 4px">`;r+=`<div style="text-align:center;margin:0 auto 2px auto;line-height:1">
    <img src="${Ka}"
         class="thermal-logo"
         alt="Blue Mountain"
         width="65"
         height="65"
         style="width:${n.logoWidth};height:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  </div>`;const d=e.shopName||"Blue Mountain Refilling Station";r+='<div style="text-align:center;margin-bottom:6px">',d.toLowerCase().includes("blue mountain")&&d.toLowerCase().includes("refilling station")?(r+=`<div style="font-weight:900;font-size:${s==="80mm"?"15px":"13px"};line-height:1.2;letter-spacing:0.5px">BLUE MOUNTAIN</div>`,r+=`<div style="font-weight:800;font-size:${s==="80mm"?"12px":"11px"};line-height:1.2;letter-spacing:0.3px">REFILLING STATION</div>`):d.toUpperCase().split(`
`).forEach(c=>{r+=`<div style="font-weight:900;font-size:${s==="80mm"?"14px":"12px"};line-height:1.2">${c.trim()}</div>`}),r+="</div>",e.shopAddress&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35;word-break:normal;overflow-wrap:break-word;margin-bottom:2px">${e.shopAddress}</div>`),e.shopPhone&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35">Telp: ${e.shopPhone}</div>`),r+=o(),r+='<div style="font-size:10px;line-height:1.4">',r+=`<div>No&nbsp;&nbsp;&nbsp;: <b>${t.invoiceNo||"-"}</b></div>`,r+=`<div>Tgl&nbsp;&nbsp;: ${St(new Date(t.date||Date.now()))}</div>`,t.customerName&&(r+=`<div>Cust&nbsp;: ${t.customerName}</div>`),t.cashier&&(r+=`<div>Kasir: ${t.cashier}</div>`),r+="</div>",r+=o();for(const u of i){if(!(u!=null&&u.product))continue;const c=u.product.name,p=u.qty,l=u.product.price,g=l*p;r+=`<div style="font-weight:700;font-size:${n.fontSize};line-height:1.3">${c}</div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3;margin-bottom:3px">
      <span>&nbsp;&nbsp;${p} x ${f(l)}</span>
      <span style="font-weight:600">${f(g)}</span>
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
  </div>`,r+='<div style="height:4px"></div>',r+="</div>",r},me=(t,a=null)=>{const e=m.state.settings||{},s=a||e.printerPaper||"58mm",n=Wt[s]||Wt["58mm"],i=Pe(t,s),o=document.createElement("iframe");o.style.position="fixed",o.style.top="-9999px",o.style.left="-9999px",o.style.width="400px",o.style.height="800px",o.style.border="none",o.style.opacity="0",o.style.pointerEvents="none",document.body.appendChild(o);const r=o.contentWindow.document;r.open(),r.write(`<!DOCTYPE html>
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
</html>`),r.close();const d=()=>{try{o.contentWindow.focus(),o.contentWindow.print()}catch{const p=window.open("","_blank","width=350,height=600");p&&(p.document.write(r.documentElement.outerHTML),p.document.close(),p.focus(),setTimeout(()=>{p.print(),setTimeout(()=>p.close(),1e3)},300))}finally{setTimeout(()=>o.remove(),3e3)}},u=r.querySelector("img");u&&!u.complete?(u.onload=()=>setTimeout(d,120),u.onerror=()=>setTimeout(d,120),setTimeout(d,800)):setTimeout(d,200)},Ga=(t,a=null)=>{const e=new TextEncoder,s=m.state.settings||{},n=a||s.printerPaper||"58mm",o=(Wt[n]||Wt["58mm"]).colWidth,r=(v,E,b=o)=>{const y=Math.max(1,b-v.length-E.length);return v+" ".repeat(y)+E},d=(v,E=o)=>{if(!v)return[];const b=v.split(" "),y=[];let h="";for(const I of b)h?`${h} ${I}`.length<=E?h+=` ${I}`:(y.push(h),h=I):h=I;return h&&y.push(h),y},u=[],c=v=>u.push(...v),p=v=>{for(const E of v)u.push(E)},l=v=>{const E=e.encode(`${v}
`);for(const b of E)u.push(b)};c([27,64]),p(Xn),c([27,97,1]);const g=s.shopName||"Blue Mountain Refilling Station";if(g.toLowerCase().includes("blue mountain")&&g.toLowerCase().includes("refilling station"))c([27,69,1]),c([27,33,16]),l("BLUE MOUNTAIN"),c([27,33,0]),c([27,69,1]),l("REFILLING STATION"),c([27,69,0]);else{c([27,69,1]),c([27,33,16]);const v=g.toUpperCase().split(`
`);for(const E of v)l(E.trim());c([27,33,0]),c([27,69,0])}if(c([27,74,14]),s.shopAddress){const v=d(s.shopAddress,o);for(const E of v)l(E)}s.shopPhone&&l(`Telp: ${s.shopPhone}`),c([27,97,0]),l("-".repeat(o)),l(`No   : ${t.invoiceNo||"-"}`),l(`Tgl  : ${St(new Date(t.date||Date.now()))}`),t.customerName&&l(`Cust : ${t.customerName}`),t.cashier&&l(`Kasir: ${t.cashier}`),l("-".repeat(o));for(const v of t.items||[])v!=null&&v.product&&(c([27,69,1]),l(v.product.name),c([27,69,0]),l(r(`  ${v.qty} x ${f(v.product.price)}`,f(v.product.price*v.qty))));return l("-".repeat(o)),t.discount>0&&(l(r("Subtotal",f(t.subtotal||t.total+t.discount))),l(r("Diskon",`-${f(t.discount)}`))),t.tax>0&&l(r("Pajak",f(t.tax))),c([27,69,1]),c([27,33,16]),l(r("TOTAL",f(t.total))),c([27,33,0]),c([27,69,0]),t.paymentMethod==="cash"?(l(r("Bayar Tunai",f(t.paid||t.total))),c([27,69,1]),l(r("Kembali",f(t.change||0))),c([27,69,0])):t.paymentMethod==="transfer"?(l(r("Transfer Bank",f(t.total))),l(r("Status",t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU"))):t.paymentMethod==="debt"&&(l(r("DP Dibayar",f(t.paidAmount||0))),c([27,69,1]),l(r("Sisa Hutang",f(t.remainingDebt||0))),c([27,69,0])),l("-".repeat(o)),c([27,97,1]),c([27,69,1]),l("Terima kasih sudah berbelanja!"),l("BLUE MOUNTAIN REFILLING STATION"),c([27,69,0]),c([10,10,10,29,86,66,0]),new Uint8Array(u)},Wa=async t=>{const{default:a}=await Ee(async()=>{const{default:s}=await import("./vendor-canvas-C3fx88d4.js");return{default:s}},[],import.meta.url),e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.style.top="0",e.style.width="240px",e.style.maxHeight="none",e.style.overflow="visible",e.style.background="#ffffff",e.style.padding="10px 8px",e.style.boxSizing="border-box",e.style.zIndex="-9999",e.innerHTML=Pe(t,"58mm"),document.body.appendChild(e);try{const s=await a(e,{backgroundColor:"#ffffff",scale:3,useCORS:!0,logging:!1,windowWidth:320});return await new Promise((n,i)=>{s.toBlob(o=>{o?n(o):i(new Error("Gagal membuat blob gambar"))},"image/png",1)})}finally{e.remove()}},Ja=async t=>{var a;window.showToast&&window.showToast("Menyiapkan gambar struk WhatsApp...","info");try{const e=await Wa(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([e],s,{type:"image/png"}),i=Fa(t);if((a=navigator.canShare)!=null&&a.call(navigator,{files:[n]})){await navigator.share({title:`Struk ${t.invoiceNo||""}`,text:i,files:[n]}),window.showToast&&window.showToast("Struk gambar berhasil dibagikan!","success");return}try{navigator.clipboard&&window.ClipboardItem&&(await navigator.clipboard.write([new ClipboardItem({"image/png":e})]),window.showToast&&window.showToast("📋 Gambar struk telah disalin ke clipboard! Tempel (Ctrl+V) di chat WhatsApp.","success"))}catch{}const o=va(t);window.open(o,"_blank","noopener,noreferrer")}catch{const s=va(t);window.open(s,"_blank","noopener,noreferrer")}},Va=async t=>{var a;window.showToast&&window.showToast("Membuat PNG struk presisi...","info");try{const e=await Wa(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([e],s,{type:"image/png"});if((a=navigator.canShare)!=null&&a.call(navigator,{files:[n]}))await navigator.share({title:`Struk ${t.invoiceNo||""}`,files:[n]}),window.showToast&&window.showToast("Struk berhasil dibagikan!","success");else{const i=URL.createObjectURL(e),o=document.createElement("a");o.href=i,o.download=s,o.click(),setTimeout(()=>URL.revokeObjectURL(i),3e3),window.showToast&&window.showToast("PNG struk berhasil disimpan!","success")}}catch{window.showToast&&window.showToast("Gagal membuat PNG struk","error")}},Qa=t=>{const a=m.state.settings||{};a.printerUrl&&!a.printerUrl.includes("receipt-data.html")?window.location.href=`my.bluetoothprint.scheme://${a.printerUrl}`:(window.showToast&&window.showToast("BT App perlu server JSON. Mengalihkan ke RawBT (cetak langsung offline)...","info"),setTimeout(()=>{window.location.href=ia(t)},800))},Xa=async t=>{if(!navigator.bluetooth)throw new Error("Web Bluetooth tidak didukung pada browser ini. Gunakan Chrome di Android/PC atau gunakan opsi Cetak Direct.");let a;try{a=await navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["000018f0-0000-1000-8000-00805f9b34fb","e7810a71-73ae-499d-8c15-faa9aef0c3f2","49535343-fe7d-4ae5-8fa9-9fafd205e455","0000ff00-0000-1000-8000-00805f9b34fb","0000ae30-0000-1000-8000-00805f9b34fb","0000fee7-0000-1000-8000-00805f9b34fb","0000ffe0-0000-1000-8000-00805f9b34fb","0000fff0-0000-1000-8000-00805f9b34fb"]})}catch(n){if(n.name==="NotFoundError")return;throw n}const e=await a.gatt.connect();let s=null;try{const n=await e.getPrimaryServices();for(const r of n)try{const d=await r.getCharacteristics();for(const u of d)if(u.properties.write||u.properties.writeWithoutResponse){s=u;break}if(s)break}catch{}if(!s)throw new Error("Karakteristik penulisan printer Bluetooth tidak ditemukan.");const i=Ga(t),o=64;for(let r=0;r<i.length;r+=o){const d=i.slice(r,r+o);s.properties.write?await s.writeValueWithResponse(d):await s.writeValueWithoutResponse(d)}}finally{e!=null&&e.connected&&e.disconnect()}},Ya=async t=>{var e;if(!navigator.usb)throw new Error("WebUSB tidak didukung pada browser ini. Gunakan Chrome/Edge.");let a;try{a=await navigator.usb.requestDevice({filters:[]})}catch(s){if(s.name==="NotFoundError")return;throw s}try{await a.open()}catch(s){if((e=s.message)!=null&&e.toLowerCase().includes("access denied")||s.name==="SecurityError"){window.showToast&&window.showToast("Printer USB Windows dikelola driver sistem. Mengalihkan otomatis ke Cetak Langsung...","info"),me(t);return}throw s}try{a.configuration===null&&await a.selectConfiguration(1);let s=0,n=1;const i=a.configuration;if(i!=null&&i.interfaces)for(const r of i.interfaces)for(const d of r.alternates){const u=d.endpoints.find(c=>c.direction==="out");if(u){s=r.interfaceNumber,n=u.endpointNumber;break}}await a.claimInterface(s);const o=Ga(t);await a.transferOut(n,o),await a.close(),window.showToast&&window.showToast("Struk terkirim ke printer USB!","success")}catch{window.showToast&&window.showToast("Mengalihkan ke Cetak Langsung via sistem...","info"),me(t)}},Me=(t="58mm")=>{const a={invoiceNo:`TEST-${t.toUpperCase()}-`+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:m.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};me(a,t)},ze=()=>{const t=new Date,a=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),e=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${a}-${e}${s}`},Yn=t=>{let a=65535;for(let e=0;e<t.length;e++){a^=t.charCodeAt(e)<<8;for(let s=0;s<8;s++)a&32768?a=(a<<1^4129)&65535:a=a<<1&65535}return a.toString(16).toUpperCase().padStart(4,"0")},Zn=(t,a)=>{const e=String(a),s=String(e.length).padStart(2,"0");return`${t}${s}${e}`},ts=(t="",a=0)=>{let e=(t||"").trim();(!e||e.length<20)&&(e="00020101021126590014ID.LINKAJA.WWW011893600911002234477302090022344775204541153033605802ID5920BLUE MOUNTAIN STATION6006BEKASI610517510");const s=e.lastIndexOf("6304");s!==-1&&(e=e.substring(0,s)),e.includes("010211")?e=e.replace("010211","010212"):e.includes("010212")||(e=e.replace("000201","000201010212"));const n=Math.max(0,Math.round(Number(a)||0)),i=/54\d{2}\d+/,o=Zn("54",n);if(i.test(e))e=e.replace(i,o);else{const d=e.indexOf("5802ID");d!==-1?e=e.slice(0,d)+o+e.slice(d):e+=`${o}5802ID`}e+="6304";const r=Yn(e);return e+r},at=(t,a="generic-modal",e="")=>{U();const s=typeof a=="string"&&a.trim()?a.trim():"generic-modal",n=document.createElement("div");n.className="modal-overlay",n.id=`overlay-${s}`;const o=s==="modal-cust-360"||s==="payment-modal"||e.includes("modal--wide")?`modal modal--wide ${e}`.trim():`modal ${e}`.trim();n.innerHTML=`<div class="${o}" id="${s}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(n),n.addEventListener("click",u=>{u.target===n&&U(s)});const r=u=>{u.key==="Escape"&&(document.removeEventListener("keydown",r),U(s))};document.addEventListener("keydown",r);const d=n.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return d.length&&d[0].focus(),n},U=(t=null)=>{const a=typeof t=="string"&&t.trim()?t.trim():null;let e=[];try{if(a){const s=document.getElementById(`overlay-${a}`)||document.querySelector(`#overlay-${a}`);s&&(e=[s])}}catch{}e.length||(e=[...document.querySelectorAll(".modal-overlay")]),e.forEach(s=>{var n;s&&((n=s.querySelector(".modal"))==null||n.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>{try{s.remove()}catch{}},180))})},es=t=>{const e=(n=>Math.ceil(n/5e3)*5e3)(t),s=[e,e+5e3,e+1e4,e+2e4,e+5e4,e+1e5];return[...new Set(s.filter(n=>n>=t))].slice(0,4)},De=(t="cash")=>{const a=m.total,e=m.subtotal,s=m.state.discount||0,n=m.tax,i=m.state.settings||{},o=w(i.bankName||"BCA"),r=w(i.bankNumber||"—"),d=w(i.bankHolder||i.shopName||"Blue Mountain"),u=`
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
          ${es(a).map(c=>`<button class="quick-amt-btn" data-amount="${c}">${f(c)}</button>`).join("")}
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
            value="${w(m.state.customerName||"")}"
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
  `;at(u,"payment-modal"),setTimeout(()=>{var b,y,h,I;(b=document.getElementById("pay-close-btn"))==null||b.addEventListener("click",()=>U("payment-modal")),(y=document.getElementById("pay-cancel-btn"))==null||y.addEventListener("click",()=>U("payment-modal"));const c=()=>{var A;const _=document.getElementById("qris-dynamic-canvas");if(!_)return;const P=((A=m.state.settings)==null?void 0:A.qrisNumber)||"",x=ts(P,a);fn.toCanvas(_,x,{width:170,margin:1,errorCorrectionLevel:"M"},B=>{})};c(),document.querySelectorAll(".pay-tab").forEach(_=>{_.addEventListener("click",()=>{var x,A;for(const B of document.querySelectorAll(".pay-tab"))B.classList.remove("active");_.classList.add("active");const P=_.dataset.method;document.getElementById("pay-cash-section").style.display=P==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=P==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=P==="debt"?"":"none",P==="cash"&&((x=document.getElementById("cash-received"))==null||x.focus()),P==="transfer"&&c(),P==="debt"&&((A=document.getElementById("debt-customer"))==null||A.focus())})});const p=document.getElementById("cash-received"),l=document.getElementById("change-amount"),g=()=>{const _=parseFloat(p==null?void 0:p.value)||a,P=Math.max(0,_-a);l&&(l.textContent=f(P))};p==null||p.addEventListener("input",g),g(),(h=document.getElementById("quick-amounts"))==null||h.addEventListener("click",_=>{const P=_.target.closest(".quick-amt-btn");P&&p&&(p.value=P.dataset.amount,g())});const v=document.getElementById("debt-paid-now"),E=()=>{const _=Math.min(parseFloat(v==null?void 0:v.value)||0,a),P=a-_,x=document.getElementById("debt-paid-display"),A=document.getElementById("debt-remaining-display");x&&(x.textContent=f(_)),A&&(A.textContent=f(P))};v==null||v.addEventListener("input",E),(I=document.getElementById("pay-confirm-btn"))==null||I.addEventListener("click",async()=>{var $,K,W,J,L,z,V,Q;const _=document.querySelector(".pay-tab.active"),P=(_==null?void 0:_.dataset.method)||"cash",x=document.getElementById("pay-confirm-btn");if(P==="cash"&&(parseFloat(p==null?void 0:p.value)||a)<a){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),p==null||p.focus();return}if(P==="debt"){const j=(K=($=document.getElementById("debt-customer"))==null?void 0:$.value)==null?void 0:K.trim();if(!j){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(W=document.getElementById("debt-customer"))==null||W.focus();return}const S=Math.min(parseFloat((J=document.getElementById("debt-paid-now"))==null?void 0:J.value)||0,a),N=a-S,C=(m.state.customers||[]).find(M=>(M.name||"").trim().toLowerCase()===j.toLowerCase());if(C&&C.creditLimit>0){const M=(Number(C.totalDebt)||0)+N;if(M>C.creditLimit&&!confirm(`⚠️ Peringatan Limit Piutang!
Total piutang ${C.name} akan menjadi ${f(M)}, melebihi batas kredit (${f(C.creditLimit)}).

Tetap lanjutkan transaksi?`))return}}x&&(x.disabled=!0,x.textContent="⏳ Menyimpan...");const A=new Date().toISOString(),B=await X();let T=m.state.selectedCustomer||null,D="";P==="debt"?D=((z=(L=document.getElementById("debt-customer"))==null?void 0:L.value)==null?void 0:z.trim())||m.state.customerName||"Pelanggan":D=m.state.customerName||"",!T&&D&&(T=B.find(j=>(j.name||"").trim().toLowerCase()===D.toLowerCase())||null);let O;if(P==="cash"){const j=parseFloat(p==null?void 0:p.value)||a,S=Math.max(0,j-a);O={invoiceNo:ze(),date:A,dateKey:ot(),items:m.state.cart.map(N=>({product:{...N.product},qty:N.qty})),subtotal:e,discount:s,tax:n,total:a,paymentMethod:"cash",paymentStatus:"paid",paid:j,change:S,paidAmount:a,remainingDebt:0,debtPayments:[],customerId:(T==null?void 0:T.id)||null,customerName:(T==null?void 0:T.name)||D,customerPhone:(T==null?void 0:T.phone)||"",cashier:m.state.settings.cashierName||"Kasir"}}else if(P==="transfer")O={invoiceNo:ze(),date:A,dateKey:ot(),items:m.state.cart.map(j=>({product:{...j.product},qty:j.qty})),subtotal:e,discount:s,tax:n,total:a,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:a,change:0,paidAmount:a,remainingDebt:0,debtPayments:[],customerId:(T==null?void 0:T.id)||null,customerName:(T==null?void 0:T.name)||D,customerPhone:(T==null?void 0:T.phone)||"",cashier:m.state.settings.cashierName||"Kasir"};else{const j=Math.min(parseFloat((V=document.getElementById("debt-paid-now"))==null?void 0:V.value)||0,a),S=a-j,N=S===0?"paid":j>0?"partial":"unpaid";O={invoiceNo:ze(),date:A,dateKey:ot(),items:m.state.cart.map(C=>({product:{...C.product},qty:C.qty})),subtotal:e,discount:s,tax:n,total:a,paymentMethod:"debt",paymentStatus:N,paid:j,change:0,paidAmount:j,remainingDebt:S,debtPayments:j>0?[{date:A,amount:j,note:"DP / Uang muka awal"}]:[],customerId:(T==null?void 0:T.id)||null,customerName:(T==null?void 0:T.name)||D,customerPhone:(T==null?void 0:T.phone)||"",cashier:m.state.settings.cashierName||"Kasir"}}try{if(D){if(T)T.totalOrders=(Number(T.totalOrders)||0)+1,T.totalSpent=(Number(T.totalSpent)||0)+O.total,O.remainingDebt>0&&(T.totalDebt=(Number(T.totalDebt)||0)+O.remainingDebt),await Qt(T),O.customerId=T.id,O.customerName=T.name;else{const C=await Oa({name:D,phone:"",category:"Rumah Tangga",address:"",totalOrders:1,totalSpent:O.total,totalDebt:O.remainingDebt||0,creditLimit:0,galonLoaned:0});O.customerId=C,O.customerName=D}const N=await X();m.setCustomers(N)}const j=await Hn(O);O.id=j,m.addTransaction(O),zn(O.items,O).catch(N=>{});for(const N of O.items||[])if((Q=N.product)!=null&&Q.id){const C=await k.products.get(N.product.id);if(C&&typeof C.stock=="number"){const M=Math.max(0,C.stock-(Number(N.qty)||1));await k.products.update(N.product.id,{stock:M})}}const S=await lt();m.setProducts(S),U("payment-modal"),m.clearCart(),as(O)}catch(j){window.showToast(`Gagal menyimpan transaksi: ${j.message||"Error"}`,"error"),x&&(x.disabled=!1,x.textContent="✅ Proses Pembayaran")}})},0)},as=t=>{var r,d,u,c,p,l,g,v,E,b;const a=_e(t,m.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(a)),qa(t);const e=ia(t),s=((r=m.state.settings)==null?void 0:r.printerPaper)||"58mm",n=Pe(t,s),i=document.createElement("div");i.className="success-overlay",i.id="success-overlay",i.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${w(t.invoiceNo)} &bull; ${f(t.total)}</p>
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
  `,document.body.appendChild(i);const o=()=>{i.classList.add("closing"),setTimeout(()=>i.remove(),180)};(d=document.getElementById("success-close-btn"))==null||d.addEventListener("click",o),(u=document.getElementById("btn-close-overlay"))==null||u.addEventListener("click",o),(c=document.getElementById("btn-print-direct"))==null||c.addEventListener("click",()=>{me(t)}),(p=document.getElementById("btn-mo-whatsapp"))==null||p.addEventListener("click",()=>{Ja(t)}),(l=document.getElementById("btn-mo-png"))==null||l.addEventListener("click",()=>{Va(t)}),(g=document.getElementById("btn-print-ble"))==null||g.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer Bluetooth...","info"),await Xa(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(y){window.showToast(y.message||"Gagal koneksi Bluetooth","error")}}),(v=document.getElementById("btn-print-usb"))==null||v.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer USB...","info"),await Ya(t)}catch(y){window.showToast(y.message||"Gagal koneksi WebUSB","error")}}),(E=document.getElementById("btn-mo-btapp"))==null||E.addEventListener("click",()=>{Qa(t)}),(b=document.getElementById("btn-new-tx"))==null||b.addEventListener("click",()=>{o(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{i.parentNode&&o()},12e4)},Ve=async({onLogin:t=null,forceLock:a=!1}={})=>{var E;if(navigator.onLine)try{await Mt()}catch{}let e=await kt(),s=e.filter(b=>b.isActive!==!1);if(s.length===0&&(await na(),e=await kt(),s=e.filter(b=>b.isActive!==!1)),s.length===0){(E=window.showToast)==null||E.call(window,"Tidak ada akun operator aktif.","error");return}let n=s[0].id,i="";const o="modal-login-operator",r={owner:{color:"#8b5cf6",label:"👑 Owner"},supervisor:{color:"#2563eb",label:"⭐ Supervisor"},cashier:{color:"#10b981",label:"👤 Kasir"}},d=()=>`
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
        ${s.map(b=>{const y=String(b.id)===String(n),h=r[b.role]||r.cashier;return`
            <button type="button" class="btn-select-operator" data-id="${b.id}" style="
              padding: 10px 14px;
              border-radius: 12px;
              border: 2px solid ${y?"var(--primary, #2563eb)":"var(--border, #e2e8f0)"};
              background: ${y?"rgba(37, 99, 235, 0.08)":"var(--bg-card, #ffffff)"};
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
              transition: all 0.2s;
            ">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: ${h.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${(b.name||"U").charAt(0).toUpperCase()}
              </div>
              <div style="text-align: left;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${w(b.name)}</div>
                <div style="font-size: 11px; color: ${h.color}; font-weight: 600;">${h.label}</div>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- PIN Display -->
      <div id="pin-display-box" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;">
          ${[0,1,2,3,4,5].map(b=>`
            <span class="pin-dot" style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid var(--primary, #2563eb);
              background: ${b<i.length?"var(--primary, #2563eb)":"transparent"};
              display: inline-block;
              transition: background 0.15s;
            "></span>
          `).join("")}
        </div>
        <div id="pin-error-msg" style="min-height: 18px; font-size: 12px; font-weight: 600; color: #dc2626;"></div>
      </div>

      <!-- Numpad -->
      <div style="max-width: 260px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${[1,2,3,4,5,6,7,8,9].map(b=>`
          <button type="button" class="btn-numpad" data-val="${b}" style="
            height: 52px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 12px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
          ">${b}</button>
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
  `;at(d(),o,"modal--login");const u=()=>{document.querySelectorAll("#pin-display-box .pin-dot").forEach((y,h)=>{y.style.background=h<i.length?"var(--primary, #2563eb)":"transparent"})},c="bm_pin_lockout",p=()=>{try{const b=JSON.parse(localStorage.getItem(c)||"{}");return{count:Number(b.count)||0,until:Number(b.until)||0}}catch{return{count:0,until:0}}},l=(b,y)=>{try{localStorage.setItem(c,JSON.stringify({count:b,until:y}))}catch{}},g=async(b=!1)=>{var _;const y=s.find(P=>String(P.id)===String(n));if(!y)return;const h=p(),I=document.getElementById("pin-error-msg");if(h.until>Date.now()){const P=Math.ceil((h.until-Date.now())/1e3);I&&(I.textContent=`Sistem terkunci! Tunggu ${P} detik.`),i="",u();return}if(i.length>=4){const P=await ea(y.username,i);if(P.success){l(0,0),m.login(P.user,P.token),U(o);const x=P.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(_=window.showToast)==null||_.call(window,`Operator aktif: ${P.user.name} (${P.user.role})${x}`,"success"),typeof t=="function"&&t(P.user);return}else if(b||i.length>=6){const x=p().count+1;x>=5?(l(x,Date.now()+6e4),I&&(I.textContent="PIN salah 5x! Sistem terkunci 60 detik.")):(l(x,0),I&&(I.textContent=`${P.error||"PIN salah!"} (Sisa percobaan: ${5-x})`)),i="",u();return}}b&&i.length<4&&(I&&(I.textContent="Masukkan minimal 4 digit PIN"),i="",u())},v=()=>{var y;document.querySelectorAll(".btn-select-operator").forEach(h=>{h.addEventListener("click",()=>{n=h.getAttribute("data-id"),i="";const I=document.getElementById(o);I&&(I.innerHTML=d(),v())})}),document.querySelectorAll(".btn-numpad").forEach(h=>{h.addEventListener("click",()=>{const I=h.getAttribute("data-val"),_=document.getElementById("pin-error-msg");_&&(_.textContent=""),I==="clear"?(i="",u()):I==="submit"?g(!0):i.length<6&&(i+=I,u(),g(!1))})}),(y=document.getElementById("btn-cancel-login"))==null||y.addEventListener("click",()=>{U(o)});const b=h=>{if(!document.getElementById(o)){window.removeEventListener("keydown",b);return}["INPUT","TEXTAREA"].includes(h.target.tagName)||(h.key>="0"&&h.key<="9"?(h.preventDefault(),i.length<6&&(i+=h.key,u(),g(!1))):h.key==="Backspace"?(h.preventDefault(),i=i.slice(0,-1),u()):h.key==="Enter"?(h.preventDefault(),g(!0)):h.key==="Escape"&&!a&&(h.preventDefault(),U(o)))};window.addEventListener("keydown",b)};v()};let Ut=[],re="all",$t="",Y=1;const Zt=10,ns=[{id:"all",label:"Semua"},{id:"Rumah Tangga",label:"🏠 Rumah Tangga"},{id:"Kantor/Instansi",label:"🏢 Kantor/Instansi"},{id:"Warung/Reseller",label:"🏪 Warung/Reseller"},{id:"VIP",label:"🌟 VIP"}],ss=async()=>{if(Ut.length){for(const s of Ut)typeof s=="function"&&s();Ut=[]}Ut.push(m.on("customers:change",()=>se())),Ut.push(m.on("transactions:change",()=>se()));const t=()=>{const s=document.getElementById("view-customers");s!=null&&s.classList.contains("active")&&se()};window.addEventListener("resize",t),Ut.push(()=>window.removeEventListener("resize",t));const[a,e]=await Promise.all([X(),gt()]);m.setCustomers(a),m.setTransactions(e),se()},Za=(t,a=[])=>{const e=t.id?String(t.id):null,s=(t.name||"").trim().toLowerCase(),n=(t.phone||"").replace(/\D/g,"");return a.filter(i=>!!(e&&i.customerId&&String(i.customerId)===e||s&&i.customerName&&i.customerName.trim().toLowerCase()===s||n&&i.customerPhone&&i.customerPhone.replace(/\D/g,"")===n)).sort((i,o)=>new Date(o.date)-new Date(i.date))};let Qe=[],tn={};const is=(t,a,e,s)=>{const n=document.getElementById("cust-stat-total");n&&(n.innerHTML=`${t} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">orang</span>`);const i=document.getElementById("cust-stat-debt");i&&(i.textContent=f(a));const o=document.getElementById("cust-stat-galon");o&&(o.innerHTML=`${e} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">galon</span>`);const r=document.getElementById("cust-stat-spent");r&&(r.textContent=f(s))},se=async()=>{var u;const t=document.getElementById("view-customers");if(!t)return;const[a,e]=await Promise.all([X(),gt()]),s={};for(const c of e){const p=[];c.customerId&&p.push(`id:${c.customerId}`),c.customerName&&p.push(`name:${c.customerName.trim().toLowerCase()}`);for(const l of p)s[l]||(s[l]={orders:0,spent:0,debt:0,txIds:new Set}),s[l].txIds.has(c.id)||(s[l].txIds.add(c.id),s[l].orders+=1,s[l].spent+=Number(c.total)||0,c.paymentMethod==="debt"&&(Number(c.remainingDebt)||0)>0&&(s[l].debt+=Number(c.remainingDebt)||0))}Qe=a,tn=s;const n=a.length;let i=0,o=0,r=0;if(a.forEach(c=>{const p=`id:${c.id}`,l=`name:${(c.name||"").trim().toLowerCase()}`,g=s[p],v=s[l],E=Math.max((g==null?void 0:g.debt)||0,(v==null?void 0:v.debt)||0),b=Math.max((g==null?void 0:g.spent)||0,(v==null?void 0:v.spent)||0),y=Math.max(Number(c.totalDebt||0),E),h=Math.max(Number(c.totalSpent||0),b);i+=y,r+=h,o+=Number(c.galonLoaned||0)}),t.querySelector("#cust-search"))is(n,i,o,r);else{t.innerHTML=`
      <!-- Responsive Section Header matching other POS modules -->
      <div class="section-header" style="flex-wrap:wrap;gap:12px;margin-bottom:var(--space-4)">
        <div>
          <h2 class="section-title">
            👥 Manajemen Pelanggan <span id="cust-header-count">${n} total</span>
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
          <div style="font-size:20px;font-weight:800;color:var(--blue-700);margin-top:4px" id="cust-stat-total">${n} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">orang</span></div>
        </div>
        <div class="stat-card">
          <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Sisa Piutang</div>
          <div style="font-size:20px;font-weight:800;color:#dc2626;margin-top:4px" id="cust-stat-debt">${f(i)}</div>
        </div>
        <div class="stat-card">
          <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Galon Dipinjam</div>
          <div style="font-size:20px;font-weight:800;color:#d97706;margin-top:4px" id="cust-stat-galon">${o} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">galon</span></div>
        </div>
        <div class="stat-card">
          <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Akumulasi Omzet (LTV)</div>
          <div style="font-size:20px;font-weight:800;color:#16a34a;margin-top:4px" id="cust-stat-spent">${f(r)}</div>
        </div>
      </div>

      <!-- Filters & Responsive Search Bar (POS Standard Pattern) -->
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px">
        <div class="category-pills" id="cust-category-pills" style="display:flex;flex-wrap:wrap;gap:6px;max-width:100%">
          ${ns.map(l=>`
            <button class="btn btn--sm ${l.id===re?"btn--primary":"btn--secondary"} cat-filter-btn"
                    data-cat="${l.id}" style="border-radius:20px;font-size:12px;padding:5px 12px">
              ${l.label}
            </button>
          `).join("")}
        </div>

        <div style="position:relative;flex:1;min-width:200px;max-width:320px">
          <input type="text" class="input" id="cust-search"
                 placeholder="Cari nama, nomor HP, alamat..."
                 value="${w($t)}"
                 autocomplete="off"
                 style="width:100%;border-radius:20px;padding-left:34px;padding-right:32px;font-size:12px">
          <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--text-muted)">🔍</span>
          <button id="btn-clear-cust-search" type="button" style="display:${$t?"inline-flex":"none"};position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:14px;padding:2px 4px;" title="Hapus pencarian">✕</button>
        </div>
      </div>

      <!-- Dedicated Container for Dynamic Customer List (POS Pattern) -->
      <div id="cust-data-container"></div>

      <!-- Dock Clearance Spacer -->
      <div style="height:48px" aria-hidden="true"></div>
    `,t.querySelectorAll(".cat-filter-btn").forEach(l=>{l.addEventListener("click",()=>{re=l.dataset.cat,Y=1,t.querySelectorAll(".cat-filter-btn").forEach(g=>{const v=g.dataset.cat===re;g.className=`btn btn--sm ${v?"btn--primary":"btn--secondary"} cat-filter-btn`}),Ct()})});const c=document.getElementById("cust-search"),p=document.getElementById("btn-clear-cust-search");c==null||c.addEventListener("input",l=>{$t=l.target.value,Y=1,p&&(p.style.display=$t?"inline-flex":"none"),Ct()}),p==null||p.addEventListener("click",()=>{$t="",Y=1,c&&(c.value="",c.focus()),p.style.display="none",Ct()}),(u=document.getElementById("btn-add-customer"))==null||u.addEventListener("click",()=>{Jt()})}Ct()},Ct=()=>{var c,p;const t=document.getElementById("cust-data-container");if(!t)return;const a=Qe,e=tn,s=a.filter(l=>{const g=re==="all"||l.category===re,v=!$t||(l.name||"").toLowerCase().includes($t.toLowerCase())||(l.phone||"").includes($t)||(l.address||"").toLowerCase().includes($t.toLowerCase());return g&&v}),n=document.getElementById("cust-header-count");n&&(n.textContent=`${a.length} total (${s.length} terfilter)`);const i=s.length,o=Math.max(1,Math.ceil(i/Zt));Y>o&&(Y=o),Y<1&&(Y=1);const r=i===0?0:(Y-1)*Zt+1,d=Math.min(Y*Zt,i),u=s.slice((Y-1)*Zt,Y*Zt);t.innerHTML=`
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
              ${u.length===0?`
                <tr>
                  <td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                    Belum ada data pelanggan yang sesuai filter.
                  </td>
                </tr>
              `:u.map(l=>{const g=`id:${l.id}`,v=`name:${(l.name||"").trim().toLowerCase()}`,E=e[g],b=e[v],y=Math.max((E==null?void 0:E.debt)||0,(b==null?void 0:b.debt)||0),h=Math.max(Number(l.totalDebt||0),y),I=(l.phone||"").replace(/\D/g,""),_=I.startsWith("08")?`62${I.slice(1)}`:I;return`
                  <tr>
                    <td>
                      <div style="font-weight:700;color:var(--text-primary)">${w(l.name)}</div>
                      ${l.creditLimit>0?`<div style="font-size:11px;color:var(--text-muted)">Limit: ${f(l.creditLimit)}</div>`:""}
                    </td>
                    <td>
                      <span class="badge badge--blue">
                        ${w(l.category||"Rumah Tangga")}
                      </span>
                    </td>
                    <td>
                      ${_?`
                        <a href="https://wa.me/${_}" target="_blank" rel="noopener noreferrer"
                           style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                          💬 ${w(l.phone)}
                        </a>
                      `:'<span style="color:var(--text-muted)">-</span>'}
                    </td>
                    <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${w(l.address||"-")}">
                      ${w(l.address||"-")}
                    </td>
                    <td style="text-align:right">
                      ${h>0?`
                        <div style="color:#dc2626;font-weight:800;font-size:13px">${f(h)}</div>
                        <button class="btn btn--sm btn-pay-debt-quick" data-id="${l.id}"
                                style="margin-top:3px;padding:2px 8px;font-size:10px;font-weight:700;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;border-radius:6px;cursor:pointer">
                          💰 Bayar
                        </button>
                      `:'<span style="color:#16a34a;font-weight:700;font-size:12px">Lunas ✅</span>'}
                    </td>
                    <td style="text-align:center">
                      ${l.galonLoaned>0?`
                        <span style="font-weight:800;color:#d97706;background:rgba(245,158,11,0.1);padding:2px 8px;border-radius:8px;font-size:12px">
                          🪣 ${l.galonLoaned}
                        </span>
                      `:'<span style="color:var(--text-muted)">0</span>'}
                    </td>
                    <td style="text-align:center">
                      <div style="display:inline-flex;gap:4px">
                        <button class="btn btn--secondary btn--sm btn-view-360" data-id="${l.id}" title="Detail Profil 360°" style="padding:4px 8px;font-size:11px">
                          🔍 Profil
                        </button>
                        <button class="btn btn--secondary btn--sm btn-edit-cust" data-id="${l.id}" title="Edit Pelanggan" style="padding:4px 8px;font-size:11px">
                          ✏️
                        </button>
                        <button class="btn btn--danger btn--sm btn-del-cust" data-id="${l.id}" title="Hapus Pelanggan" style="padding:4px 8px;font-size:11px">
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
            Menampilkan <strong>${r}-${d}</strong> dari <strong>${i}</strong> pelanggan
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <button class="btn btn--secondary btn--sm" id="cust-prev-page" ${Y<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              ◀ Sebelumnya
            </button>
            <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
              Hal ${Y} / ${o}
            </span>
            <button class="btn btn--secondary btn--sm" id="cust-next-page" ${Y>=o?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              Berikutnya ▶
            </button>
          </div>
        </div>
      </div>
	`,(c=t.querySelector("#cust-prev-page"))==null||c.addEventListener("click",()=>{Y>1&&(Y--,Ct())}),(p=t.querySelector("#cust-next-page"))==null||p.addEventListener("click",()=>{Y<o&&(Y++,Ct())}),t.querySelectorAll(".btn-edit-cust").forEach(l=>{l.addEventListener("click",()=>{const g=l.dataset.id,v=a.find(E=>String(E.id)===String(g));v&&Jt(v)})}),t.querySelectorAll(".btn-del-cust").forEach(l=>{l.addEventListener("click",async()=>{var E;const g=l.dataset.id,v=a.find(b=>String(b.id)===String(g));if(v&&confirm(`Hapus pelanggan "${v.name}"?`)){await jn(v.id);const b=await X();m.setCustomers(b),Qe=b,(E=window.showToast)==null||E.call(window,"Pelanggan berhasil dihapus.","info"),Ct()}})}),t.querySelectorAll(".btn-view-360").forEach(l=>{l.addEventListener("click",()=>{const g=l.dataset.id,v=a.find(E=>String(E.id)===String(g));v&&os(v)})}),t.querySelectorAll(".btn-pay-debt-quick").forEach(l=>{l.addEventListener("click",()=>{const g=l.dataset.id,v=a.find(E=>String(E.id)===String(g));v&&en(v)})})},Jt=(t=null)=>{var s,n,i;const a=!!t,e=`
    <div class="modal-header">
      <h3 class="modal-title">${a?"✏️ Edit Data Pelanggan":"➕ Tambah Pelanggan Baru"}</h3>
      <button class="modal-close" id="modal-cust-close" type="button">✕</button>
    </div>
    <div class="modal-body">
      <form id="cust-form" style="display:flex;flex-direction:column;gap:12px">
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Nama Lengkap *</label>
          <input type="text" class="input" id="cf-name" value="${w((t==null?void 0:t.name)||"")}" placeholder="e.g. Ibu Rina, Kantor PLN..." required maxlength="80">
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
            <input type="tel" class="input" id="cf-phone" value="${w((t==null?void 0:t.phone)||"")}" placeholder="081234567890" required maxlength="20">
          </div>
        </div>
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Alamat Lengkap / Patokan Pengantaran</label>
          <textarea class="input" id="cf-address" rows="2" placeholder="Jl. Anggrek No. 5 Blok C (Pagar Biru)..." maxlength="200">${w((t==null?void 0:t.address)||"")}</textarea>
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
          <input type="text" class="input" id="cf-notes" value="${w((t==null?void 0:t.notes)||"")}" placeholder="e.g. Antar tiap hari Selasa & Jumat" maxlength="150">
        </div>
      </form>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="cust-cancel-btn" type="button">Batal</button>
      <button class="btn btn--primary" id="cust-save-btn" type="button">${a?"💾 Simpan Perubahan":"➕ Tambahkan Pelanggan"}</button>
    </div>
  `;at(e,"modal-cust"),(s=document.getElementById("modal-cust-close"))==null||s.addEventListener("click",()=>U("modal-cust")),(n=document.getElementById("cust-cancel-btn"))==null||n.addEventListener("click",()=>U("modal-cust")),(i=document.getElementById("cust-save-btn"))==null||i.addEventListener("click",async()=>{var y,h,I;const o=document.getElementById("cf-name").value.trim(),r=document.getElementById("cf-phone").value.trim(),d=document.getElementById("cf-category").value,u=document.getElementById("cf-address").value.trim(),c=Math.max(0,Number(document.getElementById("cf-creditLimit").value)||0),p=Math.max(0,Number(document.getElementById("cf-galonLoaned").value)||0),l=document.getElementById("cf-notes").value.trim(),g=document.getElementById("cf-totalDebt"),v=g?Math.max(0,Number(g.value)||0):(t==null?void 0:t.totalDebt)||0;if(!o){(y=window.showToast)==null||y.call(window,"Nama pelanggan wajib diisi!","warning");return}const E={name:o,phone:r,category:d,address:u,creditLimit:c,galonLoaned:p,notes:l,totalOrders:(t==null?void 0:t.totalOrders)||0,totalSpent:(t==null?void 0:t.totalSpent)||0,totalDebt:v};a?(await Qt({...E,id:t.id}),(h=window.showToast)==null||h.call(window,"Data pelanggan berhasil diperbarui!","success")):(await Oa(E),(I=window.showToast)==null||I.call(window,"Pelanggan baru berhasil ditambahkan!","success")),U("modal-cust");const b=await X();m.setCustomers(b)})},os=async t=>{var l,g,v,E;const a=await gt(),e=Za(t,a),s=(t.phone||"").replace(/\D/g,""),n=s.startsWith("08")?`62${s.slice(1)}`:s;let i=0,o=0;e.forEach(b=>{i+=Number(b.total||0),b.paymentMethod==="debt"&&(Number(b.remainingDebt)||0)>0&&(o+=Number(b.remainingDebt||0))});const r=Math.max(Number(t.totalSpent||0),i),d=Math.max(Number(t.totalDebt||0),o),u=Math.max(Number(t.totalOrders||0),e.length),c=encodeURIComponent(`Halo *${t.name}*, ini pengingat dari *${((l=m.state.settings)==null?void 0:l.shopName)||"Blue Mountain"}* terkait sisa piutang Anda sebesar *${f(d)}*. Terima kasih!`),p=`
    <div class="modal-header">
      <div>
        <h3 class="modal-title">👤 Profil Pelanggan 360°</h3>
        <p style="margin:2px 0 0;font-size:12px;color:var(--text-secondary)">${w(t.name)} &bull; ${w(t.category||"Rumah Tangga")}</p>
      </div>
      <button class="modal-close" id="drawer-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="max-height:75vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px">
      <!-- Quick Info Bar -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;background:rgba(0,0,0,0.02);padding:12px;border-radius:10px">
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Transaksi</div>
          <div style="font-size:16px;font-weight:900;color:var(--blue-600)">${u} kali</div>
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
        <div><strong>📍 Alamat:</strong> ${w(t.address||"-")}</div>
        <div><strong>📞 WhatsApp:</strong> ${w(t.phone||"-")}</div>
        <div><strong>💳 Limit Kredit:</strong> ${t.creditLimit>0?f(t.creditLimit):"Tanpa batas"}</div>
        ${t.notes?`<div><strong>📝 Catatan:</strong> ${w(t.notes)}</div>`:""}
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
          <a href="https://wa.me/${n}?text=${c}" target="_blank" rel="noopener noreferrer"
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
                ${e.slice(0,20).map(b=>{const y=Number(b.remainingDebt)||0;return`
                    <tr style="border-bottom:1px solid var(--card-border)">
                      <td style="padding:8px 12px;font-weight:700;white-space:nowrap">${w(b.invoiceNo)}</td>
                      <td style="padding:8px 12px;white-space:nowrap">${St(new Date(b.date))}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:700;white-space:nowrap">${f(b.total)}</td>
                      <td style="padding:8px 12px;text-align:center;white-space:nowrap">
                        <span class="badge" style="font-size:10px;text-transform:uppercase">${w(b.paymentStatus||b.paymentMethod)}</span>
                      </td>
                      <td style="padding:8px 12px;text-align:right;white-space:nowrap">
                        ${y>0?`
                          <strong style="color:var(--color-danger)">${f(y)}</strong>
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
  `;at(p,"modal-cust-360"),(g=document.getElementById("drawer-close-btn"))==null||g.addEventListener("click",()=>U("modal-cust-360")),(v=document.getElementById("drawer-ok-btn"))==null||v.addEventListener("click",()=>U("modal-cust-360")),(E=document.getElementById("btn-drawer-pay-debt"))==null||E.addEventListener("click",()=>{U("modal-cust-360"),en(t)})},en=async t=>{var o,r,d,u;const a=await gt(),s=Za(t,a).filter(c=>c.paymentMethod==="debt"&&(Number(c.remainingDebt)||0)>0),n=Math.max(Number(t.totalDebt||0),s.reduce((c,p)=>c+(Number(p.remainingDebt)||0),0));if(n<=0){(o=window.showToast)==null||o.call(window,"Pelanggan ini tidak memiliki sisa piutang.","info");return}const i=`
    <div class="modal-header">
      <h3 class="modal-title">💰 Pembayaran Piutang: ${w(t.name)}</h3>
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
  `;at(i,"modal-pay-customer-debt"),(r=document.getElementById("pcd-close-btn"))==null||r.addEventListener("click",()=>U("modal-pay-customer-debt")),(d=document.getElementById("pcd-cancel-btn"))==null||d.addEventListener("click",()=>U("modal-pay-customer-debt")),document.querySelectorAll(".pcd-quick-amt").forEach(c=>{c.addEventListener("click",()=>{const p=document.getElementById("pcd-amount");p&&(p.value=c.dataset.amt)})}),(u=document.getElementById("pcd-submit-btn"))==null||u.addEventListener("click",async()=>{var l,g,v,E,b,y;const c=Number((l=document.getElementById("pcd-amount"))==null?void 0:l.value)||0,p=((v=(g=document.getElementById("pcd-note"))==null?void 0:g.value)==null?void 0:v.trim())||"Pembayaran piutang";if(c<=0||c>n){(E=window.showToast)==null||E.call(window,`Jumlah pembayaran harus antara Rp 1 dan ${f(n)}`,"warning");return}try{let h=c;const I=new Date().toISOString(),_=[...s].sort((B,T)=>new Date(B.date)-new Date(T.date));for(const B of _){if(h<=0)break;const T=Number(B.remainingDebt)||0,D=Math.min(h,T),O=(Number(B.paidAmount)||0)+D,$=Math.max(0,T-D),K=$===0?"paid":"partial",W=(B.debtPayments||[]).length+1,J=$===0?`${p} (Pelunasan/LUNAS ✅)`:`${p} (Cicilan #${W})`,L=[...B.debtPayments||[],{date:I,amount:D,note:J}],z={...B,paidAmount:O,remainingDebt:$,paymentStatus:K,debtPayments:L};await pe(z),m.updateTransaction(B.id,z),h-=D}const x=(await X()).find(B=>String(B.id)===String(t.id))||t;x.totalDebt=Math.max(0,(Number(x.totalDebt)||0)-c),await Qt(x);const A=await X();m.setCustomers(A),U("modal-pay-customer-debt"),(b=window.showToast)==null||b.call(window,`Pembayaran ${f(c)} untuk ${t.name} berhasil dicatat!`,"success")}catch(h){(y=window.showToast)==null||y.call(window,`Gagal mencatat pembayaran hutang: ${h.message||"Error"}`,"error")}})},wa=t=>{if(t==null)return'""';const a=String(t);return a.includes('"')||a.includes(",")||a.includes(`
`)||a.includes("\r")?`"${a.replace(/"/g,'""')}"`:`"${a}"`},oa=(t,a,e)=>{const s=a.map(wa).join(","),n=e.map(u=>u.map(wa).join(",")),i=`\uFEFF${[s,...n].join(`\r
`)}`,o=new Blob([i],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(o),d=document.createElement("a");d.setAttribute("href",r),d.setAttribute("download",t.endsWith(".csv")?t:`${t}.csv`),d.style.visibility="hidden",document.body.appendChild(d),d.click(),document.body.removeChild(d),setTimeout(()=>URL.revokeObjectURL(r),1e3)};let Oe=null,Ue=null,Re=null,Ft=!1,ht=1,vt=1,wt=1;const Et=10,rs=async()=>{Oe&&Oe(),Ue&&Ue(),Re&&Re(),Oe=m.on("transactions:change",()=>{Ft||rt()}),Ue=m.on("expenses:change",()=>{Ft||rt()}),Re=m.on("customers:change",()=>{Ft||rt()}),await rt()},rt=async()=>{if(!Ft){Ft=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[a,e,s]=await Promise.all([m.state.transactions.length?Promise.resolve(m.state.transactions):gt().then($=>(m.setTransactions($),$)),ue().then($=>(m.setExpenses($),$)),aa("modalAwal")]),n=parseFloat(s)||0;let i=0,o=0,r=0,d=0,u=0;for(const $ of a)if($.paymentMethod==="cash"&&($.paymentStatus==="paid"||!$.paymentStatus)&&(i+=$.total),$.paymentMethod==="transfer"&&($.paymentStatus==="transfer_confirmed"?o+=$.total:d+=$.total),$.paymentMethod==="debt"){for(const K of $.debtPayments||[])r+=K.amount;u+=$.remainingDebt||0}const c=i+o+r,p=e.reduce(($,K)=>$+(K.amount||0),0),l=n+c-p,g=d+u,v=ds(a,e),E=cs(a,e),b=E.reduce(($,K)=>$+(K.debit||0),0),y=E.reduce(($,K)=>$+(K.credit||0),0),h=b===y,I=(m.state.customers||[]).reduce(($,K)=>$+(Number(K.galonLoaned)||0),0),_=[...a.filter($=>$.paymentStatus==="transfer_pending"),...a.filter($=>($.paymentMethod==="debt"||$.paymentStatus==="partial"||$.paymentStatus==="unpaid")&&($.remainingDebt||0)>0)].sort(($,K)=>new Date($.date)-new Date(K.date)),P=Math.max(1,Math.ceil(_.length/Et));ht>P&&(ht=P);const x=_.slice((ht-1)*Et,ht*Et),A=[...e].sort(($,K)=>new Date(K.date)-new Date($.date)),B=Math.max(1,Math.ceil(A.length/Et));vt>B&&(vt=B);const T=A.slice((vt-1)*Et,vt*Et),D=Math.max(1,Math.ceil(E.length/Et));wt>D&&(wt=D);const O=E.slice((wt-1)*Et,wt*Et);t.innerHTML=`
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
          <div class="stat-card__value" style="color:#16a34a">${f(l)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${f(c)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${f(p)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${e.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${f(g)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${_.length} belum lunas</div>
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
            <div style="font-size:18px;font-weight:900;color:var(--color-warning)">${I} <span style="font-size:12px;font-weight:600">galon</span></div>
            <div style="font-size:10px;color:var(--text-muted)">Di ${(m.state.customers||[]).filter($=>($.galonLoaned||0)>0).length} pelanggan</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Nilai Aset Galon Toko</div>
            <div style="font-size:18px;font-weight:900;color:var(--blue-600)">${f(I*45e3)}</div>
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
          ${te("💵 Tunai",i,"#16a34a")}
          ${te("📲 Transfer",o,"#2563eb")}
          ${te("📋 Cicilan Hutang",r,"#7c3aed")}
          ${te("⏳ Transfer Pending",d,"#d97706",!0)}
          ${te("🔴 Piutang Hutang",u,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding Table with Pagination (10/page) -->
      ${_.length>0?`
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
          ⚠️ Daftar Piutang &amp; Cicilan Berjalan (${_.length} transaksi)
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
              ${x.map($=>{const K=$.total||0,W=$.paymentStatus==="transfer_pending"?K:$.remainingDebt||0,J=K-W,L=Math.min(100,Math.max(0,Math.round(J/K*100))),z=($.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${w($.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${w($.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date($.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${f(K)}</td>
                <td style="color:#16a34a;font-weight:700">${f(J)}</td>
                <td style="font-weight:800;color:#dc2626">${f(W)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${L}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${z>0?`${z}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${L}%;background:${L===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${$.paymentStatus==="transfer_pending"?`
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${$.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>`:`
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${$.id}"
                      style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      💰 Cicil / Pelunasan
                    </button>`}
                </td>
              </tr>`}).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${ht} dari ${P}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="piutang-prev" ${ht<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="piutang-next" ${ht>=P?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
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
                ${T.map($=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date($.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${w($.category||"Lainnya")}</span></td>
                  <td>${w($.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${f($.amount)}</td>
                  <td>
                    <button class="btn btn--sm" data-action="delete-expense" data-id="${$.id}"
                      style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
            <div style="font-size:12px;color:var(--text-muted)">Hal ${vt} dari ${B}</div>
            <div style="display:flex;gap:6px">
              <button class="btn btn--secondary btn--sm" id="exp-prev" ${vt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
              <button class="btn btn--secondary btn--sm" id="exp-next" ${vt>=B?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
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
              ${ls(v,n)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Jurnal Entri with Pagination (10/page) -->
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
            📒 Jurnal Entri Akuntansi SAK EMKM (${E.length} baris)
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badge" style="background:${h?"#dcfce7":"#fee2e2"};color:${h?"#166534":"#991b1b"};border:1px solid ${h?"#86efac":"#fca5a5"};font-size:11px;font-weight:700;padding:4px 10px">
              ⚖️ Debit: ${f(b)} | Kredit: ${f(y)} (${h?"Seimbang ✅":"Selisih ⚠️"})
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
              ${O.map($=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date($.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${w($.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${$.debit>0?f($.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${$.credit>0?f($.credit):"—"}</td>
                <td><span class="badge ${$.type==="kas"?"badge--green":$.type==="piutang"?"":"badge--blue"}"
                  style="${$.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${w($.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${wt} dari ${D}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="journal-prev" ${wt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="journal-next" ${wt>=D?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>
    `,ps(a,e,E)}finally{Ft=!1}}},te=(t,a,e,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${e}">${f(a)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,ds=(t,a)=>{const e={};for(const n of t){const i=n.dateKey;if(i){if(e[i]||(e[i]={masuk:0,keluar:0}),n.paymentMethod==="cash"&&(n.paymentStatus==="paid"||!n.paymentStatus)&&(e[i].masuk+=n.total),n.paymentMethod==="transfer"&&n.paymentStatus==="transfer_confirmed"){const o=n.confirmedAt?n.confirmedAt.split("T")[0]:i;e[o]||(e[o]={masuk:0,keluar:0}),e[o].masuk+=n.total}if(n.paymentMethod==="debt")for(const o of n.debtPayments||[]){const r=o.date?o.date.split("T")[0]:i;e[r]||(e[r]={masuk:0,keluar:0}),e[r].masuk+=o.amount}}}for(const n of a){const i=n.dateKey||(n.date?n.date.split("T")[0]:null);i&&(e[i]||(e[i]={masuk:0,keluar:0}),e[i].keluar+=n.amount||0)}const s=[];for(let n=29;n>=0;n--){const i=new Date;i.setDate(i.getDate()-n);const o=ot(i);s.push({key:o,...e[o]||{masuk:0,keluar:0}})}return s},ls=(t,a)=>{let e=a;const s=t.filter(n=>n.masuk>0||n.keluar>0).map(n=>{const i=n.masuk-n.keluar;return e+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(n.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${n.masuk>0?f(n.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${n.keluar>0?f(n.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${f(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${f(e)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},cs=(t,a)=>{const e=[];for(const s of t){const n=w(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")e.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1001] Kas Toko / [4001] Pendapatan Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?e.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1002] Bank Transfer & QRIS / [4001] Pendapatan",type:"kas"}):e.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${n}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"[1101] Piutang Transfer / [4001] Pendapatan",type:"piutang"});else if(s.paymentMethod==="debt"){e.push({date:s.date,desc:`Penjualan Kredit/Tempo — ${s.invoiceNo} (${n}) [Total: ${f(s.total)}]`,debit:s.total,credit:s.total,account:"[1101] Piutang Usaha / [4001] Pendapatan",type:"piutang"});const i=s.debtPayments||[];let o=0;i.forEach((r,d)=>{o+=r.amount||0;const u=Math.max(0,s.total-o),c=u===0,p=d+1,l=c?`Pelunasan Piutang (#${p}/LUNAS ✅)`:`Cicilan Piutang #${p} (dari ${i.length})`,g=r.note?` — ${w(r.note)}`:"";e.push({date:r.date,desc:`${l} — ${s.invoiceNo} (${n})${g} [Bayar: ${f(r.amount)} | Sisa: ${f(u)}]`,debit:r.amount,credit:r.amount,account:c?"[1001] Kas Toko / [1101] Piutang (LUNAS ✅)":"[1001] Kas Toko / [1101] Piutang Usaha",type:"kas"})})}}for(const s of a){const n=(s.category||"").toLowerCase();let i="[6099] Beban Operasional";n.includes("tutup")||n.includes("tisu")||n.includes("galon")||n.includes("bahan")?i="[6001] Beban Tutup & Tisu":n.includes("listrik")||n.includes("air")||n.includes("utilitas")?i="[6002] Beban Utilitas/Listrik":n.includes("gaji")||n.includes("upah")?i="[6003] Beban Gaji Karyawan":(n.includes("bensin")||n.includes("antar")||n.includes("transport"))&&(i="[6004] Beban Transportasi"),e.push({date:s.date,desc:`Beban ${w(s.category||"Operasional")} — ${w(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`${i} / [1001] Kas Toko`,type:"beban"})}return e.sort((s,n)=>new Date(n.date)-new Date(s.date))},ps=(t,a=[],e=[])=>{var s,n,i,o,r,d,u,c,p,l,g,v;(s=document.getElementById("btn-refresh-finance"))==null||s.addEventListener("click",rt),(n=document.getElementById("piutang-prev"))==null||n.addEventListener("click",()=>{ht>1&&(ht--,rt())}),(i=document.getElementById("piutang-next"))==null||i.addEventListener("click",()=>{ht++,rt()}),(o=document.getElementById("exp-prev"))==null||o.addEventListener("click",()=>{vt>1&&(vt--,rt())}),(r=document.getElementById("exp-next"))==null||r.addEventListener("click",()=>{vt++,rt()}),(d=document.getElementById("journal-prev"))==null||d.addEventListener("click",()=>{wt>1&&(wt--,rt())}),(u=document.getElementById("journal-next"))==null||u.addEventListener("click",()=>{wt++,rt()}),(c=document.getElementById("btn-export-journal-csv"))==null||c.addEventListener("click",()=>{var h;const E=["Tanggal","Keterangan","Debit","Kredit","Bagan Akun COA"],b=e.map(I=>[St(new Date(I.date)),I.desc||"",I.debit||0,I.credit||0,I.account||""]),y=ot();oa(`Jurnal-Akuntansi-${y}.csv`,E,b),(h=window.showToast)==null||h.call(window,"✅ Jurnal akuntansi berhasil diekspor ke file CSV/Excel!","success")}),(p=document.getElementById("btn-set-modal-awal"))==null||p.addEventListener("click",()=>{const b=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${m.state.settings.modalAwal||0||""}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;at(b,"modal-awal"),setTimeout(()=>{var y,h,I;(y=document.getElementById("ma-x"))==null||y.addEventListener("click",()=>U("modal-awal")),(h=document.getElementById("ma-cancel"))==null||h.addEventListener("click",()=>U("modal-awal")),(I=document.getElementById("ma-save"))==null||I.addEventListener("click",async()=>{var P;const _=parseFloat((P=document.getElementById("modal-awal-input"))==null?void 0:P.value)||0;await ja("modalAwal",_),m.updateSettings({modalAwal:_}),U("modal-awal"),window.showToast("Modal Awal disimpan!","success"),rt()})},0)}),(l=document.getElementById("btn-add-expense"))==null||l.addEventListener("click",()=>{const b=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(y=>`<option value="${w(y)}">${w(y)}</option>`).join("")}
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
    `;at(b,"expense-modal"),setTimeout(()=>{var y,h,I;(y=document.getElementById("exp-x"))==null||y.addEventListener("click",()=>U("expense-modal")),(h=document.getElementById("exp-cancel"))==null||h.addEventListener("click",()=>U("expense-modal")),(I=document.getElementById("exp-save"))==null||I.addEventListener("click",async()=>{var T,D,O,$;const _=parseFloat((T=document.getElementById("exp-amount"))==null?void 0:T.value)||0,P=((D=document.getElementById("exp-category"))==null?void 0:D.value)||"Lainnya",x=(($=(O=document.getElementById("exp-note"))==null?void 0:O.value)==null?void 0:$.trim())||"";if(_<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const A=new Date().toISOString(),B={date:A,dateKey:A.split("T")[0],category:P,note:x,amount:_};try{const K=await Fn(B);B.id=K,m.addExpense(B),U("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch{window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(g=document.getElementById("expense-table"))==null||g.addEventListener("click",async E=>{const b=E.target.closest('[data-action="delete-expense"]');if(!b||!confirm("Hapus pengeluaran ini?"))return;const y=String(b.dataset.id),h=Number.isNaN(Number(y))?y:Number(y);try{await Gn(h),m.removeExpense(h),window.showToast("Pengeluaran dihapus","success")}catch{window.showToast("Gagal hapus","error")}}),(v=document.getElementById("piutang-table"))==null||v.addEventListener("click",async E=>{const b=E.target.closest("[data-action]");if(!b)return;const y=String(b.dataset.id),h=Number.isNaN(Number(y))?y:Number(y),I=b.dataset.action,_=(m.state.transactions||t).find(P=>String(P.id)===y);if(_){if(I==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${f(_.total)} dari ${w(_.customerName||"pelanggan")} sudah diterima?`))return;const P={..._,paymentStatus:"transfer_confirmed",paidAmount:_.total,confirmedAt:new Date().toISOString()};try{await pe(P),m.updateTransaction(h,{paymentStatus:"transfer_confirmed",paidAmount:_.total,confirmedAt:P.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}}if(I==="pay-debt"){const P=_.remainingDebt||0,x=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${f(_.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${f(P)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${P}" min="1" max="${P}" step="1000" inputmode="numeric">
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
      `;at(x,"mini-cicil"),setTimeout(()=>{var A,B,T;(A=document.getElementById("mc-x"))==null||A.addEventListener("click",()=>U("mini-cicil")),(B=document.getElementById("mc-cancel"))==null||B.addEventListener("click",()=>U("mini-cicil")),(T=document.getElementById("mc-save"))==null||T.addEventListener("click",async()=>{var Q,j,S;const D=parseFloat((Q=document.getElementById("mc-amount"))==null?void 0:Q.value)||0;if(D<=0||D>P){window.showToast("Jumlah tidak valid","warning");return}const O=(_.paidAmount||0)+D,$=Math.max(0,P-D),K=$===0?"paid":"partial",W=(_.debtPayments||[]).length+1,J=$===0?`Pelunasan (#${W}/LUNAS ✅)`:`Cicilan #${W}`,L=((S=(j=document.getElementById("mc-note"))==null?void 0:j.value)==null?void 0:S.trim())||J,z=[..._.debtPayments||[],{date:new Date().toISOString(),amount:D,note:L}],V={..._,paidAmount:O,remainingDebt:$,paymentStatus:K,debtPayments:z};try{if(await pe(V),m.updateTransaction(h,{paidAmount:O,remainingDebt:$,paymentStatus:K,debtPayments:z}),_.customerId||_.customerName){const C=(await X()).find(M=>_.customerId&&String(M.id)===String(_.customerId)||(M.name||"").trim().toLowerCase()===(_.customerName||"").trim().toLowerCase());if(C){C.totalDebt=Math.max(0,(Number(C.totalDebt)||0)-D),await Qt(C);const M=await X();m.setCustomers(M)}}U("mini-cicil"),window.showToast($===0?"🎉 Hutang LUNAS!":`Cicilan #${W} (${f(D)}) dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)}}})};let mt=[],At=null,Z="",xe=!1,xa=!1,Xe=!1;const he={owner:{label:"👑 Owner",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},us=async()=>{Z="",xe=!1,await Vt(),gs(),m.on("users:change",()=>{const t=document.getElementById("view-login");t!=null&&t.classList.contains("active")&&Vt()})},Vt=async()=>{var s;const t=document.getElementById("view-login");if(!t)return;navigator.onLine&&Mt().catch(n=>{});let a=await kt();if(mt=a.filter(n=>n.isActive!==!1),mt.length===0&&(await na(),a=await kt(),mt=a.filter(n=>n.isActive!==!1)),mt.length===0||Xe){t.innerHTML=`
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
            ${mt.length>0?`
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
    `;const n=document.getElementById("form-manual-login");n==null||n.addEventListener("submit",async i=>{var p,l;i.preventDefault();const o=document.getElementById("manual-login-username").value.trim(),r=document.getElementById("manual-login-pin").value.trim(),d=document.getElementById("manual-login-error"),u=document.getElementById("btn-submit-manual-login");if(d&&(d.style.display="none"),!o||!r)return;u&&(u.disabled=!0,u.textContent="Memverifikasi...");const c=await ea(o,r);if(u&&(u.disabled=!1,u.textContent="Masuk Sekarang ➔"),c.success){m.login(c.user,c.token);const g=c.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(p=window.showToast)==null||p.call(window,`Berhasil masuk sebagai ${c.user.name} (${c.user.role})${g}`,"success"),navigator.onLine&&Gt().catch(v=>{}),typeof window.appNavigateTo=="function"?window.appNavigateTo("pos"):(l=document.getElementById("dock-pos"))==null||l.click()}else d&&(d.textContent=c.error||"Username atau PIN salah.",d.style.display="block")}),(s=document.getElementById("btn-back-to-list"))==null||s.addEventListener("click",()=>{Xe=!1,Vt()});return}(!At||!mt.some(n=>String(n.id)===String(At)))&&(At=mt[0].id);const e=mt.find(n=>String(n.id)===String(At))||mt[0];he[e.role]||he.cashier,t.innerHTML=`
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
            ${mt.map(n=>{const i=String(n.id)===String(At),o=he[n.role]||he.cashier;return`
                <button type="button" class="btn-login-op ${i?"selected":""}" data-id="${n.id}">
                  <div class="login-op-avatar" style="background: ${o.color};">
                    ${(n.name||"U").charAt(0).toUpperCase()}
                  </div>
                  <div style="text-align: left;">
                    <div class="login-op-name">${w(n.name)}</div>
                    <div class="login-op-role" style="color: ${o.color};">${o.label}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Selected User Prompt -->
        <div>
          <div class="login-prompt-box">
            <span>🔑</span> Masukkan <strong>6 digit PIN</strong> untuk <strong>${w(e.name)}</strong>
          </div>
        </div>

        <!-- PIN Dots Display -->
        <div class="login-pin-box" id="login-pin-box">
          <div class="login-pin-dots" id="login-pin-dots">
            ${[0,1,2,3,4,5].map(n=>`
              <span class="pin-dot ${n<Z.length?"filled":""}"></span>
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
  `,ms()},de=()=>{document.querySelectorAll("#login-pin-dots .pin-dot").forEach((a,e)=>{const s=e<Z.length;a.style.background=s?"var(--primary, #2563eb)":"transparent",a.style.transform=s?"scale(1.18)":"scale(1)"})},ka=async(t=!1)=>{var c;if(xe)return;const a=mt.find(p=>String(p.id)===String(At));if(!a)return;const e=document.getElementById("login-error-msg"),s="bm_pin_lockout",n=()=>{try{const p=JSON.parse(localStorage.getItem(s)||"{}");return{count:Number(p.count)||0,until:Number(p.until)||0}}catch{return{count:0,until:0}}},i=(p,l)=>{try{localStorage.setItem(s,JSON.stringify({count:p,until:l}))}catch{}},o=n();if(o.until>Date.now()){const p=Math.ceil((o.until-Date.now())/1e3);e&&(e.textContent=`Sistem terkunci! Tunggu ${p} detik lagi.`),je(),Z="",de();return}if(t&&Z.length<6){e&&(e.textContent=`Masukkan 6 digit PIN (sudah ${Z.length} digit)`),je();return}if(!t&&Z.length!==6)return;xe=!0;const r=document.querySelector(".btn-numpad-key.btn-submit");r&&(r.textContent="⏳");const d=await ea(a.username,Z);if(xe=!1,r&&(r.textContent="✓"),d.success){i(0,0),m.login(d.user,d.token);const p=d.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";if((c=window.showToast)==null||c.call(window,`Berhasil masuk sebagai ${d.user.name} (${d.user.role})${p}`,"success"),Z="",navigator.onLine&&Gt().catch(l=>{}),typeof window.appNavigateTo=="function")window.appNavigateTo("pos");else{const l=document.getElementById("dock-pos");l&&l.click()}return}const u=n().count+1;u>=5?(i(u,Date.now()+6e4),e&&(e.textContent="PIN salah 5 kali berturut-turut! Sistem terkunci 60 detik.")):(i(u,0),e&&(e.textContent=`${d.error||"PIN salah!"} (Sisa percobaan: ${5-u})`)),je(),Z="",de()},je=()=>{const t=document.getElementById("login-pin-box");t&&(t.style.animation="none",t.offsetWidth,t.style.animation="shake 0.4s ease-in-out")},ms=()=>{var t;document.querySelectorAll(".btn-login-op").forEach(a=>{a.addEventListener("click",()=>{At=a.getAttribute("data-id"),Z="",Vt()})}),document.querySelectorAll(".btn-numpad-key").forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-val");ie(e)})}),(t=document.getElementById("btn-toggle-manual"))==null||t.addEventListener("click",()=>{Xe=!0,Vt()})},ie=t=>{const a=document.getElementById("login-error-msg");a&&(a.textContent=""),t==="clear"?(Z="",de()):t==="backspace"?Z.length>0&&(Z=Z.slice(0,-1),de()):t==="submit"?ka(!0):/^[0-9]$/.test(t)&&Z.length<6&&(Z+=t,de(),Z.length===6&&ka(!1))},gs=()=>{xa||(xa=!0,window.addEventListener("keydown",t=>{const a=document.getElementById("view-login");a!=null&&a.classList.contains("active")&&(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||(t.key>="0"&&t.key<="9"?(t.preventDefault(),ie(t.key)):t.key==="Backspace"?(t.preventDefault(),ie("backspace")):t.key==="Enter"?(t.preventDefault(),ie("submit")):t.key==="Escape"&&(t.preventDefault(),ie("clear"))))}))};let Ye="",Ie="Semua",ve=null,Sa=[];const fs=async()=>{const[t,a]=await Promise.all([lt(),X()]);m.setProducts(t),m.setCustomers(a),an(),ve&&ve.abort(),ve=new AbortController;for(const e of Sa)e();Sa=[m.on("cart:change",nn),m.on("products:change",()=>ge()),m.on("selectedCustomer:change",()=>zt()),m.on("customers:change",()=>zt())],hs(ve.signal)},an=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
              value="${m.state.discount||""}" min="0" max="99999999" placeholder="0" inputmode="numeric">
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
  `,ra(),ge(),zt(),nn()},bs=()=>["Semua",...new Set(m.state.products.map(t=>t.category))],ra=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=bs().map(a=>`
    <button class="cat-pill ${a===Ie?"active":""}"
      data-cat="${w(a)}">${w(a)}</button>
  `).join(""))},ge=()=>{const t=document.getElementById("product-grid");if(!t)return;let a=m.state.products;if(Ie!=="Semua"&&(a=a.filter(e=>e.category===Ie)),Ye){const e=Ye.toLowerCase();a=a.filter(s=>{var n;return s.name.toLowerCase().includes(e)||((n=s.sku)==null?void 0:n.toLowerCase().includes(e))})}if(!a.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=a.map(e=>{const s=e.image?`<img src="${w(e.image)}" class="product-card__thumb" alt="${w(e.name)}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;margin-bottom:2px">`:`<div class="product-card__emoji">${e.emoji||"📦"}</div>`;return`
      <div class="product-card" data-id="${e.id}" role="button" tabindex="0"
        aria-label="${w(e.name)} — ${f(e.price)}">
        <span class="product-card__sku" style="font-size:9px;font-weight:700;color:var(--text-muted);background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:4px;padding:1px 4px;margin-bottom:2px">${w(e.sku||`BM-${e.id}`)}</span>
        ${s}
        <div class="product-card__name">${w(e.name)}</div>
        <div class="product-card__price">${f(e.price)}</div>
        <div class="product-card__unit">per ${w(e.unit)}</div>
      </div>
    `}).join(""),t.querySelectorAll(".product-card").forEach(e=>{const s=()=>{const n=e.dataset.id,i=m.state.products.find(o=>String(o.id)===String(n));i&&(m.addToCart(i),e.style.transform="scale(0.94)",setTimeout(()=>{e.style.transform=""},120))};e.addEventListener("click",s),e.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),s())})})},nn=()=>{const t=document.getElementById("cart-items"),a=document.getElementById("cart-count"),e=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),n=document.getElementById("tax-row"),i=document.getElementById("customer-name"),o=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=m.state.customerName||""),o&&!o.matches(":focus")&&(o.value=m.state.discount||""),!t)return;const r=m.state.cart;if(a){const d=a.textContent;a.textContent=m.cartCount,d!==String(m.cartCount)&&(a.classList.remove("bump"),a.offsetWidth,a.classList.add("bump"))}if(e&&(e.textContent=f(m.total)),n&&s&&(m.tax>0?(n.style.display="flex",s.textContent=f(m.tax)):n.style.display="none"),!r.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=r.map(d=>{const u=d.product.image?`<img src="${d.product.image}" style="width:20px;height:20px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:4px">`:`${d.product.emoji||""} `;return`
      <div class="cart-item" data-pid="${d.product.id}">
        <div class="cart-item__info">
          <div class="cart-item__name">${u}${w(d.product.name)} <span style="font-size:10px;color:var(--text-muted)">(${w(d.product.sku||`BM-${d.product.id}`)})</span></div>
          <div class="cart-item__price">${f(d.product.price)} / ${w(d.product.unit)}</div>
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
    `}).join(""),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset.pid,c=d.dataset.action,p=m.state.cart.find(l=>String(l.product.id)===String(u));p&&(c==="inc"?m.setQty(p.product.id,p.qty+1):c==="dec"?m.setQty(p.product.id,p.qty-1):c==="remove"&&m.removeFromCart(p.product.id))})})},ys=()=>{const t=`
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
  `;at(t,"manual-item-modal"),setTimeout(()=>{var a,e,s,n;(a=document.getElementById("mi-close"))==null||a.addEventListener("click",()=>U("manual-item-modal")),(e=document.getElementById("mi-cancel"))==null||e.addEventListener("click",()=>U("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(o=>{o.style.borderColor="var(--border-subtle)",o.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(n=document.getElementById("mi-save"))==null||n.addEventListener("click",async()=>{var g,v,E,b,y,h,I;const i=(g=document.getElementById("mi-name"))==null?void 0:g.value.trim(),o=(v=document.getElementById("mi-price"))==null?void 0:v.value,r=parseFloat(o)||0,d=Math.max(1,parseInt((E=document.getElementById("mi-qty"))==null?void 0:E.value,10)||1),u=((b=document.getElementById("mi-unit"))==null?void 0:b.value.trim())||"pcs",c=((y=document.getElementById("mi-category"))==null?void 0:y.value)||"Lainnya",p=((h=document.getElementById("mi-emoji"))==null?void 0:h.value)||"🏷️",l=(I=document.getElementById("mi-save-catalog"))==null?void 0:I.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(o===""||r<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(l){const _=await Ua({name:i,price:r,unit:u,category:c,emoji:p,stock:999}),P=await lt();m.setProducts(P);const x=P.find(A=>A.id===_)||{id:_,name:i,price:r,unit:u,category:c,emoji:p};m.addToCart(x,d),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const _={id:Lt("manual"),name:i,price:r,unit:u,category:c,emoji:p};m.addToCart(_,d),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}U("manual-item-modal")}catch{window.showToast("Gagal menambahkan item manual!","error")}})},0)},hs=t=>{document.addEventListener("click",a=>{const e=a.target.closest(".cat-pill");if(e){Ie=e.dataset.cat,ra(),ge();return}if(a.target.closest("#btn-manual-item")){ys();return}if(a.target.closest("#btn-pay-cash")){if(!m.state.cart.length){window.showToast("Keranjang kosong!","warning");return}De("cash")}if(a.target.closest("#btn-pay-transfer")){if(!m.state.cart.length){window.showToast("Keranjang kosong!","warning");return}De("transfer")}if(a.target.closest("#btn-pay-debt")){if(!m.state.cart.length){window.showToast("Keranjang kosong!","warning");return}De("debt")}a.target.closest("#btn-clear-cart")&&m.state.cart.length&&(m.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",a=>{var e;if(a.target.id==="pos-search"&&(Ye=a.target.value.trim(),ge()),a.target.id==="discount-input"&&m.setDiscount(parseFloat(a.target.value)||0),a.target.id==="customer-name"){const s=a.target.value.trim().toLowerCase();m.setCustomerName(a.target.value);const n=document.getElementById("cust-autocomplete-dropdown");if(!n)return;if(!s){n.style.display="none";return}const i=(m.state.customers||[]).filter(o=>(o.name||"").toLowerCase().includes(s)||(o.phone||"").includes(s)).slice(0,6);if(i.length===0){n.innerHTML=`
          <div style="padding:12px;font-size:12px;color:#64748b;display:flex;justify-content:space-between;align-items:center;background:#ffffff">
            <span>Pelanggan belum terdaftar</span>
            <button type="button" class="btn btn--sm btn--primary" id="btn-dropdown-quick-add" style="font-size:11px;padding:3px 10px;font-weight:700">
              ➕ Tambahkan
            </button>
          </div>
        `,n.style.display="block",(e=n.querySelector("#btn-dropdown-quick-add"))==null||e.addEventListener("click",()=>{n.style.display="none",Jt({name:a.target.value.trim()})});return}n.innerHTML=i.map(o=>`
        <div class="cust-option" data-id="${o.id}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:12px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;transition:background 100ms ease">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;color:#1e293b">${w(o.name)} <span class="badge" style="font-size:10px;font-weight:700;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px">${w(o.category||"Umum")}</span></div>
            <div style="font-size:11px;color:#64748b;margin-top:2px">📱 ${w(o.phone||"-")} ${o.address?`&bull; 📍 ${w(o.address)}`:""}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:8px">
            ${o.totalDebt>0?`<span style="color:#dc2626;font-weight:800;font-size:11px;display:block">Hutang: ${f(o.totalDebt)}</span>`:""}
            <span style="font-size:10px;color:#2563eb;font-weight:700">Pilih ➔</span>
          </div>
        </div>
      `).join(""),n.style.display="block",n.querySelectorAll(".cust-option").forEach(o=>{o.addEventListener("mouseenter",()=>{o.style.background="#f8fafc"}),o.addEventListener("mouseleave",()=>{o.style.background="#ffffff"}),o.addEventListener("click",()=>{const r=o.dataset.id,d=m.state.customers.find(u=>String(u.id)===String(r));d&&m.setSelectedCustomer(d),n.style.display="none",zt()})})}},{signal:t}),document.addEventListener("click",a=>{const e=document.getElementById("cust-autocomplete-dropdown");e&&!a.target.closest("#customer-row-container")&&(e.style.display="none")},{signal:t})},zt=()=>{var e,s,n,i;const t=document.getElementById("customer-row-container");if(!t)return;const a=m.state.selectedCustomer;a?(t.innerHTML=`
      <div class="selected-customer-chip" style="display:flex;align-items:center;justify-content:space-between;background:#eff6ff;border:1.5px solid #93c5fd;border-radius:10px;padding:8px 12px;margin:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <span style="font-size:18px;flex-shrink:0">👤</span>
          <div style="min-width:0">
            <div style="font-weight:800;font-size:13px;color:#1e3a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${w(a.name)} <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:6px;font-weight:700">${w(a.category||"Umum")}</span>
            </div>
            <div style="font-size:11px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              📱 ${w(a.phone||"-")} ${a.totalDebt>0?`&bull; <span style="color:#dc2626;font-weight:800">Hutang: ${f(a.totalDebt)}</span>`:""}
            </div>
          </div>
        </div>
        <button type="button" id="btn-clear-selected-cust" title="Kosongkan / Ganti Pelanggan" style="border-radius:50%;width:26px;height:26px;min-width:26px;padding:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#dc2626;background:#fee2e2;border:1px solid #fca5a5;cursor:pointer">
          ✕
        </button>
      </div>
    `,(e=t.querySelector("#btn-clear-selected-cust"))==null||e.addEventListener("click",()=>{m.setSelectedCustomer(null),m.setCustomerName(""),zt()})):(t.innerHTML=`
      <div style="padding:8px 12px;display:flex;align-items:center;gap:6px;position:relative">
        <span style="font-size:16px;flex-shrink:0">👤</span>
        <div style="position:relative;flex:1;min-width:0">
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Cari nama / HP pelanggan..." maxlength="80" autocomplete="off"
            value="${w(m.state.customerName||"")}"
            style="width:100%;padding:6px 24px 6px 8px;font-size:12px;border:1px solid var(--border-default);border-radius:8px">
          ${m.state.customerName?`
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
    `,(s=t.querySelector("#btn-clear-typed-name"))==null||s.addEventListener("click",()=>{m.setCustomerName(""),zt()}),(n=t.querySelector("#btn-pick-cust"))==null||n.addEventListener("click",()=>{vs()}),(i=t.querySelector("#btn-quick-add-cust"))==null||i.addEventListener("click",()=>{Jt()}))},vs=()=>{var r,d,u;const t=m.state.customers||[];let a="";const e=c=>{const p=c.trim().toLowerCase(),l=t.filter(g=>!p||(g.name||"").toLowerCase().includes(p)||(g.phone||"").includes(p)||(g.category||"").toLowerCase().includes(p));return l.length===0?`
        <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">
          Pelanggan tidak ditemukan.<br>
          <button type="button" class="btn btn--primary btn--sm" id="btn-picker-add-new" style="margin-top:10px">
            ➕ Tambah Pelanggan "${w(c)}"
          </button>
        </div>
      `:`
      <div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;padding-right:4px">
        ${l.map(g=>`
          <div class="picker-cust-row" data-id="${g.id}" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 120ms ease">
            <div style="min-width:0;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <strong style="font-size:13px;color:#1e293b">${w(g.name)}</strong>
                <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px;font-weight:700">${w(g.category||"Umum")}</span>
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px">
                📱 ${w(g.phone||"-")} ${g.address?`&bull; 📍 ${w(g.address)}`:""}
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:10px">
              ${g.totalDebt>0?`<div style="font-size:11px;font-weight:800;color:#dc2626">Hutang: ${f(g.totalDebt)}</div>`:""}
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
  `;at(s,"modal-customer-picker");const n=document.getElementById("picker-list-container"),i=document.getElementById("picker-search"),o=()=>{var c;n==null||n.querySelectorAll(".picker-cust-row").forEach(p=>{p.addEventListener("mouseenter",()=>{p.style.background="#f0f7ff",p.style.borderColor="#93c5fd"}),p.addEventListener("mouseleave",()=>{p.style.background="#ffffff",p.style.borderColor="#e2e8f0"}),p.addEventListener("click",()=>{const l=p.dataset.id,g=t.find(v=>String(v.id)===String(l));g&&(m.setSelectedCustomer(g),U("modal-customer-picker"),zt())})}),(c=n==null?void 0:n.querySelector("#btn-picker-add-new"))==null||c.addEventListener("click",()=>{var p;U("modal-customer-picker"),Jt({name:(p=i==null?void 0:i.value)==null?void 0:p.trim()})})};o(),i==null||i.addEventListener("input",c=>{a=c.target.value,n&&(n.innerHTML=e(a),o())}),(r=document.getElementById("modal-picker-close"))==null||r.addEventListener("click",()=>U("modal-customer-picker")),(d=document.getElementById("picker-cancel-btn"))==null||d.addEventListener("click",()=>U("modal-customer-picker")),(u=document.getElementById("picker-create-btn"))==null||u.addEventListener("click",()=>{U("modal-customer-picker"),Jt()})},ws=async()=>{const t=document.getElementById("view-pos");t!=null&&t.querySelector(".pos-layout")||an();const a=await lt();m.setProducts(a),ge(),ra()},xs=(t,a=128,e=.85)=>new Promise((s,n)=>{if(!(t!=null&&t.type.startsWith("image/")))return n(new Error("File harus berupa gambar (PNG/JPEG/WebP)"));const i=new FileReader;i.onerror=()=>n(new Error("Gagal membaca file")),i.onload=o=>{const r=new Image;r.onerror=()=>n(new Error("Gagal memuat gambar")),r.onload=()=>{let{width:d,height:u}=r;d>u?d>a&&(u=Math.round(u*a/d),d=a):u>a&&(d=Math.round(d*a/u),u=a);const c=document.createElement("canvas");c.width=d,c.height=u,c.getContext("2d").drawImage(r,0,0,d,u);let l="";try{l=c.toDataURL("image/webp",e)}catch{}l!=null&&l.startsWith("data:image/webp")||(l=c.toDataURL("image/jpeg",e)),s(l)},r.src=o.target.result},i.readAsDataURL(t)}),ks=(t=[])=>{let a=0;for(const s of t)if(s.sku&&typeof s.sku=="string"){const n=s.sku.match(/^BM-(\d+)$/i);if(n){const i=parseInt(n[1],10);i>a&&(a=i)}}const e=a?a+1:t.length+1;return`BM-${String(e).padStart(3,"0")}`},Ea=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],Ss=["Galon","Botol","Layanan","Lainnya"];let Ke=null;const Es=async()=>{Ke&&Ke(),Ke=m.on("products:change",()=>{const t=document.getElementById("view-products");t!=null&&t.classList.contains("active")&&fe()}),await fe()},fe=async()=>{const t=document.getElementById("view-products"),a=await lt();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${a.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${a.length?a.map(e=>$s(e)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,Ts()},$s=t=>{const a=t.image?`<img src="${w(t.image)}" class="product-thumb" alt="${w(t.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;border:1.5px solid var(--border-subtle)">`:`<span class="product-emoji-large">${t.emoji||"📦"}</span>`;return`
    <div class="product-manage-card" data-id="${t.id}">
      <div class="product-manage-card__header">
        ${a}
        <div class="product-manage-card__info">
          <div class="product-manage-card__name">${w(t.name)}</div>
          <div class="product-manage-card__cat" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="badge badge--blue">${w(t.category)}</span>
            <span class="badge" style="background:var(--bg-glass);border:1px solid var(--border-default);font-size:10px;font-weight:700;color:var(--text-secondary)">${w(t.sku||`BM-${t.id}`)}</span>
          </div>
        </div>
      </div>
      <div class="product-manage-card__price">
        ${f(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${w(t.unit)}</span>
        ${t.cost>0?`<div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-top:2px">Modal: ${f(t.cost)} &bull; Margin: ${f(t.price-t.cost)}</div>`:""}
      </div>
      <div class="product-manage-card__actions">
        <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `},Ts=()=>{const t=document.getElementById("products-grid"),a=document.getElementById("btn-add-product");a==null||a.addEventListener("click",async()=>{const e=await lt();$a(null,e)}),t==null||t.addEventListener("click",async e=>{const s=e.target.closest('[data-action="edit"]'),n=e.target.closest('[data-action="delete"]');if(s){const i=String(s.dataset.id),o=await lt(),r=o.find(d=>String(d.id)===i);r&&$a(r,o)}if(n){const i=String(n.dataset.id),o=Number.isNaN(Number(i))?i:Number(i);Is(o)}})},$a=(t=null,a=[])=>{const e=!!t,s=(t==null?void 0:t.sku)||ks(a);let n=(t==null?void 0:t.image)||null;const i=`
    <div class="modal-header">
      <span class="modal-title">${e?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Nama Produk <span style="color:red">*</span></label>
          <input type="text" class="input" id="pf-name"
            value="${w((t==null?void 0:t.name)||"")}"
            placeholder="e.g. Air Mineral 19 L"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group">
          <label class="input-label">Kode / SKU Produk</label>
          <input type="text" class="input" id="pf-sku"
            value="${w(s)}"
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
            value="${w((t==null?void 0:t.unit)||"galon")}"
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
          ${Ss.map(o=>`<option value="${w(o)}" ${(t==null?void 0:t.category)===o?"selected":""}>${w(o)}</option>`).join("")}
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
            ${Ea.map(o=>`
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

        <input type="hidden" id="pf-emoji" value="${w((t==null?void 0:t.emoji)||Ea[0])}">
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
  `;at(i,"product-form"),setTimeout(()=>{var l,g,v,E;(l=document.getElementById("pf-close"))==null||l.addEventListener("click",()=>U("product-form")),(g=document.getElementById("pf-cancel"))==null||g.addEventListener("click",()=>U("product-form"));const o=document.getElementById("btn-tab-emoji"),r=document.getElementById("btn-tab-upload"),d=document.getElementById("box-emoji-picker"),u=document.getElementById("box-upload-picker"),c=document.getElementById("pf-file-input"),p=document.getElementById("pf-img-preview");o==null||o.addEventListener("click",()=>{d.style.display="block",u.style.display="none",o.className="btn btn--sm btn--primary",r.className="btn btn--sm btn--secondary"}),r==null||r.addEventListener("click",()=>{d.style.display="none",u.style.display="block",r.className="btn btn--sm btn--primary",o.className="btn btn--sm btn--secondary"}),c==null||c.addEventListener("change",async b=>{var h;const y=(h=b.target.files)==null?void 0:h[0];if(y)try{n=await xs(y,128,.85),p.innerHTML=`<img src="${w(n)}" style="width:100%;height:100%;object-fit:cover">`,window.showToast("Foto produk berhasil dimuat","success")}catch(I){window.showToast(I.message||"Gagal memproses gambar","error")}}),(v=document.getElementById("btn-remove-img"))==null||v.addEventListener("click",()=>{n=null,p.innerHTML='<span style="font-size:20px;opacity:0.4">🖼️</span>',o.click()}),document.querySelectorAll(".emoji-pick").forEach(b=>{b.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(y=>{y.style.borderColor="var(--border-subtle)",y.classList.remove("emoji-pick--active")}),b.style.borderColor="var(--blue-400)",b.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=b.dataset.emoji,n=null})}),(E=document.getElementById("pf-save"))==null||E.addEventListener("click",async()=>{var B,T,D,O,$,K,W,J;const b=(B=document.getElementById("pf-name"))==null?void 0:B.value.trim(),y=((T=document.getElementById("pf-sku"))==null?void 0:T.value.trim())||s,h=parseFloat((D=document.getElementById("pf-price"))==null?void 0:D.value)||0,I=parseFloat((O=document.getElementById("pf-cost"))==null?void 0:O.value)||0,_=(($=document.getElementById("pf-unit"))==null?void 0:$.value.trim())||"pcs",P=((K=document.getElementById("pf-category"))==null?void 0:K.value)||"Lainnya",x=((W=document.getElementById("pf-emoji"))==null?void 0:W.value)||"📦",A=parseInt((J=document.getElementById("pf-stock"))==null?void 0:J.value,10)||0;if(!b){window.showToast("Nama produk wajib diisi!","warning");return}if(h<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{const L={name:b,sku:y,price:h,cost:I,unit:_,category:P,emoji:x,image:n,stock:A};e?(await Ra({...t,...L}),window.showToast(`Produk [${y}] berhasil diperbarui`,"success")):(await Ua(L),window.showToast(`Produk [${y}] berhasil ditambahkan`,"success")),U("product-form");const z=await lt();m.setProducts(z),await fe()}catch{window.showToast("Gagal menyimpan produk!","error")}})},0)},Is=t=>{at(`
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
  `,"delete-confirm"),setTimeout(()=>{var e,s,n;(e=document.getElementById("dc-close"))==null||e.addEventListener("click",()=>U("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>U("delete-confirm")),(n=document.getElementById("dc-confirm"))==null||n.addEventListener("click",async()=>{try{await Kn(t);const i=await lt();m.setProducts(i),U("delete-confirm"),await fe(),window.showToast("Produk dihapus","success")}catch{window.showToast("Gagal menghapus produk","error")}})},0)};let He=null,ke=null,Se=null,Tt="semua",st=1;const _s=async()=>{He&&He(),He=m.on("transactions:change",t=>{le(t)}),await da()},da=async()=>{const t=await gt();m.setTransactions(t),le(t)},le=t=>{var O,$,K,W,J;const a=document.getElementById("view-reports");if(!a)return;const e=ot(),s=kn(),n=t.filter(L=>L.dateKey===e),i=n.reduce((L,z)=>L+z.total,0);let o=0;t.forEach(L=>{(L.items||[]).forEach(z=>{var Q;const V=Number((Q=z.product)==null?void 0:Q.cost)||0;o+=V*(Number(z.qty)||1)})});const r=t.reduce((L,z)=>L+z.total,0),d=Math.max(0,r-o),u=r>0?(d/r*100).toFixed(1):0,c=n.length,p=t.filter(L=>{var z;return(z=L.dateKey)==null?void 0:z.startsWith(s)}),l=p.reduce((L,z)=>L+z.total,0),g=t.reduce((L,z)=>L+z.total,0),v=n.filter(L=>L.paymentMethod==="cash").reduce((L,z)=>L+z.total,0),E=n.filter(L=>L.paymentMethod==="transfer"&&L.paymentStatus==="transfer_confirmed").reduce((L,z)=>L+z.total,0),b=n.filter(L=>L.paymentMethod==="transfer"&&L.paymentStatus==="transfer_pending").reduce((L,z)=>L+z.total,0),y=n.filter(L=>L.paymentMethod==="debt").reduce((L,z)=>L+z.total,0),h=t.reduce((L,z)=>{for(const V of z.debtPayments||[])V.date&&V.date.split("T")[0]===e&&(L+=V.amount||0);return L},0),I=v+E+h,_=t.reduce((L,z)=>L+(z.remainingDebt||0),0);t.filter(L=>L.paymentStatus==="transfer_pending").reduce((L,z)=>L+z.total,0);const P=Cs(n),x=Bs(t);ke&&(ke.destroy(),ke=null),Se&&(Se.destroy(),Se=null);let A=[...t];Tt==="cash"&&(A=A.filter(L=>L.paymentMethod==="cash")),Tt==="transfer"&&(A=A.filter(L=>L.paymentMethod==="transfer")),Tt==="debt"&&(A=A.filter(L=>L.paymentMethod==="debt"));const B=A.sort((L,z)=>new Date(z.date)-new Date(L.date)),T=Math.max(1,Math.ceil(B.length/10));st>T&&(st=T),st<1&&(st=1);const D=B.slice((st-1)*10,st*10);a.innerHTML=`
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
        <div class="stat-card__trend trend-up">↑ ${c} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${f(I)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${f(h)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${f(_)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${f(l)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${p.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${f(g)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${t.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #059669">
        <span class="stat-card__icon">📈</span>
        <div class="stat-card__value" style="color:#059669">${f(d)}</div>
        <div class="stat-card__label">Estimasi Laba Kotor (Gross Profit)</div>
        <div class="stat-card__trend" style="color:#059669;font-weight:700">Margin: ${u}% (HPP: ${f(o)})</div>
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
            <strong style="color:var(--color-success)">${f(v)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${f(E)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${f(h)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${f(y)}</strong>
          </div>

          ${b>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${f(b)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${v+E+y+h>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${P.length?P.slice(0,7).map((L,z)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${z+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${w(L.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${L.qty}x</span>
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
          <button class="cat-pill ${Tt==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${Tt==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${Tt==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${Tt==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${Ps(D)}
          </tbody>
        </table>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">Hal ${st} dari ${T}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--secondary btn--sm" id="rpt-prev" ${st<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
          <button class="btn btn--secondary btn--sm" id="rpt-next" ${st>=T?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
        </div>
      </div>
    </div>
  `,(O=document.getElementById("btn-refresh-reports"))==null||O.addEventListener("click",da),($=document.getElementById("btn-export-pdf-report"))==null||$.addEventListener("click",()=>As(t,e,s)),(K=document.getElementById("btn-export-csv-report"))==null||K.addEventListener("click",()=>{var Q;const L=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status Pembayaran","Subtotal","Diskon","Pajak","Grand Total","Sisa Piutang"],z=B.map(j=>[St(new Date(j.date)),j.invoiceNo||"",j.cashier||"Admin",j.customerName||"-",j.paymentMethod||"cash",j.paymentStatus||"paid",j.subtotal||0,j.discount||0,j.tax||0,j.total||0,j.remainingDebt||0]),V=ot();oa(`Laporan-Penjualan-${V}.csv`,L,z),(Q=window.showToast)==null||Q.call(window,"✅ Laporan penjualan berhasil diekspor ke Excel/CSV!","success")}),(W=document.getElementById("rpt-prev"))==null||W.addEventListener("click",()=>{st>1&&(st--,le(t))}),(J=document.getElementById("rpt-next"))==null||J.addEventListener("click",()=>{st<T&&(st++,le(t))}),document.querySelectorAll("[data-rpt-filter]").forEach(L=>{L.addEventListener("click",()=>{Tt=L.dataset.rptFilter,st=1,le(t)})}),requestAnimationFrame(()=>Ls(x,v,E,y,h))},Ps=t=>t.length?t.map(a=>{const e=a.total||0;let s=0,n=0;a.paymentMethod==="cash"?s=e:a.paymentMethod==="transfer"?a.paymentStatus==="transfer_confirmed"?s=e:n=e:a.paymentMethod==="debt"&&(s=a.paidAmount||0,n=a.remainingDebt||0);const i=(a.items||[]).map(d=>{var u;return`${((u=d.product)==null?void 0:u.name)||"Item"} (${d.qty}x)`}).join(", "),o=a.paymentMethod==="debt"?n===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${f(n)}</span>`:a.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',r=a.paymentMethod==="cash"?"💵 Tunai":a.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${w(a.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${St(new Date(a.date))}</td>
        <td><strong style="color:var(--text-primary)">${w(a.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${w(i)}">${w(i||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${f(e)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${f(s)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${n>0?f(n):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${r}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>',Ls=async(t,a,e,s,n)=>{const{Chart:i,registerables:o}=await Ee(async()=>{const{Chart:c,registerables:p}=await import("./vendor-chart-BLYve-2S.js");return{Chart:c,registerables:p}},[],import.meta.url);i.register(...o);const r=document.getElementById("chart-bar");r&&(ke=new i(r,{type:"bar",data:{labels:t.map(c=>c.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(c=>c.total),backgroundColor:t.map((c,p)=>p===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${f(c.raw)}`}}},scales:{y:{beginAtZero:!0,ticks:{callback:c=>f(c),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const d=document.getElementById("chart-donut"),u=a+e+s+n;d&&u>0&&(Se=new i(d,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[a,e,s,n],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.label}: ${f(c.raw)}`}}}}}))},As=async(t,a,e)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:n}=await Ee(async()=>{const{jsPDF:x}=await import("./vendor-jspdf-BEqUCB1L.js").then(A=>A.j);return{jsPDF:x}},[],import.meta.url),{default:i}=await Ee(async()=>{const{default:x}=await import("./jspdf.plugin.autotable-CSRlgf-4.js").then(A=>A.j);return{default:x}},__vite__mapDeps([0,1,2]),import.meta.url),o=new n({orientation:"portrait",unit:"mm",format:"a4"}),r=m.state.settings,d=o.internal.pageSize.getWidth();o.setFontSize(16),o.setFont("helvetica","bold"),o.text(r.shopName||"Blue Mountain Refilling Station",d/2,16,{align:"center"}),o.setFontSize(10),o.setFont("helvetica","normal"),o.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",d/2,22,{align:"center"}),o.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,d/2,27,{align:"center"});const u=t.filter(x=>x.dateKey===a),c=u.reduce((x,A)=>x+A.total,0),p=t.filter(x=>{var A;return(A=x.dateKey)==null?void 0:A.startsWith(e)}).reduce((x,A)=>x+A.total,0),l=t.reduce((x,A)=>x+A.total,0),g=u.filter(x=>x.paymentMethod==="cash").reduce((x,A)=>x+A.total,0),v=u.filter(x=>x.paymentMethod==="transfer"&&x.paymentStatus==="transfer_confirmed").reduce((x,A)=>x+A.total,0),E=t.reduce((x,A)=>{for(const B of A.debtPayments||[])B.date&&B.date.split("T")[0]===a&&(x+=B.amount||0);return x},0),b=g+v+E,y=t.reduce((x,A)=>x+(A.remainingDebt||0),0);o.setFontSize(11),o.setFont("helvetica","bold"),o.text("1. Ringkasan Kinerja Keuangan",14,35);const h=[["Omzet Gross Hari Ini",f(c)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",f(b)],["Cicilan Piutang Terkumpul Hari Ini",f(E)],["Total Piutang Belum Lunas (Semua Pelanggan)",f(y)],["Omzet Bulan Ini",f(p)],["Total Omzet All-Time",f(l)],["Jumlah Transaksi Hari Ini",`${u.length} transaksi`]];i(o,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:h,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const I=o.lastAutoTable.finalY+10;o.setFontSize(11),o.setFont("helvetica","bold"),o.text("2. Rincian Riwayat Transaksi & Pelunasan",14,I);const _=[...t].sort((x,A)=>new Date(A.date)-new Date(x.date)).slice(0,80);i(o,{startY:I+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:_.map(x=>{const A=x.paymentMethod==="cash"?x.total:x.paymentMethod==="transfer"?x.paymentStatus==="transfer_confirmed"?x.total:0:x.paidAmount||0,B=x.paymentMethod==="debt"?x.remainingDebt||0:x.paymentStatus==="transfer_pending"?x.total:0;return[x.invoiceNo||"-",new Date(x.date).toLocaleDateString("id-ID"),x.customerName||"—",x.paymentMethod==="cash"?"Tunai":x.paymentMethod==="transfer"?"Transfer":"Hutang",f(x.total),f(A),B>0?f(B):"—",x.paymentMethod==="debt"?B===0?"Lunas":"Cicilan":x.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const P=o.internal.getNumberOfPages();for(let x=1;x<=P;x++)o.setPage(x),o.setFontSize(8),o.setFont("helvetica","normal"),o.text(`Hal ${x} dari ${P} — ${r.shopName||"Blue Mountain POS"}`,d/2,o.internal.pageSize.getHeight()-8,{align:"center"});o.save(`Laporan-Keuangan-${a}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch{window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},Bs=t=>{const a=[];for(let e=6;e>=0;e--){const s=new Date;s.setDate(s.getDate()-e);const n=ot(s),i=t.filter(r=>r.dateKey===n).reduce((r,d)=>r+d.total,0),o=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);a.push({key:n,label:o,total:i})}return a},Cs=t=>{var e;const a={};for(const s of t)for(const n of s.items||[]){if(!((e=n==null?void 0:n.product)!=null&&e.name))continue;const i=n.product.name;a[i]=(a[i]||0)+n.qty}return Object.entries(a).map(([s,n])=>({name:s,qty:n})).sort((s,n)=>n.qty-s.qty)},Ns=async()=>{await zs(),await Ht()},Ms=["shopName","shopAddress","shopPhone","cashierName","receiptFooter","modalAwal","taxRate","bankName","bankNumber","bankHolder","qrisNumber","printerPaper"],zs=async()=>{const t={};for(const a of Ms){const e=await aa(a);e!==null&&(t[a]=e)}m.updateSettings(t)},Ht=async()=>{const t=document.getElementById("view-settings");if(!t)return;const a=m.state.settings,e="1.6.9",s="2ff8537",n="2026-09-14T08:30:43.359Z",i=new Date(n),o=new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"short",year:"numeric"}).format(i),r=new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(i),d=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,u=m.state.currentUser,c=xt(),p=(a.qrisNumber||"").trim(),l=p.length>20&&p.startsWith("000201");t.innerHTML=`
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
            ${w((u==null?void 0:u.name)||"Belum Masuk")}
          </span>
          <span class="badge badge--blue" style="text-transform:uppercase;font-weight:700">
            ${w((u==null?void 0:u.role)||"-")}
          </span>
          <span class="badge badge--green" style="font-size:11px">
            ID: ${w((u==null?void 0:u.username)||"-")}
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
        <input type="text" class="input" id="set-shopName" value="${w(a.shopName||"Blue Mountain Refilling Station")}" maxlength="80" placeholder="Blue Mountain Refilling Station" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat Lengkap Usaha</div>
          <div class="settings-row__desc">Alamat fisik outlet yang dicetak pada bagian atas struk</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${w(a.shopAddress||"")}" maxlength="140" placeholder="Jl. Garuda No. 42, RT 02/RW 05" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon / WhatsApp</div>
          <div class="settings-row__desc">Nomor narahubung pemesanan galon / customer care</div>
        </div>
        <input type="tel" class="input" id="set-shopPhone" value="${w(a.shopPhone||"")}" maxlength="25" placeholder="0812-3456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Label Nama Kasir Default</div>
          <div class="settings-row__desc">Nama kasir fallback yang dicetak di struk bila nama staf tidak terbaca</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${w(a.cashierName||"Kasir")}" maxlength="40" placeholder="Kasir" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Pesan Penutup Struk (Footer)</div>
          <div class="settings-row__desc">Ucapan penutup atau slogan yang dicetak di bagian paling bawah struk thermal</div>
        </div>
        <input type="text" class="input" id="set-receiptFooter" value="${w(a.receiptFooter||"Terima kasih sudah berbelanja!")}" maxlength="80" placeholder="Terima kasih sudah berbelanja!" style="max-width:320px">
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
        <input type="text" class="input" id="set-bankName" value="${w(a.bankName||"BCA")}" maxlength="30" placeholder="BCA / Mandiri / BRI" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
          <div class="settings-row__desc">Nomor rekening tujuan transfer yang tampil di modal bayar &amp; struk</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${w(a.bankNumber||"")}" maxlength="35" placeholder="Contoh: 123-456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Pemilik Rekening (Atas Nama)</div>
          <div class="settings-row__desc">Nama pemilik sah rekening untuk verifikasi pembeli</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${w(a.bankHolder||"")}" maxlength="60" placeholder="Contoh: Fadhilah Ramadhan" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">
            String EMVCo QRIS resmi toko Anda. Sistem otomatis menginjeksi nominal belanja (Tag 54) secara dinamis dengan nol komisi pihak ketiga.
            ${p?l?'<span class="badge badge--green" style="margin-left:6px">✅ Format QRIS Valid</span>':'<span class="badge badge--yellow" style="margin-left:6px">⚠️ Format belum standar EMVCo</span>':""}
          </div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:320px;font-size:11px;font-family:monospace;line-height:1.4" placeholder="0002010102122659...">${w(a.qrisNumber||"")}</textarea>
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
            ${w(c)}
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
            v${w(e)}${` (${w(s)})`}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            Build: ${w(o)} • ${w(r)}
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
  `,Ds()},Ds=()=>{var t,a,e,s,n,i,o,r,d,u,c,p,l,g,v,E;(t=document.getElementById("btn-save-settings"))==null||t.addEventListener("click",async()=>{var L,z,V,Q,j,S,N,C,M,H,q,G,R,F,pt,ft;const b=(L=document.getElementById("set-shopName"))==null?void 0:L.value.trim();if(!b){(z=window.showToast)==null||z.call(window,"Nama toko tidak boleh kosong!","warning"),(V=document.getElementById("set-shopName"))==null||V.focus();return}const y=(Q=document.getElementById("set-shopAddress"))==null?void 0:Q.value.trim(),h=(j=document.getElementById("set-shopPhone"))==null?void 0:j.value.trim(),I=(S=document.getElementById("set-cashierName"))==null?void 0:S.value.trim(),_=(N=document.getElementById("set-receiptFooter"))==null?void 0:N.value.trim(),P=(C=document.getElementById("set-modalAwal"))==null?void 0:C.value,x=Math.max(0,parseInt(P,10)||0),A=(M=document.getElementById("set-taxRate"))==null?void 0:M.value;let B=parseFloat(A)||0;B<0&&(B=0),B>100&&(B=100);const T=(H=document.getElementById("set-bankName"))==null?void 0:H.value.trim(),D=(q=document.getElementById("set-bankNumber"))==null?void 0:q.value.trim(),O=(G=document.getElementById("set-bankHolder"))==null?void 0:G.value.trim(),$=(R=document.getElementById("set-qrisNumber"))==null?void 0:R.value.trim(),K=((F=document.getElementById("set-printerPaper"))==null?void 0:F.value)||"58mm",W={shopName:b,shopAddress:y,shopPhone:h,cashierName:I,receiptFooter:_,modalAwal:x,taxRate:B,bankName:T,bankNumber:D,bankHolder:O,qrisNumber:$,printerPaper:K},J=document.getElementById("btn-save-settings");J&&(J.textContent="⏳ Menyimpan...",J.disabled=!0);try{for(const[bt,la]of Object.entries(W))await ja(bt,la);m.updateSettings(W),(pt=window.showToast)==null||pt.call(window,"✅ Pengaturan toko berhasil disimpan & disinkronkan ke cloud!","success"),setTimeout(()=>Ht(),500)}catch(bt){(ft=window.showToast)==null||ft.call(window,`Gagal menyimpan pengaturan: ${bt.message||"Error"}`,"error")}finally{J&&(J.textContent="💾 Simpan Semua Pengaturan",J.disabled=!1)}}),(a=document.getElementById("btn-settings-switch-op"))==null||a.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))}),(e=document.getElementById("btn-settings-logout"))==null||e.addEventListener("click",()=>{confirm("Kunci kasir dan keluar dari sesi operator saat ini?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(s=document.getElementById("btn-test-48"))==null||s.addEventListener("click",()=>{Me("48mm")}),(n=document.getElementById("btn-test-58"))==null||n.addEventListener("click",()=>{Me("58mm")}),(i=document.getElementById("btn-test-80"))==null||i.addEventListener("click",()=>{Me("80mm")}),(o=document.getElementById("btn-printer-guide"))==null||o.addEventListener("click",()=>{Os()}),(r=document.getElementById("btn-copy-master-key"))==null||r.addEventListener("click",()=>{var y;const b=xt();(y=navigator.clipboard)==null||y.writeText(b).then(()=>{var h;(h=window.showToast)==null||h.call(window,`✅ Master Store ID (${b}) berhasil disalin!`,"success")})}),(d=document.getElementById("btn-set-master-key"))==null||d.addEventListener("click",async()=>{var h;const b=xt(),y=prompt("Masukkan Master Store ID Partisi Toko Anda:",b);y!=null&&y.trim()&&y.trim()!==b&&(En(y.trim()),Ba(),await Gt(),(h=window.showToast)==null||h.call(window,`✅ Terminal dihubungkan ke Store ID: ${y.trim()}`,"success"),Ht())}),(u=document.getElementById("btn-sync-cloud-now"))==null||u.addEventListener("click",async()=>{var y,h;const b=document.getElementById("btn-sync-cloud-now");b&&(b.textContent="🔄 Menyinkronkan...",b.disabled=!0);try{await Gt(),(y=window.showToast)==null||y.call(window,"✅ Semua data, transaksi & akun berhasil disinkronkan!","success"),setTimeout(()=>Ht(),600)}catch(I){(h=window.showToast)==null||h.call(window,`Gagal sinkron cloud: ${I.message||"Error"}`,"error")}finally{b&&(b.textContent="⚡ Sinkronkan Sekarang",b.disabled=!1)}}),(c=document.getElementById("btn-export-backup"))==null||c.addEventListener("click",async()=>{var y,h;const b=document.getElementById("btn-export-backup");b&&(b.textContent="⏳ Menyiapkan...",b.disabled=!0);try{const I=await Jn(),_=JSON.stringify(I,null,2),P=new Blob([_],{type:"application/json;charset=utf-8"}),x=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),B=`Backup-KASIR-${(I.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${x}.json`,T=URL.createObjectURL(P),D=document.createElement("a");D.href=T,D.download=B,document.body.appendChild(D),D.click(),document.body.removeChild(D),setTimeout(()=>URL.revokeObjectURL(T),5e3),(y=window.showToast)==null||y.call(window,"✅ File cadangan berhasil diunduh!","success")}catch(I){(h=window.showToast)==null||h.call(window,`Gagal ekspor cadangan: ${I.message||"Error"}`,"error")}finally{b&&(b.textContent="📥 Unduh Cadangan JSON",b.disabled=!1)}}),(p=document.getElementById("btn-trigger-import"))==null||p.addEventListener("click",()=>{var b;(b=document.getElementById("input-import-backup"))==null||b.click()}),(l=document.getElementById("input-import-backup"))==null||l.addEventListener("change",b=>{var I;const y=(I=b.target.files)==null?void 0:I[0];if(!y)return;const h=new FileReader;h.onload=async _=>{var P,x,A;try{const B=(P=_.target)==null?void 0:P.result,T=JSON.parse(B);if(!T.data||!T.data.products&&!T.data.transactions){(x=window.showToast)==null||x.call(window,"Format file cadangan tidak dikenali!","error");return}const D=(T.data.products||[]).length,O=(T.data.customers||[]).length,$=(T.data.transactions||[]).length,K=(T.data.expenses||[]).length,W=T.exportedAt?new Date(T.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",J=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Pemulihan Cadangan Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>Arsip Cadangan Terverifikasi:</strong><br>
              Toko: <strong>${w(T.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${W}
            </div>

            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:15px;font-weight:900;color:var(--blue-700)">${D}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pelanggan</div>
                <div style="font-size:15px;font-weight:900;color:#8b5cf6">${O}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:15px;font-weight:900;color:#16a34a">${$}</div>
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
        `;at(J,"import-confirm-modal"),setTimeout(()=>{var L,z,V;(L=document.getElementById("imp-x"))==null||L.addEventListener("click",()=>U("import-confirm-modal")),(z=document.getElementById("imp-cancel"))==null||z.addEventListener("click",()=>U("import-confirm-modal")),(V=document.getElementById("imp-confirm"))==null||V.addEventListener("click",async()=>{var S,N,C,M,H,q,G;const Q=((S=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:S.value)||"replace",j=document.getElementById("imp-confirm");j&&(j.textContent="⏳ Memulihkan...",j.disabled=!0);try{await Vn(T,Q);const[R,F,pt,ft]=await Promise.all([lt(),X(),gt(),ue()]);(N=m.setProducts)==null||N.call(m,R),(C=m.setCustomers)==null||C.call(m,F),(M=m.setTransactions)==null||M.call(m,pt),(H=m.setExpenses)==null||H.call(m,ft),U("import-confirm-modal"),(q=window.showToast)==null||q.call(window,"🎉 Data berhasil dipulihkan!","success"),setTimeout(()=>Ht(),600)}catch(R){(G=window.showToast)==null||G.call(window,`Gagal memulihkan data: ${R.message}`,"error")}})},0)}catch{(A=window.showToast)==null||A.call(window,"File JSON cadangan rusak atau tidak terbaca!","error")}},h.readAsText(y),b.target.value=""}),(g=document.getElementById("btn-install-pwa"))==null||g.addEventListener("click",()=>{var b;window._pwaPrompt?window._pwaPrompt.prompt():(b=window.showToast)==null||b.call(window,"Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(v=document.getElementById("btn-clear-cache"))==null||v.addEventListener("click",async()=>{var b,y;try{if("caches"in window){const h=await caches.keys();await Promise.all(h.map(I=>caches.delete(I)))}if("serviceWorker"in navigator){const h=await navigator.serviceWorker.getRegistrations();for(const I of h)await I.unregister()}(b=window.showToast)==null||b.call(window,"Cache browser dibersihkan. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch{(y=window.showToast)==null||y.call(window,"Gagal membersihkan cache","error")}}),(E=document.getElementById("btn-reset-all"))==null||E.addEventListener("click",async()=>{var y,h,I;const b=prompt(`⚠️ PERINGATAN: PEMBERSIHAN CACHE DATA LOKAL

Tindakan ini mengosongkan salinan data offline di browser ini (produk, transaksi, pelanggan, beban).

Ketik kata "HAPUS" dengan huruf besar untuk melanjutkan:`);if(b==="HAPUS")try{await Wn(),(y=window.showToast)==null||y.call(window,"Data lokal dibersihkan. Memuat ulang dari cloud...","info"),setTimeout(()=>window.location.reload(),1500)}catch{(h=window.showToast)==null||h.call(window,"Gagal mengosongkan data lokal","error")}else b!==null&&((I=window.showToast)==null||I.call(window,"Tindakan dibatalkan (konfirmasi tidak sesuai)","info"))})},Os=()=>{at(`
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
  `,"printer-guide"),setTimeout(()=>{var a,e;(a=document.getElementById("pg-close"))==null||a.addEventListener("click",()=>U("printer-guide")),(e=document.getElementById("pg-close2"))==null||e.addEventListener("click",()=>U("printer-guide"))},0)};let qe=null,_t=ot(),Pt=ot(),et=1;const ee=10,Us=async()=>{qe&&qe(),qe=m.on("transactions:change",t=>{Bt(t)}),await sn()},sn=async()=>{const t=await gt();m.setTransactions(t),Bt(t)},on=t=>{const a=t.paymentMethod,e=t.paymentStatus;return a==="transfer"&&e==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':a==="transfer"&&e==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':e==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':e==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},rn=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":w(t.paymentMethod)||"—",Rt=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Rs=t=>[...t].sort((e,s)=>new Date(s.date)-new Date(e.date)).filter(e=>{const s=e.dateKey||(e.date?e.date.split("T")[0]:"");return _t&&Pt?s>=_t&&s<=Pt:_t?s>=_t:Pt?s<=Pt:!0}),Bt=t=>{const a=document.getElementById("view-transactions");if(!a)return;const e=ot(),s=Rs(t),i=t.filter(l=>l.dateKey===e).reduce((l,g)=>g.paymentStatus==="paid"&&g.paymentMethod==="cash"||g.paymentStatus==="transfer_confirmed"?l+g.total:g.paymentMethod==="debt"?l+(g.paidAmount||0):l,0),o=t.reduce((l,g)=>l+(g.remainingDebt||0),0),r=t.filter(l=>l.paymentStatus==="transfer_pending").reduce((l,g)=>l+g.total,0),d=Math.max(1,Math.ceil(s.length/ee));et>d&&(et=d),et<1&&(et=1);const u=s.length===0?0:(et-1)*ee+1,c=Math.min(et*ee,s.length),p=s.slice((et-1)*ee,et*ee);a.innerHTML=`
    <div class="section-header" style="flex-wrap:wrap;gap:12px">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} total (${s.length} terfilter)</span></h2>
      
      <!-- Date Range Filter Toolbar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">Dari:</span>
          <input type="date" class="input" id="tx-filter-start" style="width:auto;padding:6px 10px;font-size:12px" value="${_t}">
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">s/d</span>
          <input type="date" class="input" id="tx-filter-end" style="width:auto;padding:6px 10px;font-size:12px" value="${Pt}">
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
              ${js(p)}
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls (10 rows/page) -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">
            Menampilkan <strong>${u}-${c}</strong> dari <strong>${s.length}</strong> transaksi
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
  `,Ks(t)},js=t=>t.length?t.map(a=>{var e;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${w(a.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${St(new Date(a.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${w(a.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((e=a.items)==null?void 0:e.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${f(a.total)}
        ${(a.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${f(a.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${rn(a)}</span></td>
      <td>${on(a)}</td>
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
            ${Rt(a)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${Rt(a)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${Rt(a)?"var(--color-danger-border)":"#d1d5db"};color:${Rt(a)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${Rt(a)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk rentang tanggal ini</td></tr>',Ks=t=>{var a,e,s,n,i,o,r;(a=document.getElementById("tx-btn-apply"))==null||a.addEventListener("click",()=>{var d,u;_t=((d=document.getElementById("tx-filter-start"))==null?void 0:d.value)||"",Pt=((u=document.getElementById("tx-filter-end"))==null?void 0:u.value)||"",et=1,Bt(t)}),(e=document.getElementById("tx-btn-today"))==null||e.addEventListener("click",()=>{const d=new Date().toISOString().split("T")[0];_t=d,Pt=d,et=1,Bt(t)}),(s=document.getElementById("tx-btn-all"))==null||s.addEventListener("click",()=>{_t="",Pt="",et=1,Bt(t)}),(n=document.getElementById("tx-btn-export-csv"))==null||n.addEventListener("click",()=>{var p;const d=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status","Subtotal","Diskon","Pajak","Total","Dibayar","Kembalian","Sisa Piutang"],u=filtered.map(l=>[St(new Date(l.date)),l.invoiceNo||"",l.cashier||"Admin",l.customerName||"-",l.paymentMethod||"cash",l.paymentStatus||"paid",l.subtotal||0,l.discount||0,l.tax||0,l.total||0,l.paid||0,l.change||0,l.remainingDebt||0]),c=ot();oa(`Transaksi-${c}.csv`,d,u),(p=window.showToast)==null||p.call(window,"✅ Riwayat transaksi berhasil diekspor ke Excel/CSV!","success")}),(i=document.getElementById("tx-prev-page"))==null||i.addEventListener("click",()=>{et>1&&(et--,Bt(t))}),(o=document.getElementById("tx-next-page"))==null||o.addEventListener("click",()=>{et++,Bt(t)}),(r=document.getElementById("tx-table"))==null||r.addEventListener("click",async d=>{var v;const u=d.target.closest("[data-action]");if(!u)return;const c=String(u.dataset.id),p=Number.isNaN(Number(c))?c:Number(c),l=u.dataset.action,g=t.find(E=>String(E.id)===c);if(l==="detail"){g&&qs(g);return}if(l==="confirm-transfer"){if(!g||!confirm(`Konfirmasi transfer ${f(g.total)} dari ${w(g.customerName||"pelanggan")} sudah diterima?`))return;try{const E={...g,paymentStatus:"transfer_confirmed",paidAmount:g.total,confirmedAt:new Date().toISOString()};await pe(E),m.updateTransaction(p,{paymentStatus:"transfer_confirmed",paidAmount:g.total,confirmedAt:E.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}return}if(l==="pay-debt"){g&&Hs(g);return}if(l==="delete"){if(!g)return;if(!Rt(g)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${w(g.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{if(await qn(p),m.removeTransaction(p),g.customerId||g.customerName){const y=(await X()).find(h=>g.customerId&&String(h.id)===String(g.customerId)||(h.name||"").trim().toLowerCase()===(g.customerName||"").trim().toLowerCase());if(y){y.totalOrders=Math.max(0,(Number(y.totalOrders)||1)-1),y.totalSpent=Math.max(0,(Number(y.totalSpent)||g.total)-g.total),g.paymentMethod==="debt"&&(Number(g.remainingDebt)||0)>0&&(y.totalDebt=Math.max(0,(Number(y.totalDebt)||0)-Number(g.remainingDebt))),await Qt(y);const h=await X();m.setCustomers(h)}}for(const b of g.items||[])if((v=b.product)!=null&&v.id){const y=await k.products.get(b.product.id);if(y&&typeof y.stock=="number"){const h=y.stock+(Number(b.qty)||1);await Ra({...y,stock:h})}}const E=await lt();m.setProducts(E),window.showToast("Transaksi dihapus & stok dikembalikan","success")}catch{window.showToast("Gagal menghapus","error")}}})},Hs=t=>{var s;const a=t.remainingDebt||0,e=`
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${w(t.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${w(t.customerName||"—")}</div>
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
            <span>${new Date(n.date).toLocaleDateString("id-ID")} — ${w(n.note||"-")}</span>
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
  `;at(e,"debt-modal"),setTimeout(()=>{var n,i,o;(n=document.getElementById("debt-x"))==null||n.addEventListener("click",()=>U("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>U("debt-modal")),(o=document.getElementById("debt-save"))==null||o.addEventListener("click",async()=>{var b,y,h;const r=parseFloat((b=document.getElementById("cicil-amount"))==null?void 0:b.value)||0;if(r<=0||r>a){window.showToast(`Jumlah cicilan harus antara 1 dan ${f(a)}`,"warning");return}const d=(t.paidAmount||0)+r,u=Math.max(0,a-r),c=u===0?"paid":"partial",p=(t.debtPayments||[]).length+1,l=u===0?`Pelunasan (#${p}/LUNAS ✅)`:`Cicilan #${p}`,g=((h=(y=document.getElementById("cicil-note"))==null?void 0:y.value)==null?void 0:h.trim())||l,v=[...t.debtPayments||[],{date:new Date().toISOString(),amount:r,note:g}],E={...t,paidAmount:d,remainingDebt:u,paymentStatus:c,debtPayments:v};try{if(await pe(E),m.updateTransaction(t.id,{paidAmount:d,remainingDebt:u,paymentStatus:c,debtPayments:v}),t.customerId||t.customerName){const _=(await X()).find(P=>t.customerId&&String(P.id)===String(t.customerId)||(P.name||"").trim().toLowerCase()===(t.customerName||"").trim().toLowerCase());if(_){_.totalDebt=Math.max(0,(Number(_.totalDebt)||0)-r),await Qt(_);const P=await X();m.setCustomers(P)}}U("debt-modal"),window.showToast(u===0?"🎉 Hutang LUNAS!":`Cicilan ${f(r)} dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)},qs=t=>{var i;const a=_e(t,m.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(a)),qa(t);const e=ia(t),s=((i=m.state.settings)==null?void 0:i.printerPaper)||"58mm",n=`
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${w(t.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${on(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${w(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${rn(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${Pe(t,s)}</div>

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
  `;at(n,"tx-detail"),setTimeout(()=>{var o,r,d,u,c,p,l,g;(o=document.getElementById("td-x"))==null||o.addEventListener("click",()=>U("tx-detail")),(r=document.getElementById("td-close-btn"))==null||r.addEventListener("click",()=>U("tx-detail")),(d=document.getElementById("btn-tx-print-direct"))==null||d.addEventListener("click",()=>{me(t)}),(u=document.getElementById("btn-td-ble"))==null||u.addEventListener("click",async()=>{try{window.showToast("Koneksi Bluetooth...","info"),await Xa(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(v){window.showToast(v.message||"Gagal Bluetooth","error")}}),(c=document.getElementById("btn-td-usb"))==null||c.addEventListener("click",async()=>{try{window.showToast("Koneksi USB...","info"),await Ya(t)}catch(v){window.showToast(v.message||"Gagal USB","error")}}),(p=document.getElementById("btn-td-whatsapp"))==null||p.addEventListener("click",()=>{Ja(t)}),(l=document.getElementById("btn-td-btapp"))==null||l.addEventListener("click",()=>{Qa(t)}),(g=document.getElementById("btn-save-png"))==null||g.addEventListener("click",()=>{Va(t)})},0)};let ae=[],jt="",It="all",ne=!1,it=[];const we={owner:{label:"👑 Owner / Pemilik",shortLabel:"Owner",color:"#7c3aed",bg:"rgba(124, 58, 237, 0.10)",border:"rgba(124, 58, 237, 0.25)"},supervisor:{label:"⭐ Supervisor",shortLabel:"Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.10)",border:"rgba(37, 99, 235, 0.25)"},cashier:{label:"👤 Kasir / Staff",shortLabel:"Kasir",color:"#059669",bg:"rgba(5, 150, 105, 0.10)",border:"rgba(5, 150, 105, 0.25)"}},Fs=async()=>{if(ae.length){for(const t of ae)typeof t=="function"&&t();ae=[]}ae.push(m.on("users:change",()=>ce())),ae.push(m.on("auth:change",()=>{const t=document.getElementById("view-users");t!=null&&t.classList.contains("active")&&ce()})),await ce()},Ze=()=>{const t=it.length,a=it.filter(g=>g.role==="owner").length,e=it.filter(g=>g.role==="supervisor").length,s=it.filter(g=>g.role==="cashier").length,n=it.filter(g=>g.role==="cashier"&&g.isActive!==!1).length,i=document.getElementById("staff-stat-total");i&&(i.textContent=String(t));const o=document.getElementById("staff-stat-owner");o&&(o.textContent=String(a));const r=document.getElementById("staff-stat-supervisor");r&&(r.textContent=String(e));const d=document.getElementById("staff-stat-cashier");d&&(d.innerHTML=`${n} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">/ ${s}</span>`);const u=document.querySelector("#pill-user-all .pill-count");u&&(u.textContent=String(t));const c=document.querySelector("#pill-user-owner .pill-count");c&&(c.textContent=String(a));const p=document.querySelector("#pill-user-supervisor .pill-count");p&&(p.textContent=String(e));const l=document.querySelector("#pill-user-cashier .pill-count");l&&(l.textContent=String(s))},Ta=t=>{const a=document.getElementById("btn-sync-roster");if(!a)return;a.classList.toggle("is-syncing",t);const e=a.querySelector(".sync-text");e&&(e.textContent=t?"Menyinkronkan...":"Sinkron Roster")},ce=async()=>{var d,u,c;const t=document.getElementById("view-users");if(!t)return;const a=m.state.currentUser;if((a==null?void 0:a.role)!=="owner"){t.innerHTML=`
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
    `,(d=document.getElementById("btn-lock-switch-op"))==null||d.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))});return}it=await kt();const e=it.length,s=it.filter(p=>p.role==="owner").length,n=it.filter(p=>p.role==="supervisor").length,i=it.filter(p=>p.role==="cashier").length,o=it.filter(p=>p.role==="cashier"&&p.isActive!==!1).length;if(t.querySelector("#user-search-input"))Ze();else{t.innerHTML=`
      <div class="staff-view-container">
        <!-- Header Section -->
        <div class="staff-header">
          <div class="staff-header-info">
            <h1>👥 Manajemen Akun & Hak Akses</h1>
            <p>Kontrol hak akses operator kasir, supervisor, dan owner toko dengan enkripsi PIN Salted SHA-256.</p>
          </div>
          <div class="staff-header-actions">
            <button class="btn-staff-action btn-staff-sync ${ne?"is-syncing":""}" id="btn-sync-roster" title="Perbarui dan sinkronkan daftar operator dengan Supabase Cloud">
              <span class="sync-icon">🔄</span>
              <span class="sync-text">${ne?"Menyinkronkan...":"Sinkron Roster"}</span>
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
              <div class="staff-stat-val" id="staff-stat-total">${e}</div>
              <div class="staff-stat-lbl">Total Operator Terdaftar</div>
            </div>
          </div>

          <div class="staff-stat-card">
            <div class="staff-stat-icon" style="background: rgba(124, 58, 237, 0.10); color: #7c3aed;">👑</div>
            <div>
              <div class="staff-stat-val" id="staff-stat-owner">${s}</div>
              <div class="staff-stat-lbl">Owner / Pemilik</div>
            </div>
          </div>

          <div class="staff-stat-card">
            <div class="staff-stat-icon" style="background: rgba(37, 99, 235, 0.10); color: #2563eb;">⭐</div>
            <div>
              <div class="staff-stat-val" id="staff-stat-supervisor">${n}</div>
              <div class="staff-stat-lbl">Supervisor</div>
            </div>
          </div>

          <div class="staff-stat-card">
            <div class="staff-stat-icon" style="background: rgba(5, 150, 105, 0.10); color: #059669;">👤</div>
            <div>
              <div class="staff-stat-val" id="staff-stat-cashier">${o} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">/ ${i}</span></div>
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

        <!-- Toolbar: Search & Role Filter Tabs (Stable DOM Mount) -->
        <div class="staff-toolbar">
          <div class="staff-search-box">
            <span style="font-size: 16px; opacity: 0.6;">🔍</span>
            <input type="text" id="user-search-input" class="staff-search-input" value="${w(jt)}" placeholder="Cari nama atau username operator..." autocomplete="off">
            <button id="btn-clear-user-search" type="button" style="display: ${jt?"inline-flex":"none"}; background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px; padding: 2px 6px;" title="Hapus pencarian">✕</button>
          </div>

          <div class="staff-filter-pills" id="staff-filter-pills">
            <button class="staff-filter-pill ${It==="all"?"active":""}" data-role="all" id="pill-user-all">
              Semua (<span class="pill-count">${e}</span>)
            </button>
            <button class="staff-filter-pill ${It==="owner"?"active":""}" data-role="owner" id="pill-user-owner">
              👑 Owner (<span class="pill-count">${s}</span>)
            </button>
            <button class="staff-filter-pill ${It==="supervisor"?"active":""}" data-role="supervisor" id="pill-user-supervisor">
              ⭐ Supervisor (<span class="pill-count">${n}</span>)
            </button>
            <button class="staff-filter-pill ${It==="cashier"?"active":""}" data-role="cashier" id="pill-user-cashier">
              👤 Kasir (<span class="pill-count">${i}</span>)
            </button>
          </div>
        </div>

        <!-- Dedicated Container for Dynamic Results List (POS Pattern) -->
        <div id="staff-data-container"></div>
      </div>
    `,(u=document.getElementById("btn-sync-roster"))==null||u.addEventListener("click",async()=>{var g,v;if(!ne){ne=!0,Ta(!0);try{const E=await Mt();(g=window.showToast)==null||g.call(window,`Sukses menyinkronkan ${(E==null?void 0:E.length)||0} akun operator dari Cloud!`,"success")}catch(E){(v=window.showToast)==null||v.call(window,`Sinkronisasi gagal: ${E.message||"Koneksi terganggu"}`,"error")}finally{ne=!1,Ta(!1),it=await kt(),Ze(),Kt()}}}),(c=document.getElementById("btn-add-user"))==null||c.addEventListener("click",()=>dn());const p=document.getElementById("user-search-input"),l=document.getElementById("btn-clear-user-search");p==null||p.addEventListener("input",g=>{jt=g.target.value,l&&(l.style.display=jt?"inline-flex":"none"),Kt()}),l==null||l.addEventListener("click",()=>{jt="",p&&(p.value="",p.focus()),l.style.display="none",Kt()}),t.querySelectorAll(".staff-filter-pill").forEach(g=>{g.addEventListener("click",()=>{It=g.getAttribute("data-role")||"all",t.querySelectorAll(".staff-filter-pill").forEach(v=>{v.classList.toggle("active",(v.getAttribute("data-role")||"all")===It)}),Kt()})})}Kt()},Kt=()=>{const t=document.getElementById("staff-data-container");if(!t)return;const a=m.state.currentUser,e=(jt||"").trim().toLowerCase(),s=it.filter(n=>It!=="all"&&n.role!==It?!1:e?(n.name||"").toLowerCase().includes(e)||(n.username||"").toLowerCase().includes(e):!0);t.innerHTML=`
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
            ${s.length===0?`
              <tr>
                <td colspan="5">
                  <div class="staff-empty-state">
                    <div class="staff-empty-state-icon">🔍</div>
                    <div style="font-weight: 600; font-size: 15px; color: var(--text-primary); margin-bottom: 4px;">Tidak Ada Operator Ditemukan</div>
                    <div>Tidak ada akun operator yang sesuai dengan kriteria pencarian atau filter peran.</div>
                  </div>
                </td>
              </tr>
            `:s.map(n=>{const i=we[n.role]||we.cashier,o=a&&String(a.id)===String(n.id),r=n.isActive!==!1;return`
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 38px; height: 38px; border-radius: 10px; background: ${i.bg}; color: ${i.color}; border: 1px solid ${i.border}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex-shrink: 0;">
                        ${(n.name||"U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                          ${w(n.name)}
                          ${o?'<span style="font-size: 10.5px; padding: 2px 7px; border-radius: 6px; background: #e0e7ff; color: #3730a3; font-weight: 700;">Anda</span>':""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 1px;">Dibuat: ${new Date(n.createdAt||Date.now()).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style="background: var(--bg-base, #f1f5f9); padding: 4px 8px; border-radius: 6px; font-size: 12.5px; color: var(--blue-700, #1d4ed8); font-weight: 600; border: 1px solid var(--border-subtle, #e2e8f0);">@${w(n.username)}</code>
                  </td>
                  <td>
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; color: ${i.color}; background: ${i.bg}; border: 1px solid ${i.border};">
                      ${i.label}
                    </span>
                  </td>
                  <td>
                    <span class="staff-status-badge ${r?"active":"inactive"}">
                      <span class="staff-status-dot"></span>
                      ${r?"Aktif":"Nonaktif"}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button class="btn-edit-user" data-id="${n.id}" title="Edit Akun" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); cursor: pointer; font-size: 12.5px; font-weight: 600; color: var(--text-primary); transition: all 0.15s ease;">
                        ✏️ Edit
                      </button>
                      ${o?"":`
                        <button class="btn-delete-user" data-id="${n.id}" data-name="${w(n.name)}" data-role="${n.role}" title="Hapus Operator" style="padding: 6px 14px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer; font-size: 12.5px; font-weight: 600; transition: all 0.15s ease;">
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
        ${s.length===0?`
          <div class="staff-empty-state" style="grid-column: 1 / -1; background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-default);">
            <div class="staff-empty-state-icon">🔍</div>
            <div style="font-weight: 600; font-size: 15px; color: var(--text-primary); margin-bottom: 4px;">Tidak Ada Operator Ditemukan</div>
            <div>Tidak ada akun operator yang sesuai dengan pencarian atau filter.</div>
          </div>
        `:s.map(n=>{const i=we[n.role]||we.cashier,o=a&&String(a.id)===String(n.id),r=n.isActive!==!1;return`
            <div class="staff-card-item">
              <div class="staff-card-top">
                <div class="staff-card-user-info">
                  <div style="width: 42px; height: 42px; border-radius: 12px; background: ${i.bg}; color: ${i.color}; border: 1px solid ${i.border}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">
                    ${(n.name||"U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-weight: 700; font-size: 14.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                      ${w(n.name)}
                      ${o?'<span style="font-size: 10px; padding: 2px 6px; border-radius: 5px; background: #e0e7ff; color: #3730a3; font-weight: 700;">Anda</span>':""}
                    </div>
                    <code style="font-size: 12px; color: var(--blue-700); font-weight: 600;">@${w(n.username)}</code>
                  </div>
                </div>
                <span class="staff-status-badge ${r?"active":"inactive"}">
                  <span class="staff-status-dot"></span>
                  ${r?"Aktif":"Nonaktif"}
                </span>
              </div>

              <div class="staff-card-details">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 500;">Peran Akses:</span>
                  <span style="font-size: 11.5px; font-weight: 700; color: ${i.color}; background: ${i.bg}; padding: 2px 8px; border-radius: 12px; border: 1px solid ${i.border};">
                    ${i.label}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 500;">Dibuat:</span>
                  <span style="color: var(--text-secondary); font-weight: 600;">${new Date(n.createdAt||Date.now()).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
              </div>

              <div class="staff-card-actions">
                <button class="btn-edit-user" data-id="${n.id}" style="border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); color: var(--text-primary);">
                  ✏️ Edit
                </button>
                ${o?"":`
                  <button class="btn-delete-user" data-id="${n.id}" data-name="${w(n.name)}" data-role="${n.role}" style="border: 1px solid #fecaca; background: #fff1f2; color: #e11d48;">
                    🗑️ Hapus
                  </button>
                `}
              </div>
            </div>
          `}).join("")}
      </div>
	`,t.querySelectorAll(".btn-edit-user").forEach(n=>{n.addEventListener("click",async()=>{const i=n.getAttribute("data-id"),o=await Dn(String(i));o&&dn(o)})}),t.querySelectorAll(".btn-delete-user").forEach(n=>{n.addEventListener("click",async()=>{var d;const i=n.getAttribute("data-id"),o=n.getAttribute("data-name");if(n.getAttribute("data-role")==="owner"&&(await kt()).filter(p=>p.role==="owner"&&p.isActive!==!1).length<=1){alert("Akses Ditolak: Toko wajib memiliki minimal satu akun Owner aktif. Anda tidak dapat menghapus akun Owner terakhir!");return}if(confirm(`Yakin ingin menghapus operator "${o}"? Tindakan ini akan menghapus akun dari perangkat lokal dan Supabase Cloud.`))try{await Rn(String(i));const u=await kt();m.setUsers(u),(d=window.showToast)==null||d.call(window,`Operator "${o}" berhasil dihapus dari sistem & Cloud.`,"success"),it=u,Ze(),Kt()}catch(u){alert(`Gagal menghapus operator: ${u.message}`)}})})},dn=(t=null)=>{var c,p;const a=!!t,e="modal-user-form",s=`
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
                ${a?`Memodifikasi profil @${w(t==null?void 0:t.username)}`:"Daftarkan akun kasir, supervisor, atau owner baru"}
              </p>
            </div>
          </div>
          <button class="modal-close" style="background: none; border: none; font-size: 22px; cursor: pointer; color: var(--text-muted); line-height: 1;">&times;</button>
        </div>

        <form id="form-user-save" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Nama Lengkap Staf <span style="color: #ef4444;">*</span></label>
            <input type="text" id="input-user-name" required value="${w((t==null?void 0:t.name)||"")}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; font-size: 14px; background: var(--bg-surface, #ffffff); color: var(--text-primary);">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Username Masuk <span style="color: #ef4444;">*</span></label>
            <input type="text" id="input-user-username" required ${a?"disabled":""} value="${w((t==null?void 0:t.username)||"")}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; font-size: 14px; ${a?"background: var(--bg-base, #f1f5f9); color: var(--text-muted);":"background: var(--bg-surface, #ffffff); color: var(--text-primary);"}">
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
  `,n=document.getElementById(e);n&&n.remove(),document.body.insertAdjacentHTML("beforeend",s);const i=document.getElementById(e),o=()=>i.remove();(c=i.querySelector(".modal-close"))==null||c.addEventListener("click",o),(p=i.querySelector(".modal-cancel"))==null||p.addEventListener("click",o);const r=document.getElementById("input-user-pin"),d=document.getElementById("btn-toggle-pin-peek");d==null||d.addEventListener("click",()=>{r.type==="password"?(r.type="text",d.textContent="🙈 Sembunyikan"):(r.type="password",d.textContent="👁️ Lihat PIN")}),document.getElementById("form-user-save").addEventListener("submit",async l=>{var I,_;l.preventDefault();const g=document.getElementById("user-form-error");g.style.display="none";const v=document.getElementById("input-user-name").value.trim(),E=document.getElementById("input-user-username").value.trim().toLowerCase(),b=document.getElementById("input-user-role").value,y=document.getElementById("input-user-pin").value.trim(),h=a?document.getElementById("input-user-active").checked:!0;if(!v||!E){g.textContent="Nama lengkap dan username wajib diisi.",g.style.display="block";return}if(!a&&(!y||y.length<4)){g.textContent="PIN minimal 4 angka numerik.",g.style.display="block";return}if(y&&(y.length<4||Number.isNaN(Number(y)))){g.textContent="PIN harus berupa angka (4 hingga 6 digit).",g.style.display="block";return}try{const P=await kt();if(!a&&P.some(B=>(B.username||"").toLowerCase()===E)){g.textContent=`Username "${E}" sudah digunakan oleh operator lain.`,g.style.display="block";return}if(a&&t.role==="owner"&&(b!=="owner"||!h)&&P.filter(T=>T.role==="owner"&&T.isActive!==!1&&String(T.id)!==String(t.id)).length===0){g.textContent="Tidak dapat menonaktifkan atau mengubah peran Owner terakhir! Toko wajib memiliki minimal satu akun Owner aktif.",g.style.display="block";return}const x=document.getElementById("btn-submit-user");if(x.disabled=!0,x.textContent="Menyimpan ke Cloud...",a){let B=t.pinHash,T=t.pinSalt;y&&(T=ua(),B=await Fe(y,T));const D={...t,name:v,role:b,pinHash:B,pinSalt:T,isActive:h,updatedAt:new Date().toISOString()};await Un(D),m.state.currentUser&&String(m.state.currentUser.id)===String(t.id)&&(m.state.currentUser.name=v,m.state.currentUser.role=b,sessionStorage.setItem("bm_active_user",JSON.stringify(m.state.currentUser)),m.emit("auth:change",m.state.currentUser)),(I=window.showToast)==null||I.call(window,`Perubahan akun operator "${v}" berhasil disimpan!`,"success")}else{const B=ua(),T=await Fe(y,B),D={name:v,username:E,role:b,pinHash:T,pinSalt:B,isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};await On(D),(_=window.showToast)==null||_.call(window,`Akun operator baru "${v}" berhasil dibuat!`,"success")}const A=await kt();m.setUsers(A),o(),ce()}catch(P){g.textContent=`Gagal menyimpan data: ${P.message}`,g.style.display="block";const x=document.getElementById("btn-submit-user");x&&(x.disabled=!1,x.textContent=a?"Simpan Perubahan":"Buat Operator")}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const ln=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine||(t.textContent="⚡ Mode Offline",t.classList.add("status-badge--offline"),t.style.background="rgba(239, 68, 68, 0.12)",t.style.borderColor="rgba(239, 68, 68, 0.3)",t.style.color="#dc2626"))};window.addEventListener("offline",ln);window.showToast=(t,a="info",e="")=>{const s=document.getElementById("toast-container");if(!s)return;const n={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${a}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${n[a]??"ℹ️"}</span>
    <div class="toast__text">
      ${e?`<div class="toast__title">${w(e)}</div>`:""}
      <div class="toast__msg">${w(t)}</div>
    </div>
  `,s.appendChild(i);const o=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},r=setTimeout(o,3500);i.addEventListener("click",()=>{clearTimeout(r),o()})};const Ia=()=>{const t=document.getElementById("topbar-time"),a=document.getElementById("topbar-date");t&&(t.textContent=Pa()),a&&(a.textContent=wn())},Gs={login:{init:us,refresh:Vt},pos:{init:fs,refresh:ws},products:{init:Es,refresh:fe},customers:{init:ss,refresh:se},transactions:{init:Us,refresh:sn},reports:{init:_s,refresh:da},settings:{init:Ns,refresh:Ht},finance:{init:rs,refresh:rt},users:{init:Fs,refresh:ce}},_a=new Set,yt=async t=>{var s;!m.state.currentUser&&t!=="login"&&((s=window.showToast)==null||s.call(window,"Silakan masuk dengan akun operator untuk melanjutkan.","warning"),t="login");const a=Gs[t];if(!a)return;if(!m.canAccess(t)){window.showToast("Akses dibatasi untuk peran Anda. Silakan hubungi Owner/Supervisor.","warning","Peran Terbatas"),Ve({onLogin:()=>yt(t)});return}document.querySelectorAll(".dock-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)});const e=document.querySelector(".dock-container");e&&(e.style.display=t==="login"||!m.state.currentUser?"none":"flex"),document.querySelectorAll(".view").forEach(n=>{n.classList.toggle("active",n.id===`view-${t}`)});try{_a.has(t)?await a.refresh():(await a.init(),_a.add(t)),sessionStorage.setItem("activeView",t)}catch(n){const i=document.getElementById(`view-${t}`);i&&!i.children.length&&(i.innerHTML=`
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
      `)}m.navigate(t)},Ws=(t,a)=>{if(!t)return;const e=t.getBoundingClientRect(),s=Math.max(e.width,e.height),n=document.createElement("span");n.className="ripple-effect",n.style.cssText=`width:${s}px;height:${s}px;left:${a.clientX-e.left-s/2}px;top:${a.clientY-e.top-s/2}px`,t.style.position="relative",t.appendChild(n),n.addEventListener("animationend",()=>n.remove(),{once:!0})},cn=t=>{const a=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${a} — Kasir POS`};m.on("settings:change",cn);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const pn=t=>{const a=document.getElementById("operator-badge"),e=document.getElementById("operator-name"),s=document.getElementById("operator-icon"),n=document.getElementById("btn-topbar-logout"),i=document.getElementById("btn-topbar-login");t?(e&&(e.textContent=`${t.name} (${t.role})`),s&&(s.textContent=t.role==="owner"?"👑":t.role==="supervisor"?"⭐":"👤"),a&&(a.style.display="flex",a.style.color=t.role==="owner"?"#8b5cf6":t.role==="supervisor"?"#2563eb":"#10b981",a.style.background=t.role==="owner"?"rgba(139, 92, 246, 0.12)":t.role==="supervisor"?"rgba(37, 99, 235, 0.12)":"rgba(16, 185, 129, 0.12)",a.style.borderColor=t.role==="owner"?"rgba(139, 92, 246, 0.3)":t.role==="supervisor"?"rgba(37, 99, 235, 0.3)":"rgba(16, 185, 129, 0.3)"),n&&(n.style.display="inline-flex"),i&&(i.style.display="none")):(e&&(e.textContent="Belum Masuk"),s&&(s.textContent="🔒"),a&&(a.style.color="#64748b",a.style.background="rgba(100, 116, 139, 0.1)",a.style.borderColor="rgba(100, 116, 139, 0.25)"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"));const o=document.getElementById("dock-users");o&&(o.style.display=t&&t.role==="owner"?"flex":"none")};m.on("auth:change",pn);const Js=async()=>{var z,V,Q,j;window.appNavigateTo=yt;try{await Qn(),await na()}catch{window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}try{const S=await Nn();S?m.login(S):m.logout()}catch{m.logout()}pn(m.state.currentUser),navigator.onLine&&Mt().catch(S=>{}),(z=document.getElementById("operator-badge"))==null||z.addEventListener("click",()=>{Ve()}),(V=document.getElementById("btn-topbar-logout"))==null||V.addEventListener("click",()=>{var S;confirm("Keluar dari sesi operator kasir saat ini?")&&(m.logout(),yt("login"),(S=window.showToast)==null||S.call(window,"Sesi ditutup. Silakan login kembali.","info"))}),(Q=document.getElementById("btn-topbar-login"))==null||Q.addEventListener("click",()=>{yt("login")}),(j=document.getElementById("btn-sync-staged"))==null||j.addEventListener("click",async()=>{await In()}),window.addEventListener("request-operator-switch",()=>{Ve()}),window.addEventListener("request-logout",()=>{m.logout(),yt("login")});const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],a={};for(const S of t){const N=await aa(S);N!==null&&(S==="modalAwal"||S==="taxRate"?a[S]=parseFloat(N)||0:a[S]=N)}m.updateSettings(a),cn(m.state.settings),ln(),Ia(),setInterval(Ia,1e3),Tn(),Gt().catch(S=>{}),Ba(),Nt();const e=document.querySelector(".dock"),s="bm_dock_order_v3";(()=>{try{for(const M of(e==null?void 0:e.querySelectorAll(".dock-separator"))??[])M.remove();const S=localStorage.getItem(s);if(!S)return;const N=JSON.parse(S);if(!Array.isArray(N)||!N.length)return;const C=new Map;e==null||e.querySelectorAll(".dock-item").forEach(M=>{C.set(M.dataset.view,M)}),N.forEach(M=>{const H=C.get(M);H&&e&&(e.appendChild(H),C.delete(M))}),C.forEach(M=>{e&&e.appendChild(M)})}catch{}})();let i=e?[...e.querySelectorAll(".dock-item")]:[];const o=()=>window.innerWidth<600,r=()=>window.innerWidth>=600&&window.innerWidth<=1024,d=()=>o()?1.22:r()?1.36:1.5,u=()=>o()?8:r()?12:18,c=()=>o()?90:140;let p=i.map(()=>1),l=i.map(()=>1),g=null,v=!1;const E=(S,N,C)=>S+(N-S)*C,b=.24,y=()=>{if(v)return;let S=!1;const N=d(),C=u();i.forEach((M,H)=>{p[H]=E(p[H]??1,l[H]??1,b),Math.abs(p[H]-l[H])>5e-4?S=!0:p[H]=l[H];const q=p[H],G=(q-1)/(N-1||1)*C;M.style.transform=`translate3d(0, ${-G.toFixed(2)}px, 0) scale(${q.toFixed(4)})`,M.style.zIndex=q>1.02?Math.round(q*20):""}),g=S?requestAnimationFrame(y):null},h=()=>{!v&&!g&&(g=requestAnimationFrame(y))},I=S=>{if(v)return;const N=d(),C=c();i.forEach((M,H)=>{const q=M.getBoundingClientRect(),G=q.left+q.width/2,R=Math.abs(S-G);if(R<C){const F=Math.cos(R/C*(Math.PI/2));l[H]=1+(N-1)*F*F}else l[H]=1})},_=()=>{i.forEach((S,N)=>{l[N]=1})};e==null||e.addEventListener("mousemove",S=>{S.pointerType==="touch"||o()||v||(I(S.clientX),h())},{passive:!0});const P=()=>{v||(_(),p=i.map(()=>1),i.forEach(S=>{S.style.transform="",S.style.zIndex="";try{S.blur()}catch{}}),g&&(cancelAnimationFrame(g),g=null))};e==null||e.addEventListener("mouseleave",P),e==null||e.addEventListener("pointerup",P),e==null||e.addEventListener("touchend",P),e==null||e.addEventListener("pointercancel",P);let x=null,A=-1,B=-1,T=0,D=0,O=[],$=!1;const K=()=>i.map((S,N)=>{const C=S.getBoundingClientRect();return{idx:N,el:S,x:C.left,cx:C.left+C.width/2,width:C.width}});i.forEach(S=>{S.addEventListener("pointerdown",C=>{if(!(C.button!==0&&C.pointerType==="mouse")){x=S,A=i.indexOf(S),B=A,T=C.clientX,D=C.clientY,$=!1,O=K();try{S.setPointerCapture(C.pointerId)}catch{}}}),S.addEventListener("pointermove",C=>{var q;if(!x||x!==S)return;const M=C.clientX-T,H=C.clientY-D;if(!$&&Math.hypot(M,H)>5&&($=!0,v=!0,g&&(cancelAnimationFrame(g),g=null),e==null||e.classList.add("is-reordering"),S.classList.add("is-dragging"),i.forEach(G=>{G!==S&&(G.style.zIndex="")})),$&&v){S.style.transform=`translate3d(${M}px, ${H-12}px, 0) scale(1.18)`;let G=A;for(let R=0;R<O.length;R++)if(R===0&&C.clientX<O[0].cx){G=0;break}else if(R===O.length-1&&C.clientX>=O[R].cx){G=O.length-1;break}else if(C.clientX>=O[R].cx&&C.clientX<((q=O[R+1])==null?void 0:q.cx)){const F=(O[R].cx+O[R+1].cx)/2;G=C.clientX<F?R:R+1;break}B=Math.max(0,Math.min(i.length-1,G)),O.forEach(({el:R,idx:F,x:pt})=>{if(R===S)return;let ft=0;if(F>A&&F<=B){const bt=O[F-1];ft=bt?bt.x-pt:-58}else if(F<A&&F>=B){const bt=O[F+1];ft=bt?bt.x-pt:58}R.style.transform=`translate3d(${ft}px, 0, 0)`})}});const N=C=>{if(!(!x||x!==S)){try{S.releasePointerCapture(C.pointerId)}catch{}if($&&v){if(e==null||e.classList.remove("is-reordering"),S.classList.remove("is-dragging"),i.forEach(M=>{M.style.transform=""}),B!==A&&B>=0){const M=i.filter(q=>q!==S);B>=M.length?e==null||e.appendChild(S):e==null||e.insertBefore(S,M[B]),i=e?[...e.querySelectorAll(".dock-item")]:[];const H=i.map(q=>q.dataset.view).filter(Boolean);try{localStorage.setItem(s,JSON.stringify(H))}catch{}}p=i.map(()=>1),l=i.map(()=>1),v=!1,_(),h()}else{v=!1,S.style.transform="";const M=S.dataset.view;M&&(S.classList.remove("bouncing"),S.offsetWidth,S.classList.add("bouncing"),S.addEventListener("animationend",()=>S.classList.remove("bouncing"),{once:!0}),Ws(S.querySelector(".dock-icon"),C),yt(M))}try{S.blur()}catch{}_(),p=i.map(()=>1),i.forEach(M=>{M.style.transform="",M.style.zIndex=""}),g&&(cancelAnimationFrame(g),g=null),x=null,A=-1,B=-1,$=!1}};S.addEventListener("pointerup",N),S.addEventListener("pointercancel",N)});let W=!1;window.addEventListener("keydown",S=>{["ArrowLeft","ArrowRight","Tab","Home","End"].includes(S.key)&&(W=!0)},{passive:!0}),window.addEventListener("pointerdown",()=>{W=!1},{passive:!0}),i.forEach(S=>{S.addEventListener("focus",()=>{if(!W)return;const N=i.indexOf(S);i.forEach((C,M)=>{const H=Math.abs(M-N);l[M]=H===0?1.35:H===1?1.12:1}),h()}),S.addEventListener("blur",()=>{_(),h()}),S.addEventListener("keydown",N=>{var M,H;const C=i.indexOf(S);if(N.key==="ArrowRight"){N.preventDefault();const q=i[C+1]||i[0];q==null||q.focus()}else if(N.key==="ArrowLeft"){N.preventDefault();const q=i[C-1]||i[i.length-1];q==null||q.focus()}else if(N.key==="Home")N.preventDefault(),(M=i[0])==null||M.focus();else if(N.key==="End")N.preventDefault(),(H=i[i.length-1])==null||H.focus();else if(N.key==="Enter"||N.key===" "){N.preventDefault();const q=S.dataset.view;q&&yt(q)}})}),(()=>{let S=0,N=0,C=0,M=!1;const H=()=>{const R=(e?[...e.querySelectorAll(".dock-item")]:[]).map(F=>F.dataset.view).filter(F=>!!F&&m.canAccess(F));return R.length?R:["pos","customers","transactions"]},q=G=>{let R=G;for(;R&&R!==document.body;){if(R.classList&&(R.classList.contains("modal-overlay")||R.classList.contains("modal")||R.classList.contains("dock")||R.classList.contains("dock-container"))||["INPUT","TEXTAREA","SELECT"].includes(R.tagName))return!0;if(R.scrollWidth>R.clientWidth+10){const F=window.getComputedStyle(R);if(F.overflowX==="auto"||F.overflowX==="scroll")return!0}R=R.parentElement}return!1};window.addEventListener("touchstart",G=>{var F;if(!m.state.currentUser){M=!0;return}if(((F=G.touches)==null?void 0:F.length)!==1){M=!0;return}const R=G.touches[0];S=R.clientX,N=R.clientY,C=Date.now(),M=q(G.target)},{passive:!0}),window.addEventListener("touchmove",G=>{if(M||!G.touches||G.touches.length!==1)return;const R=G.touches[0],F=R.clientX-S,pt=R.clientY-N;Math.abs(pt)>Math.abs(F)&&Math.abs(pt)>12&&(M=!0)},{passive:!0}),window.addEventListener("touchend",G=>{var ca;if(!m.state.currentUser||M||!G.changedTouches||!G.changedTouches.length)return;const R=G.changedTouches[0],F=R.clientX-S,pt=R.clientY-N,ft=Date.now()-C;if(Math.abs(F)>=50&&Math.abs(F)>Math.abs(pt)*1.35&&ft<=550){const Le=H(),un=m.state.currentView||sessionStorage.getItem("activeView")||"pos",Xt=Le.indexOf(un);if(Xt!==-1){let ye=-1;if(F<0&&Xt<Le.length-1?ye=Xt+1:F>0&&Xt>0&&(ye=Xt-1),ye!==-1){const pa=Le[ye];try{(ca=navigator.vibrate)==null||ca.call(navigator,12)}catch{}const Dt=e==null?void 0:e.querySelector(`.dock-item[data-view="${pa}"]`);Dt&&(Dt.classList.remove("bouncing"),Dt.offsetWidth,Dt.classList.add("bouncing"),Dt.addEventListener("animationend",()=>Dt.classList.remove("bouncing"),{once:!0})),yt(pa)}}}},{passive:!0})})();const L=document.getElementById("topbar-app-version");if(L){const S="1.6.9";L.textContent=`v${S}`}if(!m.state.currentUser)await yt("login");else{const S=sessionStorage.getItem("activeView")||"pos";await yt(S==="login"?"pos":S)}};document.addEventListener("DOMContentLoaded",Js);
