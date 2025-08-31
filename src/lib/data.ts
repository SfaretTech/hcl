
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
