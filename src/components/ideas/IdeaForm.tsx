
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lightbulb } from "lucide-react";

interface IdeaFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    platform: "linkedin" | "facebook" | "twitter" | "youtube" | "tiktok" | "instagram";
  }) => void;
  isSubmitting?: boolean;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<"linkedin" | "facebook" | "twitter" | "youtube" | "tiktok" | "instagram">("linkedin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, platform });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-brand-600" />
            <CardTitle>Nuova idea</CardTitle>
          </div>
          <CardDescription>
            Inserisci i dettagli della tua nuova idea per i social media
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titolo</Label>
            <Input
              id="title"
              placeholder="Es. Corso di formazione online per lavoratori remote"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              placeholder="Descrivi la tua idea in dettaglio..."
              className="min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Piattaforma</Label>
            <RadioGroup 
              value={platform} 
              onValueChange={(val) => setPlatform(val as any)} 
              className="grid grid-cols-2 md:grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linkedin" id="linkedin" />
                <Label htmlFor="linkedin" className="text-social-linkedin">LinkedIn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="facebook" id="facebook" />
                <Label htmlFor="facebook" className="text-social-facebook">Facebook</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="twitter" id="twitter" />
                <Label htmlFor="twitter" className="text-social-twitter">Twitter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="youtube" id="youtube" />
                <Label htmlFor="youtube" className="text-social-youtube">YouTube</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tiktok" id="tiktok" />
                <Label htmlFor="tiktok" className="text-social-tiktok dark:text-white">TikTok</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instagram" id="instagram" />
                <Label htmlFor="instagram" className="text-social-instagram">Instagram</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Analisi in corso..." : "Genera e analizza idea"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default IdeaForm;
