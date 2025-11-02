import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Mail, Phone, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { toast } = useToast();
  const { user, setUser, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    city: user?.city || "",
  });

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      contact: user?.contact || "",
      city: user?.city || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed to update profile");

      setUser(data.user);
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
      setIsEditing(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // Fetched data states
  const [resources, setResources] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [borrowed, setBorrowed] = useState<any[]>([]);

  // Fetch My Listings (Resources + Items)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const resResources = await fetch("http://localhost:8000/api/v1/resource/resource/my-resources", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataResources = await resResources.json();
        setResources(dataResources.resources || []);

        const resItems = await fetch("http://localhost:8000/api/v1/marketplace/my-items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataItems = await resItems.json();
        setItems(dataItems.items || []);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      }
    };

    fetchListings();
  }, [token]);

  // Fetch My Rentals
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await fetch("http://localhost:8000/my-borrowed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBorrowed(data.borrowed_items || []);
      } catch (err) {
        console.error("Failed to fetch borrowed rentals", err);
      }
    };

    fetchRentals();
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{user?.name}</CardTitle>
                      <Badge className="mb-3">{user?.role}</Badge>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user?.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {user?.contact}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {user?.city}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      {isEditing ? "Save Profile" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            {isEditing && (
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input id="contact" value={form.contact} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={form.city} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Tabs: My Listings & My Rentals */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="rentals">My Rentals</TabsTrigger>
            </TabsList>

            
            {/* My Listings */}
              <TabsContent value="listings" className="mt-6">
                <div className="space-y-4">
                  {[...resources, ...items].map((listing) => (
                    <Card key={listing.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{listing.title || listing.name}</CardTitle>
                            <CardDescription>{listing.category}</CardDescription>

                            {/* Show price for items, rent_per_hour for resources */}
                            {listing.price !== undefined && (
                              <p className="text-sm text-muted-foreground mt-2">
                                Price: {listing.price.toLocaleString()} PKR
                              </p>
                            )}
                            {listing.rent_per_hour !== undefined && (
                              <p className="text-sm text-muted-foreground mt-2">
                                Rent per hour: {listing.rent_per_hour.toLocaleString()} PKR
                              </p>
                            )}
                          </div>

                          <Badge variant={listing.status === "available" ? "default" : "secondary"}>
                            {listing.status}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>


            {/* My Rentals */}
            {/* <TabsContent value="rentals" className="mt-6">
              <div className="space-y-4">
                {borrowed.map((rental) => (
                  <Card key={rental.rental_id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{rental.resource_title}</CardTitle>
                          <CardDescription>Owner: {rental.owner_name}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            From: {rental.rented_from} | To: {rental.rented_to}
                          </p>
                        </div>
                        <Badge variant="default">Rented</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent> */}
                      {/* My Rentals */}
          <TabsContent value="rentals" className="mt-6">
            <div className="space-y-4">
              {borrowed.map((rental) => {
                const today = new Date();
                const endDate = new Date(rental.rented_to);
                const isCompleted = endDate < today;

                return (
                  <Card key={rental.rental_id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{rental.resource_title}</CardTitle>
                          <CardDescription>Owner: {rental.owner_name}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            From: {rental.rented_from} | To: {rental.rented_to}
                          </p>
                        </div>
                        <Badge variant={isCompleted ? "secondary" : "default"}>
                          {isCompleted ? "Completed" : "Rented"}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
