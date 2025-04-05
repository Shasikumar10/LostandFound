
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Item, ItemStatus } from "@/types";
import { itemService } from "@/services/item-service";
import { formatDistanceToNow } from "date-fns";
import { Mail, Phone, MapPin, Calendar, User, ArrowLeft, Trash2 } from "lucide-react";

export default function ItemDetailPage() {
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const loadItem = async () => {
      if (!id) return;
      
      try {
        const itemData = await itemService.getItem(id);
        setItem(itemData);
      } catch (error) {
        console.error("Failed to load item:", error);
        toast({
          title: "Error",
          description: "Failed to load item details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadItem();
  }, [id, toast]);

  const handleDelete = async () => {
    if (!item) return;
    
    try {
      setIsDeleting(true);
      await itemService.deleteItem(item.id);
      
      toast({
        title: "Item deleted",
        description: "The item has been removed successfully",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Item Not Found</CardTitle>
                <CardDescription>
                  The item you're looking for doesn't exist or has been removed.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const statusColor = item.status === ItemStatus.LOST
    ? "bg-klh-lightred text-red-600"
    : "bg-klh-lightgreen text-green-600";

  const isOwner = user && user.id === item.userId;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {item.imageUrl ? (
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="md:w-1/2 h-64 md:h-auto bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image Available</span>
                </div>
              )}
              
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge className={statusColor}>
                    {item.status === ItemStatus.LOST ? "Lost" : "Found"}
                  </Badge>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                
                <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                
                <div className="mb-4 text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{item.location.name}</div>
                      {item.location.description && (
                        <div className="text-sm text-muted-foreground">
                          {item.location.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{item.contact.email}</span>
                    </div>
                    {item.contact.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{item.contact.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {isOwner && (
              <CardFooter className="bg-muted/50 flex justify-end">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete Item"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
