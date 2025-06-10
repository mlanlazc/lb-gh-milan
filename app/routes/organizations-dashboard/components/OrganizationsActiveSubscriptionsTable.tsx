import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const organizationsActiveSubscriptionsQuery = `
  SELECT o.organization_id, o.organization_name, COUNT(s.subscription_id) AS active_subscriptions_count
  FROM organizations o
  LEFT JOIN subscriptions s ON o.organization_id = s.organization_id AND s.status = 'active'
  GROUP BY o.organization_id, o.organization_name
  ORDER BY active_subscriptions_count DESC
  LIMIT 10;
`;

export type OrganizationsActiveSubscriptionsData = {
  organization_id: number;
  organization_name: string;
  active_subscriptions_count: number;
};

interface OrganizationsActiveSubscriptionsTableProps {
  data: OrganizationsActiveSubscriptionsData[];
}

export function OrganizationsActiveSubscriptionsTable({ data }: OrganizationsActiveSubscriptionsTableProps) {
  return (
    <UniversalTableCard
      title="Organizations by Active Subscriptions"
      description="Top 10 organizations with the most active subscriptions."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization ID</TableHead>
            <TableHead>Organization Name</TableHead>
            <TableHead>Active Subscriptions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No active subscriptions data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((org) => (
              <TableRow key={org.organization_id}>
                <TableCell>{org.organization_id}</TableCell>
                <TableCell>{org.organization_name}</TableCell>
                <TableCell>{org.active_subscriptions_count}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
