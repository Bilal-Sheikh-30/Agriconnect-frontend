import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, ShoppingCart, MessageSquare, TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import heroImage from "@/assets/hero-farm.jpg";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      title: "Rent or Lend Tools",
      description: "Share equipment with fellow farmers. Save costs and maximize efficiency.",
      icon: Share2,
      link: "/resources",
      color: "bg-primary",
    },
    {
      title: "Buy or Sell Crops & Inputs",
      description: "Connect directly with buyers and sellers. Fair prices, no middlemen.",
      icon: ShoppingCart,
      link: "/marketplace",
      color: "bg-accent",
    },
    {
      title: "Ask AgriBot",
      description: "Get instant farming advice, tips, and answers from our AI assistant.",
      icon: MessageSquare,
      link: "/chatbot",
      color: "bg-primary-dark",
    },
  ];

  const tips = [
    { title: "Wheat planting season begins", trend: "up" },
    { title: "Fertilizer prices stable this week", trend: "neutral" },
    { title: "High demand for organic produce", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Empowering Local Farmers
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary mb-6">
              through Smart Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect, share, and grow with Pakistan's leading agricultural platform. 
              Join thousands of farmers making smarter decisions every day.
            </p>
            <Button 
              size="lg" 
              className="text-lg h-12 px-8"
              onClick={() => navigate(user ? '/resources' : '/auth')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.link}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-2 hover:border-primary">
                  <CardHeader>
                    <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Explore →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Latest Agricultural Updates</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-foreground font-medium">{tip.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;