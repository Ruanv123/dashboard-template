"use client";

import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Category = {
//   id: number;
//   name: string;
//   description?: string;
//   parentId?: number;
//   productQuantity: number;
//   createdAt: string;
//   updatedAt: string;
// };

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "productQuantity",
    header: "Product Quantity",
  },
];
