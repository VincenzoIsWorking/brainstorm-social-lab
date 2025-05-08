
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

// Mock data for templates
const templates = [
  {
    id: 1,
    title: "Post quotazione motivazionale",
    description: "Template per post con citazioni motivazionali",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574",
    category: "Instagram",
    premium: false
  },
  {
    id: 2,
    title: "Carousel informativo",
    description: "Template per carousel con statistiche e punti chiave",
    image: "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?q=80&w=2574",
    category: "Instagram",
    premium: false
  },
  {
    id: 3,
    title: "Video trend challenge",
    description: "Template per video che seguono le tendenze del momento",
    image: "https://images.unsplash.com/photo-1622292581314-34daa3f38877?q=80&w=2574",
    category: "TikTok",
    premium: true
  },
  {
    id: 4,
    title: "Cover articolo di blog",
    description: "Template per creare cover professionali per blog",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670",
    category: "Blog",
    premium: false
  },
  {
    id: 5,
    title: "Annuncio sponsorizzato",
    description: "Template per annunci pubblicitari efficaci",
    image: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=2670",
    category: "Facebook",
    premium: true
  },
  {
    id: 6,
    title: "Post di articolo professionale",
    description: "Template per condividere contenuti professionali",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2670",
    category: "LinkedIn",
    premium: true
  },
  {
    id: 7,
    title: "Copertina storia in evidenza",
    description: "Template per copertine di storie in evidenza",
    image: "https://images.unsplash.com/photo-1622665632361-48baf3ae34d5?q=80&w=2574",
    category: "Instagram",
    premium: false
  },
  {
    id: 8,
    title: "Miniatura YouTube",
    description: "Template per miniature che generano clic",
    image: "https://images.unsplash.com/photo-1567443024551-f3e3a7b3ac89?q=80&w=2670",
    category: "YouTube",
    premium: true
  }
];

const Templates = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredTemplates = activeTab === "all" 
    ? templates 
    : templates.filter(template => template.category.toLowerCase() === activeTab);

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Template</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Template professionali per accelerare la creazione dei tuoi contenuti
          </p>
        </div>
        
        {/* Tabs for filtering */}
        <div className="mb-8 overflow-x-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="inline-flex w-full justify-start h-11 p-1">
              <TabsTrigger value="all">Tutti</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {template.premium && (
                  <Badge className="absolute top-3 right-3 bg-brand-600">
                    Premium
                  </Badge>
                )}
              </div>
              <CardHeader className="py-3">
                <CardTitle className="text-base">{template.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-0 text-sm text-muted-foreground">
                {template.description}
              </CardContent>
              <CardFooter className="py-3 flex justify-between items-center">
                <Badge variant="outline">{template.category}</Badge>
                <Button 
                  size="sm" 
                  variant={template.premium && !isAuthenticated ? "outline" : "default"}
                  disabled={template.premium && !isAuthenticated}
                  asChild={!(template.premium && !isAuthenticated)}
                >
                  {(template.premium && !isAuthenticated) ? (
                    <span>Solo Premium</span>
                  ) : (
                    <Link to={`/templates/${template.id}`}>Usa template</Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Premium CTA */}
        {!isAuthenticated && (
          <div className="mt-16">
            <Card className="bg-brand-50 dark:bg-gray-900 border-brand-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-center">Sblocca tutti i template premium</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-0">
                <p className="mb-6">
                  Accedi a tutti i nostri template premium e accelera la creazione dei tuoi contenuti social.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-4 pb-6">
                <Button asChild>
                  <Link to="/pricing">Scopri i piani premium</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Templates;
