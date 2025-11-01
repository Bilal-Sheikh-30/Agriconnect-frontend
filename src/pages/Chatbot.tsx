// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Send, Bot, User, Languages, MessageSquare } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import ReactMarkdown from "react-markdown";

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "bot";
//   timestamp: Date;
//   language?: "urdu" | "english";
// }

// const Chatbot = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       text: "Assalam-o-Alaikum! Main **AgriBot** hun. Aap ka agricultural assistant. Main aap ki madad kar sakta hun farming techniques, crop management, equipment advice, marketplace guidance, aur AgriConnect platform features ke bare mein. Aaj main aap ki kese madad kar sakta hun?",
//       sender: "bot",
//       timestamp: new Date(),
//       language: "urdu",
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUrduMode, setIsUrduMode] = useState(true);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const { toast } = useToast();

//   const handleLogout = () => {
//     logout();
//     toast({
//       title: "Logged Out",
//       description: "You have been successfully logged out.",
//     });
//     navigate("/");
//   };

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/resources", label: "Resource Sharing" },
//     { path: "/marketplace", label: "Marketplace" },
//     { path: "/chatbot", label: "Chatbot" },
//   ];

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const detectRomanUrdu = (text: string): boolean => {
//     const urduKeywords = [
//       "kaise", "kya", "kyun", "kahan", "kis", "kitna", "kitni", "kaun",
//       "mera", "mere", "hamara", "tumhara", "apka", "mai", "hum", "tum", "aap",
//       "hai", "hain", "tha", "the", "ho", "hun", "hey", "hein",
//       "farm", "fasal", "khet", "beej", "khad", "pani", "sawai", "dehat",
//       "bimaar", "keera", "rog", "dawai", "zindagi", "madad", "masla", "hal"
//     ];
//     const textLower = text.toLowerCase();
//     const urduWordCount = urduKeywords.filter(word => textLower.includes(word)).length;
//     return urduWordCount >= 2;
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: messages.length + 1,
//       text: inputMessage,
//       sender: "user",
//       timestamp: new Date(),
//       language: detectRomanUrdu(inputMessage) ? "urdu" : "english",
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     const currentInput = inputMessage;
//     setInputMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/chatbot/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ query: currentInput }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       const botMessage: Message = {
//         id: messages.length + 2,
//         text: data.response,
//         sender: "bot",
//         timestamp: new Date(),
//         language: detectRomanUrdu(data.response) ? "urdu" : "english",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       const errorMessage: Message = {
//         id: messages.length + 2,
//         text: isUrduMode 
//           ? "Connection failed. Baraye meherbani check karein ke backend port 8000 par run ho raha hai ya nahi."
//           : "Connection failed. Please check if the backend is running on port 8000.",
//         sender: "bot",
//         timestamp: new Date(),
//         language: isUrduMode ? "urdu" : "english",
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const quickQuestions = isUrduMode
//     ? ["Gandum ki kasht kaise karein?", "Chawal ki boi ka behtareen waqt?", "Traktor maintenance tips", "Organic farming ke tareeqe"]
//     : ["How to grow wheat?", "Best time for rice planting?", "Tractor maintenance tips", "Organic farming methods"];

//   const getMessageStyles = (message: Message) => {
//     const baseStyles = "rounded-2xl p-4 max-w-[80%] shadow-sm ";
//     return message.sender === "bot" 
//       ? baseStyles + "bg-card border border-border" 
//       : baseStyles + "bg-primary text-primary-foreground";
//   };

//   const toggleLanguage = () => {
//     setIsUrduMode(!isUrduMode);
//     toast({
//       title: isUrduMode ? "Switched to English" : "Roman Urdu mein tabdeel",
//       description: isUrduMode ? "Now responding in English" : "Ab jawab Roman Urdu mein milega",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <Card className="mb-6 bg-card border-border shadow-lg">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-md">
//                     <MessageSquare className="h-7 w-7 text-primary-foreground" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-2xl font-bold text-card-foreground">
//                       AgriBot
//                     </CardTitle>
//                     <CardDescription className="text-muted-foreground">
//                       {isUrduMode 
//                         ? "AgriConnect ke liye aap ka agricultural assistant" 
//                         : "Your Agricultural Assistant for AgriConnect"}
//                     </CardDescription>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Badge 
//                     variant={isUrduMode ? "default" : "secondary"}
//                     className="cursor-pointer font-semibold px-4 py-2"
//                     onClick={toggleLanguage}
//                   >
//                     <Languages className="h-3 w-3 mr-1" />
//                     {isUrduMode ? "اردو" : "English"}
//                   </Badge>
//                   <Badge className="bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2">
//                     {isUrduMode ? "آن لائن" : "Online"}
//                   </Badge>
//                 </div>
//               </div>
//             </CardHeader>
//           </Card>

//           {/* Chat Area */}
//           <Card className="mb-4 shadow-xl border-border">
//             <CardContent className="p-0">
//               <ScrollArea className="h-[500px] p-6">
//                 <div className="space-y-4">
//                   {messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
//                     >
//                       <div
//                         className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
//                           message.sender === "bot" ? "bg-primary" : "bg-secondary"
//                         }`}
//                       >
//                         {message.sender === "bot" ? (
//                           <Bot className="h-5 w-5 text-primary-foreground" />
//                         ) : (
//                           <User className="h-5 w-5 text-secondary-foreground" />
//                         )}
//                       </div>
//                       <div className={getMessageStyles(message)}>
//                         <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed text-left">
//                           <ReactMarkdown>{message.text}</ReactMarkdown>
//                         </div>
//                         <div className="flex justify-between items-center mt-2">
//                           <p className={`text-xs ${message.sender === "bot" ? "text-muted-foreground" : "text-primary-foreground/80"}`}>
//                             {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                           </p>
//                           {message.language && (
//                             <Badge variant="outline" className="text-xs">
//                               {message.language === "urdu" ? "اردو" : "English"}
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {isLoading && (
//                     <div className="flex items-start gap-3">
//                       <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-md">
//                         <Bot className="h-5 w-5 text-primary-foreground" />
//                       </div>
//                       <div className="rounded-2xl p-4 bg-card border border-border shadow-sm">
//                         <div className="flex items-center gap-2">
//                           <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
//                           <span className="text-sm text-muted-foreground">
//                             {isUrduMode ? "AgriBot soch raha hai..." : "AgriBot is thinking..."}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div ref={scrollRef} />
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>

//           {/* Quick Questions */}
//           <div className="mb-4">
//             <p className="text-sm text-muted-foreground mb-2 font-medium">
//               {isUrduMode ? "Jaldee sawal:" : "Quick Questions:"}
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {quickQuestions.map((question, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setInputMessage(question)}
//                   className="border-border hover:bg-accent hover:border-accent-foreground text-foreground shadow-sm"
//                   disabled={isLoading}
//                 >
//                   {question}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Input Area */}
//           <Card className="shadow-xl border-border">
//             <CardContent className="p-4">
//               <div className="flex gap-2">
//                 <Input
//                   placeholder={isUrduMode ? "Farming, faslon, aalaat, ya AgriConnect features ke bare mein poochein..." : "Ask about farming, crops, equipment, or AgriConnect features..."}
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
//                   className="flex-1 border-border focus:border-primary focus:ring-primary"
//                   disabled={isLoading}
//                 />
//                 <Button
//                   onClick={handleSendMessage}
//                   disabled={isLoading || !inputMessage.trim()}
//                   className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
//                 >
//                   {isLoading ? (
//                     <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />
//                   ) : (
//                     <Send className="h-5 w-5" />
//                   )}
//                 </Button>
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <p className="text-xs text-muted-foreground">
//                   {isUrduMode 
//                     ? "Mujh se kuch bhi poochein kheti baari, faslon, aalaat, ya AgriConnect ke bare mein!"
//                     : "Ask me anything about agriculture, farming, crops, equipment, or how to use AgriConnect!"}
//                 </p>
//                 <Badge 
//                   variant="outline" 
//                   className="text-xs cursor-pointer hover:bg-accent"
//                   onClick={toggleLanguage}
//                 >
//                   <Languages className="h-3 w-3 mr-1" />
//                   {isUrduMode ? "Switch to English" : "Roman Urdu mein poochein"}
//                 </Badge>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;



import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Menu, LogOut, Home, Share2, ShoppingCart, MessageSquare, Languages } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  language?: "urdu" | "english";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Assalam-o-Alaikum! Main AgriBot hun. Aap ka agricultural assistant. Main aap ki madad kar sakta hun farming techniques, crop management, equipment advice, marketplace guidance, aur AgriConnect platform features ke bare mein. Aaj main aap ki kese madad kar sakta hun?",
      sender: "bot",
      timestamp: new Date(),
      language: "urdu"
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUrduMode, setIsUrduMode] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Navigation hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/resources", label: "Resource Sharing", icon: Share2 },
    { path: "/marketplace", label: "Marketplace", icon: ShoppingCart },
    { path: "/chatbot", label: "Chatbot", icon: MessageSquare },
  ];

  const privateNavItems = [
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Roman Urdu detection function for frontend
  const detectRomanUrdu = (text: string): boolean => {
    const urduKeywords = [
      "kaise", "kya", "kyun", "kahan", "kis", "kitna", "kitni", "kaun", 
      "mera", "mere", "hamara", "tumhara", "apka", "mai", "hum", "tum", "aap",
      "hai", "hain", "tha", "the", "ho", "hun", "hey", "hein",
      "farm", "fasal", "khet", "beej", "khad", "pani", "sawai", "dehat",
      "bimaar", "keera", "rog", "dawai", "zindagi", "madad", "masla", "hal"
    ];
    
    const textLower = text.toLowerCase();
    const urduWordCount = urduKeywords.filter(word => textLower.includes(word)).length;
    return urduWordCount >= 2;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      language: detectRomanUrdu(inputMessage) ? "urdu" : "english"
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log("🔄 Sending request to backend...", currentInput);

      const response = await fetch("http://localhost:8000/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query: currentInput }),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Response data:", data);

      // Format the response to handle markdown-style bold text
      const formattedResponse = data.response.replace(/\\(.?)\\*/g, '<strong>$1</strong>');

      const botMessage: Message = {
        id: messages.length + 2,
        text: formattedResponse,
        sender: "bot",
        timestamp: new Date(),
        language: detectRomanUrdu(data.response) ? "urdu" : "english"
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("💥 Fetch error:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: isUrduMode 
          ? "Connection failed. Baraye meherbani check karein ke backend port 8000 par run ho raha hai ya nahi."
          : "Connection failed. Please check if the backend is running on port 8000.",
        sender: "bot",
        timestamp: new Date(),
        language: isUrduMode ? "urdu" : "english"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const urduQuickQuestions = [
    "Gandum ki kasht kaise karein?",
    "Chawal ki boi ka behtareen waqt?",
    "Traktor maintenance tips",
    "Organic farming ke tareeqe",
    "Kapas ke keeron ka ilaaj",
    "Meri fasal mein pani ki kami hai",
    "Beej ki quality kaise check karein?",
    "Market mein achi qeemat kaise paayein?"
  ];

  const englishQuickQuestions = [
    "How to grow wheat?",
    "Best time for rice planting?",
    "Tractor maintenance tips",
    "Organic farming methods",
    "Pest control for cotton",
    "My crop has water shortage",
    "How to check seed quality?",
    "How to get better prices in market?"
  ];

  const quickQuestions = isUrduMode ? urduQuickQuestions : englishQuickQuestions;

  // Function to render formatted text with bold support
  const renderFormattedText = (text: string) => {
    return { __html: text.replace(/\\(.?)\\*/g, '<strong class="font-bold">$1</strong>') };
  };

  // Function to apply message styles
  const getMessageStyles = (message: Message) => {
    const baseStyles = "rounded-2xl p-4 max-w-[80%] shadow-sm ";
    
    if (message.sender === "bot") {
      return baseStyles + "bg-card border border-border";
    } else {
      return baseStyles + "bg-primary text-primary-foreground";
    }
  };

  const toggleLanguage = () => {
    setIsUrduMode(!isUrduMode);
    toast({
      title: isUrduMode ? "Switched to English" : "Roman Urdu mein tabdeel",
      description: isUrduMode ? "Now responding in English" : "Ab jawab Roman Urdu mein milega",
    });
  };

  return (<div className="min-h-screen bg-background">
      {/* Chatbot Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-6 bg-card border-border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <MessageSquare className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-card-foreground">
                      AgriBot
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {isUrduMode 
                        ? "AgriConnect ke liye aap ka agricultural assistant" 
                        : "Your Agricultural Assistant for AgriConnect"}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={isUrduMode ? "default" : "secondary"}
                    className="cursor-pointer font-semibold px-4 py-2"
                    onClick={toggleLanguage}
                  >
                    <Languages className="h-3 w-3 mr-1" />
                    {isUrduMode ? "اردو" : "English"}
                  </Badge>
                  <Badge className="bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2">
                    {isUrduMode ? "آن لائن" : "Online"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Area */}
          <Card className="mb-4 shadow-xl border-border">
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
                        className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                          message.sender === "bot"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {message.sender === "bot" ? (
                          <Bot className="h-5 w-5 text-primary-foreground" />
                        ) : (
                          <User className="h-5 w-5 text-secondary-foreground" />
                        )}
                      </div>
                      <div className={getMessageStyles(message)}>
                        <div 
                          className="text-sm md:text-base whitespace-pre-wrap leading-relaxed text-left"
                          dangerouslySetInnerHTML={renderFormattedText(message.text)}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <p className={`text-xs ${
                            message.sender === "bot"
                              ? "text-muted-foreground"
                              : "text-primary-foreground/80"
                          }`}>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {message.language && (
                            <Badge variant="outline" className="text-xs">
                              {message.language === "urdu" ? "اردو" : "English"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="rounded-2xl p-4 bg-card border border-border shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                          <span className="text-sm text-muted-foreground">
                            {isUrduMode ? "AgriBot soch raha hai..." : "AgriBot is thinking..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2 font-medium">
              {isUrduMode ? "Jaldee sawal:" : "Quick Questions:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(question)}
                  className="border-border hover:bg-accent hover:border-accent-foreground text-foreground shadow-sm"
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <Card className="shadow-xl border-border">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={
                    isUrduMode 
                      ? "Farming, faslon, aalaat, ya AgriConnect features ke bare mein poochein..."
                      : "Ask about farming, crops, equipment, or AgriConnect features..."
                  }
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && !isLoading && handleSendMessage()
                  }
                  className="flex-1 border-border focus:border-primary focus:ring-primary"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {isUrduMode 
                    ? "Mujh se kuch bhi poochein kheti baari, faslon, aalaat, ya AgriConnect ke bare mein!"
                    : "Ask me anything about agriculture, farming, crops, equipment, or how to use AgriConnect!"
                  }
                </p>
                <Badge 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-accent"
                  onClick={toggleLanguage}
                >
                  <Languages className="h-3 w-3 mr-1" />
                  {isUrduMode ? "Switch to English" : "Roman Urdu mein poochein"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;