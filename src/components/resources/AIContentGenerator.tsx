
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useResources } from "@/hooks/useResources";
import { useToast } from "@/hooks/use-toast";

export const AIContentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const { generateContent } = useResources();
  const { toast } = useToast();
  const form = useFormContext();

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
  );
};

export default AIContentGenerator;
