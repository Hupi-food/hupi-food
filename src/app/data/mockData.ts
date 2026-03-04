export type BoxTier = 'bronze' | 'silver' | 'gold';
export type OrderStatus = 'pending' | 'approved' | 'rejected';

export interface HupiBox {
    id: string;
    storeId: string;
    storeName: string;
    storeCategory: string;
    storeAddress: string;
    tier: BoxTier;
    price: number;
    originalValue: number;
    quantity: number;
    reserved: number;
    pickupStart: string;
    pickupEnd: string;
    description: string;
    isAvailable: boolean;
    lat: number;
    lng: number;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    boxId: string;
    storeId: string;
    storeName: string;
    boxTier: BoxTier;
    price: number;
    status: OrderStatus;
    paymentMethod: string;
    receiptUrl?: string;
    qrCode?: string;
    createdAt: string;
    pickupStart: string;
    pickupEnd: string;
}

export interface Store {
    id: string;
    name: string;
    ownerName: string;
    email: string;
    category: string;
    address: string;
    activeBoxes: number;
    totalSales: number;
    status: 'active' | 'inactive';
    joinedAt: string;
}

export const STORES: Store[] = [
    { id: 's1', name: 'Panadería El Sol', ownerName: 'Carlos Rincón', email: 'panaderia@email.com', category: 'Panadería', address: 'Calle 72 #10-45, Bogotá', activeBoxes: 3, totalSales: 48, status: 'active', joinedAt: '2025-11-10' },
    { id: 's2', name: 'Restaurante La Mesa', ownerName: 'Ana Murillo', email: 'lamesa@email.com', category: 'Restaurante', address: 'Carrera 15 #85-40, Bogotá', activeBoxes: 2, totalSales: 31, status: 'active', joinedAt: '2025-12-01' },
    { id: 's3', name: 'Café Aroma', ownerName: 'Lorena Ospina', email: 'aroma@email.com', category: 'Cafetería', address: 'Av. 19 #100-25, Bogotá', activeBoxes: 1, totalSales: 22, status: 'active', joinedAt: '2026-01-15' },
    { id: 's4', name: 'Sushi Kioto', ownerName: 'David Park', email: 'sushikioto@email.com', category: 'Japonesa', address: 'Calle 93 #14-30, Bogotá', activeBoxes: 0, totalSales: 9, status: 'inactive', joinedAt: '2026-02-01' },
];

export const HUPI_BOXES: HupiBox[] = [
    { id: 'b1', storeId: 's1', storeName: 'Panadería El Sol', storeCategory: 'Panadería', storeAddress: 'Calle 72 #10-45, Bogotá', tier: 'bronze', price: 8000, originalValue: 25000, quantity: 3, reserved: 1, pickupStart: '18:00', pickupEnd: '20:00', description: 'Sorpresa de pan artesanal y pasteles del día', isAvailable: true, lat: 4.6607, lng: -74.052 },
    { id: 'b2', storeId: 's1', storeName: 'Panadería El Sol', storeCategory: 'Panadería', storeAddress: 'Calle 72 #10-45, Bogotá', tier: 'silver', price: 15000, originalValue: 45000, quantity: 2, reserved: 2, pickupStart: '19:00', pickupEnd: '21:00', description: 'Caja premium con croissants y torta del día', isAvailable: false, lat: 4.6607, lng: -74.052 },
    { id: 'b3', storeId: 's2', storeName: 'Restaurante La Mesa', storeCategory: 'Restaurante', storeAddress: 'Carrera 15 #85-40, Bogotá', tier: 'gold', price: 22000, originalValue: 65000, quantity: 1, reserved: 0, pickupStart: '21:00', pickupEnd: '22:30', description: 'Menú completo sorpresa del chef con bebida', isAvailable: true, lat: 4.6677, lng: -74.058 },
    { id: 'b4', storeId: 's3', storeName: 'Café Aroma', storeCategory: 'Cafetería', storeAddress: 'Av. 19 #100-25, Bogotá', tier: 'bronze', price: 6000, originalValue: 18000, quantity: 4, reserved: 0, pickupStart: '17:00', pickupEnd: '19:00', description: 'Café especial + snacks artesanales del día', isAvailable: true, lat: 4.6719, lng: -74.048 },
    { id: 'b5', storeId: 's2', storeName: 'Restaurante La Mesa', storeCategory: 'Restaurante', storeAddress: 'Carrera 15 #85-40, Bogotá', tier: 'silver', price: 14000, originalValue: 42000, quantity: 2, reserved: 1, pickupStart: '20:00', pickupEnd: '22:00', description: 'Plato fuerte + entrada del día', isAvailable: true, lat: 4.6677, lng: -74.058 },
];

export const ORDERS: Order[] = [
    { id: 'o1', customerId: 'c1', customerName: 'Valentina Gómez', customerEmail: 'valentina@email.com', boxId: 'b1', storeId: 's1', storeName: 'Panadería El Sol', boxTier: 'bronze', price: 8000, status: 'pending', paymentMethod: 'Nequi', receiptUrl: 'https://placehold.co/400x600/f3f4f6/6b7280?text=Comprobante', createdAt: '2026-03-03T10:30:00', pickupStart: '18:00', pickupEnd: '20:00' },
    { id: 'o2', customerId: 'c1', customerName: 'Valentina Gómez', customerEmail: 'valentina@email.com', boxId: 'b3', storeId: 's2', storeName: 'Restaurante La Mesa', boxTier: 'gold', price: 22000, status: 'approved', paymentMethod: 'Daviplata', receiptUrl: 'https://placehold.co/400x600/f3f4f6/6b7280?text=Comprobante', qrCode: 'HUPIT-O2-2026-QR', createdAt: '2026-03-02T15:00:00', pickupStart: '21:00', pickupEnd: '22:30' },
    { id: 'o3', customerId: 'c2', customerName: 'Mateo Torres', customerEmail: 'mateo@email.com', boxId: 'b4', storeId: 's3', storeName: 'Café Aroma', boxTier: 'bronze', price: 6000, status: 'pending', paymentMethod: 'Nequi', receiptUrl: 'https://placehold.co/400x600/f3f4f6/6b7280?text=Comprobante+Nequi', createdAt: '2026-03-03T14:15:00', pickupStart: '17:00', pickupEnd: '19:00' },
    { id: 'o4', customerId: 'c3', customerName: 'Sofía Herrera', customerEmail: 'sofia@email.com', boxId: 'b5', storeId: 's2', storeName: 'Restaurante La Mesa', boxTier: 'silver', price: 14000, status: 'pending', paymentMethod: 'Bre-b', receiptUrl: 'https://placehold.co/400x600/f3f4f6/6b7280?text=Comprobante+Breb', createdAt: '2026-03-03T13:40:00', pickupStart: '20:00', pickupEnd: '22:00' },
];

export const PLATFORM_STATS = {
    totalUsers: 1248,
    activeStores: 34,
    pendingPayments: 12,
    totalRevenue: 4850000,
    ordersToday: 47,
    boxesSavedToday: 47,
};
