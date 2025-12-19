"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Shuffle, Share2, Loader2 } from "lucide-react";

type TabType = "quotes" | "rhymes" | "pickup";

export function GeneratorApp() {
  const [activeTab, setActiveTab] = useState<TabType>("quotes");
  const [content, setContent] = useState(
    "Click 'Generate New' to get started!"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNew = async () => {
    setIsLoading(true);
    setIsAnimating(true);

    try {
      const typeMap = {
        quotes: "quote",
        rhymes: "rhyme",
        pickup: "pickup",
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: typeMap[activeTab] }),
      });

      const text = await response.text(); // <-- get raw text first
      let data;

      try {
        data = JSON.parse(text); // <-- parse safely
      } catch (err) {
        console.error("Failed to parse JSON:", err, "Raw response:", text);
        data = { text: "Oops! Something went wrong. Please try again." };
      }

      setTimeout(() => {
        setContent(data.text);
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      console.error("Error generating content:", error);
      setContent("Oops! Something went wrong. Please try again.");
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(content);
    const hashtags = encodeURIComponent("AIGenerator");
    const url = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const getCardClass = () => {
    switch (activeTab) {
      case "quotes":
        return "border-2 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10";
      case "rhymes":
        return "border-2 shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/20";
      case "pickup":
        return "border-2 shadow-lg bg-gradient-to-br from-accent/10 to-accent/20";
      default:
        return "border-2 shadow-lg";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Generator
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground text-pretty">
            AI-powered quotes, rhymes, and pick-up lines at your fingertips
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as TabType);
            setContent("Click 'Generate New' to get started!");
          }}
          className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
        >
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="quotes"
              className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Quotes
            </TabsTrigger>
            <TabsTrigger
              value="rhymes"
              className="text-base data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
            >
              Rhymes
            </TabsTrigger>
            <TabsTrigger
              value="pickup"
              className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all duration-300"
            >
              Pick-up Lines
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <Card
              className={`${getCardClass()} transition-all duration-500 hover:shadow-xl`}
            >
              <CardContent className="p-8 md:p-12 min-h-[200px] flex items-center justify-center">
                <p
                  className={`text-xl md:text-2xl text-center text-pretty leading-relaxed font-medium transition-all duration-300 ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {content}
                </p>
              </CardContent>
            </Card>
          </div>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            onClick={generateNew}
            disabled={isLoading}
            size="lg"
            className="text-lg h-14 px-8 gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5" />
                Generate New
              </>
            )}
          </Button>
          <Button
            onClick={shareToTwitter}
            disabled={content === "Click 'Generate New' to get started!"}
            size="lg"
            variant="outline"
            className="text-lg h-14 px-8 gap-2 border-2 bg-background/50 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            Share to X
          </Button>
        </div>
      </div>
    </div>
  );
}
