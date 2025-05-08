
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Save, ArrowLeft } from "lucide-react";
import { ResourceFormData, useResources } from "@/hooks/useResources";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const resourceTypeOptions = [
  { label: "Article", value: "article" },
  { label: "Script", value: "script" },
  { label: "Idea", value: "idea" },
  { label: "Checklist", value: "checklist" },
];

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  resource_type: z.string().min(1, { message: "Please select a resource type" }),
  tags: z.string().optional().transform(val => val ? val.split(",").map(tag => tag.trim()).filter(Boolean) : []),
});

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
  const { createResource, updateResource, generateContent } = useResources();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Convert array tags to comma-separated string for the form input
  const formattedInitialData = initialData ? {
    ...initialData,
    tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
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

  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a prompt for the AI",
      });
      return;
    }

    const resourceType = form.getValues("resource_type");
    
    try {
      setIsGenerating(true);
      const content = await generateContent(aiPrompt, resourceType);
      
      if (content) {
        form.setValue("content", content, { shouldValidate: true });
        toast({
          title: "Content generated",
          description: "AI content has been generated successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error.message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <Button variant="outline" type="button" onClick={() => navigate("/resources")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter resource title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter a brief description..." {...field} />
                  </FormControl>
                  <FormDescription>
                    A short summary of your resource
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resource_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resourceTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter tags separated by commas..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    E.g., "instagram, video, tutorial"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" /> Generate with AI
              </h3>
              <div className="space-y-3">
                <Textarea 
                  placeholder="Describe what content you want to generate..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                />
                <Button 
                  type="button" 
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                >
                  {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {!isGenerating && <Sparkles className="mr-2 h-4 w-4" />}
                  {isGenerating ? "Generating..." : "Generate Content"}
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter resource content or generate with AI..."
                      {...field}
                      rows={12}
                      className="font-mono text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
  );
};

export default ResourceForm;
