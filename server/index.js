import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 3001;

// Initialize Supabase client
// Note: In production, these should be environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.use(cors());
app.use(express.json());

// Example route: Get all products
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Example route: Create an order
app.post('/api/orders', async (req, res) => {
  const { userId, items, total } = req.body;
  
  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id: userId, total, status: 'pending' }])
    .select()
    .single();

  if (orderError) return res.status(500).json({ error: orderError.message });

  // 2. Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price_at_time: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) return res.status(500).json({ error: itemsError.message });

  res.json({ success: true, orderId: order.id });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});