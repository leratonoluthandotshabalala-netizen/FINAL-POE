import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const PREDEFINED_ITEMS = [
  // Appetizers
  { name: 'Truffle Arancini', description: 'Crispy risotto balls with black truffle', course: 'Appetizers' as Course, price: '12.99' },
  { name: 'Lobster Bisque', description: 'Creamy lobster soup with crème fraîche', course: 'Appetizers' as Course, price: '14.99' },
  { name: 'Beef Carpaccio', description: 'Thinly sliced beef with arugula and parmesan', course: 'Appetizers' as Course, price: '16.99' },

  // Main Courses
  { name: 'Wagyu Beef Tenderloin', description: 'Premium wagyu with red wine reduction', course: 'Main Courses' as Course, price: '45.99' },
  { name: 'Lobster Thermidor', description: 'Whole lobster in creamy brandy sauce', course: 'Main Courses' as Course, price: '38.99' },
  { name: 'Duck à l\'Orange', description: 'Roasted duck with orange glaze', course: 'Main Courses' as Course, price: '32.99' },

  // Desserts
  { name: 'Chocolate Soufflé', description: 'Warm chocolate soufflé with vanilla ice cream', course: 'Desserts' as Course, price: '11.99' },
  { name: 'Crème Brûlée Trio', description: 'Three flavors of classic crème brûlée', course: 'Desserts' as Course, price: '10.99' },
  { name: 'Berry Pavlova', description: 'Meringue with fresh berries and chantilly cream', course: 'Desserts' as Course, price: '9.99' },

  // Beverages
  { name: 'Aged Scotch Flight', description: 'Three premium aged scotch whiskies', course: 'Beverages' as Course, price: '25.99' },
  { name: 'Wine Pairing Flight', description: 'Curated wine selections by course', course: 'Beverages' as Course, price: '22.99' },
  { name: 'Craft Cocktail Selection', description: 'Signature cocktails by our mixologist', course: 'Beverages' as Course, price: '14.99' },
];

export default function ManageMenuScreen({ navigation }: any) {
  const { items, addItem, removeItem } = useMenu();

  const handleAddItem = (item: any) => {
    addItem(item);
    Alert.alert('Success', `"${item.name}" has been added to your menu!`);
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${itemName}" from your menu?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            removeItem(itemId);
            Alert.alert('Removed', `"${itemName}" has been removed from your menu.`);
          }
        }
      ]
    );
  };

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  const renderPredefinedItem = ({ item }: any) => (
    <View style={styles.gridItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCourse}>{item.course}</Text>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <TouchableOpacity 
          style={[
            styles.addBtn,
            isItemAdded(item.name) && styles.addedBtn
          ]}
          onPress={() => handleAddItem(item)}
          disabled={isItemAdded(item.name)}
        >
          <Text style={styles.addBtnText}>
            {isItemAdded(item.name) ? 'Added ✓' : 'Add +'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddedItem = ({ item }: any) => (
    <View style={styles.addedItem}>
      <View style={styles.addedItemContent}>
        <View style={styles.addedItemInfo}>
          <Text style={styles.addedItemName}>{item.name}</Text>
          <Text style={styles.addedItemDetails}>{item.course} • ${item.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.removeBtn}
          onPress={() => handleRemoveItem(item.id, item.name)}
        >
          <Text style={styles.removeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section des items ajoutés */}
        {items.length > 0 && (
          <View style={styles.addedSection}>
            <Text style={styles.sectionTitle}>Your Menu Items ({items.length})</Text>
            <Text style={styles.sectionSubtitle}>Tap ✕ to remove items</Text>
            <FlatList
              data={items}
              renderItem={renderAddedItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.addedList}
            />
          </View>
        )}

        {/* Catalogue des plats prédéfinis */}
        <View style={styles.catalogSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add from Catalog</Text>
            <Text style={styles.sectionSubtitle}>Select dishes to add to your menu</Text>
          </View>
          
          <FlatList
            data={PREDEFINED_ITEMS}
            renderItem={renderPredefinedItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.grid}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Bouton pour créer un nouveau plat */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddMenu')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  
  addedSection: {
    backgroundColor: '#E8F4F8',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  
  sectionHeader: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 5,
  },
  
  sectionSubtitle: {
    fontSize: 14,
    color: '#636E72',
  },
  
  addedList: {
    marginTop: 10,
  },
  
  addedItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginRight: 10,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  addedItemContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  
  addedItemInfo: {
    flex: 1,
  },
  
  addedItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  
  addedItemDetails: {
    fontSize: 12,
    color: '#636E72',
  },
  
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  
  removeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  
  catalogSection: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  
  grid: {
    paddingBottom: 20,
  },
  
  gridItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 6,
    padding: 15,
    borderRadius: 12,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  
  itemHeader: {
    marginBottom: 8,
  },
  
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 2,
  },
  
  itemCourse: {
    fontSize: 11,
    color: '#FF6B6B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  
  itemDescription: {
    fontSize: 12,
    color: '#636E72',
    lineHeight: 16,
    marginBottom: 12,
    flex: 1,
  },
  
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00B894',
  },
  
  addBtn: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  
  addedBtn: {
    backgroundColor: '#00B894',
  },
  
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  fabText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
  },
});