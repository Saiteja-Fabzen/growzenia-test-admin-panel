import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import type * as React from 'react';
import { useState } from 'react';

import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getCommonPinningStyles } from '@/lib/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  isMaximized?: boolean;
  onMaximizeChange?: (isMaximized: boolean) => void;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  isMaximized = false,
  onMaximizeChange
}: DataTableProps<TData>) {
  const handleMaximize = (value: boolean) => {
    onMaximizeChange?.(value);
  };

  const tableContent = (
    <>
      <div className='rounded-lg border'>
        <ScrollArea className={isMaximized ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}>
          <Table>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column })
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column })
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
      <div className='flex flex-col gap-2.5'>
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </>
  );

  if (isMaximized) {
    return (
      <div className='fixed inset-0 z-50 bg-background'>
        <div className='flex h-full flex-col p-6'>
          <div className='mb-4 flex items-center justify-between'>
            {children}
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleMaximize(false)}
            >
              <Minimize2 className='h-4 w-4' />
            </Button>
          </div>
          {tableContent}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-4'>
      {children}
      {tableContent}
    </div>
  );
}

export function MaximizeButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant='outline'
      size='sm'
      onClick={onClick}
    >
      <Maximize2 className='mr-2 h-4 w-4' />
      Maximize
    </Button>
  );
}
