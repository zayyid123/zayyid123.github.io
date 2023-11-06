import AdminLayout from "../layout/AdminLayout";

export default function Layout({ children }) {
  return (
    <AdminLayout>
      <div>{children}</div>
    </AdminLayout>
  );
}
