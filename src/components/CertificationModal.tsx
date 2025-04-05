import mobileDev from "../assets/mobileDev.jpg";
import contentCreator from "../assets/contentCreator.jpg";
import accounting from "../assets/accounting.jpg";
import aws from "../assets/aws.jpg";
import digitalMarketing from "../assets/digitalmarketing.jpg";
import akuntansi from "../assets/akuntansi.jpg";
import mobile from "../assets/mobile.jpeg";
import cc from "../assets/ContentCreator.jpeg";
import dea from "../assets/dea.png";
import cloud from "../assets/cloudd.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Building, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
  image: string;
  link?: string;
}

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

// Dummy certificate images for visual enhancement
const certificateImages = [
  mobile,
  cc,
  akuntansi,
  cloud,
  dea,
];

const CertificationModal = ({
  certification,
  isOpen,
  onClose,
}: CertificationModalProps) => {
  if (!certification) return null;

  // Get a consistent image based on certification ID
  const getCertificateImage = (id: number) => {
    const imageIndex = (id - 1) % certificateImages.length;
    return certificateImages[imageIndex];
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{certification.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            {certification.issuer}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{certification.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {certification.date}
            </div>
          </div>
          
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
            <img
              src={getCertificateImage(certification.id)}
              alt={`${certification.title} certificate`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          
          <p className="text-muted-foreground">{certification.description}</p>
          
          {certification.link && (
            <div className="flex justify-end">
              <a href={certification.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="group">
                  View Certificate
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

export default CertificationModal;
