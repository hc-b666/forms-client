import { UsersTable } from "@/features/admin/components/UsersTable";

export default function AdminPage() {

  return (
    <div className="container flex-grow">

      <h1>Admin</h1>

      <UsersTable />


    </div>
  );
}
