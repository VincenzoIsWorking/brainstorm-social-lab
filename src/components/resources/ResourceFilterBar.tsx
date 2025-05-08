
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}

const ResourceFilterBar: React.FC<ResourceFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center px-1 mb-6">
      <div className="flex flex-1 w-full md:w-auto">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
              <SelectItem value="script">Scripts</SelectItem>
              <SelectItem value="idea">Ideas</SelectItem>
              <SelectItem value="checklist">Checklists</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button asChild>
        <Link to="/new-resource">
          <Plus className="h-4 w-4 mr-2" /> New Resource
        </Link>
      </Button>
    </div>
  );
};

export default ResourceFilterBar;
