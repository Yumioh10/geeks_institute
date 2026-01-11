// Define the types
type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

// Union type for all data types
type DataItem = User | Product | Order;

// Type guard functions
function isUser(item: DataItem): item is User {
  return item.type === 'user';
}

function isProduct(item: DataItem): item is Product {
  return item.type === 'product';
}

function isOrder(item: DataItem): item is Order {
  return item.type === 'order';
}

// Main handler function
function handleData(data: DataItem[]): string[] {
  return data.map(item => {
    // Handle each type with type guards
    if (isUser(item)) {
      return `Hello ${item.name}, you are ${item.age} years old.`;
    } else if (isProduct(item)) {
      return `Product #${item.id} costs $${item.price.toFixed(2)}.`;
    } else if (isOrder(item)) {
      return `Order ${item.orderId} has a total amount of $${item.amount.toFixed(2)}.`;
    } else {
      // This case should never happen with proper typing, but handles unexpected cases
      return 'Unknown data type encountered.';
    }
  });
}

// Example usage and testing
const mixedData: DataItem[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 29.99 },
  { type: 'order', orderId: 'ORD-12345', amount: 150.50 },
  { type: 'user', name: 'Bob', age: 25 },
  { type: 'product', id: 202, price: 99.99 },
];

// Process the data
const results = handleData(mixedData);

// Display results
console.log('Processing mixed data:');
console.log('='.repeat(50));
results.forEach((result, index) => {
  console.log(`${index + 1}. ${result}`);
});

// Export for use in other modules
export { User, Product, Order, DataItem, handleData, isUser, isProduct, isOrder };