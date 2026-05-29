'use client';

import { useState, useRef, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_INTERVIEW_QUESTIONS } from '@/lib/mock-data';
import {
  MessageSquare,
  Brain,
  Users,
  HelpCircle,
  Sparkles,
  Send,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

const QUESTION_CATEGORIES = [
  { id: 'technical', label: 'Technical', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', questions: MOCK_INTERVIEW_QUESTIONS.technical },
  { id: 'behavioral', label: 'Behavioral', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', questions: MOCK_INTERVIEW_QUESTIONS.behavioral },
  { id: 'hr', label: 'HR', icon: HelpCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30', questions: MOCK_INTERVIEW_QUESTIONS.hr },
];

const AI_RESPONSES: Record<string, string> = {
  default: "That's a thoughtful answer! Let me provide some feedback:\n\n**Strengths:**\n- You structured your response clearly\n- You included relevant context\n\n**Areas to improve:**\n- Try to be more specific with metrics (e.g., '40% improvement' vs 'significant improvement')\n- Use the STAR format: Situation, Task, Action, Result\n- Keep your answer to 2-3 minutes\n\nWould you like to try answering again, or move on to the next question?",
};

function getAiResponse(): string {
  return AI_RESPONSES.default;
}

export default function InterviewPage() {
  const [activeCategory, setActiveCategory] = useState(QUESTION_CATEGORIES[0]);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: "Hi! I'm your AI interview coach. I'll ask you interview questions and provide detailed feedback on your answers.\n\nLet's start with a classic: **Tell me about yourself.**\n\nTake your time and answer as if you're in a real interview. I'll give you constructive feedback!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const followUpQuestions = [
    "Can you walk me through your most challenging project?",
    "How do you handle disagreements with your manager?",
    "Where do you see yourself in 5 years?",
    "What's your experience with TypeScript?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: getAiResponse(),
        timestamp: new Date(),
      };

      const nextQ = questionCount < followUpQuestions.length ? (
        `\n\n---\n\n**Next question:** ${followUpQuestions[questionCount]}`
      ) : '';

      setMessages((prev) => [...prev, { ...aiMsg, content: aiMsg.content + nextQ }]);
      setQuestionCount((c) => c + 1);
    }, 1500 + Math.random() * 1000);
  };

  const toggleComplete = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setCompletedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <AppShell title="Interview Prep" description="Practice with AI-powered mock interviews">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="h-9">
            <TabsTrigger value="questions" className="text-xs">Question Bank</TabsTrigger>
            <TabsTrigger value="mock" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Mock Interview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="mt-0 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {QUESTION_CATEGORIES.map((cat) => {
                const completed = cat.questions.filter((_, i) =>
                  completedQuestions.has(`${cat.id}-${i}`)
                ).length;

                return (
                  <Card
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`p-4 cursor-pointer transition-all duration-150 border-border card-hover ${
                      activeCategory.id === cat.id ? 'border-primary/50 ring-1 ring-primary/20 shadow-sm' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl ${cat.bg} flex items-center justify-center`}>
                        <cat.icon className={`w-4 h-4 ${cat.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{cat.label}</h3>
                        <p className="text-xs text-muted-foreground">{cat.questions.length} questions</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1.5">
                      {completed}/{cat.questions.length} practiced
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${cat.id === 'technical' ? 'bg-blue-500' : cat.id === 'behavioral' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${(completed / cat.questions.length) * 100}%` }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="border-border overflow-hidden">
              <div className={`px-5 py-4 border-b border-border flex items-center gap-3 ${activeCategory.bg}`}>
                <activeCategory.icon className={`w-4 h-4 ${activeCategory.color}`} />
                <h3 className="font-semibold">{activeCategory.label} Questions</h3>
                <Badge variant="secondary" className="text-xs ml-auto">
                  {activeCategory.questions.length} questions
                </Badge>
              </div>
              <div className="divide-y divide-border">
                {activeCategory.questions.map((question, i) => {
                  const key = `${activeCategory.id}-${i}`;
                  const isCompleted = completedQuestions.has(key);
                  const isExpanded = expandedQuestion === i;

                  return (
                    <div key={i} className="group">
                      <button
                        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/50 transition-colors"
                        onClick={() => setExpandedQuestion(isExpanded ? null : i)}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(activeCategory.id, i);
                          }}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-muted-foreground/30 hover:border-primary'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </button>
                        <span className={`flex-1 text-sm ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                          {question}
                        </span>
                        {isExpanded
                          ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                          : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100" />
                        }
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-4 pl-14 animate-fade-in">
                          <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-xs font-semibold text-amber-600">Tips for answering</span>
                            </div>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {activeCategory.id === 'technical' ? (
                                <>
                                  <li>- Think out loud — explain your reasoning process</li>
                                  <li>- Start with the high-level concept, then dive into details</li>
                                  <li>- Use concrete examples from your experience</li>
                                  <li>- Mention trade-offs and when you'd use different approaches</li>
                                </>
                              ) : activeCategory.id === 'behavioral' ? (
                                <>
                                  <li>- Use the STAR format: Situation, Task, Action, Result</li>
                                  <li>- Be specific — use real examples from past experience</li>
                                  <li>- Quantify your impact when possible</li>
                                  <li>- Keep it to 2-3 minutes</li>
                                </>
                              ) : (
                                <>
                                  <li>- Be honest and authentic</li>
                                  <li>- Research the company beforehand</li>
                                  <li>- Frame weaknesses as areas of growth</li>
                                  <li>- Align your goals with the company's direction</li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() => toggleComplete(activeCategory.id, i)}
                            >
                              {isCompleted ? (
                                <><RotateCcw className="w-3 h-3 mr-1" />Mark undone</>
                              ) : (
                                <><CheckCircle2 className="w-3 h-3 mr-1" />Mark done</>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mock" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-3 flex flex-col border-border" style={{ height: '70vh' }}>
                <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Interview Coach</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-muted-foreground">Ready to interview</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto text-xs h-7"
                    onClick={() => {
                      setMessages([{
                        id: '0',
                        role: 'ai',
                        content: "Session reset! Let's start fresh.\n\n**Tell me about yourself.** Walk me through your background, key experiences, and why you're looking for your next opportunity.",
                        timestamp: new Date(),
                      }]);
                      setQuestionCount(0);
                      toast.info('Session reset');
                    }}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {msg.role === 'ai' && (
                        <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                            : 'bg-muted/50 text-foreground rounded-tl-sm border border-border'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:75ms]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Type your answer... (Shift+Enter for new line)"
                      className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] max-h-[120px]"
                      rows={1}
                    />
                    <Button size="icon" onClick={sendMessage} disabled={!input.trim() || isTyping} className="shrink-0">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 text-center">
                    Press Enter to send - Shift+Enter for new line
                  </p>
                </div>
              </Card>

              <div className="space-y-4">
                <Card className="p-4 border-border">
                  <h4 className="font-semibold text-sm mb-3">Interview Tips</h4>
                  <div className="space-y-2.5">
                    {[
                      { tip: 'Speak clearly and at a moderate pace', icon: MessageSquare },
                      { tip: 'Use STAR format for behavioral questions', icon: Brain },
                      { tip: 'Ask clarifying questions when needed', icon: HelpCircle },
                      { tip: 'Quantify your achievements', icon: CheckCircle2 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <item.icon className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {item.tip}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 border-border">
                  <h4 className="font-semibold text-sm mb-3">Quick Practice</h4>
                  <div className="space-y-1.5">
                    {MOCK_INTERVIEW_QUESTIONS.technical.slice(0, 3).map((q, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(`Regarding: "${q.slice(0, 50)}..."\n\n`);
                          toast.info('Question added to input');
                        }}
                        className="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-accent transition-colors line-clamp-2"
                      >
                        {q.slice(0, 70)}...
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
