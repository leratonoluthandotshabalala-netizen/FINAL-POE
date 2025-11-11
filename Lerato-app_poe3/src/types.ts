export type Course = 'Appetizers' | 'Main Courses' | 'Desserts' | 'Beverages';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: string;
};