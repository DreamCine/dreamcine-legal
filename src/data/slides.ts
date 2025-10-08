// Import slide images
import slide1Image from '@/assets/slide1-ai-movies.jpg';
import slide2Image from '@/assets/slide2-unique-content.jpg';
import slide3Image from '@/assets/slide3-director-earn.jpg';
import slide4Image from '@/assets/slide4-support-creators.jpg';
import slide5Image from '@/assets/slide5-be-first.jpg';

export interface Slide {
  id: string;
  title: string;
  text: string;
  image: string;
}

export const slides: Slide[] = [
  {
    id: "slide1",
    title: "AI movies",
    text: "Watch unique AI-made movies and series — or create your own!",
    image: slide1Image
  },
  {
    id: "slide2", 
    title: "Unique content!",
    text: "Every film is a one-of-a-kind story created by AI. You won't find this anywhere else!",
    image: slide2Image
  },
  {
    id: "slide3",
    title: "Become a director & earn!",
    text: "Create AI movies, share them with the world, and make money.",
    image: slide3Image
  },
  {
    id: "slide4",
    title: "Support creators",
    text: "Donate to the authors whose AI stories inspire you.",
    image: slide4Image
  },
  {
    id: "slide5",
    title: "Be the first!",
    text: "Start now — create your first AI movie.",
    image: slide5Image
  }
];