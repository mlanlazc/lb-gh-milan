import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const organizationsUsersQuery = `
  SELECT o.organization_id, o.organization_name, COUNT(u.user_id) AS total_users_count
  FROM organizations o
  LEFT JOIN users u ON o.organization_id = u.organization_id
  GROUP BY o.organization_id, o.organization_name
  ORDER BY total_users_count DESC
  LIMIT 10;
`;

export type OrganizationsUsersData = {
  organization_id: number;
  organization_name: string;
  total_users_count: number;
};

interface OrganizationsUsersTableProps {
  data: OrganizationsUsersData[];
}

export function OrganizationsUsersTable({ data }: OrganizationsUsersTableProps) {
  return (
    <UniversalTableCard
      title="Organizations by Total Users"
      description="Top 10 organizations with the most users."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization ID</TableHead>
            <TableHead>Organization Name</TableHead>
            <TableHead>Total Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No user data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((org) => (
              <TableRow key={org.organization_id}>
                <TableCell>{org.organization_id}</TableCell>
                <TableCell>{org.organization_name}</TableCell>
                <TableCell>{org.total_users_count}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
