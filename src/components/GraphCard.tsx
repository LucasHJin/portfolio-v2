'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

type GraphCardProps = {
  title: string;
  apiEndpoint: string;
  dataKey: string;
  sheetUrl: string;
  yMin?: number;
  yMax?: number;
};

type ChartPoint = {
  [key: string]: number;
};

export default function GraphCard({ 
  title, 
  apiEndpoint, 
  dataKey,
  sheetUrl,
  yMin,
  yMax
}: GraphCardProps) {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(result => {
        setData(result.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, [apiEndpoint]);

  // Restrict range so that changes are clear
  const calculateRange = () => {
    if (yMin !== undefined && yMax !== undefined) {
      return [yMin, yMax];
    }
    
    if (data.length === 0) return ['auto', 'auto'];
    
    const values = data.map(d => d[dataKey]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const padding = range * 0.1;
    
    return [min - padding, max + padding];
  };

  if (loading) {
    return (
      <div className="bg-highlight h-full flex-1 rounded-xl flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  const styles = getComputedStyle(document.documentElement);
  const foregroundColor = styles.getPropertyValue('--foreground').trim() || '#000000';
  const backgroundColor = styles.getPropertyValue('--background').trim() || '#ffffff';

  return (
    <div className="bg-highlight h-full flex-1 rounded-xl p-6 flex flex-col">
      <a 
        href={sheetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground text-2xl mb-4 hover:text-background transition-colors duration-300"
      >
        {title}
      </a>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <YAxis 
              domain={calculateRange()} 
              hide={true}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: backgroundColor,
                border: 'none',
                borderRadius: '7px',
                padding: '5px 10px'
              }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: foregroundColor }}
              cursor={false}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={foregroundColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: foregroundColor }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}