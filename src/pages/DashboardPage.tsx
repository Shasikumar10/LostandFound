
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavBar } from "@/components/NavBar";
import { ItemCard } from "@/components/ItemCard";
import { MatchCard } from "@/components/MatchCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { itemService } from "@/services/item-service";
import { Item, ItemMatch, MatchStatus } from "@/types";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [matches, setMatches] = useState<ItemMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Load user's items
        const items = await itemService.getItems(user.id);
        setMyItems(items);
        
        // Load matches for the user
        const userMatches = await itemService.getMatches(user.id);
        setMatches(userMatches);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: error instanceof Error ? error.message : "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, toast]);

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }
    
    try {
      await itemService.deleteItem(itemId);
      
      // Update UI
      setMyItems(myItems.filter(item => item.id !== itemId));
      
      // Also remove any matches involving this item
      setMatches(matches.filter(
        match => match.lostItemId !== itemId && match.foundItemId !== itemId
      ));
      
      toast({
        title: "Item deleted",
        description: "The item has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: error instanceof Error ? error.message : "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleApproveMatch = async (matchId: string) => {
    try {
      const updatedMatch = await itemService.updateMatchStatus(matchId, MatchStatus.APPROVED);
      
      // Update UI
      setMatches(matches.map(match => 
        match.id === matchId ? { ...match, status: updatedMatch.status } : match
      ));
      
      toast({
        title: "Match approved",
        description: "The match has been approved successfully",
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: error instanceof Error ? error.message : "Failed to approve match",
        variant: "destructive",
      });
    }
  };

  const handleDenyMatch = async (matchId: string) => {
    try {
      const updatedMatch = await itemService.updateMatchStatus(matchId, MatchStatus.DENIED);
      
      // Update UI
      setMatches(matches.map(match => 
        match.id === matchId ? { ...match, status: updatedMatch.status } : match
      ));
      
      toast({
        title: "Match denied",
        description: "The match has been denied",
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: error instanceof Error ? error.message : "Failed to deny match",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Authentication Required</h1>
            <p className="text-muted-foreground">
              Please log in or create an account to access your dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button onClick={() => navigate("/register")}>
                Create account
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Your Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your lost and found items
              </p>
            </div>
            
            <Link to="/submit">
              <Button className="mt-4 sm:mt-0">
                <PlusCircle className="h-4 w-4 mr-2" />
                Submit New Item
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="matches">
                Matches {matches.length > 0 && `(${matches.length})`}
              </TabsTrigger>
              <TabsTrigger value="items">
                My Items {myItems.length > 0 && `(${myItems.length})`}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground animate-pulse-slow">
                    Loading matches...
                  </p>
                </div>
              ) : matches.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <h2 className="text-xl font-semibold mb-2">No Matches Yet</h2>
                  <p className="text-muted-foreground mb-4">
                    When your items match with others, they'll appear here.
                  </p>
                  <Link to="/submit">
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Submit an Item
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onApprove={handleApproveMatch}
                      onDeny={handleDenyMatch}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="items" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground animate-pulse-slow">
                    Loading your items...
                  </p>
                </div>
              ) : myItems.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <h2 className="text-xl font-semibold mb-2">No Items Yet</h2>
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any lost or found items.
                  </p>
                  <Link to="/submit">
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Submit an Item
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
