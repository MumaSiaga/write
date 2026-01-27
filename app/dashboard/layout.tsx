// app/dashboard/layout.tsx (server component)
// On Free tier: client components handle auth checks.
import DashboardWrapper from "./components/DashboardWrapper";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
}
