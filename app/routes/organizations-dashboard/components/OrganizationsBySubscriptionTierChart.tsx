import { ChartConfig } from '@/components/ui/chart';
import { ChartSharePercentage } from '@/components/building-blocks/chart-share-percentage/chart-share-percentage';

export const organizationsBySubscriptionTierQuery = `
  SELECT subscription_tier, COUNT(*) AS count FROM organizations GROUP BY subscription_tier ORDER BY count DESC LIMIT 10;
`;

export type OrganizationsBySubscriptionTierData = {
  subscription_tier: string;
  count: number;
};

interface OrganizationsBySubscriptionTierChartProps {
  data: OrganizationsBySubscriptionTierData[];
}

export function OrganizationsBySubscriptionTierChart({ data }: OrganizationsBySubscriptionTierChartProps) {
  const chartConfig = data.reduce((acc, item, index) => {
    const tierName = item.subscription_tier || 'Unknown';
    acc[tierName.replace(/\s+/g, '')] = {
      label: tierName,
      color: `var(--chart-${(index % 10) + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  const totalOrganizations = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartSharePercentage
      title="Organizations by Subscription Tier"
      description="Distribution of organizations across different subscription tiers."
      data={data}
      dataKey="count"
      nameKey="subscription_tier"
      chartConfig={chartConfig}
      centerValueRenderer={() => ({
        title: totalOrganizations.toLocaleString(),
        subtitle: 'Total Orgs',
      })}
      valueFormatter={(value) => `${((value / totalOrganizations) * 100).toFixed(1)}%`}
    />
  );
}
