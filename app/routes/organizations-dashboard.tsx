import { useLoaderData } from '@remix-run/react';
import { executeQuery, QueryData } from '@/db/execute-query';
import { LoaderError } from '@/types/loader-error';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';
import {
  TotalOrganizationsCard,
  totalOrganizationsQuery,
  TotalOrganizationsData,
} from './organizations-dashboard/components/TotalOrganizationsCard';
import {
  OrganizationsBySubscriptionTierChart,
  organizationsBySubscriptionTierQuery,
  OrganizationsBySubscriptionTierData,
} from './organizations-dashboard/components/OrganizationsBySubscriptionTierChart';
import {
  OrganizationsByIndustryChart,
  organizationsByIndustryQuery,
  OrganizationsByIndustryData,
} from './organizations-dashboard/components/OrganizationsByIndustryChart';
import {
  OrganizationsRevenueTable,
  organizationsRevenueQuery,
  OrganizationsRevenueData,
} from './organizations-dashboard/components/OrganizationsRevenueTable';
import {
  OrganizationsActiveSubscriptionsTable,
  organizationsActiveSubscriptionsQuery,
  OrganizationsActiveSubscriptionsData,
} from './organizations-dashboard/components/OrganizationsActiveSubscriptionsTable';
import {
  OrganizationsUsersTable,
  organizationsUsersQuery,
  OrganizationsUsersData,
} from './organizations-dashboard/components/OrganizationsUsersTable';

export async function loader(): Promise<OrganizationsDashboardProps | LoaderError> {
  try {
    const [
      totalOrganizations,
      organizationsBySubscriptionTier,
      organizationsByIndustry,
      organizationsRevenue,
      organizationsActiveSubscriptions,
      organizationsUsers,
    ] = await Promise.all([
      executeQuery<TotalOrganizationsData>(totalOrganizationsQuery),
      executeQuery<OrganizationsBySubscriptionTierData>(organizationsBySubscriptionTierQuery),
      executeQuery<OrganizationsByIndustryData>(organizationsByIndustryQuery),
      executeQuery<OrganizationsRevenueData>(organizationsRevenueQuery),
      executeQuery<OrganizationsActiveSubscriptionsData>(organizationsActiveSubscriptionsQuery),
      executeQuery<OrganizationsUsersData>(organizationsUsersQuery),
    ]);

    return {
      totalOrganizations,
      organizationsBySubscriptionTier,
      organizationsByIndustry,
      organizationsRevenue,
      organizationsActiveSubscriptions,
      organizationsUsers,
    };
  } catch (error) {
    console.error('Error in organizations dashboard loader:', error);
    return { error: error instanceof Error ? error.message : 'Failed to load organizations dashboard data' };
  }
}

interface OrganizationsDashboardProps {
  totalOrganizations: QueryData<TotalOrganizationsData[]>;
  organizationsBySubscriptionTier: QueryData<OrganizationsBySubscriptionTierData[]>;
  organizationsByIndustry: QueryData<OrganizationsByIndustryData[]>;
  organizationsRevenue: QueryData<OrganizationsRevenueData[]>;
  organizationsActiveSubscriptions: QueryData<OrganizationsActiveSubscriptionsData[]>;
  organizationsUsers: QueryData<OrganizationsUsersData[]>;
}

export default function OrganizationsDashboard({
  totalOrganizations,
  organizationsBySubscriptionTier,
  organizationsByIndustry,
  organizationsRevenue,
  organizationsActiveSubscriptions,
  organizationsUsers,
}: OrganizationsDashboardProps) {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Organizations Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WithErrorHandling
          queryData={totalOrganizations}
          render={(data) => <TotalOrganizationsCard data={data} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={organizationsBySubscriptionTier}
          render={(data) => <OrganizationsBySubscriptionTierChart data={data} />}
        />
        <WithErrorHandling
          queryData={organizationsByIndustry}
          render={(data) => <OrganizationsByIndustryChart data={data} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={organizationsRevenue}
          render={(data) => <OrganizationsRevenueTable data={data} />}
        />
        <WithErrorHandling
          queryData={organizationsActiveSubscriptions}
          render={(data) => <OrganizationsActiveSubscriptionsTable data={data} />}
        />
      </div>

      <div className="grid grid-cols-1">
        <WithErrorHandling
          queryData={organizationsUsers}
          render={(data) => <OrganizationsUsersTable data={data} />}
        />
      </div>
    </div>
  );
}
