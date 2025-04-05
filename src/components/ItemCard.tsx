
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

interface ItemCardProps {
  item: Item;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function ItemCard({ item, onDelete, onView }: ItemCardProps) {
  const statusColor = item.status === ItemStatus.LOST
    ? "bg-klh-lightred text-red-600"
    : "bg-klh-lightgreen text-green-600";
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {item.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={statusColor}>
              {item.status === ItemStatus.LOST ? "Lost" : "Found"}
            </Badge>
            <Badge variant="outline" className="ml-2">
              {item.category}
            </Badge>
          </div>
          
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
        <CardDescription>
          {formatDistanceToNow(item.createdAt, { addSuffix: true })}
          {item.location.name && (
            <span className="block">at {item.location.name}</span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.description}
        </p>
      </CardContent>
      
      {onView && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onView(item.id)}
          >
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
