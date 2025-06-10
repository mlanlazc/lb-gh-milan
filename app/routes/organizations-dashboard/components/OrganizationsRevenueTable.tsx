import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const organizationsRevenueQuery = `
  SELECT DISTINCT ON (o.organization_id) o.organization_id, o.organization_name, r.total_revenue, r.date
  FROM organizations o
  JOIN revenue r ON o.organization_id = r.organization_id
  ORDER BY o.organization_id, r.date DESC
  LIMIT 10;
`;

export type OrganizationsRevenueData = {
  organization_id: number;
  organization_name: string;
  total_revenue: number;
  date: string;
};

interface OrganizationsRevenueTableProps {
  data: OrganizationsRevenueData[];
}

export function OrganizationsRevenueTable({ data }: OrganizationsRevenueTableProps) {
  return (
    <UniversalTableCard
      title="Organizations Revenue"
      description="Latest revenue data for top organizations."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization ID</TableHead>
            <TableHead>Organization Name</TableHead>
            <TableHead>Latest Revenue</TableHead>
            <TableHead>Revenue Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No revenue data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((org) => (
              <TableRow key={org.organization_id}>
                <TableCell>{org.organization_id}</TableCell>
                <TableCell>{org.organization_name}</TableCell>
                <TableCell>${org.total_revenue ? org.total_revenue.toFixed(2) : '0.00'}</TableCell>
                <TableCell>{new Date(org.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
