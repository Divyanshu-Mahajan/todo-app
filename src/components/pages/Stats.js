import React, { useEffect, useState } from 'react';
import { getAllTodos } from '../lib/api';
import useApi from '../hooks/use-api';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#4caf50', '#f44336'];

const Stats = () => {
  const { sendRequestForApi, status, data, error } = useApi(getAllTodos, true);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    sendRequestForApi();
  }, [sendRequestForApi]);

  useEffect(() => {
    if (data) {
      const completed = data.filter(todo => todo.completed).length;
      const pending = data.length - completed;
      setCompletedCount(completed);
      setPendingCount(pending);
    }
  }, [data]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <Card><p>{error}</p></Card>;
  }

  const total = completedCount + pendingCount;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'Pending', value: pendingCount },
  ];

  return (
    <Card>
      <h2 className="card-heading centered">📊 Todo Statistics</h2>
      <div className="centered">
        <p><strong>Total Todos:</strong> {total}</p>
        <p><strong>Completed:</strong> {completedCount}</p>
        <p><strong>Pending:</strong> {pendingCount}</p>
        <p><strong>Completion Rate:</strong> {percentage}%</p>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Stats;
