import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex justify-start gap-2 w-full md:w-[557px] items-center rounded-md py-2 px-4 text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & { variant?: 'default' | 'secondary' };

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = 'default', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      variant === 'default' &&
        'inline-flex w-fit md:min-w-19 md:h-12 items-center border-[#D5D7DA] border justify-center whitespace-nowrap rounded-[100px] px-4 py-2 font-semibold text-md text-[#0A0D12] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FFECEC] data-[state=active]:font-bold data-[state=active]:text-md data-[state=active]:border data-[state=active]:border-[#C12116]  data-[state=active]:text-[#C12116]',

      variant === 'secondary' &&
        'inline-flex items-center justify-center md:h-10 border-[#D5D7DA] px-4 py-2 rounded-full border text-neutral-950 md:text-md-semibold transition-all whitespace-nowrap ' +
          'data-[state=active]:border-[#1C65DA] data-[state=active]:text-[#1C65DA] data-[state=active]:font-bold data-[state=active]:text-md data-[state=active]:bg-[#F6F9FE]',

      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
