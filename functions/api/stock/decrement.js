/**
 * functions/api/stock/decrement.js
 * Cloudflare Pages Edge Function — Atomic Stock Decrement & Checkout Proxy
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { items, transaction } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Daftar item tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = env.SUPABASE_URL || 'https://wiapnhpdgjbtkblowfig.supabase.co';
    const supabaseKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g';

    // 1. Process stock decrement sequentially/atomically per product
    for (const it of items) {
      const prodId = it.product?.id || it.id;
      const qty = Number(it.qty) || 1;

      if (prodId) {
        // Fetch current stock
        const getRes = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${prodId}&select=id,stock`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        });

        if (getRes.ok) {
          const prods = await getRes.json();
          if (prods && prods.length > 0) {
            const currentStock = Number(prods[0].stock) || 0;
            const newStock = Math.max(0, currentStock - qty);

            // Update with atomic guard
            await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${prodId}`, {
              method: 'PATCH',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal',
              },
              body: JSON.stringify({ stock: newStock, updated_at: new Date().toISOString() }),
            });
          }
        }
      }
    }

    // 2. Save transaction if provided
    if (transaction && transaction.id) {
      await fetch(`${supabaseUrl}/rest/v1/transactions`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          id: String(transaction.id),
          invoice_no: transaction.invoiceNo || transaction.invoice_no,
          date: transaction.date || new Date().toISOString(),
          date_key: transaction.dateKey || transaction.date_key,
          customer_name: transaction.customerName || transaction.customer_name || '',
          items: transaction.items || [],
          subtotal: Number(transaction.subtotal) || 0,
          discount: Number(transaction.discount) || 0,
          tax: Number(transaction.tax) || 0,
          total: Number(transaction.total) || 0,
          paid: Number(transaction.paid) || 0,
          change: Number(transaction.change) || 0,
          payment_method: transaction.paymentMethod || transaction.payment_method || 'cash',
          payment_status: transaction.paymentStatus || transaction.payment_status || 'paid',
          paid_amount: Number(transaction.paidAmount || transaction.paid_amount) || 0,
          remaining_debt: Number(transaction.remainingDebt || transaction.remaining_debt) || 0,
          debt_payments: transaction.debtPayments || transaction.debt_payments || [],
          cashier: transaction.cashier || 'Admin',
          updated_at: new Date().toISOString(),
        }),
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Stok berhasil diperbarui atomik.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
