import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface WeightRecord {
  weight: number;
  date: string;
}

const Weight = () => {
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState<WeightRecord[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/weight', { weight }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchWeights();
    } catch (error: any) {
      console.error('Error logging weight:', error.response?.data || error.message);

    }
  };

  const fetchWeights = async () => {
    try {
      const response = await api.get('/weight', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWeights(response.data);
    } catch (error: any) {
      console.error('Error fetching weights:', error.response?.data || error.message);

    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  return (
    <div>
      <h1>Weight Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log Weight</button>
      </form>
      <ul>
        {weights.map((weightRecord, index) => (
          <li key={index}>{weightRecord.weight} kg on {new Date(weightRecord.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Weight;
