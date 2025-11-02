// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { MapPin, DollarSign, Plus } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "../contexts/AuthContext";

// interface Equipment {
//   id: string;
//   title: string;
//   category: string;
//   image: string;
//   rent_per_hour: number;
//   status: string;
//   owner: string | number;
//   owner_name: string;
//   owner_province: string;
//   owner_city: string;

// }



// const Resources = () => {
//   const { toast } = useToast();
//   const { user, token } = useAuth(); // assuming token is available
//   const navigate = useNavigate();

//   const [locationFilter, setLocationFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [equipment, setEquipment] = useState<Equipment[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch available resources from API
//   const fetchResources = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8000/api/v1/resource/resource/available"); // replace with your backend URL
//       const data = await res.json();
//       console.log(data);
//       setEquipment(data.resources || []);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       toast({
//         title: "Error",
//         description: "Failed to fetch resources",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchResources();
//   }, []);

//   const handleAction = async (action: "rent" | "post", item?: Equipment) => {
//     if (!user) {
//       toast({
//         title: "Login Required",
//         description: "Please login to access this feature.",
//         variant: "destructive",
//       });
//       navigate("/auth", { state: { from: "/resources" } });
//       return;
//     }
//     console.log(item);
//     if (action === "rent" && item) {
//       // For now, just show toast
//       toast({
//         title: "Rent Request Sent",
//         description: `Your request to rent ${item.title} has been sent.`,
//       });
//       return;
//     }

//     if (action === "post") {
//       const form = document.getElementById("resource-form") as HTMLFormElement;
//       const formData = new FormData(form);

//       try {
//         const res = await fetch("http://localhost:8000/api/v1/resource/resource/create", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`, // pass JWT if your backend requires it
//           },
//           body: formData,
//         });
//         const data = await res.json();

//         if (res.ok) {
//           toast({
//             title: "Success",
//             description: "Equipment posted successfully",
//           });
//           fetchResources(); // refresh list
//         } else {
//           toast({
//             title: "Error",
//             description: data.detail || "Failed to post equipment",
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to post equipment",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   // Filtering equipment
//   const filteredEquipment = equipment.filter((item) => {
//     const locationMatch = locationFilter === "all" || item.location === locationFilter;
//     const typeMatch = typeFilter === "all" || item.category === typeFilter;
//     return locationMatch && typeMatch;
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resource Sharing</h1>
//             <p className="text-muted-foreground">Rent equipment or share yours with the community</p>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 size="lg"
//                 className="gap-2"
//                 onClick={(e) => {
//                   if (!user) {
//                     e.preventDefault();
//                     toast({
//                       title: "Login Required",
//                       description: "Please login to post equipment.",
//                       variant: "destructive",
//                     });
//                     navigate("/auth", { state: { from: "/resources" } });
//                   }
//                 }}
//               >
//                 <Plus className="h-5 w-5" />
//                 Post Your Equipment
//               </Button>
//             </DialogTrigger>

//             {user && (
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>List Your Equipment</DialogTitle>
//                   <DialogDescription>
//                     Share your equipment with fellow farmers and earn extra income.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <form id="resource-form" className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="title">Equipment Name</Label>
//                     <Input id="title" name="title" placeholder="e.g., Tractor" required />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="category">Type</Label>
//                     <Select name="category" id="category" required>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Tractor">Tractor</SelectItem>
//                         <SelectItem value="Pump">Pump</SelectItem>
//                         <SelectItem value="Harvester">Harvester</SelectItem>
//                         <SelectItem value="Planter">Planter</SelectItem>
//                         <SelectItem value="Generator">Generator</SelectItem>
//                         <SelectItem value="Sprayer">Sprayer</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="rent_per_hour">Price per Hour (PKR)</Label>
//                     <Input id="rent_per_hour" name="rent_per_hour" type="number" placeholder="200" required />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="image">Upload Image</Label>
//                     <Input id="image" name="image" type="file" accept="image/*" required />
//                   </div>
//                   <DialogFooter>
//                     <Button type="button" onClick={() => handleAction("post")}>
//                       Post Equipment
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             )}
//           </Dialog>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <Select value={locationFilter} onValueChange={setLocationFilter}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <SelectValue placeholder="Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Locations</SelectItem>
//               <SelectItem value="Lahore">Lahore</SelectItem>
//               <SelectItem value="Faisalabad">Faisalabad</SelectItem>
//               <SelectItem value="Multan">Multan</SelectItem>
//               <SelectItem value="Karachi">Karachi</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={typeFilter} onValueChange={setTypeFilter}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <SelectValue placeholder="Equipment Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Types</SelectItem>
//               <SelectItem value="Tractor">Tractor</SelectItem>
//               <SelectItem value="Pump">Pump</SelectItem>
//               <SelectItem value="Harvester">Harvester</SelectItem>
//               <SelectItem value="Planter">Planter</SelectItem>
//               <SelectItem value="Generator">Generator</SelectItem>
//               <SelectItem value="Sprayer">Sprayer</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {loading ? (
//           <p>Loading resources...</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredEquipment.map((item) => (
//               <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//                 <CardHeader>
//                   <CardTitle>{item.title}</CardTitle>
//                   <CardDescription className="flex items-center gap-2">
//                     <MapPin className="h-4 w-4" />
//                     {item.owner_city || "Unknown"}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center gap-2 text-primary font-semibold text-xl mb-2">
//                     <DollarSign className="h-5 w-5" />
//                     {item.rent_per_hour} PKR/hour
//                   </div>
//                   <p className="text-sm text-muted-foreground">Owner: {item.owner_name}</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full" onClick={() => handleAction("rent", item)}>
//                     Rent Now
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Resources;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, DollarSign, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

interface Equipment {
  id: string;
  title: string;
  category: string;
  image: string;
  rent_per_hour: number;
  status: string;
  owner: string | number;
  owner_name: string;
  owner_province: string;
  owner_city: string;
}

const Resources = () => {
  const { toast } = useToast();
  const { user, token } = useAuth(); // assuming token is available
  const navigate = useNavigate();

  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);

  // Rental modal states
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showRentModal, setShowRentModal] = useState(false);

  // Fetch available resources from API
  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/resource/resource/available"); // replace with your backend URL
      const data = await res.json();
      console.log(data);
      setEquipment(data.resources || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAction = async (action: "rent" | "post", item?: Equipment) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to access this feature.",
        variant: "destructive",
      });
      navigate("/auth", { state: { from: "/resources" } });
      return;
    }

    if (action === "rent" && item) {
      setSelectedEquipment(item);
      setShowRentModal(true);
      return;
    }

    if (action === "post") {
      const form = document.getElementById("resource-form") as HTMLFormElement;
      const formData = new FormData(form);

      try {
        const res = await fetch("http://localhost:8000/api/v1/resource/resource/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // pass JWT if your backend requires it
          },
          body: formData,
        });
        const data = await res.json();

        if (res.ok) {
          toast({
            title: "Success",
            description: "Equipment posted successfully",
          });
          fetchResources(); // refresh list
        } else {
          toast({
            title: "Error",
            description: data.detail || "Failed to post equipment",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to post equipment",
          variant: "destructive",
        });
      }
    }
  };

  // Submit rental request
  const submitRent = async () => {
    if (!selectedEquipment || !startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select start and end dates",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      note: "Optional note",
    };

    try {
      const res = await fetch(
        `http://localhost:8000/equipment/${selectedEquipment.id}/rent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Success",
          description: "Equipment rented successfully",
        });
        setShowRentModal(false);
        setStartDate(null);
        setEndDate(null);
      } else {
        toast({
          title: "Error",
          description: data.detail || "Failed to rent equipment",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rent equipment",
        variant: "destructive",
      });
    }
  };

  // Filtering equipment
  const filteredEquipment = equipment.filter((item) => {
    const locationMatch = locationFilter === "all" || item.location === locationFilter;
    const typeMatch = typeFilter === "all" || item.category === typeFilter;
    return locationMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resource Sharing</h1>
            <p className="text-muted-foreground">Rent equipment or share yours with the community</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="gap-2"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    toast({
                      title: "Login Required",
                      description: "Please login to post equipment.",
                      variant: "destructive",
                    });
                    navigate("/auth", { state: { from: "/resources" } });
                  }
                }}
              >
                <Plus className="h-5 w-5" />
                Post Your Equipment
              </Button>
            </DialogTrigger>

            {user && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>List Your Equipment</DialogTitle>
                  <DialogDescription>
                    Share your equipment with fellow farmers and earn extra income.
                  </DialogDescription>
                </DialogHeader>
                <form id="resource-form" className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Equipment Name</Label>
                    <Input id="title" name="title" placeholder="e.g., Tractor" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Type</Label>
                    <Select name="category" id="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tractor">Tractor</SelectItem>
                        <SelectItem value="Pump">Pump</SelectItem>
                        <SelectItem value="Harvester">Harvester</SelectItem>
                        <SelectItem value="Planter">Planter</SelectItem>
                        <SelectItem value="Generator">Generator</SelectItem>
                        <SelectItem value="Sprayer">Sprayer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rent_per_hour">Price per Hour (PKR)</Label>
                    <Input id="rent_per_hour" name="rent_per_hour" type="number" placeholder="200" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Upload Image</Label>
                    <Input id="image" name="image" type="file" accept="image/*" required />
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={() => handleAction("post")}>
                      Post Equipment
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            )}
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Lahore">Lahore</SelectItem>
              <SelectItem value="Faisalabad">Faisalabad</SelectItem>
              <SelectItem value="Multan">Multan</SelectItem>
              <SelectItem value="Karachi">Karachi</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Equipment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Tractor">Tractor</SelectItem>
              <SelectItem value="Pump">Pump</SelectItem>
              <SelectItem value="Harvester">Harvester</SelectItem>
              <SelectItem value="Planter">Planter</SelectItem>
              <SelectItem value="Generator">Generator</SelectItem>
              <SelectItem value="Sprayer">Sprayer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p>Loading resources...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {item.owner_city || "Unknown"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-primary font-semibold text-xl mb-2">
                    <DollarSign className="h-5 w-5" />
                    {item.rent_per_hour} PKR/hour
                  </div>
                  <p className="text-sm text-muted-foreground">Owner: {item.owner_name}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleAction("rent", item)}>
                    Rent Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rental Modal */}
      {showRentModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Rent {selectedEquipment.title}</h2>
            <div className="mb-4">
              <Label>Start Date & Time</Label>
              <Input
                type="datetime-local"
                value={startDate ? startDate.toISOString().slice(0,16) : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <Label>End Date & Time</Label>
              <Input
                type="datetime-local"
                value={endDate ? endDate.toISOString().slice(0,16) : ""}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRentModal(false)}>Cancel</Button>
              <Button onClick={submitRent}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;


