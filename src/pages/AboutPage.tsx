import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Target, Users, Leaf } from "lucide-react";

const AboutPage = () => {
  return (<main className="min-h-screen">
    <Navbar />

    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            FitKart
            <br />
            <span className="italic text-accent">Excellence in Style</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Welcome to our shop. We are dedicated to providing the best fashion
            experience to the people of Begusarai with quality and trust.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Meet the Owner</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-4 mb-6">
                Experience & Dedication
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Running a successful establishment at <strong>Begusarai Chowk</strong> for the last 5 years,
                Vicky has brought a unique sense of style and quality to the local market.
              </p>
              <p className="text-muted-foreground text-lg">
                With a background in <strong>BA</strong>, Vicky combines his educational insights
                with practical business experience to ensure every customer finds exactly what they need.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop" alt="Fashion studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-elegant p-6 max-w-xs">
                <p className="font-display text-4xl font-bold text-accent mb-2">5+</p>
                <p className="text-muted-foreground">Years of serving the Begusarai community with excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-4 mb-6">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Quality First",
                description: "We handpick every item to ensure the highest standards for our customers.",
              },
              {
                icon: Users,
                title: "Customer Trust",
                description: "Building lasting relationships with the people of Begusarai for 5 years.",
              },
              {
                icon: Target,
                title: "Local Excellence",
                description: "Located right at Begusarai Chowk, serving you with the best fashion.",
              },
              {
                icon: Leaf,
                title: "Honest Pricing",
                description: "Providing premium quality at fair and transparent prices.",
              },
            ].map((value) => (<div key={value.title} className="bg-background rounded-xl p-8 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <value.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-medium mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">The Owner</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-4 mb-6">
              Vicky
            </h2>
            <p className="text-muted-foreground text-lg">
              The heart and soul of the shop, dedicated to bringing quality fashion to everyone.
            </p>
          </div>

          <div className="text-center max-w-md mx-auto">
            {[
              {
                name: "Vicky",
                role: "Owner & Founder (BA Grad)",
              },
            ].map((member) => (<div key={member.name} className="text-center">
              <h3 className="font-display text-2xl font-medium">{member.name}</h3>
              <p className="text-muted-foreground text-lg">{member.role}</p>
            </div>))}
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </main>);
};

export default AboutPage;
