
import { NavBar } from "@/components/NavBar";
import Map from "@/components/Map";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, School, Building, Library, Coffee, Utensils, Flag } from "lucide-react";

export default function MapPage() {
  const [activeLocation, setActiveLocation] = useState("main");
  
  const locations = {
    main: { lat: 17.4065, lng: 78.5455, title: "Main Campus", description: "Main KLH University Campus" },
    library: { lat: 17.4085, lng: 78.5475, title: "Central Library", description: "Study and research center" },
    cafeteria: { lat: 17.4055, lng: 78.5435, title: "Student Cafeteria", description: "Food and refreshments" },
    dorms: { lat: 17.4045, lng: 78.5465, title: "Student Dormitories", description: "On-campus housing" },
    sports: { lat: 17.4075, lng: 78.5425, title: "Sports Complex", description: "Athletics and recreation" },
  };
  
  const handleLocationChange = (location: string) => {
    setActiveLocation(location);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campus Map</h1>
          <p className="text-muted-foreground">
            Explore the KLH campus and find your way around
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>KLH Campus</CardTitle>
              <CardDescription>Interactive map of the campus</CardDescription>
            </CardHeader>
            <CardContent>
              <Map 
                latitude={locations[activeLocation as keyof typeof locations].lat} 
                longitude={locations[activeLocation as keyof typeof locations].lng}
                className="h-[400px] w-full rounded-md overflow-hidden border"
                zoom={15}
              />
              
              <div className="mt-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{locations[activeLocation as keyof typeof locations].title}</span>
                <span className="text-sm text-muted-foreground">- {locations[activeLocation as keyof typeof locations].description}</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Campus Locations</CardTitle>
                <CardDescription>Select a location to view on the map</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="main" onValueChange={handleLocationChange}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="main">Main Areas</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="main" className="space-y-4">
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${activeLocation === "main" ? "bg-muted" : ""}`}
                      onClick={() => handleLocationChange("main")}
                    >
                      <School className="h-8 w-8 text-klh-blue p-1.5 bg-blue-100 rounded-md" />
                      <div>
                        <h3 className="font-medium">Main Campus</h3>
                        <p className="text-sm text-muted-foreground">Central administrative buildings</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${activeLocation === "library" ? "bg-muted" : ""}`}
                      onClick={() => handleLocationChange("library")}
                    >
                      <Library className="h-8 w-8 text-klh-blue p-1.5 bg-blue-100 rounded-md" />
                      <div>
                        <h3 className="font-medium">Central Library</h3>
                        <p className="text-sm text-muted-foreground">Study and research center</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${activeLocation === "dorms" ? "bg-muted" : ""}`}
                      onClick={() => handleLocationChange("dorms")}
                    >
                      <Building className="h-8 w-8 text-klh-blue p-1.5 bg-blue-100 rounded-md" />
                      <div>
                        <h3 className="font-medium">Student Dormitories</h3>
                        <p className="text-sm text-muted-foreground">On-campus housing</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="services" className="space-y-4">
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${activeLocation === "cafeteria" ? "bg-muted" : ""}`}
                      onClick={() => handleLocationChange("cafeteria")}
                    >
                      <Utensils className="h-8 w-8 text-klh-blue p-1.5 bg-blue-100 rounded-md" />
                      <div>
                        <h3 className="font-medium">Student Cafeteria</h3>
                        <p className="text-sm text-muted-foreground">Food and refreshments</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${activeLocation === "sports" ? "bg-muted" : ""}`}
                      onClick={() => handleLocationChange("sports")}
                    >
                      <Flag className="h-8 w-8 text-klh-blue p-1.5 bg-blue-100 rounded-md" />
                      <div>
                        <h3 className="font-medium">Sports Complex</h3>
                        <p className="text-sm text-muted-foreground">Athletics and recreation</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lost & Found Hotspots</CardTitle>
                <CardDescription>Common areas where items are lost or found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Library className="h-5 w-5 text-primary" />
                      <span>Central Library</span>
                    </div>
                    <Badge variant="outline" className="bg-red-50">High</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-primary" />
                      <span>Student Cafeteria</span>
                    </div>
                    <Badge variant="outline" className="bg-red-50">High</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <School className="h-5 w-5 text-primary" />
                      <span>Main Building</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-50">Medium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-primary" />
                      <span>Sports Complex</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-50">Medium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
