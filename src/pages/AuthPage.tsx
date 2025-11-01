// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useAuth } from "@/contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";

// const AuthPage = () => {
//   const { toast } = useToast();
//   const { login, signup, user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState('login');

//   const from = location.state?.from || '/';

//   useEffect(() => {
//     if (user) {
//       navigate(from, { replace: true });
//     }
//   }, [user, navigate, from]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const email = formData.get('email');
//     const password = formData.get('password');

//     if (email && password) {
//       login({
//         name: email.split('@')[0],
//         email: email,
//         phone: '+92 300 1234567',
//         location: 'Lahore, Punjab',
//         role: 'Farmer',
//         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
//       });
//       toast({
//         title: "Login Successful",
//         description: "Welcome back to AgriConnect!",
//       });
//       navigate(from, { replace: true });
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const password = formData.get('password');
//     const phone = formData.get('phone');

//     if (name && email && password && phone) {
//       signup({
//         name: name,
//         email: email,
//         phone: phone,
//         location: 'Lahore, Punjab',
//         role: 'Farmer',
//         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
//       });
//       toast({
//         title: "Account Created",
//         description: "Welcome to AgriConnect!",
//       });
//       navigate(from, { replace: true });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
//               <span className="text-primary-foreground font-bold text-2xl">A</span>
//             </div>
//           </div>
//           <CardTitle className="text-2xl">Welcome to AgriConnect</CardTitle>
//           <CardDescription>
//             {location.state?.from ? 'Please login to continue' : 'Join Pakistan\'s leading agricultural platform'}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="login">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input id="login-email" name="email" type="email" placeholder="your@email.com" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="login-password">Password</Label>
//                   <Input id="login-password" name="password" type="password" required />
//                 </div>
//                 <Button type="submit" className="w-full">Login</Button>
//               </form>
//             </TabsContent>
            
//             <TabsContent value="signup">
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-name">Full Name</Label>
//                   <Input id="signup-name" name="name" placeholder="Muhammad Hassan" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-email">Email</Label>
//                   <Input id="signup-email" name="email" type="email" placeholder="your@email.com" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-phone">Phone Number</Label>
//                   <Input id="signup-phone" name="phone" placeholder="+92 300 1234567" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-password">Password</Label>
//                   <Input id="signup-password" name="password" type="password" required />
//                 </div>
//                 <Button type="submit" className="w-full">Create Account</Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AuthPage;


// 2222
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";

// const API_BASE_URL = "http://127.0.0.1:8000"; // 🔥 change to deployed URL later

// const AuthPage = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("login");
//   const [loading, setLoading] = useState(false);

//   const from = location.state?.from || "/";

//   // 🔐 LOGIN HANDLER
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     try {
//       const res = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast({
//           title: "Login Successful 🎉",
//           description: `Welcome back, ${data.user.name}!`,
//         });
//         navigate(from, { replace: true });
//       } else {
//         toast({
//           title: "Login Failed ❌",
//           description: data.detail || "Invalid credentials",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Network Error",
//         description: "Unable to connect to server.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🧾 SIGNUP HANDLER
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const user = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//       contact: formData.get("phone"),
//       province: formData.get("province"),
//       city: formData.get("city"),
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast({
//           title: "Account Created 🎊",
//           description: "You can now log in to AgriConnect.",
//         });
//         setActiveTab("login");
//       } else {
//         toast({
//           title: "Signup Failed ❌",
//           description: data.detail || "Something went wrong",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Network Error",
//         description: "Unable to connect to server.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
//               <span className="text-primary-foreground font-bold text-2xl">A</span>
//             </div>
//           </div>
//           <CardTitle className="text-2xl">Welcome to AgriConnect</CardTitle>
//           <CardDescription>
//             {location.state?.from ? "Please login to continue" : "Join Pakistan's leading agricultural platform"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>

//             {/* LOGIN FORM */}
//             <TabsContent value="login">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input id="login-email" name="email" type="email" placeholder="your@email.com" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="login-password">Password</Label>
//                   <Input id="login-password" name="password" type="password" required />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Logging in..." : "Login"}
//                 </Button>
//               </form>
//             </TabsContent>

//             {/* SIGNUP FORM */}
//             <TabsContent value="signup">
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-name">Full Name</Label>
//                   <Input id="signup-name" name="name" placeholder="Abdus Samad" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-email">Email</Label>
//                   <Input id="signup-email" name="email" type="email" placeholder="your@email.com" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-phone">Phone Number</Label>
//                   <Input id="signup-phone" name="phone" placeholder="03161105780" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-province">Province</Label>
//                   <Input id="signup-province" name="province" placeholder="Sindh" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-city">City</Label>
//                   <Input id="signup-city" name="city" placeholder="Karachi" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-password">Password</Label>
//                   <Input id="signup-password" name="password" type="password" required />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Creating Account..." : "Create Account"}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AuthPage;


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = "http://127.0.0.1:8000";

const AuthPage = () => {
  const { toast } = useToast();
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/";
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // 🔐 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (res.ok) {
        // Save user in AuthContext + localStorage
        // login({
        //     ...data.user,
        //     token: data.access_token,  // ← use `access_token` here
        //   });
        login(data.user, data.access_token);
        // console.log("User ID:", data.access_token);
        toast({
          title: "Login Successful 🎉",
          description: `Welcome back, ${data.user.name}!`,
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login Failed ❌",
          description: data.detail || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🧾 SIGNUP HANDLER
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      contact: formData.get("phone"),
      province: formData.get("province"),
      city: formData.get("city"),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (res.ok) {
        // Save user in AuthContext (optional: login immediately after signup)
        // signup({
        //   ...data.user,
        //   token: data.token || null,
        // });
        // signup({
        //   ...data.user,
        //   token: data.access_token,  // ← use `access_token` here
        //   });
        signup(data.user, data.access_token); 

        toast({
          title: "Account Created 🎊",
          description: "You can now log in to AgriConnect.",
        });
        setActiveTab("login");
      } else {
        toast({
          title: "Signup Failed ❌",
          description: data.detail || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">A</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to AgriConnect</CardTitle>
          <CardDescription>
            {location.state?.from ? "Please login to continue" : "Join Pakistan's leading agricultural platform"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP FORM */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" name="name" placeholder="Abdus Samad" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input id="signup-phone" name="phone" placeholder="03161105780" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-province">Province</Label>
                  <Input id="signup-province" name="province" placeholder="Sindh" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-city">City</Label>
                  <Input id="signup-city" name="city" placeholder="Karachi" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
