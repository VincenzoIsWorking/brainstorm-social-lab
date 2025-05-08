
import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Come creare una strategia efficace per i social media",
    excerpt: "Scopri i passi fondamentali per creare una strategia social che generi engagement e conversioni.",
    author: "Marco Rossi",
    date: "10 Maggio 2025",
    category: "Strategie",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "10 trend di Instagram che domineranno nel 2025",
    excerpt: "Un'analisi approfondita delle tendenze emergenti su Instagram e come sfruttarle per la tua attività.",
    author: "Laura Bianchi",
    date: "2 Maggio 2025",
    category: "Instagram",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=2574",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "L'intelligenza artificiale nel content marketing",
    excerpt: "Come l'AI sta rivoluzionando il modo in cui creiamo e distribuiamo contenuti sui social media.",
    author: "Alessandro Verdi",
    date: "27 Aprile 2025",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532",
    readTime: "8 min"
  },
  {
    id: 4,
    title: "Guida definitiva all'algoritmo di TikTok",
    excerpt: "Tutto quello che devi sapere per ottimizzare i tuoi contenuti su TikTok e raggiungere più utenti.",
    author: "Giulia Neri",
    date: "18 Aprile 2025",
    category: "TikTok",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=2574",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Come costruire un personal brand autentico",
    excerpt: "Strategie pratiche per sviluppare un brand personale che risuoni con il tuo pubblico ideale.",
    author: "Matteo Gialli",
    date: "10 Aprile 2025",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2664",
    readTime: "9 min"
  },
  {
    id: 6,
    title: "I migliori strumenti per la creazione di contenuti nel 2025",
    excerpt: "Una panoramica completa degli strumenti più efficaci per creare contenuti di qualità per i social.",
    author: "Sofia Blu",
    date: "2 Aprile 2025",
    category: "Strumenti",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670",
    readTime: "7 min"
  },
];

// Mock data for categories
const categories = [
  { name: "Strategie", count: 12 },
  { name: "Instagram", count: 8 },
  { name: "TikTok", count: 6 },
  { name: "Facebook", count: 5 },
  { name: "LinkedIn", count: 7 },
  { name: "Tecnologia", count: 9 },
  { name: "Branding", count: 4 },
  { name: "Strumenti", count: 11 },
];

const Blog = () => {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Scopri gli ultimi trend e strategie nel mondo dei social media
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4">{post.category}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="hover:text-brand-600 transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground gap-4">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} di lettura</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Di {post.author}</span>
                    <Button variant="ghost" asChild size="sm">
                      <Link to={`/blog/${post.id}`}>Leggi di più</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <Button variant="outline">Carica altri articoli</Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Cerca</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cerca articoli..."
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <Button className="absolute right-1 top-1" variant="ghost" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index}>
                      <Link 
                        to={`/blog/category/${category.name.toLowerCase()}`}
                        className="flex justify-between items-center py-1.5 hover:text-brand-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">{category.count}</span>
                      </Link>
                      {index < categories.length - 1 && <Separator className="my-1" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Articoli popolari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2 text-sm">
                        <Link 
                          to={`/blog/${post.id}`}
                          className="hover:text-brand-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
