import { collaborationProfiles } from './collaborationProfilesData';

// Mock work order data for Incoming tab
// In a real app, this would come from an API or be filtered based on the selected profiles
export const incomingWorkOrders = [
  {
    id: 'wo-1233',
    orderNumber: '1233',
    profile: collaborationProfiles[0], // Suryoday Bank profile
  },
  {
    id: 'wo-1234',
    orderNumber: '1234',
    profile: collaborationProfiles[1], // Another Suryoday Bank profile
  },
];

// Mock work order data for Outgoing tab
export const outgoingWorkOrders = [
  {
    id: 'wo-out-1233',
    orderNumber: '1233',
    profiles: [
      collaborationProfiles[0], // Suryoday Bank profile
      collaborationProfiles[1], // Second profile
      collaborationProfiles[2], // Third profile
      collaborationProfiles[3], // Fourth profile
    ],
  },
  {
    id: 'wo-out-1234',
    orderNumber: '1234',
    profiles: [
      collaborationProfiles[4], // Fifth profile
      collaborationProfiles[5], // Sixth profile
      collaborationProfiles[6], // Seventh profile
    ],
  },
  {
    id: 'wo-out-1235',
    orderNumber: '1235',
    profiles: [
      collaborationProfiles[7], // Eighth profile
      collaborationProfiles[8], // Ninth profile
      collaborationProfiles[9], // Tenth profile
      collaborationProfiles[0], // Eleventh profile (reusing for variety)
    ],
  },
];

// Helper function to create work orders from profile IDs
export const createWorkOrdersFromProfileIds = (profileIds, startOrderNumber = 1233) => {
  return profileIds
    .map((id, index) => {
      const profile = collaborationProfiles.find(p => p.id === id);
      if (!profile) return null;
      return {
        id: `wo-${id}`,
        orderNumber: `${startOrderNumber + index}`,
        profile,
      };
    })
    .filter(Boolean);
};

