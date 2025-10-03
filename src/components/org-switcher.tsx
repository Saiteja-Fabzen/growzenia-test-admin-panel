'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Image from 'next/image';

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size='lg'>
          <div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
            <Image
              src='/assets/sidebar_logo.png'
              alt='GrowZenia'
              fill
              className='object-contain object-left'
              priority
            />
          </div>
          <div className='flex flex-col gap-0.5 leading-none'>
            <span className='font-semibold'>Growzenia</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
