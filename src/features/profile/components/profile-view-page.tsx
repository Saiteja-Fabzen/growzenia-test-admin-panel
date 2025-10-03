import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <Card className='max-w-3xl mx-auto w-full'>
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center text-center space-y-6'>
            {/* Avatar */}
            <Avatar className='h-24 w-24'>
              <AvatarFallback className='text-3xl'>AH</AvatarFallback>
            </Avatar>

            {/* Name and Role */}
            <div>
              <h2 className='text-2xl font-semibold'>Anshan Haso</h2>
              <p className='text-muted-foreground text-sm'>admin</p>
            </div>

            {/* User Details Grid */}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
              <div className='bg-muted/50 rounded-lg p-6 text-center'>
                <p className='text-lg font-semibold'>User1111</p>
                <p className='text-muted-foreground text-sm'>User Id</p>
              </div>
              <div className='bg-muted/50 rounded-lg p-6 text-center'>
                <p className='text-lg font-semibold'>+919876543210</p>
                <p className='text-muted-foreground text-sm'>Mobile No</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
