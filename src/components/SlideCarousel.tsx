import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { slides } from "@/data/slides";

const SlideCarousel = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Discover AI Movies
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the future of entertainment with AI-generated content
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="bg-transparent rounded-2xl overflow-hidden border border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {slide.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {slide.text}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 sm:left-5 md:left-6 lg:-left-12" />
          <CarouselNext className="right-3 sm:right-5 md:right-6 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default SlideCarousel;
