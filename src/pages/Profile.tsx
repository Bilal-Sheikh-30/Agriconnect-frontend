// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Edit, Mail, Phone, MapPin, User } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "../contexts/AuthContext";


// const Profile = () => {
//   const { toast } = useToast();
//   const { user } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);

//   const myListings = [
//     { id: 1, title: "Tractor - Massey Ferguson", type: "Equipment", status: "Active" },
//     { id: 2, title: "Wheat Seeds - 50kg", type: "Product", status: "Active" },
//     { id: 3, title: "Water Pump - 5HP", type: "Equipment", status: "Rented" },
//   ];

//   const myRentals = [
//     { id: 1, title: "Combine Harvester", owner: "Imran Khan", status: "Active", endDate: "2024-12-20" },
//     { id: 2, title: "Seed Drill Machine", owner: "Fatima Noor", status: "Completed", endDate: "2024-11-15" },
//   ];

//   const myTransactions = [
//     { id: 1, type: "Sale", item: "Wheat Seeds - 50kg", amount: 5000, date: "2024-11-10" },
//     { id: 2, type: "Rental Income", item: "Tractor - Massey Ferguson", amount: 2500, date: "2024-11-08" },
//     { id: 3, type: "Rental Payment", item: "Combine Harvester", amount: -5000, date: "2024-11-05" },
//   ];

//   const handleSaveProfile = () => {
//     setIsEditing(false);
//     toast({
//       title: "Profile Updated",
//       description: "Your profile has been successfully updated.",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-5xl mx-auto">
//           <Card className="mb-8">
//             <CardHeader>
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//                 <Avatar className="h-24 w-24">
//                   <AvatarImage src={user?.avatar} />
//                   <AvatarFallback>
//                     <User className="h-12 w-12" />
//                   </AvatarFallback>
//                 </Avatar>
                
//                 <div className="flex-1">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div>
//                       <CardTitle className="text-2xl mb-2">{user?.name}</CardTitle>
//                       <Badge className="mb-3">{user?.role}</Badge>
//                       <div className="space-y-2 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-2">
//                           <Mail className="h-4 w-4" />
//                           {user?.email}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Phone className="h-4 w-4" />
//                           {user?.contact}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <MapPin className="h-4 w-4" />
//                           {user?.city}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <Button 
//                       variant={isEditing ? "default" : "outline"}
//                       onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
//                       className="gap-2"
//                     >
//                       <Edit className="h-4 w-4" />
//                       {isEditing ? "Save Profile" : "Edit Profile"}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>

//             {isEditing && (
//               <CardContent>
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input id="name" defaultValue={user?.name} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input id="email" type="email" defaultValue={user?.email} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Contact</Label>
//                     <Input id="phone" defaultValue={user?.contact} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="location">City</Label>
//                     <Input id="location" defaultValue={user?.city} />
//                   </div>
//                 </div>
//               </CardContent>
//             )}
//           </Card>

//           <Tabs defaultValue="listings" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="listings">My Listings</TabsTrigger>
//               <TabsTrigger value="rentals">My Rentals</TabsTrigger>
//               <TabsTrigger value="transactions">Transactions</TabsTrigger>
//             </TabsList>

//             <TabsContent value="listings" className="mt-6">
//               <div className="space-y-4">
//                 {myListings.map((listing) => (
//                   <Card key={listing.id}>
//                     <CardHeader>
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-lg">{listing.title}</CardTitle>
//                           <CardDescription>{listing.type}</CardDescription>
//                         </div>
//                         <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
//                           {listing.status}
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="rentals" className="mt-6">
//               <div className="space-y-4">
//                 {myRentals.map((rental) => (
//                   <Card key={rental.id}>
//                     <CardHeader>
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-lg">{rental.title}</CardTitle>
//                           <CardDescription>Owner: {rental.owner}</CardDescription>
//                           <p className="text-sm text-muted-foreground mt-2">
//                             End Date: {rental.endDate}
//                           </p>
//                         </div>
//                         <Badge variant={rental.status === "Active" ? "default" : "secondary"}>
//                           {rental.status}
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="transactions" className="mt-6">
//               <div className="space-y-4">
//                 {myTransactions.map((transaction) => (
//                   <Card key={transaction.id}>
//                     <CardHeader>
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-lg">{transaction.item}</CardTitle>
//                           <CardDescription>{transaction.type}</CardDescription>
//                           <p className="text-sm text-muted-foreground mt-2">
//                             Date: {transaction.date}
//                           </p>
//                         </div>
//                         <div className={`text-xl font-bold ${
//                           transaction.amount > 0 ? "text-primary" : "text-destructive"
//                         }`}>
//                           {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString()} PKR
//                         </div>
//                       </div>
//                     </CardHeader>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


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
  const { user, setUser, token } = useAuth(); // assumes your AuthContext provides token & setUser
  const [isEditing, setIsEditing] = useState(false);

  // Form state for editing
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    city: user?.city || "",
  });

  // Keep form updated if user changes (optional)
  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      contact: user?.contact || "",
      city: user?.city || "",
    });
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Save updated profile to backend
  const handleSaveProfile = async () => {
    try {
      console.log("User ID:", user.id); // Debug: Check if user ID is available
      console.log("Token:", token); // Debug: Check if token is available
      const res = await fetch("http://localhost:8000/auth/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to update profile");
      }

      // Update user in AuthContext
      setUser(data.user);

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // Mock data for tabs
  const myListings = [
    { id: 1, title: "Tractor - Massey Ferguson", type: "Equipment", status: "Active" },
    { id: 2, title: "Wheat Seeds - 50kg", type: "Product", status: "Active" },
    { id: 3, title: "Water Pump - 5HP", type: "Equipment", status: "Rented" },
  ];

  const myRentals = [
    { id: 1, title: "Combine Harvester", owner: "Imran Khan", status: "Active", endDate: "2024-12-20" },
    { id: 2, title: "Seed Drill Machine", owner: "Fatima Noor", status: "Completed", endDate: "2024-11-15" },
  ];

  const myTransactions = [
    { id: 1, type: "Sale", item: "Wheat Seeds - 50kg", amount: 5000, date: "2024-11-10" },
    { id: 2, type: "Rental Income", item: "Tractor - Massey Ferguson", amount: 2500, date: "2024-11-08" },
    { id: 3, type: "Rental Payment", item: "Combine Harvester", amount: -5000, date: "2024-11-05" },
  ];

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

          {/* Tabs for Listings, Rentals, Transactions */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="rentals">My Rentals</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-6">
              <div className="space-y-4">
                {myListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{listing.title}</CardTitle>
                          <CardDescription>{listing.type}</CardDescription>
                        </div>
                        <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                          {listing.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rentals" className="mt-6">
              <div className="space-y-4">
                {myRentals.map((rental) => (
                  <Card key={rental.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{rental.title}</CardTitle>
                          <CardDescription>Owner: {rental.owner}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            End Date: {rental.endDate}
                          </p>
                        </div>
                        <Badge variant={rental.status === "Active" ? "default" : "secondary"}>
                          {rental.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <div className="space-y-4">
                {myTransactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{transaction.item}</CardTitle>
                          <CardDescription>{transaction.type}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            Date: {transaction.date}
                          </p>
                        </div>
                        <div className={`text-xl font-bold ${
                          transaction.amount > 0 ? "text-primary" : "text-destructive"
                        }`}>
                          {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString()} PKR
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
