import React from 'react';
import { DashboardSummary } from '../services/claimsService';
import { Clock, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface MetricsBarProps {
  summary: DashboardSummary | null;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ summary }) => {
  const awaitingReviewCount = (summary?.pending ?? 0) + (summary?.inReview ?? 0);
  const highRiskCount = summary?.highRisk ?? 0;
  const approvedCount = summary?.approved ?? 0;
  const totalApprovedPayout = summary?.totalDisbursed ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Awaiting Review</CardTitle>
          <Clock className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {awaitingReviewCount.toLocaleString('en-US')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">High Risk Flags</CardTitle>
          <AlertTriangle className="h-4 w-4 text-rose-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {highRiskCount.toLocaleString('en-US')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Approved Claims</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {approvedCount.toLocaleString('en-US')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Total Disbursed</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            ${Math.round(totalApprovedPayout).toLocaleString('en-US')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
