
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = [
  {
    name: "Standard",
    price: {
      monthly: "29,90",
      yearly: "299"
    },
    description: "Ideale per content creator individuali e piccoli business.",
    features: [
      "100 idee AI al mese",
      "Calendario editoriale",
      "5 template personalizzati",
      "Analytics base",
      "Supporto email",
    ],
    cta: "Scegli Standard",
    popular: false
  },
  {
    name: "Premium",
    price: {
      monthly: "49,90",
      yearly: "499"
    },
    description: "Per team e aziende che cercano funzionalità avanzate.",
    features: [
      "Idee AI illimitate",
      "Calendario editoriale avanzato",
      "Template illimitati",
      "Analytics avanzate",
      "Supporto prioritario",
      "Accesso API",
      "Gestione team",
      "Contenuti personalizzati per ogni piattaforma",
    ],
    cta: "Scegli Premium",
    popular: true
  }
];

const commonFeatures = [
  "Generazione idee con AI",
  "Gestione risorse",
  "Calendario editoriale",
  "Assistenza clienti",
];

const Pricing = () => {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Piani semplici e trasparenti</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Scegli il piano più adatto alle tue esigenze. Inizia gratis, fai upgrade quando vuoi.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col items-center justify-center mb-8">
            <Tabs 
              value={billingInterval}
              onValueChange={(value) => setBillingInterval(value as "monthly" | "yearly")}
              className="w-full max-w-xs"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="monthly">Mensile</TabsTrigger>
                <TabsTrigger value="yearly">Annuale <Badge variant="outline" className="ml-2">-17%</Badge></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative border-2 ${plan.popular ? 'border-brand-600 dark:border-brand-500' : 'border-gray-200 dark:border-gray-800'}`}
              >
                {plan.popular && (
                  <Badge 
                    className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-brand-600"
                  >
                    Più popolare
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold">
                      €{billingInterval === "monthly" ? plan.price.monthly : plan.price.yearly}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {billingInterval === "monthly" ? "al mese" : "all'anno"}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className={`w-full ${plan.popular ? 'bg-brand-600 hover:bg-brand-700' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link to="/auth">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Common Features */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">Tutte le funzionalità includono</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {commonFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Domande frequenti</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Trova risposte alle domande più comuni</p>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-6">Hai altre domande sui nostri piani e prezzi?</p>
            <Button asChild variant="outline">
              <Link to="/faq">Vedi tutte le FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Prova SocialLab gratuitamente</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inizia con un account gratuito e passa a un piano premium quando sei pronto.
          </p>
          <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
            <Link to="/auth">Inizia gratis</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;
