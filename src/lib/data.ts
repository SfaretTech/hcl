
import { type Doctor, availableDoctors } from "@/components/schedule-appointment-form";
import { z } from "zod";

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Canceled';
export type Appointment = {
    id: string;
    patientName: string;
    doctor: Doctor;
    date: string;
    status: AppointmentStatus;
    notes: string;
    joinLink: string;
    isPaid: boolean;
    fee: number;
};

export const allAppointments: Appointment[] = [
    {
        id: 'appt-1',
        patientName: 'Jessica Peterson',
        doctor: availableDoctors[0],
        date: '2024-08-26T11:00:00',
        status: 'Confirmed' as const,
        notes: 'Follow-up regarding your recent test results. Please ensure you have them available.',
        joinLink: '#',
        isPaid: false,
        fee: 15000,
    },
    {
        id: 'appt-2',
        patientName: 'Jessica Peterson',
        doctor: availableDoctors[1],
        date: '2024-09-05T14:30:00',
        status: 'Confirmed' as const,
        notes: 'Initial consultation for your skin concerns.',
        joinLink: '#',
        isPaid: true,
        fee: 20000,
    },
     {
        id: 'appt-3',
        patientName: 'Jessica Peterson',
        doctor: availableDoctors[2],
        date: '2024-07-15T10:00:00',
        status: 'Completed' as const,
        notes: 'Discussed statin medication options. Follow-up in 6 months.',
        joinLink: '#',
        isPaid: true,
        fee: 0,
    },
     {
        id: 'appt-4',
        patientName: 'Jessica Peterson',
        doctor: availableDoctors[0],
        date: '2024-06-20T09:00:00',
        status: 'Completed' as const,
        notes: 'Annual physical check-up. All vitals are normal.',
        joinLink: '#',
        isPaid: true,
        fee: 15000,
    },
    {
        id: 'appt-5',
        patientName: 'Jessica Peterson',
        doctor: availableDoctors[3],
        date: '2024-05-18T15:00:00',
        status: 'Canceled' as const,
        notes: 'Canceled by patient.',
        joinLink: '#',
        isPaid: false,
        fee: 18000,
    }
];

// --- Health Records Data ---

export type DocumentType = 'Lab Report' | 'Prescription' | 'Imaging Result' | 'Consultation Note' | 'Other';

export type HealthRecord = {
    id: string;
    name: string;
    type: DocumentType;
    date: string;
    uploadedBy: 'Client' | 'Me' | 'Dr. Samuel Chen';
    fileUrl: string;
};

export type Patient = {
  id: string;
  name: string;
  avatar: string;
  records: HealthRecord[];
};

export const allPatients: Patient[] = [
    {
        id: 'pat-1',
        name: 'Jessica Peterson',
        avatar: 'https://placehold.co/100x100.png',
        records: [
            { id: 'rec-1', name: 'Annual Blood Panel Results', type: 'Lab Report', date: '2024-08-15T10:00:00', uploadedBy: 'Dr. Samuel Chen', fileUrl: '#' },
            { id: 'rec-2', name: 'Vitamin D Prescription', type: 'Prescription', date: '2024-08-10T14:30:00', uploadedBy: 'Dr. Samuel Chen', fileUrl: '#' },
            { id: 'rec-3', name: 'Follow-up Notes - August', type: 'Consultation Note', date: '2024-08-10T15:00:00', uploadedBy: 'Me', fileUrl: '#' },
            { id: 'rec-4', name: 'Chest X-Ray', type: 'Imaging Result', date: '2024-07-22T09:00:00', uploadedBy: 'Me', fileUrl: '#' },
        ]
    },
    {
        id: 'pat-2',
        name: 'David Lee',
        avatar: 'https://placehold.co/100x100.png',
        records: [
            { id: 'rec-5', name: 'Dermatology Follow-up', type: 'Consultation Note', date: '2024-08-20T11:00:00', uploadedBy: 'Dr. Samuel Chen', fileUrl: '#' },
        ]
    },
    {
        id: 'pat-3',
        name: 'Aisha Bello',
        avatar: 'https://placehold.co/100x100.png',
        records: []
    },
];

// Helper to find the main client's records
export const getClientRecords = (): HealthRecord[] => {
    const client = allPatients.find(p => p.name === 'Jessica Peterson');
    return client ? client.records : [];
};

// Helper to add a record for the main client
export const addClientRecord = (record: HealthRecord) => {
    const client = allPatients.find(p => p.name === 'Jessica Peterson');
    if (client) {
        client.records.unshift(record);
    }
};

// Helper to add a record for a specific patient
export const addPatientRecord = (patientId: string, record: HealthRecord) => {
    const patient = allPatients.find(p => p.id === patientId);
    if (patient) {
        patient.records.unshift(record);
    }
};

// --- Notifications ---
export type Notification = {
    id: string;
    icon: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
};

export const allNotifications: Notification[] = [
    {
        id: 'notif-1',
        icon: 'MessageSquare',
        title: "New message from Dr. Samuel Chen",
        description: "Hi Jessica, please find your latest test results attached...",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 'notif-2',
        icon: 'CheckCircle2',
        title: "Prescription Refilled",
        description: "Your prescription for Vitamin D has been refilled.",
        time: "1 day ago",
        read: true,
    },
    {
        id: 'notif-3',
        icon: 'CalendarDays',
        title: "Appointment Confirmed",
        description: "Follow-up with Dr. Amina Khan on Oct 28, 2024.",
        time: "3 days ago",
        read: true,
    },
];


// --- Marketplace Data ---

export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  price: z.number().positive('Price must be a positive number.'),
  stock: z.number().int().min(0, 'Stock cannot be negative.'),
  category: z.string().min(1, 'Please select a category.'),
});

export type Product = z.infer<typeof productSchema> & {
    id: string;
    images: string[];
    rating: number;
    reviews: number;
    sales: number;
};

export const professionalProducts: Product[] = [
    {
        id: 'prod-1',
        name: 'Professional Stethoscope',
        description: 'High-quality stethoscope for accurate diagnostics. Features a dual-head chest piece and comfortable earpieces. Suitable for all medical professionals.',
        price: 35000,
        stock: 50,
        category: 'Equipment',
        images: ['https://placehold.co/600x600.png'],
        rating: 4.9,
        reviews: 25,
        sales: 150,
    },
    {
        id: 'prod-2',
        name: 'Bulk Paracetamol (1000 tablets)',
        description: 'A bulk package of 1000 paracetamol tablets (500mg). Ideal for clinics and hospitals for managing pain and fever.',
        price: 18000,
        stock: 200,
        category: 'Medications',
        images: ['https://placehold.co/600x600.png'],
        rating: 4.8,
        reviews: 15,
        sales: 320,
    },
    {
        id: 'prod-3',
        name: 'Digital Blood Pressure Monitor',
        price: 25000,
        stock: 120,
        images: ['https://placehold.co/400x400.png'],
        category: 'Equipment',
        rating: 4.5,
        reviews: 120,
        sales: 450,
        description: 'Easy to use digital blood pressure monitor for accurate readings at home. Includes a large LCD display and memory function for two users.'
    },
    {
        id: 'prod-4',
        name: 'Vitamin C (1000mg)',
        price: 5500,
        stock: 500,
        images: ['https://placehold.co/400x400.png'],
        category: 'Supplements',
        rating: 4.8,
        reviews: 350,
        sales: 1200,
        description: 'High-potency Vitamin C supplements to support your immune system. 100 tablets per bottle.'
    },
    {
        id: 'prod-5',
        name: 'Smart Glucometer Kit',
        price: 32000,
        stock: 80,
        images: ['https://placehold.co/400x400.png'],
        category: 'AI Health Devices',
        rating: 4.9,
        reviews: 95,
        sales: 210,
        description: 'Bluetooth-enabled smart glucometer that syncs with the HCOM app to track your blood sugar levels effortlessly. Includes 50 test strips.'
    },
    {
        id: 'prod-6',
        name: 'Electric Pulse Oximeter',
        price: 15000,
        stock: 150,
        images: ['https://placehold.co/400x400.png'],
        category: 'Equipment',
        rating: 4.6,
        reviews: 210,
        sales: 600,
        description: 'Measures your blood oxygen saturation (SpO2) and pulse rate quickly and accurately. Bright OLED display and one-button operation.'
    },
    {
        id: 'prod-7',
        name: 'Omega-3 Fish Oil',
        price: 8000,
        stock: 300,
        images: ['https://placehold.co/400x400.png'],
        category: 'Supplements',
        rating: 4.7,
        reviews: 412,
        sales: 950,
        description: 'Supports heart and brain health with high-quality Omega-3 fatty acids. 120 softgels per bottle.'
    },
    {
        id: 'prod-8',
        name: 'Beginner\'s Wellness Kit',
        price: 18500,
        stock: 75,
        images: ['https://placehold.co/400x400.png'],
        category: 'Wellness Kits',
        rating: 4.9,
        reviews: 78,
        sales: 180,
        description: 'A curated kit for starting your wellness journey, including a yoga mat, resistance bands, and a digital guide to home workouts.'
    },
];

export const addProfessionalProduct = (product: Product) => {
    professionalProducts.unshift(product);
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';

export type OrderItem = {
    productId: string;
    name: string;
    quantity: number;
    price: number;
};

export type Order = {
    id: string;
    customerName: string;
    date: string;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
};

export const professionalOrders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Jessica Peterson',
        date: '2024-08-28T10:00:00',
        status: 'Shipped',
        items: [
            { productId: 'prod-1', name: 'Professional Stethoscope', quantity: 1, price: 35000 },
        ],
        total: 35000
    },
    {
        id: 'ORD-002',
        customerName: 'Hope Clinic',
        date: '2024-08-27T14:30:00',
        status: 'Pending',
        items: [
            { productId: 'prod-2', name: 'Bulk Paracetamol (1000 tablets)', quantity: 5, price: 18000 },
        ],
        total: 90000
    },
     {
        id: 'ORD-003',
        customerName: 'St. Nicholas Hospital',
        date: '2024-08-25T09:00:00',
        status: 'Delivered',
        items: [
            { productId: 'prod-1', name: 'Professional Stethoscope', quantity: 10, price: 35000 },
            { productId: 'prod-2', name: 'Bulk Paracetamol (1000 tablets)', quantity: 2, price: 18000 },
        ],
        total: 386000
    },
];

