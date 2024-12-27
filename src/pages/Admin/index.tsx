import { UsersTable } from "@/pages/Admin/components/UsersTable";

export default function AdminPage() {

  return (
    <div className="container flex-grow">

      <h1 className="text-xl font-semibold mb-5">All Users</h1>

      <UsersTable />

    </div>
  );
}
