
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Building, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Competition {
  id: number;
  title: string;
  organizer: string;
  date: string;
  position: string;
  description: string;
  category: string;
  image: string;
  team?: string[];
  link?: string;
}

interface CompetitionModalProps {
  competition: Competition | null;
  isOpen: boolean;
  onClose: () => void;
}

// Dummy competition images for visual enhancement
const competitionImages = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
];

const CompetitionModal = ({
  competition,
  isOpen,
  onClose,
}: CompetitionModalProps) => {
  if (!competition) return null;

  // Get a consistent image based on competition ID
  const getCompetitionImage = (id: number) => {
    const imageIndex = (id - 1) % competitionImages.length;
    return competitionImages[imageIndex];
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{competition.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            {competition.organizer}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{competition.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {competition.date}
            </div>
          </div>
          
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden relative">
            <img
              src={getCompetitionImage(competition.id)}
              alt={`${competition.title} documentation`}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary">{competition.position}</Badge>
            </div>
          </AspectRatio>
          
          <p className="text-muted-foreground">{competition.description}</p>
          
          {competition.team && competition.team.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Team:</p>
              <div className="flex flex-wrap gap-1">
                {competition.team.map((member, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {member}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {competition.link && (
            <div className="flex justify-end">
              <a href={competition.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="group">
                  View Project
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitionModal;
