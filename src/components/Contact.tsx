
import { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleReveal);
    handleReveal();
    
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const serviceId = 'service_19ix5rt'; // Updated with your provided service ID
      const templateId = 'template_ucag6bo';
      const publicKey = 'DnchEW_Ops8P1iwue';
      
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
        to_email: 'kurniawanlutfi925@gmail.com',
        to_name: 'Lutfi Kurniawan',
      };
      
      if (process.env.NODE_ENV === 'production') {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        console.log("Email would be sent with:", templateParams);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      form.reset();
      
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      label: 'Email', 
      value: 'kurniawanlutfi925@gmail.com',
      link: 'mailto:kurniawanlutfi925@gmail.com'
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      label: 'Phone', 
      value: '+62 8983064613',
      link: 'https://wa.me/628983064613'
    },
    { 
      icon: <MapPin className="w-5 h-5" />, 
      label: 'Location', 
      value: 'Palembang, South Sumatra',
      link: 'https://maps.app.goo.gl/KdgSCV1XLwxeB2V97'
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 right-20 w-72 h-72 bg-pastel-pink/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-pastel-blue/20 rounded-full filter blur-3xl"></div>
      
      <div className="section-container">
        <div className="text-center mb-16 reveal">
          <div className="inline-block mb-4 bg-pastel-peach/40 px-4 py-1.5 rounded-full text-sm font-medium">
            <AnimatedText text="Get In Touch" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Let's Work Together" tag="span" />
          </h2>
          
          <p className="max-w-2xl mx-auto text-muted-foreground">
            <AnimatedText
              text="Have a project in mind or just want to say hello? Feel free to reach out and I'll get back to you as soon as possible."
              delay={200}
            />
          </p>
        </div>
        
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl reveal">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="lutfi kurniawan" 
                          {...field} 
                          className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-lavender/50 transition-all"
                        />
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
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="lutfi@example.com" 
                          {...field} 
                          className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-lavender/50 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          {...field} 
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-lavender/50 transition-all resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={cn(
                    'w-full py-3 rounded-lg font-medium transition-all relative overflow-hidden group',
                    isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-pastel-lavender text-primary-foreground hover:shadow-lg hover:shadow-pastel-lavender/30'
                  )}
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      'Sending...'
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" /> Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </Form>
          </div>
          
          <div className="space-y-8 reveal">
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/80 hover:bg-white/70 transition-all hover:shadow-md"
                >
                  <div className="p-3 rounded-full bg-pastel-lavender/30">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-pastel-lavender/50 to-pastel-blue/50 backdrop-blur-sm border border-white/80 shadow-lg">
              <h4 className="font-semibold text-lg mb-2">Current Availability</h4>
              <p className="text-sm mb-4">
                I'm currently available for freelance work and new projects. My usual response time is within 24 hours.
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium">Available for new projects</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
