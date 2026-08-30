const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-QkGqYg11.js","./_commonjsHelpers-C4iS2aBk.js","./vendor-pdf-j4-ZKoBl.js"])))=>i.map(i=>d[i]);
import{X as jt}from"./vendor-db-2jmnBxhj.js";import{_ as V}from"./vendor-pdf-j4-ZKoBl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const E=new jt("BlueMountainPOS");E.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});const z=()=>E.products.toArray(),Tt=t=>E.products.add(t),Rt=t=>E.products.put(t),Kt=t=>E.products.delete(t),Ot=t=>E.transactions.add(t),X=()=>E.transactions.toArray(),Ht=t=>E.transactions.delete(t),Y=t=>E.transactions.put(t),Ft=t=>E.expenses.add(t),_t=()=>E.expenses.toArray(),qt=t=>E.expenses.delete(t),ct=async t=>{const e=await E.settings.get(t);return(e==null?void 0:e.value)??null},rt=(t,e)=>E.settings.put({key:t,value:e}),Ut=async()=>{await E.products.count()>0||await E.products.bulkAdd([{name:"Air Isi Ulang Galon",category:"Galon",price:5e3,unit:"galon",emoji:"🪣",stock:999},{name:"Antar Galon (dalam)",category:"Galon",price:3e3,unit:"kali",emoji:"🛵",stock:999},{name:"Antar Galon (luar)",category:"Galon",price:5e3,unit:"kali",emoji:"🚚",stock:999},{name:"Galon Baru (Aqua)",category:"Galon",price:5e4,unit:"buah",emoji:"💧",stock:50},{name:"Galon Baru (Standar)",category:"Galon",price:45e3,unit:"buah",emoji:"💦",stock:50},{name:"Air Botol 600ml",category:"Botol",price:3e3,unit:"botol",emoji:"🍶",stock:200},{name:"Air Botol 1500ml",category:"Botol",price:5e3,unit:"botol",emoji:"🥤",stock:100},{name:"Dispenser Galon",category:"Lainnya",price:25e4,unit:"unit",emoji:"⚗️",stock:10}])},Gt=async()=>{await Promise.all([E.products.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear()]),sessionStorage.clear(),localStorage.clear()},Jt=async()=>{const[t,e,s,n]=await Promise.all([E.products.toArray(),E.transactions.toArray(),E.expenses.toArray(),E.settings.toArray()]),a=n.find(i=>i.key==="shopName"),o=(a==null?void 0:a.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"3.0.0",exportedAt:new Date().toISOString(),shopName:o,data:{products:t,transactions:e,expenses:s,settings:n},meta:{productCount:t.length,transactionCount:e.length,expenseCount:s.length,settingCount:n.length}}},Wt=async(t,e="replace")=>{if(!t||!t.data)throw new Error("Format file backup tidak valid atau rusak.");const{products:s=[],transactions:n=[],expenses:a=[],settings:o=[]}=t.data;return e==="replace"?(await Promise.all([E.products.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear()]),s.length&&await E.products.bulkAdd(s),n.length&&await E.transactions.bulkAdd(n),a.length&&await E.expenses.bulkAdd(a),o.length&&await E.settings.bulkPut(o)):e==="merge"&&(s.length&&await E.products.bulkPut(s),n.length&&await E.transactions.bulkPut(n),a.length&&await E.expenses.bulkPut(a),o.length&&await E.settings.bulkPut(o)),{products:s.length,transactions:n.length,expenses:a.length,settings:o.length}},Vt=()=>E.open(),C={},g={state:{cart:[],products:[],transactions:[],expenses:[],currentView:"pos",discount:0,customerName:"",settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return(C[t]??(C[t]=[])).push(e),()=>{C[t]=(C[t]??[]).filter(s=>s!==e)}},emit(t,e){(C[t]??[]).forEach(s=>s(e))},addToCart(t,e=1){const s=Math.max(1,parseInt(e)||1),n=this.state.cart.findIndex(a=>String(a.product.id)===String(t.id));n>=0?this.state.cart[n].qty+=s:this.state.cart.push({product:t,qty:s}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const s=this.state.cart.find(n=>String(n.product.id)===String(t));s&&(s.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.emit("cart:change",this.state.cart)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>e.id!==t),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const s=this.state.transactions.findIndex(n=>n.id===t);s>=0&&(this.state.transactions[s]={...this.state.transactions[s],...e},this.emit("transactions:change",this.state.transactions))},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)}},Yt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),Qt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),Et=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),Z=(t=new Date)=>`${Qt(t)} ${Et(t)}`,G=()=>new Date().toISOString().split("T")[0],Xt=()=>{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`},p=t=>isNaN(t)?"Rp 0":"Rp "+Math.round(t).toLocaleString("id-ID"),f=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),pt=(t,e)=>{const s=t.items||[],n=[],a=(d,r=0,l=1,c=0)=>n.push({type:0,content:d,bold:r,align:l,format:c}),o=()=>a("--------------------------------",0,1,0),i=()=>a(" ",0,0,0);i(),a(e.shopName||"Blue Mountain Refilling Station",1,1,2),a(e.shopAddress||"",0,1,4),e.shopPhone&&a(`Telp: ${e.shopPhone}`,0,1,4),o(),a(`No: ${t.invoiceNo||"-"}`,0,0,0),a(`Tgl: ${Z(new Date(t.date))}`,0,0,0),t.customerName&&a(`Pelanggan: ${t.customerName}`,0,0,0),t.cashier&&a(`Kasir: ${t.cashier}`,0,0,0),o();for(const d of s){if(!(d!=null&&d.product))continue;const r=d.product.name,l=d.qty,c=p(d.product.price),b=p(d.product.price*l);a(`${r}`,0,0,0),a(`  ${l} x ${c} = ${b}`,0,0,0)}return o(),t.discount>0&&(a(`Subtotal: ${p(t.subtotal)}`,0,0,0),a(`Diskon:  -${p(t.discount)}`,0,0,0)),t.tax>0&&a(`Pajak:    ${p(t.tax)}`,0,0,0),a(`TOTAL: ${p(t.total)}`,1,0,3),t.paymentMethod==="cash"?(a(`Bayar:   ${p(t.paid)}`,0,0,0),a(`Kembali: ${p(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(a(`Transfer: ${p(t.total)}`,0,0,0),a(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(a(`DP Dibayar: ${p(t.paidAmount||0)}`,0,0,0),a(`Sisa Hutang: ${p(t.remainingDebt||0)}`,1,0,0)),o(),i(),a("Terima kasih sudah berbelanja!",1,1,0),a(e.shopName||"Blue Mountain Refilling Station",0,1,4),i(),i(),n},Zt=""+new URL("logo-x8cg0OuI.png",import.meta.url).href,St=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},te=t=>{const e=pt(t,g.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),St()},Pt=t=>(te(t),`my.bluetoothprint.scheme://${g.state.settings.printerUrl||St()}`),It=t=>{const e=g.state.settings,s=t.items||[],n=(d,r=!1,l="left")=>`<div style="text-align:${l};font-weight:${r?"bold":"normal"}">${d}</div>`,a=()=>'<div style="border-top:1px dashed #bbb;margin:5px 0"></div>',o=()=>"<div>&nbsp;</div>";let i="";i+=`<div style="text-align:center;margin-bottom:8px;margin-top:4px">
    <img src="${Zt}"
         alt="Logo"
         style="width:85px;height:85px;object-fit:contain;display:inline-block">
  </div>`,i+=n(e.shopName||"Blue Mountain Refilling Station",!0,"center"),i+=n(e.shopAddress||"",!1,"center"),e.shopPhone&&(i+=n(`Telp: ${e.shopPhone}`,!1,"center")),i+=a(),i+=n(`No: ${t.invoiceNo||"-"}`),i+=n(`Tgl: ${Z(new Date(t.date))}`),t.customerName&&(i+=n(`Pelanggan: ${t.customerName}`)),t.cashier&&(i+=n(`Kasir: ${t.cashier}`)),i+=a();for(const d of s)d!=null&&d.product&&(i+=n(d.product.name),i+=n(`&nbsp;&nbsp;${d.qty} x ${p(d.product.price)} = ${p(d.product.price*d.qty)}`));return i+=a(),t.discount>0&&(i+=n(`Subtotal : ${p(t.subtotal)}`),i+=n(`Diskon   : -${p(t.discount)}`)),t.tax>0&&(i+=n(`Pajak    : ${p(t.tax)}`)),i+=n(`<strong>TOTAL    : ${p(t.total)}</strong>`,!0),t.paymentMethod==="cash"?(i+=n(`Bayar    : ${p(t.paid)}`),i+=n(`<strong>Kembali  : ${p(t.change)}</strong>`,!0)):t.paymentMethod==="transfer"?(i+=n(`Transfer : ${p(t.total)}`),i+=n(`Status   : ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}`)):t.paymentMethod==="debt"&&(i+=n(`DP       : ${p(t.paidAmount||0)}`),i+=n(`<strong>Sisa Hutang: ${p(t.remainingDebt||0)}</strong>`,!0)),i+=a(),i+=o(),i+=n("Terima kasih sudah berbelanja!",!0,"center"),i+=n(e.shopName||"Blue Mountain Refilling Station",!1,"center"),i+=o(),i},et=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),s=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),n=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${s}${n}`},L=(t,e="generic-modal")=>{P();const s=document.createElement("div");s.className="modal-overlay",s.id=`overlay-${e}`,s.innerHTML=`<div class="modal" id="${e}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&P(e)});const n=s.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return n.length&&n[0].focus(),s},P=(t=null)=>{const e=t?`#overlay-${t}`:".modal-overlay";(t?[document.querySelector(e)]:[...document.querySelectorAll(e)]).forEach(n=>{var a;n&&((a=n.querySelector(".modal"))==null||a.classList.add("closing"),n.classList.add("closing"),setTimeout(()=>n.remove(),200))})},at=(t="cash")=>{const e=g.total,s=g.subtotal,n=g.state.discount,a=g.tax,o=g.state.settings,i=f(o.bankName||"BCA"),d=f(o.bankNumber||"—"),r=f(o.bankHolder||o.shopName||"Blue Mountain"),l=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Pembayaran</div>
        <div class="amount">${p(e)}</div>
        ${n>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${p(n)}</div>`:""}
        ${a>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${p(a)}</div>`:""}
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
          <span class="pay-tab__icon">📋</span>Bayar Nanti
        </button>
      </div>

      <!-- Cash section -->
      <div id="pay-cash-section" style="${t!=="cash"?"display:none":""}">
        <div class="input-group">
          <label class="input-label" for="cash-received">💰 Jumlah Bayar (Rp)</label>
          <input type="number" class="input" id="cash-received"
            value="${e}" min="${e}" max="999999999" step="1000"
            inputmode="numeric" pattern="[0-9]*">
        </div>
        <div class="quick-amounts" id="quick-amounts" style="margin-top:8px">
          ${ee(e).map(c=>`<button class="quick-amt-btn" data-amount="${c}">${p(c)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px">
          <span class="label">💰 Kembalian</span>
          <span class="value" id="change-amount">${p(0)}</span>
        </div>
      </div>

      <!-- Transfer section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info">
          <div style="font-size:32px;margin-bottom:8px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Transfer ke rekening:</div>
          <div style="font-size:18px;font-weight:800;color:var(--text-primary);margin:6px 0">${i}: ${d}</div>
          <div style="font-size:13px;color:var(--text-secondary)">a/n ${r}</div>
          <div style="margin-top:10px;padding:8px 12px;background:white;border-radius:8px;font-size:13px;font-weight:700;color:var(--blue-700);border:1.5px solid var(--blue-200)">
            Nominal: ${p(e)}
          </div>
          <div style="margin-top:8px;padding:8px 12px;background:#fef3c7;border-radius:8px;font-size:12px;color:#92400e;border:1.5px solid #fcd34d">
            ⚠️ Status: <strong>Menunggu Konfirmasi</strong> — kas baru tercatat setelah dikonfirmasi diterima
          </div>
        </div>
      </div>

      <!-- Bayar Nanti / Hutang section -->
      <div id="pay-debt-section" style="${t!=="debt"?"display:none":""}">
        <div style="padding:10px 14px;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;font-size:12px;color:#92400e;margin-bottom:12px">
          📋 <strong>Hutang Piutang</strong> — dicatat sebagai piutang usaha. Wajib isi nama pelanggan.
        </div>
        <div class="input-group">
          <label class="input-label" for="debt-customer">👤 Nama Pelanggan <span style="color:red">*</span></label>
          <input type="text" class="input" id="debt-customer"
            placeholder="Nama wajib diisi untuk hutang"
            value="${f(g.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${e}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total</span><strong>${p(e)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>Dibayar sekarang</span><strong id="debt-paid-display">${p(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger)">${p(e)}</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="modal-footer">
      <button class="btn btn--secondary" id="pay-cancel-btn">Batal</button>
      <button class="btn btn--success btn--lg" id="pay-confirm-btn">
        ✅ Proses Pembayaran
      </button>
    </div>
  `;L(l,"payment-modal"),setTimeout(()=>{var _,k,$,m;(_=document.getElementById("pay-close-btn"))==null||_.addEventListener("click",()=>P("payment-modal")),(k=document.getElementById("pay-cancel-btn"))==null||k.addEventListener("click",()=>P("payment-modal")),document.querySelectorAll(".pay-tab").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".pay-tab").forEach(w=>w.classList.remove("active")),v.classList.add("active");const h=v.dataset.method;document.getElementById("pay-cash-section").style.display=h==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=h==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=h==="debt"?"":"none"})});const c=document.getElementById("cash-received"),b=()=>{const v=parseFloat(c==null?void 0:c.value)||0,h=Math.max(0,v-e),w=document.getElementById("change-amount");w&&(w.textContent=p(h))};c==null||c.addEventListener("input",b),b(),($=document.getElementById("quick-amounts"))==null||$.addEventListener("click",v=>{const h=v.target.closest(".quick-amt-btn");h&&c&&(c.value=h.dataset.amount,b())});const x=document.getElementById("debt-paid-now"),S=()=>{const v=Math.min(parseFloat(x==null?void 0:x.value)||0,e),h=e-v,w=document.getElementById("debt-paid-display"),y=document.getElementById("debt-remaining-display");w&&(w.textContent=p(v)),y&&(y.textContent=p(h))};x==null||x.addEventListener("input",S),(m=document.getElementById("pay-confirm-btn"))==null||m.addEventListener("click",async()=>{var T,B,M,N,A;const v=document.querySelector(".pay-tab.active"),h=(v==null?void 0:v.dataset.method)||"cash",w=document.getElementById("pay-confirm-btn");if(h==="cash"&&(parseFloat(c==null?void 0:c.value)||0)<e){window.showToast("Jumlah bayar kurang dari total!","warning");return}if(h==="debt"&&!((B=(T=document.getElementById("debt-customer"))==null?void 0:T.value)==null?void 0:B.trim())){window.showToast("Nama pelanggan wajib diisi untuk hutang!","warning");return}w&&(w.disabled=!0,w.textContent="⏳ Menyimpan...");const y=new Date().toISOString();let u;if(h==="cash"){const I=parseFloat(c==null?void 0:c.value)||e,K=Math.max(0,I-e);u={invoiceNo:et(),date:y,dateKey:G(),items:g.state.cart.map(q=>({product:{...q.product},qty:q.qty})),subtotal:s,discount:n,tax:a,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:I,change:K,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Admin"}}else if(h==="transfer")u={invoiceNo:et(),date:y,dateKey:G(),items:g.state.cart.map(I=>({product:{...I.product},qty:I.qty})),subtotal:s,discount:n,tax:a,total:e,paymentMethod:"transfer",paymentStatus:"transfer_pending",paid:0,change:0,paidAmount:0,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Admin"};else{const I=Math.min(parseFloat((M=document.getElementById("debt-paid-now"))==null?void 0:M.value)||0,e),K=e-I,q=I===0?"unpaid":I<e?"partial":"paid",Dt=((A=(N=document.getElementById("debt-customer"))==null?void 0:N.value)==null?void 0:A.trim())||"";u={invoiceNo:et(),date:y,dateKey:G(),items:g.state.cart.map(yt=>({product:{...yt.product},qty:yt.qty})),subtotal:s,discount:n,tax:a,total:e,paymentMethod:"debt",paymentStatus:q,paid:I,change:0,paidAmount:I,remainingDebt:K,debtPayments:I>0?[{date:y,amount:I,note:"DP / Uang muka awal"}]:[],customerName:Dt,cashier:g.state.settings.cashierName||"Admin"}}try{const I=await Ot(u);u.id=I,g.addTransaction(u),P("payment-modal"),g.clearCart(),ae(u)}catch(I){window.showToast("Gagal menyimpan transaksi!","error"),console.error("[payment]",I),w&&(w.disabled=!1,w.innerHTML="✅ Proses Pembayaran")}})},0)},ee=t=>{const s=(a=>Math.ceil(a/5e3)*5e3)(t),n=[s,s+5e3,s+1e4,s+2e4,s+5e4,s+1e5];return[...new Set(n.filter(a=>a>=t))].slice(0,4)},ae=t=>{var d,r,l;const e=pt(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const s=g.state.settings.printEnabled,n=Pt(t),a=It(t),o=document.createElement("div");o.className="success-overlay",o.id="success-overlay",o.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${f(t.invoiceNo)} &bull; ${p(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${p(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:#d97706;font-size:13px;margin-top:4px">⏳ Transfer menunggu konfirmasi</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa hutang: ${p(t.remainingDebt)}</p>`:""}
    </div>
    <div class="success-actions">
      ${s?`<a class="print-btn" href="${n}" id="btn-print-receipt">🖨️ Cetak Struk</a>`:""}
      <button class="btn btn--primary" id="btn-new-tx">🔄 Transaksi Baru</button>
      <button class="btn btn--secondary" id="btn-close-overlay">✕ Tutup</button>
    </div>
    <details style="margin-top:12px;max-width:340px;width:100%">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-secondary);text-align:center;margin-bottom:8px;font-weight:600">
        📄 Preview Struk
      </summary>
      <div class="receipt-preview">${a}</div>
    </details>
  `,document.body.appendChild(o);const i=()=>{o.classList.add("closing"),setTimeout(()=>o.remove(),180)};(d=document.getElementById("success-close-btn"))==null||d.addEventListener("click",i),(r=document.getElementById("btn-close-overlay"))==null||r.addEventListener("click",i),(l=document.getElementById("btn-new-tx"))==null||l.addEventListener("click",()=>{i(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{o.parentNode&&i()},15e3)};let dt="",Q="Semua",U=null,ft=[];const ne=async()=>{const t=await z();g.setProducts(t),Bt(),U&&U.abort(),U=new AbortController,ft.forEach(e=>e()),ft=[g.on("cart:change",Lt),g.on("products:change",()=>F())],oe(U.signal)},Bt=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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

        <div class="customer-row" style="padding:10px 16px;border-bottom:1px solid var(--border-subtle)">
          <span style="font-size:16px">👤</span>
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Nama pelanggan (opsional)" maxlength="80" autocomplete="off">
        </div>

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
              value="${g.state.discount||""}" min="0" max="99999999" placeholder="0" inputmode="numeric">
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
  `,ut(),F(),Lt()},se=()=>["Semua",...new Set(g.state.products.map(t=>t.category))],ut=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=se().map(e=>`
    <button class="cat-pill ${e===Q?"active":""}"
      data-cat="${f(e)}">${f(e)}</button>
  `).join(""))},F=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=g.state.products;if(Q!=="Semua"&&(e=e.filter(s=>s.category===Q)),dt){const s=dt.toLowerCase();e=e.filter(n=>n.name.toLowerCase().includes(s))}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(s=>`
    <div class="product-card" data-id="${s.id}" role="button" tabindex="0"
      aria-label="${f(s.name)} — ${p(s.price)}">
      <div class="product-card__emoji">${s.emoji||"📦"}</div>
      <div class="product-card__name">${f(s.name)}</div>
      <div class="product-card__price">${p(s.price)}</div>
      <div class="product-card__unit">per ${f(s.unit)}</div>
    </div>
  `).join(""),t.querySelectorAll(".product-card").forEach(s=>{const n=()=>{const a=s.dataset.id,o=g.state.products.find(i=>String(i.id)===String(a));o&&(g.addToCart(o),s.style.transform="scale(0.94)",setTimeout(()=>{s.style.transform=""},120))};s.addEventListener("click",n),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),n())})})},Lt=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),s=document.getElementById("cart-total"),n=document.getElementById("tax-amount"),a=document.getElementById("tax-row"),o=document.getElementById("customer-name"),i=document.getElementById("discount-input");if(o&&!o.matches(":focus")&&(o.value=g.state.customerName||""),i&&!i.matches(":focus")&&(i.value=g.state.discount||""),!t)return;const d=g.state.cart;if(e){const r=e.textContent;e.textContent=g.cartCount,r!==String(g.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(s&&(s.textContent=p(g.total)),a&&n&&(g.tax>0?(a.style.display="flex",n.textContent=p(g.tax)):a.style.display="none"),!d.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=d.map(r=>`
    <div class="cart-item" data-pid="${r.product.id}">
      <div class="cart-item__info">
        <div class="cart-item__name">${r.product.emoji||""} ${f(r.product.name)}</div>
        <div class="cart-item__price">${p(r.product.price)} / ${f(r.product.unit)}</div>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__subtotal">${p(r.product.price*r.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn remove" data-action="remove" data-pid="${r.product.id}" title="Hapus">🗑</button>
          <button class="qty-btn" data-action="dec" data-pid="${r.product.id}">−</button>
          <span class="qty-value">${r.qty}</span>
          <button class="qty-btn" data-action="inc" data-pid="${r.product.id}">+</button>
        </div>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.pid,c=r.dataset.action,b=g.state.cart.find(x=>String(x.product.id)===String(l));b&&(c==="inc"?g.setQty(b.product.id,b.qty+1):c==="dec"?g.setQty(b.product.id,b.qty-1):c==="remove"&&g.removeFromCart(b.product.id))})})},ie=()=>{const t=`
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
          ${["🏷️","💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🫙","🧊"].map((e,s)=>`
            <button type="button" class="emoji-pick-mi ${s===0?"emoji-pick--active":""}"
              data-emoji="${e}"
              style="font-size:24px;width:38px;height:38px;border-radius:8px;border:2px solid ${s===0?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${e}</button>
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
  `;L(t,"manual-item-modal"),setTimeout(()=>{var e,s,n,a;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>P("manual-item-modal")),(s=document.getElementById("mi-cancel"))==null||s.addEventListener("click",()=>P("manual-item-modal")),(n=document.getElementById("mi-name"))==null||n.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.style.borderColor="var(--border-subtle)",i.classList.remove("emoji-pick--active")}),o.style.borderColor="var(--blue-400)",o.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=o.dataset.emoji})}),(a=document.getElementById("mi-save"))==null||a.addEventListener("click",async()=>{var S,_,k,$,m,v,h;const o=(S=document.getElementById("mi-name"))==null?void 0:S.value.trim(),i=(_=document.getElementById("mi-price"))==null?void 0:_.value,d=parseFloat(i)||0,r=Math.max(1,parseInt((k=document.getElementById("mi-qty"))==null?void 0:k.value)||1),l=(($=document.getElementById("mi-unit"))==null?void 0:$.value.trim())||"pcs",c=((m=document.getElementById("mi-category"))==null?void 0:m.value)||"Lainnya",b=((v=document.getElementById("mi-emoji"))==null?void 0:v.value)||"🏷️",x=(h=document.getElementById("mi-save-catalog"))==null?void 0:h.checked;if(!o){window.showToast("Nama produk wajib diisi!","warning");return}if(i===""||d<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(x){const w=await Tt({name:o,price:d,unit:l,category:c,emoji:b,stock:999}),y=await z();g.setProducts(y);const u=y.find(T=>T.id===w)||{id:w,name:o,price:d,unit:l,category:c,emoji:b};g.addToCart(u,r),window.showToast(`Product "${o}" ditambahkan ke katalog & keranjang`,"success")}else{const w={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:o,price:d,unit:l,category:c,emoji:b};g.addToCart(w,r),window.showToast(`"${o}" ditambahkan ke keranjang`,"success")}P("manual-item-modal")}catch(w){window.showToast("Gagal menambahkan item manual!","error"),console.error("[manual-item]",w)}})},0)},oe=t=>{document.addEventListener("click",e=>{const s=e.target.closest(".cat-pill");if(s){Q=s.dataset.cat,ut(),F();return}if(e.target.closest("#btn-manual-item")){ie();return}if(e.target.closest("#btn-pay-cash")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}at("cash")}if(e.target.closest("#btn-pay-transfer")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}at("transfer")}if(e.target.closest("#btn-pay-debt")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}at("debt")}e.target.closest("#btn-clear-cart")&&g.state.cart.length&&(g.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{e.target.id==="pos-search"&&(dt=e.target.value.trim(),F()),e.target.id==="discount-input"&&g.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"&&g.setCustomerName(e.target.value)},{signal:t})},re=async()=>{const t=document.getElementById("view-pos");(!t||!t.querySelector(".pos-layout"))&&Bt();const e=await z();g.setProducts(e),F(),ut()},ht=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],de=["Galon","Botol","Layanan","Lainnya"],le=async()=>{await tt()},tt=async()=>{const t=document.getElementById("view-products"),e=await z();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(s=>ce(s)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,pe()},ce=t=>`
  <div class="product-manage-card" data-id="${t.id}">
    <div class="product-manage-card__header">
      <span class="product-emoji-large">${t.emoji||"📦"}</span>
      <div class="product-manage-card__info">
        <div class="product-manage-card__name">${f(t.name)}</div>
        <div class="product-manage-card__cat">
          <span class="badge badge--blue">${f(t.category)}</span>
        </div>
      </div>
    </div>
    <div class="product-manage-card__price">${p(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${f(t.unit)}</span></div>
    <div class="product-manage-card__actions">
      <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
      <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
    </div>
  </div>
`,pe=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",()=>wt()),t==null||t.addEventListener("click",async s=>{const n=s.target.closest('[data-action="edit"]'),a=s.target.closest('[data-action="delete"]');if(n){const o=parseInt(n.dataset.id),d=(await z()).find(r=>r.id===o);d&&wt(d)}if(a){const o=parseInt(a.dataset.id);ue(o)}})},wt=(t=null)=>{const e=!!t,s=`
    <div class="modal-header">
      <span class="modal-title">${e?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <label class="input-label">Nama Produk</label>
        <input type="text" class="input" id="pf-name"
          value="${f((t==null?void 0:t.name)||"")}"
          placeholder="e.g. Air Isi Ulang Galon"
          maxlength="80" autocomplete="off">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Harga (Rp)</label>
          <input type="number" class="input" id="pf-price"
            value="${(t==null?void 0:t.price)||""}" min="0" max="999999999"
            placeholder="5000" inputmode="numeric">
        </div>
        <div class="input-group">
          <label class="input-label">Satuan</label>
          <input type="text" class="input" id="pf-unit"
            value="${f((t==null?void 0:t.unit)||"pcs")}"
            placeholder="galon, botol, pcs..."
            maxlength="20">
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Kategori</label>
        <select class="input" id="pf-category">
          ${de.map(n=>`<option value="${f(n)}" ${(t==null?void 0:t.category)===n?"selected":""}>${f(n)}</option>`).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
          ${ht.map(n=>`
            <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===n?"emoji-pick--active":""}"
              data-emoji="${n}"
              style="font-size:24px;width:40px;height:40px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===n?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${n}</button>
          `).join("")}
        </div>
        <input type="hidden" id="pf-emoji" value="${f((t==null?void 0:t.emoji)||ht[0])}">
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
  `;L(s,"product-form"),setTimeout(()=>{var n,a,o;(n=document.getElementById("pf-close"))==null||n.addEventListener("click",()=>P("product-form")),(a=document.getElementById("pf-cancel"))==null||a.addEventListener("click",()=>P("product-form")),document.querySelectorAll(".emoji-pick").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(d=>{d.style.borderColor="var(--border-subtle)",d.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=i.dataset.emoji})}),(o=document.getElementById("pf-save"))==null||o.addEventListener("click",async()=>{var x,S,_,k,$,m;const i=(x=document.getElementById("pf-name"))==null?void 0:x.value.trim(),d=parseFloat((S=document.getElementById("pf-price"))==null?void 0:S.value)||0,r=((_=document.getElementById("pf-unit"))==null?void 0:_.value.trim())||"pcs",l=((k=document.getElementById("pf-category"))==null?void 0:k.value)||"Lainnya",c=(($=document.getElementById("pf-emoji"))==null?void 0:$.value)||"📦",b=parseInt((m=document.getElementById("pf-stock"))==null?void 0:m.value)||0;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(d<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{e?(await Rt({...t,name:i,price:d,unit:r,category:l,emoji:c,stock:b}),window.showToast("Produk berhasil diperbarui","success")):(await Tt({name:i,price:d,unit:r,category:l,emoji:c,stock:b}),window.showToast("Produk berhasil ditambahkan","success")),P("product-form");const v=await z();g.setProducts(v),await tt()}catch(v){window.showToast("Gagal menyimpan produk!","error"),console.error("[products]",v)}})},0)},ue=t=>{L(`
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
  `,"delete-confirm"),setTimeout(()=>{var s,n,a;(s=document.getElementById("dc-close"))==null||s.addEventListener("click",()=>P("delete-confirm")),(n=document.getElementById("dc-cancel"))==null||n.addEventListener("click",()=>P("delete-confirm")),(a=document.getElementById("dc-confirm"))==null||a.addEventListener("click",async()=>{try{await Kt(t);const o=await z();g.setProducts(o),P("delete-confirm"),await tt(),window.showToast("Produk dihapus","success")}catch(o){window.showToast("Gagal menghapus produk","error"),console.error("[products]",o)}})},0)};let nt=null;const me=async()=>{nt&&nt(),nt=g.on("transactions:change",t=>{zt(t)}),await At()},At=async()=>{const t=await X();g.setTransactions(t),zt(t)},Mt=t=>{const e=t.paymentMethod,s=t.paymentStatus;return e==="transfer"&&s==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&s==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':s==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':s==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},Nt=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":f(t.paymentMethod)||"—",j=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),zt=t=>{const e=document.getElementById("view-transactions");if(!e)return;const s=[...t].sort((r,l)=>new Date(l.date)-new Date(r.date)),n=new Date().toISOString().split("T")[0],o=t.filter(r=>r.dateKey===n).reduce((r,l)=>l.paymentStatus==="paid"&&l.paymentMethod==="cash"||l.paymentStatus==="transfer_confirmed"?r+l.total:l.paymentMethod==="debt"?r+(l.paidAmount||0):r,0),i=t.reduce((r,l)=>r+(l.remainingDebt||0),0),d=t.filter(r=>r.paymentStatus==="transfer_pending").reduce((r,l)=>r+l.total,0);e.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} transaksi</span></h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <input type="date" class="input" id="tx-filter-date" style="width:auto" value="${n}">
        <button class="btn btn--secondary btn--sm" id="tx-clear-filter">Tampil Semua</button>
      </div>
    </div>

    <!-- Summary strip -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kas Hari Ini</div>
        <div style="font-size:15px;font-weight:800;color:#16a34a">${p(o)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${p(i)}</div>
      </div>
      ${d>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${p(d)}</div>
      </div>`:""}
    </div>

    ${s.length===0?`
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
              ${lt(s)}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `,ge(t,s)},lt=t=>t.length?t.map(e=>{var s;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${f(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${Z(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((s=e.items)==null?void 0:s.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${p(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${p(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${Nt(e)}</span></td>
      <td>${Mt(e)}</td>
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
            ${j(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${j(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${j(e)?"var(--color-danger-border)":"#d1d5db"};color:${j(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${j(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk filter ini</td></tr>',ge=(t,e)=>{var s,n,a;(s=document.getElementById("tx-filter-date"))==null||s.addEventListener("change",o=>{const i=o.target.value,d=i?[...t].filter(l=>l.dateKey===i).sort((l,c)=>new Date(c.date)-new Date(l.date)):e,r=document.getElementById("tx-tbody");r&&(r.innerHTML=lt(d))}),(n=document.getElementById("tx-clear-filter"))==null||n.addEventListener("click",()=>{const o=document.getElementById("tx-tbody"),i=document.getElementById("tx-filter-date");o&&(o.innerHTML=lt(e)),i&&(i.value="")}),(a=document.getElementById("tx-table"))==null||a.addEventListener("click",async o=>{const i=o.target.closest("[data-action]");if(!i)return;const d=parseInt(i.dataset.id),r=i.dataset.action,l=t.find(c=>c.id===d);if(r==="detail"){l&&be(l);return}if(r==="confirm-transfer"){if(!l||!confirm(`Konfirmasi transfer ${p(l.total)} dari ${f(l.customerName||"pelanggan")} sudah diterima?`))return;try{const c={...l,paymentStatus:"transfer_confirmed",paidAmount:l.total,confirmedAt:new Date().toISOString()};await Y(c),g.updateTransaction(d,{paymentStatus:"transfer_confirmed",paidAmount:l.total,confirmedAt:c.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(c){console.error("[tx]",c),window.showToast("Gagal konfirmasi","error")}return}if(r==="pay-debt"){l&&ve(l);return}if(r==="delete"){if(!l)return;if(!j(l)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${f(l.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{await Ht(d),g.removeTransaction(d),window.showToast("Transaksi dihapus","success")}catch(c){console.error("[tx]",c),window.showToast("Gagal menghapus","error")}}})},ve=t=>{var n;const e=t.remainingDebt||0,s=`
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${f(t.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${f(t.customerName||"—")}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#991b1b;font-weight:700;text-transform:uppercase">Total Tagihan</div>
          <div style="font-size:16px;font-weight:900;color:#dc2626">${p(t.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${p(e)}</div>
        </div>
      </div>

      ${(n=t.debtPayments)!=null&&n.length?`
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${t.debtPayments.map(a=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(a.date).toLocaleDateString("id-ID")} — ${f(a.note||"-")}</span>
            <strong style="color:#16a34a">+${p(a.amount)}</strong>
          </div>
        `).join("")}
      </div>`:""}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${p(e)})</label>
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
  `;L(s,"debt-modal"),setTimeout(()=>{var a,o,i;(a=document.getElementById("debt-x"))==null||a.addEventListener("click",()=>P("debt-modal")),(o=document.getElementById("debt-cancel"))==null||o.addEventListener("click",()=>P("debt-modal")),(i=document.getElementById("debt-save"))==null||i.addEventListener("click",async()=>{var $,m,v;const d=parseFloat(($=document.getElementById("cicil-amount"))==null?void 0:$.value)||0;if(d<=0||d>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${p(e)}`,"warning");return}const r=(t.paidAmount||0)+d,l=Math.max(0,e-d),c=l===0?"paid":"partial",b=(t.debtPayments||[]).length+1,x=l===0?`Pelunasan (#${b}/LUNAS ✅)`:`Cicilan #${b}`,S=((v=(m=document.getElementById("cicil-note"))==null?void 0:m.value)==null?void 0:v.trim())||x,_=[...t.debtPayments||[],{date:new Date().toISOString(),amount:d,note:S}],k={...t,paidAmount:r,remainingDebt:l,paymentStatus:c,debtPayments:_};try{await Y(k),g.updateTransaction(t.id,{paidAmount:r,remainingDebt:l,paymentStatus:c,debtPayments:_}),P("debt-modal"),window.showToast(l===0?"🎉 Hutang LUNAS!":`Cicilan ${p(d)} dicatat`,"success")}catch(h){console.error("[debt]",h),window.showToast("Gagal simpan cicilan","error")}})},0)},be=t=>{const e=pt(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const s=Pt(t),n=g.state.settings.printEnabled,a=`
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${f(t.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${Mt(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${f(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${Nt(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${It(t)}</div>

      ${(t.remainingDebt||0)>0?`
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${p(t.remainingDebt)}</div>
      </div>`:""}

      <div style="display:grid;grid-template-columns:${t.change>0?"1fr 1fr":"1fr"};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${p(t.total)}</div>
        </div>
        ${t.change>0?`
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${p(t.change)}</div>
        </div>`:""}
      </div>
    </div>

    <div class="modal-footer" style="flex-wrap:wrap;gap:8px">
      <button class="btn btn--secondary" id="td-close-btn">Tutup</button>
      <button class="btn btn--secondary" id="btn-save-png">🖼️ PNG</button>
      <button class="btn btn--secondary" id="btn-save-pdf">📄 PDF</button>
      ${n?`<a class="print-btn" href="${s}" style="text-decoration:none">🖨️ Cetak</a>`:""}
    </div>
  `;L(a,"tx-detail"),setTimeout(()=>{var o,i,d,r;(o=document.getElementById("td-x"))==null||o.addEventListener("click",()=>P("tx-detail")),(i=document.getElementById("td-close-btn"))==null||i.addEventListener("click",()=>P("tx-detail")),(d=document.getElementById("btn-save-png"))==null||d.addEventListener("click",async()=>{var c;const l=document.getElementById("btn-save-png");l.textContent="⏳...",l.disabled=!0;try{const{default:b}=await V(async()=>{const{default:$}=await import("./vendor-pdf-j4-ZKoBl.js").then(m=>m.h);return{default:$}},[],import.meta.url),x=document.getElementById("receipt-capture"),S=await b(x,{backgroundColor:"#fff",scale:2,useCORS:!0,logging:!1}),_=await new Promise($=>S.toBlob($,"image/png")),k=`Struk-${t.invoiceNo||t.id}.png`;if((c=navigator.canShare)!=null&&c.call(navigator,{files:[new File([_],k,{type:"image/png"})]}))await navigator.share({title:`Struk ${t.invoiceNo}`,files:[new File([_],k,{type:"image/png"})]});else{const $=URL.createObjectURL(_);Object.assign(document.createElement("a"),{href:$,download:k}).click(),setTimeout(()=>URL.revokeObjectURL($),2e3),window.showToast("PNG tersimpan!","success")}}catch(b){console.error("[png]",b),window.showToast("Gagal buat PNG","error")}finally{l.textContent="🖼️ PNG",l.disabled=!1}}),(r=document.getElementById("btn-save-pdf"))==null||r.addEventListener("click",()=>{const l=document.getElementById("receipt-capture");if(!l)return;const c=window.open("","_blank","width=400,height=700");if(!c){window.showToast("Popup diblokir browser. Ijinkan popup.","warning");return}c.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Struk ${f(t.invoiceNo||"")}</title>
        <style>@page{size:80mm auto;margin:6mm}body{margin:0;padding:0;font-family:'Courier New',monospace;font-size:12px;color:#111;background:#fff}img{max-width:100%}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
      </head><body>${l.innerHTML}<script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script></body></html>`),c.document.close()})},0)};let st=null,J=null,W=null,D="semua";const ye=async()=>{st&&st(),st=g.on("transactions:change",t=>{gt(t)}),await mt()},mt=async()=>{const t=await X();g.setTransactions(t),gt(t)},gt=t=>{var h,w;const e=document.getElementById("view-reports");if(!e)return;const s=G(),n=Xt(),a=t.filter(y=>y.dateKey===s),o=a.reduce((y,u)=>y+u.total,0),i=a.length,d=t.filter(y=>{var u;return(u=y.dateKey)==null?void 0:u.startsWith(n)}),r=d.reduce((y,u)=>y+u.total,0),l=t.reduce((y,u)=>y+u.total,0),c=a.filter(y=>y.paymentMethod==="cash").reduce((y,u)=>y+u.total,0),b=a.filter(y=>y.paymentMethod==="transfer"&&y.paymentStatus==="transfer_confirmed").reduce((y,u)=>y+u.total,0),x=a.filter(y=>y.paymentMethod==="transfer"&&y.paymentStatus==="transfer_pending").reduce((y,u)=>y+u.total,0),S=a.filter(y=>y.paymentMethod==="debt").reduce((y,u)=>y+u.total,0),_=t.reduce((y,u)=>{for(const T of u.debtPayments||[])T.date&&T.date.split("T")[0]===s&&(y+=T.amount||0);return y},0),k=c+b+_,$=t.reduce((y,u)=>y+(u.remainingDebt||0),0);t.filter(y=>y.paymentStatus==="transfer_pending").reduce((y,u)=>y+u.total,0);const m=ke(a),v=xe(t);J&&(J.destroy(),J=null),W&&(W.destroy(),W=null),e.innerHTML=`
    <div class="section-header">
      <div>
        <h2 class="section-title">📊 Laporan Penjualan &amp; Keuangan Real</h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Analisis mendalam omzet, kas masuk, piutang, cicilan, &amp; performa produk
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn--secondary btn--sm" id="btn-refresh-reports">🔄 Refresh</button>
        <button class="btn btn--secondary btn--sm" id="btn-export-pdf-report">📄 Export PDF Laporan</button>
      </div>
    </div>

    <!-- Stats Grid: Financial KPIs -->
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      <div class="stat-card" style="border-left:4px solid var(--blue-600)">
        <span class="stat-card__icon">📊</span>
        <div class="stat-card__value" style="color:var(--blue-700)">${p(o)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${i} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${p(k)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${p(_)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${p($)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${p(r)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${d.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${p(l)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${t.length} transaksi</div>
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
            <strong style="color:var(--color-success)">${p(c)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${p(b)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${p(_)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${p(S)}</strong>
          </div>

          ${x>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${p(x)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${c+b+S+_>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${m.length?m.slice(0,7).map((y,u)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${u+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${f(y.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${y.qty}x</span>
            </div>
          `).join(""):'<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px">Belum ada penjualan hari ini</div>'}
      </div>
    </div>

    <!-- Detailed Ledger & Transaction Analysis Table -->
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:800;text-transform:uppercase;letter-spacing:.05em">
          📋 Analisis Detail Penjualan &amp; Status Pelunasan
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="cat-pill ${D==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${D==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${D==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${D==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${fe(t,D)}
          </tbody>
        </table>
      </div>
    </div>
  `,(h=document.getElementById("btn-refresh-reports"))==null||h.addEventListener("click",mt),(w=document.getElementById("btn-export-pdf-report"))==null||w.addEventListener("click",()=>we(t,s,n)),document.querySelectorAll("[data-rpt-filter]").forEach(y=>{y.addEventListener("click",()=>{D=y.dataset.rptFilter,gt(t)})}),requestAnimationFrame(()=>he(v,c,b,S,_))},fe=(t,e)=>{let s=[...t];e==="cash"&&(s=s.filter(a=>a.paymentMethod==="cash")),e==="transfer"&&(s=s.filter(a=>a.paymentMethod==="transfer")),e==="debt"&&(s=s.filter(a=>a.paymentMethod==="debt"));const n=s.sort((a,o)=>new Date(o.date)-new Date(a.date));return n.length?n.slice(0,50).map(a=>{const o=a.total||0;let i=0,d=0;a.paymentMethod==="cash"?i=o:a.paymentMethod==="transfer"?a.paymentStatus==="transfer_confirmed"?i=o:d=o:a.paymentMethod==="debt"&&(i=a.paidAmount||0,d=a.remainingDebt||0);const r=(a.items||[]).map(b=>{var x;return`${((x=b.product)==null?void 0:x.name)||"Item"} (${b.qty}x)`}).join(", "),l=a.paymentMethod==="debt"?d===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${p(d)}</span>`:a.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',c=a.paymentMethod==="cash"?"💵 Tunai":a.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${f(a.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${Z(new Date(a.date))}</td>
        <td><strong style="color:var(--text-primary)">${f(a.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${f(r)}">${f(r||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${p(o)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${p(i)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${d>0?p(d):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${c}</span> ${l}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>'},he=async(t,e,s,n,a)=>{const{Chart:o,registerables:i}=await V(async()=>{const{Chart:c,registerables:b}=await import("./vendor-chart-19k6OvwP.js");return{Chart:c,registerables:b}},[],import.meta.url);o.register(...i);const d=document.getElementById("chart-bar");d&&(J=new o(d,{type:"bar",data:{labels:t.map(c=>c.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(c=>c.total),backgroundColor:t.map((c,b)=>b===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>" "+p(c.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:c=>p(c),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const r=document.getElementById("chart-donut"),l=e+s+n+a;r&&l>0&&(W=new o(r,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,s,n,a],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.label}: ${p(c.raw)}`}}}}}))},we=async(t,e,s)=>{try{const n=document.getElementById("btn-export-pdf-report");n&&(n.textContent="⏳ Memproses PDF...",n.disabled=!0);const{jsPDF:a}=await V(async()=>{const{jsPDF:u}=await import("./vendor-pdf-j4-ZKoBl.js").then(T=>T.j);return{jsPDF:u}},[],import.meta.url),{default:o}=await V(async()=>{const{default:u}=await import("./jspdf.plugin.autotable-QkGqYg11.js").then(T=>T.j);return{default:u}},__vite__mapDeps([0,1,2]),import.meta.url),i=new a({orientation:"portrait",unit:"mm",format:"a4"}),d=g.state.settings,r=i.internal.pageSize.getWidth();i.setFontSize(16),i.setFont("helvetica","bold"),i.text(d.shopName||"Blue Mountain Refilling Station",r/2,16,{align:"center"}),i.setFontSize(10),i.setFont("helvetica","normal"),i.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",r/2,22,{align:"center"}),i.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,r/2,27,{align:"center"});const l=t.filter(u=>u.dateKey===e),c=l.reduce((u,T)=>u+T.total,0),b=t.filter(u=>{var T;return(T=u.dateKey)==null?void 0:T.startsWith(s)}).reduce((u,T)=>u+T.total,0),x=t.reduce((u,T)=>u+T.total,0),S=l.filter(u=>u.paymentMethod==="cash").reduce((u,T)=>u+T.total,0),_=l.filter(u=>u.paymentMethod==="transfer"&&u.paymentStatus==="transfer_confirmed").reduce((u,T)=>u+T.total,0),k=t.reduce((u,T)=>{for(const B of T.debtPayments||[])B.date&&B.date.split("T")[0]===e&&(u+=B.amount||0);return u},0),$=S+_+k,m=t.reduce((u,T)=>u+(T.remainingDebt||0),0);i.setFontSize(11),i.setFont("helvetica","bold"),i.text("1. Ringkasan Kinerja Keuangan",14,35);const v=[["Omzet Gross Hari Ini",p(c)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",p($)],["Cicilan Piutang Terkumpul Hari Ini",p(k)],["Total Piutang Belum Lunas (Semua Pelanggan)",p(m)],["Omzet Bulan Ini",p(b)],["Total Omzet All-Time",p(x)],["Jumlah Transaksi Hari Ini",`${l.length} transaksi`]];o(i,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:v,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const h=i.lastAutoTable.finalY+10;i.setFontSize(11),i.setFont("helvetica","bold"),i.text("2. Rincian Riwayat Transaksi & Pelunasan",14,h);const w=[...t].sort((u,T)=>new Date(T.date)-new Date(u.date)).slice(0,80);o(i,{startY:h+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:w.map(u=>{let T=u.paymentMethod==="cash"?u.total:u.paymentMethod==="transfer"?u.paymentStatus==="transfer_confirmed"?u.total:0:u.paidAmount||0,B=u.paymentMethod==="debt"?u.remainingDebt||0:u.paymentStatus==="transfer_pending"?u.total:0;return[u.invoiceNo||"-",new Date(u.date).toLocaleDateString("id-ID"),u.customerName||"—",u.paymentMethod==="cash"?"Tunai":u.paymentMethod==="transfer"?"Transfer":"Hutang",p(u.total),p(T),B>0?p(B):"—",u.paymentMethod==="debt"?B===0?"Lunas":"Cicilan":u.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const y=i.internal.getNumberOfPages();for(let u=1;u<=y;u++)i.setPage(u),i.setFontSize(8),i.setFont("helvetica","normal"),i.text(`Hal ${u} dari ${y} — ${d.shopName||"Blue Mountain POS"}`,r/2,i.internal.pageSize.getHeight()-8,{align:"center"});i.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch(n){console.error("[pdf-report]",n),window.showToast("Gagal export PDF","error")}finally{const n=document.getElementById("btn-export-pdf-report");n&&(n.textContent="📄 Export PDF Laporan",n.disabled=!1)}},xe=t=>{const e=[];for(let s=6;s>=0;s--){const n=new Date;n.setDate(n.getDate()-s);const a=n.toISOString().split("T")[0],o=t.filter(d=>d.dateKey===a).reduce((d,r)=>d+r.total,0),i=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(n);e.push({key:a,label:i,total:o})}return e},ke=t=>{var s;const e={};for(const n of t)for(const a of n.items||[]){if(!((s=a==null?void 0:a.product)!=null&&s.name))continue;const o=a.product.name;e[o]=(e[o]||0)+a.qty}return Object.entries(e).map(([n,a])=>({name:n,qty:a})).sort((n,a)=>a.qty-n.qty)},$e=async()=>{await Te(),await vt()},Te=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const s of t){const n=await ct(s);n!==null&&(e[s]=n)}g.updateSettings(e)},vt=async()=>{const t=document.getElementById("view-settings"),e=g.state.settings,s="3.0.0",n=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Pengaturan</h2>
      <button class="btn btn--primary" id="btn-save-settings">💾 Simpan Semua</button>
    </div>

    <!-- Toko -->
    <div class="settings-section">
      <div class="settings-section-header">🏪 Informasi Toko</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Toko</div>
          <div class="settings-row__desc">Tampil di struk &amp; header</div>
        </div>
        <input type="text" class="input" id="set-shopName" value="${f(e.shopName||"")}" maxlength="80" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${f(e.shopAddress||"")}" maxlength="120" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${f(e.shopPhone||"")}" maxlength="20" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${f(e.cashierName||"Admin")}" maxlength="40" style="max-width:200px">
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
        <input type="text" class="input" id="set-bankName" value="${f(e.bankName||"BCA")}" maxlength="30" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${f(e.bankNumber||"")}" maxlength="30" style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${f(e.bankHolder||"")}" maxlength="60" style="max-width:240px">
      </div>
    </div>

    <!-- Printer -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Bluetooth Thermal Printer</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Aktifkan Print</div>
          <div class="settings-row__desc">Cetak struk via Bluetooth Print App (Android)</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="set-printEnabled" ${e.printEnabled?"checked":""}>
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">URL Printer (Opsional)</div>
          <div class="settings-row__desc">Untuk testing via localhost PHP server.<br>
            Contoh: <code style="font-size:11px;color:var(--blue-300)">http://192.168.1.x/receipt.php</code>
          </div>
        </div>
        <input type="url" class="input" id="set-printerUrl" value="${f(e.printerUrl||"")}"
          placeholder="http://..." maxlength="200" style="max-width:280px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Setup Printer</div>
          <div class="settings-row__desc">Cara menghubungkan printer Bluetooth</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-printer-guide">📖 Lihat Panduan</button>
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
        ${n?'<span class="badge badge--green">✅ App Terinstall</span>':'<button class="btn btn--primary btn--sm" id="btn-install-pwa">📲 Install</button>'}
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Versi Aplikasi</div>
          <div class="settings-row__desc">Dukungan Otomatis via package.json &amp; Vite Engine</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800">v${f(s)} High-End</span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Build: ${new Date().toLocaleDateString("id-ID")}</div>
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
  `,_e()},_e=()=>{var t,e,s,n,a,o,i,d;(t=document.getElementById("btn-export-backup"))==null||t.addEventListener("click",async()=>{var l;const r=document.getElementById("btn-export-backup");r&&(r.textContent="⏳ Menyiapkan...",r.disabled=!0);try{const c=await Jt(),b=JSON.stringify(c,null,2),x=new Blob([b],{type:"application/json"}),S=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),k=`Backup-KASIR-${(c.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${S}.json`;if((l=navigator.canShare)!=null&&l.call(navigator,{files:[new File([x],k,{type:"application/json"})]}))await navigator.share({title:"Backup KASIR",files:[new File([x],k,{type:"application/json"})]});else{const $=URL.createObjectURL(x),m=document.createElement("a");m.href=$,m.download=k,m.click(),setTimeout(()=>URL.revokeObjectURL($),2e3)}window.showToast("✅ File backup berhasil diunduh!","success")}catch(c){console.error("[export-backup]",c),window.showToast("Gagal ekspor backup","error")}finally{r&&(r.textContent="📥 Unduh Backup JSON",r.disabled=!1)}}),(e=document.getElementById("btn-trigger-import"))==null||e.addEventListener("click",()=>{var r;(r=document.getElementById("input-import-backup"))==null||r.click()}),(s=document.getElementById("input-import-backup"))==null||s.addEventListener("change",r=>{var b;const l=(b=r.target.files)==null?void 0:b[0];if(!l)return;const c=new FileReader;c.onload=async x=>{var S;try{const _=(S=x.target)==null?void 0:S.result,k=JSON.parse(_);if(!k.data||!k.data.products&&!k.data.transactions){window.showToast("Format file backup tidak valid!","error");return}const $=(k.data.products||[]).length,m=(k.data.transactions||[]).length,v=(k.data.expenses||[]).length,h=k.exportedAt?new Date(k.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",w=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${f(k.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${h}
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:16px;font-weight:900;color:var(--blue-700)">${$}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:16px;font-weight:900;color:#16a34a">${m}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pengeluaran</div>
                <div style="font-size:16px;font-weight:900;color:#dc2626">${v}</div>
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
        `;L(w,"import-confirm-modal"),setTimeout(()=>{var y,u,T;(y=document.getElementById("imp-x"))==null||y.addEventListener("click",()=>P("import-confirm-modal")),(u=document.getElementById("imp-cancel"))==null||u.addEventListener("click",()=>P("import-confirm-modal")),(T=document.getElementById("imp-confirm"))==null||T.addEventListener("click",async()=>{var N;const B=((N=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:N.value)||"replace",M=document.getElementById("imp-confirm");M&&(M.textContent="⏳ Memulihkan...",M.disabled=!0);try{await Wt(k,B);const[A,I,K]=await Promise.all([z(),X(),_t()]);g.setProducts(A),g.setTransactions(I),g.setExpenses(K),P("import-confirm-modal"),window.showToast("🎉 Data berhasil dipulihkan & sinkron!","success"),setTimeout(()=>vt(),600)}catch(A){console.error("[import-backup]",A),window.showToast("Gagal memulihkan data: "+A.message,"error")}})},0)}catch(_){console.error("[parse-backup]",_),window.showToast("File JSON rusak atau tidak terbaca!","error")}},c.readAsText(l),r.target.value=""}),(n=document.getElementById("btn-save-settings"))==null||n.addEventListener("click",async()=>{const r=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","qrisNumber"],l={};for(const b of r){const x=document.getElementById(`set-${b}`);x&&(l[b]=b==="taxRate"?parseFloat(x.value)||0:x.value.trim(),await rt(b,l[b]))}const c=document.getElementById("set-printEnabled");c&&(l.printEnabled=c.checked,await rt("printEnabled",c.checked)),g.updateSettings(l),window.showToast("Pengaturan berhasil disimpan","success")}),(a=document.getElementById("btn-printer-guide"))==null||a.addEventListener("click",()=>{Ee()}),(o=document.getElementById("btn-install-pwa"))==null||o.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(i=document.getElementById("btn-clear-cache"))==null||i.addEventListener("click",async()=>{try{if("caches"in window){const r=await caches.keys();await Promise.all(r.map(l=>caches.delete(l)))}if("serviceWorker"in navigator){const r=await navigator.serviceWorker.getRegistrations();for(const l of r)await l.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch(r){console.error("[cache]",r),window.showToast("Gagal hapus cache","error")}}),(d=document.getElementById("btn-reset-all"))==null||d.addEventListener("click",async()=>{if(confirm(`⚠️ HAPUS SEMUA DATA?

Semua transaksi, pengeluaran, dan produk akan dihapus permanen.
Tindakan ini TIDAK dapat dibatalkan!`))try{await Gt(),window.showToast("Semua data berhasil dihapus. Reloading...","error"),setTimeout(()=>window.location.reload(),1500)}catch(l){console.error("[reset]",l),window.showToast("Gagal menghapus data","error")}})},Ee=()=>{L(`
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Setup Printer</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <h3 style="color:var(--text-primary);margin-bottom:8px">Langkah Setup:</h3>
      <ol style="padding-left:20px;display:flex;flex-direction:column;gap:10px">
        <li><strong style="color:var(--text-primary)">Install App:</strong><br>
          Download <a href="https://play.google.com/store/apps/details?id=mate.bluetoothprint" target="_blank" rel="noopener noreferrer"
            style="color:var(--blue-300)">Bluetooth Print App</a> dari Play Store</li>
        <li><strong style="color:var(--text-primary)">Enable Browser Print:</strong><br>
          Buka app → Settings → Browser/Website Print → Enable</li>
        <li><strong style="color:var(--text-primary)">Pair Printer:</strong><br>
          Pasangkan printer Bluetooth di Settings Android terlebih dahulu</li>
        <li><strong style="color:var(--text-primary)">Pilih Printer di App:</strong><br>
          Di Bluetooth Print App, pilih printer yang sudah dipasangkan</li>
        <li><strong style="color:var(--text-primary)">Buka POS di Chrome Android:</strong><br>
          Kunjungi URL GitHub Pages ini di browser Chrome Android</li>
        <li><strong style="color:var(--text-primary)">Klik Cetak Struk:</strong><br>
          Setelah transaksi, klik "Cetak Struk" → App akan otomatis terbuka dan mencetak</li>
      </ol>
      <div style="margin-top:16px;padding:12px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:10px;font-size:12px">
        💡 <strong style="color:var(--text-primary)">Tips:</strong> Aktifkan "Print+Close" di Bluetooth Print App agar app otomatis kembali ke browser setelah cetak.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti</button>
    </div>
  `,"printer-guide"),setTimeout(()=>{var e,s;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>P("printer-guide")),(s=document.getElementById("pg-close2"))==null||s.addEventListener("click",()=>P("printer-guide"))},0)};let it=null,ot=null,H=!1;const Se=async()=>{it&&it(),ot&&ot(),it=g.on("transactions:change",()=>{H||R()}),ot=g.on("expenses:change",()=>{H||R()}),await R()},R=async()=>{if(!H){H=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,s,n]=await Promise.all([g.state.transactions.length?Promise.resolve(g.state.transactions):X().then(m=>(g.setTransactions(m),m)),_t().then(m=>(g.setExpenses(m),m)),ct("modalAwal")]),a=parseFloat(n)||0;let o=0,i=0,d=0,r=0,l=0;for(const m of e)if(m.paymentMethod==="cash"&&(m.paymentStatus==="paid"||!m.paymentStatus)&&(o+=m.total),m.paymentMethod==="transfer"&&(m.paymentStatus==="transfer_confirmed"?i+=m.total:r+=m.total),m.paymentMethod==="debt"){for(const v of m.debtPayments||[])d+=v.amount;l+=m.remainingDebt||0}const c=o+i+d,b=s.reduce((m,v)=>m+(v.amount||0),0),x=a+c-b,S=r+l,_=Pe(e,s),k=Be(e,s),$=[...e.filter(m=>m.paymentStatus==="transfer_pending"),...e.filter(m=>(m.paymentMethod==="debt"||m.paymentStatus==="partial"||m.paymentStatus==="unpaid")&&(m.remainingDebt||0)>0)].sort((m,v)=>new Date(m.date)-new Date(v.date));t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${p(a)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${p(x)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${p(c)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${p(b)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${s.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${p(S)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${$.length} belum lunas</div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          ${O("💵 Tunai",o,"#16a34a")}
          ${O("📲 Transfer",i,"#2563eb")}
          ${O("📋 Cicilan Hutang",d,"#7c3aed")}
          ${O("⏳ Transfer Pending",r,"#d97706",!0)}
          ${O("🔴 Piutang Hutang",l,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding -->
      ${$.length>0?`
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">⚠️ Daftar Piutang &amp; Cicilan Berjalan (${$.length})</div>
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
              ${$.map(m=>{const v=m.total||0,h=m.paymentStatus==="transfer_pending"?v:m.remainingDebt||0,w=v-h,y=Math.min(100,Math.max(0,Math.round(w/v*100))),u=(m.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${f(m.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${f(m.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${p(v)}</td>
                <td style="color:#16a34a;font-weight:700">${p(w)}</td>
                <td style="font-weight:800;color:#dc2626">${p(h)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${y}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${u>0?`${u}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${y}%;background:${y===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${m.paymentStatus==="transfer_pending"?`
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${m.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>`:`
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${m.id}"
                      style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      💰 Cicil / Pelunasan
                    </button>`}
                </td>
              </tr>`}).join("")}
            </tbody>
          </table>
        </div>
      </div>`:""}

      <!-- Pengeluaran -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)">📤 Pengeluaran Operasional</div>
          <button class="btn btn--secondary btn--sm" id="btn-add-expense">+ Tambah Pengeluaran</button>
        </div>
        ${s.length===0?`
          <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        `:`
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${[...s].sort((m,v)=>new Date(v.date)-new Date(m.date)).map(m=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${f(m.category||"Lainnya")}</span></td>
                  <td>${f(m.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${p(m.amount)}</td>
                  <td>
                    <button class="btn btn--sm" data-action="delete-expense" data-id="${m.id}"
                      style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")}
              </tbody>
            </table>
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
              ${Ie(_,a)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Jurnal Entri -->
      <div class="card">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📒 Jurnal Entri (20 Terbaru)</div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table">
            <thead>
              <tr><th>Tanggal</th><th>Keterangan</th><th>Debit</th><th>Kredit</th><th>Akun</th></tr>
            </thead>
            <tbody>
              ${k.slice(0,20).map(m=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${f(m.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${m.debit>0?p(m.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${m.credit>0?p(m.credit):"—"}</td>
                <td><span class="badge ${m.type==="kas"?"badge--green":m.type==="piutang"?"":"badge--blue"}"
                  style="${m.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${f(m.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,Le(e)}finally{H=!1}}},O=(t,e,s,n=!1)=>`
  <div style="padding:10px 14px;background:${n?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${s}">${p(e)}</div>
    ${n?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Pe=(t,e)=>{const s={};for(const a of t){const o=a.dateKey;if(o){if(s[o]||(s[o]={masuk:0,keluar:0}),a.paymentMethod==="cash"&&(a.paymentStatus==="paid"||!a.paymentStatus)&&(s[o].masuk+=a.total),a.paymentMethod==="transfer"&&a.paymentStatus==="transfer_confirmed"){const i=a.confirmedAt?a.confirmedAt.split("T")[0]:o;s[i]||(s[i]={masuk:0,keluar:0}),s[i].masuk+=a.total}if(a.paymentMethod==="debt")for(const i of a.debtPayments||[]){const d=i.date?i.date.split("T")[0]:o;s[d]||(s[d]={masuk:0,keluar:0}),s[d].masuk+=i.amount}}}for(const a of e){const o=a.dateKey||(a.date?a.date.split("T")[0]:null);o&&(s[o]||(s[o]={masuk:0,keluar:0}),s[o].keluar+=a.amount||0)}const n=[];for(let a=29;a>=0;a--){const o=new Date;o.setDate(o.getDate()-a);const i=o.toISOString().split("T")[0];n.push({key:i,...s[i]||{masuk:0,keluar:0}})}return n},Ie=(t,e)=>{let s=e;const n=t.filter(a=>a.masuk>0||a.keluar>0).map(a=>{const o=a.masuk-a.keluar;return s+=o,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(a.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${a.masuk>0?p(a.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${a.keluar>0?p(a.keluar):"—"}</td>
      <td style="font-weight:800;color:${o>=0?"#16a34a":"#dc2626"}">${o>=0?"+":""}${p(o)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${p(s)}</td>
    </tr>`});return n.length?n.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Be=(t,e)=>{const s=[];for(const n of t){const a=f(n.customerName||"Pelanggan");if(n.paymentMethod==="cash")s.push({date:n.date,desc:`Penjualan Tunai — ${n.invoiceNo} (${a})`,debit:n.total,credit:n.total,account:"Kas / Penjualan",type:"kas"});else if(n.paymentMethod==="transfer")n.paymentStatus==="transfer_confirmed"?s.push({date:n.confirmedAt||n.date,desc:`Transfer Terkonfirmasi — ${n.invoiceNo} (${a})`,debit:n.total,credit:n.total,account:"Bank / Penjualan",type:"kas"}):s.push({date:n.date,desc:`Transfer Pending — ${n.invoiceNo} (${a}) [Menunggu Konfirmasi]`,debit:n.total,credit:n.total,account:"Piutang Transfer",type:"piutang"});else if(n.paymentMethod==="debt"){s.push({date:n.date,desc:`Penjualan Piutang Usaha — ${n.invoiceNo} (${a}) [Total Tagihan: ${p(n.total)}]`,debit:n.total,credit:n.total,account:"Piutang / Penjualan",type:"piutang"});const o=n.debtPayments||[];let i=0;o.forEach((d,r)=>{i+=d.amount||0;const l=Math.max(0,n.total-i),c=l===0,b=r+1,x=c?`Pelunasan (#${b}/LUNAS ✅)`:`Cicilan #${b} (dari ${o.length})`,S=d.note?` — ${f(d.note)}`:"";s.push({date:d.date,desc:`${x} — ${n.invoiceNo} (${a})${S} [Bayar: ${p(d.amount)} | Sisa: ${p(l)}]`,debit:d.amount,credit:d.amount,account:c?"Kas / Piutang (LUNAS ✅)":"Kas / Piutang Usaha",type:"kas"})})}}for(const n of e)s.push({date:n.date,desc:`Beban ${f(n.category||"Operasional")} — ${f(n.note||"Pengeluaran kas")}`,debit:n.amount,credit:n.amount,account:`Beban (${f(n.category||"Operasional")}) / Kas`,type:"beban"});return s.sort((n,a)=>new Date(a.date)-new Date(n.date))},Le=t=>{var e,s,n,a,o;(e=document.getElementById("btn-refresh-finance"))==null||e.addEventListener("click",R),(s=document.getElementById("btn-set-modal-awal"))==null||s.addEventListener("click",()=>{const d=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${g.state.settings.modalAwal||0||""}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;L(d,"modal-awal"),setTimeout(()=>{var r,l,c;(r=document.getElementById("ma-x"))==null||r.addEventListener("click",()=>P("modal-awal")),(l=document.getElementById("ma-cancel"))==null||l.addEventListener("click",()=>P("modal-awal")),(c=document.getElementById("ma-save"))==null||c.addEventListener("click",async()=>{var x;const b=parseFloat((x=document.getElementById("modal-awal-input"))==null?void 0:x.value)||0;await rt("modalAwal",b),g.updateSettings({modalAwal:b}),P("modal-awal"),window.showToast("Modal Awal disimpan!","success"),R()})},0)}),(n=document.getElementById("btn-add-expense"))==null||n.addEventListener("click",()=>{const d=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(r=>`<option value="${f(r)}">${f(r)}</option>`).join("")}
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
    `;L(d,"expense-modal"),setTimeout(()=>{var r,l,c;(r=document.getElementById("exp-x"))==null||r.addEventListener("click",()=>P("expense-modal")),(l=document.getElementById("exp-cancel"))==null||l.addEventListener("click",()=>P("expense-modal")),(c=document.getElementById("exp-save"))==null||c.addEventListener("click",async()=>{var $,m,v,h;const b=parseFloat(($=document.getElementById("exp-amount"))==null?void 0:$.value)||0,x=((m=document.getElementById("exp-category"))==null?void 0:m.value)||"Lainnya",S=((h=(v=document.getElementById("exp-note"))==null?void 0:v.value)==null?void 0:h.trim())||"";if(b<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const _=new Date().toISOString(),k={date:_,dateKey:_.split("T")[0],category:x,note:S,amount:b};try{const w=await Ft(k);k.id=w,g.addExpense(k),P("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch(w){console.error("[expense]",w),window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(a=document.getElementById("expense-table"))==null||a.addEventListener("click",async i=>{const d=i.target.closest('[data-action="delete-expense"]');if(!d||!confirm("Hapus pengeluaran ini?"))return;const r=parseInt(d.dataset.id);try{await qt(r),g.removeExpense(r),window.showToast("Pengeluaran dihapus","success")}catch(l){console.error("[expense]",l),window.showToast("Gagal hapus","error")}}),(o=document.getElementById("piutang-table"))==null||o.addEventListener("click",async i=>{const d=i.target.closest("[data-action]");if(!d)return;const r=parseInt(d.dataset.id),l=d.dataset.action,c=(g.state.transactions||t).find(b=>b.id===r);if(c){if(l==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${p(c.total)} dari ${f(c.customerName||"pelanggan")} sudah diterima?`))return;const b={...c,paymentStatus:"transfer_confirmed",paidAmount:c.total,confirmedAt:new Date().toISOString()};try{await Y(b),g.updateTransaction(r,{paymentStatus:"transfer_confirmed",paidAmount:c.total,confirmedAt:b.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(x){console.error("[confirm]",x),window.showToast("Gagal konfirmasi","error")}}if(l==="pay-debt"){const b=c.remainingDebt||0,x=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${p(c.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${p(b)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${b}" min="1" max="${b}" step="1000" inputmode="numeric">
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
      `;L(x,"mini-cicil"),setTimeout(()=>{var S,_,k;(S=document.getElementById("mc-x"))==null||S.addEventListener("click",()=>P("mini-cicil")),(_=document.getElementById("mc-cancel"))==null||_.addEventListener("click",()=>P("mini-cicil")),(k=document.getElementById("mc-save"))==null||k.addEventListener("click",async()=>{var M,N,A;const $=parseFloat((M=document.getElementById("mc-amount"))==null?void 0:M.value)||0;if($<=0||$>b){window.showToast("Jumlah tidak valid","warning");return}const m=(c.paidAmount||0)+$,v=Math.max(0,b-$),h=v===0?"paid":"partial",w=(c.debtPayments||[]).length+1,y=v===0?`Pelunasan (#${w}/LUNAS ✅)`:`Cicilan #${w}`,u=((A=(N=document.getElementById("mc-note"))==null?void 0:N.value)==null?void 0:A.trim())||y,T=[...c.debtPayments||[],{date:new Date().toISOString(),amount:$,note:u}],B={...c,paidAmount:m,remainingDebt:v,paymentStatus:h,debtPayments:T};try{await Y(B),g.updateTransaction(r,{paidAmount:m,remainingDebt:v,paymentStatus:h,debtPayments:T}),P("mini-cicil"),window.showToast(v===0?"🎉 Hutang LUNAS!":`Cicilan #${w} (${p($)}) dicatat`,"success")}catch(I){console.error("[cicil]",I),window.showToast("Gagal simpan cicilan","error")}})},0)}}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const bt=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine?(t.textContent="Sistem Online",t.classList.remove("status-badge--offline")):(t.textContent="Mode Offline",t.classList.add("status-badge--offline")))};window.addEventListener("online",bt);window.addEventListener("offline",bt);window.showToast=(t,e="info",s="")=>{const n=document.getElementById("toast-container");if(!n)return;const a={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},o=document.createElement("div");o.className=`toast toast--${e}`,o.setAttribute("role","alert"),o.innerHTML=`
    <span class="toast__icon">${a[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${s?`<div class="toast__title">${s}</div>`:""}
      <div class="toast__msg">${t}</div>
    </div>
  `,n.appendChild(o);const i=()=>{o.classList.add("hiding"),o.addEventListener("animationend",()=>o.remove(),{once:!0})},d=setTimeout(i,3500);o.addEventListener("click",()=>{clearTimeout(d),i()})};const xt=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=Et()),e&&(e.textContent=Yt())},Ae={pos:{init:ne,refresh:re},products:{init:le,refresh:tt},transactions:{init:me,refresh:At},reports:{init:ye,refresh:mt},settings:{init:$e,refresh:vt},finance:{init:Se,refresh:R}},kt=new Set,$t=async t=>{const e=Ae[t];if(e){document.querySelectorAll(".dock-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===t)}),document.querySelectorAll(".view").forEach(s=>{s.classList.toggle("active",s.id===`view-${t}`)});try{kt.has(t)?await e.refresh():(await e.init(),kt.add(t)),sessionStorage.setItem("activeView",t)}catch(s){console.error(`[Navigation] Error initializing view "${t}":`,s);const n=document.getElementById(`view-${t}`);n&&!n.children.length&&(n.innerHTML=`
        <div class="empty-state" style="padding:60px 20px">
          <div class="empty-state__icon">⚠️</div>
          <div class="empty-state__text">
            <strong style="font-size:16px;color:var(--text-primary)">Gagal Memuat Halaman</strong><br>
            <span style="font-size:12px;color:var(--text-muted)">${s.message||"Terjadi kesalahan sistem"}</span>
          </div>
          <button class="btn btn--primary btn--sm" onclick="location.reload()" style="margin-top:16px">
            🔄 Reload Halaman
          </button>
        </div>
      `)}g.navigate(t)}},Me=(t,e)=>{if(!t)return;const s=t.getBoundingClientRect(),n=Math.max(s.width,s.height),a=document.createElement("span");a.className="ripple-effect",a.style.cssText=`width:${n}px;height:${n}px;left:${e.clientX-s.left-n/2}px;top:${e.clientY-s.top-n/2}px`,t.style.position="relative",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0})},Ct=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};g.on("settings:change",Ct);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const Ne=async()=>{try{await Vt(),await Ut()}catch(v){console.error("[DB] Failed to open database:",v),window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const v of t){const h=await ct(v);h!==null&&(v==="modalAwal"||v==="taxRate"?e[v]=parseFloat(h)||0:e[v]=h)}g.updateSettings(e),Ct(g.state.settings),bt(),xt(),setInterval(xt,1e3);const s=document.querySelector(".dock"),n=[...document.querySelectorAll(".dock-item")],a=1.55,o=1.28,i=1.1,d=16,r=n.map(()=>1),l=n.map(()=>1);let c=null;const b=(v,h,w)=>v+(h-v)*w,x=.22,S=()=>{let v=!1;n.forEach((h,w)=>{r[w]=b(r[w],l[w],x),Math.abs(r[w]-l[w])>.001&&(v=!0);const y=r[w],u=(y-1)/(a-1)*d;h.style.transform=`translateY(${-u}px) scale(${y.toFixed(4)})`,h.style.zIndex=y>1.01?Math.round(y*10):""}),c=v?requestAnimationFrame(S):null},_=()=>{c||(c=requestAnimationFrame(S))},k=v=>{n.forEach((h,w)=>{const y=Math.abs(w-v);l[w]=y===0?a:y===1?o:y===2?i:1})},$=()=>n.forEach((v,h)=>l[h]=1);s==null||s.addEventListener("mousemove",v=>{let h=0,w=1/0;n.forEach((y,u)=>{const T=y.getBoundingClientRect(),B=Math.abs(v.clientX-(T.left+T.width/2));B<w&&(w=B,h=u)}),k(h),_()}),s==null||s.addEventListener("mouseleave",()=>{$(),_()}),n.forEach((v,h)=>{v.addEventListener("touchstart",()=>{k(h),_()},{passive:!0}),v.addEventListener("touchend",()=>{setTimeout(()=>{$(),_()},350)},{passive:!0})}),document.querySelectorAll(".dock-item").forEach(v=>{v.addEventListener("click",async h=>{const w=v.dataset.view;w&&(v.classList.add("bouncing"),v.addEventListener("animationend",()=>v.classList.remove("bouncing"),{once:!0}),Me(v.querySelector(".dock-icon"),h),await $t(w))})});const m=sessionStorage.getItem("activeView")||"pos";await $t(m)};document.addEventListener("DOMContentLoaded",Ne);
