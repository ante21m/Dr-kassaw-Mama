import { CreateServiceDto } from './dtos/service.dto';

export const seedServices: CreateServiceDto[] = [
  {
    name: 'Emergency Service',
    icon: 'ambulance',
    description: '24/7 rapid and professional emergency medical care',
    order: 1,
    image: '/uploads/images/hospital-1.jpg',
  },
  {
    name: 'Delivery Service',
    icon: 'baby',
    description: 'Safe and compassionate maternal and newborn care',
    order: 2,
    image: '/uploads/images/hospital-2.jpg',
  },
  {
    name: 'Laboratory Service',
    icon: 'flask',
    description: 'Accurate and reliable medical diagnostic services',
    order: 3,
    image: '/uploads/images/hospital-3.jpg',
  },
  {
    name: 'X-Ray Service',
    icon: 'scan',
    description: 'Modern digital X-ray diagnostic imaging',
    order: 4,
    image: '/uploads/images/hospital-4.jpg',
  },
  {
    name: 'Ultrasound Service',
    icon: 'radar',
    description: 'Safe and precise ultrasound diagnostic imaging',
    order: 5,
    image: '/uploads/images/hospital-5.jpg',
  },
  {
    name: 'CT Scan',
    icon: 'brain',
    description: 'High-resolution CT scan diagnostic imaging',
    order: 6,
    image: '/uploads/images/doctor-1.jpg',
  },
  {
    name: 'Surgical Service',
    icon: 'scissors',
    description: 'Minor and intermediate surgical procedures performed by expert surgeons',
    order: 7,
    image: '/uploads/images/doctor-2.jpg',
  },
  {
    name: 'ECG (Electrocardiogram)',
    icon: 'heart',
    description: 'Heart rhythm and electrical activity assessment',
    order: 8,
    image: '/uploads/images/doctor-3.jpg',
  },
];