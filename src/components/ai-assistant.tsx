'use client';

import React, { useState, useRef, useEffect } from 'react';
import { handleQuestion } from '@/actions/ai-assistant-actions';
import { Bot, Loader2, Send, User, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function AIAssistant() {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState<{type: 'user' | 'bot', text: string}[]>([]);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, [conversation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || loading) return;

        const userMessage = question;
        setLoading(true);
        setConversation(prev => [...prev, { type: 'user', text: userMessage }]);
        setQuestion('');

        const result = await handleQuestion(userMessage);
        
        setConversation(prev => [...prev, { type: 'bot', text: result.answer }]);
        setLoading(false);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Ask HCOM's AI Assistant</CardTitle>
                <CardDescription>
                    Have questions about our mission, services, or programs? Our virtual assistant is here to help.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col h-[450px]">
                    <ScrollArea className="flex-1 p-4 border rounded-lg bg-background/50" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {conversation.length === 0 && (
                              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <Sparkles className="h-12 w-12 mb-4" />
                                <p className="text-lg">Ask me anything!</p>
                                <p className="text-sm">e.g., "What is the RAFFIM program?"</p>
                              </div>
                            )}
                            {conversation.map((entry, index) => (
                                <div key={index} className={cn("flex items-start gap-3", entry.type === 'user' ? 'justify-end' : 'justify-start')}>
                                    {entry.type === 'bot' && (
                                        <Avatar className="w-8 h-8 border-2 border-primary">
                                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-[75%] rounded-2xl p-3 text-sm", entry.type === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white rounded-bl-none border')}>
                                        <p>{entry.text}</p>
                                    </div>
                                     {entry.type === 'user' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-start gap-3 justify-start">
                                    <Avatar className="w-8 h-8 border-2 border-primary">
                                       <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-[75%] rounded-2xl p-3 text-sm bg-white rounded-bl-none border flex items-center">
                                       <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                        <Textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            className="flex-1 resize-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                              }
                            }}
                            rows={1}
                            disabled={loading}
                        />
                        <Button type="submit" size="icon" disabled={loading || !question.trim()}>
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
