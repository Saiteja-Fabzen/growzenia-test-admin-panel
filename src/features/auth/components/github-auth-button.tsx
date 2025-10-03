'use client';
import { Button } from '@/components/ui/button';
import { IconBrandGithub } from '@tabler/icons-react';

export default function GithubSignInButton() {
  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={() => {
        // Add your GitHub OAuth logic here
        console.log('GitHub sign in clicked');
      }}
    >
      <IconBrandGithub className='mr-2 h-4 w-4' />
      Continue with GitHub
    </Button>
  );
}
