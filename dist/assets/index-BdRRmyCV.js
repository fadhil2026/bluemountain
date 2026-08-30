const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-QkGqYg11.js","./_commonjsHelpers-C4iS2aBk.js","./vendor-pdf-j4-ZKoBl.js"])))=>i.map(i=>d[i]);
import{X as jt}from"./vendor-db-2jmnBxhj.js";import{_ as V}from"./vendor-pdf-j4-ZKoBl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const I=new jt("BlueMountainPOS");I.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});const A=()=>I.products.toArray(),$t=t=>I.products.add(t),Dt=t=>I.products.put(t),Rt=t=>I.products.delete(t),Kt=t=>I.transactions.add(t),lt=()=>I.transactions.toArray(),Ht=t=>I.transactions.delete(t),W=t=>I.transactions.put(t),Ot=t=>I.expenses.add(t),Ft=()=>I.expenses.toArray(),qt=t=>I.expenses.delete(t),ct=async t=>{const e=await I.settings.get(t);return(e==null?void 0:e.value)??null},ot=(t,e)=>I.settings.put({key:t,value:e}),Gt=async()=>{await I.products.count()>0||await I.products.bulkAdd([{name:"Air Isi Ulang Galon",category:"Galon",price:5e3,unit:"galon",emoji:"🪣",stock:999},{name:"Antar Galon (dalam)",category:"Galon",price:3e3,unit:"kali",emoji:"🛵",stock:999},{name:"Antar Galon (luar)",category:"Galon",price:5e3,unit:"kali",emoji:"🚚",stock:999},{name:"Galon Baru (Aqua)",category:"Galon",price:5e4,unit:"buah",emoji:"💧",stock:50},{name:"Galon Baru (Standar)",category:"Galon",price:45e3,unit:"buah",emoji:"💦",stock:50},{name:"Air Botol 600ml",category:"Botol",price:3e3,unit:"botol",emoji:"🍶",stock:200},{name:"Air Botol 1500ml",category:"Botol",price:5e3,unit:"botol",emoji:"🥤",stock:100},{name:"Dispenser Galon",category:"Lainnya",price:25e4,unit:"unit",emoji:"⚗️",stock:10}])},Ut=async()=>{await Promise.all([I.products.clear(),I.transactions.clear(),I.expenses.clear(),I.settings.clear()]),sessionStorage.clear(),localStorage.clear()},Jt=()=>I.open(),M={},g={state:{cart:[],products:[],transactions:[],expenses:[],currentView:"pos",discount:0,customerName:"",settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return(M[t]??(M[t]=[])).push(e),()=>{M[t]=(M[t]??[]).filter(s=>s!==e)}},emit(t,e){(M[t]??[]).forEach(s=>s(e))},addToCart(t,e=1){const s=Math.max(1,parseInt(e)||1),n=this.state.cart.findIndex(a=>String(a.product.id)===String(t.id));n>=0?this.state.cart[n].qty+=s:this.state.cart.push({product:t,qty:s}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const s=this.state.cart.find(n=>String(n.product.id)===String(t));s&&(s.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.emit("cart:change",this.state.cart)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>e.id!==t),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const s=this.state.transactions.findIndex(n=>n.id===t);s>=0&&(this.state.transactions[s]={...this.state.transactions[s],...e},this.emit("transactions:change",this.state.transactions))},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)}},Vt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),Wt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),Tt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),Q=(t=new Date)=>`${Wt(t)} ${Tt(t)}`,G=()=>new Date().toISOString().split("T")[0],Yt=()=>{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`},l=t=>isNaN(t)?"Rp 0":"Rp "+Math.round(t).toLocaleString("id-ID"),y=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),pt=(t,e)=>{const s=t.items||[],n=[],a=(r,p=0,d=1,c=0)=>n.push({type:0,content:r,bold:p,align:d,format:c}),o=()=>a("--------------------------------",0,1,0),i=()=>a(" ",0,0,0);i(),a(e.shopName||"Blue Mountain Refilling Station",1,1,2),a(e.shopAddress||"",0,1,4),e.shopPhone&&a(`Telp: ${e.shopPhone}`,0,1,4),o(),a(`No: ${t.invoiceNo||"-"}`,0,0,0),a(`Tgl: ${Q(new Date(t.date))}`,0,0,0),t.customerName&&a(`Pelanggan: ${t.customerName}`,0,0,0),t.cashier&&a(`Kasir: ${t.cashier}`,0,0,0),o();for(const r of s){if(!(r!=null&&r.product))continue;const p=r.product.name,d=r.qty,c=l(r.product.price),f=l(r.product.price*d);a(`${p}`,0,0,0),a(`  ${d} x ${c} = ${f}`,0,0,0)}return o(),t.discount>0&&(a(`Subtotal: ${l(t.subtotal)}`,0,0,0),a(`Diskon:  -${l(t.discount)}`,0,0,0)),t.tax>0&&a(`Pajak:    ${l(t.tax)}`,0,0,0),a(`TOTAL: ${l(t.total)}`,1,0,3),t.paymentMethod==="cash"?(a(`Bayar:   ${l(t.paid)}`,0,0,0),a(`Kembali: ${l(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(a(`Transfer: ${l(t.total)}`,0,0,0),a(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(a(`DP Dibayar: ${l(t.paidAmount||0)}`,0,0,0),a(`Sisa Hutang: ${l(t.remainingDebt||0)}`,1,0,0)),o(),i(),a("Terima kasih sudah berbelanja!",1,1,0),a(e.shopName||"Blue Mountain Refilling Station",0,1,4),i(),i(),n},_t=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},Qt=t=>{const e=pt(t,g.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),_t()},Et=t=>(Qt(t),`my.bluetoothprint.scheme://${g.state.settings.printerUrl||_t()}`),St=t=>{const e=g.state.settings,s=t.items||[],n=(r,p=!1,d="left")=>`<div style="text-align:${d};font-weight:${p?"bold":"normal"}">${r}</div>`,a=()=>'<div style="border-top:1px dashed #bbb;margin:5px 0"></div>',o=()=>"<div>&nbsp;</div>";let i="";i+=`<div style="text-align:center;margin-bottom:2px;margin-top:6px">
    <img src="assets/logo.png"
         alt="Logo"
         style="width:90px;height:90px;object-fit:contain;display:inline-block"
         onerror="this.style.display='none'">
  </div>`,i+=n(e.shopName||"Blue Mountain Refilling Station",!0,"center"),i+=n(e.shopAddress||"",!1,"center"),e.shopPhone&&(i+=n(`Telp: ${e.shopPhone}`,!1,"center")),i+=a(),i+=n(`No: ${t.invoiceNo||"-"}`),i+=n(`Tgl: ${Q(new Date(t.date))}`),t.customerName&&(i+=n(`Pelanggan: ${t.customerName}`)),t.cashier&&(i+=n(`Kasir: ${t.cashier}`)),i+=a();for(const r of s)r!=null&&r.product&&(i+=n(r.product.name),i+=n(`&nbsp;&nbsp;${r.qty} x ${l(r.product.price)} = ${l(r.product.price*r.qty)}`));return i+=a(),t.discount>0&&(i+=n(`Subtotal : ${l(t.subtotal)}`),i+=n(`Diskon   : -${l(t.discount)}`)),t.tax>0&&(i+=n(`Pajak    : ${l(t.tax)}`)),i+=n(`<strong>TOTAL    : ${l(t.total)}</strong>`,!0),t.paymentMethod==="cash"?(i+=n(`Bayar    : ${l(t.paid)}`),i+=n(`<strong>Kembali  : ${l(t.change)}</strong>`,!0)):t.paymentMethod==="transfer"?(i+=n(`Transfer : ${l(t.total)}`),i+=n(`Status   : ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}`)):t.paymentMethod==="debt"&&(i+=n(`DP       : ${l(t.paidAmount||0)}`),i+=n(`<strong>Sisa Hutang: ${l(t.remainingDebt||0)}</strong>`,!0)),i+=a(),i+=o(),i+=n("Terima kasih sudah berbelanja!",!0,"center"),i+=n(e.shopName||"Blue Mountain Refilling Station",!1,"center"),i+=o(),i},tt=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),s=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),n=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${s}${n}`},L=(t,e="generic-modal")=>{E();const s=document.createElement("div");s.className="modal-overlay",s.id=`overlay-${e}`,s.innerHTML=`<div class="modal" id="${e}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(s),s.addEventListener("click",a=>{a.target===s&&E(e)});const n=s.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return n.length&&n[0].focus(),s},E=(t=null)=>{const e=t?`#overlay-${t}`:".modal-overlay";(t?[document.querySelector(e)]:[...document.querySelectorAll(e)]).forEach(n=>{var a;n&&((a=n.querySelector(".modal"))==null||a.classList.add("closing"),n.classList.add("closing"),setTimeout(()=>n.remove(),200))})},et=(t="cash")=>{const e=g.total,s=g.subtotal,n=g.state.discount,a=g.tax,o=g.state.settings,i=y(o.bankName||"BCA"),r=y(o.bankNumber||"—"),p=y(o.bankHolder||o.shopName||"Blue Mountain"),d=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Pembayaran</div>
        <div class="amount">${l(e)}</div>
        ${n>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${l(n)}</div>`:""}
        ${a>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${l(a)}</div>`:""}
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
          ${Xt(e).map(c=>`<button class="quick-amt-btn" data-amount="${c}">${l(c)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px">
          <span class="label">💰 Kembalian</span>
          <span class="value" id="change-amount">${l(0)}</span>
        </div>
      </div>

      <!-- Transfer section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info">
          <div style="font-size:32px;margin-bottom:8px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Transfer ke rekening:</div>
          <div style="font-size:18px;font-weight:800;color:var(--text-primary);margin:6px 0">${i}: ${r}</div>
          <div style="font-size:13px;color:var(--text-secondary)">a/n ${p}</div>
          <div style="margin-top:10px;padding:8px 12px;background:white;border-radius:8px;font-size:13px;font-weight:700;color:var(--blue-700);border:1.5px solid var(--blue-200)">
            Nominal: ${l(e)}
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
            value="${y(g.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            value="0" min="0" max="${e}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total</span><strong>${l(e)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>Dibayar sekarang</span><strong id="debt-paid-display">${l(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger)">${l(e)}</strong>
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
  `;L(d,"payment-modal"),setTimeout(()=>{var T,_,x,m;(T=document.getElementById("pay-close-btn"))==null||T.addEventListener("click",()=>E("payment-modal")),(_=document.getElementById("pay-cancel-btn"))==null||_.addEventListener("click",()=>E("payment-modal")),document.querySelectorAll(".pay-tab").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".pay-tab").forEach(w=>w.classList.remove("active")),v.classList.add("active");const h=v.dataset.method;document.getElementById("pay-cash-section").style.display=h==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=h==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=h==="debt"?"":"none"})});const c=document.getElementById("cash-received"),f=()=>{const v=parseFloat(c==null?void 0:c.value)||0,h=Math.max(0,v-e),w=document.getElementById("change-amount");w&&(w.textContent=l(h))};c==null||c.addEventListener("input",f),f(),(x=document.getElementById("quick-amounts"))==null||x.addEventListener("click",v=>{const h=v.target.closest(".quick-amt-btn");h&&c&&(c.value=h.dataset.amount,f())});const $=document.getElementById("debt-paid-now"),S=()=>{const v=Math.min(parseFloat($==null?void 0:$.value)||0,e),h=e-v,w=document.getElementById("debt-paid-display"),b=document.getElementById("debt-remaining-display");w&&(w.textContent=l(v)),b&&(b.textContent=l(h))};$==null||$.addEventListener("input",S),(m=document.getElementById("pay-confirm-btn"))==null||m.addEventListener("click",async()=>{var k,B,j,D,R;const v=document.querySelector(".pay-tab.active"),h=(v==null?void 0:v.dataset.method)||"cash",w=document.getElementById("pay-confirm-btn");if(h==="cash"&&(parseFloat(c==null?void 0:c.value)||0)<e){window.showToast("Jumlah bayar kurang dari total!","warning");return}if(h==="debt"&&!((B=(k=document.getElementById("debt-customer"))==null?void 0:k.value)==null?void 0:B.trim())){window.showToast("Nama pelanggan wajib diisi untuk hutang!","warning");return}w&&(w.disabled=!0,w.textContent="⏳ Menyimpan...");const b=new Date().toISOString();let u;if(h==="cash"){const P=parseFloat(c==null?void 0:c.value)||e,Z=Math.max(0,P-e);u={invoiceNo:tt(),date:b,dateKey:G(),items:g.state.cart.map(F=>({product:{...F.product},qty:F.qty})),subtotal:s,discount:n,tax:a,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:P,change:Z,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Admin"}}else if(h==="transfer")u={invoiceNo:tt(),date:b,dateKey:G(),items:g.state.cart.map(P=>({product:{...P.product},qty:P.qty})),subtotal:s,discount:n,tax:a,total:e,paymentMethod:"transfer",paymentStatus:"transfer_pending",paid:0,change:0,paidAmount:0,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Admin"};else{const P=Math.min(parseFloat((j=document.getElementById("debt-paid-now"))==null?void 0:j.value)||0,e),Z=e-P,F=P===0?"unpaid":P<e?"partial":"paid",zt=((R=(D=document.getElementById("debt-customer"))==null?void 0:D.value)==null?void 0:R.trim())||"";u={invoiceNo:tt(),date:b,dateKey:G(),items:g.state.cart.map(bt=>({product:{...bt.product},qty:bt.qty})),subtotal:s,discount:n,tax:a,total:e,paymentMethod:"debt",paymentStatus:F,paid:P,change:0,paidAmount:P,remainingDebt:Z,debtPayments:P>0?[{date:b,amount:P,note:"DP / Uang muka awal"}]:[],customerName:zt,cashier:g.state.settings.cashierName||"Admin"}}try{const P=await Kt(u);u.id=P,g.addTransaction(u),E("payment-modal"),g.clearCart(),Zt(u)}catch(P){window.showToast("Gagal menyimpan transaksi!","error"),console.error("[payment]",P),w&&(w.disabled=!1,w.innerHTML="✅ Proses Pembayaran")}})},0)},Xt=t=>{const s=(a=>Math.ceil(a/5e3)*5e3)(t),n=[s,s+5e3,s+1e4,s+2e4,s+5e4,s+1e5];return[...new Set(n.filter(a=>a>=t))].slice(0,4)},Zt=t=>{var r,p,d;const e=pt(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const s=g.state.settings.printEnabled,n=Et(t),a=St(t),o=document.createElement("div");o.className="success-overlay",o.id="success-overlay",o.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${y(t.invoiceNo)} &bull; ${l(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${l(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:#d97706;font-size:13px;margin-top:4px">⏳ Transfer menunggu konfirmasi</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa hutang: ${l(t.remainingDebt)}</p>`:""}
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
  `,document.body.appendChild(o);const i=()=>{o.classList.add("closing"),setTimeout(()=>o.remove(),180)};(r=document.getElementById("success-close-btn"))==null||r.addEventListener("click",i),(p=document.getElementById("btn-close-overlay"))==null||p.addEventListener("click",i),(d=document.getElementById("btn-new-tx"))==null||d.addEventListener("click",()=>{i(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{o.parentNode&&i()},15e3)};let rt="",Y="Semua",q=null,yt=[];const te=async()=>{const t=await A();g.setProducts(t),Pt(),q&&q.abort(),q=new AbortController,yt.forEach(e=>e()),yt=[g.on("cart:change",It),g.on("products:change",()=>O())],ne(q.signal)},Pt=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
              value="0" min="0" max="99999999" placeholder="0" inputmode="numeric">
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
  `,ut(),O(),It()},ee=()=>["Semua",...new Set(g.state.products.map(t=>t.category))],ut=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=ee().map(e=>`
    <button class="cat-pill ${e===Y?"active":""}"
      data-cat="${y(e)}">${y(e)}</button>
  `).join(""))},O=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=g.state.products;if(Y!=="Semua"&&(e=e.filter(s=>s.category===Y)),rt){const s=rt.toLowerCase();e=e.filter(n=>n.name.toLowerCase().includes(s))}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(s=>`
    <div class="product-card" data-id="${s.id}" role="button" tabindex="0"
      aria-label="${y(s.name)} — ${l(s.price)}">
      <div class="product-card__emoji">${s.emoji||"📦"}</div>
      <div class="product-card__name">${y(s.name)}</div>
      <div class="product-card__price">${l(s.price)}</div>
      <div class="product-card__unit">per ${y(s.unit)}</div>
    </div>
  `).join(""),t.querySelectorAll(".product-card").forEach(s=>{const n=()=>{const a=s.dataset.id,o=g.state.products.find(i=>String(i.id)===String(a));o&&(g.addToCart(o),s.style.transform="scale(0.94)",setTimeout(()=>{s.style.transform=""},120))};s.addEventListener("click",n),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),n())})})},It=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),s=document.getElementById("cart-total"),n=document.getElementById("tax-amount"),a=document.getElementById("tax-row");if(!t)return;const o=g.state.cart;if(e){const i=e.textContent;e.textContent=g.cartCount,i!==String(g.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(s&&(s.textContent=l(g.total)),a&&n&&(g.tax>0?(a.style.display="flex",n.textContent=l(g.tax)):a.style.display="none"),!o.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=o.map(i=>`
    <div class="cart-item" data-pid="${i.product.id}">
      <div class="cart-item__info">
        <div class="cart-item__name">${i.product.emoji||""} ${y(i.product.name)}</div>
        <div class="cart-item__price">${l(i.product.price)} / ${y(i.product.unit)}</div>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__subtotal">${l(i.product.price*i.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn remove" data-action="remove" data-pid="${i.product.id}" title="Hapus">🗑</button>
          <button class="qty-btn" data-action="dec" data-pid="${i.product.id}">−</button>
          <span class="qty-value">${i.qty}</span>
          <button class="qty-btn" data-action="inc" data-pid="${i.product.id}">+</button>
        </div>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.pid,p=i.dataset.action,d=g.state.cart.find(c=>String(c.product.id)===String(r));d&&(p==="inc"?g.setQty(d.product.id,d.qty+1):p==="dec"?g.setQty(d.product.id,d.qty-1):p==="remove"&&g.removeFromCart(d.product.id))})})},ae=()=>{const t=`
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
  `;L(t,"manual-item-modal"),setTimeout(()=>{var e,s,n,a;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>E("manual-item-modal")),(s=document.getElementById("mi-cancel"))==null||s.addEventListener("click",()=>E("manual-item-modal")),(n=document.getElementById("mi-name"))==null||n.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.style.borderColor="var(--border-subtle)",i.classList.remove("emoji-pick--active")}),o.style.borderColor="var(--blue-400)",o.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=o.dataset.emoji})}),(a=document.getElementById("mi-save"))==null||a.addEventListener("click",async()=>{var S,T,_,x,m,v,h;const o=(S=document.getElementById("mi-name"))==null?void 0:S.value.trim(),i=(T=document.getElementById("mi-price"))==null?void 0:T.value,r=parseFloat(i)||0,p=Math.max(1,parseInt((_=document.getElementById("mi-qty"))==null?void 0:_.value)||1),d=((x=document.getElementById("mi-unit"))==null?void 0:x.value.trim())||"pcs",c=((m=document.getElementById("mi-category"))==null?void 0:m.value)||"Lainnya",f=((v=document.getElementById("mi-emoji"))==null?void 0:v.value)||"🏷️",$=(h=document.getElementById("mi-save-catalog"))==null?void 0:h.checked;if(!o){window.showToast("Nama produk wajib diisi!","warning");return}if(i===""||r<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if($){const w=await $t({name:o,price:r,unit:d,category:c,emoji:f,stock:999}),b=await A();g.setProducts(b);const u=b.find(k=>k.id===w)||{id:w,name:o,price:r,unit:d,category:c,emoji:f};g.addToCart(u,p),window.showToast(`Product "${o}" ditambahkan ke katalog & keranjang`,"success")}else{const w={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:o,price:r,unit:d,category:c,emoji:f};g.addToCart(w,p),window.showToast(`"${o}" ditambahkan ke keranjang`,"success")}E("manual-item-modal")}catch(w){window.showToast("Gagal menambahkan item manual!","error"),console.error("[manual-item]",w)}})},0)},ne=t=>{document.addEventListener("click",e=>{const s=e.target.closest(".cat-pill");if(s){Y=s.dataset.cat,ut(),O();return}if(e.target.closest("#btn-manual-item")){ae();return}if(e.target.closest("#btn-pay-cash")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}et("cash")}if(e.target.closest("#btn-pay-transfer")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}et("transfer")}if(e.target.closest("#btn-pay-debt")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}et("debt")}e.target.closest("#btn-clear-cart")&&g.state.cart.length&&(g.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{e.target.id==="pos-search"&&(rt=e.target.value.trim(),O()),e.target.id==="discount-input"&&g.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"&&g.setCustomerName(e.target.value)},{signal:t})},se=async()=>{const t=document.getElementById("view-pos");(!t||!t.querySelector(".pos-layout"))&&Pt();const e=await A();g.setProducts(e),O(),ut()},ft=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],ie=["Galon","Botol","Layanan","Lainnya"],oe=async()=>{await X()},X=async()=>{const t=document.getElementById("view-products"),e=await A();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(s=>re(s)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,de()},re=t=>`
  <div class="product-manage-card" data-id="${t.id}">
    <div class="product-manage-card__header">
      <span class="product-emoji-large">${t.emoji||"📦"}</span>
      <div class="product-manage-card__info">
        <div class="product-manage-card__name">${y(t.name)}</div>
        <div class="product-manage-card__cat">
          <span class="badge badge--blue">${y(t.category)}</span>
        </div>
      </div>
    </div>
    <div class="product-manage-card__price">${l(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${y(t.unit)}</span></div>
    <div class="product-manage-card__actions">
      <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
      <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
    </div>
  </div>
`,de=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",()=>ht()),t==null||t.addEventListener("click",async s=>{const n=s.target.closest('[data-action="edit"]'),a=s.target.closest('[data-action="delete"]');if(n){const o=parseInt(n.dataset.id),r=(await A()).find(p=>p.id===o);r&&ht(r)}if(a){const o=parseInt(a.dataset.id);le(o)}})},ht=(t=null)=>{const e=!!t,s=`
    <div class="modal-header">
      <span class="modal-title">${e?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <label class="input-label">Nama Produk</label>
        <input type="text" class="input" id="pf-name"
          value="${y((t==null?void 0:t.name)||"")}"
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
            value="${y((t==null?void 0:t.unit)||"pcs")}"
            placeholder="galon, botol, pcs..."
            maxlength="20">
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Kategori</label>
        <select class="input" id="pf-category">
          ${ie.map(n=>`<option value="${y(n)}" ${(t==null?void 0:t.category)===n?"selected":""}>${y(n)}</option>`).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
          ${ft.map(n=>`
            <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===n?"emoji-pick--active":""}"
              data-emoji="${n}"
              style="font-size:24px;width:40px;height:40px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===n?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${n}</button>
          `).join("")}
        </div>
        <input type="hidden" id="pf-emoji" value="${y((t==null?void 0:t.emoji)||ft[0])}">
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
  `;L(s,"product-form"),setTimeout(()=>{var n,a,o;(n=document.getElementById("pf-close"))==null||n.addEventListener("click",()=>E("product-form")),(a=document.getElementById("pf-cancel"))==null||a.addEventListener("click",()=>E("product-form")),document.querySelectorAll(".emoji-pick").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(r=>{r.style.borderColor="var(--border-subtle)",r.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=i.dataset.emoji})}),(o=document.getElementById("pf-save"))==null||o.addEventListener("click",async()=>{var $,S,T,_,x,m;const i=($=document.getElementById("pf-name"))==null?void 0:$.value.trim(),r=parseFloat((S=document.getElementById("pf-price"))==null?void 0:S.value)||0,p=((T=document.getElementById("pf-unit"))==null?void 0:T.value.trim())||"pcs",d=((_=document.getElementById("pf-category"))==null?void 0:_.value)||"Lainnya",c=((x=document.getElementById("pf-emoji"))==null?void 0:x.value)||"📦",f=parseInt((m=document.getElementById("pf-stock"))==null?void 0:m.value)||0;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(r<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{e?(await Dt({...t,name:i,price:r,unit:p,category:d,emoji:c,stock:f}),window.showToast("Produk berhasil diperbarui","success")):(await $t({name:i,price:r,unit:p,category:d,emoji:c,stock:f}),window.showToast("Produk berhasil ditambahkan","success")),E("product-form");const v=await A();g.setProducts(v),await X()}catch(v){window.showToast("Gagal menyimpan produk!","error"),console.error("[products]",v)}})},0)},le=t=>{L(`
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
  `,"delete-confirm"),setTimeout(()=>{var s,n,a;(s=document.getElementById("dc-close"))==null||s.addEventListener("click",()=>E("delete-confirm")),(n=document.getElementById("dc-cancel"))==null||n.addEventListener("click",()=>E("delete-confirm")),(a=document.getElementById("dc-confirm"))==null||a.addEventListener("click",async()=>{try{await Rt(t);const o=await A();g.setProducts(o),E("delete-confirm"),await X(),window.showToast("Produk dihapus","success")}catch(o){window.showToast("Gagal menghapus produk","error"),console.error("[products]",o)}})},0)};let at=null;const ce=async()=>{at&&at(),at=g.on("transactions:change",t=>{Mt(t)}),await Bt()},Bt=async()=>{const t=await lt();g.setTransactions(t),Mt(t)},Lt=t=>{const e=t.paymentMethod,s=t.paymentStatus;return e==="transfer"&&s==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&s==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':s==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':s==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},At=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":y(t.paymentMethod)||"—",C=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Mt=t=>{const e=document.getElementById("view-transactions");if(!e)return;const s=[...t].sort((p,d)=>new Date(d.date)-new Date(p.date)),n=new Date().toISOString().split("T")[0],o=t.filter(p=>p.dateKey===n).reduce((p,d)=>d.paymentStatus==="paid"&&d.paymentMethod==="cash"||d.paymentStatus==="transfer_confirmed"?p+d.total:d.paymentMethod==="debt"?p+(d.paidAmount||0):p,0),i=t.reduce((p,d)=>p+(d.remainingDebt||0),0),r=t.filter(p=>p.paymentStatus==="transfer_pending").reduce((p,d)=>p+d.total,0);e.innerHTML=`
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
        <div style="font-size:15px;font-weight:800;color:#16a34a">${l(o)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${l(i)}</div>
      </div>
      ${r>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${l(r)}</div>
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
              ${dt(s)}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `,pe(t,s)},dt=t=>t.length?t.map(e=>{var s;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${y(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${Q(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${y(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((s=e.items)==null?void 0:s.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${l(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${l(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${At(e)}</span></td>
      <td>${Lt(e)}</td>
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
            ${C(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${C(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${C(e)?"var(--color-danger-border)":"#d1d5db"};color:${C(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${C(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk filter ini</td></tr>',pe=(t,e)=>{var s,n,a;(s=document.getElementById("tx-filter-date"))==null||s.addEventListener("change",o=>{const i=o.target.value,r=i?[...t].filter(d=>d.dateKey===i).sort((d,c)=>new Date(c.date)-new Date(d.date)):e,p=document.getElementById("tx-tbody");p&&(p.innerHTML=dt(r))}),(n=document.getElementById("tx-clear-filter"))==null||n.addEventListener("click",()=>{const o=document.getElementById("tx-tbody"),i=document.getElementById("tx-filter-date");o&&(o.innerHTML=dt(e)),i&&(i.value="")}),(a=document.getElementById("tx-table"))==null||a.addEventListener("click",async o=>{const i=o.target.closest("[data-action]");if(!i)return;const r=parseInt(i.dataset.id),p=i.dataset.action,d=t.find(c=>c.id===r);if(p==="detail"){d&&me(d);return}if(p==="confirm-transfer"){if(!d||!confirm(`Konfirmasi transfer ${l(d.total)} dari ${y(d.customerName||"pelanggan")} sudah diterima?`))return;try{const c={...d,paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:new Date().toISOString()};await W(c),g.updateTransaction(r,{paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:c.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(c){console.error("[tx]",c),window.showToast("Gagal konfirmasi","error")}return}if(p==="pay-debt"){d&&ue(d);return}if(p==="delete"){if(!d)return;if(!C(d)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${y(d.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{await Ht(r),g.removeTransaction(r),window.showToast("Transaksi dihapus","success")}catch(c){console.error("[tx]",c),window.showToast("Gagal menghapus","error")}}})},ue=t=>{var n;const e=t.remainingDebt||0,s=`
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${y(t.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${y(t.customerName||"—")}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#991b1b;font-weight:700;text-transform:uppercase">Total Tagihan</div>
          <div style="font-size:16px;font-weight:900;color:#dc2626">${l(t.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${l(e)}</div>
        </div>
      </div>

      ${(n=t.debtPayments)!=null&&n.length?`
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${t.debtPayments.map(a=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(a.date).toLocaleDateString("id-ID")} — ${y(a.note||"-")}</span>
            <strong style="color:#16a34a">+${l(a.amount)}</strong>
          </div>
        `).join("")}
      </div>`:""}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${l(e)})</label>
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
  `;L(s,"debt-modal"),setTimeout(()=>{var a,o,i;(a=document.getElementById("debt-x"))==null||a.addEventListener("click",()=>E("debt-modal")),(o=document.getElementById("debt-cancel"))==null||o.addEventListener("click",()=>E("debt-modal")),(i=document.getElementById("debt-save"))==null||i.addEventListener("click",async()=>{var x,m,v;const r=parseFloat((x=document.getElementById("cicil-amount"))==null?void 0:x.value)||0;if(r<=0||r>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${l(e)}`,"warning");return}const p=(t.paidAmount||0)+r,d=Math.max(0,e-r),c=d===0?"paid":"partial",f=(t.debtPayments||[]).length+1,$=d===0?`Pelunasan (#${f}/LUNAS ✅)`:`Cicilan #${f}`,S=((v=(m=document.getElementById("cicil-note"))==null?void 0:m.value)==null?void 0:v.trim())||$,T=[...t.debtPayments||[],{date:new Date().toISOString(),amount:r,note:S}],_={...t,paidAmount:p,remainingDebt:d,paymentStatus:c,debtPayments:T};try{await W(_),g.updateTransaction(t.id,{paidAmount:p,remainingDebt:d,paymentStatus:c,debtPayments:T}),E("debt-modal"),window.showToast(d===0?"🎉 Hutang LUNAS!":`Cicilan ${l(r)} dicatat`,"success")}catch(h){console.error("[debt]",h),window.showToast("Gagal simpan cicilan","error")}})},0)},me=t=>{const e=pt(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const s=Et(t),n=g.state.settings.printEnabled,a=`
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${y(t.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${Lt(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${y(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${At(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${St(t)}</div>

      ${(t.remainingDebt||0)>0?`
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${l(t.remainingDebt)}</div>
      </div>`:""}

      <div style="display:grid;grid-template-columns:${t.change>0?"1fr 1fr":"1fr"};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${l(t.total)}</div>
        </div>
        ${t.change>0?`
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${l(t.change)}</div>
        </div>`:""}
      </div>
    </div>

    <div class="modal-footer" style="flex-wrap:wrap;gap:8px">
      <button class="btn btn--secondary" id="td-close-btn">Tutup</button>
      <button class="btn btn--secondary" id="btn-save-png">🖼️ PNG</button>
      <button class="btn btn--secondary" id="btn-save-pdf">📄 PDF</button>
      ${n?`<a class="print-btn" href="${s}" style="text-decoration:none">🖨️ Cetak</a>`:""}
    </div>
  `;L(a,"tx-detail"),setTimeout(()=>{var o,i,r,p;(o=document.getElementById("td-x"))==null||o.addEventListener("click",()=>E("tx-detail")),(i=document.getElementById("td-close-btn"))==null||i.addEventListener("click",()=>E("tx-detail")),(r=document.getElementById("btn-save-png"))==null||r.addEventListener("click",async()=>{var c;const d=document.getElementById("btn-save-png");d.textContent="⏳...",d.disabled=!0;try{const{default:f}=await V(async()=>{const{default:x}=await import("./vendor-pdf-j4-ZKoBl.js").then(m=>m.h);return{default:x}},[],import.meta.url),$=document.getElementById("receipt-capture"),S=await f($,{backgroundColor:"#fff",scale:2,useCORS:!0,logging:!1}),T=await new Promise(x=>S.toBlob(x,"image/png")),_=`Struk-${t.invoiceNo||t.id}.png`;if((c=navigator.canShare)!=null&&c.call(navigator,{files:[new File([T],_,{type:"image/png"})]}))await navigator.share({title:`Struk ${t.invoiceNo}`,files:[new File([T],_,{type:"image/png"})]});else{const x=URL.createObjectURL(T);Object.assign(document.createElement("a"),{href:x,download:_}).click(),setTimeout(()=>URL.revokeObjectURL(x),2e3),window.showToast("PNG tersimpan!","success")}}catch(f){console.error("[png]",f),window.showToast("Gagal buat PNG","error")}finally{d.textContent="🖼️ PNG",d.disabled=!1}}),(p=document.getElementById("btn-save-pdf"))==null||p.addEventListener("click",()=>{const d=document.getElementById("receipt-capture");if(!d)return;const c=window.open("","_blank","width=400,height=700");if(!c){window.showToast("Popup diblokir browser. Ijinkan popup.","warning");return}c.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Struk ${y(t.invoiceNo||"")}</title>
        <style>@page{size:80mm auto;margin:6mm}body{margin:0;padding:0;font-family:'Courier New',monospace;font-size:12px;color:#111;background:#fff}img{max-width:100%}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
      </head><body>${d.innerHTML}<script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script></body></html>`),c.document.close()})},0)};let nt=null,U=null,J=null,N="semua";const ge=async()=>{nt&&nt(),nt=g.on("transactions:change",t=>{gt(t)}),await mt()},mt=async()=>{const t=await lt();g.setTransactions(t),gt(t)},gt=t=>{var h,w;const e=document.getElementById("view-reports");if(!e)return;const s=G(),n=Yt(),a=t.filter(b=>b.dateKey===s),o=a.reduce((b,u)=>b+u.total,0),i=a.length,r=t.filter(b=>{var u;return(u=b.dateKey)==null?void 0:u.startsWith(n)}),p=r.reduce((b,u)=>b+u.total,0),d=t.reduce((b,u)=>b+u.total,0),c=a.filter(b=>b.paymentMethod==="cash").reduce((b,u)=>b+u.total,0),f=a.filter(b=>b.paymentMethod==="transfer"&&b.paymentStatus==="transfer_confirmed").reduce((b,u)=>b+u.total,0),$=a.filter(b=>b.paymentMethod==="transfer"&&b.paymentStatus==="transfer_pending").reduce((b,u)=>b+u.total,0),S=a.filter(b=>b.paymentMethod==="debt").reduce((b,u)=>b+u.total,0),T=t.reduce((b,u)=>{for(const k of u.debtPayments||[])k.date&&k.date.split("T")[0]===s&&(b+=k.amount||0);return b},0),_=c+f+T,x=t.reduce((b,u)=>b+(u.remainingDebt||0),0);t.filter(b=>b.paymentStatus==="transfer_pending").reduce((b,u)=>b+u.total,0);const m=he(a),v=fe(t);U&&(U.destroy(),U=null),J&&(J.destroy(),J=null),e.innerHTML=`
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
        <div class="stat-card__value" style="color:var(--blue-700)">${l(o)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${i} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${l(_)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${l(T)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${l(x)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${l(p)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${r.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${l(d)}</div>
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
            <strong style="color:var(--color-success)">${l(c)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${l(f)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${l(T)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${l(S)}</strong>
          </div>

          ${$>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${l($)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${c+f+S+T>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${m.length?m.slice(0,7).map((b,u)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${u+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${y(b.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${b.qty}x</span>
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
          <button class="cat-pill ${N==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${N==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${N==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${N==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${ve(t,N)}
          </tbody>
        </table>
      </div>
    </div>
  `,(h=document.getElementById("btn-refresh-reports"))==null||h.addEventListener("click",mt),(w=document.getElementById("btn-export-pdf-report"))==null||w.addEventListener("click",()=>ye(t,s,n)),document.querySelectorAll("[data-rpt-filter]").forEach(b=>{b.addEventListener("click",()=>{N=b.dataset.rptFilter,gt(t)})}),requestAnimationFrame(()=>be(v,c,f,S,T))},ve=(t,e)=>{let s=[...t];e==="cash"&&(s=s.filter(a=>a.paymentMethod==="cash")),e==="transfer"&&(s=s.filter(a=>a.paymentMethod==="transfer")),e==="debt"&&(s=s.filter(a=>a.paymentMethod==="debt"));const n=s.sort((a,o)=>new Date(o.date)-new Date(a.date));return n.length?n.slice(0,50).map(a=>{const o=a.total||0;let i=0,r=0;a.paymentMethod==="cash"?i=o:a.paymentMethod==="transfer"?a.paymentStatus==="transfer_confirmed"?i=o:r=o:a.paymentMethod==="debt"&&(i=a.paidAmount||0,r=a.remainingDebt||0);const p=(a.items||[]).map(f=>{var $;return`${(($=f.product)==null?void 0:$.name)||"Item"} (${f.qty}x)`}).join(", "),d=a.paymentMethod==="debt"?r===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${l(r)}</span>`:a.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',c=a.paymentMethod==="cash"?"💵 Tunai":a.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${y(a.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${Q(new Date(a.date))}</td>
        <td><strong style="color:var(--text-primary)">${y(a.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${y(p)}">${y(p||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${l(o)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${l(i)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${r>0?l(r):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${c}</span> ${d}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>'},be=async(t,e,s,n,a)=>{const{Chart:o,registerables:i}=await V(async()=>{const{Chart:c,registerables:f}=await import("./vendor-chart-19k6OvwP.js");return{Chart:c,registerables:f}},[],import.meta.url);o.register(...i);const r=document.getElementById("chart-bar");r&&(U=new o(r,{type:"bar",data:{labels:t.map(c=>c.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(c=>c.total),backgroundColor:t.map((c,f)=>f===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>" "+l(c.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:c=>l(c),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const p=document.getElementById("chart-donut"),d=e+s+n+a;p&&d>0&&(J=new o(p,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,s,n,a],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.label}: ${l(c.raw)}`}}}}}))},ye=async(t,e,s)=>{try{const n=document.getElementById("btn-export-pdf-report");n&&(n.textContent="⏳ Memproses PDF...",n.disabled=!0);const{jsPDF:a}=await V(async()=>{const{jsPDF:u}=await import("./vendor-pdf-j4-ZKoBl.js").then(k=>k.j);return{jsPDF:u}},[],import.meta.url),{default:o}=await V(async()=>{const{default:u}=await import("./jspdf.plugin.autotable-QkGqYg11.js").then(k=>k.j);return{default:u}},__vite__mapDeps([0,1,2]),import.meta.url),i=new a({orientation:"portrait",unit:"mm",format:"a4"}),r=g.state.settings,p=i.internal.pageSize.getWidth();i.setFontSize(16),i.setFont("helvetica","bold"),i.text(r.shopName||"Blue Mountain Refilling Station",p/2,16,{align:"center"}),i.setFontSize(10),i.setFont("helvetica","normal"),i.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",p/2,22,{align:"center"}),i.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,p/2,27,{align:"center"});const d=t.filter(u=>u.dateKey===e),c=d.reduce((u,k)=>u+k.total,0),f=t.filter(u=>{var k;return(k=u.dateKey)==null?void 0:k.startsWith(s)}).reduce((u,k)=>u+k.total,0),$=t.reduce((u,k)=>u+k.total,0),S=d.filter(u=>u.paymentMethod==="cash").reduce((u,k)=>u+k.total,0),T=d.filter(u=>u.paymentMethod==="transfer"&&u.paymentStatus==="transfer_confirmed").reduce((u,k)=>u+k.total,0),_=t.reduce((u,k)=>{for(const B of k.debtPayments||[])B.date&&B.date.split("T")[0]===e&&(u+=B.amount||0);return u},0),x=S+T+_,m=t.reduce((u,k)=>u+(k.remainingDebt||0),0);i.setFontSize(11),i.setFont("helvetica","bold"),i.text("1. Ringkasan Kinerja Keuangan",14,35);const v=[["Omzet Gross Hari Ini",l(c)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",l(x)],["Cicilan Piutang Terkumpul Hari Ini",l(_)],["Total Piutang Belum Lunas (Semua Pelanggan)",l(m)],["Omzet Bulan Ini",l(f)],["Total Omzet All-Time",l($)],["Jumlah Transaksi Hari Ini",`${d.length} transaksi`]];o(i,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:v,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const h=i.lastAutoTable.finalY+10;i.setFontSize(11),i.setFont("helvetica","bold"),i.text("2. Rincian Riwayat Transaksi & Pelunasan",14,h);const w=[...t].sort((u,k)=>new Date(k.date)-new Date(u.date)).slice(0,80);o(i,{startY:h+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:w.map(u=>{let k=u.paymentMethod==="cash"?u.total:u.paymentMethod==="transfer"?u.paymentStatus==="transfer_confirmed"?u.total:0:u.paidAmount||0,B=u.paymentMethod==="debt"?u.remainingDebt||0:u.paymentStatus==="transfer_pending"?u.total:0;return[u.invoiceNo||"-",new Date(u.date).toLocaleDateString("id-ID"),u.customerName||"—",u.paymentMethod==="cash"?"Tunai":u.paymentMethod==="transfer"?"Transfer":"Hutang",l(u.total),l(k),B>0?l(B):"—",u.paymentMethod==="debt"?B===0?"Lunas":"Cicilan":u.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const b=i.internal.getNumberOfPages();for(let u=1;u<=b;u++)i.setPage(u),i.setFontSize(8),i.setFont("helvetica","normal"),i.text(`Hal ${u} dari ${b} — ${r.shopName||"Blue Mountain POS"}`,p/2,i.internal.pageSize.getHeight()-8,{align:"center"});i.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch(n){console.error("[pdf-report]",n),window.showToast("Gagal export PDF","error")}finally{const n=document.getElementById("btn-export-pdf-report");n&&(n.textContent="📄 Export PDF Laporan",n.disabled=!1)}},fe=t=>{const e=[];for(let s=6;s>=0;s--){const n=new Date;n.setDate(n.getDate()-s);const a=n.toISOString().split("T")[0],o=t.filter(r=>r.dateKey===a).reduce((r,p)=>r+p.total,0),i=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(n);e.push({key:a,label:i,total:o})}return e},he=t=>{var s;const e={};for(const n of t)for(const a of n.items||[]){if(!((s=a==null?void 0:a.product)!=null&&s.name))continue;const o=a.product.name;e[o]=(e[o]||0)+a.qty}return Object.entries(e).map(([n,a])=>({name:n,qty:a})).sort((n,a)=>a.qty-n.qty)},we=async()=>{await xe(),await Nt()},xe=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const s of t){const n=await ct(s);n!==null&&(e[s]=n)}g.updateSettings(e)},Nt=async()=>{const t=document.getElementById("view-settings"),e=g.state.settings,s="3.0.0",n=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
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
        <input type="text" class="input" id="set-shopName" value="${y(e.shopName||"")}" maxlength="80" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${y(e.shopAddress||"")}" maxlength="120" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${y(e.shopPhone||"")}" maxlength="20" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${y(e.cashierName||"Admin")}" maxlength="40" style="max-width:200px">
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
        <input type="text" class="input" id="set-bankName" value="${y(e.bankName||"BCA")}" maxlength="30" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${y(e.bankNumber||"")}" maxlength="30" style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${y(e.bankHolder||"")}" maxlength="60" style="max-width:240px">
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
        <input type="url" class="input" id="set-printerUrl" value="${y(e.printerUrl||"")}"
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
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800">v${y(s)} High-End</span>
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
  `,ke()},ke=()=>{var t,e,s,n,a;(t=document.getElementById("btn-save-settings"))==null||t.addEventListener("click",async()=>{const o=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","qrisNumber"],i={};for(const p of o){const d=document.getElementById(`set-${p}`);d&&(i[p]=p==="taxRate"?parseFloat(d.value)||0:d.value.trim(),await ot(p,i[p]))}const r=document.getElementById("set-printEnabled");r&&(i.printEnabled=r.checked,await ot("printEnabled",r.checked)),g.updateSettings(i),window.showToast("Pengaturan berhasil disimpan","success")}),(e=document.getElementById("btn-printer-guide"))==null||e.addEventListener("click",()=>{$e()}),(s=document.getElementById("btn-install-pwa"))==null||s.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(n=document.getElementById("btn-clear-cache"))==null||n.addEventListener("click",async()=>{try{if("caches"in window){const o=await caches.keys();await Promise.all(o.map(i=>caches.delete(i)))}if("serviceWorker"in navigator){const o=await navigator.serviceWorker.getRegistrations();for(const i of o)await i.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch(o){console.error("[cache]",o),window.showToast("Gagal hapus cache","error")}}),(a=document.getElementById("btn-reset-all"))==null||a.addEventListener("click",async()=>{if(confirm(`⚠️ HAPUS SEMUA DATA?

Semua transaksi, pengeluaran, dan produk akan dihapus permanen.
Tindakan ini TIDAK dapat dibatalkan!`))try{await Ut(),window.showToast("Semua data berhasil dihapus. Reloading...","error"),setTimeout(()=>window.location.reload(),1500)}catch(i){console.error("[reset]",i),window.showToast("Gagal menghapus data","error")}})},$e=()=>{L(`
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
  `,"printer-guide"),setTimeout(()=>{var e,s;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>E("printer-guide")),(s=document.getElementById("pg-close2"))==null||s.addEventListener("click",()=>E("printer-guide"))},0)};let st=null,it=null,H=!1;const Te=async()=>{st&&st(),it&&it(),st=g.on("transactions:change",()=>{H||z()}),it=g.on("expenses:change",()=>{H||z()}),await z()},z=async()=>{if(!H){H=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,s,n]=await Promise.all([g.state.transactions.length?Promise.resolve(g.state.transactions):lt().then(m=>(g.setTransactions(m),m)),Ft().then(m=>(g.setExpenses(m),m)),ct("modalAwal")]),a=parseFloat(n)||0;let o=0,i=0,r=0,p=0,d=0;for(const m of e)if(m.paymentMethod==="cash"&&(m.paymentStatus==="paid"||!m.paymentStatus)&&(o+=m.total),m.paymentMethod==="transfer"&&(m.paymentStatus==="transfer_confirmed"?i+=m.total:p+=m.total),m.paymentMethod==="debt"){for(const v of m.debtPayments||[])r+=v.amount;d+=m.remainingDebt||0}const c=o+i+r,f=s.reduce((m,v)=>m+(v.amount||0),0),$=a+c-f,S=p+d,T=_e(e,s),_=Se(e,s),x=[...e.filter(m=>m.paymentStatus==="transfer_pending"),...e.filter(m=>(m.paymentMethod==="debt"||m.paymentStatus==="partial"||m.paymentStatus==="unpaid")&&(m.remainingDebt||0)>0)].sort((m,v)=>new Date(m.date)-new Date(v.date));t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${l(a)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${l($)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${l(c)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${l(f)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${s.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${l(S)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${x.length} belum lunas</div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          ${K("💵 Tunai",o,"#16a34a")}
          ${K("📲 Transfer",i,"#2563eb")}
          ${K("📋 Cicilan Hutang",r,"#7c3aed")}
          ${K("⏳ Transfer Pending",p,"#d97706",!0)}
          ${K("🔴 Piutang Hutang",d,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding -->
      ${x.length>0?`
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">⚠️ Daftar Piutang &amp; Cicilan Berjalan (${x.length})</div>
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
              ${x.map(m=>{const v=m.total||0,h=m.paymentStatus==="transfer_pending"?v:m.remainingDebt||0,w=v-h,b=Math.min(100,Math.max(0,Math.round(w/v*100))),u=(m.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${y(m.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${y(m.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${l(v)}</td>
                <td style="color:#16a34a;font-weight:700">${l(w)}</td>
                <td style="font-weight:800;color:#dc2626">${l(h)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${b}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${u>0?`${u}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${b}%;background:${b===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
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
                  <td><span class="badge badge--blue">${y(m.category||"Lainnya")}</span></td>
                  <td>${y(m.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${l(m.amount)}</td>
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
              ${Ee(T,a)}
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
              ${_.slice(0,20).map(m=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${y(m.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${m.debit>0?l(m.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${m.credit>0?l(m.credit):"—"}</td>
                <td><span class="badge ${m.type==="kas"?"badge--green":m.type==="piutang"?"":"badge--blue"}"
                  style="${m.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${y(m.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,Pe(e)}finally{H=!1}}},K=(t,e,s,n=!1)=>`
  <div style="padding:10px 14px;background:${n?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${s}">${l(e)}</div>
    ${n?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,_e=(t,e)=>{const s={};for(const a of t){const o=a.dateKey;if(o){if(s[o]||(s[o]={masuk:0,keluar:0}),a.paymentMethod==="cash"&&(a.paymentStatus==="paid"||!a.paymentStatus)&&(s[o].masuk+=a.total),a.paymentMethod==="transfer"&&a.paymentStatus==="transfer_confirmed"){const i=a.confirmedAt?a.confirmedAt.split("T")[0]:o;s[i]||(s[i]={masuk:0,keluar:0}),s[i].masuk+=a.total}if(a.paymentMethod==="debt")for(const i of a.debtPayments||[]){const r=i.date?i.date.split("T")[0]:o;s[r]||(s[r]={masuk:0,keluar:0}),s[r].masuk+=i.amount}}}for(const a of e){const o=a.dateKey||(a.date?a.date.split("T")[0]:null);o&&(s[o]||(s[o]={masuk:0,keluar:0}),s[o].keluar+=a.amount||0)}const n=[];for(let a=29;a>=0;a--){const o=new Date;o.setDate(o.getDate()-a);const i=o.toISOString().split("T")[0];n.push({key:i,...s[i]||{masuk:0,keluar:0}})}return n},Ee=(t,e)=>{let s=e;const n=t.filter(a=>a.masuk>0||a.keluar>0).map(a=>{const o=a.masuk-a.keluar;return s+=o,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(a.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${a.masuk>0?l(a.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${a.keluar>0?l(a.keluar):"—"}</td>
      <td style="font-weight:800;color:${o>=0?"#16a34a":"#dc2626"}">${o>=0?"+":""}${l(o)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${l(s)}</td>
    </tr>`});return n.length?n.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Se=(t,e)=>{const s=[];for(const n of t){const a=y(n.customerName||"Pelanggan");if(n.paymentMethod==="cash")s.push({date:n.date,desc:`Penjualan Tunai — ${n.invoiceNo} (${a})`,debit:n.total,credit:n.total,account:"Kas / Penjualan",type:"kas"});else if(n.paymentMethod==="transfer")n.paymentStatus==="transfer_confirmed"?s.push({date:n.confirmedAt||n.date,desc:`Transfer Terkonfirmasi — ${n.invoiceNo} (${a})`,debit:n.total,credit:n.total,account:"Bank / Penjualan",type:"kas"}):s.push({date:n.date,desc:`Transfer Pending — ${n.invoiceNo} (${a}) [Menunggu Konfirmasi]`,debit:n.total,credit:n.total,account:"Piutang Transfer",type:"piutang"});else if(n.paymentMethod==="debt"){s.push({date:n.date,desc:`Penjualan Piutang Usaha — ${n.invoiceNo} (${a}) [Total Tagihan: ${l(n.total)}]`,debit:n.total,credit:n.total,account:"Piutang / Penjualan",type:"piutang"});const o=n.debtPayments||[];let i=0;o.forEach((r,p)=>{i+=r.amount||0;const d=Math.max(0,n.total-i),c=d===0,f=p+1,$=c?`Pelunasan (#${f}/LUNAS ✅)`:`Cicilan #${f} (dari ${o.length})`,S=r.note?` — ${y(r.note)}`:"";s.push({date:r.date,desc:`${$} — ${n.invoiceNo} (${a})${S} [Bayar: ${l(r.amount)} | Sisa: ${l(d)}]`,debit:r.amount,credit:r.amount,account:c?"Kas / Piutang (LUNAS ✅)":"Kas / Piutang Usaha",type:"kas"})})}}for(const n of e)s.push({date:n.date,desc:`Beban ${y(n.category||"Operasional")} — ${y(n.note||"Pengeluaran kas")}`,debit:n.amount,credit:n.amount,account:`Beban (${y(n.category||"Operasional")}) / Kas`,type:"beban"});return s.sort((n,a)=>new Date(a.date)-new Date(n.date))},Pe=t=>{var e,s,n,a,o;(e=document.getElementById("btn-refresh-finance"))==null||e.addEventListener("click",z),(s=document.getElementById("btn-set-modal-awal"))==null||s.addEventListener("click",()=>{const r=`
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${g.state.settings.modalAwal||0}" min="0" max="999999999999" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;L(r,"modal-awal"),setTimeout(()=>{var p,d,c;(p=document.getElementById("ma-x"))==null||p.addEventListener("click",()=>E("modal-awal")),(d=document.getElementById("ma-cancel"))==null||d.addEventListener("click",()=>E("modal-awal")),(c=document.getElementById("ma-save"))==null||c.addEventListener("click",async()=>{var $;const f=parseFloat(($=document.getElementById("modal-awal-input"))==null?void 0:$.value)||0;await ot("modalAwal",f),g.updateSettings({modalAwal:f}),E("modal-awal"),window.showToast("Modal Awal disimpan!","success"),z()})},0)}),(n=document.getElementById("btn-add-expense"))==null||n.addEventListener("click",()=>{const r=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(p=>`<option value="${y(p)}">${y(p)}</option>`).join("")}
          </select>
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">📝 Keterangan</label>
          <input type="text" class="input" id="exp-note" placeholder="Keterangan singkat" maxlength="100">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">💵 Jumlah (Rp)</label>
          <input type="number" class="input" id="exp-amount" value="0" min="1" max="999999999" step="1000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="exp-cancel">Batal</button>
        <button class="btn btn--success" id="exp-save">💾 Simpan</button>
      </div>
    `;L(r,"expense-modal"),setTimeout(()=>{var p,d,c;(p=document.getElementById("exp-x"))==null||p.addEventListener("click",()=>E("expense-modal")),(d=document.getElementById("exp-cancel"))==null||d.addEventListener("click",()=>E("expense-modal")),(c=document.getElementById("exp-save"))==null||c.addEventListener("click",async()=>{var x,m,v,h;const f=parseFloat((x=document.getElementById("exp-amount"))==null?void 0:x.value)||0,$=((m=document.getElementById("exp-category"))==null?void 0:m.value)||"Lainnya",S=((h=(v=document.getElementById("exp-note"))==null?void 0:v.value)==null?void 0:h.trim())||"";if(f<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const T=new Date().toISOString(),_={date:T,dateKey:T.split("T")[0],category:$,note:S,amount:f};try{const w=await Ot(_);_.id=w,g.addExpense(_),E("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch(w){console.error("[expense]",w),window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(a=document.getElementById("expense-table"))==null||a.addEventListener("click",async i=>{const r=i.target.closest('[data-action="delete-expense"]');if(!r||!confirm("Hapus pengeluaran ini?"))return;const p=parseInt(r.dataset.id);try{await qt(p),g.removeExpense(p),window.showToast("Pengeluaran dihapus","success")}catch(d){console.error("[expense]",d),window.showToast("Gagal hapus","error")}}),(o=document.getElementById("piutang-table"))==null||o.addEventListener("click",async i=>{const r=i.target.closest("[data-action]");if(!r)return;const p=parseInt(r.dataset.id),d=r.dataset.action,c=(g.state.transactions||t).find(f=>f.id===p);if(c){if(d==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${l(c.total)} dari ${y(c.customerName||"pelanggan")} sudah diterima?`))return;const f={...c,paymentStatus:"transfer_confirmed",paidAmount:c.total,confirmedAt:new Date().toISOString()};try{await W(f),g.updateTransaction(p,{paymentStatus:"transfer_confirmed",paidAmount:c.total,confirmedAt:f.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch($){console.error("[confirm]",$),window.showToast("Gagal konfirmasi","error")}}if(d==="pay-debt"){const f=c.remainingDebt||0,$=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${l(c.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${l(f)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${f}" min="1" max="${f}" step="1000" inputmode="numeric">
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
      `;L($,"mini-cicil"),setTimeout(()=>{var S,T,_;(S=document.getElementById("mc-x"))==null||S.addEventListener("click",()=>E("mini-cicil")),(T=document.getElementById("mc-cancel"))==null||T.addEventListener("click",()=>E("mini-cicil")),(_=document.getElementById("mc-save"))==null||_.addEventListener("click",async()=>{var j,D,R;const x=parseFloat((j=document.getElementById("mc-amount"))==null?void 0:j.value)||0;if(x<=0||x>f){window.showToast("Jumlah tidak valid","warning");return}const m=(c.paidAmount||0)+x,v=Math.max(0,f-x),h=v===0?"paid":"partial",w=(c.debtPayments||[]).length+1,b=v===0?`Pelunasan (#${w}/LUNAS ✅)`:`Cicilan #${w}`,u=((R=(D=document.getElementById("mc-note"))==null?void 0:D.value)==null?void 0:R.trim())||b,k=[...c.debtPayments||[],{date:new Date().toISOString(),amount:x,note:u}],B={...c,paidAmount:m,remainingDebt:v,paymentStatus:h,debtPayments:k};try{await W(B),g.updateTransaction(p,{paidAmount:m,remainingDebt:v,paymentStatus:h,debtPayments:k}),E("mini-cicil"),window.showToast(v===0?"🎉 Hutang LUNAS!":`Cicilan #${w} (${l(x)}) dicatat`,"success")}catch(P){console.error("[cicil]",P),window.showToast("Gagal simpan cicilan","error")}})},0)}}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const vt=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine?(t.textContent="Sistem Online",t.classList.remove("status-badge--offline")):(t.textContent="Mode Offline",t.classList.add("status-badge--offline")))};window.addEventListener("online",vt);window.addEventListener("offline",vt);window.showToast=(t,e="info",s="")=>{const n=document.getElementById("toast-container");if(!n)return;const a={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},o=document.createElement("div");o.className=`toast toast--${e}`,o.setAttribute("role","alert"),o.innerHTML=`
    <span class="toast__icon">${a[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${s?`<div class="toast__title">${s}</div>`:""}
      <div class="toast__msg">${t}</div>
    </div>
  `,n.appendChild(o);const i=()=>{o.classList.add("hiding"),o.addEventListener("animationend",()=>o.remove(),{once:!0})},r=setTimeout(i,3500);o.addEventListener("click",()=>{clearTimeout(r),i()})};const wt=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=Tt()),e&&(e.textContent=Vt())},Ie={pos:{init:te,refresh:se},products:{init:oe,refresh:X},transactions:{init:ce,refresh:Bt},reports:{init:ge,refresh:mt},settings:{init:we,refresh:Nt},finance:{init:Te,refresh:z}},xt=new Set,kt=async t=>{const e=Ie[t];if(e){document.querySelectorAll(".dock-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===t)}),document.querySelectorAll(".view").forEach(s=>{s.classList.toggle("active",s.id===`view-${t}`)});try{xt.has(t)?await e.refresh():(await e.init(),xt.add(t)),sessionStorage.setItem("activeView",t)}catch(s){console.error(`[Navigation] Error initializing view "${t}":`,s);const n=document.getElementById(`view-${t}`);n&&!n.children.length&&(n.innerHTML=`
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
      `)}g.navigate(t)}},Be=(t,e)=>{if(!t)return;const s=t.getBoundingClientRect(),n=Math.max(s.width,s.height),a=document.createElement("span");a.className="ripple-effect",a.style.cssText=`width:${n}px;height:${n}px;left:${e.clientX-s.left-n/2}px;top:${e.clientY-s.top-n/2}px`,t.style.position="relative",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0})},Ct=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};g.on("settings:change",Ct);const Le=async()=>{try{await Jt(),await Gt()}catch(v){console.error("[DB] Failed to open database:",v),window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const v of t){const h=await ct(v);h!==null&&(v==="modalAwal"||v==="taxRate"?e[v]=parseFloat(h)||0:e[v]=h)}g.updateSettings(e),Ct(g.state.settings),vt(),wt(),setInterval(wt,1e3);const s=document.querySelector(".dock"),n=[...document.querySelectorAll(".dock-item")],a=1.55,o=1.28,i=1.1,r=16,p=n.map(()=>1),d=n.map(()=>1);let c=null;const f=(v,h,w)=>v+(h-v)*w,$=.22,S=()=>{let v=!1;n.forEach((h,w)=>{p[w]=f(p[w],d[w],$),Math.abs(p[w]-d[w])>.001&&(v=!0);const b=p[w],u=(b-1)/(a-1)*r;h.style.transform=`translateY(${-u}px) scale(${b.toFixed(4)})`,h.style.zIndex=b>1.01?Math.round(b*10):""}),c=v?requestAnimationFrame(S):null},T=()=>{c||(c=requestAnimationFrame(S))},_=v=>{n.forEach((h,w)=>{const b=Math.abs(w-v);d[w]=b===0?a:b===1?o:b===2?i:1})},x=()=>n.forEach((v,h)=>d[h]=1);s==null||s.addEventListener("mousemove",v=>{let h=0,w=1/0;n.forEach((b,u)=>{const k=b.getBoundingClientRect(),B=Math.abs(v.clientX-(k.left+k.width/2));B<w&&(w=B,h=u)}),_(h),T()}),s==null||s.addEventListener("mouseleave",()=>{x(),T()}),n.forEach((v,h)=>{v.addEventListener("touchstart",()=>{_(h),T()},{passive:!0}),v.addEventListener("touchend",()=>{setTimeout(()=>{x(),T()},350)},{passive:!0})}),document.querySelectorAll(".dock-item").forEach(v=>{v.addEventListener("click",async h=>{const w=v.dataset.view;w&&(v.classList.add("bouncing"),v.addEventListener("animationend",()=>v.classList.remove("bouncing"),{once:!0}),Be(v.querySelector(".dock-icon"),h),await kt(w))})});const m=sessionStorage.getItem("activeView")||"pos";await kt(m)};document.addEventListener("DOMContentLoaded",Le);
