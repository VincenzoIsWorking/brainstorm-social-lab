
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, FileText, Users, HelpCircle } from "lucide-react";

const supportFormSchema = z.object({
  name: z.string().min(2, { message: "Il nome è richiesto" }),
  email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
  subject: z.string().min(5, { message: "L'oggetto deve contenere almeno 5 caratteri" }),
  category: z.string({ required_error: "Seleziona una categoria" }),
  message: z.string().min(20, { message: "Il messaggio deve contenere almeno 20 caratteri" }),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const commonQuestions = [
  {
    question: "Come posso cambiare il mio piano?",
    answer: "Puoi cambiare il tuo piano in qualsiasi momento accedendo alla sezione 'Account' nella tua dashboard. Vai su 'Abbonamento' e seleziona 'Cambia piano'."
  },
  {
    question: "Posso cancellare il mio account?",
    answer: "Sì, puoi cancellare il tuo account in qualsiasi momento. Vai alla sezione 'Account' nella tua dashboard, seleziona 'Impostazioni', scorri fino in fondo alla pagina e clicca su 'Elimina account'."
  },
  {
    question: "Come funziona la generazione di idee AI?",
    answer: "Il nostro sistema AI analizza tendenze, contenuti di successo e il tuo settore per generare idee personalizzate. Più informazioni fornisci, più rilevanti saranno le idee generate."
  },
];

const supportResources = [
  {
    title: "Guide e Tutorial",
    description: "Esplora le nostre guide dettagliate e tutorial passo dopo passo",
    icon: FileText,
    path: "/guides"
  },
  {
    title: "FAQ",
    description: "Risposte alle domande più frequenti",
    icon: HelpCircle,
    path: "/faq"
  },
  {
    title: "Community",
    description: "Unisciti alla nostra community di utenti per consigli e scambi",
    icon: Users,
    path: "/community"
  },
];

const Support = () => {
  const { toast } = useToast();
  
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  });
  
  function onSubmit(values: SupportFormValues) {
    console.log(values);
    toast({
      title: "Richiesta inviata",
      description: "Ti risponderemo al più presto all'indirizzo email fornito.",
    });
    form.reset();
  }
  
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Supporto</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Siamo qui per aiutarti. Come possiamo esserti utili?
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportResources.map((resource, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center">
                  <resource.icon className="h-12 w-12 text-brand-600" />
                </div>
                <CardTitle className="mt-4">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link to={resource.path}>Esplora</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contattaci</h2>
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Il tuo nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@esempio.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Oggetto</FormLabel>
                          <FormControl>
                            <Input placeholder="Oggetto della tua richiesta" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona una categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="account">Account e abbonamenti</SelectItem>
                              <SelectItem value="tech">Problemi tecnici</SelectItem>
                              <SelectItem value="features">Domande sulle funzionalità</SelectItem>
                              <SelectItem value="billing">Fatturazione</SelectItem>
                              <SelectItem value="other">Altro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Messaggio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descrivi la tua richiesta in dettaglio"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Invia richiesta</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Common Questions and Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Domande frequenti</h2>
            <div className="space-y-6 mb-10">
              {commonQuestions.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link to="/faq">Vedi tutte le FAQ</Link>
                </Button>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Informazioni di contatto</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-brand-600" />
                  <span>support@sociallab.com</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-3 text-brand-600" />
                  <span>Chat live disponibile per utenti Premium</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Il nostro team di supporto è disponibile dal lunedì al venerdì, dalle 9:00 alle 18:00 (CET).
                  Ci impegniamo a rispondere entro 24 ore lavorative.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Support;
