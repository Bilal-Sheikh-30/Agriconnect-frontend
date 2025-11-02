import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Phone, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { console } from "inspector";

interface Item {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: string | null;
  status: string;
  seller: string;
  seller_name: string;
  seller_province: string;
  seller_city: string;
  seller_contact: string;
}

const Marketplace = () => {
  const { toast } = useToast();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/marketplace/available");
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch marketplace items",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // const handleContact = (sellerName: string) => {
  //   if (!user) {
  //     toast({
  //       title: "Login Required",
  //       description: "Please login to contact sellers.",
  //       variant: "destructive",
  //     });
  //     navigate('/auth', { state: { from: '/marketplace' } });
  //     return;
  //   }
  //   toast({
  //     title: "Contact Request Sent",
  //     description: `We'll connect you with ${sellerName} shortly.`,
  //   });
  // };
//   const handleContact = (sellerName: string, sellerNumber: string) => {
//   if (!user) {
//     toast({
//       title: "Login Required",
//       description: "Please login to contact sellers.",
//       variant: "destructive",
//     });
//     navigate('/auth', { state: { from: '/marketplace' } });
//     return;
//   }

//   // WhatsApp link
//   const message = `Hello ${sellerName}, I am interested in your product.`;
//   const waLink = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`;
//   // const waLink = `https://wa.me/923140018046?text=${encodeURIComponent(message)}`

//   // Open WhatsApp in new tab
//   window.open(waLink, "_blank");

//   toast({
//     title: "Opening WhatsApp",
//     description: `You are being redirected to WhatsApp to contact ${sellerName}.`,
//   });
// };
const handleContact = (sellerName: string, sellerNumber: string) => {
  if (!user) {
    toast({
      title: "Login Required",
      description: "Please login to contact sellers.",
      variant: "destructive",
    });
    navigate('/auth', { state: { from: '/marketplace' } });
    return;
  }

  // Convert local number to international format (Pakistan)
  let formattedNumber = sellerNumber;
  if (formattedNumber.startsWith("0")) {
    formattedNumber = "92" + formattedNumber.slice(1);
  }
  
  // WhatsApp link
  const message = `Hello ${sellerName}, I am interested in your product.`;
  const waLink = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
  // const waLink = `https://wa.me/923140018046?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in new tab
  window.open(waLink, "_blank");

  toast({
    title: "Opening WhatsApp",
    description: `You are being redirected to WhatsApp to contact ${sellerName}.`,
  });
};


  // POST your item
  const handlePostItem = async () => {
    if (!user) return;

    const form = document.getElementById("marketplace-form") as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:8000/api/v1/marketplace/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: "Item posted successfully",
        });
        fetchItems(); // refresh list
      } else {
        toast({
          title: "Error",
          description: data.detail || "Failed to post item",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post item",
        variant: "destructive",
      });
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Marketplace</h1>
            <p className="text-muted-foreground">Buy quality products directly from sellers</p>
          </div>

          {/* Post Your Item Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2" onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  toast({
                    title: "Login Required",
                    description: "Please login to post an item.",
                    variant: "destructive",
                  });
                  navigate("/auth", { state: { from: "/marketplace" } });
                }
              }}>
                <Plus className="h-5 w-5" />
                Post Your Item
              </Button>
            </DialogTrigger>

            {user && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>List Your Item</DialogTitle>
                  <p className="text-muted-foreground">Share your item with the community</p>
                </DialogHeader>

                <form id="marketplace-form" className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name">Item Name</label>
                    <Input id="name" name="name" placeholder="e.g., Wheat Seeds" required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="category">Category</label>
                    <Select id="category" name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grain">Grain</SelectItem>
                        <SelectItem value="Crop Seeds">Crop Seeds</SelectItem>
                        <SelectItem value="Fertilizers">Fertilizers</SelectItem>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="price">Price (PKR)</label>
                    <Input id="price" name="price" type="number" placeholder="1000" required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="quantity">Quantity</label>
                    <Input id="quantity" name="quantity" placeholder="e.g., 10 kg" required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="image">Upload Image</label>
                    <Input id="image" name="image" type="file" accept="image/*" required />
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handlePostItem}>Post Item</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            )}
          </Dialog>
        </div>

        {/* Filters */}
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
              <SelectItem value="grain">Grain</SelectItem>
              <SelectItem value="crop seeds">Crop Seeds</SelectItem>
              <SelectItem value="fertilizers">Fertilizers</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        {loading ? (
          <p>Loading items...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}-{item.quantity}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {item.price.toLocaleString()} PKR
                  </div>
                  <p className="text-sm text-muted-foreground">Seller: {item.seller_name} ({item.seller_city})</p>
                </CardContent>
                {/* <CardFooter>
                  <Button className="w-full gap-2" variant="outline" onClick={() => handleContact(item.seller_name)}>
                    <Phone className="h-4 w-4" />
                    Contact Seller
                  </Button>
                </CardFooter> */}
                <CardFooter>
                  
  <Button
    className="w-full gap-2"
    variant="outline"
    onClick={() => handleContact(item.seller_name, item.seller_contact)}
  >
    <Phone className="h-4 w-4" />
    Contact Seller
  </Button>
</CardFooter>

              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;


