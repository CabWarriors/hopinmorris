// app/rides/page.tsx
import { getMongoDb } from '@/lib/mongodb_new';
import { Ride } from "@/models/ride";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Location {
  _id: string;
  LocationName: string;
  Address: string;
  Latitude: string;
  Longtitude: string;
}

interface RideWithLocations {
  _id: string;
  startLocation: Location;
  endLocation: Location;
  departureTime: Date;
  seats: number;
  driver: {
    _id: string;
    name?: string;
    email: string;
  };
  passengers: Array<{
    _id: string;
    name?: string;
    email: string;
  }>;
}

export default async function Rides() {
  try {
    const mongoose = await getMongoDb();

    // You can now use either approach:
    
    // Mongoose approach
    const ridesMongoose = await Ride.find({})
      .populate('driver', 'name email')
      .populate('passengers', 'name email')
      .populate('startLocation', 'LocationName Address')
      .populate('endLocation', 'LocationName Address')
      .lean();

    // Or direct approach if preferred
    const ridesDirect = await mongoose.connection.db
      .collection('Rides')
      .find({})
      .toArray();

    // Use whichever result you prefer
    const rides = ridesDirect; // or ridesDirect

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Available Rides</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rides.map((ride) => (
            <Card key={ride._id.toString()} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">
                  {ride.startLocation?.LocationName || 'Loading...'} → {ride.endLocation?.LocationName || 'Loading...'}
                </CardTitle>
                {ride.departureTime && (
                  <p className="text-sm text-muted-foreground">
                    Departure: {new Date(ride.departureTime).toLocaleString()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ride.startLocation?.Address && (
                    <p className="text-sm">
                      <span className="font-semibold">From:</span> {ride.startLocation.Address}
                    </p>
                  )}
                  {ride.endLocation?.Address && (
                    <p className="text-sm">
                      <span className="font-semibold">To:</span> {ride.endLocation.Address}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-semibold">Available Seats:</span> {ride.seats - (ride.passengers?.length || 0)}
                  </p>
                  {ride.driver && (
                    <p className="text-sm">
                      <span className="font-semibold">Driver:</span> {ride.driver.name || ride.driver.email}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Rides page:', error);
    return (
      <div className="text-red-500">
        Error loading rides: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
}