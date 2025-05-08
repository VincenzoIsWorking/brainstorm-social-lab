
import React from "react";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarEvent, EventFormData } from "@/types/calendar";

interface EventFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  formData: EventFormData;
  selectedEvent: CalendarEvent | null;
  handleInputChange: (field: keyof EventFormData, value: any) => void;
  handleCreateEvent: () => void;
  handleUpdateEvent: () => void;
  handleDeleteEvent: () => void;
}

const EventFormDialog: React.FC<EventFormDialogProps> = ({
  isOpen,
  setIsOpen,
  formData,
  selectedEvent,
  handleInputChange,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{selectedEvent ? "Modifica contenuto" : "Nuovo contenuto"}</DialogTitle>
          <DialogDescription>
            {selectedEvent 
              ? "Modifica i dettagli del contenuto programmato." 
              : "Aggiungi un nuovo contenuto al calendario."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titolo</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Inserisci un titolo"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PP") : "Seleziona data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && handleInputChange("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">Ora</Label>
              <Input 
                id="time" 
                type="time" 
                value={formData.time} 
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Piattaforma</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => handleInputChange("platform", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona piattaforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="x">X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Stato</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value as "draft" | "scheduled")}
                disabled={selectedEvent?.status === "published"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Bozza</SelectItem>
                  <SelectItem value="scheduled">Programmato</SelectItem>
                  {selectedEvent?.status === "published" && (
                    <SelectItem value="published">Pubblicato</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descrivi il contenuto"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          {selectedEvent && (
            <Button variant="destructive" type="button" onClick={handleDeleteEvent}>
              <Trash2 className="h-4 w-4 mr-1" /> Elimina
            </Button>
          )}
          <div>
            <Button variant="outline" type="button" className="mr-2" onClick={() => setIsOpen(false)}>
              Annulla
            </Button>
            <Button 
              type="button" 
              onClick={selectedEvent ? handleUpdateEvent : handleCreateEvent}
              disabled={!formData.title}
            >
              {selectedEvent ? "Aggiorna" : "Crea"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
