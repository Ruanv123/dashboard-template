import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { CategoryMutateDrawer } from "@/components/sheets/create-category-sheet";

async function getData(): Promise<Category[]> {
  return await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function CategoriesPage() {
  const data = await getData();

  return (
    <>
      <div>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your categories!
            </p>
          </div>

          <Button>Nova Categoria</Button>
        </div>
      </div>

      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable columns={columns} data={data} />
      </div>

      <CategoryMutateDrawer onOpenChange={() => {}} open={true} />
    </>
  );
}
