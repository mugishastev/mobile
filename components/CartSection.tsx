import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Header Component
type HeaderProps = {
  cartCount: number;
};

export const Header: React.FC<HeaderProps> = ({ cartCount }) => (
  <View style={headerStyles.container}>
    <Text style={headerStyles.title}>Cart ({cartCount} items)</Text>
    <View style={headerStyles.trashContainer}>
      <MaterialIcons name="delete" size={20} color="#666" />
      <Text style={headerStyles.count}>({cartCount})</Text>
    </View>
  </View>
);

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  trashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});

// EmptyCart Component
export const EmptyCart = () => (
  <View style={emptyCartStyles.container}>
    <View style={emptyCartStyles.iconContainer}>
      <MaterialIcons name="shopping-cart" size={40} color="#999" />
    </View>
    <Text style={emptyCartStyles.title}>Your Cart is Empty</Text>
    <Text style={emptyCartStyles.subtitle}>
      If you hesitate to buy a product, add it first in your shopping cart.
    </Text>
  </View>
);

const emptyCartStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#e5e5e5',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: 280,
  },
});

// CartItem Component
type CartItemProps = {
  item: {
    id: number | string;
    name: string;
    price: string;
    image: string;
  };
  onRemove: (id: number | string) => void;
};

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => (
  <View style={cartItemStyles.container}>
    <View style={cartItemStyles.content}>
      <Text style={cartItemStyles.emoji}>{item.image}</Text>
      <View style={cartItemStyles.details}>
        <Text style={cartItemStyles.name}>{item.name}</Text>
        <Text style={cartItemStyles.price}>{item.price}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => onRemove(item.id)} style={cartItemStyles.removeButton}>
      <MaterialIcons name="delete" size={16} color="#ef4444" />
    </TouchableOpacity>
  </View>
);

const cartItemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f97316',
  },
  removeButton: {
    padding: 8,
  },
});

// SearchBar Component
export const SearchBar = () => (
  <View style={searchBarStyles.container}>
    <MaterialIcons name="search" size={20} color="#999" style={searchBarStyles.icon} />
    <TextInput
      placeholder="What are you looking for ?"
      style={searchBarStyles.input}
      placeholderTextColor="#999"
    />
  </View>
);

const searchBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

// ProductCard Component
type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <View style={productCardStyles.container}>
    {product.discount && (
      <View style={productCardStyles.discountBadge}>
        <Text style={productCardStyles.discountText}>-{product.discount}</Text>
      </View>
    )}
    <View style={productCardStyles.imageContainer}>
      <Text style={productCardStyles.emoji}>{product.image}</Text>
    </View>
    <View style={productCardStyles.details}>
      <Text style={productCardStyles.name} numberOfLines={2}>{product.name}</Text>
      <Text style={productCardStyles.price}>{product.price}</Text>
      <TouchableOpacity 
        style={productCardStyles.addButton}
        onPress={() => onAddToCart(product)}
      >
        <Text style={productCardStyles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const productCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomRightRadius: 8,
    zIndex: 10,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  details: {
    padding: 8,
  },
  name: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#f97316',
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
});

// ProductSection Component
type Product = {
  id: number | string;
  name: string;
  price: string;
  image: string;
  discount?: string;
};

type ProductSectionProps = {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  showViewAll?: boolean;
};

export const ProductSection: React.FC<ProductSectionProps> = ({ title, products, onAddToCart, showViewAll = true }) => (
  <View style={productSectionStyles.container}>
    <View style={productSectionStyles.header}>
      <Text style={productSectionStyles.title}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity>
          <Text style={productSectionStyles.viewAll}>All </Text>
        </TouchableOpacity>
      )}
    </View>
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductCard product={item} onAddToCart={onAddToCart} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={productSectionStyles.row}
      scrollEnabled={false}
    />
  </View>
);

const productSectionStyles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#f97316',
  },
  row: {
    justifyContent: 'space-between',
  },
});

// CategoryItem Component (used in CategoryGrid)
type Category = {
  icon: string;
  name: string;
};

const CategoryItem = ({ category }: { category: Category }) => (
  <TouchableOpacity style={categoryStyles.categoryItem}>
    <View style={categoryStyles.iconContainer}>
      <Text style={categoryStyles.emoji}>{category.icon}</Text>
    </View>
    <Text style={categoryStyles.categoryName}>{category.name}</Text>
  </TouchableOpacity>
);

// CategoryGrid Component
type CategoryGridProps = {
  categories: Category[];
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => (
  <View style={categoryStyles.container}>
    <View style={categoryStyles.header}>
      <Text style={categoryStyles.title}>Recommend</Text>
      <TouchableOpacity>
        <Text style={categoryStyles.viewAll}>All </Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategoryItem category={item} />}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      columnWrapperStyle={categoryStyles.row}
      scrollEnabled={false}
    />
  </View>
);

const categoryStyles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#f97316',
  },
  row: {
    justifyContent: 'space-around',
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});

// // BottomNavigation Component
// export const BottomNavigation = () => (
//   <View style={bottomNavStyles.container}>
//     <TouchableOpacity style={bottomNavStyles.tab}>
//       <MaterialIcons name="home" size={20} color="#666" />
//       <Text style={bottomNavStyles.inactiveText}>Home</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={bottomNavStyles.tab}>
//       <MaterialIcons name="grid-view" size={20} color="#f97316" />
//       <Text style={bottomNavStyles.activeText}>Category</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={bottomNavStyles.tab}>
//       <MaterialIcons name="shopping-cart" size={20} color="#f97316" />
//       <Text style={bottomNavStyles.activeText}>Cart</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={bottomNavStyles.tab}>
//       <MaterialIcons name="person" size={20} color="#666" />
//       <Text style={bottomNavStyles.inactiveText}>My KIKUU</Text>
//     </TouchableOpacity>
//   </View>
// );

// const bottomNavStyles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#e5e5e5',
//     paddingVertical: 8,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 4,
//   },
//   activeText: {
//     fontSize: 12,
//     color: '#f97316',
//     marginTop: 4,
//   },
//   inactiveText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
// });