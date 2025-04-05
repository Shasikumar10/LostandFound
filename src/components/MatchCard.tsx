
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ItemMatch, MatchStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Check, X } from "lucide-react";

interface MatchCardProps {
  match: ItemMatch;
  onApprove?: (id: string) => void;
  onDeny?: (id: string) => void;
  onView?: (id: string) => void;
}

export function MatchCard({ match, onApprove, onDeny, onView }: MatchCardProps) {
  if (!match.lostItem || !match.foundItem) {
    return null;
  }
  
  const confidencePercent = Math.round(match.confidence * 100);
  
  let statusBadge;
  switch (match.status) {
    case MatchStatus.APPROVED:
      statusBadge = <Badge className="bg-klh-lightgreen text-green-600">Approved</Badge>;
      break;
    case MatchStatus.DENIED:
      statusBadge = <Badge className="bg-klh-lightred text-red-600">Denied</Badge>;
      break;
    default:
      statusBadge = <Badge className="bg-klh-lightorange text-orange-600">Pending</Badge>;
  }
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="grid grid-cols-2 h-40 overflow-hidden">
        {match.lostItem.imageUrl && (
          <img 
            src={match.lostItem.imageUrl} 
            alt={match.lostItem.title} 
            className="w-full h-full object-cover border-r"
          />
        )}
        {match.foundItem.imageUrl && (
          <img 
            src={match.foundItem.imageUrl} 
            alt={match.foundItem.title} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            {statusBadge}
            <Badge variant="outline" className="font-mono">
              {confidencePercent}% Match
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-1">
          Potential Match Found
        </CardTitle>
        <CardDescription>
          {formatDistanceToNow(match.createdAt, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Lost Item</p>
            <p className="font-medium line-clamp-1">{match.lostItem.title}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Found Item</p>
            <p className="font-medium line-clamp-1">{match.foundItem.title}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        {match.status === MatchStatus.PENDING && (
          <>
            {onApprove && (
              <Button 
                variant="outline" 
                className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => onApprove(match.id)}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            )}
            
            {onDeny && (
              <Button 
                variant="outline" 
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDeny(match.id)}
              >
                <X className="h-4 w-4 mr-2" />
                Deny
              </Button>
            )}
          </>
        )}
        
        {onView && (
          <Button 
            variant={match.status === MatchStatus.PENDING ? "ghost" : "outline"} 
            className={match.status === MatchStatus.PENDING ? "w-auto" : "w-full"}
            onClick={() => onView(match.id)}
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
