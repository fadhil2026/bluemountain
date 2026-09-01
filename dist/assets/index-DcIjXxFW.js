const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-QkGqYg11.js","./_commonjsHelpers-C4iS2aBk.js","./vendor-pdf-j4-ZKoBl.js"])))=>i.map(i=>d[i]);
import{X as Wt}from"./vendor-db-2jmnBxhj.js";import{_ as st}from"./vendor-pdf-j4-ZKoBl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const B=new Wt("BlueMountainPOS");B.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});const q=()=>B.products.toArray(),zt=t=>B.products.add(t),Vt=t=>B.products.put(t),Xt=t=>B.products.delete(t),Yt=t=>B.transactions.add(t),rt=()=>B.transactions.toArray(),Qt=t=>B.transactions.delete(t),it=t=>B.transactions.put(t),Zt=t=>B.expenses.add(t),Ct=()=>B.expenses.toArray(),te=t=>B.expenses.delete(t),xt=async t=>{const e=await B.settings.get(t);return(e==null?void 0:e.value)??null},Dt=(t,e)=>B.settings.put({key:t,value:e}),ee=async()=>{await B.products.count()>0||await B.products.bulkAdd([{name:"Air Isi Ulang Galon",category:"Galon",price:5e3,unit:"galon",emoji:"🪣",stock:999},{name:"Antar Galon (dalam)",category:"Galon",price:3e3,unit:"kali",emoji:"🛵",stock:999},{name:"Antar Galon (luar)",category:"Galon",price:5e3,unit:"kali",emoji:"🚚",stock:999},{name:"Galon Baru (Aqua)",category:"Galon",price:5e4,unit:"buah",emoji:"💧",stock:50},{name:"Galon Baru (Standar)",category:"Galon",price:45e3,unit:"buah",emoji:"💦",stock:50},{name:"Air Botol 600ml",category:"Botol",price:3e3,unit:"botol",emoji:"🍶",stock:200},{name:"Air Botol 1500ml",category:"Botol",price:5e3,unit:"botol",emoji:"🥤",stock:100},{name:"Dispenser Galon",category:"Lainnya",price:25e4,unit:"unit",emoji:"⚗️",stock:10}])},ae=async()=>{await Promise.all([B.products.clear(),B.transactions.clear(),B.expenses.clear(),B.settings.clear()]),sessionStorage.clear(),localStorage.clear()},ne=async()=>{const[t,e,a,s]=await Promise.all([B.products.toArray(),B.transactions.toArray(),B.expenses.toArray(),B.settings.toArray()]),n=s.find(r=>r.key==="shopName"),i=(n==null?void 0:n.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"3.0.0",exportedAt:new Date().toISOString(),shopName:i,data:{products:t,transactions:e,expenses:a,settings:s},meta:{productCount:t.length,transactionCount:e.length,expenseCount:a.length,settingCount:s.length}}},se=async(t,e="replace")=>{if(!t||!t.data)throw new Error("Format file backup tidak valid atau rusak.");const{products:a=[],transactions:s=[],expenses:n=[],settings:i=[]}=t.data;return e==="replace"?(await Promise.all([B.products.clear(),B.transactions.clear(),B.expenses.clear(),B.settings.clear()]),a.length&&await B.products.bulkAdd(a),s.length&&await B.transactions.bulkAdd(s),n.length&&await B.expenses.bulkAdd(n),i.length&&await B.settings.bulkPut(i)):e==="merge"&&(a.length&&await B.products.bulkPut(a),s.length&&await B.transactions.bulkPut(s),n.length&&await B.expenses.bulkPut(n),i.length&&await B.settings.bulkPut(i)),{products:a.length,transactions:s.length,expenses:n.length,settings:i.length}},ie=()=>B.open(),G={},g={state:{cart:[],products:[],transactions:[],expenses:[],currentView:"pos",discount:0,customerName:"",settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return(G[t]??(G[t]=[])).push(e),()=>{G[t]=(G[t]??[]).filter(a=>a!==e)}},emit(t,e){(G[t]??[]).forEach(a=>a(e))},addToCart(t,e=1){const a=Math.max(1,parseInt(e)||1),s=this.state.cart.findIndex(n=>String(n.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=a:this.state.cart.push({product:t,qty:a}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const a=this.state.cart.find(s=>String(s.product.id)===String(t));a&&(a.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.emit("cart:change",this.state.cart)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>e.id!==t),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const a=this.state.transactions.findIndex(s=>s.id===t);a>=0&&(this.state.transactions[a]={...this.state.transactions[a],...e},this.emit("transactions:change",this.state.transactions))},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)}},oe=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),re=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),jt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),dt=(t=new Date)=>`${re(t)} ${jt(t)}`,et=()=>new Date().toISOString().split("T")[0],de=()=>{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`},p=t=>isNaN(t)?"Rp 0":"Rp "+Math.round(t).toLocaleString("id-ID"),h=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),wt=(t,e)=>{const a=t.items||[],s=[],n=(l,c=0,o=1,d=0)=>s.push({type:0,content:l,bold:c,align:o,format:d}),i=()=>n("--------------------------------",0,1,0),r=()=>n(" ",0,0,0);r(),n(e.shopName||"Blue Mountain Refilling Station",1,1,2),n(e.shopAddress||"",0,1,4),e.shopPhone&&n(`Telp: ${e.shopPhone}`,0,1,4),i(),n(`No: ${t.invoiceNo||"-"}`,0,0,0),n(`Tgl: ${dt(new Date(t.date))}`,0,0,0),t.customerName&&n(`Pelanggan: ${t.customerName}`,0,0,0),t.cashier&&n(`Kasir: ${t.cashier}`,0,0,0),i();for(const l of a){if(!(l!=null&&l.product))continue;const c=l.product.name,o=l.qty,d=p(l.product.price),v=p(l.product.price*o);n(`${c}`,0,0,0),n(`  ${o} x ${d} = ${v}`,0,0,0)}return i(),t.discount>0&&(n(`Subtotal: ${p(t.subtotal)}`,0,0,0),n(`Diskon:  -${p(t.discount)}`,0,0,0)),t.tax>0&&n(`Pajak:    ${p(t.tax)}`,0,0,0),n(`TOTAL: ${p(t.total)}`,1,0,3),t.paymentMethod==="cash"?(n(`Bayar:   ${p(t.paid)}`,0,0,0),n(`Kembali: ${p(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(n(`Transfer: ${p(t.total)}`,0,0,0),n(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(n(`DP Dibayar: ${p(t.paidAmount||0)}`,0,0,0),n(`Sisa Hutang: ${p(t.remainingDebt||0)}`,1,0,0)),i(),r(),n("Terima kasih sudah berbelanja!",1,1,0),n(e.shopName||"Blue Mountain Refilling Station",0,1,4),r(),r(),s},le=""+new URL("logo-x8cg0OuI.png",import.meta.url).href,Rt=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},ce=t=>{const e=wt(t,g.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Rt()},Kt=t=>(ce(t),`my.bluetoothprint.scheme://${(g.state.settings||{}).printerUrl||Rt()}`),kt=(t,e="58mm")=>{const a=g.state.settings||{},s=t.items||[],n=(a.printerPaper||e)==="58mm",i=n?"220px":"300px",r=(d,v=!1,y="left",w="11px")=>`<div style="text-align:${y};font-weight:${v?"700":"400"};font-size:${w};line-height:1.35;word-break:break-word">${d}</div>`,l=()=>'<div style="border-top:1px dashed #444;margin:4px 0"></div>',c=()=>'<div style="height:4px"></div>';let o=`<div class="thermal-receipt" style="width:${i};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:4px">`;o+=`<div style="text-align:center;margin-bottom:6px;margin-top:2px">
    <img src="${le}"
         alt="Logo"
         style="width:${n?"70px":"85px"};height:${n?"70px":"85px"};object-fit:contain;display:inline-block">
  </div>`,o+=r(a.shopName||"Blue Mountain Refilling Station",!0,"center",n?"12px":"14px"),a.shopAddress&&(o+=r(a.shopAddress,!1,"center","10px")),a.shopPhone&&(o+=r(`Telp: ${a.shopPhone}`,!1,"center","10px")),o+=l(),o+=r(`No  : ${t.invoiceNo||"-"}`),o+=r(`Tgl : ${dt(new Date(t.date||Date.now()))}`),t.customerName&&(o+=r(`Cust: ${t.customerName}`)),t.cashier&&(o+=r(`Kasir: ${t.cashier}`)),o+=l();for(const d of s){if(!(d!=null&&d.product))continue;const v=d.product.name,y=d.qty,w=d.product.price,$=w*y;o+=r(v,!0),o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3">
      <span>&nbsp;&nbsp;${y} x ${p(w)}</span>
      <span>${p($)}</span>
    </div>`}return o+=l(),t.discount>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Subtotal</span><span>${p(t.subtotal||t.total+t.discount)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Diskon</span><span>-${p(t.discount)}</span>
    </div>`),t.tax>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Pajak</span><span>${p(t.tax)}</span>
    </div>`),o+=`<div style="display:flex;justify-content:space-between;font-size:${n?"12px":"13px"};font-weight:900;margin-top:2px">
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
    </div>`),o+=l(),o+=c(),o+=r("Terima kasih atas kunjungan Anda!",!0,"center","10px"),o+=r(a.shopName||"Blue Mountain Refilling Station",!1,"center","9px"),o+=c(),o+="</div>",o},$t=t=>{const a=(g.state.settings||{}).printerPaper||"58mm",s=kt(t,a),n=document.createElement("iframe");n.style.position="fixed",n.style.right="0",n.style.bottom="0",n.style.width="0",n.style.height="0",n.style.border="0",document.body.appendChild(n);const i=n.contentWindow.document;i.open(),i.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Struk-${t.invoiceNo||"KASIR"}</title>
  <style>
    @page {
      size: ${a==="58mm"?"58mm auto":"80mm auto"};
      margin: 0mm;
    }
    @media print {
      html, body {
        width: ${a==="58mm"?"58mm":"80mm"};
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
</html>`),i.close(),setTimeout(()=>{try{n.contentWindow.focus(),n.contentWindow.print()}catch(r){console.warn("[print-frame] Direct iframe print failed, falling back to popup",r);const l=window.open("","_blank","width=350,height=600");l&&(l.document.write(i.documentElement.outerHTML),l.document.close(),l.focus(),l.print(),setTimeout(()=>l.close(),1e3))}finally{setTimeout(()=>n.remove(),1500)}},350)},pe=()=>{const t={invoiceNo:"TEST-58MM-"+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:g.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};$t(t)},pt=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),a=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${a}${s}`},H=(t,e="generic-modal")=>{A();const a=document.createElement("div");a.className="modal-overlay",a.id=`overlay-${e}`,a.innerHTML=`<div class="modal" id="${e}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(a),a.addEventListener("click",n=>{n.target===a&&A(e)});const s=a.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return s.length&&s[0].focus(),a},A=(t=null)=>{const e=t?`#overlay-${t}`:".modal-overlay";(t?[document.querySelector(e)].filter(Boolean):[...document.querySelectorAll(".modal-overlay")]).forEach(s=>{var n;s&&((n=s.querySelector(".modal"))==null||n.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>s.remove(),180))})},ue=t=>{const a=(n=>Math.ceil(n/5e3)*5e3)(t),s=[a,a+5e3,a+1e4,a+2e4,a+5e4,a+1e5];return[...new Set(s.filter(n=>n>=t))].slice(0,4)},ut=(t="cash")=>{const e=g.total,a=g.subtotal,s=g.state.discount||0,n=g.tax,i=g.state.settings||{},r=h(i.bankName||"BCA"),l=h(i.bankNumber||"—"),c=h(i.bankHolder||i.shopName||"Blue Mountain"),o=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran Transaksi</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Tagihan</div>
        <div class="amount">${p(e)}</div>
        ${s>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${p(s)}</div>`:""}
        ${n>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${p(n)}</div>`:""}
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
          ${ue(e).map(d=>`<button class="quick-amt-btn" data-amount="${d}">${p(d)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px;padding:10px 14px;background:var(--color-success-bg);border:1.5px solid var(--color-success-border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="font-weight:700;color:var(--color-success)">💰 Kembalian</span>
          <span class="value" id="change-amount" style="font-size:18px;font-weight:900;color:var(--color-success)">${p(0)}</span>
        </div>
      </div>

      <!-- Transfer Section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info" style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border-subtle)">
          <div style="font-size:32px;margin-bottom:4px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Silakan transfer nominal berikut:</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-600);margin:6px 0">${p(e)}</div>
          <div style="margin-top:8px;padding:10px;background:#fff;border-radius:8px;border:1.5px dashed var(--blue-300);text-align:left">
            <div style="font-size:12px;color:var(--text-secondary)">Bank: <strong>${r}</strong></div>
            <div style="font-size:14px;font-weight:800;color:var(--text-primary);margin:2px 0">
              No. Rek: <span id="trans-acc-num">${l}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary)">Atas Nama: <strong>${c}</strong></div>
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
            value="${h(g.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${e}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total Tagihan</span><strong>${p(e)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>DP Dibayar Sekarang</span><strong id="debt-paid-display" style="color:var(--color-success)">${p(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang Berjalan</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger);font-size:16px">${p(e)}</strong>
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
  `;H(o,"payment-modal"),setTimeout(()=>{var P,k,m,T;(P=document.getElementById("pay-close-btn"))==null||P.addEventListener("click",()=>A("payment-modal")),(k=document.getElementById("pay-cancel-btn"))==null||k.addEventListener("click",()=>A("payment-modal")),document.querySelectorAll(".pay-tab").forEach(I=>{I.addEventListener("click",()=>{document.querySelectorAll(".pay-tab").forEach(f=>f.classList.remove("active")),I.classList.add("active");const S=I.dataset.method;document.getElementById("pay-cash-section").style.display=S==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=S==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=S==="debt"?"":"none"})});const d=document.getElementById("cash-received"),v=document.getElementById("change-amount"),y=()=>{const I=parseFloat(d==null?void 0:d.value)||e,S=Math.max(0,I-e);v&&(v.textContent=p(S))};d==null||d.addEventListener("input",y),y(),(m=document.getElementById("quick-amounts"))==null||m.addEventListener("click",I=>{const S=I.target.closest(".quick-amt-btn");S&&d&&(d.value=S.dataset.amount,y())});const w=document.getElementById("debt-paid-now"),$=()=>{const I=Math.min(parseFloat(w==null?void 0:w.value)||0,e),S=e-I,f=document.getElementById("debt-paid-display"),u=document.getElementById("debt-remaining-display");f&&(f.textContent=p(I)),u&&(u.textContent=p(S))};w==null||w.addEventListener("input",$),(T=document.getElementById("pay-confirm-btn"))==null||T.addEventListener("click",async()=>{var C,F,z,j,R,U;const I=document.querySelector(".pay-tab.active"),S=(I==null?void 0:I.dataset.method)||"cash",f=document.getElementById("pay-confirm-btn");if(S==="cash"&&(parseFloat(d==null?void 0:d.value)||e)<e){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),d==null||d.focus();return}if(S==="debt"&&!((F=(C=document.getElementById("debt-customer"))==null?void 0:C.value)==null?void 0:F.trim())){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(z=document.getElementById("debt-customer"))==null||z.focus();return}f&&(f.disabled=!0,f.textContent="⏳ Menyimpan...");const u=new Date().toISOString();let x;if(S==="cash"){const b=parseFloat(d==null?void 0:d.value)||e,E=Math.max(0,b-e);x={invoiceNo:pt(),date:u,dateKey:et(),items:g.state.cart.map(_=>({product:{..._.product},qty:_.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:b,change:E,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Kasir"}}else if(S==="transfer")x={invoiceNo:pt(),date:u,dateKey:et(),items:g.state.cart.map(b=>({product:{...b.product},qty:b.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:e,change:0,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Kasir"};else{const b=Math.min(parseFloat((j=document.getElementById("debt-paid-now"))==null?void 0:j.value)||0,e),E=e-b,_=E===0?"paid":b>0?"partial":"unpaid",L=((U=(R=document.getElementById("debt-customer"))==null?void 0:R.value)==null?void 0:U.trim())||g.state.customerName||"Pelanggan";x={invoiceNo:pt(),date:u,dateKey:et(),items:g.state.cart.map(M=>({product:{...M.product},qty:M.qty})),subtotal:a,discount:s,tax:n,total:e,paymentMethod:"debt",paymentStatus:_,paid:b,change:0,paidAmount:b,remainingDebt:E,debtPayments:b>0?[{date:u,amount:b,note:"DP / Uang muka awal"}]:[],customerName:L,cashier:g.state.settings.cashierName||"Kasir"}}try{const b=await Yt(x);x.id=b,g.addTransaction(x),A("payment-modal"),g.clearCart(),me(x)}catch(b){console.error("[payment-save]",b),window.showToast("Gagal menyimpan transaksi: "+(b.message||"Error"),"error"),f&&(f.disabled=!1,f.textContent="✅ Proses Pembayaran")}})},0)},me=t=>{var r,l,c,o;const e=wt(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const a=Kt(t),s=kt(t),n=document.createElement("div");n.className="success-overlay",n.id="success-overlay",n.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${h(t.invoiceNo)} &bull; ${p(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${p(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:var(--blue-600);font-size:13px;margin-top:4px">📲 Transfer Terkonfirmasi ✅</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa Piutang: ${p(t.remainingDebt)}</p>`:""}
    </div>

    <!-- Print & Navigation Actions -->
    <div class="success-actions" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:380px;margin-top:14px">
      <button class="btn btn--success" id="btn-print-direct" style="flex:1;min-width:140px;font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        🖨️ Cetak Struk (58mm)
      </button>
      <a class="btn btn--secondary" href="${a}" id="btn-print-bluetooth" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
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
  `,document.body.appendChild(n);const i=()=>{n.classList.add("closing"),setTimeout(()=>n.remove(),180)};(r=document.getElementById("success-close-btn"))==null||r.addEventListener("click",i),(l=document.getElementById("btn-close-overlay"))==null||l.addEventListener("click",i),(c=document.getElementById("btn-print-direct"))==null||c.addEventListener("click",()=>{$t(t)}),(o=document.getElementById("btn-new-tx"))==null||o.addEventListener("click",()=>{i(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{n.parentNode&&i()},15e3)};let yt="",ot="Semua",tt=null,Bt=[];const ge=async()=>{const t=await q();g.setProducts(t),Ot(),tt&&tt.abort(),tt=new AbortController,Bt.forEach(e=>e()),Bt=[g.on("cart:change",Ht),g.on("products:change",()=>Z())],fe(tt.signal)},Ot=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
  `,Tt(),Z(),Ht()},ve=()=>["Semua",...new Set(g.state.products.map(t=>t.category))],Tt=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=ve().map(e=>`
    <button class="cat-pill ${e===ot?"active":""}"
      data-cat="${h(e)}">${h(e)}</button>
  `).join(""))},Z=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=g.state.products;if(ot!=="Semua"&&(e=e.filter(a=>a.category===ot)),yt){const a=yt.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a))}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(a=>`
    <div class="product-card" data-id="${a.id}" role="button" tabindex="0"
      aria-label="${h(a.name)} — ${p(a.price)}">
      <div class="product-card__emoji">${a.emoji||"📦"}</div>
      <div class="product-card__name">${h(a.name)}</div>
      <div class="product-card__price">${p(a.price)}</div>
      <div class="product-card__unit">per ${h(a.unit)}</div>
    </div>
  `).join(""),t.querySelectorAll(".product-card").forEach(a=>{const s=()=>{const n=a.dataset.id,i=g.state.products.find(r=>String(r.id)===String(n));i&&(g.addToCart(i),a.style.transform="scale(0.94)",setTimeout(()=>{a.style.transform=""},120))};a.addEventListener("click",s),a.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),s())})})},Ht=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),a=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),n=document.getElementById("tax-row"),i=document.getElementById("customer-name"),r=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=g.state.customerName||""),r&&!r.matches(":focus")&&(r.value=g.state.discount||""),!t)return;const l=g.state.cart;if(e){const c=e.textContent;e.textContent=g.cartCount,c!==String(g.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(a&&(a.textContent=p(g.total)),n&&s&&(g.tax>0?(n.style.display="flex",s.textContent=p(g.tax)):n.style.display="none"),!l.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=l.map(c=>`
    <div class="cart-item" data-pid="${c.product.id}">
      <div class="cart-item__info">
        <div class="cart-item__name">${c.product.emoji||""} ${h(c.product.name)}</div>
        <div class="cart-item__price">${p(c.product.price)} / ${h(c.product.unit)}</div>
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
  `).join(""),t.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",()=>{const o=c.dataset.pid,d=c.dataset.action,v=g.state.cart.find(y=>String(y.product.id)===String(o));v&&(d==="inc"?g.setQty(v.product.id,v.qty+1):d==="dec"?g.setQty(v.product.id,v.qty-1):d==="remove"&&g.removeFromCart(v.product.id))})})},be=()=>{const t=`
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
  `;H(t,"manual-item-modal"),setTimeout(()=>{var e,a,s,n;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>A("manual-item-modal")),(a=document.getElementById("mi-cancel"))==null||a.addEventListener("click",()=>A("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(r=>{r.style.borderColor="var(--border-subtle)",r.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(n=document.getElementById("mi-save"))==null||n.addEventListener("click",async()=>{var w,$,P,k,m,T,I;const i=(w=document.getElementById("mi-name"))==null?void 0:w.value.trim(),r=($=document.getElementById("mi-price"))==null?void 0:$.value,l=parseFloat(r)||0,c=Math.max(1,parseInt((P=document.getElementById("mi-qty"))==null?void 0:P.value)||1),o=((k=document.getElementById("mi-unit"))==null?void 0:k.value.trim())||"pcs",d=((m=document.getElementById("mi-category"))==null?void 0:m.value)||"Lainnya",v=((T=document.getElementById("mi-emoji"))==null?void 0:T.value)||"🏷️",y=(I=document.getElementById("mi-save-catalog"))==null?void 0:I.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(r===""||l<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(y){const S=await zt({name:i,price:l,unit:o,category:d,emoji:v,stock:999}),f=await q();g.setProducts(f);const u=f.find(x=>x.id===S)||{id:S,name:i,price:l,unit:o,category:d,emoji:v};g.addToCart(u,c),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const S={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:i,price:l,unit:o,category:d,emoji:v};g.addToCart(S,c),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}A("manual-item-modal")}catch(S){window.showToast("Gagal menambahkan item manual!","error"),console.error("[manual-item]",S)}})},0)},fe=t=>{document.addEventListener("click",e=>{const a=e.target.closest(".cat-pill");if(a){ot=a.dataset.cat,Tt(),Z();return}if(e.target.closest("#btn-manual-item")){be();return}if(e.target.closest("#btn-pay-cash")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}ut("cash")}if(e.target.closest("#btn-pay-transfer")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}ut("transfer")}if(e.target.closest("#btn-pay-debt")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}ut("debt")}e.target.closest("#btn-clear-cart")&&g.state.cart.length&&(g.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{e.target.id==="pos-search"&&(yt=e.target.value.trim(),Z()),e.target.id==="discount-input"&&g.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"&&g.setCustomerName(e.target.value)},{signal:t})},ye=async()=>{const t=document.getElementById("view-pos");(!t||!t.querySelector(".pos-layout"))&&Ot();const e=await q();g.setProducts(e),Z(),Tt()},Lt=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],he=["Galon","Botol","Layanan","Lainnya"],xe=async()=>{await lt()},lt=async()=>{const t=document.getElementById("view-products"),e=await q();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(a=>we(a)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,ke()},we=t=>`
  <div class="product-manage-card" data-id="${t.id}">
    <div class="product-manage-card__header">
      <span class="product-emoji-large">${t.emoji||"📦"}</span>
      <div class="product-manage-card__info">
        <div class="product-manage-card__name">${h(t.name)}</div>
        <div class="product-manage-card__cat">
          <span class="badge badge--blue">${h(t.category)}</span>
        </div>
      </div>
    </div>
    <div class="product-manage-card__price">${p(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${h(t.unit)}</span></div>
    <div class="product-manage-card__actions">
      <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
      <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
    </div>
  </div>
`,ke=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",()=>At()),t==null||t.addEventListener("click",async a=>{const s=a.target.closest('[data-action="edit"]'),n=a.target.closest('[data-action="delete"]');if(s){const i=parseInt(s.dataset.id),l=(await q()).find(c=>c.id===i);l&&At(l)}if(n){const i=parseInt(n.dataset.id);$e(i)}})},At=(t=null)=>{const e=!!t,a=`
    <div class="modal-header">
      <span class="modal-title">${e?"✏️ Edit Produk":"➕ Tambah Produk"}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <label class="input-label">Nama Produk</label>
        <input type="text" class="input" id="pf-name"
          value="${h((t==null?void 0:t.name)||"")}"
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
            value="${h((t==null?void 0:t.unit)||"pcs")}"
            placeholder="galon, botol, pcs..."
            maxlength="20">
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Kategori</label>
        <select class="input" id="pf-category">
          ${he.map(s=>`<option value="${h(s)}" ${(t==null?void 0:t.category)===s?"selected":""}>${h(s)}</option>`).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
          ${Lt.map(s=>`
            <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===s?"emoji-pick--active":""}"
              data-emoji="${s}"
              style="font-size:24px;width:40px;height:40px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===s?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${s}</button>
          `).join("")}
        </div>
        <input type="hidden" id="pf-emoji" value="${h((t==null?void 0:t.emoji)||Lt[0])}">
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
  `;H(a,"product-form"),setTimeout(()=>{var s,n,i;(s=document.getElementById("pf-close"))==null||s.addEventListener("click",()=>A("product-form")),(n=document.getElementById("pf-cancel"))==null||n.addEventListener("click",()=>A("product-form")),document.querySelectorAll(".emoji-pick").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(l=>{l.style.borderColor="var(--border-subtle)",l.classList.remove("emoji-pick--active")}),r.style.borderColor="var(--blue-400)",r.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=r.dataset.emoji})}),(i=document.getElementById("pf-save"))==null||i.addEventListener("click",async()=>{var y,w,$,P,k,m;const r=(y=document.getElementById("pf-name"))==null?void 0:y.value.trim(),l=parseFloat((w=document.getElementById("pf-price"))==null?void 0:w.value)||0,c=(($=document.getElementById("pf-unit"))==null?void 0:$.value.trim())||"pcs",o=((P=document.getElementById("pf-category"))==null?void 0:P.value)||"Lainnya",d=((k=document.getElementById("pf-emoji"))==null?void 0:k.value)||"📦",v=parseInt((m=document.getElementById("pf-stock"))==null?void 0:m.value)||0;if(!r){window.showToast("Nama produk wajib diisi!","warning");return}if(l<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{e?(await Vt({...t,name:r,price:l,unit:c,category:o,emoji:d,stock:v}),window.showToast("Produk berhasil diperbarui","success")):(await zt({name:r,price:l,unit:c,category:o,emoji:d,stock:v}),window.showToast("Produk berhasil ditambahkan","success")),A("product-form");const T=await q();g.setProducts(T),await lt()}catch(T){window.showToast("Gagal menyimpan produk!","error"),console.error("[products]",T)}})},0)},$e=t=>{H(`
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
  `,"delete-confirm"),setTimeout(()=>{var a,s,n;(a=document.getElementById("dc-close"))==null||a.addEventListener("click",()=>A("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>A("delete-confirm")),(n=document.getElementById("dc-confirm"))==null||n.addEventListener("click",async()=>{try{await Xt(t);const i=await q();g.setProducts(i),A("delete-confirm"),await lt(),window.showToast("Produk dihapus","success")}catch(i){window.showToast("Gagal menghapus produk","error"),console.error("[products]",i)}})},0)};let mt=null;const Te=async()=>{mt&&mt(),mt=g.on("transactions:change",t=>{Gt(t)}),await Ft()},Ft=async()=>{const t=await rt();g.setTransactions(t),Gt(t)},qt=t=>{const e=t.paymentMethod,a=t.paymentStatus;return e==="transfer"&&a==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&a==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':a==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':a==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},Ut=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":h(t.paymentMethod)||"—",W=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Gt=t=>{const e=document.getElementById("view-transactions");if(!e)return;const a=[...t].sort((c,o)=>new Date(o.date)-new Date(c.date)),s=new Date().toISOString().split("T")[0],i=t.filter(c=>c.dateKey===s).reduce((c,o)=>o.paymentStatus==="paid"&&o.paymentMethod==="cash"||o.paymentStatus==="transfer_confirmed"?c+o.total:o.paymentMethod==="debt"?c+(o.paidAmount||0):c,0),r=t.reduce((c,o)=>c+(o.remainingDebt||0),0),l=t.filter(c=>c.paymentStatus==="transfer_pending").reduce((c,o)=>c+o.total,0);e.innerHTML=`
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

    ${a.length===0?`
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
              ${ht(a)}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `,Se(t,a)},ht=t=>t.length?t.map(e=>{var a;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${h(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${dt(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${h(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((a=e.items)==null?void 0:a.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${p(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${p(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${Ut(e)}</span></td>
      <td>${qt(e)}</td>
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
            ${W(e)?"":'disabled title="Tidak bisa hapus transaksi yang belum lunas"'}
            style="background:${W(e)?"var(--color-danger-bg)":"#f3f4f6"};border:1.5px solid ${W(e)?"var(--color-danger-border)":"#d1d5db"};color:${W(e)?"var(--color-danger)":"#9ca3af"};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${W(e)?"pointer":"not-allowed"}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk filter ini</td></tr>',Se=(t,e)=>{var a,s,n;(a=document.getElementById("tx-filter-date"))==null||a.addEventListener("change",i=>{const r=i.target.value,l=r?[...t].filter(o=>o.dateKey===r).sort((o,d)=>new Date(d.date)-new Date(o.date)):e,c=document.getElementById("tx-tbody");c&&(c.innerHTML=ht(l))}),(s=document.getElementById("tx-clear-filter"))==null||s.addEventListener("click",()=>{const i=document.getElementById("tx-tbody"),r=document.getElementById("tx-filter-date");i&&(i.innerHTML=ht(e)),r&&(r.value="")}),(n=document.getElementById("tx-table"))==null||n.addEventListener("click",async i=>{const r=i.target.closest("[data-action]");if(!r)return;const l=parseInt(r.dataset.id),c=r.dataset.action,o=t.find(d=>d.id===l);if(c==="detail"){o&&Ee(o);return}if(c==="confirm-transfer"){if(!o||!confirm(`Konfirmasi transfer ${p(o.total)} dari ${h(o.customerName||"pelanggan")} sudah diterima?`))return;try{const d={...o,paymentStatus:"transfer_confirmed",paidAmount:o.total,confirmedAt:new Date().toISOString()};await it(d),g.updateTransaction(l,{paymentStatus:"transfer_confirmed",paidAmount:o.total,confirmedAt:d.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(d){console.error("[tx]",d),window.showToast("Gagal konfirmasi","error")}return}if(c==="pay-debt"){o&&_e(o);return}if(c==="delete"){if(!o)return;if(!W(o)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${h(o.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{await Qt(l),g.removeTransaction(l),window.showToast("Transaksi dihapus","success")}catch(d){console.error("[tx]",d),window.showToast("Gagal menghapus","error")}}})},_e=t=>{var s;const e=t.remainingDebt||0,a=`
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${h(t.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${h(t.customerName||"—")}</div>
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
        ${t.debtPayments.map(n=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(n.date).toLocaleDateString("id-ID")} — ${h(n.note||"-")}</span>
            <strong style="color:#16a34a">+${p(n.amount)}</strong>
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
  `;H(a,"debt-modal"),setTimeout(()=>{var n,i,r;(n=document.getElementById("debt-x"))==null||n.addEventListener("click",()=>A("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>A("debt-modal")),(r=document.getElementById("debt-save"))==null||r.addEventListener("click",async()=>{var k,m,T;const l=parseFloat((k=document.getElementById("cicil-amount"))==null?void 0:k.value)||0;if(l<=0||l>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${p(e)}`,"warning");return}const c=(t.paidAmount||0)+l,o=Math.max(0,e-l),d=o===0?"paid":"partial",v=(t.debtPayments||[]).length+1,y=o===0?`Pelunasan (#${v}/LUNAS ✅)`:`Cicilan #${v}`,w=((T=(m=document.getElementById("cicil-note"))==null?void 0:m.value)==null?void 0:T.trim())||y,$=[...t.debtPayments||[],{date:new Date().toISOString(),amount:l,note:w}],P={...t,paidAmount:c,remainingDebt:o,paymentStatus:d,debtPayments:$};try{await it(P),g.updateTransaction(t.id,{paidAmount:c,remainingDebt:o,paymentStatus:d,debtPayments:$}),A("debt-modal"),window.showToast(o===0?"🎉 Hutang LUNAS!":`Cicilan ${p(l)} dicatat`,"success")}catch(I){console.error("[debt]",I),window.showToast("Gagal simpan cicilan","error")}})},0)},Ee=t=>{const e=wt(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const a=Kt(t);g.state.settings.printEnabled;const s=`
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${h(t.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${qt(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${h(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${Ut(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${kt(t)}</div>

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
      <a class="btn btn--secondary" href="${a}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Bluetooth App
      </a>
      <button class="btn btn--success" id="btn-tx-print-direct" style="font-weight:700">
        🖨️ Cetak Struk (58mm)
      </button>
    </div>
  `;H(s,"tx-detail"),setTimeout(()=>{var n,i,r,l;(n=document.getElementById("td-x"))==null||n.addEventListener("click",()=>A("tx-detail")),(i=document.getElementById("td-close-btn"))==null||i.addEventListener("click",()=>A("tx-detail")),(r=document.getElementById("btn-tx-print-direct"))==null||r.addEventListener("click",()=>{$t(t)}),(l=document.getElementById("btn-save-png"))==null||l.addEventListener("click",async()=>{var o;const c=document.getElementById("btn-save-png");c.textContent="⏳...",c.disabled=!0;try{const{default:d}=await st(async()=>{const{default:P}=await import("./vendor-pdf-j4-ZKoBl.js").then(k=>k.h);return{default:P}},[],import.meta.url),v=document.getElementById("receipt-capture"),y=await d(v,{backgroundColor:"#fff",scale:2,useCORS:!0,logging:!1}),w=await new Promise(P=>y.toBlob(P,"image/png")),$=`Struk-${t.invoiceNo||t.id}.png`;if((o=navigator.canShare)!=null&&o.call(navigator,{files:[new File([w],$,{type:"image/png"})]}))await navigator.share({title:`Struk ${t.invoiceNo}`,files:[new File([w],$,{type:"image/png"})]});else{const P=URL.createObjectURL(w);Object.assign(document.createElement("a"),{href:P,download:$}).click(),setTimeout(()=>URL.revokeObjectURL(P),2e3),window.showToast("PNG tersimpan!","success")}}catch(d){console.error("[png]",d),window.showToast("Gagal buat PNG","error")}finally{c.textContent="🖼️ PNG / Share",c.disabled=!1}})},0)};let gt=null,at=null,nt=null,J="semua";const Pe=async()=>{gt&&gt(),gt=g.on("transactions:change",t=>{_t(t)}),await St()},St=async()=>{const t=await rt();g.setTransactions(t),_t(t)},_t=t=>{var I,S;const e=document.getElementById("view-reports");if(!e)return;const a=et(),s=de(),n=t.filter(f=>f.dateKey===a),i=n.reduce((f,u)=>f+u.total,0),r=n.length,l=t.filter(f=>{var u;return(u=f.dateKey)==null?void 0:u.startsWith(s)}),c=l.reduce((f,u)=>f+u.total,0),o=t.reduce((f,u)=>f+u.total,0),d=n.filter(f=>f.paymentMethod==="cash").reduce((f,u)=>f+u.total,0),v=n.filter(f=>f.paymentMethod==="transfer"&&f.paymentStatus==="transfer_confirmed").reduce((f,u)=>f+u.total,0),y=n.filter(f=>f.paymentMethod==="transfer"&&f.paymentStatus==="transfer_pending").reduce((f,u)=>f+u.total,0),w=n.filter(f=>f.paymentMethod==="debt").reduce((f,u)=>f+u.total,0),$=t.reduce((f,u)=>{for(const x of u.debtPayments||[])x.date&&x.date.split("T")[0]===a&&(f+=x.amount||0);return f},0),P=d+v+$,k=t.reduce((f,u)=>f+(u.remainingDebt||0),0);t.filter(f=>f.paymentStatus==="transfer_pending").reduce((f,u)=>f+u.total,0);const m=Me(n),T=Ae(t);at&&(at.destroy(),at=null),nt&&(nt.destroy(),nt=null),e.innerHTML=`
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
        <div class="stat-card__value" style="color:#16a34a">${p(P)}</div>
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
            <strong style="color:#2563eb">${p(v)}</strong>
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
            <strong style="color:#dc2626">${p(w)}</strong>
          </div>

          ${y>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${p(y)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${d+v+w+$>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${m.length?m.slice(0,7).map((f,u)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${u+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${h(f.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${f.qty}x</span>
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
          <button class="cat-pill ${J==="semua"?"active":""}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${J==="cash"?"active":""}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${J==="transfer"?"active":""}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${J==="debt"?"active":""}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
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
            ${Ie(t,J)}
          </tbody>
        </table>
      </div>
    </div>
  `,(I=document.getElementById("btn-refresh-reports"))==null||I.addEventListener("click",St),(S=document.getElementById("btn-export-pdf-report"))==null||S.addEventListener("click",()=>Le(t,a,s)),document.querySelectorAll("[data-rpt-filter]").forEach(f=>{f.addEventListener("click",()=>{J=f.dataset.rptFilter,_t(t)})}),requestAnimationFrame(()=>Be(T,d,v,w,$))},Ie=(t,e)=>{let a=[...t];e==="cash"&&(a=a.filter(n=>n.paymentMethod==="cash")),e==="transfer"&&(a=a.filter(n=>n.paymentMethod==="transfer")),e==="debt"&&(a=a.filter(n=>n.paymentMethod==="debt"));const s=a.sort((n,i)=>new Date(i.date)-new Date(n.date));return s.length?s.slice(0,50).map(n=>{const i=n.total||0;let r=0,l=0;n.paymentMethod==="cash"?r=i:n.paymentMethod==="transfer"?n.paymentStatus==="transfer_confirmed"?r=i:l=i:n.paymentMethod==="debt"&&(r=n.paidAmount||0,l=n.remainingDebt||0);const c=(n.items||[]).map(v=>{var y;return`${((y=v.product)==null?void 0:y.name)||"Item"} (${v.qty}x)`}).join(", "),o=n.paymentMethod==="debt"?l===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${p(l)}</span>`:n.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',d=n.paymentMethod==="cash"?"💵 Tunai":n.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${h(n.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${dt(new Date(n.date))}</td>
        <td><strong style="color:var(--text-primary)">${h(n.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${h(c)}">${h(c||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${p(i)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${p(r)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${l>0?p(l):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${d}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>'},Be=async(t,e,a,s,n)=>{const{Chart:i,registerables:r}=await st(async()=>{const{Chart:d,registerables:v}=await import("./vendor-chart-19k6OvwP.js");return{Chart:d,registerables:v}},[],import.meta.url);i.register(...r);const l=document.getElementById("chart-bar");l&&(at=new i(l,{type:"bar",data:{labels:t.map(d=>d.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(d=>d.total),backgroundColor:t.map((d,v)=>v===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>" "+p(d.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:d=>p(d),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const c=document.getElementById("chart-donut"),o=e+a+s+n;c&&o>0&&(nt=new i(c,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,a,s,n],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` ${d.label}: ${p(d.raw)}`}}}}}))},Le=async(t,e,a)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:n}=await st(async()=>{const{jsPDF:u}=await import("./vendor-pdf-j4-ZKoBl.js").then(x=>x.j);return{jsPDF:u}},[],import.meta.url),{default:i}=await st(async()=>{const{default:u}=await import("./jspdf.plugin.autotable-QkGqYg11.js").then(x=>x.j);return{default:u}},__vite__mapDeps([0,1,2]),import.meta.url),r=new n({orientation:"portrait",unit:"mm",format:"a4"}),l=g.state.settings,c=r.internal.pageSize.getWidth();r.setFontSize(16),r.setFont("helvetica","bold"),r.text(l.shopName||"Blue Mountain Refilling Station",c/2,16,{align:"center"}),r.setFontSize(10),r.setFont("helvetica","normal"),r.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",c/2,22,{align:"center"}),r.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,c/2,27,{align:"center"});const o=t.filter(u=>u.dateKey===e),d=o.reduce((u,x)=>u+x.total,0),v=t.filter(u=>{var x;return(x=u.dateKey)==null?void 0:x.startsWith(a)}).reduce((u,x)=>u+x.total,0),y=t.reduce((u,x)=>u+x.total,0),w=o.filter(u=>u.paymentMethod==="cash").reduce((u,x)=>u+x.total,0),$=o.filter(u=>u.paymentMethod==="transfer"&&u.paymentStatus==="transfer_confirmed").reduce((u,x)=>u+x.total,0),P=t.reduce((u,x)=>{for(const C of x.debtPayments||[])C.date&&C.date.split("T")[0]===e&&(u+=C.amount||0);return u},0),k=w+$+P,m=t.reduce((u,x)=>u+(x.remainingDebt||0),0);r.setFontSize(11),r.setFont("helvetica","bold"),r.text("1. Ringkasan Kinerja Keuangan",14,35);const T=[["Omzet Gross Hari Ini",p(d)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",p(k)],["Cicilan Piutang Terkumpul Hari Ini",p(P)],["Total Piutang Belum Lunas (Semua Pelanggan)",p(m)],["Omzet Bulan Ini",p(v)],["Total Omzet All-Time",p(y)],["Jumlah Transaksi Hari Ini",`${o.length} transaksi`]];i(r,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:T,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const I=r.lastAutoTable.finalY+10;r.setFontSize(11),r.setFont("helvetica","bold"),r.text("2. Rincian Riwayat Transaksi & Pelunasan",14,I);const S=[...t].sort((u,x)=>new Date(x.date)-new Date(u.date)).slice(0,80);i(r,{startY:I+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:S.map(u=>{let x=u.paymentMethod==="cash"?u.total:u.paymentMethod==="transfer"?u.paymentStatus==="transfer_confirmed"?u.total:0:u.paidAmount||0,C=u.paymentMethod==="debt"?u.remainingDebt||0:u.paymentStatus==="transfer_pending"?u.total:0;return[u.invoiceNo||"-",new Date(u.date).toLocaleDateString("id-ID"),u.customerName||"—",u.paymentMethod==="cash"?"Tunai":u.paymentMethod==="transfer"?"Transfer":"Hutang",p(u.total),p(x),C>0?p(C):"—",u.paymentMethod==="debt"?C===0?"Lunas":"Cicilan":u.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const f=r.internal.getNumberOfPages();for(let u=1;u<=f;u++)r.setPage(u),r.setFontSize(8),r.setFont("helvetica","normal"),r.text(`Hal ${u} dari ${f} — ${l.shopName||"Blue Mountain POS"}`,c/2,r.internal.pageSize.getHeight()-8,{align:"center"});r.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch(s){console.error("[pdf-report]",s),window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},Ae=t=>{const e=[];for(let a=6;a>=0;a--){const s=new Date;s.setDate(s.getDate()-a);const n=s.toISOString().split("T")[0],i=t.filter(l=>l.dateKey===n).reduce((l,c)=>l+c.total,0),r=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);e.push({key:n,label:r,total:i})}return e},Me=t=>{var a;const e={};for(const s of t)for(const n of s.items||[]){if(!((a=n==null?void 0:n.product)!=null&&a.name))continue;const i=n.product.name;e[i]=(e[i]||0)+n.qty}return Object.entries(e).map(([s,n])=>({name:s,qty:n})).sort((s,n)=>n.qty-s.qty)},Ne=async()=>{await ze(),await Et()},ze=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","printerPaper","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const a of t){const s=await xt(a);s!==null&&(e[a]=s)}g.updateSettings(e)},Et=async()=>{const t=document.getElementById("view-settings"),e=g.state.settings,a="3.0.0",s=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
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
        <input type="text" class="input" id="set-shopName" value="${h(e.shopName||"")}" maxlength="80" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${h(e.shopAddress||"")}" maxlength="120" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${h(e.shopPhone||"")}" maxlength="20" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${h(e.cashierName||"Admin")}" maxlength="40" style="max-width:200px">
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
        <input type="text" class="input" id="set-bankName" value="${h(e.bankName||"BCA")}" maxlength="30" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${h(e.bankNumber||"")}" maxlength="30" style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${h(e.bankHolder||"")}" maxlength="60" style="max-width:240px">
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
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800">v${h(a)} High-End</span>
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
  `,Ce()},Ce=()=>{var t,e,a,s,n,i,r,l,c;(t=document.getElementById("btn-export-backup"))==null||t.addEventListener("click",async()=>{const o=document.getElementById("btn-export-backup");o&&(o.textContent="⏳ Menyiapkan...",o.disabled=!0);try{const d=await ne(),v=JSON.stringify(d,null,2),y=new Blob([v],{type:"application/json;charset=utf-8"}),w=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),P=`Backup-KASIR-${(d.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${w}.json`,k=URL.createObjectURL(y),m=document.createElement("a");m.href=k,m.download=P,document.body.appendChild(m),m.click(),document.body.removeChild(m),setTimeout(()=>URL.revokeObjectURL(k),5e3),window.showToast("✅ File backup berhasil diunduh!","success")}catch(d){console.error("[export-backup]",d),window.showToast("Gagal ekspor backup: "+(d.message||"Error"),"error")}finally{o&&(o.textContent="📥 Unduh Backup JSON",o.disabled=!1)}}),(e=document.getElementById("btn-trigger-import"))==null||e.addEventListener("click",()=>{var o;(o=document.getElementById("input-import-backup"))==null||o.click()}),(a=document.getElementById("input-import-backup"))==null||a.addEventListener("change",o=>{var y;const d=(y=o.target.files)==null?void 0:y[0];if(!d)return;const v=new FileReader;v.onload=async w=>{var $;try{const P=($=w.target)==null?void 0:$.result,k=JSON.parse(P);if(!k.data||!k.data.products&&!k.data.transactions){window.showToast("Format file backup tidak valid!","error");return}const m=(k.data.products||[]).length,T=(k.data.transactions||[]).length,I=(k.data.expenses||[]).length,S=k.exportedAt?new Date(k.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",f=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${h(k.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${S}
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:16px;font-weight:900;color:var(--blue-700)">${m}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:16px;font-weight:900;color:#16a34a">${T}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pengeluaran</div>
                <div style="font-size:16px;font-weight:900;color:#dc2626">${I}</div>
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
        `;H(f,"import-confirm-modal"),setTimeout(()=>{var u,x,C;(u=document.getElementById("imp-x"))==null||u.addEventListener("click",()=>A("import-confirm-modal")),(x=document.getElementById("imp-cancel"))==null||x.addEventListener("click",()=>A("import-confirm-modal")),(C=document.getElementById("imp-confirm"))==null||C.addEventListener("click",async()=>{var j;const F=((j=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:j.value)||"replace",z=document.getElementById("imp-confirm");z&&(z.textContent="⏳ Memulihkan...",z.disabled=!0);try{await se(k,F);const[R,U,b]=await Promise.all([q(),rt(),Ct()]);g.setProducts(R),g.setTransactions(U),g.setExpenses(b),A("import-confirm-modal"),window.showToast("🎉 Data berhasil dipulihkan & sinkron!","success"),setTimeout(()=>Et(),600)}catch(R){console.error("[import-backup]",R),window.showToast("Gagal memulihkan data: "+R.message,"error")}})},0)}catch(P){console.error("[parse-backup]",P),window.showToast("File JSON rusak atau tidak terbaca!","error")}},v.readAsText(d),o.target.value=""}),(s=document.getElementById("btn-save-settings"))==null||s.addEventListener("click",async()=>{const o=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","printerPaper","qrisNumber"],d={};for(const v of o){const y=document.getElementById(`set-${v}`);y&&(d[v]=v==="taxRate"?parseFloat(y.value)||0:y.value.trim(),await Dt(v,d[v]))}g.updateSettings(d),window.showToast("Pengaturan berhasil disimpan","success")}),(n=document.getElementById("btn-test-print"))==null||n.addEventListener("click",()=>{pe()}),(i=document.getElementById("btn-printer-guide"))==null||i.addEventListener("click",()=>{De()}),(r=document.getElementById("btn-install-pwa"))==null||r.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(l=document.getElementById("btn-clear-cache"))==null||l.addEventListener("click",async()=>{try{if("caches"in window){const o=await caches.keys();await Promise.all(o.map(d=>caches.delete(d)))}if("serviceWorker"in navigator){const o=await navigator.serviceWorker.getRegistrations();for(const d of o)await d.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch(o){console.error("[cache]",o),window.showToast("Gagal hapus cache","error")}}),(c=document.getElementById("btn-reset-all"))==null||c.addEventListener("click",async()=>{if(confirm(`⚠️ HAPUS SEMUA DATA?

Semua transaksi, pengeluaran, dan produk akan dihapus permanen.
Tindakan ini TIDAK dapat dibatalkan!`))try{await ae(),window.showToast("Semua data berhasil dihapus. Reloading...","error"),setTimeout(()=>window.location.reload(),1500)}catch(d){console.error("[reset]",d),window.showToast("Gagal menghapus data","error")}})},De=()=>{H(`
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
  `,"printer-guide"),setTimeout(()=>{var e,a;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>A("printer-guide")),(a=document.getElementById("pg-close2"))==null||a.addEventListener("click",()=>A("printer-guide"))},0)};let vt=null,bt=null,Q=!1;const je=async()=>{vt&&vt(),bt&&bt(),vt=g.on("transactions:change",()=>{Q||V()}),bt=g.on("expenses:change",()=>{Q||V()}),await V()},V=async()=>{if(!Q){Q=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,a,s]=await Promise.all([g.state.transactions.length?Promise.resolve(g.state.transactions):rt().then(m=>(g.setTransactions(m),m)),Ct().then(m=>(g.setExpenses(m),m)),xt("modalAwal")]),n=parseFloat(s)||0;let i=0,r=0,l=0,c=0,o=0;for(const m of e)if(m.paymentMethod==="cash"&&(m.paymentStatus==="paid"||!m.paymentStatus)&&(i+=m.total),m.paymentMethod==="transfer"&&(m.paymentStatus==="transfer_confirmed"?r+=m.total:c+=m.total),m.paymentMethod==="debt"){for(const T of m.debtPayments||[])l+=T.amount;o+=m.remainingDebt||0}const d=i+r+l,v=a.reduce((m,T)=>m+(T.amount||0),0),y=n+d-v,w=c+o,$=Re(e,a),P=Oe(e,a),k=[...e.filter(m=>m.paymentStatus==="transfer_pending"),...e.filter(m=>(m.paymentMethod==="debt"||m.paymentStatus==="partial"||m.paymentStatus==="unpaid")&&(m.remainingDebt||0)>0)].sort((m,T)=>new Date(m.date)-new Date(T.date));t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${p(n)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${p(y)}</div>
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
          <div class="stat-card__value" style="color:#dc2626">${p(v)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${a.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${p(w)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${k.length} belum lunas</div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          ${Y("💵 Tunai",i,"#16a34a")}
          ${Y("📲 Transfer",r,"#2563eb")}
          ${Y("📋 Cicilan Hutang",l,"#7c3aed")}
          ${Y("⏳ Transfer Pending",c,"#d97706",!0)}
          ${Y("🔴 Piutang Hutang",o,"#dc2626",!0)}
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
              ${k.map(m=>{const T=m.total||0,I=m.paymentStatus==="transfer_pending"?T:m.remainingDebt||0,S=T-I,f=Math.min(100,Math.max(0,Math.round(S/T*100))),u=(m.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${h(m.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${h(m.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${p(T)}</td>
                <td style="color:#16a34a;font-weight:700">${p(S)}</td>
                <td style="font-weight:800;color:#dc2626">${p(I)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${f}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${u>0?`${u}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${f}%;background:${f===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
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
        ${a.length===0?`
          <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        `:`
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${[...a].sort((m,T)=>new Date(T.date)-new Date(m.date)).map(m=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${h(m.category||"Lainnya")}</span></td>
                  <td>${h(m.note||"—")}</td>
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
              ${Ke($,n)}
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
              ${P.slice(0,20).map(m=>`
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-size:12px">${h(m.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${m.debit>0?p(m.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${m.credit>0?p(m.credit):"—"}</td>
                <td><span class="badge ${m.type==="kas"?"badge--green":m.type==="piutang"?"":"badge--blue"}"
                  style="${m.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${h(m.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,He(e)}finally{Q=!1}}},Y=(t,e,a,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${a}">${p(e)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Re=(t,e)=>{const a={};for(const n of t){const i=n.dateKey;if(i){if(a[i]||(a[i]={masuk:0,keluar:0}),n.paymentMethod==="cash"&&(n.paymentStatus==="paid"||!n.paymentStatus)&&(a[i].masuk+=n.total),n.paymentMethod==="transfer"&&n.paymentStatus==="transfer_confirmed"){const r=n.confirmedAt?n.confirmedAt.split("T")[0]:i;a[r]||(a[r]={masuk:0,keluar:0}),a[r].masuk+=n.total}if(n.paymentMethod==="debt")for(const r of n.debtPayments||[]){const l=r.date?r.date.split("T")[0]:i;a[l]||(a[l]={masuk:0,keluar:0}),a[l].masuk+=r.amount}}}for(const n of e){const i=n.dateKey||(n.date?n.date.split("T")[0]:null);i&&(a[i]||(a[i]={masuk:0,keluar:0}),a[i].keluar+=n.amount||0)}const s=[];for(let n=29;n>=0;n--){const i=new Date;i.setDate(i.getDate()-n);const r=i.toISOString().split("T")[0];s.push({key:r,...a[r]||{masuk:0,keluar:0}})}return s},Ke=(t,e)=>{let a=e;const s=t.filter(n=>n.masuk>0||n.keluar>0).map(n=>{const i=n.masuk-n.keluar;return a+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(n.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${n.masuk>0?p(n.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${n.keluar>0?p(n.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${p(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${p(a)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Oe=(t,e)=>{const a=[];for(const s of t){const n=h(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")a.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"Kas / Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?a.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${n})`,debit:s.total,credit:s.total,account:"Bank / Penjualan",type:"kas"}):a.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${n}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"Piutang Transfer",type:"piutang"});else if(s.paymentMethod==="debt"){a.push({date:s.date,desc:`Penjualan Piutang Usaha — ${s.invoiceNo} (${n}) [Total Tagihan: ${p(s.total)}]`,debit:s.total,credit:s.total,account:"Piutang / Penjualan",type:"piutang"});const i=s.debtPayments||[];let r=0;i.forEach((l,c)=>{r+=l.amount||0;const o=Math.max(0,s.total-r),d=o===0,v=c+1,y=d?`Pelunasan (#${v}/LUNAS ✅)`:`Cicilan #${v} (dari ${i.length})`,w=l.note?` — ${h(l.note)}`:"";a.push({date:l.date,desc:`${y} — ${s.invoiceNo} (${n})${w} [Bayar: ${p(l.amount)} | Sisa: ${p(o)}]`,debit:l.amount,credit:l.amount,account:d?"Kas / Piutang (LUNAS ✅)":"Kas / Piutang Usaha",type:"kas"})})}}for(const s of e)a.push({date:s.date,desc:`Beban ${h(s.category||"Operasional")} — ${h(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`Beban (${h(s.category||"Operasional")}) / Kas`,type:"beban"});return a.sort((s,n)=>new Date(n.date)-new Date(s.date))},He=t=>{var e,a,s,n,i;(e=document.getElementById("btn-refresh-finance"))==null||e.addEventListener("click",V),(a=document.getElementById("btn-set-modal-awal"))==null||a.addEventListener("click",()=>{const l=`
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
    `;H(l,"modal-awal"),setTimeout(()=>{var c,o,d;(c=document.getElementById("ma-x"))==null||c.addEventListener("click",()=>A("modal-awal")),(o=document.getElementById("ma-cancel"))==null||o.addEventListener("click",()=>A("modal-awal")),(d=document.getElementById("ma-save"))==null||d.addEventListener("click",async()=>{var y;const v=parseFloat((y=document.getElementById("modal-awal-input"))==null?void 0:y.value)||0;await Dt("modalAwal",v),g.updateSettings({modalAwal:v}),A("modal-awal"),window.showToast("Modal Awal disimpan!","success"),V()})},0)}),(s=document.getElementById("btn-add-expense"))==null||s.addEventListener("click",()=>{const l=`
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${["Belanja Bahan","Operasional","Gaji/Upah","Listrik/Air","Transportasi","Peralatan","Lainnya"].map(c=>`<option value="${h(c)}">${h(c)}</option>`).join("")}
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
    `;H(l,"expense-modal"),setTimeout(()=>{var c,o,d;(c=document.getElementById("exp-x"))==null||c.addEventListener("click",()=>A("expense-modal")),(o=document.getElementById("exp-cancel"))==null||o.addEventListener("click",()=>A("expense-modal")),(d=document.getElementById("exp-save"))==null||d.addEventListener("click",async()=>{var k,m,T,I;const v=parseFloat((k=document.getElementById("exp-amount"))==null?void 0:k.value)||0,y=((m=document.getElementById("exp-category"))==null?void 0:m.value)||"Lainnya",w=((I=(T=document.getElementById("exp-note"))==null?void 0:T.value)==null?void 0:I.trim())||"";if(v<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const $=new Date().toISOString(),P={date:$,dateKey:$.split("T")[0],category:y,note:w,amount:v};try{const S=await Zt(P);P.id=S,g.addExpense(P),A("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch(S){console.error("[expense]",S),window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(n=document.getElementById("expense-table"))==null||n.addEventListener("click",async r=>{const l=r.target.closest('[data-action="delete-expense"]');if(!l||!confirm("Hapus pengeluaran ini?"))return;const c=parseInt(l.dataset.id);try{await te(c),g.removeExpense(c),window.showToast("Pengeluaran dihapus","success")}catch(o){console.error("[expense]",o),window.showToast("Gagal hapus","error")}}),(i=document.getElementById("piutang-table"))==null||i.addEventListener("click",async r=>{const l=r.target.closest("[data-action]");if(!l)return;const c=parseInt(l.dataset.id),o=l.dataset.action,d=(g.state.transactions||t).find(v=>v.id===c);if(d){if(o==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${p(d.total)} dari ${h(d.customerName||"pelanggan")} sudah diterima?`))return;const v={...d,paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:new Date().toISOString()};try{await it(v),g.updateTransaction(c,{paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:v.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(y){console.error("[confirm]",y),window.showToast("Gagal konfirmasi","error")}}if(o==="pay-debt"){const v=d.remainingDebt||0,y=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${p(d.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${p(v)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${v}" min="1" max="${v}" step="1000" inputmode="numeric">
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
      `;H(y,"mini-cicil"),setTimeout(()=>{var w,$,P;(w=document.getElementById("mc-x"))==null||w.addEventListener("click",()=>A("mini-cicil")),($=document.getElementById("mc-cancel"))==null||$.addEventListener("click",()=>A("mini-cicil")),(P=document.getElementById("mc-save"))==null||P.addEventListener("click",async()=>{var F,z,j;const k=parseFloat((F=document.getElementById("mc-amount"))==null?void 0:F.value)||0;if(k<=0||k>v){window.showToast("Jumlah tidak valid","warning");return}const m=(d.paidAmount||0)+k,T=Math.max(0,v-k),I=T===0?"paid":"partial",S=(d.debtPayments||[]).length+1,f=T===0?`Pelunasan (#${S}/LUNAS ✅)`:`Cicilan #${S}`,u=((j=(z=document.getElementById("mc-note"))==null?void 0:z.value)==null?void 0:j.trim())||f,x=[...d.debtPayments||[],{date:new Date().toISOString(),amount:k,note:u}],C={...d,paidAmount:m,remainingDebt:T,paymentStatus:I,debtPayments:x};try{await it(C),g.updateTransaction(c,{paidAmount:m,remainingDebt:T,paymentStatus:I,debtPayments:x}),A("mini-cicil"),window.showToast(T===0?"🎉 Hutang LUNAS!":`Cicilan #${S} (${p(k)}) dicatat`,"success")}catch(R){console.error("[cicil]",R),window.showToast("Gagal simpan cicilan","error")}})},0)}}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const Pt=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine?(t.textContent="Sistem Online",t.classList.remove("status-badge--offline")):(t.textContent="Mode Offline",t.classList.add("status-badge--offline")))};window.addEventListener("online",Pt);window.addEventListener("offline",Pt);window.showToast=(t,e="info",a="")=>{const s=document.getElementById("toast-container");if(!s)return;const n={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${n[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${a?`<div class="toast__title">${a}</div>`:""}
      <div class="toast__msg">${t}</div>
    </div>
  `,s.appendChild(i);const r=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},l=setTimeout(r,3500);i.addEventListener("click",()=>{clearTimeout(l),r()})};const Mt=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=jt()),e&&(e.textContent=oe())},Fe={pos:{init:ge,refresh:ye},products:{init:xe,refresh:lt},transactions:{init:Te,refresh:Ft},reports:{init:Pe,refresh:St},settings:{init:Ne,refresh:Et},finance:{init:je,refresh:V}},Nt=new Set,ft=async t=>{const e=Fe[t];if(e){document.querySelectorAll(".dock-item").forEach(a=>{a.classList.toggle("active",a.dataset.view===t)}),document.querySelectorAll(".view").forEach(a=>{a.classList.toggle("active",a.id===`view-${t}`)});try{Nt.has(t)?await e.refresh():(await e.init(),Nt.add(t)),sessionStorage.setItem("activeView",t)}catch(a){console.error(`[Navigation] Error initializing view "${t}":`,a);const s=document.getElementById(`view-${t}`);s&&!s.children.length&&(s.innerHTML=`
        <div class="empty-state" style="padding:60px 20px">
          <div class="empty-state__icon">⚠️</div>
          <div class="empty-state__text">
            <strong style="font-size:16px;color:var(--text-primary)">Gagal Memuat Halaman</strong><br>
            <span style="font-size:12px;color:var(--text-muted)">${a.message||"Terjadi kesalahan sistem"}</span>
          </div>
          <button class="btn btn--primary btn--sm" onclick="location.reload()" style="margin-top:16px">
            🔄 Reload Halaman
          </button>
        </div>
      `)}g.navigate(t)}},qe=(t,e)=>{if(!t)return;const a=t.getBoundingClientRect(),s=Math.max(a.width,a.height),n=document.createElement("span");n.className="ripple-effect",n.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-a.left-s/2}px;top:${e.clientY-a.top-s/2}px`,t.style.position="relative",t.appendChild(n),n.addEventListener("animationend",()=>n.remove(),{once:!0})},Jt=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};g.on("settings:change",Jt);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const Ue=async()=>{try{await ie(),await ee()}catch(b){console.error("[DB] Failed to open database:",b),window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const b of t){const E=await xt(b);E!==null&&(b==="modalAwal"||b==="taxRate"?e[b]=parseFloat(E)||0:e[b]=E)}g.updateSettings(e),Jt(g.state.settings),Pt(),Mt(),setInterval(Mt,1e3);const a=document.querySelector(".dock"),s="bm_dock_order_v3";(()=>{try{a==null||a.querySelectorAll(".dock-separator").forEach(L=>L.remove());const b=localStorage.getItem(s);if(!b)return;const E=JSON.parse(b);if(!Array.isArray(E)||!E.length)return;const _=new Map;a==null||a.querySelectorAll(".dock-item").forEach(L=>{_.set(L.dataset.view,L)}),E.forEach(L=>{const M=_.get(L);M&&a&&(a.appendChild(M),_.delete(L))}),_.forEach(L=>{a&&a.appendChild(L)})}catch{}})();let i=a?[...a.querySelectorAll(".dock-item")]:[];const r=()=>window.innerWidth<600,l=()=>window.innerWidth>=600&&window.innerWidth<=1024,c=()=>r()?1.22:l()?1.36:1.5,o=()=>r()?8:l()?12:18,d=()=>r()?90:140;let v=i.map(()=>1),y=i.map(()=>1),w=null,$=!1;const P=(b,E,_)=>b+(E-b)*_,k=.24,m=()=>{if($)return;let b=!1;const E=c(),_=o();i.forEach((L,M)=>{v[M]=P(v[M]??1,y[M]??1,k),Math.abs(v[M]-y[M])>5e-4?b=!0:v[M]=y[M];const N=v[M],K=(N-1)/(E-1||1)*_;L.style.transform=`translate3d(0, ${-K.toFixed(2)}px, 0) scale(${N.toFixed(4)})`,L.style.zIndex=N>1.02?Math.round(N*20):""}),w=b?requestAnimationFrame(m):null},T=()=>{!$&&!w&&(w=requestAnimationFrame(m))},I=b=>{if($)return;const E=c(),_=d();i.forEach((L,M)=>{const N=L.getBoundingClientRect(),K=N.left+N.width/2,D=Math.abs(b-K);if(D<_){const O=Math.cos(D/_*(Math.PI/2));y[M]=1+(E-1)*O*O}else y[M]=1})},S=()=>{i.forEach((b,E)=>{y[E]=1})};a==null||a.addEventListener("mousemove",b=>{$||(I(b.clientX),T())},{passive:!0}),a==null||a.addEventListener("mouseleave",()=>{$||(S(),T())});let f=null,u=-1,x=-1,C=0,F=0,z=[],j=!1;const R=()=>i.map((b,E)=>{const _=b.getBoundingClientRect();return{idx:E,el:b,x:_.left,cx:_.left+_.width/2,width:_.width}});i.forEach(b=>{b.addEventListener("pointerdown",_=>{if(!(_.button!==0&&_.pointerType==="mouse")){f=b,u=i.indexOf(b),x=u,C=_.clientX,F=_.clientY,j=!1,z=R();try{b.setPointerCapture(_.pointerId)}catch{}}}),b.addEventListener("pointermove",_=>{var N;if(!f||f!==b)return;const L=_.clientX-C,M=_.clientY-F;if(!j&&Math.hypot(L,M)>5&&(j=!0,$=!0,w&&(cancelAnimationFrame(w),w=null),a==null||a.classList.add("is-reordering"),b.classList.add("is-dragging"),i.forEach(K=>{K!==b&&(K.style.zIndex="")})),j&&$){b.style.transform=`translate3d(${L}px, ${M-12}px, 0) scale(1.18)`;let K=u;for(let D=0;D<z.length;D++)if(D===0&&_.clientX<z[0].cx){K=0;break}else if(D===z.length-1&&_.clientX>=z[D].cx){K=z.length-1;break}else if(_.clientX>=z[D].cx&&_.clientX<((N=z[D+1])==null?void 0:N.cx)){const O=(z[D].cx+z[D+1].cx)/2;K=_.clientX<O?D:D+1;break}x=Math.max(0,Math.min(i.length-1,K)),z.forEach(({el:D,idx:O,x:It})=>{if(D===b)return;let ct=0;if(O>u&&O<=x){const X=z[O-1];ct=X?X.x-It:-58}else if(O<u&&O>=x){const X=z[O+1];ct=X?X.x-It:58}D.style.transform=`translate3d(${ct}px, 0, 0)`})}});const E=_=>{if(!(!f||f!==b)){try{b.releasePointerCapture(_.pointerId)}catch{}if(j&&$){if(a==null||a.classList.remove("is-reordering"),b.classList.remove("is-dragging"),i.forEach(L=>{L.style.transform=""}),x!==u&&x>=0){const L=i.filter(N=>N!==b);x>=L.length?a==null||a.appendChild(b):a==null||a.insertBefore(b,L[x]),i=a?[...a.querySelectorAll(".dock-item")]:[];const M=i.map(N=>N.dataset.view).filter(Boolean);try{localStorage.setItem(s,JSON.stringify(M))}catch{}}v=i.map(()=>1),y=i.map(()=>1),$=!1,S(),T()}else{$=!1,b.style.transform="";const L=b.dataset.view;L&&(b.classList.remove("bouncing"),b.offsetWidth,b.classList.add("bouncing"),b.addEventListener("animationend",()=>b.classList.remove("bouncing"),{once:!0}),qe(b.querySelector(".dock-icon"),_),ft(L))}f=null,u=-1,x=-1,j=!1}};b.addEventListener("pointerup",E),b.addEventListener("pointercancel",E)}),i.forEach(b=>{b.addEventListener("focus",()=>{const E=i.indexOf(b);i.forEach((_,L)=>{const M=Math.abs(L-E);y[L]=M===0?1.35:M===1?1.12:1}),T()}),b.addEventListener("blur",()=>{S(),T()}),b.addEventListener("keydown",E=>{var L,M;const _=i.indexOf(b);if(E.key==="ArrowRight"){E.preventDefault();const N=i[_+1]||i[0];N==null||N.focus()}else if(E.key==="ArrowLeft"){E.preventDefault();const N=i[_-1]||i[i.length-1];N==null||N.focus()}else if(E.key==="Home")E.preventDefault(),(L=i[0])==null||L.focus();else if(E.key==="End")E.preventDefault(),(M=i[i.length-1])==null||M.focus();else if(E.key==="Enter"||E.key===" "){E.preventDefault();const N=b.dataset.view;N&&ft(N)}})});const U=sessionStorage.getItem("activeView")||"pos";await ft(U)};document.addEventListener("DOMContentLoaded",Ue);
