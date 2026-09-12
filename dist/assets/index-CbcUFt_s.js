const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-CSRlgf-4.js","./vendor-qr-CYzGYPQn.js","./vendor-jspdf-BEqUCB1L.js"])))=>i.map(i=>d[i]);
import{X as Xa}from"./vendor-db-1iEchKay.js";import{c as Qa}from"./vendor-supabase-BBmmNHm-.js";import{b as Ya}from"./vendor-qr-CYzGYPQn.js";import{_ as be}from"./vendor-jspdf-BEqUCB1L.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const Nt={},u={state:{cart:[],products:[],customers:[],transactions:[],expenses:[],users:[],currentUser:null,currentView:"pos",discount:0,customerName:"",selectedCustomer:null,settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return Nt[t]||(Nt[t]=[]),Nt[t].push(e),()=>{Nt[t]=(Nt[t]??[]).filter(a=>a!==e)}},emit(t,e){for(const a of Nt[t]??[])a(e)},addToCart(t,e=1){const a=Math.max(1,parseInt(e,10)||1),s=this.state.cart.findIndex(n=>String(n.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=a:this.state.cart.push({product:t,qty:a}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const a=this.state.cart.find(s=>String(s.product.id)===String(t));a&&(a.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.state.selectedCustomer=null,this.emit("cart:change",this.state.cart),this.emit("selectedCustomer:change",null)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setCustomers(t){this.state.customers=t||[],this.emit("customers:change",this.state.customers)},setSelectedCustomer(t){this.state.selectedCustomer=t,this.state.customerName=t?t.name:"",this.emit("selectedCustomer:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>String(e.id)!==String(t)),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const a=this.state.transactions.findIndex(s=>String(s.id)===String(t));a>=0&&(this.state.transactions[a]={...this.state.transactions[a],...e},this.emit("transactions:change",this.state.transactions))},updateCustomer(t,e){const a=this.state.customers.findIndex(s=>String(s.id)===String(t));a>=0&&(this.state.customers[a]={...this.state.customers[a],...e},this.emit("customers:change",this.state.customers))},addCustomer(t){this.state.customers=[...this.state.customers,t],this.emit("customers:change",this.state.customers)},removeCustomer(t){this.state.customers=this.state.customers.filter(e=>String(e.id)!==String(t)),this.emit("customers:change",this.state.customers)},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)},setUsers(t){this.state.users=t,this.emit("users:change",t)},addUser(t){this.state.users=[...this.state.users,t],this.emit("users:change",this.state.users)},updateUser(t,e){const a=this.state.users.findIndex(s=>String(s.id)===String(t));a>=0&&(this.state.users[a]={...this.state.users[a],...e},this.emit("users:change",this.state.users))},removeUser(t){this.state.users=this.state.users.filter(e=>String(e.id)!==String(t)),this.emit("users:change",this.state.users)},login(t,e=null){const a={id:t.id,username:t.username,name:t.name,role:t.role||"cashier"};this.state.currentUser=a;try{sessionStorage.setItem("bm_active_user",JSON.stringify(a)),e&&localStorage.setItem("bm_jwt_token",e)}catch{}this.emit("auth:change",a)},logout(){this.state.currentUser=null;try{sessionStorage.removeItem("bm_active_user"),localStorage.removeItem("bm_jwt_token")}catch{}this.emit("auth:change",null)},restoreSession(){try{const t=sessionStorage.getItem("bm_active_user");if(t)return this.state.currentUser=JSON.parse(t),this.emit("auth:change",this.state.currentUser),this.state.currentUser}catch{}return null},canAccess(t){if(t==="login")return!0;const e=this.state.currentUser;if(!e)return!1;const a=e.role||"cashier";return a==="owner"?!0:a==="supervisor"?["pos","products","customers","transactions","reports"].includes(t):["pos","customers","transactions"].includes(t)}},ie=()=>{if(typeof window<"u"&&window.crypto)return window.crypto;if(typeof globalThis<"u"&&globalThis.crypto)return globalThis.crypto;throw new Error("Web Crypto API tidak tersedia pada runtime ini.")},ea=(t=16)=>{const e=ie(),a=new Uint8Array(t);return e.getRandomValues(a),Array.from(a,s=>s.toString(16).padStart(2,"0")).join("")},At=(t="")=>{let e;try{const a=ie();if(typeof a.randomUUID=="function")e=a.randomUUID();else{const s=new Uint8Array(16);a.getRandomValues(s),s[6]=s[6]&15|64,s[8]=s[8]&63|128,e=Array.from(s,(n,i)=>([4,6,8,10].includes(i)?"-":"")+n.toString(16).padStart(2,"0")).join("")}}catch{e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const n=Math.random()*16|0;return(s==="x"?n:n&3|8).toString(16)})}return t?`${t}_${e}`:e},ze=async(t,e)=>{if(!t||typeof t!="string")throw new Error("PIN tidak valid.");if(!e||typeof e!="string")throw new Error("Salt tidak valid.");const a=ie(),n=new TextEncoder().encode(`${e}:${t.trim()}`),i=await a.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(i)).map(r=>r.toString(16).padStart(2,"0")).join("")},aa=async(t,e,a)=>{if(!t||!e||!a)return!1;try{const s=await ze(t,e);if(s.length!==a.length)return!1;let n=0;for(let i=0;i<s.length;i++)n|=s.charCodeAt(i)^a.charCodeAt(i);return n===0}catch{return!1}},ke=t=>{let e;if(typeof t=="string")typeof btoa=="function"?e=btoa(unescape(encodeURIComponent(t))):e=Buffer.from(t,"utf8").toString("base64");else{const a=new Uint8Array(t);if(typeof btoa=="function"){let s="";for(let n=0;n<a.byteLength;n++)s+=String.fromCharCode(a[n]);e=btoa(s)}else e=Buffer.from(a).toString("base64")}return e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")},Za=t=>{let e=t.replace(/-/g,"+").replace(/_/g,"/");for(;e.length%4;)e+="=";return typeof atob=="function"?decodeURIComponent(escape(atob(e))):Buffer.from(e,"base64").toString("utf8")},tn=t=>{let e=t.replace(/-/g,"+").replace(/_/g,"/");for(;e.length%4;)e+="=";let a;typeof atob=="function"?a=atob(e):a=Buffer.from(e,"base64").toString("binary");const s=new Uint8Array(a.length);for(let n=0;n<a.length;n++)s[n]=a.charCodeAt(n);return s},na=async(t,e,a=86400*7)=>{const s=ie(),n=new TextEncoder,i={alg:"HS256",typ:"JWT"},o=Math.floor(Date.now()/1e3),r={...t,iat:o,exp:o+a},d=ke(JSON.stringify(i)),p=ke(JSON.stringify(r)),c=`${d}.${p}`,m=await s.subtle.importKey("raw",n.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),g=await s.subtle.sign("HMAC",m,n.encode(c)),f=ke(g);return`${c}.${f}`},en=async(t,e)=>{if(!t||typeof t!="string")return null;const a=t.split(".");if(a.length!==3)return null;const[s,n,i]=a,o=`${s}.${n}`,r=ie(),d=new TextEncoder;try{const p=await r.subtle.importKey("raw",d.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["verify"]),c=tn(i);if(!await r.subtle.verify("HMAC",p,c,d.encode(o)))return null;const g=Za(n),f=JSON.parse(g),T=Math.floor(Date.now()/1e3);return f.exp&&f.exp<T?null:f}catch{return null}},an=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),nn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),ba=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),ft=(t=new Date)=>`${nn(t)} ${ba(t)}`,it=(t=new Date)=>{const e=t instanceof Date?t:new Date(t);if(Number.isNaN(e.getTime()))return new Date().toISOString().split("T")[0];const a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`},sn=(t=new Date)=>{const e=t instanceof Date?t:new Date(t);return Number.isNaN(e.getTime())?new Date().toISOString().slice(0,7):`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`},fa="https://wiapnhpdgjbtkblowfig.supabase.co",Oe="sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g",on="STORE-BM-856CFAC8",Fe="bm_master_store_key",fe="bm_jwt_token",ya=()=>`BM_SECRET_${ct()}_2026_AUTHORITATIVE`,ct=()=>{try{const t=localStorage.getItem(Fe);if(t!=null&&t.trim())return t.trim()}catch{}return on},Se=t=>{try{if(t!=null&&t.trim())return localStorage.setItem(Fe,t.trim()),!0}catch{}return!1},J=()=>{try{return localStorage.getItem(Fe)==="ISOLATED_SANDBOX"}catch{return!1}};let Ee=null,Te=null;const nt=()=>(Ee||(Ee=Qa(fa,Oe,{auth:{persistSession:!1},realtime:{params:{eventsPerSecond:20}}})),Ee),rt=(t,e)=>{const a=document.getElementById("status-badge");a&&(t==="online"?(a.textContent=e||"🟢 Cloud Realtime",a.classList.remove("status-badge--offline"),a.style.background="rgba(16, 185, 129, 0.12)",a.style.borderColor="rgba(16, 185, 129, 0.3)",a.style.color="#059669"):t==="syncing"?(a.textContent="🔄 Sinkronisasi...",a.classList.remove("status-badge--offline"),a.style.background="rgba(37, 99, 235, 0.12)",a.style.borderColor="rgba(37, 99, 235, 0.3)",a.style.color="#2563eb"):(a.textContent=e||"⚡ Mode Offline",a.classList.add("status-badge--offline"),a.style.background="rgba(239, 68, 68, 0.12)",a.style.borderColor="rgba(239, 68, 68, 0.3)",a.style.color="#dc2626"))};let $e=null,Ut=!0,Ue=0;const ye=()=>Ut,rn=async()=>{if(J())return{ok:!1,rtt:0,isolated:!0};const t=performance.now();try{const e=new AbortController,a=setTimeout(()=>e.abort(),3500),s=await fetch(`${fa}/rest/v1/settings?select=key&limit=1`,{method:"GET",headers:{apikey:Oe,Authorization:`Bearer ${Oe}`},signal:e.signal,cache:"no-store"});clearTimeout(a);const n=performance.now(),i=Math.round(n-t);return s.ok?(Ut=!0,Ue=i,{ok:!0,rtt:i}):(Ut=!1,{ok:!1,rtt:i})}catch{return Ut=!1,Ue=0,{ok:!1,rtt:0}}},dn=(t=12e3)=>{$e&&clearInterval($e);const e=async()=>{const a=await rn();a.ok?(a.rtt>1500?rt("syncing",`🟡 Sinyal Lambat (${a.rtt}ms)`):rt("online",`🟢 Cloud Realtime (${a.rtt}ms)`),Lt()):rt("offline","🔴 Mode Offline (Staged)")};e(),$e=setInterval(e,t),window.addEventListener("online",()=>e()),window.addEventListener("offline",()=>rt("offline","🔴 Mode Offline (Staged)"))},Lt=async()=>{try{const e=(await E.transactions.where("syncStatus").equals("staged_offline").toArray()).length,a=document.getElementById("staged-offline-banner"),s=document.getElementById("staged-tx-count");return a&&s&&(e>0&&Ut?(s.textContent=e,a.style.display="flex"):a.style.display="none"),e}catch{return 0}},ln=async()=>{var t,e,a;if(!Ut||J())return(t=window.showToast)==null||t.call(window,"Tidak dapat menyinkronkan: Server belum terjangkau.","warning"),{success:!1};try{rt("syncing","🔄 Mengunggah data offline...");const s=await E.transactions.where("syncStatus").equals("staged_offline").toArray();if(s.length===0)return Lt(),{success:!0,count:0};const n=nt(),{error:i}=await n.from("transactions").upsert(s.map(He));if(i)throw i;for(const o of s)o.syncStatus="synced",await E.transactions.put(o);return Lt(),rt("online",`🟢 Cloud Realtime (${Ue}ms)`),(e=window.showToast)==null||e.call(window,`Sukses menyinkronkan ${s.length} transaksi offline ke Cloud!`,"success"),{success:!0,count:s.length}}catch(s){return(a=window.showToast)==null||a.call(window,`Gagal menyinkronkan data offline: ${s.message}`,"error"),{success:!1,error:s.message}}},cn=t=>({id:String(t.id),name:t.name||"",category:t.category||"Umum",price:Number(t.price)||0,unit:t.unit||"buah",emoji:t.emoji||"📦",stock:Number(t.stock)||0,updated_at:new Date().toISOString()}),He=t=>({id:String(t.id),invoice_no:t.invoiceNo||t.invoice_no||`INV-${Date.now()}`,date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||it(t.date?new Date(t.date):new Date),customer_name:t.customerName||t.customer_name||"",items:t.items||[],subtotal:Number(t.subtotal)||0,discount:Number(t.discount)||0,tax:Number(t.tax)||0,total:Number(t.total)||0,paid:Number(t.paid)||0,change:Number(t.change)||0,payment_method:t.paymentMethod||t.payment_method||"cash",payment_status:t.paymentStatus||t.payment_status||"cash_paid",paid_amount:Number(t.paidAmount||t.paid_amount)||0,remaining_debt:Number(t.remainingDebt||t.remaining_debt)||0,debt_payments:t.debtPayments||t.debt_payments||[],cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),va=t=>({id:String(t.id),date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||it(t.date?new Date(t.date):new Date),category:t.category||"Operasional",note:t.note||"",amount:Number(t.amount)||0,cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),pn=t=>({id:String(t.id),name:t.name||"",phone:t.phone||"",address:t.address||"",category:t.category||"Rumah Tangga",total_orders:Number(t.totalOrders||t.total_orders)||0,total_spent:Number(t.totalSpent||t.total_spent)||0,total_debt:Number(t.totalDebt||t.total_debt)||0,credit_limit:Number(t.creditLimit||t.credit_limit)||0,galon_loaned:Number(t.galonLoaned||t.galon_loaned)||0,notes:t.notes||"",updated_at:new Date().toISOString()}),un=t=>{const e=String(t.username||"").toLowerCase().trim();return{id:t.id?String(t.id):e?`usr_${e}`:At("usr"),store_id:ct(),username:e,name:String(t.name||""),role:String(t.role||"cashier"),pin_hash:String(t.pinHash||t.pin_hash||""),pin_salt:String(t.pinSalt||t.pin_salt||""),is_active:t.isActive!==void 0?!!t.isActive:t.is_active!==void 0?!!t.is_active:!0,updated_at:new Date().toISOString()}},It=async()=>{var e;if(J())return rt("offline","🔒 Mode Demo Terisolasi"),{success:!0,isolated:!0};if(!navigator.onLine)return rt("offline","⚡ Mode Offline"),{success:!1,offline:!0};ct();const t=nt();rt("syncing");try{try{const{data:a,error:s}=await t.from("products").select("*");if(!s&&a){const n=new Set(a.map(r=>String(r.id))),i=await E.products.toArray();for(const r of i)n.has(String(r.id))||await E.products.delete(r.id);for(const r of a){const d=String(r.id);await E.products.put({id:d,sku:`BM-${d.replace("prod_","")}`,name:r.name||"",category:r.category||"Umum",price:Number(r.price)||0,cost:0,unit:r.unit||"buah",emoji:r.emoji||"📦",image:null,stock:Number(r.stock)||0,deleted_at:null})}const o=await dt();u.setProducts(o),u.emit("products:change",o)}}catch{}try{const[a,{data:s,error:n}]=await Promise.all([pt(),t.from("transactions").select("*")]);if(!n&&s){const i=a.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("transactions").upsert(i.map(He));for(const d of i)d.syncStatus="synced",await E.transactions.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of a)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await E.transactions.delete(d.id);for(const d of s){const p=String(d.id);await E.transactions.put({id:p,invoiceNo:d.invoice_no,date:d.date,dateKey:d.date_key,customerName:d.customer_name,items:d.items||[],subtotal:Number(d.subtotal),discount:Number(d.discount),tax:Number(d.tax),total:Number(d.total),paid:Number(d.paid),change:Number(d.change),paymentMethod:d.payment_method,paymentStatus:d.payment_status,paidAmount:Number(d.paid_amount),remainingDebt:Number(d.remaining_debt),debtPayments:d.debt_payments||[],cashier:d.cashier,syncStatus:"synced",deleted_at:null})}const r=await pt();u.setTransactions(r),u.emit("transactions:change",r)}}catch{}try{const[a,{data:s,error:n}]=await Promise.all([ee(),t.from("expenses").select("*")]);if(!n&&s){const i=a.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("expenses").upsert(i.map(va));for(const d of i)d.syncStatus="synced",await E.expenses.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of a)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await E.expenses.delete(d.id);for(const d of s){const p=String(d.id);await E.expenses.put({id:p,date:d.date,dateKey:d.date_key,category:d.category,note:d.note,amount:Number(d.amount),cashier:d.cashier,deleted_at:null})}const r=await ee();u.setExpenses(r),u.emit("expenses:change",r)}}catch{}try{const[a,{data:s,error:n}]=await Promise.all([Y(),t.from("customers").select("*")]);if(!n&&s){const i=new Set(s.map(r=>String(r.id)));for(const r of a)i.has(String(r.id))||await E.customers.delete(r.id);for(const r of s){const d=String(r.id);await E.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const o=await Y();(e=u.setCustomers)==null||e.call(u,o),u.emit("customers:change",o)}}catch{}try{await oe()}catch{}try{const{data:a,error:s}=await t.from("settings").select("*"),n=await E.settings.toArray();if(!s&&a){if(a.length===0&&n.length>0)await t.from("settings").upsert(n.map(i=>({key:i.key,value:String(i.value??""),updated_at:new Date().toISOString()})));else if(a.length>0)for(const i of a)i.key.startsWith("users_roster_")||await E.settings.put({key:i.key,value:i.value??""})}}catch{}return rt("online","🟢 Cloud Realtime"),{success:!0}}catch(a){return rt("online","🟢 Cloud Aktif"),{success:!1,error:a}}finally{}},pe=()=>{if(J())return;const t=nt(),e=ct();Te&&t.removeChannel(Te),Te=t.channel(`store_realtime_${e}`).on("postgres_changes",{event:"*",schema:"public",table:"products"},async a=>{var n,i;if(a.eventType==="DELETE"){const o=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.products.delete(o)}else if(a.new){const o=a.new,r=String(o.id);await E.products.put({id:r,sku:`BM-${r.replace("prod_","")}`,name:o.name||"",category:o.category||"Umum",price:Number(o.price)||0,cost:0,unit:o.unit||"buah",emoji:o.emoji||"📦",image:null,stock:Number(o.stock)||0,deleted_at:null})}const s=await dt();u.setProducts(s),u.emit("products:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"transactions"},async a=>{var n,i;if(a.eventType==="DELETE"){const o=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.transactions.delete(o)}else if(a.new){const o=a.new,r=String(o.id);await E.transactions.put({id:r,invoiceNo:o.invoice_no,date:o.date,dateKey:o.date_key,customerName:o.customer_name,items:o.items||[],subtotal:Number(o.subtotal),discount:Number(o.discount),tax:Number(o.tax),total:Number(o.total),paid:Number(o.paid),change:Number(o.change),paymentMethod:o.payment_method,paymentStatus:o.payment_status,paidAmount:Number(o.paid_amount),remainingDebt:Number(o.remaining_debt),debtPayments:o.debt_payments||[],cashier:o.cashier,syncStatus:"synced",deleted_at:null})}const s=await pt();u.setTransactions(s),u.emit("transactions:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"expenses"},async a=>{var n,i;if(a.eventType==="DELETE"){const o=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.expenses.delete(o)}else if(a.new){const o=a.new,r=String(o.id);await E.expenses.put({id:r,date:o.date,dateKey:o.date_key,category:o.category,note:o.note,amount:Number(o.amount),cashier:o.cashier,deleted_at:null})}const s=await ee();u.setExpenses(s),u.emit("expenses:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"customers"},async a=>{var n,i,o;if(a.eventType==="DELETE"){const r=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.customers.delete(r)}else if(a.new){const r=a.new,d=String(r.id);await E.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const s=await Y();(o=u.setCustomers)==null||o.call(u,s),u.emit("customers:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"settings"},async a=>{var s;if(a.new&&a.new.key===`users_roster_${e}`)try{const n=JSON.parse(a.new.value);if(Array.isArray(n)&&n.length>0){const i=new Set(n.map(d=>String(d.username).toLowerCase().trim())),o=await E.users.toArray();for(const d of o)i.has(String(d.username).toLowerCase().trim())||await E.users.delete(d.id);for(const d of n){const p=String(d.username).toLowerCase().trim(),c=await E.users.where("username").equalsIgnoreCase(p).first(),g={id:d.id?String(d.id):c!=null&&c.id?String(c.id):`usr_${p}`,username:p,name:d.name,role:d.role,pinHash:d.pin_hash||d.pinHash,pinSalt:d.pin_salt||d.pinSalt,isActive:d.is_active!==void 0?!!d.is_active:d.isActive!==void 0?!!d.isActive:!0,createdAt:d.created_at||d.createdAt||new Date().toISOString(),updatedAt:d.updated_at||d.updatedAt||new Date().toISOString()};await E.users.put(g)}const r=await E.users.toArray();u.setUsers(r),u.emit("users:change",r)}}catch{}else if((s=a.new)!=null&&s.key)try{await E.settings.put({key:a.new.key,value:a.new.value??""}),u.updateSettings({[a.new.key]:a.new.value??""})}catch{}}).subscribe(a=>{a==="SUBSCRIBED"?rt("online","🟢 Cloud Realtime"):(a==="CLOSED"||a==="CHANNEL_ERROR")&&rt("offline","⚡ Mode Offline")}),window.addEventListener("online",()=>{It()})},ha=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("products").upsert(cn(t))}catch{}},mn=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("products").delete().eq("id",String(t))}catch{}},xa=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("customers").upsert(pn(t))}catch{}},gn=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("customers").delete().eq("id",String(t))}catch{}},wa=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("transactions").upsert(He(t))}catch{}},bn=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("transactions").delete().eq("id",String(t))}catch{}},fn=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("expenses").upsert(va(t))}catch{}},yn=async t=>{if(!(J()||!navigator.onLine))try{await nt().from("expenses").delete().eq("id",String(t))}catch{}},vn=async(t,e)=>{if(!(J()||!navigator.onLine))try{await nt().from("settings").upsert({key:String(t),value:typeof e=="object"?JSON.stringify(e):String(e??""),updated_at:new Date().toISOString()})}catch{}},ka=async()=>{if(J()||!navigator.onLine)return null;const t=ct(),e=nt(),a=`users_roster_${t}`;try{const s=new AbortController,n=setTimeout(()=>s.abort(),2500),{data:i,error:o}=await e.from("settings").select("value").eq("key",a).abortSignal(s.signal).maybeSingle();if(clearTimeout(n),!o&&(i!=null&&i.value)){const r=JSON.parse(i.value);if(Array.isArray(r)&&r.length>0)return r}}catch{}return null},oe=async()=>{const t=await ka();if(!t||t.length===0)return[];const e=new Set(t.map(n=>String(n.username).toLowerCase().trim())),a=await E.users.toArray();for(const n of a)e.has(String(n.username).toLowerCase().trim())||await E.users.delete(n.id);for(const n of t){const i=String(n.username).toLowerCase().trim(),o=await E.users.where("username").equalsIgnoreCase(i).first(),d={id:n.id?String(n.id):o!=null&&o.id?String(o.id):`usr_${i}`,username:i,name:n.name,role:n.role,pinHash:n.pin_hash||n.pinHash,pinSalt:n.pin_salt||n.pinSalt,isActive:n.is_active!==void 0?!!n.is_active:n.isActive!==void 0?!!n.isActive:!0,createdAt:n.created_at||n.createdAt||new Date().toISOString(),updatedAt:n.updated_at||n.updatedAt||new Date().toISOString()};await E.users.put(d)}const s=await E.users.toArray();return u.setUsers(s),u.emit("users:change",s),s},qe=async(t,e)=>{const a=ct(),s=ya(),n=String(t).toLowerCase().trim();if(navigator.onLine&&!J())try{const i=await ka();if(i&&i.length>0){const o=i.find(g=>String(g.username).toLowerCase().trim()===n||String(g.id)===n);if(!o)return{success:!1,error:"Akun operator tidak terdaftar di server master."};if(o.isActive===!1||o.is_active===!1)return{success:!1,error:"Akun operator ini telah dinonaktifkan oleh Owner."};const r=o.pin_salt||o.pinSalt,d=o.pin_hash||o.pinHash;if(!await aa(e,r,d))return{success:!1,error:"PIN salah! Silakan periksa kembali."};oe().catch(()=>{});const c={sub:o.id||o.username,username:o.username,name:o.name,role:o.role,storeId:a},m=await na(c,s,86400*7);try{localStorage.setItem(fe,m)}catch{}return{success:!0,user:{id:o.id||o.username,username:o.username,name:o.name,role:o.role},token:m,isServerValidated:!0}}}catch{}try{const o=(await E.users.toArray()).find(c=>String(c.username).toLowerCase().trim()===n||String(c.id)===n);if(!o)return{success:!1,error:"Perangkat offline dan akun belum tersimpan di cache lokal."};if(o.isActive===!1)return{success:!1,error:"Akun operator tidak aktif."};if(!await aa(e,o.pinSalt,o.pinHash))return{success:!1,error:"PIN salah! Silakan periksa kembali."};const d={sub:o.id||o.username,username:o.username,name:o.name,role:o.role,storeId:a,offline:!0},p=await na(d,s,86400*2);try{localStorage.setItem(fe,p)}catch{}return{success:!0,user:{id:o.id,username:o.username,name:o.name,role:o.role},token:p,isServerValidated:!1,isOfflineFallback:!0}}catch(i){return{success:!1,error:`Gagal memvalidasi kredensial: ${i.message}`}}},hn=async()=>{let t=null;try{t=localStorage.getItem(fe)}catch{}if(!t)return null;const e=ya(),a=await en(t,e);if(!(a!=null&&a.username)){try{localStorage.removeItem(fe)}catch{}return null}return{id:a.sub||a.username,username:a.username,name:a.name,role:a.role}},Sa=async t=>{if(J()||!navigator.onLine)return;const e=ct(),a=nt();try{const s=`users_roster_${e}`,{data:n,error:i}=await a.from("settings").select("value").eq("key",s).maybeSingle();let o=[];if(!i&&(n!=null&&n.value))try{const c=JSON.parse(n.value);Array.isArray(c)&&(o=c)}catch{}const r=String(t.username).toLowerCase().trim(),d=un(t),p=o.findIndex(c=>String(c.username).toLowerCase().trim()===r);p>=0?o[p]={...o[p],...d}:o.push(d),await a.from("settings").upsert({key:s,value:JSON.stringify(o),updated_at:new Date().toISOString()})}catch{}},xn=async t=>{if(J()||!navigator.onLine)return;const e=ct(),a=nt(),s=String(t).toLowerCase().trim();try{const n=`users_roster_${e}`,{data:i,error:o}=await a.from("settings").select("value").eq("key",n).maybeSingle();if(!o&&(i!=null&&i.value)){let r=JSON.parse(i.value);Array.isArray(r)&&(r=r.filter(d=>String(d.username).toLowerCase().trim()!==s),await a.from("settings").upsert({key:n,value:JSON.stringify(r),updated_at:new Date().toISOString()}))}}catch{}},wn=async(t,e)=>{var a;if(navigator.onLine&&!J()){try{const s=new AbortController,n=setTimeout(()=>s.abort(),3500),i=await fetch("/api/stock/decrement",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:t,transaction:e}),signal:s.signal});if(clearTimeout(n),i.ok&&(await i.json()).success)return{success:!0,via:"cloudflare-edge"}}catch{}try{const s=nt();for(const n of t||[]){const i=((a=n.product)==null?void 0:a.id)||n.id,o=Number(n.qty)||1;if(i){const{data:r}=await s.from("products").select("id, stock").eq("id",String(i)).limit(1);if(r&&r.length>0){const d=Number(r[0].stock)||0,p=Math.max(0,d-o);await s.from("products").update({stock:p,updated_at:new Date().toISOString()}).eq("id",String(i))}}}return{success:!0,via:"supabase-direct"}}catch{}}return{success:!0,via:"offline-staged"}},E=new Xa("BlueMountainPOS");E.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});E.version(3).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category"});E.version(4).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category",users:"++id, username, role, isActive"});E.version(5).stores({products:"id, category, sku, deleted_at",customers:"id, name, phone, category, totalDebt, deleted_at",transactions:"id, invoiceNo, dateKey, paymentStatus, paymentMethod, customerName, syncStatus, deleted_at",settings:"key",expenses:"id, dateKey, category, deleted_at",users:"id, username, role, isActive"});const St=()=>E.users.toArray(),kn=t=>E.users.get(t),Sn=async t=>{const e={...t,id:t.id?String(t.id):At("usr")};return await E.users.put(e),Sa(e).catch(()=>{}),e.id},En=async t=>{const e={...t,id:t.id?String(t.id):t.username?`usr_${String(t.username).toLowerCase().trim()}`:At("usr")},a=await E.users.put(e);return Sa(e).catch(()=>{}),a},Tn=async t=>{const e=await E.users.get(t),a=await E.users.delete(t);return e!=null&&e.username&&xn(e.username).catch(()=>{}),a},Y=async()=>(await E.customers.toArray()).filter(e=>!e.deleted_at),Ea=async t=>{const e={...t,id:t.id?String(t.id):At("cust"),deleted_at:null,updated_at:new Date().toISOString()};return await E.customers.put(e),xa(e).catch(()=>{}),e.id},Ht=async t=>{const e={...t,updated_at:new Date().toISOString()},a=await E.customers.put(e);return xa(e).catch(()=>{}),a},$n=async t=>{const e=await E.customers.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.customers.put(a),gn(t).catch(()=>{})}return t},dt=async()=>(await E.products.toArray()).filter(e=>!e.deleted_at),Ta=async t=>{const e={...t,id:t.id?String(t.id):At("prod"),deleted_at:null,updated_at:new Date().toISOString()};return await E.products.put(e),ha(e).catch(()=>{}),e.id},$a=async t=>{const e={...t,updated_at:new Date().toISOString()},a=await E.products.put(e);return ha(e).catch(()=>{}),a},Ln=async t=>{const e=await E.products.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.products.put(a),mn(t).catch(()=>{})}return t},In=async t=>{const e=typeof ye=="function"?ye():navigator.onLine,a={...t,id:t.id?String(t.id):At("tx"),syncStatus:e?"synced":"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};if(await E.transactions.put(a),e)wa(a).catch(()=>{});else try{Lt==null||Lt()}catch{}return a.id},pt=async()=>(await E.transactions.toArray()).filter(e=>!e.deleted_at),_n=async t=>{const e=await E.transactions.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.transactions.put(a),bn(t).catch(()=>{})}return t},te=async t=>{const e={...t,updated_at:new Date().toISOString()},a=await E.transactions.put(e);return wa(e).catch(()=>{}),a},An=async t=>{const e=typeof ye=="function"?ye():navigator.onLine,a={...t,id:t.id?String(t.id):At("exp"),syncStatus:e?"synced":"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};return await E.expenses.put(a),e&&fn(a).catch(()=>{}),a.id},ee=async()=>(await E.expenses.toArray()).filter(e=>!e.deleted_at),Bn=async t=>{const e=await E.expenses.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.expenses.put(a),yn(t).catch(()=>{})}return t},Ge=async t=>{const e=await E.settings.get(t);return(e==null?void 0:e.value)??null},La=async(t,e)=>{await E.settings.put({key:t,value:e}),vn(t,e).catch(()=>{})},We=async()=>{await E.users.count()>0||await E.users.put({id:"usr_admin",username:"admin",name:"Fadhilah Ramadhan",role:"owner",pinHash:"c3b558e7f7bd99bf1a0e50aa083c1ba8811e840dab3bf07bc020c724ce771e83",pinSalt:"9bc6c2b0806a1040516484af5df10112",isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})},Pn=async()=>{await Promise.all([E.products.clear(),E.customers.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear(),E.users.clear()]),sessionStorage.clear(),localStorage.clear()},Nn=async()=>{const[t,e,a,s,n,i]=await Promise.all([E.products.toArray(),E.customers.toArray(),E.transactions.toArray(),E.expenses.toArray(),E.settings.toArray(),E.users.toArray()]),o=n.find(d=>d.key==="shopName"),r=(o==null?void 0:o.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"1.1.0",exportedAt:new Date().toISOString(),shopName:r,data:{products:t,customers:e,transactions:a,expenses:s,settings:n,users:i},meta:{productCount:t.length,customerCount:e.length,transactionCount:a.length,expenseCount:s.length,settingCount:n.length,userCount:i.length}}},Cn=async(t,e="replace")=>{if(!(t!=null&&t.data))throw new Error("Format file backup tidak valid atau rusak.");const{products:a=[],customers:s=[],transactions:n=[],expenses:i=[],settings:o=[],users:r=[]}=t.data;return e==="replace"?(await Promise.all([E.products.clear(),E.customers.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear(),E.users.clear()]),a.length&&await E.products.bulkAdd(a),s.length&&await E.customers.bulkAdd(s),n.length&&await E.transactions.bulkAdd(n),i.length&&await E.expenses.bulkAdd(i),o.length&&await E.settings.bulkPut(o),r.length&&await E.users.bulkAdd(r)):e==="merge"&&(a.length&&await E.products.bulkPut(a),s.length&&await E.customers.bulkPut(s),n.length&&await E.transactions.bulkPut(n),i.length&&await E.expenses.bulkPut(i),o.length&&await E.settings.bulkPut(o),r.length&&await E.users.bulkPut(r)),{products:a.length,customers:s.length,transactions:n.length,expenses:i.length,settings:o.length,users:r.length}},Mn=()=>E.open(),w=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),b=t=>{const e=Number(t);if(Number.isNaN(e))return"Rp 0";const a=Math.round(Math.abs(e)).toLocaleString("id-ID");return(e<0?"-Rp ":"Rp ")+a},Ia="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHbElEQVR4nO2cS24rOwxEs/9Nv4cLJIAttCSS4qeorgN4kLglFcnTtuNBfv4jpJCf6gDk3VBAUgoFJKVQQFIKBSSlUEBSCgU84OeH7TuFHTTyT76/B7HD7hn5FJAS2mHnDIzyUUI77JqSmXwU0Aa7pmQlICXUw44p2MlHCfWwW0Kk8lFCHeyUAK18lFAOuySAAsbBLm2wykcJZbBDC07lo4R72J0FXgJSwjnszARP+SjgHHbmAW/5KOEcdmUgSj5K+Aw7MhAtICX8ht34IEM+CvgNu/FLlnyU8Bt24pdsAXcSvkXU+ysUUCHfSrA3vVreXZ2ASvme5HrbW/a9lQnwkMdTwpO37K7cWZWQLHEi3667c2VVkmFlvnJRwjnXVSQZlrcMmQLeJuFV1UiH5S1BtoA3SXhNJdmyaM6nhHOuqEI6rMjhU0Ab7auoGDyKgDdI2L4CpKFTQj2t06MNvCpPZwnbJkcdNCXU0TI18pCRsyHSLnWHAXfIiEKrxF0GW5mzm4Rt0nYbare8VbRJijJM6XCrBewiYYuUSEPUDLZawA4SwidEGqBloEj5EYFOiDS8k4Ei1YEGbDqkoZ0OsroWZAkhk1UP63NgXkOsrgdVQrhU1UMaB+U5vOq6ECWES4Q0IO/BVddGATdUD+cn4K0XuUYEYNJUD2UcTOTAqutEkhAiSfUwxqFED6q6TiQJy1NUD+FpGBlDqq6XAoIMYRxG1qCq60WRsCxBdeM1AkYMqrpeFAkpYOE/B6quG0HCkpOrm20V0HtQ1XUjSJh+anWTKSCWhKknVjd31/DIQVmFp4BeBwE011NA7cC6CJgtYcpp1Q2VNHv8nffwOgmYKSEFfMh5klnSgw59yZIw/JTqJlJAbAnrvwoHYmx8tICEAn4RJSDlm8OOfBD5tk4Bn2FHBjxeBSs/U3WDHRl4EobyxXFdVzwGPROHAvpzRVc0Q5aKoPlcR/nstO6MZsgWEVYiUT4f2nZHOuRTGZDfdm8QvGV6zaA9hMiUT/txggIWcCLgycCiX/EsHym6S9guuWX46J/PtLmQa9HSMrVVqOrPbKf5T9ci0jL1qUgVn+dO90e4cSJom9xbHIuUJw/PXJ3pnT7h+7gMybJrQqJ/Bb9kCuJN5+yn3FPJB5lvkZ0zIXBnVR9EfYbLetzO/RUOVAv1duFG3lfxBgqWCztCSqGApBQKSEqhgKQUCkhKoYCkFEgBo7/m8PyK5HQvydqbvwKCTBXdbBQBpWspYDLRDaeAOECm8mr4rOkUEAfIVJ4CagbqmdVzLQVMxtLANwp4A5BVdBooBTwDsopOA6WAZ0BW0WmgFPAMyCpmDbc8NPt7ZvVcG9EDFCDTRcq32t8zq+daCpgMBfTtBzKQ6bwEnDWfAuIAmc5TQM1APbN6rqWAyXgPdFx/i4A3AFnFSbMpYC8gq4geqvdArftRQAoYKuBqT80aCpiMpeGrgUoF1Dy0+1lyeuZFFRYylVfDswT0zBzZD0QgU0XK57V/RO7ofiACmSpSPq/9vbNn9AMRyFTRzUbaP6sfFPCldBGhCnaDlEIBSSkUkJRCAUkpsALyQ/s7mE7X46837fqor0BOrrf0YXZ91Nco3l/xeNe/zO6xicf6yGGc5PS4Caw1ogp42tOva7OKmq31HkiWgBohPGq1CCiZV0b9sAKeDkS6pzarNKN0T696Nb2+VkDLQLUCave2Fi+53kOKHRZxpPkQ6ncX0CKJtLAdaAJKbqzTmjTrEOtPE1Czxtr03dqKAUTfBNp1KgGK6zcLKDX/LQJGZojsQXX9bgJG3iWaplHA5+dR6z8S8G9j6e81ha+oFnDVn4gMkjXWPavrVwm4Olgig6VB2qZlCSjtRYSAVrkQ66eABwPQ9sOaQXK9VYSM+l0F3B262kMSfMdpwyL2yxTwRL4IAaWZpvVYm3IqoLQ47Znafd8moLa+VgLu9tAEt1y3u157jbTOXUbLjWU5o0rAk/rNAo7XSPawBDcX5rSf15krToa8Y5fHS0Br/UcCfl4n2cMS3DpUy74nfdidqV0juU5KloCW+o8F1ISxBLfKp91Xs95y5un13j2Q7htd/3K3E/megljXnWTw2PN0jcf+kS8GEWeLbz5FDYS4QwFJKRSQlEIBSSmhAlr+wtr9hfb3/NO1qxyrfLOfZ78bs2n7sKpNcr6kb5IM4/OzNZGkCygVbPf8bJirDLPnVtdaBNhdu9pjl2e31tLnXZ2RpAg4/jx7Fdutl+w9u85LQOkrzu5sTT5p/qf9pGJLbz5vUgUcf2e5K2fPeQv4dJNIhJqdrZV015tZzdKbXDKHawTcFThrtOS52c9Pe8yes+Rd7bPrgSSf9VytgJJHJDCfAaXrx+dmP0vOWO3hJeCsllU+qQweAkprj6KFgJLnvAWcrZXcDOMZ1v2k/VvVa6nhOgHHn2eFagerGdrqFW113m7IEsElr2Kam0mazZJjtU8EcH+EjE2Q7i0R2SLgLIf0VUJy3VOPNDV75JUIH0Hs7oRsoICkFApISqGApBQKSEqhgKSU/wFlggp6xOLiGQAAAABJRU5ErkJggg==",Dn=new Uint8Array([27,97,1,29,118,48,0,20,0,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,254,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,255,255,255,7,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,15,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,255,255,159,224,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,127,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,4,3,255,254,127,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,14,7,255,254,127,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,31,7,255,252,127,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,63,143,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,127,223,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,252,63,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,248,31,255,255,255,128,0,0,0,0,0,0,0,0,0,0,1,255,255,255,248,31,255,255,255,192,0,0,0,0,0,0,0,0,0,0,3,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,7,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,15,255,255,255,224,7,255,255,255,240,0,0,0,0,0,0,0,0,0,0,31,255,255,255,192,7,255,255,255,248,0,0,0,0,0,0,0,0,0,0,63,255,255,255,192,3,255,255,255,252,0,0,0,0,0,0,0,0,0,0,63,255,255,255,136,3,255,255,255,254,0,0,0,0,0,0,0,0,0,0,127,255,255,255,8,1,255,255,255,255,0,0,0,0,0,0,0,0,0,0,255,255,255,255,16,0,255,255,255,255,0,0,0,0,0,0,0,0,0,1,255,255,255,254,48,0,127,255,255,255,128,0,0,0,0,0,0,0,0,3,255,255,255,252,96,0,127,255,255,255,192,0,0,0,0,0,0,0,0,7,255,255,255,252,224,0,63,255,255,255,224,0,0,0,0,0,0,0,0,15,255,255,255,248,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,15,255,255,255,241,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,31,255,255,255,243,128,0,15,255,255,255,248,0,0,0,0,0,0,0,0,63,255,255,255,227,128,0,7,255,255,255,252,0,0,0,0,0,0,0,0,127,255,255,255,231,0,0,7,255,255,255,254,0,0,0,0,0,0,0,0,255,255,255,255,199,0,0,3,255,255,255,254,0,0,0,0,0,0,0,1,255,255,255,255,207,128,0,3,255,255,255,255,0,0,0,0,0,0,0,3,255,255,255,255,207,192,0,3,255,255,255,255,128,0,0,0,0,0,0,3,255,255,255,255,159,224,0,1,255,255,255,255,192,0,0,0,0,0,0,7,255,255,255,255,159,240,0,1,255,255,255,255,224,0,0,0,0,0,0,15,255,255,255,255,159,240,0,1,255,255,255,255,240,0,0,0,0,0,0,31,255,255,255,255,31,252,0,57,255,255,255,255,240,0,0,0,0,0,0,63,255,255,255,255,31,255,0,57,255,255,255,255,248,0,0,0,0,0,0,127,255,255,255,255,59,255,240,57,255,255,255,255,252,0,0,0,0,0,0,127,255,255,255,255,27,255,240,57,255,255,255,255,254,0,0,0,0,0,0,255,255,255,255,255,27,255,240,57,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,29,255,240,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,255,240,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,248,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,7,159,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,8,3,199,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,224,48,1,243,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,240,0,255,255,0,0,1,128,0,0,0,0,0,0,0,0,0,0,7,192,240,0,127,254,0,14,1,128,0,0,0,0,0,0,0,0,0,0,7,192,248,0,31,240,0,30,3,192,0,0,0,0,0,0,0,0,0,0,15,224,127,0,0,0,0,124,7,224,0,0,0,0,0,0,0,0,0,0,7,240,31,240,0,0,7,240,15,224,0,0,0,0,0,0,0,0,0,0,7,252,7,255,192,1,255,192,63,192,0,0,0,0,0,0,0,0,0,0,3,255,0,63,255,255,252,0,255,128,0,0,0,0,0,0,0,0,0,0,0,255,224,0,255,254,0,7,255,0,0,0,0,0,0,0,0,0,0,0,0,63,254,0,0,0,0,127,252,0,0,0,0,0,0,0,0,0,0,0,0,7,255,252,0,0,63,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,240,7,224,0,252,0,248,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,224,63,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,192,31,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,15,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,126,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,127,3,248,126,0,0,0,0,0,0,0,0,0,0,7,224,63,199,255,252,127,207,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,199,255,252,63,255,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,255,252,31,255,224,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,255,252,15,255,192,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,255,252,7,255,0,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,224,1,224,31,248,15,128,248,248,7,159,255,224,126,0,248,248,7,192,3,224,3,224,63,252,15,128,248,252,7,159,255,224,126,0,248,252,7,192,3,240,7,224,255,254,15,128,248,254,7,159,255,224,127,0,248,254,7,192,3,240,7,225,255,255,15,128,248,254,7,159,255,224,255,0,248,254,7,192,3,248,15,225,248,31,143,128,248,255,7,128,124,0,255,128,248,255,7,192,3,252,15,227,240,15,143,128,248,255,135,128,124,1,255,128,248,255,135,192,3,252,31,227,224,7,207,128,248,255,199,192,124,1,247,192,248,255,199,192,3,254,31,227,224,7,207,128,248,255,231,192,124,3,231,192,248,255,231,192,3,254,63,227,224,7,207,128,248,255,231,192,124,3,227,192,248,255,231,192,3,255,125,227,224,7,207,128,248,251,247,192,124,3,195,224,248,251,247,192,3,239,249,227,224,7,207,128,248,249,255,192,124,7,193,224,248,249,255,192,3,239,249,227,224,7,207,128,248,248,255,128,124,7,255,240,248,248,255,192,3,231,241,227,240,15,143,128,248,248,127,128,124,15,255,240,248,248,127,192,3,227,241,225,240,31,135,192,248,248,127,128,124,15,255,248,248,248,127,192,3,227,225,225,252,127,7,227,240,248,63,192,124,31,255,248,248,248,63,192,3,225,193,224,255,255,3,255,240,248,31,192,124,31,0,252,248,248,31,192,3,224,193,224,127,254,1,255,224,248,15,192,124,30,0,124,248,248,15,192,3,224,1,224,63,252,0,255,192,248,7,192,124,62,0,124,248,248,7,192,1,192,1,224,7,224,0,63,0,120,3,128,120,60,0,60,112,120,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,241,249,251,32,65,152,195,128,123,248,199,228,60,33,128,0,0,0,0,1,249,249,251,112,225,156,199,224,251,249,199,254,126,49,128,0,0,0,0,1,157,129,131,48,225,156,206,65,192,225,225,142,231,57,128,0,0,0,0,1,141,241,131,48,225,158,220,1,224,227,225,142,195,125,128,0,0,0,0,1,253,249,243,48,225,159,220,96,248,227,113,142,195,255,128,0,0,0,0,1,249,193,243,48,225,155,220,96,60,231,241,142,195,55,128,0,0,0,0,1,249,193,131,48,225,153,206,96,156,231,249,142,231,55,128,0,0,0,0,1,157,249,131,63,253,152,199,225,248,230,25,142,126,51,128,0,0,0,0,1,141,249,3,62,125,152,67,192,240,68,25,132,60,33,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),he=(t,e={})=>{const a=t.items||[],s=[],n=(d,p=0,c=1,m=0)=>s.push({type:0,content:d,bold:p,align:c,format:m}),i=()=>n("--------------------------------",0,1,0),o=()=>n(" ",0,0,0);s.push({type:1,content:Ia,align:1,width:160,height:160});const r=e.shopName||"Blue Mountain Refilling Station";if(r.toLowerCase().includes("blue mountain")&&r.toLowerCase().includes("refilling station"))n("BLUE MOUNTAIN",1,1,2),n("REFILLING STATION",1,1,1);else for(const d of lines)n(d.trim().toUpperCase(),1,1,2);o(),e.shopAddress&&n(e.shopAddress,0,1,4),e.shopPhone&&n(`Telp: ${e.shopPhone}`,0,1,4),i(),n(`No   : ${t.invoiceNo||"-"}`,0,0,0),n(`Tgl  : ${ft(new Date(t.date))}`,0,0,0),t.customerName&&n(`Cust : ${t.customerName}`,0,0,0),t.cashier&&n(`Kasir: ${t.cashier}`,0,0,0),i();for(const d of a){if(!(d!=null&&d.product))continue;const p=d.product.name,c=d.qty,m=b(d.product.price),g=b(d.product.price*c);n(`${p}`,1,0,0),n(`  ${c} x ${m} = ${g}`,0,0,0)}return i(),t.discount>0&&(n(`Subtotal: ${b(t.subtotal)}`,0,0,0),n(`Diskon:  -${b(t.discount)}`,0,0,0)),t.tax>0&&n(`Pajak:    ${b(t.tax)}`,0,0,0),n(`TOTAL: ${b(t.total)}`,1,0,3),t.paymentMethod==="cash"?(n(`Bayar:   ${b(t.paid)}`,0,0,0),n(`Kembali: ${b(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(n(`Transfer: ${b(t.total)}`,0,0,0),n(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(n(`DP Dibayar: ${b(t.paidAmount||0)}`,0,0,0),n(`Sisa Hutang: ${b(t.remainingDebt||0)}`,1,0,0)),i(),o(),n("Terima kasih sudah berbelanja!",1,1,0),n("BLUE MOUNTAIN REFILLING STATION",1,1,0),o(),o(),s},jt={"48mm":{width:"48mm",widthPx:"185px",colWidth:30,fontSize:"10px",logoWidth:"55px"},"58mm":{width:"58mm",widthPx:"220px",colWidth:32,fontSize:"11px",logoWidth:"70px"},"80mm":{width:"80mm",widthPx:"300px",colWidth:48,fontSize:"12px",logoWidth:"85px"}},Je=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},_a=t=>{const e=he(t,u.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Je()},Aa=t=>(_a(t),`my.bluetoothprint.scheme://${(u.state.settings||{}).printerUrl||Je()}`),Ve=t=>(_a(t),Je(),`rawbt:data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(he(t,u.state.settings)))))}`),Ba=t=>{const e=u.state.settings||{};let a=`*STRUK PEMBELIAN — ${e.shopName||"BLUE MOUNTAIN"}*
`;a+=`--------------------------------
`,a+=`No. Invoice : ${t.invoiceNo||"-"}
`,a+=`Tanggal     : ${ft(new Date(t.date||Date.now()))}
`,t.customerName&&(a+=`Pelanggan   : ${t.customerName}
`),a+=`Kasir       : ${t.cashier||"Kasir"}
`,a+=`--------------------------------
`;for(const s of t.items||[]){if(!(s!=null&&s.product))continue;const n=s.product.name,i=s.qty,o=s.product.price;a+=`${n}
  ${i} x ${b(o)} = ${b(o*i)}
`}return a+=`--------------------------------
`,t.discount>0&&(a+=`Diskon      : -${b(t.discount)}
`),t.tax>0&&(a+=`Pajak       : ${b(t.tax)}
`),a+=`*TOTAL       : ${b(t.total)}*
`,t.paymentMethod==="cash"?(a+=`Bayar Tunai : ${b(t.paid||t.total)}
`,t.change>0&&(a+=`Kembalian   : ${b(t.change)}
`)):t.paymentMethod==="transfer"?a+=`Metode      : Transfer Bank (Lunas ✅)
`:t.paymentMethod==="debt"&&(a+=`DP Dibayar  : ${b(t.paidAmount||0)}
`,a+=`*Sisa Hutang : ${b(t.remainingDebt||0)}*
`),a+=`--------------------------------
`,a+=`Terima kasih sudah berbelanja!
`,a+=`BLUE MOUNTAIN REFILLING STATION
`,e.shopAddress&&(a+=`${e.shopAddress}
`),e.shopPhone&&(a+=`Telp: ${e.shopPhone}
`),a},sa=(t,e="")=>{const a=(e||t.customerPhone||"").replace(/\D/g,""),s=a.startsWith("08")?`62${a.slice(1)}`:a.startsWith("8")?`62${a}`:a,n=Ba(t),i=encodeURIComponent(n);return s?`https://wa.me/${s}?text=${i}`:`https://wa.me/?text=${i}`},xe=(t,e=null)=>{const a=u.state.settings||{},s=e||a.printerPaper||"58mm",n=jt[s]||jt["58mm"],i=t.items||[],o=()=>'<div style="border-top:1px dashed #333;margin:4px 0"></div>';let r=`<div class="thermal-receipt" style="width:${n.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:2px 4px">`;r+=`<div style="text-align:center;margin:0 auto 2px auto;line-height:1">
    <img src="${Ia}"
         class="thermal-logo"
         alt="Blue Mountain"
         width="65"
         height="65"
         style="width:${n.logoWidth};height:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  </div>`;const d=a.shopName||"Blue Mountain Refilling Station";r+='<div style="text-align:center;margin-bottom:6px">',d.toLowerCase().includes("blue mountain")&&d.toLowerCase().includes("refilling station")?(r+=`<div style="font-weight:900;font-size:${s==="80mm"?"15px":"13px"};line-height:1.2;letter-spacing:0.5px">BLUE MOUNTAIN</div>`,r+=`<div style="font-weight:800;font-size:${s==="80mm"?"12px":"11px"};line-height:1.2;letter-spacing:0.3px">REFILLING STATION</div>`):d.toUpperCase().split(`
`).forEach(c=>{r+=`<div style="font-weight:900;font-size:${s==="80mm"?"14px":"12px"};line-height:1.2">${c.trim()}</div>`}),r+="</div>",a.shopAddress&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35;word-break:normal;overflow-wrap:break-word;margin-bottom:2px">${a.shopAddress}</div>`),a.shopPhone&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35">Telp: ${a.shopPhone}</div>`),r+=o(),r+='<div style="font-size:10px;line-height:1.4">',r+=`<div>No&nbsp;&nbsp;&nbsp;: <b>${t.invoiceNo||"-"}</b></div>`,r+=`<div>Tgl&nbsp;&nbsp;: ${ft(new Date(t.date||Date.now()))}</div>`,t.customerName&&(r+=`<div>Cust&nbsp;: ${t.customerName}</div>`),t.cashier&&(r+=`<div>Kasir: ${t.cashier}</div>`),r+="</div>",r+=o();for(const p of i){if(!(p!=null&&p.product))continue;const c=p.product.name,m=p.qty,g=p.product.price,f=g*m;r+=`<div style="font-weight:700;font-size:${n.fontSize};line-height:1.3">${c}</div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3;margin-bottom:3px">
      <span>&nbsp;&nbsp;${m} x ${b(g)}</span>
      <span style="font-weight:600">${b(f)}</span>
    </div>`}return r+=o(),t.discount>0&&(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Subtotal</span><span>${b(t.subtotal||t.total+t.discount)}</span>
    </div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Diskon</span><span>-${b(t.discount)}</span>
    </div>`),t.tax>0&&(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Pajak</span><span>${b(t.tax)}</span>
    </div>`),r+=`<div style="display:flex;justify-content:space-between;font-size:${s==="80mm"?"14px":"13px"};font-weight:900;margin:3px 0;letter-spacing:0.5px">
    <span>TOTAL</span><span>${b(t.total)}</span>
  </div>`,t.paymentMethod==="cash"?(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Bayar Tunai</span><span>${b(t.paid||t.total)}</span>
    </div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Kembali</span><span>${b(t.change||0)}</span>
    </div>`):t.paymentMethod==="transfer"?(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Transfer Bank</span><span>${b(t.total)}</span>
    </div>`,r+=`<div style="text-align:center;font-size:9px;margin-top:2px">Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}</div>`):t.paymentMethod==="debt"&&(r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>DP Dibayar</span><span>${b(t.paidAmount||0)}</span>
    </div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Sisa Hutang</span><span>${b(t.remainingDebt||0)}</span>
    </div>`),r+=o(),r+=`<div style="text-align:center;margin-top:4px">
    <div style="font-size:10px;font-weight:700;line-height:1.35">Terima kasih sudah berbelanja!</div>
    <div style="font-size:9px;font-weight:800;letter-spacing:0.5px;margin-top:2px">BLUE MOUNTAIN REFILLING STATION</div>
  </div>`,r+='<div style="height:4px"></div>',r+="</div>",r},ae=(t,e=null)=>{const a=u.state.settings||{},s=e||a.printerPaper||"58mm",n=jt[s]||jt["58mm"],i=xe(t,s),o=document.createElement("iframe");o.style.position="fixed",o.style.top="-9999px",o.style.left="-9999px",o.style.width="400px",o.style.height="800px",o.style.border="none",o.style.opacity="0",o.style.pointerEvents="none",document.body.appendChild(o);const r=o.contentWindow.document;r.open(),r.write(`<!DOCTYPE html>
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
</html>`),r.close();const d=()=>{try{o.contentWindow.focus(),o.contentWindow.print()}catch{const m=window.open("","_blank","width=350,height=600");m&&(m.document.write(r.documentElement.outerHTML),m.document.close(),m.focus(),setTimeout(()=>{m.print(),setTimeout(()=>m.close(),1e3)},300))}finally{setTimeout(()=>o.remove(),3e3)}},p=r.querySelector("img");p&&!p.complete?(p.onload=()=>setTimeout(d,120),p.onerror=()=>setTimeout(d,120),setTimeout(d,800)):setTimeout(d,200)},Pa=(t,e=null)=>{const a=new TextEncoder,s=u.state.settings||{},n=e||s.printerPaper||"58mm",o=(jt[n]||jt["58mm"]).colWidth,r=(T,I,k=o)=>{const S=Math.max(1,k-T.length-I.length);return T+" ".repeat(S)+I},d=(T,I=o)=>{if(!T)return[];const k=T.split(" "),S=[];let l="";for(const h of k)l?`${l} ${h}`.length<=I?l+=` ${h}`:(S.push(l),l=h):l=h;return l&&S.push(l),S},p=[],c=T=>p.push(...T),m=T=>{for(const I of T)p.push(I)},g=T=>{const I=a.encode(`${T}
`);for(const k of I)p.push(k)};c([27,64]),m(Dn),c([27,97,1]);const f=s.shopName||"Blue Mountain Refilling Station";if(f.toLowerCase().includes("blue mountain")&&f.toLowerCase().includes("refilling station"))c([27,69,1]),c([27,33,16]),g("BLUE MOUNTAIN"),c([27,33,0]),c([27,69,1]),g("REFILLING STATION"),c([27,69,0]);else{c([27,69,1]),c([27,33,16]);const T=f.toUpperCase().split(`
`);for(const I of T)g(I.trim());c([27,33,0]),c([27,69,0])}if(c([27,74,14]),s.shopAddress){const T=d(s.shopAddress,o);for(const I of T)g(I)}s.shopPhone&&g(`Telp: ${s.shopPhone}`),c([27,97,0]),g("-".repeat(o)),g(`No   : ${t.invoiceNo||"-"}`),g(`Tgl  : ${ft(new Date(t.date||Date.now()))}`),t.customerName&&g(`Cust : ${t.customerName}`),t.cashier&&g(`Kasir: ${t.cashier}`),g("-".repeat(o));for(const T of t.items||[])T!=null&&T.product&&(c([27,69,1]),g(T.product.name),c([27,69,0]),g(r(`  ${T.qty} x ${b(T.product.price)}`,b(T.product.price*T.qty))));return g("-".repeat(o)),t.discount>0&&(g(r("Subtotal",b(t.subtotal||t.total+t.discount))),g(r("Diskon",`-${b(t.discount)}`))),t.tax>0&&g(r("Pajak",b(t.tax))),c([27,69,1]),c([27,33,16]),g(r("TOTAL",b(t.total))),c([27,33,0]),c([27,69,0]),t.paymentMethod==="cash"?(g(r("Bayar Tunai",b(t.paid||t.total))),c([27,69,1]),g(r("Kembali",b(t.change||0))),c([27,69,0])):t.paymentMethod==="transfer"?(g(r("Transfer Bank",b(t.total))),g(r("Status",t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU"))):t.paymentMethod==="debt"&&(g(r("DP Dibayar",b(t.paidAmount||0))),c([27,69,1]),g(r("Sisa Hutang",b(t.remainingDebt||0))),c([27,69,0])),g("-".repeat(o)),c([27,97,1]),c([27,69,1]),g("Terima kasih sudah berbelanja!"),g("BLUE MOUNTAIN REFILLING STATION"),c([27,69,0]),c([10,10,10,29,86,66,0]),new Uint8Array(p)},Na=async t=>{const{default:e}=await be(async()=>{const{default:s}=await import("./vendor-canvas-C3fx88d4.js");return{default:s}},[],import.meta.url),a=document.createElement("div");a.style.position="fixed",a.style.left="-9999px",a.style.top="0",a.style.width="240px",a.style.maxHeight="none",a.style.overflow="visible",a.style.background="#ffffff",a.style.padding="10px 8px",a.style.boxSizing="border-box",a.style.zIndex="-9999",a.innerHTML=xe(t,"58mm"),document.body.appendChild(a);try{const s=await e(a,{backgroundColor:"#ffffff",scale:3,useCORS:!0,logging:!1,windowWidth:320});return await new Promise((n,i)=>{s.toBlob(o=>{o?n(o):i(new Error("Gagal membuat blob gambar"))},"image/png",1)})}finally{a.remove()}},Ca=async t=>{var e;window.showToast&&window.showToast("Menyiapkan gambar struk WhatsApp...","info");try{const a=await Na(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([a],s,{type:"image/png"}),i=Ba(t);if((e=navigator.canShare)!=null&&e.call(navigator,{files:[n]})){await navigator.share({title:`Struk ${t.invoiceNo||""}`,text:i,files:[n]}),window.showToast&&window.showToast("Struk gambar berhasil dibagikan!","success");return}try{navigator.clipboard&&window.ClipboardItem&&(await navigator.clipboard.write([new ClipboardItem({"image/png":a})]),window.showToast&&window.showToast("📋 Gambar struk telah disalin ke clipboard! Tempel (Ctrl+V) di chat WhatsApp.","success"))}catch{}const o=sa(t);window.open(o,"_blank","noopener,noreferrer")}catch{const s=sa(t);window.open(s,"_blank","noopener,noreferrer")}},Ma=async t=>{var e;window.showToast&&window.showToast("Membuat PNG struk presisi...","info");try{const a=await Na(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([a],s,{type:"image/png"});if((e=navigator.canShare)!=null&&e.call(navigator,{files:[n]}))await navigator.share({title:`Struk ${t.invoiceNo||""}`,files:[n]}),window.showToast&&window.showToast("Struk berhasil dibagikan!","success");else{const i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=s,o.click(),setTimeout(()=>URL.revokeObjectURL(i),3e3),window.showToast&&window.showToast("PNG struk berhasil disimpan!","success")}}catch{window.showToast&&window.showToast("Gagal membuat PNG struk","error")}},Da=t=>{const e=u.state.settings||{};e.printerUrl&&!e.printerUrl.includes("receipt-data.html")?window.location.href=`my.bluetoothprint.scheme://${e.printerUrl}`:(window.showToast&&window.showToast("BT App perlu server JSON. Mengalihkan ke RawBT (cetak langsung offline)...","info"),setTimeout(()=>{window.location.href=Ve(t)},800))},za=async t=>{if(!navigator.bluetooth)throw new Error("Web Bluetooth tidak didukung pada browser ini. Gunakan Chrome di Android/PC atau gunakan opsi Cetak Direct.");let e;try{e=await navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["000018f0-0000-1000-8000-00805f9b34fb","e7810a71-73ae-499d-8c15-faa9aef0c3f2","49535343-fe7d-4ae5-8fa9-9fafd205e455","0000ff00-0000-1000-8000-00805f9b34fb","0000ae30-0000-1000-8000-00805f9b34fb","0000fee7-0000-1000-8000-00805f9b34fb","0000ffe0-0000-1000-8000-00805f9b34fb","0000fff0-0000-1000-8000-00805f9b34fb"]})}catch(n){if(n.name==="NotFoundError")return;throw n}const a=await e.gatt.connect();let s=null;try{const n=await a.getPrimaryServices();for(const r of n)try{const d=await r.getCharacteristics();for(const p of d)if(p.properties.write||p.properties.writeWithoutResponse){s=p;break}if(s)break}catch{}if(!s)throw new Error("Karakteristik penulisan printer Bluetooth tidak ditemukan.");const i=Pa(t),o=64;for(let r=0;r<i.length;r+=o){const d=i.slice(r,r+o);s.properties.write?await s.writeValueWithResponse(d):await s.writeValueWithoutResponse(d)}}finally{a!=null&&a.connected&&a.disconnect()}},Oa=async t=>{var a;if(!navigator.usb)throw new Error("WebUSB tidak didukung pada browser ini. Gunakan Chrome/Edge.");let e;try{e=await navigator.usb.requestDevice({filters:[]})}catch(s){if(s.name==="NotFoundError")return;throw s}try{await e.open()}catch(s){if((a=s.message)!=null&&a.toLowerCase().includes("access denied")||s.name==="SecurityError"){window.showToast&&window.showToast("Printer USB Windows dikelola driver sistem. Mengalihkan otomatis ke Cetak Langsung...","info"),ae(t);return}throw s}try{e.configuration===null&&await e.selectConfiguration(1);let s=0,n=1;const i=e.configuration;if(i!=null&&i.interfaces)for(const r of i.interfaces)for(const d of r.alternates){const p=d.endpoints.find(c=>c.direction==="out");if(p){s=r.interfaceNumber,n=p.endpointNumber;break}}await e.claimInterface(s);const o=Pa(t);await e.transferOut(n,o),await e.close(),window.showToast&&window.showToast("Struk terkirim ke printer USB!","success")}catch{window.showToast&&window.showToast("Mengalihkan ke Cetak Langsung via sistem...","info"),ae(t)}},Le=(t="58mm")=>{const e={invoiceNo:`TEST-${t.toUpperCase()}-`+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:u.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};ae(e,t)},Ie=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),a=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${a}${s}`},zn=t=>{let e=65535;for(let a=0;a<t.length;a++){e^=t.charCodeAt(a)<<8;for(let s=0;s<8;s++)e&32768?e=(e<<1^4129)&65535:e=e<<1&65535}return e.toString(16).toUpperCase().padStart(4,"0")},On=(t,e)=>{const a=String(e),s=String(a.length).padStart(2,"0");return`${t}${s}${a}`},Un=(t="",e=0)=>{let a=(t||"").trim();(!a||a.length<20)&&(a="00020101021126590014ID.LINKAJA.WWW011893600911002234477302090022344775204541153033605802ID5920BLUE MOUNTAIN STATION6006BEKASI610517510");const s=a.lastIndexOf("6304");s!==-1&&(a=a.substring(0,s)),a.includes("010211")?a=a.replace("010211","010212"):a.includes("010212")||(a=a.replace("000201","000201010212"));const n=Math.max(0,Math.round(Number(e)||0)),i=/54\d{2}\d+/,o=On("54",n);if(i.test(a))a=a.replace(i,o);else{const d=a.indexOf("5802ID");d!==-1?a=a.slice(0,d)+o+a.slice(d):a+=`${o}5802ID`}a+="6304";const r=zn(a);return a+r},et=(t,e="generic-modal",a="")=>{z();const s=typeof e=="string"&&e.trim()?e.trim():"generic-modal",n=document.createElement("div");n.className="modal-overlay",n.id=`overlay-${s}`;const o=s==="modal-cust-360"||s==="payment-modal"||a.includes("modal--wide")?`modal modal--wide ${a}`.trim():`modal ${a}`.trim();n.innerHTML=`<div class="${o}" id="${s}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(n),n.addEventListener("click",p=>{p.target===n&&z(s)});const r=p=>{p.key==="Escape"&&(document.removeEventListener("keydown",r),z(s))};document.addEventListener("keydown",r);const d=n.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return d.length&&d[0].focus(),n},z=(t=null)=>{const e=typeof t=="string"&&t.trim()?t.trim():null;let a=[];try{if(e){const s=document.getElementById(`overlay-${e}`)||document.querySelector(`#overlay-${e}`);s&&(a=[s])}}catch{}a.length||(a=[...document.querySelectorAll(".modal-overlay")]),a.forEach(s=>{var n;s&&((n=s.querySelector(".modal"))==null||n.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>{try{s.remove()}catch{}},180))})},Rn=t=>{const a=(n=>Math.ceil(n/5e3)*5e3)(t),s=[a,a+5e3,a+1e4,a+2e4,a+5e4,a+1e5];return[...new Set(s.filter(n=>n>=t))].slice(0,4)},_e=(t="cash")=>{const e=u.total,a=u.subtotal,s=u.state.discount||0,n=u.tax,i=u.state.settings||{},o=w(i.bankName||"BCA"),r=w(i.bankNumber||"—"),d=w(i.bankHolder||i.shopName||"Blue Mountain"),p=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran Transaksi</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Tagihan</div>
        <div class="amount">${b(e)}</div>
        ${s>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${b(s)}</div>`:""}
        ${n>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${b(n)}</div>`:""}
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
          ${Rn(e).map(c=>`<button class="quick-amt-btn" data-amount="${c}">${b(c)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px;padding:10px 14px;background:var(--color-success-bg);border:1.5px solid var(--color-success-border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="font-weight:700;color:var(--color-success)">💰 Kembalian</span>
          <span class="value" id="change-amount" style="font-size:18px;font-weight:900;color:var(--color-success)">${b(0)}</span>
        </div>
      </div>

      <!-- Transfer Section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info" style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border-subtle)">
          <div style="font-size:32px;margin-bottom:4px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Silakan transfer nominal berikut:</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-600);margin:6px 0">${b(e)}</div>
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
              ⚡ QRIS Dinamis Otomatis Nominal: <span style="color:var(--blue-600)">${b(e)}</span>
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
            value="${w(u.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${e}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total Tagihan</span><strong>${b(e)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>DP Dibayar Sekarang</span><strong id="debt-paid-display" style="color:var(--color-success)">${b(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang Berjalan</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger);font-size:16px">${b(e)}</strong>
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
  `;et(p,"payment-modal"),setTimeout(()=>{var k,S,l,h;(k=document.getElementById("pay-close-btn"))==null||k.addEventListener("click",()=>z("payment-modal")),(S=document.getElementById("pay-cancel-btn"))==null||S.addEventListener("click",()=>z("payment-modal"));const c=()=>{var A;const v=document.getElementById("qris-dynamic-canvas");if(!v)return;const x=((A=u.state.settings)==null?void 0:A.qrisNumber)||"",y=Un(x,e);Ya.toCanvas(v,y,{width:170,margin:1,errorCorrectionLevel:"M"},P=>{})};c(),document.querySelectorAll(".pay-tab").forEach(v=>{v.addEventListener("click",()=>{var y,A;for(const P of document.querySelectorAll(".pay-tab"))P.classList.remove("active");v.classList.add("active");const x=v.dataset.method;document.getElementById("pay-cash-section").style.display=x==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=x==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=x==="debt"?"":"none",x==="cash"&&((y=document.getElementById("cash-received"))==null||y.focus()),x==="transfer"&&c(),x==="debt"&&((A=document.getElementById("debt-customer"))==null||A.focus())})});const m=document.getElementById("cash-received"),g=document.getElementById("change-amount"),f=()=>{const v=parseFloat(m==null?void 0:m.value)||e,x=Math.max(0,v-e);g&&(g.textContent=b(x))};m==null||m.addEventListener("input",f),f(),(l=document.getElementById("quick-amounts"))==null||l.addEventListener("click",v=>{const x=v.target.closest(".quick-amt-btn");x&&m&&(m.value=x.dataset.amount,f())});const T=document.getElementById("debt-paid-now"),I=()=>{const v=Math.min(parseFloat(T==null?void 0:T.value)||0,e),x=e-v,y=document.getElementById("debt-paid-display"),A=document.getElementById("debt-remaining-display");y&&(y.textContent=b(v)),A&&(A.textContent=b(x))};T==null||T.addEventListener("input",I),(h=document.getElementById("pay-confirm-btn"))==null||h.addEventListener("click",async()=>{var L,K,W,V,B,D,X,at;const v=document.querySelector(".pay-tab.active"),x=(v==null?void 0:v.dataset.method)||"cash",y=document.getElementById("pay-confirm-btn");if(x==="cash"&&(parseFloat(m==null?void 0:m.value)||e)<e){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),m==null||m.focus();return}if(x==="debt"){const R=(K=(L=document.getElementById("debt-customer"))==null?void 0:L.value)==null?void 0:K.trim();if(!R){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(W=document.getElementById("debt-customer"))==null||W.focus();return}const $=Math.min(parseFloat((V=document.getElementById("debt-paid-now"))==null?void 0:V.value)||0,e),C=e-$,N=(u.state.customers||[]).find(M=>(M.name||"").trim().toLowerCase()===R.toLowerCase());if(N&&N.creditLimit>0){const M=(Number(N.totalDebt)||0)+C;if(M>N.creditLimit&&!confirm(`⚠️ Peringatan Limit Piutang!
Total piutang ${N.name} akan menjadi ${b(M)}, melebihi batas kredit (${b(N.creditLimit)}).

Tetap lanjutkan transaksi?`))return}}y&&(y.disabled=!0,y.textContent="⏳ Menyimpan...");const A=new Date().toISOString(),P=await Y();let _=u.state.selectedCustomer||null,O="";x==="debt"?O=((D=(B=document.getElementById("debt-customer"))==null?void 0:B.value)==null?void 0:D.trim())||u.state.customerName||"Pelanggan":O=u.state.customerName||"",!_&&O&&(_=P.find(R=>(R.name||"").trim().toLowerCase()===O.toLowerCase())||null);let U;if(x==="cash"){const R=parseFloat(m==null?void 0:m.value)||e,$=Math.max(0,R-e);U={invoiceNo:Ie(),date:A,dateKey:it(),items:u.state.cart.map(C=>({product:{...C.product},qty:C.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:R,change:$,paidAmount:e,remainingDebt:0,debtPayments:[],customerId:(_==null?void 0:_.id)||null,customerName:(_==null?void 0:_.name)||O,customerPhone:(_==null?void 0:_.phone)||"",cashier:u.state.settings.cashierName||"Kasir"}}else if(x==="transfer")U={invoiceNo:Ie(),date:A,dateKey:it(),items:u.state.cart.map(R=>({product:{...R.product},qty:R.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:e,change:0,paidAmount:e,remainingDebt:0,debtPayments:[],customerId:(_==null?void 0:_.id)||null,customerName:(_==null?void 0:_.name)||O,customerPhone:(_==null?void 0:_.phone)||"",cashier:u.state.settings.cashierName||"Kasir"};else{const R=Math.min(parseFloat((X=document.getElementById("debt-paid-now"))==null?void 0:X.value)||0,e),$=e-R,C=$===0?"paid":R>0?"partial":"unpaid";U={invoiceNo:Ie(),date:A,dateKey:it(),items:u.state.cart.map(N=>({product:{...N.product},qty:N.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"debt",paymentStatus:C,paid:R,change:0,paidAmount:R,remainingDebt:$,debtPayments:R>0?[{date:A,amount:R,note:"DP / Uang muka awal"}]:[],customerId:(_==null?void 0:_.id)||null,customerName:(_==null?void 0:_.name)||O,customerPhone:(_==null?void 0:_.phone)||"",cashier:u.state.settings.cashierName||"Kasir"}}try{if(O){if(_)_.totalOrders=(Number(_.totalOrders)||0)+1,_.totalSpent=(Number(_.totalSpent)||0)+U.total,U.remainingDebt>0&&(_.totalDebt=(Number(_.totalDebt)||0)+U.remainingDebt),await Ht(_),U.customerId=_.id,U.customerName=_.name;else{const N=await Ea({name:O,phone:"",category:"Rumah Tangga",address:"",totalOrders:1,totalSpent:U.total,totalDebt:U.remainingDebt||0,creditLimit:0,galonLoaned:0});U.customerId=N,U.customerName=O}const C=await Y();u.setCustomers(C)}const R=await In(U);U.id=R,u.addTransaction(U),wn(U.items,U).catch(()=>{});for(const C of U.items||[])if((at=C.product)!=null&&at.id){const N=await E.products.get(C.product.id);if(N&&typeof N.stock=="number"){const M=Math.max(0,N.stock-(Number(C.qty)||1));await E.products.update(C.product.id,{stock:M})}}const $=await dt();u.setProducts($),z("payment-modal"),u.clearCart(),jn(U)}catch(R){window.showToast(`Gagal menyimpan transaksi: ${R.message||"Error"}`,"error"),y&&(y.disabled=!1,y.textContent="✅ Proses Pembayaran")}})},0)},jn=t=>{var r,d,p,c,m,g,f,T,I,k;const e=he(t,u.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Aa(t);const a=Ve(t),s=((r=u.state.settings)==null?void 0:r.printerPaper)||"58mm",n=xe(t,s),i=document.createElement("div");i.className="success-overlay",i.id="success-overlay",i.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${w(t.invoiceNo)} &bull; ${b(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${b(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:var(--blue-600);font-size:13px;margin-top:4px">📲 Transfer Terkonfirmasi ✅</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa Piutang: ${b(t.remainingDebt)}</p>`:""}
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
      <a class="btn btn--secondary" href="${a}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
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
  `,document.body.appendChild(i);const o=()=>{i.classList.add("closing"),setTimeout(()=>i.remove(),180)};(d=document.getElementById("success-close-btn"))==null||d.addEventListener("click",o),(p=document.getElementById("btn-close-overlay"))==null||p.addEventListener("click",o),(c=document.getElementById("btn-print-direct"))==null||c.addEventListener("click",()=>{ae(t)}),(m=document.getElementById("btn-mo-whatsapp"))==null||m.addEventListener("click",()=>{Ca(t)}),(g=document.getElementById("btn-mo-png"))==null||g.addEventListener("click",()=>{Ma(t)}),(f=document.getElementById("btn-print-ble"))==null||f.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer Bluetooth...","info"),await za(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(S){window.showToast(S.message||"Gagal koneksi Bluetooth","error")}}),(T=document.getElementById("btn-print-usb"))==null||T.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer USB...","info"),await Oa(t)}catch(S){window.showToast(S.message||"Gagal koneksi WebUSB","error")}}),(I=document.getElementById("btn-mo-btapp"))==null||I.addEventListener("click",()=>{Da(t)}),(k=document.getElementById("btn-new-tx"))==null||k.addEventListener("click",()=>{o(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{i.parentNode&&o()},2e4)},Re=async({onLogin:t=null,forceLock:e=!1}={})=>{var I;if(navigator.onLine)try{await oe()}catch{}let a=await St(),s=a.filter(k=>k.isActive!==!1);if(s.length===0&&(await We(),a=await St(),s=a.filter(k=>k.isActive!==!1)),s.length===0){(I=window.showToast)==null||I.call(window,"Tidak ada akun operator aktif.","error");return}let n=s[0].id,i="";const o="modal-login-operator",r={owner:{color:"#8b5cf6",label:"👑 Owner"},supervisor:{color:"#2563eb",label:"⭐ Supervisor"},cashier:{color:"#10b981",label:"👤 Kasir"}},d=()=>`
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
        ${s.map(k=>{const S=String(k.id)===String(n),l=r[k.role]||r.cashier;return`
            <button type="button" class="btn-select-operator" data-id="${k.id}" style="
              padding: 10px 14px;
              border-radius: 12px;
              border: 2px solid ${S?"var(--primary, #2563eb)":"var(--border, #e2e8f0)"};
              background: ${S?"rgba(37, 99, 235, 0.08)":"var(--bg-card, #ffffff)"};
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
              transition: all 0.2s;
            ">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: ${l.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${(k.name||"U").charAt(0).toUpperCase()}
              </div>
              <div style="text-align: left;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${w(k.name)}</div>
                <div style="font-size: 11px; color: ${l.color}; font-weight: 600;">${l.label}</div>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- PIN Display -->
      <div id="pin-display-box" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;">
          ${[0,1,2,3,4,5].map(k=>`
            <span class="pin-dot" style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid var(--primary, #2563eb);
              background: ${k<i.length?"var(--primary, #2563eb)":"transparent"};
              display: inline-block;
              transition: background 0.15s;
            "></span>
          `).join("")}
        </div>
        <div id="pin-error-msg" style="min-height: 18px; font-size: 12px; font-weight: 600; color: #dc2626;"></div>
      </div>

      <!-- Numpad -->
      <div style="max-width: 260px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${[1,2,3,4,5,6,7,8,9].map(k=>`
          <button type="button" class="btn-numpad" data-val="${k}" style="
            height: 52px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 12px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
          ">${k}</button>
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

      ${e?"":`
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
  `;et(d(),o,"modal--login");const p=()=>{document.querySelectorAll("#pin-display-box .pin-dot").forEach((S,l)=>{S.style.background=l<i.length?"var(--primary, #2563eb)":"transparent"})},c="bm_pin_lockout",m=()=>{try{const k=JSON.parse(localStorage.getItem(c)||"{}");return{count:Number(k.count)||0,until:Number(k.until)||0}}catch{return{count:0,until:0}}},g=(k,S)=>{try{localStorage.setItem(c,JSON.stringify({count:k,until:S}))}catch{}},f=async(k=!1)=>{var v;const S=s.find(x=>String(x.id)===String(n));if(!S)return;const l=m(),h=document.getElementById("pin-error-msg");if(l.until>Date.now()){const x=Math.ceil((l.until-Date.now())/1e3);h&&(h.textContent=`Sistem terkunci! Tunggu ${x} detik.`),i="",p();return}if(i.length>=4){const x=await qe(S.username,i);if(x.success){g(0,0),u.login(x.user,x.token),z(o);const y=x.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(v=window.showToast)==null||v.call(window,`Operator aktif: ${x.user.name} (${x.user.role})${y}`,"success"),typeof t=="function"&&t(x.user);return}else if(k||i.length>=6){const y=m().count+1;y>=5?(g(y,Date.now()+6e4),h&&(h.textContent="PIN salah 5x! Sistem terkunci 60 detik.")):(g(y,0),h&&(h.textContent=`${x.error||"PIN salah!"} (Sisa percobaan: ${5-y})`)),i="",p();return}}k&&i.length<4&&(h&&(h.textContent="Masukkan minimal 4 digit PIN"),i="",p())},T=()=>{var S;document.querySelectorAll(".btn-select-operator").forEach(l=>{l.addEventListener("click",()=>{n=l.getAttribute("data-id"),i="";const h=document.getElementById(o);h&&(h.innerHTML=d(),T())})}),document.querySelectorAll(".btn-numpad").forEach(l=>{l.addEventListener("click",()=>{const h=l.getAttribute("data-val"),v=document.getElementById("pin-error-msg");v&&(v.textContent=""),h==="clear"?(i="",p()):h==="submit"?f(!0):i.length<6&&(i+=h,p(),f(!1))})}),(S=document.getElementById("btn-cancel-login"))==null||S.addEventListener("click",()=>{z(o)});const k=l=>{if(!document.getElementById(o)){window.removeEventListener("keydown",k);return}["INPUT","TEXTAREA"].includes(l.target.tagName)||(l.key>="0"&&l.key<="9"?(l.preventDefault(),i.length<6&&(i+=l.key,p(),f(!1))):l.key==="Backspace"?(l.preventDefault(),i=i.slice(0,-1),p()):l.key==="Enter"?(l.preventDefault(),f(!0)):l.key==="Escape"&&!e&&(l.preventDefault(),z(o)))};window.addEventListener("keydown",k)};T()};let Ct=[],de="all",Mt="",Z=1;const Wt=10,Kn=[{id:"all",label:"Semua"},{id:"Rumah Tangga",label:"🏠 Rumah Tangga"},{id:"Kantor/Instansi",label:"🏢 Kantor/Instansi"},{id:"Warung/Reseller",label:"🏪 Warung/Reseller"},{id:"VIP",label:"🌟 VIP"}],Fn=async()=>{if(Ct.length){for(const s of Ct)typeof s=="function"&&s();Ct=[]}Ct.push(u.on("customers:change",()=>vt())),Ct.push(u.on("transactions:change",()=>vt()));const t=()=>{const s=document.getElementById("view-customers");s!=null&&s.classList.contains("active")&&vt()};window.addEventListener("resize",t),Ct.push(()=>window.removeEventListener("resize",t));const[e,a]=await Promise.all([Y(),pt()]);u.setCustomers(e),u.setTransactions(a),vt()},Ua=(t,e=[])=>{const a=t.id?String(t.id):null,s=(t.name||"").trim().toLowerCase(),n=(t.phone||"").replace(/\D/g,"");return e.filter(i=>!!(a&&i.customerId&&String(i.customerId)===a||s&&i.customerName&&i.customerName.trim().toLowerCase()===s||n&&i.customerPhone&&i.customerPhone.replace(/\D/g,"")===n)).sort((i,o)=>new Date(o.date)-new Date(i.date))},vt=async()=>{var I,k,S;const t=document.getElementById("view-customers");if(!t)return;const e=u.state.customers||[],a=await pt(),s={};for(const l of a){const h=l.customerId?String(l.customerId):null,v=(l.customerName||"").trim().toLowerCase(),x=[];h&&x.push(`id:${h}`),v&&x.push(`name:${v}`);for(const y of x)s[y]||(s[y]={orders:0,spent:0,debt:0,txIds:new Set}),s[y].txIds.has(l.id)||(s[y].txIds.add(l.id),s[y].orders+=1,s[y].spent+=Number(l.total)||0,l.paymentMethod==="debt"&&(Number(l.remainingDebt)||0)>0&&(s[y].debt+=Number(l.remainingDebt)||0))}const n=e.length;let i=0,o=0,r=0;e.forEach(l=>{const h=`id:${l.id}`,v=`name:${(l.name||"").trim().toLowerCase()}`,x=s[h],y=s[v],A=Math.max((x==null?void 0:x.debt)||0,(y==null?void 0:y.debt)||0),P=Math.max((x==null?void 0:x.spent)||0,(y==null?void 0:y.spent)||0),_=Math.max(Number(l.totalDebt||0),A),O=Math.max(Number(l.totalSpent||0),P);i+=_,r+=O,o+=Number(l.galonLoaned||0)});const d=e.filter(l=>{const h=de==="all"||l.category===de,v=!Mt||(l.name||"").toLowerCase().includes(Mt.toLowerCase())||(l.phone||"").includes(Mt)||(l.address||"").toLowerCase().includes(Mt.toLowerCase());return h&&v}),p=d.length,c=Math.max(1,Math.ceil(p/Wt));Z>c&&(Z=c),Z<1&&(Z=1);const m=p===0?0:(Z-1)*Wt+1,g=Math.min(Z*Wt,p),f=d.slice((Z-1)*Wt,Z*Wt);t.innerHTML=`
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
        <div style="font-size:20px;font-weight:800;color:#dc2626;margin-top:4px">${b(i)}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Galon Dipinjam</div>
        <div style="font-size:20px;font-weight:800;color:#d97706;margin-top:4px">${o} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">galon</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Akumulasi Omzet (LTV)</div>
        <div style="font-size:20px;font-weight:800;color:#16a34a;margin-top:4px">${b(r)}</div>
      </div>
    </div>

    <!-- Filters & Responsive Search Bar -->
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px">
      <div class="category-pills" style="display:flex;flex-wrap:wrap;gap:6px;max-width:100%">
        ${Kn.map(l=>`
          <button class="btn btn--sm ${l.id===de?"btn--primary":"btn--secondary"} cat-filter-btn"
                  data-cat="${l.id}" style="border-radius:20px;font-size:12px;padding:5px 12px">
            ${l.label}
          </button>
        `).join("")}
      </div>

      <div style="position:relative;flex:1;min-width:200px;max-width:320px">
        <input type="text" class="input" id="cust-search"
               placeholder="Cari nama, nomor HP, alamat..."
               value="${w(Mt)}"
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
            ${f.length===0?`
              <tr>
                <td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                  Belum ada data pelanggan yang sesuai filter.
                </td>
              </tr>
            `:f.map(l=>{const h=`id:${l.id}`,v=`name:${(l.name||"").trim().toLowerCase()}`,x=s[h],y=s[v],A=Math.max((x==null?void 0:x.debt)||0,(y==null?void 0:y.debt)||0),P=Math.max(Number(l.totalDebt||0),A),_=(l.phone||"").replace(/\D/g,""),O=_.startsWith("08")?`62${_.slice(1)}`:_;return`
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--text-primary)">${w(l.name)}</div>
                    ${l.creditLimit>0?`<div style="font-size:11px;color:var(--text-muted)">Limit: ${b(l.creditLimit)}</div>`:""}
                  </td>
                  <td>
                    <span class="badge badge--blue">
                      ${w(l.category||"Rumah Tangga")}
                    </span>
                  </td>
                  <td>
                    ${O?`
                      <a href="https://wa.me/${O}" target="_blank" rel="noopener noreferrer"
                         style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                        💬 ${w(l.phone)}
                      </a>
                    `:'<span style="color:var(--text-muted)">-</span>'}
                  </td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${w(l.address||"-")}">
                    ${w(l.address||"-")}
                  </td>
                  <td style="text-align:right">
                    ${P>0?`
                      <div style="color:#dc2626;font-weight:800;font-size:13px">${b(P)}</div>
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
          Menampilkan <strong>${m}-${g}</strong> dari <strong>${p}</strong> pelanggan
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn btn--secondary btn--sm" id="cust-prev-page" ${Z<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            ◀ Sebelumnya
          </button>
          <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
            Hal ${Z} / ${c}
          </span>
          <button class="btn btn--secondary btn--sm" id="cust-next-page" ${Z>=c?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            Berikutnya ▶
          </button>
        </div>
      </div>
    </div>

    <!-- Dock Clearance Spacer: prevents bottom navigation dock from overlapping content -->
    <div style="height:48px" aria-hidden="true"></div>
  `,t.querySelectorAll(".cat-filter-btn").forEach(l=>{l.addEventListener("click",()=>{de=l.dataset.cat,Z=1,vt()})});const T=document.getElementById("cust-search");T==null||T.addEventListener("input",l=>{Mt=l.target.value,Z=1,vt()}),(I=document.getElementById("cust-prev-page"))==null||I.addEventListener("click",()=>{Z>1&&(Z--,vt())}),(k=document.getElementById("cust-next-page"))==null||k.addEventListener("click",()=>{Z<c&&(Z++,vt())}),(S=document.getElementById("btn-add-customer"))==null||S.addEventListener("click",()=>{Kt()}),t.querySelectorAll(".btn-edit-cust").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.id,v=e.find(x=>String(x.id)===String(h));v&&Kt(v)})}),t.querySelectorAll(".btn-del-cust").forEach(l=>{l.addEventListener("click",async()=>{var x;const h=l.dataset.id,v=e.find(y=>String(y.id)===String(h));if(v&&confirm(`Hapus pelanggan "${v.name}"?`)){await $n(v.id);const y=await Y();u.setCustomers(y),(x=window.showToast)==null||x.call(window,"Pelanggan berhasil dihapus.","info")}})}),t.querySelectorAll(".btn-view-360").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.id,v=e.find(x=>String(x.id)===String(h));v&&Hn(v)})}),t.querySelectorAll(".btn-pay-debt-quick").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.id,v=e.find(x=>String(x.id)===String(h));v&&Ra(v)})})},Kt=(t=null)=>{var s,n,i;const e=!!t,a=`
    <div class="modal-header">
      <h3 class="modal-title">${e?"✏️ Edit Data Pelanggan":"➕ Tambah Pelanggan Baru"}</h3>
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
        ${e?`
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
      <button class="btn btn--primary" id="cust-save-btn" type="button">${e?"💾 Simpan Perubahan":"➕ Tambahkan Pelanggan"}</button>
    </div>
  `;et(a,"modal-cust"),(s=document.getElementById("modal-cust-close"))==null||s.addEventListener("click",()=>z("modal-cust")),(n=document.getElementById("cust-cancel-btn"))==null||n.addEventListener("click",()=>z("modal-cust")),(i=document.getElementById("cust-save-btn"))==null||i.addEventListener("click",async()=>{var S,l,h;const o=document.getElementById("cf-name").value.trim(),r=document.getElementById("cf-phone").value.trim(),d=document.getElementById("cf-category").value,p=document.getElementById("cf-address").value.trim(),c=Math.max(0,Number(document.getElementById("cf-creditLimit").value)||0),m=Math.max(0,Number(document.getElementById("cf-galonLoaned").value)||0),g=document.getElementById("cf-notes").value.trim(),f=document.getElementById("cf-totalDebt"),T=f?Math.max(0,Number(f.value)||0):(t==null?void 0:t.totalDebt)||0;if(!o){(S=window.showToast)==null||S.call(window,"Nama pelanggan wajib diisi!","warning");return}const I={name:o,phone:r,category:d,address:p,creditLimit:c,galonLoaned:m,notes:g,totalOrders:(t==null?void 0:t.totalOrders)||0,totalSpent:(t==null?void 0:t.totalSpent)||0,totalDebt:T};e?(await Ht({...I,id:t.id}),(l=window.showToast)==null||l.call(window,"Data pelanggan berhasil diperbarui!","success")):(await Ea(I),(h=window.showToast)==null||h.call(window,"Pelanggan baru berhasil ditambahkan!","success")),z("modal-cust");const k=await Y();u.setCustomers(k)})},Hn=async t=>{var g,f,T,I;const e=await pt(),a=Ua(t,e),s=(t.phone||"").replace(/\D/g,""),n=s.startsWith("08")?`62${s.slice(1)}`:s;let i=0,o=0;a.forEach(k=>{i+=Number(k.total||0),k.paymentMethod==="debt"&&(Number(k.remainingDebt)||0)>0&&(o+=Number(k.remainingDebt||0))});const r=Math.max(Number(t.totalSpent||0),i),d=Math.max(Number(t.totalDebt||0),o),p=Math.max(Number(t.totalOrders||0),a.length),c=encodeURIComponent(`Halo *${t.name}*, ini pengingat dari *${((g=u.state.settings)==null?void 0:g.shopName)||"Blue Mountain"}* terkait sisa piutang Anda sebesar *${b(d)}*. Terima kasih!`),m=`
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
          <div style="font-size:16px;font-weight:900;color:var(--blue-600)">${p} kali</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Belanja (LTV)</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-success)">${b(r)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Sisa Piutang</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-danger)">${b(d)}</div>
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
        <div><strong>💳 Limit Kredit:</strong> ${t.creditLimit>0?b(t.creditLimit):"Tanpa batas"}</div>
        ${t.notes?`<div><strong>📝 Catatan:</strong> ${w(t.notes)}</div>`:""}
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${d>0?`
          <button class="btn btn--primary" id="btn-drawer-pay-debt" style="font-size:12px;display:inline-flex;align-items:center;gap:4px;font-weight:700">
            💰 Bayar / Pelunasan Hutang (${b(d)})
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
          <h4 style="margin:0;font-size:14px;font-weight:800">📋 Riwayat Pembelian (${a.length})</h4>
          ${a.length>0?'<span style="font-size:11px;color:var(--text-muted)">⇄ Geser horizontal jika di HP</span>':""}
        </div>
        ${a.length===0?`
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
                ${a.slice(0,20).map(k=>{const S=Number(k.remainingDebt)||0;return`
                    <tr style="border-bottom:1px solid var(--card-border)">
                      <td style="padding:8px 12px;font-weight:700;white-space:nowrap">${w(k.invoiceNo)}</td>
                      <td style="padding:8px 12px;white-space:nowrap">${ft(new Date(k.date))}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:700;white-space:nowrap">${b(k.total)}</td>
                      <td style="padding:8px 12px;text-align:center;white-space:nowrap">
                        <span class="badge" style="font-size:10px;text-transform:uppercase">${w(k.paymentStatus||k.paymentMethod)}</span>
                      </td>
                      <td style="padding:8px 12px;text-align:right;white-space:nowrap">
                        ${S>0?`
                          <strong style="color:var(--color-danger)">${b(S)}</strong>
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
  `;et(m,"modal-cust-360"),(f=document.getElementById("drawer-close-btn"))==null||f.addEventListener("click",()=>z("modal-cust-360")),(T=document.getElementById("drawer-ok-btn"))==null||T.addEventListener("click",()=>z("modal-cust-360")),(I=document.getElementById("btn-drawer-pay-debt"))==null||I.addEventListener("click",()=>{z("modal-cust-360"),Ra(t)})},Ra=async t=>{var o,r,d,p;const e=await pt(),s=Ua(t,e).filter(c=>c.paymentMethod==="debt"&&(Number(c.remainingDebt)||0)>0),n=Math.max(Number(t.totalDebt||0),s.reduce((c,m)=>c+(Number(m.remainingDebt)||0),0));if(n<=0){(o=window.showToast)==null||o.call(window,"Pelanggan ini tidak memiliki sisa piutang.","info");return}const i=`
    <div class="modal-header">
      <h3 class="modal-title">💰 Pembayaran Piutang: ${w(t.name)}</h3>
      <button class="modal-close" id="pcd-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);padding:12px 16px;border-radius:10px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase">Total Sisa Piutang</div>
          <div style="font-size:22px;font-weight:900;color:var(--color-danger);margin-top:2px">${b(n)}</div>
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
          Pelunasan Penuh (${b(n)})
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
  `;et(i,"modal-pay-customer-debt"),(r=document.getElementById("pcd-close-btn"))==null||r.addEventListener("click",()=>z("modal-pay-customer-debt")),(d=document.getElementById("pcd-cancel-btn"))==null||d.addEventListener("click",()=>z("modal-pay-customer-debt")),document.querySelectorAll(".pcd-quick-amt").forEach(c=>{c.addEventListener("click",()=>{const m=document.getElementById("pcd-amount");m&&(m.value=c.dataset.amt)})}),(p=document.getElementById("pcd-submit-btn"))==null||p.addEventListener("click",async()=>{var g,f,T,I,k,S;const c=Number((g=document.getElementById("pcd-amount"))==null?void 0:g.value)||0,m=((T=(f=document.getElementById("pcd-note"))==null?void 0:f.value)==null?void 0:T.trim())||"Pembayaran piutang";if(c<=0||c>n){(I=window.showToast)==null||I.call(window,`Jumlah pembayaran harus antara Rp 1 dan ${b(n)}`,"warning");return}try{let l=c;const h=new Date().toISOString(),v=[...s].sort((P,_)=>new Date(P.date)-new Date(_.date));for(const P of v){if(l<=0)break;const _=Number(P.remainingDebt)||0,O=Math.min(l,_),U=(Number(P.paidAmount)||0)+O,L=Math.max(0,_-O),K=L===0?"paid":"partial",W=(P.debtPayments||[]).length+1,V=L===0?`${m} (Pelunasan/LUNAS ✅)`:`${m} (Cicilan #${W})`,B=[...P.debtPayments||[],{date:h,amount:O,note:V}],D={...P,paidAmount:U,remainingDebt:L,paymentStatus:K,debtPayments:B};await te(D),u.updateTransaction(P.id,D),l-=O}const y=(await Y()).find(P=>String(P.id)===String(t.id))||t;y.totalDebt=Math.max(0,(Number(y.totalDebt)||0)-c),await Ht(y);const A=await Y();u.setCustomers(A),z("modal-pay-customer-debt"),(k=window.showToast)==null||k.call(window,`Pembayaran ${b(c)} untuk ${t.name} berhasil dicatat!`,"success")}catch(l){(S=window.showToast)==null||S.call(window,`Gagal mencatat pembayaran hutang: ${l.message||"Error"}`,"error")}})},ia=t=>{if(t==null)return'""';const e=String(t);return e.includes('"')||e.includes(",")||e.includes(`
`)||e.includes("\r")?`"${e.replace(/"/g,'""')}"`:`"${e}"`},Xe=(t,e,a)=>{const s=e.map(ia).join(","),n=a.map(p=>p.map(ia).join(",")),i=`\uFEFF${[s,...n].join(`\r
`)}`,o=new Blob([i],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(o),d=document.createElement("a");d.setAttribute("href",r),d.setAttribute("download",t.endsWith(".csv")?t:`${t}.csv`),d.style.visibility="hidden",document.body.appendChild(d),d.click(),document.body.removeChild(d),setTimeout(()=>URL.revokeObjectURL(r),1e3)};let Ae=null,Be=null,Pe=null,Rt=!1,mt=1,gt=1,bt=1;const yt=10,qn=async()=>{Ae&&Ae(),Be&&Be(),Pe&&Pe(),Ae=u.on("transactions:change",()=>{Rt||ot()}),Be=u.on("expenses:change",()=>{Rt||ot()}),Pe=u.on("customers:change",()=>{Rt||ot()}),await ot()},ot=async()=>{if(!Rt){Rt=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,a,s]=await Promise.all([u.state.transactions.length?Promise.resolve(u.state.transactions):pt().then(L=>(u.setTransactions(L),L)),ee().then(L=>(u.setExpenses(L),L)),Ge("modalAwal")]),n=parseFloat(s)||0;let i=0,o=0,r=0,d=0,p=0;for(const L of e)if(L.paymentMethod==="cash"&&(L.paymentStatus==="paid"||!L.paymentStatus)&&(i+=L.total),L.paymentMethod==="transfer"&&(L.paymentStatus==="transfer_confirmed"?o+=L.total:d+=L.total),L.paymentMethod==="debt"){for(const K of L.debtPayments||[])r+=K.amount;p+=L.remainingDebt||0}const c=i+o+r,m=a.reduce((L,K)=>L+(K.amount||0),0),g=n+c-m,f=d+p,T=Gn(e,a),I=Jn(e,a),k=I.reduce((L,K)=>L+(K.debit||0),0),S=I.reduce((L,K)=>L+(K.credit||0),0),l=k===S,h=(u.state.customers||[]).reduce((L,K)=>L+(Number(K.galonLoaned)||0),0),v=[...e.filter(L=>L.paymentStatus==="transfer_pending"),...e.filter(L=>(L.paymentMethod==="debt"||L.paymentStatus==="partial"||L.paymentStatus==="unpaid")&&(L.remainingDebt||0)>0)].sort((L,K)=>new Date(L.date)-new Date(K.date)),x=Math.max(1,Math.ceil(v.length/yt));mt>x&&(mt=x);const y=v.slice((mt-1)*yt,mt*yt),A=[...a].sort((L,K)=>new Date(K.date)-new Date(L.date)),P=Math.max(1,Math.ceil(A.length/yt));gt>P&&(gt=P);const _=A.slice((gt-1)*yt,gt*yt),O=Math.max(1,Math.ceil(I.length/yt));bt>O&&(bt=O);const U=I.slice((bt-1)*yt,bt*yt);t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${b(n)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${b(g)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${b(c)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${b(m)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${a.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${b(f)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${v.length} belum lunas</div>
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
            <div style="font-size:18px;font-weight:900;color:var(--color-warning)">${h} <span style="font-size:12px;font-weight:600">galon</span></div>
            <div style="font-size:10px;color:var(--text-muted)">Di ${(u.state.customers||[]).filter(L=>(L.galonLoaned||0)>0).length} pelanggan</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Nilai Aset Galon Toko</div>
            <div style="font-size:18px;font-weight:900;color:var(--blue-600)">${b(h*45e3)}</div>
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
          ${Jt("💵 Tunai",i,"#16a34a")}
          ${Jt("📲 Transfer",o,"#2563eb")}
          ${Jt("📋 Cicilan Hutang",r,"#7c3aed")}
          ${Jt("⏳ Transfer Pending",d,"#d97706",!0)}
          ${Jt("🔴 Piutang Hutang",p,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding Table with Pagination (10/page) -->
      ${v.length>0?`
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
          ⚠️ Daftar Piutang &amp; Cicilan Berjalan (${v.length} transaksi)
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
              ${y.map(L=>{const K=L.total||0,W=L.paymentStatus==="transfer_pending"?K:L.remainingDebt||0,V=K-W,B=Math.min(100,Math.max(0,Math.round(V/K*100))),D=(L.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${w(L.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${w(L.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(L.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${b(K)}</td>
                <td style="color:#16a34a;font-weight:700">${b(V)}</td>
                <td style="font-weight:800;color:#dc2626">${b(W)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${B}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${D>0?`${D}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${B}%;background:${B===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${L.paymentStatus==="transfer_pending"?`
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${L.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>`:`
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${L.id}"
                      style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      💰 Cicil / Pelunasan
                    </button>`}
                </td>
              </tr>`}).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${mt} dari ${x}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="piutang-prev" ${mt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="piutang-next" ${mt>=x?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>`:""}

      <!-- Pengeluaran Operasional Table with Pagination (10/page) -->
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">📤 Pengeluaran Operasional (${a.length} entri)</div>
          <button class="btn btn--primary btn--sm" id="btn-add-expense">+ Tambah Pengeluaran</button>
        </div>
        ${a.length===0?`
          <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        `:`
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${_.map(L=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(L.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${w(L.category||"Lainnya")}</span></td>
                  <td>${w(L.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${b(L.amount)}</td>
                  <td>
                    <button class="btn btn--sm" data-action="delete-expense" data-id="${L.id}"
                      style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
            <div style="font-size:12px;color:var(--text-muted)">Hal ${gt} dari ${P}</div>
            <div style="display:flex;gap:6px">
              <button class="btn btn--secondary btn--sm" id="exp-prev" ${gt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
              <button class="btn btn--secondary btn--sm" id="exp-next" ${gt>=P?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
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
              ${Wn(T,n)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Jurnal Entri with Pagination (10/page) -->
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
            📒 Jurnal Entri Akuntansi SAK EMKM (${I.length} baris)
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badge" style="background:${l?"#dcfce7":"#fee2e2"};color:${l?"#166534":"#991b1b"};border:1px solid ${l?"#86efac":"#fca5a5"};font-size:11px;font-weight:700;padding:4px 10px">
              ⚖️ Debit: ${b(k)} | Kredit: ${b(S)} (${l?"Seimbang ✅":"Selisih ⚠️"})
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
              ${U.map(L=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(L.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${w(L.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${L.debit>0?b(L.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${L.credit>0?b(L.credit):"—"}</td>
                <td><span class="badge ${L.type==="kas"?"badge--green":L.type==="piutang"?"":"badge--blue"}"
                  style="${L.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${w(L.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${bt} dari ${O}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="journal-prev" ${bt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="journal-next" ${bt>=O?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>
    `,Vn(e,a,I)}finally{Rt=!1}}},Jt=(t,e,a,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${a}">${b(e)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Gn=(t,e)=>{const a={};for(const n of t){const i=n.dateKey;if(i){if(a[i]||(a[i]={masuk:0,keluar:0}),n.paymentMethod==="cash"&&(n.paymentStatus==="paid"||!n.paymentStatus)&&(a[i].masuk+=n.total),n.paymentMethod==="transfer"&&n.paymentStatus==="transfer_confirmed"){const o=n.confirmedAt?n.confirmedAt.split("T")[0]:i;a[o]||(a[o]={masuk:0,keluar:0}),a[o].masuk+=n.total}if(n.paymentMethod==="debt")for(const o of n.debtPayments||[]){const r=o.date?o.date.split("T")[0]:i;a[r]||(a[r]={masuk:0,keluar:0}),a[r].masuk+=o.amount}}}for(const n of e){const i=n.dateKey||(n.date?n.date.split("T")[0]:null);i&&(a[i]||(a[i]={masuk:0,keluar:0}),a[i].keluar+=n.amount||0)}const s=[];for(let n=29;n>=0;n--){const i=new Date;i.setDate(i.getDate()-n);const o=it(i);s.push({key:o,...a[o]||{masuk:0,keluar:0}})}return s},Wn=(t,e)=>{let a=e;const s=t.filter(n=>n.masuk>0||n.keluar>0).map(n=>{const i=n.masuk-n.keluar;return a+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(n.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${n.masuk>0?b(n.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${n.keluar>0?b(n.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${b(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${b(a)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Jn=(t,e)=>{const a=[];for(const s of t){const n=w(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")a.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1001] Kas Toko / [4001] Pendapatan Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?a.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1002] Bank Transfer & QRIS / [4001] Pendapatan",type:"kas"}):a.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${n}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"[1101] Piutang Transfer / [4001] Pendapatan",type:"piutang"});else if(s.paymentMethod==="debt"){a.push({date:s.date,desc:`Penjualan Kredit/Tempo — ${s.invoiceNo} (${n}) [Total: ${b(s.total)}]`,debit:s.total,credit:s.total,account:"[1101] Piutang Usaha / [4001] Pendapatan",type:"piutang"});const i=s.debtPayments||[];let o=0;i.forEach((r,d)=>{o+=r.amount||0;const p=Math.max(0,s.total-o),c=p===0,m=d+1,g=c?`Pelunasan Piutang (#${m}/LUNAS ✅)`:`Cicilan Piutang #${m} (dari ${i.length})`,f=r.note?` — ${w(r.note)}`:"";a.push({date:r.date,desc:`${g} — ${s.invoiceNo} (${n})${f} [Bayar: ${b(r.amount)} | Sisa: ${b(p)}]`,debit:r.amount,credit:r.amount,account:c?"[1001] Kas Toko / [1101] Piutang (LUNAS ✅)":"[1001] Kas Toko / [1101] Piutang Usaha",type:"kas"})})}}for(const s of e){const n=(s.category||"").toLowerCase();let i="[6099] Beban Operasional";n.includes("tutup")||n.includes("tisu")||n.includes("galon")||n.includes("bahan")?i="[6001] Beban Tutup & Tisu":n.includes("listrik")||n.includes("air")||n.includes("utilitas")?i="[6002] Beban Utilitas/Listrik":n.includes("gaji")||n.includes("upah")?i="[6003] Beban Gaji Karyawan":(n.includes("bensin")||n.includes("antar")||n.includes("transport"))&&(i="[6004] Beban Transportasi"),a.push({date:s.date,desc:`Beban ${w(s.category||"Operasional")} — ${w(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`${i} / [1001] Kas Toko`,type:"beban"})}return a.sort((s,n)=>new Date(n.date)-new Date(s.date))},Vn=(t,e=[],a=[])=>{var s,n,i,o,r,d,p,c,m,g,f,T;(s=document.getElementById("btn-refresh-finance"))==null||s.addEventListener("click",ot),(n=document.getElementById("piutang-prev"))==null||n.addEventListener("click",()=>{mt>1&&(mt--,ot())}),(i=document.getElementById("piutang-next"))==null||i.addEventListener("click",()=>{mt++,ot()}),(o=document.getElementById("exp-prev"))==null||o.addEventListener("click",()=>{gt>1&&(gt--,ot())}),(r=document.getElementById("exp-next"))==null||r.addEventListener("click",()=>{gt++,ot()}),(d=document.getElementById("journal-prev"))==null||d.addEventListener("click",()=>{bt>1&&(bt--,ot())}),(p=document.getElementById("journal-next"))==null||p.addEventListener("click",()=>{bt++,ot()}),(c=document.getElementById("btn-export-journal-csv"))==null||c.addEventListener("click",()=>{var l;const I=["Tanggal","Keterangan","Debit","Kredit","Bagan Akun COA"],k=a.map(h=>[ft(new Date(h.date)),h.desc||"",h.debit||0,h.credit||0,h.account||""]),S=it();Xe(`Jurnal-Akuntansi-${S}.csv`,I,k),(l=window.showToast)==null||l.call(window,"✅ Jurnal akuntansi berhasil diekspor ke file CSV/Excel!","success")}),(m=document.getElementById("btn-set-modal-awal"))==null||m.addEventListener("click",()=>{const k=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${u.state.settings.modalAwal||0||""}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;et(k,"modal-awal"),setTimeout(()=>{var S,l,h;(S=document.getElementById("ma-x"))==null||S.addEventListener("click",()=>z("modal-awal")),(l=document.getElementById("ma-cancel"))==null||l.addEventListener("click",()=>z("modal-awal")),(h=document.getElementById("ma-save"))==null||h.addEventListener("click",async()=>{var x;const v=parseFloat((x=document.getElementById("modal-awal-input"))==null?void 0:x.value)||0;await La("modalAwal",v),u.updateSettings({modalAwal:v}),z("modal-awal"),window.showToast("Modal Awal disimpan!","success"),ot()})},0)}),(g=document.getElementById("btn-add-expense"))==null||g.addEventListener("click",()=>{const k=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(S=>`<option value="${w(S)}">${w(S)}</option>`).join("")}
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
    `;et(k,"expense-modal"),setTimeout(()=>{var S,l,h;(S=document.getElementById("exp-x"))==null||S.addEventListener("click",()=>z("expense-modal")),(l=document.getElementById("exp-cancel"))==null||l.addEventListener("click",()=>z("expense-modal")),(h=document.getElementById("exp-save"))==null||h.addEventListener("click",async()=>{var _,O,U,L;const v=parseFloat((_=document.getElementById("exp-amount"))==null?void 0:_.value)||0,x=((O=document.getElementById("exp-category"))==null?void 0:O.value)||"Lainnya",y=((L=(U=document.getElementById("exp-note"))==null?void 0:U.value)==null?void 0:L.trim())||"";if(v<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const A=new Date().toISOString(),P={date:A,dateKey:A.split("T")[0],category:x,note:y,amount:v};try{const K=await An(P);P.id=K,u.addExpense(P),z("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch{window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(f=document.getElementById("expense-table"))==null||f.addEventListener("click",async I=>{const k=I.target.closest('[data-action="delete-expense"]');if(!k||!confirm("Hapus pengeluaran ini?"))return;const S=String(k.dataset.id),l=Number.isNaN(Number(S))?S:Number(S);try{await Bn(l),u.removeExpense(l),window.showToast("Pengeluaran dihapus","success")}catch{window.showToast("Gagal hapus","error")}}),(T=document.getElementById("piutang-table"))==null||T.addEventListener("click",async I=>{const k=I.target.closest("[data-action]");if(!k)return;const S=String(k.dataset.id),l=Number.isNaN(Number(S))?S:Number(S),h=k.dataset.action,v=(u.state.transactions||t).find(x=>String(x.id)===S);if(v){if(h==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${b(v.total)} dari ${w(v.customerName||"pelanggan")} sudah diterima?`))return;const x={...v,paymentStatus:"transfer_confirmed",paidAmount:v.total,confirmedAt:new Date().toISOString()};try{await te(x),u.updateTransaction(l,{paymentStatus:"transfer_confirmed",paidAmount:v.total,confirmedAt:x.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}}if(h==="pay-debt"){const x=v.remainingDebt||0,y=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${b(v.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${b(x)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${x}" min="1" max="${x}" step="1000" inputmode="numeric">
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
      `;et(y,"mini-cicil"),setTimeout(()=>{var A,P,_;(A=document.getElementById("mc-x"))==null||A.addEventListener("click",()=>z("mini-cicil")),(P=document.getElementById("mc-cancel"))==null||P.addEventListener("click",()=>z("mini-cicil")),(_=document.getElementById("mc-save"))==null||_.addEventListener("click",async()=>{var at,R,$;const O=parseFloat((at=document.getElementById("mc-amount"))==null?void 0:at.value)||0;if(O<=0||O>x){window.showToast("Jumlah tidak valid","warning");return}const U=(v.paidAmount||0)+O,L=Math.max(0,x-O),K=L===0?"paid":"partial",W=(v.debtPayments||[]).length+1,V=L===0?`Pelunasan (#${W}/LUNAS ✅)`:`Cicilan #${W}`,B=(($=(R=document.getElementById("mc-note"))==null?void 0:R.value)==null?void 0:$.trim())||V,D=[...v.debtPayments||[],{date:new Date().toISOString(),amount:O,note:B}],X={...v,paidAmount:U,remainingDebt:L,paymentStatus:K,debtPayments:D};try{if(await te(X),u.updateTransaction(l,{paidAmount:U,remainingDebt:L,paymentStatus:K,debtPayments:D}),v.customerId||v.customerName){const N=(await Y()).find(M=>v.customerId&&String(M.id)===String(v.customerId)||(M.name||"").trim().toLowerCase()===(v.customerName||"").trim().toLowerCase());if(N){N.totalDebt=Math.max(0,(Number(N.totalDebt)||0)-O),await Ht(N);const M=await Y();u.setCustomers(M)}}z("mini-cicil"),window.showToast(L===0?"🎉 Hutang LUNAS!":`Cicilan #${W} (${b(O)}) dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)}}})};let lt=[],Tt=null,Q="",ue=!1,oa=!1,je=!1;const le={owner:{label:"👑 Owner",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},Xn=async()=>{Q="",ue=!1,await Ft(),Yn(),u.on("users:change",()=>{const t=document.getElementById("view-login");t!=null&&t.classList.contains("active")&&Ft()})},Ft=async()=>{var s;const t=document.getElementById("view-login");if(!t)return;navigator.onLine&&oe().catch(()=>{});let e=await St();if(lt=e.filter(n=>n.isActive!==!1),lt.length===0&&(await We(),e=await St(),lt=e.filter(n=>n.isActive!==!1)),lt.length===0||je){t.innerHTML=`
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
            ${lt.length>0?`
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
    `;const n=document.getElementById("form-manual-login");n==null||n.addEventListener("submit",async i=>{var m,g;i.preventDefault();const o=document.getElementById("manual-login-username").value.trim(),r=document.getElementById("manual-login-pin").value.trim(),d=document.getElementById("manual-login-error"),p=document.getElementById("btn-submit-manual-login");if(d&&(d.style.display="none"),!o||!r)return;p&&(p.disabled=!0,p.textContent="Memverifikasi...");const c=await qe(o,r);if(p&&(p.disabled=!1,p.textContent="Masuk Sekarang ➔"),c.success){u.login(c.user,c.token);const f=c.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(m=window.showToast)==null||m.call(window,`Berhasil masuk sebagai ${c.user.name} (${c.user.role})${f}`,"success"),navigator.onLine&&It().catch(()=>{}),typeof window.appNavigateTo=="function"?window.appNavigateTo("pos"):(g=document.getElementById("dock-pos"))==null||g.click()}else d&&(d.textContent=c.error||"Username atau PIN salah.",d.style.display="block")}),(s=document.getElementById("btn-back-to-list"))==null||s.addEventListener("click",()=>{je=!1,Ft()});return}(!Tt||!lt.some(n=>String(n.id)===String(Tt)))&&(Tt=lt[0].id);const a=lt.find(n=>String(n.id)===String(Tt))||lt[0];le[a.role]||le.cashier,t.innerHTML=`
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
            ${lt.map(n=>{const i=String(n.id)===String(Tt),o=le[n.role]||le.cashier;return`
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
            <span>🔑</span> Masukkan <strong>6 digit PIN</strong> untuk <strong>${w(a.name)}</strong>
          </div>
        </div>

        <!-- PIN Dots Display -->
        <div class="login-pin-box" id="login-pin-box">
          <div class="login-pin-dots" id="login-pin-dots">
            ${[0,1,2,3,4,5].map(n=>`
              <span class="pin-dot ${n<Q.length?"filled":""}"></span>
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
  `,Qn()},Yt=()=>{document.querySelectorAll("#login-pin-dots .pin-dot").forEach((e,a)=>{const s=a<Q.length;e.style.background=s?"var(--primary, #2563eb)":"transparent",e.style.transform=s?"scale(1.18)":"scale(1)"})},ra=async(t=!1)=>{var c;if(ue)return;const e=lt.find(m=>String(m.id)===String(Tt));if(!e)return;const a=document.getElementById("login-error-msg"),s="bm_pin_lockout",n=()=>{try{const m=JSON.parse(localStorage.getItem(s)||"{}");return{count:Number(m.count)||0,until:Number(m.until)||0}}catch{return{count:0,until:0}}},i=(m,g)=>{try{localStorage.setItem(s,JSON.stringify({count:m,until:g}))}catch{}},o=n();if(o.until>Date.now()){const m=Math.ceil((o.until-Date.now())/1e3);a&&(a.textContent=`Sistem terkunci! Tunggu ${m} detik lagi.`),Ne(),Q="",Yt();return}if(t&&Q.length<6){a&&(a.textContent=`Masukkan 6 digit PIN (sudah ${Q.length} digit)`),Ne();return}if(!t&&Q.length!==6)return;ue=!0;const r=document.querySelector(".btn-numpad-key.btn-submit");r&&(r.textContent="⏳");const d=await qe(e.username,Q);if(ue=!1,r&&(r.textContent="✓"),d.success){i(0,0),u.login(d.user,d.token);const m=d.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";if((c=window.showToast)==null||c.call(window,`Berhasil masuk sebagai ${d.user.name} (${d.user.role})${m}`,"success"),Q="",navigator.onLine&&It().catch(()=>{}),typeof window.appNavigateTo=="function")window.appNavigateTo("pos");else{const g=document.getElementById("dock-pos");g&&g.click()}return}const p=n().count+1;p>=5?(i(p,Date.now()+6e4),a&&(a.textContent="PIN salah 5 kali berturut-turut! Sistem terkunci 60 detik.")):(i(p,0),a&&(a.textContent=`${d.error||"PIN salah!"} (Sisa percobaan: ${5-p})`)),Ne(),Q="",Yt()},Ne=()=>{const t=document.getElementById("login-pin-box");t&&(t.style.animation="none",t.offsetWidth,t.style.animation="shake 0.4s ease-in-out")},Qn=()=>{var t;document.querySelectorAll(".btn-login-op").forEach(e=>{e.addEventListener("click",()=>{Tt=e.getAttribute("data-id"),Q="",Ft()})}),document.querySelectorAll(".btn-numpad-key").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-val");Qt(a)})}),(t=document.getElementById("btn-toggle-manual"))==null||t.addEventListener("click",()=>{je=!0,Ft()})},Qt=t=>{const e=document.getElementById("login-error-msg");e&&(e.textContent=""),t==="clear"?(Q="",Yt()):t==="backspace"?Q.length>0&&(Q=Q.slice(0,-1),Yt()):t==="submit"?ra(!0):/^[0-9]$/.test(t)&&Q.length<6&&(Q+=t,Yt(),Q.length===6&&ra(!1))},Yn=()=>{oa||(oa=!0,window.addEventListener("keydown",t=>{const e=document.getElementById("view-login");e!=null&&e.classList.contains("active")&&(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||(t.key>="0"&&t.key<="9"?(t.preventDefault(),Qt(t.key)):t.key==="Backspace"?(t.preventDefault(),Qt("backspace")):t.key==="Enter"?(t.preventDefault(),Qt("submit")):t.key==="Escape"&&(t.preventDefault(),Qt("clear"))))}))};let Ke="",ve="Semua",ce=null,da=[];const Zn=async()=>{const[t,e]=await Promise.all([dt(),Y()]);u.setProducts(t),u.setCustomers(e),ja(),ce&&ce.abort(),ce=new AbortController;for(const a of da)a();da=[u.on("cart:change",Ka),u.on("products:change",()=>ne()),u.on("selectedCustomer:change",()=>_t()),u.on("customers:change",()=>_t())],as(ce.signal)},ja=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
              value="${u.state.discount||""}" min="0" max="99999999" placeholder="0" inputmode="numeric">
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
  `,Qe(),ne(),_t(),Ka()},ts=()=>["Semua",...new Set(u.state.products.map(t=>t.category))],Qe=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=ts().map(e=>`
    <button class="cat-pill ${e===ve?"active":""}"
      data-cat="${w(e)}">${w(e)}</button>
  `).join(""))},ne=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=u.state.products;if(ve!=="Semua"&&(e=e.filter(a=>a.category===ve)),Ke){const a=Ke.toLowerCase();e=e.filter(s=>{var n;return s.name.toLowerCase().includes(a)||((n=s.sku)==null?void 0:n.toLowerCase().includes(a))})}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(a=>{const s=a.image?`<img src="${w(a.image)}" class="product-card__thumb" alt="${w(a.name)}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;margin-bottom:2px">`:`<div class="product-card__emoji">${a.emoji||"📦"}</div>`;return`
      <div class="product-card" data-id="${a.id}" role="button" tabindex="0"
        aria-label="${w(a.name)} — ${b(a.price)}">
        <span class="product-card__sku" style="font-size:9px;font-weight:700;color:var(--text-muted);background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:4px;padding:1px 4px;margin-bottom:2px">${w(a.sku||`BM-${a.id}`)}</span>
        ${s}
        <div class="product-card__name">${w(a.name)}</div>
        <div class="product-card__price">${b(a.price)}</div>
        <div class="product-card__unit">per ${w(a.unit)}</div>
      </div>
    `}).join(""),t.querySelectorAll(".product-card").forEach(a=>{const s=()=>{const n=a.dataset.id,i=u.state.products.find(o=>String(o.id)===String(n));i&&(u.addToCart(i),a.style.transform="scale(0.94)",setTimeout(()=>{a.style.transform=""},120))};a.addEventListener("click",s),a.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),s())})})},Ka=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),a=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),n=document.getElementById("tax-row"),i=document.getElementById("customer-name"),o=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=u.state.customerName||""),o&&!o.matches(":focus")&&(o.value=u.state.discount||""),!t)return;const r=u.state.cart;if(e){const d=e.textContent;e.textContent=u.cartCount,d!==String(u.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(a&&(a.textContent=b(u.total)),n&&s&&(u.tax>0?(n.style.display="flex",s.textContent=b(u.tax)):n.style.display="none"),!r.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=r.map(d=>{const p=d.product.image?`<img src="${d.product.image}" style="width:20px;height:20px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:4px">`:`${d.product.emoji||""} `;return`
      <div class="cart-item" data-pid="${d.product.id}">
        <div class="cart-item__info">
          <div class="cart-item__name">${p}${w(d.product.name)} <span style="font-size:10px;color:var(--text-muted)">(${w(d.product.sku||`BM-${d.product.id}`)})</span></div>
          <div class="cart-item__price">${b(d.product.price)} / ${w(d.product.unit)}</div>
        </div>
        <div class="cart-item__controls">
          <div class="cart-item__subtotal">${b(d.product.price*d.qty)}</div>
          <div class="qty-controls">
            <button class="qty-btn remove" data-action="remove" data-pid="${d.product.id}" title="Hapus">🗑</button>
            <button class="qty-btn" data-action="dec" data-pid="${d.product.id}">−</button>
            <span class="qty-value">${d.qty}</span>
            <button class="qty-btn" data-action="inc" data-pid="${d.product.id}">+</button>
          </div>
        </div>
      </div>
    `}).join(""),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.pid,c=d.dataset.action,m=u.state.cart.find(g=>String(g.product.id)===String(p));m&&(c==="inc"?u.setQty(m.product.id,m.qty+1):c==="dec"?u.setQty(m.product.id,m.qty-1):c==="remove"&&u.removeFromCart(m.product.id))})})},es=()=>{const t=`
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
          ${["🏷️","💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🫙","🧊"].map((e,a)=>`
            <button type="button" class="emoji-pick-mi ${a===0?"emoji-pick--active":""}"
              data-emoji="${e}"
              style="font-size:24px;width:38px;height:38px;border-radius:8px;border:2px solid ${a===0?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${e}</button>
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
  `;et(t,"manual-item-modal"),setTimeout(()=>{var e,a,s,n;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>z("manual-item-modal")),(a=document.getElementById("mi-cancel"))==null||a.addEventListener("click",()=>z("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(o=>{o.style.borderColor="var(--border-subtle)",o.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(n=document.getElementById("mi-save"))==null||n.addEventListener("click",async()=>{var f,T,I,k,S,l,h;const i=(f=document.getElementById("mi-name"))==null?void 0:f.value.trim(),o=(T=document.getElementById("mi-price"))==null?void 0:T.value,r=parseFloat(o)||0,d=Math.max(1,parseInt((I=document.getElementById("mi-qty"))==null?void 0:I.value,10)||1),p=((k=document.getElementById("mi-unit"))==null?void 0:k.value.trim())||"pcs",c=((S=document.getElementById("mi-category"))==null?void 0:S.value)||"Lainnya",m=((l=document.getElementById("mi-emoji"))==null?void 0:l.value)||"🏷️",g=(h=document.getElementById("mi-save-catalog"))==null?void 0:h.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(o===""||r<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(g){const v=await Ta({name:i,price:r,unit:p,category:c,emoji:m,stock:999}),x=await dt();u.setProducts(x);const y=x.find(A=>A.id===v)||{id:v,name:i,price:r,unit:p,category:c,emoji:m};u.addToCart(y,d),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const v={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:i,price:r,unit:p,category:c,emoji:m};u.addToCart(v,d),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}z("manual-item-modal")}catch{window.showToast("Gagal menambahkan item manual!","error")}})},0)},as=t=>{document.addEventListener("click",e=>{const a=e.target.closest(".cat-pill");if(a){ve=a.dataset.cat,Qe(),ne();return}if(e.target.closest("#btn-manual-item")){es();return}if(e.target.closest("#btn-pay-cash")){if(!u.state.cart.length){window.showToast("Keranjang kosong!","warning");return}_e("cash")}if(e.target.closest("#btn-pay-transfer")){if(!u.state.cart.length){window.showToast("Keranjang kosong!","warning");return}_e("transfer")}if(e.target.closest("#btn-pay-debt")){if(!u.state.cart.length){window.showToast("Keranjang kosong!","warning");return}_e("debt")}e.target.closest("#btn-clear-cart")&&u.state.cart.length&&(u.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{var a;if(e.target.id==="pos-search"&&(Ke=e.target.value.trim(),ne()),e.target.id==="discount-input"&&u.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"){const s=e.target.value.trim().toLowerCase();u.setCustomerName(e.target.value);const n=document.getElementById("cust-autocomplete-dropdown");if(!n)return;if(!s){n.style.display="none";return}const i=(u.state.customers||[]).filter(o=>(o.name||"").toLowerCase().includes(s)||(o.phone||"").includes(s)).slice(0,6);if(i.length===0){n.innerHTML=`
          <div style="padding:12px;font-size:12px;color:#64748b;display:flex;justify-content:space-between;align-items:center;background:#ffffff">
            <span>Pelanggan belum terdaftar</span>
            <button type="button" class="btn btn--sm btn--primary" id="btn-dropdown-quick-add" style="font-size:11px;padding:3px 10px;font-weight:700">
              ➕ Tambahkan
            </button>
          </div>
        `,n.style.display="block",(a=n.querySelector("#btn-dropdown-quick-add"))==null||a.addEventListener("click",()=>{n.style.display="none",Kt({name:e.target.value.trim()})});return}n.innerHTML=i.map(o=>`
        <div class="cust-option" data-id="${o.id}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:12px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;transition:background 100ms ease">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;color:#1e293b">${w(o.name)} <span class="badge" style="font-size:10px;font-weight:700;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px">${w(o.category||"Umum")}</span></div>
            <div style="font-size:11px;color:#64748b;margin-top:2px">📱 ${w(o.phone||"-")} ${o.address?`&bull; 📍 ${w(o.address)}`:""}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:8px">
            ${o.totalDebt>0?`<span style="color:#dc2626;font-weight:800;font-size:11px;display:block">Hutang: ${b(o.totalDebt)}</span>`:""}
            <span style="font-size:10px;color:#2563eb;font-weight:700">Pilih ➔</span>
          </div>
        </div>
      `).join(""),n.style.display="block",n.querySelectorAll(".cust-option").forEach(o=>{o.addEventListener("mouseenter",()=>{o.style.background="#f8fafc"}),o.addEventListener("mouseleave",()=>{o.style.background="#ffffff"}),o.addEventListener("click",()=>{const r=o.dataset.id,d=u.state.customers.find(p=>String(p.id)===String(r));d&&u.setSelectedCustomer(d),n.style.display="none",_t()})})}},{signal:t}),document.addEventListener("click",e=>{const a=document.getElementById("cust-autocomplete-dropdown");a&&!e.target.closest("#customer-row-container")&&(a.style.display="none")},{signal:t})},_t=()=>{var a,s,n,i;const t=document.getElementById("customer-row-container");if(!t)return;const e=u.state.selectedCustomer;e?(t.innerHTML=`
      <div class="selected-customer-chip" style="display:flex;align-items:center;justify-content:space-between;background:#eff6ff;border:1.5px solid #93c5fd;border-radius:10px;padding:8px 12px;margin:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <span style="font-size:18px;flex-shrink:0">👤</span>
          <div style="min-width:0">
            <div style="font-weight:800;font-size:13px;color:#1e3a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${w(e.name)} <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:6px;font-weight:700">${w(e.category||"Umum")}</span>
            </div>
            <div style="font-size:11px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              📱 ${w(e.phone||"-")} ${e.totalDebt>0?`&bull; <span style="color:#dc2626;font-weight:800">Hutang: ${b(e.totalDebt)}</span>`:""}
            </div>
          </div>
        </div>
        <button type="button" id="btn-clear-selected-cust" title="Kosongkan / Ganti Pelanggan" style="border-radius:50%;width:26px;height:26px;min-width:26px;padding:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#dc2626;background:#fee2e2;border:1px solid #fca5a5;cursor:pointer">
          ✕
        </button>
      </div>
    `,(a=t.querySelector("#btn-clear-selected-cust"))==null||a.addEventListener("click",()=>{u.setSelectedCustomer(null),u.setCustomerName(""),_t()})):(t.innerHTML=`
      <div style="padding:8px 12px;display:flex;align-items:center;gap:6px;position:relative">
        <span style="font-size:16px;flex-shrink:0">👤</span>
        <div style="position:relative;flex:1;min-width:0">
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Cari nama / HP pelanggan..." maxlength="80" autocomplete="off"
            value="${w(u.state.customerName||"")}"
            style="width:100%;padding:6px 24px 6px 8px;font-size:12px;border:1px solid var(--border-default);border-radius:8px">
          ${u.state.customerName?`
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
    `,(s=t.querySelector("#btn-clear-typed-name"))==null||s.addEventListener("click",()=>{u.setCustomerName(""),_t()}),(n=t.querySelector("#btn-pick-cust"))==null||n.addEventListener("click",()=>{ns()}),(i=t.querySelector("#btn-quick-add-cust"))==null||i.addEventListener("click",()=>{Kt()}))},ns=()=>{var r,d,p;const t=u.state.customers||[];let e="";const a=c=>{const m=c.trim().toLowerCase(),g=t.filter(f=>!m||(f.name||"").toLowerCase().includes(m)||(f.phone||"").includes(m)||(f.category||"").toLowerCase().includes(m));return g.length===0?`
        <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">
          Pelanggan tidak ditemukan.<br>
          <button type="button" class="btn btn--primary btn--sm" id="btn-picker-add-new" style="margin-top:10px">
            ➕ Tambah Pelanggan "${w(c)}"
          </button>
        </div>
      `:`
      <div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;padding-right:4px">
        ${g.map(f=>`
          <div class="picker-cust-row" data-id="${f.id}" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 120ms ease">
            <div style="min-width:0;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <strong style="font-size:13px;color:#1e293b">${w(f.name)}</strong>
                <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px;font-weight:700">${w(f.category||"Umum")}</span>
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px">
                📱 ${w(f.phone||"-")} ${f.address?`&bull; 📍 ${w(f.address)}`:""}
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:10px">
              ${f.totalDebt>0?`<div style="font-size:11px;font-weight:800;color:#dc2626">Hutang: ${b(f.totalDebt)}</div>`:""}
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
        ${a("")}
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:space-between;align-items:center">
      <button class="btn btn--primary btn--sm" id="picker-create-btn">➕ Pelanggan Baru</button>
      <button class="btn btn--secondary btn--sm" id="picker-cancel-btn">Tutup</button>
    </div>
  `;et(s,"modal-customer-picker");const n=document.getElementById("picker-list-container"),i=document.getElementById("picker-search"),o=()=>{var c;n==null||n.querySelectorAll(".picker-cust-row").forEach(m=>{m.addEventListener("mouseenter",()=>{m.style.background="#f0f7ff",m.style.borderColor="#93c5fd"}),m.addEventListener("mouseleave",()=>{m.style.background="#ffffff",m.style.borderColor="#e2e8f0"}),m.addEventListener("click",()=>{const g=m.dataset.id,f=t.find(T=>String(T.id)===String(g));f&&(u.setSelectedCustomer(f),z("modal-customer-picker"),_t())})}),(c=n==null?void 0:n.querySelector("#btn-picker-add-new"))==null||c.addEventListener("click",()=>{var m;z("modal-customer-picker"),Kt({name:(m=i==null?void 0:i.value)==null?void 0:m.trim()})})};o(),i==null||i.addEventListener("input",c=>{e=c.target.value,n&&(n.innerHTML=a(e),o())}),(r=document.getElementById("modal-picker-close"))==null||r.addEventListener("click",()=>z("modal-customer-picker")),(d=document.getElementById("picker-cancel-btn"))==null||d.addEventListener("click",()=>z("modal-customer-picker")),(p=document.getElementById("picker-create-btn"))==null||p.addEventListener("click",()=>{z("modal-customer-picker"),Kt()})},ss=async()=>{const t=document.getElementById("view-pos");t!=null&&t.querySelector(".pos-layout")||ja();const e=await dt();u.setProducts(e),ne(),Qe()},is=(t,e=128,a=.85)=>new Promise((s,n)=>{if(!(t!=null&&t.type.startsWith("image/")))return n(new Error("File harus berupa gambar (PNG/JPEG/WebP)"));const i=new FileReader;i.onerror=()=>n(new Error("Gagal membaca file")),i.onload=o=>{const r=new Image;r.onerror=()=>n(new Error("Gagal memuat gambar")),r.onload=()=>{let{width:d,height:p}=r;d>p?d>e&&(p=Math.round(p*e/d),d=e):p>e&&(d=Math.round(d*e/p),p=e);const c=document.createElement("canvas");c.width=d,c.height=p,c.getContext("2d").drawImage(r,0,0,d,p);let g="";try{g=c.toDataURL("image/webp",a)}catch{}g!=null&&g.startsWith("data:image/webp")||(g=c.toDataURL("image/jpeg",a)),s(g)},r.src=o.target.result},i.readAsDataURL(t)}),os=(t=[])=>{let e=0;for(const s of t)if(s.sku&&typeof s.sku=="string"){const n=s.sku.match(/^BM-(\d+)$/i);if(n){const i=parseInt(n[1],10);i>e&&(e=i)}}const a=e?e+1:t.length+1;return`BM-${String(a).padStart(3,"0")}`},la=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],rs=["Galon","Botol","Layanan","Lainnya"];let Ce=null;const ds=async()=>{Ce&&Ce(),Ce=u.on("products:change",()=>{const t=document.getElementById("view-products");t!=null&&t.classList.contains("active")&&se()}),await se()},se=async()=>{const t=document.getElementById("view-products"),e=await dt();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(a=>ls(a)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,cs()},ls=t=>{const e=t.image?`<img src="${w(t.image)}" class="product-thumb" alt="${w(t.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;border:1.5px solid var(--border-subtle)">`:`<span class="product-emoji-large">${t.emoji||"📦"}</span>`;return`
    <div class="product-manage-card" data-id="${t.id}">
      <div class="product-manage-card__header">
        ${e}
        <div class="product-manage-card__info">
          <div class="product-manage-card__name">${w(t.name)}</div>
          <div class="product-manage-card__cat" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="badge badge--blue">${w(t.category)}</span>
            <span class="badge" style="background:var(--bg-glass);border:1px solid var(--border-default);font-size:10px;font-weight:700;color:var(--text-secondary)">${w(t.sku||`BM-${t.id}`)}</span>
          </div>
        </div>
      </div>
      <div class="product-manage-card__price">
        ${b(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${w(t.unit)}</span>
        ${t.cost>0?`<div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-top:2px">Modal: ${b(t.cost)} &bull; Margin: ${b(t.price-t.cost)}</div>`:""}
      </div>
      <div class="product-manage-card__actions">
        <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `},cs=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",async()=>{const a=await dt();ca(null,a)}),t==null||t.addEventListener("click",async a=>{const s=a.target.closest('[data-action="edit"]'),n=a.target.closest('[data-action="delete"]');if(s){const i=String(s.dataset.id),o=await dt(),r=o.find(d=>String(d.id)===i);r&&ca(r,o)}if(n){const i=String(n.dataset.id),o=Number.isNaN(Number(i))?i:Number(i);ps(o)}})},ca=(t=null,e=[])=>{const a=!!t,s=(t==null?void 0:t.sku)||os(e);let n=(t==null?void 0:t.image)||null;const i=`
    <div class="modal-header">
      <span class="modal-title">${a?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
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
          ${rs.map(o=>`<option value="${w(o)}" ${(t==null?void 0:t.category)===o?"selected":""}>${w(o)}</option>`).join("")}
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
            ${la.map(o=>`
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

        <input type="hidden" id="pf-emoji" value="${w((t==null?void 0:t.emoji)||la[0])}">
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
        ${a?"💾 Simpan":"➕ Tambah"}
      </button>
    </div>
  `;et(i,"product-form"),setTimeout(()=>{var g,f,T,I;(g=document.getElementById("pf-close"))==null||g.addEventListener("click",()=>z("product-form")),(f=document.getElementById("pf-cancel"))==null||f.addEventListener("click",()=>z("product-form"));const o=document.getElementById("btn-tab-emoji"),r=document.getElementById("btn-tab-upload"),d=document.getElementById("box-emoji-picker"),p=document.getElementById("box-upload-picker"),c=document.getElementById("pf-file-input"),m=document.getElementById("pf-img-preview");o==null||o.addEventListener("click",()=>{d.style.display="block",p.style.display="none",o.className="btn btn--sm btn--primary",r.className="btn btn--sm btn--secondary"}),r==null||r.addEventListener("click",()=>{d.style.display="none",p.style.display="block",r.className="btn btn--sm btn--primary",o.className="btn btn--sm btn--secondary"}),c==null||c.addEventListener("change",async k=>{var l;const S=(l=k.target.files)==null?void 0:l[0];if(S)try{n=await is(S,128,.85),m.innerHTML=`<img src="${w(n)}" style="width:100%;height:100%;object-fit:cover">`,window.showToast("Foto produk berhasil dimuat","success")}catch(h){window.showToast(h.message||"Gagal memproses gambar","error")}}),(T=document.getElementById("btn-remove-img"))==null||T.addEventListener("click",()=>{n=null,m.innerHTML='<span style="font-size:20px;opacity:0.4">🖼️</span>',o.click()}),document.querySelectorAll(".emoji-pick").forEach(k=>{k.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(S=>{S.style.borderColor="var(--border-subtle)",S.classList.remove("emoji-pick--active")}),k.style.borderColor="var(--blue-400)",k.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=k.dataset.emoji,n=null})}),(I=document.getElementById("pf-save"))==null||I.addEventListener("click",async()=>{var P,_,O,U,L,K,W,V;const k=(P=document.getElementById("pf-name"))==null?void 0:P.value.trim(),S=((_=document.getElementById("pf-sku"))==null?void 0:_.value.trim())||s,l=parseFloat((O=document.getElementById("pf-price"))==null?void 0:O.value)||0,h=parseFloat((U=document.getElementById("pf-cost"))==null?void 0:U.value)||0,v=((L=document.getElementById("pf-unit"))==null?void 0:L.value.trim())||"pcs",x=((K=document.getElementById("pf-category"))==null?void 0:K.value)||"Lainnya",y=((W=document.getElementById("pf-emoji"))==null?void 0:W.value)||"📦",A=parseInt((V=document.getElementById("pf-stock"))==null?void 0:V.value,10)||0;if(!k){window.showToast("Nama produk wajib diisi!","warning");return}if(l<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{const B={name:k,sku:S,price:l,cost:h,unit:v,category:x,emoji:y,image:n,stock:A};a?(await $a({...t,...B}),window.showToast(`Produk [${S}] berhasil diperbarui`,"success")):(await Ta(B),window.showToast(`Produk [${S}] berhasil ditambahkan`,"success")),z("product-form");const D=await dt();u.setProducts(D),await se()}catch{window.showToast("Gagal menyimpan produk!","error")}})},0)},ps=t=>{et(`
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
  `,"delete-confirm"),setTimeout(()=>{var a,s,n;(a=document.getElementById("dc-close"))==null||a.addEventListener("click",()=>z("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>z("delete-confirm")),(n=document.getElementById("dc-confirm"))==null||n.addEventListener("click",async()=>{try{await Ln(t);const i=await dt();u.setProducts(i),z("delete-confirm"),await se(),window.showToast("Produk dihapus","success")}catch{window.showToast("Gagal menghapus produk","error")}})},0)};let Me=null,me=null,ge=null,ht="semua",st=1;const us=async()=>{Me&&Me(),Me=u.on("transactions:change",t=>{Zt(t)}),await Ye()},Ye=async()=>{const t=await pt();u.setTransactions(t),Zt(t)},Zt=t=>{var U,L,K,W,V;const e=document.getElementById("view-reports");if(!e)return;const a=it(),s=sn(),n=t.filter(B=>B.dateKey===a),i=n.reduce((B,D)=>B+D.total,0);let o=0;t.forEach(B=>{(B.items||[]).forEach(D=>{var at;const X=Number((at=D.product)==null?void 0:at.cost)||0;o+=X*(Number(D.qty)||1)})});const r=t.reduce((B,D)=>B+D.total,0),d=Math.max(0,r-o),p=r>0?(d/r*100).toFixed(1):0,c=n.length,m=t.filter(B=>{var D;return(D=B.dateKey)==null?void 0:D.startsWith(s)}),g=m.reduce((B,D)=>B+D.total,0),f=t.reduce((B,D)=>B+D.total,0),T=n.filter(B=>B.paymentMethod==="cash").reduce((B,D)=>B+D.total,0),I=n.filter(B=>B.paymentMethod==="transfer"&&B.paymentStatus==="transfer_confirmed").reduce((B,D)=>B+D.total,0),k=n.filter(B=>B.paymentMethod==="transfer"&&B.paymentStatus==="transfer_pending").reduce((B,D)=>B+D.total,0),S=n.filter(B=>B.paymentMethod==="debt").reduce((B,D)=>B+D.total,0),l=t.reduce((B,D)=>{for(const X of D.debtPayments||[])X.date&&X.date.split("T")[0]===a&&(B+=X.amount||0);return B},0),h=T+I+l,v=t.reduce((B,D)=>B+(D.remainingDebt||0),0);t.filter(B=>B.paymentStatus==="transfer_pending").reduce((B,D)=>B+D.total,0);const x=ys(n),y=fs(t);me&&(me.destroy(),me=null),ge&&(ge.destroy(),ge=null);let A=[...t];ht==="cash"&&(A=A.filter(B=>B.paymentMethod==="cash")),ht==="transfer"&&(A=A.filter(B=>B.paymentMethod==="transfer")),ht==="debt"&&(A=A.filter(B=>B.paymentMethod==="debt"));const P=A.sort((B,D)=>new Date(D.date)-new Date(B.date)),_=Math.max(1,Math.ceil(P.length/10));st>_&&(st=_),st<1&&(st=1);const O=P.slice((st-1)*10,st*10);e.innerHTML=`
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
        <div class="stat-card__value" style="color:var(--blue-700)">${b(i)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${c} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${b(h)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${b(l)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${b(v)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${b(g)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${m.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${b(f)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${t.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #059669">
        <span class="stat-card__icon">📈</span>
        <div class="stat-card__value" style="color:#059669">${b(d)}</div>
        <div class="stat-card__label">Estimasi Laba Kotor (Gross Profit)</div>
        <div class="stat-card__trend" style="color:#059669;font-weight:700">Margin: ${p}% (HPP: ${b(o)})</div>
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
            <strong style="color:var(--color-success)">${b(T)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${b(I)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${b(l)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${b(S)}</strong>
          </div>

          ${k>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${b(k)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${T+I+S+l>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${x.length?x.slice(0,7).map((B,D)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${D+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${w(B.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${B.qty}x</span>
            </div>
          `).join(""):'<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px">Belum ada penjualan hari ini</div>'}
      </div>
    </div>

    <!-- Detailed Ledger & Transaction Analysis Table -->
    <div class="card card--elevated" style="overflow:hidden;padding:0">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle)">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:800;text-transform:uppercase;letter-spacing:.05em">
          📋 Analisis Detail Penjualan &amp; Status Pelunasan (${P.length} data)
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="cat-pill ${ht==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${ht==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${ht==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${ht==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${ms(O)}
          </tbody>
        </table>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">Hal ${st} dari ${_}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--secondary btn--sm" id="rpt-prev" ${st<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
          <button class="btn btn--secondary btn--sm" id="rpt-next" ${st>=_?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
        </div>
      </div>
    </div>
  `,(U=document.getElementById("btn-refresh-reports"))==null||U.addEventListener("click",Ye),(L=document.getElementById("btn-export-pdf-report"))==null||L.addEventListener("click",()=>bs(t,a,s)),(K=document.getElementById("btn-export-csv-report"))==null||K.addEventListener("click",()=>{var at;const B=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status Pembayaran","Subtotal","Diskon","Pajak","Grand Total","Sisa Piutang"],D=P.map(R=>[ft(new Date(R.date)),R.invoiceNo||"",R.cashier||"Admin",R.customerName||"-",R.paymentMethod||"cash",R.paymentStatus||"paid",R.subtotal||0,R.discount||0,R.tax||0,R.total||0,R.remainingDebt||0]),X=it();Xe(`Laporan-Penjualan-${X}.csv`,B,D),(at=window.showToast)==null||at.call(window,"✅ Laporan penjualan berhasil diekspor ke Excel/CSV!","success")}),(W=document.getElementById("rpt-prev"))==null||W.addEventListener("click",()=>{st>1&&(st--,Zt(t))}),(V=document.getElementById("rpt-next"))==null||V.addEventListener("click",()=>{st<_&&(st++,Zt(t))}),document.querySelectorAll("[data-rpt-filter]").forEach(B=>{B.addEventListener("click",()=>{ht=B.dataset.rptFilter,st=1,Zt(t)})}),requestAnimationFrame(()=>gs(y,T,I,S,l))},ms=t=>t.length?t.map(e=>{const a=e.total||0;let s=0,n=0;e.paymentMethod==="cash"?s=a:e.paymentMethod==="transfer"?e.paymentStatus==="transfer_confirmed"?s=a:n=a:e.paymentMethod==="debt"&&(s=e.paidAmount||0,n=e.remainingDebt||0);const i=(e.items||[]).map(d=>{var p;return`${((p=d.product)==null?void 0:p.name)||"Item"} (${d.qty}x)`}).join(", "),o=e.paymentMethod==="debt"?n===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${b(n)}</span>`:e.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',r=e.paymentMethod==="cash"?"💵 Tunai":e.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${w(e.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${ft(new Date(e.date))}</td>
        <td><strong style="color:var(--text-primary)">${w(e.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${w(i)}">${w(i||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${b(a)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${b(s)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${n>0?b(n):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${r}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>',gs=async(t,e,a,s,n)=>{const{Chart:i,registerables:o}=await be(async()=>{const{Chart:c,registerables:m}=await import("./vendor-chart-BLYve-2S.js");return{Chart:c,registerables:m}},[],import.meta.url);i.register(...o);const r=document.getElementById("chart-bar");r&&(me=new i(r,{type:"bar",data:{labels:t.map(c=>c.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(c=>c.total),backgroundColor:t.map((c,m)=>m===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${b(c.raw)}`}}},scales:{y:{beginAtZero:!0,ticks:{callback:c=>b(c),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const d=document.getElementById("chart-donut"),p=e+a+s+n;d&&p>0&&(ge=new i(d,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,a,s,n],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.label}: ${b(c.raw)}`}}}}}))},bs=async(t,e,a)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:n}=await be(async()=>{const{jsPDF:y}=await import("./vendor-jspdf-BEqUCB1L.js").then(A=>A.j);return{jsPDF:y}},[],import.meta.url),{default:i}=await be(async()=>{const{default:y}=await import("./jspdf.plugin.autotable-CSRlgf-4.js").then(A=>A.j);return{default:y}},__vite__mapDeps([0,1,2]),import.meta.url),o=new n({orientation:"portrait",unit:"mm",format:"a4"}),r=u.state.settings,d=o.internal.pageSize.getWidth();o.setFontSize(16),o.setFont("helvetica","bold"),o.text(r.shopName||"Blue Mountain Refilling Station",d/2,16,{align:"center"}),o.setFontSize(10),o.setFont("helvetica","normal"),o.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",d/2,22,{align:"center"}),o.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,d/2,27,{align:"center"});const p=t.filter(y=>y.dateKey===e),c=p.reduce((y,A)=>y+A.total,0),m=t.filter(y=>{var A;return(A=y.dateKey)==null?void 0:A.startsWith(a)}).reduce((y,A)=>y+A.total,0),g=t.reduce((y,A)=>y+A.total,0),f=p.filter(y=>y.paymentMethod==="cash").reduce((y,A)=>y+A.total,0),T=p.filter(y=>y.paymentMethod==="transfer"&&y.paymentStatus==="transfer_confirmed").reduce((y,A)=>y+A.total,0),I=t.reduce((y,A)=>{for(const P of A.debtPayments||[])P.date&&P.date.split("T")[0]===e&&(y+=P.amount||0);return y},0),k=f+T+I,S=t.reduce((y,A)=>y+(A.remainingDebt||0),0);o.setFontSize(11),o.setFont("helvetica","bold"),o.text("1. Ringkasan Kinerja Keuangan",14,35);const l=[["Omzet Gross Hari Ini",b(c)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",b(k)],["Cicilan Piutang Terkumpul Hari Ini",b(I)],["Total Piutang Belum Lunas (Semua Pelanggan)",b(S)],["Omzet Bulan Ini",b(m)],["Total Omzet All-Time",b(g)],["Jumlah Transaksi Hari Ini",`${p.length} transaksi`]];i(o,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:l,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const h=o.lastAutoTable.finalY+10;o.setFontSize(11),o.setFont("helvetica","bold"),o.text("2. Rincian Riwayat Transaksi & Pelunasan",14,h);const v=[...t].sort((y,A)=>new Date(A.date)-new Date(y.date)).slice(0,80);i(o,{startY:h+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:v.map(y=>{const A=y.paymentMethod==="cash"?y.total:y.paymentMethod==="transfer"?y.paymentStatus==="transfer_confirmed"?y.total:0:y.paidAmount||0,P=y.paymentMethod==="debt"?y.remainingDebt||0:y.paymentStatus==="transfer_pending"?y.total:0;return[y.invoiceNo||"-",new Date(y.date).toLocaleDateString("id-ID"),y.customerName||"—",y.paymentMethod==="cash"?"Tunai":y.paymentMethod==="transfer"?"Transfer":"Hutang",b(y.total),b(A),P>0?b(P):"—",y.paymentMethod==="debt"?P===0?"Lunas":"Cicilan":y.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const x=o.internal.getNumberOfPages();for(let y=1;y<=x;y++)o.setPage(y),o.setFontSize(8),o.setFont("helvetica","normal"),o.text(`Hal ${y} dari ${x} — ${r.shopName||"Blue Mountain POS"}`,d/2,o.internal.pageSize.getHeight()-8,{align:"center"});o.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch{window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},fs=t=>{const e=[];for(let a=6;a>=0;a--){const s=new Date;s.setDate(s.getDate()-a);const n=it(s),i=t.filter(r=>r.dateKey===n).reduce((r,d)=>r+d.total,0),o=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);e.push({key:n,label:o,total:i})}return e},ys=t=>{var a;const e={};for(const s of t)for(const n of s.items||[]){if(!((a=n==null?void 0:n.product)!=null&&a.name))continue;const i=n.product.name;e[i]=(e[i]||0)+n.qty}return Object.entries(e).map(([s,n])=>({name:s,qty:n})).sort((s,n)=>n.qty-s.qty)},vs=async()=>{await hs(),await Ot()},hs=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","printerPaper","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const a of t){const s=await Ge(a);s!==null&&(e[a]=s)}u.updateSettings(e)},Ot=async()=>{var p,c;const t=document.getElementById("view-settings"),e=u.state.settings,a="1.1.0",s="7256c2a",n="2026-09-12T03:52:23.077Z",i=new Date(n),o=new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"short",year:"numeric"}).format(i),r=new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(i),d=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
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
            ${w(((p=u.state.currentUser)==null?void 0:p.name)||"Belum Masuk")}
          </span>
          <span style="font-size: 11px; padding: 2px 8px; border-radius: 12px; background: rgba(37, 99, 235, 0.1); color: #2563eb; font-weight: 700; text-transform: uppercase;">
            ${w(((c=u.state.currentUser)==null?void 0:c.role)||"-")}
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
        <input type="text" class="input" id="set-shopName" value="${w(e.shopName||"")}" maxlength="80" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${w(e.shopAddress||"")}" maxlength="120" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${w(e.shopPhone||"")}" maxlength="20" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${w(e.cashierName||"Admin")}" maxlength="40" style="max-width:200px">
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
        <input type="text" class="input" id="set-bankName" value="${w(e.bankName||"BCA")}" maxlength="30" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${w(e.bankNumber||"")}" maxlength="30" style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${w(e.bankHolder||"")}" maxlength="60" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">Salin string QRIS dari BCA/Mandiri/Shopee/GoPay untuk diubah jadi Dynamic QRIS otomatis ber-nominal</div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:280px;font-size:11px" placeholder="0002010102112659...">${w(e.qrisNumber||"")}</textarea>
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
        ${d?'<span class="badge badge--green">✅ App Terinstall</span>':'<button class="btn btn--primary btn--sm" id="btn-install-pwa">📲 Install</button>'}
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Standar Versi Aplikasi (SemVer 3-Digit)</div>
          <div class="settings-row__desc">Format: <strong>Major</strong> (Arsitektur) . <strong>Minor</strong> (Fitur Sedang) . <strong>Patch</strong> (Revisi Ringan)</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800;letter-spacing:0.02em">
            v${w(a)}${` (${w(s)})`}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            Build: ${w(o)} • ${w(r)}
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

    <!-- Supabase Cloud Multi-Device Sync & Master Store ID -->
    <div class="settings-section">
      <div class="settings-section-header">🛡️ Keamanan &amp; Kunci Master Database Cloud (Multi-Tenant)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">ID Database Master Toko (Tenant ID)</div>
          <div class="settings-row__desc">Kunci partisi database utama: mengikat produk, pelanggan, transaksi &amp; akun operator</div>
        </div>
        <div style="text-align:right">
          <span class="badge ${J()?"badge--red":"badge--blue"}" style="font-size:12px;padding:6px 12px;font-weight:800;letter-spacing:0.02em">
            ${J()?"🔒 Sandbox Terisolasi (Offline)":w(ct())}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            ${J()?"Perangkat terputus dari database utama":"Database resmi terenkripsi (fadhil2026)"}
          </div>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Aktivasi Kunci Master Terminal</div>
          <div class="settings-row__desc">Salin kunci master untuk mengaktifkan HP/Tablet kasir baru, atau ubah kunci terminal ini</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn--secondary btn--sm" id="btn-copy-master-key" style="font-weight:700">📋 Salin Kunci Master</button>
          <button class="btn btn--secondary btn--sm" id="btn-set-master-key" style="font-weight:700">🔑 Masukkan Kunci</button>
          <button class="btn btn--danger btn--sm" id="btn-toggle-isolate-device" style="font-weight:700">
            ${J()?"🔌 Hubungkan Kembali":"🔒 Putuskan / Isolasi"}
          </button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Skema Database Cloud (SQL Master Tenant)</div>
          <div class="settings-row__desc">Salin skema SQL lengkap partisi store_id &amp; dual-bridge realtime untuk Supabase SQL Editor</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-show-cloud-sql" style="white-space:nowrap">
          📋 Salin Skema SQL Cloud
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Sinkronkan Semua Data &amp; Akun Sekarang</div>
          <div class="settings-row__desc">Dual-Bridge Sync: Menjamin transaksi, pelanggan, omzet &amp; akun operator di HP dan Laptop 100% identik</div>
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
  `,xs()},xs=()=>{var t,e,a,s,n,i,o,r,d,p,c,m,g,f,T,I,k,S;(t=document.getElementById("btn-show-cloud-sql"))==null||t.addEventListener("click",()=>{var v,x,y;const l=`-- Jalankan perintah ini di Supabase SQL Editor (https://supabase.com/dashboard/project/wiapnhpdgjbtkblowfig/sql):
-- 1. Tambah Partisi store_id ke Semua Tabel
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.customers ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.transactions ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.expenses ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.settings ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';

-- 2. Buat Tabel Pengguna Aplikasi (app_users)
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8',
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cashier' CHECK (role IN ('owner', 'supervisor', 'cashier')),
    pin_hash TEXT NOT NULL,
    pin_salt TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_store_username UNIQUE (store_id, username)
);
ALTER TABLE IF EXISTS public.app_users ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';

-- 3. RLS Policies Multi-Tenant
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tenant_users_policy" ON public.app_users;
CREATE POLICY "tenant_users_policy" ON public.app_users FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8') WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- 4. Realtime Broadcast
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'app_users') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.app_users;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'settings') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
    END IF;
END $$;`,h=`
      <div class="modal-header">
        <h3 class="modal-title">🛡️ Skema SQL Master Tenant &amp; Akun (Supabase)</h3>
        <button class="modal-close" id="sql-modal-close" type="button">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size:12px;color:var(--text-secondary);margin:0 0 10px">
          Jalankan perintah SQL ini di menu <strong>SQL Editor</strong> dashboard Supabase Anda agar semua data dan akun operator terkunci pada Master Store ID <code>STORE-BM-856CFAC8</code>:
        </p>
        <textarea id="sql-code-area" readonly style="width:100%;height:220px;font-family:monospace;font-size:11px;padding:8px;border-radius:8px;border:1px solid var(--border-default);background:rgba(0,0,0,0.02);line-height:1.4">${l}</textarea>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:space-between;gap:8px">
        <button class="btn btn--primary btn--sm" id="btn-copy-sql">📋 Salin Perintah SQL</button>
        <button class="btn btn--secondary btn--sm" id="btn-close-sql">Tutup</button>
      </div>
    `;et(h,"modal-sql"),(v=document.getElementById("sql-modal-close"))==null||v.addEventListener("click",()=>z("modal-sql")),(x=document.getElementById("btn-close-sql"))==null||x.addEventListener("click",()=>z("modal-sql")),(y=document.getElementById("btn-copy-sql"))==null||y.addEventListener("click",()=>{var A;(A=navigator.clipboard)==null||A.writeText(l).then(()=>{var P;(P=window.showToast)==null||P.call(window,"✅ Perintah SQL berhasil disalin ke clipboard!","success")})})}),(e=document.getElementById("btn-copy-master-key"))==null||e.addEventListener("click",()=>{var h;const l=ct();(h=navigator.clipboard)==null||h.writeText(l).then(()=>{var v;(v=window.showToast)==null||v.call(window,`✅ Kunci Master (${l}) berhasil disalin!`,"success")})}),(a=document.getElementById("btn-set-master-key"))==null||a.addEventListener("click",async()=>{var v;const l=ct(),h=prompt("Masukkan Kunci Master Database Toko (Master Store ID):",l==="ISOLATED_SANDBOX"?"STORE-BM-856CFAC8":l);h!=null&&h.trim()&&(Se(h.trim()),pe(),await It(),(v=window.showToast)==null||v.call(window,`✅ Terminal terhubung ke Master ID: ${h.trim()}`,"success"),Ot())}),(s=document.getElementById("btn-toggle-isolate-device"))==null||s.addEventListener("click",async()=>{var l,h;J()?(Se("STORE-BM-856CFAC8"),pe(),await It(),(l=window.showToast)==null||l.call(window,"✅ Perangkat dihubungkan kembali ke Database Utama Toko!","success")):confirm("Isolasi perangkat ini? Perangkat akan beralih ke Mode Sandbox Demo Offline dan terputus dari database cloud toko.")&&(Se("ISOLATED_SANDBOX"),pe(),(h=window.showToast)==null||h.call(window,"🔒 Perangkat kini dalam Mode Sandbox Terisolasi.","info")),Ot()}),(n=document.getElementById("btn-sync-cloud-now"))==null||n.addEventListener("click",async()=>{const l=document.getElementById("btn-sync-cloud-now");l&&(l.textContent="🔄 Menyinkronkan...",l.disabled=!0);try{await It(),window.showToast("✅ Semua data & akun berhasil disinkronkan!","success"),setTimeout(()=>Ot(),600)}catch(h){window.showToast(`Gagal sinkron cloud: ${h.message||"Error"}`,"error")}finally{l&&(l.textContent="⚡ Sinkronkan Sekarang",l.disabled=!1)}}),(i=document.getElementById("btn-export-backup"))==null||i.addEventListener("click",async()=>{const l=document.getElementById("btn-export-backup");l&&(l.textContent="⏳ Menyiapkan...",l.disabled=!0);try{const h=await Nn(),v=JSON.stringify(h,null,2),x=new Blob([v],{type:"application/json;charset=utf-8"}),y=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),P=`Backup-KASIR-${(h.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${y}.json`,_=URL.createObjectURL(x),O=document.createElement("a");O.href=_,O.download=P,document.body.appendChild(O),O.click(),document.body.removeChild(O),setTimeout(()=>URL.revokeObjectURL(_),5e3),window.showToast("✅ File backup berhasil diunduh!","success")}catch(h){window.showToast(`Gagal ekspor backup: ${h.message||"Error"}`,"error")}finally{l&&(l.textContent="📥 Unduh Backup JSON",l.disabled=!1)}}),(o=document.getElementById("btn-trigger-import"))==null||o.addEventListener("click",()=>{var l;(l=document.getElementById("input-import-backup"))==null||l.click()}),(r=document.getElementById("input-import-backup"))==null||r.addEventListener("change",l=>{var x;const h=(x=l.target.files)==null?void 0:x[0];if(!h)return;const v=new FileReader;v.onload=async y=>{var A;try{const P=(A=y.target)==null?void 0:A.result,_=JSON.parse(P);if(!_.data||!_.data.products&&!_.data.transactions){window.showToast("Format file backup tidak valid!","error");return}const O=(_.data.products||[]).length,U=(_.data.customers||[]).length,L=(_.data.transactions||[]).length,K=(_.data.expenses||[]).length,W=_.exportedAt?new Date(_.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",V=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${w(_.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${W}
            </div>

            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:15px;font-weight:900;color:var(--blue-700)">${O}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pelanggan</div>
                <div style="font-size:15px;font-weight:900;color:#8b5cf6">${U}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:15px;font-weight:900;color:#16a34a">${L}</div>
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
        `;et(V,"import-confirm-modal"),setTimeout(()=>{var B,D,X;(B=document.getElementById("imp-x"))==null||B.addEventListener("click",()=>z("import-confirm-modal")),(D=document.getElementById("imp-cancel"))==null||D.addEventListener("click",()=>z("import-confirm-modal")),(X=document.getElementById("imp-confirm"))==null||X.addEventListener("click",async()=>{var $;const at=(($=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:$.value)||"replace",R=document.getElementById("imp-confirm");R&&(R.textContent="⏳ Memulihkan...",R.disabled=!0);try{await Cn(_,at);const[C,N,M,F]=await Promise.all([dt(),Y(),pt(),ee()]);u.setProducts(C),u.setCustomers(N),u.setTransactions(M),u.setExpenses(F),z("import-confirm-modal"),window.showToast("🎉 Data berhasil dipulihkan & sinkron!","success"),setTimeout(()=>Ot(),600)}catch(C){window.showToast(`Gagal memulihkan data: ${C.message}`,"error")}})},0)}catch{window.showToast("File JSON rusak atau tidak terbaca!","error")}},v.readAsText(h),l.target.value=""}),(d=document.getElementById("btn-save-settings"))==null||d.addEventListener("click",async()=>{const l=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","printerPaper","qrisNumber"],h={};for(const v of l){const x=document.getElementById(`set-${v}`);x&&(h[v]=v==="taxRate"?parseFloat(x.value)||0:x.value.trim(),await La(v,h[v]))}u.updateSettings(h),window.showToast("Pengaturan berhasil disimpan","success")}),(p=document.getElementById("btn-settings-switch-op"))==null||p.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))}),(c=document.getElementById("btn-settings-logout"))==null||c.addEventListener("click",()=>{confirm("Keluar dari sesi operator kasir?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(m=document.getElementById("btn-test-48"))==null||m.addEventListener("click",()=>{Le("48mm")}),(g=document.getElementById("btn-test-58"))==null||g.addEventListener("click",()=>{Le("58mm")}),(f=document.getElementById("btn-test-80"))==null||f.addEventListener("click",()=>{Le("80mm")}),(T=document.getElementById("btn-printer-guide"))==null||T.addEventListener("click",()=>{ws()}),(I=document.getElementById("btn-install-pwa"))==null||I.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(k=document.getElementById("btn-clear-cache"))==null||k.addEventListener("click",async()=>{try{if("caches"in window){const l=await caches.keys();await Promise.all(l.map(h=>caches.delete(h)))}if("serviceWorker"in navigator){const l=await navigator.serviceWorker.getRegistrations();for(const h of l)await h.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch{window.showToast("Gagal hapus cache","error")}}),(S=document.getElementById("btn-reset-all"))==null||S.addEventListener("click",async()=>{const l=prompt(`⚠️ KONFIRMASI PENGHAPUSAN PERMANEN

Tindakan ini akan menghapus SELURUH data lokal (transaksi, pelanggan, pengeluaran, dan produk).

Ketik kata "HAPUS" dengan huruf besar untuk melanjutkan:`);if(l==="HAPUS")try{await Pn(),window.showToast("Semua data lokal berhasil dihapus. Memuat ulang...","error"),setTimeout(()=>window.location.reload(),1500)}catch{window.showToast("Gagal menghapus data","error")}else l!==null&&window.showToast("Penghapusan dibatalkan (kata sandi konfirmasi salah)","info")})},ws=()=>{et(`
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
  `,"printer-guide"),setTimeout(()=>{var e,a;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>z("printer-guide")),(a=document.getElementById("pg-close2"))==null||a.addEventListener("click",()=>z("printer-guide"))},0)};let De=null,xt=it(),wt=it(),tt=1;const Vt=10,ks=async()=>{De&&De(),De=u.on("transactions:change",t=>{$t(t)}),await Fa()},Fa=async()=>{const t=await pt();u.setTransactions(t),$t(t)},Ha=t=>{const e=t.paymentMethod,a=t.paymentStatus;return e==="transfer"&&a==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&a==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':a==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':a==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},qa=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":w(t.paymentMethod)||"—",zt=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Ss=t=>[...t].sort((a,s)=>new Date(s.date)-new Date(a.date)).filter(a=>{const s=a.dateKey||(a.date?a.date.split("T")[0]:"");return xt&&wt?s>=xt&&s<=wt:xt?s>=xt:wt?s<=wt:!0}),$t=t=>{const e=document.getElementById("view-transactions");if(!e)return;const a=it(),s=Ss(t),i=t.filter(g=>g.dateKey===a).reduce((g,f)=>f.paymentStatus==="paid"&&f.paymentMethod==="cash"||f.paymentStatus==="transfer_confirmed"?g+f.total:f.paymentMethod==="debt"?g+(f.paidAmount||0):g,0),o=t.reduce((g,f)=>g+(f.remainingDebt||0),0),r=t.filter(g=>g.paymentStatus==="transfer_pending").reduce((g,f)=>g+f.total,0),d=Math.max(1,Math.ceil(s.length/Vt));tt>d&&(tt=d),tt<1&&(tt=1);const p=s.length===0?0:(tt-1)*Vt+1,c=Math.min(tt*Vt,s.length),m=s.slice((tt-1)*Vt,tt*Vt);e.innerHTML=`
    <div class="section-header" style="flex-wrap:wrap;gap:12px">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} total (${s.length} terfilter)</span></h2>
      
      <!-- Date Range Filter Toolbar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">Dari:</span>
          <input type="date" class="input" id="tx-filter-start" style="width:auto;padding:6px 10px;font-size:12px" value="${xt}">
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">s/d</span>
          <input type="date" class="input" id="tx-filter-end" style="width:auto;padding:6px 10px;font-size:12px" value="${wt}">
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
        <div style="font-size:15px;font-weight:800;color:#16a34a">${b(i)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${b(o)}</div>
      </div>
      ${r>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${b(r)}</div>
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
              ${Es(m)}
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls (10 rows/page) -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">
            Menampilkan <strong>${p}-${c}</strong> dari <strong>${s.length}</strong> transaksi
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <button class="btn btn--secondary btn--sm" id="tx-prev-page" ${tt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              ◀ Sebelumnya
            </button>
            <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
              Hal ${tt} / ${d}
            </span>
            <button class="btn btn--secondary btn--sm" id="tx-next-page" ${tt>=d?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
              Berikutnya ▶
            </button>
          </div>
        </div>
      </div>
    `}
  `,Ts(t)},Es=t=>t.length?t.map(e=>{var a;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${w(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${ft(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${w(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((a=e.items)==null?void 0:a.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${b(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${b(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${qa(e)}</span></td>
      <td>${Ha(e)}</td>
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
            ${zt(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${zt(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${zt(e)?"var(--color-danger-border)":"#d1d5db"};color:${zt(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${zt(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk rentang tanggal ini</td></tr>',Ts=t=>{var e,a,s,n,i,o,r;(e=document.getElementById("tx-btn-apply"))==null||e.addEventListener("click",()=>{var d,p;xt=((d=document.getElementById("tx-filter-start"))==null?void 0:d.value)||"",wt=((p=document.getElementById("tx-filter-end"))==null?void 0:p.value)||"",tt=1,$t(t)}),(a=document.getElementById("tx-btn-today"))==null||a.addEventListener("click",()=>{const d=new Date().toISOString().split("T")[0];xt=d,wt=d,tt=1,$t(t)}),(s=document.getElementById("tx-btn-all"))==null||s.addEventListener("click",()=>{xt="",wt="",tt=1,$t(t)}),(n=document.getElementById("tx-btn-export-csv"))==null||n.addEventListener("click",()=>{var m;const d=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status","Subtotal","Diskon","Pajak","Total","Dibayar","Kembalian","Sisa Piutang"],p=filtered.map(g=>[ft(new Date(g.date)),g.invoiceNo||"",g.cashier||"Admin",g.customerName||"-",g.paymentMethod||"cash",g.paymentStatus||"paid",g.subtotal||0,g.discount||0,g.tax||0,g.total||0,g.paid||0,g.change||0,g.remainingDebt||0]),c=it();Xe(`Transaksi-${c}.csv`,d,p),(m=window.showToast)==null||m.call(window,"✅ Riwayat transaksi berhasil diekspor ke Excel/CSV!","success")}),(i=document.getElementById("tx-prev-page"))==null||i.addEventListener("click",()=>{tt>1&&(tt--,$t(t))}),(o=document.getElementById("tx-next-page"))==null||o.addEventListener("click",()=>{tt++,$t(t)}),(r=document.getElementById("tx-table"))==null||r.addEventListener("click",async d=>{var T;const p=d.target.closest("[data-action]");if(!p)return;const c=String(p.dataset.id),m=Number.isNaN(Number(c))?c:Number(c),g=p.dataset.action,f=t.find(I=>String(I.id)===c);if(g==="detail"){f&&Ls(f);return}if(g==="confirm-transfer"){if(!f||!confirm(`Konfirmasi transfer ${b(f.total)} dari ${w(f.customerName||"pelanggan")} sudah diterima?`))return;try{const I={...f,paymentStatus:"transfer_confirmed",paidAmount:f.total,confirmedAt:new Date().toISOString()};await te(I),u.updateTransaction(m,{paymentStatus:"transfer_confirmed",paidAmount:f.total,confirmedAt:I.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}return}if(g==="pay-debt"){f&&$s(f);return}if(g==="delete"){if(!f)return;if(!zt(f)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${w(f.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{if(await _n(m),u.removeTransaction(m),f.customerId||f.customerName){const S=(await Y()).find(l=>f.customerId&&String(l.id)===String(f.customerId)||(l.name||"").trim().toLowerCase()===(f.customerName||"").trim().toLowerCase());if(S){S.totalOrders=Math.max(0,(Number(S.totalOrders)||1)-1),S.totalSpent=Math.max(0,(Number(S.totalSpent)||f.total)-f.total),f.paymentMethod==="debt"&&(Number(f.remainingDebt)||0)>0&&(S.totalDebt=Math.max(0,(Number(S.totalDebt)||0)-Number(f.remainingDebt))),await Ht(S);const l=await Y();u.setCustomers(l)}}for(const k of f.items||[])if((T=k.product)!=null&&T.id){const S=await E.products.get(k.product.id);if(S&&typeof S.stock=="number"){const l=S.stock+(Number(k.qty)||1);await $a({...S,stock:l})}}const I=await dt();u.setProducts(I),window.showToast("Transaksi dihapus & stok dikembalikan","success")}catch{window.showToast("Gagal menghapus","error")}}})},$s=t=>{var s;const e=t.remainingDebt||0,a=`
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
          <div style="font-size:16px;font-weight:900;color:#dc2626">${b(t.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${b(e)}</div>
        </div>
      </div>

      ${(s=t.debtPayments)!=null&&s.length?`
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${t.debtPayments.map(n=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(n.date).toLocaleDateString("id-ID")} — ${w(n.note||"-")}</span>
            <strong style="color:#16a34a">+${b(n.amount)}</strong>
          </div>
        `).join("")}
      </div>`:""}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${b(e)})</label>
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
  `;et(a,"debt-modal"),setTimeout(()=>{var n,i,o;(n=document.getElementById("debt-x"))==null||n.addEventListener("click",()=>z("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>z("debt-modal")),(o=document.getElementById("debt-save"))==null||o.addEventListener("click",async()=>{var k,S,l;const r=parseFloat((k=document.getElementById("cicil-amount"))==null?void 0:k.value)||0;if(r<=0||r>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${b(e)}`,"warning");return}const d=(t.paidAmount||0)+r,p=Math.max(0,e-r),c=p===0?"paid":"partial",m=(t.debtPayments||[]).length+1,g=p===0?`Pelunasan (#${m}/LUNAS ✅)`:`Cicilan #${m}`,f=((l=(S=document.getElementById("cicil-note"))==null?void 0:S.value)==null?void 0:l.trim())||g,T=[...t.debtPayments||[],{date:new Date().toISOString(),amount:r,note:f}],I={...t,paidAmount:d,remainingDebt:p,paymentStatus:c,debtPayments:T};try{if(await te(I),u.updateTransaction(t.id,{paidAmount:d,remainingDebt:p,paymentStatus:c,debtPayments:T}),t.customerId||t.customerName){const v=(await Y()).find(x=>t.customerId&&String(x.id)===String(t.customerId)||(x.name||"").trim().toLowerCase()===(t.customerName||"").trim().toLowerCase());if(v){v.totalDebt=Math.max(0,(Number(v.totalDebt)||0)-r),await Ht(v);const x=await Y();u.setCustomers(x)}}z("debt-modal"),window.showToast(p===0?"🎉 Hutang LUNAS!":`Cicilan ${b(r)} dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)},Ls=t=>{var i;const e=he(t,u.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Aa(t);const a=Ve(t),s=((i=u.state.settings)==null?void 0:i.printerPaper)||"58mm",n=`
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
          <div style="margin-top:4px">${Ha(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${w(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${qa(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${xe(t,s)}</div>

      ${(t.remainingDebt||0)>0?`
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${b(t.remainingDebt)}</div>
      </div>`:""}

      <div style="display:grid;grid-template-columns:${t.change>0?"1fr 1fr":"1fr"};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${b(t.total)}</div>
        </div>
        ${t.change>0?`
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${b(t.change)}</div>
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
      <a class="btn btn--secondary" href="${a}" style="text-decoration:none;font-size:11px;display:flex;align-items:center;gap:4px">
        ⚡ RawBT
      </a>
      <button class="btn btn--success" id="btn-tx-print-direct" style="font-weight:700">
        🖨️ Cetak (${s})
      </button>
    </div>
  `;et(n,"tx-detail"),setTimeout(()=>{var o,r,d,p,c,m,g,f;(o=document.getElementById("td-x"))==null||o.addEventListener("click",()=>z("tx-detail")),(r=document.getElementById("td-close-btn"))==null||r.addEventListener("click",()=>z("tx-detail")),(d=document.getElementById("btn-tx-print-direct"))==null||d.addEventListener("click",()=>{ae(t)}),(p=document.getElementById("btn-td-ble"))==null||p.addEventListener("click",async()=>{try{window.showToast("Koneksi Bluetooth...","info"),await za(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(T){window.showToast(T.message||"Gagal Bluetooth","error")}}),(c=document.getElementById("btn-td-usb"))==null||c.addEventListener("click",async()=>{try{window.showToast("Koneksi USB...","info"),await Oa(t)}catch(T){window.showToast(T.message||"Gagal USB","error")}}),(m=document.getElementById("btn-td-whatsapp"))==null||m.addEventListener("click",()=>{Ca(t)}),(g=document.getElementById("btn-td-btapp"))==null||g.addEventListener("click",()=>{Da(t)}),(f=document.getElementById("btn-save-png"))==null||f.addEventListener("click",()=>{Ma(t)})},0)};let Xt=[],Dt="";const pa={owner:{label:"👑 Owner / Pemilik",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir / Staff",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},Is=async()=>{if(Xt.length){for(const t of Xt)typeof t=="function"&&t();Xt=[]}Xt.push(u.on("users:change",()=>kt())),Xt.push(u.on("auth:change",()=>{const t=document.getElementById("view-users");t!=null&&t.classList.contains("active")&&kt()})),await kt()},kt=async()=>{var n,i,o,r,d;const t=document.getElementById("view-users");if(!t)return;const e=u.state.currentUser;if((e==null?void 0:e.role)!=="owner"){t.innerHTML=`
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
    `,(n=document.getElementById("btn-lock-switch-op"))==null||n.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))});return}const s=(await St()).filter(p=>{if(!Dt)return!0;const c=Dt.toLowerCase();return(p.name||"").toLowerCase().includes(c)||(p.username||"").toLowerCase().includes(c)});t.innerHTML=`
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
      <input type="text" id="user-search-input" value="${w(Dt)}" placeholder="Cari nama atau username operator..." style="border: none; outline: none; background: transparent; width: 100%; font-size: 14px;">
      ${Dt?'<button id="btn-clear-user-search" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px;">✕</button>':""}
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
            `:s.map(p=>{const c=pa[p.role]||pa.cashier,m=e&&String(e.id)===String(p.id),g=p.isActive!==!1;return`
                <tr style="border-bottom: 1px solid var(--border, #f1f5f9); font-size: 14px;">
                  <td style="padding: 14px 18px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background: ${c.bg}; color: ${c.color}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                        ${(p.name||"U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 600; color: var(--text-primary, #1e293b);">${w(p.name)} ${m?'<span style="font-size: 11px; padding: 2px 6px; border-radius: 6px; background: #e0e7ff; color: #3730a3; margin-left: 4px;">Anda</span>':""}</div>
                        <div style="font-size: 12px; color: var(--text-muted, #64748b);">Dibuat: ${new Date(p.createdAt||Date.now()).toLocaleDateString("id-ID")}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 14px 18px; font-family: monospace; font-size: 13px; color: var(--text-secondary, #475569);">
                    @${w(p.username)}
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; color: ${c.color}; background: ${c.bg};">
                      ${c.label}
                    </span>
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: ${g?"#10b981":"#ef4444"};">
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${g?"#10b981":"#ef4444"};"></span>
                      ${g?"Aktif":"Nonaktif"}
                    </span>
                  </td>
                  <td style="padding: 14px 18px; text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button class="btn-edit-user" data-id="${p.id}" title="Edit Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border, #cbd5e1); background: transparent; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      ${m?"":`
                        <button class="btn-delete-user" data-id="${p.id}" data-name="${w(p.name)}" title="Hapus Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer;">
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
  `,(i=document.getElementById("btn-users-logout"))==null||i.addEventListener("click",()=>{confirm("Keluar dari sesi operator kasir?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(o=document.getElementById("btn-add-user"))==null||o.addEventListener("click",()=>ua()),(r=document.getElementById("user-search-input"))==null||r.addEventListener("input",p=>{Dt=p.target.value,kt()}),(d=document.getElementById("btn-clear-user-search"))==null||d.addEventListener("click",()=>{Dt="",kt()}),t.querySelectorAll(".btn-edit-user").forEach(p=>{p.addEventListener("click",async()=>{const c=p.getAttribute("data-id"),m=await kn(String(c));m&&ua(m)})}),t.querySelectorAll(".btn-delete-user").forEach(p=>{p.addEventListener("click",async()=>{const c=p.getAttribute("data-id"),m=p.getAttribute("data-name");if(confirm(`Yakin ingin menghapus operator "${m}"? Tindakan ini tidak dapat dibatalkan.`)){await Tn(String(c));const g=await St();u.setUsers(g),kt()}})})},ua=(t=null)=>{var d,p;const e=!!t,a="modal-user-form",s=`
    <div id="${a}" class="modal-overlay" style="display: flex; align-items: center; justify-content: center;">
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
            <input type="text" id="input-user-name" required value="${w((t==null?void 0:t.name)||"")}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px;">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Username</label>
            <input type="text" id="input-user-username" required ${e?"disabled":""} value="${w((t==null?void 0:t.username)||"")}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; ${e?"background: var(--bg-muted, #f1f5f9);":""}">
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
  `,n=document.getElementById(a);n&&n.remove(),document.body.insertAdjacentHTML("beforeend",s);const i=document.getElementById(a),o=()=>i.remove();(d=i.querySelector(".modal-close"))==null||d.addEventListener("click",o),(p=i.querySelector(".modal-cancel"))==null||p.addEventListener("click",o),document.getElementById("form-user-save").addEventListener("submit",async c=>{c.preventDefault();const m=document.getElementById("user-form-error");m.style.display="none";const g=document.getElementById("input-user-name").value.trim(),f=document.getElementById("input-user-username").value.trim().toLowerCase(),T=document.getElementById("input-user-role").value,I=document.getElementById("input-user-pin").value.trim(),k=e?document.getElementById("input-user-active").checked:!0;if(!g||!f){m.textContent="Nama dan username wajib diisi.",m.style.display="block";return}if(!e&&(!I||I.length<4)){m.textContent="PIN minimal 4 angka numerik.",m.style.display="block";return}if(I&&(I.length<4||Number.isNaN(Number(I)))){m.textContent="PIN harus berupa angka (4 hingga 6 digit).",m.style.display="block";return}try{const S=await St();if(!e&&S.some(h=>(h.username||"").toLowerCase()===f)){m.textContent=`Username "${f}" sudah digunakan oleh operator lain.`,m.style.display="block";return}if(e){let h=t.pinHash,v=t.pinSalt;I&&(v=ea(),h=await ze(I,v));const x={...t,name:g,role:T,pinHash:h,pinSalt:v,isActive:k,updatedAt:new Date().toISOString()};await En(x),u.state.currentUser&&String(u.state.currentUser.id)===String(t.id)&&(u.state.currentUser.name=g,u.state.currentUser.role=T,sessionStorage.setItem("bm_active_user",JSON.stringify(u.state.currentUser)),u.emit("auth:change",u.state.currentUser))}else{const h=ea(),v=await ze(I,h),x={name:g,username:f,role:T,pinHash:v,pinSalt:h,isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};await Sn(x)}const l=await St();u.setUsers(l),o(),kt()}catch(S){m.textContent=`Gagal menyimpan data: ${S.message}`,m.style.display="block"}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const Ga=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine||(t.textContent="⚡ Mode Offline",t.classList.add("status-badge--offline"),t.style.background="rgba(239, 68, 68, 0.12)",t.style.borderColor="rgba(239, 68, 68, 0.3)",t.style.color="#dc2626"))};window.addEventListener("offline",Ga);window.showToast=(t,e="info",a="")=>{const s=document.getElementById("toast-container");if(!s)return;const n={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${n[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${a?`<div class="toast__title">${w(a)}</div>`:""}
      <div class="toast__msg">${w(t)}</div>
    </div>
  `,s.appendChild(i);const o=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},r=setTimeout(o,3500);i.addEventListener("click",()=>{clearTimeout(r),o()})};const ma=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=ba()),e&&(e.textContent=an())},_s={login:{init:Xn,refresh:Ft},pos:{init:Zn,refresh:ss},products:{init:ds,refresh:se},customers:{init:Fn,refresh:vt},transactions:{init:ks,refresh:Fa},reports:{init:us,refresh:Ye},settings:{init:vs,refresh:Ot},finance:{init:qn,refresh:ot},users:{init:Is,refresh:kt}},ga=new Set,ut=async t=>{var s;!u.state.currentUser&&t!=="login"&&((s=window.showToast)==null||s.call(window,"Silakan masuk dengan akun operator untuk melanjutkan.","warning"),t="login");const e=_s[t];if(!e)return;if(!u.canAccess(t)){window.showToast("Akses dibatasi untuk peran Anda. Silakan hubungi Owner/Supervisor.","warning","Peran Terbatas"),Re({onLogin:()=>ut(t)});return}document.querySelectorAll(".dock-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)});const a=document.querySelector(".dock-container");a&&(a.style.display=t==="login"||!u.state.currentUser?"none":"flex"),document.querySelectorAll(".view").forEach(n=>{n.classList.toggle("active",n.id===`view-${t}`)});try{ga.has(t)?await e.refresh():(await e.init(),ga.add(t)),sessionStorage.setItem("activeView",t)}catch(n){const i=document.getElementById(`view-${t}`);i&&!i.children.length&&(i.innerHTML=`
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
      `)}u.navigate(t)},As=(t,e)=>{if(!t)return;const a=t.getBoundingClientRect(),s=Math.max(a.width,a.height),n=document.createElement("span");n.className="ripple-effect",n.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-a.left-s/2}px;top:${e.clientY-a.top-s/2}px`,t.style.position="relative",t.appendChild(n),n.addEventListener("animationend",()=>n.remove(),{once:!0})},Wa=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};u.on("settings:change",Wa);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const Ja=t=>{const e=document.getElementById("operator-badge"),a=document.getElementById("operator-name"),s=document.getElementById("operator-icon"),n=document.getElementById("btn-topbar-logout"),i=document.getElementById("btn-topbar-login");t?(a&&(a.textContent=`${t.name} (${t.role})`),s&&(s.textContent=t.role==="owner"?"👑":t.role==="supervisor"?"⭐":"👤"),e&&(e.style.display="flex",e.style.color=t.role==="owner"?"#8b5cf6":t.role==="supervisor"?"#2563eb":"#10b981",e.style.background=t.role==="owner"?"rgba(139, 92, 246, 0.12)":t.role==="supervisor"?"rgba(37, 99, 235, 0.12)":"rgba(16, 185, 129, 0.12)",e.style.borderColor=t.role==="owner"?"rgba(139, 92, 246, 0.3)":t.role==="supervisor"?"rgba(37, 99, 235, 0.3)":"rgba(16, 185, 129, 0.3)"),n&&(n.style.display="inline-flex"),i&&(i.style.display="none")):(a&&(a.textContent="Belum Masuk"),s&&(s.textContent="🔒"),e&&(e.style.color="#64748b",e.style.background="rgba(100, 116, 139, 0.1)",e.style.borderColor="rgba(100, 116, 139, 0.25)"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"));const o=document.getElementById("dock-users");o&&(o.style.display=t&&t.role==="owner"?"flex":"none")};u.on("auth:change",Ja);const Bs=async()=>{var D,X,at,R;window.appNavigateTo=ut;try{await Mn(),await We()}catch{window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}try{const $=await hn();$?u.login($):u.logout()}catch{u.logout()}Ja(u.state.currentUser),navigator.onLine&&oe().catch(()=>{}),(D=document.getElementById("operator-badge"))==null||D.addEventListener("click",()=>{Re()}),(X=document.getElementById("btn-topbar-logout"))==null||X.addEventListener("click",()=>{var $;confirm("Keluar dari sesi operator kasir saat ini?")&&(u.logout(),ut("login"),($=window.showToast)==null||$.call(window,"Sesi ditutup. Silakan login kembali.","info"))}),(at=document.getElementById("btn-topbar-login"))==null||at.addEventListener("click",()=>{ut("login")}),(R=document.getElementById("btn-sync-staged"))==null||R.addEventListener("click",async()=>{await ln()}),window.addEventListener("request-operator-switch",()=>{Re()}),window.addEventListener("request-logout",()=>{u.logout(),ut("login")});const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const $ of t){const C=await Ge($);C!==null&&($==="modalAwal"||$==="taxRate"?e[$]=parseFloat(C)||0:e[$]=C)}u.updateSettings(e),Wa(u.state.settings),Ga(),ma(),setInterval(ma,1e3),dn(),It().catch(()=>{}),pe(),Lt();const a=document.querySelector(".dock"),s="bm_dock_order_v3";(()=>{try{for(const M of(a==null?void 0:a.querySelectorAll(".dock-separator"))??[])M.remove();const $=localStorage.getItem(s);if(!$)return;const C=JSON.parse($);if(!Array.isArray(C)||!C.length)return;const N=new Map;a==null||a.querySelectorAll(".dock-item").forEach(M=>{N.set(M.dataset.view,M)}),C.forEach(M=>{const F=N.get(M);F&&a&&(a.appendChild(F),N.delete(M))}),N.forEach(M=>{a&&a.appendChild(M)})}catch{}})();let i=a?[...a.querySelectorAll(".dock-item")]:[];const o=()=>window.innerWidth<600,r=()=>window.innerWidth>=600&&window.innerWidth<=1024,d=()=>o()?1.22:r()?1.36:1.5,p=()=>o()?8:r()?12:18,c=()=>o()?90:140;let m=i.map(()=>1),g=i.map(()=>1),f=null,T=!1;const I=($,C,N)=>$+(C-$)*N,k=.24,S=()=>{if(T)return;let $=!1;const C=d(),N=p();i.forEach((M,F)=>{m[F]=I(m[F]??1,g[F]??1,k),Math.abs(m[F]-g[F])>5e-4?$=!0:m[F]=g[F];const q=m[F],G=(q-1)/(C-1||1)*N;M.style.transform=`translate3d(0, ${-G.toFixed(2)}px, 0) scale(${q.toFixed(4)})`,M.style.zIndex=q>1.02?Math.round(q*20):""}),f=$?requestAnimationFrame(S):null},l=()=>{!T&&!f&&(f=requestAnimationFrame(S))},h=$=>{if(T)return;const C=d(),N=c();i.forEach((M,F)=>{const q=M.getBoundingClientRect(),G=q.left+q.width/2,j=Math.abs($-G);if(j<N){const H=Math.cos(j/N*(Math.PI/2));g[F]=1+(C-1)*H*H}else g[F]=1})},v=()=>{i.forEach(($,C)=>{g[C]=1})};a==null||a.addEventListener("mousemove",$=>{$.pointerType==="touch"||o()||T||(h($.clientX),l())},{passive:!0});const x=()=>{T||(v(),m=i.map(()=>1),i.forEach($=>{$.style.transform="",$.style.zIndex="";try{$.blur()}catch{}}),f&&(cancelAnimationFrame(f),f=null))};a==null||a.addEventListener("mouseleave",x),a==null||a.addEventListener("pointerup",x),a==null||a.addEventListener("touchend",x),a==null||a.addEventListener("pointercancel",x);let y=null,A=-1,P=-1,_=0,O=0,U=[],L=!1;const K=()=>i.map(($,C)=>{const N=$.getBoundingClientRect();return{idx:C,el:$,x:N.left,cx:N.left+N.width/2,width:N.width}});i.forEach($=>{$.addEventListener("pointerdown",N=>{if(!(N.button!==0&&N.pointerType==="mouse")){y=$,A=i.indexOf($),P=A,_=N.clientX,O=N.clientY,L=!1,U=K();try{$.setPointerCapture(N.pointerId)}catch{}}}),$.addEventListener("pointermove",N=>{var q;if(!y||y!==$)return;const M=N.clientX-_,F=N.clientY-O;if(!L&&Math.hypot(M,F)>5&&(L=!0,T=!0,f&&(cancelAnimationFrame(f),f=null),a==null||a.classList.add("is-reordering"),$.classList.add("is-dragging"),i.forEach(G=>{G!==$&&(G.style.zIndex="")})),L&&T){$.style.transform=`translate3d(${M}px, ${F-12}px, 0) scale(1.18)`;let G=A;for(let j=0;j<U.length;j++)if(j===0&&N.clientX<U[0].cx){G=0;break}else if(j===U.length-1&&N.clientX>=U[j].cx){G=U.length-1;break}else if(N.clientX>=U[j].cx&&N.clientX<((q=U[j+1])==null?void 0:q.cx)){const H=(U[j].cx+U[j+1].cx)/2;G=N.clientX<H?j:j+1;break}P=Math.max(0,Math.min(i.length-1,G)),U.forEach(({el:j,idx:H,x:Et})=>{if(j===$)return;let qt=0;if(H>A&&H<=P){const Bt=U[H-1];qt=Bt?Bt.x-Et:-58}else if(H<A&&H>=P){const Bt=U[H+1];qt=Bt?Bt.x-Et:58}j.style.transform=`translate3d(${qt}px, 0, 0)`})}});const C=N=>{if(!(!y||y!==$)){try{$.releasePointerCapture(N.pointerId)}catch{}if(L&&T){if(a==null||a.classList.remove("is-reordering"),$.classList.remove("is-dragging"),i.forEach(M=>{M.style.transform=""}),P!==A&&P>=0){const M=i.filter(q=>q!==$);P>=M.length?a==null||a.appendChild($):a==null||a.insertBefore($,M[P]),i=a?[...a.querySelectorAll(".dock-item")]:[];const F=i.map(q=>q.dataset.view).filter(Boolean);try{localStorage.setItem(s,JSON.stringify(F))}catch{}}m=i.map(()=>1),g=i.map(()=>1),T=!1,v(),l()}else{T=!1,$.style.transform="";const M=$.dataset.view;M&&($.classList.remove("bouncing"),$.offsetWidth,$.classList.add("bouncing"),$.addEventListener("animationend",()=>$.classList.remove("bouncing"),{once:!0}),As($.querySelector(".dock-icon"),N),ut(M))}try{$.blur()}catch{}v(),m=i.map(()=>1),i.forEach(M=>{M.style.transform="",M.style.zIndex=""}),f&&(cancelAnimationFrame(f),f=null),y=null,A=-1,P=-1,L=!1}};$.addEventListener("pointerup",C),$.addEventListener("pointercancel",C)});let W=!1;window.addEventListener("keydown",$=>{["ArrowLeft","ArrowRight","Tab","Home","End"].includes($.key)&&(W=!0)},{passive:!0}),window.addEventListener("pointerdown",()=>{W=!1},{passive:!0}),i.forEach($=>{$.addEventListener("focus",()=>{if(!W)return;const C=i.indexOf($);i.forEach((N,M)=>{const F=Math.abs(M-C);g[M]=F===0?1.35:F===1?1.12:1}),l()}),$.addEventListener("blur",()=>{v(),l()}),$.addEventListener("keydown",C=>{var M,F;const N=i.indexOf($);if(C.key==="ArrowRight"){C.preventDefault();const q=i[N+1]||i[0];q==null||q.focus()}else if(C.key==="ArrowLeft"){C.preventDefault();const q=i[N-1]||i[i.length-1];q==null||q.focus()}else if(C.key==="Home")C.preventDefault(),(M=i[0])==null||M.focus();else if(C.key==="End")C.preventDefault(),(F=i[i.length-1])==null||F.focus();else if(C.key==="Enter"||C.key===" "){C.preventDefault();const q=$.dataset.view;q&&ut(q)}})}),(()=>{let $=0,C=0,N=0,M=!1;const F=()=>{const j=(a?[...a.querySelectorAll(".dock-item")]:[]).map(H=>H.dataset.view).filter(H=>!!H&&u.canAccess(H));return j.length?j:["pos","customers","transactions"]},q=G=>{let j=G;for(;j&&j!==document.body;){if(j.classList&&(j.classList.contains("modal-overlay")||j.classList.contains("modal")||j.classList.contains("dock")||j.classList.contains("dock-container"))||["INPUT","TEXTAREA","SELECT"].includes(j.tagName))return!0;if(j.scrollWidth>j.clientWidth+10){const H=window.getComputedStyle(j);if(H.overflowX==="auto"||H.overflowX==="scroll")return!0}j=j.parentElement}return!1};window.addEventListener("touchstart",G=>{var H;if(!u.state.currentUser){M=!0;return}if(((H=G.touches)==null?void 0:H.length)!==1){M=!0;return}const j=G.touches[0];$=j.clientX,C=j.clientY,N=Date.now(),M=q(G.target)},{passive:!0}),window.addEventListener("touchmove",G=>{if(M||!G.touches||G.touches.length!==1)return;const j=G.touches[0],H=j.clientX-$,Et=j.clientY-C;Math.abs(Et)>Math.abs(H)&&Math.abs(Et)>12&&(M=!0)},{passive:!0}),window.addEventListener("touchend",G=>{var Ze;if(!u.state.currentUser||M||!G.changedTouches||!G.changedTouches.length)return;const j=G.changedTouches[0],H=j.clientX-$,Et=j.clientY-C,qt=Date.now()-N;if(Math.abs(H)>=50&&Math.abs(H)>Math.abs(Et)*1.35&&qt<=550){const we=F(),Va=u.state.currentView||sessionStorage.getItem("activeView")||"pos",Gt=we.indexOf(Va);if(Gt!==-1){let re=-1;if(H<0&&Gt<we.length-1?re=Gt+1:H>0&&Gt>0&&(re=Gt-1),re!==-1){const ta=we[re];try{(Ze=navigator.vibrate)==null||Ze.call(navigator,12)}catch{}const Pt=a==null?void 0:a.querySelector(`.dock-item[data-view="${ta}"]`);Pt&&(Pt.classList.remove("bouncing"),Pt.offsetWidth,Pt.classList.add("bouncing"),Pt.addEventListener("animationend",()=>Pt.classList.remove("bouncing"),{once:!0})),ut(ta)}}}},{passive:!0})})();const B=document.getElementById("topbar-app-version");if(B){const $="1.1.0";B.textContent=`v${$}`}if(!u.state.currentUser)await ut("login");else{const $=sessionStorage.getItem("activeView")||"pos";await ut($==="login"?"pos":$)}};document.addEventListener("DOMContentLoaded",Bs);
