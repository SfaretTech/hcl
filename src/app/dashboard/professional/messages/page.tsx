
'use client';

import { useState, useMemo, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Send, Search, Paperclip, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Patient = {
  name: string;
  avatar: string;
};

type Conversation = {
  patient: Patient;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
};

type Message = {
    id: string;
    text: string;
    time: string;
    sender: 'me' | 'patient';
    attachment?: {
        name: string;
        size: number;
    }
};

const initialPatients: Patient[] = [
    { name: 'Jessica Peterson', avatar: 'https://placehold.co/100x100.png' },
    { name: 'David Lee', avatar: 'https://placehold.co/100x100.png' },
    { name: 'Aisha Bello', avatar: 'https://placehold.co/100x100.png' },
];

const initialConversations: Conversation[] = [
    {
        patient: initialPatients[0],
        lastMessage: "Thank you, Doctor. I'll review them now.",
        lastMessageTime: "2h ago",
        unreadCount: 1,
    },
    {
        patient: initialPatients[1],
        lastMessage: "I have a follow-up question about my prescription.",
        lastMessageTime: "1d ago",
    },
    {
        patient: initialPatients[2],
        lastMessage: "Okay, sounds good. See you then.",
        lastMessageTime: "3d ago",
        unreadCount: 3,
    },
];

const initialMessages: Record<string, Message[]> = {
    [initialPatients[0].name]: [
        { id: 'm1', sender: 'me', text: "Hi Jessica, please find your latest test results attached. Let's discuss them during our next appointment. Feel free to ask any preliminary questions.", time: "10:30 AM", attachment: { name: 'lab_results_aug_2024.pdf', size: 1200 } },
        { id: 'm2', sender: 'patient', text: "Thank you, Doctor. I'll review them now.", time: "10:32 AM" },
    ],
    [initialPatients[1].name]: [
        { id: 'm3', sender: 'patient', text: "I have a follow-up question about my prescription.", time: "Yesterday" },
    ],
    [initialPatients[2].name]: [
       { id: 'm4', sender: 'patient', text: "I'm not feeling much better after the last consultation.", time: "3d ago"},
       { id: 'm5', sender: 'patient', text: "Could we perhaps try a different medication?", time: "3d ago"},
       { id: 'm6', sender: 'me', text: "Certainly, Aisha. Let's book a follow-up appointment to discuss alternative options. My assistant will reach out to you shortly to schedule it.", time: "2d ago"},
       { id: 'm7', sender: 'patient', text: "Okay, sounds good. See you then.", time: "1d ago"},
    ]
};


export default function ProfessionalMessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations.length > 0 ? conversations[0] : null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !attachment) || !selectedConversation) return;

    const currentMessages = messages[selectedConversation.patient.name] || [];
    const updatedMessages = [
        ...currentMessages,
        {
            id: `m-${Date.now()}`,
            sender: 'me' as const,
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            attachment: attachment ? { name: attachment.name, size: attachment.size } : undefined
        }
    ];

    setMessages(prev => ({ ...prev, [selectedConversation.patient.name]: updatedMessages }));
    setNewMessage('');
    setAttachment(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const filteredConversations = useMemo(() => {
    return conversations.filter(convo => 
        convo.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, searchTerm]);

  return (
    <div className="flex h-full max-h-[calc(100vh-10rem)] border bg-white rounded-lg overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search patients..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                {filteredConversations.map(convo => (
                    <button 
                        key={convo.patient.name}
                        className={cn(
                            "flex items-center gap-4 p-4 w-full text-left hover:bg-accent transition-colors",
                            selectedConversation?.patient.name === convo.patient.name && "bg-secondary"
                        )}
                        onClick={() => setSelectedConversation(convo)}
                    >
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={convo.patient.avatar} />
                            <AvatarFallback>{convo.patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold truncate">{convo.patient.name}</h3>
                                <p className="text-xs text-muted-foreground">{convo.lastMessageTime}</p>
                            </div>
                            <div className="flex justify-between items-start">
                               <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                               {convo.unreadCount && (
                                   <span className="flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 ml-2 mt-1">
                                       {convo.unreadCount}
                                   </span>
                               )}
                           </div>
                        </div>
                    </button>
                ))}
            </ScrollArea>
        </div>

        {/* Chat Panel */}
        <div className="w-2/3 flex flex-col">
             {selectedConversation ? (
                <>
                    <CardHeader className="flex-row items-center justify-between border-b">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={selectedConversation.patient.avatar} />
                                <AvatarFallback>{selectedConversation.patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-lg font-bold">{selectedConversation.patient.name}</h2>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <ScrollArea className="flex-1 p-6 bg-background/50">
                        <div className="space-y-6">
                            {(messages[selectedConversation.patient.name] || []).map(msg => (
                               <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                                    {msg.sender === 'patient' && (
                                        <Avatar className="w-8 h-8 self-start">
                                            <AvatarImage src={selectedConversation.patient.avatar} />
                                            <AvatarFallback>{selectedConversation.patient.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="max-w-[70%]">
                                       <div className={cn(
                                           "rounded-2xl p-3 text-sm",
                                           msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white rounded-bl-none border'
                                       )}>
                                           {msg.text && <p>{msg.text}</p>}
                                           {msg.attachment && (
                                                <div className="flex items-center gap-2 mt-2 bg-black/10 p-2 rounded-lg">
                                                    <Paperclip className="h-5 w-5" />
                                                    <div className="text-xs">
                                                        <p className="font-semibold">{msg.attachment.name}</p>
                                                        <p>{(msg.attachment.size / 1024).toFixed(2)} KB</p>
                                                    </div>
                                                </div>
                                           )}
                                       </div>
                                       <p className={cn("text-xs text-muted-foreground mt-1", msg.sender === 'me' ? 'text-right' : 'text-left')}>{msg.time}</p>
                                    </div>
                               </div>
                           ))}
                        </div>
                    </ScrollArea>

                    <CardContent className="pt-4 border-t">
                        <form className="space-y-2" onSubmit={handleSendMessage}>
                            {attachment && (
                                <div className="p-2 border rounded-md">
                                    <Badge variant="secondary" className="flex justify-between items-center">
                                       <span>{attachment.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5"
                                            onClick={() => {
                                                setAttachment(null);
                                                if(fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Remove attachment</span>
                                        </Button>
                                    </Badge>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                <Button variant="ghost" size="icon" type="button" onClick={() => fileInputRef.current?.click()}>
                                    <Paperclip className="h-5 w-5" />
                                    <span className="sr-only">Attach file</span>
                                </Button>
                                <Input 
                                    placeholder="Type a message..." 
                                    className="flex-1"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <Button size="icon" type="submit" disabled={!newMessage.trim() && !attachment}>
                                    <Send className="h-5 w-5" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </>
             ) : (
                <div className="flex flex-1 items-center justify-center text-center">
                    <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
             )}
        </div>
    </div>
  );
}
