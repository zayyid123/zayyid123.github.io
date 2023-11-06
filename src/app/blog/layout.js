import UserLayout from "../layout/UserLayout";

export default function Layout({ children }) {
  return (
    <UserLayout>
      <div>{children}</div>
    </UserLayout>
  );
}
