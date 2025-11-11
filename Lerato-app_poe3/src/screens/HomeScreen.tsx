import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';

export default function HomeScreen({ navigation }: any) {
  const { getTotalItems, getAllAveragePrices } = useMenu();

  const averagePrices = getAllAveragePrices();

  const getCourseColor = (course: string) => {
    switch(course) {
      case 'Appetizers': return '#FF6B6B';
      case 'Main Courses': return '#4ECDC4';
      case 'Desserts': return '#FFA07A';
      case 'Beverages': return '#9B59B6';
      default: return '#95A5A6';
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Chef Profile */}
        <View style={styles.chefSection}>
          <Image 
            source={require('../assets/images/chef1.webp')}
            style={styles.chefAvatar}
          />
          <View style={styles.chefInfo}>
            <Text style={styles.chefTitle}>Master Chef</Text>
            <Text style={styles.chefSubtitle}>Menu Dashboard</Text>
          </View>
          <View style={styles.statsBadge}>
            <Text style={styles.statsNumber}>{getTotalItems()}</Text>
            <Text style={styles.statsLabel}>Items</Text>
          </View>
        </View>

        {/* Average Prices Section */}
        <View style={styles.averageSection}>
          <Text style={styles.averageTitle}>Average Prices by Course</Text>
          
          {averagePrices.length === 0 ? (
            <View style={styles.emptyAverage}>
              <Text style={styles.emptyAverageText}>
                No items added yet. Start building your menu!
              </Text>
            </View>
          ) : (
            <View style={styles.averageGrid}>
              {averagePrices.map((item) => (
                <View 
                  key={item.course} 
                  style={[
                    styles.averageCard,
                    { borderLeftColor: getCourseColor(item.course) }
                  ]}
                >
                  <View style={styles.averageCardHeader}>
                    <View 
                      style={[
                        styles.courseIndicator,
                        { backgroundColor: getCourseColor(item.course) }
                      ]} 
                    />
                    <Text style={styles.averageCourseName}>{item.course}</Text>
                  </View>
                  <Text style={styles.averagePrice}>${item.average}</Text>
                  <Text style={styles.averageCount}>{item.count} item{item.count > 1 ? 's' : ''}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('ManageMenu')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.actionIconText}>+</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Manage Menu</Text>
              <Text style={styles.actionSubtitle}>Add or remove menu items</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('AddMenu')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.actionIconText}>✎</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Create Custom Dish</Text>
              <Text style={styles.actionSubtitle}>Design your own menu item</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('My Menu')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#9B59B6' }]}>
              <Text style={styles.actionIconText}>☰</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>View Full Menu</Text>
              <Text style={styles.actionSubtitle}>See all your menu items</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('FilterMenu')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFA07A' }]}>
              <Text style={styles.actionIconText}>⚡</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Filter Menu</Text>
              <Text style={styles.actionSubtitle}>Browse by course type</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  
  chefSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  chefAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  
  chefInfo: {
    flex: 1,
    marginLeft: 15,
  },
  
  chefTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 2,
  },
  
  chefSubtitle: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  
  statsBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
  },
  
  statsNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  
  statsLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Average Prices Section
  averageSection: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  averageTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 15,
  },

  emptyAverage: {
    padding: 20,
    alignItems: 'center',
  },

  emptyAverageText: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
  },

  averageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  averageCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
  },

  averageCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  courseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  averageCourseName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D3436',
    textTransform: 'uppercase',
  },

  averagePrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 5,
  },

  averageCount: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '500',
  },

  // Actions Section
  actionsSection: {
    padding: 15,
    paddingBottom: 30,
  },

  actionsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 15,
  },

  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  actionIconText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 2,
  },

  actionSubtitle: {
    fontSize: 13,
    color: '#636E72',
  },

  actionArrow: {
    fontSize: 20,
    color: '#636E72',
    fontWeight: '300',
  },
});