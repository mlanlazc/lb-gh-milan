import { useLoaderData } from '@remix-run/react';
import { ErrorComponent } from '@/components/building-blocks/error-component/error-component';
import OrganizationsDashboard, { loader as organizationsDashboardLoader } from './organizations-dashboard';

export async function loader() {
  return organizationsDashboardLoader();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  if ('error' in data) {
    return <ErrorComponent errorMessage={data.error} />;
  }

  return <OrganizationsDashboard {...data} />;
}
