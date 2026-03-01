# Redux Store Usage Guide

This guide explains how to use Redux in your project to avoid prop drilling.

## 📁 Store Structure

```
src/store/
├── store.ts              # Main Redux store configuration
├── ReduxProvider.tsx     # Provider component (wraps app)
├── hooks.ts              # Typed hooks for Redux
└── slices/
    ├── productsSlice.ts      # Products state management
    ├── testimonialsSlice.ts   # Testimonials state management
    ├── uiSlice.ts             # UI state (menus, notifications, etc.)
    └── homeSlice.ts           # Home page data
```

## 🚀 Quick Start

### 1. Using Redux in Any Component

```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';

function MyComponent() {
  const dispatch = useAppDispatch();

  // Read from store
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);

  // Dispatch actions
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <div>...</div>;
}
```

## 📦 Available Slices

### Products Slice

**State:**
- `products`: All products array
- `featuredProducts`: Featured products array
- `currentProduct`: Currently viewed product
- `loading`: Loading state
- `error`: Error message

**Actions:**
- `fetchProducts()`: Fetch all products
- `fetchFeaturedProducts()`: Fetch featured products
- `fetchProductBySlug(slug)`: Fetch single product
- `clearCurrentProduct()`: Clear current product
- `setProducts(products)`: Manually set products

**Usage:**
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchProducts, fetchProductBySlug } from '../store/slices/productsSlice';

// In component
const dispatch = useAppDispatch();
const products = useAppSelector((state) => state.products.products);
const loading = useAppSelector((state) => state.products.loading);

// Fetch products
useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);

// Fetch single product
dispatch(fetchProductBySlug('steel-i-beams'));
```

### Testimonials Slice

**State:**
- `testimonials`: All testimonials
- `featuredTestimonials`: Featured testimonials
- `loading`: Loading state
- `error`: Error message

**Actions:**
- `fetchTestimonials(params?)`: Fetch all testimonials
- `fetchFeaturedTestimonials(limit?)`: Fetch featured testimonials
- `setTestimonials(testimonials)`: Manually set testimonials

**Usage:**
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchFeaturedTestimonials } from '../store/slices/testimonialsSlice';

const dispatch = useAppDispatch();
const testimonials = useAppSelector((state) => state.testimonials.featuredTestimonials);

useEffect(() => {
  dispatch(fetchFeaturedTestimonials(3));
}, [dispatch]);
```

### UI Slice

**State:**
- `sidebarOpen`: Sidebar open state
- `mobileMenuOpen`: Mobile menu open state
- `loading`: Global loading state
- `theme`: Current theme ('light' | 'dark')
- `notifications`: Array of notifications

**Actions:**
- `toggleMobileMenu()`: Toggle mobile menu
- `setMobileMenuOpen(boolean)`: Set mobile menu state
- `setLoading(boolean)`: Set global loading
- `addNotification({ message, type })`: Add notification
- `removeNotification(id)`: Remove notification
- `clearNotifications()`: Clear all notifications

**Usage:**
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleMobileMenu, addNotification } from '../store/slices/uiSlice';

const dispatch = useAppDispatch();
const isMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);

// Toggle menu
const handleMenuClick = () => {
  dispatch(toggleMobileMenu());
};

// Show notification
dispatch(addNotification({
  message: 'Product added successfully!',
  type: 'success'
}));
```

### Home Slice

**State:**
- `data`: Home page data object
- `loading`: Loading state
- `error`: Error message

**Actions:**
- `fetchHomeData()`: Fetch home page data
- `setHomeData(data)`: Manually set home data
- `clearHomeData()`: Clear home data

**Usage:**
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchHomeData } from '../store/slices/homeSlice';

const dispatch = useAppDispatch();
const homeData = useAppSelector((state) => state.home.data);

useEffect(() => {
  dispatch(fetchHomeData());
}, [dispatch]);
```

## 🔄 Converting Components to Use Redux

### Before (With Prop Drilling):
```typescript
// Parent Component
function Parent() {
  const [products, setProducts] = useState([]);
  return <Child products={products} setProducts={setProducts} />;
}

// Child Component
function Child({ products, setProducts }) {
  return <GrandChild products={products} />;
}

// Grandchild Component
function GrandChild({ products }) {
  return <div>{products.length} products</div>;
}
```

### After (With Redux):
```typescript
// Parent Component
function Parent() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return <Child />;
}

// Child Component
function Child() {
  return <GrandChild />;
}

// Grandchild Component
function GrandChild() {
  const products = useAppSelector((state) => state.products.products);
  return <div>{products.length} products</div>;
}
```

## 📝 Examples

### Example 1: Products Page
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Product Detail Page
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchProductBySlug, clearCurrentProduct } from '../store/slices/productsSlice';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();

  const { currentProduct, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug as string));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [slug, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!currentProduct) return <div>Product not found</div>;

  return <div>{currentProduct.name}</div>;
}
```

### Example 3: Using UI State (Mobile Menu)
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleMobileMenu } from '../store/slices/uiSlice';

export default function MobileMenu() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.mobileMenuOpen);

  return (
    <button onClick={() => dispatch(toggleMobileMenu())}>
      {isOpen ? 'Close' : 'Open'} Menu
    </button>
  );
}
```

### Example 4: Showing Notifications
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addNotification, removeNotification } from '../store/slices/uiSlice';

export default function MyComponent() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  const handleSuccess = () => {
    dispatch(addNotification({
      message: 'Operation successful!',
      type: 'success'
    }));

    // Auto-remove after 3 seconds
    setTimeout(() => {
      dispatch(removeNotification(notifications[notifications.length - 1].id));
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleSuccess}>Do Something</button>
      {notifications.map(notif => (
        <div key={notif.id} className={`alert-${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  );
}
```

## 🎯 Best Practices

1. **Use Typed Hooks**: Always use `useAppSelector` and `useAppDispatch` instead of plain `useSelector` and `useDispatch`

2. **Select Only What You Need**:
   ```typescript
   // ❌ Bad - selects entire state
   const productsState = useAppSelector((state) => state.products);

   // ✅ Good - selects only needed data
   const products = useAppSelector((state) => state.products.products);
   const loading = useAppSelector((state) => state.products.loading);
   ```

3. **Memoize Selectors for Complex Data**:
   ```typescript
   import { useMemo } from 'react';

   const expensiveComputation = useMemo(() => {
     const products = useAppSelector((state) => state.products.products);
     return products.filter(p => p.featured).sort((a, b) => a.name.localeCompare(b.name));
   }, [products]);
   ```

4. **Dispatch Actions in useEffect**:
   ```typescript
   useEffect(() => {
     dispatch(fetchProducts());
   }, [dispatch]); // dispatch is stable, won't cause re-renders
   ```

5. **Clean Up on Unmount**:
   ```typescript
   useEffect(() => {
     dispatch(fetchProductBySlug(slug));
     return () => {
       dispatch(clearCurrentProduct()); // Cleanup
     };
   }, [slug, dispatch]);
   ```

## 🔍 Accessing Store in Non-React Code

If you need to access the store outside React components:

```typescript
import { store } from '../store/store';

// Get current state
const state = store.getState();
const products = state.products.products;

// Dispatch action
store.dispatch(fetchProducts());
```

## ✅ Benefits of This Setup

- ✅ **No Prop Drilling**: Access state from any component
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Centralized State**: Single source of truth
- ✅ **DevTools**: Redux DevTools support
- ✅ **Performance**: Only re-renders when relevant state changes
- ✅ **Testability**: Easy to test with mocked store

## 🐛 Debugging

Install Redux DevTools browser extension to inspect your Redux state and actions in real-time!

