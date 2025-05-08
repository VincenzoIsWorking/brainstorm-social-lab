
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Edit, Trash, FileType } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Resource } from "@/hooks/useResources";

interface ResourceCardProps {
  resource: Resource;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  viewOnly?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onEdit, onDelete, viewOnly = false }) => {
  const resourceTypeBadgeColor = () => {
    switch (resource.resource_type) {
      case "article":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "script":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "idea":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "checklist":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="card-hover-effect">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge className={`${resourceTypeBadgeColor()} capitalize mb-2`} variant="outline">
            <FileType className="h-3 w-3 mr-1" /> 
            {resource.resource_type}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" /> 
            {format(new Date(resource.created_at), "MMM dd, yyyy")}
          </div>
        </div>
        <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
        {resource.description && (
          <CardDescription className="line-clamp-2 mt-1">{resource.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm leading-relaxed line-clamp-3 text-muted-foreground">
          {resource.content}
        </p>
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button variant="outline" asChild>
            <Link to={`/resources/${resource.id}`}>
              View Details
            </Link>
          </Button>
          
          {!viewOnly && (
            <div className="flex gap-2">
              {onEdit && (
                <Button size="icon" variant="outline" onClick={() => onEdit(resource.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button size="icon" variant="outline" className="text-destructive" onClick={() => onDelete(resource.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
