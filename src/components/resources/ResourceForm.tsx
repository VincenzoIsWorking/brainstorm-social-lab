
import React from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { ResourceFormData, useResources } from "@/hooks/useResources";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import our new components
import ResourceFormFields from "./ResourceFormFields";
import AIContentGenerator from "./AIContentGenerator";
import ResourceContentField from "./ResourceContentField";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  resource_type: z.string().min(1, { message: "Please select a resource type" }),
  tags: z.string().optional().transform(val => val ? val.split(",").map(tag => tag.trim()).filter(Boolean) : []),
});

export interface ResourceFormData {
  title: string;
  description?: string;
  content: string;
  resource_type: string;
  tags?: string[];
}

interface ResourceFormProps {
  initialData?: ResourceFormData;
  isEditing?: boolean;
  resourceId?: string;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ 
  initialData,
  isEditing = false,
  resourceId 
}) => {
  const { createResource, updateResource } = useResources();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Convert array tags to comma-separated string for the form input
  const formattedInitialData = initialData ? {
    ...initialData,
    tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
  } : {
    title: "",
    description: "",
    content: "",
    resource_type: "article",
    tags: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formattedInitialData,
  });

  const { formState } = form;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing && resourceId) {
        await updateResource(resourceId, values);
        toast({
          title: "Resource updated",
          description: "Your resource has been updated successfully",
        });
      } else {
        await createResource(values as ResourceFormData);
        toast({
          title: "Resource created",
          description: "Your resource has been created successfully",
        });
      }
      navigate("/resources");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-6">
            <Button variant="outline" type="button" onClick={() => navigate("/resources")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceFormFields />
            
            <div className="space-y-4">
              <AIContentGenerator />
              <ResourceContentField />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update" : "Create"} Resource
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ResourceForm;
