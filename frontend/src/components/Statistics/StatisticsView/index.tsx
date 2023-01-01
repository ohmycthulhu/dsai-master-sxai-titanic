import React from 'react';

import { StatisticsResponse } from '../../../types/api.types';

type StatisticsViewProps = {
  data: StatisticsResponse,
};

function formatNumber(ratio: number) {
  return `${Math.floor(ratio * 100)}%`;
}

export default function StatisticsView({ data }: StatisticsViewProps) {
  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        <li>Rule coverage: {formatNumber(data.rule_coverage)}</li>
        <li>Accuracy: {formatNumber(data.accuracy)}</li>
        <li>False negatives rate: {formatNumber(data.false_negative)}</li>
        <li>False positives rate: {formatNumber(data.false_positive)}</li>
      </ul>
    </div>
  );
}
