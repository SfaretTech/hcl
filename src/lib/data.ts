

import { type Doctor, availableDoctors } from "@/components/schedule-appointment-form";

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
