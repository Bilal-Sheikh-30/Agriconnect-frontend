import { useState } from "react";
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

const Resources = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const equipment = [
    { id: 1, name: "Tractor - Massey Ferguson", type: "Tractor", price: 250, location: "Lahore", owner: "Muhammad Ali", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop" },
    { id: 2, name: "Water Pump - 5HP", type: "Pump", price: 150, location: "Faisalabad", owner: "Ahmed Hassan", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop" },
    { id: 3, name: "Combine Harvester", type: "Harvester", price: 500, location: "Multan", owner: "Imran Khan", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop" },
    { id: 4, name: "Seed Drill Machine", type: "Planter", price: 200, location: "Lahore", owner: "Fatima Noor", image: "https://images.unsplash.com/photo-1589395937658-0d5a0e6d1d86?w=400&h=300&fit=crop" },
    { id: 5, name: "Generator - 10KVA", type: "Generator", price: 180, location: "Karachi", owner: "Usman Ali", image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&h=300&fit=crop" },
    { id: 6, name: "Sprayer - 200L", type: "Sprayer", price: 100, location: "Faisalabad", owner: "Sara Ahmed", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop" },
  ];

  const handleAction = (action, item) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to access this feature.",
        variant: "destructive",
      });
      navigate('/auth', { state: { from: '/resources' } });
      return;
    }

    toast({
      title: action === 'rent' ? "Rent Request Sent" : "Equipment Posted",
      description: action === 'rent' 
        ? `Your request to rent ${item.name} has been sent to ${item.owner}.`
        : "Your equipment has been listed successfully.",
    });
  };

  const filteredEquipment = equipment.filter((item) => {
    const locationMatch = locationFilter === "all" || item.location === locationFilter;
    const typeMatch = typeFilter === "all" || item.type === typeFilter;
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
                    navigate('/auth', { state: { from: '/resources' } });
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
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="equipment-name">Equipment Name</Label>
                    <Input id="equipment-name" placeholder="e.g., Tractor" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="equipment-type">Type</Label>
                    <Select>
                      <SelectTrigger id="equipment-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tractor">Tractor</SelectItem>
                        <SelectItem value="pump">Pump</SelectItem>
                        <SelectItem value="harvester">Harvester</SelectItem>
                        <SelectItem value="planter">Planter</SelectItem>
                        <SelectItem value="generator">Generator</SelectItem>
                        <SelectItem value="sprayer">Sprayer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price per Hour (PKR)</Label>
                    <Input id="price" type="number" placeholder="200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Lahore" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => handleAction('post', {})}>Post Equipment</Button>
                </DialogFooter>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-primary font-semibold text-xl mb-2">
                  <DollarSign className="h-5 w-5" />
                  {item.price} PKR/hour
                </div>
                <p className="text-sm text-muted-foreground">Owner: {item.owner}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAction('rent', item)}>
                  Rent Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;