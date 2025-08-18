
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Video } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center bg-background rounded-lg border-2 border-dashed">
            <div className="p-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                    <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold font-headline mb-2">Coming Soon!</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Our secure messaging feature is currently under development. Soon you'll be able to chat directly with your healthcare providers.
                </p>
                <Button className="mt-6" disabled>
                   <Video className="mr-2 h-4 w-4"/> Start a Video Call instead
                </Button>
            </div>
        </div>
    </div>
  );
}
