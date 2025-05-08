
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useToast } from "./use-toast";

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  content: string;
  resource_type: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type ResourceFormData = {
  title: string;
  description?: string;
  content: string;
  resource_type: string;
  tags?: string[];
};

export function useResources() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchResources = async (): Promise<Resource[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as Resource[];
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error fetching resources",
        description: err.message,
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getResourceById = async (id: string): Promise<Resource | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as Resource;
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error fetching resource",
        description: err.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createResource = async (resourceData: ResourceFormData): Promise<Resource | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user) {
        throw new Error("You must be logged in to create a resource");
      }
      
      const { data, error } = await supabase
        .from('resources')
        .insert({
          ...resourceData,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Resource created",
        description: "Your resource has been created successfully",
      });
      
      return data as Resource;
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error creating resource",
        description: err.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateResource = async (id: string, resourceData: Partial<ResourceFormData>): Promise<Resource | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('resources')
        .update(resourceData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Resource updated",
        description: "Your resource has been updated successfully",
      });

      return data as Resource;
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error updating resource",
        description: err.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResource = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Resource deleted",
        description: "Your resource has been deleted successfully",
      });

      return true;
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error deleting resource",
        description: err.message,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async (prompt: string, resourceType: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await supabase.functions.invoke('generate-content', {
        body: { prompt, resourceType }
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Error generating content");
      }
      
      return response.data.content;
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error generating content",
        description: err.message,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
    generateContent,
  };
}
