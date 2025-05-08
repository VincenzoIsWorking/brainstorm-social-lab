
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Tag } from "lucide-react";

interface FilterBarProps {
  onSearch: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onTagChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onPlatformChange,
  onTagChange,
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <form 
          className="relative md:col-span-5"
          onSubmit={handleSearchSubmit}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Cerca idee..."
            className="pl-9"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
        
        <div className="md:col-span-3">
          <Select onValueChange={onPlatformChange} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tutte le piattaforme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le piattaforme</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3">
          <Select onValueChange={onTagChange} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tutti i tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i tag</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="formazione">Formazione</SelectItem>
              <SelectItem value="vendita">Vendita</SelectItem>
              <SelectItem value="tutorials">Tutorial</SelectItem>
              <SelectItem value="intervista">Interviste</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-1">
          <Button variant="outline" size="icon" className="w-full h-10">
            <Tag className="h-4 w-4" />
            <span className="sr-only">Filtra per tag</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
