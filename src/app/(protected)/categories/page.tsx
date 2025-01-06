import { Button } from "@/components/ui/button";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Enlatados",
      productQuantity: 100,
    },
  ];
}

export default async function CategoriesPage() {
  const data = await getData();

  return (
    <>
      <div>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          {/* <TasksPrimaryButtons /> */}
          <Button>ADD TASK + </Button>
        </div>
      </div>

      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
