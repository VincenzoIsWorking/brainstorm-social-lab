
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import ResourceForm from "@/components/resources/ResourceForm";

const NewResource = () => {
  return (
    <PageLayout>
      <section className="py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Resource</h1>
          <p className="text-muted-foreground">
            Create content with AI assistance for your social media strategy
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <ResourceForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default NewResource;
