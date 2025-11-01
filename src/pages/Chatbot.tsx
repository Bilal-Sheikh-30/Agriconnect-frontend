import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm AgriBot, your smart farming assistant. I can help you with farming tips, modern techniques, equipment advice, and much more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [language, setLanguage] = useState<"english" | "urdu">("english");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const botResponses: { [key: string]: string } = {
    wheat: "For wheat cultivation in Pakistan, the best sowing time is mid-October to mid-November. Ensure proper seed rate of 40-50 kg per acre and use balanced fertilizer. Consider varieties like Punjab-11 or Faisalabad-08 for better yield.",
    tractor: "When choosing a tractor, consider your farm size and operations. For small to medium farms (up to 25 acres), a 50-60 HP tractor is ideal. Popular brands in Pakistan include Massey Ferguson, Fiat, and New Holland. Regular maintenance is key for longevity.",
    fertilizer: "Balanced fertilizer application is crucial. For wheat, use DAP at sowing time and Urea in split doses. For rice, apply nitrogen in 3 splits. Always conduct soil testing before fertilizer application for best results.",
    pesticide: "Use pesticides judiciously and follow safety guidelines. For common pests in wheat, use recommended doses of approved pesticides. Always wear protective gear and maintain proper intervals between application and harvest.",
    default: "That's a great question! I can help you with various farming topics including crop management, equipment selection, modern farming techniques, pest control, and more. Could you please provide more details about what specific information you need?",
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature will be available soon!",
    });
  };

  const quickQuestions = [
    "How to grow wheat?",
    "Best time for rice planting?",
    "Tractor maintenance tips",
    "Organic farming methods",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>AgriBot</CardTitle>
                    <CardDescription>Your Smart Farming Assistant</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant={language === "english" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setLanguage("english")}
                  >
                    English
                  </Badge>
                  <Badge 
                    variant={language === "urdu" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setLanguage("urdu")}
                  >
                    اردو
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Area */}
          <Card className="mb-4">
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "bot" 
                            ? "bg-primary" 
                            : "bg-accent"
                        }`}
                      >
                        {message.sender === "bot" ? (
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <User className="h-4 w-4 text-accent-foreground" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 max-w-[80%] ${
                          message.sender === "bot"
                            ? "bg-secondary"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm md:text-base">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <div className="mb-4 flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputMessage(question);
                }}
              >
                {question}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about farming tips, tools, or modern techniques..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
