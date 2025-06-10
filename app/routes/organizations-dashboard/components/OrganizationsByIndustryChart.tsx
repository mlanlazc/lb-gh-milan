import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';
import { ChartConfig } from '@/components/ui/chart';

export const organizationsByIndustryQuery = `
  SELECT industry, COUNT(*) AS count FROM organizations GROUP BY industry ORDER BY count DESC LIMIT 10;
`;

export type OrganizationsByIndustryData = {
  industry: string;
  count: number;
};

interface OrganizationsByIndustryChartProps {
  data: OrganizationsByIndustryData[];
}

export function OrganizationsByIndustryChart({ data }: OrganizationsByIndustryChartProps) {
  const chartConfig: ChartConfig = {
    count: {
      label: 'Organizations',
      color: 'var(--chart-2)',
    },
  };

  const formattedData = data.map(item => ({
    ...item,
    industry: item.industry || 'Unknown'
  }));

  return (
    <UniversalChartCard
      title="Organizations by Industry"
      description="Top 10 industries with the most organizations."
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="industry" angle={-45} textAnchor="end" height={80} interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="var(--chart-2)" stroke="var(--chart-2-stroke)" />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
