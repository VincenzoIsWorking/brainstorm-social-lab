
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock data for guides
const guides = [
  {
    id: 1,
    title: "Guida completa a Instagram",
    description: "Tutto ciò che devi sapere per creare una presenza di successo su Instagram nel 2025",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2574",
    category: "Instagram",
    difficulty: "Principiante",
    updatedAt: "10 Maggio 2025",
    chapters: 8
  },
  {
    id: 2,
    title: "Come creare contenuti virali su TikTok",
    description: "Strategie collaudate per aumentare la visibilità e l'engagement dei tuoi video su TikTok",
    image: "https://images.unsplash.com/photo-1596046055442-d9bc613840e1?q=80&w=2670",
    category: "TikTok",
    difficulty: "Intermedio",
    updatedAt: "5 Maggio 2025",
    chapters: 6
  },
  {
    id: 3,
    title: "LinkedIn per il personal branding",
    description: "Come costruire un profilo professionale che si distingue e attira opportunità di carriera",
    image: "https://images.unsplash.com/photo-1616469829581-73149105b7e5?q=80&w=2670",
    category: "LinkedIn",
    difficulty: "Principiante",
    updatedAt: "29 Aprile 2025",
    chapters: 5
  },
  {
    id: 4,
    title: "Facebook Marketing per piccole imprese",
    description: "Strategie di Facebook Marketing a basso costo per aumentare le vendite e la notorietà del brand",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670",
    category: "Facebook",
    difficulty: "Intermedio",
    updatedAt: "22 Aprile 2025",
    chapters: 7
  },
  {
    id: 5,
    title: "YouTube SEO: ottimizza i tuoi video",
    description: "Come far apparire i tuoi video nei risultati di ricerca di YouTube e Google",
    image: "https://images.unsplash.com/photo-1610128114197-485d933885c5?q=80&w=2574",
    category: "YouTube",
    difficulty: "Avanzato",
    updatedAt: "15 Aprile 2025",
    chapters: 9
  },
  {
    id: 6,
    title: "Twitter per il marketing B2B",
    description: "Come utilizzare Twitter per generare lead qualificati e costruire relazioni nel settore B2B",
    image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=2574",
    category: "Twitter",
    difficulty: "Intermedio",
    updatedAt: "8 Aprile 2025",
    chapters: 6
  },
];

const difficultyColors = {
  "Principiante": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Intermedio": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Avanzato": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

const Guides = () => {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Guide e Tutorial</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Risorse dettagliate per aiutarti a padroneggiare i social media
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button variant="outline" className="rounded-full">Tutti</Button>
          <Button variant="outline" className="rounded-full">Instagram</Button>
          <Button variant="outline" className="rounded-full">TikTok</Button>
          <Button variant="outline" className="rounded-full">LinkedIn</Button>
          <Button variant="outline" className="rounded-full">Facebook</Button>
          <Button variant="outline" className="rounded-full">YouTube</Button>
          <Button variant="outline" className="rounded-full">Twitter</Button>
        </div>
        
        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">{guide.category}</Badge>
                <Badge 
                  className={`absolute top-4 right-4 ${
                    difficultyColors[guide.difficulty as keyof typeof difficultyColors]
                  }`}
                >
                  {guide.difficulty}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 hover:text-brand-600 transition-colors">
                  <Link to={`/guides/${guide.id}`}>{guide.title}</Link>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3">{guide.description}</CardDescription>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  <span>{guide.chapters} capitoli</span>
                  <span className="mx-2">•</span>
                  <span>Aggiornato: {guide.updatedAt}</span>
                </div>
                <Button variant="ghost" asChild size="sm">
                  <Link to={`/guides/${guide.id}`}>Leggi</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-brand-50 dark:bg-gray-900 border-brand-100 dark:border-gray-800">
            <CardHeader>
              <CardTitle>Non trovi quello che cerchi?</CardTitle>
              <CardDescription>Abbiamo molte più guide e risorse disponibili per gli utenti registrati.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/auth">Registrati gratuitamente</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Guides;
