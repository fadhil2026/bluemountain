const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-QkGqYg11.js","./_commonjsHelpers-C4iS2aBk.js","./vendor-pdf-j4-ZKoBl.js"])))=>i.map(i=>d[i]);
import{X as Rt}from"./vendor-db-2jmnBxhj.js";import{_ as V}from"./vendor-pdf-j4-ZKoBl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const E=new Rt("BlueMountainPOS");E.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});const N=()=>E.products.toArray(),Tt=t=>E.products.add(t),Kt=t=>E.products.put(t),Ht=t=>E.products.delete(t),Ot=t=>E.transactions.add(t),X=()=>E.transactions.toArray(),Ft=t=>E.transactions.delete(t),Y=t=>E.transactions.put(t),qt=t=>E.expenses.add(t),_t=()=>E.expenses.toArray(),Ut=t=>E.expenses.delete(t),lt=async t=>{const e=await E.settings.get(t);return(e==null?void 0:e.value)??null},St=(t,e)=>E.settings.put({key:t,value:e}),Gt=async()=>{await E.products.count()>0||await E.products.bulkAdd([{name:"Air Isi Ulang Galon",category:"Galon",price:5e3,unit:"galon",emoji:"🪣",stock:999},{name:"Antar Galon (dalam)",category:"Galon",price:3e3,unit:"kali",emoji:"🛵",stock:999},{name:"Antar Galon (luar)",category:"Galon",price:5e3,unit:"kali",emoji:"🚚",stock:999},{name:"Galon Baru (Aqua)",category:"Galon",price:5e4,unit:"buah",emoji:"💧",stock:50},{name:"Galon Baru (Standar)",category:"Galon",price:45e3,unit:"buah",emoji:"💦",stock:50},{name:"Air Botol 600ml",category:"Botol",price:3e3,unit:"botol",emoji:"🍶",stock:200},{name:"Air Botol 1500ml",category:"Botol",price:5e3,unit:"botol",emoji:"🥤",stock:100},{name:"Dispenser Galon",category:"Lainnya",price:25e4,unit:"unit",emoji:"⚗️",stock:10}])},Jt=async()=>{await Promise.all([E.products.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear()]),sessionStorage.clear(),localStorage.clear()},Wt=async()=>{const[t,e,n,s]=await Promise.all([E.products.toArray(),E.transactions.toArray(),E.expenses.toArray(),E.settings.toArray()]),a=s.find(r=>r.key==="shopName"),i=(a==null?void 0:a.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"3.0.0",exportedAt:new Date().toISOString(),shopName:i,data:{products:t,transactions:e,expenses:n,settings:s},meta:{productCount:t.length,transactionCount:e.length,expenseCount:n.length,settingCount:s.length}}},Vt=async(t,e="replace")=>{if(!t||!t.data)throw new Error("Format file backup tidak valid atau rusak.");const{products:n=[],transactions:s=[],expenses:a=[],settings:i=[]}=t.data;return e==="replace"?(await Promise.all([E.products.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear()]),n.length&&await E.products.bulkAdd(n),s.length&&await E.transactions.bulkAdd(s),a.length&&await E.expenses.bulkAdd(a),i.length&&await E.settings.bulkPut(i)):e==="merge"&&(n.length&&await E.products.bulkPut(n),s.length&&await E.transactions.bulkPut(s),a.length&&await E.expenses.bulkPut(a),i.length&&await E.settings.bulkPut(i)),{products:n.length,transactions:s.length,expenses:a.length,settings:i.length}},Yt=()=>E.open(),j={},g={state:{cart:[],products:[],transactions:[],expenses:[],currentView:"pos",discount:0,customerName:"",settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return(j[t]??(j[t]=[])).push(e),()=>{j[t]=(j[t]??[]).filter(n=>n!==e)}},emit(t,e){(j[t]??[]).forEach(n=>n(e))},addToCart(t,e=1){const n=Math.max(1,parseInt(e)||1),s=this.state.cart.findIndex(a=>String(a.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=n:this.state.cart.push({product:t,qty:n}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const n=this.state.cart.find(s=>String(s.product.id)===String(t));n&&(n.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.emit("cart:change",this.state.cart)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>e.id!==t),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const n=this.state.transactions.findIndex(s=>s.id===t);n>=0&&(this.state.transactions[n]={...this.state.transactions[n],...e},this.emit("transactions:change",this.state.transactions))},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)}},Qt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),Xt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),Et=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),Z=(t=new Date)=>`${Xt(t)} ${Et(t)}`,G=()=>new Date().toISOString().split("T")[0],Zt=()=>{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`},p=t=>isNaN(t)?"Rp 0":"Rp "+Math.round(t).toLocaleString("id-ID"),f=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),ct=(t,e)=>{const n=t.items||[],s=[],a=(l,c=0,o=1,d=0)=>s.push({type:0,content:l,bold:c,align:o,format:d}),i=()=>a("--------------------------------",0,1,0),r=()=>a(" ",0,0,0);r(),a(e.shopName||"Blue Mountain Refilling Station",1,1,2),a(e.shopAddress||"",0,1,4),e.shopPhone&&a(`Telp: ${e.shopPhone}`,0,1,4),i(),a(`No: ${t.invoiceNo||"-"}`,0,0,0),a(`Tgl: ${Z(new Date(t.date))}`,0,0,0),t.customerName&&a(`Pelanggan: ${t.customerName}`,0,0,0),t.cashier&&a(`Kasir: ${t.cashier}`,0,0,0),i();for(const l of n){if(!(l!=null&&l.product))continue;const c=l.product.name,o=l.qty,d=p(l.product.price),b=p(l.product.price*o);a(`${c}`,0,0,0),a(`  ${o} x ${d} = ${b}`,0,0,0)}return i(),t.discount>0&&(a(`Subtotal: ${p(t.subtotal)}`,0,0,0),a(`Diskon:  -${p(t.discount)}`,0,0,0)),t.tax>0&&a(`Pajak:    ${p(t.tax)}`,0,0,0),a(`TOTAL: ${p(t.total)}`,1,0,3),t.paymentMethod==="cash"?(a(`Bayar:   ${p(t.paid)}`,0,0,0),a(`Kembali: ${p(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(a(`Transfer: ${p(t.total)}`,0,0,0),a(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(a(`DP Dibayar: ${p(t.paidAmount||0)}`,0,0,0),a(`Sisa Hutang: ${p(t.remainingDebt||0)}`,1,0,0)),i(),r(),a("Terima kasih sudah berbelanja!",1,1,0),a(e.shopName||"Blue Mountain Refilling Station",0,1,4),r(),r(),s},te=""+new URL("logo-x8cg0OuI.png",import.meta.url).href,Pt=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},ee=t=>{const e=ct(t,g.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Pt()},It=t=>(ee(t),`my.bluetoothprint.scheme://${(g.state.settings||{}).printerUrl||Pt()}`),pt=(t,e="58mm")=>{const n=g.state.settings||{},s=t.items||[],a=(n.printerPaper||e)==="58mm",i=a?"220px":"300px",r=(d,b=!1,w="left",_="11px")=>`<div style="text-align:${w};font-weight:${b?"700":"400"};font-size:${_};line-height:1.35;word-break:break-word">${d}</div>`,l=()=>'<div style="border-top:1px dashed #444;margin:4px 0"></div>',c=()=>'<div style="height:4px"></div>';let o=`<div class="thermal-receipt" style="width:${i};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:4px">`;o+=`<div style="text-align:center;margin-bottom:6px;margin-top:2px">
    <img src="${te}"
         alt="Logo"
         style="width:${a?"70px":"85px"};height:${a?"70px":"85px"};object-fit:contain;display:inline-block">
  </div>`,o+=r(n.shopName||"Blue Mountain Refilling Station",!0,"center",a?"12px":"14px"),n.shopAddress&&(o+=r(n.shopAddress,!1,"center","10px")),n.shopPhone&&(o+=r(`Telp: ${n.shopPhone}`,!1,"center","10px")),o+=l(),o+=r(`No  : ${t.invoiceNo||"-"}`),o+=r(`Tgl : ${Z(new Date(t.date||Date.now()))}`),t.customerName&&(o+=r(`Cust: ${t.customerName}`)),t.cashier&&(o+=r(`Kasir: ${t.cashier}`)),o+=l();for(const d of s){if(!(d!=null&&d.product))continue;const b=d.product.name,w=d.qty,_=d.product.price,$=_*w;o+=r(b,!0),o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3">
      <span>&nbsp;&nbsp;${w} x ${p(_)}</span>
      <span>${p($)}</span>
    </div>`}return o+=l(),t.discount>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Subtotal</span><span>${p(t.subtotal||t.total+t.discount)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Diskon</span><span>-${p(t.discount)}</span>
    </div>`),t.tax>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Pajak</span><span>${p(t.tax)}</span>
    </div>`),o+=`<div style="display:flex;justify-content:space-between;font-size:${a?"12px":"13px"};font-weight:900;margin-top:2px">
    <span>TOTAL</span><span>${p(t.total)}</span>
  </div>`,t.paymentMethod==="cash"?(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>Bayar Tunai</span><span>${p(t.paid||t.total)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700">
      <span>Kembali</span><span>${p(t.change||0)}</span>
    </div>`):t.paymentMethod==="transfer"?(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>Transfer Bank</span><span>${p(t.total)}</span>
    </div>`,o+=r(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}`,!1,"center","9px")):t.paymentMethod==="debt"&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>DP Dibayar</span><span>${p(t.paidAmount||0)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#000">
      <span>Sisa Hutang</span><span>${p(t.remainingDebt||0)}</span>
    </div>`),o+=l(),o+=c(),o+=r("Terima kasih atas kunjungan Anda!",!0,"center","10px"),o+=r(n.shopName||"Blue Mountain Refilling Station",!1,"center","9px"),o+=c(),o+="</div>",o},Bt=t=>{const n=(g.state.settings||{}).printerPaper||"58mm",s=pt(t,n),a=document.createElement("iframe");a.style.position="fixed",a.style.right="0",a.style.bottom="0",a.style.width="0",a.style.height="0",a.style.border="0",document.body.appendChild(a);const i=a.contentWindow.document;i.open(),i.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Struk-${t.invoiceNo||"KASIR"}</title>
  <style>
    @page {
      size: ${n==="58mm"?"58mm auto":"80mm auto"};
      margin: 0mm;
    }
    @media print {
      html, body {
        width: ${n==="58mm"?"58mm":"80mm"};
        margin: 0 !important;
        padding: 1mm 2mm !important;
        background: #fff !important;
        color: #000 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .thermal-receipt {
        width: 100% !important;
        padding: 0 !important;
      }
      img {
        max-width: 65px !important;
        height: auto !important;
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
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
  ${s}
</body>
</html>`),i.close(),setTimeout(()=>{try{a.contentWindow.focus(),a.contentWindow.print()}catch(r){console.warn("[print-frame] Direct iframe print failed, falling back to popup",r);const l=window.open("","_blank","width=350,height=600");l&&(l.document.write(i.documentElement.outerHTML),l.document.close(),l.focus(),l.print(),setTimeout(()=>l.close(),1e3))}finally{setTimeout(()=>a.remove(),1500)}},350)},ae=()=>{const t={invoiceNo:"TEST-58MM-"+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:g.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};Bt(t)},et=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),n=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${n}${s}`},L=(t,e="generic-modal")=>{P();const n=document.createElement("div");n.className="modal-overlay",n.id=`overlay-${e}`,n.innerHTML=`<div class="modal" id="${e}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(n),n.addEventListener("click",a=>{a.target===n&&P(e)});const s=n.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return s.length&&s[0].focus(),n},P=(t=null)=>{const e=t?`#overlay-${t}`:".modal-overlay";(t?[document.querySelector(e)]:[...document.querySelectorAll(e)]).forEach(s=>{var a;s&&((a=s.querySelector(".modal"))==null||a.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>s.remove(),200))})},at=(t="cash")=>{const e=g.total,n=g.subtotal,s=g.state.discount,a=g.tax,i=g.state.settings,r=f(i.bankName||"BCA"),l=f(i.bankNumber||"—"),c=f(i.bankHolder||i.shopName||"Blue Mountain"),o=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Pembayaran</div>
        <div class="amount">${p(e)}</div>
        ${s>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${p(s)}</div>`:""}
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
          ${generateQuickAmounts(e).map(d=>`<button class="quick-amt-btn" data-amount="${d}">${p(d)}</button>`).join("")}
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
          <div style="font-size:18px;font-weight:800;color:var(--text-primary);margin:6px 0">${r}: ${l}</div>
          <div style="font-size:13px;color:var(--text-secondary)">a/n ${c}</div>
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
  `;L(o,"payment-modal"),setTimeout(()=>{var $,S,k,m;($=document.getElementById("pay-close-btn"))==null||$.addEventListener("click",()=>P("payment-modal")),(S=document.getElementById("pay-cancel-btn"))==null||S.addEventListener("click",()=>P("payment-modal")),document.querySelectorAll(".pay-tab").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".pay-tab").forEach(x=>x.classList.remove("active")),v.classList.add("active");const h=v.dataset.method;document.getElementById("pay-cash-section").style.display=h==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=h==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=h==="debt"?"":"none"})});const d=document.getElementById("cash-received"),b=()=>{const v=parseFloat(d==null?void 0:d.value)||0,h=Math.max(0,v-e),x=document.getElementById("change-amount");x&&(x.textContent=p(h))};d==null||d.addEventListener("input",b),b(),(k=document.getElementById("quick-amounts"))==null||k.addEventListener("click",v=>{const h=v.target.closest(".quick-amt-btn");h&&d&&(d.value=h.dataset.amount,b())});const w=document.getElementById("debt-paid-now"),_=()=>{const v=Math.min(parseFloat(w==null?void 0:w.value)||0,e),h=e-v,x=document.getElementById("debt-paid-display"),y=document.getElementById("debt-remaining-display");x&&(x.textContent=p(v)),y&&(y.textContent=p(h))};w==null||w.addEventListener("input",_),(m=document.getElementById("pay-confirm-btn"))==null||m.addEventListener("click",async()=>{var T,B,z,A,M;const v=document.querySelector(".pay-tab.active"),h=(v==null?void 0:v.dataset.method)||"cash",x=document.getElementById("pay-confirm-btn");if(h==="cash"&&(parseFloat(d==null?void 0:d.value)||0)<e){window.showToast("Jumlah bayar kurang dari total!","warning");return}if(h==="debt"&&!((B=(T=document.getElementById("debt-customer"))==null?void 0:T.value)==null?void 0:B.trim())){window.showToast("Nama pelanggan wajib diisi untuk hutang!","warning");return}x&&(x.disabled=!0,x.textContent="⏳ Menyimpan...");const y=new Date().toISOString();let u;if(h==="cash"){const I=parseFloat(d==null?void 0:d.value)||e,H=Math.max(0,I-e);u={invoiceNo:et(),date:y,dateKey:G(),items:g.state.cart.map(C=>({product:{...C.product},qty:C.qty})),subtotal:n,discount:s,tax:a,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:I,change:H,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Admin"}}else if(h==="transfer")u={invoiceNo:et(),date:y,dateKey:G(),items:g.state.cart.map(I=>({product:{...I.product},qty:I.qty})),subtotal:n,discount:s,tax:a,total:e,paymentMethod:"transfer",paymentStatus:"transfer_pending",paid:0,change:0,paidAmount:0,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Admin"};else{const I=Math.min(parseFloat((z=document.getElementById("debt-paid-now"))==null?void 0:z.value)||0,e),H=e-I,C=I===0?"unpaid":I<e?"partial":"paid",Dt=((M=(A=document.getElementById("debt-cust-name"))==null?void 0:A.value)==null?void 0:M.trim())||g.state.customerName||"";u={invoiceNo:et(),date:y,dateKey:G(),items:g.state.cart.map(yt=>({product:{...yt.product},qty:yt.qty})),subtotal:n,discount:s,tax:a,total:e,paymentMethod:"debt",paymentStatus:C,paid:I,change:0,paidAmount:I,remainingDebt:H,debtPayments:I>0?[{date:y,amount:I,note:"DP / Uang muka awal"}]:[],customerName:Dt,cashier:g.state.settings.cashierName||"Admin"}}try{const I=await Ot(u);u.id=I,g.addTransaction(u),P("payment-modal"),g.clearCart(),ne(u)}catch(I){window.showToast("Gagal menyimpan transaksi!","error"),console.error("[payment]",I),x&&(x.disabled=!1,x.innerHTML="✅ Proses Pembayaran")}})},0)},ne=t=>{var r,l,c,o;const e=ct(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const n=It(t),s=pt(t),a=document.createElement("div");a.className="success-overlay",a.id="success-overlay",a.innerHTML=`
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

    <!-- Print & Navigation Actions -->
    <div class="success-actions" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:380px;margin-top:14px">
      <button class="btn btn--success" id="btn-print-direct" style="flex:1;min-width:140px;font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        🖨️ Cetak Struk (58mm)
      </button>
      <a class="btn btn--secondary" href="${n}" id="btn-print-bluetooth" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Bluetooth App
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
        📄 Preview Struk Thermal
      </summary>
      <div class="receipt-preview" style="background:#fff;border-radius:8px;padding:8px">${s}</div>
    </details>
  `,document.body.appendChild(a);const i=()=>{a.classList.add("closing"),setTimeout(()=>a.remove(),180)};(r=document.getElementById("success-close-btn"))==null||r.addEventListener("click",i),(l=document.getElementById("btn-close-overlay"))==null||l.addEventListener("click",i),(c=document.getElementById("btn-print-direct"))==null||c.addEventListener("click",()=>{printThermalDirect(t)}),(o=document.getElementById("btn-new-tx"))==null||o.addEventListener("click",()=>{i(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{a.parentNode&&i()},15e3)};let rt="",Q="Semua",U=null,ft=[];const se=async()=>{const t=await N();g.setProducts(t),Lt(),U&&U.abort(),U=new AbortController,ft.forEach(e=>e()),ft=[g.on("cart:change",At),g.on("products:change",()=>q())],re(U.signal)},Lt=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
  `,ut(),q(),At()},ie=()=>["Semua",...new Set(g.state.products.map(t=>t.category))],ut=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=ie().map(e=>`
    <button class="cat-pill ${e===Q?"active":""}"
      data-cat="${f(e)}">${f(e)}</button>
  `).join(""))},q=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=g.state.products;if(Q!=="Semua"&&(e=e.filter(n=>n.category===Q)),rt){const n=rt.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(n))}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(n=>`
    <div class="product-card" data-id="${n.id}" role="button" tabindex="0"
      aria-label="${f(n.name)} — ${p(n.price)}">
      <div class="product-card__emoji">${n.emoji||"📦"}</div>
      <div class="product-card__name">${f(n.name)}</div>
      <div class="product-card__price">${p(n.price)}</div>
      <div class="product-card__unit">per ${f(n.unit)}</div>
    </div>
  `).join(""),t.querySelectorAll(".product-card").forEach(n=>{const s=()=>{const a=n.dataset.id,i=g.state.products.find(r=>String(r.id)===String(a));i&&(g.addToCart(i),n.style.transform="scale(0.94)",setTimeout(()=>{n.style.transform=""},120))};n.addEventListener("click",s),n.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s())})})},At=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),n=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),a=document.getElementById("tax-row"),i=document.getElementById("customer-name"),r=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=g.state.customerName||""),r&&!r.matches(":focus")&&(r.value=g.state.discount||""),!t)return;const l=g.state.cart;if(e){const c=e.textContent;e.textContent=g.cartCount,c!==String(g.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(n&&(n.textContent=p(g.total)),a&&s&&(g.tax>0?(a.style.display="flex",s.textContent=p(g.tax)):a.style.display="none"),!l.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=l.map(c=>`
    <div class="cart-item" data-pid="${c.product.id}">
      <div class="cart-item__info">
        <div class="cart-item__name">${c.product.emoji||""} ${f(c.product.name)}</div>
        <div class="cart-item__price">${p(c.product.price)} / ${f(c.product.unit)}</div>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__subtotal">${p(c.product.price*c.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn remove" data-action="remove" data-pid="${c.product.id}" title="Hapus">🗑</button>
          <button class="qty-btn" data-action="dec" data-pid="${c.product.id}">−</button>
          <span class="qty-value">${c.qty}</span>
          <button class="qty-btn" data-action="inc" data-pid="${c.product.id}">+</button>
        </div>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",()=>{const o=c.dataset.pid,d=c.dataset.action,b=g.state.cart.find(w=>String(w.product.id)===String(o));b&&(d==="inc"?g.setQty(b.product.id,b.qty+1):d==="dec"?g.setQty(b.product.id,b.qty-1):d==="remove"&&g.removeFromCart(b.product.id))})})},oe=()=>{const t=`
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
  `;L(t,"manual-item-modal"),setTimeout(()=>{var e,n,s,a;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>P("manual-item-modal")),(n=document.getElementById("mi-cancel"))==null||n.addEventListener("click",()=>P("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(r=>{r.style.borderColor="var(--border-subtle)",r.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(a=document.getElementById("mi-save"))==null||a.addEventListener("click",async()=>{var _,$,S,k,m,v,h;const i=(_=document.getElementById("mi-name"))==null?void 0:_.value.trim(),r=($=document.getElementById("mi-price"))==null?void 0:$.value,l=parseFloat(r)||0,c=Math.max(1,parseInt((S=document.getElementById("mi-qty"))==null?void 0:S.value)||1),o=((k=document.getElementById("mi-unit"))==null?void 0:k.value.trim())||"pcs",d=((m=document.getElementById("mi-category"))==null?void 0:m.value)||"Lainnya",b=((v=document.getElementById("mi-emoji"))==null?void 0:v.value)||"🏷️",w=(h=document.getElementById("mi-save-catalog"))==null?void 0:h.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(r===""||l<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(w){const x=await Tt({name:i,price:l,unit:o,category:d,emoji:b,stock:999}),y=await N();g.setProducts(y);const u=y.find(T=>T.id===x)||{id:x,name:i,price:l,unit:o,category:d,emoji:b};g.addToCart(u,c),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const x={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:i,price:l,unit:o,category:d,emoji:b};g.addToCart(x,c),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}P("manual-item-modal")}catch(x){window.showToast("Gagal menambahkan item manual!","error"),console.error("[manual-item]",x)}})},0)},re=t=>{document.addEventListener("click",e=>{const n=e.target.closest(".cat-pill");if(n){Q=n.dataset.cat,ut(),q();return}if(e.target.closest("#btn-manual-item")){oe();return}if(e.target.closest("#btn-pay-cash")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}at("cash")}if(e.target.closest("#btn-pay-transfer")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}at("transfer")}if(e.target.closest("#btn-pay-debt")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}at("debt")}e.target.closest("#btn-clear-cart")&&g.state.cart.length&&(g.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{e.target.id==="pos-search"&&(rt=e.target.value.trim(),q()),e.target.id==="discount-input"&&g.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"&&g.setCustomerName(e.target.value)},{signal:t})},de=async()=>{const t=document.getElementById("view-pos");(!t||!t.querySelector(".pos-layout"))&&Lt();const e=await N();g.setProducts(e),q(),ut()},ht=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],le=["Galon","Botol","Layanan","Lainnya"],ce=async()=>{await tt()},tt=async()=>{const t=document.getElementById("view-products"),e=await N();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(n=>pe(n)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,ue()},pe=t=>`
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
`,ue=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",()=>xt()),t==null||t.addEventListener("click",async n=>{const s=n.target.closest('[data-action="edit"]'),a=n.target.closest('[data-action="delete"]');if(s){const i=parseInt(s.dataset.id),l=(await N()).find(c=>c.id===i);l&&xt(l)}if(a){const i=parseInt(a.dataset.id);me(i)}})},xt=(t=null)=>{const e=!!t,n=`
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
          ${le.map(s=>`<option value="${f(s)}" ${(t==null?void 0:t.category)===s?"selected":""}>${f(s)}</option>`).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
          ${ht.map(s=>`
            <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===s?"emoji-pick--active":""}"
              data-emoji="${s}"
              style="font-size:24px;width:40px;height:40px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===s?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${s}</button>
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
  `;L(n,"product-form"),setTimeout(()=>{var s,a,i;(s=document.getElementById("pf-close"))==null||s.addEventListener("click",()=>P("product-form")),(a=document.getElementById("pf-cancel"))==null||a.addEventListener("click",()=>P("product-form")),document.querySelectorAll(".emoji-pick").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(l=>{l.style.borderColor="var(--border-subtle)",l.classList.remove("emoji-pick--active")}),r.style.borderColor="var(--blue-400)",r.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=r.dataset.emoji})}),(i=document.getElementById("pf-save"))==null||i.addEventListener("click",async()=>{var w,_,$,S,k,m;const r=(w=document.getElementById("pf-name"))==null?void 0:w.value.trim(),l=parseFloat((_=document.getElementById("pf-price"))==null?void 0:_.value)||0,c=(($=document.getElementById("pf-unit"))==null?void 0:$.value.trim())||"pcs",o=((S=document.getElementById("pf-category"))==null?void 0:S.value)||"Lainnya",d=((k=document.getElementById("pf-emoji"))==null?void 0:k.value)||"📦",b=parseInt((m=document.getElementById("pf-stock"))==null?void 0:m.value)||0;if(!r){window.showToast("Nama produk wajib diisi!","warning");return}if(l<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{e?(await Kt({...t,name:r,price:l,unit:c,category:o,emoji:d,stock:b}),window.showToast("Produk berhasil diperbarui","success")):(await Tt({name:r,price:l,unit:c,category:o,emoji:d,stock:b}),window.showToast("Produk berhasil ditambahkan","success")),P("product-form");const v=await N();g.setProducts(v),await tt()}catch(v){window.showToast("Gagal menyimpan produk!","error"),console.error("[products]",v)}})},0)},me=t=>{L(`
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
  `,"delete-confirm"),setTimeout(()=>{var n,s,a;(n=document.getElementById("dc-close"))==null||n.addEventListener("click",()=>P("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>P("delete-confirm")),(a=document.getElementById("dc-confirm"))==null||a.addEventListener("click",async()=>{try{await Ht(t);const i=await N();g.setProducts(i),P("delete-confirm"),await tt(),window.showToast("Produk dihapus","success")}catch(i){window.showToast("Gagal menghapus produk","error"),console.error("[products]",i)}})},0)};let nt=null;const ge=async()=>{nt&&nt(),nt=g.on("transactions:change",t=>{Ct(t)}),await Mt()},Mt=async()=>{const t=await X();g.setTransactions(t),Ct(t)},Nt=t=>{const e=t.paymentMethod,n=t.paymentStatus;return e==="transfer"&&n==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&n==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':n==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':n==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},zt=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":f(t.paymentMethod)||"—",R=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Ct=t=>{const e=document.getElementById("view-transactions");if(!e)return;const n=[...t].sort((c,o)=>new Date(o.date)-new Date(c.date)),s=new Date().toISOString().split("T")[0],i=t.filter(c=>c.dateKey===s).reduce((c,o)=>o.paymentStatus==="paid"&&o.paymentMethod==="cash"||o.paymentStatus==="transfer_confirmed"?c+o.total:o.paymentMethod==="debt"?c+(o.paidAmount||0):c,0),r=t.reduce((c,o)=>c+(o.remainingDebt||0),0),l=t.filter(c=>c.paymentStatus==="transfer_pending").reduce((c,o)=>c+o.total,0);e.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Riwayat Transaksi <span>${t.length} transaksi</span></h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <input type="date" class="input" id="tx-filter-date" style="width:auto" value="${s}">
        <button class="btn btn--secondary btn--sm" id="tx-clear-filter">Tampil Semua</button>
      </div>
    </div>

    <!-- Summary strip -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kas Hari Ini</div>
        <div style="font-size:15px;font-weight:800;color:#16a34a">${p(i)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${p(r)}</div>
      </div>
      ${l>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${p(l)}</div>
      </div>`:""}
    </div>

    ${n.length===0?`
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
              ${dt(n)}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `,ve(t,n)},dt=t=>t.length?t.map(e=>{var n;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${f(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${Z(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((n=e.items)==null?void 0:n.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${p(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${p(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${zt(e)}</span></td>
      <td>${Nt(e)}</td>
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
            ${R(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${R(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${R(e)?"var(--color-danger-border)":"#d1d5db"};color:${R(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${R(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk filter ini</td></tr>',ve=(t,e)=>{var n,s,a;(n=document.getElementById("tx-filter-date"))==null||n.addEventListener("change",i=>{const r=i.target.value,l=r?[...t].filter(o=>o.dateKey===r).sort((o,d)=>new Date(d.date)-new Date(o.date)):e,c=document.getElementById("tx-tbody");c&&(c.innerHTML=dt(l))}),(s=document.getElementById("tx-clear-filter"))==null||s.addEventListener("click",()=>{const i=document.getElementById("tx-tbody"),r=document.getElementById("tx-filter-date");i&&(i.innerHTML=dt(e)),r&&(r.value="")}),(a=document.getElementById("tx-table"))==null||a.addEventListener("click",async i=>{const r=i.target.closest("[data-action]");if(!r)return;const l=parseInt(r.dataset.id),c=r.dataset.action,o=t.find(d=>d.id===l);if(c==="detail"){o&&ye(o);return}if(c==="confirm-transfer"){if(!o||!confirm(`Konfirmasi transfer ${p(o.total)} dari ${f(o.customerName||"pelanggan")} sudah diterima?`))return;try{const d={...o,paymentStatus:"transfer_confirmed",paidAmount:o.total,confirmedAt:new Date().toISOString()};await Y(d),g.updateTransaction(l,{paymentStatus:"transfer_confirmed",paidAmount:o.total,confirmedAt:d.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(d){console.error("[tx]",d),window.showToast("Gagal konfirmasi","error")}return}if(c==="pay-debt"){o&&be(o);return}if(c==="delete"){if(!o)return;if(!R(o)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${f(o.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{await Ft(l),g.removeTransaction(l),window.showToast("Transaksi dihapus","success")}catch(d){console.error("[tx]",d),window.showToast("Gagal menghapus","error")}}})},be=t=>{var s;const e=t.remainingDebt||0,n=`
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

      ${(s=t.debtPayments)!=null&&s.length?`
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
  `;L(n,"debt-modal"),setTimeout(()=>{var a,i,r;(a=document.getElementById("debt-x"))==null||a.addEventListener("click",()=>P("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>P("debt-modal")),(r=document.getElementById("debt-save"))==null||r.addEventListener("click",async()=>{var k,m,v;const l=parseFloat((k=document.getElementById("cicil-amount"))==null?void 0:k.value)||0;if(l<=0||l>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${p(e)}`,"warning");return}const c=(t.paidAmount||0)+l,o=Math.max(0,e-l),d=o===0?"paid":"partial",b=(t.debtPayments||[]).length+1,w=o===0?`Pelunasan (#${b}/LUNAS ✅)`:`Cicilan #${b}`,_=((v=(m=document.getElementById("cicil-note"))==null?void 0:m.value)==null?void 0:v.trim())||w,$=[...t.debtPayments||[],{date:new Date().toISOString(),amount:l,note:_}],S={...t,paidAmount:c,remainingDebt:o,paymentStatus:d,debtPayments:$};try{await Y(S),g.updateTransaction(t.id,{paidAmount:c,remainingDebt:o,paymentStatus:d,debtPayments:$}),P("debt-modal"),window.showToast(o===0?"🎉 Hutang LUNAS!":`Cicilan ${p(l)} dicatat`,"success")}catch(h){console.error("[debt]",h),window.showToast("Gagal simpan cicilan","error")}})},0)},ye=t=>{const e=ct(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const n=It(t);g.state.settings.printEnabled;const s=`
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
          <div style="margin-top:4px">${Nt(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${f(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${zt(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${pt(t)}</div>

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

    <div class="modal-footer" style="flex-wrap:wrap;gap:8px;justify-content:flex-end">
      <button class="btn btn--secondary" id="td-close-btn">✕ Tutup</button>
      <button class="btn btn--secondary" id="btn-save-png">🖼️ PNG / Share</button>
      <a class="btn btn--secondary" href="${n}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Bluetooth App
      </a>
      <button class="btn btn--success" id="btn-tx-print-direct" style="font-weight:700">
        🖨️ Cetak Struk (58mm)
      </button>
    </div>
  `;L(s,"tx-detail"),setTimeout(()=>{var a,i,r,l;(a=document.getElementById("td-x"))==null||a.addEventListener("click",()=>P("tx-detail")),(i=document.getElementById("td-close-btn"))==null||i.addEventListener("click",()=>P("tx-detail")),(r=document.getElementById("btn-tx-print-direct"))==null||r.addEventListener("click",()=>{Bt(t)}),(l=document.getElementById("btn-save-png"))==null||l.addEventListener("click",async()=>{var o;const c=document.getElementById("btn-save-png");c.textContent="⏳...",c.disabled=!0;try{const{default:d}=await V(async()=>{const{default:S}=await import("./vendor-pdf-j4-ZKoBl.js").then(k=>k.h);return{default:S}},[],import.meta.url),b=document.getElementById("receipt-capture"),w=await d(b,{backgroundColor:"#fff",scale:2,useCORS:!0,logging:!1}),_=await new Promise(S=>w.toBlob(S,"image/png")),$=`Struk-${t.invoiceNo||t.id}.png`;if((o=navigator.canShare)!=null&&o.call(navigator,{files:[new File([_],$,{type:"image/png"})]}))await navigator.share({title:`Struk ${t.invoiceNo}`,files:[new File([_],$,{type:"image/png"})]});else{const S=URL.createObjectURL(_);Object.assign(document.createElement("a"),{href:S,download:$}).click(),setTimeout(()=>URL.revokeObjectURL(S),2e3),window.showToast("PNG tersimpan!","success")}}catch(d){console.error("[png]",d),window.showToast("Gagal buat PNG","error")}finally{c.textContent="🖼️ PNG / Share",c.disabled=!1}})},0)};let st=null,J=null,W=null,D="semua";const fe=async()=>{st&&st(),st=g.on("transactions:change",t=>{gt(t)}),await mt()},mt=async()=>{const t=await X();g.setTransactions(t),gt(t)},gt=t=>{var h,x;const e=document.getElementById("view-reports");if(!e)return;const n=G(),s=Zt(),a=t.filter(y=>y.dateKey===n),i=a.reduce((y,u)=>y+u.total,0),r=a.length,l=t.filter(y=>{var u;return(u=y.dateKey)==null?void 0:u.startsWith(s)}),c=l.reduce((y,u)=>y+u.total,0),o=t.reduce((y,u)=>y+u.total,0),d=a.filter(y=>y.paymentMethod==="cash").reduce((y,u)=>y+u.total,0),b=a.filter(y=>y.paymentMethod==="transfer"&&y.paymentStatus==="transfer_confirmed").reduce((y,u)=>y+u.total,0),w=a.filter(y=>y.paymentMethod==="transfer"&&y.paymentStatus==="transfer_pending").reduce((y,u)=>y+u.total,0),_=a.filter(y=>y.paymentMethod==="debt").reduce((y,u)=>y+u.total,0),$=t.reduce((y,u)=>{for(const T of u.debtPayments||[])T.date&&T.date.split("T")[0]===n&&(y+=T.amount||0);return y},0),S=d+b+$,k=t.reduce((y,u)=>y+(u.remainingDebt||0),0);t.filter(y=>y.paymentStatus==="transfer_pending").reduce((y,u)=>y+u.total,0);const m=$e(a),v=ke(t);J&&(J.destroy(),J=null),W&&(W.destroy(),W=null),e.innerHTML=`
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
        <div class="stat-card__value" style="color:var(--blue-700)">${p(i)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${r} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${p(S)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${p($)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${p(k)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${p(c)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${l.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${p(o)}</div>
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
            <strong style="color:var(--color-success)">${p(d)}</strong>
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
            <strong style="color:#7c3aed">${p($)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${p(_)}</strong>
          </div>

          ${w>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${p(w)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${d+b+_+$>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
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
            ${he(t,D)}
          </tbody>
        </table>
      </div>
    </div>
  `,(h=document.getElementById("btn-refresh-reports"))==null||h.addEventListener("click",mt),(x=document.getElementById("btn-export-pdf-report"))==null||x.addEventListener("click",()=>we(t,n,s)),document.querySelectorAll("[data-rpt-filter]").forEach(y=>{y.addEventListener("click",()=>{D=y.dataset.rptFilter,gt(t)})}),requestAnimationFrame(()=>xe(v,d,b,_,$))},he=(t,e)=>{let n=[...t];e==="cash"&&(n=n.filter(a=>a.paymentMethod==="cash")),e==="transfer"&&(n=n.filter(a=>a.paymentMethod==="transfer")),e==="debt"&&(n=n.filter(a=>a.paymentMethod==="debt"));const s=n.sort((a,i)=>new Date(i.date)-new Date(a.date));return s.length?s.slice(0,50).map(a=>{const i=a.total||0;let r=0,l=0;a.paymentMethod==="cash"?r=i:a.paymentMethod==="transfer"?a.paymentStatus==="transfer_confirmed"?r=i:l=i:a.paymentMethod==="debt"&&(r=a.paidAmount||0,l=a.remainingDebt||0);const c=(a.items||[]).map(b=>{var w;return`${((w=b.product)==null?void 0:w.name)||"Item"} (${b.qty}x)`}).join(", "),o=a.paymentMethod==="debt"?l===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${p(l)}</span>`:a.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',d=a.paymentMethod==="cash"?"💵 Tunai":a.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${f(a.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${Z(new Date(a.date))}</td>
        <td><strong style="color:var(--text-primary)">${f(a.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${f(c)}">${f(c||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${p(i)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${p(r)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${l>0?p(l):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${d}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>'},xe=async(t,e,n,s,a)=>{const{Chart:i,registerables:r}=await V(async()=>{const{Chart:d,registerables:b}=await import("./vendor-chart-19k6OvwP.js");return{Chart:d,registerables:b}},[],import.meta.url);i.register(...r);const l=document.getElementById("chart-bar");l&&(J=new i(l,{type:"bar",data:{labels:t.map(d=>d.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(d=>d.total),backgroundColor:t.map((d,b)=>b===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>" "+p(d.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:d=>p(d),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const c=document.getElementById("chart-donut"),o=e+n+s+a;c&&o>0&&(W=new i(c,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,n,s,a],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` ${d.label}: ${p(d.raw)}`}}}}}))},we=async(t,e,n)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:a}=await V(async()=>{const{jsPDF:u}=await import("./vendor-pdf-j4-ZKoBl.js").then(T=>T.j);return{jsPDF:u}},[],import.meta.url),{default:i}=await V(async()=>{const{default:u}=await import("./jspdf.plugin.autotable-QkGqYg11.js").then(T=>T.j);return{default:u}},__vite__mapDeps([0,1,2]),import.meta.url),r=new a({orientation:"portrait",unit:"mm",format:"a4"}),l=g.state.settings,c=r.internal.pageSize.getWidth();r.setFontSize(16),r.setFont("helvetica","bold"),r.text(l.shopName||"Blue Mountain Refilling Station",c/2,16,{align:"center"}),r.setFontSize(10),r.setFont("helvetica","normal"),r.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",c/2,22,{align:"center"}),r.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,c/2,27,{align:"center"});const o=t.filter(u=>u.dateKey===e),d=o.reduce((u,T)=>u+T.total,0),b=t.filter(u=>{var T;return(T=u.dateKey)==null?void 0:T.startsWith(n)}).reduce((u,T)=>u+T.total,0),w=t.reduce((u,T)=>u+T.total,0),_=o.filter(u=>u.paymentMethod==="cash").reduce((u,T)=>u+T.total,0),$=o.filter(u=>u.paymentMethod==="transfer"&&u.paymentStatus==="transfer_confirmed").reduce((u,T)=>u+T.total,0),S=t.reduce((u,T)=>{for(const B of T.debtPayments||[])B.date&&B.date.split("T")[0]===e&&(u+=B.amount||0);return u},0),k=_+$+S,m=t.reduce((u,T)=>u+(T.remainingDebt||0),0);r.setFontSize(11),r.setFont("helvetica","bold"),r.text("1. Ringkasan Kinerja Keuangan",14,35);const v=[["Omzet Gross Hari Ini",p(d)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",p(k)],["Cicilan Piutang Terkumpul Hari Ini",p(S)],["Total Piutang Belum Lunas (Semua Pelanggan)",p(m)],["Omzet Bulan Ini",p(b)],["Total Omzet All-Time",p(w)],["Jumlah Transaksi Hari Ini",`${o.length} transaksi`]];i(r,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:v,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const h=r.lastAutoTable.finalY+10;r.setFontSize(11),r.setFont("helvetica","bold"),r.text("2. Rincian Riwayat Transaksi & Pelunasan",14,h);const x=[...t].sort((u,T)=>new Date(T.date)-new Date(u.date)).slice(0,80);i(r,{startY:h+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:x.map(u=>{let T=u.paymentMethod==="cash"?u.total:u.paymentMethod==="transfer"?u.paymentStatus==="transfer_confirmed"?u.total:0:u.paidAmount||0,B=u.paymentMethod==="debt"?u.remainingDebt||0:u.paymentStatus==="transfer_pending"?u.total:0;return[u.invoiceNo||"-",new Date(u.date).toLocaleDateString("id-ID"),u.customerName||"—",u.paymentMethod==="cash"?"Tunai":u.paymentMethod==="transfer"?"Transfer":"Hutang",p(u.total),p(T),B>0?p(B):"—",u.paymentMethod==="debt"?B===0?"Lunas":"Cicilan":u.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const y=r.internal.getNumberOfPages();for(let u=1;u<=y;u++)r.setPage(u),r.setFontSize(8),r.setFont("helvetica","normal"),r.text(`Hal ${u} dari ${y} — ${l.shopName||"Blue Mountain POS"}`,c/2,r.internal.pageSize.getHeight()-8,{align:"center"});r.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch(s){console.error("[pdf-report]",s),window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},ke=t=>{const e=[];for(let n=6;n>=0;n--){const s=new Date;s.setDate(s.getDate()-n);const a=s.toISOString().split("T")[0],i=t.filter(l=>l.dateKey===a).reduce((l,c)=>l+c.total,0),r=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);e.push({key:a,label:r,total:i})}return e},$e=t=>{var n;const e={};for(const s of t)for(const a of s.items||[]){if(!((n=a==null?void 0:a.product)!=null&&n.name))continue;const i=a.product.name;e[i]=(e[i]||0)+a.qty}return Object.entries(e).map(([s,a])=>({name:s,qty:a})).sort((s,a)=>a.qty-s.qty)},Te=async()=>{await _e(),await vt()},_e=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","printerPaper","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const n of t){const s=await lt(n);s!==null&&(e[n]=s)}g.updateSettings(e)},vt=async()=>{const t=document.getElementById("view-settings"),e=g.state.settings,n="3.0.0",s=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
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
      <div class="settings-section-header">🖨️ Thermal Printer &amp; Struk Kasir (58mm / 80mm)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Ukuran Kertas Thermal</div>
          <div class="settings-row__desc">Pilih ukuran roll kertas printer thermal Anda</div>
        </div>
        <select class="input" id="set-printerPaper" style="max-width:220px">
          <option value="58mm" ${e.printerPaper!=="80mm"?"selected":""}>58mm (Standar Mini Bluetooth Kasir)</option>
          <option value="80mm" ${e.printerPaper==="80mm"?"selected":""}>80mm (Thermal Besar / Desktop)</option>
        </select>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Uji Coba Cetak (Test Print)</div>
          <div class="settings-row__desc">Cetak struk dummy untuk cek kerapian format 58mm di printer Anda</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-test-print" style="font-weight:700">🧪 Test Cetak Struk</button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Setup Printer Bluetooth</div>
          <div class="settings-row__desc">Cara menghubungkan printer 58mm di HP Android, PC &amp; Laptop</div>
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
        ${s?'<span class="badge badge--green">✅ App Terinstall</span>':'<button class="btn btn--primary btn--sm" id="btn-install-pwa">📲 Install</button>'}
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Versi Aplikasi</div>
          <div class="settings-row__desc">Dukungan Otomatis via package.json &amp; Vite Engine</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800">v${f(n)} High-End</span>
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
  `,Se()},Se=()=>{var t,e,n,s,a,i,r,l,c;(t=document.getElementById("btn-export-backup"))==null||t.addEventListener("click",async()=>{const o=document.getElementById("btn-export-backup");o&&(o.textContent="⏳ Menyiapkan...",o.disabled=!0);try{const d=await Wt(),b=JSON.stringify(d,null,2),w=new Blob([b],{type:"application/json;charset=utf-8"}),_=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),S=`Backup-KASIR-${(d.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${_}.json`,k=URL.createObjectURL(w),m=document.createElement("a");m.href=k,m.download=S,document.body.appendChild(m),m.click(),document.body.removeChild(m),setTimeout(()=>URL.revokeObjectURL(k),5e3),window.showToast("✅ File backup berhasil diunduh!","success")}catch(d){console.error("[export-backup]",d),window.showToast("Gagal ekspor backup: "+(d.message||"Error"),"error")}finally{o&&(o.textContent="📥 Unduh Backup JSON",o.disabled=!1)}}),(e=document.getElementById("btn-trigger-import"))==null||e.addEventListener("click",()=>{var o;(o=document.getElementById("input-import-backup"))==null||o.click()}),(n=document.getElementById("input-import-backup"))==null||n.addEventListener("change",o=>{var w;const d=(w=o.target.files)==null?void 0:w[0];if(!d)return;const b=new FileReader;b.onload=async _=>{var $;try{const S=($=_.target)==null?void 0:$.result,k=JSON.parse(S);if(!k.data||!k.data.products&&!k.data.transactions){window.showToast("Format file backup tidak valid!","error");return}const m=(k.data.products||[]).length,v=(k.data.transactions||[]).length,h=(k.data.expenses||[]).length,x=k.exportedAt?new Date(k.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",y=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${f(k.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${x}
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:16px;font-weight:900;color:var(--blue-700)">${m}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:16px;font-weight:900;color:#16a34a">${v}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pengeluaran</div>
                <div style="font-size:16px;font-weight:900;color:#dc2626">${h}</div>
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
        `;L(y,"import-confirm-modal"),setTimeout(()=>{var u,T,B;(u=document.getElementById("imp-x"))==null||u.addEventListener("click",()=>P("import-confirm-modal")),(T=document.getElementById("imp-cancel"))==null||T.addEventListener("click",()=>P("import-confirm-modal")),(B=document.getElementById("imp-confirm"))==null||B.addEventListener("click",async()=>{var M;const z=((M=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:M.value)||"replace",A=document.getElementById("imp-confirm");A&&(A.textContent="⏳ Memulihkan...",A.disabled=!0);try{await Vt(k,z);const[I,H,C]=await Promise.all([N(),X(),_t()]);g.setProducts(I),g.setTransactions(H),g.setExpenses(C),P("import-confirm-modal"),window.showToast("🎉 Data berhasil dipulihkan & sinkron!","success"),setTimeout(()=>vt(),600)}catch(I){console.error("[import-backup]",I),window.showToast("Gagal memulihkan data: "+I.message,"error")}})},0)}catch(S){console.error("[parse-backup]",S),window.showToast("File JSON rusak atau tidak terbaca!","error")}},b.readAsText(d),o.target.value=""}),(s=document.getElementById("btn-save-settings"))==null||s.addEventListener("click",async()=>{const o=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","printerPaper","qrisNumber"],d={};for(const b of o){const w=document.getElementById(`set-${b}`);w&&(d[b]=b==="taxRate"?parseFloat(w.value)||0:w.value.trim(),await St(b,d[b]))}g.updateSettings(d),window.showToast("Pengaturan berhasil disimpan","success")}),(a=document.getElementById("btn-test-print"))==null||a.addEventListener("click",()=>{ae()}),(i=document.getElementById("btn-printer-guide"))==null||i.addEventListener("click",()=>{Ee()}),(r=document.getElementById("btn-install-pwa"))==null||r.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(l=document.getElementById("btn-clear-cache"))==null||l.addEventListener("click",async()=>{try{if("caches"in window){const o=await caches.keys();await Promise.all(o.map(d=>caches.delete(d)))}if("serviceWorker"in navigator){const o=await navigator.serviceWorker.getRegistrations();for(const d of o)await d.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch(o){console.error("[cache]",o),window.showToast("Gagal hapus cache","error")}}),(c=document.getElementById("btn-reset-all"))==null||c.addEventListener("click",async()=>{if(confirm(`⚠️ HAPUS SEMUA DATA?

Semua transaksi, pengeluaran, dan produk akan dihapus permanen.
Tindakan ini TIDAK dapat dibatalkan!`))try{await Jt(),window.showToast("Semua data berhasil dihapus. Reloading...","error"),setTimeout(()=>window.location.reload(),1500)}catch(d){console.error("[reset]",d),window.showToast("Gagal menghapus data","error")}})},Ee=()=>{L(`
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Setup Printer Thermal 58mm</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
        💡 <strong>Printer Thermal 58mm didukung 100% via 2 Cara:</strong>
      </div>

      <h4 style="color:var(--text-primary);margin-bottom:6px">Metode 1: Direct Web Print (Universal di Semua PC/Laptop/HP)</h4>
      <ol style="padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:12px">
        <li>Sambungkan printer thermal USB / Bluetooth ke PC/Laptop/HP Anda.</li>
        <li>Saat transaksi selesai, klik tombol hijau <strong>"🖨️ Cetak Struk (58mm)"</strong>.</li>
        <li>Pilih printer thermal Anda di jendela cetak browser $\rightarrow$ Klik <strong>Print</strong>. Struk akan tercetak rapi sesuai lebar roll 58mm.</li>
      </ol>

      <h4 style="color:var(--text-primary);margin-top:14px;margin-bottom:6px">Metode 2: Bluetooth Print App / RawBT (Khusus HP Android)</h4>
      <ol style="padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:12px">
        <li>Download <a href="https://play.google.com/store/apps/details?id=mate.bluetoothprint" target="_blank" rel="noopener noreferrer" style="color:var(--blue-300)">Bluetooth Print App</a> atau <strong>RawBT</strong> dari Play Store.</li>
        <li>Pair printer Bluetooth di menu Bluetooth HP Anda (PIN default: <code>0000</code> atau <code>1234</code>).</li>
        <li>Buka aplikasi printer tersebut $\rightarrow$ Pilih printer yang sudah di-pair.</li>
        <li>Di POS Kasir, klik tombol <strong>"📲 Bluetooth App"</strong> setelah transaksi selesai. Struk langsung tercetak otomatis tanpa popup dialog.</li>
      </ol>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti 👍</button>
    </div>
  `,"printer-guide"),setTimeout(()=>{var e,n;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>P("printer-guide")),(n=document.getElementById("pg-close2"))==null||n.addEventListener("click",()=>P("printer-guide"))},0)};let it=null,ot=null,F=!1;const Pe=async()=>{it&&it(),ot&&ot(),it=g.on("transactions:change",()=>{F||K()}),ot=g.on("expenses:change",()=>{F||K()}),await K()},K=async()=>{if(!F){F=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,n,s]=await Promise.all([g.state.transactions.length?Promise.resolve(g.state.transactions):X().then(m=>(g.setTransactions(m),m)),_t().then(m=>(g.setExpenses(m),m)),lt("modalAwal")]),a=parseFloat(s)||0;let i=0,r=0,l=0,c=0,o=0;for(const m of e)if(m.paymentMethod==="cash"&&(m.paymentStatus==="paid"||!m.paymentStatus)&&(i+=m.total),m.paymentMethod==="transfer"&&(m.paymentStatus==="transfer_confirmed"?r+=m.total:c+=m.total),m.paymentMethod==="debt"){for(const v of m.debtPayments||[])l+=v.amount;o+=m.remainingDebt||0}const d=i+r+l,b=n.reduce((m,v)=>m+(v.amount||0),0),w=a+d-b,_=c+o,$=Ie(e,n),S=Le(e,n),k=[...e.filter(m=>m.paymentStatus==="transfer_pending"),...e.filter(m=>(m.paymentMethod==="debt"||m.paymentStatus==="partial"||m.paymentStatus==="unpaid")&&(m.remainingDebt||0)>0)].sort((m,v)=>new Date(m.date)-new Date(v.date));t.innerHTML=`
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
          <div class="stat-card__value" style="color:#16a34a">${p(w)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${p(d)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${p(b)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${n.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${p(_)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${k.length} belum lunas</div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          ${O("💵 Tunai",i,"#16a34a")}
          ${O("📲 Transfer",r,"#2563eb")}
          ${O("📋 Cicilan Hutang",l,"#7c3aed")}
          ${O("⏳ Transfer Pending",c,"#d97706",!0)}
          ${O("🔴 Piutang Hutang",o,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding -->
      ${k.length>0?`
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">⚠️ Daftar Piutang &amp; Cicilan Berjalan (${k.length})</div>
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
              ${k.map(m=>{const v=m.total||0,h=m.paymentStatus==="transfer_pending"?v:m.remainingDebt||0,x=v-h,y=Math.min(100,Math.max(0,Math.round(x/v*100))),u=(m.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${f(m.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${f(m.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${p(v)}</td>
                <td style="color:#16a34a;font-weight:700">${p(x)}</td>
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
        ${n.length===0?`
          <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        `:`
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${[...n].sort((m,v)=>new Date(v.date)-new Date(m.date)).map(m=>`
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
              ${Be($,a)}
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
              ${S.slice(0,20).map(m=>`
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
    `,Ae(e)}finally{F=!1}}},O=(t,e,n,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${n}">${p(e)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Ie=(t,e)=>{const n={};for(const a of t){const i=a.dateKey;if(i){if(n[i]||(n[i]={masuk:0,keluar:0}),a.paymentMethod==="cash"&&(a.paymentStatus==="paid"||!a.paymentStatus)&&(n[i].masuk+=a.total),a.paymentMethod==="transfer"&&a.paymentStatus==="transfer_confirmed"){const r=a.confirmedAt?a.confirmedAt.split("T")[0]:i;n[r]||(n[r]={masuk:0,keluar:0}),n[r].masuk+=a.total}if(a.paymentMethod==="debt")for(const r of a.debtPayments||[]){const l=r.date?r.date.split("T")[0]:i;n[l]||(n[l]={masuk:0,keluar:0}),n[l].masuk+=r.amount}}}for(const a of e){const i=a.dateKey||(a.date?a.date.split("T")[0]:null);i&&(n[i]||(n[i]={masuk:0,keluar:0}),n[i].keluar+=a.amount||0)}const s=[];for(let a=29;a>=0;a--){const i=new Date;i.setDate(i.getDate()-a);const r=i.toISOString().split("T")[0];s.push({key:r,...n[r]||{masuk:0,keluar:0}})}return s},Be=(t,e)=>{let n=e;const s=t.filter(a=>a.masuk>0||a.keluar>0).map(a=>{const i=a.masuk-a.keluar;return n+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(a.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${a.masuk>0?p(a.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${a.keluar>0?p(a.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${p(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${p(n)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Le=(t,e)=>{const n=[];for(const s of t){const a=f(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")n.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${a})`,debit:s.total,credit:s.total,account:"Kas / Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?n.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${a})`,debit:s.total,credit:s.total,account:"Bank / Penjualan",type:"kas"}):n.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${a}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"Piutang Transfer",type:"piutang"});else if(s.paymentMethod==="debt"){n.push({date:s.date,desc:`Penjualan Piutang Usaha — ${s.invoiceNo} (${a}) [Total Tagihan: ${p(s.total)}]`,debit:s.total,credit:s.total,account:"Piutang / Penjualan",type:"piutang"});const i=s.debtPayments||[];let r=0;i.forEach((l,c)=>{r+=l.amount||0;const o=Math.max(0,s.total-r),d=o===0,b=c+1,w=d?`Pelunasan (#${b}/LUNAS ✅)`:`Cicilan #${b} (dari ${i.length})`,_=l.note?` — ${f(l.note)}`:"";n.push({date:l.date,desc:`${w} — ${s.invoiceNo} (${a})${_} [Bayar: ${p(l.amount)} | Sisa: ${p(o)}]`,debit:l.amount,credit:l.amount,account:d?"Kas / Piutang (LUNAS ✅)":"Kas / Piutang Usaha",type:"kas"})})}}for(const s of e)n.push({date:s.date,desc:`Beban ${f(s.category||"Operasional")} — ${f(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`Beban (${f(s.category||"Operasional")}) / Kas`,type:"beban"});return n.sort((s,a)=>new Date(a.date)-new Date(s.date))},Ae=t=>{var e,n,s,a,i;(e=document.getElementById("btn-refresh-finance"))==null||e.addEventListener("click",K),(n=document.getElementById("btn-set-modal-awal"))==null||n.addEventListener("click",()=>{const l=`
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
    `;L(l,"modal-awal"),setTimeout(()=>{var c,o,d;(c=document.getElementById("ma-x"))==null||c.addEventListener("click",()=>P("modal-awal")),(o=document.getElementById("ma-cancel"))==null||o.addEventListener("click",()=>P("modal-awal")),(d=document.getElementById("ma-save"))==null||d.addEventListener("click",async()=>{var w;const b=parseFloat((w=document.getElementById("modal-awal-input"))==null?void 0:w.value)||0;await St("modalAwal",b),g.updateSettings({modalAwal:b}),P("modal-awal"),window.showToast("Modal Awal disimpan!","success"),K()})},0)}),(s=document.getElementById("btn-add-expense"))==null||s.addEventListener("click",()=>{const l=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(c=>`<option value="${f(c)}">${f(c)}</option>`).join("")}
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
    `;L(l,"expense-modal"),setTimeout(()=>{var c,o,d;(c=document.getElementById("exp-x"))==null||c.addEventListener("click",()=>P("expense-modal")),(o=document.getElementById("exp-cancel"))==null||o.addEventListener("click",()=>P("expense-modal")),(d=document.getElementById("exp-save"))==null||d.addEventListener("click",async()=>{var k,m,v,h;const b=parseFloat((k=document.getElementById("exp-amount"))==null?void 0:k.value)||0,w=((m=document.getElementById("exp-category"))==null?void 0:m.value)||"Lainnya",_=((h=(v=document.getElementById("exp-note"))==null?void 0:v.value)==null?void 0:h.trim())||"";if(b<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const $=new Date().toISOString(),S={date:$,dateKey:$.split("T")[0],category:w,note:_,amount:b};try{const x=await qt(S);S.id=x,g.addExpense(S),P("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch(x){console.error("[expense]",x),window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(a=document.getElementById("expense-table"))==null||a.addEventListener("click",async r=>{const l=r.target.closest('[data-action="delete-expense"]');if(!l||!confirm("Hapus pengeluaran ini?"))return;const c=parseInt(l.dataset.id);try{await Ut(c),g.removeExpense(c),window.showToast("Pengeluaran dihapus","success")}catch(o){console.error("[expense]",o),window.showToast("Gagal hapus","error")}}),(i=document.getElementById("piutang-table"))==null||i.addEventListener("click",async r=>{const l=r.target.closest("[data-action]");if(!l)return;const c=parseInt(l.dataset.id),o=l.dataset.action,d=(g.state.transactions||t).find(b=>b.id===c);if(d){if(o==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${p(d.total)} dari ${f(d.customerName||"pelanggan")} sudah diterima?`))return;const b={...d,paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:new Date().toISOString()};try{await Y(b),g.updateTransaction(c,{paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:b.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(w){console.error("[confirm]",w),window.showToast("Gagal konfirmasi","error")}}if(o==="pay-debt"){const b=d.remainingDebt||0,w=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${p(d.total)}</div>
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
      `;L(w,"mini-cicil"),setTimeout(()=>{var _,$,S;(_=document.getElementById("mc-x"))==null||_.addEventListener("click",()=>P("mini-cicil")),($=document.getElementById("mc-cancel"))==null||$.addEventListener("click",()=>P("mini-cicil")),(S=document.getElementById("mc-save"))==null||S.addEventListener("click",async()=>{var z,A,M;const k=parseFloat((z=document.getElementById("mc-amount"))==null?void 0:z.value)||0;if(k<=0||k>b){window.showToast("Jumlah tidak valid","warning");return}const m=(d.paidAmount||0)+k,v=Math.max(0,b-k),h=v===0?"paid":"partial",x=(d.debtPayments||[]).length+1,y=v===0?`Pelunasan (#${x}/LUNAS ✅)`:`Cicilan #${x}`,u=((M=(A=document.getElementById("mc-note"))==null?void 0:A.value)==null?void 0:M.trim())||y,T=[...d.debtPayments||[],{date:new Date().toISOString(),amount:k,note:u}],B={...d,paidAmount:m,remainingDebt:v,paymentStatus:h,debtPayments:T};try{await Y(B),g.updateTransaction(c,{paidAmount:m,remainingDebt:v,paymentStatus:h,debtPayments:T}),P("mini-cicil"),window.showToast(v===0?"🎉 Hutang LUNAS!":`Cicilan #${x} (${p(k)}) dicatat`,"success")}catch(I){console.error("[cicil]",I),window.showToast("Gagal simpan cicilan","error")}})},0)}}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const bt=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine?(t.textContent="Sistem Online",t.classList.remove("status-badge--offline")):(t.textContent="Mode Offline",t.classList.add("status-badge--offline")))};window.addEventListener("online",bt);window.addEventListener("offline",bt);window.showToast=(t,e="info",n="")=>{const s=document.getElementById("toast-container");if(!s)return;const a={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${a[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${n?`<div class="toast__title">${n}</div>`:""}
      <div class="toast__msg">${t}</div>
    </div>
  `,s.appendChild(i);const r=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},l=setTimeout(r,3500);i.addEventListener("click",()=>{clearTimeout(l),r()})};const wt=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=Et()),e&&(e.textContent=Qt())},Me={pos:{init:se,refresh:de},products:{init:ce,refresh:tt},transactions:{init:ge,refresh:Mt},reports:{init:fe,refresh:mt},settings:{init:Te,refresh:vt},finance:{init:Pe,refresh:K}},kt=new Set,$t=async t=>{const e=Me[t];if(e){document.querySelectorAll(".dock-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)}),document.querySelectorAll(".view").forEach(n=>{n.classList.toggle("active",n.id===`view-${t}`)});try{kt.has(t)?await e.refresh():(await e.init(),kt.add(t)),sessionStorage.setItem("activeView",t)}catch(n){console.error(`[Navigation] Error initializing view "${t}":`,n);const s=document.getElementById(`view-${t}`);s&&!s.children.length&&(s.innerHTML=`
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
      `)}g.navigate(t)}},Ne=(t,e)=>{if(!t)return;const n=t.getBoundingClientRect(),s=Math.max(n.width,n.height),a=document.createElement("span");a.className="ripple-effect",a.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-n.left-s/2}px;top:${e.clientY-n.top-s/2}px`,t.style.position="relative",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0})},jt=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};g.on("settings:change",jt);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const ze=async()=>{try{await Yt(),await Gt()}catch(v){console.error("[DB] Failed to open database:",v),window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const v of t){const h=await lt(v);h!==null&&(v==="modalAwal"||v==="taxRate"?e[v]=parseFloat(h)||0:e[v]=h)}g.updateSettings(e),jt(g.state.settings),bt(),wt(),setInterval(wt,1e3);const n=document.querySelector(".dock"),s=[...document.querySelectorAll(".dock-item")],a=1.55,i=1.28,r=1.1,l=16,c=s.map(()=>1),o=s.map(()=>1);let d=null;const b=(v,h,x)=>v+(h-v)*x,w=.22,_=()=>{let v=!1;s.forEach((h,x)=>{c[x]=b(c[x],o[x],w),Math.abs(c[x]-o[x])>.001&&(v=!0);const y=c[x],u=(y-1)/(a-1)*l;h.style.transform=`translateY(${-u}px) scale(${y.toFixed(4)})`,h.style.zIndex=y>1.01?Math.round(y*10):""}),d=v?requestAnimationFrame(_):null},$=()=>{d||(d=requestAnimationFrame(_))},S=v=>{s.forEach((h,x)=>{const y=Math.abs(x-v);o[x]=y===0?a:y===1?i:y===2?r:1})},k=()=>s.forEach((v,h)=>o[h]=1);n==null||n.addEventListener("mousemove",v=>{let h=0,x=1/0;s.forEach((y,u)=>{const T=y.getBoundingClientRect(),B=Math.abs(v.clientX-(T.left+T.width/2));B<x&&(x=B,h=u)}),S(h),$()}),n==null||n.addEventListener("mouseleave",()=>{k(),$()}),s.forEach((v,h)=>{v.addEventListener("touchstart",()=>{S(h),$()},{passive:!0}),v.addEventListener("touchend",()=>{setTimeout(()=>{k(),$()},350)},{passive:!0})}),document.querySelectorAll(".dock-item").forEach(v=>{v.addEventListener("click",async h=>{const x=v.dataset.view;x&&(v.classList.add("bouncing"),v.addEventListener("animationend",()=>v.classList.remove("bouncing"),{once:!0}),Ne(v.querySelector(".dock-icon"),h),await $t(x))})});const m=sessionStorage.getItem("activeView")||"pos";await $t(m)};document.addEventListener("DOMContentLoaded",ze);
