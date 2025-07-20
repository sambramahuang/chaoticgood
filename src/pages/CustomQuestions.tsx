import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CustomQuestion {
  id: string;
  text: string;
  gameMode: string;
}

const CustomQuestions = () => {
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [activeGameMode, setActiveGameMode] = useState("burning-bridges");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load custom questions from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("customQuestions");
    if (saved) {
      setCustomQuestions(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever questions change
  useEffect(() => {
    localStorage.setItem("customQuestions", JSON.stringify(customQuestions));
  }, [customQuestions]);

  const addQuestion = () => {
    if (!newQuestion.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    const question: CustomQuestion = {
      id: Date.now().toString(),
      text: newQuestion.trim(),
      gameMode: activeGameMode,
    };

    setCustomQuestions(prev => [...prev, question]);
    setNewQuestion("");
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Question added successfully!",
    });
  };

  const deleteQuestion = (id: string) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== id));
    toast({
      title: "Deleted",
      description: "Question removed successfully",
    });
  };

  const getQuestionsForMode = (mode: string) => {
    return customQuestions.filter(q => q.gameMode === mode);
  };

  const gameModeDisplayName = {
    "burning-bridges": "Burning Bridges",
    "truth-or-dare": "Truth or Dare"
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-electric bg-clip-text text-transparent">
            Custom Questions
          </h1>
          <p className="text-muted-foreground">
            Add your own questions for a personalized gaming experience
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gaming" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gaming-surface border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Add Custom Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gameMode" className="text-foreground">Game Mode</Label>
                  <select 
                    id="gameMode"
                    value={activeGameMode} 
                    onChange={(e) => setActiveGameMode(e.target.value)}
                    className="w-full mt-1 p-2 bg-secondary border border-border rounded-md text-foreground"
                  >
                    <option value="burning-bridges">Burning Bridges</option>
                    <option value="truth-or-dare">Truth or Dare</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="question" className="text-foreground">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your custom question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="mt-1 bg-secondary border-border text-foreground"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="gaming" onClick={addQuestion}>
                    Add Question
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Games
          </Button>
        </div>

        <Tabs defaultValue="burning-bridges" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="burning-bridges" className="data-[state=active]:bg-primary">
              Burning Bridges ({getQuestionsForMode("burning-bridges").length})
            </TabsTrigger>
            <TabsTrigger value="truth-or-dare" className="data-[state=active]:bg-primary">
              Truth or Dare ({getQuestionsForMode("truth-or-dare").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="burning-bridges" className="space-y-4">
            {getQuestionsForMode("burning-bridges").length === 0 ? (
              <Card className="bg-gradient-surface border-border p-8 text-center">
                <p className="text-muted-foreground">No custom questions yet. Add some to get started!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {getQuestionsForMode("burning-bridges").map((question) => (
                  <Card key={question.id} className="bg-gradient-surface border-border p-4">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-foreground flex-1">{question.text}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="truth-or-dare" className="space-y-4">
            {getQuestionsForMode("truth-or-dare").length === 0 ? (
              <Card className="bg-gradient-surface border-border p-8 text-center">
                <p className="text-muted-foreground">No custom questions yet. Add some to get started!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {getQuestionsForMode("truth-or-dare").map((question) => (
                  <Card key={question.id} className="bg-gradient-surface border-border p-4">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-foreground flex-1">{question.text}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomQuestions;