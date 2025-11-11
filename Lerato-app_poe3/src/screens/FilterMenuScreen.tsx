import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const COURSES: Course[] = ['Appetizers', 'Main Courses', 'Desserts', 'Beverages'];

export default function FilterMenuScreen({ navigation }: any) {
  const { getItemsByCourse, getTotalItems } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Course | 'All'>('All');

  const getFilteredItems = () => {
    if (selectedCourse === 'All') {
      return COURSES.flatMap(course => getItemsByCourse(course));
    }
    return getItemsByCourse(selectedCourse);
  };

  const filteredItems = getFilteredItems();

  const getCourseColor = (course: string) => {
    switch(course) {
      case 'Appetizers': return '#FF6B6B';
      case 'Main Courses': return '#4ECDC4';
      case 'Desserts': return '#FFA07A';
      case 'Beverages': return '#9B59B6';
      default: return '#95A5A6';
    }
  };

  const renderMenuItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate('ItemDetails', { item })}
    >
      <View style={[styles.courseBar, { backgroundColor: getCourseColor(item.course) }]} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <View style={[styles.courseBadge, { backgroundColor: getCourseColor(item.course) + '20' }]}>
            <Text style={styles.courseLabel}>{item.course}</Text>
          </View>
          <Text style={styles.viewDetails}>View Details →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      
      {/* Filter Header */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Guest Menu</Text>
        <Text style={styles.filterSubtitle}>Filter by course type</Text>
      </View>

      {/* Course Filter Buttons - Grid Layout */}
      <View style={styles.filterGrid}>
        {/* First Row */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'All' && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCourse('All')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === 'All' && styles.filterButtonTextActive
            ]}>
              All ({getTotalItems()})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'Appetizers' && styles.filterButtonActive,
              { borderColor: getCourseColor('Appetizers') }
            ]}
            onPress={() => setSelectedCourse('Appetizers')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === 'Appetizers' && styles.filterButtonTextActive
            ]}>
              Appetizers ({getItemsByCourse('Appetizers').length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'Main Courses' && styles.filterButtonActive,
              { borderColor: getCourseColor('Main Courses') }
            ]}
            onPress={() => setSelectedCourse('Main Courses')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === 'Main Courses' && styles.filterButtonTextActive
            ]}>
              Main Courses ({getItemsByCourse('Main Courses').length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'Desserts' && styles.filterButtonActive,
              { borderColor: getCourseColor('Desserts') }
            ]}
            onPress={() => setSelectedCourse('Desserts')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === 'Desserts' && styles.filterButtonTextActive
            ]}>
              Desserts ({getItemsByCourse('Desserts').length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Third Row - Beverages centered */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              styles.beverageButton,
              selectedCourse === 'Beverages' && styles.filterButtonActive,
              { borderColor: getCourseColor('Beverages') }
            ]}
            onPress={() => setSelectedCourse('Beverages')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === 'Beverages' && styles.filterButtonTextActive
            ]}>
              Beverages ({getItemsByCourse('Beverages').length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items List */}
      {filteredItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No items in this course</Text>
          <Text style={styles.emptyText}>
            {selectedCourse === 'All' 
              ? 'No items have been added to the menu yet.'
              : `No ${selectedCourse.toLowerCase()} have been added yet.`
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },

  filterHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  filterTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 5,
  },

  filterSubtitle: {
    fontSize: 14,
    color: '#636E72',
  },

  filterGrid: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  filterButton: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 5,
    minHeight: 50,
  },

  beverageButton: {
    flex: 0.5, // Make beverage button smaller to center it
    alignSelf: 'center',
  },

  filterButtonActive: {
    backgroundColor: '#2D3436',
    borderColor: '#2D3436',
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
    textAlign: 'center',
  },

  filterButtonTextActive: {
    color: '#FFFFFF',
  },

  listContent: {
    padding: 15,
    paddingBottom: 30,
  },

  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  courseBar: {
    width: 5,
  },

  itemContent: {
    flex: 1,
    padding: 15,
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  itemName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#2D3436',
    marginRight: 10,
  },

  itemPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00B894',
  },

  itemDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
    marginBottom: 12,
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  courseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  courseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3436',
  },

  viewDetails: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636E72',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 15,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 22,
  },
});