const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-CSRlgf-4.js","./vendor-qr-CYzGYPQn.js","./vendor-jspdf-BEqUCB1L.js"])))=>i.map(i=>d[i]);
import{X as Xa}from"./vendor-db-1iEchKay.js";import{c as Ya}from"./vendor-supabase-BBmmNHm-.js";import{b as Za}from"./vendor-qr-CYzGYPQn.js";import{_ as ge}from"./vendor-jspdf-BEqUCB1L.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const Ct={},p={state:{cart:[],products:[],customers:[],transactions:[],expenses:[],users:[],currentUser:null,currentView:"pos",discount:0,customerName:"",selectedCustomer:null,settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return Ct[t]||(Ct[t]=[]),Ct[t].push(e),()=>{Ct[t]=(Ct[t]??[]).filter(a=>a!==e)}},emit(t,e){for(const a of Ct[t]??[])a(e)},addToCart(t,e=1){const a=Math.max(1,parseInt(e,10)||1),s=this.state.cart.findIndex(n=>String(n.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=a:this.state.cart.push({product:t,qty:a}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const a=this.state.cart.find(s=>String(s.product.id)===String(t));a&&(a.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.state.selectedCustomer=null,this.emit("cart:change",this.state.cart),this.emit("selectedCustomer:change",null)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setCustomers(t){this.state.customers=t||[],this.emit("customers:change",this.state.customers)},setSelectedCustomer(t){this.state.selectedCustomer=t,this.state.customerName=t?t.name:"",this.emit("selectedCustomer:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>String(e.id)!==String(t)),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const a=this.state.transactions.findIndex(s=>String(s.id)===String(t));a>=0&&(this.state.transactions[a]={...this.state.transactions[a],...e},this.emit("transactions:change",this.state.transactions))},updateCustomer(t,e){const a=this.state.customers.findIndex(s=>String(s.id)===String(t));a>=0&&(this.state.customers[a]={...this.state.customers[a],...e},this.emit("customers:change",this.state.customers))},addCustomer(t){this.state.customers=[...this.state.customers,t],this.emit("customers:change",this.state.customers)},removeCustomer(t){this.state.customers=this.state.customers.filter(e=>String(e.id)!==String(t)),this.emit("customers:change",this.state.customers)},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)},setUsers(t){this.state.users=t,this.emit("users:change",t)},addUser(t){this.state.users=[...this.state.users,t],this.emit("users:change",this.state.users)},updateUser(t,e){const a=this.state.users.findIndex(s=>String(s.id)===String(t));a>=0&&(this.state.users[a]={...this.state.users[a],...e},this.emit("users:change",this.state.users))},removeUser(t){this.state.users=this.state.users.filter(e=>String(e.id)!==String(t)),this.emit("users:change",this.state.users)},login(t,e=null){const a={id:t.id,username:t.username,name:t.name,role:t.role||"cashier"};this.state.currentUser=a;try{sessionStorage.setItem("bm_active_user",JSON.stringify(a)),e&&localStorage.setItem("bm_jwt_token",e)}catch{}this.emit("auth:change",a)},logout(){this.state.currentUser=null;try{sessionStorage.removeItem("bm_active_user"),localStorage.removeItem("bm_jwt_token")}catch{}this.emit("auth:change",null)},restoreSession(){try{const t=sessionStorage.getItem("bm_active_user");if(t)return this.state.currentUser=JSON.parse(t),this.emit("auth:change",this.state.currentUser),this.state.currentUser}catch{}return null},canAccess(t){if(t==="login")return!0;const e=this.state.currentUser;if(!e)return!1;const a=e.role||"cashier";return a==="owner"?!0:a==="supervisor"?["pos","products","customers","transactions","reports"].includes(t):["pos","customers","transactions"].includes(t)}},ie=()=>{if(typeof window<"u"&&window.crypto)return window.crypto;if(typeof globalThis<"u"&&globalThis.crypto)return globalThis.crypto;throw new Error("Web Crypto API tidak tersedia pada runtime ini.")},ta=(t=16)=>{const e=ie(),a=new Uint8Array(t);return e.getRandomValues(a),Array.from(a,s=>s.toString(16).padStart(2,"0")).join("")},Bt=(t="")=>{let e;try{const a=ie();if(typeof a.randomUUID=="function")e=a.randomUUID();else{const s=new Uint8Array(16);a.getRandomValues(s),s[6]=s[6]&15|64,s[8]=s[8]&63|128,e=Array.from(s,(n,i)=>([4,6,8,10].includes(i)?"-":"")+n.toString(16).padStart(2,"0")).join("")}}catch{e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const n=Math.random()*16|0;return(s==="x"?n:n&3|8).toString(16)})}return t?`${t}_${e}`:e},ze=async(t,e)=>{if(!t||typeof t!="string")throw new Error("PIN tidak valid.");if(!e||typeof e!="string")throw new Error("Salt tidak valid.");const a=ie(),n=new TextEncoder().encode(`${e}:${t.trim()}`),i=await a.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(i)).map(r=>r.toString(16).padStart(2,"0")).join("")},ea=async(t,e,a)=>{if(!t||!e||!a)return!1;try{const s=await ze(t,e);if(s.length!==a.length)return!1;let n=0;for(let i=0;i<s.length;i++)n|=s.charCodeAt(i)^a.charCodeAt(i);return n===0}catch{return!1}},ke=t=>{let e;if(typeof t=="string")typeof btoa=="function"?e=btoa(unescape(encodeURIComponent(t))):e=Buffer.from(t,"utf8").toString("base64");else{const a=new Uint8Array(t);if(typeof btoa=="function"){let s="";for(let n=0;n<a.byteLength;n++)s+=String.fromCharCode(a[n]);e=btoa(s)}else e=Buffer.from(a).toString("base64")}return e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")},tn=t=>{let e=t.replace(/-/g,"+").replace(/_/g,"/");for(;e.length%4;)e+="=";return typeof atob=="function"?decodeURIComponent(escape(atob(e))):Buffer.from(e,"base64").toString("utf8")},en=t=>{let e=t.replace(/-/g,"+").replace(/_/g,"/");for(;e.length%4;)e+="=";let a;typeof atob=="function"?a=atob(e):a=Buffer.from(e,"base64").toString("binary");const s=new Uint8Array(a.length);for(let n=0;n<a.length;n++)s[n]=a.charCodeAt(n);return s},aa=async(t,e,a=86400*7)=>{const s=ie(),n=new TextEncoder,i={alg:"HS256",typ:"JWT"},o=Math.floor(Date.now()/1e3),r={...t,iat:o,exp:o+a},d=ke(JSON.stringify(i)),l=ke(JSON.stringify(r)),c=`${d}.${l}`,m=await s.subtle.importKey("raw",n.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),g=await s.subtle.sign("HMAC",m,n.encode(c)),y=ke(g);return`${c}.${y}`},an=async(t,e)=>{if(!t||typeof t!="string")return null;const a=t.split(".");if(a.length!==3)return null;const[s,n,i]=a,o=`${s}.${n}`,r=ie(),d=new TextEncoder;try{const l=await r.subtle.importKey("raw",d.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["verify"]),c=en(i);if(!await r.subtle.verify("HMAC",l,c,d.encode(o)))return null;const g=tn(n),y=JSON.parse(g),T=Math.floor(Date.now()/1e3);return y.exp&&y.exp<T?null:y}catch{return null}},nn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),sn=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),ga=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),vt=(t=new Date)=>`${sn(t)} ${ga(t)}`,it=(t=new Date)=>{const e=t instanceof Date?t:new Date(t);if(Number.isNaN(e.getTime()))return new Date().toISOString().split("T")[0];const a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`},on=(t=new Date)=>{const e=t instanceof Date?t:new Date(t);return Number.isNaN(e.getTime())?new Date().toISOString().slice(0,7):`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`},ba="https://wiapnhpdgjbtkblowfig.supabase.co",De="sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g",rn="STORE-BM-856CFAC8",Ke="bm_master_store_key",be="bm_jwt_token",fa=()=>`BM_SECRET_${ut()}_2026_AUTHORITATIVE`,ut=()=>{try{const t=localStorage.getItem(Ke);if(t!=null&&t.trim())return t.trim()}catch{}return rn},dn=t=>{try{if(t!=null&&t.trim())return localStorage.setItem(Ke,t.trim()),!0}catch{}return!1},Z=()=>{try{return localStorage.getItem(Ke)==="ISOLATED_SANDBOX"}catch{return!1}};let Se=null,Ee=null;const nt=()=>(Se||(Se=Ya(ba,De,{auth:{persistSession:!1},realtime:{params:{eventsPerSecond:20}}})),Se),rt=(t,e)=>{const a=document.getElementById("status-badge");a&&(t==="online"?(a.textContent=e||"🟢 Cloud Realtime",a.classList.remove("status-badge--offline"),a.style.background="rgba(16, 185, 129, 0.12)",a.style.borderColor="rgba(16, 185, 129, 0.3)",a.style.color="#059669"):t==="syncing"?(a.textContent="🔄 Sinkronisasi...",a.classList.remove("status-badge--offline"),a.style.background="rgba(37, 99, 235, 0.12)",a.style.borderColor="rgba(37, 99, 235, 0.3)",a.style.color="#2563eb"):(a.textContent=e||"⚡ Mode Offline",a.classList.add("status-badge--offline"),a.style.background="rgba(239, 68, 68, 0.12)",a.style.borderColor="rgba(239, 68, 68, 0.3)",a.style.color="#dc2626"))};let $e=null,Ut=!0,Oe=0;const fe=()=>Ut,ln=async()=>{if(Z())return{ok:!1,rtt:0,isolated:!0};const t=performance.now();try{const e=new AbortController,a=setTimeout(()=>e.abort(),3500),s=await fetch(`${ba}/rest/v1/settings?select=key&limit=1`,{method:"GET",headers:{apikey:De,Authorization:`Bearer ${De}`},signal:e.signal,cache:"no-store"});clearTimeout(a);const n=performance.now(),i=Math.round(n-t);return s.ok?(Ut=!0,Oe=i,{ok:!0,rtt:i}):(Ut=!1,{ok:!1,rtt:i})}catch{return Ut=!1,Oe=0,{ok:!1,rtt:0}}},cn=(t=12e3)=>{$e&&clearInterval($e);const e=async()=>{const a=await ln();a.ok?(a.rtt>1500?rt("syncing",`🟡 Sinyal Lambat (${a.rtt}ms)`):rt("online",`🟢 Cloud Realtime (${a.rtt}ms)`),Lt()):rt("offline","🔴 Mode Offline (Staged)")};e(),$e=setInterval(e,t),window.addEventListener("online",()=>e()),window.addEventListener("offline",()=>rt("offline","🔴 Mode Offline (Staged)"))},Lt=async()=>{try{const e=(await E.transactions.where("syncStatus").equals("staged_offline").toArray()).length,a=document.getElementById("staged-offline-banner"),s=document.getElementById("staged-tx-count");return a&&s&&(e>0&&Ut?(s.textContent=e,a.style.display="flex"):a.style.display="none"),e}catch{return 0}},pn=async()=>{var t,e,a;if(!Ut||Z())return(t=window.showToast)==null||t.call(window,"Tidak dapat menyinkronkan: Server belum terjangkau.","warning"),{success:!1};try{rt("syncing","🔄 Mengunggah data offline...");const s=await E.transactions.where("syncStatus").equals("staged_offline").toArray();if(s.length===0)return Lt(),{success:!0,count:0};const n=nt(),{error:i}=await n.from("transactions").upsert(s.map(He));if(i)throw i;for(const o of s)o.syncStatus="synced",await E.transactions.put(o);return Lt(),rt("online",`🟢 Cloud Realtime (${Oe}ms)`),(e=window.showToast)==null||e.call(window,`Sukses menyinkronkan ${s.length} transaksi offline ke Cloud!`,"success"),{success:!0,count:s.length}}catch(s){return(a=window.showToast)==null||a.call(window,`Gagal menyinkronkan data offline: ${s.message}`,"error"),{success:!1,error:s.message}}},un=t=>({id:String(t.id),name:t.name||"",category:t.category||"Umum",price:Number(t.price)||0,unit:t.unit||"buah",emoji:t.emoji||"📦",stock:Number(t.stock)||0,updated_at:new Date().toISOString()}),He=t=>({id:String(t.id),invoice_no:t.invoiceNo||t.invoice_no||`INV-${Date.now()}`,date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||it(t.date?new Date(t.date):new Date),customer_name:t.customerName||t.customer_name||"",items:t.items||[],subtotal:Number(t.subtotal)||0,discount:Number(t.discount)||0,tax:Number(t.tax)||0,total:Number(t.total)||0,paid:Number(t.paid)||0,change:Number(t.change)||0,payment_method:t.paymentMethod||t.payment_method||"cash",payment_status:t.paymentStatus||t.payment_status||"cash_paid",paid_amount:Number(t.paidAmount||t.paid_amount)||0,remaining_debt:Number(t.remainingDebt||t.remaining_debt)||0,debt_payments:t.debtPayments||t.debt_payments||[],cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),ya=t=>({id:String(t.id),date:t.date?new Date(t.date).toISOString():new Date().toISOString(),date_key:t.dateKey||t.date_key||it(t.date?new Date(t.date):new Date),category:t.category||"Operasional",note:t.note||"",amount:Number(t.amount)||0,cashier:t.cashier||"Admin",updated_at:new Date().toISOString()}),mn=t=>({id:String(t.id),name:t.name||"",phone:t.phone||"",address:t.address||"",category:t.category||"Rumah Tangga",total_orders:Number(t.totalOrders||t.total_orders)||0,total_spent:Number(t.totalSpent||t.total_spent)||0,total_debt:Number(t.totalDebt||t.total_debt)||0,credit_limit:Number(t.creditLimit||t.credit_limit)||0,galon_loaned:Number(t.galonLoaned||t.galon_loaned)||0,notes:t.notes||"",updated_at:new Date().toISOString()}),gn=t=>{const e=String(t.username||"").toLowerCase().trim();return{id:t.id?String(t.id):e?`usr_${e}`:Bt("usr"),store_id:ut(),username:e,name:String(t.name||""),role:String(t.role||"cashier"),pin_hash:String(t.pinHash||t.pin_hash||""),pin_salt:String(t.pinSalt||t.pin_salt||""),is_active:t.isActive!==void 0?!!t.isActive:t.is_active!==void 0?!!t.is_active:!0,updated_at:new Date().toISOString()}},jt=async()=>{var e;if(Z())return rt("offline","🔒 Mode Demo Terisolasi"),{success:!0,isolated:!0};if(!navigator.onLine)return rt("offline","⚡ Mode Offline"),{success:!1,offline:!0};ut();const t=nt();rt("syncing");try{try{const{data:a,error:s}=await t.from("products").select("*");if(!s&&a){const n=new Set(a.map(r=>String(r.id))),i=await E.products.toArray();for(const r of i)n.has(String(r.id))||await E.products.delete(r.id);for(const r of a){const d=String(r.id);await E.products.put({id:d,sku:`BM-${d.replace("prod_","")}`,name:r.name||"",category:r.category||"Umum",price:Number(r.price)||0,cost:0,unit:r.unit||"buah",emoji:r.emoji||"📦",image:null,stock:Number(r.stock)||0,deleted_at:null})}const o=await dt();p.setProducts(o),p.emit("products:change",o)}}catch{}try{const[a,{data:s,error:n}]=await Promise.all([mt(),t.from("transactions").select("*")]);if(!n&&s){const i=a.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("transactions").upsert(i.map(He));for(const d of i)d.syncStatus="synced",await E.transactions.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of a)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await E.transactions.delete(d.id);for(const d of s){const l=String(d.id);await E.transactions.put({id:l,invoiceNo:d.invoice_no,date:d.date,dateKey:d.date_key,customerName:d.customer_name,items:d.items||[],subtotal:Number(d.subtotal),discount:Number(d.discount),tax:Number(d.tax),total:Number(d.total),paid:Number(d.paid),change:Number(d.change),paymentMethod:d.payment_method,paymentStatus:d.payment_status,paidAmount:Number(d.paid_amount),remainingDebt:Number(d.remaining_debt),debtPayments:d.debt_payments||[],cashier:d.cashier,syncStatus:"synced",deleted_at:null})}const r=await mt();p.setTransactions(r),p.emit("transactions:change",r)}}catch{}try{const[a,{data:s,error:n}]=await Promise.all([ee(),t.from("expenses").select("*")]);if(!n&&s){const i=a.filter(d=>d.syncStatus==="staged_offline");if(i.length>0){await t.from("expenses").upsert(i.map(ya));for(const d of i)d.syncStatus="synced",await E.expenses.put(d)}const o=new Set(s.map(d=>String(d.id)));for(const d of a)d.syncStatus!=="staged_offline"&&!o.has(String(d.id))&&await E.expenses.delete(d.id);for(const d of s){const l=String(d.id);await E.expenses.put({id:l,date:d.date,dateKey:d.date_key,category:d.category,note:d.note,amount:Number(d.amount),cashier:d.cashier,deleted_at:null})}const r=await ee();p.setExpenses(r),p.emit("expenses:change",r)}}catch{}try{const[a,{data:s,error:n}]=await Promise.all([Y(),t.from("customers").select("*")]);if(!n&&s){const i=new Set(s.map(r=>String(r.id)));for(const r of a)i.has(String(r.id))||await E.customers.delete(r.id);for(const r of s){const d=String(r.id);await E.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const o=await Y();(e=p.setCustomers)==null||e.call(p,o),p.emit("customers:change",o)}}catch{}try{await oe()}catch{}try{const{data:a,error:s}=await t.from("settings").select("*"),n=await E.settings.toArray();if(!s&&a){if(a.length===0&&n.length>0)await t.from("settings").upsert(n.map(i=>({key:i.key,value:String(i.value??""),updated_at:new Date().toISOString()})));else if(a.length>0)for(const i of a)i.key.startsWith("users_roster_")||await E.settings.put({key:i.key,value:i.value??""})}}catch{}return rt("online","🟢 Cloud Realtime"),{success:!0}}catch(a){return rt("online","🟢 Cloud Aktif"),{success:!1,error:a}}finally{}},ha=()=>{if(Z())return;const t=nt(),e=ut();Ee&&t.removeChannel(Ee),Ee=t.channel(`store_realtime_${e}`).on("postgres_changes",{event:"*",schema:"public",table:"products"},async a=>{var n,i;if(a.eventType==="DELETE"){const o=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.products.delete(o)}else if(a.new){const o=a.new,r=String(o.id);await E.products.put({id:r,sku:`BM-${r.replace("prod_","")}`,name:o.name||"",category:o.category||"Umum",price:Number(o.price)||0,cost:0,unit:o.unit||"buah",emoji:o.emoji||"📦",image:null,stock:Number(o.stock)||0,deleted_at:null})}const s=await dt();p.setProducts(s),p.emit("products:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"transactions"},async a=>{var n,i;if(a.eventType==="DELETE"){const o=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.transactions.delete(o)}else if(a.new){const o=a.new,r=String(o.id);await E.transactions.put({id:r,invoiceNo:o.invoice_no,date:o.date,dateKey:o.date_key,customerName:o.customer_name,items:o.items||[],subtotal:Number(o.subtotal),discount:Number(o.discount),tax:Number(o.tax),total:Number(o.total),paid:Number(o.paid),change:Number(o.change),paymentMethod:o.payment_method,paymentStatus:o.payment_status,paidAmount:Number(o.paid_amount),remainingDebt:Number(o.remaining_debt),debtPayments:o.debt_payments||[],cashier:o.cashier,syncStatus:"synced",deleted_at:null})}const s=await mt();p.setTransactions(s),p.emit("transactions:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"expenses"},async a=>{var n,i;if(a.eventType==="DELETE"){const o=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.expenses.delete(o)}else if(a.new){const o=a.new,r=String(o.id);await E.expenses.put({id:r,date:o.date,dateKey:o.date_key,category:o.category,note:o.note,amount:Number(o.amount),cashier:o.cashier,deleted_at:null})}const s=await ee();p.setExpenses(s),p.emit("expenses:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"customers"},async a=>{var n,i,o;if(a.eventType==="DELETE"){const r=String(((n=a.old)==null?void 0:n.id)||((i=a.new)==null?void 0:i.id));await E.customers.delete(r)}else if(a.new){const r=a.new,d=String(r.id);await E.customers.put({id:d,name:r.name||"",phone:r.phone||"",address:r.address||"",category:r.category||"Rumah Tangga",totalOrders:Number(r.total_orders)||0,totalSpent:Number(r.total_spent)||0,totalDebt:Number(r.total_debt)||0,creditLimit:Number(r.credit_limit)||0,galonLoaned:Number(r.galon_loaned)||0,notes:r.notes||"",deleted_at:null})}const s=await Y();(o=p.setCustomers)==null||o.call(p,s),p.emit("customers:change",s)}).on("postgres_changes",{event:"*",schema:"public",table:"settings"},async a=>{var s;if(a.new&&a.new.key===`users_roster_${e}`)try{const n=JSON.parse(a.new.value);if(Array.isArray(n)&&n.length>0){const i=new Set(n.map(d=>String(d.username).toLowerCase().trim())),o=await E.users.toArray();for(const d of o)i.has(String(d.username).toLowerCase().trim())||await E.users.delete(d.id);for(const d of n){const l=String(d.username).toLowerCase().trim(),c=await E.users.where("username").equalsIgnoreCase(l).first(),g={id:d.id?String(d.id):c!=null&&c.id?String(c.id):`usr_${l}`,username:l,name:d.name,role:d.role,pinHash:d.pin_hash||d.pinHash,pinSalt:d.pin_salt||d.pinSalt,isActive:d.is_active!==void 0?!!d.is_active:d.isActive!==void 0?!!d.isActive:!0,createdAt:d.created_at||d.createdAt||new Date().toISOString(),updatedAt:d.updated_at||d.updatedAt||new Date().toISOString()};await E.users.put(g)}const r=await E.users.toArray();p.setUsers(r),p.emit("users:change",r)}}catch{}else if((s=a.new)!=null&&s.key)try{await E.settings.put({key:a.new.key,value:a.new.value??""}),p.updateSettings({[a.new.key]:a.new.value??""})}catch{}}).subscribe(a=>{a==="SUBSCRIBED"?rt("online","🟢 Cloud Realtime"):(a==="CLOSED"||a==="CHANNEL_ERROR")&&rt("offline","⚡ Mode Offline")}),window.addEventListener("online",()=>{jt()})},va=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("products").upsert(un(t))}catch{}},bn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("products").delete().eq("id",String(t))}catch{}},xa=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("customers").upsert(mn(t))}catch{}},fn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("customers").delete().eq("id",String(t))}catch{}},wa=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("transactions").upsert(He(t))}catch{}},yn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("transactions").delete().eq("id",String(t))}catch{}},hn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("expenses").upsert(ya(t))}catch{}},vn=async t=>{if(!(Z()||!navigator.onLine))try{await nt().from("expenses").delete().eq("id",String(t))}catch{}},ka=async(t,e)=>{if(!(Z()||!navigator.onLine))try{await nt().from("settings").upsert({key:String(t),value:typeof e=="object"?JSON.stringify(e):String(e??""),updated_at:new Date().toISOString()})}catch{}},Sa=async()=>{if(Z()||!navigator.onLine)return null;const t=ut(),e=nt(),a=`users_roster_${t}`;try{const s=new AbortController,n=setTimeout(()=>s.abort(),2500),{data:i,error:o}=await e.from("settings").select("value").eq("key",a).abortSignal(s.signal).maybeSingle();if(clearTimeout(n),!o&&(i!=null&&i.value)){const r=JSON.parse(i.value);if(Array.isArray(r)&&r.length>0)return r}}catch{}return null},oe=async()=>{const t=await Sa();if(!t||t.length===0)return[];const e=new Set(t.map(n=>String(n.username).toLowerCase().trim())),a=await E.users.toArray();for(const n of a)e.has(String(n.username).toLowerCase().trim())||await E.users.delete(n.id);for(const n of t){const i=String(n.username).toLowerCase().trim(),o=await E.users.where("username").equalsIgnoreCase(i).first(),d={id:n.id?String(n.id):o!=null&&o.id?String(o.id):`usr_${i}`,username:i,name:n.name,role:n.role,pinHash:n.pin_hash||n.pinHash,pinSalt:n.pin_salt||n.pinSalt,isActive:n.is_active!==void 0?!!n.is_active:n.isActive!==void 0?!!n.isActive:!0,createdAt:n.created_at||n.createdAt||new Date().toISOString(),updatedAt:n.updated_at||n.updatedAt||new Date().toISOString()};await E.users.put(d)}const s=await E.users.toArray();return p.setUsers(s),p.emit("users:change",s),s},qe=async(t,e)=>{const a=ut(),s=fa(),n=String(t).toLowerCase().trim();if(navigator.onLine&&!Z())try{const i=await Sa();if(i&&i.length>0){const o=i.find(g=>String(g.username).toLowerCase().trim()===n||String(g.id)===n);if(!o)return{success:!1,error:"Akun operator tidak terdaftar di server master."};if(o.isActive===!1||o.is_active===!1)return{success:!1,error:"Akun operator ini telah dinonaktifkan oleh Owner."};const r=o.pin_salt||o.pinSalt,d=o.pin_hash||o.pinHash;if(!await ea(e,r,d))return{success:!1,error:"PIN salah! Silakan periksa kembali."};oe().catch(()=>{});const c={sub:o.id||o.username,username:o.username,name:o.name,role:o.role,storeId:a},m=await aa(c,s,86400*7);try{localStorage.setItem(be,m)}catch{}return{success:!0,user:{id:o.id||o.username,username:o.username,name:o.name,role:o.role},token:m,isServerValidated:!0}}}catch{}try{const o=(await E.users.toArray()).find(c=>String(c.username).toLowerCase().trim()===n||String(c.id)===n);if(!o)return{success:!1,error:"Perangkat offline dan akun belum tersimpan di cache lokal."};if(o.isActive===!1)return{success:!1,error:"Akun operator tidak aktif."};if(!await ea(e,o.pinSalt,o.pinHash))return{success:!1,error:"PIN salah! Silakan periksa kembali."};const d={sub:o.id||o.username,username:o.username,name:o.name,role:o.role,storeId:a,offline:!0},l=await aa(d,s,86400*2);try{localStorage.setItem(be,l)}catch{}return{success:!0,user:{id:o.id,username:o.username,name:o.name,role:o.role},token:l,isServerValidated:!1,isOfflineFallback:!0}}catch(i){return{success:!1,error:`Gagal memvalidasi kredensial: ${i.message}`}}},xn=async()=>{let t=null;try{t=localStorage.getItem(be)}catch{}if(!t)return null;const e=fa(),a=await an(t,e);if(!(a!=null&&a.username)){try{localStorage.removeItem(be)}catch{}return null}return{id:a.sub||a.username,username:a.username,name:a.name,role:a.role}},Ea=async t=>{if(Z()||!navigator.onLine)return;const e=ut(),a=nt();try{const s=`users_roster_${e}`,{data:n,error:i}=await a.from("settings").select("value").eq("key",s).maybeSingle();let o=[];if(!i&&(n!=null&&n.value))try{const c=JSON.parse(n.value);Array.isArray(c)&&(o=c)}catch{}const r=String(t.username).toLowerCase().trim(),d=gn(t),l=o.findIndex(c=>String(c.username).toLowerCase().trim()===r);l>=0?o[l]={...o[l],...d}:o.push(d),await a.from("settings").upsert({key:s,value:JSON.stringify(o),updated_at:new Date().toISOString()})}catch{}},wn=async t=>{if(Z()||!navigator.onLine)return;const e=ut(),a=nt(),s=String(t).toLowerCase().trim();try{const n=`users_roster_${e}`,{data:i,error:o}=await a.from("settings").select("value").eq("key",n).maybeSingle();if(!o&&(i!=null&&i.value)){let r=JSON.parse(i.value);Array.isArray(r)&&(r=r.filter(d=>String(d.username).toLowerCase().trim()!==s),await a.from("settings").upsert({key:n,value:JSON.stringify(r),updated_at:new Date().toISOString()}))}}catch{}},kn=async(t,e)=>{var a;if(navigator.onLine&&!Z()){try{const s=new AbortController,n=setTimeout(()=>s.abort(),3500),i=await fetch("/api/stock/decrement",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:t,transaction:e}),signal:s.signal});if(clearTimeout(n),i.ok&&(await i.json()).success)return{success:!0,via:"cloudflare-edge"}}catch{}try{const s=nt();for(const n of t||[]){const i=((a=n.product)==null?void 0:a.id)||n.id,o=Number(n.qty)||1;if(i){const{data:r}=await s.from("products").select("id, stock").eq("id",String(i)).limit(1);if(r&&r.length>0){const d=Number(r[0].stock)||0,l=Math.max(0,d-o);await s.from("products").update({stock:l,updated_at:new Date().toISOString()}).eq("id",String(i))}}}return{success:!0,via:"supabase-direct"}}catch{}}return{success:!0,via:"offline-staged"}},E=new Xa("BlueMountainPOS");E.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});E.version(3).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category"});E.version(4).stores({products:"++id, category, sku",customers:"++id, name, phone, category, totalDebt",transactions:"++id, dateKey, paymentStatus, paymentMethod, customerName",settings:"key",expenses:"++id, dateKey, category",users:"++id, username, role, isActive"});E.version(5).stores({products:"id, category, sku, deleted_at",customers:"id, name, phone, category, totalDebt, deleted_at",transactions:"id, invoiceNo, dateKey, paymentStatus, paymentMethod, customerName, syncStatus, deleted_at",settings:"key",expenses:"id, dateKey, category, deleted_at",users:"id, username, role, isActive"});const Tt=()=>E.users.toArray(),Sn=t=>E.users.get(t),En=async t=>{const e={...t,id:t.id?String(t.id):Bt("usr")};return await E.users.put(e),Ea(e).catch(()=>{}),e.id},$n=async t=>{const e={...t,id:t.id?String(t.id):t.username?`usr_${String(t.username).toLowerCase().trim()}`:Bt("usr")},a=await E.users.put(e);return Ea(e).catch(()=>{}),a},Tn=async t=>{const e=await E.users.get(t),a=await E.users.delete(t);return e!=null&&e.username&&wn(e.username).catch(()=>{}),a},Y=async()=>(await E.customers.toArray()).filter(e=>!e.deleted_at),$a=async t=>{const e={...t,id:t.id?String(t.id):Bt("cust"),deleted_at:null,updated_at:new Date().toISOString()};return await E.customers.put(e),xa(e).catch(()=>{}),e.id},Ft=async t=>{const e={...t,updated_at:new Date().toISOString()},a=await E.customers.put(e);return xa(e).catch(()=>{}),a},In=async t=>{const e=await E.customers.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.customers.put(a),fn(t).catch(()=>{})}return t},dt=async()=>(await E.products.toArray()).filter(e=>!e.deleted_at),Ta=async t=>{const e={...t,id:t.id?String(t.id):Bt("prod"),deleted_at:null,updated_at:new Date().toISOString()};return await E.products.put(e),va(e).catch(()=>{}),e.id},Ia=async t=>{const e={...t,updated_at:new Date().toISOString()},a=await E.products.put(e);return va(e).catch(()=>{}),a},_n=async t=>{const e=await E.products.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.products.put(a),bn(t).catch(()=>{})}return t},Ln=async t=>{const e=typeof fe=="function"?fe():navigator.onLine,a={...t,id:t.id?String(t.id):Bt("tx"),syncStatus:e?"synced":"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};if(await E.transactions.put(a),e)wa(a).catch(()=>{});else try{Lt==null||Lt()}catch{}return a.id},mt=async()=>(await E.transactions.toArray()).filter(e=>!e.deleted_at),Pn=async t=>{const e=await E.transactions.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.transactions.put(a),yn(t).catch(()=>{})}return t},te=async t=>{const e={...t,updated_at:new Date().toISOString()},a=await E.transactions.put(e);return wa(e).catch(()=>{}),a},Bn=async t=>{const e=typeof fe=="function"?fe():navigator.onLine,a={...t,id:t.id?String(t.id):Bt("exp"),syncStatus:e?"synced":"staged_offline",deleted_at:null,updated_at:new Date().toISOString()};return await E.expenses.put(a),e&&hn(a).catch(()=>{}),a.id},ee=async()=>(await E.expenses.toArray()).filter(e=>!e.deleted_at),An=async t=>{const e=await E.expenses.get(t);if(e){const a={...e,deleted_at:new Date().toISOString(),updated_at:new Date().toISOString()};await E.expenses.put(a),vn(t).catch(()=>{})}return t},Fe=async t=>{const e=await E.settings.get(t);return(e==null?void 0:e.value)??null},_a=async(t,e)=>{await E.settings.put({key:t,value:e}),ka(t,e).catch(()=>{})},Ge=async()=>{await E.users.count()>0||await E.users.put({id:"usr_admin",username:"admin",name:"Fadhilah Ramadhan",role:"owner",pinHash:"c3b558e7f7bd99bf1a0e50aa083c1ba8811e840dab3bf07bc020c724ce771e83",pinSalt:"9bc6c2b0806a1040516484af5df10112",isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})},Cn=async()=>{await Promise.all([E.products.clear(),E.customers.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear(),E.users.clear()]),sessionStorage.clear(),localStorage.clear()},Nn=async()=>{const[t,e,a,s,n,i]=await Promise.all([E.products.toArray(),E.customers.toArray(),E.transactions.toArray(),E.expenses.toArray(),E.settings.toArray(),E.users.toArray()]),o=n.find(d=>d.key==="shopName"),r=(o==null?void 0:o.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"1.6.0",exportedAt:new Date().toISOString(),shopName:r,data:{products:t,customers:e,transactions:a,expenses:s,settings:n,users:i},meta:{productCount:t.length,customerCount:e.length,transactionCount:a.length,expenseCount:s.length,settingCount:n.length,userCount:i.length}}},Mn=async(t,e="replace")=>{if(!(t!=null&&t.data))throw new Error("Format file backup tidak valid atau rusak.");const{products:a=[],customers:s=[],transactions:n=[],expenses:i=[],settings:o=[],users:r=[]}=t.data;return e==="replace"?(await Promise.all([E.products.clear(),E.customers.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear(),E.users.clear()]),a.length&&await E.products.bulkAdd(a),s.length&&await E.customers.bulkAdd(s),n.length&&await E.transactions.bulkAdd(n),i.length&&await E.expenses.bulkAdd(i),o.length&&await E.settings.bulkPut(o),r.length&&await E.users.bulkAdd(r)):e==="merge"&&(a.length&&await E.products.bulkPut(a),s.length&&await E.customers.bulkPut(s),n.length&&await E.transactions.bulkPut(n),i.length&&await E.expenses.bulkPut(i),o.length&&await E.settings.bulkPut(o),r.length&&await E.users.bulkPut(r)),{products:a.length,customers:s.length,transactions:n.length,expenses:i.length,settings:o.length,users:r.length}},zn=()=>E.open(),x=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),b=t=>{const e=Number(t);if(Number.isNaN(e))return"Rp 0";const a=Math.round(Math.abs(e)).toLocaleString("id-ID");return(e<0?"-Rp ":"Rp ")+a},La="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHbElEQVR4nO2cS24rOwxEs/9Nv4cLJIAttCSS4qeorgN4kLglFcnTtuNBfv4jpJCf6gDk3VBAUgoFJKVQQFIKBSSlUEBSCgU84OeH7TuFHTTyT76/B7HD7hn5FJAS2mHnDIzyUUI77JqSmXwU0Aa7pmQlICXUw44p2MlHCfWwW0Kk8lFCHeyUAK18lFAOuySAAsbBLm2wykcJZbBDC07lo4R72J0FXgJSwjnszARP+SjgHHbmAW/5KOEcdmUgSj5K+Aw7MhAtICX8ht34IEM+CvgNu/FLlnyU8Bt24pdsAXcSvkXU+ysUUCHfSrA3vVreXZ2ASvme5HrbW/a9lQnwkMdTwpO37K7cWZWQLHEi3667c2VVkmFlvnJRwjnXVSQZlrcMmQLeJuFV1UiH5S1BtoA3SXhNJdmyaM6nhHOuqEI6rMjhU0Ab7auoGDyKgDdI2L4CpKFTQj2t06MNvCpPZwnbJkcdNCXU0TI18pCRsyHSLnWHAXfIiEKrxF0GW5mzm4Rt0nYbare8VbRJijJM6XCrBewiYYuUSEPUDLZawA4SwidEGqBloEj5EYFOiDS8k4Ei1YEGbDqkoZ0OsroWZAkhk1UP63NgXkOsrgdVQrhU1UMaB+U5vOq6ECWES4Q0IO/BVddGATdUD+cn4K0XuUYEYNJUD2UcTOTAqutEkhAiSfUwxqFED6q6TiQJy1NUD+FpGBlDqq6XAoIMYRxG1qCq60WRsCxBdeM1AkYMqrpeFAkpYOE/B6quG0HCkpOrm20V0HtQ1XUjSJh+anWTKSCWhKknVjd31/DIQVmFp4BeBwE011NA7cC6CJgtYcpp1Q2VNHv8nffwOgmYKSEFfMh5klnSgw59yZIw/JTqJlJAbAnrvwoHYmx8tICEAn4RJSDlm8OOfBD5tk4Bn2FHBjxeBSs/U3WDHRl4EobyxXFdVzwGPROHAvpzRVc0Q5aKoPlcR/nstO6MZsgWEVYiUT4f2nZHOuRTGZDfdm8QvGV6zaA9hMiUT/txggIWcCLgycCiX/EsHym6S9guuWX46J/PtLmQa9HSMrVVqOrPbKf5T9ci0jL1qUgVn+dO90e4cSJom9xbHIuUJw/PXJ3pnT7h+7gMybJrQqJ/Bb9kCuJN5+yn3FPJB5lvkZ0zIXBnVR9EfYbLetzO/RUOVAv1duFG3lfxBgqWCztCSqGApBQKSEqhgKQUCkhKoYCkFEgBo7/m8PyK5HQvydqbvwKCTBXdbBQBpWspYDLRDaeAOECm8mr4rOkUEAfIVJ4CagbqmdVzLQVMxtLANwp4A5BVdBooBTwDsopOA6WAZ0BW0WmgFPAMyCpmDbc8NPt7ZvVcG9EDFCDTRcq32t8zq+daCpgMBfTtBzKQ6bwEnDWfAuIAmc5TQM1APbN6rqWAyXgPdFx/i4A3AFnFSbMpYC8gq4geqvdArftRQAoYKuBqT80aCpiMpeGrgUoF1Dy0+1lyeuZFFRYylVfDswT0zBzZD0QgU0XK57V/RO7ofiACmSpSPq/9vbNn9AMRyFTRzUbaP6sfFPCldBGhCnaDlEIBSSkUkJRCAUkpsALyQ/s7mE7X46837fqor0BOrrf0YXZ91Nco3l/xeNe/zO6xicf6yGGc5PS4Caw1ogp42tOva7OKmq31HkiWgBohPGq1CCiZV0b9sAKeDkS6pzarNKN0T696Nb2+VkDLQLUCave2Fi+53kOKHRZxpPkQ6ncX0CKJtLAdaAJKbqzTmjTrEOtPE1Czxtr03dqKAUTfBNp1KgGK6zcLKDX/LQJGZojsQXX9bgJG3iWaplHA5+dR6z8S8G9j6e81ha+oFnDVn4gMkjXWPavrVwm4Olgig6VB2qZlCSjtRYSAVrkQ66eABwPQ9sOaQXK9VYSM+l0F3B262kMSfMdpwyL2yxTwRL4IAaWZpvVYm3IqoLQ47Znafd8moLa+VgLu9tAEt1y3u157jbTOXUbLjWU5o0rAk/rNAo7XSPawBDcX5rSf15krToa8Y5fHS0Br/UcCfl4n2cMS3DpUy74nfdidqV0juU5KloCW+o8F1ISxBLfKp91Xs95y5un13j2Q7htd/3K3E/megljXnWTw2PN0jcf+kS8GEWeLbz5FDYS4QwFJKRSQlEIBSSmhAlr+wtr9hfb3/NO1qxyrfLOfZ78bs2n7sKpNcr6kb5IM4/OzNZGkCygVbPf8bJirDLPnVtdaBNhdu9pjl2e31tLnXZ2RpAg4/jx7Fdutl+w9u85LQOkrzu5sTT5p/qf9pGJLbz5vUgUcf2e5K2fPeQv4dJNIhJqdrZV015tZzdKbXDKHawTcFThrtOS52c9Pe8yes+Rd7bPrgSSf9VytgJJHJDCfAaXrx+dmP0vOWO3hJeCsllU+qQweAkprj6KFgJLnvAWcrZXcDOMZ1v2k/VvVa6nhOgHHn2eFagerGdrqFW113m7IEsElr2Kam0mazZJjtU8EcH+EjE2Q7i0R2SLgLIf0VUJy3VOPNDV75JUIH0Hs7oRsoICkFApISqGApBQKSEqhgKSU/wFlggp6xOLiGQAAAABJRU5ErkJggg==",Dn=new Uint8Array([27,97,1,29,118,48,0,20,0,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,255,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,255,255,254,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,255,255,255,7,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,15,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,255,255,159,224,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,254,127,255,255,224,0,0,0,0,0,0,0,0,0,0,0,0,4,3,255,254,127,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,14,7,255,254,127,255,255,248,0,0,0,0,0,0,0,0,0,0,0,0,31,7,255,252,127,255,255,252,0,0,0,0,0,0,0,0,0,0,0,0,63,143,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,127,223,255,252,63,255,255,254,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,252,63,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,248,31,255,255,255,128,0,0,0,0,0,0,0,0,0,0,1,255,255,255,248,31,255,255,255,192,0,0,0,0,0,0,0,0,0,0,3,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,7,255,255,255,240,15,255,255,255,224,0,0,0,0,0,0,0,0,0,0,15,255,255,255,224,7,255,255,255,240,0,0,0,0,0,0,0,0,0,0,31,255,255,255,192,7,255,255,255,248,0,0,0,0,0,0,0,0,0,0,63,255,255,255,192,3,255,255,255,252,0,0,0,0,0,0,0,0,0,0,63,255,255,255,136,3,255,255,255,254,0,0,0,0,0,0,0,0,0,0,127,255,255,255,8,1,255,255,255,255,0,0,0,0,0,0,0,0,0,0,255,255,255,255,16,0,255,255,255,255,0,0,0,0,0,0,0,0,0,1,255,255,255,254,48,0,127,255,255,255,128,0,0,0,0,0,0,0,0,3,255,255,255,252,96,0,127,255,255,255,192,0,0,0,0,0,0,0,0,7,255,255,255,252,224,0,63,255,255,255,224,0,0,0,0,0,0,0,0,15,255,255,255,248,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,15,255,255,255,241,192,0,31,255,255,255,240,0,0,0,0,0,0,0,0,31,255,255,255,243,128,0,15,255,255,255,248,0,0,0,0,0,0,0,0,63,255,255,255,227,128,0,7,255,255,255,252,0,0,0,0,0,0,0,0,127,255,255,255,231,0,0,7,255,255,255,254,0,0,0,0,0,0,0,0,255,255,255,255,199,0,0,3,255,255,255,254,0,0,0,0,0,0,0,1,255,255,255,255,207,128,0,3,255,255,255,255,0,0,0,0,0,0,0,3,255,255,255,255,207,192,0,3,255,255,255,255,128,0,0,0,0,0,0,3,255,255,255,255,159,224,0,1,255,255,255,255,192,0,0,0,0,0,0,7,255,255,255,255,159,240,0,1,255,255,255,255,224,0,0,0,0,0,0,15,255,255,255,255,159,240,0,1,255,255,255,255,240,0,0,0,0,0,0,31,255,255,255,255,31,252,0,57,255,255,255,255,240,0,0,0,0,0,0,63,255,255,255,255,31,255,0,57,255,255,255,255,248,0,0,0,0,0,0,127,255,255,255,255,59,255,240,57,255,255,255,255,252,0,0,0,0,0,0,127,255,255,255,255,27,255,240,57,255,255,255,255,254,0,0,0,0,0,0,255,255,255,255,255,27,255,240,57,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,29,255,240,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,255,240,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,255,248,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,7,159,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,8,3,199,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,1,224,48,1,243,255,128,0,0,0,0,0,0,0,0,0,0,0,0,0,3,192,240,0,255,255,0,0,1,128,0,0,0,0,0,0,0,0,0,0,7,192,240,0,127,254,0,14,1,128,0,0,0,0,0,0,0,0,0,0,7,192,248,0,31,240,0,30,3,192,0,0,0,0,0,0,0,0,0,0,15,224,127,0,0,0,0,124,7,224,0,0,0,0,0,0,0,0,0,0,7,240,31,240,0,0,7,240,15,224,0,0,0,0,0,0,0,0,0,0,7,252,7,255,192,1,255,192,63,192,0,0,0,0,0,0,0,0,0,0,3,255,0,63,255,255,252,0,255,128,0,0,0,0,0,0,0,0,0,0,0,255,224,0,255,254,0,7,255,0,0,0,0,0,0,0,0,0,0,0,0,63,254,0,0,0,0,127,252,0,0,0,0,0,0,0,0,0,0,0,0,7,255,252,0,0,63,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,255,255,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,255,240,7,224,0,252,0,248,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,224,0,0,0,0,0,0,0,0,7,224,63,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,31,135,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,254,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,7,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,255,255,135,224,0,252,1,248,127,255,128,0,0,0,0,0,0,0,0,7,192,31,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,192,15,199,224,0,252,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,126,1,248,126,0,0,0,0,0,0,0,0,0,0,7,224,15,199,224,0,127,3,248,126,0,0,0,0,0,0,0,0,0,0,7,224,63,199,255,252,127,207,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,199,255,252,63,255,240,127,255,224,0,0,0,0,0,0,0,0,7,255,255,135,255,252,31,255,224,127,255,224,0,0,0,0,0,0,0,0,7,255,255,7,255,252,15,255,192,127,255,224,0,0,0,0,0,0,0,0,7,255,252,7,255,252,7,255,0,127,255,224,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,224,1,224,31,248,15,128,248,248,7,159,255,224,126,0,248,248,7,192,3,224,3,224,63,252,15,128,248,252,7,159,255,224,126,0,248,252,7,192,3,240,7,224,255,254,15,128,248,254,7,159,255,224,127,0,248,254,7,192,3,240,7,225,255,255,15,128,248,254,7,159,255,224,255,0,248,254,7,192,3,248,15,225,248,31,143,128,248,255,7,128,124,0,255,128,248,255,7,192,3,252,15,227,240,15,143,128,248,255,135,128,124,1,255,128,248,255,135,192,3,252,31,227,224,7,207,128,248,255,199,192,124,1,247,192,248,255,199,192,3,254,31,227,224,7,207,128,248,255,231,192,124,3,231,192,248,255,231,192,3,254,63,227,224,7,207,128,248,255,231,192,124,3,227,192,248,255,231,192,3,255,125,227,224,7,207,128,248,251,247,192,124,3,195,224,248,251,247,192,3,239,249,227,224,7,207,128,248,249,255,192,124,7,193,224,248,249,255,192,3,239,249,227,224,7,207,128,248,248,255,128,124,7,255,240,248,248,255,192,3,231,241,227,240,15,143,128,248,248,127,128,124,15,255,240,248,248,127,192,3,227,241,225,240,31,135,192,248,248,127,128,124,15,255,248,248,248,127,192,3,227,225,225,252,127,7,227,240,248,63,192,124,31,255,248,248,248,63,192,3,225,193,224,255,255,3,255,240,248,31,192,124,31,0,252,248,248,31,192,3,224,193,224,127,254,1,255,224,248,15,192,124,30,0,124,248,248,15,192,3,224,1,224,63,252,0,255,192,248,7,192,124,62,0,124,248,248,7,192,1,192,1,224,7,224,0,63,0,120,3,128,120,60,0,60,112,120,3,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,241,249,251,32,65,152,195,128,123,248,199,228,60,33,128,0,0,0,0,1,249,249,251,112,225,156,199,224,251,249,199,254,126,49,128,0,0,0,0,1,157,129,131,48,225,156,206,65,192,225,225,142,231,57,128,0,0,0,0,1,141,241,131,48,225,158,220,1,224,227,225,142,195,125,128,0,0,0,0,1,253,249,243,48,225,159,220,96,248,227,113,142,195,255,128,0,0,0,0,1,249,193,243,48,225,155,220,96,60,231,241,142,195,55,128,0,0,0,0,1,249,193,131,48,225,153,206,96,156,231,249,142,231,55,128,0,0,0,0,1,157,249,131,63,253,152,199,225,248,230,25,142,126,51,128,0,0,0,0,1,141,249,3,62,125,152,67,192,240,68,25,132,60,33,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),he=(t,e={})=>{const a=t.items||[],s=[],n=(d,l=0,c=1,m=0)=>s.push({type:0,content:d,bold:l,align:c,format:m}),i=()=>n("--------------------------------",0,1,0),o=()=>n(" ",0,0,0);s.push({type:1,content:La,align:1,width:160,height:160});const r=e.shopName||"Blue Mountain Refilling Station";if(r.toLowerCase().includes("blue mountain")&&r.toLowerCase().includes("refilling station"))n("BLUE MOUNTAIN",1,1,2),n("REFILLING STATION",1,1,1);else for(const d of lines)n(d.trim().toUpperCase(),1,1,2);o(),e.shopAddress&&n(e.shopAddress,0,1,4),e.shopPhone&&n(`Telp: ${e.shopPhone}`,0,1,4),i(),n(`No   : ${t.invoiceNo||"-"}`,0,0,0),n(`Tgl  : ${vt(new Date(t.date))}`,0,0,0),t.customerName&&n(`Cust : ${t.customerName}`,0,0,0),t.cashier&&n(`Kasir: ${t.cashier}`,0,0,0),i();for(const d of a){if(!(d!=null&&d.product))continue;const l=d.product.name,c=d.qty,m=b(d.product.price),g=b(d.product.price*c);n(`${l}`,1,0,0),n(`  ${c} x ${m} = ${g}`,0,0,0)}return i(),t.discount>0&&(n(`Subtotal: ${b(t.subtotal)}`,0,0,0),n(`Diskon:  -${b(t.discount)}`,0,0,0)),t.tax>0&&n(`Pajak:    ${b(t.tax)}`,0,0,0),n(`TOTAL: ${b(t.total)}`,1,0,3),t.paymentMethod==="cash"?(n(`Bayar:   ${b(t.paid)}`,0,0,0),n(`Kembali: ${b(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(n(`Transfer: ${b(t.total)}`,0,0,0),n(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(n(`DP Dibayar: ${b(t.paidAmount||0)}`,0,0,0),n(`Sisa Hutang: ${b(t.remainingDebt||0)}`,1,0,0)),i(),o(),n(e.receiptFooter||"Terima kasih sudah berbelanja!",1,1,0),n("BLUE MOUNTAIN REFILLING STATION",1,1,0),o(),o(),s},Kt={"48mm":{width:"48mm",widthPx:"185px",colWidth:30,fontSize:"10px",logoWidth:"55px"},"58mm":{width:"58mm",widthPx:"220px",colWidth:32,fontSize:"11px",logoWidth:"70px"},"80mm":{width:"80mm",widthPx:"300px",colWidth:48,fontSize:"12px",logoWidth:"85px"}},We=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},Pa=t=>{const e=he(t,p.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),We()},Ba=t=>(Pa(t),`my.bluetoothprint.scheme://${(p.state.settings||{}).printerUrl||We()}`),Je=t=>(Pa(t),We(),`rawbt:data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(he(t,p.state.settings)))))}`),Aa=t=>{const e=p.state.settings||{};let a=`*STRUK PEMBELIAN — ${e.shopName||"BLUE MOUNTAIN"}*
`;a+=`--------------------------------
`,a+=`No. Invoice : ${t.invoiceNo||"-"}
`,a+=`Tanggal     : ${vt(new Date(t.date||Date.now()))}
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
`),a},na=(t,e="")=>{const a=(e||t.customerPhone||"").replace(/\D/g,""),s=a.startsWith("08")?`62${a.slice(1)}`:a.startsWith("8")?`62${a}`:a,n=Aa(t),i=encodeURIComponent(n);return s?`https://wa.me/${s}?text=${i}`:`https://wa.me/?text=${i}`},ve=(t,e=null)=>{const a=p.state.settings||{},s=e||a.printerPaper||"58mm",n=Kt[s]||Kt["58mm"],i=t.items||[],o=()=>'<div style="border-top:1px dashed #333;margin:4px 0"></div>';let r=`<div class="thermal-receipt" style="width:${n.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:2px 4px">`;r+=`<div style="text-align:center;margin:0 auto 2px auto;line-height:1">
    <img src="${La}"
         class="thermal-logo"
         alt="Blue Mountain"
         width="65"
         height="65"
         style="width:${n.logoWidth};height:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  </div>`;const d=a.shopName||"Blue Mountain Refilling Station";r+='<div style="text-align:center;margin-bottom:6px">',d.toLowerCase().includes("blue mountain")&&d.toLowerCase().includes("refilling station")?(r+=`<div style="font-weight:900;font-size:${s==="80mm"?"15px":"13px"};line-height:1.2;letter-spacing:0.5px">BLUE MOUNTAIN</div>`,r+=`<div style="font-weight:800;font-size:${s==="80mm"?"12px":"11px"};line-height:1.2;letter-spacing:0.3px">REFILLING STATION</div>`):d.toUpperCase().split(`
`).forEach(c=>{r+=`<div style="font-weight:900;font-size:${s==="80mm"?"14px":"12px"};line-height:1.2">${c.trim()}</div>`}),r+="</div>",a.shopAddress&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35;word-break:normal;overflow-wrap:break-word;margin-bottom:2px">${a.shopAddress}</div>`),a.shopPhone&&(r+=`<div style="text-align:center;font-size:10px;line-height:1.35">Telp: ${a.shopPhone}</div>`),r+=o(),r+='<div style="font-size:10px;line-height:1.4">',r+=`<div>No&nbsp;&nbsp;&nbsp;: <b>${t.invoiceNo||"-"}</b></div>`,r+=`<div>Tgl&nbsp;&nbsp;: ${vt(new Date(t.date||Date.now()))}</div>`,t.customerName&&(r+=`<div>Cust&nbsp;: ${t.customerName}</div>`),t.cashier&&(r+=`<div>Kasir: ${t.cashier}</div>`),r+="</div>",r+=o();for(const l of i){if(!(l!=null&&l.product))continue;const c=l.product.name,m=l.qty,g=l.product.price,y=g*m;r+=`<div style="font-weight:700;font-size:${n.fontSize};line-height:1.3">${c}</div>`,r+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3;margin-bottom:3px">
      <span>&nbsp;&nbsp;${m} x ${b(g)}</span>
      <span style="font-weight:600">${b(y)}</span>
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
  </div>`,r+='<div style="height:4px"></div>',r+="</div>",r},ae=(t,e=null)=>{const a=p.state.settings||{},s=e||a.printerPaper||"58mm",n=Kt[s]||Kt["58mm"],i=ve(t,s),o=document.createElement("iframe");o.style.position="fixed",o.style.top="-9999px",o.style.left="-9999px",o.style.width="400px",o.style.height="800px",o.style.border="none",o.style.opacity="0",o.style.pointerEvents="none",document.body.appendChild(o);const r=o.contentWindow.document;r.open(),r.write(`<!DOCTYPE html>
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
</html>`),r.close();const d=()=>{try{o.contentWindow.focus(),o.contentWindow.print()}catch{const m=window.open("","_blank","width=350,height=600");m&&(m.document.write(r.documentElement.outerHTML),m.document.close(),m.focus(),setTimeout(()=>{m.print(),setTimeout(()=>m.close(),1e3)},300))}finally{setTimeout(()=>o.remove(),3e3)}},l=r.querySelector("img");l&&!l.complete?(l.onload=()=>setTimeout(d,120),l.onerror=()=>setTimeout(d,120),setTimeout(d,800)):setTimeout(d,200)},Ca=(t,e=null)=>{const a=new TextEncoder,s=p.state.settings||{},n=e||s.printerPaper||"58mm",o=(Kt[n]||Kt["58mm"]).colWidth,r=(T,L,f=o)=>{const h=Math.max(1,f-T.length-L.length);return T+" ".repeat(h)+L},d=(T,L=o)=>{if(!T)return[];const f=T.split(" "),h=[];let u="";for(const S of f)u?`${u} ${S}`.length<=L?u+=` ${S}`:(h.push(u),u=S):u=S;return u&&h.push(u),h},l=[],c=T=>l.push(...T),m=T=>{for(const L of T)l.push(L)},g=T=>{const L=a.encode(`${T}
`);for(const f of L)l.push(f)};c([27,64]),m(Dn),c([27,97,1]);const y=s.shopName||"Blue Mountain Refilling Station";if(y.toLowerCase().includes("blue mountain")&&y.toLowerCase().includes("refilling station"))c([27,69,1]),c([27,33,16]),g("BLUE MOUNTAIN"),c([27,33,0]),c([27,69,1]),g("REFILLING STATION"),c([27,69,0]);else{c([27,69,1]),c([27,33,16]);const T=y.toUpperCase().split(`
`);for(const L of T)g(L.trim());c([27,33,0]),c([27,69,0])}if(c([27,74,14]),s.shopAddress){const T=d(s.shopAddress,o);for(const L of T)g(L)}s.shopPhone&&g(`Telp: ${s.shopPhone}`),c([27,97,0]),g("-".repeat(o)),g(`No   : ${t.invoiceNo||"-"}`),g(`Tgl  : ${vt(new Date(t.date||Date.now()))}`),t.customerName&&g(`Cust : ${t.customerName}`),t.cashier&&g(`Kasir: ${t.cashier}`),g("-".repeat(o));for(const T of t.items||[])T!=null&&T.product&&(c([27,69,1]),g(T.product.name),c([27,69,0]),g(r(`  ${T.qty} x ${b(T.product.price)}`,b(T.product.price*T.qty))));return g("-".repeat(o)),t.discount>0&&(g(r("Subtotal",b(t.subtotal||t.total+t.discount))),g(r("Diskon",`-${b(t.discount)}`))),t.tax>0&&g(r("Pajak",b(t.tax))),c([27,69,1]),c([27,33,16]),g(r("TOTAL",b(t.total))),c([27,33,0]),c([27,69,0]),t.paymentMethod==="cash"?(g(r("Bayar Tunai",b(t.paid||t.total))),c([27,69,1]),g(r("Kembali",b(t.change||0))),c([27,69,0])):t.paymentMethod==="transfer"?(g(r("Transfer Bank",b(t.total))),g(r("Status",t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU"))):t.paymentMethod==="debt"&&(g(r("DP Dibayar",b(t.paidAmount||0))),c([27,69,1]),g(r("Sisa Hutang",b(t.remainingDebt||0))),c([27,69,0])),g("-".repeat(o)),c([27,97,1]),c([27,69,1]),g("Terima kasih sudah berbelanja!"),g("BLUE MOUNTAIN REFILLING STATION"),c([27,69,0]),c([10,10,10,29,86,66,0]),new Uint8Array(l)},Na=async t=>{const{default:e}=await ge(async()=>{const{default:s}=await import("./vendor-canvas-C3fx88d4.js");return{default:s}},[],import.meta.url),a=document.createElement("div");a.style.position="fixed",a.style.left="-9999px",a.style.top="0",a.style.width="240px",a.style.maxHeight="none",a.style.overflow="visible",a.style.background="#ffffff",a.style.padding="10px 8px",a.style.boxSizing="border-box",a.style.zIndex="-9999",a.innerHTML=ve(t,"58mm"),document.body.appendChild(a);try{const s=await e(a,{backgroundColor:"#ffffff",scale:3,useCORS:!0,logging:!1,windowWidth:320});return await new Promise((n,i)=>{s.toBlob(o=>{o?n(o):i(new Error("Gagal membuat blob gambar"))},"image/png",1)})}finally{a.remove()}},Ma=async t=>{var e;window.showToast&&window.showToast("Menyiapkan gambar struk WhatsApp...","info");try{const a=await Na(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([a],s,{type:"image/png"}),i=Aa(t);if((e=navigator.canShare)!=null&&e.call(navigator,{files:[n]})){await navigator.share({title:`Struk ${t.invoiceNo||""}`,text:i,files:[n]}),window.showToast&&window.showToast("Struk gambar berhasil dibagikan!","success");return}try{navigator.clipboard&&window.ClipboardItem&&(await navigator.clipboard.write([new ClipboardItem({"image/png":a})]),window.showToast&&window.showToast("📋 Gambar struk telah disalin ke clipboard! Tempel (Ctrl+V) di chat WhatsApp.","success"))}catch{}const o=na(t);window.open(o,"_blank","noopener,noreferrer")}catch{const s=na(t);window.open(s,"_blank","noopener,noreferrer")}},za=async t=>{var e;window.showToast&&window.showToast("Membuat PNG struk presisi...","info");try{const a=await Na(t),s=`Struk-${t.invoiceNo||Date.now()}.png`,n=new File([a],s,{type:"image/png"});if((e=navigator.canShare)!=null&&e.call(navigator,{files:[n]}))await navigator.share({title:`Struk ${t.invoiceNo||""}`,files:[n]}),window.showToast&&window.showToast("Struk berhasil dibagikan!","success");else{const i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=s,o.click(),setTimeout(()=>URL.revokeObjectURL(i),3e3),window.showToast&&window.showToast("PNG struk berhasil disimpan!","success")}}catch{window.showToast&&window.showToast("Gagal membuat PNG struk","error")}},Da=t=>{const e=p.state.settings||{};e.printerUrl&&!e.printerUrl.includes("receipt-data.html")?window.location.href=`my.bluetoothprint.scheme://${e.printerUrl}`:(window.showToast&&window.showToast("BT App perlu server JSON. Mengalihkan ke RawBT (cetak langsung offline)...","info"),setTimeout(()=>{window.location.href=Je(t)},800))},Oa=async t=>{if(!navigator.bluetooth)throw new Error("Web Bluetooth tidak didukung pada browser ini. Gunakan Chrome di Android/PC atau gunakan opsi Cetak Direct.");let e;try{e=await navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["000018f0-0000-1000-8000-00805f9b34fb","e7810a71-73ae-499d-8c15-faa9aef0c3f2","49535343-fe7d-4ae5-8fa9-9fafd205e455","0000ff00-0000-1000-8000-00805f9b34fb","0000ae30-0000-1000-8000-00805f9b34fb","0000fee7-0000-1000-8000-00805f9b34fb","0000ffe0-0000-1000-8000-00805f9b34fb","0000fff0-0000-1000-8000-00805f9b34fb"]})}catch(n){if(n.name==="NotFoundError")return;throw n}const a=await e.gatt.connect();let s=null;try{const n=await a.getPrimaryServices();for(const r of n)try{const d=await r.getCharacteristics();for(const l of d)if(l.properties.write||l.properties.writeWithoutResponse){s=l;break}if(s)break}catch{}if(!s)throw new Error("Karakteristik penulisan printer Bluetooth tidak ditemukan.");const i=Ca(t),o=64;for(let r=0;r<i.length;r+=o){const d=i.slice(r,r+o);s.properties.write?await s.writeValueWithResponse(d):await s.writeValueWithoutResponse(d)}}finally{a!=null&&a.connected&&a.disconnect()}},Ua=async t=>{var a;if(!navigator.usb)throw new Error("WebUSB tidak didukung pada browser ini. Gunakan Chrome/Edge.");let e;try{e=await navigator.usb.requestDevice({filters:[]})}catch(s){if(s.name==="NotFoundError")return;throw s}try{await e.open()}catch(s){if((a=s.message)!=null&&a.toLowerCase().includes("access denied")||s.name==="SecurityError"){window.showToast&&window.showToast("Printer USB Windows dikelola driver sistem. Mengalihkan otomatis ke Cetak Langsung...","info"),ae(t);return}throw s}try{e.configuration===null&&await e.selectConfiguration(1);let s=0,n=1;const i=e.configuration;if(i!=null&&i.interfaces)for(const r of i.interfaces)for(const d of r.alternates){const l=d.endpoints.find(c=>c.direction==="out");if(l){s=r.interfaceNumber,n=l.endpointNumber;break}}await e.claimInterface(s);const o=Ca(t);await e.transferOut(n,o),await e.close(),window.showToast&&window.showToast("Struk terkirim ke printer USB!","success")}catch{window.showToast&&window.showToast("Mengalihkan ke Cetak Langsung via sistem...","info"),ae(t)}},Te=(t="58mm")=>{const e={invoiceNo:`TEST-${t.toUpperCase()}-`+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:p.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};ae(e,t)},Ie=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),a=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${a}${s}`},On=t=>{let e=65535;for(let a=0;a<t.length;a++){e^=t.charCodeAt(a)<<8;for(let s=0;s<8;s++)e&32768?e=(e<<1^4129)&65535:e=e<<1&65535}return e.toString(16).toUpperCase().padStart(4,"0")},Un=(t,e)=>{const a=String(e),s=String(a.length).padStart(2,"0");return`${t}${s}${a}`},Rn=(t="",e=0)=>{let a=(t||"").trim();(!a||a.length<20)&&(a="00020101021126590014ID.LINKAJA.WWW011893600911002234477302090022344775204541153033605802ID5920BLUE MOUNTAIN STATION6006BEKASI610517510");const s=a.lastIndexOf("6304");s!==-1&&(a=a.substring(0,s)),a.includes("010211")?a=a.replace("010211","010212"):a.includes("010212")||(a=a.replace("000201","000201010212"));const n=Math.max(0,Math.round(Number(e)||0)),i=/54\d{2}\d+/,o=Un("54",n);if(i.test(a))a=a.replace(i,o);else{const d=a.indexOf("5802ID");d!==-1?a=a.slice(0,d)+o+a.slice(d):a+=`${o}5802ID`}a+="6304";const r=On(a);return a+r},at=(t,e="generic-modal",a="")=>{U();const s=typeof e=="string"&&e.trim()?e.trim():"generic-modal",n=document.createElement("div");n.className="modal-overlay",n.id=`overlay-${s}`;const o=s==="modal-cust-360"||s==="payment-modal"||a.includes("modal--wide")?`modal modal--wide ${a}`.trim():`modal ${a}`.trim();n.innerHTML=`<div class="${o}" id="${s}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(n),n.addEventListener("click",l=>{l.target===n&&U(s)});const r=l=>{l.key==="Escape"&&(document.removeEventListener("keydown",r),U(s))};document.addEventListener("keydown",r);const d=n.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return d.length&&d[0].focus(),n},U=(t=null)=>{const e=typeof t=="string"&&t.trim()?t.trim():null;let a=[];try{if(e){const s=document.getElementById(`overlay-${e}`)||document.querySelector(`#overlay-${e}`);s&&(a=[s])}}catch{}a.length||(a=[...document.querySelectorAll(".modal-overlay")]),a.forEach(s=>{var n;s&&((n=s.querySelector(".modal"))==null||n.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>{try{s.remove()}catch{}},180))})},jn=t=>{const a=(n=>Math.ceil(n/5e3)*5e3)(t),s=[a,a+5e3,a+1e4,a+2e4,a+5e4,a+1e5];return[...new Set(s.filter(n=>n>=t))].slice(0,4)},_e=(t="cash")=>{const e=p.total,a=p.subtotal,s=p.state.discount||0,n=p.tax,i=p.state.settings||{},o=x(i.bankName||"BCA"),r=x(i.bankNumber||"—"),d=x(i.bankHolder||i.shopName||"Blue Mountain"),l=`
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
          ${jn(e).map(c=>`<button class="quick-amt-btn" data-amount="${c}">${b(c)}</button>`).join("")}
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
            value="${x(p.state.customerName||"")}"
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
  `;at(l,"payment-modal"),setTimeout(()=>{var f,h,u,S;(f=document.getElementById("pay-close-btn"))==null||f.addEventListener("click",()=>U("payment-modal")),(h=document.getElementById("pay-cancel-btn"))==null||h.addEventListener("click",()=>U("payment-modal"));const c=()=>{var B;const w=document.getElementById("qris-dynamic-canvas");if(!w)return;const k=((B=p.state.settings)==null?void 0:B.qrisNumber)||"",v=Rn(k,e);Za.toCanvas(w,v,{width:170,margin:1,errorCorrectionLevel:"M"},A=>{})};c(),document.querySelectorAll(".pay-tab").forEach(w=>{w.addEventListener("click",()=>{var v,B;for(const A of document.querySelectorAll(".pay-tab"))A.classList.remove("active");w.classList.add("active");const k=w.dataset.method;document.getElementById("pay-cash-section").style.display=k==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=k==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=k==="debt"?"":"none",k==="cash"&&((v=document.getElementById("cash-received"))==null||v.focus()),k==="transfer"&&c(),k==="debt"&&((B=document.getElementById("debt-customer"))==null||B.focus())})});const m=document.getElementById("cash-received"),g=document.getElementById("change-amount"),y=()=>{const w=parseFloat(m==null?void 0:m.value)||e,k=Math.max(0,w-e);g&&(g.textContent=b(k))};m==null||m.addEventListener("input",y),y(),(u=document.getElementById("quick-amounts"))==null||u.addEventListener("click",w=>{const k=w.target.closest(".quick-amt-btn");k&&m&&(m.value=k.dataset.amount,y())});const T=document.getElementById("debt-paid-now"),L=()=>{const w=Math.min(parseFloat(T==null?void 0:T.value)||0,e),k=e-w,v=document.getElementById("debt-paid-display"),B=document.getElementById("debt-remaining-display");v&&(v.textContent=b(w)),B&&(B.textContent=b(k))};T==null||T.addEventListener("input",L),(S=document.getElementById("pay-confirm-btn"))==null||S.addEventListener("click",async()=>{var I,K,W,J,P,z,V,Q;const w=document.querySelector(".pay-tab.active"),k=(w==null?void 0:w.dataset.method)||"cash",v=document.getElementById("pay-confirm-btn");if(k==="cash"&&(parseFloat(m==null?void 0:m.value)||e)<e){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),m==null||m.focus();return}if(k==="debt"){const j=(K=(I=document.getElementById("debt-customer"))==null?void 0:I.value)==null?void 0:K.trim();if(!j){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(W=document.getElementById("debt-customer"))==null||W.focus();return}const $=Math.min(parseFloat((J=document.getElementById("debt-paid-now"))==null?void 0:J.value)||0,e),N=e-$,C=(p.state.customers||[]).find(M=>(M.name||"").trim().toLowerCase()===j.toLowerCase());if(C&&C.creditLimit>0){const M=(Number(C.totalDebt)||0)+N;if(M>C.creditLimit&&!confirm(`⚠️ Peringatan Limit Piutang!
Total piutang ${C.name} akan menjadi ${b(M)}, melebihi batas kredit (${b(C.creditLimit)}).

Tetap lanjutkan transaksi?`))return}}v&&(v.disabled=!0,v.textContent="⏳ Menyimpan...");const B=new Date().toISOString(),A=await Y();let _=p.state.selectedCustomer||null,D="";k==="debt"?D=((z=(P=document.getElementById("debt-customer"))==null?void 0:P.value)==null?void 0:z.trim())||p.state.customerName||"Pelanggan":D=p.state.customerName||"",!_&&D&&(_=A.find(j=>(j.name||"").trim().toLowerCase()===D.toLowerCase())||null);let O;if(k==="cash"){const j=parseFloat(m==null?void 0:m.value)||e,$=Math.max(0,j-e);O={invoiceNo:Ie(),date:B,dateKey:it(),items:p.state.cart.map(N=>({product:{...N.product},qty:N.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:j,change:$,paidAmount:e,remainingDebt:0,debtPayments:[],customerId:(_==null?void 0:_.id)||null,customerName:(_==null?void 0:_.name)||D,customerPhone:(_==null?void 0:_.phone)||"",cashier:p.state.settings.cashierName||"Kasir"}}else if(k==="transfer")O={invoiceNo:Ie(),date:B,dateKey:it(),items:p.state.cart.map(j=>({product:{...j.product},qty:j.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:e,change:0,paidAmount:e,remainingDebt:0,debtPayments:[],customerId:(_==null?void 0:_.id)||null,customerName:(_==null?void 0:_.name)||D,customerPhone:(_==null?void 0:_.phone)||"",cashier:p.state.settings.cashierName||"Kasir"};else{const j=Math.min(parseFloat((V=document.getElementById("debt-paid-now"))==null?void 0:V.value)||0,e),$=e-j,N=$===0?"paid":j>0?"partial":"unpaid";O={invoiceNo:Ie(),date:B,dateKey:it(),items:p.state.cart.map(C=>({product:{...C.product},qty:C.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"debt",paymentStatus:N,paid:j,change:0,paidAmount:j,remainingDebt:$,debtPayments:j>0?[{date:B,amount:j,note:"DP / Uang muka awal"}]:[],customerId:(_==null?void 0:_.id)||null,customerName:(_==null?void 0:_.name)||D,customerPhone:(_==null?void 0:_.phone)||"",cashier:p.state.settings.cashierName||"Kasir"}}try{if(D){if(_)_.totalOrders=(Number(_.totalOrders)||0)+1,_.totalSpent=(Number(_.totalSpent)||0)+O.total,O.remainingDebt>0&&(_.totalDebt=(Number(_.totalDebt)||0)+O.remainingDebt),await Ft(_),O.customerId=_.id,O.customerName=_.name;else{const C=await $a({name:D,phone:"",category:"Rumah Tangga",address:"",totalOrders:1,totalSpent:O.total,totalDebt:O.remainingDebt||0,creditLimit:0,galonLoaned:0});O.customerId=C,O.customerName=D}const N=await Y();p.setCustomers(N)}const j=await Ln(O);O.id=j,p.addTransaction(O),kn(O.items,O).catch(()=>{});for(const N of O.items||[])if((Q=N.product)!=null&&Q.id){const C=await E.products.get(N.product.id);if(C&&typeof C.stock=="number"){const M=Math.max(0,C.stock-(Number(N.qty)||1));await E.products.update(N.product.id,{stock:M})}}const $=await dt();p.setProducts($),U("payment-modal"),p.clearCart(),Kn(O)}catch(j){window.showToast(`Gagal menyimpan transaksi: ${j.message||"Error"}`,"error"),v&&(v.disabled=!1,v.textContent="✅ Proses Pembayaran")}})},0)},Kn=t=>{var r,d,l,c,m,g,y,T,L,f;const e=he(t,p.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Ba(t);const a=Je(t),s=((r=p.state.settings)==null?void 0:r.printerPaper)||"58mm",n=ve(t,s),i=document.createElement("div");i.className="success-overlay",i.id="success-overlay",i.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${x(t.invoiceNo)} &bull; ${b(t.total)}</p>
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
  `,document.body.appendChild(i);const o=()=>{i.classList.add("closing"),setTimeout(()=>i.remove(),180)};(d=document.getElementById("success-close-btn"))==null||d.addEventListener("click",o),(l=document.getElementById("btn-close-overlay"))==null||l.addEventListener("click",o),(c=document.getElementById("btn-print-direct"))==null||c.addEventListener("click",()=>{ae(t)}),(m=document.getElementById("btn-mo-whatsapp"))==null||m.addEventListener("click",()=>{Ma(t)}),(g=document.getElementById("btn-mo-png"))==null||g.addEventListener("click",()=>{za(t)}),(y=document.getElementById("btn-print-ble"))==null||y.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer Bluetooth...","info"),await Oa(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(h){window.showToast(h.message||"Gagal koneksi Bluetooth","error")}}),(T=document.getElementById("btn-print-usb"))==null||T.addEventListener("click",async()=>{try{window.showToast("Menghubungkan ke printer USB...","info"),await Ua(t)}catch(h){window.showToast(h.message||"Gagal koneksi WebUSB","error")}}),(L=document.getElementById("btn-mo-btapp"))==null||L.addEventListener("click",()=>{Da(t)}),(f=document.getElementById("btn-new-tx"))==null||f.addEventListener("click",()=>{o(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{i.parentNode&&o()},2e4)},Ue=async({onLogin:t=null,forceLock:e=!1}={})=>{var L;if(navigator.onLine)try{await oe()}catch{}let a=await Tt(),s=a.filter(f=>f.isActive!==!1);if(s.length===0&&(await Ge(),a=await Tt(),s=a.filter(f=>f.isActive!==!1)),s.length===0){(L=window.showToast)==null||L.call(window,"Tidak ada akun operator aktif.","error");return}let n=s[0].id,i="";const o="modal-login-operator",r={owner:{color:"#8b5cf6",label:"👑 Owner"},supervisor:{color:"#2563eb",label:"⭐ Supervisor"},cashier:{color:"#10b981",label:"👤 Kasir"}},d=()=>`
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
        ${s.map(f=>{const h=String(f.id)===String(n),u=r[f.role]||r.cashier;return`
            <button type="button" class="btn-select-operator" data-id="${f.id}" style="
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
                ${(f.name||"U").charAt(0).toUpperCase()}
              </div>
              <div style="text-align: left;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${x(f.name)}</div>
                <div style="font-size: 11px; color: ${u.color}; font-weight: 600;">${u.label}</div>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- PIN Display -->
      <div id="pin-display-box" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;">
          ${[0,1,2,3,4,5].map(f=>`
            <span class="pin-dot" style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid var(--primary, #2563eb);
              background: ${f<i.length?"var(--primary, #2563eb)":"transparent"};
              display: inline-block;
              transition: background 0.15s;
            "></span>
          `).join("")}
        </div>
        <div id="pin-error-msg" style="min-height: 18px; font-size: 12px; font-weight: 600; color: #dc2626;"></div>
      </div>

      <!-- Numpad -->
      <div style="max-width: 260px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${[1,2,3,4,5,6,7,8,9].map(f=>`
          <button type="button" class="btn-numpad" data-val="${f}" style="
            height: 52px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 12px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
          ">${f}</button>
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
  `;at(d(),o,"modal--login");const l=()=>{document.querySelectorAll("#pin-display-box .pin-dot").forEach((h,u)=>{h.style.background=u<i.length?"var(--primary, #2563eb)":"transparent"})},c="bm_pin_lockout",m=()=>{try{const f=JSON.parse(localStorage.getItem(c)||"{}");return{count:Number(f.count)||0,until:Number(f.until)||0}}catch{return{count:0,until:0}}},g=(f,h)=>{try{localStorage.setItem(c,JSON.stringify({count:f,until:h}))}catch{}},y=async(f=!1)=>{var w;const h=s.find(k=>String(k.id)===String(n));if(!h)return;const u=m(),S=document.getElementById("pin-error-msg");if(u.until>Date.now()){const k=Math.ceil((u.until-Date.now())/1e3);S&&(S.textContent=`Sistem terkunci! Tunggu ${k} detik.`),i="",l();return}if(i.length>=4){const k=await qe(h.username,i);if(k.success){g(0,0),p.login(k.user,k.token),U(o);const v=k.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(w=window.showToast)==null||w.call(window,`Operator aktif: ${k.user.name} (${k.user.role})${v}`,"success"),typeof t=="function"&&t(k.user);return}else if(f||i.length>=6){const v=m().count+1;v>=5?(g(v,Date.now()+6e4),S&&(S.textContent="PIN salah 5x! Sistem terkunci 60 detik.")):(g(v,0),S&&(S.textContent=`${k.error||"PIN salah!"} (Sisa percobaan: ${5-v})`)),i="",l();return}}f&&i.length<4&&(S&&(S.textContent="Masukkan minimal 4 digit PIN"),i="",l())},T=()=>{var h;document.querySelectorAll(".btn-select-operator").forEach(u=>{u.addEventListener("click",()=>{n=u.getAttribute("data-id"),i="";const S=document.getElementById(o);S&&(S.innerHTML=d(),T())})}),document.querySelectorAll(".btn-numpad").forEach(u=>{u.addEventListener("click",()=>{const S=u.getAttribute("data-val"),w=document.getElementById("pin-error-msg");w&&(w.textContent=""),S==="clear"?(i="",l()):S==="submit"?y(!0):i.length<6&&(i+=S,l(),y(!1))})}),(h=document.getElementById("btn-cancel-login"))==null||h.addEventListener("click",()=>{U(o)});const f=u=>{if(!document.getElementById(o)){window.removeEventListener("keydown",f);return}["INPUT","TEXTAREA"].includes(u.target.tagName)||(u.key>="0"&&u.key<="9"?(u.preventDefault(),i.length<6&&(i+=u.key,l(),y(!1))):u.key==="Backspace"?(u.preventDefault(),i=i.slice(0,-1),l()):u.key==="Enter"?(u.preventDefault(),y(!0)):u.key==="Escape"&&!e&&(u.preventDefault(),U(o)))};window.addEventListener("keydown",f)};T()};let Nt=[],de="all",Mt="",tt=1;const Wt=10,Hn=[{id:"all",label:"Semua"},{id:"Rumah Tangga",label:"🏠 Rumah Tangga"},{id:"Kantor/Instansi",label:"🏢 Kantor/Instansi"},{id:"Warung/Reseller",label:"🏪 Warung/Reseller"},{id:"VIP",label:"🌟 VIP"}],qn=async()=>{if(Nt.length){for(const s of Nt)typeof s=="function"&&s();Nt=[]}Nt.push(p.on("customers:change",()=>wt())),Nt.push(p.on("transactions:change",()=>wt()));const t=()=>{const s=document.getElementById("view-customers");s!=null&&s.classList.contains("active")&&wt()};window.addEventListener("resize",t),Nt.push(()=>window.removeEventListener("resize",t));const[e,a]=await Promise.all([Y(),mt()]);p.setCustomers(e),p.setTransactions(a),wt()},Ra=(t,e=[])=>{const a=t.id?String(t.id):null,s=(t.name||"").trim().toLowerCase(),n=(t.phone||"").replace(/\D/g,"");return e.filter(i=>!!(a&&i.customerId&&String(i.customerId)===a||s&&i.customerName&&i.customerName.trim().toLowerCase()===s||n&&i.customerPhone&&i.customerPhone.replace(/\D/g,"")===n)).sort((i,o)=>new Date(o.date)-new Date(i.date))},wt=async()=>{var L,f,h;const t=document.getElementById("view-customers");if(!t)return;const e=p.state.customers||[],a=await mt(),s={};for(const u of a){const S=u.customerId?String(u.customerId):null,w=(u.customerName||"").trim().toLowerCase(),k=[];S&&k.push(`id:${S}`),w&&k.push(`name:${w}`);for(const v of k)s[v]||(s[v]={orders:0,spent:0,debt:0,txIds:new Set}),s[v].txIds.has(u.id)||(s[v].txIds.add(u.id),s[v].orders+=1,s[v].spent+=Number(u.total)||0,u.paymentMethod==="debt"&&(Number(u.remainingDebt)||0)>0&&(s[v].debt+=Number(u.remainingDebt)||0))}const n=e.length;let i=0,o=0,r=0;e.forEach(u=>{const S=`id:${u.id}`,w=`name:${(u.name||"").trim().toLowerCase()}`,k=s[S],v=s[w],B=Math.max((k==null?void 0:k.debt)||0,(v==null?void 0:v.debt)||0),A=Math.max((k==null?void 0:k.spent)||0,(v==null?void 0:v.spent)||0),_=Math.max(Number(u.totalDebt||0),B),D=Math.max(Number(u.totalSpent||0),A);i+=_,r+=D,o+=Number(u.galonLoaned||0)});const d=e.filter(u=>{const S=de==="all"||u.category===de,w=!Mt||(u.name||"").toLowerCase().includes(Mt.toLowerCase())||(u.phone||"").includes(Mt)||(u.address||"").toLowerCase().includes(Mt.toLowerCase());return S&&w}),l=d.length,c=Math.max(1,Math.ceil(l/Wt));tt>c&&(tt=c),tt<1&&(tt=1);const m=l===0?0:(tt-1)*Wt+1,g=Math.min(tt*Wt,l),y=d.slice((tt-1)*Wt,tt*Wt);t.innerHTML=`
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
        ${Hn.map(u=>`
          <button class="btn btn--sm ${u.id===de?"btn--primary":"btn--secondary"} cat-filter-btn"
                  data-cat="${u.id}" style="border-radius:20px;font-size:12px;padding:5px 12px">
            ${u.label}
          </button>
        `).join("")}
      </div>

      <div style="position:relative;flex:1;min-width:200px;max-width:320px">
        <input type="text" class="input" id="cust-search"
               placeholder="Cari nama, nomor HP, alamat..."
               value="${x(Mt)}"
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
            ${y.length===0?`
              <tr>
                <td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                  Belum ada data pelanggan yang sesuai filter.
                </td>
              </tr>
            `:y.map(u=>{const S=`id:${u.id}`,w=`name:${(u.name||"").trim().toLowerCase()}`,k=s[S],v=s[w],B=Math.max((k==null?void 0:k.debt)||0,(v==null?void 0:v.debt)||0),A=Math.max(Number(u.totalDebt||0),B),_=(u.phone||"").replace(/\D/g,""),D=_.startsWith("08")?`62${_.slice(1)}`:_;return`
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--text-primary)">${x(u.name)}</div>
                    ${u.creditLimit>0?`<div style="font-size:11px;color:var(--text-muted)">Limit: ${b(u.creditLimit)}</div>`:""}
                  </td>
                  <td>
                    <span class="badge badge--blue">
                      ${x(u.category||"Rumah Tangga")}
                    </span>
                  </td>
                  <td>
                    ${D?`
                      <a href="https://wa.me/${D}" target="_blank" rel="noopener noreferrer"
                         style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                        💬 ${x(u.phone)}
                      </a>
                    `:'<span style="color:var(--text-muted)">-</span>'}
                  </td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${x(u.address||"-")}">
                    ${x(u.address||"-")}
                  </td>
                  <td style="text-align:right">
                    ${A>0?`
                      <div style="color:#dc2626;font-weight:800;font-size:13px">${b(A)}</div>
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
          Menampilkan <strong>${m}-${g}</strong> dari <strong>${l}</strong> pelanggan
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn btn--secondary btn--sm" id="cust-prev-page" ${tt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            ◀ Sebelumnya
          </button>
          <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
            Hal ${tt} / ${c}
          </span>
          <button class="btn btn--secondary btn--sm" id="cust-next-page" ${tt>=c?'disabled style="opacity:0.4;cursor:not-allowed"':""}>
            Berikutnya ▶
          </button>
        </div>
      </div>
    </div>

    <!-- Dock Clearance Spacer: prevents bottom navigation dock from overlapping content -->
    <div style="height:48px" aria-hidden="true"></div>
  `,t.querySelectorAll(".cat-filter-btn").forEach(u=>{u.addEventListener("click",()=>{de=u.dataset.cat,tt=1,wt()})});const T=document.getElementById("cust-search");T==null||T.addEventListener("input",u=>{Mt=u.target.value,tt=1,wt()}),(L=document.getElementById("cust-prev-page"))==null||L.addEventListener("click",()=>{tt>1&&(tt--,wt())}),(f=document.getElementById("cust-next-page"))==null||f.addEventListener("click",()=>{tt<c&&(tt++,wt())}),(h=document.getElementById("btn-add-customer"))==null||h.addEventListener("click",()=>{Ht()}),t.querySelectorAll(".btn-edit-cust").forEach(u=>{u.addEventListener("click",()=>{const S=u.dataset.id,w=e.find(k=>String(k.id)===String(S));w&&Ht(w)})}),t.querySelectorAll(".btn-del-cust").forEach(u=>{u.addEventListener("click",async()=>{var k;const S=u.dataset.id,w=e.find(v=>String(v.id)===String(S));if(w&&confirm(`Hapus pelanggan "${w.name}"?`)){await In(w.id);const v=await Y();p.setCustomers(v),(k=window.showToast)==null||k.call(window,"Pelanggan berhasil dihapus.","info")}})}),t.querySelectorAll(".btn-view-360").forEach(u=>{u.addEventListener("click",()=>{const S=u.dataset.id,w=e.find(k=>String(k.id)===String(S));w&&Fn(w)})}),t.querySelectorAll(".btn-pay-debt-quick").forEach(u=>{u.addEventListener("click",()=>{const S=u.dataset.id,w=e.find(k=>String(k.id)===String(S));w&&ja(w)})})},Ht=(t=null)=>{var s,n,i;const e=!!t,a=`
    <div class="modal-header">
      <h3 class="modal-title">${e?"✏️ Edit Data Pelanggan":"➕ Tambah Pelanggan Baru"}</h3>
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
        ${e?`
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
      <button class="btn btn--primary" id="cust-save-btn" type="button">${e?"💾 Simpan Perubahan":"➕ Tambahkan Pelanggan"}</button>
    </div>
  `;at(a,"modal-cust"),(s=document.getElementById("modal-cust-close"))==null||s.addEventListener("click",()=>U("modal-cust")),(n=document.getElementById("cust-cancel-btn"))==null||n.addEventListener("click",()=>U("modal-cust")),(i=document.getElementById("cust-save-btn"))==null||i.addEventListener("click",async()=>{var h,u,S;const o=document.getElementById("cf-name").value.trim(),r=document.getElementById("cf-phone").value.trim(),d=document.getElementById("cf-category").value,l=document.getElementById("cf-address").value.trim(),c=Math.max(0,Number(document.getElementById("cf-creditLimit").value)||0),m=Math.max(0,Number(document.getElementById("cf-galonLoaned").value)||0),g=document.getElementById("cf-notes").value.trim(),y=document.getElementById("cf-totalDebt"),T=y?Math.max(0,Number(y.value)||0):(t==null?void 0:t.totalDebt)||0;if(!o){(h=window.showToast)==null||h.call(window,"Nama pelanggan wajib diisi!","warning");return}const L={name:o,phone:r,category:d,address:l,creditLimit:c,galonLoaned:m,notes:g,totalOrders:(t==null?void 0:t.totalOrders)||0,totalSpent:(t==null?void 0:t.totalSpent)||0,totalDebt:T};e?(await Ft({...L,id:t.id}),(u=window.showToast)==null||u.call(window,"Data pelanggan berhasil diperbarui!","success")):(await $a(L),(S=window.showToast)==null||S.call(window,"Pelanggan baru berhasil ditambahkan!","success")),U("modal-cust");const f=await Y();p.setCustomers(f)})},Fn=async t=>{var g,y,T,L;const e=await mt(),a=Ra(t,e),s=(t.phone||"").replace(/\D/g,""),n=s.startsWith("08")?`62${s.slice(1)}`:s;let i=0,o=0;a.forEach(f=>{i+=Number(f.total||0),f.paymentMethod==="debt"&&(Number(f.remainingDebt)||0)>0&&(o+=Number(f.remainingDebt||0))});const r=Math.max(Number(t.totalSpent||0),i),d=Math.max(Number(t.totalDebt||0),o),l=Math.max(Number(t.totalOrders||0),a.length),c=encodeURIComponent(`Halo *${t.name}*, ini pengingat dari *${((g=p.state.settings)==null?void 0:g.shopName)||"Blue Mountain"}* terkait sisa piutang Anda sebesar *${b(d)}*. Terima kasih!`),m=`
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
          <div style="font-size:16px;font-weight:900;color:var(--blue-600)">${l} kali</div>
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
        <div><strong>📍 Alamat:</strong> ${x(t.address||"-")}</div>
        <div><strong>📞 WhatsApp:</strong> ${x(t.phone||"-")}</div>
        <div><strong>💳 Limit Kredit:</strong> ${t.creditLimit>0?b(t.creditLimit):"Tanpa batas"}</div>
        ${t.notes?`<div><strong>📝 Catatan:</strong> ${x(t.notes)}</div>`:""}
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
                ${a.slice(0,20).map(f=>{const h=Number(f.remainingDebt)||0;return`
                    <tr style="border-bottom:1px solid var(--card-border)">
                      <td style="padding:8px 12px;font-weight:700;white-space:nowrap">${x(f.invoiceNo)}</td>
                      <td style="padding:8px 12px;white-space:nowrap">${vt(new Date(f.date))}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:700;white-space:nowrap">${b(f.total)}</td>
                      <td style="padding:8px 12px;text-align:center;white-space:nowrap">
                        <span class="badge" style="font-size:10px;text-transform:uppercase">${x(f.paymentStatus||f.paymentMethod)}</span>
                      </td>
                      <td style="padding:8px 12px;text-align:right;white-space:nowrap">
                        ${h>0?`
                          <strong style="color:var(--color-danger)">${b(h)}</strong>
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
  `;at(m,"modal-cust-360"),(y=document.getElementById("drawer-close-btn"))==null||y.addEventListener("click",()=>U("modal-cust-360")),(T=document.getElementById("drawer-ok-btn"))==null||T.addEventListener("click",()=>U("modal-cust-360")),(L=document.getElementById("btn-drawer-pay-debt"))==null||L.addEventListener("click",()=>{U("modal-cust-360"),ja(t)})},ja=async t=>{var o,r,d,l;const e=await mt(),s=Ra(t,e).filter(c=>c.paymentMethod==="debt"&&(Number(c.remainingDebt)||0)>0),n=Math.max(Number(t.totalDebt||0),s.reduce((c,m)=>c+(Number(m.remainingDebt)||0),0));if(n<=0){(o=window.showToast)==null||o.call(window,"Pelanggan ini tidak memiliki sisa piutang.","info");return}const i=`
    <div class="modal-header">
      <h3 class="modal-title">💰 Pembayaran Piutang: ${x(t.name)}</h3>
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
  `;at(i,"modal-pay-customer-debt"),(r=document.getElementById("pcd-close-btn"))==null||r.addEventListener("click",()=>U("modal-pay-customer-debt")),(d=document.getElementById("pcd-cancel-btn"))==null||d.addEventListener("click",()=>U("modal-pay-customer-debt")),document.querySelectorAll(".pcd-quick-amt").forEach(c=>{c.addEventListener("click",()=>{const m=document.getElementById("pcd-amount");m&&(m.value=c.dataset.amt)})}),(l=document.getElementById("pcd-submit-btn"))==null||l.addEventListener("click",async()=>{var g,y,T,L,f,h;const c=Number((g=document.getElementById("pcd-amount"))==null?void 0:g.value)||0,m=((T=(y=document.getElementById("pcd-note"))==null?void 0:y.value)==null?void 0:T.trim())||"Pembayaran piutang";if(c<=0||c>n){(L=window.showToast)==null||L.call(window,`Jumlah pembayaran harus antara Rp 1 dan ${b(n)}`,"warning");return}try{let u=c;const S=new Date().toISOString(),w=[...s].sort((A,_)=>new Date(A.date)-new Date(_.date));for(const A of w){if(u<=0)break;const _=Number(A.remainingDebt)||0,D=Math.min(u,_),O=(Number(A.paidAmount)||0)+D,I=Math.max(0,_-D),K=I===0?"paid":"partial",W=(A.debtPayments||[]).length+1,J=I===0?`${m} (Pelunasan/LUNAS ✅)`:`${m} (Cicilan #${W})`,P=[...A.debtPayments||[],{date:S,amount:D,note:J}],z={...A,paidAmount:O,remainingDebt:I,paymentStatus:K,debtPayments:P};await te(z),p.updateTransaction(A.id,z),u-=D}const v=(await Y()).find(A=>String(A.id)===String(t.id))||t;v.totalDebt=Math.max(0,(Number(v.totalDebt)||0)-c),await Ft(v);const B=await Y();p.setCustomers(B),U("modal-pay-customer-debt"),(f=window.showToast)==null||f.call(window,`Pembayaran ${b(c)} untuk ${t.name} berhasil dicatat!`,"success")}catch(u){(h=window.showToast)==null||h.call(window,`Gagal mencatat pembayaran hutang: ${u.message||"Error"}`,"error")}})},sa=t=>{if(t==null)return'""';const e=String(t);return e.includes('"')||e.includes(",")||e.includes(`
`)||e.includes("\r")?`"${e.replace(/"/g,'""')}"`:`"${e}"`},Ve=(t,e,a)=>{const s=e.map(sa).join(","),n=a.map(l=>l.map(sa).join(",")),i=`\uFEFF${[s,...n].join(`\r
`)}`,o=new Blob([i],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(o),d=document.createElement("a");d.setAttribute("href",r),d.setAttribute("download",t.endsWith(".csv")?t:`${t}.csv`),d.style.visibility="hidden",document.body.appendChild(d),d.click(),document.body.removeChild(d),setTimeout(()=>URL.revokeObjectURL(r),1e3)};let Le=null,Pe=null,Be=null,Rt=!1,ft=1,yt=1,ht=1;const xt=10,Gn=async()=>{Le&&Le(),Pe&&Pe(),Be&&Be(),Le=p.on("transactions:change",()=>{Rt||ot()}),Pe=p.on("expenses:change",()=>{Rt||ot()}),Be=p.on("customers:change",()=>{Rt||ot()}),await ot()},ot=async()=>{if(!Rt){Rt=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,a,s]=await Promise.all([p.state.transactions.length?Promise.resolve(p.state.transactions):mt().then(I=>(p.setTransactions(I),I)),ee().then(I=>(p.setExpenses(I),I)),Fe("modalAwal")]),n=parseFloat(s)||0;let i=0,o=0,r=0,d=0,l=0;for(const I of e)if(I.paymentMethod==="cash"&&(I.paymentStatus==="paid"||!I.paymentStatus)&&(i+=I.total),I.paymentMethod==="transfer"&&(I.paymentStatus==="transfer_confirmed"?o+=I.total:d+=I.total),I.paymentMethod==="debt"){for(const K of I.debtPayments||[])r+=K.amount;l+=I.remainingDebt||0}const c=i+o+r,m=a.reduce((I,K)=>I+(K.amount||0),0),g=n+c-m,y=d+l,T=Wn(e,a),L=Vn(e,a),f=L.reduce((I,K)=>I+(K.debit||0),0),h=L.reduce((I,K)=>I+(K.credit||0),0),u=f===h,S=(p.state.customers||[]).reduce((I,K)=>I+(Number(K.galonLoaned)||0),0),w=[...e.filter(I=>I.paymentStatus==="transfer_pending"),...e.filter(I=>(I.paymentMethod==="debt"||I.paymentStatus==="partial"||I.paymentStatus==="unpaid")&&(I.remainingDebt||0)>0)].sort((I,K)=>new Date(I.date)-new Date(K.date)),k=Math.max(1,Math.ceil(w.length/xt));ft>k&&(ft=k);const v=w.slice((ft-1)*xt,ft*xt),B=[...a].sort((I,K)=>new Date(K.date)-new Date(I.date)),A=Math.max(1,Math.ceil(B.length/xt));yt>A&&(yt=A);const _=B.slice((yt-1)*xt,yt*xt),D=Math.max(1,Math.ceil(L.length/xt));ht>D&&(ht=D);const O=L.slice((ht-1)*xt,ht*xt);t.innerHTML=`
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
          <div class="stat-card__value" style="color:#d97706">${b(y)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${w.length} belum lunas</div>
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
            <div style="font-size:18px;font-weight:900;color:var(--color-warning)">${S} <span style="font-size:12px;font-weight:600">galon</span></div>
            <div style="font-size:10px;color:var(--text-muted)">Di ${(p.state.customers||[]).filter(I=>(I.galonLoaned||0)>0).length} pelanggan</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Nilai Aset Galon Toko</div>
            <div style="font-size:18px;font-weight:900;color:var(--blue-600)">${b(S*45e3)}</div>
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
          ${Jt("🔴 Piutang Hutang",l,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding Table with Pagination (10/page) -->
      ${w.length>0?`
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
          ⚠️ Daftar Piutang &amp; Cicilan Berjalan (${w.length} transaksi)
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
              ${v.map(I=>{const K=I.total||0,W=I.paymentStatus==="transfer_pending"?K:I.remainingDebt||0,J=K-W,P=Math.min(100,Math.max(0,Math.round(J/K*100))),z=(I.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${x(I.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${x(I.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(I.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${b(K)}</td>
                <td style="color:#16a34a;font-weight:700">${b(J)}</td>
                <td style="font-weight:800;color:#dc2626">${b(W)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${P}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${z>0?`${z}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${P}%;background:${P===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${I.paymentStatus==="transfer_pending"?`
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${I.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>`:`
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${I.id}"
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
                ${_.map(I=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(I.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${x(I.category||"Lainnya")}</span></td>
                  <td>${x(I.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${b(I.amount)}</td>
                  <td>
                    <button class="btn btn--sm" data-action="delete-expense" data-id="${I.id}"
                      style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
            <div style="font-size:12px;color:var(--text-muted)">Hal ${yt} dari ${A}</div>
            <div style="display:flex;gap:6px">
              <button class="btn btn--secondary btn--sm" id="exp-prev" ${yt<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
              <button class="btn btn--secondary btn--sm" id="exp-next" ${yt>=A?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
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
              ${Jn(T,n)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Jurnal Entri with Pagination (10/page) -->
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
            📒 Jurnal Entri Akuntansi SAK EMKM (${L.length} baris)
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badge" style="background:${u?"#dcfce7":"#fee2e2"};color:${u?"#166534":"#991b1b"};border:1px solid ${u?"#86efac":"#fca5a5"};font-size:11px;font-weight:700;padding:4px 10px">
              ⚖️ Debit: ${b(f)} | Kredit: ${b(h)} (${u?"Seimbang ✅":"Selisih ⚠️"})
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
              ${O.map(I=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(I.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${x(I.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${I.debit>0?b(I.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${I.credit>0?b(I.credit):"—"}</td>
                <td><span class="badge ${I.type==="kas"?"badge--green":I.type==="piutang"?"":"badge--blue"}"
                  style="${I.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${x(I.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${ht} dari ${D}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="journal-prev" ${ht<=1?'disabled style="opacity:0.4;cursor:not-allowed"':""}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="journal-next" ${ht>=D?'disabled style="opacity:0.4;cursor:not-allowed"':""}>Berikutnya ▶</button>
          </div>
        </div>
      </div>
    `,Qn(e,a,L)}finally{Rt=!1}}},Jt=(t,e,a,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${a}">${b(e)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Wn=(t,e)=>{const a={};for(const n of t){const i=n.dateKey;if(i){if(a[i]||(a[i]={masuk:0,keluar:0}),n.paymentMethod==="cash"&&(n.paymentStatus==="paid"||!n.paymentStatus)&&(a[i].masuk+=n.total),n.paymentMethod==="transfer"&&n.paymentStatus==="transfer_confirmed"){const o=n.confirmedAt?n.confirmedAt.split("T")[0]:i;a[o]||(a[o]={masuk:0,keluar:0}),a[o].masuk+=n.total}if(n.paymentMethod==="debt")for(const o of n.debtPayments||[]){const r=o.date?o.date.split("T")[0]:i;a[r]||(a[r]={masuk:0,keluar:0}),a[r].masuk+=o.amount}}}for(const n of e){const i=n.dateKey||(n.date?n.date.split("T")[0]:null);i&&(a[i]||(a[i]={masuk:0,keluar:0}),a[i].keluar+=n.amount||0)}const s=[];for(let n=29;n>=0;n--){const i=new Date;i.setDate(i.getDate()-n);const o=it(i);s.push({key:o,...a[o]||{masuk:0,keluar:0}})}return s},Jn=(t,e)=>{let a=e;const s=t.filter(n=>n.masuk>0||n.keluar>0).map(n=>{const i=n.masuk-n.keluar;return a+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(n.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${n.masuk>0?b(n.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${n.keluar>0?b(n.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${b(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${b(a)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Vn=(t,e)=>{const a=[];for(const s of t){const n=x(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")a.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1001] Kas Toko / [4001] Pendapatan Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?a.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"[1002] Bank Transfer & QRIS / [4001] Pendapatan",type:"kas"}):a.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${n}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"[1101] Piutang Transfer / [4001] Pendapatan",type:"piutang"});else if(s.paymentMethod==="debt"){a.push({date:s.date,desc:`Penjualan Kredit/Tempo — ${s.invoiceNo} (${n}) [Total: ${b(s.total)}]`,debit:s.total,credit:s.total,account:"[1101] Piutang Usaha / [4001] Pendapatan",type:"piutang"});const i=s.debtPayments||[];let o=0;i.forEach((r,d)=>{o+=r.amount||0;const l=Math.max(0,s.total-o),c=l===0,m=d+1,g=c?`Pelunasan Piutang (#${m}/LUNAS ✅)`:`Cicilan Piutang #${m} (dari ${i.length})`,y=r.note?` — ${x(r.note)}`:"";a.push({date:r.date,desc:`${g} — ${s.invoiceNo} (${n})${y} [Bayar: ${b(r.amount)} | Sisa: ${b(l)}]`,debit:r.amount,credit:r.amount,account:c?"[1001] Kas Toko / [1101] Piutang (LUNAS ✅)":"[1001] Kas Toko / [1101] Piutang Usaha",type:"kas"})})}}for(const s of e){const n=(s.category||"").toLowerCase();let i="[6099] Beban Operasional";n.includes("tutup")||n.includes("tisu")||n.includes("galon")||n.includes("bahan")?i="[6001] Beban Tutup & Tisu":n.includes("listrik")||n.includes("air")||n.includes("utilitas")?i="[6002] Beban Utilitas/Listrik":n.includes("gaji")||n.includes("upah")?i="[6003] Beban Gaji Karyawan":(n.includes("bensin")||n.includes("antar")||n.includes("transport"))&&(i="[6004] Beban Transportasi"),a.push({date:s.date,desc:`Beban ${x(s.category||"Operasional")} — ${x(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`${i} / [1001] Kas Toko`,type:"beban"})}return a.sort((s,n)=>new Date(n.date)-new Date(s.date))},Qn=(t,e=[],a=[])=>{var s,n,i,o,r,d,l,c,m,g,y,T;(s=document.getElementById("btn-refresh-finance"))==null||s.addEventListener("click",ot),(n=document.getElementById("piutang-prev"))==null||n.addEventListener("click",()=>{ft>1&&(ft--,ot())}),(i=document.getElementById("piutang-next"))==null||i.addEventListener("click",()=>{ft++,ot()}),(o=document.getElementById("exp-prev"))==null||o.addEventListener("click",()=>{yt>1&&(yt--,ot())}),(r=document.getElementById("exp-next"))==null||r.addEventListener("click",()=>{yt++,ot()}),(d=document.getElementById("journal-prev"))==null||d.addEventListener("click",()=>{ht>1&&(ht--,ot())}),(l=document.getElementById("journal-next"))==null||l.addEventListener("click",()=>{ht++,ot()}),(c=document.getElementById("btn-export-journal-csv"))==null||c.addEventListener("click",()=>{var u;const L=["Tanggal","Keterangan","Debit","Kredit","Bagan Akun COA"],f=a.map(S=>[vt(new Date(S.date)),S.desc||"",S.debit||0,S.credit||0,S.account||""]),h=it();Ve(`Jurnal-Akuntansi-${h}.csv`,L,f),(u=window.showToast)==null||u.call(window,"✅ Jurnal akuntansi berhasil diekspor ke file CSV/Excel!","success")}),(m=document.getElementById("btn-set-modal-awal"))==null||m.addEventListener("click",()=>{const f=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${p.state.settings.modalAwal||0||""}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;at(f,"modal-awal"),setTimeout(()=>{var h,u,S;(h=document.getElementById("ma-x"))==null||h.addEventListener("click",()=>U("modal-awal")),(u=document.getElementById("ma-cancel"))==null||u.addEventListener("click",()=>U("modal-awal")),(S=document.getElementById("ma-save"))==null||S.addEventListener("click",async()=>{var k;const w=parseFloat((k=document.getElementById("modal-awal-input"))==null?void 0:k.value)||0;await _a("modalAwal",w),p.updateSettings({modalAwal:w}),U("modal-awal"),window.showToast("Modal Awal disimpan!","success"),ot()})},0)}),(g=document.getElementById("btn-add-expense"))==null||g.addEventListener("click",()=>{const f=`
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
    `;at(f,"expense-modal"),setTimeout(()=>{var h,u,S;(h=document.getElementById("exp-x"))==null||h.addEventListener("click",()=>U("expense-modal")),(u=document.getElementById("exp-cancel"))==null||u.addEventListener("click",()=>U("expense-modal")),(S=document.getElementById("exp-save"))==null||S.addEventListener("click",async()=>{var _,D,O,I;const w=parseFloat((_=document.getElementById("exp-amount"))==null?void 0:_.value)||0,k=((D=document.getElementById("exp-category"))==null?void 0:D.value)||"Lainnya",v=((I=(O=document.getElementById("exp-note"))==null?void 0:O.value)==null?void 0:I.trim())||"";if(w<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const B=new Date().toISOString(),A={date:B,dateKey:B.split("T")[0],category:k,note:v,amount:w};try{const K=await Bn(A);A.id=K,p.addExpense(A),U("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch{window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(y=document.getElementById("expense-table"))==null||y.addEventListener("click",async L=>{const f=L.target.closest('[data-action="delete-expense"]');if(!f||!confirm("Hapus pengeluaran ini?"))return;const h=String(f.dataset.id),u=Number.isNaN(Number(h))?h:Number(h);try{await An(u),p.removeExpense(u),window.showToast("Pengeluaran dihapus","success")}catch{window.showToast("Gagal hapus","error")}}),(T=document.getElementById("piutang-table"))==null||T.addEventListener("click",async L=>{const f=L.target.closest("[data-action]");if(!f)return;const h=String(f.dataset.id),u=Number.isNaN(Number(h))?h:Number(h),S=f.dataset.action,w=(p.state.transactions||t).find(k=>String(k.id)===h);if(w){if(S==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${b(w.total)} dari ${x(w.customerName||"pelanggan")} sudah diterima?`))return;const k={...w,paymentStatus:"transfer_confirmed",paidAmount:w.total,confirmedAt:new Date().toISOString()};try{await te(k),p.updateTransaction(u,{paymentStatus:"transfer_confirmed",paidAmount:w.total,confirmedAt:k.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}}if(S==="pay-debt"){const k=w.remainingDebt||0,v=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${b(w.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${b(k)}</div>
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
      `;at(v,"mini-cicil"),setTimeout(()=>{var B,A,_;(B=document.getElementById("mc-x"))==null||B.addEventListener("click",()=>U("mini-cicil")),(A=document.getElementById("mc-cancel"))==null||A.addEventListener("click",()=>U("mini-cicil")),(_=document.getElementById("mc-save"))==null||_.addEventListener("click",async()=>{var Q,j,$;const D=parseFloat((Q=document.getElementById("mc-amount"))==null?void 0:Q.value)||0;if(D<=0||D>k){window.showToast("Jumlah tidak valid","warning");return}const O=(w.paidAmount||0)+D,I=Math.max(0,k-D),K=I===0?"paid":"partial",W=(w.debtPayments||[]).length+1,J=I===0?`Pelunasan (#${W}/LUNAS ✅)`:`Cicilan #${W}`,P=(($=(j=document.getElementById("mc-note"))==null?void 0:j.value)==null?void 0:$.trim())||J,z=[...w.debtPayments||[],{date:new Date().toISOString(),amount:D,note:P}],V={...w,paidAmount:O,remainingDebt:I,paymentStatus:K,debtPayments:z};try{if(await te(V),p.updateTransaction(u,{paidAmount:O,remainingDebt:I,paymentStatus:K,debtPayments:z}),w.customerId||w.customerName){const C=(await Y()).find(M=>w.customerId&&String(M.id)===String(w.customerId)||(M.name||"").trim().toLowerCase()===(w.customerName||"").trim().toLowerCase());if(C){C.totalDebt=Math.max(0,(Number(C.totalDebt)||0)-D),await Ft(C);const M=await Y();p.setCustomers(M)}}U("mini-cicil"),window.showToast(I===0?"🎉 Hutang LUNAS!":`Cicilan #${W} (${b(D)}) dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)}}})};let pt=[],It=null,X="",pe=!1,ia=!1,Re=!1;const le={owner:{label:"👑 Owner",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},Xn=async()=>{X="",pe=!1,await qt(),Zn(),p.on("users:change",()=>{const t=document.getElementById("view-login");t!=null&&t.classList.contains("active")&&qt()})},qt=async()=>{var s;const t=document.getElementById("view-login");if(!t)return;navigator.onLine&&oe().catch(()=>{});let e=await Tt();if(pt=e.filter(n=>n.isActive!==!1),pt.length===0&&(await Ge(),e=await Tt(),pt=e.filter(n=>n.isActive!==!1)),pt.length===0||Re){t.innerHTML=`
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
    `;const n=document.getElementById("form-manual-login");n==null||n.addEventListener("submit",async i=>{var m,g;i.preventDefault();const o=document.getElementById("manual-login-username").value.trim(),r=document.getElementById("manual-login-pin").value.trim(),d=document.getElementById("manual-login-error"),l=document.getElementById("btn-submit-manual-login");if(d&&(d.style.display="none"),!o||!r)return;l&&(l.disabled=!0,l.textContent="Memverifikasi...");const c=await qe(o,r);if(l&&(l.disabled=!1,l.textContent="Masuk Sekarang ➔"),c.success){p.login(c.user,c.token);const y=c.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";(m=window.showToast)==null||m.call(window,`Berhasil masuk sebagai ${c.user.name} (${c.user.role})${y}`,"success"),navigator.onLine&&jt().catch(()=>{}),typeof window.appNavigateTo=="function"?window.appNavigateTo("pos"):(g=document.getElementById("dock-pos"))==null||g.click()}else d&&(d.textContent=c.error||"Username atau PIN salah.",d.style.display="block")}),(s=document.getElementById("btn-back-to-list"))==null||s.addEventListener("click",()=>{Re=!1,qt()});return}(!It||!pt.some(n=>String(n.id)===String(It)))&&(It=pt[0].id);const a=pt.find(n=>String(n.id)===String(It))||pt[0];le[a.role]||le.cashier,t.innerHTML=`
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
            ${pt.map(n=>{const i=String(n.id)===String(It),o=le[n.role]||le.cashier;return`
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
            <span>🔑</span> Masukkan <strong>6 digit PIN</strong> untuk <strong>${x(a.name)}</strong>
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
  `,Yn()},Yt=()=>{document.querySelectorAll("#login-pin-dots .pin-dot").forEach((e,a)=>{const s=a<X.length;e.style.background=s?"var(--primary, #2563eb)":"transparent",e.style.transform=s?"scale(1.18)":"scale(1)"})},oa=async(t=!1)=>{var c;if(pe)return;const e=pt.find(m=>String(m.id)===String(It));if(!e)return;const a=document.getElementById("login-error-msg"),s="bm_pin_lockout",n=()=>{try{const m=JSON.parse(localStorage.getItem(s)||"{}");return{count:Number(m.count)||0,until:Number(m.until)||0}}catch{return{count:0,until:0}}},i=(m,g)=>{try{localStorage.setItem(s,JSON.stringify({count:m,until:g}))}catch{}},o=n();if(o.until>Date.now()){const m=Math.ceil((o.until-Date.now())/1e3);a&&(a.textContent=`Sistem terkunci! Tunggu ${m} detik lagi.`),Ae(),X="",Yt();return}if(t&&X.length<6){a&&(a.textContent=`Masukkan 6 digit PIN (sudah ${X.length} digit)`),Ae();return}if(!t&&X.length!==6)return;pe=!0;const r=document.querySelector(".btn-numpad-key.btn-submit");r&&(r.textContent="⏳");const d=await qe(e.username,X);if(pe=!1,r&&(r.textContent="✓"),d.success){i(0,0),p.login(d.user,d.token);const m=d.isServerValidated?" (Terverifikasi Server)":" (Mode Offline)";if((c=window.showToast)==null||c.call(window,`Berhasil masuk sebagai ${d.user.name} (${d.user.role})${m}`,"success"),X="",navigator.onLine&&jt().catch(()=>{}),typeof window.appNavigateTo=="function")window.appNavigateTo("pos");else{const g=document.getElementById("dock-pos");g&&g.click()}return}const l=n().count+1;l>=5?(i(l,Date.now()+6e4),a&&(a.textContent="PIN salah 5 kali berturut-turut! Sistem terkunci 60 detik.")):(i(l,0),a&&(a.textContent=`${d.error||"PIN salah!"} (Sisa percobaan: ${5-l})`)),Ae(),X="",Yt()},Ae=()=>{const t=document.getElementById("login-pin-box");t&&(t.style.animation="none",t.offsetWidth,t.style.animation="shake 0.4s ease-in-out")},Yn=()=>{var t;document.querySelectorAll(".btn-login-op").forEach(e=>{e.addEventListener("click",()=>{It=e.getAttribute("data-id"),X="",qt()})}),document.querySelectorAll(".btn-numpad-key").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-val");Xt(a)})}),(t=document.getElementById("btn-toggle-manual"))==null||t.addEventListener("click",()=>{Re=!0,qt()})},Xt=t=>{const e=document.getElementById("login-error-msg");e&&(e.textContent=""),t==="clear"?(X="",Yt()):t==="backspace"?X.length>0&&(X=X.slice(0,-1),Yt()):t==="submit"?oa(!0):/^[0-9]$/.test(t)&&X.length<6&&(X+=t,Yt(),X.length===6&&oa(!1))},Zn=()=>{ia||(ia=!0,window.addEventListener("keydown",t=>{const e=document.getElementById("view-login");e!=null&&e.classList.contains("active")&&(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||(t.key>="0"&&t.key<="9"?(t.preventDefault(),Xt(t.key)):t.key==="Backspace"?(t.preventDefault(),Xt("backspace")):t.key==="Enter"?(t.preventDefault(),Xt("submit")):t.key==="Escape"&&(t.preventDefault(),Xt("clear"))))}))};let je="",ye="Semua",ce=null,ra=[];const ts=async()=>{const[t,e]=await Promise.all([dt(),Y()]);p.setProducts(t),p.setCustomers(e),Ka(),ce&&ce.abort(),ce=new AbortController;for(const a of ra)a();ra=[p.on("cart:change",Ha),p.on("products:change",()=>ne()),p.on("selectedCustomer:change",()=>Pt()),p.on("customers:change",()=>Pt())],ns(ce.signal)},Ka=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
              value="${p.state.discount||""}" min="0" max="99999999" placeholder="0" inputmode="numeric">
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
  `,Qe(),ne(),Pt(),Ha()},es=()=>["Semua",...new Set(p.state.products.map(t=>t.category))],Qe=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=es().map(e=>`
    <button class="cat-pill ${e===ye?"active":""}"
      data-cat="${x(e)}">${x(e)}</button>
  `).join(""))},ne=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=p.state.products;if(ye!=="Semua"&&(e=e.filter(a=>a.category===ye)),je){const a=je.toLowerCase();e=e.filter(s=>{var n;return s.name.toLowerCase().includes(a)||((n=s.sku)==null?void 0:n.toLowerCase().includes(a))})}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(a=>{const s=a.image?`<img src="${x(a.image)}" class="product-card__thumb" alt="${x(a.name)}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;margin-bottom:2px">`:`<div class="product-card__emoji">${a.emoji||"📦"}</div>`;return`
      <div class="product-card" data-id="${a.id}" role="button" tabindex="0"
        aria-label="${x(a.name)} — ${b(a.price)}">
        <span class="product-card__sku" style="font-size:9px;font-weight:700;color:var(--text-muted);background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:4px;padding:1px 4px;margin-bottom:2px">${x(a.sku||`BM-${a.id}`)}</span>
        ${s}
        <div class="product-card__name">${x(a.name)}</div>
        <div class="product-card__price">${b(a.price)}</div>
        <div class="product-card__unit">per ${x(a.unit)}</div>
      </div>
    `}).join(""),t.querySelectorAll(".product-card").forEach(a=>{const s=()=>{const n=a.dataset.id,i=p.state.products.find(o=>String(o.id)===String(n));i&&(p.addToCart(i),a.style.transform="scale(0.94)",setTimeout(()=>{a.style.transform=""},120))};a.addEventListener("click",s),a.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),s())})})},Ha=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),a=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),n=document.getElementById("tax-row"),i=document.getElementById("customer-name"),o=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=p.state.customerName||""),o&&!o.matches(":focus")&&(o.value=p.state.discount||""),!t)return;const r=p.state.cart;if(e){const d=e.textContent;e.textContent=p.cartCount,d!==String(p.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(a&&(a.textContent=b(p.total)),n&&s&&(p.tax>0?(n.style.display="flex",s.textContent=b(p.tax)):n.style.display="none"),!r.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=r.map(d=>{const l=d.product.image?`<img src="${d.product.image}" style="width:20px;height:20px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:4px">`:`${d.product.emoji||""} `;return`
      <div class="cart-item" data-pid="${d.product.id}">
        <div class="cart-item__info">
          <div class="cart-item__name">${l}${x(d.product.name)} <span style="font-size:10px;color:var(--text-muted)">(${x(d.product.sku||`BM-${d.product.id}`)})</span></div>
          <div class="cart-item__price">${b(d.product.price)} / ${x(d.product.unit)}</div>
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
    `}).join(""),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.pid,c=d.dataset.action,m=p.state.cart.find(g=>String(g.product.id)===String(l));m&&(c==="inc"?p.setQty(m.product.id,m.qty+1):c==="dec"?p.setQty(m.product.id,m.qty-1):c==="remove"&&p.removeFromCart(m.product.id))})})},as=()=>{const t=`
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
  `;at(t,"manual-item-modal"),setTimeout(()=>{var e,a,s,n;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>U("manual-item-modal")),(a=document.getElementById("mi-cancel"))==null||a.addEventListener("click",()=>U("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(o=>{o.style.borderColor="var(--border-subtle)",o.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(n=document.getElementById("mi-save"))==null||n.addEventListener("click",async()=>{var y,T,L,f,h,u,S;const i=(y=document.getElementById("mi-name"))==null?void 0:y.value.trim(),o=(T=document.getElementById("mi-price"))==null?void 0:T.value,r=parseFloat(o)||0,d=Math.max(1,parseInt((L=document.getElementById("mi-qty"))==null?void 0:L.value,10)||1),l=((f=document.getElementById("mi-unit"))==null?void 0:f.value.trim())||"pcs",c=((h=document.getElementById("mi-category"))==null?void 0:h.value)||"Lainnya",m=((u=document.getElementById("mi-emoji"))==null?void 0:u.value)||"🏷️",g=(S=document.getElementById("mi-save-catalog"))==null?void 0:S.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(o===""||r<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(g){const w=await Ta({name:i,price:r,unit:l,category:c,emoji:m,stock:999}),k=await dt();p.setProducts(k);const v=k.find(B=>B.id===w)||{id:w,name:i,price:r,unit:l,category:c,emoji:m};p.addToCart(v,d),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const w={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:i,price:r,unit:l,category:c,emoji:m};p.addToCart(w,d),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}U("manual-item-modal")}catch{window.showToast("Gagal menambahkan item manual!","error")}})},0)},ns=t=>{document.addEventListener("click",e=>{const a=e.target.closest(".cat-pill");if(a){ye=a.dataset.cat,Qe(),ne();return}if(e.target.closest("#btn-manual-item")){as();return}if(e.target.closest("#btn-pay-cash")){if(!p.state.cart.length){window.showToast("Keranjang kosong!","warning");return}_e("cash")}if(e.target.closest("#btn-pay-transfer")){if(!p.state.cart.length){window.showToast("Keranjang kosong!","warning");return}_e("transfer")}if(e.target.closest("#btn-pay-debt")){if(!p.state.cart.length){window.showToast("Keranjang kosong!","warning");return}_e("debt")}e.target.closest("#btn-clear-cart")&&p.state.cart.length&&(p.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{var a;if(e.target.id==="pos-search"&&(je=e.target.value.trim(),ne()),e.target.id==="discount-input"&&p.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"){const s=e.target.value.trim().toLowerCase();p.setCustomerName(e.target.value);const n=document.getElementById("cust-autocomplete-dropdown");if(!n)return;if(!s){n.style.display="none";return}const i=(p.state.customers||[]).filter(o=>(o.name||"").toLowerCase().includes(s)||(o.phone||"").includes(s)).slice(0,6);if(i.length===0){n.innerHTML=`
          <div style="padding:12px;font-size:12px;color:#64748b;display:flex;justify-content:space-between;align-items:center;background:#ffffff">
            <span>Pelanggan belum terdaftar</span>
            <button type="button" class="btn btn--sm btn--primary" id="btn-dropdown-quick-add" style="font-size:11px;padding:3px 10px;font-weight:700">
              ➕ Tambahkan
            </button>
          </div>
        `,n.style.display="block",(a=n.querySelector("#btn-dropdown-quick-add"))==null||a.addEventListener("click",()=>{n.style.display="none",Ht({name:e.target.value.trim()})});return}n.innerHTML=i.map(o=>`
        <div class="cust-option" data-id="${o.id}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:12px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;transition:background 100ms ease">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;color:#1e293b">${x(o.name)} <span class="badge" style="font-size:10px;font-weight:700;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px">${x(o.category||"Umum")}</span></div>
            <div style="font-size:11px;color:#64748b;margin-top:2px">📱 ${x(o.phone||"-")} ${o.address?`&bull; 📍 ${x(o.address)}`:""}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:8px">
            ${o.totalDebt>0?`<span style="color:#dc2626;font-weight:800;font-size:11px;display:block">Hutang: ${b(o.totalDebt)}</span>`:""}
            <span style="font-size:10px;color:#2563eb;font-weight:700">Pilih ➔</span>
          </div>
        </div>
      `).join(""),n.style.display="block",n.querySelectorAll(".cust-option").forEach(o=>{o.addEventListener("mouseenter",()=>{o.style.background="#f8fafc"}),o.addEventListener("mouseleave",()=>{o.style.background="#ffffff"}),o.addEventListener("click",()=>{const r=o.dataset.id,d=p.state.customers.find(l=>String(l.id)===String(r));d&&p.setSelectedCustomer(d),n.style.display="none",Pt()})})}},{signal:t}),document.addEventListener("click",e=>{const a=document.getElementById("cust-autocomplete-dropdown");a&&!e.target.closest("#customer-row-container")&&(a.style.display="none")},{signal:t})},Pt=()=>{var a,s,n,i;const t=document.getElementById("customer-row-container");if(!t)return;const e=p.state.selectedCustomer;e?(t.innerHTML=`
      <div class="selected-customer-chip" style="display:flex;align-items:center;justify-content:space-between;background:#eff6ff;border:1.5px solid #93c5fd;border-radius:10px;padding:8px 12px;margin:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <span style="font-size:18px;flex-shrink:0">👤</span>
          <div style="min-width:0">
            <div style="font-weight:800;font-size:13px;color:#1e3a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${x(e.name)} <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:6px;font-weight:700">${x(e.category||"Umum")}</span>
            </div>
            <div style="font-size:11px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              📱 ${x(e.phone||"-")} ${e.totalDebt>0?`&bull; <span style="color:#dc2626;font-weight:800">Hutang: ${b(e.totalDebt)}</span>`:""}
            </div>
          </div>
        </div>
        <button type="button" id="btn-clear-selected-cust" title="Kosongkan / Ganti Pelanggan" style="border-radius:50%;width:26px;height:26px;min-width:26px;padding:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#dc2626;background:#fee2e2;border:1px solid #fca5a5;cursor:pointer">
          ✕
        </button>
      </div>
    `,(a=t.querySelector("#btn-clear-selected-cust"))==null||a.addEventListener("click",()=>{p.setSelectedCustomer(null),p.setCustomerName(""),Pt()})):(t.innerHTML=`
      <div style="padding:8px 12px;display:flex;align-items:center;gap:6px;position:relative">
        <span style="font-size:16px;flex-shrink:0">👤</span>
        <div style="position:relative;flex:1;min-width:0">
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Cari nama / HP pelanggan..." maxlength="80" autocomplete="off"
            value="${x(p.state.customerName||"")}"
            style="width:100%;padding:6px 24px 6px 8px;font-size:12px;border:1px solid var(--border-default);border-radius:8px">
          ${p.state.customerName?`
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
    `,(s=t.querySelector("#btn-clear-typed-name"))==null||s.addEventListener("click",()=>{p.setCustomerName(""),Pt()}),(n=t.querySelector("#btn-pick-cust"))==null||n.addEventListener("click",()=>{ss()}),(i=t.querySelector("#btn-quick-add-cust"))==null||i.addEventListener("click",()=>{Ht()}))},ss=()=>{var r,d,l;const t=p.state.customers||[];let e="";const a=c=>{const m=c.trim().toLowerCase(),g=t.filter(y=>!m||(y.name||"").toLowerCase().includes(m)||(y.phone||"").includes(m)||(y.category||"").toLowerCase().includes(m));return g.length===0?`
        <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">
          Pelanggan tidak ditemukan.<br>
          <button type="button" class="btn btn--primary btn--sm" id="btn-picker-add-new" style="margin-top:10px">
            ➕ Tambah Pelanggan "${x(c)}"
          </button>
        </div>
      `:`
      <div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;padding-right:4px">
        ${g.map(y=>`
          <div class="picker-cust-row" data-id="${y.id}" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 120ms ease">
            <div style="min-width:0;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <strong style="font-size:13px;color:#1e293b">${x(y.name)}</strong>
                <span class="badge" style="font-size:10px;background:#dbeafe;color:#1e40af;padding:1px 6px;border-radius:4px;font-weight:700">${x(y.category||"Umum")}</span>
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px">
                📱 ${x(y.phone||"-")} ${y.address?`&bull; 📍 ${x(y.address)}`:""}
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:10px">
              ${y.totalDebt>0?`<div style="font-size:11px;font-weight:800;color:#dc2626">Hutang: ${b(y.totalDebt)}</div>`:""}
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
  `;at(s,"modal-customer-picker");const n=document.getElementById("picker-list-container"),i=document.getElementById("picker-search"),o=()=>{var c;n==null||n.querySelectorAll(".picker-cust-row").forEach(m=>{m.addEventListener("mouseenter",()=>{m.style.background="#f0f7ff",m.style.borderColor="#93c5fd"}),m.addEventListener("mouseleave",()=>{m.style.background="#ffffff",m.style.borderColor="#e2e8f0"}),m.addEventListener("click",()=>{const g=m.dataset.id,y=t.find(T=>String(T.id)===String(g));y&&(p.setSelectedCustomer(y),U("modal-customer-picker"),Pt())})}),(c=n==null?void 0:n.querySelector("#btn-picker-add-new"))==null||c.addEventListener("click",()=>{var m;U("modal-customer-picker"),Ht({name:(m=i==null?void 0:i.value)==null?void 0:m.trim()})})};o(),i==null||i.addEventListener("input",c=>{e=c.target.value,n&&(n.innerHTML=a(e),o())}),(r=document.getElementById("modal-picker-close"))==null||r.addEventListener("click",()=>U("modal-customer-picker")),(d=document.getElementById("picker-cancel-btn"))==null||d.addEventListener("click",()=>U("modal-customer-picker")),(l=document.getElementById("picker-create-btn"))==null||l.addEventListener("click",()=>{U("modal-customer-picker"),Ht()})},is=async()=>{const t=document.getElementById("view-pos");t!=null&&t.querySelector(".pos-layout")||Ka();const e=await dt();p.setProducts(e),ne(),Qe()},os=(t,e=128,a=.85)=>new Promise((s,n)=>{if(!(t!=null&&t.type.startsWith("image/")))return n(new Error("File harus berupa gambar (PNG/JPEG/WebP)"));const i=new FileReader;i.onerror=()=>n(new Error("Gagal membaca file")),i.onload=o=>{const r=new Image;r.onerror=()=>n(new Error("Gagal memuat gambar")),r.onload=()=>{let{width:d,height:l}=r;d>l?d>e&&(l=Math.round(l*e/d),d=e):l>e&&(d=Math.round(d*e/l),l=e);const c=document.createElement("canvas");c.width=d,c.height=l,c.getContext("2d").drawImage(r,0,0,d,l);let g="";try{g=c.toDataURL("image/webp",a)}catch{}g!=null&&g.startsWith("data:image/webp")||(g=c.toDataURL("image/jpeg",a)),s(g)},r.src=o.target.result},i.readAsDataURL(t)}),rs=(t=[])=>{let e=0;for(const s of t)if(s.sku&&typeof s.sku=="string"){const n=s.sku.match(/^BM-(\d+)$/i);if(n){const i=parseInt(n[1],10);i>e&&(e=i)}}const a=e?e+1:t.length+1;return`BM-${String(a).padStart(3,"0")}`},da=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],ds=["Galon","Botol","Layanan","Lainnya"];let Ce=null;const ls=async()=>{Ce&&Ce(),Ce=p.on("products:change",()=>{const t=document.getElementById("view-products");t!=null&&t.classList.contains("active")&&se()}),await se()},se=async()=>{const t=document.getElementById("view-products"),e=await dt();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(a=>cs(a)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,ps()},cs=t=>{const e=t.image?`<img src="${x(t.image)}" class="product-thumb" alt="${x(t.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;border:1.5px solid var(--border-subtle)">`:`<span class="product-emoji-large">${t.emoji||"📦"}</span>`;return`
    <div class="product-manage-card" data-id="${t.id}">
      <div class="product-manage-card__header">
        ${e}
        <div class="product-manage-card__info">
          <div class="product-manage-card__name">${x(t.name)}</div>
          <div class="product-manage-card__cat" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="badge badge--blue">${x(t.category)}</span>
            <span class="badge" style="background:var(--bg-glass);border:1px solid var(--border-default);font-size:10px;font-weight:700;color:var(--text-secondary)">${x(t.sku||`BM-${t.id}`)}</span>
          </div>
        </div>
      </div>
      <div class="product-manage-card__price">
        ${b(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${x(t.unit)}</span>
        ${t.cost>0?`<div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-top:2px">Modal: ${b(t.cost)} &bull; Margin: ${b(t.price-t.cost)}</div>`:""}
      </div>
      <div class="product-manage-card__actions">
        <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `},ps=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",async()=>{const a=await dt();la(null,a)}),t==null||t.addEventListener("click",async a=>{const s=a.target.closest('[data-action="edit"]'),n=a.target.closest('[data-action="delete"]');if(s){const i=String(s.dataset.id),o=await dt(),r=o.find(d=>String(d.id)===i);r&&la(r,o)}if(n){const i=String(n.dataset.id),o=Number.isNaN(Number(i))?i:Number(i);us(o)}})},la=(t=null,e=[])=>{const a=!!t,s=(t==null?void 0:t.sku)||rs(e);let n=(t==null?void 0:t.image)||null;const i=`
    <div class="modal-header">
      <span class="modal-title">${a?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
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
          ${ds.map(o=>`<option value="${x(o)}" ${(t==null?void 0:t.category)===o?"selected":""}>${x(o)}</option>`).join("")}
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
            ${da.map(o=>`
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

        <input type="hidden" id="pf-emoji" value="${x((t==null?void 0:t.emoji)||da[0])}">
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
  `;at(i,"product-form"),setTimeout(()=>{var g,y,T,L;(g=document.getElementById("pf-close"))==null||g.addEventListener("click",()=>U("product-form")),(y=document.getElementById("pf-cancel"))==null||y.addEventListener("click",()=>U("product-form"));const o=document.getElementById("btn-tab-emoji"),r=document.getElementById("btn-tab-upload"),d=document.getElementById("box-emoji-picker"),l=document.getElementById("box-upload-picker"),c=document.getElementById("pf-file-input"),m=document.getElementById("pf-img-preview");o==null||o.addEventListener("click",()=>{d.style.display="block",l.style.display="none",o.className="btn btn--sm btn--primary",r.className="btn btn--sm btn--secondary"}),r==null||r.addEventListener("click",()=>{d.style.display="none",l.style.display="block",r.className="btn btn--sm btn--primary",o.className="btn btn--sm btn--secondary"}),c==null||c.addEventListener("change",async f=>{var u;const h=(u=f.target.files)==null?void 0:u[0];if(h)try{n=await os(h,128,.85),m.innerHTML=`<img src="${x(n)}" style="width:100%;height:100%;object-fit:cover">`,window.showToast("Foto produk berhasil dimuat","success")}catch(S){window.showToast(S.message||"Gagal memproses gambar","error")}}),(T=document.getElementById("btn-remove-img"))==null||T.addEventListener("click",()=>{n=null,m.innerHTML='<span style="font-size:20px;opacity:0.4">🖼️</span>',o.click()}),document.querySelectorAll(".emoji-pick").forEach(f=>{f.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(h=>{h.style.borderColor="var(--border-subtle)",h.classList.remove("emoji-pick--active")}),f.style.borderColor="var(--blue-400)",f.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=f.dataset.emoji,n=null})}),(L=document.getElementById("pf-save"))==null||L.addEventListener("click",async()=>{var A,_,D,O,I,K,W,J;const f=(A=document.getElementById("pf-name"))==null?void 0:A.value.trim(),h=((_=document.getElementById("pf-sku"))==null?void 0:_.value.trim())||s,u=parseFloat((D=document.getElementById("pf-price"))==null?void 0:D.value)||0,S=parseFloat((O=document.getElementById("pf-cost"))==null?void 0:O.value)||0,w=((I=document.getElementById("pf-unit"))==null?void 0:I.value.trim())||"pcs",k=((K=document.getElementById("pf-category"))==null?void 0:K.value)||"Lainnya",v=((W=document.getElementById("pf-emoji"))==null?void 0:W.value)||"📦",B=parseInt((J=document.getElementById("pf-stock"))==null?void 0:J.value,10)||0;if(!f){window.showToast("Nama produk wajib diisi!","warning");return}if(u<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{const P={name:f,sku:h,price:u,cost:S,unit:w,category:k,emoji:v,image:n,stock:B};a?(await Ia({...t,...P}),window.showToast(`Produk [${h}] berhasil diperbarui`,"success")):(await Ta(P),window.showToast(`Produk [${h}] berhasil ditambahkan`,"success")),U("product-form");const z=await dt();p.setProducts(z),await se()}catch{window.showToast("Gagal menyimpan produk!","error")}})},0)},us=t=>{at(`
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
  `,"delete-confirm"),setTimeout(()=>{var a,s,n;(a=document.getElementById("dc-close"))==null||a.addEventListener("click",()=>U("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>U("delete-confirm")),(n=document.getElementById("dc-confirm"))==null||n.addEventListener("click",async()=>{try{await _n(t);const i=await dt();p.setProducts(i),U("delete-confirm"),await se(),window.showToast("Produk dihapus","success")}catch{window.showToast("Gagal menghapus produk","error")}})},0)};let Ne=null,ue=null,me=null,kt="semua",st=1;const ms=async()=>{Ne&&Ne(),Ne=p.on("transactions:change",t=>{Zt(t)}),await Xe()},Xe=async()=>{const t=await mt();p.setTransactions(t),Zt(t)},Zt=t=>{var O,I,K,W,J;const e=document.getElementById("view-reports");if(!e)return;const a=it(),s=on(),n=t.filter(P=>P.dateKey===a),i=n.reduce((P,z)=>P+z.total,0);let o=0;t.forEach(P=>{(P.items||[]).forEach(z=>{var Q;const V=Number((Q=z.product)==null?void 0:Q.cost)||0;o+=V*(Number(z.qty)||1)})});const r=t.reduce((P,z)=>P+z.total,0),d=Math.max(0,r-o),l=r>0?(d/r*100).toFixed(1):0,c=n.length,m=t.filter(P=>{var z;return(z=P.dateKey)==null?void 0:z.startsWith(s)}),g=m.reduce((P,z)=>P+z.total,0),y=t.reduce((P,z)=>P+z.total,0),T=n.filter(P=>P.paymentMethod==="cash").reduce((P,z)=>P+z.total,0),L=n.filter(P=>P.paymentMethod==="transfer"&&P.paymentStatus==="transfer_confirmed").reduce((P,z)=>P+z.total,0),f=n.filter(P=>P.paymentMethod==="transfer"&&P.paymentStatus==="transfer_pending").reduce((P,z)=>P+z.total,0),h=n.filter(P=>P.paymentMethod==="debt").reduce((P,z)=>P+z.total,0),u=t.reduce((P,z)=>{for(const V of z.debtPayments||[])V.date&&V.date.split("T")[0]===a&&(P+=V.amount||0);return P},0),S=T+L+u,w=t.reduce((P,z)=>P+(z.remainingDebt||0),0);t.filter(P=>P.paymentStatus==="transfer_pending").reduce((P,z)=>P+z.total,0);const k=hs(n),v=ys(t);ue&&(ue.destroy(),ue=null),me&&(me.destroy(),me=null);let B=[...t];kt==="cash"&&(B=B.filter(P=>P.paymentMethod==="cash")),kt==="transfer"&&(B=B.filter(P=>P.paymentMethod==="transfer")),kt==="debt"&&(B=B.filter(P=>P.paymentMethod==="debt"));const A=B.sort((P,z)=>new Date(z.date)-new Date(P.date)),_=Math.max(1,Math.ceil(A.length/10));st>_&&(st=_),st<1&&(st=1);const D=A.slice((st-1)*10,st*10);e.innerHTML=`
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
        <div class="stat-card__value" style="color:#16a34a">${b(S)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${b(u)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${b(w)}</div>
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
        <div class="stat-card__value">${b(y)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${t.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #059669">
        <span class="stat-card__icon">📈</span>
        <div class="stat-card__value" style="color:#059669">${b(d)}</div>
        <div class="stat-card__label">Estimasi Laba Kotor (Gross Profit)</div>
        <div class="stat-card__trend" style="color:#059669;font-weight:700">Margin: ${l}% (HPP: ${b(o)})</div>
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
            <strong style="color:#2563eb">${b(L)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${b(u)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${b(h)}</strong>
          </div>

          ${f>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${b(f)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${T+L+h+u>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${k.length?k.slice(0,7).map((P,z)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${z+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${x(P.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${P.qty}x</span>
            </div>
          `).join(""):'<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px">Belum ada penjualan hari ini</div>'}
      </div>
    </div>

    <!-- Detailed Ledger & Transaction Analysis Table -->
    <div class="card card--elevated" style="overflow:hidden;padding:0">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle)">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:800;text-transform:uppercase;letter-spacing:.05em">
          📋 Analisis Detail Penjualan &amp; Status Pelunasan (${A.length} data)
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="cat-pill ${kt==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${kt==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${kt==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${kt==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${gs(D)}
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
  `,(O=document.getElementById("btn-refresh-reports"))==null||O.addEventListener("click",Xe),(I=document.getElementById("btn-export-pdf-report"))==null||I.addEventListener("click",()=>fs(t,a,s)),(K=document.getElementById("btn-export-csv-report"))==null||K.addEventListener("click",()=>{var Q;const P=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status Pembayaran","Subtotal","Diskon","Pajak","Grand Total","Sisa Piutang"],z=A.map(j=>[vt(new Date(j.date)),j.invoiceNo||"",j.cashier||"Admin",j.customerName||"-",j.paymentMethod||"cash",j.paymentStatus||"paid",j.subtotal||0,j.discount||0,j.tax||0,j.total||0,j.remainingDebt||0]),V=it();Ve(`Laporan-Penjualan-${V}.csv`,P,z),(Q=window.showToast)==null||Q.call(window,"✅ Laporan penjualan berhasil diekspor ke Excel/CSV!","success")}),(W=document.getElementById("rpt-prev"))==null||W.addEventListener("click",()=>{st>1&&(st--,Zt(t))}),(J=document.getElementById("rpt-next"))==null||J.addEventListener("click",()=>{st<_&&(st++,Zt(t))}),document.querySelectorAll("[data-rpt-filter]").forEach(P=>{P.addEventListener("click",()=>{kt=P.dataset.rptFilter,st=1,Zt(t)})}),requestAnimationFrame(()=>bs(v,T,L,h,u))},gs=t=>t.length?t.map(e=>{const a=e.total||0;let s=0,n=0;e.paymentMethod==="cash"?s=a:e.paymentMethod==="transfer"?e.paymentStatus==="transfer_confirmed"?s=a:n=a:e.paymentMethod==="debt"&&(s=e.paidAmount||0,n=e.remainingDebt||0);const i=(e.items||[]).map(d=>{var l;return`${((l=d.product)==null?void 0:l.name)||"Item"} (${d.qty}x)`}).join(", "),o=e.paymentMethod==="debt"?n===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${b(n)}</span>`:e.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',r=e.paymentMethod==="cash"?"💵 Tunai":e.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${x(e.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${vt(new Date(e.date))}</td>
        <td><strong style="color:var(--text-primary)">${x(e.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${x(i)}">${x(i||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${b(a)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${b(s)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${n>0?b(n):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${r}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>',bs=async(t,e,a,s,n)=>{const{Chart:i,registerables:o}=await ge(async()=>{const{Chart:c,registerables:m}=await import("./vendor-chart-BLYve-2S.js");return{Chart:c,registerables:m}},[],import.meta.url);i.register(...o);const r=document.getElementById("chart-bar");r&&(ue=new i(r,{type:"bar",data:{labels:t.map(c=>c.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(c=>c.total),backgroundColor:t.map((c,m)=>m===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${b(c.raw)}`}}},scales:{y:{beginAtZero:!0,ticks:{callback:c=>b(c),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const d=document.getElementById("chart-donut"),l=e+a+s+n;d&&l>0&&(me=new i(d,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,a,s,n],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.label}: ${b(c.raw)}`}}}}}))},fs=async(t,e,a)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:n}=await ge(async()=>{const{jsPDF:v}=await import("./vendor-jspdf-BEqUCB1L.js").then(B=>B.j);return{jsPDF:v}},[],import.meta.url),{default:i}=await ge(async()=>{const{default:v}=await import("./jspdf.plugin.autotable-CSRlgf-4.js").then(B=>B.j);return{default:v}},__vite__mapDeps([0,1,2]),import.meta.url),o=new n({orientation:"portrait",unit:"mm",format:"a4"}),r=p.state.settings,d=o.internal.pageSize.getWidth();o.setFontSize(16),o.setFont("helvetica","bold"),o.text(r.shopName||"Blue Mountain Refilling Station",d/2,16,{align:"center"}),o.setFontSize(10),o.setFont("helvetica","normal"),o.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",d/2,22,{align:"center"}),o.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,d/2,27,{align:"center"});const l=t.filter(v=>v.dateKey===e),c=l.reduce((v,B)=>v+B.total,0),m=t.filter(v=>{var B;return(B=v.dateKey)==null?void 0:B.startsWith(a)}).reduce((v,B)=>v+B.total,0),g=t.reduce((v,B)=>v+B.total,0),y=l.filter(v=>v.paymentMethod==="cash").reduce((v,B)=>v+B.total,0),T=l.filter(v=>v.paymentMethod==="transfer"&&v.paymentStatus==="transfer_confirmed").reduce((v,B)=>v+B.total,0),L=t.reduce((v,B)=>{for(const A of B.debtPayments||[])A.date&&A.date.split("T")[0]===e&&(v+=A.amount||0);return v},0),f=y+T+L,h=t.reduce((v,B)=>v+(B.remainingDebt||0),0);o.setFontSize(11),o.setFont("helvetica","bold"),o.text("1. Ringkasan Kinerja Keuangan",14,35);const u=[["Omzet Gross Hari Ini",b(c)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",b(f)],["Cicilan Piutang Terkumpul Hari Ini",b(L)],["Total Piutang Belum Lunas (Semua Pelanggan)",b(h)],["Omzet Bulan Ini",b(m)],["Total Omzet All-Time",b(g)],["Jumlah Transaksi Hari Ini",`${l.length} transaksi`]];i(o,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:u,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const S=o.lastAutoTable.finalY+10;o.setFontSize(11),o.setFont("helvetica","bold"),o.text("2. Rincian Riwayat Transaksi & Pelunasan",14,S);const w=[...t].sort((v,B)=>new Date(B.date)-new Date(v.date)).slice(0,80);i(o,{startY:S+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:w.map(v=>{const B=v.paymentMethod==="cash"?v.total:v.paymentMethod==="transfer"?v.paymentStatus==="transfer_confirmed"?v.total:0:v.paidAmount||0,A=v.paymentMethod==="debt"?v.remainingDebt||0:v.paymentStatus==="transfer_pending"?v.total:0;return[v.invoiceNo||"-",new Date(v.date).toLocaleDateString("id-ID"),v.customerName||"—",v.paymentMethod==="cash"?"Tunai":v.paymentMethod==="transfer"?"Transfer":"Hutang",b(v.total),b(B),A>0?b(A):"—",v.paymentMethod==="debt"?A===0?"Lunas":"Cicilan":v.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const k=o.internal.getNumberOfPages();for(let v=1;v<=k;v++)o.setPage(v),o.setFontSize(8),o.setFont("helvetica","normal"),o.text(`Hal ${v} dari ${k} — ${r.shopName||"Blue Mountain POS"}`,d/2,o.internal.pageSize.getHeight()-8,{align:"center"});o.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch{window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},ys=t=>{const e=[];for(let a=6;a>=0;a--){const s=new Date;s.setDate(s.getDate()-a);const n=it(s),i=t.filter(r=>r.dateKey===n).reduce((r,d)=>r+d.total,0),o=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);e.push({key:n,label:o,total:i})}return e},hs=t=>{var a;const e={};for(const s of t)for(const n of s.items||[]){if(!((a=n==null?void 0:n.product)!=null&&a.name))continue;const i=n.product.name;e[i]=(e[i]||0)+n.qty}return Object.entries(e).map(([s,n])=>({name:s,qty:n})).sort((s,n)=>n.qty-s.qty)},vs=async()=>{await ws(),await Ot()},xs=["shopName","shopAddress","shopPhone","cashierName","receiptFooter","modalAwal","taxRate","bankName","bankNumber","bankHolder","qrisNumber","printerPaper"],ws=async()=>{const t={};for(const e of xs){const a=await Fe(e);a!==null&&(t[e]=a)}p.updateSettings(t)},Ot=async()=>{const t=document.getElementById("view-settings");if(!t)return;const e=p.state.settings,a="1.6.0",s="adc3c09",n="2026-09-12T08:22:57.395Z",i=new Date(n),o=new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"short",year:"numeric"}).format(i),r=new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(i),d=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,l=p.state.currentUser,c=ut(),m=(e.qrisNumber||"").trim(),g=m.length>20&&m.startsWith("000201");t.innerHTML=`
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
            ${x((l==null?void 0:l.name)||"Belum Masuk")}
          </span>
          <span class="badge badge--blue" style="text-transform:uppercase;font-weight:700">
            ${x((l==null?void 0:l.role)||"-")}
          </span>
          <span class="badge badge--green" style="font-size:11px">
            ID: ${x((l==null?void 0:l.username)||"-")}
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
        <input type="text" class="input" id="set-shopName" value="${x(e.shopName||"Blue Mountain Refilling Station")}" maxlength="80" placeholder="Blue Mountain Refilling Station" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat Lengkap Usaha</div>
          <div class="settings-row__desc">Alamat fisik outlet yang dicetak pada bagian atas struk</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${x(e.shopAddress||"")}" maxlength="140" placeholder="Jl. Garuda No. 42, RT 02/RW 05" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon / WhatsApp</div>
          <div class="settings-row__desc">Nomor narahubung pemesanan galon / customer care</div>
        </div>
        <input type="tel" class="input" id="set-shopPhone" value="${x(e.shopPhone||"")}" maxlength="25" placeholder="0812-3456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Label Nama Kasir Default</div>
          <div class="settings-row__desc">Nama kasir fallback yang dicetak di struk bila nama staf tidak terbaca</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${x(e.cashierName||"Kasir")}" maxlength="40" placeholder="Kasir" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Pesan Penutup Struk (Footer)</div>
          <div class="settings-row__desc">Ucapan penutup atau slogan yang dicetak di bagian paling bawah struk thermal</div>
        </div>
        <input type="text" class="input" id="set-receiptFooter" value="${x(e.receiptFooter||"Terima kasih sudah berbelanja!")}" maxlength="80" placeholder="Terima kasih sudah berbelanja!" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Saldo Modal Awal Kas Laci Harian (Rp)</div>
          <div class="settings-row__desc">Uang kembalian awal di laci kasir untuk menghitung keseimbangan neraca kas harian</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="number" class="input" id="set-modalAwal" value="${e.modalAwal||0}" min="0" step="5000" style="max-width:180px">
          <span style="font-size:12px;font-weight:700;color:var(--blue-700)">
            (${b(e.modalAwal||0)})
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Tarif Pajak Penjualan Toko (%)</div>
          <div class="settings-row__desc">Isi 0 jika toko tidak mengenakan PPN / pajak tambahan</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <input type="number" class="input" id="set-taxRate" value="${e.taxRate||0}" min="0" max="100" step="0.5" style="max-width:100px">
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
        <input type="text" class="input" id="set-bankName" value="${x(e.bankName||"BCA")}" maxlength="30" placeholder="BCA / Mandiri / BRI" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
          <div class="settings-row__desc">Nomor rekening tujuan transfer yang tampil di modal bayar &amp; struk</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${x(e.bankNumber||"")}" maxlength="35" placeholder="Contoh: 123-456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Pemilik Rekening (Atas Nama)</div>
          <div class="settings-row__desc">Nama pemilik sah rekening untuk verifikasi pembeli</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${x(e.bankHolder||"")}" maxlength="60" placeholder="Contoh: Fadhilah Ramadhan" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">
            String EMVCo QRIS resmi toko Anda. Sistem otomatis menginjeksi nominal belanja (Tag 54) secara dinamis dengan nol komisi pihak ketiga.
            ${m?g?'<span class="badge badge--green" style="margin-left:6px">✅ Format QRIS Valid</span>':'<span class="badge badge--yellow" style="margin-left:6px">⚠️ Format belum standar EMVCo</span>':""}
          </div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:320px;font-size:11px;font-family:monospace;line-height:1.4" placeholder="0002010102122659...">${x(e.qrisNumber||"")}</textarea>
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
          <option value="48mm" ${e.printerPaper==="48mm"?"selected":""}>48mm (EDC / Mini Portable Bluetooth)</option>
          <option value="58mm" ${!e.printerPaper||e.printerPaper==="58mm"?"selected":""}>58mm (Standar Mini POS Bluetooth)</option>
          <option value="80mm" ${e.printerPaper==="80mm"?"selected":""}>80mm (Thermal Besar / Desktop / Kasir Luas)</option>
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
            ${x(c)}
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
            v${x(a)}${` (${x(s)})`}
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
  `,ks()},ks=()=>{var t,e,a,s,n,i,o,r,d,l,c,m,g,y,T,L;(t=document.getElementById("btn-save-settings"))==null||t.addEventListener("click",async()=>{var P,z,V,Q,j,$,N,C,M,H,q,G,R,F,lt,gt;const f=(P=document.getElementById("set-shopName"))==null?void 0:P.value.trim();if(!f){(z=window.showToast)==null||z.call(window,"Nama toko tidak boleh kosong!","warning"),(V=document.getElementById("set-shopName"))==null||V.focus();return}const h=(Q=document.getElementById("set-shopAddress"))==null?void 0:Q.value.trim(),u=(j=document.getElementById("set-shopPhone"))==null?void 0:j.value.trim(),S=($=document.getElementById("set-cashierName"))==null?void 0:$.value.trim(),w=(N=document.getElementById("set-receiptFooter"))==null?void 0:N.value.trim(),k=(C=document.getElementById("set-modalAwal"))==null?void 0:C.value,v=Math.max(0,parseInt(k,10)||0),B=(M=document.getElementById("set-taxRate"))==null?void 0:M.value;let A=parseFloat(B)||0;A<0&&(A=0),A>100&&(A=100);const _=(H=document.getElementById("set-bankName"))==null?void 0:H.value.trim(),D=(q=document.getElementById("set-bankNumber"))==null?void 0:q.value.trim(),O=(G=document.getElementById("set-bankHolder"))==null?void 0:G.value.trim(),I=(R=document.getElementById("set-qrisNumber"))==null?void 0:R.value.trim(),K=((F=document.getElementById("set-printerPaper"))==null?void 0:F.value)||"58mm",W={shopName:f,shopAddress:h,shopPhone:u,cashierName:S,receiptFooter:w,modalAwal:v,taxRate:A,bankName:_,bankNumber:D,bankHolder:O,qrisNumber:I,printerPaper:K},J=document.getElementById("btn-save-settings");J&&(J.textContent="⏳ Menyimpan...",J.disabled=!0);try{for(const[ct,xe]of Object.entries(W))await _a(ct,xe),ka(ct,xe).catch(()=>{});p.updateSettings(W),(lt=window.showToast)==null||lt.call(window,"✅ Pengaturan toko berhasil disimpan & disinkronkan ke cloud!","success"),setTimeout(()=>Ot(),500)}catch(ct){(gt=window.showToast)==null||gt.call(window,`Gagal menyimpan pengaturan: ${ct.message||"Error"}`,"error")}finally{J&&(J.textContent="💾 Simpan Semua Pengaturan",J.disabled=!1)}}),(e=document.getElementById("btn-settings-switch-op"))==null||e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))}),(a=document.getElementById("btn-settings-logout"))==null||a.addEventListener("click",()=>{confirm("Kunci kasir dan keluar dari sesi operator saat ini?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(s=document.getElementById("btn-test-48"))==null||s.addEventListener("click",()=>{Te("48mm")}),(n=document.getElementById("btn-test-58"))==null||n.addEventListener("click",()=>{Te("58mm")}),(i=document.getElementById("btn-test-80"))==null||i.addEventListener("click",()=>{Te("80mm")}),(o=document.getElementById("btn-printer-guide"))==null||o.addEventListener("click",()=>{Ss()}),(r=document.getElementById("btn-copy-master-key"))==null||r.addEventListener("click",()=>{var h;const f=ut();(h=navigator.clipboard)==null||h.writeText(f).then(()=>{var u;(u=window.showToast)==null||u.call(window,`✅ Master Store ID (${f}) berhasil disalin!`,"success")})}),(d=document.getElementById("btn-set-master-key"))==null||d.addEventListener("click",async()=>{var u;const f=ut(),h=prompt("Masukkan Master Store ID Partisi Toko Anda:",f);h!=null&&h.trim()&&h.trim()!==f&&(dn(h.trim()),ha(),await jt(),(u=window.showToast)==null||u.call(window,`✅ Terminal dihubungkan ke Store ID: ${h.trim()}`,"success"),Ot())}),(l=document.getElementById("btn-sync-cloud-now"))==null||l.addEventListener("click",async()=>{var h,u;const f=document.getElementById("btn-sync-cloud-now");f&&(f.textContent="🔄 Menyinkronkan...",f.disabled=!0);try{await jt(),(h=window.showToast)==null||h.call(window,"✅ Semua data, transaksi & akun berhasil disinkronkan!","success"),setTimeout(()=>Ot(),600)}catch(S){(u=window.showToast)==null||u.call(window,`Gagal sinkron cloud: ${S.message||"Error"}`,"error")}finally{f&&(f.textContent="⚡ Sinkronkan Sekarang",f.disabled=!1)}}),(c=document.getElementById("btn-export-backup"))==null||c.addEventListener("click",async()=>{var h,u;const f=document.getElementById("btn-export-backup");f&&(f.textContent="⏳ Menyiapkan...",f.disabled=!0);try{const S=await Nn(),w=JSON.stringify(S,null,2),k=new Blob([w],{type:"application/json;charset=utf-8"}),v=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),A=`Backup-KASIR-${(S.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${v}.json`,_=URL.createObjectURL(k),D=document.createElement("a");D.href=_,D.download=A,document.body.appendChild(D),D.click(),document.body.removeChild(D),setTimeout(()=>URL.revokeObjectURL(_),5e3),(h=window.showToast)==null||h.call(window,"✅ File cadangan berhasil diunduh!","success")}catch(S){(u=window.showToast)==null||u.call(window,`Gagal ekspor cadangan: ${S.message||"Error"}`,"error")}finally{f&&(f.textContent="📥 Unduh Cadangan JSON",f.disabled=!1)}}),(m=document.getElementById("btn-trigger-import"))==null||m.addEventListener("click",()=>{var f;(f=document.getElementById("input-import-backup"))==null||f.click()}),(g=document.getElementById("input-import-backup"))==null||g.addEventListener("change",f=>{var S;const h=(S=f.target.files)==null?void 0:S[0];if(!h)return;const u=new FileReader;u.onload=async w=>{var k,v,B;try{const A=(k=w.target)==null?void 0:k.result,_=JSON.parse(A);if(!_.data||!_.data.products&&!_.data.transactions){(v=window.showToast)==null||v.call(window,"Format file cadangan tidak dikenali!","error");return}const D=(_.data.products||[]).length,O=(_.data.customers||[]).length,I=(_.data.transactions||[]).length,K=(_.data.expenses||[]).length,W=_.exportedAt?new Date(_.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",J=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Pemulihan Cadangan Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>Arsip Cadangan Terverifikasi:</strong><br>
              Toko: <strong>${x(_.shopName||"Blue Mountain")}</strong><br>
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
                <div style="font-size:15px;font-weight:900;color:#16a34a">${I}</div>
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
        `;at(J,"import-confirm-modal"),setTimeout(()=>{var P,z,V;(P=document.getElementById("imp-x"))==null||P.addEventListener("click",()=>U("import-confirm-modal")),(z=document.getElementById("imp-cancel"))==null||z.addEventListener("click",()=>U("import-confirm-modal")),(V=document.getElementById("imp-confirm"))==null||V.addEventListener("click",async()=>{var $,N,C,M,H,q,G;const Q=(($=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:$.value)||"replace",j=document.getElementById("imp-confirm");j&&(j.textContent="⏳ Memulihkan...",j.disabled=!0);try{await Mn(_,Q);const[R,F,lt,gt]=await Promise.all([dt(),Y(),mt(),ee()]);(N=p.setProducts)==null||N.call(p,R),(C=p.setCustomers)==null||C.call(p,F),(M=p.setTransactions)==null||M.call(p,lt),(H=p.setExpenses)==null||H.call(p,gt),U("import-confirm-modal"),(q=window.showToast)==null||q.call(window,"🎉 Data berhasil dipulihkan!","success"),setTimeout(()=>Ot(),600)}catch(R){(G=window.showToast)==null||G.call(window,`Gagal memulihkan data: ${R.message}`,"error")}})},0)}catch{(B=window.showToast)==null||B.call(window,"File JSON cadangan rusak atau tidak terbaca!","error")}},u.readAsText(h),f.target.value=""}),(y=document.getElementById("btn-install-pwa"))==null||y.addEventListener("click",()=>{var f;window._pwaPrompt?window._pwaPrompt.prompt():(f=window.showToast)==null||f.call(window,"Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(T=document.getElementById("btn-clear-cache"))==null||T.addEventListener("click",async()=>{var f,h;try{if("caches"in window){const u=await caches.keys();await Promise.all(u.map(S=>caches.delete(S)))}if("serviceWorker"in navigator){const u=await navigator.serviceWorker.getRegistrations();for(const S of u)await S.unregister()}(f=window.showToast)==null||f.call(window,"Cache browser dibersihkan. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch{(h=window.showToast)==null||h.call(window,"Gagal membersihkan cache","error")}}),(L=document.getElementById("btn-reset-all"))==null||L.addEventListener("click",async()=>{var h,u,S;const f=prompt(`⚠️ PERINGATAN: PEMBERSIHAN CACHE DATA LOKAL

Tindakan ini mengosongkan salinan data offline di browser ini (produk, transaksi, pelanggan, beban).

Ketik kata "HAPUS" dengan huruf besar untuk melanjutkan:`);if(f==="HAPUS")try{await Cn(),(h=window.showToast)==null||h.call(window,"Data lokal dibersihkan. Memuat ulang dari cloud...","info"),setTimeout(()=>window.location.reload(),1500)}catch{(u=window.showToast)==null||u.call(window,"Gagal mengosongkan data lokal","error")}else f!==null&&((S=window.showToast)==null||S.call(window,"Tindakan dibatalkan (konfirmasi tidak sesuai)","info"))})},Ss=()=>{at(`
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
  `,"printer-guide"),setTimeout(()=>{var e,a;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>U("printer-guide")),(a=document.getElementById("pg-close2"))==null||a.addEventListener("click",()=>U("printer-guide"))},0)};let Me=null,St=it(),Et=it(),et=1;const Vt=10,Es=async()=>{Me&&Me(),Me=p.on("transactions:change",t=>{_t(t)}),await qa()},qa=async()=>{const t=await mt();p.setTransactions(t),_t(t)},Fa=t=>{const e=t.paymentMethod,a=t.paymentStatus;return e==="transfer"&&a==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&a==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':a==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':a==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},Ga=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":x(t.paymentMethod)||"—",Dt=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),$s=t=>[...t].sort((a,s)=>new Date(s.date)-new Date(a.date)).filter(a=>{const s=a.dateKey||(a.date?a.date.split("T")[0]:"");return St&&Et?s>=St&&s<=Et:St?s>=St:Et?s<=Et:!0}),_t=t=>{const e=document.getElementById("view-transactions");if(!e)return;const a=it(),s=$s(t),i=t.filter(g=>g.dateKey===a).reduce((g,y)=>y.paymentStatus==="paid"&&y.paymentMethod==="cash"||y.paymentStatus==="transfer_confirmed"?g+y.total:y.paymentMethod==="debt"?g+(y.paidAmount||0):g,0),o=t.reduce((g,y)=>g+(y.remainingDebt||0),0),r=t.filter(g=>g.paymentStatus==="transfer_pending").reduce((g,y)=>g+y.total,0),d=Math.max(1,Math.ceil(s.length/Vt));et>d&&(et=d),et<1&&(et=1);const l=s.length===0?0:(et-1)*Vt+1,c=Math.min(et*Vt,s.length),m=s.slice((et-1)*Vt,et*Vt);e.innerHTML=`
    <div class="section-header" style="flex-wrap:wrap;gap:12px">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} total (${s.length} terfilter)</span></h2>
      
      <!-- Date Range Filter Toolbar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">Dari:</span>
          <input type="date" class="input" id="tx-filter-start" style="width:auto;padding:6px 10px;font-size:12px" value="${St}">
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:600">s/d</span>
          <input type="date" class="input" id="tx-filter-end" style="width:auto;padding:6px 10px;font-size:12px" value="${Et}">
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
              ${Ts(m)}
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls (10 rows/page) -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">
            Menampilkan <strong>${l}-${c}</strong> dari <strong>${s.length}</strong> transaksi
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
  `,Is(t)},Ts=t=>t.length?t.map(e=>{var a;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${x(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${vt(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((a=e.items)==null?void 0:a.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${b(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${b(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${Ga(e)}</span></td>
      <td>${Fa(e)}</td>
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
            ${Dt(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${Dt(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${Dt(e)?"var(--color-danger-border)":"#d1d5db"};color:${Dt(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${Dt(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk rentang tanggal ini</td></tr>',Is=t=>{var e,a,s,n,i,o,r;(e=document.getElementById("tx-btn-apply"))==null||e.addEventListener("click",()=>{var d,l;St=((d=document.getElementById("tx-filter-start"))==null?void 0:d.value)||"",Et=((l=document.getElementById("tx-filter-end"))==null?void 0:l.value)||"",et=1,_t(t)}),(a=document.getElementById("tx-btn-today"))==null||a.addEventListener("click",()=>{const d=new Date().toISOString().split("T")[0];St=d,Et=d,et=1,_t(t)}),(s=document.getElementById("tx-btn-all"))==null||s.addEventListener("click",()=>{St="",Et="",et=1,_t(t)}),(n=document.getElementById("tx-btn-export-csv"))==null||n.addEventListener("click",()=>{var m;const d=["Tanggal","No. Invoice","Kasir","Pelanggan","Metode Pembayaran","Status","Subtotal","Diskon","Pajak","Total","Dibayar","Kembalian","Sisa Piutang"],l=filtered.map(g=>[vt(new Date(g.date)),g.invoiceNo||"",g.cashier||"Admin",g.customerName||"-",g.paymentMethod||"cash",g.paymentStatus||"paid",g.subtotal||0,g.discount||0,g.tax||0,g.total||0,g.paid||0,g.change||0,g.remainingDebt||0]),c=it();Ve(`Transaksi-${c}.csv`,d,l),(m=window.showToast)==null||m.call(window,"✅ Riwayat transaksi berhasil diekspor ke Excel/CSV!","success")}),(i=document.getElementById("tx-prev-page"))==null||i.addEventListener("click",()=>{et>1&&(et--,_t(t))}),(o=document.getElementById("tx-next-page"))==null||o.addEventListener("click",()=>{et++,_t(t)}),(r=document.getElementById("tx-table"))==null||r.addEventListener("click",async d=>{var T;const l=d.target.closest("[data-action]");if(!l)return;const c=String(l.dataset.id),m=Number.isNaN(Number(c))?c:Number(c),g=l.dataset.action,y=t.find(L=>String(L.id)===c);if(g==="detail"){y&&Ls(y);return}if(g==="confirm-transfer"){if(!y||!confirm(`Konfirmasi transfer ${b(y.total)} dari ${x(y.customerName||"pelanggan")} sudah diterima?`))return;try{const L={...y,paymentStatus:"transfer_confirmed",paidAmount:y.total,confirmedAt:new Date().toISOString()};await te(L),p.updateTransaction(m,{paymentStatus:"transfer_confirmed",paidAmount:y.total,confirmedAt:L.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch{window.showToast("Gagal konfirmasi","error")}return}if(g==="pay-debt"){y&&_s(y);return}if(g==="delete"){if(!y)return;if(!Dt(y)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${x(y.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{if(await Pn(m),p.removeTransaction(m),y.customerId||y.customerName){const h=(await Y()).find(u=>y.customerId&&String(u.id)===String(y.customerId)||(u.name||"").trim().toLowerCase()===(y.customerName||"").trim().toLowerCase());if(h){h.totalOrders=Math.max(0,(Number(h.totalOrders)||1)-1),h.totalSpent=Math.max(0,(Number(h.totalSpent)||y.total)-y.total),y.paymentMethod==="debt"&&(Number(y.remainingDebt)||0)>0&&(h.totalDebt=Math.max(0,(Number(h.totalDebt)||0)-Number(y.remainingDebt))),await Ft(h);const u=await Y();p.setCustomers(u)}}for(const f of y.items||[])if((T=f.product)!=null&&T.id){const h=await E.products.get(f.product.id);if(h&&typeof h.stock=="number"){const u=h.stock+(Number(f.qty)||1);await Ia({...h,stock:u})}}const L=await dt();p.setProducts(L),window.showToast("Transaksi dihapus & stok dikembalikan","success")}catch{window.showToast("Gagal menghapus","error")}}})},_s=t=>{var s;const e=t.remainingDebt||0,a=`
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
            <span>${new Date(n.date).toLocaleDateString("id-ID")} — ${x(n.note||"-")}</span>
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
  `;at(a,"debt-modal"),setTimeout(()=>{var n,i,o;(n=document.getElementById("debt-x"))==null||n.addEventListener("click",()=>U("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>U("debt-modal")),(o=document.getElementById("debt-save"))==null||o.addEventListener("click",async()=>{var f,h,u;const r=parseFloat((f=document.getElementById("cicil-amount"))==null?void 0:f.value)||0;if(r<=0||r>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${b(e)}`,"warning");return}const d=(t.paidAmount||0)+r,l=Math.max(0,e-r),c=l===0?"paid":"partial",m=(t.debtPayments||[]).length+1,g=l===0?`Pelunasan (#${m}/LUNAS ✅)`:`Cicilan #${m}`,y=((u=(h=document.getElementById("cicil-note"))==null?void 0:h.value)==null?void 0:u.trim())||g,T=[...t.debtPayments||[],{date:new Date().toISOString(),amount:r,note:y}],L={...t,paidAmount:d,remainingDebt:l,paymentStatus:c,debtPayments:T};try{if(await te(L),p.updateTransaction(t.id,{paidAmount:d,remainingDebt:l,paymentStatus:c,debtPayments:T}),t.customerId||t.customerName){const w=(await Y()).find(k=>t.customerId&&String(k.id)===String(t.customerId)||(k.name||"").trim().toLowerCase()===(t.customerName||"").trim().toLowerCase());if(w){w.totalDebt=Math.max(0,(Number(w.totalDebt)||0)-r),await Ft(w);const k=await Y();p.setCustomers(k)}}U("debt-modal"),window.showToast(l===0?"🎉 Hutang LUNAS!":`Cicilan ${b(r)} dicatat`,"success")}catch{window.showToast("Gagal simpan cicilan","error")}})},0)},Ls=t=>{var i;const e=he(t,p.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Ba(t);const a=Je(t),s=((i=p.state.settings)==null?void 0:i.printerPaper)||"58mm",n=`
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
          <div style="margin-top:4px">${Fa(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${x(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${Ga(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${ve(t,s)}</div>

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
  `;at(n,"tx-detail"),setTimeout(()=>{var o,r,d,l,c,m,g,y;(o=document.getElementById("td-x"))==null||o.addEventListener("click",()=>U("tx-detail")),(r=document.getElementById("td-close-btn"))==null||r.addEventListener("click",()=>U("tx-detail")),(d=document.getElementById("btn-tx-print-direct"))==null||d.addEventListener("click",()=>{ae(t)}),(l=document.getElementById("btn-td-ble"))==null||l.addEventListener("click",async()=>{try{window.showToast("Koneksi Bluetooth...","info"),await Oa(t),window.showToast("Struk terkirim ke printer Bluetooth!","success")}catch(T){window.showToast(T.message||"Gagal Bluetooth","error")}}),(c=document.getElementById("btn-td-usb"))==null||c.addEventListener("click",async()=>{try{window.showToast("Koneksi USB...","info"),await Ua(t)}catch(T){window.showToast(T.message||"Gagal USB","error")}}),(m=document.getElementById("btn-td-whatsapp"))==null||m.addEventListener("click",()=>{Ma(t)}),(g=document.getElementById("btn-td-btapp"))==null||g.addEventListener("click",()=>{Da(t)}),(y=document.getElementById("btn-save-png"))==null||y.addEventListener("click",()=>{za(t)})},0)};let Qt=[],zt="";const ca={owner:{label:"👑 Owner / Pemilik",color:"#8b5cf6",bg:"rgba(139, 92, 246, 0.12)"},supervisor:{label:"⭐ Supervisor",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)"},cashier:{label:"👤 Kasir / Staff",color:"#10b981",bg:"rgba(16, 185, 129, 0.12)"}},Ps=async()=>{if(Qt.length){for(const t of Qt)typeof t=="function"&&t();Qt=[]}Qt.push(p.on("users:change",()=>$t())),Qt.push(p.on("auth:change",()=>{const t=document.getElementById("view-users");t!=null&&t.classList.contains("active")&&$t()})),await $t()},$t=async()=>{var n,i,o,r,d;const t=document.getElementById("view-users");if(!t)return;const e=p.state.currentUser;if((e==null?void 0:e.role)!=="owner"){t.innerHTML=`
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
    `,(n=document.getElementById("btn-lock-switch-op"))==null||n.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("request-operator-switch"))});return}const s=(await Tt()).filter(l=>{if(!zt)return!0;const c=zt.toLowerCase();return(l.name||"").toLowerCase().includes(c)||(l.username||"").toLowerCase().includes(c)});t.innerHTML=`
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
      <input type="text" id="user-search-input" value="${x(zt)}" placeholder="Cari nama atau username operator..." style="border: none; outline: none; background: transparent; width: 100%; font-size: 14px;">
      ${zt?'<button id="btn-clear-user-search" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px;">✕</button>':""}
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
            `:s.map(l=>{const c=ca[l.role]||ca.cashier,m=e&&String(e.id)===String(l.id),g=l.isActive!==!1;return`
                <tr style="border-bottom: 1px solid var(--border, #f1f5f9); font-size: 14px;">
                  <td style="padding: 14px 18px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background: ${c.bg}; color: ${c.color}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                        ${(l.name||"U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 600; color: var(--text-primary, #1e293b);">${x(l.name)} ${m?'<span style="font-size: 11px; padding: 2px 6px; border-radius: 6px; background: #e0e7ff; color: #3730a3; margin-left: 4px;">Anda</span>':""}</div>
                        <div style="font-size: 12px; color: var(--text-muted, #64748b);">Dibuat: ${new Date(l.createdAt||Date.now()).toLocaleDateString("id-ID")}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 14px 18px; font-family: monospace; font-size: 13px; color: var(--text-secondary, #475569);">
                    @${x(l.username)}
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
                      <button class="btn-edit-user" data-id="${l.id}" title="Edit Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border, #cbd5e1); background: transparent; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      ${m?"":`
                        <button class="btn-delete-user" data-id="${l.id}" data-name="${x(l.name)}" title="Hapus Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer;">
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
  `,(i=document.getElementById("btn-users-logout"))==null||i.addEventListener("click",()=>{confirm("Keluar dari sesi operator kasir?")&&window.dispatchEvent(new CustomEvent("request-logout"))}),(o=document.getElementById("btn-add-user"))==null||o.addEventListener("click",()=>pa()),(r=document.getElementById("user-search-input"))==null||r.addEventListener("input",l=>{zt=l.target.value,$t()}),(d=document.getElementById("btn-clear-user-search"))==null||d.addEventListener("click",()=>{zt="",$t()}),t.querySelectorAll(".btn-edit-user").forEach(l=>{l.addEventListener("click",async()=>{const c=l.getAttribute("data-id"),m=await Sn(String(c));m&&pa(m)})}),t.querySelectorAll(".btn-delete-user").forEach(l=>{l.addEventListener("click",async()=>{const c=l.getAttribute("data-id"),m=l.getAttribute("data-name");if(confirm(`Yakin ingin menghapus operator "${m}"? Tindakan ini tidak dapat dibatalkan.`)){await Tn(String(c));const g=await Tt();p.setUsers(g),$t()}})})},pa=(t=null)=>{var d,l;const e=!!t,a="modal-user-form",s=`
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
            <input type="text" id="input-user-name" required value="${x((t==null?void 0:t.name)||"")}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px;">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Username</label>
            <input type="text" id="input-user-username" required ${e?"disabled":""} value="${x((t==null?void 0:t.username)||"")}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; ${e?"background: var(--bg-muted, #f1f5f9);":""}">
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
  `,n=document.getElementById(a);n&&n.remove(),document.body.insertAdjacentHTML("beforeend",s);const i=document.getElementById(a),o=()=>i.remove();(d=i.querySelector(".modal-close"))==null||d.addEventListener("click",o),(l=i.querySelector(".modal-cancel"))==null||l.addEventListener("click",o),document.getElementById("form-user-save").addEventListener("submit",async c=>{c.preventDefault();const m=document.getElementById("user-form-error");m.style.display="none";const g=document.getElementById("input-user-name").value.trim(),y=document.getElementById("input-user-username").value.trim().toLowerCase(),T=document.getElementById("input-user-role").value,L=document.getElementById("input-user-pin").value.trim(),f=e?document.getElementById("input-user-active").checked:!0;if(!g||!y){m.textContent="Nama dan username wajib diisi.",m.style.display="block";return}if(!e&&(!L||L.length<4)){m.textContent="PIN minimal 4 angka numerik.",m.style.display="block";return}if(L&&(L.length<4||Number.isNaN(Number(L)))){m.textContent="PIN harus berupa angka (4 hingga 6 digit).",m.style.display="block";return}try{const h=await Tt();if(!e&&h.some(S=>(S.username||"").toLowerCase()===y)){m.textContent=`Username "${y}" sudah digunakan oleh operator lain.`,m.style.display="block";return}if(e){let S=t.pinHash,w=t.pinSalt;L&&(w=ta(),S=await ze(L,w));const k={...t,name:g,role:T,pinHash:S,pinSalt:w,isActive:f,updatedAt:new Date().toISOString()};await $n(k),p.state.currentUser&&String(p.state.currentUser.id)===String(t.id)&&(p.state.currentUser.name=g,p.state.currentUser.role=T,sessionStorage.setItem("bm_active_user",JSON.stringify(p.state.currentUser)),p.emit("auth:change",p.state.currentUser))}else{const S=ta(),w=await ze(L,S),k={name:g,username:y,role:T,pinHash:w,pinSalt:S,isActive:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};await En(k)}const u=await Tt();p.setUsers(u),o(),$t()}catch(h){m.textContent=`Gagal menyimpan data: ${h.message}`,m.style.display="block"}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const Wa=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine||(t.textContent="⚡ Mode Offline",t.classList.add("status-badge--offline"),t.style.background="rgba(239, 68, 68, 0.12)",t.style.borderColor="rgba(239, 68, 68, 0.3)",t.style.color="#dc2626"))};window.addEventListener("offline",Wa);window.showToast=(t,e="info",a="")=>{const s=document.getElementById("toast-container");if(!s)return;const n={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${n[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${a?`<div class="toast__title">${x(a)}</div>`:""}
      <div class="toast__msg">${x(t)}</div>
    </div>
  `,s.appendChild(i);const o=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},r=setTimeout(o,3500);i.addEventListener("click",()=>{clearTimeout(r),o()})};const ua=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=ga()),e&&(e.textContent=nn())},Bs={login:{init:Xn,refresh:qt},pos:{init:ts,refresh:is},products:{init:ls,refresh:se},customers:{init:qn,refresh:wt},transactions:{init:Es,refresh:qa},reports:{init:ms,refresh:Xe},settings:{init:vs,refresh:Ot},finance:{init:Gn,refresh:ot},users:{init:Ps,refresh:$t}},ma=new Set,bt=async t=>{var s;!p.state.currentUser&&t!=="login"&&((s=window.showToast)==null||s.call(window,"Silakan masuk dengan akun operator untuk melanjutkan.","warning"),t="login");const e=Bs[t];if(!e)return;if(!p.canAccess(t)){window.showToast("Akses dibatasi untuk peran Anda. Silakan hubungi Owner/Supervisor.","warning","Peran Terbatas"),Ue({onLogin:()=>bt(t)});return}document.querySelectorAll(".dock-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)});const a=document.querySelector(".dock-container");a&&(a.style.display=t==="login"||!p.state.currentUser?"none":"flex"),document.querySelectorAll(".view").forEach(n=>{n.classList.toggle("active",n.id===`view-${t}`)});try{ma.has(t)?await e.refresh():(await e.init(),ma.add(t)),sessionStorage.setItem("activeView",t)}catch(n){const i=document.getElementById(`view-${t}`);i&&!i.children.length&&(i.innerHTML=`
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
      `)}p.navigate(t)},As=(t,e)=>{if(!t)return;const a=t.getBoundingClientRect(),s=Math.max(a.width,a.height),n=document.createElement("span");n.className="ripple-effect",n.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-a.left-s/2}px;top:${e.clientY-a.top-s/2}px`,t.style.position="relative",t.appendChild(n),n.addEventListener("animationend",()=>n.remove(),{once:!0})},Ja=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};p.on("settings:change",Ja);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const Va=t=>{const e=document.getElementById("operator-badge"),a=document.getElementById("operator-name"),s=document.getElementById("operator-icon"),n=document.getElementById("btn-topbar-logout"),i=document.getElementById("btn-topbar-login");t?(a&&(a.textContent=`${t.name} (${t.role})`),s&&(s.textContent=t.role==="owner"?"👑":t.role==="supervisor"?"⭐":"👤"),e&&(e.style.display="flex",e.style.color=t.role==="owner"?"#8b5cf6":t.role==="supervisor"?"#2563eb":"#10b981",e.style.background=t.role==="owner"?"rgba(139, 92, 246, 0.12)":t.role==="supervisor"?"rgba(37, 99, 235, 0.12)":"rgba(16, 185, 129, 0.12)",e.style.borderColor=t.role==="owner"?"rgba(139, 92, 246, 0.3)":t.role==="supervisor"?"rgba(37, 99, 235, 0.3)":"rgba(16, 185, 129, 0.3)"),n&&(n.style.display="inline-flex"),i&&(i.style.display="none")):(a&&(a.textContent="Belum Masuk"),s&&(s.textContent="🔒"),e&&(e.style.color="#64748b",e.style.background="rgba(100, 116, 139, 0.1)",e.style.borderColor="rgba(100, 116, 139, 0.25)"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"));const o=document.getElementById("dock-users");o&&(o.style.display=t&&t.role==="owner"?"flex":"none")};p.on("auth:change",Va);const Cs=async()=>{var z,V,Q,j;window.appNavigateTo=bt;try{await zn(),await Ge()}catch{window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}try{const $=await xn();$?p.login($):p.logout()}catch{p.logout()}Va(p.state.currentUser),navigator.onLine&&oe().catch(()=>{}),(z=document.getElementById("operator-badge"))==null||z.addEventListener("click",()=>{Ue()}),(V=document.getElementById("btn-topbar-logout"))==null||V.addEventListener("click",()=>{var $;confirm("Keluar dari sesi operator kasir saat ini?")&&(p.logout(),bt("login"),($=window.showToast)==null||$.call(window,"Sesi ditutup. Silakan login kembali.","info"))}),(Q=document.getElementById("btn-topbar-login"))==null||Q.addEventListener("click",()=>{bt("login")}),(j=document.getElementById("btn-sync-staged"))==null||j.addEventListener("click",async()=>{await pn()}),window.addEventListener("request-operator-switch",()=>{Ue()}),window.addEventListener("request-logout",()=>{p.logout(),bt("login")});const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const $ of t){const N=await Fe($);N!==null&&($==="modalAwal"||$==="taxRate"?e[$]=parseFloat(N)||0:e[$]=N)}p.updateSettings(e),Ja(p.state.settings),Wa(),ua(),setInterval(ua,1e3),cn(),jt().catch(()=>{}),ha(),Lt();const a=document.querySelector(".dock"),s="bm_dock_order_v3";(()=>{try{for(const M of(a==null?void 0:a.querySelectorAll(".dock-separator"))??[])M.remove();const $=localStorage.getItem(s);if(!$)return;const N=JSON.parse($);if(!Array.isArray(N)||!N.length)return;const C=new Map;a==null||a.querySelectorAll(".dock-item").forEach(M=>{C.set(M.dataset.view,M)}),N.forEach(M=>{const H=C.get(M);H&&a&&(a.appendChild(H),C.delete(M))}),C.forEach(M=>{a&&a.appendChild(M)})}catch{}})();let i=a?[...a.querySelectorAll(".dock-item")]:[];const o=()=>window.innerWidth<600,r=()=>window.innerWidth>=600&&window.innerWidth<=1024,d=()=>o()?1.22:r()?1.36:1.5,l=()=>o()?8:r()?12:18,c=()=>o()?90:140;let m=i.map(()=>1),g=i.map(()=>1),y=null,T=!1;const L=($,N,C)=>$+(N-$)*C,f=.24,h=()=>{if(T)return;let $=!1;const N=d(),C=l();i.forEach((M,H)=>{m[H]=L(m[H]??1,g[H]??1,f),Math.abs(m[H]-g[H])>5e-4?$=!0:m[H]=g[H];const q=m[H],G=(q-1)/(N-1||1)*C;M.style.transform=`translate3d(0, ${-G.toFixed(2)}px, 0) scale(${q.toFixed(4)})`,M.style.zIndex=q>1.02?Math.round(q*20):""}),y=$?requestAnimationFrame(h):null},u=()=>{!T&&!y&&(y=requestAnimationFrame(h))},S=$=>{if(T)return;const N=d(),C=c();i.forEach((M,H)=>{const q=M.getBoundingClientRect(),G=q.left+q.width/2,R=Math.abs($-G);if(R<C){const F=Math.cos(R/C*(Math.PI/2));g[H]=1+(N-1)*F*F}else g[H]=1})},w=()=>{i.forEach(($,N)=>{g[N]=1})};a==null||a.addEventListener("mousemove",$=>{$.pointerType==="touch"||o()||T||(S($.clientX),u())},{passive:!0});const k=()=>{T||(w(),m=i.map(()=>1),i.forEach($=>{$.style.transform="",$.style.zIndex="";try{$.blur()}catch{}}),y&&(cancelAnimationFrame(y),y=null))};a==null||a.addEventListener("mouseleave",k),a==null||a.addEventListener("pointerup",k),a==null||a.addEventListener("touchend",k),a==null||a.addEventListener("pointercancel",k);let v=null,B=-1,A=-1,_=0,D=0,O=[],I=!1;const K=()=>i.map(($,N)=>{const C=$.getBoundingClientRect();return{idx:N,el:$,x:C.left,cx:C.left+C.width/2,width:C.width}});i.forEach($=>{$.addEventListener("pointerdown",C=>{if(!(C.button!==0&&C.pointerType==="mouse")){v=$,B=i.indexOf($),A=B,_=C.clientX,D=C.clientY,I=!1,O=K();try{$.setPointerCapture(C.pointerId)}catch{}}}),$.addEventListener("pointermove",C=>{var q;if(!v||v!==$)return;const M=C.clientX-_,H=C.clientY-D;if(!I&&Math.hypot(M,H)>5&&(I=!0,T=!0,y&&(cancelAnimationFrame(y),y=null),a==null||a.classList.add("is-reordering"),$.classList.add("is-dragging"),i.forEach(G=>{G!==$&&(G.style.zIndex="")})),I&&T){$.style.transform=`translate3d(${M}px, ${H-12}px, 0) scale(1.18)`;let G=B;for(let R=0;R<O.length;R++)if(R===0&&C.clientX<O[0].cx){G=0;break}else if(R===O.length-1&&C.clientX>=O[R].cx){G=O.length-1;break}else if(C.clientX>=O[R].cx&&C.clientX<((q=O[R+1])==null?void 0:q.cx)){const F=(O[R].cx+O[R+1].cx)/2;G=C.clientX<F?R:R+1;break}A=Math.max(0,Math.min(i.length-1,G)),O.forEach(({el:R,idx:F,x:lt})=>{if(R===$)return;let gt=0;if(F>B&&F<=A){const ct=O[F-1];gt=ct?ct.x-lt:-58}else if(F<B&&F>=A){const ct=O[F+1];gt=ct?ct.x-lt:58}R.style.transform=`translate3d(${gt}px, 0, 0)`})}});const N=C=>{if(!(!v||v!==$)){try{$.releasePointerCapture(C.pointerId)}catch{}if(I&&T){if(a==null||a.classList.remove("is-reordering"),$.classList.remove("is-dragging"),i.forEach(M=>{M.style.transform=""}),A!==B&&A>=0){const M=i.filter(q=>q!==$);A>=M.length?a==null||a.appendChild($):a==null||a.insertBefore($,M[A]),i=a?[...a.querySelectorAll(".dock-item")]:[];const H=i.map(q=>q.dataset.view).filter(Boolean);try{localStorage.setItem(s,JSON.stringify(H))}catch{}}m=i.map(()=>1),g=i.map(()=>1),T=!1,w(),u()}else{T=!1,$.style.transform="";const M=$.dataset.view;M&&($.classList.remove("bouncing"),$.offsetWidth,$.classList.add("bouncing"),$.addEventListener("animationend",()=>$.classList.remove("bouncing"),{once:!0}),As($.querySelector(".dock-icon"),C),bt(M))}try{$.blur()}catch{}w(),m=i.map(()=>1),i.forEach(M=>{M.style.transform="",M.style.zIndex=""}),y&&(cancelAnimationFrame(y),y=null),v=null,B=-1,A=-1,I=!1}};$.addEventListener("pointerup",N),$.addEventListener("pointercancel",N)});let W=!1;window.addEventListener("keydown",$=>{["ArrowLeft","ArrowRight","Tab","Home","End"].includes($.key)&&(W=!0)},{passive:!0}),window.addEventListener("pointerdown",()=>{W=!1},{passive:!0}),i.forEach($=>{$.addEventListener("focus",()=>{if(!W)return;const N=i.indexOf($);i.forEach((C,M)=>{const H=Math.abs(M-N);g[M]=H===0?1.35:H===1?1.12:1}),u()}),$.addEventListener("blur",()=>{w(),u()}),$.addEventListener("keydown",N=>{var M,H;const C=i.indexOf($);if(N.key==="ArrowRight"){N.preventDefault();const q=i[C+1]||i[0];q==null||q.focus()}else if(N.key==="ArrowLeft"){N.preventDefault();const q=i[C-1]||i[i.length-1];q==null||q.focus()}else if(N.key==="Home")N.preventDefault(),(M=i[0])==null||M.focus();else if(N.key==="End")N.preventDefault(),(H=i[i.length-1])==null||H.focus();else if(N.key==="Enter"||N.key===" "){N.preventDefault();const q=$.dataset.view;q&&bt(q)}})}),(()=>{let $=0,N=0,C=0,M=!1;const H=()=>{const R=(a?[...a.querySelectorAll(".dock-item")]:[]).map(F=>F.dataset.view).filter(F=>!!F&&p.canAccess(F));return R.length?R:["pos","customers","transactions"]},q=G=>{let R=G;for(;R&&R!==document.body;){if(R.classList&&(R.classList.contains("modal-overlay")||R.classList.contains("modal")||R.classList.contains("dock")||R.classList.contains("dock-container"))||["INPUT","TEXTAREA","SELECT"].includes(R.tagName))return!0;if(R.scrollWidth>R.clientWidth+10){const F=window.getComputedStyle(R);if(F.overflowX==="auto"||F.overflowX==="scroll")return!0}R=R.parentElement}return!1};window.addEventListener("touchstart",G=>{var F;if(!p.state.currentUser){M=!0;return}if(((F=G.touches)==null?void 0:F.length)!==1){M=!0;return}const R=G.touches[0];$=R.clientX,N=R.clientY,C=Date.now(),M=q(G.target)},{passive:!0}),window.addEventListener("touchmove",G=>{if(M||!G.touches||G.touches.length!==1)return;const R=G.touches[0],F=R.clientX-$,lt=R.clientY-N;Math.abs(lt)>Math.abs(F)&&Math.abs(lt)>12&&(M=!0)},{passive:!0}),window.addEventListener("touchend",G=>{var Ye;if(!p.state.currentUser||M||!G.changedTouches||!G.changedTouches.length)return;const R=G.changedTouches[0],F=R.clientX-$,lt=R.clientY-N,gt=Date.now()-C;if(Math.abs(F)>=50&&Math.abs(F)>Math.abs(lt)*1.35&&gt<=550){const we=H(),Qa=p.state.currentView||sessionStorage.getItem("activeView")||"pos",Gt=we.indexOf(Qa);if(Gt!==-1){let re=-1;if(F<0&&Gt<we.length-1?re=Gt+1:F>0&&Gt>0&&(re=Gt-1),re!==-1){const Ze=we[re];try{(Ye=navigator.vibrate)==null||Ye.call(navigator,12)}catch{}const At=a==null?void 0:a.querySelector(`.dock-item[data-view="${Ze}"]`);At&&(At.classList.remove("bouncing"),At.offsetWidth,At.classList.add("bouncing"),At.addEventListener("animationend",()=>At.classList.remove("bouncing"),{once:!0})),bt(Ze)}}}},{passive:!0})})();const P=document.getElementById("topbar-app-version");if(P){const $="1.6.0";P.textContent=`v${$}`}if(!p.state.currentUser)await bt("login");else{const $=sessionStorage.getItem("activeView")||"pos";await bt($==="login"?"pos":$)}};document.addEventListener("DOMContentLoaded",Cs);
