
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Generazione di idee per i social",
    description: "Sblocca la creatività con suggerimenti personalizzati per i tuoi contenuti social.",
    icon: "💡",
    color: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Assistente AI integrato",
    description: "Ottimizza i tuoi contenuti con il nostro assistente AI che ti guida nella creazione.",
    icon: "🤖",
    color: "bg-purple-50 dark:bg-purple-950",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Calendario editoriale",
    description: "Pianifica e organizza i tuoi contenuti con un calendario intuitivo e flessibile.",
    icon: "📅",
    color: "bg-green-50 dark:bg-green-950",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Archivio risorse",
    description: "Organizza e accedi facilmente a tutti i tuoi contenuti in un unico luogo.",
    icon: "📚",
    color: "bg-orange-50 dark:bg-orange-950",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Analisi e metriche",
    description: "Monitora l'efficacia dei tuoi contenuti con metriche dettagliate e intuitive.",
    icon: "📊",
    color: "bg-red-50 dark:bg-red-950",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "Template personalizzabili",
    description: "Crea contenuti in modo rapido con template predefiniti e personalizzabili.",
    icon: "🧩",
    color: "bg-cyan-50 dark:bg-cyan-950",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
];

const Features = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Potenzia la tua presenza sui social</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              SocialLab ti offre tutti gli strumenti necessari per creare, gestire e ottimizzare i tuoi contenuti social.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link to="/auth">Inizia gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Funzionalità principali</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Scopri tutti gli strumenti di SocialLab progettati per aiutarti a creare contenuti straordinari per i social media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className={`${feature.color} rounded-t-lg`}>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <CardTitle className={feature.textColor}>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Come funziona</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Scopri quanto è facile utilizzare SocialLab per migliorare la tua strategia di social media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Crea un account</h3>
              <p className="text-gray-600 dark:text-gray-400">Registrati in pochi secondi e inizia a esplorare la piattaforma.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Genera idee</h3>
              <p className="text-gray-600 dark:text-gray-400">Utilizza l'assistente AI per creare idee di contenuti coinvolgenti.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Pianifica e pubblica</h3>
              <p className="text-gray-600 dark:text-gray-400">Organizza i tuoi contenuti nel calendario e monitora i risultati.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a iniziare?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di creator che stanno già sfruttando il potere di SocialLab per migliorare la loro strategia social.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="bg-white text-brand-600 hover:bg-gray-100 border-white">
              <Link to="/pricing">Scopri i piani</Link>
            </Button>
            <Button asChild className="bg-brand-700 hover:bg-brand-800 border-brand-700">
              <Link to="/auth">Inizia gratis</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Features;
