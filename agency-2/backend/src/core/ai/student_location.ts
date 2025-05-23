export async function getStudentLocation(studentId: string) {
  // Mock: Return real-time location/schedule
  return {
    currentLocation: 'Math class, Room 204',
    nextAvailable: '2024-05-21T11:00:00Z',
  };
} 