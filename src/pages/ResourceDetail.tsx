
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useResources, Resource } from "@/hooks/useResources";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft, Edit, Trash, Clock, FileType } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getResourceById, deleteResource } = useResources();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/resources");
      return;
    }

    const loadResource = async () => {
      const data = await getResourceById(id);
      if (!data) {
        navigate("/resources");
        return;
      }
      setResource(data);
      setIsLoading(false);
    };

    loadResource();
  }, [id]);

  const resourceTypeBadgeColor = () => {
    if (!resource) return "";
    
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

  const handleDelete = async () => {
    if (!resource) return;
    
    setIsDeleting(true);
    const success = await deleteResource(resource.id);
    
    if (success) {
      navigate("/resources");
    } else {
      setShowDeleteDialog(false);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!resource) {
    return null; // Navigate will handle this
  }

  return (
    <PageLayout>
      <section className="py-10 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button variant="outline" onClick={() => navigate("/resources")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back 
          </Button>
          <div className="flex-1" />
          <Button variant="outline" onClick={() => navigate(`/resources/edit/${resource.id}`)} className="mr-2">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="outline" className="text-destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className={`${resourceTypeBadgeColor()} capitalize`} variant="outline">
              <FileType className="h-3 w-3 mr-1" /> 
              {resource.resource_type}
            </Badge>
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" /> 
              Created: {format(new Date(resource.created_at), "MMMM dd, yyyy")}
            </div>
            {resource.created_at !== resource.updated_at && (
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" /> 
                Updated: {format(new Date(resource.updated_at), "MMMM dd, yyyy")}
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
          {resource.description && (
            <p className="text-muted-foreground text-lg mb-4">
              {resource.description}
            </p>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-6">
              {resource.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {resource.content.split("\n").map((paragraph, i) => (
                paragraph.trim() ? (
                  paragraph.startsWith("#") ? (
                    <h3 key={i} className="mt-4 mb-2 font-bold text-lg">{paragraph.replace(/^#+\s/, '')}</h3>
                  ) : paragraph.startsWith("-") || paragraph.startsWith("*") ? (
                    <ul key={i} className="list-disc list-inside">
                      <li>{paragraph.substring(1).trim()}</li>
                    </ul>
                  ) : paragraph.startsWith("1.") || paragraph.startsWith("2.") ? (
                    <ol key={i} className="list-decimal list-inside">
                      <li>{paragraph.substring(2).trim()}</li>
                    </ol>
                  ) : (
                    <p key={i} className="mb-4">{paragraph}</p>
                  )
                ) : <br key={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resource "{resource.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default ResourceDetail;
