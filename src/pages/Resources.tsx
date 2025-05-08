
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import ResourceFilterBar from "@/components/resources/ResourceFilterBar";
import ResourceCard from "@/components/resources/ResourceCard";
import { useResources, Resource } from "@/hooks/useResources";
import { useToast } from "@/hooks/use-toast";
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
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Resources = () => {
  const { fetchResources, deleteResource, isLoading } = useResources();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load resources on component mount
  useEffect(() => {
    loadResources();
  }, []);

  // Filter resources when search or filter changes
  useEffect(() => {
    filterResources();
  }, [resources, searchQuery, typeFilter]);

  const loadResources = async () => {
    const data = await fetchResources();
    setResources(data);
  };

  const filterResources = () => {
    let filtered = [...resources];

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(resource => resource.resource_type === typeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        (resource.description && resource.description.toLowerCase().includes(query)) ||
        resource.content.toLowerCase().includes(query) ||
        (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    setFilteredResources(filtered);
  };

  const handleEdit = (id: string) => {
    navigate(`/resources/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      const success = await deleteResource(deleteId);
      
      if (success) {
        setResources(prev => prev.filter(resource => resource.id !== deleteId));
        toast({
          title: "Resource deleted",
          description: "The resource has been deleted successfully.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete resource",
      });
    } finally {
      setDeleteId(null);
      setIsDeleting(false);
    }
  };

  const showDeleteDialog = (id: string) => {
    setDeleteId(id);
  };

  return (
    <PageLayout>
      <section className="py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resources</h1>
          <p className="text-muted-foreground">
            Create and manage your content resources with AI assistance
          </p>
        </div>
        
        <ResourceFilterBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onEdit={handleEdit}
                onDelete={showDeleteDialog}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border rounded-lg bg-muted/20">
            <h3 className="text-xl font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-6">
              {resources.length > 0
                ? "Try adjusting your filters or search query"
                : "Create your first resource with AI assistance"}
            </p>
          </div>
        )}
      </section>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this resource.
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

export default Resources;
