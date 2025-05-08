
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ResourceForm from "@/components/resources/ResourceForm";
import { useResources, Resource } from "@/hooks/useResources";
import { Loader2 } from "lucide-react";

const EditResource = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getResourceById } = useResources();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fixed: Convert string tags to array format for the form
  const initialData = {
    title: resource.title,
    description: resource.description || "",
    content: resource.content,
    resource_type: resource.resource_type,
    tags: resource.tags || [], // Ensure tags is always an array
  };

  return (
    <PageLayout>
      <section className="py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Resource</h1>
          <p className="text-muted-foreground">
            Update your content resource
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <ResourceForm 
            initialData={initialData} 
            isEditing={true} 
            resourceId={id} 
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EditResource;
