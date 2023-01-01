import React, { useEffect, useState } from 'react';

import { StatisticsResponse } from '../../types/api.types';
import fetch from '../../util/fetch';
import StatisticsView from './StatisticsView';

export default function Statistics() {
  const [statisticsData, setStatisticsData] = useState<StatisticsResponse | null>(null);

  useEffect(() => {
    fetch<StatisticsResponse>('get', 'api/statistics').then(setStatisticsData);
  }, []);

  if (!statisticsData) {
    return null;
  }

  return <StatisticsView data={statisticsData} />;
}
