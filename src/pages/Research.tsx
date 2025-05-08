
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PerplexitySearch from "@/components/PerplexitySearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Example search templates
const searchTemplates = [
  {
    category: "Trend e statistiche",
    examples: [
      "Quali sono le tendenze attuali su Instagram nel settore della moda?",
      "Statistiche recenti sull'engagement su TikTok",
      "Come sono cambiati gli algoritmi di Facebook nell'ultimo mese?",
      "Quali sono i formati di contenuto più popolari su LinkedIn nel 2025?"
    ]
  },
  {
    category: "Idee di contenuto",
    examples: [
      "Idee per contenuti Instagram nel settore beauty",
      "Tipi di video virali su TikTok per piccole imprese",
      "Argomenti di tendenza su LinkedIn per professionisti tech",
      "Formato di contenuto efficace per aziende B2B su Facebook"
    ]
  },
  {
    category: "Analisi della concorrenza",
    examples: [
      "Quali strategie social sta usando Nike attualmente?",
      "Come Zara promuove i nuovi prodotti sui social?",
      "Esempi di campagne di successo nel settore automotive",
      "Quali influencer stanno collaborando con marchi di tecnologia?"
    ]
  }
];

const Research = () => {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ricerca e analisi</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Utilizza l'intelligenza artificiale per ricercare informazioni aggiornate sul mondo dei social media
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main search column */}
          <div className="lg:col-span-2">
            <PerplexitySearch />
            
            <div className="mt-8">
              <Tabs defaultValue="trend">
                <TabsList className="mb-6 w-full justify-start">
                  <TabsTrigger value="trend">Trend e statistiche</TabsTrigger>
                  <TabsTrigger value="ideas">Idee di contenuto</TabsTrigger>
                  <TabsTrigger value="competition">Analisi della concorrenza</TabsTrigger>
                </TabsList>
                
                {searchTemplates.map((template, index) => (
                  <TabsContent key={index} value={['trend', 'ideas', 'competition'][index]}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Esempi di ricerca: {template.category}</CardTitle>
                        <CardDescription>
                          Utilizza questi esempi come ispirazione per le tue ricerche
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {template.examples.map((example, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-sm font-medium">{i+1}</span>
                              <span className="text-sm">{example}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
          
          {/* Tips column */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Come utilizzare la ricerca</CardTitle>
                <CardDescription>Consigli per ottenere i migliori risultati</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="space-y-1">
                    <p className="font-medium">Sii specifico</p>
                    <p className="text-sm text-muted-foreground">Più specifico è il tuo quesito, migliori saranno i risultati.</p>
                  </li>
                  <li className="space-y-1">
                    <p className="font-medium">Usa parole chiave</p>
                    <p className="text-sm text-muted-foreground">Includi termini rilevanti per il tuo settore o obiettivo.</p>
                  </li>
                  <li className="space-y-1">
                    <p className="font-medium">Fai domande dirette</p>
                    <p className="text-sm text-muted-foreground">Le domande chiare ottengono risposte più precise.</p>
                  </li>
                  <li className="space-y-1">
                    <p className="font-medium">Specifica il contesto</p>
                    <p className="text-sm text-muted-foreground">Aggiungi dettagli sul tuo settore o pubblico target.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Casi d'uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="font-medium">Ricerca di tendenze</p>
                  <p className="text-sm text-muted-foreground">Scopri le tendenze più recenti per mantenerti aggiornato.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Analisi dei competitor</p>
                  <p className="text-sm text-muted-foreground">Scopri cosa stanno facendo i tuoi concorrenti sui social.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Ispirazione per contenuti</p>
                  <p className="text-sm text-muted-foreground">Trova idee fresche per i tuoi post sui social media.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Approfondimento di argomenti</p>
                  <p className="text-sm text-muted-foreground">Ottieni informazioni dettagliate su temi specifici.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Research;
