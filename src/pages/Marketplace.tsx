import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

const Marketplace = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const inputs = [
    { id: 1, name: "Premium Wheat Seeds - 50kg", category: "Seeds", price: 5000, seller: "Green Valley Suppliers", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop", featured: true },
    { id: 2, name: "Organic Fertilizer - NPK", category: "Fertilizers", price: 3500, seller: "AgriChem Pakistan", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop", featured: false },
    { id: 3, name: "Pesticide Spray - 5L", category: "Pesticides", price: 2000, seller: "Crop Protection Ltd", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop", featured: false },
    { id: 4, name: "Corn Seeds - Hybrid", category: "Seeds", price: 4500, seller: "Seed Masters", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop", featured: true },
  ];

  const produce = [
    { id: 1, name: "Fresh Wheat - 100kg", category: "Grains", price: 8000, seller: "Ali Farms", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop", featured: true },
    { id: 2, name: "Organic Tomatoes - 25kg", category: "Vegetables", price: 1500, seller: "Hassan Agriculture", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop", featured: false },
    { id: 3, name: "Fresh Potatoes - 50kg", category: "Vegetables", price: 2500, seller: "Fatima Produce", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop", featured: false },
    { id: 4, name: "Rice - Basmati 50kg", category: "Grains", price: 12000, seller: "Premium Grains Co.", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", featured: true },
  ];

  const handleContact = (sellerName) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to contact sellers.",
        variant: "destructive",
      });
      navigate('/auth', { state: { from: '/marketplace' } });
      return;
    }
    toast({
      title: "Contact Request Sent",
      description: `We'll connect you with ${sellerName} shortly.`,
    });
  };

  const ProductCard = ({ item }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {item.featured && (
          <Badge className="absolute top-2 right-2 bg-accent">Featured</Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription>{item.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary mb-2">
          {item.price.toLocaleString()} PKR
        </div>
        <p className="text-sm text-muted-foreground">Seller: {item.seller}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full gap-2" 
          variant="outline"
          onClick={() => handleContact(item.seller)}
        >
          <Phone className="h-4 w-4" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Buy quality inputs or sell your produce directly</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="seeds">Seeds</SelectItem>
              <SelectItem value="fertilizers">Fertilizers</SelectItem>
              <SelectItem value="pesticides">Pesticides</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="inputs" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
            <TabsTrigger value="inputs">Buy Inputs</TabsTrigger>
            <TabsTrigger value="produce">Sell Produce</TabsTrigger>
          </TabsList>

          <TabsContent value="inputs">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Featured Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {inputs.filter(item => item.featured).map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">All Inputs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {inputs.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="produce">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Featured Produce</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {produce.filter(item => item.featured).map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">All Produce</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {produce.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;