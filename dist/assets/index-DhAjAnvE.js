const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.plugin.autotable-QkGqYg11.js","./_commonjsHelpers-C4iS2aBk.js","./vendor-pdf-j4-ZKoBl.js"])))=>i.map(i=>d[i]);
import{X as Ht}from"./vendor-db-2jmnBxhj.js";import{_ as Q}from"./vendor-pdf-j4-ZKoBl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const E=new Ht("BlueMountainPOS");E.version(2).stores({products:"++id, category",transactions:"++id, dateKey, paymentStatus, paymentMethod",settings:"key",expenses:"++id, dateKey, category"});const C=()=>E.products.toArray(),Et=t=>E.products.add(t),Ot=t=>E.products.put(t),Ft=t=>E.products.delete(t),qt=t=>E.transactions.add(t),tt=()=>E.transactions.toArray(),Ut=t=>E.transactions.delete(t),X=t=>E.transactions.put(t),Gt=t=>E.expenses.add(t),Pt=()=>E.expenses.toArray(),Jt=t=>E.expenses.delete(t),pt=async t=>{const e=await E.settings.get(t);return(e==null?void 0:e.value)??null},It=(t,e)=>E.settings.put({key:t,value:e}),Wt=async()=>{await E.products.count()>0||await E.products.bulkAdd([{name:"Air Isi Ulang Galon",category:"Galon",price:5e3,unit:"galon",emoji:"🪣",stock:999},{name:"Antar Galon (dalam)",category:"Galon",price:3e3,unit:"kali",emoji:"🛵",stock:999},{name:"Antar Galon (luar)",category:"Galon",price:5e3,unit:"kali",emoji:"🚚",stock:999},{name:"Galon Baru (Aqua)",category:"Galon",price:5e4,unit:"buah",emoji:"💧",stock:50},{name:"Galon Baru (Standar)",category:"Galon",price:45e3,unit:"buah",emoji:"💦",stock:50},{name:"Air Botol 600ml",category:"Botol",price:3e3,unit:"botol",emoji:"🍶",stock:200},{name:"Air Botol 1500ml",category:"Botol",price:5e3,unit:"botol",emoji:"🥤",stock:100},{name:"Dispenser Galon",category:"Lainnya",price:25e4,unit:"unit",emoji:"⚗️",stock:10}])},Vt=async()=>{await Promise.all([E.products.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear()]),sessionStorage.clear(),localStorage.clear()},Yt=async()=>{const[t,e,n,s]=await Promise.all([E.products.toArray(),E.transactions.toArray(),E.expenses.toArray(),E.settings.toArray()]),a=s.find(r=>r.key==="shopName"),i=(a==null?void 0:a.value)||"Blue Mountain";return{app:"Blue Mountain POS",version:"3.0.0",exportedAt:new Date().toISOString(),shopName:i,data:{products:t,transactions:e,expenses:n,settings:s},meta:{productCount:t.length,transactionCount:e.length,expenseCount:n.length,settingCount:s.length}}},Qt=async(t,e="replace")=>{if(!t||!t.data)throw new Error("Format file backup tidak valid atau rusak.");const{products:n=[],transactions:s=[],expenses:a=[],settings:i=[]}=t.data;return e==="replace"?(await Promise.all([E.products.clear(),E.transactions.clear(),E.expenses.clear(),E.settings.clear()]),n.length&&await E.products.bulkAdd(n),s.length&&await E.transactions.bulkAdd(s),a.length&&await E.expenses.bulkAdd(a),i.length&&await E.settings.bulkPut(i)):e==="merge"&&(n.length&&await E.products.bulkPut(n),s.length&&await E.transactions.bulkPut(s),a.length&&await E.expenses.bulkPut(a),i.length&&await E.settings.bulkPut(i)),{products:n.length,transactions:s.length,expenses:a.length,settings:i.length}},Xt=()=>E.open(),j={},g={state:{cart:[],products:[],transactions:[],expenses:[],currentView:"pos",discount:0,customerName:"",settings:{shopName:"Blue Mountain Refilling Station",shopAddress:"Jl. Contoh No. 1, Kota",shopPhone:"0812-3456-7890",cashierName:"Admin",printerUrl:"",printEnabled:!1,taxRate:0,bankName:"BCA",bankNumber:"",bankHolder:"Blue Mountain Refilling Station",qrisNumber:"",modalAwal:0}},on(t,e){return(j[t]??(j[t]=[])).push(e),()=>{j[t]=(j[t]??[]).filter(n=>n!==e)}},emit(t,e){(j[t]??[]).forEach(n=>n(e))},addToCart(t,e=1){const n=Math.max(1,parseInt(e)||1),s=this.state.cart.findIndex(a=>String(a.product.id)===String(t.id));s>=0?this.state.cart[s].qty+=n:this.state.cart.push({product:t,qty:n}),this.emit("cart:change",this.state.cart)},removeFromCart(t){this.state.cart=this.state.cart.filter(e=>String(e.product.id)!==String(t)),this.emit("cart:change",this.state.cart)},setQty(t,e){if(e<=0)return this.removeFromCart(t);const n=this.state.cart.find(s=>String(s.product.id)===String(t));n&&(n.qty=e,this.emit("cart:change",this.state.cart))},clearCart(){this.state.cart=[],this.state.discount=0,this.state.customerName="",this.emit("cart:change",this.state.cart)},setDiscount(t){this.state.discount=Math.max(0,parseFloat(t)||0),this.emit("cart:change",this.state.cart)},setCustomerName(t){this.state.customerName=String(t??"").slice(0,80)},get subtotal(){return this.state.cart.reduce((t,e)=>t+e.product.price*e.qty,0)},get tax(){return Math.round(this.subtotal*(this.state.settings.taxRate||0)/100)},get total(){return Math.max(0,this.subtotal+this.tax-this.state.discount)},get cartCount(){return this.state.cart.reduce((t,e)=>t+e.qty,0)},setProducts(t){this.state.products=t,this.emit("products:change",t)},setTransactions(t){this.state.transactions=t,this.emit("transactions:change",t)},removeTransaction(t){this.state.transactions=this.state.transactions.filter(e=>e.id!==t),this.emit("transactions:change",this.state.transactions)},addTransaction(t){this.state.transactions=[t,...this.state.transactions],this.emit("transactions:change",this.state.transactions)},updateTransaction(t,e){const n=this.state.transactions.findIndex(s=>s.id===t);n>=0&&(this.state.transactions[n]={...this.state.transactions[n],...e},this.emit("transactions:change",this.state.transactions))},setExpenses(t){this.state.expenses=t,this.emit("expenses:change",t)},addExpense(t){this.state.expenses=[...this.state.expenses,t],this.emit("expenses:change",this.state.expenses)},removeExpense(t){this.state.expenses=this.state.expenses.filter(e=>e.id!==t),this.emit("expenses:change",this.state.expenses)},navigate(t){this.state.currentView=t,this.emit("navigate",t)},updateSettings(t){Object.assign(this.state.settings,t),this.emit("settings:change",this.state.settings)}},Zt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t instanceof Date?t:new Date(t)),te=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{year:"numeric",month:"2-digit",day:"2-digit"}).format(t instanceof Date?t:new Date(t)),Bt=(t=new Date)=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t instanceof Date?t:new Date(t)),et=(t=new Date)=>`${te(t)} ${Bt(t)}`,W=()=>new Date().toISOString().split("T")[0],ee=()=>{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`},u=t=>isNaN(t)?"Rp 0":"Rp "+Math.round(t).toLocaleString("id-ID"),y=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),ut=(t,e)=>{const n=t.items||[],s=[],a=(l,p=0,o=1,d=0)=>s.push({type:0,content:l,bold:p,align:o,format:d}),i=()=>a("--------------------------------",0,1,0),r=()=>a(" ",0,0,0);r(),a(e.shopName||"Blue Mountain Refilling Station",1,1,2),a(e.shopAddress||"",0,1,4),e.shopPhone&&a(`Telp: ${e.shopPhone}`,0,1,4),i(),a(`No: ${t.invoiceNo||"-"}`,0,0,0),a(`Tgl: ${et(new Date(t.date))}`,0,0,0),t.customerName&&a(`Pelanggan: ${t.customerName}`,0,0,0),t.cashier&&a(`Kasir: ${t.cashier}`,0,0,0),i();for(const l of n){if(!(l!=null&&l.product))continue;const p=l.product.name,o=l.qty,d=u(l.product.price),b=u(l.product.price*o);a(`${p}`,0,0,0),a(`  ${o} x ${d} = ${b}`,0,0,0)}return i(),t.discount>0&&(a(`Subtotal: ${u(t.subtotal)}`,0,0,0),a(`Diskon:  -${u(t.discount)}`,0,0,0)),t.tax>0&&a(`Pajak:    ${u(t.tax)}`,0,0,0),a(`TOTAL: ${u(t.total)}`,1,0,3),t.paymentMethod==="cash"?(a(`Bayar:   ${u(t.paid)}`,0,0,0),a(`Kembali: ${u(t.change)}`,1,0,0)):t.paymentMethod==="transfer"?(a(`Transfer: ${u(t.total)}`,0,0,0),a(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI":"MENUNGGU KONFIRMASI"}`,0,0,0)):t.paymentMethod==="debt"&&(a(`DP Dibayar: ${u(t.paidAmount||0)}`,0,0,0),a(`Sisa Hutang: ${u(t.remainingDebt||0)}`,1,0,0)),i(),r(),a("Terima kasih sudah berbelanja!",1,1,0),a(e.shopName||"Blue Mountain Refilling Station",0,1,4),r(),r(),s},ae=""+new URL("logo-x8cg0OuI.png",import.meta.url).href,Lt=()=>{const t=window.location.pathname.replace(/\/[^/]*$/,"/");return`${window.location.origin}${t}receipt-data.html`},ne=t=>{const e=ut(t,g.state.settings);return sessionStorage.setItem("pendingReceipt",JSON.stringify(e)),Lt()},At=t=>(ne(t),`my.bluetoothprint.scheme://${(g.state.settings||{}).printerUrl||Lt()}`),mt=(t,e="58mm")=>{const n=g.state.settings||{},s=t.items||[],a=(n.printerPaper||e)==="58mm",i=a?"220px":"300px",r=(d,b=!1,x="left",$="11px")=>`<div style="text-align:${x};font-weight:${b?"700":"400"};font-size:${$};line-height:1.35;word-break:break-word">${d}</div>`,l=()=>'<div style="border-top:1px dashed #444;margin:4px 0"></div>',p=()=>'<div style="height:4px"></div>';let o=`<div class="thermal-receipt" style="width:${i};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:4px">`;o+=`<div style="text-align:center;margin-bottom:6px;margin-top:2px">
    <img src="${ae}"
         alt="Logo"
         style="width:${a?"70px":"85px"};height:${a?"70px":"85px"};object-fit:contain;display:inline-block">
  </div>`,o+=r(n.shopName||"Blue Mountain Refilling Station",!0,"center",a?"12px":"14px"),n.shopAddress&&(o+=r(n.shopAddress,!1,"center","10px")),n.shopPhone&&(o+=r(`Telp: ${n.shopPhone}`,!1,"center","10px")),o+=l(),o+=r(`No  : ${t.invoiceNo||"-"}`),o+=r(`Tgl : ${et(new Date(t.date||Date.now()))}`),t.customerName&&(o+=r(`Cust: ${t.customerName}`)),t.cashier&&(o+=r(`Kasir: ${t.cashier}`)),o+=l();for(const d of s){if(!(d!=null&&d.product))continue;const b=d.product.name,x=d.qty,$=d.product.price,S=$*x;o+=r(b,!0),o+=`<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3">
      <span>&nbsp;&nbsp;${x} x ${u($)}</span>
      <span>${u(S)}</span>
    </div>`}return o+=l(),t.discount>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Subtotal</span><span>${u(t.subtotal||t.total+t.discount)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Diskon</span><span>-${u(t.discount)}</span>
    </div>`),t.tax>0&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Pajak</span><span>${u(t.tax)}</span>
    </div>`),o+=`<div style="display:flex;justify-content:space-between;font-size:${a?"12px":"13px"};font-weight:900;margin-top:2px">
    <span>TOTAL</span><span>${u(t.total)}</span>
  </div>`,t.paymentMethod==="cash"?(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>Bayar Tunai</span><span>${u(t.paid||t.total)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700">
      <span>Kembali</span><span>${u(t.change||0)}</span>
    </div>`):t.paymentMethod==="transfer"?(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>Transfer Bank</span><span>${u(t.total)}</span>
    </div>`,o+=r(`Status: ${t.paymentStatus==="transfer_confirmed"?"TERKONFIRMASI ✅":"MENUNGGU KONFIRMASI ⏳"}`,!1,"center","9px")):t.paymentMethod==="debt"&&(o+=`<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>DP Dibayar</span><span>${u(t.paidAmount||0)}</span>
    </div>`,o+=`<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#000">
      <span>Sisa Hutang</span><span>${u(t.remainingDebt||0)}</span>
    </div>`),o+=l(),o+=p(),o+=r("Terima kasih atas kunjungan Anda!",!0,"center","10px"),o+=r(n.shopName||"Blue Mountain Refilling Station",!1,"center","9px"),o+=p(),o+="</div>",o},gt=t=>{const n=(g.state.settings||{}).printerPaper||"58mm",s=mt(t,n),a=document.createElement("iframe");a.style.position="fixed",a.style.right="0",a.style.bottom="0",a.style.width="0",a.style.height="0",a.style.border="0",document.body.appendChild(a);const i=a.contentWindow.document;i.open(),i.write(`<!DOCTYPE html>
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
</html>`),i.close(),setTimeout(()=>{try{a.contentWindow.focus(),a.contentWindow.print()}catch(r){console.warn("[print-frame] Direct iframe print failed, falling back to popup",r);const l=window.open("","_blank","width=350,height=600");l&&(l.document.write(i.documentElement.outerHTML),l.document.close(),l.focus(),l.print(),setTimeout(()=>l.close(),1e3))}finally{setTimeout(()=>a.remove(),1500)}},350)},se=()=>{const t={invoiceNo:"TEST-58MM-"+Math.floor(Math.random()*8999+1e3),date:new Date().toISOString(),customerName:"Pelanggan Uji Coba",cashier:g.state.settings.cashierName||"Kasir",paymentMethod:"cash",paid:5e4,change:15e3,total:35e3,subtotal:35e3,discount:0,tax:0,items:[{product:{name:"Air Mineral 19 L (Galon)",price:1e4},qty:2},{product:{name:"Pembersihan Galon",price:15e3},qty:1}]};gt(t)},nt=()=>{const t=new Date,e=t.getFullYear().toString()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0"),n=(t.getTime()%1e5).toString(36).toUpperCase().padStart(4,"0"),s=String.fromCharCode(65+Math.floor(Math.random()*26));return`BM-${e}-${n}${s}`},z=(t,e="generic-modal")=>{I();const n=document.createElement("div");n.className="modal-overlay",n.id=`overlay-${e}`,n.innerHTML=`<div class="modal" id="${e}" role="dialog" aria-modal="true">${t}</div>`,document.body.appendChild(n),n.addEventListener("click",a=>{a.target===n&&I(e)});const s=n.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');return s.length&&s[0].focus(),n},I=(t=null)=>{const e=t?`#overlay-${t}`:".modal-overlay";(t?[document.querySelector(e)].filter(Boolean):[...document.querySelectorAll(".modal-overlay")]).forEach(s=>{var a;s&&((a=s.querySelector(".modal"))==null||a.classList.add("closing"),s.classList.add("closing"),setTimeout(()=>s.remove(),180))})},ie=t=>{const n=(a=>Math.ceil(a/5e3)*5e3)(t),s=[n,n+5e3,n+1e4,n+2e4,n+5e4,n+1e5];return[...new Set(s.filter(a=>a>=t))].slice(0,4)},st=(t="cash")=>{const e=g.total,n=g.subtotal,s=g.state.discount||0,a=g.tax,i=g.state.settings||{},r=y(i.bankName||"BCA"),l=y(i.bankNumber||"—"),p=y(i.bankHolder||i.shopName||"Blue Mountain"),o=`
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran Transaksi</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Tagihan</div>
        <div class="amount">${u(e)}</div>
        ${s>0?`<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${u(s)}</div>`:""}
        ${a>0?`<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${u(a)}</div>`:""}
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
          ${ie(e).map(d=>`<button class="quick-amt-btn" data-amount="${d}">${u(d)}</button>`).join("")}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px;padding:10px 14px;background:var(--color-success-bg);border:1.5px solid var(--color-success-border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="font-weight:700;color:var(--color-success)">💰 Kembalian</span>
          <span class="value" id="change-amount" style="font-size:18px;font-weight:900;color:var(--color-success)">${u(0)}</span>
        </div>
      </div>

      <!-- Transfer Section -->
      <div id="pay-transfer-section" style="${t!=="transfer"?"display:none":""}">
        <div class="transfer-info" style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border-subtle)">
          <div style="font-size:32px;margin-bottom:4px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Silakan transfer nominal berikut:</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-600);margin:6px 0">${u(e)}</div>
          <div style="margin-top:8px;padding:10px;background:#fff;border-radius:8px;border:1.5px dashed var(--blue-300);text-align:left">
            <div style="font-size:12px;color:var(--text-secondary)">Bank: <strong>${r}</strong></div>
            <div style="font-size:14px;font-weight:800;color:var(--text-primary);margin:2px 0">
              No. Rek: <span id="trans-acc-num">${l}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary)">Atas Nama: <strong>${p}</strong></div>
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
            value="${y(g.state.customerName||"")}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${e}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total Tagihan</span><strong>${u(e)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>DP Dibayar Sekarang</span><strong id="debt-paid-display" style="color:var(--color-success)">${u(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang Berjalan</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger);font-size:16px">${u(e)}</strong>
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
  `;z(o,"payment-modal"),setTimeout(()=>{var k,w,m,T;(k=document.getElementById("pay-close-btn"))==null||k.addEventListener("click",()=>I("payment-modal")),(w=document.getElementById("pay-cancel-btn"))==null||w.addEventListener("click",()=>I("payment-modal")),document.querySelectorAll(".pay-tab").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".pay-tab").forEach(v=>v.classList.remove("active")),_.classList.add("active");const f=_.dataset.method;document.getElementById("pay-cash-section").style.display=f==="cash"?"":"none",document.getElementById("pay-transfer-section").style.display=f==="transfer"?"":"none",document.getElementById("pay-debt-section").style.display=f==="debt"?"":"none"})});const d=document.getElementById("cash-received"),b=document.getElementById("change-amount"),x=()=>{const _=parseFloat(d==null?void 0:d.value)||e,f=Math.max(0,_-e);b&&(b.textContent=u(f))};d==null||d.addEventListener("input",x),x(),(m=document.getElementById("quick-amounts"))==null||m.addEventListener("click",_=>{const f=_.target.closest(".quick-amt-btn");f&&d&&(d.value=f.dataset.amount,x())});const $=document.getElementById("debt-paid-now"),S=()=>{const _=Math.min(parseFloat($==null?void 0:$.value)||0,e),f=e-_,v=document.getElementById("debt-paid-display"),c=document.getElementById("debt-remaining-display");v&&(v.textContent=u(_)),c&&(c.textContent=u(f))};$==null||$.addEventListener("input",S),(T=document.getElementById("pay-confirm-btn"))==null||T.addEventListener("click",async()=>{var P,L,A,N,M,q;const _=document.querySelector(".pay-tab.active"),f=(_==null?void 0:_.dataset.method)||"cash",v=document.getElementById("pay-confirm-btn");if(f==="cash"&&(parseFloat(d==null?void 0:d.value)||e)<e){window.showToast("Jumlah uang tunai kurang dari total tagihan!","warning"),d==null||d.focus();return}if(f==="debt"&&!((L=(P=document.getElementById("debt-customer"))==null?void 0:P.value)==null?void 0:L.trim())){window.showToast("Nama pelanggan wajib diisi untuk transaksi hutang/cicil!","warning"),(A=document.getElementById("debt-customer"))==null||A.focus();return}v&&(v.disabled=!0,v.textContent="⏳ Menyimpan...");const c=new Date().toISOString();let h;if(f==="cash"){const B=parseFloat(d==null?void 0:d.value)||e,U=Math.max(0,B-e);h={invoiceNo:nt(),date:c,dateKey:W(),items:g.state.cart.map(G=>({product:{...G.product},qty:G.qty})),subtotal:n,discount:s,tax:a,total:e,paymentMethod:"cash",paymentStatus:"paid",paid:B,change:U,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Kasir"}}else if(f==="transfer")h={invoiceNo:nt(),date:c,dateKey:W(),items:g.state.cart.map(B=>({product:{...B.product},qty:B.qty})),subtotal:n,discount:s,tax:a,total:e,paymentMethod:"transfer",paymentStatus:"transfer_confirmed",paid:e,change:0,paidAmount:e,remainingDebt:0,debtPayments:[],customerName:g.state.customerName||"",cashier:g.state.settings.cashierName||"Kasir"};else{const B=Math.min(parseFloat((N=document.getElementById("debt-paid-now"))==null?void 0:N.value)||0,e),U=e-B,G=U===0?"paid":B>0?"partial":"unpaid",Kt=((q=(M=document.getElementById("debt-customer"))==null?void 0:M.value)==null?void 0:q.trim())||g.state.customerName||"Pelanggan";h={invoiceNo:nt(),date:c,dateKey:W(),items:g.state.cart.map(xt=>({product:{...xt.product},qty:xt.qty})),subtotal:n,discount:s,tax:a,total:e,paymentMethod:"debt",paymentStatus:G,paid:B,change:0,paidAmount:B,remainingDebt:U,debtPayments:B>0?[{date:c,amount:B,note:"DP / Uang muka awal"}]:[],customerName:Kt,cashier:g.state.settings.cashierName||"Kasir"}}try{const B=await qt(h);h.id=B,g.addTransaction(h),I("payment-modal"),g.clearCart(),oe(h)}catch(B){console.error("[payment-save]",B),window.showToast("Gagal menyimpan transaksi: "+(B.message||"Error"),"error"),v&&(v.disabled=!1,v.textContent="✅ Proses Pembayaran")}})},0)},oe=t=>{var r,l,p,o;const e=ut(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const n=At(t),s=mt(t),a=document.createElement("div");a.className="success-overlay",a.id="success-overlay",a.innerHTML=`
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${y(t.invoiceNo)} &bull; ${u(t.total)}</p>
      ${t.change>0?`<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${u(t.change)}</p>`:""}
      ${t.paymentMethod==="transfer"?'<p style="color:var(--blue-600);font-size:13px;margin-top:4px">📲 Transfer Terkonfirmasi ✅</p>':""}
      ${t.remainingDebt>0?`<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa Piutang: ${u(t.remainingDebt)}</p>`:""}
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
  `,document.body.appendChild(a);const i=()=>{a.classList.add("closing"),setTimeout(()=>a.remove(),180)};(r=document.getElementById("success-close-btn"))==null||r.addEventListener("click",i),(l=document.getElementById("btn-close-overlay"))==null||l.addEventListener("click",i),(p=document.getElementById("btn-print-direct"))==null||p.addEventListener("click",()=>{gt(t)}),(o=document.getElementById("btn-new-tx"))==null||o.addEventListener("click",()=>{i(),window.showToast("Siap transaksi baru! 👍","success")}),setTimeout(()=>{a.parentNode&&i()},15e3)};let lt="",Z="Semua",J=null,wt=[];const re=async()=>{const t=await C();g.setProducts(t),Mt(),J&&J.abort(),J=new AbortController,wt.forEach(e=>e()),wt=[g.on("cart:change",Nt),g.on("products:change",()=>F())],ce(J.signal)},Mt=()=>{const t=document.getElementById("view-pos");t.innerHTML=`
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
  `,vt(),F(),Nt()},de=()=>["Semua",...new Set(g.state.products.map(t=>t.category))],vt=()=>{const t=document.getElementById("category-pills");t&&(t.innerHTML=de().map(e=>`
    <button class="cat-pill ${e===Z?"active":""}"
      data-cat="${y(e)}">${y(e)}</button>
  `).join(""))},F=()=>{const t=document.getElementById("product-grid");if(!t)return;let e=g.state.products;if(Z!=="Semua"&&(e=e.filter(n=>n.category===Z)),lt){const n=lt.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(n))}if(!e.length){t.innerHTML=`<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;return}t.innerHTML=e.map(n=>`
    <div class="product-card" data-id="${n.id}" role="button" tabindex="0"
      aria-label="${y(n.name)} — ${u(n.price)}">
      <div class="product-card__emoji">${n.emoji||"📦"}</div>
      <div class="product-card__name">${y(n.name)}</div>
      <div class="product-card__price">${u(n.price)}</div>
      <div class="product-card__unit">per ${y(n.unit)}</div>
    </div>
  `).join(""),t.querySelectorAll(".product-card").forEach(n=>{const s=()=>{const a=n.dataset.id,i=g.state.products.find(r=>String(r.id)===String(a));i&&(g.addToCart(i),n.style.transform="scale(0.94)",setTimeout(()=>{n.style.transform=""},120))};n.addEventListener("click",s),n.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s())})})},Nt=()=>{const t=document.getElementById("cart-items"),e=document.getElementById("cart-count"),n=document.getElementById("cart-total"),s=document.getElementById("tax-amount"),a=document.getElementById("tax-row"),i=document.getElementById("customer-name"),r=document.getElementById("discount-input");if(i&&!i.matches(":focus")&&(i.value=g.state.customerName||""),r&&!r.matches(":focus")&&(r.value=g.state.discount||""),!t)return;const l=g.state.cart;if(e){const p=e.textContent;e.textContent=g.cartCount,p!==String(g.cartCount)&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"))}if(n&&(n.textContent=u(g.total)),a&&s&&(g.tax>0?(a.style.display="flex",s.textContent=u(g.tax)):a.style.display="none"),!l.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;return}t.innerHTML=l.map(p=>`
    <div class="cart-item" data-pid="${p.product.id}">
      <div class="cart-item__info">
        <div class="cart-item__name">${p.product.emoji||""} ${y(p.product.name)}</div>
        <div class="cart-item__price">${u(p.product.price)} / ${y(p.product.unit)}</div>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__subtotal">${u(p.product.price*p.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn remove" data-action="remove" data-pid="${p.product.id}" title="Hapus">🗑</button>
          <button class="qty-btn" data-action="dec" data-pid="${p.product.id}">−</button>
          <span class="qty-value">${p.qty}</span>
          <button class="qty-btn" data-action="inc" data-pid="${p.product.id}">+</button>
        </div>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-action]").forEach(p=>{p.addEventListener("click",()=>{const o=p.dataset.pid,d=p.dataset.action,b=g.state.cart.find(x=>String(x.product.id)===String(o));b&&(d==="inc"?g.setQty(b.product.id,b.qty+1):d==="dec"?g.setQty(b.product.id,b.qty-1):d==="remove"&&g.removeFromCart(b.product.id))})})},le=()=>{const t=`
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
  `;z(t,"manual-item-modal"),setTimeout(()=>{var e,n,s,a;(e=document.getElementById("mi-close"))==null||e.addEventListener("click",()=>I("manual-item-modal")),(n=document.getElementById("mi-cancel"))==null||n.addEventListener("click",()=>I("manual-item-modal")),(s=document.getElementById("mi-name"))==null||s.focus(),document.querySelectorAll(".emoji-pick-mi").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick-mi").forEach(r=>{r.style.borderColor="var(--border-subtle)",r.classList.remove("emoji-pick--active")}),i.style.borderColor="var(--blue-400)",i.classList.add("emoji-pick--active"),document.getElementById("mi-emoji").value=i.dataset.emoji})}),(a=document.getElementById("mi-save"))==null||a.addEventListener("click",async()=>{var $,S,k,w,m,T,_;const i=($=document.getElementById("mi-name"))==null?void 0:$.value.trim(),r=(S=document.getElementById("mi-price"))==null?void 0:S.value,l=parseFloat(r)||0,p=Math.max(1,parseInt((k=document.getElementById("mi-qty"))==null?void 0:k.value)||1),o=((w=document.getElementById("mi-unit"))==null?void 0:w.value.trim())||"pcs",d=((m=document.getElementById("mi-category"))==null?void 0:m.value)||"Lainnya",b=((T=document.getElementById("mi-emoji"))==null?void 0:T.value)||"🏷️",x=(_=document.getElementById("mi-save-catalog"))==null?void 0:_.checked;if(!i){window.showToast("Nama produk wajib diisi!","warning");return}if(r===""||l<0){window.showToast("Harga tidak boleh kosong atau negatif!","warning");return}try{if(x){const f=await Et({name:i,price:l,unit:o,category:d,emoji:b,stock:999}),v=await C();g.setProducts(v);const c=v.find(h=>h.id===f)||{id:f,name:i,price:l,unit:o,category:d,emoji:b};g.addToCart(c,p),window.showToast(`Product "${i}" ditambahkan ke katalog & keranjang`,"success")}else{const f={id:"manual_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:i,price:l,unit:o,category:d,emoji:b};g.addToCart(f,p),window.showToast(`"${i}" ditambahkan ke keranjang`,"success")}I("manual-item-modal")}catch(f){window.showToast("Gagal menambahkan item manual!","error"),console.error("[manual-item]",f)}})},0)},ce=t=>{document.addEventListener("click",e=>{const n=e.target.closest(".cat-pill");if(n){Z=n.dataset.cat,vt(),F();return}if(e.target.closest("#btn-manual-item")){le();return}if(e.target.closest("#btn-pay-cash")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}st("cash")}if(e.target.closest("#btn-pay-transfer")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}st("transfer")}if(e.target.closest("#btn-pay-debt")){if(!g.state.cart.length){window.showToast("Keranjang kosong!","warning");return}st("debt")}e.target.closest("#btn-clear-cart")&&g.state.cart.length&&(g.clearCart(),window.showToast("Keranjang dikosongkan","info"))},{signal:t}),document.addEventListener("input",e=>{e.target.id==="pos-search"&&(lt=e.target.value.trim(),F()),e.target.id==="discount-input"&&g.setDiscount(parseFloat(e.target.value)||0),e.target.id==="customer-name"&&g.setCustomerName(e.target.value)},{signal:t})},pe=async()=>{const t=document.getElementById("view-pos");(!t||!t.querySelector(".pos-layout"))&&Mt();const e=await C();g.setProducts(e),F(),vt()},kt=["💧","🪣","🍶","🥤","💦","🛵","🚚","⚗️","📦","🏷️","🫙","🧊"],ue=["Galon","Botol","Layanan","Lainnya"],me=async()=>{await at()},at=async()=>{const t=document.getElementById("view-products"),e=await C();t.innerHTML=`
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${e.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${e.length?e.map(n=>ge(n)).join(""):`<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`}
    </div>
  `,ve()},ge=t=>`
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
    <div class="product-manage-card__price">${u(t.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${y(t.unit)}</span></div>
    <div class="product-manage-card__actions">
      <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${t.id}">✏️ Edit</button>
      <button class="btn btn--danger btn--sm" data-action="delete" data-id="${t.id}">🗑️</button>
    </div>
  </div>
`,ve=()=>{const t=document.getElementById("products-grid"),e=document.getElementById("btn-add-product");e==null||e.addEventListener("click",()=>$t()),t==null||t.addEventListener("click",async n=>{const s=n.target.closest('[data-action="edit"]'),a=n.target.closest('[data-action="delete"]');if(s){const i=parseInt(s.dataset.id),l=(await C()).find(p=>p.id===i);l&&$t(l)}if(a){const i=parseInt(a.dataset.id);be(i)}})},$t=(t=null)=>{const e=!!t,n=`
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
          ${ue.map(s=>`<option value="${y(s)}" ${(t==null?void 0:t.category)===s?"selected":""}>${y(s)}</option>`).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
          ${kt.map(s=>`
            <button type="button" class="emoji-pick ${(t==null?void 0:t.emoji)===s?"emoji-pick--active":""}"
              data-emoji="${s}"
              style="font-size:24px;width:40px;height:40px;border-radius:8px;border:2px solid ${(t==null?void 0:t.emoji)===s?"var(--blue-400)":"var(--border-subtle)"};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${s}</button>
          `).join("")}
        </div>
        <input type="hidden" id="pf-emoji" value="${y((t==null?void 0:t.emoji)||kt[0])}">
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
  `;z(n,"product-form"),setTimeout(()=>{var s,a,i;(s=document.getElementById("pf-close"))==null||s.addEventListener("click",()=>I("product-form")),(a=document.getElementById("pf-cancel"))==null||a.addEventListener("click",()=>I("product-form")),document.querySelectorAll(".emoji-pick").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".emoji-pick").forEach(l=>{l.style.borderColor="var(--border-subtle)",l.classList.remove("emoji-pick--active")}),r.style.borderColor="var(--blue-400)",r.classList.add("emoji-pick--active"),document.getElementById("pf-emoji").value=r.dataset.emoji})}),(i=document.getElementById("pf-save"))==null||i.addEventListener("click",async()=>{var x,$,S,k,w,m;const r=(x=document.getElementById("pf-name"))==null?void 0:x.value.trim(),l=parseFloat(($=document.getElementById("pf-price"))==null?void 0:$.value)||0,p=((S=document.getElementById("pf-unit"))==null?void 0:S.value.trim())||"pcs",o=((k=document.getElementById("pf-category"))==null?void 0:k.value)||"Lainnya",d=((w=document.getElementById("pf-emoji"))==null?void 0:w.value)||"📦",b=parseInt((m=document.getElementById("pf-stock"))==null?void 0:m.value)||0;if(!r){window.showToast("Nama produk wajib diisi!","warning");return}if(l<=0){window.showToast("Harga harus lebih dari 0!","warning");return}try{e?(await Ot({...t,name:r,price:l,unit:p,category:o,emoji:d,stock:b}),window.showToast("Produk berhasil diperbarui","success")):(await Et({name:r,price:l,unit:p,category:o,emoji:d,stock:b}),window.showToast("Produk berhasil ditambahkan","success")),I("product-form");const T=await C();g.setProducts(T),await at()}catch(T){window.showToast("Gagal menyimpan produk!","error"),console.error("[products]",T)}})},0)},be=t=>{z(`
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
  `,"delete-confirm"),setTimeout(()=>{var n,s,a;(n=document.getElementById("dc-close"))==null||n.addEventListener("click",()=>I("delete-confirm")),(s=document.getElementById("dc-cancel"))==null||s.addEventListener("click",()=>I("delete-confirm")),(a=document.getElementById("dc-confirm"))==null||a.addEventListener("click",async()=>{try{await Ft(t);const i=await C();g.setProducts(i),I("delete-confirm"),await at(),window.showToast("Produk dihapus","success")}catch(i){window.showToast("Gagal menghapus produk","error"),console.error("[products]",i)}})},0)};let it=null;const fe=async()=>{it&&it(),it=g.on("transactions:change",t=>{Dt(t)}),await zt()},zt=async()=>{const t=await tt();g.setTransactions(t),Dt(t)},Ct=t=>{const e=t.paymentMethod,n=t.paymentStatus;return e==="transfer"&&n==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>':e==="transfer"&&n==="transfer_confirmed"?'<span class="badge badge--green">✅ Confirmed</span>':n==="unpaid"?'<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>':n==="partial"?'<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>':'<span class="badge badge--green">✅ Lunas</span>'},jt=t=>t.paymentMethod==="cash"?"💵 Tunai":t.paymentMethod==="transfer"?"📲 Transfer":t.paymentMethod==="debt"?"📋 Hutang":y(t.paymentMethod)||"—",R=t=>!(t.paymentMethod==="debt"&&(t.remainingDebt||0)>0),Dt=t=>{const e=document.getElementById("view-transactions");if(!e)return;const n=[...t].sort((p,o)=>new Date(o.date)-new Date(p.date)),s=new Date().toISOString().split("T")[0],i=t.filter(p=>p.dateKey===s).reduce((p,o)=>o.paymentStatus==="paid"&&o.paymentMethod==="cash"||o.paymentStatus==="transfer_confirmed"?p+o.total:o.paymentMethod==="debt"?p+(o.paidAmount||0):p,0),r=t.reduce((p,o)=>p+(o.remainingDebt||0),0),l=t.filter(p=>p.paymentStatus==="transfer_pending").reduce((p,o)=>p+o.total,0);e.innerHTML=`
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
        <div style="font-size:15px;font-weight:800;color:#16a34a">${u(i)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${u(r)}</div>
      </div>
      ${l>0?`
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${u(l)}</div>
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
              ${ct(n)}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `,ye(t,n)},ct=t=>t.length?t.map(e=>{var n;return`
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${y(e.invoiceNo||"-")}</span></td>
      <td style="font-size:11px;white-space:nowrap">${et(new Date(e.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${y(e.customerName)||'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${((n=e.items)==null?void 0:n.length)||0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${u(e.total)}
        ${(e.remainingDebt||0)>0?`<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${u(e.remainingDebt)}</div>`:""}
      </td>
      <td><span class="badge badge--blue">${jt(e)}</span></td>
      <td>${Ct(e)}</td>
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
  `}).join(""):'<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk filter ini</td></tr>',ye=(t,e)=>{var n,s,a;(n=document.getElementById("tx-filter-date"))==null||n.addEventListener("change",i=>{const r=i.target.value,l=r?[...t].filter(o=>o.dateKey===r).sort((o,d)=>new Date(d.date)-new Date(o.date)):e,p=document.getElementById("tx-tbody");p&&(p.innerHTML=ct(l))}),(s=document.getElementById("tx-clear-filter"))==null||s.addEventListener("click",()=>{const i=document.getElementById("tx-tbody"),r=document.getElementById("tx-filter-date");i&&(i.innerHTML=ct(e)),r&&(r.value="")}),(a=document.getElementById("tx-table"))==null||a.addEventListener("click",async i=>{const r=i.target.closest("[data-action]");if(!r)return;const l=parseInt(r.dataset.id),p=r.dataset.action,o=t.find(d=>d.id===l);if(p==="detail"){o&&xe(o);return}if(p==="confirm-transfer"){if(!o||!confirm(`Konfirmasi transfer ${u(o.total)} dari ${y(o.customerName||"pelanggan")} sudah diterima?`))return;try{const d={...o,paymentStatus:"transfer_confirmed",paidAmount:o.total,confirmedAt:new Date().toISOString()};await X(d),g.updateTransaction(l,{paymentStatus:"transfer_confirmed",paidAmount:o.total,confirmedAt:d.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(d){console.error("[tx]",d),window.showToast("Gagal konfirmasi","error")}return}if(p==="pay-debt"){o&&he(o);return}if(p==="delete"){if(!o)return;if(!R(o)){window.showToast("Tidak bisa hapus transaksi yang masih ada sisa hutang!","error");return}if(!confirm(`Hapus transaksi ${y(o.invoiceNo)}? Tindakan tidak bisa dibatalkan.`))return;try{await Ut(l),g.removeTransaction(l),window.showToast("Transaksi dihapus","success")}catch(d){console.error("[tx]",d),window.showToast("Gagal menghapus","error")}}})},he=t=>{var s;const e=t.remainingDebt||0,n=`
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
          <div style="font-size:16px;font-weight:900;color:#dc2626">${u(t.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${u(e)}</div>
        </div>
      </div>

      ${(s=t.debtPayments)!=null&&s.length?`
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${t.debtPayments.map(a=>`
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(a.date).toLocaleDateString("id-ID")} — ${y(a.note||"-")}</span>
            <strong style="color:#16a34a">+${u(a.amount)}</strong>
          </div>
        `).join("")}
      </div>`:""}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${u(e)})</label>
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
  `;z(n,"debt-modal"),setTimeout(()=>{var a,i,r;(a=document.getElementById("debt-x"))==null||a.addEventListener("click",()=>I("debt-modal")),(i=document.getElementById("debt-cancel"))==null||i.addEventListener("click",()=>I("debt-modal")),(r=document.getElementById("debt-save"))==null||r.addEventListener("click",async()=>{var w,m,T;const l=parseFloat((w=document.getElementById("cicil-amount"))==null?void 0:w.value)||0;if(l<=0||l>e){window.showToast(`Jumlah cicilan harus antara 1 dan ${u(e)}`,"warning");return}const p=(t.paidAmount||0)+l,o=Math.max(0,e-l),d=o===0?"paid":"partial",b=(t.debtPayments||[]).length+1,x=o===0?`Pelunasan (#${b}/LUNAS ✅)`:`Cicilan #${b}`,$=((T=(m=document.getElementById("cicil-note"))==null?void 0:m.value)==null?void 0:T.trim())||x,S=[...t.debtPayments||[],{date:new Date().toISOString(),amount:l,note:$}],k={...t,paidAmount:p,remainingDebt:o,paymentStatus:d,debtPayments:S};try{await X(k),g.updateTransaction(t.id,{paidAmount:p,remainingDebt:o,paymentStatus:d,debtPayments:S}),I("debt-modal"),window.showToast(o===0?"🎉 Hutang LUNAS!":`Cicilan ${u(l)} dicatat`,"success")}catch(_){console.error("[debt]",_),window.showToast("Gagal simpan cicilan","error")}})},0)},xe=t=>{const e=ut(t,g.state.settings);sessionStorage.setItem("pendingReceipt",JSON.stringify(e));const n=At(t);g.state.settings.printEnabled;const s=`
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
          <div style="margin-top:4px">${Ct(t)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${y(t.customerName||"—")}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${jt(t)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${mt(t)}</div>

      ${(t.remainingDebt||0)>0?`
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${u(t.remainingDebt)}</div>
      </div>`:""}

      <div style="display:grid;grid-template-columns:${t.change>0?"1fr 1fr":"1fr"};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${u(t.total)}</div>
        </div>
        ${t.change>0?`
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${u(t.change)}</div>
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
  `;z(s,"tx-detail"),setTimeout(()=>{var a,i,r,l;(a=document.getElementById("td-x"))==null||a.addEventListener("click",()=>I("tx-detail")),(i=document.getElementById("td-close-btn"))==null||i.addEventListener("click",()=>I("tx-detail")),(r=document.getElementById("btn-tx-print-direct"))==null||r.addEventListener("click",()=>{gt(t)}),(l=document.getElementById("btn-save-png"))==null||l.addEventListener("click",async()=>{var o;const p=document.getElementById("btn-save-png");p.textContent="⏳...",p.disabled=!0;try{const{default:d}=await Q(async()=>{const{default:k}=await import("./vendor-pdf-j4-ZKoBl.js").then(w=>w.h);return{default:k}},[],import.meta.url),b=document.getElementById("receipt-capture"),x=await d(b,{backgroundColor:"#fff",scale:2,useCORS:!0,logging:!1}),$=await new Promise(k=>x.toBlob(k,"image/png")),S=`Struk-${t.invoiceNo||t.id}.png`;if((o=navigator.canShare)!=null&&o.call(navigator,{files:[new File([$],S,{type:"image/png"})]}))await navigator.share({title:`Struk ${t.invoiceNo}`,files:[new File([$],S,{type:"image/png"})]});else{const k=URL.createObjectURL($);Object.assign(document.createElement("a"),{href:k,download:S}).click(),setTimeout(()=>URL.revokeObjectURL(k),2e3),window.showToast("PNG tersimpan!","success")}}catch(d){console.error("[png]",d),window.showToast("Gagal buat PNG","error")}finally{p.textContent="🖼️ PNG / Share",p.disabled=!1}})},0)};let ot=null,V=null,Y=null,D="semua";const we=async()=>{ot&&ot(),ot=g.on("transactions:change",t=>{ft(t)}),await bt()},bt=async()=>{const t=await tt();g.setTransactions(t),ft(t)},ft=t=>{var _,f;const e=document.getElementById("view-reports");if(!e)return;const n=W(),s=ee(),a=t.filter(v=>v.dateKey===n),i=a.reduce((v,c)=>v+c.total,0),r=a.length,l=t.filter(v=>{var c;return(c=v.dateKey)==null?void 0:c.startsWith(s)}),p=l.reduce((v,c)=>v+c.total,0),o=t.reduce((v,c)=>v+c.total,0),d=a.filter(v=>v.paymentMethod==="cash").reduce((v,c)=>v+c.total,0),b=a.filter(v=>v.paymentMethod==="transfer"&&v.paymentStatus==="transfer_confirmed").reduce((v,c)=>v+c.total,0),x=a.filter(v=>v.paymentMethod==="transfer"&&v.paymentStatus==="transfer_pending").reduce((v,c)=>v+c.total,0),$=a.filter(v=>v.paymentMethod==="debt").reduce((v,c)=>v+c.total,0),S=t.reduce((v,c)=>{for(const h of c.debtPayments||[])h.date&&h.date.split("T")[0]===n&&(v+=h.amount||0);return v},0),k=d+b+S,w=t.reduce((v,c)=>v+(c.remainingDebt||0),0);t.filter(v=>v.paymentStatus==="transfer_pending").reduce((v,c)=>v+c.total,0);const m=_e(a),T=Se(t);V&&(V.destroy(),V=null),Y&&(Y.destroy(),Y=null),e.innerHTML=`
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
        <div class="stat-card__value" style="color:var(--blue-700)">${u(i)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${r} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${u(k)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${u(S)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${u(w)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${u(p)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${l.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${u(o)}</div>
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
            <strong style="color:var(--color-success)">${u(d)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${u(b)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${u(S)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${u($)}</strong>
          </div>

          ${x>0?`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${u(x)}</strong>
          </div>`:""}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${d+b+$+S>0?'<canvas id="chart-donut" width="140" height="140"></canvas>':'<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>'}
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${m.length?m.slice(0,7).map((v,c)=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${c+1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${y(v.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${v.qty}x</span>
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
            ${ke(t,D)}
          </tbody>
        </table>
      </div>
    </div>
  `,(_=document.getElementById("btn-refresh-reports"))==null||_.addEventListener("click",bt),(f=document.getElementById("btn-export-pdf-report"))==null||f.addEventListener("click",()=>Te(t,n,s)),document.querySelectorAll("[data-rpt-filter]").forEach(v=>{v.addEventListener("click",()=>{D=v.dataset.rptFilter,ft(t)})}),requestAnimationFrame(()=>$e(T,d,b,$,S))},ke=(t,e)=>{let n=[...t];e==="cash"&&(n=n.filter(a=>a.paymentMethod==="cash")),e==="transfer"&&(n=n.filter(a=>a.paymentMethod==="transfer")),e==="debt"&&(n=n.filter(a=>a.paymentMethod==="debt"));const s=n.sort((a,i)=>new Date(i.date)-new Date(a.date));return s.length?s.slice(0,50).map(a=>{const i=a.total||0;let r=0,l=0;a.paymentMethod==="cash"?r=i:a.paymentMethod==="transfer"?a.paymentStatus==="transfer_confirmed"?r=i:l=i:a.paymentMethod==="debt"&&(r=a.paidAmount||0,l=a.remainingDebt||0);const p=(a.items||[]).map(b=>{var x;return`${((x=b.product)==null?void 0:x.name)||"Item"} (${b.qty}x)`}).join(", "),o=a.paymentMethod==="debt"?l===0?'<span class="badge badge--green">✅ LUNAS</span>':`<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${u(l)}</span>`:a.paymentStatus==="transfer_pending"?'<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>':'<span class="badge badge--green">✅ Lunas</span>',d=a.paymentMethod==="cash"?"💵 Tunai":a.paymentMethod==="transfer"?"📲 Transfer":"📋 Hutang";return`
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${y(a.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${et(new Date(a.date))}</td>
        <td><strong style="color:var(--text-primary)">${y(a.customerName||"—")}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${y(p)}">${y(p||"—")}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${u(i)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${u(r)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${l>0?u(l):"—"}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${d}</span> ${o}</td>
      </tr>
    `}).join(""):'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>'},$e=async(t,e,n,s,a)=>{const{Chart:i,registerables:r}=await Q(async()=>{const{Chart:d,registerables:b}=await import("./vendor-chart-19k6OvwP.js");return{Chart:d,registerables:b}},[],import.meta.url);i.register(...r);const l=document.getElementById("chart-bar");l&&(V=new i(l,{type:"bar",data:{labels:t.map(d=>d.label),datasets:[{label:"Omzet Harian (Rp)",data:t.map(d=>d.total),backgroundColor:t.map((d,b)=>b===6?"rgba(37,99,235,0.85)":"rgba(37,99,235,0.35)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>" "+u(d.raw)}}},scales:{y:{beginAtZero:!0,ticks:{callback:d=>u(d),font:{size:10},maxTicksLimit:5},grid:{color:"rgba(37,99,235,0.06)"}},x:{ticks:{font:{size:11}},grid:{display:!1}}}}}));const p=document.getElementById("chart-donut"),o=e+n+s+a;p&&o>0&&(Y=new i(p,{type:"doughnut",data:{labels:["Tunai","Transfer","Piutang Baru","Cicilan Masuk"],datasets:[{data:[e,n,s,a],backgroundColor:["#10b981","#3b82f6","#ef4444","#8b5cf6"],borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` ${d.label}: ${u(d.raw)}`}}}}}))},Te=async(t,e,n)=>{try{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="⏳ Memproses PDF...",s.disabled=!0);const{jsPDF:a}=await Q(async()=>{const{jsPDF:c}=await import("./vendor-pdf-j4-ZKoBl.js").then(h=>h.j);return{jsPDF:c}},[],import.meta.url),{default:i}=await Q(async()=>{const{default:c}=await import("./jspdf.plugin.autotable-QkGqYg11.js").then(h=>h.j);return{default:c}},__vite__mapDeps([0,1,2]),import.meta.url),r=new a({orientation:"portrait",unit:"mm",format:"a4"}),l=g.state.settings,p=r.internal.pageSize.getWidth();r.setFontSize(16),r.setFont("helvetica","bold"),r.text(l.shopName||"Blue Mountain Refilling Station",p/2,16,{align:"center"}),r.setFontSize(10),r.setFont("helvetica","normal"),r.text("LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP",p/2,22,{align:"center"}),r.text(`Dicetak: ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}`,p/2,27,{align:"center"});const o=t.filter(c=>c.dateKey===e),d=o.reduce((c,h)=>c+h.total,0),b=t.filter(c=>{var h;return(h=c.dateKey)==null?void 0:h.startsWith(n)}).reduce((c,h)=>c+h.total,0),x=t.reduce((c,h)=>c+h.total,0),$=o.filter(c=>c.paymentMethod==="cash").reduce((c,h)=>c+h.total,0),S=o.filter(c=>c.paymentMethod==="transfer"&&c.paymentStatus==="transfer_confirmed").reduce((c,h)=>c+h.total,0),k=t.reduce((c,h)=>{for(const P of h.debtPayments||[])P.date&&P.date.split("T")[0]===e&&(c+=P.amount||0);return c},0),w=$+S+k,m=t.reduce((c,h)=>c+(h.remainingDebt||0),0);r.setFontSize(11),r.setFont("helvetica","bold"),r.text("1. Ringkasan Kinerja Keuangan",14,35);const T=[["Omzet Gross Hari Ini",u(d)],["Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)",u(w)],["Cicilan Piutang Terkumpul Hari Ini",u(k)],["Total Piutang Belum Lunas (Semua Pelanggan)",u(m)],["Omzet Bulan Ini",u(b)],["Total Omzet All-Time",u(x)],["Jumlah Transaksi Hari Ini",`${o.length} transaksi`]];i(r,{startY:38,head:[["Indikator Keuangan","Nilai (Rp)"]],body:T,theme:"grid",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold"},columnStyles:{1:{halign:"right",fontStyle:"bold"}},margin:{left:14,right:14}});const _=r.lastAutoTable.finalY+10;r.setFontSize(11),r.setFont("helvetica","bold"),r.text("2. Rincian Riwayat Transaksi & Pelunasan",14,_);const f=[...t].sort((c,h)=>new Date(h.date)-new Date(c.date)).slice(0,80);i(r,{startY:_+4,head:[["Invoice","Tanggal","Pelanggan","Metode","Total Tagihan","Terbayar","Sisa Piutang","Status"]],body:f.map(c=>{let h=c.paymentMethod==="cash"?c.total:c.paymentMethod==="transfer"?c.paymentStatus==="transfer_confirmed"?c.total:0:c.paidAmount||0,P=c.paymentMethod==="debt"?c.remainingDebt||0:c.paymentStatus==="transfer_pending"?c.total:0;return[c.invoiceNo||"-",new Date(c.date).toLocaleDateString("id-ID"),c.customerName||"—",c.paymentMethod==="cash"?"Tunai":c.paymentMethod==="transfer"?"Transfer":"Hutang",u(c.total),u(h),P>0?u(P):"—",c.paymentMethod==="debt"?P===0?"Lunas":"Cicilan":c.paymentStatus==="transfer_pending"?"Pending":"Lunas"]}),theme:"striped",headStyles:{fillColor:[30,58,138],textColor:255,fontStyle:"bold",fontSize:8},bodyStyles:{fontSize:8},columnStyles:{4:{halign:"right"},5:{halign:"right"},6:{halign:"right"}},margin:{left:14,right:14}});const v=r.internal.getNumberOfPages();for(let c=1;c<=v;c++)r.setPage(c),r.setFontSize(8),r.setFont("helvetica","normal"),r.text(`Hal ${c} dari ${v} — ${l.shopName||"Blue Mountain POS"}`,p/2,r.internal.pageSize.getHeight()-8,{align:"center"});r.save(`Laporan-Keuangan-${e}.pdf`),window.showToast("Laporan PDF berhasil diekspor!","success")}catch(s){console.error("[pdf-report]",s),window.showToast("Gagal export PDF","error")}finally{const s=document.getElementById("btn-export-pdf-report");s&&(s.textContent="📄 Export PDF Laporan",s.disabled=!1)}},Se=t=>{const e=[];for(let n=6;n>=0;n--){const s=new Date;s.setDate(s.getDate()-n);const a=s.toISOString().split("T")[0],i=t.filter(l=>l.dateKey===a).reduce((l,p)=>l+p.total,0),r=new Intl.DateTimeFormat("id-ID",{weekday:"short"}).format(s);e.push({key:a,label:r,total:i})}return e},_e=t=>{var n;const e={};for(const s of t)for(const a of s.items||[]){if(!((n=a==null?void 0:a.product)!=null&&n.name))continue;const i=a.product.name;e[i]=(e[i]||0)+a.qty}return Object.entries(e).map(([s,a])=>({name:s,qty:a})).sort((s,a)=>a.qty-s.qty)},Ee=async()=>{await Pe(),await yt()},Pe=async()=>{const t=["shopName","shopAddress","shopPhone","cashierName","printerUrl","printEnabled","printerPaper","taxRate","bankName","bankNumber","bankHolder","qrisNumber"],e={};for(const n of t){const s=await pt(n);s!==null&&(e[n]=s)}g.updateSettings(e)},yt=async()=>{const t=document.getElementById("view-settings"),e=g.state.settings,n="3.0.0",s=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;t.innerHTML=`
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
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800">v${y(n)} High-End</span>
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
  `,Ie()},Ie=()=>{var t,e,n,s,a,i,r,l,p;(t=document.getElementById("btn-export-backup"))==null||t.addEventListener("click",async()=>{const o=document.getElementById("btn-export-backup");o&&(o.textContent="⏳ Menyiapkan...",o.disabled=!0);try{const d=await Yt(),b=JSON.stringify(d,null,2),x=new Blob([b],{type:"application/json;charset=utf-8"}),$=new Date().toISOString().replace(/[-:T]/g,"").slice(0,14),k=`Backup-KASIR-${(d.shopName||"KASIR").replace(/[^a-zA-Z0-9]/g,"_")}-${$}.json`,w=URL.createObjectURL(x),m=document.createElement("a");m.href=w,m.download=k,document.body.appendChild(m),m.click(),document.body.removeChild(m),setTimeout(()=>URL.revokeObjectURL(w),5e3),window.showToast("✅ File backup berhasil diunduh!","success")}catch(d){console.error("[export-backup]",d),window.showToast("Gagal ekspor backup: "+(d.message||"Error"),"error")}finally{o&&(o.textContent="📥 Unduh Backup JSON",o.disabled=!1)}}),(e=document.getElementById("btn-trigger-import"))==null||e.addEventListener("click",()=>{var o;(o=document.getElementById("input-import-backup"))==null||o.click()}),(n=document.getElementById("input-import-backup"))==null||n.addEventListener("change",o=>{var x;const d=(x=o.target.files)==null?void 0:x[0];if(!d)return;const b=new FileReader;b.onload=async $=>{var S;try{const k=(S=$.target)==null?void 0:S.result,w=JSON.parse(k);if(!w.data||!w.data.products&&!w.data.transactions){window.showToast("Format file backup tidak valid!","error");return}const m=(w.data.products||[]).length,T=(w.data.transactions||[]).length,_=(w.data.expenses||[]).length,f=w.exportedAt?new Date(w.exportedAt).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Tidak diketahui",v=`
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${y(w.shopName||"Blue Mountain")}</strong><br>
              Waktu Ekspor: ${f}
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
                <div style="font-size:16px;font-weight:900;color:#dc2626">${_}</div>
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
        `;z(v,"import-confirm-modal"),setTimeout(()=>{var c,h,P;(c=document.getElementById("imp-x"))==null||c.addEventListener("click",()=>I("import-confirm-modal")),(h=document.getElementById("imp-cancel"))==null||h.addEventListener("click",()=>I("import-confirm-modal")),(P=document.getElementById("imp-confirm"))==null||P.addEventListener("click",async()=>{var N;const L=((N=document.querySelector('input[name="import-mode"]:checked'))==null?void 0:N.value)||"replace",A=document.getElementById("imp-confirm");A&&(A.textContent="⏳ Memulihkan...",A.disabled=!0);try{await Qt(w,L);const[M,q,B]=await Promise.all([C(),tt(),Pt()]);g.setProducts(M),g.setTransactions(q),g.setExpenses(B),I("import-confirm-modal"),window.showToast("🎉 Data berhasil dipulihkan & sinkron!","success"),setTimeout(()=>yt(),600)}catch(M){console.error("[import-backup]",M),window.showToast("Gagal memulihkan data: "+M.message,"error")}})},0)}catch(k){console.error("[parse-backup]",k),window.showToast("File JSON rusak atau tidak terbaca!","error")}},b.readAsText(d),o.target.value=""}),(s=document.getElementById("btn-save-settings"))==null||s.addEventListener("click",async()=>{const o=["shopName","shopAddress","shopPhone","cashierName","taxRate","bankName","bankNumber","bankHolder","printerUrl","printerPaper","qrisNumber"],d={};for(const b of o){const x=document.getElementById(`set-${b}`);x&&(d[b]=b==="taxRate"?parseFloat(x.value)||0:x.value.trim(),await It(b,d[b]))}g.updateSettings(d),window.showToast("Pengaturan berhasil disimpan","success")}),(a=document.getElementById("btn-test-print"))==null||a.addEventListener("click",()=>{se()}),(i=document.getElementById("btn-printer-guide"))==null||i.addEventListener("click",()=>{Be()}),(r=document.getElementById("btn-install-pwa"))==null||r.addEventListener("click",()=>{window._pwaPrompt?window._pwaPrompt.prompt():window.showToast("Buka di Chrome / Edge untuk meng-install aplikasi ini","info")}),(l=document.getElementById("btn-clear-cache"))==null||l.addEventListener("click",async()=>{try{if("caches"in window){const o=await caches.keys();await Promise.all(o.map(d=>caches.delete(d)))}if("serviceWorker"in navigator){const o=await navigator.serviceWorker.getRegistrations();for(const d of o)await d.unregister()}window.showToast("Cache dihapus. Memperbarui...","success"),setTimeout(()=>window.location.reload(),1e3)}catch(o){console.error("[cache]",o),window.showToast("Gagal hapus cache","error")}}),(p=document.getElementById("btn-reset-all"))==null||p.addEventListener("click",async()=>{if(confirm(`⚠️ HAPUS SEMUA DATA?

Semua transaksi, pengeluaran, dan produk akan dihapus permanen.
Tindakan ini TIDAK dapat dibatalkan!`))try{await Vt(),window.showToast("Semua data berhasil dihapus. Reloading...","error"),setTimeout(()=>window.location.reload(),1500)}catch(d){console.error("[reset]",d),window.showToast("Gagal menghapus data","error")}})},Be=()=>{z(`
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
  `,"printer-guide"),setTimeout(()=>{var e,n;(e=document.getElementById("pg-close"))==null||e.addEventListener("click",()=>I("printer-guide")),(n=document.getElementById("pg-close2"))==null||n.addEventListener("click",()=>I("printer-guide"))},0)};let rt=null,dt=null,O=!1;const Le=async()=>{rt&&rt(),dt&&dt(),rt=g.on("transactions:change",()=>{O||K()}),dt=g.on("expenses:change",()=>{O||K()}),await K()},K=async()=>{if(!O){O=!0;try{const t=document.getElementById("view-finance");if(!t)return;const[e,n,s]=await Promise.all([g.state.transactions.length?Promise.resolve(g.state.transactions):tt().then(m=>(g.setTransactions(m),m)),Pt().then(m=>(g.setExpenses(m),m)),pt("modalAwal")]),a=parseFloat(s)||0;let i=0,r=0,l=0,p=0,o=0;for(const m of e)if(m.paymentMethod==="cash"&&(m.paymentStatus==="paid"||!m.paymentStatus)&&(i+=m.total),m.paymentMethod==="transfer"&&(m.paymentStatus==="transfer_confirmed"?r+=m.total:p+=m.total),m.paymentMethod==="debt"){for(const T of m.debtPayments||[])l+=T.amount;o+=m.remainingDebt||0}const d=i+r+l,b=n.reduce((m,T)=>m+(T.amount||0),0),x=a+d-b,$=p+o,S=Ae(e,n),k=Ne(e,n),w=[...e.filter(m=>m.paymentStatus==="transfer_pending"),...e.filter(m=>(m.paymentMethod==="debt"||m.paymentStatus==="partial"||m.paymentStatus==="unpaid")&&(m.remainingDebt||0)>0)].sort((m,T)=>new Date(m.date)-new Date(T.date));t.innerHTML=`
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${u(a)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div class="stat-card" style="border-left:4px solid #16a34a">
          <span class="stat-card__icon">💵</span>
          <div class="stat-card__value" style="color:#16a34a">${u(x)}</div>
          <div class="stat-card__label">Saldo Kas Bersih</div>
          <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--blue-500)">
          <span class="stat-card__icon">📥</span>
          <div class="stat-card__value">${u(d)}</div>
          <div class="stat-card__label">Total Kas Masuk</div>
          <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #dc2626">
          <span class="stat-card__icon">📤</span>
          <div class="stat-card__value" style="color:#dc2626">${u(b)}</div>
          <div class="stat-card__label">Total Pengeluaran</div>
          <div class="stat-card__trend">${n.length} entri</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #d97706">
          <span class="stat-card__icon">📋</span>
          <div class="stat-card__value" style="color:#d97706">${u($)}</div>
          <div class="stat-card__label">Total Piutang</div>
          <div class="stat-card__trend">${w.length} belum lunas</div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          ${H("💵 Tunai",i,"#16a34a")}
          ${H("📲 Transfer",r,"#2563eb")}
          ${H("📋 Cicilan Hutang",l,"#7c3aed")}
          ${H("⏳ Transfer Pending",p,"#d97706",!0)}
          ${H("🔴 Piutang Hutang",o,"#dc2626",!0)}
        </div>
      </div>

      <!-- Piutang Outstanding -->
      ${w.length>0?`
      <div class="card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">⚠️ Daftar Piutang &amp; Cicilan Berjalan (${w.length})</div>
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
              ${w.map(m=>{const T=m.total||0,_=m.paymentStatus==="transfer_pending"?T:m.remainingDebt||0,f=T-_,v=Math.min(100,Math.max(0,Math.round(f/T*100))),c=(m.debtPayments||[]).length;return`
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${y(m.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${y(m.customerName||"—")}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                <td style="font-weight:700">${u(T)}</td>
                <td style="color:#16a34a;font-weight:700">${u(f)}</td>
                <td style="font-weight:800;color:#dc2626">${u(_)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${v}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${c>0?`${c}x cicilan`:"Belum ada"}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${v}%;background:${v===100?"#10b981":"#3b82f6"};border-radius:3px"></div>
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
                ${[...n].sort((m,T)=>new Date(T.date)-new Date(m.date)).map(m=>`
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(m.date).toLocaleDateString("id-ID")}</td>
                  <td><span class="badge badge--blue">${y(m.category||"Lainnya")}</span></td>
                  <td>${y(m.note||"—")}</td>
                  <td style="font-weight:800;color:#dc2626">${u(m.amount)}</td>
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
              ${Me(S,a)}
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
                <td style="font-size:12px">${y(m.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${m.debit>0?u(m.debit):"—"}</td>
                <td style="color:#dc2626;font-weight:700">${m.credit>0?u(m.credit):"—"}</td>
                <td><span class="badge ${m.type==="kas"?"badge--green":m.type==="piutang"?"":"badge--blue"}"
                  style="${m.type==="piutang"?"background:#fef3c7;color:#92400e":""}">${y(m.account)}</span></td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,ze(e)}finally{O=!1}}},H=(t,e,n,s=!1)=>`
  <div style="padding:10px 14px;background:${s?"#fef9c3":"var(--bg-elevated)"};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${t}</div>
    <div style="font-size:16px;font-weight:800;color:${n}">${u(e)}</div>
    ${s?'<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>':""}
  </div>
`,Ae=(t,e)=>{const n={};for(const a of t){const i=a.dateKey;if(i){if(n[i]||(n[i]={masuk:0,keluar:0}),a.paymentMethod==="cash"&&(a.paymentStatus==="paid"||!a.paymentStatus)&&(n[i].masuk+=a.total),a.paymentMethod==="transfer"&&a.paymentStatus==="transfer_confirmed"){const r=a.confirmedAt?a.confirmedAt.split("T")[0]:i;n[r]||(n[r]={masuk:0,keluar:0}),n[r].masuk+=a.total}if(a.paymentMethod==="debt")for(const r of a.debtPayments||[]){const l=r.date?r.date.split("T")[0]:i;n[l]||(n[l]={masuk:0,keluar:0}),n[l].masuk+=r.amount}}}for(const a of e){const i=a.dateKey||(a.date?a.date.split("T")[0]:null);i&&(n[i]||(n[i]={masuk:0,keluar:0}),n[i].keluar+=a.amount||0)}const s=[];for(let a=29;a>=0;a--){const i=new Date;i.setDate(i.getDate()-a);const r=i.toISOString().split("T")[0];s.push({key:r,...n[r]||{masuk:0,keluar:0}})}return s},Me=(t,e)=>{let n=e;const s=t.filter(a=>a.masuk>0||a.keluar>0).map(a=>{const i=a.masuk-a.keluar;return n+=i,`
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(a.key).toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short"})}</td>
      <td style="color:#16a34a;font-weight:700">${a.masuk>0?u(a.masuk):"—"}</td>
      <td style="color:#dc2626;font-weight:700">${a.keluar>0?u(a.keluar):"—"}</td>
      <td style="font-weight:800;color:${i>=0?"#16a34a":"#dc2626"}">${i>=0?"+":""}${u(i)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${u(n)}</td>
    </tr>`});return s.length?s.join(""):'<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>'},Ne=(t,e)=>{const n=[];for(const s of t){const a=y(s.customerName||"Pelanggan");if(s.paymentMethod==="cash")n.push({date:s.date,desc:`Penjualan Tunai — ${s.invoiceNo} (${a})`,debit:s.total,credit:s.total,account:"Kas / Penjualan",type:"kas"});else if(s.paymentMethod==="transfer")s.paymentStatus==="transfer_confirmed"?n.push({date:s.confirmedAt||s.date,desc:`Transfer Terkonfirmasi — ${s.invoiceNo} (${a})`,debit:s.total,credit:s.total,account:"Bank / Penjualan",type:"kas"}):n.push({date:s.date,desc:`Transfer Pending — ${s.invoiceNo} (${a}) [Menunggu Konfirmasi]`,debit:s.total,credit:s.total,account:"Piutang Transfer",type:"piutang"});else if(s.paymentMethod==="debt"){n.push({date:s.date,desc:`Penjualan Piutang Usaha — ${s.invoiceNo} (${a}) [Total Tagihan: ${u(s.total)}]`,debit:s.total,credit:s.total,account:"Piutang / Penjualan",type:"piutang"});const i=s.debtPayments||[];let r=0;i.forEach((l,p)=>{r+=l.amount||0;const o=Math.max(0,s.total-r),d=o===0,b=p+1,x=d?`Pelunasan (#${b}/LUNAS ✅)`:`Cicilan #${b} (dari ${i.length})`,$=l.note?` — ${y(l.note)}`:"";n.push({date:l.date,desc:`${x} — ${s.invoiceNo} (${a})${$} [Bayar: ${u(l.amount)} | Sisa: ${u(o)}]`,debit:l.amount,credit:l.amount,account:d?"Kas / Piutang (LUNAS ✅)":"Kas / Piutang Usaha",type:"kas"})})}}for(const s of e)n.push({date:s.date,desc:`Beban ${y(s.category||"Operasional")} — ${y(s.note||"Pengeluaran kas")}`,debit:s.amount,credit:s.amount,account:`Beban (${y(s.category||"Operasional")}) / Kas`,type:"beban"});return n.sort((s,a)=>new Date(a.date)-new Date(s.date))},ze=t=>{var e,n,s,a,i;(e=document.getElementById("btn-refresh-finance"))==null||e.addEventListener("click",K),(n=document.getElementById("btn-set-modal-awal"))==null||n.addEventListener("click",()=>{const l=`
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
    `;z(l,"modal-awal"),setTimeout(()=>{var p,o,d;(p=document.getElementById("ma-x"))==null||p.addEventListener("click",()=>I("modal-awal")),(o=document.getElementById("ma-cancel"))==null||o.addEventListener("click",()=>I("modal-awal")),(d=document.getElementById("ma-save"))==null||d.addEventListener("click",async()=>{var x;const b=parseFloat((x=document.getElementById("modal-awal-input"))==null?void 0:x.value)||0;await It("modalAwal",b),g.updateSettings({modalAwal:b}),I("modal-awal"),window.showToast("Modal Awal disimpan!","success"),K()})},0)}),(s=document.getElementById("btn-add-expense"))==null||s.addEventListener("click",()=>{const l=`
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
          <input type="number" class="input" id="exp-amount" placeholder="0" min="1" max="999999999" step="1000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="exp-cancel">Batal</button>
        <button class="btn btn--success" id="exp-save">💾 Simpan</button>
      </div>
    `;z(l,"expense-modal"),setTimeout(()=>{var p,o,d;(p=document.getElementById("exp-x"))==null||p.addEventListener("click",()=>I("expense-modal")),(o=document.getElementById("exp-cancel"))==null||o.addEventListener("click",()=>I("expense-modal")),(d=document.getElementById("exp-save"))==null||d.addEventListener("click",async()=>{var w,m,T,_;const b=parseFloat((w=document.getElementById("exp-amount"))==null?void 0:w.value)||0,x=((m=document.getElementById("exp-category"))==null?void 0:m.value)||"Lainnya",$=((_=(T=document.getElementById("exp-note"))==null?void 0:T.value)==null?void 0:_.trim())||"";if(b<=0){window.showToast("Jumlah harus lebih dari 0!","warning");return}const S=new Date().toISOString(),k={date:S,dateKey:S.split("T")[0],category:x,note:$,amount:b};try{const f=await Gt(k);k.id=f,g.addExpense(k),I("expense-modal"),window.showToast("Pengeluaran dicatat!","success")}catch(f){console.error("[expense]",f),window.showToast("Gagal simpan pengeluaran","error")}})},0)}),(a=document.getElementById("expense-table"))==null||a.addEventListener("click",async r=>{const l=r.target.closest('[data-action="delete-expense"]');if(!l||!confirm("Hapus pengeluaran ini?"))return;const p=parseInt(l.dataset.id);try{await Jt(p),g.removeExpense(p),window.showToast("Pengeluaran dihapus","success")}catch(o){console.error("[expense]",o),window.showToast("Gagal hapus","error")}}),(i=document.getElementById("piutang-table"))==null||i.addEventListener("click",async r=>{const l=r.target.closest("[data-action]");if(!l)return;const p=parseInt(l.dataset.id),o=l.dataset.action,d=(g.state.transactions||t).find(b=>b.id===p);if(d){if(o==="confirm-transfer"){if(!confirm(`Konfirmasi transfer ${u(d.total)} dari ${y(d.customerName||"pelanggan")} sudah diterima?`))return;const b={...d,paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:new Date().toISOString()};try{await X(b),g.updateTransaction(p,{paymentStatus:"transfer_confirmed",paidAmount:d.total,confirmedAt:b.confirmedAt}),window.showToast("Transfer dikonfirmasi! Kas bertambah.","success")}catch(x){console.error("[confirm]",x),window.showToast("Gagal konfirmasi","error")}}if(o==="pay-debt"){const b=d.remainingDebt||0,x=`
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${u(d.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${u(b)}</div>
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
      `;z(x,"mini-cicil"),setTimeout(()=>{var $,S,k;($=document.getElementById("mc-x"))==null||$.addEventListener("click",()=>I("mini-cicil")),(S=document.getElementById("mc-cancel"))==null||S.addEventListener("click",()=>I("mini-cicil")),(k=document.getElementById("mc-save"))==null||k.addEventListener("click",async()=>{var L,A,N;const w=parseFloat((L=document.getElementById("mc-amount"))==null?void 0:L.value)||0;if(w<=0||w>b){window.showToast("Jumlah tidak valid","warning");return}const m=(d.paidAmount||0)+w,T=Math.max(0,b-w),_=T===0?"paid":"partial",f=(d.debtPayments||[]).length+1,v=T===0?`Pelunasan (#${f}/LUNAS ✅)`:`Cicilan #${f}`,c=((N=(A=document.getElementById("mc-note"))==null?void 0:A.value)==null?void 0:N.trim())||v,h=[...d.debtPayments||[],{date:new Date().toISOString(),amount:w,note:c}],P={...d,paidAmount:m,remainingDebt:T,paymentStatus:_,debtPayments:h};try{await X(P),g.updateTransaction(p,{paidAmount:m,remainingDebt:T,paymentStatus:_,debtPayments:h}),I("mini-cicil"),window.showToast(T===0?"🎉 Hutang LUNAS!":`Cicilan #${f} (${u(w)}) dicatat`,"success")}catch(M){console.error("[cicil]",M),window.showToast("Gagal simpan cicilan","error")}})},0)}}})};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window._pwaPrompt=t});const ht=()=>{const t=document.getElementById("status-badge");t&&(navigator.onLine?(t.textContent="Sistem Online",t.classList.remove("status-badge--offline")):(t.textContent="Mode Offline",t.classList.add("status-badge--offline")))};window.addEventListener("online",ht);window.addEventListener("offline",ht);window.showToast=(t,e="info",n="")=>{const s=document.getElementById("toast-container");if(!s)return;const a={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"},i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role","alert"),i.innerHTML=`
    <span class="toast__icon">${a[e]??"ℹ️"}</span>
    <div class="toast__text">
      ${n?`<div class="toast__title">${n}</div>`:""}
      <div class="toast__msg">${t}</div>
    </div>
  `,s.appendChild(i);const r=()=>{i.classList.add("hiding"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},l=setTimeout(r,3500);i.addEventListener("click",()=>{clearTimeout(l),r()})};const Tt=()=>{const t=document.getElementById("topbar-time"),e=document.getElementById("topbar-date");t&&(t.textContent=Bt()),e&&(e.textContent=Zt())},Ce={pos:{init:re,refresh:pe},products:{init:me,refresh:at},transactions:{init:fe,refresh:zt},reports:{init:we,refresh:bt},settings:{init:Ee,refresh:yt},finance:{init:Le,refresh:K}},St=new Set,_t=async t=>{const e=Ce[t];if(e){document.querySelectorAll(".dock-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)}),document.querySelectorAll(".view").forEach(n=>{n.classList.toggle("active",n.id===`view-${t}`)});try{St.has(t)?await e.refresh():(await e.init(),St.add(t)),sessionStorage.setItem("activeView",t)}catch(n){console.error(`[Navigation] Error initializing view "${t}":`,n);const s=document.getElementById(`view-${t}`);s&&!s.children.length&&(s.innerHTML=`
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
      `)}g.navigate(t)}},je=(t,e)=>{if(!t)return;const n=t.getBoundingClientRect(),s=Math.max(n.width,n.height),a=document.createElement("span");a.className="ripple-effect",a.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-n.left-s/2}px;top:${e.clientY-n.top-s/2}px`,t.style.position="relative",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0})},Rt=t=>{const e=(t==null?void 0:t.shopName)||"Blue Mountain Refilling Station";document.title=`${e} — Kasir POS`};g.on("settings:change",Rt);document.addEventListener("focusin",t=>{t.target instanceof HTMLInputElement&&(t.target.type==="number"||t.target.inputMode==="numeric"||t.target.classList.contains("discount-input"))&&setTimeout(()=>{try{t.target.select()}catch{}},25)});const De=async()=>{try{await Xt(),await Wt()}catch(f){console.error("[DB] Failed to open database:",f),window.showToast("Database gagal dibuka. Coba reload halaman.","error","Database Error");return}const t=["shopName","shopAddress","shopPhone","cashierName","printEnabled","taxRate","printerUrl","bankName","bankNumber","bankHolder","qrisNumber","modalAwal"],e={};for(const f of t){const v=await pt(f);v!==null&&(f==="modalAwal"||f==="taxRate"?e[f]=parseFloat(v)||0:e[f]=v)}g.updateSettings(e),Rt(g.state.settings),ht(),Tt(),setInterval(Tt,1e3);const n=document.querySelector(".dock"),s=[...document.querySelectorAll(".dock-item")],a=()=>window.innerWidth<600,i=()=>window.innerWidth>=600&&window.innerWidth<=1024,r=()=>a()?1.25:i()?1.38:1.52,l=()=>a()?8:i()?12:18,p=()=>a()?90:140,o=s.map(()=>1),d=s.map(()=>1);let b=null;const x=(f,v,c)=>f+(v-f)*c,$=.24,S=()=>{let f=!1;const v=r(),c=l();s.forEach((h,P)=>{o[P]=x(o[P],d[P],$),Math.abs(o[P]-d[P])>5e-4?f=!0:o[P]=d[P];const L=o[P],A=(L-1)/(v-1||1)*c;h.style.transform=`translate3d(0, ${-A.toFixed(2)}px, 0) scale(${L.toFixed(4)})`,h.style.zIndex=L>1.02?Math.round(L*20):""}),b=f?requestAnimationFrame(S):null},k=()=>{b||(b=requestAnimationFrame(S))},w=f=>{const v=r(),c=p();s.forEach((h,P)=>{const L=h.getBoundingClientRect(),A=L.left+L.width/2,N=Math.abs(f-A);if(N<c){const M=Math.cos(N/c*(Math.PI/2));d[P]=1+(v-1)*M*M}else d[P]=1})},m=()=>{s.forEach((f,v)=>{d[v]=1})};n==null||n.addEventListener("mousemove",f=>{w(f.clientX),k()},{passive:!0}),n==null||n.addEventListener("mouseleave",()=>{m(),k()});const T=f=>{!f.touches||!f.touches[0]||(w(f.touches[0].clientX),k())};n==null||n.addEventListener("touchstart",T,{passive:!0}),n==null||n.addEventListener("touchmove",T,{passive:!0}),n==null||n.addEventListener("touchend",()=>{setTimeout(()=>{m(),k()},250)},{passive:!0}),n==null||n.addEventListener("touchcancel",()=>{m(),k()},{passive:!0}),s.forEach((f,v)=>{f.addEventListener("focus",()=>{s.forEach((c,h)=>{const P=Math.abs(h-v);d[h]=P===0?1.35:P===1?1.12:1}),k()}),f.addEventListener("blur",()=>{m(),k()}),f.addEventListener("keydown",c=>{var h,P;c.key==="ArrowRight"?(c.preventDefault(),(s[v+1]||s[0]).focus()):c.key==="ArrowLeft"?(c.preventDefault(),(s[v-1]||s[s.length-1]).focus()):c.key==="Home"?(c.preventDefault(),(h=s[0])==null||h.focus()):c.key==="End"&&(c.preventDefault(),(P=s[s.length-1])==null||P.focus())})}),s.forEach(f=>{f.addEventListener("click",async v=>{const c=f.dataset.view;c&&(f.classList.remove("bouncing"),f.offsetWidth,f.classList.add("bouncing"),f.addEventListener("animationend",()=>f.classList.remove("bouncing"),{once:!0}),je(f.querySelector(".dock-icon"),v),await _t(c))})});const _=sessionStorage.getItem("activeView")||"pos";await _t(_)};document.addEventListener("DOMContentLoaded",De);
